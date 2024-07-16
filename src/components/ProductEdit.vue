<template>
  <div>
    <div class="row">
      <div class="page-header">
        <div class="page-title">
          <h4 id="title_header">Editar Producto</h4>
        </div>
      </div>
      <div class="col-sm-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <form id="form" class="row" @submit.prevent="submitForm">
                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="form-group">
                    <label>Nombre del producto</label>
                    <input type="text" id="nombre" v-model="nombre" />
                  </div>
                </div>

                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="form-group">
                    <label>Precio de Compra</label>
                    <input
                      type="number"
                      id="PrecioCompra"
                      v-model="precioCompra"
                    />
                  </div>
                </div>
                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="form-group">
                    <label>Precio de Venta</label>
                    <input
                      type="number"
                      id="PrecioVenta"
                      v-model="precioVenta"
                    />
                  </div>
                </div>

                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="form-group">
                    <label>Precio Total</label>
                    <input
                      type="number"
                      id="PrecioTotal"
                      v-model="precioTotal"
                    />
                  </div>
                </div>

                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="form-group">
                    <label>Fecha de Vencimiento</label>
                    <input
                      type="date"
                      id="fechaVencimiento"
                      v-model="fechaVencimiento"
                    />
                  </div>
                </div>
                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="form-group">
                    <label>Stock</label>
                    <input type="number" id="stock" v-model="stock" />
                  </div>
                </div>
                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="form-group">
                    <label>Stock Minimo</label>
                    <input
                      type="number"
                      id="stockMinimo"
                      v-model="stockMinimo"
                    />
                  </div>
                </div>
                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="form-group">
                    <label>Unidad de medida</label>
                    <input
                      type="text"
                      id="unidadMedida"
                      v-model="unidadMedida"
                    />
                  </div>
                </div>
                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="form-group">
                    <label>Codigo de barra</label>
                    <input type="text" id="codigoBarra" v-model="codigoBarra" />
                  </div>
                </div>

                <div class="col-lg-3 col-sm-6 col-12">
                  <label style="display: block">Elige la Marca</label>
                  <select v-model="marcaId" class="select" id="marca">
                    <option
                      v-for="marca in marcas"
                      :key="marca.id"
                      :value="marca.id"
                    >
                      {{ marca.nombre }}
                    </option>
                  </select>
                </div>

                <div class="col-lg-3 col-sm-6 col-12">
                  <label>Elige la Categoria</label>
                  <select v-model="categoriaId" class="select" id="categoria">
                    <option
                      v-for="categoria in categorias"
                      :key="categoria.id"
                      :value="categoria.id"
                    >
                      {{ categoria.nombre }}
                    </option>
                  </select>
                </div>
                <div class="col-lg-3 col-sm-6 col-12">
                  <label style="display: block">Elige el Proveedor</label>
                  <select v-model="proveedorId" class="select" id="proveedor">
                    <option
                      v-for="proveedor in proveedores"
                      :key="proveedor.IdProveedor"
                      :value="proveedor.IdProveedor"
                    >
                      {{ proveedor.NombreEmpresa }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Descripcion</label>
                  <textarea
                    class="form-control"
                    id="Descripcion"
                    v-model="descripcion"
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label for="formFile" class="form-label"
                    >Subir imagen del Producto</label
                  >
                  <input
                    class="form-control"
                    type="file"
                    id="formFile"
                    @change="handleFileUpload"
                  />
                </div>

                <div class="col-lg-12">
                  <button type="submit" class="btn btn-submit me-2">
                    Actualizar Producto
                  </button>
                </div>
              </form>
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
      id: null,
      nombre: "",
      precioCompra: 0,
      precioVenta: 0,
      precioTotal: 0,
      fechaVencimiento: "",
      stock: 0,
      stockMinimo: 0,
      unidadMedida: "",
      codigoBarra: "",
      descripcion: "",
      file: null,
      marcaId: null,
      categoriaId: null,
      proveedorId: null,
      marcas: [],
      categorias: [],
      proveedores: [],
    };
  },
  mounted() {
    this.extractIdFromUrl();
    this.fetchProducto();
    this.fetchMarcas();
    this.fetchCategorias();
    this.fetchProveedores();
  },
  methods: {
    extractIdFromUrl() {
      const path = window.location.pathname;
      const segments = path.split("/");
      this.id = segments[segments.length - 1];
    },
    async fetchProducto() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/productos/${this.id}`
        );
        console.log(response.data);
        const producto = response.data.producto;
        this.nombre = producto.Nombre;
        this.precioVenta = parseFloat(producto.PrecioVenta);
        this.precioCompra = parseFloat(producto.PrecioCompra);
        this.precioTotal = parseFloat(producto.PrecioTotal);
        this.fechaVencimiento = producto.FechaVencimiento.split("T")[0];
        this.stock = producto.Stock;
        this.stockMinimo = producto.StockMinimo;
        this.unidadMedida = producto.UnidadMedida;
        this.codigoBarra = producto.CodigoBarra;
        this.descripcion = producto.Descripcion;
        this.marcaId = producto.marca_id;
        this.categoriaId = producto.categoria_id;
        this.proveedorId = producto.IdProveedor;
      } catch (error) {
        console.error("Error fetching producto:", error);
      }
    },
    async fetchMarcas() {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/marcas");
        this.marcas = response.data.Marcas;
      } catch (error) {
        console.error("Error fetching marcas:", error);
      }
    },
    async fetchCategorias() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/categorias"
        );
        this.categorias = response.data.categorias;
      } catch (error) {
        console.error("Error fetching categorias:", error);
      }
    },
    async fetchProveedores() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/proveedores"
        );
        this.proveedores = response.data.proveedores;
      } catch (error) {
        console.error("Error fetching proveedores:", error);
      }
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    async submitForm() {
      if (!this.marcaId || !this.categoriaId || !this.proveedorId) {
        alert("Por favor, selecciona una marca, una categoría y un proveedor.");
        return;
      }

      const formData = new FormData();
      formData.append("Nombre", this.nombre);
      formData.append("Descripcion", this.descripcion);
      formData.append("PrecioVenta", this.precioVenta);
      formData.append("PrecioCompra", this.precioCompra);
      formData.append("PrecioTotal", this.precioTotal);
      formData.append("FechaVencimiento", this.fechaVencimiento);
      formData.append("Stock", this.stock);
      formData.append("StockMinimo", this.stockMinimo);
      formData.append("UnidadMedida", this.unidadMedida);
      formData.append("CodigoBarra", this.codigoBarra);
      formData.append("CategoriaId", this.categoriaId);
      formData.append("MarcaId", this.marcaId);
      formData.append("ProveedorId", this.proveedorId);
      if (this.file) {
        formData.append("imagen-producto", this.file);
      }

      try {
        await axios.patch(
          `http://localhost:3000/api/v1/productos/${this.id}`,
          formData
        );

        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Producto actualizado exitosamente",
        });
        this.$router.push("/dashboard/products");
      } catch (error) {
        console.error("Error enviando datos:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al guardar el proveedor. Intente nuevamente.",
        });
      }
    },
  },
};
</script>

<style scoped>
/* Agrega tus estilos aquí */
</style>
