<template>
    <div>
      <h1>Lista de Tallas</h1>
  
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
        tallas: [],  // Lista de tallas o resultado de la búsqueda
        searchId: "", // ID de búsqueda
        nuevaTalla: { // Datos de la nueva talla a crear
          talla: "",
          estado: 1, // Por defecto activo
        },
        tallaSeleccionada: null, // Datos de la talla que se va a actualizar
      };
    },
    created() {
      this.obtenerTallas();
    },
    methods: {
      // Método para obtener todas las tallas
      async obtenerTallas() {
        try {
          const response = await axios.get("http://localhost:5000/talla");
          this.tallas = response.data;
        } catch (error) {
          console.error("Error al obtener las tallas:", error);
        }
      },
      
      // Método para buscar una talla por ID
      async buscarTalla() {
        if (!this.searchId) {
          alert("Por favor ingresa un ID de talla.");
          return;
        }
        try {
          const response = await axios.get(`http://localhost:5000/talla/${this.searchId}`);
          this.tallas = response.data ? [response.data] : []; // Muestra el resultado en la tabla
        } catch (error) {
          console.error("Error al buscar la talla:", error);
          this.tallas = [];
        }
      },
      
      // Método para crear una nueva talla
      async crearTalla() {
        try {
          const response = await axios.post("http://localhost:5000/talla/create", {
            talla: this.nuevaTalla.talla,
            estado: this.nuevaTalla.estado // Estado inicial
          });
  
          // Agregar la nueva talla a la lista y limpiar el formulario
          this.tallas.push(response.data);
          this.limpiarFormulario();
        } catch (error) {
          console.error("Error al crear la talla:", error);
        }
      },
  
      // Método para cargar los datos de la talla seleccionada en el formulario de actualización
      cargarTalla(talla) {
        this.tallaSeleccionada = { ...talla }; // Clona la talla seleccionada
      },
  
      // Método para actualizar una talla
      async actualizarTalla() {
        if (!this.tallaSeleccionada) return; // Si no hay talla seleccionada, no hace nada
        try {
          const response = await axios.put(`http://localhost:5000/talla/update/${this.tallaSeleccionada.idTalla}`, {
            talla: this.tallaSeleccionada.talla,
            estado: this.tallaSeleccionada.estado // Mantener el estado actual
          });
  
          // Actualizar la talla en la lista
          const index = this.tallas.findIndex(t => t.idTalla === response.data.idTalla);
          if (index !== -1) {
            this.tallas.splice(index, 1, response.data); // Actualiza la talla en la lista
          }
  
          // Limpiar el formulario de actualización
          this.limpiarFormularioActualizacion();
        } catch (error) {
          console.error("Error al actualizar la talla:", error);
        }
      },
  
      // Método para eliminar una talla
      async eliminarTalla(idTalla) {
        const confirmacion = confirm("¿Estás seguro de que deseas eliminar esta talla?");
        if (!confirmacion) return; // Si el usuario cancela, no hace nada
        try {
          await axios.delete(`http://localhost:5000/talla/delete/${idTalla}`);
          
          // Eliminar la talla de la lista
          this.tallas = this.tallas.filter(t => t.idTalla !== idTalla);
        } catch (error) {
          console.error("Error al eliminar la talla:", error);
        }
      },
  
      // Método para limpiar el formulario de creación
      limpiarFormulario() {
        this.nuevaTalla = {
          talla: "",
          estado: 1 // Por defecto activo
        };
      },
  
      // Método para limpiar el formulario de actualización
      limpiarFormularioActualizacion() {
        this.tallaSeleccionada = null; // Resetea la talla seleccionada
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
    background-color: #f2f2f2;
    font-weight: bold;
  }
  
  .tallas-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .tallas-table tr:hover {
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
  