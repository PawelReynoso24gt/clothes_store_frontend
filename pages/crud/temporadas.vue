<template>
    <div class="contenedor-principal">
      <h1 class="titulo-centrado">Lista de Temporadas</h1>
  
      <!-- Botón para crear temporada -->
      <button @click="mostrarModalCrear" class="btn-crear">Crear Temporada</button>
  
      <!-- Modal para crear temporada -->
      <div v-if="mostrarModal" class="modal">
        <div class="modal-contenido">
          <span class="cerrar" @click="cerrarModal">&times;</span>
          <h2>Crear Temporada</h2>
          <form @submit.prevent="crearTemporada">
            <div class="form-group">
              <label for="temporada">Temporada:</label>
              <input type="text" v-model="nuevaTemporada.temporada" id="temporada" required />
            </div>
            <div class="form-group">
              <label for="estado">Estado:</label>
              <select v-model="nuevaTemporada.estado" id="estado" required>
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
              </select>
            </div>
            <button type="submit" class="btn-enviar">Crear</button>
            <button type="button" class="btn-cerrar" @click="cerrarModal">Cancelar</button>
          </form>
        </div>
      </div>
  
      <!-- Modal para actualizar temporada -->
      <div v-if="isModalActualizarVisible" class="modal">
        <div class="modal-contenido">
          <span class="cerrar" @click="cerrarModalActualizar">&times;</span>
          <h2>Actualizar Temporada</h2>
          <form @submit.prevent="actualizarTemporada">
            <div class="form-group">
              <label for="temporada">Temporada:</label>
              <input type="text" v-model="temporadaSeleccionada.temporada" id="temporada" required />
            </div>
            <button type="submit" class="btn-enviar">Actualizar</button>
            <button type="button" class="btn-cerrar" @click="cerrarModalActualizar">Cancelar</button>
          </form>
        </div>
      </div>
  
      <!-- Tabla de temporadas activas -->
      <div class="tabla-contenedor">
        <table v-if="temporadasActivas.length" class="inventarios-table">
          <thead>
            <tr>
              <th>ID Temporada</th>
              <th>Temporada</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="temporada in temporadasActivas" :key="temporada.idTemporada">
              <td>{{ temporada.idTemporada }}</td>
              <td>{{ temporada.temporada }}</td>
              <td>{{ temporada.estado === 1 ? 'ACTIVO' : 'INACTIVO' }}</td>
              <td>
                <button @click="mostrarModalActualizar(temporada)" class="btn-actualizar">Actualizar</button>
                <button @click="desactivarTemporada(temporada)" class="btn-desactivar">Desactivar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No hay temporadas activas disponibles.</p>
      </div>
  
      <!-- Botón para ver temporadas inactivas -->
      <div class="boton-inactivos-contenedor">
        <button @click="mostrarModalInactivos" class="btn-ver-inactivos">Ver Temporadas Inactivas</button>
      </div>
  
      <!-- Modal para ver temporadas inactivas -->
      <div v-if="mostrarModalTemporadasInactivas" class="modal">
        <div class="modal-contenido modal-grande">
          <span class="cerrar" @click="cerrarModalInactivos">&times;</span>
          <h2>Temporadas Inactivas</h2>
          <div class="tabla-contenedor">
            <table v-if="temporadasInactivas.length" class="inventarios-table">
              <thead>
                <tr>
                  <th>ID Temporada</th>
                  <th>Temporada</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="temporada in temporadasInactivas" :key="temporada.idTemporada">
                  <td>{{ temporada.idTemporada }}</td>
                  <td>{{ temporada.temporada }}</td>
                  <td>{{ temporada.estado === 0 ? 'INACTIVO' : 'ACTIVO' }}</td>
                  <td>
                    <button @click="activarTemporada(temporada)" class="btn-activar">Activar</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <p v-else>No hay temporadas inactivas disponibles.</p>
            <button type="button" class="btn-cerrar" @click="cerrarModalInactivos">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        temporadas: [],
        mostrarModal: false,
        isModalActualizarVisible: false, // Renombrado de la propiedad
        mostrarModalTemporadasInactivas: false,
        temporadaSeleccionada: {},
        nuevaTemporada: {
          temporada: "",
          estado: 1,
        },
      };
    },
    computed: {
      temporadasActivas() {
        return this.temporadas.filter((temporada) => temporada.estado === 1);
      },
      temporadasInactivas() {
        return this.temporadas.filter((temporada) => temporada.estado === 0);
      },
    },
    created() {
      this.obtenerTemporadas();
    },
    methods: {
      async obtenerTemporadas() {
        try {
          const response = await axios.get("http://localhost:5000/temporada");
          this.temporadas = response.data;
        } catch (error) {
          console.error("Error al obtener las temporadas:", error);
        }
      },
      mostrarModalCrear() {
        this.mostrarModal = true;
      },
      cerrarModal() {
        this.mostrarModal = false;
        this.limpiarFormulario();
      },
      async crearTemporada() {
        try {
          const response = await axios.post("http://localhost:5000/temporada/create", this.nuevaTemporada);
          this.temporadas.push(response.data);
          this.cerrarModal();
          this.obtenerTemporadas(); // Recargar para actualizar lista
        } catch (error) {
          console.error("Error al crear la temporada:", error);
        }
      },
      mostrarModalActualizar(temporada) {
        this.temporadaSeleccionada = { ...temporada };
        this.isModalActualizarVisible = true; // Cambiar el valor de la nueva propiedad
      },
      cerrarModalActualizar() {
        this.isModalActualizarVisible = false; // Cambiar el valor de la nueva propiedad
      },
      async actualizarTemporada() {
        try {
          await axios.put(`http://localhost:5000/temporada/update/${this.temporadaSeleccionada.idTemporada}`, this.temporadaSeleccionada);
          this.obtenerTemporadas(); // Recargar para actualizar lista
          this.cerrarModalActualizar();
        } catch (error) {
          console.error("Error al actualizar la temporada:", error);
        }
      },
      async desactivarTemporada(temporada) {
        try {
          temporada.estado = 0;
          await axios.put(`http://localhost:5000/temporada/update/${temporada.idTemporada}`, temporada);
          this.obtenerTemporadas(); // Recargar para actualizar lista
        } catch (error) {
          console.error("Error al desactivar la temporada:", error);
        }
      },
      mostrarModalInactivos() {
        this.mostrarModalTemporadasInactivas = true;
      },
      cerrarModalInactivos() {
        this.mostrarModalTemporadasInactivas = false;
      },
      async activarTemporada(temporada) {
        try {
          temporada.estado = 1;
          await axios.put(`http://localhost:5000/temporada/update/${temporada.idTemporada}`, temporada);
          this.obtenerTemporadas(); // Recargar para actualizar lista
        } catch (error) {
          console.error("Error al activar la temporada:", error);
        }
      },
      limpiarFormulario() {
        this.nuevaTemporada = {
          temporada: "",
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
  
  .inventarios-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}
  
    .inventarios-table th,
    .inventarios-table td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: center;
        font-size: 14px;
    }
  
    .inventarios-table th {
    background-color: #f7f7f7;
    color: #333;
    font-weight: bold;
    }
  
    .inventarios-table td {
    color: #555;
    }
  
  .inventarios-tablee tr:hover {
    background-color: #ddd;
  }
  </style>
  