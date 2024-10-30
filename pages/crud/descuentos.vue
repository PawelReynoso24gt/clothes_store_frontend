<template>
    <div>
      <!-- Título del CRUD -->
      <section id="titulo_crud">
        <div class="container">
          <h2 class="text-center mb-5">CRUD de descuentos</h2>
        </div>
      </section>
  
      <!-- Descuento Form Area -->
      <section id="descuento_form" class="ptb-100">
        <div class="container">
          <form @submit.prevent="handleSubmit">
            <div class="row">
              <!-- Monto del Descuento -->
              <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                <div class="form-group">
                  <label for="descuento">Descuento (0.00)</label>
                  <input type="number" v-model="descuento.descuento" id="descuento" name="descuento" class="form-control" placeholder="Descuento en decimal" :class="{ 'is-invalid': submitted && $v.descuento.descuento.$error }" />
                  <div v-if="submitted && !$v.descuento.descuento.required" class="invalid-feedback">El descuento es requerido</div>
                </div>
              </div>
  
              <!-- Descripción del Descuento -->
              <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="form-group">
                  <label for="descripcion">Descripción</label>
                  <input type="text" v-model="descuento.descripcion" id="descripcion" name="descripcion" class="form-control" placeholder="Descripción del descuento *" :class="{ 'is-invalid': submitted && $v.descuento.descripcion.$error }" />
                  <div v-if="submitted && !$v.descuento.descripcion.required" class="invalid-feedback">La descripción es requerida</div>
                </div>
              </div>
  
              <!-- Estado del Descuento -->
              <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="form-group">
                  <label for="estado">Estado</label>
                  <select v-model="descuento.estado" id="estado" class="form-control">
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                  </select>
                </div>
              </div>
  
              <!-- Botón de Enviar -->
              <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                <button type="submit" class="theme-btn-one btn-black-overlay btn_sm">Guardar Descuento</button>
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
        descuento: {
          descuento: "",
          descripcion: "",
          estado: "1"
        },
        submitted: false
      };
    },
    validations: {
      descuento: {
        descuento: { required },
        descripcion: { required }
      }
    },
    methods: {
      handleSubmit() {
        this.submitted = true;
        this.$v.$touch();
  
        if (this.$v.$invalid) {
          return;
        }
  
        // Lógica para guardar el descuento
        alert("Descuento guardado exitosamente!");
      }
    }
  };
  </script>
  