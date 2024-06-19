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
                  <h3>Iniciar sesión</h3>
                  <h4>Por favor inicie sesión en su cuenta</h4>
                </div>
                <div class="form-login">
                  <label>Usuario</label>
                  <div class="form-addons">
                    <input type="text" placeholder="Enter your email address" v-model="nombre">
                    <img src="../../public/img/icons/mail.svg" alt="img">
                  </div>
                </div>
                <div class="form-login">
                  <label>Contraseña</label>
                  <div class="pass-group">
                    <input type="password" class="pass-input" placeholder="Enter your password" v-model="contrasenia">
                    <span class="fas toggle-password fa-eye-slash"></span>
                  </div>
                </div>
                <div class="form-login">
                  <div class="alreadyuser">
                    <h4><a @click="goToRegister" class="hover-a">¿No tienes una cuenta? Regístrate aquí</a></h4>
                  </div>
                </div>
                <div class="form-login">
                  <button @click="login" class="btn btn-login">Iniciar sesión</button>
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
        contrasenia: ''
      };
    },
    methods: {
      async login() {
        const credentials = {
          Nombre: this.nombre,
          Contrasenia: this.contrasenia
        };
        await this.$store.dispatch('login', credentials);
        if (this.$store.getters.isAuthenticated) {
          this.$router.push({ path: 'dashboard/estadisticas' });
        } else {
          alert('Credenciales inválidas');
        }
      },
      goToRegister() {
        this.$router.push({ name: 'Register' });
      }
    }
  };
  </script>
  
  <style scoped>
  .btn {
    background-color: green;
  }
  </style>
  