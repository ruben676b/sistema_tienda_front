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
          <BuscarProducto
            :busquedaProducto="busquedaProducto"
            @update:busquedaProducto="busquedaProducto = $event"
          />
        </div>

        <ListadoProductos
          :productosFiltrados="productosFiltrados"
          :isProductoSeleccionado="isProductoSeleccionado"
          :agregarProducto="agregarProducto"
          :getProveedorImage="getProveedorImage"
        />
      </div>

      <br /><br />

      <div class="row">
        <div class="col-md-9">
          <div class="card-body pt-0">
            <TotalArticulos
              :productosSeleccionados="productosSeleccionados"
              @limpiar-productos="limpiarProductos"
            />
            <div class="product-table">
              <ProductoSeleccionado
                v-for="producto in productosSeleccionados"
                :key="producto.idProducto"
                :producto="producto"
                :getProveedorImage="getProveedorImage"
                @editar-producto="editarProducto"
                @decrementar-cantidad="decrementarCantidad"
                @incrementar-cantidad="incrementarCantidad"
                @eliminar-producto="eliminarProducto"
              />
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
            <div class="order-list">
              <div class="orderid">
                <h4 for="tipoComprobante">Tipo de Comprobante</h4>
              </div>
            </div>
            <select
              v-model="tipoComprobante"
              class="form-control"
              id="tipoComprobante"
            >
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
            <ClienteJuridico
              @cliente-seleccionado="actualizarIdCliente"
              v-if="tipoCliente === 'juridico'"
            />
          </div>
          <div v-if="tipoCliente === 'natural'">
            <ClienteNatural
              @cliente-seleccionado="actualizarIdCliente"
              v-if="tipoCliente === 'natural'"
            />
          </div>
        </div>
      </div>
      <br />
      <div class="row" style="padding-top: 20px">
        <div class="col-md-2">
          <div class="order-list">
            <div class="orderid">
              <h4 for="formaPago">Forma de pago:</h4>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <select v-model="idFormaPago" class="form-control" id="formaPago">
              <option value="">Seleccione una forma de pago</option>
              <option
                v-for="formaPago in formasPago"
                :key="formaPago.IdFormaPago"
                :value="formaPago.IdFormaPago"
              >
                {{ formaPago.Descripcion }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-4">
          <div class="col-md-8">
            <div @click="registrarVenta" class="btn-totallabel">
              <h5>Caja</h5>
              <h6>{{ formatearPrecio(total) }}$</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BuscarProducto from "./BuscarProducto.vue";
import ListadoProductos from "./ListadoProductos.vue";
import TotalArticulos from "./TotalArticulos.vue";
import ProductoSeleccionado from "./ProductoSeleccionado.vue";
import ComprobanteFactura from "./ComprobanteFactura.vue";
import ComprobanteBoleta from "./ComprobanteBoleta.vue";
import ClienteJuridico from "../components/ClienteAddJuridico.vue";
import ClienteNatural from "../components/ClienteAddNatural.vue";

import axios from "axios";
import Swal from "sweetalert2";
import { mapState } from "vuex";

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
      tipoComprobante: "",
      tipoCliente: "",
      datosComprobante: {
        fecha: new Date().toISOString().substring(0, 10),
        serie: "",
        numero: "",
      },
      productos: [],
      selectedComponent: null,
      busquedaProducto: "",
      productosSeleccionados: [],
      formasPago: [],
      idFormaPago: null,
      subtotal: 0,
      impuesto: 0,
      total: 0,
      idCliente: null, // Deberás establecer esto cuando se seleccione un cliente
      publicoGeneral: 0, // 0 si es cliente específico, 1 si es público general
    };
  },

  created() {
    this.obtenerProductos();
    this.obtenerFormasPago();
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
    puedeRegistrarVenta() {
      return (
        this.productosSeleccionados.length > 0 &&
        this.formaPagoSeleccionada &&
        this.tipoComprobante &&
        (this.idCliente || this.publicoGeneral)
      );
    },
    totalVenta() {
      return this.productosSeleccionados.reduce((total, producto) => {
        return total + producto.PrecioUnitario * producto.cantidad;
      }, 0);
    },
    productosFiltrados() {
      if (!this.productos || this.busquedaProducto.length === 0) {
        return [];
      }
      return this.productos.filter((producto) =>
        producto.Nombre.toLowerCase().includes(
          this.busquedaProducto.toLowerCase()
        )
      );
    },
    productosSeleccionadosConId() {
      return this.productosSeleccionados.map((producto, index) => ({
        ...producto,
        uniqueId: `${producto.IdProducto}-${index}`,
      }));
    },
  },
  watch: {
    productosSeleccionados: {
      handler() {
        this.calcularTotales();
      },
      deep: true,
    },
    tipoComprobante(newVal) {
      if (newVal === "factura") {
        this.tipoCliente = "juridico";
      } else if (newVal === "boleta") {
        this.tipoCliente = "natural";
      } else {
        this.tipoCliente = "";
      }
    },
  },
  methods: {
    actualizarIdCliente(idCliente) {
      this.idCliente = idCliente;
    },
    async registrarVenta() {
      const datosVenta = {
        venta: {
          IdUsuario: this.user ? this.user.id : null,
          FechaVenta: new Date().toISOString().slice(0, 19).replace("T", " "),
          Total: this.total,
          IdFormaPago: this.idFormaPago,
          IdCliente: this.idCliente,
          PublicoGeneral: this.idCliente ? 0 : 1, // 0 si hay cliente, 1 si es público general
          IGV: 0.18,
          Subtotal: this.subtotal,
        },
        detallesVenta: this.productosSeleccionados.map((producto) => ({
          IdProducto: producto.IdProducto,
          Cantidad: producto.cantidad,
          PrecioUnitario: parseFloat(producto.PrecioUnitario),
        })),
        comprobante: {
          TipoComprobante: this.tipoComprobante,
          Serie: this.datosComprobante.serie,
          Numero: parseInt(this.datosComprobante.numero),
        },
      };

      console.log(datosVenta);
      if (!this.idFormaPago) {
        Swal.fire("Error", "Por favor seleccione una forma de pago", "error");
        return;
      }

      if (!this.idCliente && this.tipoComprobante !== "ticket") {
        Swal.fire(
          "Error",
          "Por favor seleccione un cliente o cambie a tipo de comprobante ticket",
          "error"
        );
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/ventas/registrar",
          datosVenta
        );
        if (response.data.success) {
          Swal.fire("Éxito", "Venta registrada correctamente", "success");
          this.limpiarFormulario(); // Ahora esto debería funcionar
        } else {
          Swal.fire(
            "Error",
            response.data.message || "Error al registrar la venta",
            "error"
          );
        }
      } catch (error) {
        console.error("Error al registrar la venta:", error);
        Swal.fire("Error", "Hubo un problema al registrar la venta", "error");
      }
    },
    async obtenerFormasPago() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/formas-pago"
        );
        this.formasPago = response.data.formasPago || [];
      } catch (error) {
        console.error("Error al obtener formas de pago:", error);
      }
    },
    async obtenerProductos() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/productos"
        );
        if (response.data.success) {
          this.productos = response.data.productos || [];
        } else {
          console.error(response.data.message);
          this.productos = [];
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
        this.productos = [];
      }
    },
    calcularTotales() {
      this.total = this.productosSeleccionados.reduce((total, producto) => {
        return total + producto.PrecioUnitario * producto.cantidad;
      }, 0);
      this.impuesto = this.total * 0.18;
      this.subtotal = this.total - this.impuesto;
    },
    formatearPrecio(precio) {
      return precio.toFixed(2);
    },
    isProductoSeleccionado(producto) {
      return this.productosSeleccionados.some(
        (p) => p.IdProducto === producto.IdProducto
      );
    },
    agregarProducto(producto) {
      const index = this.productosSeleccionados.findIndex(
        (p) => p.IdProducto === producto.IdProducto
      );
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
      const index = this.productosSeleccionados.findIndex(
        (p) => p.IdProducto === producto.IdProducto
      );
      if (index !== -1) {
        if (
          this.productosSeleccionados[index].cantidad <
          this.productosSeleccionados[index].Stock
        ) {
          this.productosSeleccionados[index].cantidad++;
        } else {
          Swal.fire({
            title: "Stock Maximo",
            icon: "info",
          });
        }
      }
    },
    decrementarCantidad(producto) {
      const index = this.productosSeleccionados.findIndex(
        (p) => p.IdProducto === producto.IdProducto
      );
      if (index !== -1 && this.productosSeleccionados[index].cantidad > 1) {
        this.productosSeleccionados[index].cantidad--;
      }
    },
    eliminarProducto(producto) {
      const index = this.productosSeleccionados.findIndex(
        (p) => p.IdProducto === producto.IdProducto
      );
      if (index !== -1) {
        this.productosSeleccionados.splice(index, 1);
      }
    },
    getProveedorImage(imagePath) {
      return imagePath
        ? `http://localhost:3000/api/v1/uploads/productos/${imagePath}`
        : "../../public/img/product/noimage.png";
    },
    limpiarFormulario() {
      this.productosSeleccionados = [];
      this.idFormaPago = null;
      this.tipoComprobante = "";
      this.datosComprobante = {
        fecha: new Date().toISOString().substring(0, 10),
        serie: "",
        numero: "",
      };
      this.idCliente = null;
      this.publicoGeneral = 0;
      this.calcularTotales();
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
