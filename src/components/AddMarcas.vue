<template>
  <div>
    <div class="page-header">
      <div class="page-title">
        <h4>Gestión de Marcas</h4>
        <h6>Agregar Marca</h6>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-lg-3 col-sm-6 col-12">
            <div class="form-group">
              <label>Nombre de la marca</label>
              <input type="text" v-model="form.nombre" />
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
        nombre: "",
      },
    };
  },
  methods: {
    async submitForm() {
      const formData = new FormData();
      formData.append("Nombre", this.form.nombre);

      try {
        const response = await axios.post("http://localhost:3000/api/v1/marcas", formData);
        if (response.data.success) {
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Marca guardada exitosamente",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al guardar la marca",
          });
        }
      } catch (error) {
        console.error("Error al guardar la marca:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al guardar la marca. Intente nuevamente.",
        });
      }
    },
    cancelForm() {
      this.form = {
        nombre: "",
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
