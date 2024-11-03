<template>
  <div class="contenedor-principal">
    <h1 class="titulo-centrado">Lista de Empleados</h1>

    <!-- Botón para abrir el modal de crear Empleado -->
    <button @click="mostrarModalCrearEmpleado" class="btn-crear">Crear Empleado</button>

    <!-- Modal para crear Empleado -->
    <div v-if="mostrarModalCrear" class="modal">
      <div class="modal-contenido">
        <span class="cerrar" @click="cerrarModalCrear">&times;</span>
        <h2>Crear Empleado</h2>
        <form @submit.prevent="crearEmpleado">
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input type="text" v-model="nuevoEmpleado.nombre" id="nombre" required />
          </div>
          <div class="form-group">
            <label for="correo">Correo:</label>
            <input type="email" v-model="nuevoEmpleado.correo" id="correo" required />
          </div>
          <div class="form-group">
            <label for="telefono">Teléfono:</label>
            <input type="text" v-model="nuevoEmpleado.telefono" id="telefono" required />
          </div>
          <div class="form-group">
            <label for="usuario">Usuario:</label>
            <select v-model="nuevoEmpleado.usuario" id="usuario" required>
              <option v-for="usuario in usuarios" :key="usuario.idUsuario" :value="usuario.usuario">
                {{ usuario.usuario }}
              </option>
            </select>
          </div>
          <button type="submit" class="btn-enviar">Crear</button>
          <button type="button" class="btn-cerrar" @click="cerrarModalCrear">Cancelar</button>
        </form>
      </div>
    </div>

    <!-- Modal para actualizar Empleado -->
    <div v-if="mostrarModalActualizar" class="modal">
      <div class="modal-contenido">
        <span class="cerrar" @click="cerrarModalActualizar">&times;</span>
        <h2>Actualizar Empleado</h2>
        <form @submit.prevent="actualizarEmpleado">
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input type="text" v-model="empleadoSeleccionado.nombre" id="nombre" required />
          </div>
          <div class="form-group">
            <label for="correo">Correo:</label>
            <input type="email" v-model="empleadoSeleccionado.correo" id="correo" required />
          </div>
          <div class="form-group">
            <label for="telefono">Teléfono:</label>
            <input type="text" v-model="empleadoSeleccionado.telefono" id="telefono" required />
          </div>
          <div class="form-group">
            <label for="usuario">Usuario:</label>
            <select v-model="empleadoSeleccionado.usuario.usuario" id="usuario" required>
              <option v-for="usuario in usuarios" :key="usuario.idUsuario" :value="usuario.usuario">
                {{ usuario.usuario }}
              </option>
            </select>
          </div>
          <button type="submit" class="btn-enviar">Actualizar</button>
          <button type="button" class="btn-cerrar" @click="cerrarModalActualizar">Cancelar</button>
        </form>
      </div>
    </div>

    <!-- Tabla de Empleados -->
    <div class="tabla-contenedor">
      <table v-if="empleados.length" class="inventarios-table">
        <thead>
          <tr>
            <th>ID Empleado</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Usuario</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="empleado in empleados" :key="empleado.idEmpleado">
            <td>{{ empleado.idEmpleado }}</td>
            <td>{{ empleado.nombre }}</td>
            <td>{{ empleado.correo }}</td>
            <td>{{ empleado.telefono }}</td>
            <td>{{ empleado.usuario.usuario }}</td>
            <td>{{ empleado.estado === 1 ? 'Activo' : 'Inactivo' }}</td>
            <td>
              <button @click="mostrarModalActualizarEmpleado(empleado)" class="btn-actualizar">Editar</button>
              <button @click="desactivarEmpleado(empleado)" class="btn-desactivar">Desactivar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No hay empleados disponibles.</p>
    </div>

    <button @click="abrirModalEmpleadosInactivos" class="btn-ver-inactivos">Ver Empleados Inactivos</button>

    <!-- Modal para ver Empleados Inactivos -->
    <div v-if="mostrarModalEmpleadosInactivos" class="modal">
      <div class="modal-contenido modal-grande">
        <span class="cerrar" @click="cerrarModalEmpleadosInactivos">&times;</span>
        <h2>Empleados Inactivos</h2>
        <table v-if="empleadosInactivos.length" class="inventarios-table">
          <thead>
            <tr>
              <th>ID Empleado</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="empleado in empleadosInactivos" :key="empleado.idEmpleado">
              <td>{{ empleado.idEmpleado }}</td>
              <td>{{ empleado.nombre }}</td>
              <td>{{ empleado.correo }}</td>
              <td>{{ empleado.telefono }}</td>
              <td>{{ empleado.usuario.usuario }}</td>
              <td>
                <button @click="activarEmpleado(empleado)" class="btn-activar">Activar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No hay empleados inactivos disponibles.</p>
        <button @click="cerrarModalEmpleadosInactivos" class="btn-cerrar">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      empleados: [],
      empleadosInactivos: [],
      usuarios: [],
      mostrarModalCrear: false,
      mostrarModalActualizar: false,
      mostrarModalEmpleadosInactivos: false,
      nuevoEmpleado: { nombre: "", correo: "", telefono: "", usuario: "", estado: 1 },
      empleadoSeleccionado: null,
    };
  },
  computed: {
    empleadosActivos() {
      return this.empleados.filter((empleado) => empleado.estado === 1);
    },
  },
  created() {
    this.obtenerEmpleados();
    this.obtenerUsuarios(); // Obtener lista de usuarios al cargar el componente
  },
  methods: {
    async obtenerEmpleados() {
      const response = await axios.get("http://localhost:5000/empleados");
      this.empleados = response.data;
    },
    async obtenerUsuarios() {
      const response = await axios.get("http://localhost:5000/usuarios/all"); // Ruta que devuelve lista de usuarios
      this.usuarios = response.data;
    },
    async obtenerEmpleadosInactivos() {
      const response = await axios.get("http://localhost:5000/empleados/inactivos");
      this.empleadosInactivos = response.data;
    },
    mostrarModalCrearEmpleado() {
      this.mostrarModalCrear = true;
    },
    cerrarModalCrear() {
      this.mostrarModalCrear = false;
      this.nuevoEmpleado = { nombre: "", correo: "", telefono: "", usuario: "", estado: 1 };
    },
    async crearEmpleado() {
      await axios.post("http://localhost:5000/empleados/create", this.nuevoEmpleado);
      this.obtenerEmpleados();
      this.cerrarModalCrear();
    },
    mostrarModalActualizarEmpleado(empleado) {
      this.empleadoSeleccionado = { ...empleado };
      this.mostrarModalActualizar = true;
    },
    cerrarModalActualizar() {
      this.mostrarModalActualizar = false;
      this.empleadoSeleccionado = null;
    },
    async actualizarEmpleado() {
      await axios.put(
        `http://localhost:5000/empleados/update/${this.empleadoSeleccionado.idEmpleado}`,
        {
          ...this.empleadoSeleccionado,
          usuario: this.empleadoSeleccionado.usuario.usuario, // Enviar solo el nombre de usuario
        }
      );
      this.obtenerEmpleados();
      this.cerrarModalActualizar();
    },
    async desactivarEmpleado(empleado) {
      empleado.estado = 0;
      await axios.put(`http://localhost:5000/empleados/update/${empleado.idEmpleado}`, empleado);
      this.obtenerEmpleados();
    },
    abrirModalEmpleadosInactivos() {
      this.obtenerEmpleadosInactivos();
      this.mostrarModalEmpleadosInactivos = true;
    },
    cerrarModalEmpleadosInactivos() {
      this.mostrarModalEmpleadosInactivos = false;
    },
    async activarEmpleado(empleado) {
      empleado.estado = 1;
      await axios.put(`http://localhost:5000/empleados/update/${empleado.idEmpleado}`, empleado);
      this.obtenerEmpleados();
    },
  },
};
</script>

<style scoped>
/* El mismo estilo aplicado al componente de empleados */
.contenedor-principal {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}
.titulo-centrado {
  text-align: center;
}
.tabla-contenedor {
  width: 80%;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  margin-top: 20px;
}
.btn-crear,
.btn-ver-inactivos {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
.btn-desactivar {
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  color: #fff;
  background-color: #f44336;
  border: none;
  border-radius: 4px;
}
.btn-activar {
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  color: #fff;
  background-color: #4CAF50;
  border: none;
  border-radius: 4px;
}
.btn-actualizar {
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  color: #fff;
  background-color: #2196F3;
  border: none;
  border-radius: 4px;
}
.btn-cerrar {
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  color: #fff;
  background-color: #777;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
}
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
}
.modal-contenido {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.modal-grande {
  width: 600px;
}
.cerrar {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
}
.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.btn-enviar {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
.inventarios-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.inventarios-table th,
.inventarios-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  font-size: 14px;
}
.inventarios-table th {
  background-color: #f7f7f7;
  color: #333;
  font-weight: bold;
}
.inventarios-table td {
  color: #555;
}
.inventarios-table tr:hover {
  background-color: #ddd;
}
</style>
