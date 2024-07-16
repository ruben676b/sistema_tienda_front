<template>
  <div>
    <div class="page-header">
      <div class="page-title">
        <h4>Detalles Completo del Producto</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-8 col-sm-12">
        <div class="card">
          <div class="card-body">
            <div class="bar-code-view">
              <img src="../../public/img/barcode1.png" alt="barcode" />
              <a class="printimg">
                <img src="../../public/img/icons/printer.svg" alt="print" />
              </a>
            </div>
            <div class="productdetails">
              <ul class="product-bar">
                <li>
                  <h4>Nombre</h4>
                  <h6>{{ producto.Nombre }}</h6>
                </li>
                <li>
                  <h4>Descripción</h4>
                  <h6>{{ producto.Descripcion }}</h6>
                </li>
                <li>
                  <h4>Precio de Compra</h4>
                  <h6>s/. {{ producto.PrecioCompra }}</h6>
                </li>
                <li>
                  <h4>Precio de Venta</h4>
                  <h6>s/. {{ producto.PrecioVenta }}</h6>
                </li>
                <li>
                  <h4>Fecha de Vencimiento</h4>
                  <h6>
                    {{
                      new Date(producto.FechaVencimiento).toLocaleDateString()
                    }}
                  </h6>
                </li>
                <li>
                  <h4>Stock</h4>
                  <h6>{{ producto.Stock }}</h6>
                </li>
                <li>
                  <h4>Stock Mínimo</h4>
                  <h6>{{ producto.StockMinimo }}</h6>
                </li>
                <li>
                  <h4>Unidad de Medida</h4>
                  <h6>{{ producto.UnidadMedida }}</h6>
                </li>
                <li>
                  <h4>Código de Barra</h4>
                  <h6>{{ producto.CodigoBarra }}</h6>
                </li>
                <li>
                  <h4>Precio Total</h4>
                  <h6>s/. {{ producto.PrecioTotal }}</h6>
                </li>
                <li>
                  <h4>Categoría</h4>
                  <h6>{{ categoria.nombre }}</h6>
                </li>
                <li>
                  <h4>Marca</h4>
                  <h6>{{ marca.nombre }}</h6>
                </li>
                <li>
                  <h4>Proveedor</h4>
                  <h6>{{ proveedor.NombreEmpresa }}</h6>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-sm-12">
        <div class="card">
          <div class="card-body">
            <div class="slider-product-details">
              <div class="slider-product">
                <img
                  :src="
                    'http://localhost:3000/api/v1/uploads/productos/' +
                    producto.RutaImagen
                  "
                  alt="img"
                />
                <h4>IMAGEN ACTUAL DEL PRODUCTO</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      producto: {},
      marca: {},
      categoria: {},
      proveedor: {},
    };
  },
  created() {
    this.fetchProducto();
  },
  methods: {
    extractIdFromUrl() {
      const path = window.location.pathname;
      const segments = path.split("/");
      return segments[segments.length - 1];
    },
    async fetchProducto() {
      const id = this.extractIdFromUrl();
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/productos/${id}`
        );
        if (response.data.success) {
          this.producto = response.data.producto;

          // Obtener detalles de marca y categoría
          const responseMarcas = await axios.get(
            `http://localhost:3000/api/v1/marcas`
          );
          const responseCategorias = await axios.get(
            `http://localhost:3000/api/v1/categorias`
          );

          // Encontrar la marca correspondiente
          this.marca = responseMarcas.data.Marcas.find(
            (marca) => marca.id === this.producto.marca_id
          );

          // Encontrar la categoría correspondiente
          this.categoria = responseCategorias.data.categorias.find(
            (categoria) => categoria.id === this.producto.categoria_id
          );

          // Obtener el proveedor del producto
          const responseProveedor = await axios.get(
            `http://localhost:3000/api/v1/proveedores/${this.producto.IdProveedor}`
          );
          if (responseProveedor.data.success) {
            this.proveedor = responseProveedor.data.Proveedor;
          }
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Añade aquí tus estilos si es necesario */
</style>
