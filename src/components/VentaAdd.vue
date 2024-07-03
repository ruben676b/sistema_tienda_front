<template>
   <div>
      <div class="container-fluid">
         <div class="row">

            <div class="col-md-3">
               <div class="order-list">
                  <div class="orderid">
                     <h4>Elegir Productos:</h4>
                  </div>
               </div>
            </div>

            <div class="col-md-10">
               <BuscarProducto :busquedaProducto="busquedaProducto"
                  @update:busquedaProducto="busquedaProducto = $event" />
            </div>

            <ListadoProductos :productosFiltrados="productosFiltrados" :isProductoSeleccionado="isProductoSeleccionado"
               :agregarProducto="agregarProducto" :getProveedorImage="getProveedorImage" />
         </div>

         <br><br>

         <div class="row">
            <div class="col-md-9">
               <div class="card-body pt-0">
                  <TotalArticulos :productosSeleccionados="productosSeleccionados"
                     @limpiar-productos="limpiarProductos" />
                  <div class="product-table">
                     <ProductoSeleccionado v-for="producto in productosSeleccionados" :key="producto.idProducto"
                        :producto="producto" :getProveedorImage="getProveedorImage" @editar-producto="editarProducto"
                        @decrementar-cantidad="decrementarCantidad" @incrementar-cantidad="incrementarCantidad"
                        @eliminar-producto="eliminarProducto" />
                  </div>
               </div>
            </div>

            <div class="col-md-3">
               <div class="card-body pt-0 pb-2">
                  <h4>Informacion de venta</h4>
                  <div class="setvalue">
                     <ul>
                        <li>
                           <h5>Subtotal</h5>
                           <h6>{{ formatearPrecio(subtotal) }}</h6>
                        </li>
                        <li>
                           <h5>Impuesto</h5>
                           <h6>{{ formatearPrecio(impuesto) }}</h6>
                        </li>
                        <li class="total-value">
                           <h5>Total</h5>
                           <h6>{{ formatearPrecio(total) }}</h6>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>

         <div class="row">
            <div class="col-6">
               <div class="form-group">
                  <label for="tipoComprobante">Tipo de Comprobante</label>
                  <select v-model="tipoComprobante" class="form-control" id="tipoComprobante">
                     <option value="">Seleccione un tipo de comprobante</option>
                     <option value="factura">Factura</option>
                     <option value="boleta">Boleta</option>
                     <option value="ticket">Ticket</option>
                  </select>
               </div>
               <div v-if="tipoComprobante === 'factura'">
                  <ComprobanteFactura :datos="datosComprobante" />
               </div>
               <div v-if="tipoComprobante === 'boleta'">
                  <ComprobanteBoleta :datos="datosComprobante" />
               </div>
            </div>
            <div class="col-lg-6">
               <div v-if="tipoCliente === 'juridico'">
                  <ClienteJuridico />
               </div>
               <div v-if="tipoCliente === 'natural'">
                  <ClienteNatural />
               </div>
            </div>
         </div>
         <div class="row">
            <div class="col-md-6">
               <div class="form-group">
                  <label for="formaPago">Forma de pago</label>
                  <select v-model="formaPagoSeleccionada" class="form-control" id="formaPago">
                     <option value="">Seleccione una forma de pago</option>
                     <option v-for="formaPago in formasPago" :key="formaPago.id" :value="formaPago.id">
                        {{ formaPago.Descripcion }}
                     </option>
                  </select>
               </div>
            </div>
            <div class="col-md-6">
               <br>
               <div class="btn-totallabel">
                  <h5>Checkout</h5>
                  <h6>60.00$</h6>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import BuscarProducto from './BuscarProducto.vue';
import ListadoProductos from './ListadoProductos.vue';
import TotalArticulos from './TotalArticulos.vue';
import ProductoSeleccionado from './ProductoSeleccionado.vue';
import ComprobanteFactura from './ComprobanteFactura.vue';
import ComprobanteBoleta from './ComprobanteBoleta.vue';
import ClienteJuridico from '../components/ClienteAddJuridico.vue';
import ClienteNatural from '../components/ClienteAddNatural.vue';

import axios from 'axios';
import Swal from 'sweetalert2';

export default {
   components: {
      BuscarProducto,
      ListadoProductos,
      TotalArticulos,
      ProductoSeleccionado,
      ComprobanteFactura,
      ComprobanteBoleta,
      ClienteJuridico,
      ClienteNatural,
   },
   data() {
      return {
         tipoComprobante: '',
         tipoCliente: '',
         datosComprobante: {
            fecha: new Date().toISOString().substring(0, 10),
            serie: '',
            numero: '',
         },
         productos: [],
         selectedComponent: null,
         busquedaProducto: '',
         productosSeleccionados: [],
         formasPago: [],
         formaPagoSeleccionada: '',
         subtotal: 0,
         impuesto: 0,
         total: 0
      };
   },

   created() {
      this.obtenerProductos();
      this.obtenerFormasPago();
   },
   computed: {
      totalVenta() {
         return this.productosSeleccionados.reduce((total, producto) => {
            return total + (producto.PrecioUnitario * producto.cantidad);
         }, 0);
      },
      productosFiltrados() {
         if (!this.productos || this.busquedaProducto.length === 0) {
            return [];
         }
         return this.productos.filter(producto =>
            producto.Nombre.toLowerCase().includes(this.busquedaProducto.toLowerCase())
         );
      },
      productosSeleccionadosConId() {
         return this.productosSeleccionados.map((producto, index) => ({
            ...producto,
            uniqueId: `${producto.IdProducto}-${index}`
         }));
      },
   },
   watch: {
      productosSeleccionados: {
         handler() {
            this.calcularTotales();
         },
         deep: true
      },
      tipoComprobante(newVal) {
         if (newVal === 'factura') {
            this.tipoCliente = 'juridico';
         } else if (newVal === 'boleta') {
            this.tipoCliente = 'natural';
         } else {
            this.tipoCliente = '';
         }
      },
   },
   methods: {
      async obtenerFormasPago() {
         try {
            const response = await axios.get('http://localhost:3000/api/v1/formas-pago');
            if (response.data.success) {
               this.formasPago = response.data.formasPago || [];
            } else {
               console.error('Error al obtener formas de pago:', response.data.message);
               this.formasPago = [];
            }
         } catch (error) {
            console.error('Error al obtener formas de pago:', error);
            this.formasPago = [];
         }
      },
      async obtenerProductos() {
         try {
            const response = await axios.get('http://localhost:3000/api/v1/productos');
            if (response.data.success) {
               this.productos = response.data.productos || [];
            } else {
               console.error(response.data.message);
               this.productos = [];
            }
         } catch (error) {
            console.error('Error al obtener productos:', error);
            this.productos = [];
         }
      },
      calcularTotales() {
         this.total = this.productosSeleccionados.reduce((total, producto) => {
            return total + (producto.PrecioUnitario * producto.cantidad);
         }, 0);
         this.impuesto = this.total * 0.18;
         this.subtotal = this.total - this.impuesto;
      },
      formatearPrecio(precio) {
         return precio.toFixed(2);
      },
      isProductoSeleccionado(producto) {
         return this.productosSeleccionados.some(p => p.IdProducto === producto.IdProducto);
      },
      agregarProducto(producto) {
         const index = this.productosSeleccionados.findIndex(p => p.IdProducto === producto.IdProducto);
         if (index !== -1) {
            this.productosSeleccionados.splice(index, 1);
         } else {
            this.productosSeleccionados.push({ ...producto, cantidad: 1 });
         }
      },
      limpiarProductos() {
         this.productosSeleccionados = [];
      },
      editarProducto(index) {
         // Implementa la lógica de edición aquí
      },
      incrementarCantidad(producto) {
         const index = this.productosSeleccionados.findIndex(p => p.IdProducto === producto.IdProducto);
         if (index !== -1) {
            if (this.productosSeleccionados[index].cantidad < this.productosSeleccionados[index].Stock) {
               this.productosSeleccionados[index].cantidad++;
            } else {
               Swal.fire({
                  title: 'Stock Maximo',
                  icon: "info",
               })
            }
         }
      },
      decrementarCantidad(producto) {
         const index = this.productosSeleccionados.findIndex(p => p.IdProducto === producto.IdProducto);
         if (index !== -1 && this.productosSeleccionados[index].cantidad > 1) {
            this.productosSeleccionados[index].cantidad--;
         }
      },
      eliminarProducto(producto) {
         const index = this.productosSeleccionados.findIndex(p => p.IdProducto === producto.IdProducto);
         if (index !== -1) {
            this.productosSeleccionados.splice(index, 1);
         }
      },
      getProveedorImage(imagePath) {
         return imagePath ? `http://localhost:3000/api/v1/uploads/productos/${imagePath}` : "../../public/img/product/noimage.png";
      },

   },
};
</script>

<style scoped>
.tabs {
   display: flex;
   overflow-x: auto;
}

.tabs li {
   cursor: pointer;
}

.tabs li.active .product-details {
   border: 2px solid #007bff;
}
</style>
