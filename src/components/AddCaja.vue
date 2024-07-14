<template>
    <div>
      <div class="page-header">
        <div class="page-title">
          <h4>Gestión de Cajas</h4>
          <h6>Agregar Caja</h6>
        </div>
      </div>
  
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-lg-3 col-sm-6 col-12">
              <div class="form-group">
                <label>Fecha de Apertura</label>
                <input type="datetime-local" v-model="form.FechaApertura" />
              </div>
            </div>
            <div class="col-lg-3 col-sm-6 col-12">
              <div class="form-group">
                <label>Fecha de Cierre</label>
                <input type="datetime-local" v-model="form.FechaCierre" />
              </div>
            </div>
            <div class="col-lg-3 col-sm-6 col-12">
              <div class="form-group">
                <label>Monto Inicial</label>
                <input type="number" step="0.01" v-model="form.MontoInicial" />
              </div>
            </div>
            <div class="col-lg-3 col-sm-6 col-12">
              <div class="form-group">
                <label>Monto de Cierre</label>
                <input type="number" step="0.01" v-model="form.MontoCierre" />
              </div>
            </div>
            <div class="col-lg-3 col-sm-6 col-12">
              <div class="form-group">
                <label>ID de Usuario</label>
                <input type="number" v-model="form.IdUsuario" />
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
          FechaApertura: "",
          FechaCierre: "",
          MontoInicial: null,
          MontoCierre: null,
          IdUsuario: null,
        },
      };
    },
    methods: {
      async submitForm() {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/v1/caja",
            this.form
          );
          if (response.data.success) {
            Swal.fire({
              icon: "success",
              title: "Éxito",
              text: "Caja creada exitosamente",
            });
            this.cancelForm();
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Error al crear la caja",
            });
          }
        } catch (error) {
          console.error("Error al crear la caja:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al crear la caja. Intente nuevamente.",
          });
        }
      },
      cancelForm() {
        this.form = {
          FechaApertura: "",
          FechaCierre: "",
          MontoInicial: null,
          MontoCierre: null,
          IdUsuario: null,
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
  