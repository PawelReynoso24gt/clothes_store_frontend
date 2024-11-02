<template>
  <div>
    <!-- Título del formulario -->
    <section id="titulo_crud">
      <div class="container">
        <h2 class="text-center mb-5">CRUD de Descuentos</h2>
      </div>
    </section>

    <!-- Botón para crear descuento -->
    <button @click="mostrarModalCrear" class="btn-crear">Crear Descuento</button>

    <!-- Modal para crear/editar descuento -->
    <div v-if="mostrarModal" class="modal">
      <div class="modal-contenido">
        <span class="cerrar" @click="cerrarModal">&times;</span>
        <h2>{{ modoEdicion ? 'Actualizar Descuento' : 'Crear Descuento' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="descuento">Descuento (%)</label>
            <input
              type="number"
              step="0.01"
              v-model="descuento.descuento"
              id="descuento"
              name="descuento"
              class="form-control"
              placeholder="Descuento *"
              required
            />
          </div>
          <div class="form-group">
            <label for="descripcion">Descripción</label>
            <input
              type="text"
              v-model="descuento.descripcion"
              id="descripcion"
              name="descripcion"
              class="form-control"
              placeholder="Descripción *"
              required
            />
          </div>
          <button type="submit" class="btn-enviar">{{ modoEdicion ? 'Actualizar' : 'Crear' }}</button>
          <button type="button" class="btn-cerrar" @click="cerrarModal">Cancelar</button>
        </form>
      </div>
    </div>

    <!-- Tablas de descuentos -->
    <section id="descuentos_table">
      <div class="container">
        <h3 class="text-center mb-4">Lista de Descuentos Activos</h3>
        <table class="table">
          <thead>
            <tr>
              <th>ID Descuento</th>
              <th>Descuento (%)</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="descuento in descuentosActivos" :key="descuento.idDescuento">
              <td>{{ descuento.idDescuento }}</td>
              <td>{{ descuento.descuento }}</td>
              <td>{{ descuento.descripcion }}</td>
              <td>
                <button @click="editarDescuento(descuento)">Editar</button>
                <button @click="confirmarCambioEstado(descuento.idDescuento, 0)">Desactivar</button>
              </td>
            </tr>
          </tbody>
        </table>

        <h3 class="text-center mb-4">Lista de Descuentos Inactivos</h3>
        <table class="table">
          <thead>
            <tr>
              <th>ID Descuento</th>
              <th>Descuento (%)</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="descuento in descuentosInactivos" :key="descuento.idDescuento">
              <td>{{ descuento.idDescuento }}</td>
              <td>{{ descuento.descuento }}</td>
              <td>{{ descuento.descripcion }}</td>
              <td>
                <button @click="editarDescuento(descuento)">Editar</button>
                <button @click="confirmarCambioEstado(descuento.idDescuento, 1)">Activar</button>
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
      descuento: {
        descuento: '',
        descripcion: '',
        estado: 1,
      },
      descuentos: [],
      modoEdicion: false,
      descuentoIdEdicion: null,
      mostrarModal: false,
    };
  },
  computed: {
    descuentosActivos() {
      return this.descuentos.filter(desc => desc.estado === 1);
    },
    descuentosInactivos() {
      return this.descuentos.filter(desc => desc.estado === 0);
    },
  },
  created() {
    this.obtenerDescuentos();
  },
  methods: {
    mostrarModalCrear() {
      this.resetForm();
      this.mostrarModal = true; // Abrir el modal para crear descuento
    },
    cerrarModal() {
      this.mostrarModal = false; // Cerrar el modal
    },
    async obtenerDescuentos() {
      try {
        const response = await axios.get('http://localhost:5000/descuentos');
        this.descuentos = response.data;
      } catch (error) {
        console.error('Error al obtener los descuentos:', error);
      }
    },
    async handleSubmit() {
      if (this.modoEdicion) {
        await this.actualizarDescuento();
      } else {
        await this.crearDescuento();
      }
    },
    async crearDescuento() {
      try {
        await axios.post('http://localhost:5000/descuentos/create', this.descuento);
        this.obtenerDescuentos(); // Recargar la lista de descuentos
        this.cerrarModal(); // Cerrar el modal
      } catch (error) {
        console.error('Error al crear el descuento:', error);
      }
    },
    async actualizarDescuento() {
      try {
        await axios.put(`http://localhost:5000/descuentos/update/${this.descuentoIdEdicion}`, this.descuento);
        this.obtenerDescuentos(); // Recargar la lista de descuentos
        this.cerrarModal(); // Cerrar el modal
      } catch (error) {
        console.error('Error al actualizar el descuento:', error);
      }
    },
    editarDescuento(descuento) {
      this.descuento = { ...descuento }; // Cargar los datos del descuento en el formulario
      this.modoEdicion = true; // Cambiar a modo edición
      this.descuentoIdEdicion = descuento.idDescuento; // Guardar el ID del descuento que se está editando
      this.mostrarModal = true; // Abrir el modal
    },
    async confirmarCambioEstado(idDescuento, nuevoEstado) {
      if (confirm('¿Estás seguro de que deseas cambiar el estado de este descuento?')) {
        await this.cambiarEstadoDescuento(idDescuento, nuevoEstado);
      }
    },
    async cambiarEstadoDescuento(idDescuento, estado) {
      try {
        await axios.put(`http://localhost:5000/descuentos/update/${idDescuento}`, { estado });
        this.obtenerDescuentos(); // Recargar la lista de descuentos
      } catch (error) {
        console.error('Error al cambiar el estado del descuento:', error);
      }
    },
    resetForm() {
      this.descuento = {
        descuento: '',
        descripcion: '',
        estado: 1,
      };
      this.modoEdicion = false; // Resetear modo de edición
      this.descuentoIdEdicion = null; // Resetear ID de edición
    }
  }
};
</script>

<style scoped>
.modal {
  display: block; /* Mostrar el modal */
  position: fixed;
  z-index: 1000; /* Asegurarse de que esté por encima de otros elementos */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo negro semi-transparente */
}
.modal-contenido {
  background-color: #fff;
  margin: 15% auto; /* Margen para centrar el modal */
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
.btn-crear,
.btn-enviar,
.btn-cerrar {
  margin: 10px;
}
.table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}
.table th,
.table td {
  border: 1px solid #ddd;
  padding: 8px;
}
.table th {
  background-color: #f2f2f2;
  font-weight: bold;
}
.table tr:nth-child(even) {
  background-color: #f9f9f9;
}
.table tr:hover {
  background-color: #ddd;
}
.form-group {
  margin-bottom: 15px;
}
</style>
