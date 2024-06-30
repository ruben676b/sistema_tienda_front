<template>
    <div>
       <input 
          :value="busquedaProducto"
          @input="$emit('update:busquedaProducto', $event.target.value)"
          type="text" 
          class="form-control" 
          placeholder="Buscar producto..."
       >
    </div>
 </template>
 
 <script>
 export default {
    props: ['busquedaProducto']
 };
 </script>
 
 <style scoped>
 /* Estilos específicos si es necesario */
 </style>
 