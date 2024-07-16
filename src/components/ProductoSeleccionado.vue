<template>
   <ul class="product-lists">
      <li>
         <div class="productimg">
            <div class="productimgs">
               <img :src="getProveedorImage(producto.RutaImagen)" alt="img">
            </div>
            <div class="productcontet">
               <h4>
                  <font>{{ producto.Nombre }}</font>
                  <a href="javascript:void(0);" class="ms-2" @click="editarProducto(producto)">
                     <img src="../../public/img/icons/edit-5.svg" alt="img">
                  </a>
               </h4>
               <div class="productlinkset">
                  <h5>Stock: {{ producto.Stock }}</h5>
               </div>
               <div class="increment-decrement">
                  <div class="input-groups">
                     <input type="button" value="-" class="button-minus dec button"
                        @click="decrementarCantidad(producto)">
                     <input type="text" :value="producto.cantidad" class="quantity-field" readonly>
                     <input type="button" value="+" class="button-plus inc button"
                        @click="incrementarCantidad(producto)">
                  </div>
               </div>
            </div>
         </div>
      </li>
      <li>S/ {{ producto.PrecioVenta }}</li>
      <li>S/ {{ formatearPrecio(producto.PrecioVenta * producto.cantidad) }}</li>
      <li>
         <a class="confirm-text" href="javascript:void(0);" @click="eliminarProducto(producto)">
            <img src="../../public/img/icons/delete-2.svg" alt="img">
         </a>
      </li>
   </ul>
</template>

<script>
export default {
  props: ["producto", "getProveedorImage"],
  methods: {
    editarProducto(producto) {
      this.$emit("editar-producto", producto);
    },
    decrementarCantidad(producto) {
      this.$emit("decrementar-cantidad", producto);
    },
    incrementarCantidad(producto) {
      this.$emit("incrementar-cantidad", producto);
    },
    eliminarProducto(producto) {
      this.$emit("eliminar-producto", producto);
    },
    formatearPrecio(precio) {
      return precio.toFixed(2);
    },
  },
};
</script>

<style scoped></style>
