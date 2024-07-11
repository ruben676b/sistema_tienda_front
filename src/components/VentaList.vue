<template>
  <div>
    <div class="page-header">
      <div class="page-title">
        <h4 _msttexthash="233701" _msthash="173">Lista de ventas</h4>
        <h6 _msttexthash="361400" _msthash="174">Gestiona tus ventas</h6>
      </div>
      <div class="page-btn">
        <a href="add-sales.html" class="btn btn-added"
          ><img
            src="../../public/img/icons/plus.svg"
            alt="img"
            class="me-1"
            _mstalt="32942"
            _msthash="175"
          />
          <font _mstmutation="1" _msttexthash="233012" _msthash="176"
            >Agregar ventas</font
          >
        </a>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="table-top">
          <div class="search-set">
            <div class="search-path">
              <a class="btn btn-filter" id="filter_search">
                <img
                  src="../../public/img/icons/filter.svg"
                  alt="img"
                  _mstalt="32942"
                  _msthash="177"
                />
                <span _msthidden="1"
                  ><img
                    src="../../public/img/icons/closes.svg"
                    alt="img"
                    _msthidden="A"
                    _mstalt="32942"
                    _msthash="178"
                /></span>
              </a>
            </div>
            <div class="search-input">
              <a class="btn btn-searchset"
                ><img
                  src="../../public/img/icons/search-white.svg"
                  alt="img"
                  _mstalt="32942"
                  _msthash="179"
              /></a>
              <div id="DataTables_Table_0_filter" class="dataTables_filter">
                <label>
                  <input
                    type="search"
                    class="form-control form-control-sm"
                    placeholder="Buscar..."
                    aria-controls="DataTables_Table_0"
                    _mstplaceholder="99723"
                    _msthash="180"
                /></label>
              </div>
            </div>
          </div>
          <div class="wordset">
            <ul>
              <li>
                <a
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title=""
                  data-bs-original-title="pdf"
                  aria-label="PDF"
                  _mstaria-label="32526"
                  _msthash="181"
                  ><img
                    src="../../public/img/icons/pdf.svg"
                    alt="img"
                    _mstalt="32942"
                    _msthash="182"
                /></a>
              </li>
              <li>
                <a
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title=""
                  data-bs-original-title="excel"
                  aria-label="sobresalir"
                  _mstaria-label="61828"
                  _msthash="183"
                  ><img
                    src="../../public/img/icons/excel.svg"
                    alt="img"
                    _mstalt="32942"
                    _msthash="184"
                /></a>
              </li>
              <li>
                <a
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title=""
                  data-bs-original-title="print"
                  aria-label="Impresión"
                  _mstaria-label="65221"
                  _msthash="185"
                  ><img
                    src="../../public/img/icons/printer.svg"
                    alt="img"
                    _mstalt="32942"
                    _msthash="186"
                /></a>
              </li>
            </ul>
          </div>
        </div>

        <div class="card" id="filter_inputs" _msthidden="6">
          <div class="card-body pb-0" _msthidden="6">
            <div class="row" _msthidden="6">
              <div class="col-lg-3 col-sm-6 col-12" _msthidden="1">
                <div class="form-group" _msthidden="1">
                  <input
                    type="text"
                    placeholder="Enter Name"
                    _msthidden="A"
                    _mstplaceholder="128817"
                    _msthash="187"
                  />
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-12" _msthidden="1">
                <div class="form-group" _msthidden="1">
                  <input
                    type="text"
                    placeholder="Enter Reference No"
                    _msthidden="A"
                    _mstplaceholder="304369"
                    _msthash="188"
                  />
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-12" _msthidden="3">
                <div class="form-group" _msthidden="3">
                  <select
                    class="select select2-hidden-accessible"
                    data-select2-id="1"
                    tabindex="-1"
                    aria-hidden="true"
                    _msthidden="2"
                  >
                    <option
                      data-select2-id="3"
                      _msttexthash="133640"
                      _msthidden="1"
                      _msthash="189"
                    >
                      Completed
                    </option>
                    <option _msttexthash="42653" _msthidden="1" _msthash="190">
                      Paid
                    </option></select
                  ><span
                    class="select2 select2-container select2-container--default"
                    dir="ltr"
                    data-select2-id="2"
                    style="width: 100%"
                    _msthidden="1"
                    ><span class="selection" _msthidden="1"
                      ><span
                        class="select2-selection select2-selection--single"
                        role="combobox"
                        aria-haspopup="true"
                        aria-expanded="false"
                        tabindex="0"
                        aria-disabled="false"
                        aria-labelledby="select2-z1tk-container"
                        _msthidden="1"
                        ><span
                          class="select2-selection__rendered"
                          id="select2-z1tk-container"
                          role="textbox"
                          aria-readonly="true"
                          title="Completed"
                          _msttexthash="133640"
                          _msthidden="1"
                          _msthash="191"
                          >Completed</span
                        ><span
                          class="select2-selection__arrow"
                          role="presentation"
                          ><b role="presentation"></b></span></span></span
                    ><span class="dropdown-wrapper" aria-hidden="true"></span
                  ></span>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-12" _msthidden="1">
                <div class="form-group" _msthidden="1">
                  <a class="btn btn-filters ms-auto" _msthidden="1"
                    ><img
                      src="../../public/img/icons/search-whites.svg"
                      alt="img"
                      _msthidden="A"
                      _mstalt="32942"
                      _msthash="192"
                  /></a>
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
            <th>ID Usuario</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="venta in ventas" :key="venta.IdVenta">
            <td>{{ formatDate(venta.FechaVenta) }}</td>
            <td>{{ getNombreCliente(venta) }}</td>
            <td>{{ venta.TipoComprobante }}</td>
            <td>{{ venta.Serie + venta.Numero }}</td>
            <td>{{ venta.Total }}</td>
            <td>{{ venta.FormaPago }}</td>
            <td>{{ venta.IdUsuario }}</td>
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
        <div
          class="modal fade"
          id="detallesVentaModal"
          tabindex="-1"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Detalles de la Venta</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
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
                    <tr
                      v-for="detalle in detallesVenta"
                      :key="detalle.IdProducto"
                    >
                      <td>
                        <div class="productimgs">
                          <img
                            :src="getProveedorImage(detalle.RutaImagen)"
                            alt="img"
                          />
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

export default {
  data() {
    return {
      ventas: [],
      detallesVenta: [],
      total:0
    };
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
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    getNombreCliente(venta) {
      if (venta.TipoComprobante === 'Ticket') {
        return 'Público en General';
      } else if (venta.NombreCliente) {
        return venta.NombreCliente; // Cliente natural
      } else if (venta.NombreEmpresa) {
        return venta.NombreEmpresa; // Cliente jurídico
      } else {
        return 'N/A';
      }
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
