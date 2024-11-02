<template>
  <div>
    <!-- Sección de Listado de Tallas -->
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
    <br>
    <!-- Sección para Asignar Talla a Producto -->
    <h2>Asignar Talla a Producto</h2>

    <!-- Formulario de asignación -->
    <form @submit.prevent="asignarTallaAProducto">
      <select v-model="nuevaAsignacion.idProducto" required>
        <option disabled value="">Selecciona un Producto</option>
        <option v-for="producto in productos" :key="producto.idProducto" :value="producto.idProducto">
          {{ producto.nombre }}
        </option>
      </select>

      <select v-model="nuevaAsignacion.idTalla" required>
        <option disabled value="">Selecciona una Talla</option>
        <option v-for="talla in tallas" :key="talla.idTalla" :value="talla.idTalla">
          {{ talla.talla }}
        </option>
      </select>

      <button type="submit">Asignar</button>
    </form>

    <!-- Tabla de asignaciones -->
    <h2>Relación de Tallas y Productos</h2>
    <table v-if="relaciones.length">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Talla</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rel in relaciones" :key="rel.idDetalleTalla">
          <td>{{ rel.productoNombre }}</td>
          <td>{{ rel.tallaNombre }}</td>
          <td>
            <button @click="prepararEdicion(rel)">Editar</button>
            <button @click="eliminarAsignacion(rel.idDetalleTalla)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No hay asignaciones de tallas a productos.</p>

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

        <select v-model="asignacionEditando.idTalla" required>
          <option disabled value="">Selecciona una Talla</option>
          <option v-for="talla in tallas" :key="talla.idTalla" :value="talla.idTalla">
            {{ talla.talla }}
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
      tallas: [],
      productos: [],
      relaciones: [],
      searchId: "",
      nuevaTalla: { talla: "", estado: 1 },
      tallaSeleccionada: null,
      nuevaAsignacion: { idProducto: "", idTalla: "" },
      asignacionEditando: null,
    };
  },
  created() {
    this.obtenerTallas();
    this.obtenerProductos();
    this.obtenerRelaciones();
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
        const response = await axios.post("http://localhost:5000/talla/create", this.nuevaTalla);
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
        const response = await axios.put(`http://localhost:5000/talla/update/${this.tallaSeleccionada.idTalla}`, this.tallaSeleccionada);
        const index = this.tallas.findIndex(t => t.idTalla === response.data.idTalla);
        if (index !== -1) this.tallas.splice(index, 1, response.data);
        this.limpiarFormularioActualizacion();
      } catch (error) {
        console.error("Error al actualizar la talla:", error);
      }
    },
    async eliminarTalla(idTalla) {
      if (confirm("¿Estás seguro de que deseas eliminar esta talla?")) {
        try {
          await axios.delete(`http://localhost:5000/talla/delete/${idTalla}`);
          this.tallas = this.tallas.filter(t => t.idTalla !== idTalla);
        } catch (error) {
          console.error("Error al eliminar la talla:", error);
        }
      }
    },
    limpiarFormulario() {
      this.nuevaTalla = { talla: "", estado: 1 };
    },
    limpiarFormularioActualizacion() {
      this.tallaSeleccionada = null;
    },
    async obtenerProductos() {
      try {
        const response = await axios.get("http://localhost:5000/productos");
        this.productos = response.data;
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    },
    async obtenerRelaciones() {
      try {
        const response = await axios.get("http://localhost:5000/detalleTallas");
        const relaciones = response.data;
        
        // Mapeo para incluir nombre del producto y talla
        this.relaciones = relaciones.map(rel => ({
          ...rel,
          productoNombre: this.obtenerNombreProducto(rel.idProducto),
          tallaNombre: this.obtenerTalla(rel.idTalla),
        }));
      } catch (error) {
        console.error("Error al obtener las relaciones:", error);
      }
    },
    async asignarTallaAProducto() {
      try {
        const response = await axios.post("http://localhost:5000/detalleTallas/create", this.nuevaAsignacion);
        this.relaciones.push(response.data);
        this.nuevaAsignacion = { idProducto: "", idTalla: "" }; // Limpiar después de asignar
      } catch (error) {
        console.error("Error al asignar la talla al producto:", error);
      }
    },
    prepararEdicion(rel) {
      this.asignacionEditando = { ...rel };
    },
    async actualizarAsignacion() {
      if (!this.asignacionEditando) return;
      try {
        const response = await axios.put(`http://localhost:5000/detalleTallas/update/${this.asignacionEditando.idDetalleTalla}`, this.asignacionEditando);
        const index = this.relaciones.findIndex(r => r.idDetalleTalla === response.data.idDetalleTalla);
        if (index !== -1) this.relaciones.splice(index, 1, response.data);
        this.cancelarEdicion();
      } catch (error) {
        console.error("Error al actualizar la asignación:", error);
      }
    },
    async eliminarAsignacion(idDetalleTalla) {
      if (confirm("¿Estás seguro de que deseas eliminar esta asignación?")) {
        try {
          await axios.delete(`http://localhost:5000/detalleTallas/delete/${idDetalleTalla}`);
          this.relaciones = this.relaciones.filter(r => r.idDetalleTalla !== idDetalleTalla);
        } catch (error) {
          console.error("Error al eliminar la asignación:", error);
        }
      }
    },
    cancelarEdicion() {
      this.asignacionEditando = null;
    },
    obtenerNombreProducto(idProducto) {
      const producto = this.productos.find(p => p.idProducto === idProducto);
      return producto ? producto.nombre : "Desconocido"; // Retorna el nombre del producto
    },
    obtenerTalla(idTalla) {
      const talla = this.tallas.find(t => t.idTalla === idTalla);
      return talla ? talla.talla : "Desconocido"; // Retorna la talla
    },
  },
};
</script>

<style scoped>
.search-container {
  margin-bottom: 20px;
}
.create-container,
.update-container {
  margin: 20px 0;
}
.tallas-table,
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.tallas-table th,
table th {
  background-color: #f2f2f2;
}
.tallas-table th,
table th,
.tallas-table td,
table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
.tallas-table tr:hover,
table tr:hover {
  background-color: #f1f1f1;
}
button {
  margin-left: 5px;
}
</style>

