<template>
  <div>
    <!-- Título del formulario -->
    <section id="titulo_crud">
      <div class="container">
        <h2 class="text-center mb-5">CRUD de clientes</h2>
      </div>
    </section>

    <!-- Cliente Form Area -->
    <section id="cliente_form" class="ptb-100">
      <div class="container">
        <form @submit.prevent="handleSubmit">
          <div class="row">
            <!-- Nombre -->
            <div class="col-lg-6 col-md-12 col-sm-12 col-12">
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
            </div>

            <!-- Edad -->
            <div class="col-lg-6 col-md-12 col-sm-12 col-12">
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
            </div>

            <!-- Correo -->
            <div class="col-lg-6 col-md-12 col-sm-12 col-12">
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
            </div>

            <!-- Teléfono -->
            <div class="col-lg-6 col-md-12 col-sm-12 col-12">
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
            </div>

            <!-- Dirección -->
            <div class="col-lg-12 col-md-12 col-sm-12 col-12">
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
            </div>

            <!-- Usuario (Combobox) -->
            <div class="col-lg-12 col-md-12 col-sm-12 col-12">
              <div class="form-group">
                <label for="idUsuario">Usuario</label>
                <select class="form-control" v-model="cliente.idUsuario" id="idUsuario" required>
                  <option value="">Seleccione un usuario:</option>
                  <option v-for="usuario in usuarios" :key="usuario.idUsuario" :value="usuario.idUsuario">
                    {{ usuario.usuario }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Botones -->
            <div class="col-lg-12 col-md-12 col-sm-12 col-12">
              <button type="submit" class="theme-btn-one btn-black-overlay btn_sm">Guardar Cliente</button>
            </div>
          </div>
        </form>
      </div>
    </section>

    <!-- Tabla de clientes -->
    <section id="clientes_table">
      <div class="container">
        <h3 class="text-center mb-4">Lista de Clientes</h3>
        <table class="table">
          <thead>
            <tr>
              <th>ID Cliente</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Usuario</th> <!-- Columna para mostrar el nombre del usuario -->
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cliente in clientes" :key="cliente.idCliente">
              <td>{{ cliente.idCliente }}</td>
              <td>{{ cliente.nombre }}</td>
              <td>{{ cliente.edad }}</td>
              <td>{{ cliente.correo }}</td>
              <td>{{ cliente.telefono }}</td>
              <td>{{ cliente.direccion }}</td>
              <td>{{ obtenerNombreUsuario(cliente.idUsuario) }}</td> <!-- Mostrar el nombre del usuario -->
              <td>
                <button @click="editarCliente(cliente)">Editar</button>
                <button @click="confirmarEliminacion(cliente.idCliente)">Eliminar</button>
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
      clientes: [],
      usuarios: [], // Lista de usuarios
      modoEdicion: false, // Variable para saber si se está editando
      clienteIdEdicion: null // Almacena el ID del cliente que se está editando
    };
  },
  created() {
    this.obtenerClientes();
    this.obtenerUsuarios(); // Obtener la lista de usuarios al cargar el componente
  },
  methods: {
    async obtenerClientes() {
      try {
        const response = await axios.get('http://localhost:5000/clientes');
        this.clientes = response.data;
      } catch (error) {
        console.error('Error al obtener los clientes:', error);
      }
    },
    async obtenerUsuarios() {
      try {
        const response = await axios.get('http://localhost:5000/usuarios');
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
        this.obtenerClientes(); // Recargar la lista de clientes
      } catch (error) {
        console.error('Error al crear el cliente:', error);
      }
    },
    async actualizarCliente() {
      try {
        await axios.put(`http://localhost:5000/clientes/update/${this.clienteIdEdicion}`, this.cliente);
        this.resetForm();
        this.obtenerClientes(); // Recargar la lista de clientes
      } catch (error) {
        console.error('Error al actualizar el cliente:', error);
      }
    },
    editarCliente(cliente) {
      this.cliente = { ...cliente }; // Cargar los datos del cliente en el formulario
      this.modoEdicion = true; // Cambiar a modo edición
      this.clienteIdEdicion = cliente.idCliente; // Guardar el ID del cliente que se está editando
    },
    confirmarEliminacion(idCliente) {
      if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
        this.eliminarCliente(idCliente);
      }
    },
    async eliminarCliente(idCliente) {
      try {
        await axios.delete(`http://localhost:5000/clientes/delete/${idCliente}`);
        this.obtenerClientes(); // Recargar la lista de clientes
      } catch (error) {
        console.error('Error al eliminar el cliente:', error);
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
      this.modoEdicion = false; // Reiniciar modo de edición
      this.clienteIdEdicion = null; // Reiniciar ID de cliente en edición
    }
  }
};
</script>

<style scoped>
.clientes-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.clientes-table th,
.clientes-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.clientes-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.clientes-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.clientes-table tr:hover {
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
