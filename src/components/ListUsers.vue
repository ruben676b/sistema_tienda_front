<template>
  <div class="content">
    <div class="page-header">
      <div class="page-title">
        <h4>Lista de Usuarios</h4>
        <h6>Manejo de Usuarios</h6>
      </div>
    </div>

    <!-- Agregar aquí los filtros y herramientas de búsqueda similares a la lista de empleados -->

    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table datanew dataTable no-footer">
            <thead>
              <tr>
                <th>
                  <label class="checkboxs">
                    <input type="checkbox" />
                    <span class="checkmarks"></span>
                  </label>
                </th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(usuario, index) in usuarios" :key="index">
                <td>
                  <label class="checkboxs">
                    <input type="checkbox" />
                    <span class="checkmarks"></span>
                  </label>
                </td>
                <td>{{ usuario.nombre }}</td>
                <td>{{ usuario.apellido }}</td>
                <td>
                  <a :href="`mailto:${usuario.email}`">{{ usuario.email }}</a>
                </td>
                <td>{{ usuario.rol }}</td>
                <td>
                  <a class="me-3" @click="abrirModalEditar(usuario)">
                    <img src="../../public/img/icons/edit.svg" alt="img" />
                  </a>
                  <a
                    class="me-3 confirm-text"
                    @click="borrarUsuario(usuario.id)"
                  >
                    <img src="../../public/img/icons/delete.svg" alt="img" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal de edición de usuario -->
    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">Editar Usuario</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editarUsuario">
              <div class="form-group">
                <label for="editNombre">Nombre</label>
                <input
                  type="text"
                  class="form-control"
                  id="editNombre"
                  v-model="usuarioEditado.nombre"
                  required
                />
              </div>
              <div class="form-group">
                <label for="editApellido">Apellido</label>
                <input
                  type="text"
                  class="form-control"
                  id="editApellido"
                  v-model="usuarioEditado.apellido"
                  required
                />
              </div>
              <div class="form-group">
                <label for="editEmail">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="editEmail"
                  v-model="usuarioEditado.email"
                  required
                />
              </div>
              <div class="form-group">
                <label for="editRol">Rol</label>
                <select
                  class="form-control"
                  id="editRol"
                  v-model="usuarioEditado.rol"
                >
                  <option value="admin">Administrador</option>
                  <option value="user">Usuario</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      usuarios: [], // Array para almacenar los usuarios
      usuarioEditado: {
        // Objeto para editar usuario
        nombre: "",
        apellido: "",
        email: "",
        rol: "user",
      },
    };
  },
  mounted() {
    // Obtener los datos de los usuarios al montar el componente
    this.fetchUsuarios();
  },
  methods: {
    // Método para obtener usuarios
    async fetchUsuarios() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/usuarios"
        );
        this.usuarios = response.data.usuarios;
      } catch (error) {
        console.error("Error fetching usuarios:", error);
      }
    },
    // Método para borrar usuario
    async borrarUsuario(idUsuario) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/v1/usuarios/${idUsuario}`
        );
        if (response.data.success) {
          this.usuarios = this.usuarios.filter((user) => user.id !== idUsuario);
        } else {
          alert("Error al borrar el usuario");
        }
      } catch (error) {
        console.error("Error deleting usuario:", error);
      }
    },
    // Método para abrir el modal de edición y cargar datos del usuario seleccionado
    abrirModalEditar(usuario) {
      this.usuarioEditado = { ...usuario }; // Copiar usuario seleccionado al objeto de edición
      $("#editModal").modal("show"); // Mostrar modal de edición
    },
    // Método para editar usuario
    async editarUsuario() {
      try {
        const response = await axios.patch(
          `http://localhost:3000/api/v1/usuarios/${this.usuarioEditado.id}`,
          this.usuarioEditado
        );
        if (response.data.success) {
          this.fetchUsuarios(); // Actualizar lista de usuarios o refrescar la página
          $("#editModal").modal("hide"); // Ocultar modal después de editar
        } else {
          alert("Error al editar el usuario");
        }
      } catch (error) {
        console.error("Error editing usuario:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados para el componente ListUsers.vue */
.content {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-title h4 {
  margin: 0;
}

.page-title h6 {
  margin: 0;
  color: #888;
}

.card {
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 20px;
}

.table-responsive {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.table th {
  background-color: #f8f9fa;
}

.checkboxs input[type="checkbox"] {
  display: none;
}

.checkboxs .checkmarks {
  width: 16px;
  height: 16px;
  border: 2px solid #28a745;
  display: inline-block;
  border-radius: 3px;
}

/* Otros estilos según sea necesario */
</style>
