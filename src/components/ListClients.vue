<template>
  <div class="content">
    <div class="page-header">
      <div class="page-title">
        <h4>Lista de Clientes</h4>
        <h6>Manejo de Clientes</h6>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="table-top">
          <!-- Búsqueda y filtros -->
          <div class="search-set">
            <!-- Aquí puedes agregar tu filtro de búsqueda si es necesario -->
            <div class="search-input">
              <a class="btn btn-searchset" @click="buscarClientes">
                <img src="../../public/img/icons/search-white.svg" alt="Buscar" />
              </a>
              <div id="DataTables_Table_0_filter" class="dataTables_filter">
                <label>
                  <input
                    type="search"
                    class="form-control form-control-sm"
                    placeholder="Buscar..."
                    aria-controls="DataTables_Table_0"
                    v-model="filtroNombre"
                  />
                </label>
              </div>
            </div>
          </div>

          <!-- Botones de exportación -->
          <div class="wordset">
            <ul>
              <li><a href="#" @click="exportarPDF"><img src="../../public/img/icons/pdf.svg" alt="Exportar a PDF" /></a></li>
              <li><a href="#" @click="exportarExcel"><img src="../../public/img/icons/excel.svg" alt="Exportar a Excel" /></a></li>
              <li><a href="#" @click="imprimir"><img src="../../public/img/icons/printer.svg" alt="Imprimir" /></a></li>
            </ul>
          </div>
        </div>

        <!-- Filtros de búsqueda avanzada -->
        <div class="card" id="filter_inputs">
          <div class="card-body pb-0">
            <div class="row">
              <!-- Aquí puedes agregar más campos de filtro si es necesario -->
              <div class="col-lg-2 col-sm-6 col-12">
                <div class="form-group">
                  <input type="text" placeholder="Nombre del Cliente" v-model="filtroNombre" />
                </div>
              </div>
              <div class="col-lg-2 col-sm-6 col-12">
                <div class="form-group">
                  <input type="text" placeholder="Teléfono" v-model="filtroTelefono" />
                </div>
              </div>
              <div class="col-lg-2 col-sm-6 col-12">
                <div class="form-group">
                  <input type="text" placeholder="Email" v-model="filtroEmail" />
                </div>
              </div>
              <div class="col-lg-2 col-sm-6 col-12">
                <div class="form-group">
                  <select class="select" v-model="filtroTipo">
                    <option value="">Todos</option>
                    <option value="Individual">Individual</option>
                    <option value="Legal">Legal</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-1 col-sm-6 col-12 ms-auto">
                <div class="form-group">
                  <a class="btn btn-filters ms-auto" @click="buscarClientes">
                    <img src="../../public/img/icons/search-whites.svg" alt="Buscar" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabla de clientes -->
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
                <th>Tipo</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody v-if="clientes.length > 0">
              <tr v-for="(cliente, index) in clientes" :key="index">
                <td>
                  <label class="checkboxs">
                    <input type="checkbox" />
                    <span class="checkmarks"></span>
                  </label>
                </td>
                <td>{{ cliente.Nombre }}</td>
                <td>{{ cliente.Apellido }}</td>
                <td>{{ cliente.Tipo }}</td>
                <td>{{ cliente.Telefono }}</td>
                <td><a :href="`mailto:${cliente.Email}`">{{ cliente.Email }}</a></td>
                <td>
                  <a class="me-3" @click="abrirModalEditar(cliente)">
                    <img src="../../public/img/icons/edit.svg" alt="Editar" />
                  </a>
                  <a class="me-3 confirm-text" @click="borrarCliente(cliente.IdCliente)">
                    <img src="../../public/img/icons/delete.svg" alt="Eliminar" />
                  </a>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="7" class="text-center">No hay clientes que mostrar.</td>
              </tr>
            </tbody>
          </table>

          <!-- Opciones de paginación y tamaño de página -->
          <div class="dataTables_length">
            <label>
              <select v-model="pageSize" class="custom-select custom-select-sm form-control form-control-sm">
                <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
              </select>
            </label>
          </div>
          <div class="dataTables_paginate paging_numbers">
            <ul class="pagination">
              <li class="paginate_button page-item" v-for="page in totalPages" :key="page" :class="{ 'active': page === currentPage }">
                <a href="#" class="page-link" @click.prevent="cambiarPagina(page)">{{ page }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import html2pdf from 'html2pdf.js'; // Librería para exportar a PDF
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default {
  data() {
    return {
      clientes: [], // Array para almacenar los clientes
      filtroNombre: '',
      filtroTelefono: '',
      filtroEmail: '',
      filtroTipo: '',
      pageSize: 10, // Tamaño de página predeterminado
      currentPage: 1, // Página actual
      totalClientes: 0, // Total de clientes
      pageSizes: [10, 25, 50, 100] // Opciones de tamaño de página
    };
  },
  mounted() {
    // Obtener los datos de los clientes al montar el componente
    this.fetchClientes();
  },
  methods: {
    // Método para exportar a PDF
    exportarPDF() {
      const element = document.querySelector('.table-responsive');
      html2pdf(element, {
        margin: 1,
        filename: 'lista_clientes.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      });
    },

    // Método para exportar a Excel
    exportarExcel() {
      const ws = XLSX.utils.json_to_sheet(this.clientes); // Convertir JSON a hoja de Excel
      const wb = XLSX.utils.book_new(); // Crear libro de Excel
      XLSX.utils.book_append_sheet(wb, ws, 'Clientes'); // Añadir hoja al libro
      // Generar archivo Excel y guardarlo
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'lista_clientes.xlsx');
    },

    // Método para imprimir
    imprimir() {
      window.print(); // Imprime la página actual
    },

    // Método para obtener clientes
    async fetchClientes() {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/clientes');
        this.clientes = response.data.clientes;
        this.totalClientes = response.data.total;
      } catch (error) {
        console.error('Error fetching clientes:', error);
      }
    },

    // Método para buscar clientes con filtros
    async buscarClientes() {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/clientes', {
          params: {
            nombre: this.filtroNombre,
            telefono: this.filtroTelefono,
            email: this.filtroEmail,
            tipo: this.filtroTipo,
            page: this.currentPage,
            pageSize: this.pageSize
          }
        });
        this.clientes = response.data.clientes;
        this.totalClientes = response.data.total;
      } catch (error) {
        console.error('Error searching clientes:', error);
      }
    },
       // Método para cambiar de página
      async cambiarPagina(page) {
        this.currentPage = page;
        await this.buscarClientes();
      },
    // Método para abrir modal de edición
    abrirModalEditar(cliente) {
      // Aquí puedes implementar la lógica para abrir un modal de edición con los datos del cliente seleccionado
      console.log('Editar cliente:', cliente);
    },

    // Método para eliminar cliente
    async borrarCliente(idCliente) {
      if (confirm('¿Estás seguro de eliminar este cliente?')) {
        try {
          await axios.delete(`http://localhost:3000/api/v1/clientes/${idCliente}`);
          await this.fetchClientes();
          alert('Cliente eliminado correctamente.');
        } catch (error) {
          console.error('Error deleting cliente:', error);
          alert('Error al eliminar cliente.');
        }
      }
    }
  },
};
</script>

<style scoped>
/* Estilos CSS personalizados para tu componente */
</style>
   
