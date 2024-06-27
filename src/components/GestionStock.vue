<template>
  <div>
    <div class="page-header">
      <div class="page-title">
        <h4>Lista de Stock</h4>
        <h6>Gestión de Stock de Productos</h6>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="table-top">
          <div class="search-set">
            <div class="search-input">
              <input
                type="search"
                class="form-control"
                placeholder="Buscar..."
                v-model="searchQuery"
                @input="searchProducts"
              />
            </div>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table datanew">
            <thead>
              <tr>
                <th>Logo</th>
                <th>Nombre del Producto</th>
                <th>Stock</th>
                <th>Stock Mínimo</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in filteredProducts" :key="product.IdProducto">
                <td>
                  <img
                    :src="getProductImage(product.RutaImagen)"
                    :alt="product.Nombre"
                    class="product-img"
                  />
                </td>
                <td>{{ product.Nombre }}</td>
                <td>{{ product.Stock }}</td>
                <td>{{ product.StockMinimo }}</td>
                <td>
                  <button class="btn btn-action" @click="openEditModal(product)">
                    <img src="../../public/img/icons/edit.svg" alt="Editar" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="pagination-section">
          <div class="items-per-page">
            <label>
              Mostrar
              <select v-model="itemsPerPage" @change="updateItemsPerPage">
                <option v-for="option in [10, 25, 50, 100]" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
              registros
            </label>
          </div>
          <ul class="pagination">
            <li v-for="page in paginationRange" :key="page" :class="['page-item', { active: page === currentPage }]">
              <button class="page-link" @click="changePage(page)">{{ page }}</button>
            </li>
          </ul>
          <div class="pagination-info">
            Mostrando {{ startIndex }} - {{ endIndex }} de {{ totalProducts }} registros
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Edición -->
    <div v-if="showEditModal" class="modal" @click.self="closeEditModal">
      <div class="modal-content">
        <button class="close" @click="closeEditModal">&times;</button>
        <h2>Editar Producto</h2>
        <div v-if="selectedProduct" class="product-info">
          <img
            :src="getProductImage(selectedProduct.RutaImagen)"
            :alt="selectedProduct.Nombre"
            class="product-img-large"
          />
          <h3>{{ selectedProduct.Nombre }}</h3>
        </div>
        <form @submit.prevent="updateProducto">
          <div class="form-group">
            <label for="stock">Stock</label>
            <input
              type="number"
              v-model.number="selectedProduct.Stock"
              id="stock"
              class="form-control"
              required
              min="0"
            />
          </div>
          <div class="form-group">
            <label for="stockMinimo">Stock Mínimo</label>
            <input
              type="number"
              v-model.number="selectedProduct.StockMinimo"
              id="stockMinimo"
              class="form-control"
              required
              min="0"
            />
          </div>
          <button type="submit" class="btn btn-primary">Guardar Cambios</button>
        </form>
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
      products: [],
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 10,
      totalProducts: 0,
      showEditModal: false,
      selectedProduct: null,
    };
  },
  computed: {
    filteredProducts() {
      if (!this.searchQuery) return this.products;
      const query = this.searchQuery.toLowerCase();
      return this.products.filter(product =>
        product.Nombre.toLowerCase().includes(query)
      );
    },
    totalPages() {
      return Math.ceil(this.totalProducts / this.itemsPerPage);
    },
    paginationRange() {
      const range = 2;
      const start = Math.max(1, this.currentPage - range);
      const end = Math.min(this.totalPages, this.currentPage + range);
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage + 1;
    },
    endIndex() {
      return Math.min(this.currentPage * this.itemsPerPage, this.totalProducts);
    },
  },
  methods: {
    async fetchProducts(page = 1) {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/v1/productos`, {
          params: { page, limit: this.itemsPerPage }
        });
        this.products = data.productos;
        this.totalProducts = data.totalProductos;
        this.currentPage = page;
      } catch (error) {
        console.error("Error al obtener productos:", error);
        this.showErrorMessage("No se pudieron cargar los productos. Por favor, intente de nuevo más tarde.");
      }
    },
    openEditModal(product) {
      this.selectedProduct = { ...product };
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
      this.selectedProduct = null;
    },
    async updateProducto() {
      if (!this.selectedProduct?.IdProducto) {
        console.error("ID de producto inválido:", this.selectedProduct);
        this.showErrorMessage("Error: ID de producto inválido");
        return;
      }

      const productToUpdate = {
        IdProducto: this.selectedProduct.IdProducto,
        Stock: Number(this.selectedProduct.Stock),
        StockMinimo: Number(this.selectedProduct.StockMinimo)
      };

      try {
        console.log("Enviando datos:", productToUpdate);
        const response = await axios.patch(
          `http://localhost:3000/api/v1/productos/${productToUpdate.IdProducto}`,
          productToUpdate,
          { timeout: 10000 }
        );
        console.log("Respuesta del servidor:", response.data);
        this.showSuccessMessage("Producto actualizado correctamente");
        this.closeEditModal();
        this.fetchProducts(this.currentPage);
      } catch (error) {
        console.error("Error completo:", error);
        if (error.response) {
          console.error("Datos de respuesta:", error.response.data);
          console.error("Estado de respuesta:", error.response.status);
          console.error("Cabeceras de respuesta:", error.response.headers);
        }
        this.showErrorMessage(`Error al actualizar el producto: ${error.message}`);
      }
    },
    getProductImage(imagePath) {
      return imagePath
        ? `http://localhost:3000/api/v1/uploads/productos/${imagePath}`
        : "../../public/img/product/noimage.png";
    },
    searchProducts() {
      this.currentPage = 1;
      this.fetchProducts();
    },
    updateItemsPerPage() {
      this.currentPage = 1;
      this.fetchProducts();
    },
    changePage(page) {
      this.currentPage = page;
      this.fetchProducts(page);
    },
    showSuccessMessage(message) {
      Swal.fire("Éxito", message, "success");
    },
    showErrorMessage(message) {
      Swal.fire("Error", message, "error");
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
.product-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.product-img-large {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
}

.table th,
.table td {
  text-align: center;
  vertical-align: middle;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card {
  margin-top: 20px;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 80%;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
  background: none;
  border: none;
}

.product-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.pagination-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.btn-action {
  background: none;
  border: none;
  cursor: pointer;
}
</style>