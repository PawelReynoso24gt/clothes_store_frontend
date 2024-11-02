<template>
    <div class="contenedor-principal">
      <h1 class="titulo-centrado">Lista de Roles</h1>
  
      <!-- Botón para crear rol -->
      <button @click="mostrarModalCrear" class="btn-crear">Crear Rol</button>
  
      <!-- Modal para crear rol -->
      <div v-if="mostrarModal" class="modal">
        <div class="modal-contenido">
          <span class="cerrar" @click="cerrarModal">&times;</span>
          <h2>Crear Rol</h2>
          <form @submit.prevent="crearRol">
            <div class="form-group">
              <label for="rol">Rol:</label>
              <input type="text" v-model="nuevoRol.rol" id="rol" required />
            </div>
            <button type="submit" class="btn-enviar">Crear</button>
            <button type="button" class="btn-cerrar" @click="cerrarModal">Cancelar</button>
          </form>
        </div>
      </div>
  
      <!-- Tabla de roles -->
      <div class="tabla-contenedor">
        <table v-if="roles.length" class="roles-table">
          <thead>
            <tr>
              <th>ID Rol</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rol in roles" :key="rol.idRol">
              <td>{{ rol.idRol }}</td>
              <td>{{ rol.rol }}</td>
              <td>{{ rol.estado === 1 ? 'ACTIVO' : 'INACTIVO' }}</td>
              <td style="display: flex; gap: 5px;">
                <button @click="desactivarRol(rol.idRol)" v-if="rol.estado === 1" class="btn-desactivar">Desactivar</button>
                <button @click="mostrarModalActualizar(rol)" class="btn-actualizar">Actualizar Datos</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No hay roles disponibles.</p>
      </div>
  
      <!-- Botón para ver roles inactivos -->
      <div class="boton-inactivos-contenedor">
        <button @click="mostrarModalInactivos" class="btn-ver-inactivos">Ver Roles Inactivos</button>
      </div>
  
      <!-- Modal para ver roles inactivos -->
      <div v-if="mostrarModalRolesInactivos" class="modal">
        <div class="modal-contenido modal-grande">
          <span class="cerrar" @click="cerrarModalInactivos">&times;</span>
          <h2>Roles Inactivos</h2>
          <div class="tabla-contenedor">
            <table v-if="rolesInactivos.length" class="roles-table">
              <thead>
                <tr>
                  <th>ID Rol</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="rol in rolesInactivos" :key="rol.idRol">
                  <td>{{ rol.idRol }}</td>
                  <td>{{ rol.rol }}</td>
                  <td>{{ rol.estado === 0 ? 'INACTIVO' : 'ACTIVO' }}</td>
                  <td>
                    <button @click="activarRol(rol.idRol)" class="btn-activar">Activar</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <p v-else>No hay roles inactivos disponibles.</p>
            <button type="button" class="btn-cerrar" @click="cerrarModalInactivos">Cerrar</button>
          </div>
        </div>
      </div>
  
      <!-- Modal para actualizar rol -->
      <div v-if="mostrarModalActualizarRol" class="modal">
        <div class="modal-contenido">
          <span class="cerrar" @click="cerrarModalActualizar">&times;</span>
          <h2>Actualizar Rol</h2>
          <form @submit.prevent="actualizarRol">
            <div class="form-group">
              <label for="rol">Rol:</label>
              <input type="text" v-model="rolSeleccionado.rol" id="rol" required />
            </div>
            <div class="form-group">
              <label for="estado">Estado:</label>
              <select v-model="rolSeleccionado.estado" id="estado" required>
                <option value="1">ACTIVO</option>
                <option value="0">INACTIVO</option>
              </select>
            </div>
            <button type="submit" class="btn-enviar">Actualizar</button>
            <button type="button" class="btn-cerrar" @click="cerrarModalActualizar">Cancelar</button>
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
        roles: [], // Lista de roles
        rolesInactivos: [], // Lista de roles inactivos
        mostrarModal: false, // Controla la visibilidad del modal de creación
        mostrarModalRolesInactivos: false, // Controla la visibilidad del modal de roles inactivos
        mostrarModalActualizarRol: false, // Controla la visibilidad del modal de actualización de rol
        rolSeleccionado: {}, // Datos del rol seleccionado para actualizar
        nuevoRol: { // Datos del nuevo rol
          rol: "",
        },
      };
    },
    created() {
      this.obtenerRoles();
    },
    methods: {
      // Método para obtener todos los roles
      async obtenerRoles() {
        try {
          const response = await axios.get("http://localhost:5000/roles");
          this.roles = response.data.filter(rol => rol.estado === 1);
        } catch (error) {
          console.error("Error al obtener los roles:", error);
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
      // Método para crear un nuevo rol
      async crearRol() {
        try {
          const response = await axios.post("http://localhost:5000/roles/create", this.nuevoRol);
          this.roles.push(response.data);
          this.cerrarModal();
        } catch (error) {
          console.error("Error al crear el rol:", error);
        }
      },
      // Método para desactivar un rol
      async desactivarRol(idRol) {
        try {
          await axios.put(`http://localhost:5000/roles/update/${idRol}`, { estado: 0 });
          const rol = this.roles.find(r => r.idRol === idRol);
          if (rol) rol.estado = 0;
        } catch (error) {
          console.error("Error al desactivar el rol:", error);
        }
      },
      // Método para activar un rol
      async activarRol(idRol) {
        try {
          await axios.put(`http://localhost:5000/roles/update/${idRol}`, { estado: 1 });
          const rol = this.rolesInactivos.find(r => r.idRol === idRol);
          if (rol) {
            rol.estado = 1;
            this.roles.push(rol);
            this.rolesInactivos = this.rolesInactivos.filter(r => r.idRol !== idRol);
          }
        } catch (error) {
          console.error("Error al activar el rol:", error);
        }
      },
      // Método para mostrar el modal de roles inactivos
      async mostrarModalInactivos() {
        try {
          const response = await axios.get("http://localhost:5000/roles");
          this.rolesInactivos = response.data.filter(rol => rol.estado === 0);
          this.mostrarModalRolesInactivos = true;
        } catch (error) {
          console.error("Error al obtener los roles inactivos:", error);
        }
      },
      // Método para cerrar el modal de roles inactivos
      cerrarModalInactivos() {
        this.mostrarModalRolesInactivos = false;
      },
      // Método para mostrar el modal de actualización de rol
      mostrarModalActualizar(rol) {
        this.rolSeleccionado = { ...rol };
        this.mostrarModalActualizarRol = true;
      },
      // Método para cerrar el modal de actualización de rol
      cerrarModalActualizar() {
        this.mostrarModalActualizarRol = false;
      },
      // Método para actualizar un rol
      async actualizarRol() {
        try {
          const response = await axios.put(`http://localhost:5000/roles/update/${this.rolSeleccionado.idRol}`, {
            rol: this.rolSeleccionado.rol,
            estado: this.rolSeleccionado.estado,
          });
          const index = this.roles.findIndex(r => r.idRol === response.data.idRol);
          if (index !== -1) {
            this.roles.splice(index, 1, response.data);
          }
          this.cerrarModalActualizar();
        } catch (error) {
          console.error("Error al actualizar el rol:", error);
        }
      },
      // Método para limpiar el formulario de creación
      limpiarFormulario() {
        this.nuevoRol = {
          rol: "",
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
  
  .roles-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  
  .roles-table th,
  .roles-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .roles-table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  
  .roles-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .roles-table tr:hover {
    background-color: #ddd;
  }
  </style>
  