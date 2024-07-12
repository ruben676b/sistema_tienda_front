<template>
    <div>
      <div class="order-list">
                        <div class="orderid">
                          <h4>Datos de Boleta</h4>
                        </div>
                     </div>
      
      <div class="form-group">
        <label for="fecha">Fecha</label>
        <input type="text" class="form-control" :value="datos.fecha" readonly>
      </div>
      <div class="form-group">
        <label for="serie">Serie</label>
        <input type="text" class="form-control" v-model="datos.serie">

      </div>

      <!-- Otros campos específicos de la boleta -->
    </div>
  </template>
  
  <script>
  export default {
    props: {
      datos: Object,
    },
  };
  </script>
  
  <style scoped>
  /* Aquí van los estilos */
  </style>
  