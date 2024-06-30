<template>
  <div>
    <h4>Datos del Cliente Natural</h4>
    <div class="form-group">
      <label>Nombre del Cliente</label>
      <input type="text" v-model="cliente.NombreCliente" @input="buscarClienteNatural" class="form-control">
      <ul v-if="sugerencias.length > 0" class="list-group mt-2">
        <li v-for="sugerencia in sugerencias" :key="sugerencia.IdCliente" 
            class="list-group-item list-group-item-action"
            @click="seleccionarCliente(sugerencia)">
          {{ sugerencia.NombreCliente }} - {{ sugerencia.Email }}
        </li>
      </ul>
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
    <button class="btn btn-submit me-2" @click="agregarClienteNatural">Enviar</button>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      cliente: {
        NombreCliente: '',
        Email: '',
        Telefono: '',
        DireccionCliente: '',
      },
      sugerencias: [],
    };
  },
  methods: {
    normalizarTexto(texto) {
      return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    },
    async buscarClienteNatural() {
      if (this.cliente.NombreCliente.trim().length >= 3) {
        try {
          const response = await axios.get('http://localhost:3000/api/v1/clientes-naturales');
          const clientes = response.data.clientes || [];
          
          const nombreClienteNormalizado = this.normalizarTexto(this.cliente.NombreCliente.trim());
          this.sugerencias = clientes.filter(cliente => 
            this.normalizarTexto(cliente.NombreCliente).includes(nombreClienteNormalizado)
          ).slice(0, 5); // Limita a 5 sugerencias
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
    async agregarClienteNatural() {
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
      const response = await axios.get('http://localhost:3000/api/v1/clientes-naturales');
      const clientes = response.data.clientes || [];
      return clientes.find(c => 
        this.normalizarTexto(c.NombreCliente) === this.normalizarTexto(this.cliente.NombreCliente) &&
        this.normalizarTexto(c.Email) === this.normalizarTexto(this.cliente.Email)
      );
    },
    async crearNuevoCliente() {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/clientes-naturales', this.cliente);
        if (response.data.success) {
          Swal.fire('Cliente Natural agregado exitosamente!', '', 'success');
          this.limpiarFormulario();
        } else {
          Swal.fire('Error al agregar cliente natural', response.data.message, 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al agregar el cliente natural.', 'error');
      }
    },
    async actualizarCliente(idCliente) {
      try {
        const response = await axios.put(`http://localhost:3000/api/v1/clientes-naturales/${idCliente}`, this.cliente);
        if (response.data.success) {
          Swal.fire('Cliente Natural actualizado exitosamente!', '', 'success');
          this.limpiarFormulario();
        } else {
          Swal.fire('Error al actualizar cliente natural', response.data.message, 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al actualizar el cliente natural.', 'error');
      }
    },
    limpiarFormulario() {
      this.cliente = {
        NombreCliente: '',
        Email: '',
        Telefono: '',
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