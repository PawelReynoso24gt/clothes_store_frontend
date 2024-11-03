<template>
  <div class="contenedor-principal">
    <h1 class="titulo-centrado">Lista de Tallas</h1>

    <!-- Botón para abrir el modal de crear Talla -->
    <button @click="mostrarModalCrearTalla" class="btn-crear">Crear Talla</button>

    <!-- Modal para crear Talla -->
    <div v-if="mostrarModalCrear" class="modal">
      <div class="modal-contenido">
        <span class="cerrar" @click="cerrarModalCrear">&times;</span>
        <h2>Crear Talla</h2>
        <form @submit.prevent="crearTalla">
          <div class="form-group">
            <label for="talla">Talla:</label>
            <input type="text" v-model="nuevaTalla.talla" id="talla" required />
          </div>
          <div class="form-group">
            <label for="estado">Estado:</label>
            <select v-model="nuevaTalla.estado" id="estado" required>
              <option value="1">Activo</option>
              <option value="0">Inactivo</option>
            </select>
          </div>
          <button type="submit" class="btn-enviar">Crear</button>
          <button type="button" class="btn-cerrar" @click="cerrarModalCrear">Cancelar</button>
        </form>
      </div>
    </div>

    <!-- Modal para actualizar Talla -->
    <div v-if="mostrarModalActualizar" class="modal">
      <div class="modal-contenido">
        <span class="cerrar" @click="cerrarModalActualizar">&times;</span>
        <h2>Actualizar Talla</h2>
        <form @submit.prevent="actualizarTalla">
          <div class="form-group">
            <label for="talla">Talla:</label>
            <input type="text" v-model="tallaSeleccionada.talla" id="talla" required />
          </div>
          <div class="form-group">
            <label for="estado">Estado:</label>
            <select v-model="tallaSeleccionada.estado" id="estado" required>
              <option value="1">Activo</option>
              <option value="0">Inactivo</option>
            </select>
          </div>
          <button type="submit" class="btn-enviar">Actualizar</button>
          <button type="button" class="btn-cerrar" @click="cerrarModalActualizar">Cancelar</button>
        </form>
      </div>
    </div>

    <!-- Tabla de Tallas Activas -->
    <div class="tabla-contenedor">
      <table v-if="tallasActivas.length" class="inventarios-table">
        <thead>
          <tr>
            <th>ID Talla</th>
            <th>Talla</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="talla in tallasActivas" :key="talla.idTalla">
            <td>{{ talla.idTalla }}</td>
            <td>{{ talla.talla }}</td>
            <td>{{ talla.estado === 1 ? 'Activo' : 'Inactivo' }}</td>
            <td>
              <button @click="mostrarModalActualizarTalla(talla)" class="btn-actualizar">Actualizar</button>
              <button @click="desactivarTalla(talla)" class="btn-desactivar">Desactivar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No hay tallas activas disponibles.</p>
    </div>

    <button @click="abrirModalTallasInactivas" class="btn-ver-inactivos">Ver Tallas Inactivas</button>

    <!-- Modal para ver Tallas Inactivas -->
    <div v-if="mostrarModalTallasInactivas" class="modal">
      <div class="modal-contenido modal-grande">
        <span class="cerrar" @click="cerrarModalTallasInactivas">&times;</span>
        <h2>Tallas Inactivas</h2>
        <table v-if="tallasInactivas.length" class="inventarios-table">
          <thead>
            <tr>
              <th>ID Talla</th>
              <th>Talla</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="talla in tallasInactivas" :key="talla.idTalla">
              <td>{{ talla.idTalla }}</td>
              <td>{{ talla.talla }}</td>
              <td>{{ talla.estado === 1 ? 'Activo' : 'Inactivo' }}</td>
              <td>
                <button @click="activarTalla(talla)" class="btn-activar">Activar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No hay tallas inactivas disponibles.</p>
        <button @click="cerrarModalTallasInactivas" class="btn-cerrar">Cerrar</button>
      </div>
    </div>

    <!-- CRUD de Detalle Tallas -->
    <h1 class="titulo-centrado">Detalle de Talla</h1>
    <button @click="mostrarModalCrearDetalle" class="btn-crear">Crear Detalle Talla</button>

    <!-- Modal para crear Detalle Talla -->
    <div v-if="isModalCrearDetalleVisible" class="modal">
      <div class="modal-contenido">
        <span class="cerrar" @click="cerrarModalCrearDetalle">&times;</span>
        <h2>Crear Detalle Talla</h2>
        <form @submit.prevent="crearDetalleTalla">
          <div class="form-group">
            <label for="idTalla">Talla:</label>
            <select v-model="nuevoDetalle.idTalla" id="idTalla" required>
              <option v-for="talla in tallas" :key="talla.idTalla" :value="talla.idTalla">
                {{ talla.talla }}
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

    <!-- Modal para actualizar Detalle Talla -->
    <div v-if="isModalActualizarDetalleVisible" class="modal">
      <div class="modal-contenido">
        <span class="cerrar" @click="cerrarModalActualizarDetalle">&times;</span>
        <h2>Actualizar Detalle Talla</h2>
        <form @submit.prevent="actualizarDetalleTalla">
          <div class="form-group">
            <label for="idTalla">Talla:</label>
            <select v-model="detalleSeleccionado.idTalla" id="idTalla" required>
              <option v-for="talla in tallas" :key="talla.idTalla" :value="talla.idTalla">
                {{ talla.talla }}
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
    <!-- Tabla de Detalle Tallas Activas -->
    <div class="tabla-contenedor">
      <table v-if="detallesTallasActivos.length" class="inventarios-table">
        <thead>
          <tr>
            <th>ID Detalle</th>
            <th>Producto</th>
            <th>Talla</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="detalle in detallesTallasActivos" :key="detalle.idDetalleTalla">
            <td>{{ detalle.idDetalleTalla }}</td>
            <td>{{ detalle.productoNombre }}</td>
            <td>{{ detalle.tallaNombre }}</td>
            <td>{{ detalle.estado === 1 ? 'Activo' : 'Inactivo' }}</td>
            <td>
              <button @click="mostrarModalActualizarDetalle(detalle)" class="btn-actualizar">Actualizar</button>
              <button @click="desactivarDetalleTalla(detalle)" class="btn-desactivar">Desactivar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No hay detalles de tallas activos disponibles.</p>
    </div>

    <button @click="abrirModalDetallesInactivos" class="btn-ver-inactivos">Ver Detalles Tallas Inactivos</button>

    <!-- Modal para ver Detalles Tallas Inactivos -->
    <div v-if="mostrarModalDetallesInactivos" class="modal">
      <div class="modal-contenido modal-grande">
        <span class="cerrar" @click="cerrarModalDetallesInactivos">&times;</span>
        <h2>Detalles Tallas Inactivos</h2>
        <table v-if="detallesTallasInactivos.length" class="inventarios-table">
          <thead>
            <tr>
              <th>ID Detalle</th>
              <th>Producto</th>
              <th>Talla</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="detalle in detallesTallasInactivos" :key="detalle.idDetalleTalla">
              <td>{{ detalle.idDetalleTalla }}</td>
              <td>{{ detalle.productoNombre }}</td>
              <td>{{ detalle.tallaNombre }}</td>
              <td>
                <button @click="activarDetalleTalla(detalle)" class="btn-activar">Activar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No hay detalles de tallas inactivos disponibles.</p>
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
      tallas: [],
      productos: [],
      detallesTallas: [],
      tallasInactivas: [],
      detallesTallasInactivos: [],
      mostrarModalCrear: false,
      mostrarModalActualizar: false,
      mostrarModalTallasInactivas: false,
      isModalCrearDetalleVisible: false, // Renombrado
      isModalActualizarDetalleVisible: false, // Renombrado
      mostrarModalDetallesInactivos: false,
      nuevaTalla: { talla: "", estado: 1 },
      tallaSeleccionada: {},
      nuevoDetalle: { idTalla: null, idProducto: null, estado: 1 },
      detalleSeleccionado: {},
    };
  },
  computed: {
    tallasActivas() {
      return this.tallas.filter((talla) => talla.estado === 1);
    },
    detallesTallasActivos() {
      return this.detallesTallas.filter((detalle) => detalle.estado === 1);
    },
  },
  created() {
    this.obtenerTallas();
    this.obtenerProductos();
    this.obtenerDetallesTallas();
  },
  methods: {
    async obtenerTallas() {
      const response = await axios.get("http://localhost:5000/talla");
      this.tallas = response.data;
    },
    async obtenerTallasInactivas() {
      const response = await axios.get("http://localhost:5000/talla/inactivos");
      this.tallasInactivas = response.data;
    },
    async obtenerProductos() {
      const response = await axios.get("http://localhost:5000/productos");
      this.productos = response.data;
    },
    async obtenerDetallesTallas() {
      const response = await axios.get("http://localhost:5000/detalleTallas");
      this.detallesTallas = response.data.map(detalle => ({
        ...detalle,
        productoNombre: this.obtenerProductoNombre(detalle.idProducto),
        tallaNombre: this.obtenerTallaNombre(detalle.idTalla)
      }));
    },
    async obtenerDetallesTallasInactivos() {
      const response = await axios.get("http://localhost:5000/detalleTallas/inactivos");
      this.detallesTallasInactivos = response.data.map(detalle => ({
        ...detalle,
        productoNombre: this.obtenerProductoNombre(detalle.idProducto),
        tallaNombre: this.obtenerTallaNombre(detalle.idTalla)
      }));
    },
    obtenerProductoNombre(id) {
      const producto = this.productos.find(p => p.idProducto === id);
      return producto ? producto.nombre : "Desconocido";
    },
    obtenerTallaNombre(id) {
      const talla = this.tallas.find(t => t.idTalla === id);
      return talla ? talla.talla : "Desconocido";
    },
    mostrarModalCrearTalla() {
      this.mostrarModalCrear = true;
    },
    cerrarModalCrear() {
      this.mostrarModalCrear = false;
      this.nuevaTalla = { talla: "", estado: 1 };
    },
    async crearTalla() {
      await axios.post("http://localhost:5000/talla/create", this.nuevaTalla);
      this.obtenerTallas();
      this.cerrarModalCrear();
    },
    mostrarModalActualizarTalla(talla) {
      this.tallaSeleccionada = { ...talla };
      this.mostrarModalActualizar = true;
    },
    cerrarModalActualizar() {
      this.mostrarModalActualizar = false;
      this.tallaSeleccionada = {};
    },
    async actualizarTalla() {
      await axios.put(`http://localhost:5000/talla/update/${this.tallaSeleccionada.idTalla}`, this.tallaSeleccionada);
      this.obtenerTallas();
      this.cerrarModalActualizar();
    },
    async desactivarTalla(talla) {
      talla.estado = 0;
      await axios.put(`http://localhost:5000/talla/update/${talla.idTalla}`, talla);
      this.obtenerTallas();
    },
    abrirModalTallasInactivas() {
      this.obtenerTallasInactivas();
      this.mostrarModalTallasInactivas = true;
    },
    cerrarModalTallasInactivas() {
      this.mostrarModalTallasInactivas = false;
    },
    async activarTalla(talla) {
      talla.estado = 1;
      await axios.put(`http://localhost:5000/talla/update/${talla.idTalla}`, talla);
      this.obtenerTallas();
    },
    mostrarModalCrearDetalle() {
      this.isModalCrearDetalleVisible = true;
    },
    cerrarModalCrearDetalle() {
      this.isModalCrearDetalleVisible = false;
      this.nuevoDetalle = { idTalla: null, idProducto: null, estado: 1 };
    },
    async crearDetalleTalla() {
      await axios.post("http://localhost:5000/detalleTallas/create", this.nuevoDetalle);
      this.obtenerDetallesTallas();
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
    async actualizarDetalleTalla() {
      await axios.put(`http://localhost:5000/detalleTallas/update/${this.detalleSeleccionado.idDetalleTalla}`, this.detalleSeleccionado);
      this.obtenerDetallesTallas();
      this.cerrarModalActualizarDetalle();
    },
    async desactivarDetalleTalla(detalle) {
      detalle.estado = 0;
      await axios.put(`http://localhost:5000/detalleTallas/update/${detalle.idDetalleTalla}`, detalle);
      this.obtenerDetallesTallas();
    },
    abrirModalDetallesInactivos() {
      this.obtenerDetallesTallasInactivos();
      this.mostrarModalDetallesInactivos = true;
    },
    cerrarModalDetallesInactivos() {
      this.mostrarModalDetallesInactivos = false;
    },
    async activarDetalleTalla(detalle) {
      detalle.estado = 1;
      await axios.put(`http://localhost:5000/detalleTallas/update/${detalle.idDetalleTalla}`, detalle);
      this.obtenerDetallesTallas();
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
