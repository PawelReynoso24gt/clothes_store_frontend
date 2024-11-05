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
                    <p v-if="pregunta.respuesta && pregunta.respuesta !== '0'">{{ pregunta.respuesta }}</p>
                    <button
                      v-else
                      class="btn btn-agregar-respuesta"
                      @click="abrirModalRespuesta(pregunta)"
                    >
                      Agregar Respuesta
                    </button>
                  </div>
                </div>
  
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Modal para agregar respuesta -->
      <div v-if="showModal" class="modal" @click.self="cerrarModal">
        <div class="modal-content">
          <span class="close" @click="cerrarModal">&times;</span>
          <h4>Agregar Respuesta</h4>
          <p>Escribe la respuesta para la pregunta:</p>
          <textarea
            v-model="respuestaTexto"
            class="form-control"
            placeholder="Escribe tu respuesta aquí..."
            rows="4"
          ></textarea>
          <button @click="agregarRespuesta" class="btn btn-confirmar">Confirmar</button>
        </div>
      </div>
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
        showModal: false, // Control del modal de respuesta
        respuestaTexto: '', // Texto de la respuesta en el modal
        preguntaSeleccionada: null, // Almacena la pregunta a la que se le está agregando respuesta
      };
    },
    mounted() {
      window.scrollTo(0, 0);
      this.obtenerPreguntasFrecuentes(); // Obtener preguntas al montar el componente
    },
    methods: {
      // Obtener preguntas frecuentes
      async obtenerPreguntasFrecuentes() {
        try {
          const response = await axios.get('http://localhost:5000/logpreguntas');
          this.preguntasFrecuentes = response.data;
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
      // Abrir modal para agregar respuesta
      abrirModalRespuesta(pregunta) {
        this.preguntaSeleccionada = pregunta; // Almacenar la pregunta seleccionada
        this.respuestaTexto = ''; // Limpiar el campo de respuesta
        this.showModal = true; // Mostrar el modal
      },
      // Cerrar el modal
      cerrarModal() {
        this.showModal = false;
      },
      // Agregar respuesta a la pregunta seleccionada
      async agregarRespuesta() {
        if (this.respuestaTexto.trim() === '') {
          alert('Por favor, escribe una respuesta.');
          return;
        }
  
        try {
          await axios.put(`http://localhost:5000/logpreguntas/update/${this.preguntaSeleccionada.idPregunta}`, {
            respuesta: this.respuestaTexto,
          });
          alert('Respuesta agregada correctamente.');
          this.showModal = false; // Cerrar el modal
          this.obtenerPreguntasFrecuentes(); // Actualizar preguntas frecuentes
        } catch (error) {
          console.error('Error al agregar la respuesta:', error);
          alert('Hubo un error al agregar la respuesta. Por favor, inténtalo de nuevo.');
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
  
  .btn-agregar-respuesta {
    background-color: #ffc107;
    color: #333;
    border: none;
    padding: 8px 15px;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-agregar-respuesta:hover {
    background-color: #e0a800;
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
  
  /* Estilos para el modal */
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
    z-index: 1000;
  }
  
  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    color: #333;
    cursor: pointer;
  }
  
  .btn-confirmar {
    background-color: #28a745;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    margin-top: 10px;
    cursor: pointer;
    font-weight: bold;
  }
  
  .btn-confirmar:hover {
    background-color: #218838;
  }
  </style>
  