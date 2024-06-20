<template>
    <div>
      <div class="page-header">
        <div class="page-title">
          <h4>Gestión de Proveedores</h4>
          <h6>Agregar/Actualizar Proveedor</h6>
        </div>
      </div>
  
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-lg-3 col-sm-6 col-12">
              <div class="form-group">
                <label>Nombre del proveedor</label>
                <input type="text" v-model="form.nombreEmpresa" />
              </div>
            </div>
            <div class="col-lg-3 col-sm-6 col-12">
              <div class="form-group">
                <label>Correo electrónico</label>
                <input type="email" v-model="form.email" />
              </div>
            </div>
            <div class="col-lg-3 col-sm-6 col-12">
              <div class="form-group">
                <label>Teléfono</label>
                <input type="text" v-model="form.telefono" />
              </div>
            </div>
            <div class="col-lg-9 col-12">
              <div class="form-group">
                <label>Dirección</label>
                <input type="text" v-model="form.direccion" />
              </div>
            </div>
            <div class="col-lg-9 col-12">
              <div class="form-group">
                <label>Cuentas de pago</label>
                <input type="text" v-model="form.cuentaPago" />
              </div>
            </div>
            <div class="col-lg-12">
              <div class="form-group">
                <label>Avatar</label>
                <div class="image-upload">
                  <input type="file" @change="handleFileUpload" />
                  <div class="image-uploads">
                    <img src="../../public/img/icons/upload.svg" alt="img" />
                    <h4 v-if="form.proveedorImagen">Archivo cargado: {{ form.proveedorImagen.name }}</h4>
                    <h4 v-else>Arrastrar y soltar un archivo para cargarlo</h4>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-12">
              <button @click="submitForm" class="btn btn-submit me-2">Enviar</button>
              <button @click="cancelForm" class="btn btn-cancel">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Swal from "sweetalert2";
  
  export default {
    data() {
      return {
        form: {
          nombreEmpresa: "",
          email: "",
          telefono: "",
          direccion: "",
          cuentaPago: "",
          proveedorImagen: null,
        },
      };
    },
    methods: {
      handleFileUpload(event) {
        this.form.proveedorImagen = event.target.files[0];
      },
      async submitForm() {
        const formData = new FormData();
        formData.append("NombreEmpresa", this.form.nombreEmpresa);
        formData.append("Email", this.form.email);
        formData.append("Telefono", this.form.telefono);
        formData.append("Direccion", this.form.direccion);
        formData.append("CuentaPago", this.form.cuentaPago);
        if (this.form.proveedorImagen) {
          formData.append("proveedor-imagen", this.form.proveedorImagen);
        }
  
        try {
          const response = await axios.post("http://localhost:3000/api/v1/proveedores", formData);
          if (response.data.success) {
            Swal.fire({
              icon: "success",
              title: "Éxito",
              text: "Proveedor guardado exitosamente",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Error al guardar el proveedor",
            });
          }
        } catch (error) {
          console.error("Error al guardar el proveedor:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al guardar el proveedor. Intente nuevamente.",
          });
        }
      },
      cancelForm() {
        this.form = {
          nombreEmpresa: "",
          email: "",
          telefono: "",
          direccion: "",
          cuentaPago: "",
          proveedorImagen: null,
        };
      },
    },
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
  