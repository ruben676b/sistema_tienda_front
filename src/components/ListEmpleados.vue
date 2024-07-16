<template>
    <div class="content">
      <div class="page-header">
        <div class="page-title">
          <h4>Lista de Empleados</h4>
          <h6>Manejo de Empleados</h6>
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
                  <a
                    dhref="#" @click="exportarPDF"
                    ><img src="../../public/img/icons/pdf.svg" alt="img"
                  /></a>
                </li>
                <li>
                  <a
                    href="#" @click="exportarExcel"
                    ><img src="../../public/img/icons/excel.svg" alt="img"
                  /></a>
                </li>
                <li>
                  <a
                    href="#" @click="imprimir"
                    ><img src="../../public/img/icons/printer.svg" alt="img"
                  /></a>
                </li>
              </ul>
            </div>
          </div>
  
          <div class="card" id="filter_inputs">
            <div class="card-body pb-0">
              <div class="row">
                <div class="col-lg-2 col-sm-6 col-12">
                  <div class="form-group">
                    <input type="text" placeholder="Nombre del Empleado" />
                  </div>
                </div>
                <div class="col-lg-2 col-sm-6 col-12">
                  <div class="form-group">
                    <input type="text" placeholder="Teléfono" />
                  </div>
                </div>
                <div class="col-lg-2 col-sm-6 col-12">
                  <div class="form-group">
                    <input type="text" placeholder="Email" />
                  </div>
                </div>
                <div class="col-lg-2 col-sm-6 col-12">
                  <div class="form-group">
                    <select class="select">
                      <option>Deshabilitado</option>
                      <option>Habilitado</option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-1 col-sm-6 col-12 ms-auto">
                  <div class="form-group">
                    <a class="btn btn-filters ms-auto">
                      <img src="../../public/img/icons/search-whites.svg" alt="img" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
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
                  <!-- <th>Perfil</th> -->
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>ID Empleado</th>
                  <th>Teléfono</th>
                  <th>Email</th>
                  <th>Estatus</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(empleado, index) in empleados" :key="index">
                  <td>
                    <label class="checkboxs">
                      <input type="checkbox" />
                      <span class="checkmarks"></span>
                    </label>
                  </td>
                  <!-- <td class="productimgname">
                    <a href="javascript:void(0);" class="product-img">
                      <img :src="empleado.profileImage" alt="product" />
                    </a>
                  </td> -->
                  <td>{{ empleado.Nombre }}</td>
                  <td>{{ empleado.Apellido }}</td>
                  <td>{{ empleado.IdEmpleado }}</td>
                  <td>{{ empleado.Telefono }}</td>
                  <td>
                    <a :href="`mailto:${empleado.Email}`">{{ empleado.Email }}</a>
                  </td>
                  <td>
                    <div class="status-toggle d-flex justify-content-between align-items-center">
                      <input type="checkbox" :id="`empleado${index}`" class="check" />
                      <label :for="`empleado${index}`" class="checktoggle">checkbox</label>
                    </div>
                  </td>
                  <td>
                    <a class="me-3" @click="abrirModalEditar(empleado)">
                      <img src="../../public/img/icons/edit.svg" alt="img" />
                    </a>
                    <a class="me-3 confirm-text" @click="borrarEmpleado(empleado.IdEmpleado)">
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
              1 - 10 de 12 items
            </div>
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
            <h5 class="modal-title" id="editModalLabel">Editar Empleado</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Formulario de edición -->
            <form @submit.prevent="editarEmpleado">
              <div class="form-group">
                <label for="editNombre">Nombre</label>
                <input type="text" class="form-control" id="editNombre" v-model="empleadoEditado.Nombre" required>
              </div>
              <div class="form-group">
                <label for="editApellido">Apellido</label>
                <input type="text" class="form-control" id="editApellido" v-model="empleadoEditado.Apellido" required>
              </div>
              <div class="form-group">
                <label for="editTelefono">Teléfono</label>
                <input type="text" class="form-control" id="editTelefono" v-model="empleadoEditado.Telefono">
              </div>
              <div class="form-group">
                <label for="editEmail">Email</label>
                <input type="email" class="form-control" id="editEmail" v-model="empleadoEditado.Email" required>
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
import {saveAs} from 'file-saver';

export default {
  data() {
    return {
      empleados: [], // Array para almacenar los empleados
      empleadoEditado: { // Objeto para editar empleado
        Nombre: '',
        Apellido: '',
        Telefono: '',
        Email: ''
      }
    };
  },
  mounted() {
    // Obtener los datos de los empleados al montar el componente
    this.fetchEmpleados();
  },
  methods: {

    // Método para exportar a PDF
    exportarPDF() {
      const element = document.querySelector('.table-responsive');
      html2pdf(element, {
        margin: 1,
        filename: 'lista_empleados.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      });
    },

     // Método para exportar a Excel
     exportarExcel() {
      const ws = XLSX.utils.json_to_sheet(this.empleados); // Convertir JSON a hoja de Excel
      const wb = XLSX.utils.book_new(); // Crear libro de Excel
      XLSX.utils.book_append_sheet(wb, ws, 'Empleados'); // Añadir hoja al libro
      // Generar archivo Excel y guardarlo
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'lista_empleados.xlsx');
    },

    // Método para imprimir
    imprimir() {
      window.print(); // Imprime la página actual
    },

    // Método para obtener empleados
    async fetchEmpleados() {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/empleados');
        this.empleados = response.data.empleados;
      } catch (error) {
        console.error('Error fetching empleados:', error);
      }
    },
    // Método para borrar empleado
    async borrarEmpleado(idEmpleado) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/v1/empleados/${idEmpleado}`);
        if (response.data.success) {
          this.empleados = this.empleados.filter(emp => emp.IdEmpleado !== idEmpleado);
        } else {
          alert('Error al borrar el empleado');
        }
      } catch (error) {
        console.error('Error deleting empleado:', error);
      }
    },
    // Método para abrir el modal de edición y cargar datos del empleado seleccionado
    abrirModalEditar(empleado) {
      this.empleadoEditado = { ...empleado }; // Copiar empleado seleccionado al objeto de edición
      $('#editModal').modal('show'); // Mostrar modal de edición
    },
    // Método para editar empleado
    async editarEmpleado() {
      try {
        const response = await axios.patch(`http://localhost:3000/api/v1/empleados/${this.empleadoEditado.IdEmpleado}`, this.empleadoEditado);
        if (response.data.success) {
          // Actualizar lista de empleados o refrescar la página
          this.fetchEmpleados();
          $('#editModal').modal('hide'); // Ocultar modal después de editar
        } else {
          alert('Error al editar el empleado');
        }
      } catch (error) {
        console.error('Error editing empleado:', error);
      }
    }
  }
};
</script>
  
  <style scoped>
  /* Estilos actualizados para el nuevo diseño */
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
  
  .page-btn .btn-added {
    background-color: #28a745;
    color: #fff;
  }
  
  .page-btn .btn-added img {
    margin-right: 10px;
  }
  
  .card {
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .card-body {
    padding: 20px;
  }
  
  .table-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .search-set {
    display: flex;
    align-items: center;
  }
  
  .search-path .btn-filter {
    margin-right: 10px;
  }
  
  .search-input {
    display: flex;
    align-items: center;
  }
  
  .search-input .btn-searchset {
    margin-right: 10px;
  }
  
  .wordset ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
  }
  
  .wordset ul li {
    margin-right: 10px;
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
  
  .status-toggle .check {
    display: none;
  }
  
  .status-toggle .checktoggle {
    cursor: pointer;
  }
  
  .status-toggle .checktoggle:before {
    content: '✔';
    display: block;
    width: 16px;
    height: 16px;
    border: 2px solid #28a745;
    border-radius: 3px;
    text-align: center;
    line-height: 14px;
    color: #fff;
    background-color: #28a745;
  }
  
  .status-toggle .check:not(:checked) + .checktoggle:before {
    background-color: #fff;
    color: #28a745;
  }
  
  .productimgname .product-img img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .dataTables_length {
    margin-top: 20px;
  }
  
  .dataTables_paginate {
    margin-top: 20px;
  }
  
  .pagination {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
  }
  
  .pagination .page-item {
    margin-right: 5px;
  }
  
  .pagination .page-link {
    padding: 5px 10px;
    border: 1px solid #ddd;
    border-radius: 3px;
    text-decoration: none;
    color: #28a745;
  }
  
  .pagination .page-link:hover {
    background-color: #28a745;
    color: #fff;
  }
  
  .pagination .page-item.active .page-link {
    background-color: #28a745;
    color: #fff;
  }
  </style>
  