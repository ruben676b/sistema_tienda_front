<template>
  <div>
    <div class="page-header">
      <div class="page-title">
        <h4>Lista de ventas</h4>
        <h6>Gestiona tus ventas</h6>
      </div>
      <div class="page-btn">
        <router-link to="/dashboard/ventaAdd" href="add-sales.html" class="btn btn-added">
          <img src="../../public/img/icons/plus.svg" alt="img" class="me-1" />
          <font>Agregar ventas</font>
        </router-link>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="table-top">
          <div class="search-set">
            <div class="search-path">
              <a class="btn btn-filter" id="filter_search">
                <img src="../../public/img/icons/filter.svg" alt="img" />
                <span><img src="../../public/img/icons/closes.svg" alt="img" /></span>
              </a>
            </div>
            <div class="search-input">
              
              <div id="DataTables_Table_0_filter" class="dataTables_filter">
                
              </div>
            </div>
          </div>
          <div class="wordset">
            <ul>
              <li>
                <a data-bs-toggle="tooltip" data-bs-placement="top" title="PDF" aria-label="PDF">
                  <img src="../../public/img/icons/pdf.svg" alt="img" />
                </a>
              </li>
              <li>
                <a data-bs-toggle="tooltip" data-bs-placement="top" title="Excel" aria-label="sobresalir">
                  <img src="../../public/img/icons/excel.svg" alt="img" />
                </a>
              </li>
              <li>
                <a data-bs-toggle="tooltip" data-bs-placement="top" title="Print" aria-label="Impresión">
                  <img src="../../public/img/icons/printer.svg" alt="img" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="card" id="filter_inputs">
          <div class="card-body pb-0">
            <div class="row">
              <div class="col-lg-3 col-sm-6 col-12">
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Buscar Cliente"
                    v-model="searchCliente"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-12">
                <div class="form-group">
                  <select v-model="filterTipoComprobante" class="form-control">
                    <option value="">Todos los Tipos de Comprobante</option>
                    <option value="Factura">Factura</option>
                    <option value="Boleta">Boleta</option>
                    <option value="Ticket">Ticket</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-12">
                <div class="form-group">
                  <select v-model="filterFormaPago" class="form-control">
                    <option value="">Todas las Formas de Pago</option>
                    <option value="Efectivo">Efectivo</option>
                    <option value="Yape">Yape</option>
                    <option value="Debito">Debito</option>
                  </select>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table datanew dataTable no-footer" id="DataTables_Table_0">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Tipo de Comprobante</th>
                <th>Serie_Número</th>
                <th>Total</th>
                <th>Forma de Pago</th>
                <th>Vendedor</th>
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="venta in filteredVentas" :key="venta.IdVenta">
                <td>{{ formatDate(venta.FechaVenta) }}</td>
                <td>{{ getNombreCliente(venta) }}</td>
                <td>{{ venta.TipoComprobante }}</td>
                <td>{{ venta.Serie + venta.Numero }}</td>
                <td>{{ venta.Total }}</td>
                <td>{{ venta.FormaPago }}</td>
                <td>{{ venta.Usuario }}</td>
                <td class="text-center">
                  <a class="action-set" href="javascript:void(0);" @click="verDetalles(venta.IdVenta)">
                    <img src="../../public/img/icons/eye.svg" alt="Ver detalles" title="Ver detalles">
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Modal para mostrar detalles -->
        <div class="modal fade" id="detallesVentaModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Detalles de la Venta</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Img</th>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio Unitario</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="detalle in detallesVenta" :key="detalle.IdProducto">
                      <td>
                        <div class="productimgs">
                          <img :src="getProveedorImage(detalle.RutaImagen)" alt="img" />
                        </div>
                      </td>
                      <td>{{ detalle.Nombre }}</td>
                      <td>{{ detalle.Cantidad }}</td>
                      <td>{{ detalle.PrecioUnitario }}</td>
                      <td>{{ formatearPrecio(detalle.Cantidad * detalle.PrecioUnitario) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      ventas: [],
      detallesVenta: [],
      searchQuery: '',
      searchCliente: '',
      filterTipoComprobante: '',
      filterFormaPago: '',
      total: 0,
    };
  },
  computed: {
    ...mapGetters(['getUserName']),
    userName() {
      return this.getUserName;
    },
    filteredVentas() {
      return this.ventas.filter(venta => {
        const matchesCliente = this.getNombreCliente(venta).toLowerCase().includes(this.searchCliente.toLowerCase());
        const matchesTipoComprobante = this.filterTipoComprobante ? venta.TipoComprobante === this.filterTipoComprobante : true;
        const matchesFormaPago = this.filterFormaPago ? venta.FormaPago === this.filterFormaPago : true;
        return matchesCliente && matchesTipoComprobante && matchesFormaPago;
      });
    }
  },
  mounted() {
    this.obtenerVentas();
  },
  methods: {
  formatearPrecio(precio) {
    return precio.toFixed(2);
  },
  getProveedorImage(imagePath) {
    return imagePath ? `http://localhost:3000/api/v1/uploads/productos/${imagePath}` : "../../public/img/product/noimage.png";
  },
  async obtenerVentas() {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/ventas');
      this.ventas = response.data.ventas;
    } catch (error) {
      console.error('Error al obtener las ventas:', error);
    }
  },
  async verDetalles(idVenta) {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/ventas/${idVenta}/detalles`);
      this.detallesVenta = response.data.detalles;
      // Abre el modal
      const modal = new bootstrap.Modal(document.getElementById('detallesVentaModal'));
      modal.show();
    } catch (error) {
      console.error('Error al obtener los detalles de la venta:', error);
    }
  },
  getNombreCliente(venta) {
    if (venta.TipoComprobante === 'Boleta') {
      return venta.NombreCliente ? venta.NombreCliente : 'Cliente no encontrado';
    } else if (venta.TipoComprobante === 'Factura') {
      return venta.NombreEmpresa ? venta.NombreEmpresa : 'Empresa no encontrada';
    }
    else {
      return 'Publico en General'
    }
    return 'Cliente no encontrado';
  },
  formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('es-ES', options);
  },
  applyFilters() {
    // Los filtros se aplican automáticamente a través de la propiedad computada filteredVentas
  }
}

};
</script>

<style scope>
.productimgs {
  width: 70px;
  height: 70px;
}
</style>
