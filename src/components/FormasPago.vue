<template>
  <div>
    <div class="page-header">
      <div class="page-title">
        <h4>Lista de Formas de Pago</h4>
        <h6>Gestiona tus Formas de Pago</h6>
      </div>
      <div class="page-btn">
        <router-link :to="{ name: 'AddFormasPago' }" class="btn btn-added">
          <img src="../../public/img/icons/plus.svg" alt="img" />
          Agregar Forma de Pago
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
                    @input="filterFormasPago"
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
                <a data-bs-toggle="tooltip" data-bs-placement="top" title="excel">
                  <img src="../../public/img/icons/excel.svg" alt="img" />
                </a>
              </li>
              <li>
                <a data-bs-toggle="tooltip" data-bs-placement="top" title="print">
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
                <th>Descripción</th>
                <th>Detalles</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="formaPago in filteredFormasPago" :key="formaPago.IdFormaPago">
                <td>{{ formaPago.Descripcion }}</td>
                <td>{{ formaPago.Detalles }}</td>
                <td>
                  <a class="me-3" @click="editFormaPago(formaPago.IdFormaPago)">
                    <img src="../../public/img/icons/edit.svg" alt="img" />
                  </a>
                  <a class="me-3 confirm-text" @click="deleteFormaPago(formaPago.IdFormaPago)">
                    <img src="../../public/img/icons/delete.svg" alt="img" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal para editar forma de pago -->
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">Editar Forma de Pago</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="editFormaPagoDescripcion" class="form-label">Descripción</label>
              <input type="text" class="form-control" id="editFormaPagoDescripcion" v-model="editedFormaPago.Descripcion">
            </div>
            <div class="mb-3">
              <label for="editFormaPagoDetalles" class="form-label">Detalles</label>
              <input type="text" class="form-control" id="editFormaPagoDetalles" v-model="editedFormaPago.Detalles">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" @click="confirmUpdateFormaPago()">Guardar Cambios</button>
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
      formasPago: [],
      searchQuery: "",
      editedFormaPago: {
        IdFormaPago: null,
        Descripcion: '',
        Detalles: ''
      },
    };
  },
  computed: {
    filteredFormasPago() {
      return this.formasPago.filter((formaPago) =>
        formaPago.Descripcion.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        formaPago.Detalles.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    fetchFormasPago() {
      axios.get("http://localhost:3000/api/v1/formas_pago")
        .then((response) => {
          if (response.data.success) {
            this.formasPago = response.data.FormasPago;
          }
        })
        .catch((error) => {
          console.error("Error fetching formas de pago:", error);
        });
    },
    filterFormasPago() {
      // Método para filtrar formas de pago, se ejecuta cuando cambia searchQuery
    },
    editFormaPago(id) {
      this.editedFormaPago = { ...this.formasPago.find(formaPago => formaPago.IdFormaPago === id) };
      $('#editModal').modal('show');
    },
    async confirmUpdateFormaPago() {
  try {
    const response = await axios.patch(`http://localhost:3000/api/v1/formas_pago/${this.editedFormaPago.IdFormaPago}`, {
      Descripcion: this.editedFormaPago.Descripcion,
      Detalles: this.editedFormaPago.Detalles
    });
    
    if (response.data.success) {
      // Actualización exitosa, actualiza localmente la forma de pago
      const index = this.formasPago.findIndex(fp => fp.IdFormaPago === this.editedFormaPago.IdFormaPago);
      if (index !== -1) {
        this.formasPago[index].Descripcion = this.editedFormaPago.Descripcion;
        this.formasPago[index].Detalles = this.editedFormaPago.Detalles;
      }
      $('#editModal').modal('hide');
      Swal.fire("¡Actualizado!", "La forma de pago ha sido actualizada.", "success");
    } else {
      Swal.fire("Error", "No se pudo actualizar la forma de pago. Intente nuevamente.", "error");
    }
  } catch (error) {
    console.error("Error al actualizar la forma de pago:", error);
    Swal.fire("Error", "Error al actualizar la forma de pago. Intente nuevamente.", "error");
  }
},
    async deleteFormaPago(id) {
      try {
        await axios.delete(`http://localhost:3000/api/v1/formas_pago/${id}`);
        this.formasPago = this.formasPago.filter((formaPago) => formaPago.IdFormaPago !== id);
        Swal.fire("¡Borrado!", "La forma de pago ha sido borrada.", "success");
      } catch (error) {
        console.error("Error al borrar la forma de pago:", error);
        Swal.fire("Error", "Error al borrar la forma de pago. Intente nuevamente.", "error");
      }
    },
  },
  mounted() {
    this.fetchFormasPago();
  },
};
</script>

<style>
/* Agrega tus estilos aquí */
</style>