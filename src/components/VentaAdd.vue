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
          <div v-if="tipoComprobante === 'ticket'">
            <ComprobanteTicket :datos="datosComprobante" />
          </div>
        </div>
        <div class="col-lg-6">
          <div v-if="tipoComprobante !== 'ticket'">
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
import ComprobanteTicket from "./ComprobanteTicket.vue";
import ClienteJuridico from "../components/ClienteAddJuridico.vue";
import ClienteNatural from "../components/ClienteAddNatural.vue";

import axios from "axios";
import Swal from "sweetalert2";
import { mapState } from "vuex";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

export default {
  components: {
    BuscarProducto,
    ListadoProductos,
    TotalArticulos,
    ProductoSeleccionado,
    ComprobanteFactura,
    ComprobanteBoleta,
    ComprobanteTicket,
    ClienteJuridico,
    ClienteNatural,
  },
  data() {
    return {
      tipoComprobante: "",
      tipoCliente: "",
      datosComprobante: {
        fecha: new Date().toISOString().substring(0, 10),
        serie: "FRK",
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
      publicoGeneral: false, // 0 si es cliente específico, 1 si es público general
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
        return total + producto.PrecioVenta * producto.cantidad;
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
        this.publicoGeneral = false;
        // No resetear idCliente aquí, ya que se necesita para factura
      } else if (newVal === "boleta") {
        this.tipoCliente = "natural";
        this.publicoGeneral = false;
        // No resetear idCliente aquí, ya que se necesita para boleta
      } else if (newVal === "ticket") {
        this.tipoCliente = "";
        this.publicoGeneral = true;
        this.idCliente = null; // Resetear idCliente para ticket
      } else {
        this.tipoCliente = "";
        this.publicoGeneral = false;
        this.idCliente = null;
      }
    },
  },
  methods: {
    async generatePDF() {
  console.log("Iniciando generación de PDF");

  // Guardar datos en variables locales
  const tipoComprobante = this.tipoComprobante;
  const datosComprobante = { ...this.datosComprobante };
  const idFormaPago = this.idFormaPago;
  const formasPago = [...this.formasPago];
  const total = this.total;
  const productosSeleccionados = [...this.productosSeleccionados];
  const idCliente = this.idCliente;
  const tipoCliente = this.tipoCliente;

  console.log("Tipo de Comprobante:", tipoComprobante);
  console.log("Datos del comprobante:", datosComprobante);
  console.log("ID Forma de Pago:", idFormaPago);
  console.log("Formas de Pago disponibles:", formasPago);
  console.log("Total calculado:", total);
  console.log("Productos seleccionados:", productosSeleccionados);

  // Verificar si tenemos todos los datos necesarios
  if (!tipoComprobante || !datosComprobante.serie || !datosComprobante.numero || !idFormaPago) {
    console.error("Faltan datos necesarios para generar el PDF");
    return;
  }

  // Crear un nuevo documento PDF
  const doc = new jsPDF();

  // Configurar fuente y tamaño
  doc.setFont("helvetica");
  doc.setFontSize(18);

  // Agregar la plantilla del comprobante (imagen)
  const imgData = "data:image/png;base64,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"; // Reemplaza con tu base64
  doc.addImage(imgData, "PNG", 0, 0, 210, 297); // Ajustar las dimensiones según la imagen

  // Título
  doc.text("Comprobante de Venta", 105, 40, null, null, "center");

  // Información del comprobante
  doc.setFontSize(12);
  doc.text(`Fecha: ${new Date().toLocaleDateString("es-ES")}`, 20, 60);

  // Obtener la información del cliente
  let clienteInfo = "Cliente no especificado";
  if (idCliente && tipoCliente) {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/clientes/${idCliente}?tipo=${tipoCliente}`);
      console.log("Respuesta de la API:", response.data); // Log para depuración
      if (response.data && response.data.success && response.data.cliente) {
        const cliente = response.data.cliente;
        if (cliente.TipoCliente === "Natural") {
          clienteInfo = `${cliente.NombreCliente} - DNI: ${cliente.DNI}`;
        } else if (cliente.TipoCliente === "Juridico") {
          clienteInfo = `${cliente.NombreEmpresa} - RUC: ${cliente.RUCCliente}`;
        }
      }
    } catch (error) {
      console.error("Error al obtener información del cliente:", error);
    }
  } else if (tipoComprobante === "ticket") {
    clienteInfo = "Público General";
  }

  console.log("Información del cliente:", clienteInfo); // Log para depuración
  doc.text(`Cliente: ${clienteInfo}`, 20, 70);
  doc.text(`Tipo de Comprobante: ${tipoComprobante.toUpperCase()}`, 20, 80);
  doc.text(`Serie-Número: ${datosComprobante.serie}-${datosComprobante.numero}`, 20, 90);

  // Obtener la descripción de la forma de pago
  const formaPago = formasPago.find((fp) => fp.IdFormaPago === idFormaPago);
  console.log("Forma de pago encontrada:", formaPago);
  doc.text(`Forma de Pago: ${formaPago ? formaPago.Descripcion : "No especificada"}`, 20, 100);

  doc.text(`Total: $${total.toFixed(2)}`, 20, 110);

  // Añadir la tabla de productos
  doc.setFontSize(14);
  doc.text("Productos:", 20, 120);
  doc.setFontSize(12);

  // Datos de los productos para la tabla
  const productRows = productosSeleccionados.map((producto, index) => [
    index + 1,
    producto.Nombre,
    producto.cantidad,
    `$${producto.PrecioUnitario || producto.PrecioVenta}`
  ]);

  // Crear la tabla
  doc.autoTable({
    startY: 130,
    head: [['#', 'Nombre', 'Cantidad', 'Precio']],
    body: productRows,
  });

  // Guardar el PDF
  doc.save(`comprobante_${tipoComprobante}_${datosComprobante.serie}-${datosComprobante.numero}.pdf`);
},


    async obtenerNombreCliente(idCliente) {
      // Implementa esta función para obtener el nombre del cliente basado en su ID
      // Podrías hacer una llamada a la API aquí
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/clientes/${idCliente}`
        );
        if (response.data && response.data.cliente) {
          return response.data.cliente.Nombre; // Ajusta esto según la estructura de tu respuesta
        }
      } catch (error) {
        console.error("Error al obtener el nombre del cliente:", error);
      }
      return `Cliente ID: ${idCliente}`; // Fallback si no se puede obtener el nombre
    },
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
          IdCliente: this.tipoComprobante === "ticket" ? null : this.idCliente,
          PublicoGeneral: this.tipoComprobante === "ticket" ? 1 : 0,
          IGV: 0.18,
          Subtotal: this.subtotal,
        },
        detallesVenta: this.productosSeleccionados.map((producto) => ({
          IdProducto: producto.IdProducto,
          Cantidad: producto.cantidad,
          PrecioVenta: parseFloat(producto.PrecioVenta),
        })),
        comprobante: {
          TipoComprobante: this.tipoComprobante,
          Serie: this.datosComprobante.serie,
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
          this.datosComprobante.numero = response.data.numeroComprobante;
          Swal.fire("Éxito", "Venta registrada correctamente", "success");
          this.generatePDF();
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
        return total + producto.PrecioVenta * producto.cantidad;
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
        serie: "FRK",
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
