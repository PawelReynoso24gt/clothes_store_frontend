<template>
    <div class="contenedor-principal">
      <h1 class="titulo-centrado">Lista de Inventario</h1>
  
      <!-- Botón para crear inventario -->
      <button @click="mostrarModalCrear" class="btn-crear">Crear Inventario</button>
  
      <!-- Modal para crear inventario -->
      <div v-if="mostrarModal" class="modal">
        <div class="modal-contenido">
          <span class="cerrar" @click="cerrarModal">&times;</span>
          <h2>Crear Inventario</h2>
          <form @submit.prevent="crearInventario">
            <div class="form-group">
              <label for="fechaIngreso">Fecha de ingreso:</label>
              <input type="date" v-model="nuevoInventario.fechaIngreso" id="fechaIngreso" required />
            </div>
            <div class="form-group">
              <label for="cantidad">Cantidad:</label>
              <input type="number" v-model="nuevoInventario.cantidad" id="cantidad" required />
            </div>
            <div class="form-group">
              <label for="estado">Estado:</label>
              <input type="number" v-model="nuevoInventario.estado" id="estado" required />
            </div>
            <div class="form-group">
              <label for="idProducto">ID Producto:</label>
              <input type="number" v-model="nuevoInventario.idProducto" id="idProducto" required />
            </div>
            <button type="submit" class="btn-enviar">Crear</button>
            <button type="button" class="btn-cerrar" @click="cerrarModal">Cancelar</button>
          </form>
        </div>
      </div>
  
      <!-- Tabla de inventario -->
      <div class="tabla-contenedor">
        <table v-if="inventarios.length" class="inventarios-table">
          <thead>
            <tr>
              <th>ID Inventario</th>
              <th>Fecha Ingreso</th>
              <th>Cantidad</th>
              <th>Estado</th>
              <th>ID Producto</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="inventario in inventarios" :key="inventario.idInventario">
              <td>{{ inventario.idInventario }}</td>
              <td>{{ inventario.fechaIngreso }}</td>
              <td>{{ inventario.cantidad }}</td>
              <td>{{ inventario.estado === 1 ? 'ACTIVO' : 'INACTIVO' }}</td>
              <td>{{ inventario.idProducto }}</td>
              <td>
                <button @click="mostrarModalActualizar(inventario)" class="btn-actualizar">Actualizar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No hay inventarios disponibles.</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        inventarios: [],
        mostrarModal: false,
        mostrarModalActualizarInventario: false,
        InventarioSeleccionado: {},
        nuevoInventario: {
          fechaIngreso: "",
          cantidad: "",
          estado: 1,
          idProducto: null,
        },
      };
    },
    created() {
      this.obtenerInventarios();
    },
    methods: {
      async obtenerInventarios() {
        try {
          const response = await axios.get("http://localhost:5000/inventarios/activos");
          this.inventarios = response.data;
        } catch (error) {
          console.error("Error al obtener los inventarios:", error);
        }
      },
      mostrarModalCrear() {
        this.mostrarModal = true;
      },
      cerrarModal() {
        this.mostrarModal = false;
        this.limpiarFormulario();
      },
      async crearInventario() {
        try {
          const response = await axios.post("http://localhost:5000/inventarios", this.nuevoInventario);
          this.inventarios.push(response.data);
          this.cerrarModal();
        } catch (error) {
          console.error("Error al crear el inventario:", error);
        }
      },
      mostrarModalActualizar(inventario) {
        this.InventarioSeleccionado = { ...inventario };
        this.mostrarModalActualizarInventario = true;
      },
      cerrarModalActualizar() {
        this.mostrarModalActualizarInventario = false;
      },
      async actualizarInventario() {
        try {
          const response = await axios.put(`http://localhost:5000/inventarios/${this.InventarioSeleccionado.idInventario}`, {
            fechaIngreso: this.InventarioSeleccionado.fechaIngreso,
            cantidad: this.InventarioSeleccionado.cantidad,
            estado: this.InventarioSeleccionado.estado,
            idProducto: this.InventarioSeleccionado.idProducto,
          });
          const index = this.inventarios.findIndex(i => i.idInventario === response.data.idInventario);
          if (index !== -1) {
            this.inventarios.splice(index, 1, response.data);
          }
          this.cerrarModalActualizar();
        } catch (error) {
          console.error("Error al actualizar el inventario:", error);
        }
      },
      limpiarFormulario() {
        this.nuevoInventario = {
          fechaIngreso: "",
          cantidad: "",
          estado: 1,
          idProducto: null,
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
  
  .btn-actualizar-contrasenia {
    margin-top: 10px;
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
    color: #fff;
    background-color: #FF9800;
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
  
  .usuarios-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  
  .usuarios-table th,
  .usuarios-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .usuarios-table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  
  .usuarios-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .usuarios-table tr:hover {
    background-color: #ddd;
  }
  </style>
  