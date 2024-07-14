<template>
  <div>
    <div class="page-header">
      <div class="page-title">
        <h4>Gestión de Formas de Pago</h4>
        <h6>Agregar Forma de Pago</h6>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-lg-3 col-sm-6 col-12">
            <div class="form-group">
              <label>Descripción</label>
              <input type="text" v-model="form.Descripcion" />
            </div>
          </div>
          <div class="col-lg-3 col-sm-6 col-12">
            <div class="form-group">
              <label>Detalles</label>
              <input type="text" v-model="form.Detalles" />
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
        Descripcion: "",
        Detalles: "",
      },
    };
  },
  methods: {
    async submitForm() {
      const formData = new FormData();
      formData.append("Descripcion", this.form.Descripcion);
      formData.append("Detalles", this.form.Detalles);

      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/formas_pago",
          formData
        );
        if (response.data.success) {
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Forma de pago guardada exitosamente",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al guardar la forma de pago",
          });
        }
      } catch (error) {
        console.error("Error al guardar la forma de pago:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al guardar la forma de pago. Intente nuevamente.",
        });
      }
    },
    cancelForm() {
      this.form = {
        Descripcion: "",
        Detalle: "",
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
