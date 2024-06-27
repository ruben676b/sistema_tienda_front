<template>
    <div>
      <div class="page-header">
        <div class="page-title">
          <h4>Lista de Productos</h4>
          <h6>Organiza tus Productos</h6>
        </div>
        <div class="page-btn">
          <router-link to="/dashboard/addProduct">
            <a class="btn btn-added">
              <img src="../../public/img/icons/plus.svg" alt="img" class="me-1" />
              Añadir nuevo producto
            </a>
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
                  <span>
                    <img src="../../public/img/icons/closes.svg" alt="img" />
                  </span>
                </a>
              </div>
              <div class="search-input">
                <a class="btn btn-searchset">
                  <img src="../../public/img/icons/search-white.svg" alt="img" />
                </a>
                <div id="DataTables_Table_0_filter" class="dataTables_filter">
                  <label>
                    <input
                      type="search"
                      class="form-control form-control-sm"
                      placeholder="Search..."
                      aria-controls="DataTables_Table_0"
                      v-model="searchQuery"
                      @input="searchProducts"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div class="wordset">
              <ul>
                <li>
                  <a
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="pdf"
                    aria-label="pdf"
                  >
                    <img src="../../public/img/icons/pdf.svg" alt="img" />
                  </a>
                </li>
                <li>
                  <a
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="excel"
                    aria-label="excel"
                  >
                    <img src="../../public/img/icons/excel.svg" alt="img" />
                  </a>
                </li>
                <li>
                  <a
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="print"
                    aria-label="print"
                  >
                    <img src="../../public/img/icons/printer.svg" alt="img" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
  
          <div class="table-responsive">
            <div class="dataTables_wrapper dt-bootstrap4 no-footer">
              <table class="table datanew dataTable no-footer" role="grid">
                <thead>
                  <tr role="row">
                    <th>
                      <label class="checkboxs">
                        <input type="checkbox" id="select-all" />
                        <span class="checkmarks"></span>
                      </label>
                    </th>
                    <th>Nombre del Producto</th>
                    <th>Descripcion</th>
                    <th>Precio Unitario</th>
                    <th>Precio Total</th>
                    <th>Fecha de Vencimiento</th>
                    <th>Stock</th>
                    <th>Stock Minimo</th>
                    <th>Cod. Barra</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in filteredProducts" :key="product.id">
                    <td>
                      <label class="checkboxs">
                        <input type="checkbox" />
                        <span class="checkmarks"></span>
                      </label>
                    </td>
                    <td class="productimgname">
                      <a href="javascript:void(0);" class="product-img">
                        <img
                          :src="getProveedorImage(product.RutaImagen)"
                          alt="product"
                        />
                      </a>
                      <a href="javascript:void(0);">{{ product.Nombre }}</a>
                    </td>
                    <td>{{ product.Descripcion }}</td>
                    <td>{{ product.PrecioUnitario }}</td>
                    <td>{{ product.PrecioTotal }}</td>
                    <td>
                      {{ formatFechaVencimiento(product.FechaVencimiento) }}
                    </td>
                    <td>{{ product.Stock }}</td>
                    <td>{{ product.StockMinimo }}</td>
                    <td>{{ product.CodigoBarra }}</td>
                    <td>
                      <a class="me-3" @click="editProducto(product.IdProducto)">
                        <img src="../../public/img/icons/edit.svg" alt="img" />
                      </a>
                      <a
                        class="confirm-text"
                        @click="deleteProducto(product.IdProducto)"
                      >
                        <img src="../../public/img/icons/delete.svg" alt="img" />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="dataTables_length">
                <label>
                  <select
                    v-model="itemsPerPage"
                    @change="fetchProducts"
                    class="custom-select custom-select-sm form-control form-control-sm"
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </label>
              </div>
              <div class="dataTables_paginate paging_numbers">
                <ul class="pagination">
                  <li
                    v-for="page in totalPages"
                    :key="page"
                    :class="[
                      'paginate_button',
                      'page-item',
                      { active: page === currentPage },
                    ]"
                  >
                    <a
                      href="#"
                      class="page-link"
                      @click.prevent="fetchProducts(page)"
                      >{{ page }}</a
                    >
                  </li>
                </ul>
              </div>
              <div class="dataTables_info" role="status" aria-live="polite">
                1 - {{ itemsPerPage }} of {{ totalProducts }} items
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { format } from "date-fns";
  
  export default {
    data() {
      return {
        products: [],
        searchQuery: "",
        currentPage: 1,
        itemsPerPage: 10,
        totalProducts: 0,
      };
    },
    computed: {
      filteredProducts() {
        if (this.searchQuery) {
          return this.products.filter((product) =>
            product.Nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        }
        return this.products;
      },
      totalPages() {
        return Math.ceil(this.totalProducts / this.itemsPerPage);
      },
    },
    methods: {
      async fetchProducts(page = 1) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/v1/productos?page=${page}&limit=${this.itemsPerPage}`
          );
          this.products = response.data.productos;
  
          this.totalProducts = response.data.totalProductos;
          this.currentPage = page;
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      },
      editProducto(id) {
        // Lógica para editar producto
        this.$router.push({ name: "ProductoEdit", params: { id } });
      },
      async deleteProducto(id) {
        try {
          const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, bórralo!",
          });
          if (result.isConfirmed) {
            await axios.delete(`http://localhost:3000/api/v1/productos/${id}`);
  
            Swal.fire("¡Borrado!", "El producto ha sido borrado.", "success");
            this.fetchProducts(this.currentPage);
          }
        } catch (error) {
          console.error("Error al borrar el producto:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al borrar el producto. Intente nuevamente.",
          });
        }
      },
      getProveedorImage(imagePath) {
        return imagePath
          ? `http://localhost:3000/api/v1/uploads/productos/${imagePath}`
          : "../../public/img/product/noimage.png";
      },
      formatFechaVencimiento(fecha) {
        return format(new Date(fecha), "dd/MM/yyyy");
      },
    },
    mounted() {
      this.fetchProducts();
    },
  };
  </script>
  
  <style scoped>
  /* Your CSS here */
  </style>