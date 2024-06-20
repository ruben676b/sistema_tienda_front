<template>
  <div class="account-page">
    <div class="main-wrapper">
      <div class="account-content">
        <div class="login-wrapper">
          <div class="login-content">
            <div class="login-userset">
              <div class="login-logo mx-auto">
                <img src="../../public/img/fresko-log.png" alt="img">
              </div>
              <div class="login-userheading">
                <h3>Registrarse</h3>
                <h4>Por favor, complete los campos para crear una cuenta</h4>
              </div>
              <div class="form-login">
                <label>Usuario</label>
                <div class="form-addons">
                  <input type="text" placeholder="Ingrese su nombre de usuario" v-model="nombre">
                  <img src="../../public/img/icons/mail.svg" alt="img">
                </div>
              </div>
              <div class="form-login">
                <label>Contraseña</label>
                <div class="pass-group">
                  <input type="password" class="pass-input" placeholder="Ingrese su contraseña" v-model="contrasenia">
                  <span class="fas toggle-password fa-eye-slash"></span>
                </div>
              </div>
              <div class="form-login">
                <label>Tipo de Usuario</label>
                <div class="form-group">
                  <select class="select select2-hidden-accessible" v-model="tipoUsuario">
                    <option value="">Seleccione el tipo de usuario</option>
                    <option value="admin">Admin</option>
                    <option value="cajero">Cajero</option>
                  </select>
                </div>
              </div>
              <div class="form-login">
                <button @click="register" class="btn btn-login">Registrarse</button>
              </div>
              <div class="form-sociallink"></div>
            </div>
          </div>
          <div class="login-img">
            <img src="../../public/img/fondo-fresko.jpg" alt="img">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombre: '',
      contrasenia: '',
      tipoUsuario: ''
    };
  },
  methods: {
    async register() {
      // Validar el tipo de usuario
      if (this.tipoUsuario !== 'admin' && this.tipoUsuario !== 'cajero') {
        alert('Por favor, seleccione un tipo de usuario válido');
        return;
      }

      const userData = {
        Nombre: this.nombre,
        Contrasenia: this.contrasenia,
        TipoUsuario: this.tipoUsuario
      };
      try {
        await this.$store.dispatch('signup', userData);
        // Verificación del estado después de que el estado se haya actualizado
        this.$nextTick(() => {
          console.log('Usuario autenticado:', this.$store.getters.isAuthenticated); // Añadir este log
          if (this.$store.getters.isAuthenticated) {
            this.$router.push({ name: 'Dashboard' });
            console.log('Registro exitoso');
          } else {
            console.log('No autenticado');
          }
        });
      } catch (error) {
        console.error('Error en el registro:', error);
        alert('Error en el registro. Intente nuevamente.');
      }
    }
  }
};
</script>

<style scoped>
.btn {
  background-color: green;
}
</style>
