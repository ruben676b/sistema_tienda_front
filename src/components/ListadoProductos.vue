<template>
  <div class="tabs_container">
    <div class="tab_content active">
      <br />
      <div class="row" v-if="productosFiltrados.length > 0">
        <div
          class="col-lg-2 col-sm-12 d-flex"
          v-for="producto in productosFiltrados"
          :key="producto.idProducto"
        >
          <div
            class="productset flex-fill"
            :class="{ active: isProductoSeleccionado(producto) }"
            @click="agregarProducto(producto)"
          >
            <div class="productsetimg">
              <img :src="getProveedorImage(producto.RutaImagen)" alt="img" />
              <h6>Cantidad: {{ producto.Stock }}</h6>
              <div
                class="check-product"
                v-if="isProductoSeleccionado(producto)"
              >
                <i class="fa fa-check"></i>
              </div>
            </div>
            <div class="productsetcontent">
              <h5>{{ producto.Nombre }}</h5>
              <h4>{{ producto.Descripcion }}</h4>
              <h6>{{ producto.PrecioVenta }}</h6>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center">No se encontraron productos.</div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "productosFiltrados",
    "isProductoSeleccionado",
    "agregarProducto",
    "getProveedorImage",
  ],
};
</script>

<style scoped>
/* Estilos específicos si es necesario */
</style>
