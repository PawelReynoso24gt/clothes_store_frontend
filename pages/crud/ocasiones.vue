<template>
    <div>
      <h1>Lista de Ocasiones</h1>
  
      <!-- Campo de búsqueda -->
      <div class="search-container">
        <input
          type="number"
          v-model="searchId"
          placeholder="Buscar ocasión por ID"
        />
        <button @click="buscarOcasion">Buscar</button>
        <button @click="obtenerOcasiones">Mostrar Todos</button>
      </div>
  
      <!-- Formulario para crear una nueva ocasión -->
      <div class="create-container">
        <h2>Crear Nueva Ocasión</h2>
        <form @submit.prevent="crearOcasion">
          <input type="text" v-model="nuevaOcasion.ocasion" placeholder="Ocasión" required />
          <select v-model="nuevaOcasion.estado" required>
            <option value="1">Activo</option>
            <option value="0">Inactivo</option>
          </select>
          <button type="submit">Crear Ocasión</button>
        </form>
      </div>
  
      <!-- Formulario para actualizar una ocasión -->
      <div class="update-container" v-if="ocasionSeleccionada">
        <h2>Actualizar Ocasión</h2>
        <form @submit.prevent="actualizarOcasion">
          <input type="text" v-model="ocasionSeleccionada.ocasion" placeholder="Ocasión" required />
          <select v-model="ocasionSeleccionada.estado" required>
            <option value="1">Activo</option>
            <option value="0">Inactivo</option>
          </select>
          <button type="submit">Actualizar Ocasión</button>
        </form>
      </div>
  
      <!-- Tabla de ocasiones -->
      <table v-if="ocasiones.length" class="ocasiones-table">
        <thead>
          <tr>
            <th>ID Ocasión</th>
            <th>Ocasión</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ocasion in ocasiones" :key="ocasion.idOcasion">
            <td>{{ ocasion.idOcasion }}</td>
            <td>{{ ocasion.ocasion }}</td>
            <td>{{ ocasion.estado === 1 ? 'Activo' : 'Inactivo' }}</td>
            <td>
              <button @click="cargarOcasion(ocasion)">Editar</button>
              <button @click="eliminarOcasion(ocasion.idOcasion)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No hay ocasiones disponibles.</p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        ocasiones: [], // Lista de ocasiones o resultado de la búsqueda
        searchId: "", // ID de búsqueda
        nuevaOcasion: { // Datos de la nueva ocasión a crear
          ocasion: "",
          estado: 1, // Por defecto activo
        },
        ocasionSeleccionada: null, // Datos de la ocasión que se va a actualizar
      };
    },
    created() {
      this.obtenerOcasiones();
    },
    methods: {
      // Método para obtener todas las ocasiones
      async obtenerOcasiones() {
        try {
          const response = await axios.get("http://localhost:5000/ocasiones");
          this.ocasiones = response.data;
        } catch (error) {
          console.error("Error al obtener las ocasiones:", error);
        }
      },
  
      // Método para buscar una ocasión por ID
      async buscarOcasion() {
        if (!this.searchId) {
          alert("Por favor ingresa un ID de ocasión.");
          return;
        }
        try {
          const response = await axios.get(`http://localhost:5000/ocasiones/${this.searchId}`);
          this.ocasiones = response.data ? [response.data] : []; // Muestra el resultado en la tabla
        } catch (error) {
          console.error("Error al buscar la ocasión:", error);
          this.ocasiones = [];
        }
      },
  
      // Método para crear una nueva ocasión
      async crearOcasion() {
        try {
          const response = await axios.post("http://localhost:5000/ocasiones/create", {
            ocasion: this.nuevaOcasion.ocasion,
            estado: this.nuevaOcasion.estado // Estado inicial
          });
  
          // Agregar la nueva ocasión a la lista y limpiar el formulario
          this.ocasiones.push(response.data);
          this.limpiarFormulario();
        } catch (error) {
          console.error("Error al crear la ocasión:", error);
        }
      },
  
      // Método para cargar los datos de la ocasión seleccionada en el formulario de actualización
      cargarOcasion(ocasion) {
        this.ocasionSeleccionada = { ...ocasion }; // Clona la ocasión seleccionada
      },
  
      // Método para actualizar una ocasión
      async actualizarOcasion() {
        if (!this.ocasionSeleccionada) return; // Si no hay ocasión seleccionada, no hace nada
        try {
          const response = await axios.put(`http://localhost:5000/ocasiones/update/${this.ocasionSeleccionada.idOcasion}`, {
            ocasion: this.ocasionSeleccionada.ocasion,
            estado: this.ocasionSeleccionada.estado // Mantener el estado actual
          });
  
          // Actualizar la ocasión en la lista
          const index = this.ocasiones.findIndex(o => o.idOcasion === response.data.idOcasion);
          if (index !== -1) {
            this.ocasiones.splice(index, 1, response.data); // Actualiza la ocasión en la lista
          }
  
          // Limpiar el formulario de actualización
          this.limpiarFormularioActualizacion();
        } catch (error) {
          console.error("Error al actualizar la ocasión:", error);
        }
      },
  
      // Método para eliminar una ocasión
      async eliminarOcasion(idOcasion) {
        const confirmacion = confirm("¿Estás seguro de que deseas eliminar esta ocasión?");
        if (!confirmacion) return; // Si el usuario cancela, no hace nada
        try {
          await axios.delete(`http://localhost:5000/ocasiones/delete/${idOcasion}`);
          
          // Eliminar la ocasión de la lista
          this.ocasiones = this.ocasiones.filter(o => o.idOcasion !== idOcasion);
        } catch (error) {
          console.error("Error al eliminar la ocasión:", error);
        }
      },
  
      // Método para limpiar el formulario de creación
      limpiarFormulario() {
        this.nuevaOcasion = {
          ocasion: "",
          estado: 1 // Por defecto activo
        };
      },
  
      // Método para limpiar el formulario de actualización
      limpiarFormularioActualizacion() {
        this.ocasionSeleccionada = null; // Resetea la ocasión seleccionada
      },
    },
  };
  </script>
  
  <style scoped>
  .ocasiones-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  
  .ocasiones-table th,
  .ocasiones-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .ocasiones-table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  
  .ocasiones-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .ocasiones-table tr:hover {
    background-color: #ddd;
  }
  
  .search-container,
  .create-container,
  .update-container {
    margin-bottom: 15px;
  }
  
  .create-container input,
  .update-container input {
    padding: 5px;
    margin-right: 10px;
  }
  
  .create-container button,
  .update-container button {
    padding: 5px 10px;
  }
  </style>
  