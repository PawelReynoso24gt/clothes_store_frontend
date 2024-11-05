<template>
    <div>
      <!-- Banner Area -->
      <section id="common_banner_one">
        <div class="container ">
          <div class="row">
            <div class="col-lg-12">
              <div class="common_banner_text">
                <h2>{{ this.title }}</h2>
                <b-breadcrumb :items="breadcrumbItems" class="bg-transparent"></b-breadcrumb>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Login-Area -->
      <section id="login_area" class="ptb-100">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 offset-lg-3 col-md-12 col-sm-12 col-12">
              <div class="account_form">
                <h3>Inicio de Sesión</h3>
                <form @submit.prevent="handleSubmit">
                  <div class="default-form-box">
                    <label>USUARIO<span>*</span></label>
                    <input type="text" v-model="user.username" id="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && $v.user.username.$error }" />
                    <div v-if="submitted && !$v.user.username.required" class="invalid-feedback">El usuario es requerido</div>
                  </div>
  
                  <div class="default-form-box">
                    <label for="password">CONTRASEÑA</label>
                    <input type="password" v-model="user.password" id="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && $v.user.password.$error }" />
                    <div v-if="submitted && $v.user.password.$error" class="invalid-feedback">
                      <span v-if="!$v.user.password.required">La contraseña es requerida</span>
                      <span v-if="!$v.user.password.minLength">La contraseña debe ser de mínimo 6 carácteres</span>
                    </div>
                  </div>
  
                  <div class="login_submit">
                    <button class="theme-btn-one btn-black-overlay btn_md">login</button>
                  </div>
  
                  <nuxt-link to="/register">Crear una cuenta?</nuxt-link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { required, minLength } from "vuelidate/lib/validators";
  
  export default {
    name: 'Login',
    data() {
      return {
        title: 'Login',
  
        // Breadcrumb Items Data
        breadcrumbItems: [
          {
            text: 'Home',
            to: '/'
          },
          {
            text: 'Login'
          }
        ],
        // Form Validation
        user: {
          username: "",
          password: "",
        },
        submitted: false
      }
    },
    validations: {
      user: {
        username: { required },
        password: { required, minLength: minLength(6) },
      }
    },
    mounted() {  
      // For scroll page top for every Route 
      window.scrollTo(0, 0)
    },
    methods: {
    async handleSubmit(e) {
        this.submitted = true;

        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        }

        try {
            // Realizar la solicitud POST para iniciar sesión
            const loginResponse = await axios.post('http://localhost:5000/login', {
                usuario: this.user.username,
                contrasenia: this.user.password
            });

            console.log('Inicio de sesión exitoso:', loginResponse.data);
            
            // Guardar el token, idUsuario, y rol directamente en localStorage
            localStorage.setItem('token', loginResponse.data.token);
            localStorage.setItem('idUsuario', loginResponse.data.usuario.idUsuario);
            localStorage.setItem('role', loginResponse.data.usuario.idRol); // Guardar el rol (4 para administrador)

            // Redirigir a la página principal
            this.$router.push('/');
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Credenciales inválidas o cuenta inactiva.');
        }
        }
    }
,
  
    // Page head() Title, description for SEO 
    head() {
      return {
        title: this.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Login page - AndShop Ecommerce Vue js, Nuxt js Template'
          }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Fondo oscuro */
    z-index: 1000; /* Asegúrate de que el modal esté por encima del contenido */
  }
  
  .modal-contenido {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 80%; /* Ajusta el tamaño del modal */
    max-width: 500px; /* Tamaño máximo del modal */
    position: relative;
  }
  
  .cerrar {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 24px;
    cursor: pointer;
  }
  
  .btn-secondary {
    margin-top: 20px;
  }
  </style>
  