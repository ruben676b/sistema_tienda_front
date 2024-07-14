<template>
  <div>
    <div class="page-header">
      <div class="page-title">
        <h4>Vea la lista de productos y Compare los precios</h4>
        <h6>De los distintos Proveedores!</h6>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="table-top">
          <div class="search-set">
            <div class="search-path">
              <a class="btn btn-filter" id="filter_search">
                <img src="../../public/img/icons/filter.svg" alt="img" />
                <span
                  ><img src="../../public/img/icons/closes.svg" alt="img"
                /></span>
              </a>
            </div>
            <div class="search-input">
              <a class="btn btn-searchset"
                ><img src="../../public/img/icons/search-white.svg" alt="img"
              /></a>
              <div id="DataTables_Table_0_filter" class="dataTables_filter">
                <label>
                  <input
                    type="search"
                    class="form-control form-control-sm"
                    v-model="searchTerm"
                    placeholder="Search..."
                    aria-controls="DataTables_Table_0"
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
                  aria-label="pdf"
                  ><img src="../../public/img/icons/pdf.svg" alt="img"
                /></a>
              </li>
              <li>
                <a
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title=""
                  data-bs-original-title="excel"
                  aria-label="excel"
                  ><img src="../../public/img/icons/excel.svg" alt="img"
                /></a>
              </li>
              <li>
                <a
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title=""
                  data-bs-original-title="print"
                  aria-label="print"
                  ><img src="../../public/img/icons/printer.svg" alt="img"
                /></a>
              </li>
            </ul>
          </div>
        </div>

        <div class="table-responsive">
          <div
            id="DataTables_Table_0_wrapper"
            class="dataTables_wrapper dt-bootstrap4 no-footer"
          >
            <table
              class="table datanew dataTable no-footer"
              id="DataTables_Table_0"
              role="grid"
              aria-describedby="DataTables_Table_0_info"
            >
              <thead>
                <tr role="row">
                  <th
                    class="sorting_asc"
                    tabindex="0"
                    aria-controls="DataTables_Table_0"
                    rowspan="1"
                    colspan="1"
                    style="width: 39.3833px"
                    aria-sort="ascending"
                    aria-label=": activate to sort column descending"
                  >
                    <label class="checkboxs">
                      <input type="checkbox" id="select-all" />
                      <span class="checkmarks"></span>
                    </label>
                  </th>
                  <th
                    class="sorting"
                    tabindex="0"
                    aria-controls="DataTables_Table_0"
                    rowspan="1"
                    colspan="1"
                    style="width: 132.517px"
                    aria-label="Product Name: activate to sort column ascending"
                  >
                    Nombre del producto
                  </th>
                  <th
                    class="sorting"
                    tabindex="0"
                    aria-controls="DataTables_Table_0"
                    rowspan="1"
                    colspan="1"
                    style="width: 34.0833px"
                    aria-label="SKU: activate to sort column ascending"
                  >
                    Precio Unitario
                  </th>
                  <th
                    class="sorting"
                    tabindex="0"
                    aria-controls="DataTables_Table_0"
                    rowspan="1"
                    colspan="1"
                    style="width: 69.0167px"
                    aria-label="Category : activate to sort column ascending"
                  >
                    Precio Total
                  </th>
                  <th
                    class="sorting"
                    tabindex="0"
                    aria-controls="DataTables_Table_0"
                    rowspan="1"
                    colspan="1"
                    style="width: 46.7833px"
                    aria-label="Brand: activate to sort column ascending"
                  >
                    Proveedor
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="producto in filteredProductos"
                  :key="producto.IdProducto"
                  class="odd"
                >
                  <td class="sorting_1">
                    <label class="checkboxs">
                      <input type="checkbox" />
                      <span class="checkmarks"></span>
                    </label>
                  </td>
                  <td class="productimgname">
                    <a href="javascript:void(0);" class="product-img">
                      <img
                        :src="`http://localhost:3000/api/v1/uploads/Productos/${producto.RutaImagen}`"
                        :alt="producto.Nombre"
                      />
                    </a>
                    <a href="javascript:void(0);">{{ producto.Nombre }}</a>
                  </td>
                  <td>{{ producto.PrecioCompra }}</td>
                  <td>{{ producto.PrecioTotal }}</td>
                  <td>{{ getProveedorNombre(producto.IdProveedor) }}</td>
                </tr>
              </tbody>
            </table>
            <div class="dataTables_length" id="DataTables_Table_0_length">
              <label
                ><select
                  name="DataTables_Table_0_length"
                  aria-controls="DataTables_Table_0"
                  class="custom-select custom-select-sm form-control form-control-sm"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select></label
              >
            </div>
            <div
              class="dataTables_paginate paging_numbers"
              id="DataTables_Table_0_paginate"
            >
              <ul class="pagination">
                <li class="paginate_button page-item active">
                  <a
                    href="#"
                    aria-controls="DataTables_Table_0"
                    data-dt-idx="0"
                    tabindex="0"
                    class="page-link"
                    >1</a
                  >
                </li>
                <li class="paginate_button page-item">
                  <a
                    href="#"
                    aria-controls="DataTables_Table_0"
                    data-dt-idx="1"
                    tabindex="0"
                    class="page-link"
                    >2</a
                  >
                </li>
              </ul>
            </div>
            <div
              class="dataTables_info"
              id="DataTables_Table_0_info"
              role="status"
              aria-live="polite"
            >
              1 - 10 of 11 items
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
      productos: [],
      proveedores: [],
      searchTerm: "", // Término de búsqueda
    };
  },
  mounted() {
    this.fetchProveedores();
    this.fetchProductos();
  },
  computed: {
    filteredProductos() {
      // Filtrar productos según el término de búsqueda
      return this.productos.filter((producto) =>
        producto.Nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  methods: {
    async fetchProveedores() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/proveedores/"
        );
        this.proveedores = response.data.proveedores;
      } catch (error) {
        console.error("Error fetching proveedores:", error);
      }
    },
    async fetchProductos() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/productos/"
        );
        this.productos = response.data.productos;
      } catch (error) {
        console.error("Error fetching productos:", error);
      }
    },
    getProveedorNombre(idProveedor) {
      const proveedor = this.proveedores.find(
        (p) => p.IdProveedor === idProveedor
      );
      return proveedor ? proveedor.NombreEmpresa : "Desconocido";
    },
  },
};
</script>

<style scoped>
/* Agrega tus estilos aquí */
</style>
