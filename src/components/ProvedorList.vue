<template>
    <div>
      <div class="page-header">
        <div class="page-title">
          <h4>Lista de Marcas</h4>
          <h6>Gestiona tus Marcas</h6>
        </div>
        <div class="page-btn">
          <router-link to="/dashboard/marcaAdd">
            <a class="btn btn-added">
              <img src="../../public/img/icons/plus.svg" alt="img" />
              Agregar marca
            </a>
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
                  <span><img src="../../public/img/icons/closes.svg" alt="img" /></span>
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
                  <th>
                    <label class="checkboxs">
                      <input type="checkbox" id="select-all" />
                      <span class="checkmarks"></span>
                    </label>
                  </th>
                  <th>Nombre de la Marca</th>
                  <th>Descripción</th>
                  <th>País</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="marca in filteredMarcas" :key="marca.idMarca">
                  <td>
                    <label class="checkboxs">
                      <input type="checkbox" />
                      <span class="checkmarks"></span>
                    </label>
                  </td>
                  <td>{{ marca.nombre}}</td>
                  <td>{{ marca.id }}</td>
                  <td>
                    <a class="me-3" @click="editMarca(marca.idMarca)">
                      <img src="../../public/img/icons/edit.svg" alt="img" />
                    </a>
                    <a class="me-3 confirm-text" @click="deleteMarca(marca.idMarca)">
                      <img src="../../public/img/icons/delete.svg" alt="img" />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
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
        marcas: [],
        filteredMarcas: [],
        searchQuery: "",
      };
    },
    methods: {
      async fetchMarcas() {
        try {
          const response = await axios.get("http://localhost:3000/api/marcas");
          this.marcas = response.data; // Suponiendo que la API devuelve un array de marcas
          this.filterMarcas();
        } catch (error) {
          console.error("Error fetching marcas:", error);
        }
      },
      async deleteMarca(idMarca) {
        try {
          const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, bórralo!",
          });
          if (result.isConfirmed) {
            await axios.delete(`http
  ://localhost:3000/api/marcas/${idMarca}`);
  Swal.fire("¡Borrado!", "La marca ha sido borrada.", "success");
  this.fetchMarcas();
  }
  } catch (error) {
  console.error("Error al borrar la marca:", error);
  Swal.fire({
  icon: "error",
  title: "Error",
  text: "Error al borrar la marca. Intente nuevamente.",
  });
  }
  },
  filterMarcas() {
  if (this.searchQuery) {
  this.filteredMarcas = this.marcas.filter((marca) =>
  marca.nombreMarca.toLowerCase().includes(this.searchQuery.toLowerCase())
  );
  } else {
  this.filteredMarcas = this.marcas;
  }
  },
  editMarca(idMarca) {
  this.$router.push({ name: "MarcaEdit", params: { idMarca } });
  },
  },
  mounted() {
  this.fetchMarcas();
  },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos para este componente */
  </style>