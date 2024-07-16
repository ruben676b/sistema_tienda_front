// src/store/index.js
import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    user: null,
    token: null,
    userName: null,
    typeUser: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    setUserName(state, name) {
      state.userName = name;
    },
    setUserType(state, type) {
      state.typeUser = type;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.userName = null;
      state.typeUser = null;
    },
  },
  getters: {
    isAuthenticated: state => !!state.user,
    getUserName: state => state.userName,
    getUserType: state => state.typeUser
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const { data } = await axios.post(
          "http://localhost:3000/api/v1/auth/signin",
          credentials
        );
        if (data.success) {
          commit('setUser', data.usuario);
          commit('setToken', data.token);
          commit('setUserName', data.usuario.Nombre);
          commit('setUserType', data.usuario.TipoUsuario);
          localStorage.setItem('token', data.token);
          localStorage.setItem('userName', data.usuario.Nombre);
          localStorage.setItem('userType', data.usuario.TipoUsuario);
          return data; // Devolver la respuesta
        } else {
          throw new Error(data.message || "Error en el inicio de sesión");
        }
      } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        throw error; // Re-lanza el error para manejarlo en el componente
      }
    },
    async signup({ commit }, userData) {
      try {
        const { data } = await axios.post(
          "http://localhost:3000/api/v1/auth/signup",
          userData
        );
        console.log(data);
        if (data.success) {
          commit("setUser", data.usuario);
          commit("setToken", data.token);
          localStorage.setItem("token", data.token);
          alert("Usuario Registrado");
        } else {
          throw new Error(data.message || "Error en el registro");
        }
      } catch (error) {
        console.error("Error en el registro:", error);
        alert("Error en el registro. Intente nuevamente.");
      }
    },
    logout({ commit }) {
      commit("logout");
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("userType");
    },
    initializeStore({ commit }) {
      const token = localStorage.getItem("token");
      if (token) {
        commit('setToken', token);
        const userName = localStorage.getItem("userName");
        const userType = localStorage.getItem("userType");
        if (userName) commit('setUserName', userName);
        if (userType) commit('setUserType', userType);
      }
    },
  },
});
