<template>
  <div>
    <!-- Título del formulario -->
    <section id="titulo_crud">
      <div class="container">
        <h2 class="text-center mb-5">CRUD de Descuentos</h2>
      </div>
    </section>

    <!-- Descuento Form Area -->
    <section id="descuento_form" class="ptb-100">
      <div class="container">
        <form @submit.prevent="handleSubmit">
          <div class="row">
            <!-- Descuento -->
            <div class="col-lg-6 col-md-12 col-sm-12 col-12">
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
            </div>

            <!-- Descripción -->
            <div class="col-lg-6 col-md-12 col-sm-12 col-12">
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
            </div>

            <!-- Botones -->
            <div class="col-lg-12 col-md-12 col-sm-12 col-12">
              <button type="submit" class="theme-btn-one btn-black-overlay btn_sm">Guardar Descuento</button>
            </div>
          </div>
        </form>
      </div>
    </section>

    <!-- Tabla de descuentos -->
    <section id="descuentos_table">
      <div class="container">
        <h3 class="text-center mb-4">Lista de Descuentos</h3>
        <table class="table">
          <thead>
            <tr>
              <th>ID Descuento</th>
              <th>Descuento (%)</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="descuento in descuentos" :key="descuento.idDescuento">
              <td>{{ descuento.idDescuento }}</td>
              <td>{{ descuento.descuento}}</td> <!-- Mostrar el descuento con dos decimales -->
              <td>{{ descuento.descripcion }}</td>
              <td>{{ descuento.estado === 1 ? 'Activo' : 'Inactivo' }}</td>
              <td>
                <button @click="editarDescuento(descuento)">Editar</button>
                <button @click="confirmarEliminacion(descuento.idDescuento)">Eliminar</button>
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
        estado: 1 // Por defecto, el estado es activo
      },
      descuentos: [],
      modoEdicion: false,
      descuentoIdEdicion: null
    };
  },
  created() {
    this.obtenerDescuentos();
  },
  methods: {
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
        this.resetForm();
        this.obtenerDescuentos();
      } catch (error) {
        console.error('Error al crear el descuento:', error);
      }
    },
    async actualizarDescuento() {
      try {
        await axios.put(`http://localhost:5000/descuentos/update/${this.descuentoIdEdicion}`, this.descuento);
        this.resetForm();
        this.obtenerDescuentos();
      } catch (error) {
        console.error('Error al actualizar el descuento:', error);
      }
    },
    editarDescuento(descuento) {
      this.descuento = { ...descuento };
      this.modoEdicion = true;
      this.descuentoIdEdicion = descuento.idDescuento;
    },
    confirmarEliminacion(idDescuento) {
      if (confirm('¿Estás seguro de que deseas eliminar este descuento?')) {
        this.eliminarDescuento(idDescuento);
      }
    },
    async eliminarDescuento(idDescuento) {
      try {
        await axios.delete(`http://localhost:5000/descuentos/delete/${idDescuento}`);
        this.obtenerDescuentos();
      } catch (error) {
        console.error('Error al eliminar el descuento:', error);
      }
    },
    resetForm() {
      this.descuento = {
        descuento: '',
        descripcion: '',
        estado: 1
      };
      this.modoEdicion = false;
      this.descuentoIdEdicion = null;
    }
  }
};
</script>

<style scoped>
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
