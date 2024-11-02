<template>
  <div>
    <!-- Título del formulario -->
    <section id="titulo_crud">
      <div class="container">
        <h2 class="text-center mb-5">CRUD de Productos</h2>
      </div>
    </section>

    <!-- Producto Form Area -->
    <section id="producto_form" class="ptb-100">
      <div class="container">
        <form @submit.prevent="handleSubmit">
          <div class="row">
            <!-- Nombre -->
            <div class="col-lg-6 col-md-12 col-sm-12 col-12">
              <div class="form-group">
                <label for="nombre">Nombre</label>
                <input
                  type="text"
                  v-model="producto.nombre"
                  id="nombre"
                  name="nombre"
                  class="form-control"
                  placeholder="Nombre *"
                  required
                />
              </div>
            </div>

            <!-- Género -->
            <div class="col-lg-6 col-md-12 col-sm-12 col-12">
              <div class="form-group">
                <label for="genero">Género</label>
                <select v-model="producto.genero" id="genero" class="form-control" required>
                  <option value="">Selecciona un género</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>
            </div>

            <!-- Color -->
            <div class="col-lg-6 col-md-12 col-sm-12 col-12">
              <div class="form-group">
                <label for="color">Color</label>
                <input
                  type="text"
                  v-model="producto.color"
                  id="color"
                  name="color"
                  class="form-control"
                  placeholder="Color *"
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
                  v-model="producto.descripcion"
                  id="descripcion"
                  name="descripcion"
                  class="form-control"
                  placeholder="Descripción *"
                  required
                />
              </div>
            </div>

            <!-- Foto -->
            <div class="col-lg-6 col-md-12 col-sm-12 col-12">
              <div class="form-group">
                <label for="foto">Seleccionar Foto</label>
                <input
                  type="file"
                  @change="onFileChange"
                  id="foto"
                  name="foto"
                  class="form-control"
                  accept="image/*"
                  required
                />
              </div>
            </div>

            <!-- Precio -->
            <div class="col-lg-6 col-md-12 col-sm-12 col-12">
              <div class="form-group">
                <label for="precio">Precio</label>
                <input
                  type="number"
                  step="0.01"
                  v-model="producto.precio"
                  id="precio"
                  name="precio"
                  class="form-control"
                  placeholder="Precio *"
                  required
                />
              </div>
            </div>

            <!-- Botones -->
            <div class="col-lg-12 col-md-12 col-sm-12 col-12">
              <button type="submit" class="theme-btn-one btn-black-overlay btn_sm">Guardar Producto</button>
            </div>
          </div>
        </form>
      </div>
    </section>

    <!-- Tabla de productos -->
    <section id="productos_table">
      <div class="container">
        <h3 class="text-center mb-4">Lista de Productos</h3>
        <table class="table">
          <thead>
            <tr>
              <th>ID Producto</th>
              <th>Nombre</th>
              <th>Género</th>
              <th>Color</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Foto</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="producto in productos" :key="producto.idProducto">
              <td>{{ producto.idProducto }}</td>
              <td>{{ producto.nombre }}</td>
              <td>{{ producto.genero }}</td>
              <td>{{ producto.color }}</td>
              <td>{{ producto.descripcion }}</td>
              <td>{{ producto.estado === 1 ? 'Activo' : 'Inactivo' }}</td>
              <td>
                <img :src="producto.foto" alt="Foto" style="width: 50px; height: 50px;" />
              </td>
              <td>{{ producto.precio }}</td>
              <td>
                <button @click="editarProducto(producto)">Editar</button>
                <button @click="confirmarEliminacion(producto.idProducto)">Eliminar</button>
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
        foto: '', 
        precio: null,
      },
      productos: [],
      modoEdicion: false, // Variable para saber si se está editando
      productoIdEdicion: null // Almacena el ID del producto que se está editando
    };
  },
  created() {
    this.obtenerProductos();
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.producto.foto = e.target.result; // Almacena la imagen en base64
        };
        reader.readAsDataURL(file); // Leer el archivo como Data URL
      } else {
        alert('Por favor, selecciona un archivo de imagen válido.');
      }
    },
    async obtenerProductos() {
      try {
        const response = await axios.get('http://localhost:5000/productos');
        this.productos = response.data;
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
      try {
        await axios.post('http://localhost:5000/productos/create', this.producto);
        this.resetForm();
        
        this.obtenerProductos(); 
      } catch (error) {
        console.error('Error al crear el producto:', error);
      }
    },
    async actualizarProducto() {
      try {
        await axios.put(`http://localhost:5000/productos/update/${this.productoIdEdicion}`, this.producto);
        this.resetForm();
        this.obtenerProductos(); // Recargar la lista de productos
      } catch (error) {
        console.error('Error al actualizar el producto:', error);
      }
    },
    editarProducto(producto) {
      this.producto = { ...producto }; // Cargar los datos del producto en el formulario
      this.modoEdicion = true; // Cambiar a modo edición
      this.productoIdEdicion = producto.idProducto; // Guardar el ID del producto que se está editando
    },
    confirmarEliminacion(idProducto) {
      if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        this.eliminarProducto(idProducto);
      }
    },
    async eliminarProducto(idProducto) {
      try {
        await axios.delete(`http://localhost:5000/productos/delete/${idProducto}`);
        this.obtenerProductos(); // Recargar la lista de productos
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
      }
    },
    resetForm() {
      this.producto = {
        nombre: '',
        genero: '', // Reiniciar a vacío
        color: '',
        descripcion: '',
        estado: 1,
        foto: '',
        precio: null,
      };
      this.modoEdicion = false; // Reiniciar modo de edición
      this.productoIdEdicion = null; // Reiniciar ID de edición
    },
  }
};
</script>

<style scoped>
/* Estilos opcionales para el formulario y la tabla */
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f2f2f2;
}
button {
  padding: 5px 10px;
}
</style>
