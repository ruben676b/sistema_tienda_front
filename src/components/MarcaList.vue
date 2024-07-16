<template>
  <div>
    <div class="page-header">
      <div class="page-title">
        <h4>Lista de Marcas</h4>
        <h6>Gestiona tus Marcas</h6>
      </div>
      <div class="page-btn">
        <router-link :to="{ name: 'AddMarcas' }" class="btn btn-added">
          <img src="../../public/img/icons/plus.svg" alt="img" />
          Agregar Marca
        </router-link>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="table-top">
          <div class="search-set">
            <div class="search-path">
              <a class="btn btn-filter" id="filter_search">
                <img src="../../public/img/icons/filter.svg" alt="img" />
                <span>
                  <img src="../../public/img/icons/closes.svg" alt="img" />
                </span>
              </a>
            </div>
            <div class="search-input">
              <a class="btn btn-searchset">
                <img src="../../public/img/icons/search-white.svg" alt="img" />
              </a>
              <div id="DataTables_Table_0_filter" class="dataTables_filter">
                <label>
                  <input
                    type="search"
                    class="form-control form-control-sm"
                    placeholder="Buscar..."
                    v-model="searchQuery"
                    @input="filterMarcas"
                  />
                </label>
              </div>
            </div>
          </div>
          <div class="wordset">
            <ul>
              <li>
                <a data-bs-toggle="tooltip" data-bs-placement="top" title="pdf">
                  <img src="../../public/img/icons/pdf.svg" alt="img" />
                </a>
              </li>
              <li>
                <a
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="excel"
                >
                  <img src="../../public/img/icons/excel.svg" alt="img" />
                </a>
              </li>
              <li>
                <a
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="print"
                >
                  <img src="../../public/img/icons/printer.svg" alt="img" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table datanew dataTable no-footer">
            <thead>
              <tr>
               <th>Nombre de la Marca</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="marca in filteredMarcas" :key="marca.id">
                <td>{{ marca.nombre }}</td>
                <td>
                  <a class="me-3" @click="editMarca(marca.id)">
                    <img src="../../public/img/icons/edit.svg" alt="img" />
                  </a>
                  <a class="me-3 confirm-text" @click="deleteMarca(marca.id)">
                    <img src="../../public/img/icons/delete.svg" alt="img" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal para editar marca -->
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">Editar Marca</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="editMarcaNombre" class="form-label">Nombre de la Marca</label>
              <input type="text" class="form-control" id="editMarcaNombre" v-model="editedMarca.nombre">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" @click="confirmUpdateMarca()">Guardar Cambios</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      marcas: [],
      searchQuery: "",
      editedMarca: {
        id: null,
        nombre: ''
      },
    };
  },
  computed: {
    filteredMarcas() {
      return this.marcas.filter((marca) =>
        marca.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    fetchMarcas() {
      axios.get("http://localhost:3000/api/v1/marcas")
        .then((response) => {
          if (response.data.success) {
            this.marcas = response.data.Marcas;
          }
        })
        .catch((error) => {
          console.error("Error fetching marcas:", error);
        });
    },
    filterMarcas() {
      // Método para filtrar marcas, se ejecuta cuando cambia searchQuery
    },
    editMarca(id) {
      // Busca la marca con el ID dado y muestra el modal de edición
      this.editedMarca = { ...this.marcas.find(marca => marca.id === id) };
      $('#editModal').modal('show');
    },
    async confirmUpdateMarca() {
      try {
        const response = await axios.patch(`http://localhost:3000/api/v1/marcas/${this.editedMarca.id}`, {
          Nombre: this.editedMarca.nombre
        });
        if (response.data.success) {
          // Actualización exitosa, actualiza localmente la marca
          const index = this.marcas.findIndex(marca => marca.id === this.editedMarca.id);
          if (index !== -1) {
            this.marcas[index].nombre = this.editedMarca.nombre;
          }
          $('#editModal').modal('hide');
          Swal.fire("¡Actualizado!", "La marca ha sido actualizada.", "success");
        } else {
          Swal.fire("Error", "No se pudo actualizar la marca. Intente nuevamente.", "error");
        }
      } catch (error) {
        console.error("Error al actualizar la marca:", error);
        Swal.fire("Error", "Error al actualizar la marca. Intente nuevamente.", "error");
      }
    },
    async deleteMarca(id) {
      try {
        await axios.delete(`http://localhost:3000/api/v1/marcas/${id}`);
        this.marcas = this.marcas.filter((marca) => marca.id !== id);
        Swal.fire("¡Borrado!", "La marca ha sido borrada.", "success");
      } catch (error) {
        console.error("Error al borrar la marca:", error);
        Swal.fire("Error", "Error al borrar la marca. Intente nuevamente.", "error");
      }
    },
  },
  mounted() {
    this.fetchMarcas();
  },
};
</script>


<style>
/* Agrega tus estilos aquí */
</style>