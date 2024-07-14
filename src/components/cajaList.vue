<template>
    <div>
      <div class="page-header">
        <div class="page-title">
          <h4>Lista de Cajas</h4>
          <h6>Gestiona tus Cajas</h6>
        </div>
        <div class="page-btn">
          <router-link :to="{ name: 'AddCaja' }" class="btn btn-added">
            <img src="../../public/img/icons/plus.svg" alt="img" />
            Aperturar Caja
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
                      @input="filterCajas"
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
                  <th>Fecha Apertura</th>
                  <th>Fecha Cierre</th>
                  <th>Monto Apertura</th>
                  <th>Monto Cierre</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="caja in filteredCajas" :key="caja.IdCaja">
                  <td>{{ caja.FechaApertura }}</td>
                  <td>{{ caja.FechaCierre }}</td>
                  <td>{{ caja.MontoInicial }}</td>
                  <td>{{ caja.MontoCierre }}</td>
                  <td>
                    <a class="me-3" @click="editCaja(caja.IdCaja)">
                      <img src="../../public/img/icons/edit.svg" alt="img" />
                    </a>
                    <a class="me-3 confirm-text" @click="deleteCaja(caja.IdCaja)">
                      <img src="../../public/img/icons/delete.svg" alt="img" />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
      <!-- Modal para editar caja -->
      <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editModalLabel">Editar Caja</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="editCajaFechaApertura" class="form-label">Fecha Apertura</label>
                <input type="text" class="form-control" id="editCajaFechaApertura" v-model="editedCaja.FechaApertura">
              </div>
              <div class="mb-3">
                <label for="editCajaFechaCierre" class="form-label">Fecha Cierre</label>
                <input type="text" class="form-control" id="editCajaFechaCierre" v-model="editedCaja.FechaCierre">
              </div>
              <div class="mb-3">
                <label for="editCajaMontoApertura" class="form-label">Monto Apertura</label>
                <input type="text" class="form-control" id="editCajaMontoApertura" v-model="editedCaja.MontoInicial">
              </div>
              <div class="mb-3">
                <label for="editCajaMontoCierre" class="form-label">Monto Cierre</label>
                <input type="text" class="form-control" id="editCajaMontoCierre" v-model="editedCaja.MontoCierre">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-primary" @click="confirmUpdateCaja()">Guardar Cambios</button>
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
        cajas: [],
        searchQuery: "",
        editedCaja: {
          IdCaja: null,
          FechaApertura: '',
          MontoInicial: '',
          FechaCierre: '',
          MontoCierre: ''
        },
      };
    },
    computed: {
      filteredCajas() {
        return this.cajas.filter((caja) =>
          caja.FechaApertura.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          caja.FechaCierre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          caja.MontoInicial.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          caja.MontoCierre.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods: {
      fetchCajas() {
        axios.get("http://localhost:3000/api/v1/caja")
          .then((response) => {
            if (response.data.success) {
              this.cajas = response.data.cajas;
            }
          })
          .catch((error) => {
            console.error("Error fetching cajas:", error);
          });
      },
      filterCajas() {
        // Método para filtrar cajas, se ejecuta cuando cambia searchQuery
      },
      editCaja(id) {
        this.editedCaja = { ...this.cajas.find(caja => caja.IdCaja === id) };
        $('#editModal').modal('show');
      },
      async confirmUpdateCaja() {
  try {
    const response = await axios.patch(`http://localhost:3000/api/v1/caja/${this.editedCaja.IdCaja}`, {
      FechaApertura: new Date(this.editedCaja.FechaApertura).toISOString(),
      FechaCierre: this.editedCaja.FechaCierre ? new Date(this.editedCaja.FechaCierre).toISOString() : null,
      MontoInicial: this.editedCaja.MontoInicial, // Cambiado de MontoApertura a MontoInicial
      MontoCierre: this.editedCaja.MontoCierre
    });

    if (response.data.success) {
      // Actualización exitosa, actualiza localmente la caja
      const index = this.cajas.findIndex(c => c.IdCaja === this.editedCaja.IdCaja);
      if (index !== -1) {
        this.cajas[index].FechaApertura = this.editedCaja.FechaApertura;
        this.cajas[index].FechaCierre = this.editedCaja.FechaCierre;
        this.cajas[index].MontoInicial = this.editedCaja.MontoInicial; // Cambiado de MontoApertura a MontoInicial
        this.cajas[index].MontoCierre = this.editedCaja.MontoCierre;
      }
      $('#editModal').modal('hide');
      Swal.fire("¡Actualizado!", "La caja ha sido actualizada.", "success");
    } else {
      Swal.fire("Error", "No se pudo actualizar la caja. Intente nuevamente.", "error");
    }
  } catch (error) {
    console.error("Error al actualizar la caja:", error);
    Swal.fire("Error", "Error al actualizar la caja. Intente nuevamente.", "error");
  }
},
      async deleteCaja(id) {
        try {
          await axios.delete(`http://localhost:3000/api/v1/caja/${id}`);
          this.cajas = this.cajas.filter((caja) => caja.IdCaja !== id);
          Swal.fire("¡Borrado!", "La caja ha sido borrada.", "success");
        } catch (error) {
          console.error("Error al borrar la caja:", error);
          Swal.fire("Error", "Error al borrar la caja. Intente nuevamente.", "error");
        }
      },
    },
    mounted() {
      this.fetchCajas();
    },
  };
  </script>
  
  <style>
  /* Agrega tus estilos aquí */
  </style>
  