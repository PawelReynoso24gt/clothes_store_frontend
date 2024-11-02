<template>
  <div class="contenedor-principal">
    <h1 class="titulo-centrado">Lista de Usuarios</h1>

    <!-- Botón para crear usuario -->
    <button @click="mostrarModalCrear" class="btn-crear">Crear Usuario</button>

    <!-- Modal para crear usuario -->
    <div v-if="mostrarModal" class="modal">
      <div class="modal-contenido">
        <span class="cerrar" @click="cerrarModal">&times;</span>
        <h2>Crear Usuario</h2>
        <form @submit.prevent="crearUsuario">
          <div class="form-group">
            <label for="usuario">Usuario:</label>
            <input type="text" v-model="nuevoUsuario.usuario" id="usuario" required />
          </div>
          <div class="form-group">
            <label for="contrasenia">Contraseña:</label>
            <input type="password" v-model="nuevoUsuario.contrasenia" id="contrasenia" required />
          </div>
          <div class="form-group">
            <label for="idRol">ID Rol:</label>
            <input type="number" v-model="nuevoUsuario.idRol" id="idRol" required />
          </div>
          <button type="submit" class="btn-enviar">Crear</button>
          <button type="button" class="btn-cerrar" @click="cerrarModal">Cancelar</button>
        </form>
      </div>
    </div>

    <!-- Tabla de usuarios -->
    <div class="tabla-contenedor">
      <table v-if="usuarios.length" class="usuarios-table">
        <thead>
          <tr>
            <th>ID Usuario</th>
            <th>Usuario</th>
            <th>Contraseña</th>
            <th>Estado</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuarios" :key="usuario.idUsuario">
            <td>{{ usuario.idUsuario }}</td>
            <td>{{ usuario.usuario }}</td>
            <td>••••••••</td> <!-- Contraseña oculta -->
            <td>{{ usuario.estado === 1 ? 'ACTIVO' : 'INACTIVO' }}</td>
            <td>{{ usuario.idRol }}</td>
            <td>
              <button @click="desactivarUsuario(usuario.idUsuario)" v-if="usuario.estado === 1" class="btn-desactivar">Desactivar</button>
              <button @click="mostrarModalActualizar(usuario)" class="btn-actualizar">Actualizar Datos</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No hay usuarios disponibles.</p>
    </div>

    <!-- Botón para ver usuarios inactivos -->
    <div class="boton-inactivos-contenedor">
      <button @click="mostrarModalInactivos" class="btn-ver-inactivos">Ver Usuarios Inactivos</button>
    </div>

    <!-- Modal para ver usuarios inactivos -->
    <div v-if="mostrarModalUsuariosInactivos" class="modal">
      <div class="modal-contenido modal-grande">
        <span class="cerrar" @click="cerrarModalInactivos">&times;</span>
        <h2>Usuarios Inactivos</h2>
        <div class="tabla-contenedor">
          <table v-if="usuariosInactivos.length" class="usuarios-table">
            <thead>
              <tr>
                <th>ID Usuario</th>
                <th>Usuario</th>
                <th>Estado</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="usuario in usuariosInactivos" :key="usuario.idUsuario">
                <td>{{ usuario.idUsuario }}</td>
                <td>{{ usuario.usuario }}</td>
                <td>{{ usuario.estado === 0 ? 'INACTIVO' : 'ACTIVO' }}</td>
                <td>{{ usuario.idRol }}</td>
                <td>
                  <button @click="activarUsuario(usuario.idUsuario)" class="btn-activar">Activar</button>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else>No hay usuarios inactivos disponibles.</p>
          <button type="button" class="btn-cerrar" @click="cerrarModalInactivos">Cerrar</button>
        </div>
      </div>
    </div>

    <!-- Modal para actualizar usuario -->
    <div v-if="mostrarModalActualizarUsuario" class="modal">
      <div class="modal-contenido">
        <span class="cerrar" @click="cerrarModalActualizar">&times;</span>
        <h2>Actualizar Usuario</h2>
        <form @submit.prevent="actualizarUsuario">
          <div class="form-group">
            <label for="usuario">Usuario:</label>
            <input type="text" v-model="usuarioSeleccionado.usuario" id="usuario" required />
          </div>
          <div class="form-group">
            <label for="idRol">ID Rol:</label>
            <input type="number" v-model="usuarioSeleccionado.idRol" id="idRol" required />
          </div>
          <div class="form-group">
            <label for="estado">Estado:</label>
            <select v-model="usuarioSeleccionado.estado" id="estado" required>
              <option value="1">ACTIVO</option>
              <option value="0">INACTIVO</option>
            </select>
          </div>
          <button type="submit" class="btn-enviar">Actualizar</button>
          <button type="button" class="btn-cerrar" @click="cerrarModalActualizar">Cancelar</button>
        </form>
        <button @click="mostrarModalActualizarContrasenia" class="btn-actualizar-contrasenia">Actualizar Contraseña</button>
      </div>
    </div>

    <!-- Modal para actualizar contraseña -->
    <div v-if="mostrarModalActualizarContraseniaUsuario" class="modal">
      <div class="modal-contenido">
        <span class="cerrar" @click="cerrarModalActualizarContrasenia">&times;</span>
        <h2>Actualizar Contraseña</h2>
        <form @submit.prevent="actualizarContrasenia">
          <div class="form-group">
            <label for="contraseniaActual">Contraseña Actual:</label>
            <input type="password" v-model="contraseniaActual" id="contraseniaActual" required />
          </div>
          <div class="form-group">
            <label for="nuevaContrasenia">Nueva Contraseña:</label>
            <input type="password" v-model="nuevaContrasenia" id="nuevaContrasenia" required />
          </div>
          <button type="submit" class="btn-enviar">Actualizar Contraseña</button>
          <button type="button" class="btn-cerrar" @click="cerrarModalActualizarContrasenia">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      usuarios: [], // Lista de usuarios
      usuariosInactivos: [], // Lista de usuarios inactivos
      mostrarModal: false, // Controla la visibilidad del modal de creación
      mostrarModalUsuariosInactivos: false, // Controla la visibilidad del modal de usuarios inactivos
      mostrarModalActualizarUsuario: false, // Controla la visibilidad del modal de actualización de usuario
      mostrarModalActualizarContraseniaUsuario: false, // Controla la visibilidad del modal de actualización de contraseña
      usuarioSeleccionado: {}, // Datos del usuario seleccionado para actualizar
      nuevoUsuario: { // Datos del nuevo usuario
        usuario: "",
        contrasenia: "",
        idRol: null,
      },
      contraseniaActual: "", // Contraseña actual del usuario para verificación
      nuevaContrasenia: "", // Nueva contraseña del usuario
    };
  },
  created() {
    this.obtenerUsuarios();
  },
  methods: {
    // Método para obtener todos los usuarios
    async obtenerUsuarios() {
      try {
        const response = await axios.get("http://localhost:5000/usuarios/activos");
        this.usuarios = response.data;
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    },
    // Método para mostrar el modal de creación
    mostrarModalCrear() {
      this.mostrarModal = true;
    },
    // Método para cerrar el modal de creación
    cerrarModal() {
      this.mostrarModal = false;
      this.limpiarFormulario();
    },
    // Método para crear un nuevo usuario
    async crearUsuario() {
      try {
        const response = await axios.post("http://localhost:5000/usuarios", this.nuevoUsuario);
        this.usuarios.push(response.data);
        this.cerrarModal();
      } catch (error) {
        console.error("Error al crear el usuario:", error);
      }
    },
    // Método para desactivar un usuario
    async desactivarUsuario(idUsuario) {
      try {
        await axios.put(`http://localhost:5000/usuarios/${idUsuario}`, { estado: 0 });
        const usuario = this.usuarios.find(u => u.idUsuario === idUsuario);
        if (usuario) usuario.estado = 0;
      } catch (error) {
        console.error("Error al desactivar el usuario:", error);
      }
    },
    // Método para activar un usuario
    async activarUsuario(idUsuario) {
      try {
        await axios.put(`http://localhost:5000/usuarios/${idUsuario}`, { estado: 1 });
        const usuario = this.usuariosInactivos.find(u => u.idUsuario === idUsuario);
        if (usuario) {
          usuario.estado = 1;
          this.usuarios.push(usuario);
          this.usuariosInactivos = this.usuariosInactivos.filter(u => u.idUsuario !== idUsuario);
        }
      } catch (error) {
        console.error("Error al activar el usuario:", error);
      }
    },
    // Método para mostrar el modal de usuarios inactivos
    async mostrarModalInactivos() {
      try {
        const response = await axios.get("http://localhost:5000/usuarios/all");
        this.usuariosInactivos = response.data.filter(usuario => usuario.estado === 0);
        this.mostrarModalUsuariosInactivos = true;
      } catch (error) {
        console.error("Error al obtener los usuarios inactivos:", error);
      }
    },
    // Método para cerrar el modal de usuarios inactivos
    cerrarModalInactivos() {
      this.mostrarModalUsuariosInactivos = false;
    },
    // Método para mostrar el modal de actualización de usuario
    mostrarModalActualizar(usuario) {
      this.usuarioSeleccionado = { ...usuario };
      this.mostrarModalActualizarUsuario = true;
    },
    // Método para cerrar el modal de actualización de usuario
    cerrarModalActualizar() {
      this.mostrarModalActualizarUsuario = false;
    },
    // Método para actualizar un usuario
    async actualizarUsuario() {
      try {
        const response = await axios.put(`http://localhost:5000/usuarios/${this.usuarioSeleccionado.idUsuario}`, {
          usuario: this.usuarioSeleccionado.usuario,
          estado: this.usuarioSeleccionado.estado,
          idRol: this.usuarioSeleccionado.idRol,
        });
        const index = this.usuarios.findIndex(u => u.idUsuario === response.data.idUsuario);
        if (index !== -1) {
          this.usuarios.splice(index, 1, response.data);
        }
        this.cerrarModalActualizar();
      } catch (error) {
        console.error("Error al actualizar el usuario:", error);
      }
    },
    // Método para mostrar el modal de actualización de contraseña
    mostrarModalActualizarContrasenia() {
      this.mostrarModalActualizarContraseniaUsuario = true;
    },
    // Método para cerrar el modal de actualización de contraseña
    cerrarModalActualizarContrasenia() {
      this.mostrarModalActualizarContraseniaUsuario = false;
    },
    // Método para actualizar la contraseña de un usuario
    async actualizarContrasenia() {
      try {
        await axios.put(`http://localhost:5000/usuarios/updatePassword/${this.usuarioSeleccionado.idUsuario}`, {
          contraseniaActual: this.contraseniaActual,
          nuevaContrasenia: this.nuevaContrasenia,
        });
        this.cerrarModalActualizarContrasenia();
      } catch (error) {
        console.error("Error al actualizar la contraseña:", error);
      }
    },
    // Método para limpiar el formulario de creación
    limpiarFormulario() {
      this.nuevoUsuario = {
        usuario: "",
        contrasenia: "",
        idRol: null,
      };
    },
  },
};
</script>

<style scoped>
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

.boton-inactivos-contenedor {
  margin-top: 40px;
  text-align: center;
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

.btn-actualizar-contrasenia {
  margin-top: 10px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  color: #fff;
  background-color: #FF9800;
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

.usuarios-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.usuarios-table th,
.usuarios-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.usuarios-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.usuarios-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.usuarios-table tr:hover {
  background-color: #ddd;
}
</style>
