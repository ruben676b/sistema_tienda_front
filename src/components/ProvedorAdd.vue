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
              <label>Nombre de la empresa</label>
              <input type="text" v-model="form.NombreEmpresa" />
            </div>
          </div>
          <div class="col-lg-3 col-sm-6 col-12">
            <div class="form-group">
              <label>Teléfono</label>
              <input type="text" v-model="form.Telefono" />
            </div>
          </div>
          <div class="col-lg-3 col-sm-6 col-12">
            <div class="form-group">
              <label>Correo electrónico</label>
              <input type="email" v-model="form.Email" />
            </div>
          </div>
          <div class="col-lg-9 col-12">
            <div class="form-group">
              <label>Dirección</label>
              <input type="text" v-model="form.Direccion" />
            </div>
          </div>
          <div class="col-lg-9 col-12">
            <div class="form-group">
              <label>Cuenta de pago</label>
              <input type="text" v-model="form.CuentaPago" />
            </div>
          </div>
          <div class="col-lg-12">
            <div class="form-group">
              <label>Avatar</label>
              <div class="image-upload">
                <input type="file" @change="handleFileUpload" name="RutaFoto" />
                <div class="image-uploads">
                  <img src="../../public/img/icons/upload.svg" alt="img" />
                  <h4 v-if="form.RutaFoto">
                    Archivo cargado: {{ form.RutaFoto }}
                  </h4>
                  <h4 v-else>Arrastrar y soltar un archivo para cargarlo</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <button @click="submitForm" class="btn btn-submit me-2">
              Enviar
            </button>
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
        NombreEmpresa: "",
        Telefono: "",
        Email: "",
        Direccion: "",
        CuentaPago: "",
        RutaFoto: null,
      },
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.form.RutaFoto = file;
        console.log("Archivo seleccionado:", file.name);
      } else {
        this.form.RutaFoto = null;
        console.log("Ningún archivo seleccionado");
      }
    },
    async submitForm() {
      console.log("Iniciando envío del formulario");
      console.log("Datos del formulario:", this.form);

      const formData = new FormData();
      for (const key in this.form) {
        if (this.form[key] !== null) {
          if (key === 'RutaFoto' && this.form[key] instanceof File) {
            formData.append('RutaFoto', this.form[key], this.form[key].name);
            console.log("Archivo adjuntado:", this.form[key].name);
          } else {
            formData.append(key, this.form[key]);
          }
        }
      }

      console.log("FormData creado:", [...formData.entries()]);

      try {
        console.log("Enviando solicitud al servidor...");
        const response = await axios.post("http://localhost:3000/api/v1/proveedores", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log("Respuesta del servidor:", response.data);

        if (response.data.success) {
          console.log("Proveedor guardado exitosamente");
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Proveedor guardado exitosamente",
          });
          this.cancelForm();
        } else {
          console.error("Error al guardar el proveedor:", response.data);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al guardar el proveedor",
          });
        }
      } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        console.error("Detalles del error:", error.response ? error.response.data : error.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al guardar el proveedor. Intente nuevamente.",
        });
      }
    },
    cancelForm() {
      console.log("Formulario cancelado/reseteado");
      this.form = {
        NombreEmpresa: "",
        Telefono: "",
        Email: "",
        Direccion: "",
        CuentaPago: "",
        RutaFoto: null,
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
