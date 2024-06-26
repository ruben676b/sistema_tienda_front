<template>
    <div>
      <div class="page-header">
        <div class="page-title">
          <h4>Gestionar Stock</h4>
          <h6>Añadir, Restar y Visualizar Stock</h6>
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
                      placeholder="Buscar..."
                      v-model="searchQuery"
                      @input="filterProductos"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div class="wordset">
              <ul>
                <li>
                  <a data-bs-toggle="tooltip" data-bs-placement="top" title="pdf">
                    <img src="../../public/img/icons/pdf.svg" alt="img" />
                  </a>
                </li>
                <li>
                  <a
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="excel"
                  >
                    <img src="../../public/img/icons/excel.svg" alt="img" />
                  </a>
                </li>
                <li>
                  <a
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="print"
                  >
                    <img src="../../public/img/icons/printer.svg" alt="img" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
  
          <div class="table-responsive">
            <table class="table datanew dataTable no-footer">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre del Producto</th>
                  <th>Stock Actual</th>
                  <th>Stock Mínimo</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="producto in filteredProductos" :key="producto.id">
                  <td>{{ producto.id }}</td>
                  <td>{{ producto.nombre }}</td>
                  <td>{{ producto.stockActual }}</td>
                  <td>{{ producto.stockMinimo }}</td>
                  <td>
                    <a class="me-3" @click="editProducto(producto.id)">
                      <img src="../../public/img/icons/edit.svg" alt="img" />
                    </a>
                    <a class="me-3 confirm-text" @click="deleteProducto(producto.id)">
                      <img src="../../public/img/icons/delete.svg" alt="img" />
                    </a>
                    <a class="me-3" @click="addStock(producto.id)">
                      <img src="../../public/img/icons/plus.svg" alt="img" />
                    </a>
                    <a class="me-3" @click="subtractStock(producto.id)">
                      <img src="../../public/img/icons/minus.svg" alt="img" />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Swal from "sweetalert2";
  
  export default {
    data() {
      return {
        productos: [], // Inicializar productos como un array vacío
        searchQuery: "",
      };
    },
    computed: {
      filteredProductos() {
        if (!this.productos) return [];
        return this.productos.filter((producto) =>
          producto.nombre && producto.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods: {
      async fetchProductos() {
        try {
          const response = await axios.get("http://localhost:3000/api/v1/productos");
          this.productos = response.data.productos;
        } catch (error) {
          console.error("Error al obtener los productos:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener los productos. Intente nuevamente.",
          });
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
            this.productos = this.productos.filter((producto) => producto.id !== id);
            Swal.fire("¡Borrado!", "El producto ha sido borrado.", "success");
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
      addStock(id) {
        Swal.fire({
          title: 'Añadir Stock',
          input: 'number',
          inputLabel: 'Cantidad a añadir',
          inputAttributes: {
            min: 1,
          },
          showCancelButton: true,
          confirmButtonText: 'Añadir',
        }).then(async (result) => {
          if (result.isConfirmed) {
            const cantidad = parseInt(result.value);
            try {
              await axios.post(`http://localhost:3000/api/v1/productos/${id}/addStock`, { cantidad });
              this.fetchProductos(); // Refrescar la lista de productos
              Swal.fire('Añadido!', `Se ha añadido ${cantidad} unidades al stock.`, 'success');
            } catch (error) {
              console.error("Error al añadir stock:", error);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error al añadir stock. Intente nuevamente.",
              });
            }
          }
        });
      },
      subtractStock(id) {
        Swal.fire({
          title: 'Restar Stock',
          input: 'number',
          inputLabel: 'Cantidad a restar',
          inputAttributes: {
            min: 1,
          },
          showCancelButton: true,
          confirmButtonText: 'Restar',
        }).then(async (result) => {
          if (result.isConfirmed) {
            const cantidad = parseInt(result.value);
            try {
              await axios.post(`http://localhost:3000/api/v1/productos/${id}/subtractStock`, { cantidad });
              this.fetchProductos(); // Refrescar la lista de productos
              Swal.fire('Restado!', `Se ha restado ${cantidad} unidades del stock.`, 'success');
            } catch (error) {
              console.error("Error al restar stock:", error);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error al restar stock. Intente nuevamente.",
              });
            }
          }
        });
      },
      filterProductos() {
        // Lógica de filtrado de productos
        // Este método es llamado automáticamente por el v-model en el input de búsqueda
      },
    },
    mounted() {
      this.fetchProductos();
    },
  };
  </script>
  
  <style scoped>
  .btn-submit {
    background-color: green;
    color: white;
  }
  
  .btn-cancel {
    background-color: red;
    color: white;
  }
  </style>
  