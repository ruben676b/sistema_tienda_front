<template>
  <div>
    <div class="order-list">
                        <div class="orderid">
                          <h4>Datos del Cliente Natural</h4>
                        </div>
                     </div>
    <div v-if="clienteSeleccionado && clienteUsado" class="mt-3">
      <strong>Cliente seleccionado: </strong>{{ cliente.NombreCliente }}
    </div>
    <br>
    <div class="form-group">
      <label>Nombre del Cliente</label>
      <input type="text" v-model="cliente.NombreCliente" @input="buscarClienteNatural" class="form-control" :disabled="clienteSeleccionado && !modoEdicion">
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
      <input type="text" v-model="cliente.Email" class="form-control" :disabled="clienteSeleccionado && !modoEdicion">
    </div>
    <div class="form-group">
      <label>Teléfono</label>
      <input type="text" v-model="cliente.Telefono" class="form-control" :disabled="clienteSeleccionado && !modoEdicion">
    </div>
    <div class="form-group">
      <label>Dirección</label>
      <input type="text" v-model="cliente.DireccionCliente" class="form-control" :disabled="clienteSeleccionado && !modoEdicion">
    </div>
    <div class="mt-3">
      <button v-if="!clienteSeleccionado" class="btn btn-primary me-2" @click="agregarNuevoCliente">Agregar Nuevo Cliente</button>
      <button v-if="clienteSeleccionado && !modoEdicion" class="btn btn-success me-2" @click="usarClienteExistente">Usar Cliente Existente</button>
      <button v-if="clienteSeleccionado && !modoEdicion" class="btn btn-warning me-2" @click="habilitarEdicion">Modificar Cliente</button>
      <button v-if="modoEdicion" class="btn btn-info me-2" @click="guardarModificaciones">Guardar Modificaciones</button>
      <button v-if="clienteSeleccionado || modoEdicion" class="btn btn-secondary" @click="cancelar">Cancelar</button>
    </div>

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
      clienteIdParaVenta: null,
      clienteOriginal: null,
      clienteUsado: false,
      clienteSeleccionado: false,
      modoEdicion: false,
    };
  },
  methods: {
    async buscarClienteNatural() {
      if (this.cliente.NombreCliente.trim().length >= 1) {
        try {
          const response = await axios.get('http://localhost:3000/api/v1/clientes-naturales');
          const clientes = response.data.clientes || [];
          this.sugerencias = clientes.filter(cliente => 
            cliente.NombreCliente.toLowerCase().includes(this.cliente.NombreCliente.trim().toLowerCase())
          ).slice(0, 5);
        } catch (error) {
          console.error('Error al buscar el cliente:', error);
          this.sugerencias = [];
        }
      } else {
        this.sugerencias = [];
      }
    },
    seleccionarCliente(clienteSeleccionado) {
      this.clienteOriginal = { ...clienteSeleccionado };
      this.cliente = { ...clienteSeleccionado };
      this.clienteIdParaVenta = clienteSeleccionado.IdCliente;
      this.clienteSeleccionado = true;
      this.clienteUsado = false;
      this.modoEdicion = false;
      this.sugerencias = [];
    },
    async agregarNuevoCliente() {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/clientes-naturales', this.cliente);
        if (response.data.success) {
          this.clienteIdParaVenta = response.data.id;
          Swal.fire('Cliente Natural agregado exitosamente!', '', 'success');
          // Seleccionar automáticamente el nuevo cliente creado
          this.seleccionarCliente({
            ...this.cliente,
            IdCliente: this.clienteIdParaVenta
          });
        } else {
          Swal.fire('Error al agregar cliente natural', response.data.message, 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al agregar el cliente natural.', 'error');
      }
    },
    usarClienteExistente() {
  this.clienteUsado = true;
  this.$emit('cliente-seleccionado', this.clienteIdParaVenta);
},
    
    habilitarEdicion() {
      this.modoEdicion = true;
    },
    async guardarModificaciones() {
      try {
        const response = await axios.put(`http://localhost:3000/api/v1/clientes-naturales/${this.clienteIdParaVenta}`, this.cliente);
        if (response.data.success) {
          Swal.fire('Cliente actualizado exitosamente!', '', 'success');
          this.modoEdicion = false;
          this.clienteOriginal = { ...this.cliente };
        } else {
          Swal.fire('Error al actualizar cliente', response.data.message, 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al actualizar el cliente.', 'error');
      }
    },
    cancelar() {
      if (this.modoEdicion) {
        // Si estaba en modo edición, restaurar los datos originales
        this.cliente = { ...this.clienteOriginal };
        this.modoEdicion = false;
      } else {
        // Si no estaba en modo edición, limpiar completamente el formulario
        this.limpiarFormulario();
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
      this.clienteOriginal = null;
      this.clienteSeleccionado = false;
      this.modoEdicion = false;
      this.clienteIdParaVenta = null;
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
