<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$store.dispatch('initializeStore');
  }
};
</script>

<style>
/* Estilos globales */
</style>
