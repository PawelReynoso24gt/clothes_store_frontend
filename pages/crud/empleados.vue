<template>
    <div>
      <h1>Lista de Empleados</h1>
  
      <!-- Campo de búsqueda -->
      <div class="search-container">
        <input
          type="number"
          v-model="searchId"
          placeholder="Buscar empleado por ID"
        />
        <button @click="buscarEmpleado">Buscar</button>
        <button @click="obtenerEmpleados">Mostrar Todos</button>
      </div>
  
      <!-- Formulario para crear un nuevo empleado -->
      <div class="create-container">
        <h2>Crear Nuevo Empleado</h2>
        <form @submit.prevent="crearEmpleado">
          <input type="text" v-model="nuevoEmpleado.nombre" placeholder="Nombre" required />
          <input type="email" v-model="nuevoEmpleado.correo" placeholder="Correo" required />
          <input type="text" v-model="nuevoEmpleado.telefono" placeholder="Teléfono" required />
          <input type="number" v-model="nuevoEmpleado.idUsuario" placeholder="ID Usuario" required />
          <button type="submit">Crear Empleado</button>
        </form>
      </div>
  
      <!-- Formulario para actualizar un empleado -->
      <div class="update-container" v-if="empleadoSeleccionado">
        <h2>Actualizar Empleado</h2>
        <form @submit.prevent="actualizarEmpleado">
          <input type="text" v-model="empleadoSeleccionado.nombre" placeholder="Nombre" required />
          <input type="email" v-model="empleadoSeleccionado.correo" placeholder="Correo" required />
          <input type="text" v-model="empleadoSeleccionado.telefono" placeholder="Teléfono" required />
          <input type="number" v-model="empleadoSeleccionado.idUsuario" placeholder="ID Usuario" required />
          <button type="submit">Actualizar Empleado</button>
        </form>
      </div>
  
      <!-- Tabla de empleados -->
      <table v-if="empleados.length" class="empleados-table">
        <thead>
          <tr>
            <th>ID Empleado</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Usuario</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="empleado in empleados" :key="empleado.idEmpleado">
            <td>{{ empleado.idEmpleado }}</td>
            <td>{{ empleado.nombre }}</td>
            <td>{{ empleado.correo }}</td>
            <td>{{ empleado.telefono }}</td>
            <td>{{ empleado.usuario.usuario }}</td>
            <td>{{ empleado.estado === 1 ? 'Activo' : 'Inactivo' }}</td>
            <td>
              <button @click="cargarEmpleado(empleado)">Editar</button>
              <button @click="eliminarEmpleado(empleado.idEmpleado)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No hay empleados disponibles.</p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        empleados: [],  // Lista de empleados o resultado de la búsqueda
        searchId: "",   // ID de búsqueda
        nuevoEmpleado: { // Datos del nuevo empleado a crear
          nombre: "",
          correo: "",
          telefono: "",
          idUsuario: ""
        },
        empleadoSeleccionado: null, // Datos del empleado que se va a actualizar
      };
    },
    created() {
      this.obtenerEmpleados();
    },
    methods: {
      // Método para obtener todos los empleados
      async obtenerEmpleados() {
        try {
          const response = await axios.get("http://localhost:5000/empleados");
          this.empleados = response.data;
        } catch (error) {
          console.error("Error al obtener los empleados:", error);
        }
      },
      
      // Método para buscar un empleado por ID
      async buscarEmpleado() {
        if (!this.searchId) {
          alert("Por favor ingresa un ID de empleado.");
          return;
        }
        try {
          const response = await axios.get(`http://localhost:5000/empleados/${this.searchId}`);
          this.empleados = response.data ? [response.data] : []; // Muestra el resultado en la tabla
        } catch (error) {
          console.error("Error al buscar el empleado:", error);
          this.empleados = [];
        }
      },
      
      // Método para crear un nuevo empleado
      async crearEmpleado() {
        try {
          const response = await axios.post("http://localhost:5000/empleados/create", {
            nombre: this.nuevoEmpleado.nombre,
            correo: this.nuevoEmpleado.correo,
            telefono: this.nuevoEmpleado.telefono,
            idUsuario: this.nuevoEmpleado.idUsuario,
            estado: 1 // Puedes cambiarlo según sea necesario
          });
  
          // Agregar el nuevo empleado a la lista y limpiar el formulario
          this.empleados.push(response.data);
          this.limpiarFormulario();
        } catch (error) {
          console.error("Error al crear el empleado:", error);
        }
      },
  
      // Método para cargar los datos del empleado seleccionado en el formulario de actualización
      cargarEmpleado(empleado) {
        this.empleadoSeleccionado = { ...empleado }; // Clona el empleado seleccionado
      },
  
      // Método para actualizar un empleado
      async actualizarEmpleado() {
        if (!this.empleadoSeleccionado) return; // Si no hay empleado seleccionado, no hace nada
        try {
          const response = await axios.put(`http://localhost:5000/empleados/update/${this.empleadoSeleccionado.idEmpleado}`, {
            nombre: this.empleadoSeleccionado.nombre,
            correo: this.empleadoSeleccionado.correo,
            telefono: this.empleadoSeleccionado.telefono,
            idUsuario: this.empleadoSeleccionado.idUsuario,
            estado: this.empleadoSeleccionado.estado // Mantener el estado actual
          });
  
          // Actualizar el empleado en la lista
          const index = this.empleados.findIndex(emp => emp.idEmpleado === response.data.idEmpleado);
          if (index !== -1) {
            this.empleados.splice(index, 1, response.data); // Actualiza el empleado en la lista
          }
  
          // Limpiar el formulario de actualización
          this.limpiarFormularioActualizacion();
        } catch (error) {
          console.error("Error al actualizar el empleado:", error);
        }
      },
  
      // Método para eliminar un empleado
      async eliminarEmpleado(idEmpleado) {
        const confirmacion = confirm("¿Estás seguro de que deseas eliminar este empleado?");
        if (!confirmacion) return; // Si el usuario cancela, no hace nada
        try {
          await axios.delete(`http://localhost:5000/empleados/delete/${idEmpleado}`);
          
          // Eliminar el empleado de la lista
          this.empleados = this.empleados.filter(emp => emp.idEmpleado !== idEmpleado);
        } catch (error) {
          console.error("Error al eliminar el empleado:", error);
        }
      },
  
      // Método para limpiar el formulario de creación
      limpiarFormulario() {
        this.nuevoEmpleado = {
          nombre: "",
          correo: "",
          telefono: "",
          idUsuario: ""
        };
      },
  
      // Método para limpiar el formulario de actualización
      limpiarFormularioActualizacion() {
        this.empleadoSeleccionado = null; // Resetea el empleado seleccionado
      },
    },
  };
  </script>
  
  <style scoped>
  .empleados-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  
  .empleados-table th,
  .empleados-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .empleados-table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  
  .empleados-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .empleados-table tr:hover {
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
  