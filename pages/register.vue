<template>
    <div>
      <!-- Banner Area -->
      <section id="common_banner_one">
          <div class="container ">
              <div class="row">
                  <div class="col-lg-12">
                      <div class="common_banner_text">
                          <h2>{{this.title}}</h2>
                          <b-breadcrumb :items="breadcrumbItems" class="bg-transparent"></b-breadcrumb>
                      </div>
                  </div>
              </div>
          </div>
      </section>
  
      <!-- Register-Area -->
      <section id="register_area" class="ptb-100">
          <div class="container">
              <div class="row">
                  <div class="col-lg-6 offset-lg-3 col-md-12 col-sm-12 col-12">
                      <div class="account_form">
                          <h3>Registro</h3>
                          <form @submit.prevent="handleRegister">
                              <div class="default-form-box">
                                  <label>Username <span>*</span></label>
                                  <input type="text" v-model="user.username" id="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && $v.user.username.$error }" />
                                  <div v-if="submitted && !$v.user.username.required" class="invalid-feedback">El usuario es requerido</div>
                              </div>
  
                              <div class="default-form-box">
                                  <label for="password">Contraseña</label>
                                  <input type="password" v-model="user.password" id="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && $v.user.password.$error }" />
                                  <div v-if="submitted && $v.user.password.$error" class="invalid-feedback">
                                      <span v-if="!$v.user.password.required">La contraseña es requerida</span>
                                      <span v-if="!$v.user.password.minLength">La contraseña debe tener al menos 8 caracteres</span>
                                      <span v-if="!$v.user.password.hasUppercase">La contraseña debe tener al menos una letra mayúscula</span>
                                      <span v-if="!$v.user.password.hasLowercase">La contraseña debe tener al menos una letra minúscula</span>
                                  </div>
                              </div>
                                  
                              <div class="login_submit">
                                  <button class="theme-btn-one btn-black-overlay btn_md">Registrar</button>
                              </div>
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
      name: 'Register',
      data() {
          return {              title: 'Registro',
  
              // Breadcrumb Items Data
              breadcrumbItems: [
                {
                    text: 'Home',
                    to: '/'
                },
                {
                    text: 'Registro'
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
              password: {
                  required,
                  minLength: minLength(8),
                  hasUppercase(value) {
                      return /[A-Z]/.test(value);
                  },
                  hasLowercase(value) {
                      return /[a-z]/.test(value);
                  }
              },
          }
      },
      mounted() { 
          // For scroll page top for every Route 
          window.scrollTo(0, 0)
      },
      methods: {
          handleRegister(e) {
              this.submitted = true;
  
              // stop here if form is invalid
              this.$v.$touch();
              if (this.$v.$invalid) {
                  return;
              }
  
              // Realizar la solicitud POST para registrar un usuario
              axios.post('http://localhost:5000/createuser', {
                  usuario: this.user.username,
                  contrasenia: this.user.password,
                  idRol: 6
              })
              .then(response => {
                  console.log('Registro exitoso:', response.data);
                  alert('Registrado exitosamente!');
                  // Redirigir al login
                  this.$router.push('/login');
              })
              .catch(error => {
                  console.error('Error al registrar:', error);
                  alert('Error al registrar. Por favor, inténtelo nuevamente.');
              });
          }
      },
  
      // Page head() Title, description for SEO 
      head() {
        return {
          title: this.title,
          meta: [
            {
              hid: 'description',
              name: 'description',
              content: 'Register page - AndShop Ecommerce Vue js, Nuxt js Template'
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