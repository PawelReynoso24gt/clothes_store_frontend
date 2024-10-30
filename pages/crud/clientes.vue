<template>
  <div>
    <!-- Título del formulario -->
    <section id="titulo_crud">
      <div class="container">
        <h2 class="text-center mb-5">CRUD de clientes</h2>
      </div>
    </section>
    <!-- Cliente Form Area -->
    <section id="cliente_form" class="ptb-100">
      <div class="container">
        <form @submit.prevent="handleSubmit">
          <div class="row">
            <!-- Nombre -->
            <div class="col-lg-6 col-md-12 col-sm-12 col-12">
              <div class="form-group">
                <label for="nombre">Nombre</label>
                <input
                  type="text"
                  v-model="cliente.nombre"
                  id="nombre"
                  name="nombre"
                  class="form-control"
                  placeholder="Nombre *"
                  :class="{ 'is-invalid': submitted && $v.cliente.nombre.$error }"
                />
                <div v-if="submitted && !$v.cliente.nombre.required" class="invalid-feedback">
                  Nombre es requerido
                </div>
              </div>
            </div>

            <!-- Edad -->
            <div class="col-lg-6 col-md-12 col-sm-12 col-12">
              <div class="form-group">
                <label for="edad">Edad</label>
                <input
                  type="number"
                  v-model="cliente.edad"
                  id="edad"
                  name="edad"
                  class="form-control"
                  placeholder="Edad *"
                  :class="{ 'is-invalid': submitted && $v.cliente.edad.$error }"
                />
                <div v-if="submitted && !$v.cliente.edad.required" class="invalid-feedback">
                  Edad es requerida
                </div>
              </div>
            </div>

            <!-- Correo -->
            <div class="col-lg-6 col-md-12 col-sm-12 col-12">
              <div class="form-group">
                <label for="correo">Correo</label>
                <input
                  type="email"
                  v-model="cliente.correo"
                  id="correo"
                  name="correo"
                  class="form-control"
                  placeholder="Correo *"
                  :class="{ 'is-invalid': submitted && $v.cliente.correo.$error }"
                />
                <div v-if="submitted && $v.cliente.correo.$error" class="invalid-feedback">
                  <span v-if="!$v.cliente.correo.required">Correo es requerido</span>
                  <span v-if="!$v.cliente.correo.email">Correo es inválido</span>
                </div>
              </div>
            </div>

            <!-- Teléfono -->
            <div class="col-lg-6 col-md-12 col-sm-12 col-12">
              <div class="form-group">
                <label for="telefono">Teléfono</label>
                <input
                  type="text"
                  v-model="cliente.telefono"
                  id="telefono"
                  name="telefono"
                  class="form-control"
                  placeholder="Teléfono *"
                  :class="{ 'is-invalid': submitted && $v.cliente.telefono.$error }"
                />
                <div v-if="submitted && !$v.cliente.telefono.required" class="invalid-feedback">
                  Teléfono es requerido
                </div>
              </div>
            </div>

            <!-- Dirección -->
            <div class="col-lg-12 col-md-12 col-sm-12 col-12">
              <div class="form-group">
                <label for="direccion">Dirección</label>
                <input
                  type="text"
                  v-model="cliente.direccion"
                  id="direccion"
                  name="direccion"
                  class="form-control"
                  placeholder="Dirección *"
                  :class="{ 'is-invalid': submitted && $v.cliente.direccion.$error }"
                />
                <div v-if="submitted && !$v.cliente.direccion.required" class="invalid-feedback">
                  Dirección es requerida
                </div>
              </div>
            </div>

            <!-- Usuario (Combobox) -->
            <div class="col-lg-12 col-md-12 col-sm-12 col-12">
              <div class="form-group">
                <label for="idUsuario">Usuario</label>
                <select class="form-control" v-model="cliente.idUsuario" id="idUsuario">
                  <option value="">Seleccione un usuario:</option>
                  <option v-for="usuario in usuarios" :key="usuario.idUsuario" :value="usuario.idUsuario">
                    {{ usuario.nombre }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Botones -->
            <div class="col-lg-12 col-md-12 col-sm-12 col-12">
              <button type="submit" class="theme-btn-one btn-black-overlay btn_sm">Guardar Cliente</button>
              <button type="button" @click="handleUpdate" class="theme-btn-one btn-black-overlay btn_sm ml-2">
                Actualizar Cliente
              </button>
              <button type="button" @click="handleClear" class="theme-btn-one btn-red-overlay btn_sm ml-2">
                Limpiar Formulario
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      cliente: {
        nombre: "",
        edad: "",
        correo: "",
        telefono: "",
        direccion: "",
        idUsuario: "",
        estado: ""
      },
      usuarios: [
        { idUsuario: 1, nombre: "Usuario 1" },
        { idUsuario: 2, nombre: "Usuario 2" },
        { idUsuario: 3, nombre: "Usuario 3" }
      ],
      submitted: false
    };
  },
  validations: {
    cliente: {
      nombre: { required },
      edad: { required },
      correo: { required, email },
      telefono: { required },
      direccion: { required },
      idUsuario: { required },
      estado: { required }
    }
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      // Lógica para guardar cliente
      alert("Cliente guardado exitosamente!");
    },
    handleUpdate() {
      this.submitted = true;
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      // Lógica para actualizar cliente
      alert("Cliente actualizado exitosamente!");
    },
    handleClear() {
      // Limpiar el formulario
      this.cliente = {
        nombre: "",
        edad: "",
        correo: "",
        telefono: "",
        direccion: "",
        idUsuario: "",
        estado: ""
      };
      this.submitted = false;
      this.$v.$reset();
    }
  }
};
</script>
