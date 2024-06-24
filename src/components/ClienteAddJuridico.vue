<template>
    <div>
      <b-button v-b-modal.modal-juridico>Agregar Cliente Jurídico</b-button>
  
      <b-modal ref="myModal" id="modal-juridico" title="Agregar Cliente Jurídico" @hide="resetForm">
        <form @submit.prevent="addClienteJuridico">
          <div class="form-group">
            <label for="nombreCliente">Nombre del Cliente</label>
            <input type="text" v-model="nombreCliente" class="form-control" id="nombreCliente" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" v-model="email" class="form-control" id="email" required>
          </div>
          <div class="form-group">
            <label for="telefono">Teléfono</label>
            <input type="text" v-model="telefono" class="form-control" id="telefono" required>
          </div>
          <div class="form-group">
            <label for="direccion">Dirección</label>
            <input type="text" v-model="direccion" class="form-control" id="direccion" required>
          </div>
          <b-button @click="showModal = true" variant="primary">Agregar Cliente Jurídico</b-button>
<b-button @click="showModal = false" variant="secondary">Cancelar</b-button>
        </form>
      </b-modal>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        nombreCliente: '',
        email: '',
        telefono: '',
        direccion: ''
      }
    },
    methods: {
      addClienteJuridico() {
        // Aquí puedes agregar la lógica para enviar los datos al servidor
        console.log('Cliente Jurídico agregado:', this.nombreCliente, this.email, this.telefono, this.direccion)
        this.$refs.myModal.hide()
      },
      resetForm() {
        this.nombreCliente = ''
        this.email = ''
        this.telefono = ''
        this.direccion = ''
      }
    }
  }
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: 1rem;
  }
  </style>
  