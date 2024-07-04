<template>
  <div>
    <div  id="create" tabindex="-1" aria-labelledby="create" aria-modal="true" role="dialog"
      style="display: block;">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Agregar Cliente Jurídico</h5>
            <button type="button" class="close" @click="cancelar" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-lg-6 col-sm-12 col-12">
                <div class="form-group">
                  <label>RUC Cliente</label>
                  <input type="text" v-model="cliente.RUCCliente">
                </div>
              </div>
              <div class="col-lg-6 col-sm-12 col-12">
                <div class="form-group">
                  <label>Nombre Empresa</label>
                  <input type="text" v-model="cliente.NombreEmpresa">
                </div>
              </div>
              <div class="col-lg-6 col-sm-12 col-12">
                <div class="form-group">
                  <label>Email</label>
                  <input type="text" v-model="cliente.Email">
                </div>
              </div>
              <div class="col-lg-6 col-sm-12 col-12">
                <div class="form-group">
                  <label>Teléfono</label>
                  <input type="text" v-model="cliente.Telefono">
                </div>
              </div>
              <div class="col-lg-6 col-sm-12 col-12">
                <div class="form-group">
                  <label>Dirección</label>
                  <input type="text" v-model="cliente.DireccionCliente">
                </div>
              </div>
            </div>
            <div class="col-lg-12">
              <a class="btn btn-submit me-2" @click="agregarClienteJuridico">Enviar</a>
              <a class="btn btn-cancel" @click="cancelar">Cancelar</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

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
    };
  },
  methods: {
    async agregarClienteJuridico() {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/clientes-juridicos', this.cliente);
        if (response.data.success) {
          Swal.fire('Cliente Jurídico agregado exitosamente!', '', 'success');
          this.$router.push({ name: 'VentaAdd' });
        } else {
          Swal.fire('Error al agregar cliente jurídico', response.data.message, 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al agregar el cliente jurídico.', 'error');
      }
    },
    cancelar() {
      this.$router.push({ name: 'VentaAdd' });
    },
  },
};
</script>
