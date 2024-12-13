<template>
    <div>
      <!-- Banner Area -->
      <section id="common_banner_one">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="common_banner_text text-center">
                <h2>Preguntas Frecuentes</h2>
                <b-breadcrumb :items="breadcrumbItems" class="bg-transparent"></b-breadcrumb>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Faq-Area -->
      <section id="faqs_area" class="ptb-100">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-10">
              <div class="faqs_area_wrapper">
                <!-- Mostrar preguntas y respuestas directamente -->
                <div v-for="(pregunta, index) in preguntasFrecuentes" :key="pregunta.id" class="faq-card mb-4">
                  <div class="faq-question">
                    <h5 class="mb-0">{{ pregunta.pregunta }}</h5>
                  </div>
                  <div class="faq-answer">
                    <p>{{ pregunta.respuesta }}</p>
                  </div>
                </div>
  
                <!-- Input para nueva pregunta -->
                <div class="input-group mt-5">
                  <input
                    type="text"
                    v-model="nuevaPregunta"
                    placeholder="Escribe tu pregunta..."
                    class="form-control pregunta-input"
                  />
                  <button @click="enviarPregunta" class="btn btn-enviar">
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'FAQ',
    data() {
      return {
        title: 'FAQ',
        breadcrumbItems: [
          { text: 'Inicio', to: '/' },
          { text: 'Preguntas Frecuentes' },
        ],
        preguntasFrecuentes: [],
        nuevaPregunta: '', // Modelo para nueva pregunta
      };
    },
    mounted() {
      window.scrollTo(0, 0);
      this.obtenerPreguntasFrecuentes(); // Obtener preguntas al montar el componente
    },
    methods: {
      // Obtener preguntas frecuentes con frecuencia > 5 y respuesta válida
      async obtenerPreguntasFrecuentes() {
        try {
          const response = await axios.get('http://localhost:5000/logpreguntas');
          // Filtrar preguntas que tengan frecuencia > 5 y respuesta válida
          this.preguntasFrecuentes = response.data.filter(
            (pregunta) =>
              pregunta.frecuencia > 3 &&
              pregunta.respuesta &&
              pregunta.respuesta !== '0'
          );
        } catch (error) {
          console.error('Error al obtener las preguntas frecuentes:', error);
        }
      },
      // Enviar nueva pregunta con respuesta null
      async enviarPregunta() {
        if (this.nuevaPregunta.trim() === '') {
          alert('Por favor, escribe una pregunta.');
          return;
        }
  
        try {
          await axios.post('http://localhost:5000/logpreguntas/create', {
            pregunta: this.nuevaPregunta,
            respuesta: null, // Respuesta nula al crear la pregunta
          });
          alert('Tu pregunta ha sido enviada. Gracias.');
          this.nuevaPregunta = ''; // Limpiar el campo de entrada
          this.obtenerPreguntasFrecuentes(); // Actualizar preguntas frecuentes
        } catch (error) {
          console.error('Error al enviar la pregunta:', error);
          alert('Hubo un error al enviar tu pregunta. Por favor, inténtalo de nuevo.');
        }
      },
    },
    head() {
      return {
        title: this.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'FAQ page - AndShop Ecommerce Vue js, Nuxt js Template',
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Estilos para la sección de FAQ */
  .faq-card {
    background-color: #f7f9fc;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    transition: box-shadow 0.3s ease;
  }
  
  .faq-card:hover {
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  }
  
  .faq-question {
    font-weight: bold;
    font-size: 1.1em;
    color: #333;
    margin-bottom: 10px;
  }
  
  .faq-answer {
    font-size: 1em;
    color: #555;
  }
  
  .input-group {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  
  .pregunta-input {
    border-radius: 20px;
    padding: 10px 15px;
    border: 1px solid #ccc;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .btn-enviar {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border-radius: 20px;
    border: none;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }
  
  .btn-enviar:hover {
    background-color: #0056b3;
  }
  </style>
  