<template>
  <div>
    <!-- Título del formulario -->
    <section id="titulo_crud">
      <div class="container">
        <h2 class="text-center mb-5">CRUD de Productos</h2>
      </div>
    </section>

    <!-- Botón para crear producto -->
    <button @click="mostrarModalCrear" class="btn-crear">Crear Producto</button>

    <!-- Modal para crear/editar producto -->
    <div v-if="mostrarModal" class="modal">
      <div class="modal-contenido">
        <span class="cerrar" @click="cerrarModal">&times;</span>
        <h2>{{ modoEdicion ? 'Actualizar Producto' : 'Crear Producto' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="nombre">Nombre</label>
            <input type="text" v-model="producto.nombre" id="nombre" class="form-control" placeholder="Nombre *" required />
          </div>
          <div class="form-group">
            <label for="genero">Género</label>
            <select v-model="producto.genero" id="genero" class="form-control" required>
              <option value="">Selecciona un género</option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>
          <div class="form-group">
            <label for="color">Color</label>
            <input type="text" v-model="producto.color" id="color" class="form-control" placeholder="Color *" required />
          </div>
          <div class="form-group">
            <label for="descripcion">Descripción</label>
            <input type="text" v-model="producto.descripcion" id="descripcion" class="form-control" placeholder="Descripción *" required />
          </div>
          <div class="form-group">
            <label for="foto">Seleccionar Foto</label>
            <input type="file" @change="onFileChange" id="foto" class="form-control" accept="image/*" :required="!modoEdicion" />
          </div>
          <div class="form-group">
            <label for="precio">Precio</label>
            <input type="number" step="0.01" v-model="producto.precio" id="precio" class="form-control" placeholder="Precio *" required />
          </div>
          <div class="form-group">
            <label for="cantidad">Cantidad de Inventario</label>
            <input type="number" v-model="producto.cantidad" id="cantidad" class="form-control" placeholder="Cantidad *" required />
          </div>
          <button type="submit" class="btn-enviar">{{ modoEdicion ? 'Actualizar' : 'Crear' }}</button>
          <button type="button" class="btn-cerrar" @click="cerrarModal">Cancelar</button>
        </form>
      </div>
    </div>

    <!-- Tabla de productos -->
    <section id="productos_table">
      <div class="container">
        <h3 class="text-center mb-4">Lista de Productos Activos</h3>
        <table class="table">
          <thead>
            <tr>
              <th>ID Producto</th>
              <th>Nombre</th>
              <th>Género</th>
              <th>Color</th>
              <th>Descripción</th>
              <th>Foto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="producto in productosActivos" :key="producto.idProducto">
              <td>{{ producto.idProducto }}</td>
              <td>{{ producto.nombre }}</td>
              <td>{{ producto.genero }}</td>
              <td>{{ producto.color }}</td>
              <td>{{ producto.descripcion }}</td>
              <td><img :src="`http://localhost:5000/uploads/${producto.foto}`" alt="Foto" style="width: 50px; height: 50px;" /></td>
              <td>{{ producto.precio }}</td>
              <td>{{ producto.inventarios ? producto.inventarios.cantidad : 'Sin inventario' }}</td>
              <td>
                <button @click="editarProducto(producto)">Editar</button>
                <button @click="confirmarCambioEstado(producto.idProducto, 0)">Desactivar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <h3 class="text-center mb-4">Lista de Productos Inactivos</h3>
        <table class="table">
          <thead>
            <tr>
              <th>ID Producto</th>
              <th>Nombre</th>
              <th>Género</th>
              <th>Color</th>
              <th>Descripción</th>
              <th>Foto</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="producto in productosInactivos" :key="producto.idProducto">
              <td>{{ producto.idProducto }}</td>
              <td>{{ producto.nombre }}</td>
              <td>{{ producto.genero }}</td>
              <td>{{ producto.color }}</td>
              <td>{{ producto.descripcion }}</td>
              <td><img :src="`http://localhost:5000/uploads/${producto.foto}`" alt="Foto" style="width: 50px; height: 50px;" /></td>
              <td>{{ producto.precio }}</td>
              <td>
                <button @click="editarProducto(producto)">Editar</button>
                <button @click="confirmarCambioEstado(producto.idProducto, 1)">Activar</button>
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
      producto: {
        nombre: '',
        genero: '',
        color: '',
        descripcion: '',
        estado: 1,
        foto: null,
        precio: null,
        cantidad: null
      },
      productos: [],
      modoEdicion: false,
      productoIdEdicion: null,
      mostrarModal: false,
    };
  },
  computed: {
    productosActivos() {
      return this.productos.filter(producto => producto.estado === 1);
    },
    productosInactivos() {
      return this.productos.filter(producto => producto.estado === 0);
    },
  },
  created() {
    this.obtenerProductos();
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        this.producto.foto = file;
      } else {
        alert('Por favor, selecciona un archivo de imagen válido.');
      }
    },
    mostrarModalCrear() {
      this.resetForm();
      this.mostrarModal = true;
    },
    cerrarModal() {
      this.mostrarModal = false;
    },
    async obtenerProductos() {
      try {
        const response = await axios.get('http://localhost:5000/productos');
        this.productos = response.data;

        for (let producto of this.productos) {
          if (!producto.inventarios || producto.inventarios.cantidad === 0) {
            producto.estado = 0;
            await axios.put(`http://localhost:5000/productos/update/${producto.idProducto}`, { estado: 0 });
          }
        }
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    },
    async handleSubmit() {
      if (this.modoEdicion) {
        await this.actualizarProducto();
      } else {
        await this.crearProducto();
      }
    },
    async crearProducto() {
      const formData = new FormData();
      Object.keys(this.producto).forEach(key => {
        formData.append(key, this.producto[key]);
      });
      try {
        await axios.post('http://localhost:5000/productos/inventario', formData);
        this.obtenerProductos();
        this.cerrarModal();
      } catch (error) {
        console.error('Error al crear el producto:', error);
      }
    },
    async actualizarProducto() {
      const formData = new FormData();
      Object.keys(this.producto).forEach(key => {
        formData.append(key, this.producto[key]);
      });

      try {
        // Actualizar el producto
        await axios.put(`http://localhost:5000/productos/${this.productoIdEdicion}/inventario`, formData);

        // Verificar si el inventario ya existe para el producto
        const producto = this.productos.find(p => p.idProducto === this.productoIdEdicion);
        if (producto.inventarios) {
          // Si el inventario existe, actualizar la cantidad
          await axios.put(`http://localhost:5000/inventarios/update/${producto.inventarios.idInventario}`, {
            cantidad: this.producto.cantidad
          });
        } else {
          // Si no existe inventario, crear uno nuevo con la cantidad ingresada
          await axios.post('http://localhost:5000/inventarios/create', {
            fechaIngreso: new Date(),
            cantidad: this.producto.cantidad,
            estado: 1,
            idProducto: this.productoIdEdicion
          });
        }

        this.obtenerProductos();
        this.cerrarModal();
      } catch (error) {
        console.error('Error al actualizar el producto o inventario:', error);
      }
    },
    editarProducto(producto) {
      this.producto = { ...producto, cantidad: producto.inventarios ? producto.inventarios.cantidad : null };
      this.modoEdicion = true;
      this.productoIdEdicion = producto.idProducto;
      this.mostrarModal = true;
    },
    async confirmarCambioEstado(idProducto, nuevoEstado) {
      const producto = this.productos.find(p => p.idProducto === idProducto);

      if (nuevoEstado === 1 && (!producto.inventarios || producto.inventarios.cantidad === 0)) {
        alert("El producto no puede ser activado porque no hay stock");
        return;
      }

      const mensaje = nuevoEstado === 1 ? 'activar' : 'desactivar';
      if (confirm(`¿Estás seguro de que deseas ${mensaje} este producto?`)) {
        try {
          await axios.put(`http://localhost:5000/productos/update/${idProducto}`, { estado: nuevoEstado });
          this.obtenerProductos();
        } catch (error) {
          console.error('Error al cambiar el estado del producto:', error);
        }
      }
    },
    resetForm() {
      this.producto = {
        nombre: '',
        genero: '',
        color: '',
        descripcion: '',
        estado: 1,
        foto: null,
        precio: null,
        cantidad: null
      };
      this.modoEdicion = false;
      this.productoIdEdicion = null;
    },
  },
};
</script>



<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto; /* Habilitar el desplazamiento si es necesario */
  background-color: rgba(0, 0, 0, 0.7); /* Fondo oscuro */
}

.modal-contenido {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px; /* Ancho máximo del modal */
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

.btn-crear {
  margin: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-enviar {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
}

.btn-cerrar {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}
</style>
