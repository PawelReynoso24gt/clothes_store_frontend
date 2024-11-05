<template>
    <div>
          <!-- Banner Area -->
          <section id="common_banner_one">
              <div class="container">
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
  
          <!-- Privacy-Area -->
          <section id="privacy-policy_area" class="ptb-100">
              <div class="container">
                  <div class="row">
                      <div class="col-12">
                          <div class="privacy_content">
                          <h2>Política de Privacidad</h2>
                          <div class="privacy_policy_text">
                              <h3>Recopilación de Datos</h3>
                              <p>Recopilamos la información que proporcionas voluntariamente al registrarte, realizar compras o interactuar con nuestro sitio. Esta información incluye, pero no se limita a, tu nombre, dirección de correo electrónico, y detalles de pago.</p>
                          </div>
                          <div class="privacy_policy_text">
                              <h3>Finalidad de los Datos</h3>
                              <p>Utilizamos tus datos personales para procesar tus pedidos, gestionar tu cuenta y mejorar tu experiencia de usuario. También podríamos usar tu información para enviarte ofertas y promociones que creemos que serán de tu interés como estudiante.</p>
                          </div>
                          <div class="privacy_policy_text">
                              <h3>Cookies</h3>
                              <p>Usamos cookies para recordar tus preferencias y brindarte una mejor experiencia en nuestra tienda. Las cookies nos ayudan a entender tus intereses y optimizar la navegación en el sitio. Puedes desactivar las cookies en tu navegador, aunque esto puede afectar la funcionalidad de algunas partes de nuestra tienda.</p>
                          </div>
                          <div class="privacy_policy_text">
                              <h3>Contenido Integrado de Otros Sitios Web</h3>
                              <p>Nuestro sitio puede incluir contenido de otras plataformas, como videos de moda o imágenes inspiracionales de redes sociales. Estos sitios pueden recopilar datos sobre ti, usar cookies o incorporar seguimiento adicional para analizar tu interacción con el contenido.</p>
                          </div>
                          <div class="privacy_policy_text">
                              <h3>Conservación de Datos</h3>
                              <p>Retenemos tus datos personales mientras mantengas una cuenta activa en nuestro sitio. Los datos de compra se retendrán para cumplir con nuestras obligaciones legales y de contabilidad. Puedes solicitar la eliminación de tus datos en cualquier momento, excepto en casos donde la ley nos obligue a mantener ciertos registros.</p>
                          </div>
                          <div class="privacy_policy_text">
                              <h3>Tus Derechos</h3>
                              <p>Tienes derecho a acceder, modificar o eliminar tu información personal. Si deseas ejercer estos derechos, puedes contactarnos y te asistiremos en el proceso. También puedes desactivar las comunicaciones de marketing en cualquier momento.</p>
                          </div>
                          <div class="privacy_policy_text">
                              <h3>Actualizaciones a esta Política</h3>
                              <p>Podríamos actualizar nuestra política de privacidad ocasionalmente para reflejar cambios en nuestras prácticas o en la ley. Te notificaremos sobre estos cambios a través de nuestro sitio o por correo electrónico.</p>
                          </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
    </div>
  </template>
  
  <script>
  export default {
      name: 'privacy-policy',
      
      data() {
          return {
  
              title: 'Política de Privacidad',
  
              // Breadcrumb Items Data
              breadcrumbItems: [
                  {
                      text: 'Inicio',
                      to: '/'
                  },
                  {
                      text: 'Política de Privacidad'
                  }
              ],
  
          }
      },
      mounted() {
          // Desplaza la página al inicio en cada carga de ruta 
          window.scrollTo(0, 0)
      },
  
      // Page head() Title, description for SEO 
      head() {
        return {
          title: this.title,
          meta: [
            {
              hid: 'description',
              name: 'description',
              content: 'Página de Política de Privacidad - Tienda de Ropa para Estudiantes'
            }
          ]
        }
      }
  }
  </script>
  