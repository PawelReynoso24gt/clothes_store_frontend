<template>
  <div class="contenedor-principal">
    <h1 class="titulo-centrado">Lista de Temporadas</h1>

    <!-- CRUD de Temporadas -->
    <button @click="mostrarModalCrear" class="btn-crear">Crear Temporada</button>
    
    <!-- Modal para crear Temporada -->
    <div v-if="mostrarModal" class="modal">
      <div class="modal-contenido">
        <span class="cerrar" @click="cerrarModal">&times;</span>
        <h2>Crear Temporada</h2>
        <form @submit.prevent="crearTemporada">
          <div class="form-group">
            <label for="temporada">Temporada:</label>
            <input type="text" v-model="nuevaTemporada.temporada" id="temporada" required />
          </div>
          <div class="form-group">
            <label for="estado">Estado:</label>
            <select v-model="nuevaTemporada.estado" id="estado" required>
              <option value="1">Activo</option>
              <option value="0">Inactivo</option>
            </select>
          </div>
          <button type="submit" class="btn-enviar">Crear</button>
          <button type="button" class="btn-cerrar" @click="cerrarModal">Cancelar</button>
        </form>
      </div>
    </div>

    <!-- Modal para actualizar Temporada -->
    <div v-if="mostrarModalActualizar" class="modal">
      <div class="modal-contenido">
        <span class="cerrar" @click="cerrarModalActualizar">&times;</span>
        <h2>Actualizar Temporada</h2>
        <form @submit.prevent="actualizarTemporada">
          <div class="form-group">
            <label for="temporada">Temporada:</label>
            <input type="text" v-model="temporadaSeleccionada.temporada" id="temporada" required />
          </div>
          <div class="form-group">
            <label for="estado">Estado:</label>
            <select v-model="temporadaSeleccionada.estado" id="estado" required>
              <option value="1">Activo</option>
              <option value="0">Inactivo</option>
            </select>
          </div>
          <button type="submit" class="btn-enviar">Actualizar</button>
          <button type="button" class="btn-cerrar" @click="cerrarModalActualizar">Cancelar</button>
        </form>
      </div>
    </div>

    <!-- Tabla de Temporadas -->
    <div class="tabla-contenedor">
      <table v-if="temporadasActivas.length" class="inventarios-table">
        <thead>
          <tr>
            <th>ID Temporada</th>
            <th>Temporada</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="temporada in temporadasActivas" :key="temporada.idTemporada">
            <td>{{ temporada.idTemporada }}</td>
            <td>{{ temporada.temporada }}</td>
            <td>{{ temporada.estado === 1 ? 'ACTIVO' : 'INACTIVO' }}</td>
            <td>
              <button @click="mostrarModalActualizarTemporada(temporada)" class="btn-actualizar">Actualizar</button>
              <button @click="desactivarTemporada(temporada)" class="btn-desactivar">Desactivar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No hay temporadas activas disponibles.</p>
    </div>

    <button @click="abrirModalTemporadasInactivas" class="btn-ver-inactivos">Ver Temporadas Inactivas</button>

    <!-- Modal para ver Temporadas Inactivas -->
    <div v-if="isTemporadasInactivasModalVisible" class="modal">
      <div class="modal-contenido modal-grande">
        <span class="cerrar" @click="cerrarModalTemporadasInactivas">&times;</span>
        <h2>Temporadas Inactivas</h2>
        <div class="tabla-contenedor">
          <table v-if="temporadasInactivas.length" class="inventarios-table">
            <thead>
              <tr>
                <th>ID Temporada</th>
                <th>Temporada</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="temporada in temporadasInactivas" :key="temporada.idTemporada">
                <td>{{ temporada.idTemporada }}</td>
                <td>{{ temporada.temporada }}</td>
                <td>{{ temporada.estado === 1 ? 'ACTIVO' : 'INACTIVO' }}</td>
                <td>
                  <button @click="activarTemporada(temporada)" class="btn-activar">Activar</button>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else>No hay temporadas inactivas disponibles.</p>
          <button type="button" class="btn-cerrar" @click="cerrarModalTemporadasInactivas">Cerrar</button>
        </div>
      </div>
    </div>

    <!-- CRUD de Detalle Temporadas -->
    <h1 class="titulo-centrado">Detalle de Temporada</h1>
    <button @click="mostrarModalCrearDetalle" class="btn-crear">Crear Detalle Temporada</button>

    <!-- Modal para crear Detalle Temporada -->
    <div v-if="mostrarModalDetalle" class="modal">
      <div class="modal-contenido">
        <span class="cerrar" @click="cerrarModalDetalle">&times;</span>
        <h2>Crear Detalle Temporada</h2>
        <form @submit.prevent="crearDetalleTemporada">
          <div class="form-group">
            <label for="idTemporada">Temporada:</label>
            <select v-model="nuevoDetalle.idTemporada" id="idTemporada" required>
              <option v-for="temporada in temporadas" :key="temporada.idTemporada" :value="temporada.idTemporada">
                {{ temporada.temporada }}
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
          <button type="button" class="btn-cerrar" @click="cerrarModalDetalle">Cancelar</button>
        </form>
      </div>
    </div>

    <!-- Modal para actualizar Detalle Temporada -->
    <div v-if="isModalActualizarDetalleVisible" class="modal">
      <div class="modal-contenido">
        <span class="cerrar" @click="cerrarModalActualizarDetalle">&times;</span>
        <h2>Actualizar Detalle Temporada</h2>
        <form @submit.prevent="actualizarDetalleTemporada">
          <div class="form-group">
            <label for="idTemporada">Temporada:</label>
            <select v-model="detalleSeleccionado.idTemporada" id="idTemporada" required>
              <option v-for="temporada in temporadas" :key="temporada.idTemporada" :value="temporada.idTemporada">
                {{ temporada.temporada }}
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
          <button type="button" class="btn-cerrar" @click="cerrarModalActualizarDetalle">Cancelar</button>
        </form>
      </div>
</div>

    <!-- Tabla de Detalle Temporada -->
    <div class="tabla-contenedor">
      <table v-if="detallesTemporadas.length" class="inventarios-table">
        <thead>
          <tr>
            <th>ID Detalle</th>
            <th>Temporada</th>
            <th>Producto</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="detalle in detallesTemporadas.filter(detalle => detalle.estado === 1)" :key="detalle.idDetalleTemporada">
            <td>{{ detalle.idDetalleTemporada }}</td>
            <td>{{ detalle.temporada ? detalle.temporada.temporada : 'N/A' }}</td>
            <td>{{ detalle.producto ? detalle.producto.nombre : 'N/A' }}</td>
            <td>{{ detalle.estado === 1 ? 'ACTIVO' : 'INACTIVO' }}</td>
            <td>
              <button @click="mostrarModalActualizarDetalle(detalle)" class="btn-actualizar">Actualizar</button>
              <button @click="desactivarDetalleTemporada(detalle)" class="btn-desactivar">Desactivar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No hay detalles de temporada disponibles.</p>
    </div>

    <div class="boton-inactivos-contenedor">
      <button @click="mostrarModalInactivos" class="btn-ver-inactivos">Ver Detalle Temporadas Inactivos</button>
    </div>

    <!-- Modal para ver Detalle Temporadas Inactivos -->
    <div v-if="mostrarModalDetalleTemporadasInactivos" class="modal">
      <div class="modal-contenido modal-grande">
        <span class="cerrar" @click="cerrarModalInactivos">&times;</span>
        <h2>Detalles temporadas Inactivos</h2>
        <div class="tabla-contenedor">
          <table v-if="detalleTemporadasInactivos.length" class="inventarios-table">
            <thead>
              <tr>
                <th>ID Detalle Temporada</th>
                <th>Temporada</th>
                <th>Producto</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="detalle in detalleTemporadasInactivos" :key="detalle.idDetalleTemporada">
                <td>{{ detalle.idDetalleTemporada }}</td>
                <td>{{ detalle.temporada ? detalle.temporada.temporada : 'N/A' }}</td>
                <td>{{ detalle.producto ? detalle.producto.nombre : 'N/A' }}</td>
                <td>{{ detalle.estado === 1 ? 'ACTIVO' : 'INACTIVO' }}</td>
                <td>
                  <button @click="activarInventario(detalle)" class="btn-activar">Activar</button>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else>No hay inventarios inactivos disponibles.</p>
          <button type="button" class="btn-cerrar" @click="cerrarModalInactivos">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      temporadas: [],
      productos: [],
      temporadasInactivas: [],
      detallesTemporadas: [],
      mostrarModal: false,
      mostrarModalDetalle: false,
      mostrarModalActualizar: false,
      isTemporadasInactivasModalVisible: false,
      isModalActualizarDetalleVisible: false,
      mostrarModalDetalleTemporadasInactivos: false,
      nuevaTemporada: { temporada: "", estado: 1 },
      nuevoDetalle: { idTemporada: null, idProducto: null, estado: 1 },
      temporadaSeleccionada: {},
      detalleSeleccionado: {},
    };
  },
  computed: {
    temporadasActivas() {
      return this.temporadas.filter((temporada) => temporada.estado === 1);
    },
    detalleTemporadasInactivos() {
      return this.detallesTemporadas.filter((detalle) => detalle.estado === 0);
    },
  },
  created() {
    this.obtenerTemporadas();
    this.obtenerProductos();
    this.obtenerDetallesTemporada();
  },
  methods: {
    async obtenerTemporadas() {
      try {
        const response = await axios.get("http://localhost:5000/temporada");
        this.temporadas = response.data;
      } catch (error) {
        console.error("Error al obtener las temporadas:", error);
      }
    },
    async obtenerTemporadasInactivas() {
      try {
        const response = await axios.get("http://localhost:5000/temporada/inactivas");
        this.temporadasInactivas = response.data; // Asegúrate de esta línea
      } catch (error) {
        console.error("Error al obtener las temporadas inactivas:", error);
      }
    },
    async obtenerProductos() {
      try {
        const response = await axios.get("http://localhost:5000/productos");
        this.productos = response.data;
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    },
    async obtenerDetallesTemporada() {
      try {
        const response = await axios.get("http://localhost:5000/detalletemp");
        this.detallesTemporadas = response.data;
      } catch (error) {
        console.error("Error al obtener los detalles de temporada:", error);
      }
    },
    mostrarModalCrear() {
      this.mostrarModal = true;
    },
    cerrarModal() {
      this.mostrarModal = false;
      this.nuevaTemporada = { temporada: "", estado: 1 };
    },
    async crearTemporada() {
      try {
        await axios.post("http://localhost:5000/temporada/create", this.nuevaTemporada);
        this.obtenerTemporadas();
        this.cerrarModal();
      } catch (error) {
        console.error("Error al crear la temporada:", error);
      }
    },
    mostrarModalActualizarTemporada(temporada) {
      this.temporadaSeleccionada = { ...temporada };
      this.mostrarModalActualizar = true;
    },
    cerrarModalActualizar() {
      this.mostrarModalActualizar = false;
    },
    async actualizarTemporada() {
      try {
        await axios.put(`http://localhost:5000/temporada/update/${this.temporadaSeleccionada.idTemporada}`, this.temporadaSeleccionada);
        this.obtenerTemporadas();
        this.cerrarModalActualizar();
      } catch (error) {
        console.error("Error al actualizar la temporada:", error);
      }
    },
    async desactivarTemporada(temporada) {
      try {
        temporada.estado = 0;
        await axios.put(`http://localhost:5000/temporada/update/${temporada.idTemporada}`, temporada);
        this.obtenerTemporadas();
      } catch (error) {
        console.error("Error al desactivar la temporada:", error);
      }
    },
    abrirModalTemporadasInactivas() {
      this.obtenerTemporadasInactivas();
      this.isTemporadasInactivasModalVisible = true;
    },
    cerrarModalTemporadasInactivas() {
      this.isTemporadasInactivasModalVisible = false;
    },
    async activarTemporada(temporada) {
      try {
        temporada.estado = 1;
        await axios.put(`http://localhost:5000/temporada/update/${temporada.idTemporada}`, temporada);
        this.obtenerTemporadas();
      } catch (error) {
        console.error("Error al activar la temporada:", error);
      }
    },
    mostrarModalCrearDetalle() {
      this.mostrarModalDetalle = true;
    },
    cerrarModalDetalle() {
      this.mostrarModalDetalle = false;
      this.nuevoDetalle = { idTemporada: null, idProducto: null, estado: 1 };
    },
    async crearDetalleTemporada() {
      try {
        await axios.post("http://localhost:5000/detalletemp/create", this.nuevoDetalle);
        this.obtenerDetallesTemporada();
        this.cerrarModalDetalle();
      } catch (error) {
        console.error("Error al crear el detalle de temporada:", error);
      }
    },
    mostrarModalActualizarDetalle(detalle) {
      this.detalleSeleccionado = { ...detalle };
      this.isModalActualizarDetalleVisible = true;
    },
    cerrarModalActualizarDetalle() {
      this.isModalActualizarDetalleVisible = false;
      this.detalleSeleccionado = {};
    },
    async actualizarDetalleTemporada() {
      try {
        await axios.put(`http://localhost:5000/detalletemp/update/${this.detalleSeleccionado.idDetalleTemporada}`, this.detalleSeleccionado);
        this.obtenerDetallesTemporada();
        this.cerrarModalActualizarDetalle();
      } catch (error) {
        console.error("Error al actualizar el detalle de temporada:", error);
      }
    },
    async desactivarDetalleTemporada(detalle) {
      try {
        detalle.estado = 0;
        await axios.put(`http://localhost:5000/detalletemp/update/${detalle.idDetalleTemporada}`, detalle);
        this.obtenerDetallesTemporada();
      } catch (error) {
        console.error("Error al desactivar el detalle de temporada:", error);
      }
    },//comentario
    mostrarModalInactivos() {
      this.mostrarModalDetalleTemporadasInactivos = true;
    },
    cerrarModalInactivos() {
      this.mostrarModalDetalleTemporadasInactivos = false;
    },
    async activarInventario(detalle) {
      try {
        detalle.estado = 1;
        await axios.put(`http://localhost:5000/detalletemp/update/${detalle.idDetalleTemporada}`, detalle);
        this.obtenerDetallesTemporada();
      } catch (error) {
        console.error("Error al activar el detalle de temporada:", error);
      }
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
    
    .boton-inactivos-contenedor {
      margin-top: 40px;
      text-align: center;
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
    
    .inventarios-tablee tr:hover {
      background-color: #ddd;
    }
    </style>
    