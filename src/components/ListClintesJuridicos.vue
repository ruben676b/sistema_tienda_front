<template>
    <div class="content">
      <div class="page-header">
        <div class="page-title">
          <h4>Lista de Clientes Jurídicos</h4>
          <h6>Manejo de Clientes Jurídicos</h6>
        </div>
      </div>
  
      <div class="card">
        <div class="card-body">
          <!-- Opciones de exportación y filtrado -->
          <div class="table-top">
            <div class="wordset">
              <ul>
                <li>
                  <a href="#" @click="exportToPDF">
                    <img src="../../public/img/icons/pdf.svg" alt="Exportar a PDF" />
                  </a>
                </li>
                <li>
                  <a href="#" @click="exportToExcel">
                    <img src="../../public/img/icons/excel.svg" alt="Exportar a Excel" />
                  </a>
                </li>
                <li>
                  <a href="#" @click="printData">
                    <img src="../../public/img/icons/printer.svg" alt="Imprimir" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
  
          <!-- Mensajes de error o sin datos -->
          <div v-if="loading">
            <p>Cargando clientes jurídicos...</p>
          </div>
          <div v-else-if="error">
            <p>Error al cargar clientes jurídicos.</p>
          </div>
          <div v-else-if="clientesJuridicos.length === 0">
            <p>No hay clientes jurídicos registrados.</p>
          </div>
  
          <!-- Tabla de clientes jurídicos -->
          <div v-else class="table-responsive">
            <table class="table datanew dataTable no-footer">
              <thead>
                <tr>
                  <th>
                    <label class="checkboxs">
                      <input type="checkbox" />
                      <span class="checkmarks"></span>
                    </label>
                  </th>
                  <th>RUC Cliente</th>
                  <th>Nombre Empresa</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cliente, index) in clientesJuridicos" :key="index">
                  <td>
                    <label class="checkboxs">
                      <input type="checkbox" />
                      <span class="checkmarks"></span>
                    </label>
                  </td>
                  <td>{{ cliente.RUCCliente }}</td>
                  <td>{{ cliente.NombreEmpresa }}</td>
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
            </table>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Modal de edición -->
    <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">Editar Cliente Jurídico</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Formulario de edición -->
            <form @submit.prevent="editarCliente">
              <div class="form-group">
                <label for="editRUC">RUC Cliente</label>
                <input type="text" class="form-control" id="editRUC" v-model="clienteEditado.RUCCliente" required>
              </div>
              <div class="form-group">
                <label for="editNombreEmpresa">Nombre Empresa</label>
                <input type="text" class="form-control" id="editNombreEmpresa" v-model="clienteEditado.NombreEmpresa" required>
              </div>
              <button type="submit" class="btn btn-primary">Guardar Cambios</button>
            </form>
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
        clientesJuridicos: [], // Array para almacenar los clientes jurídicos
        clienteEditado: { // Objeto para editar cliente jurídico
          RUCCliente: '',
          NombreEmpresa: ''
        },
        loading: false,
        error: false
      };
    },
    mounted() {
      // Obtener los datos de los clientes jurídicos al montar el componente
      this.fetchClientesJuridicos();
    },
    methods: {
      // Método para obtener clientes jurídicos
      async fetchClientesJuridicos() {
        this.loading = true;
        try {
          const response = await axios.get('http://localhost:3000/api/v1/clientes-juridicos');
          this.clientesJuridicos = response.data.clientes;
        } catch (error) {
          console.error('Error fetching clientes jurídicos:', error);
          this.error = true;
        } finally {
          this.loading = false;
        }
      },
      // Método para borrar cliente jurídico
      async borrarCliente(idCliente) {
        try {
          const response = await axios.delete(`http://localhost:3000/api/v1/clientes-juridicos/${idCliente}`);
          if (response.data.success) {
            this.clientesJuridicos = this.clientesJuridicos.filter(cli => cli.IdCliente !== idCliente);
          } else {
            alert('Error al borrar el cliente jurídico');
          }
        } catch (error) {
          console.error('Error deleting cliente jurídico:', error);
        }
      },
      // Método para abrir el modal de edición y cargar datos del cliente jurídico seleccionado
      abrirModalEditar(cliente) {
        this.clienteEditado = { ...cliente }; // Copiar cliente jurídico seleccionado al objeto de edición
        $('#editModal').modal('show'); // Mostrar modal de edición
      },
      // Método para editar cliente jurídico
      async editarCliente() {
        try {
          const response = await axios.patch(`http://localhost:3000/api/v1/clientes-juridicos/${this.clienteEditado.IdCliente}`, this.clienteEditado);
          if (response.data.success) {
            // Actualizar lista de clientes jurídicos o refrescar la página
            this.fetchClientesJuridicos();
            $('#editModal').modal('hide'); // Ocultar modal después de editar
          } else {
            alert('Error al editar el cliente jurídico');
          }
        } catch (error) {
          console.error('Error editing cliente jurídico:', error);
        }
      },
      // Métodos adicionales para exportar, imprimir, etc. según sea necesario
      exportToPDF() {
        // Implementa la lógica para exportar a PDF
      },
      exportToExcel() {
        // Implementa la lógica para exportar a Excel
      },
      printData() {
        // Implementa la lógica para imprimir datos
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados según tu diseño */
  /* Puedes añadir estilos específicos aquí si es necesario */
  </style>
  