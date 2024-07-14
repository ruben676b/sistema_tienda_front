<template>
    <div>
      <div class="page-header">
        <div class="page-title">
          <h4>Gestión de Proveedores</h4>
          <h6>Editar/Actualizar Proveedor</h6>
        </div>
      </div>
  
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-lg-3 col-sm-6 col-12">
              <div class="form-group">
                <label>Nombre del proveedor</label>
                <input type="text" v-model="proveedor.NombreEmpresa" />
              </div>
            </div>
            <div class="col-lg-3 col-sm-6 col-12">
              <div class="form-group">
                <label>Correo electrónico</label>
                <input type="text" v-model="proveedor.Email" />
              </div>
            </div>
            <div class="col-lg-3 col-sm-6 col-12">
              <div class="form-group">
                <label>Teléfono</label>
                <input type="text" v-model="proveedor.Telefono" />
              </div>
            </div>
            <div class="col-lg-9 col-12">
              <div class="form-group">
                <label>Dirección</label>
                <input type="text" v-model="proveedor.Direccion" />
              </div>
            </div>
            <div class="col-lg-9 col-12">
              <div class="form-group">
                <label>Cuenta de pago</label>
                <input type="text" v-model="proveedor.CuentaPago" />
              </div>
            </div>
            <div class="col-lg-12">
              <div class="form-group">
                <label>Avatar</label>
                <div class="image-upload">
                  <input type="file" @change="handleImageUpload" />
                  <div class="image-uploads">
                    <img src="../../public/img/icons/upload.svg" alt="img" />
                    <h4>{{ imageName }}</h4>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-12">
              <a @click="updateProveedor" class="btn btn-submit me-2">Actualizar</a>
              <a @click="cancel" class="btn btn-cancel">Cancelar</a>
            </div>
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
        proveedor: {
          IdProveedor: null,
          NombreEmpresa: '',
          Email: '',
          Telefono: '',
          Direccion: '',
          CuentaPago: '',
          proveedor_imagen: ''
        },
        imageName: 'Arrastrar y soltar un archivo para cargarlo',
        imageFile: null
      };
    },
    methods: {
      async fetchProveedor() {
        const id = this.$route.params.id;
        try {
          const response = await axios.get(`http://localhost:3000/api/v1/proveedores/${id}`);
          this.proveedor = response.data.Proveedor;
        } catch (error) {
          console.error('Error al obtener el proveedor:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al obtener el proveedor. Intente nuevamente.'
          });
        }
      },
      handleImageUpload(event) {
        const file = event.target.files[0];
        this.imageFile = file;
        this.imageName = file.name;
      },
      async updateProveedor() {
        const formData = new FormData();
        formData.append('NombreEmpresa', this.proveedor.NombreEmpresa);
        formData.append('Email', this.proveedor.Email);
        formData.append('Telefono', this.proveedor.Telefono);
        formData.append('Direccion', this.proveedor.Direccion);
        formData.append('CuentaPago', this.proveedor.CuentaPago);
        if (this.imageFile) {
          formData.append('proveedor-imagen', this.imageFile);
        }
  
        try {
          const response = await axios.patch(`http://localhost:3000/api/v1/proveedores/${this.proveedor.IdProveedor}`, formData);
          if (response.data.success) {
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Proveedor actualizado exitosamente.'
            }).then(() => {
              this.$router.push({ name: 'ProvedorList' });
            });
          } else {
            throw new Error(response.data.message || 'Error al actualizar el proveedor');
          }
        } catch (error) {
          console.error('Error al actualizar el proveedor:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al actualizar el proveedor. Intente nuevamente.'
          });
        }
      },
      cancel() {
        this.$router.push({ name: 'ProvedorList' });
      }
    },
    mounted() {
      this.fetchProveedor();
    }
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
  