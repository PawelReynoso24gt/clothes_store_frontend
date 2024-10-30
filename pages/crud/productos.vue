<template>
    <div>
      <!-- Título del CRUD -->
      <section id="titulo_crud">
        <div class="container">
          <h2 class="text-center mb-5">CRUD de productos</h2>
        </div>
      </section>
  
      <!-- Producto Form Area -->
      <section id="producto_form" class="ptb-100">
        <div class="container">
          <form @submit.prevent="handleSubmit">
            <div class="row">
              <!-- Nombre del Producto -->
              <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                <div class="form-group">
                  <label for="nombre">Nombre del Producto</label>
                  <input type="text" v-model="producto.nombre" id="nombre" name="nombre" class="form-control" placeholder="Nombre *" :class="{ 'is-invalid': submitted && $v.producto.nombre.$error }" />
                  <div v-if="submitted && !$v.producto.nombre.required" class="invalid-feedback">Nombre es requerido</div>
                </div>
              </div>
              
              <!-- Género del Producto -->
              <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                <div class="form-group">
                  <label for="genero">Género</label>
                  <select v-model="producto.genero" id="genero" class="form-control">
                    <option value="">Seleccione un género...</option>
                    <option value="Hombre">Hombre</option>
                    <option value="Mujer">Mujer</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                  <div v-if="submitted && !$v.producto.genero.required" class="invalid-feedback">Género es requerido</div>
                </div>
              </div>
  
              <!-- Color del Producto -->
              <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                <div class="form-group">
                  <label for="color">Color</label>
                  <input type="text" v-model="producto.color" id="color" name="color" class="form-control" placeholder="Color *" :class="{ 'is-invalid': submitted && $v.producto.color.$error }" />
                  <div v-if="submitted && !$v.producto.color.required" class="invalid-feedback">Color es requerido</div>
                </div>
              </div>
  
              <!-- Descripción -->
              <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                <div class="form-group">
                  <label for="descripcion">Descripción</label>
                  <input type="text" v-model="producto.descripcion" id="descripcion" name="descripcion" class="form-control" placeholder="Descripción *" :class="{ 'is-invalid': submitted && $v.producto.descripcion.$error }" />
                  <div v-if="submitted && !$v.producto.descripcion.required" class="invalid-feedback">Descripción es requerida</div>
                </div>
              </div>
  
              <!-- Precio -->
              <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                <div class="form-group">
                  <label for="precio">Precio</label>
                  <input type="number" v-model="producto.precio" id="precio" name="precio" class="form-control" placeholder="Precio *" :class="{ 'is-invalid': submitted && $v.producto.precio.$error }" />
                  <div v-if="submitted && !$v.producto.precio.required" class="invalid-feedback">Precio es requerido</div>
                </div>
              </div>
  
              <!-- Foto del Producto -->
              <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="form-group">
                  <label for="foto">Foto del Producto</label>
                  <input type="file" @change="onFileChange" id="foto" name="foto" class="form-control" />
                  <div v-if="producto.foto" class="mt-2">
                    <img :src="producto.foto" alt="Imagen del Producto" width="150" />
                  </div>
                </div>
              </div>
  
              <!-- Botón de Enviar -->
              <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                <button type="submit" class="theme-btn-one btn-black-overlay btn_sm">Guardar Producto</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import { required } from "vuelidate/lib/validators";
  
  export default {
    data() {
      return {
        producto: {
          nombre: "",
          genero: "",
          color: "",
          descripcion: "",
          foto: "",
          precio: ""
        },
        submitted: false
      };
    },
    validations: {
      producto: {
        nombre: { required },
        genero: { required },
        color: { required },
        descripcion: { required },
        precio: { required }
      }
    },
    methods: {
      handleSubmit() {
        this.submitted = true;
        this.$v.$touch();
  
        if (this.$v.$invalid) {
          return;
        }
  
        // Lógica para guardar el producto
        alert("Producto guardado exitosamente!");
      },
      onFileChange(e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            this.producto.foto = event.target.result;
          };
          reader.readAsDataURL(file);
        }
      }
    }
  };
  </script>
  