<template>
    <div>
      <div class="page-header">
        <div class="page-title">
          <h4>Gestión de Usuarios</h4>
          <h6>Agregar Usuario</h6>
        </div>
      </div>
  
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-lg-6 col-sm-12 col-12">
              <div class="form-group">
                <label>Seleccione Empleado</label>
                <select v-model="form.IdEmpleado" class="form-control">
                  <option v-for="empleado in empleados" :key="empleado.IdEmpleado" :value="empleado.IdEmpleado">
                    {{ empleado.Nombre }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-lg-6 col-sm-12 col-12">
              <div class="form-group">
                <label>Nombre de Usuario</label>
                <input type="text" v-model="form.Nombre" class="form-control" />
              </div>
            </div>
            <div class="col-lg-6 col-sm-12 col-12">
              <div class="form-group">
                <label>Contraseña</label>
                <input type="password" v-model="form.Contrasenia" class="form-control" />
              </div>
            </div>
            <div class="col-lg-6 col-sm-12 col-12">
              <div class="form-group">
                <label>Tipo de Usuario</label>
                <select v-model="form.TipoUsuario" class="form-control">
                  <option value="admin">Admin</option>
                  <option value="regular">Regular</option>
                </select>
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
          IdEmpleado: "",
          Nombre: "",
          Contrasenia: "",
          TipoUsuario: "",
        },
        empleados: [],
      };
    },
    mounted() {
      this.fetchEmpleados();
    },
    methods: {
      async fetchEmpleados() {
        try {
          const response = await axios.get("http://localhost:3000/api/v1/empleados");
          this.empleados = response.data.empleados;
        } catch (error) {
          console.error("Error al obtener empleados:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener empleados. Intente nuevamente.",
          });
        }
      },
      async submitForm() {
        try {
          const response = await axios.post("http://localhost:3000/api/v1/usuarios", this.form);
          if (response.data.success) {
            Swal.fire({
              icon: "success",
              title: "Éxito",
              text: "Usuario guardado exitosamente",
            });
            this.cancelForm();
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: response.data.message,
            });
          }
        } catch (error) {
          console.error("Error al guardar el usuario:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al guardar el usuario. Intente nuevamente.",
          });
        }
      },
      cancelForm() {
        this.form = {
          IdEmpleado: "",
          Nombre: "",
          Contrasenia: "",
          TipoUsuario: "",
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
  