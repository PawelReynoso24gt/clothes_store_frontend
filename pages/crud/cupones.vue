<template>
    <div class="contenedor-principal">
      <h1 class="titulo-centrado">Lista de Cupones</h1>
  
      <!-- Botón para crear cupón -->
      <button @click="mostrarModalCrear" class="btn-crear">Crear Cupón</button>
  
      <!-- Modal para crear cupón -->
      <div v-if="mostrarModal" class="modal">
        <div class="modal-contenido">
          <span class="cerrar" @click="cerrarModal">&times;</span>
          <h2>Crear Cupón</h2>
          <form @submit.prevent="crearCupon">
            <div class="form-group">
              <label for="codigo">Código:</label>
              <input type="text" v-model="nuevoCupon.codigo" id="codigo" required />
            </div>
            <div class="form-group">
              <label for="descuento">Descuento:</label>
              <input type="number" v-model="nuevoCupon.descuento" id="descuento" required />
            </div>
            <div class="form-group">
              <label for="descripcion">Descripción:</label>
              <input type="text" v-model="nuevoCupon.descripcion" id="descripcion" required />
            </div>
            <button type="submit" class="btn-enviar">Crear</button>
            <button type="button" class="btn-cerrar" @click="cerrarModal">Cancelar</button>
          </form>
        </div>
      </div>
  
      <!-- Tabla de cupones -->
      <div class="tabla-contenedor">
        <table v-if="cupones.length" class="cupones-table">
          <thead>
            <tr>
              <th>ID Cupón</th>
              <th>Código</th>
              <th>Descuento</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cupon in cupones" :key="cupon.idCupon">
              <td>{{ cupon.idCupon }}</td>
              <td>{{ cupon.codigo }}</td>
              <td>{{ cupon.descuento }}%</td>
              <td>{{ cupon.descripcion }}</td>
              <td>{{ cupon.estado === 1 ? 'ACTIVO' : 'INACTIVO' }}</td>
              <td style="display: flex; gap: 5px;">
                <button @click="desactivarCupon(cupon.idCupon)" v-if="cupon.estado === 1" class="btn-desactivar">Desactivar</button>
                <button @click="mostrarModalActualizar(cupon)" class="btn-actualizar">Actualizar Datos</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No hay cupones disponibles.</p>
      </div>
  
      <!-- Botón para ver cupones inactivos -->
      <div class="boton-inactivos-contenedor">
        <button @click="mostrarModalInactivos" class="btn-ver-inactivos">Ver Cupones Inactivos</button>
      </div>
  
      <!-- Modal para ver cupones inactivos -->
      <div v-if="mostrarModalCuponesInactivos" class="modal">
        <div class="modal-contenido modal-grande">
          <span class="cerrar" @click="cerrarModalInactivos">&times;</span>
          <h2>Cupones Inactivos</h2>
          <div class="tabla-contenedor">
            <table v-if="cuponesInactivos.length" class="cupones-table">
              <thead>
                <tr>
                  <th>ID Cupón</th>
                  <th>Código</th>
                  <th>Descuento</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cupon in cuponesInactivos" :key="cupon.idCupon">
                  <td>{{ cupon.idCupon }}</td>
                  <td>{{ cupon.codigo }}</td>
                  <td>{{ cupon.descuento }}%</td>
                  <td>{{ cupon.descripcion }}</td>
                  <td>{{ cupon.estado === 0 ? 'INACTIVO' : 'ACTIVO' }}</td>
                  <td>
                    <button @click="activarCupon(cupon.idCupon)" class="btn-activar">Activar</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <p v-else>No hay cupones inactivos disponibles.</p>
            <button type="button" class="btn-cerrar" @click="cerrarModalInactivos">Cerrar</button>
          </div>
        </div>
      </div>
  
      <!-- Modal para actualizar cupon -->
      <div v-if="mostrarModalActualizarCupon" class="modal">
        <div class="modal-contenido">
          <span class="cerrar" @click="cerrarModalActualizar">&times;</span>
          <h2>Actualizar Cupón</h2>
          <form @submit.prevent="actualizarCupon">
            <div class="form-group">
              <label for="codigo">Código:</label>
              <input type="text" v-model="cuponSeleccionado.codigo" id="codigo" required />
            </div>
            <div class="form-group">
              <label for="descuento">Descuento:</label>
              <input type="number" v-model="cuponSeleccionado.descuento" id="descuento" required />
            </div>
            <div class="form-group">
              <label for="descripcion">Descripción:</label>
              <input type="text" v-model="cuponSeleccionado.descripcion" id="descripcion" required />
            </div>
            <div class="form-group">
              <label for="estado">Estado:</label>
              <select v-model="cuponSeleccionado.estado" id="estado" required>
                <option value="1">ACTIVO</option>
                <option value="0">INACTIVO</option>
              </select>
            </div>
            <button type="submit" class="btn-enviar">Actualizar</button>
            <button type="button" class="btn-cerrar" @click="cerrarModalActualizar">Cancelar</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        cupones: [], // Lista de cupones
        cuponesInactivos: [], // Lista de cupones inactivos
        mostrarModal: false, // Controla la visibilidad del modal de creación
        mostrarModalCuponesInactivos: false, // Controla la visibilidad del modal de cupones inactivos
        mostrarModalActualizarCupon: false, // Controla la visibilidad del modal de actualización de cupon
        cuponSeleccionado: {}, // Datos del cupón seleccionado para actualizar
        nuevoCupon: { // Datos del nuevo cupón
          codigo: "",
          descuento: null,
          descripcion: "",
          estado: 1,
        },
      };
    },
    created() {
      this.obtenerCupones();
    },
    methods: {
      // Método para obtener todos los cupones
      async obtenerCupones() {
        try {
          const response = await axios.get("http://localhost:5000/cupones");
          this.cupones = response.data.filter(cupon => cupon.estado === 1);
        } catch (error) {
          console.error("Error al obtener los cupones:", error);
        }
      },
      // Método para mostrar el modal de creación
      mostrarModalCrear() {
        this.mostrarModal = true;
      },
      // Método para cerrar el modal de creación
      cerrarModal() {
        this.mostrarModal = false;
        this.limpiarFormulario();
      },
      // Método para crear un nuevo cupón
      async crearCupon() {
        try {
          const response = await axios.post("http://localhost:5000/cupones/create", this.nuevoCupon);
          this.cupones.push(response.data);
          this.cerrarModal();
        } catch (error) {
          console.error("Error al crear el cupón:", error);
        }
      },
      // Método para desactivar un cupón
      async desactivarCupon(idCupon) {
        try {
          await axios.put(`http://localhost:5000/cupones/update/${idCupon}`, { estado: 0 });
          const cupon = this.cupones.find(c => c.idCupon === idCupon);
          if (cupon) cupon.estado = 0;
        } catch (error) {
          console.error("Error al desactivar el cupón:", error);
        }
      },
      // Método para activar un cupón
      async activarCupon(idCupon) {
        try {
          await axios.put(`http://localhost:5000/cupones/update/${idCupon}`, { estado: 1 });
          const cupon = this.cuponesInactivos.find(c => c.idCupon === idCupon);
          if (cupon) {
            cupon.estado = 1;
            this.cupones.push(cupon);
            this.cuponesInactivos = this.cuponesInactivos.filter(c => c.idCupon !== idCupon);
          }
        } catch (error) {
          console.error("Error al activar el cupón:", error);
        }
      },
      // Método para mostrar el modal de cupones inactivos
      async mostrarModalInactivos() {
        try {
          const response = await axios.get("http://localhost:5000/cupones");
          this.cuponesInactivos = response.data.filter(cupon => cupon.estado === 0);
          this.mostrarModalCuponesInactivos = true;
        } catch (error) {
          console.error("Error al obtener los cupones inactivos:", error);
        }
      },
      // Método para cerrar el modal de cupones inactivos
      cerrarModalInactivos() {
        this.mostrarModalCuponesInactivos = false;
      },
      // Método para mostrar el modal de actualización de cupón
      mostrarModalActualizar(cupon) {
        this.cuponSeleccionado = { ...cupon };
        this.mostrarModalActualizarCupon = true;
      },
      // Método para cerrar el modal de actualización de cupón
      cerrarModalActualizar() {
        this.mostrarModalActualizarCupon = false;
      },
      // Método para actualizar un cupón
      async actualizarCupon() {
        try {
          const response = await axios.put(`http://localhost:5000/cupones/update/${this.cuponSeleccionado.idCupon}`, {
            codigo: this.cuponSeleccionado.codigo,
            descuento: this.cuponSeleccionado.descuento,
            descripcion: this.cuponSeleccionado.descripcion,
            estado: this.cuponSeleccionado.estado,
          });
          const index = this.cupones.findIndex(c => c.idCupon === response.data.idCupon);
          if (index !== -1) {
            this.cupones.splice(index, 1, response.data);
          }
          this.cerrarModalActualizar();
        } catch (error) {
          console.error("Error al actualizar el cupón:", error);
        }
      },
      // Método para limpiar el formulario de creación
      limpiarFormulario() {
        this.nuevoCupon = {
          codigo: "",
          descuento: null,
          descripcion: "",
          estado: 1,
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .contenedor-principal {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
  }
  
  .titulo-centrado {
    text-align: center;
  }
  
  .tabla-contenedor {
    width: 80%;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    margin-top: 20px;
  }
  
  .boton-inactivos-contenedor {
    margin-top: 40px;
    text-align: center;
  }
  
  .btn-crear,
  .btn-ver-inactivos {
    margin: 10px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .btn-desactivar {
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
    color: #fff;
    background-color: #f44336;
    border: none;
    border-radius: 4px;
  }
  
  .btn-activar {
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
    color: #fff;
    background-color: #4CAF50;
    border: none;
    border-radius: 4px;
  }
  
  .btn-actualizar {
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
    color: #fff;
    background-color: #2196F3;
    border: none;
    border-radius: 4px;
  }
  
  .btn-cerrar {
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
    color: #fff;
    background-color: #777;
    border: none;
    border-radius: 4px;
    margin-top: 10px;
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-contenido {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .modal-grande {
    width: 600px;
  }
  
  .cerrar {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  .btn-enviar {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .cupones-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  
  .cupones-table th,
  .cupones-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .cupones-table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  
  .cupones-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .cupones-table tr:hover {
    background-color: #ddd;
  }
  </style>
  