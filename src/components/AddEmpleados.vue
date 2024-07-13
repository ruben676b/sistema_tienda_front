<template>
  <div class="content">
    <div class="page-header">
      <div class="page-title">
        <h4>Administración de Empleados</h4>
        <h6>Agregar Empleado</h6>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="row">
          <!-- Campo Nombre -->
          <div class="col-lg-3 col-sm-6 col-12">
            <div class="form-group">
              <label for="nombre">Nombre <span class="text-danger">*</span></label>
              <input id="nombre" type="text" class="form-control" v-model="form.nombre" required>
            </div>
          </div>

          <!-- Campo Apellido -->
          <div class="col-lg-3 col-sm-6 col-12">
            <div class="form-group">
              <label for="apellido">Apellido <span class="text-danger">*</span></label>
              <input id="apellido" type="text" class="form-control" v-model="form.apellido" required>
            </div>
          </div>

          <!-- Campo Fecha de Nacimiento -->
          <div class="col-lg-3 col-sm-6 col-12">
            <div class="form-group">
              <label for="fechaNacimiento">Fecha de Nacimiento <span class="text-danger">*</span></label>
              <input id="fechaNacimiento" type="date" class="form-control" v-model="form.fechaNacimiento" required>
            </div>
          </div>

          <!-- Campo Dirección -->
          <div class="col-lg-3 col-sm-6 col-12">
            <div class="form-group">
              <label for="direccion">Dirección <span class="text-danger">*</span></label>
              <input id="direccion" type="text" class="form-control" v-model="form.direccion" required>
            </div>
          </div>

          <!-- Campo Teléfono -->
          <div class="col-lg-3 col-sm-6 col-12">
            <div class="form-group">
              <label for="telefono">Teléfono</label>
              <input id="telefono" type="text" class="form-control" v-model="form.telefono">
            </div>
          </div>

          <!-- Campo Email -->
          <div class="col-lg-3 col-sm-6 col-12">
            <div class="form-group">
              <label for="email">Email</label>
              <input id="email" type="email" class="form-control" v-model="form.email">
            </div>
          </div>

          <!-- Campo Fecha de Contratación -->
          <div class="col-lg-3 col-sm-6 col-12">
            <div class="form-group">
              <label for="fechaContratacion">Fecha de Contratación <span class="text-danger">*</span></label>
              <input id="fechaContratacion" type="date" class="form-control" v-model="form.fechaContratacion" required>
            </div>
          </div>

          <!-- Campo Cargo -->
          <div class="col-lg-3 col-sm-6 col-12">
            <div class="form-group">
              <label for="cargo">Cargo <span class="text-danger">*</span></label>
              <input id="cargo" type="text" class="form-control" v-model="form.cargo" required>
            </div>
          </div>

          <!-- Campo Sueldo -->
          <div class="col-lg-3 col-sm-6 col-12">
            <div class="form-group">
              <label for="sueldo">Sueldo <span class="text-danger">*</span></label>
              <input id="sueldo" type="number" step="0.01" class="form-control" v-model="form.sueldo" required>
            </div>
          </div>

          <!-- Campo Imagen de Empleado -->
          <div class="col-lg-12">
            <div class="form-group">
              <label for="imagenEmpleado">Imagen de Empleado</label>
              <input id="imagenEmpleado" type="file" class="form-control-file" @change="handleFileUpload">
            </div>
          </div>

          <!-- Botones para enviar y cancelar -->
          <div class="col-lg-12">
            <button type="button" class="btn btn-submit me-2" @click="guardarEmpleado">Enviar</button>
            <router-link to="/empleados" class="btn btn-cancel">Cancelar</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        nombre: '',
        apellido: '',
        fechaNacimiento: '',
        direccion: '',
        telefono: '',
        email: '',
        fechaContratacion: '',
        cargo: '',
        sueldo: 0,
        imagenEmpleado: null
      }
    };
  },
  methods: {
    handleFileUpload(event) {
      this.form.imagenEmpleado = event.target.files[0];
    },
    async guardarEmpleado() {
      try {
        let formData = new FormData();
        formData.append('nombre', this.form.nombre);
        formData.append('apellido', this.form.apellido);
        formData.append('fechaNacimiento', this.form.fechaNacimiento);
        formData.append('direccion', this.form.direccion);
        formData.append('telefono', this.form.telefono);
        formData.append('email', this.form.email);
        formData.append('fechaContratacion', this.form.fechaContratacion);
        formData.append('cargo', this.form.cargo);
        formData.append('sueldo', this.form.sueldo);

        if (this.form.imagenEmpleado) {
          formData.append('imagenEmpleado', this.form.imagenEmpleado);
        }

        const response = await axios.post('/api/empleados', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.data.success) {
          alert('Empleado registrado correctamente');
          this.$router.push('/empleados'); // Redirigir a la lista de empleados después del registro
        } else {
          console.error('Error al guardar el empleado:', response.data.message);
          alert('Error al registrar empleado');
        }
      } catch (error) {
        console.error('Error al guardar el empleado:', error);
        alert('Error al registrar empleado');
      }
    }
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
