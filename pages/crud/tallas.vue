<template>
    <div>
      <h2>Lista de Tallas</h2>
  
      <!-- Campo de búsqueda -->
      <div class="search-container">
        <input
          type="number"
          v-model="searchId"
          placeholder="Buscar talla por ID"
        />
        <button @click="buscarTalla">Buscar</button>
        <button @click="obtenerTallas">Mostrar Todos</button>
      </div>
  
      <!-- Formulario para crear una nueva talla -->
      <div class="create-container">
        <h2>Crear Nueva Talla</h2>
        <form @submit.prevent="crearTalla">
          <input type="text" v-model="nuevaTalla.talla" placeholder="Talla" required />
          <select v-model="nuevaTalla.estado" required>
            <option value="1">Activo</option>
            <option value="0">Inactivo</option>
          </select>
          <button type="submit">Crear Talla</button>
        </form>
      </div>
  
      <!-- Formulario para actualizar una talla -->
      <div class="update-container" v-if="tallaSeleccionada">
        <h2>Actualizar Talla</h2>
        <form @submit.prevent="actualizarTalla">
          <input type="text" v-model="tallaSeleccionada.talla" placeholder="Talla" required />
          <select v-model="tallaSeleccionada.estado" required>
            <option value="1">Activo</option>
            <option value="0">Inactivo</option>
          </select>
          <button type="submit">Actualizar Talla</button>
        </form>
      </div>
  
      <!-- Tabla de tallas -->
      <table v-if="tallas.length" class="tallas-table">
        <thead>
          <tr>
            <th>ID Talla</th>
            <th>Talla</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="talla in tallas" :key="talla.idTalla">
            <td>{{ talla.idTalla }}</td>
            <td>{{ talla.talla }}</td>
            <td>{{ talla.estado === 1 ? 'Activo' : 'Inactivo' }}</td>
            <td>
              <button @click="cargarTalla(talla)">Editar</button>
              <button @click="eliminarTalla(talla.idTalla)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No hay tallas disponibles.</p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        tallas: [],
        searchId: "",
        nuevaTalla: {
          talla: "",
          estado: 1,
        },
        tallaSeleccionada: null,
      };
    },
    created() {
      this.obtenerTallas();
    },
    methods: {
      async obtenerTallas() {
        try {
          const response = await axios.get("http://localhost:5000/talla");
          this.tallas = response.data;
        } catch (error) {
          console.error("Error al obtener las tallas:", error);
        }
      },
      async buscarTalla() {
        if (!this.searchId) {
          alert("Por favor ingresa un ID de talla.");
          return;
        }
        try {
          const response = await axios.get(`http://localhost:5000/talla/${this.searchId}`);
          this.tallas = response.data ? [response.data] : [];
        } catch (error) {
          console.error("Error al buscar la talla:", error);
          this.tallas = [];
        }
      },
      async crearTalla() {
        try {
          const response = await axios.post("http://localhost:5000/talla/create", {
            talla: this.nuevaTalla.talla,
            estado: this.nuevaTalla.estado,
          });
          this.tallas.push(response.data);
          this.limpiarFormulario();
        } catch (error) {
          console.error("Error al crear la talla:", error);
        }
      },
      cargarTalla(talla) {
        this.tallaSeleccionada = { ...talla };
      },
      async actualizarTalla() {
        if (!this.tallaSeleccionada) return;
        try {
          const response = await axios.put(`http://localhost:5000/talla/update/${this.tallaSeleccionada.idTalla}`, {
            talla: this.tallaSeleccionada.talla,
            estado: this.tallaSeleccionada.estado,
          });
          const index = this.tallas.findIndex(t => t.idTalla === response.data.idTalla);
          if (index !== -1) {
            this.tallas.splice(index, 1, response.data);
          }
          this.limpiarFormularioActualizacion();
        } catch (error) {
          console.error("Error al actualizar la talla:", error);
        }
      },
      async eliminarTalla(idTalla) {
        const confirmacion = confirm("¿Estás seguro de que deseas eliminar esta talla?");
        if (!confirmacion) return;
        try {
          await axios.delete(`http://localhost:5000/talla/delete/${idTalla}`);
          this.tallas = this.tallas.filter(t => t.idTalla !== idTalla);
        } catch (error) {
          console.error("Error al eliminar la talla:", error);
        }
      },
      limpiarFormulario() {
        this.nuevaTalla = {
          talla: "",
          estado: 1,
        };
      },
      limpiarFormularioActualizacion() {
        this.tallaSeleccionada = null;
      },
    },
  };
  </script>
  
  <style scoped>
  .tallas-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  
  .tallas-table th,
  .tallas-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .tallas-table th {
    background-color: #55679C;
    color: #E1D7B7;
    font-weight: bold;
  }
  
  .tallas-table tr:nth-child(even) {
    background-color: #7C93C3;
  }
  
  .tallas-table tr:hover {
    background-color: #1E2A5E;
    color: #E1D7B7;
  }
  
  .search-container,
  .create-container,
  .update-container {
    margin-bottom: 15px;
    background-color: #E1D7B7;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .create-container h2,
  .update-container h2 {
    color: #55679C;
  }
  
  .search-container input,
  .create-container input,
  .update-container input,
  .create-container select,
  .update-container select {
    padding: 5px;
    margin-right: 10px;
    border: 1px solid #55679C;
    border-radius: 4px;
  }
  
  .search-container button,
  .create-container button,
  .update-container button {
    padding: 5px 10px;
    background-color: #1E2A5E;
    color: #E1D7B7;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .search-container button:hover,
  .create-container button:hover,
  .update-container button:hover {
    background-color: #7C93C3;
  }
  </style>
  