<template>
  <div>
    <h4>Datos del Cliente Jurídico</h4>
    <div class="form-group">
      <label>RUC Cliente</label>
      <input type="text" v-model="cliente.RUCCliente" @input="buscarClienteJuridico" class="form-control">
      <ul v-if="sugerencias.length > 0" class="list-group mt-2">
        <li v-for="sugerencia in sugerencias" :key="sugerencia.IdCliente" 
            class="list-group-item list-group-item-action"
            @click="seleccionarCliente(sugerencia)">
          {{ sugerencia.RUCCliente }} - {{ sugerencia.NombreEmpresa }}
        </li>
      </ul>
    </div>
    <div class="form-group">
      <label>Nombre Empresa</label>
      <input type="text" v-model="cliente.NombreEmpresa" class="form-control">
    </div>
    <div class="form-group">
      <label>Email</label>
      <input type="text" v-model="cliente.Email" class="form-control">
    </div>
    <div class="form-group">
      <label>Teléfono</label>
      <input type="text" v-model="cliente.Telefono" class="form-control">
    </div>
    <div class="form-group">
      <label>Dirección</label>
      <input type="text" v-model="cliente.DireccionCliente" class="form-control">
    </div>
    <button class="btn btn-submit me-2" @click="agregarClienteJuridico">Enviar</button>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      cliente: {
        RUCCliente: '',
        NombreEmpresa: '',
        Telefono: '',
        Email: '',
        DireccionCliente: '',
      },
      sugerencias: [],
    };
  },
  methods: {
    async buscarClienteJuridico() {
      if (this.cliente.RUCCliente.length >= 3) {
        try {
          const response = await axios.get('http://localhost:3000/api/v1/clientes-juridicos');
          const clientes = response.data.clientes || [];
          
          this.sugerencias = clientes.filter(cliente => 
            cliente.RUCCliente.startsWith(this.cliente.RUCCliente)
          ).slice(0, 5); // Limita a 5 sugerencias

          console.log('Sugerencias encontradas:', this.sugerencias);
        } catch (error) {
          console.error('Error al buscar el cliente:', error);
          this.sugerencias = [];
        }
      } else {
        this.sugerencias = [];
      }
    },
    seleccionarCliente(clienteSeleccionado) {
      this.cliente = { ...clienteSeleccionado };
      this.sugerencias = [];
    },
    async agregarClienteJuridico() {
      try {
        const clienteExistente = await this.verificarClienteExistente();
        if (clienteExistente) {
          Swal.fire({
            title: 'Cliente Existente',
            text: '¿Deseas actualizar la información del cliente?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, actualizar',
            cancelButtonText: 'No, cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.actualizarCliente(clienteExistente.IdCliente);
            }
          });
        } else {
          this.crearNuevoCliente();
        }
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al procesar la solicitud.', 'error');
      }
    },
    async verificarClienteExistente() {
      const response = await axios.get('http://localhost:3000/api/v1/clientes-juridicos');
      const clientes = response.data.clientes || [];
      return clientes.find(c => c.RUCCliente === this.cliente.RUCCliente);
    },
    async crearNuevoCliente() {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/clientes-juridicos', this.cliente);
        if (response.data.success) {
          Swal.fire('Cliente Jurídico agregado exitosamente!', '', 'success');
          this.limpiarFormulario();
        } else {
          Swal.fire('Error al agregar cliente jurídico', response.data.message, 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al agregar el cliente jurídico.', 'error');
      }
    },
    async actualizarCliente(idCliente) {
      try {
        const response = await axios.put(`http://localhost:3000/api/v1/clientes-juridicos/${idCliente}`, this.cliente);
        if (response.data.success) {
          Swal.fire('Cliente Jurídico actualizado exitosamente!', '', 'success');
          this.limpiarFormulario();
        } else {
          Swal.fire('Error al actualizar cliente jurídico', response.data.message, 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al actualizar el cliente jurídico.', 'error');
      }
    },
    limpiarFormulario() {
      this.cliente = {
        RUCCliente: '',
        NombreEmpresa: '',
        Telefono: '',
        Email: '',
        DireccionCliente: '',
      };
      this.sugerencias = [];
    },
  },
};
</script>

<style scoped>
.list-group {
  position: absolute;
  z-index: 1000;
  width: 100%;
}
</style>