<template>
    <div class="content">
      <div class="page-header">
        <div class="row">
          <div class="col-sm-12">
            <h3 class="page-title">Modificar Categorías</h3>
          </div>
        </div>
      </div>
  
      <!-- Lista de categorías -->
      <div class="row">
        <div class="card">
          <div class="card-body">
            <div class="col-sm-12">
              <div class="table-responsive">
                <table class="table datanew">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="categoria in categorias" :key="categoria.id">
                      <td>{{ categoria.nombre }}</td>
                      <td>
                        <a @click="openEditModal(categoria)" class="editCategoria">
                          <img src="../../public/img/icons/edit.svg" alt="Editar">
                        </a>
                        
                        <a @click="deleteCategory(categoria.id)" class="confirm-text deleteCategoria">
                          <img src="../../public/img/icons/delete.svg" alt="Eliminar">
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal para modificar categoría -->
      <div class="modal fade" id="editCategoryModal" tabindex="-1" role="dialog" aria-labelledby="editCategoryModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editCategoryModalLabel">Modificar Categoría</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="updateCategory">
                <div class="form-group">
                  <label for="editCategoryName">Nombre de la Categoría</label>
                  <input type="text" class="form-control" id="editCategoryName" v-model="editedCategory.nombre">
                </div>
                <button type="submit" class="btn btn-primary">Guardar Cambios</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        categorias: [],
        editedCategory: {
          id: null,
          nombre: ''
        }
      };
    },
    mounted() {
      this.fetchCategories();
    },
    methods: {
      async fetchCategories() {
        try {
          const res = await fetch("http://localhost:3000/api/v1/categorias");
          const data = await res.json();
          this.categorias = data.categorias;
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      },
      async updateCategory() {
        try {
          const res = await fetch(`http://localhost:3000/api/v1/categorias/${this.editedCategory.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ nombre: this.editedCategory.nombre })
          });
          const data = await res.json();
          if (data.success) {
            $('#editCategoryModal').modal('hide'); // Cerrar el modal después de guardar cambios
            this.fetchCategories(); // Recargar la lista de categorías
            this.editedCategory = { id: null, nombre: '' }; // Limpiar el formulario de edición
          } else {
            alert("Hubo un problema al modificar la categoría.");
            console.error("Error updating category:", data.message); // Imprimir el mensaje de error recibido desde el servidor
          }
        } catch (error) {
          console.error("Error updating category:", error);
          alert("Hubo un problema al modificar la categoría.");
        }
      },
      async deleteCategory(id) {
        try {
          const swalConfirmation = await Swal.fire({
            title: "¿Estás seguro de eliminar esta categoría?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
          });
          if (swalConfirmation.isConfirmed) {
            const res = await fetch(`http://localhost:3000/api/v1/categorias/${id}`, {
              method: "DELETE",
            });
            const data = await res.json();
            if (data.success) {
              Swal.fire("¡Eliminado!", "La categoría ha sido eliminada.", "success");
              this.fetchCategories();
            } else {
              alert("Hubo un problema al eliminar la categoría.");
              console.error("Error deleting category:", data.message);
            }
          }
        } catch (error) {
          alert("Hubo un problema al eliminar la categoría.");
          console.error("Error deleting category:", error);
        }
      },
      openEditModal(categoria) {
        this.editedCategory.id = categoria.id;
        this.editedCategory.nombre = categoria.nombre;
        $('#editCategoryModal').modal('show');
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados */
  </style>
  