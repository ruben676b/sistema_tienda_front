<template>
  <div class="content">
    <div class="page-header">
      <div class="row">
        <div class="col-sm-12">
          <h3 class="page-title">Añadir Categorías</h3>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="card">
        <div class="card-body">
          <div class="col-lg-3 col-sm-6 col-12">
            <div class="form-group">
              <label>Añadir Categoria</label>
              <input type="text" v-model="newCategory" class="form-control" placeholder="Nueva categoría" />
            </div>
          </div>
          <div class="col-lg-12">
            <button @click="addCategory" class="btn btn-submit me-2">Añadir Categoria</button>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="card">
        <div class="card-body">
          <div class="col-sm-12">
            <div class="table-responsive">
              <table class="table datanew">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Accion</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="categoria in categorias" :key="categoria.id">
                    <td>{{ categoria.nombre }}</td>
                    <td>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      categorias: [],
      newCategory: "",
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
    async addCategory() {
      if (!this.newCategory.trim()) {
        alert("El nombre de la categoría no puede estar vacío.");
        return;
      }
      try {
        const res = await fetch("http://localhost:3000/api/v1/categorias", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Nombre: this.newCategory }), // Nombre en lugar de newCategory
        });
        const data = await res.json();
        if (data.success) {
          this.fetchCategories();
          this.newCategory = "";
        } else {
          alert("Hubo un problema al añadir la categoría.");
          console.error("Error adding category:", data);
        }
      } catch (error) {
        alert("Hubo un problema al añadir la categoría.");
        console.error("Error adding category:", error);
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
            console.error("Error deleting category:", data);
          }
        }
      } catch (error) {
        alert("Hubo un problema al eliminar la categoría.");
        console.error("Error deleting category:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Tus estilos aquí */
</style>
