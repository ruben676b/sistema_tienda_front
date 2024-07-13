<template>
    <div class="content">
      <div class="page-header">
        <div class="page-title">
          <h4>Lista de Clientes Naturales</h4>
          <h6>Manejo de Clientes</h6>
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
                      aria-controls="DataTables_Table_0"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div class="wordset">
              <ul>
                <li>
                  <a href="#" @click="exportarPDF">
                    <img src="../../public/img/icons/pdf.svg" alt="img" />
                  </a>
                </li>
                <li>
                  <a href="#" @click="exportarExcel">
                    <img src="../../public/img/icons/excel.svg" alt="img" />
                  </a>
                </li>
                <li>
                  <a href="#" @click="imprimir">
                    <img src="../../public/img/icons/printer.svg" alt="img" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
  
          <div class="card" id="filter_inputs">
            <div class="card-body pb-0">
              <!-- Aquí puedes agregar filtros adicionales si es necesario -->
            </div>
          </div>
  
          <div class="table-responsive">
            <template v-if="clientes.length > 0">
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
                    <th>DNI</th>
                    <th>Teléfono</th>
                    <th>Email</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(cliente, index) in clientes" :key="index">
                    <td>
                      <label class="checkboxs">
                        <input type="checkbox" />
                        <span class="checkmarks"></span>
                      </label>
                    </td>
                    <td>{{ cliente.nombre }}</td>
                    <td>{{ cliente.apellido }}</td>
                    <td>{{ cliente.dni }}</td>
                    <td>{{ cliente.telefono }}</td>
                    <td>
                      <a :href="`mailto:${cliente.email}`">{{ cliente.email }}</a>
                    </td>
                    <td>
                      <a class="me-3" @click="abrirModalEditar(cliente)">
                        <img src="../../public/img/icons/edit.svg" alt="img" />
                      </a>
                      <a class="me-3 confirm-text" @click="borrarCliente(cliente.id)">
                        <img src="../../public/img/icons/delete.svg" alt="img" />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="dataTables_length">
                <label>
                  <select name="DataTables_Table_0_length" class="custom-select custom-select-sm form-control form-control-sm">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </label>
              </div>
              <div class="dataTables_paginate paging_numbers">
                <ul class="pagination">
                  <li class="paginate_button page-item active">
                    <a href="#" class="page-link">1</a>
                  </li>
                  <li class="paginate_button page-item">
                    <a href="#" class="page-link">2</a>
                  </li>
                </ul>
              </div>
              <div class="dataTables_info" role="status" aria-live="polite">
                1 - 10 de {{ clientes.length }} clientes
              </div>
            </template>
            <template v-else>
              <div class="alert alert-warning" role="alert">
                No hay clientes naturales disponibles.
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  
    <!-- MODAL EDIT -->
    <div>
      <!-- Modal de edición -->
      <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editModalLabel">Editar Cliente</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <!-- Formulario de edición -->
              <form @submit.prevent="editarCliente">
                <div class="form-group">
                  <label for="editNombre">Nombre</label>
                  <input type="text" class="form-control" id="editNombre" v-model="clienteEditado.nombre" required>
                </div>
                <div class="form-group">
                  <label for="editApellido">Apellido</label>
                  <input type="text" class="form-control" id="editApellido" v-model="clienteEditado.apellido" required>
                </div>
                <div class="form-group">
                  <label for="editDNI">DNI</label>
                  <input type="text" class="form-control" id="editDNI" v-model="clienteEditado.dni">
                </div>
                <div class="form-group">
                  <label for="editTelefono">Teléfono</label>
                  <input type="text" class="form-control" id="editTelefono" v-model="clienteEditado.telefono">
                </div>
                <div class="form-group">
                  <label for="editEmail">Email</label>
                  <input type="email" class="form-control" id="editEmail" v-model="clienteEditado.email" required>
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
  import axios from 'axios';
  import html2pdf from 'html2pdf.js'; // Librería para exportar a PDF
  import * as XLSX from 'xlsx';
  import { saveAs } from 'file-saver';
  
  export default {
    data() {
      return {
        clientes: [], // Array para almacenar los clientes
        clienteEditado: { // Objeto para editar cliente
          nombre: '',
          apellido: '',
          dni: '',
          telefono: '',
          email: ''
        }
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
          const response = await axios.get('http://localhost:3000/api/v1/clientes-naturales');
          this.clientes = response.data.clientes;
        } catch (error) {
          console.error('Error al obtener clientes:', error);
        }
      },
      // Método para borrar cliente
      async borrarCliente(idCliente) {
        try {
          const response = await axios.delete(`http://localhost:3000/api/v1/clientes-naturales/${idCliente}`);
          console.log('Cliente borrado:', response.data);
          // Actualizar lista de clientes después de borrar
          this.fetchClientes();
        } catch (error) {
          console.error('Error deleting cliente:', error);
        }
      },
      // Método para abrir modal de edición
      abrirModalEditar(cliente) {
        // Asignar cliente a editar
        this.clienteEditado = { ...cliente };
        // Mostrar modal de edición
        $('#editModal').modal('show');
      },
      // Método para editar cliente
      async editarCliente() {
        try {
          const response = await axios.put(`http://localhost:3000/api/v1/clientes-naturales/${this.clienteEditado.id}`, this.clienteEditado);
          console.log('Cliente editado:', response.data);
          // Cerrar modal después de editar
          $('#editModal').modal('hide');
          // Actualizar lista de clientes después de editar
          this.fetchClientes();
        } catch (error) {
          console.error('Error editing cliente:', error);
        }
      }
    }
  };
  </script>
  
  <style>
  /* Aquí puedes agregar estilos personalizados si es necesario */
  </style>
  