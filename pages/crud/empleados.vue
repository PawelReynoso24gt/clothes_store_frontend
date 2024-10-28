<template>
    <div>
      <h1>Lista de Empleados</h1>
      <table v-if="empleados.length" class="empleados-table">
        <thead>
          <tr>
            <th>ID Empleado</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Usuario</th>
            <th>Estado</th>
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
          </tr>
        </tbody>
      </table>
      <p v-else>No hay empleados disponibles.</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        empleados: [],  // Donde guardaremos los empleados
      };
    },
    created() {
      this.obtenerEmpleados();
    },
    methods: {
      async obtenerEmpleados() {
        try {
          const response = await axios.get('http://localhost:5000/empleados');
          this.empleados = response.data;  // Guardamos los datos en empleados
        } catch (error) {
          console.error("Error al obtener los empleados:", error);
        }
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
  
  .empleados-table th, .empleados-table td {
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
  </style>
  