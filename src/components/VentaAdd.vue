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
         <br>
         <br>
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
                           <h6>55.00$</h6>
                        </li>
                        <li>
                           <h5>Impuesto</h5>
                           <h6>5.00$</h6>
                        </li>
                        <li class="total-value">
                           <h5>Total</h5>
                           <h6>60.00$</h6>
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
      </div>
   </div>
</template>

<script>
import BuscarProducto from './BuscarProducto.vue';
import ListadoProductos from './ListadoProductos.vue';
import TotalArticulos from './TotalArticulos.vue';
import ProductoSeleccionado from './ProductoSeleccionado.vue';
import DatosCliente from './DatosCliente.vue';
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
      DatosCliente,
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
         productos: [], // Inicializar como array vacío
         selectedComponent: null,
         busquedaProducto: '',
         productosSeleccionados: [],
      };
   },
   
   created() {
      this.obtenerProductos();
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
      }
   },
   watch: {
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
      async obtenerProductos() {
         try {
            const response = await axios.get('http://localhost:3000/api/v1/productos');
            if (response.data.success) {
               this.productos = response.data.productos || []; // Usa un array vacío si no hay productos
            } else {
               console.error(response.data.message);
               this.productos = []; // Asegúrate de que sea un array vacío en caso de error
            }
         } catch (error) {
            console.error('Error al obtener productos:', error);
            this.productos = []; // Asegúrate de que sea un array vacío en caso de error
         }
      },
      isProductoSeleccionado(producto) {
         console.log("Comprobando si está seleccionado:", producto);
         console.log("Productos seleccionados:", JSON.parse(JSON.stringify(this.productosSeleccionados)));
         return this.productosSeleccionados.some(p => p.IdProducto === producto.IdProducto);
      },
      agregarProducto(producto) {
         console.log("Antes de agregar/quitar:", JSON.parse(JSON.stringify(this.productosSeleccionados)));

         const index = this.productosSeleccionados.findIndex(p => p.IdProducto === producto.IdProducto);
         if (index !== -1) {
            // Si el producto ya está en la lista, lo quitamos
            this.productosSeleccionados.splice(index, 1);
         } else {
            // Si el producto no está en la lista, lo agregamos
            this.productosSeleccionados.push({ ...producto, cantidad: 1 });
         }

         console.log("Después de agregar/quitar:", JSON.parse(JSON.stringify(this.productosSeleccionados)));
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
            }
            else {
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
         return imagePath
            ? `http://localhost:3000/api/v1/uploads/productos/${imagePath}`
            : "../../public/img/product/noimage.png";
      },
      openClientModal() {
         Swal.fire({
            title: 'Seleccione el tipo de cliente',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Cliente Natural',
            denyButtonText: 'Cliente Jurídico',
         }).then((result) => {
            if (result.isConfirmed) {
               this.$router.push({ name: 'ClienteAddNatural' });
            } else if (result.isDenied) {
               this.$router.push({ name: 'ClienteAddJuridico' });
            }
         });
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
