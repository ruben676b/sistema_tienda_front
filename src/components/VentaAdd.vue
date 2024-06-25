<template>
   <div>
      <div class="container-fluid">
         <div class="row" style=" padding: 10px;">

            <!-- Cliente -->
            <div class="col-md-4">
               <div class="order-list">
                  <div class="orderid">
                     <h4>Datos del cliente</h4>
                  </div>
               </div>
               <a href="javascript:void(0);" class="btn btn-adds" @click="openClientModal">
                  <i class="fa fa-plus me-2"></i>
                  <font>Agregar cliente</font>
               </a>
               <div class="card card-order">
                  <div class="card-body">
                     <div class="row">
                        <!-- Agregar cliente ya existente -->
                        <div class="select-split">
                           <div class="select-group w-100">
                              <select class="select select2-hidden-accessible" data-select2-id="1" tabindex="-1"
                                 aria-hidden="true">
                                 <option data-select2-id="3">Publico en general</option>
                                 <option>Chris Moris</option>
                              </select>
                              <label class="col-form-label">Seleccionar cliente Existente</label>
                              <span class="select2 select2-container select2-container--default" dir="ltr"
                                 data-select2-id="2" style="width: 100%;">
                                 <span class="selection">
                                    <span class="select2-selection select2-selection--single" role="combobox"
                                       aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false"
                                       aria-labelledby="select2-y9w0-container">
                                       <span class="select2-selection__rendered" id="select2-y9w0-container"
                                          role="textbox" aria-readonly="true" title="Walk-in Customer">Cliente sin
                                          cita previa</span>
                                    </span>
                                 </span>
                                 <span class="dropdown-wrapper" aria-hidden="true"></span>
                              </span>
                           </div>
                        </div>
                        <!-- Fin Agregar cliente ya existente -->
                     </div>
                  </div>
               </div>
            </div>

            <!-- Renderiza el componente según la elección del usuario -->
            <component :is="selectedComponent" />

            <div class="col-md-4">
               <!-- Informacion de la factura o boleta de la venta -->
               <div class="order-list">
                  <div class="orderid">
                     <h4>Datos de comprobante</h4>
                     <h5>ID de transacción : #65565</h5>
                  </div>
               </div>
               <div>
                  <label class="col-form-label">Tipo de comprobante</label>
                  <select class="js-example-basic-single select2 select2-hidden-accessible" data-select2-id="18"
                     tabindex="-1" aria-hidden="true">
                     <option selected="selected" data-select2-id="20">Factura</option>
                     <option data-select2-id="99">white</option>
                     <option data-select2-id="100">purple</option>
                  </select><span class="select2 select2-container select2-container--default select2-container--below"
                     dir="ltr" data-select2-id="19" style="width: 66px;"><span class="selection"><span
                           class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true"
                           aria-expanded="false" tabindex="0" aria-disabled="false"
                           aria-labelledby="select2-htm5-container"><span class="select2-selection__rendered"
                              id="select2-htm5-container" role="textbox" aria-readonly="true"
                              title="orange">Factura</span></span></span><span class="dropdown-wrapper"
                        aria-hidden="true"></span></span>
               </div>

               <label class="col-form-label">Serie</label>
               <input type="text" class="form-control">

               <label class="col-form-label">Numero</label>
               <input type="text" class="form-control">
               <!-- Fin Informacion de la factura o boleta de la venta -->
            </div>
            <div class="col-md-4">
               <div class="order-list">
                  <div class="orderid">
                     <h4>Datos de venta</h4>
                     <label class="col-form-label">Fecha</label>
                     <input type="date" class="form-control">
                     <label class="col-form-label">IGV</label>
                     <input type="text" value="18 %" class="form-control" disabled="disabled">
                  </div>
               </div>
            </div>
         </div>

         <!-- PRODUCTOS -->
         <div class="row">
            <div class="col-12">
               <!-- Buscadores -->
               <div class="page-header">
                  <div class="page-title">
                     <h4>Categorías</h4>
                     <h6>Gestiona tus compras</h6>
                  </div>
               </div>
               <div class="row mb-3">
                  <div class="col-md-6">
                     <input v-model="busquedaCategoria" type="text" class="form-control"
                        placeholder="Buscar categoría...">
                  </div>

               </div>

               <!-- Listado de Productos por categorias -->
               <div class="col-lg-12 col-sm-12 tabs_wrapper">

                  <!-- Listado de Categorias -->
                  <ul class="tabs owl-carousel owl-theme owl-product border-0 owl-loaded">
                     <div class="owl-stage-outer">
                        <div class="owl-stage row">
                           <div class="owl-item col-lg-2 col-sm-12 d-flex" v-for="categoria in categoriasFiltradas"
                              :key="categoria.id">
                              <li :class="{ active: categoriaActiva === categoria.id }"
                                 @click="cambiarCategoria(categoria.id)">
                                 <div class="product-details">
                                    <h6>{{ categoria.nombre }}</h6>
                                 </div>
                              </li>
                           </div>
                        </div>
                     </div>
                  </ul>
                  <!-- Fin de listado de Categorias -->
                  <div class="row mb-3">

                     <div class="col-md-6">
                        <input v-model="busquedaProducto" type="text" class="form-control"
                           placeholder="Buscar producto...">
                     </div>
                  </div>
                  <!-- Listado de Productos -->
                  <div class="tabs_container">
                     <div class="tab_content active">
                        <div class="row">
                           <div class="col-lg-2 col-sm-12 d-flex" v-for="producto in productosFiltrados" :key="producto.idProducto">
  <div 
    class="productset flex-fill" 
    :class="{ 'active': isProductoSeleccionado(producto) }"
    @click="agregarProducto(producto)"
  >
    <div class="productsetimg">
      <img :src="getProveedorImage(producto.RutaImagen)" alt="img">
      <h6>Cantidad: {{ producto.Stock }}</h6>
      <div class="check-product" v-if="isProductoSeleccionado(producto)">
        <i class="fa fa-check"></i>
      </div>
    </div>
    <div class="productsetcontent">
      <h5>{{ producto.Nombre }}</h5>
      <h4>{{ producto.Descripcion }}</h4>
      <h6>{{ producto.PrecioUnitario }}</h6>
    </div>
  </div>
</div>
                        </div>
                     </div>
                  </div>
                  <!-- Fin Listado de Productos -->
               </div>
            </div>
         </div>

         <div class="row">
            <div class="col-md-8">
               <div class="card-body pt-0">
                  <div class="totalitem">
                     <h4>Total de artículos: {{ productosSeleccionados.length }}</h4>
                     <a href="javascript:void(0);" @click="limpiarProductos">Borrar todo</a>
                  </div>
                  <div class="product-table">
                     <ul class="product-lists" v-for="producto in productosSeleccionados" :key="producto.idProducto">
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
          <h5>{{ producto.idProducto }}</h5>
        </div>
        <div class="increment-decrement">
          <div class="input-groups">
            <input type="button" value="-" class="button-minus dec button" @click="decrementarCantidad(producto)">
            <input type="text" :value="producto.cantidad" class="quantity-field" readonly>
            <input type="button" value="+" class="button-plus inc button" @click="incrementarCantidad(producto)">
          </div>
        </div>
      </div>
    </div>
  </li>
  <li>{{ producto.PrecioUnitario * producto.cantidad }}</li>
  <li>
    <a class="confirm-text" href="javascript:void(0);" @click="eliminarProducto(producto)">
      <img src="../../public/img/icons/delete-2.svg" alt="img">
    </a>
  </li>
</ul>
                  </div>
               </div>
            </div>

            <div class="col-md-4">
               <!-- Pago y suma de los productos -->
               <div class="card-body pt-0 pb-2">
                  <!-- Suma de los productos -->
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
                  <!-- Fin de Suma de los productos -->

                  <!-- Elegir Forma de pago -->
                  <div class="setvaluecash">
                     <ul>
                        <li>
                           <a href="javascript:void(0);" class="paymentmethod">
                              <img src="../../public/img/icons/cash.svg" alt="img" class="me-2">
                              <font>Efectivo</font>
                           </a>
                        </li>
                        <li>
                           <a href="javascript:void(0);" class="paymentmethod">
                              <img src="../../public/img/icons/debitcard.svg" alt="img" class="me-2">
                              <font>Débito</font>
                           </a>
                        </li>
                        <li>
                           <a href="javascript:void(0);" class="paymentmethod">
                              <img src="../../public/img/icons/scan.svg" alt="img" class="me-2">
                              <font>Escanear</font>
                           </a>
                        </li>
                     </ul>
                  </div>
                  <!-- Fin de Elegir Forma de pago -->

                  <!-- Registrar Pago -->
                  <div class="btn-totallabel">
                     <h5>Caja</h5>
                     <h6>60.00$</h6>
                  </div>
                  <!-- Fin de Registrar Pago -->
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

export default {
   data() {
      return {
         categorias: [],
         productos: [], // Inicializar como array vacío
         categoriaActiva: null,
         selectedComponent: null,
         busquedaCategoria: '',
         busquedaProducto: '',
         productosSeleccionados: [],
      };
   },
   created() {
      this.obtenerCategorias();
   },
   computed: {
      totalVenta() {
         return this.productosSeleccionados.reduce((total, producto) => {
            return total + (producto.PrecioUnitario * producto.cantidad);
         }, 0);
      },
      categoriasFiltradas() {
         return this.categorias.filter(categoria =>
            categoria.nombre.toLowerCase().includes(this.busquedaCategoria.toLowerCase())
         );
      },
      productosFiltrados() {
         if (!this.productos) return []; // Retorna un array vacío si this.productos es undefined o null
         return this.productos.filter(producto =>
            producto.Nombre.toLowerCase().includes(this.busquedaProducto.toLowerCase())
         );
      },
      productosSeleccionadosConId() {
         return this.productosSeleccionados.map((producto, index) => ({
            ...producto,
            uniqueId: `${producto.idProducto}-${index}`
         }));
      }
   },
   methods: {
      isProductoSeleccionado(producto) {
  return this.productosSeleccionados.some(p => p.idProducto === producto.idProducto);
},
      agregarProducto(producto) {
         const index = this.productosSeleccionados.findIndex(p => p.idProducto === producto.idProducto);
         if (index !== -1) {
            // Si el producto ya está en la lista, lo quitamos
            this.productosSeleccionados.splice(index, 1);
         } else {
            // Si el producto no está en la lista, lo agregamos
            this.productosSeleccionados.push({ ...producto, cantidad: 1 });
         }
         // Forzamos la actualización de la vista
         this.$forceUpdate();
      },

      limpiarProductos() {
         this.productosSeleccionados = [];
      },

      editarProducto(index) {
         // Implementa la lógica de edición aquí
      },

      incrementarCantidad(producto) {
  const index = this.productosSeleccionados.findIndex(p => p.idProducto === producto.idProducto);
  if (index !== -1) {
    this.productosSeleccionados[index].cantidad++;
  }
},

decrementarCantidad(producto) {
  const index = this.productosSeleccionados.findIndex(p => p.idProducto === producto.idProducto);
  if (index !== -1 && this.productosSeleccionados[index].cantidad > 1) {
    this.productosSeleccionados[index].cantidad--;
  }
},

eliminarProducto(producto) {
  const index = this.productosSeleccionados.findIndex(p => p.idProducto === producto.idProducto);
  if (index !== -1) {
    this.productosSeleccionados.splice(index, 1);
  }
},
      async obtenerCategorias() {
         try {
            const response = await axios.get('http://localhost:3000/api/v1/categorias/');
            if (response.data.success) {
               this.categorias = response.data.categorias;
               if (this.categorias.length > 0) {
                  this.categoriaActiva = this.categorias[0].id;
                  this.obtenerProductosPorCategoria(this.categoriaActiva);
               }
            } else {
               console.error(response.data.message);
            }
         } catch (error) {
            console.error('Error al obtener categorías:', error);
         }
      },
      async obtenerProductosPorCategoria(categoriaId) {
         try {
            const response = await axios.get(`http://localhost:3000/api/v1/productos/filtrar/${categoriaId}`);
            if (response.data.success) {
               this.productos = response.data.productos || []; // Usa un array vacío si no hay productos
            } else {
               console.error(response.data.message);
               this.productos = []; // Asegúrate de que sea un array vacío en caso de error
            }
         } catch (error) {
            console.error('Error al obtener productos por categoría:', error);
            this.productos = []; // Asegúrate de que sea un array vacío en caso de error
         }
      },
      cambiarCategoria(categoriaId) {
         this.categoriaActiva = categoriaId;
         this.obtenerProductosPorCategoria(categoriaId);
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