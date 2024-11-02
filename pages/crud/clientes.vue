<template>
    <div>
      <!-- Título del formulario -->
      <section id="titulo_crud">
        <div class="container">
          <h2 class="text-center mb-5">CRUD de Clientes</h2>
        </div>
      </section>
  
      <!-- Botón para crear cliente -->
      <button @click="mostrarModalCrear" class="btn-crear">Crear Cliente</button>
  
      <!-- Modal para crear/editar cliente -->
      <div v-if="mostrarModal" class="modal">
        <div class="modal-contenido">
          <span class="cerrar" @click="cerrarModal">&times;</span>
          <h2>{{ modoEdicion ? 'Actualizar Cliente' : 'Crear Cliente' }}</h2>
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="nombre">Nombre</label>
              <input
                type="text"
                v-model="cliente.nombre"
                id="nombre"
                name="nombre"
                class="form-control"
                placeholder="Nombre *"
                required
              />
            </div>
            <div class="form-group">
              <label for="edad">Edad</label>
              <input
                type="number"
                v-model="cliente.edad"
                id="edad"
                name="edad"
                class="form-control"
                placeholder="Edad *"
                required
              />
            </div>
            <div class="form-group">
              <label for="correo">Correo</label>
              <input
                type="email"
                v-model="cliente.correo"
                id="correo"
                name="correo"
                class="form-control"
                placeholder="Correo *"
                required
              />
            </div>
            <div class="form-group">
              <label for="telefono">Teléfono</label>
              <input
                type="text"
                v-model="cliente.telefono"
                id="telefono"
                name="telefono"
                class="form-control"
                placeholder="Teléfono *"
                required
              />
            </div>
            <div class="form-group">
              <label for="direccion">Dirección</label>
              <input
                type="text"
                v-model="cliente.direccion"
                id="direccion"
                name="direccion"
                class="form-control"
                placeholder="Dirección *"
                required
              />
            </div>
            <div class="form-group">
              <label for="idUsuario">Usuario</label>
              <select class="form-control" v-model="cliente.idUsuario" id="idUsuario" required>
                <option value="">Seleccione un usuario:</option>
                <option v-for="usuario in usuarios" :key="usuario.idUsuario" :value="usuario.idUsuario">
                  {{ usuario.usuario }}
                </option>
              </select>
            </div>
            <button type="submit" class="btn-enviar">{{ modoEdicion ? 'Actualizar' : 'Crear' }}</button>
            <button type="button" class="btn-cerrar" @click="cerrarModal">Cancelar</button>
          </form>
        </div>
      </div>
  
      <!-- Tabla de clientes activados -->
      <section id="clientes_table">
        <div class="container">
          <h3 class="text-center mb-4">Lista de Clientes Activados</h3>
          <table class="table">
            <thead>
              <tr>
                <th>ID Cliente</th>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Usuario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cliente in clientesActivos" :key="cliente.idCliente">
                <td>{{ cliente.idCliente }}</td>
                <td>{{ cliente.nombre }}</td>
                <td>{{ cliente.edad }}</td>
                <td>{{ cliente.correo }}</td>
                <td>{{ cliente.telefono }}</td>
                <td>{{ cliente.direccion }}</td>
                <td>{{ obtenerNombreUsuario(cliente.idUsuario) }}</td>
                <td>
                  <button @click="editarCliente(cliente)">Editar</button>
                  <button @click="confirmarDesactivacion(cliente.idCliente)">Desactivar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
  
      <!-- Tabla de clientes desactivados -->
      <section id="clientes_table_inactivos">
        <div class="container">
          <h3 class="text-center mb-4">Lista de Clientes Desactivados</h3>
          <table class="table">
            <thead>
              <tr>
                <th>ID Cliente</th>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Usuario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cliente in clientesInactivos" :key="cliente.idCliente">
                <td>{{ cliente.idCliente }}</td>
                <td>{{ cliente.nombre }}</td>
                <td>{{ cliente.edad }}</td>
                <td>{{ cliente.correo }}</td>
                <td>{{ cliente.telefono }}</td>
                <td>{{ cliente.direccion }}</td>
                <td>{{ obtenerNombreUsuario(cliente.idUsuario) }}</td>
                <td>
                  <button @click="confirmarActivacion(cliente.idCliente)">Activar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        cliente: {
          nombre: '',
          edad: '',
          correo: '',
          telefono: '',
          direccion: '',
          idUsuario: ''
        },
        clientesActivos: [], // Lista de clientes activos
        clientesInactivos: [], // Lista de clientes inactivos
        usuarios: [], // Lista de usuarios
        modoEdicion: false, // Variable para saber si se está editando
        clienteIdEdicion: null, // Almacena el ID del cliente que se está editando
        mostrarModal: false // Para controlar la visibilidad del modal
      };
    },
    created() {
      this.obtenerClientesActivos();
      this.obtenerClientesInactivos();
      this.obtenerUsuarios(); // Obtener la lista de usuarios al cargar el componente
    },
    methods: {
      mostrarModalCrear() {
        this.resetForm();
        this.mostrarModal = true; // Abrir el modal para crear cliente
      },
      cerrarModal() {
        this.mostrarModal = false; // Cerrar el modal
      },
      async obtenerClientesActivos() {
        try {
          const response = await axios.get('http://localhost:5000/clientes/activos');
          this.clientesActivos = response.data;
        } catch (error) {
          console.error('Error al obtener los clientes activos:', error);
        }
      },
      async obtenerClientesInactivos() {
        try {
          const response = await axios.get('http://localhost:5000/clientes/inactivos');
          this.clientesInactivos = response.data;
        } catch (error) {
          console.error('Error al obtener los clientes inactivos:', error);
        }
      },
      async obtenerUsuarios() {
        try {
          const response = await axios.get('http://localhost:5000/usuarios/all');
          this.usuarios = response.data;
        } catch (error) {
          console.error('Error al obtener los usuarios:', error);
        }
      },
      obtenerNombreUsuario(idUsuario) {
        const usuario = this.usuarios.find(user => user.idUsuario === idUsuario);
        return usuario ? usuario.usuario : 'Desconocido';
      },
      async handleSubmit() {
        if (this.modoEdicion) {
          await this.actualizarCliente();
        } else {
          await this.crearCliente();
        }
      },
      async crearCliente() {
        try {
          await axios.post('http://localhost:5000/clientes/create', this.cliente);
          this.resetForm();
          this.obtenerClientesActivos(); // Recargar la lista de clientes activos
          this.obtenerClientesInactivos(); // Recargar la lista de clientes inactivos
          this.cerrarModal(); // Cerrar el modal
        } catch (error) {
          console.error('Error al crear el cliente:', error);
        }
      },
      async actualizarCliente() {
        try {
          await axios.put(`http://localhost:5000/clientes/update/${this.clienteIdEdicion}`, this.cliente);
          this.resetForm();
          this.obtenerClientesActivos(); // Recargar la lista de clientes activos
          this.obtenerClientesInactivos(); // Recargar la lista de clientes inactivos
          this.cerrarModal(); // Cerrar el modal
        } catch (error) {
          console.error('Error al actualizar el cliente:', error);
        }
      },
      editarCliente(cliente) {
        this.cliente = { ...cliente }; // Cargar los datos del cliente en el formulario
        this.modoEdicion = true; // Cambiar a modo edición
        this.clienteIdEdicion = cliente.idCliente; // Guardar el ID del cliente que se está editando
        this.mostrarModal = true; // Abrir el modal
      },
      async confirmarDesactivacion(idCliente) {
        if (confirm('¿Estás seguro de que deseas desactivar este cliente?')) {
          await this.cambiarEstadoCliente(idCliente, 0); // Cambiar estado a inactivo
        }
      },
      async confirmarActivacion(idCliente) {
        if (confirm('¿Estás seguro de que deseas activar este cliente?')) {
          await this.cambiarEstadoCliente(idCliente, 1); // Cambiar estado a activo
        }
      },
      async cambiarEstadoCliente(idCliente, estado) {
        try {
          await axios.put(`http://localhost:5000/clientes/update/${idCliente}`, { estado });
          this.obtenerClientesActivos(); // Recargar la lista de clientes activos
          this.obtenerClientesInactivos(); // Recargar la lista de clientes inactivos
        } catch (error) {
          console.error('Error al cambiar el estado del cliente:', error);
        }
      },
      resetForm() {
        this.cliente = {
          nombre: '',
          edad: '',
          correo: '',
          telefono: '',
          direccion: '',
          idUsuario: ''
        };
        this.modoEdicion = false; // Resetear modo de edición
        this.clienteIdEdicion = null; // Resetear ID de edición
      }
    }
  };
  </script>
  
  <style>
  /* Estilos para el modal y otros elementos */
  .modal {
    display: block; /* Mostrar el modal */
    position: fixed;
    z-index: 1000; /* Asegurarse de que esté por encima de otros elementos */
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5); /* Fondo oscuro */
  }
  
  .modal-contenido {
    background-color: #fff;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Ancho del modal */
  }
  
  .cerrar {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .cerrar:hover,
  .cerrar:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  
  /* Estilos para tablas y botones */
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .table th,
  .table td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  .btn-crear,
  .btn-enviar,
  .btn-cerrar {
    margin-top: 10px;
    padding: 10px 15px;
    color: white;
    background-color: #28a745; /* Verde */
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn-crear {
    background-color: #007bff; /* Azul */
  }
  
  .btn-enviar {
    background-color: #007bff; /* Azul */
  }
  
  .btn-cerrar {
    background-color: #dc3545; /* Rojo */
  }
  </style>
  