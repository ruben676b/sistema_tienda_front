<template>
    <div>
      <div class="page-header">
        <div class="page-title">
          <h4>Lista de proveedores</h4>
          <h6>Gestiona tu Proveedor</h6>
        </div>
        <div class="page-btn">
          <router-link to="/dashboard/provedorAdd">
            <a class="btn btn-added">
              <img src="../../public/img/icons/plus.svg" alt="img" />
              Agregar proveedor
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
                      @input="filterProveedores"
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
                  <th>Nombre del proveedor</th>
                  <th>Teléfono</th>
                  <th>Correo electrónico</th>
                  <th>Dirección</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="proveedor in filteredProveedores" :key="proveedor.IdProveedor">
                  <td>
                    <label class="checkboxs">
                      <input type="checkbox" />
                      <span class="checkmarks"></span>
                    </label>
                  </td>
                  <td class="productimgname">
                    <a href="javascript:void(0);" class="product-img">
                      <img :src="getProveedorImage(proveedor.RutaFoto)" alt="proveedor" />
                    </a>
                    <a href="javascript:void(0);">{{ proveedor.NombreEmpresa }}</a>
                  </td>
                  <td>{{ proveedor.Telefono }}</td>
                  <td>{{ proveedor.Email }}</td>
                  <td>{{ proveedor.Direccion }}</td>
                  <td>
                    <a class="me-3" @click="editProveedor(proveedor.IdProveedor)">
                      <img src="../../public/img/icons/edit.svg" alt="img" />
                    </a>
                    <a class="me-3 confirm-text" @click="deleteProveedor(proveedor.IdProveedor)">
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
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        proveedores: [],
        searchQuery: '',
      };
    },
    computed: {
      filteredProveedores() {
        return this.proveedores.filter((proveedor) =>
          proveedor.NombreEmpresa.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods: {
      async fetchProveedores() {
        try {
          const response = await axios.get('http://localhost:3000/api/v1/proveedores');
          this.proveedores = response.data.proveedores;
        } catch (error) {
          console.error('Error al obtener los proveedores:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al obtener los proveedores. Intente nuevamente.',
          });
        }
      },
      editProveedor(id) {
        // Lógica para editar proveedor
        this.$router.push({ name: 'ProvedorEdit', params: { id } });
      },
      async deleteProveedor(id) {
        try {
          const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, bórralo!',
          });
          if (result.isConfirmed) {
            await axios.delete(`http://localhost:3000/api/v1/proveedores/${id}`);
            this.proveedores = this.proveedores.filter((proveedor) => proveedor.IdProveedor !== id);
            Swal.fire('¡Borrado!', 'El proveedor ha sido borrado.', 'success');
          }
        } catch (error) {
          console.error('Error al borrar el proveedor:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al borrar el proveedor. Intente nuevamente.',
          });
        }
      },
      filterProveedores() {
        // Lógica de filtrado de proveedores
        // Este método es llamado automáticamente por el v-model en el input de búsqueda
      },
      getProveedorImage(imagePath) {
        return imagePath ? `http://localhost:3000/api/v1/uploads/provedores/${imagePath}` : '../../public/img/product/noimage.png';
      },
    },
    mounted() {
      this.fetchProveedores();
    },
  };
  </script>
  
  <style scoped>
  .btn-submit {
    background-color: green;
    color: white;
  }
  
  .btn-cancel {
    background-color: red;
    color: white;
  }
  </style>
  