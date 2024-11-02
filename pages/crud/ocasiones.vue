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

    <!-- Formulario de asignación para Ocasiones y Productos -->
    <h2>Asignar Ocasión a Producto</h2>
    <form @submit.prevent="asignarOcasionAProducto">
      <select v-model="nuevaAsignacion.idProducto" required>
        <option disabled value="">Selecciona un Producto</option>
        <option v-for="producto in productos" :key="producto.idProducto" :value="producto.idProducto">
          {{ producto.nombre }}
        </option>
      </select>

      <select v-model="nuevaAsignacion.idOcasion" required>
        <option disabled value="">Selecciona una Ocasión</option>
        <option v-for="ocasion in ocasiones" :key="ocasion.idOcasion" :value="ocasion.idOcasion">
          {{ ocasion.ocasion }}
        </option>
      </select>

      <button type="submit">Asignar</button>
    </form>

    <!-- Tabla de asignaciones entre Ocasiones y Productos -->
    <h2>Relación de Ocasiones y Productos</h2>
    <table v-if="relaciones.length">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Ocasión</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rel in relaciones" :key="rel.idDetalleOcasion">
          <td>{{ rel.producto.nombre }}</td>
          <td>{{ rel.ocasione.ocasion }}</td>
          <td>
            <button @click="prepararEdicion(rel)">Editar</button>
            <button @click="eliminarAsignacion(rel.idDetalleOcasion)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No hay asignaciones de ocasiones a productos.</p>

    <!-- Formulario de edición de asignación -->
    <div v-if="asignacionEditando">
      <h2>Editar Asignación</h2>
      <form @submit.prevent="actualizarAsignacion">
        <select v-model="asignacionEditando.idProducto" required>
          <option disabled value="">Selecciona un Producto</option>
          <option v-for="producto in productos" :key="producto.idProducto" :value="producto.idProducto">
            {{ producto.nombre }}
          </option>
        </select>

        <select v-model="asignacionEditando.idOcasion" required>
          <option disabled value="">Selecciona una Ocasión</option>
          <option v-for="ocasion in ocasiones" :key="ocasion.idOcasion" :value="ocasion.idOcasion">
            {{ ocasion.ocasion }}
          </option>
        </select>

        <button type="submit">Actualizar</button>
        <button type="button" @click="cancelarEdicion">Cancelar</button>
      </form>
    </div>
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
      productos: [], // Lista de productos para asignación
      relaciones: [], // Relaciones entre ocasiones y productos
      nuevaAsignacion: {
        idProducto: "",
        idOcasion: "",
      },
      asignacionEditando: null, // Objeto para la asignación en edición
    };
  },
  created() {
    this.obtenerOcasiones();
    this.obtenerProductos();
    this.obtenerRelaciones();
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
          estado: this.nuevaOcasion.estado, // Estado inicial
        });
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
          estado: this.ocasionSeleccionada.estado, // Mantener el estado actual
        });

        const index = this.ocasiones.findIndex(o => o.idOcasion === response.data.idOcasion);
        if (index !== -1) {
          this.ocasiones.splice(index, 1, response.data); // Actualiza la ocasión en la lista
        }
        this.limpiarFormularioActualizacion();
      } catch (error) {
        console.error("Error al actualizar la ocasión:", error);
      }
    },

    // Método para eliminar una ocasión
    async eliminarOcasion(idOcasion) {
      const confirmacion = confirm("¿Estás seguro de que deseas eliminar esta ocasión?");
      if (!confirmacion) return;
      try {
        await axios.delete(`http://localhost:5000/ocasiones/delete/${idOcasion}`);
        this.ocasiones = this.ocasiones.filter(o => o.idOcasion !== idOcasion);
      } catch (error) {
        console.error("Error al eliminar la ocasión:", error);
      }
    },

    // Método para obtener productos
    async obtenerProductos() {
      try {
        const response = await axios.get("http://localhost:5000/productos");
        this.productos = response.data;
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    },

    // Método para obtener relaciones de detalleOcasiones
    async obtenerRelaciones() {
      try {
        const response = await axios.get("http://localhost:5000/detalleoc");
        this.relaciones = response.data;
      } catch (error) {
        console.error("Error al obtener las relaciones:", error);
      }
    },

    // Método para asignar ocasión a producto
    async asignarOcasionAProducto() {
      try {
        const response = await axios.post("http://localhost:5000/detalleoc/create", {
          idProducto: this.nuevaAsignacion.idProducto,
          idOcasion: this.nuevaAsignacion.idOcasion,
        });
        this.relaciones.push(response.data);
        this.limpiarFormularioAsignacion();
      } catch (error) {
        console.error("Error al asignar ocasión a producto:", error);
      }
    },

    // Método para eliminar una asignación
    async eliminarAsignacion(idDetalleOcasion) {
      try {
        await axios.delete(`http://localhost:5000/detalleoc/delete/${idDetalleOcasion}`);
        this.relaciones = this.relaciones.filter(rel => rel.idDetalleOcasion !== idDetalleOcasion);
      } catch (error) {
        console.error("Error al eliminar la asignación:", error);
      }
    },

    // Método para preparar la edición de una asignación
    prepararEdicion(rel) {
      this.asignacionEditando = { ...rel };
    },

    // Método para actualizar una asignación
    async actualizarAsignacion() {
      if (!this.asignacionEditando) return;
      try {
        const response = await axios.put(`http://localhost:5000/detalleoc/update/${this.asignacionEditando.idDetalleOcasion}`, {
          idProducto: this.asignacionEditando.idProducto,
          idOcasion: this.asignacionEditando.idOcasion,
        });

        const index = this.relaciones.findIndex(rel => rel.idDetalleOcasion === response.data.idDetalleOcasion);
        if (index !== -1) {
          this.relaciones.splice(index, 1, {
            ...response.data,
            producto: this.productos.find(p => p.idProducto === response.data.idProducto),
            ocasione: this.ocasiones.find(o => o.idOcasion === response.data.idOcasion),
          });
        }
        this.cancelarEdicion();
      } catch (error) {
        console.error("Error al actualizar la asignación:", error);
      }
    },

    // Método para cancelar la edición
    cancelarEdicion() {
      this.asignacionEditando = null;
    },

    // Métodos para limpiar formularios de creación y actualización
    limpiarFormulario() {
      this.nuevaOcasion = {
        ocasion: "",
        estado: 1,
      };
    },
    limpiarFormularioAsignacion() {
      this.nuevaAsignacion = {
        idProducto: "",
        idOcasion: "",
      };
    },
    limpiarFormularioActualizacion() {
      this.ocasionSeleccionada = null;
    },
  },
};
</script>

<style scoped>
.ocaciones-table,
.relaciones-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.ocaciones-table th,
.ocaciones-table td,
.relaciones-table th,
.relaciones-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.ocaciones-table th,
.relaciones-table th {
  background-color: #55679C;
  color: #E1D7B7;
  font-weight: bold;
}

.search-container,
.create-container,
.update-container {
  margin-bottom: 15px;
}
</style>
