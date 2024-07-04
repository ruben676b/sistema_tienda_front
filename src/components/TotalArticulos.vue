<template>
    <div class="totalitem">
       <h4>Total de artículos: {{ productosSeleccionados.length }}</h4>
       <a href="javascript:void(0);" @click="limpiarProductos">Borrar todo</a>
    </div>
 </template>
 
 <script>
 export default {
    props: ['productosSeleccionados'],
    methods: {
       limpiarProductos() {
          this.$emit('limpiar-productos');
       }
    }
 };
 </script>
 
 <style scoped>
 /* Estilos específicos si es necesario */
 </style>
 