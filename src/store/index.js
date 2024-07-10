// src/store/index.js
import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    user: null,
    token: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const { data } = await axios.post(
          "http://localhost:3000/api/v1/auth/signin",
          credentials
        );
        if (data.success) {
          commit("setUser", data.usuario);
          commit("setToken", data.token);
          localStorage.setItem("token", data.token);
          console.log(data);
          return data; // Devuelve la respuesta completa
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
    },
    initializeStore({ commit }) {
      const token = localStorage.getItem("token");
      if (token) {
        commit("setToken", token);
        // Podrías añadir lógica para validar el token y obtener el usuario
      }
    },
  },
});
