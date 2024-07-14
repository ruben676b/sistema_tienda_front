// src/store/index.js
import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: null,
    token: null,
    userName: null,
    typeUser:null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    setUserName(state, name) {  // Añade esta mutación
      state.userName = name;
    },
    setUserType(state, name) {  // Añade esta mutación
      state.typeUser = name;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    }
  },
  getters: {
    isAuthenticated: state => !!state.user,
    getUserName: state => state.userName,
    getUserType: state => state.typeUser
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const { data } = await axios.post('http://localhost:3000/api/v1/auth/signin', credentials);
        if (data.success) {

          commit('setUser', data.usuario);
          commit('setToken', data.token);
          commit('setUserName', data.usuario.Nombre);  // Guarda el nombre del usuario
          commit('setUserType', data.usuario.TipoUsuario);  // Guarda el nombre del usuario
          localStorage.setItem('token', data.token);
          localStorage.setItem('userName', data.usuario.Nombre);
          localStorage.setItem('userType', data.usuario.TipoUsuario);
          console.log(data)
        } else {
          throw new Error(data.message || 'Error en el inicio de sesión');
        }
      } catch (error) {
        console.error('Error en el inicio de sesión:', error);
      }
    },
    async signup({ commit }, userData) {
      try {
        const { data } = await axios.post('http://localhost:3000/api/v1/auth/signup', userData);
        console.log(data)
        if (data.success) {
          commit('setUser', data.usuario);
          commit('setToken', data.token);
          localStorage.setItem('token', data.token);
          alert('Usuario Registrado');
        } else {
          throw new Error(data.message || 'Error en el registro');
        }
      } catch (error) {
        console.error('Error en el registro:', error);
        alert('Error en el registro. Intente nuevamente.');
      }
    },
    logout({ commit }) {
      commit('logout');
      localStorage.removeItem('token');
    },
    initializeStore({ commit }) {
      const token = localStorage.getItem('token');
      if (token) {
        commit('setToken', token);
        //commit('setUserName', userName);
        // Podrías añadir lógica para validar el token y obtener el usuario
      }
    }
  }
});
