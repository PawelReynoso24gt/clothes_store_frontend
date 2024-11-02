<template>
  <div class="contenedor-principal">
    <h1 class="titulo-centrado">Lista de Ocasiones</h1>

    <!-- Botón para abrir el modal de crear Ocasión -->
    <button @click="mostrarModalCrearOcasion" class="btn-crear">Crear Ocasión</button>

    <!-- Modal para crear Ocasión -->
    <div v-if="mostrarModalCrear" class="modal">
      <div class="modal-contenido">
        <span class="cerrar" @click="cerrarModalCrear">&times;</span>
        <h2>Crear Ocasión</h2>
        <form @submit.prevent="crearOcasion">
          <div class="form-group">
            <label for="ocasion">Ocasión:</label>
            <input type="text" v-model="nuevaOcasion.ocasion" id="ocasion" required />
          </div>
          <div class="form-group">
            <label for="estado">Estado:</label>
            <select v-model="nuevaOcasion.estado" id="estado" required>
              <option value="1">Activo</option>
              <option value="0">Inactivo</option>
            </select>
          </div>
          <button type="submit" class="btn-enviar">Crear</button>
          <button type="button" class="btn-cerrar" @click="cerrarModalCrear">Cancelar</button>
        </form>
      </div>
    </div>

    <!-- Modal para actualizar Ocasión -->
    <div v-if="mostrarModalActualizar" class="modal">
      <div class="modal-contenido">
        <span class="cerrar" @click="cerrarModalActualizar">&times;</span>
        <h2>Actualizar Ocasión</h2>
        <form @submit.prevent="actualizarOcasion">
          <div class="form-group">
            <label for="ocasion">Ocasión:</label>
            <input type="text" v-model="ocasionSeleccionada.ocasion" id="ocasion" required />
          </div>
          <div class="form-group">
            <label for="estado">Estado:</label>
            <select v-model="ocasionSeleccionada.estado" id="estado" required>
              <option value="1">Activo</option>
              <option value="0">Inactivo</option>
            </select>
          </div>
          <button type="submit" class="btn-enviar">Actualizar</button>
          <button type="button" class="btn-cerrar" @click="cerrarModalActualizar">Cancelar</button>
        </form>
      </div>
    </div>

    <!-- Tabla de Ocasiones Activas -->
    <div class="tabla-contenedor">
      <table v-if="ocasionesActivas.length" class="inventarios-table">
        <thead>
          <tr>
            <th>ID Ocasión</th>
            <th>Ocasión</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ocasion in ocasionesActivas" :key="ocasion.idOcasion">
            <td>{{ ocasion.idOcasion }}</td>
            <td>{{ ocasion.ocasion }}</td>
            <td>{{ ocasion.estado === 1 ? 'Activo' : 'Inactivo' }}</td>
            <td>
              <button @click="mostrarModalActualizarOcasion(ocasion)" class="btn-actualizar">Actualizar</button>
              <button @click="desactivarOcasion(ocasion)" class="btn-desactivar">Desactivar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No hay ocasiones activas disponibles.</p>
    </div>

    <button @click="abrirModalOcasionesInactivas" class="btn-ver-inactivos">Ver Ocasiones Inactivas</button>

    <!-- Modal para ver Ocasiones Inactivas -->
    <div v-if="mostrarModalOcasionesInactivas" class="modal">
      <div class="modal-contenido modal-grande">
        <span class="cerrar" @click="cerrarModalOcasionesInactivas">&times;</span>
        <h2>Ocasiones Inactivas</h2>
        <table v-if="ocasionesInactivas.length" class="inventarios-table">
          <thead>
            <tr>
              <th>ID Ocasión</th>
              <th>Ocasión</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ocasion in ocasionesInactivas" :key="ocasion.idOcasion">
              <td>{{ ocasion.idOcasion }}</td>
              <td>{{ ocasion.ocasion }}</td>
              <td>{{ ocasion.estado === 1 ? 'Activo' : 'Inactivo' }}</td>
              <td>
                <button @click="activarOcasion(ocasion)" class="btn-activar">Activar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No hay ocasiones inactivas disponibles.</p>
        <button @click="cerrarModalOcasionesInactivas" class="btn-cerrar">Cerrar</button>
      </div>
    </div>

    <!-- CRUD de Detalle Ocasiones -->
    <h1 class="titulo-centrado">Detalle de Ocasión</h1>
    <button @click="mostrarModalCrearDetalle" class="btn-crear">Crear Detalle Ocasión</button>

    <!-- Modal para crear Detalle Ocasión -->
    <div v-if="isModalCrearDetalleVisible" class="modal">
      <div class="modal-contenido">
        <span class="cerrar" @click="cerrarModalCrearDetalle">&times;</span>
        <h2>Crear Detalle Ocasión</h2>
        <form @submit.prevent="crearDetalleOcasion">
          <div class="form-group">
            <label for="idOcasion">Ocasión:</label>
            <select v-model="nuevoDetalle.idOcasion" id="idOcasion" required>
              <option v-for="ocasion in ocasiones" :key="ocasion.idOcasion" :value="ocasion.idOcasion">
                {{ ocasion.ocasion }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="idProducto">Producto:</label>
            <select v-model="nuevoDetalle.idProducto" id="idProducto" required>
              <option v-for="producto in productos" :key="producto.idProducto" :value="producto.idProducto">
                {{ producto.nombre }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="estado">Estado:</label>
            <select v-model="nuevoDetalle.estado" id="estado" required>
              <option value="1">Activo</option>
              <option value="0">Inactivo</option>
            </select>
          </div>
          <button type="submit" class="btn-enviar">Crear</button>
          <button @click="cerrarModalCrearDetalle" class="btn-cerrar">Cancelar</button>
        </form>
      </div>
    </div>

    <!-- Modal para actualizar Detalle Ocasión -->
    <div v-if="isModalActualizarDetalleVisible" class="modal">
      <div class="modal-contenido">
        <span class="cerrar" @click="cerrarModalActualizarDetalle">&times;</span>
        <h2>Actualizar Detalle Ocasión</h2>
        <form @submit.prevent="actualizarDetalleOcasion">
          <div class="form-group">
            <label for="idOcasion">Ocasión:</label>
            <select v-model="detalleSeleccionado.idOcasion" id="idOcasion" required>
              <option v-for="ocasion in ocasiones" :key="ocasion.idOcasion" :value="ocasion.idOcasion">
                {{ ocasion.ocasion }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="idProducto">Producto:</label>
            <select v-model="detalleSeleccionado.idProducto" id="idProducto" required>
              <option v-for="producto in productos" :key="producto.idProducto" :value="producto.idProducto">
                {{ producto.nombre }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="estado">Estado:</label>
            <select v-model="detalleSeleccionado.estado" id="estado" required>
              <option value="1">Activo</option>
              <option value="0">Inactivo</option>
            </select>
          </div>
          <button type="submit" class="btn-enviar">Actualizar</button>
          <button @click="cerrarModalActualizarDetalle" class="btn-cerrar">Cancelar</button>
        </form>
      </div>
    </div>

    <!-- Tabla de Detalle Ocasiones Activas -->
    <div class="tabla-contenedor">
      <table v-if="detallesOcasionesActivos.length" class="inventarios-table">
        <thead>
          <tr>
            <th>ID Detalle</th>
            <th>Producto</th>
            <th>Ocasión</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="detalle in detallesOcasionesActivos" :key="detalle.idDetalleOcasion">
            <td>{{ detalle.idDetalleOcasion }}</td>
            <td>{{ detalle.productoNombre }}</td>
            <td>{{ detalle.ocasionNombre }}</td>
            <td>{{ detalle.estado === 1 ? 'Activo' : 'Inactivo' }}</td>
            <td>
              <button @click="mostrarModalActualizarDetalle(detalle)" class="btn-actualizar">Actualizar</button>
              <button @click="desactivarDetalleOcasion(detalle)" class="btn-desactivar">Desactivar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No hay detalles de ocasiones activos disponibles.</p>
    </div>

    <button @click="abrirModalDetallesInactivos" class="btn-ver-inactivos">Ver Detalles Ocasiones Inactivos</button>

    <!-- Modal para ver Detalles Ocasiones Inactivos -->
    <div v-if="mostrarModalDetallesInactivos" class="modal">
      <div class="modal-contenido modal-grande">
        <span class="cerrar" @click="cerrarModalDetallesInactivos">&times;</span>
        <h2>Detalles Ocasiones Inactivos</h2>
        <table v-if="detallesOcasionesInactivos.length" class="inventarios-table">
          <thead>
            <tr>
              <th>ID Detalle</th>
              <th>Producto</th>
              <th>Ocasión</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="detalle in detallesOcasionesInactivos" :key="detalle.idDetalleOcasion">
              <td>{{ detalle.idDetalleOcasion }}</td>
              <td>{{ detalle.productoNombre }}</td>
              <td>{{ detalle.ocasionNombre }}</td>
              <td>
                <button @click="activarDetalleOcasion(detalle)" class="btn-activar">Activar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No hay detalles de ocasiones inactivos disponibles.</p>
        <button @click="cerrarModalDetallesInactivos" class="btn-cerrar">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      ocasiones: [],
      productos: [],
      detallesOcasiones: [],
      ocasionesInactivas: [],
      detallesOcasionesInactivos: [],
      mostrarModalCrear: false,
      mostrarModalActualizar: false,
      mostrarModalOcasionesInactivas: false,
      isModalCrearDetalleVisible: false,
      isModalActualizarDetalleVisible: false,
      mostrarModalDetallesInactivos: false,
      nuevaOcasion: { ocasion: "", estado: 1 },
      ocasionSeleccionada: {},
      nuevoDetalle: { idOcasion: null, idProducto: null, estado: 1 },
      detalleSeleccionado: {},
    };
  },
  computed: {
    ocasionesActivas() {
      return this.ocasiones.filter((ocasion) => ocasion.estado === 1);
    },
    detallesOcasionesActivos() {
      return this.detallesOcasiones.filter((detalle) => detalle.estado === 1);
    },
  },
  created() {
    this.obtenerOcasiones();
    this.obtenerProductos();
    this.obtenerDetallesOcasiones();
  },
  methods: {
    async obtenerOcasiones() {
      const response = await axios.get("http://localhost:5000/ocasiones");
      this.ocasiones = response.data;
    },
    async obtenerOcasionesInactivas() {
      const response = await axios.get("http://localhost:5000/ocasiones/inactivos");
      this.ocasionesInactivas = response.data;
    },
    async obtenerProductos() {
      const response = await axios.get("http://localhost:5000/productos");
      this.productos = response.data;
    },
    async obtenerDetallesOcasiones() {
      const response = await axios.get("http://localhost:5000/detalleoc");
      this.detallesOcasiones = response.data.map(detalle => ({
        ...detalle,
        productoNombre: this.obtenerProductoNombre(detalle.idProducto),
        ocasionNombre: this.obtenerOcasionNombre(detalle.idOcasion)
      }));
    },
    async obtenerDetallesOcasionesInactivos() {
      const response = await axios.get("http://localhost:5000/detalleoc/inactivos");
      this.detallesOcasionesInactivos = response.data.map(detalle => ({
        ...detalle,
        productoNombre: this.obtenerProductoNombre(detalle.idProducto),
        ocasionNombre: this.obtenerOcasionNombre(detalle.idOcasion)
      }));
    },
    obtenerProductoNombre(id) {
      const producto = this.productos.find(p => p.idProducto === id);
      return producto ? producto.nombre : "Desconocido";
    },
    obtenerOcasionNombre(id) {
      const ocasion = this.ocasiones.find(o => o.idOcasion === id);
      return ocasion ? ocasion.ocasion : "Desconocido";
    },
    mostrarModalCrearOcasion() {
      this.mostrarModalCrear = true;
    },
    cerrarModalCrear() {
      this.mostrarModalCrear = false;
      this.nuevaOcasion = { ocasion: "", estado: 1 };
    },
    async crearOcasion() {
      await axios.post("http://localhost:5000/ocasiones/create", this.nuevaOcasion);
      this.obtenerOcasiones();
      this.cerrarModalCrear();
    },
    mostrarModalActualizarOcasion(ocasion) {
      this.ocasionSeleccionada = { ...ocasion };
      this.mostrarModalActualizar = true;
    },
    cerrarModalActualizar() {
      this.mostrarModalActualizar = false;
      this.ocasionSeleccionada = {};
    },
    async actualizarOcasion() {
      await axios.put(`http://localhost:5000/ocasiones/update/${this.ocasionSeleccionada.idOcasion}`, this.ocasionSeleccionada);
      this.obtenerOcasiones();
      this.cerrarModalActualizar();
    },
    async desactivarOcasion(ocasion) {
      ocasion.estado = 0;
      await axios.put(`http://localhost:5000/ocasiones/update/${ocasion.idOcasion}`, ocasion);
      this.obtenerOcasiones();
    },
    abrirModalOcasionesInactivas() {
      this.obtenerOcasionesInactivas();
      this.mostrarModalOcasionesInactivas = true;
    },
    cerrarModalOcasionesInactivas() {
      this.mostrarModalOcasionesInactivas = false;
    },
    async activarOcasion(ocasion) {
      ocasion.estado = 1;
      await axios.put(`http://localhost:5000/ocasiones/update/${ocasion.idOcasion}`, ocasion);
      this.obtenerOcasiones();
    },
    mostrarModalCrearDetalle() {
      this.isModalCrearDetalleVisible = true;
    },
    cerrarModalCrearDetalle() {
      this.isModalCrearDetalleVisible = false;
      this.nuevoDetalle = { idOcasion: null, idProducto: null, estado: 1 };
    },
    async crearDetalleOcasion() {
      await axios.post("http://localhost:5000/detalleoc/create", this.nuevoDetalle);
      this.obtenerDetallesOcasiones();
      this.cerrarModalCrearDetalle();
    },
    mostrarModalActualizarDetalle(detalle) {
      this.detalleSeleccionado = { ...detalle };
      this.isModalActualizarDetalleVisible = true;
    },
    cerrarModalActualizarDetalle() {
      this.isModalActualizarDetalleVisible = false;
      this.detalleSeleccionado = {};
    },
    async actualizarDetalleOcasion() {
      await axios.put(`http://localhost:5000/detalleoc/update/${this.detalleSeleccionado.idDetalleOcasion}`, this.detalleSeleccionado);
      this.obtenerDetallesOcasiones();
      this.cerrarModalActualizarDetalle();
    },
    async desactivarDetalleOcasion(detalle) {
      detalle.estado = 0;
      await axios.put(`http://localhost:5000/detalleoc/update/${detalle.idDetalleOcasion}`, detalle);
      this.obtenerDetallesOcasiones();
    },
    abrirModalDetallesInactivos() {
      this.obtenerDetallesOcasionesInactivos();
      this.mostrarModalDetallesInactivos = true;
    },
    cerrarModalDetallesInactivos() {
      this.mostrarModalDetallesInactivos = false;
    },
    async activarDetalleOcasion(detalle) {
      detalle.estado = 1;
      await axios.put(`http://localhost:5000/detalleoc/update/${detalle.idDetalleOcasion}`, detalle);
      this.obtenerDetallesOcasiones();
    },
  },
};
</script>

<style scoped>
.contenedor-principal {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.titulo-centrado {
  text-align: center;
}

.tabla-contenedor {
  width: 80%;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  margin-top: 20px;
}

.btn-crear,
.btn-ver-inactivos {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.btn-desactivar {
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  color: #fff;
  background-color: #f44336;
  border: none;
  border-radius: 4px;
}

.btn-activar {
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  color: #fff;
  background-color: #4CAF50;
  border: none;
  border-radius: 4px;
}

.btn-actualizar {
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  color: #fff;
  background-color: #2196F3;
  border: none;
  border-radius: 4px;
}

.btn-cerrar {
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  color: #fff;
  background-color: #777;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-contenido {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-grande {
  width: 600px;
}

.cerrar {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.btn-enviar {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.inventarios-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.inventarios-table th,
.inventarios-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  font-size: 14px;
}

.inventarios-table th {
  background-color: #f7f7f7;
  color: #333;
  font-weight: bold;
}

.inventarios-table td {
  color: #555;
}

.inventarios-table tr:hover {
  background-color: #ddd;
}
</style>
