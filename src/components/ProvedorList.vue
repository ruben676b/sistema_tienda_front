<template>
  <div>
    <div>
      <div class="row">
        <div class="page-header">
          <div class="page-title">
            <h4 id="title_header">Añadir Producto</h4>
          </div>
        </div>
        <div class="col-sm-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <form id="form" class="row">
                  <div class="col-lg-3 col-sm-6 col-12">
                    <div class="form-group">
                      <label>Nombre del producto</label>
                      <input type="text" id="nombre" v-model="nombre" />
                    </div>
                  </div>

                  <div class="col-lg-3 col-sm-6 col-12">
                    <div class="form-group">
                      <label>Precio Unitario</label>
                      <input
                        type="number"
                        id="PrecioUnitario"
                        v-model="precioUnitario"
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
                      <input
                        type="text"
                        id="codigoBarra"
                        v-model="codigoBarra"
                      />
                    </div>
                  </div>

                  <div class="col-lg-3 col-sm-6 col-12">
                    <label style="margin-bottom: 7px">Elige la Marca</label>
                    <select class="select" id="marca"></select>
                  </div>

                  <div class="col-lg-3 col-sm-6 col-12">
                    <label style="margin-bottom: 7px">Elige la Categoria</label>
                    <select class="select" id="categoria"></select>
                  </div>
                  <div class="col-lg-3 col-sm-6 col-12">
                    <label style="margin-bottom: 7px">Elige el Proveedor</label>
                    <select class="select" id="proveedor"></select>
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
                      Añadir Producto
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombre: "",
      precioUnitario: "",
      precioTotal: "",
      fechaVencimiento: "",
      stock: "",
      stockMinimo: "",
      unidadMedida: "",
      codigoBarra: "",
      marcaId: null,
      categoriaId: null,
      proveedorId: null,
      descripcion: "",
      file: null,
    };
  },
  mounted() {
    this.llenarMarca();
    this.llenarCategoria();
    this.llenarProveedor();

    $("#marca").on("change", (event) => {
      this.marcaId = $(event.target).find("option:selected").data("id");
    });

    $("#categoria").on("change", (event) => {
      this.categoriaId = $(event.target).find("option:selected").data("id");
    });

    $("#proveedor").on("change", (event) => {
      this.proveedorId = $(event.target).find("option:selected").data("id");
    });

    $("#form").on("submit", async (event) => {
      event.preventDefault();

      let formData = new FormData();
      formData.append("Nombre", this.nombre);
      formData.append("Descripcion", this.descripcion);
      formData.append("PrecioUnitario", this.precioUnitario);
      formData.append("PrecioTotal", this.precioTotal);
      formData.append("FechaVencimiento", this.fechaVencimiento);
      formData.append("Stock", this.stock);
      formData.append("StockMinimo", this.stockMinimo);
      formData.append("UnidadMedida", this.unidadMedida);
      formData.append("CodigoBarra", this.codigoBarra);
      formData.append("CategoriaId", this.categoriaId);
      formData.append("MarcaId", this.marcaId);
      formData.append("ProveedorId", this.proveedorId);
      formData.append("imagen-producto", this.file);

      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/productos/",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          Swal.fire(
            "Añadido!",
            "El producto ha sido añadido Correctamente.",
            "success"
          );
          // window.location.href = "/dashboard/products";
        } else {
          throw new Error("Error al añadir producto");
        }
      } catch (error) {
        Swal.fire(
          "Producto no Añadido!",
          "Asegurese de rellenar todos los campos! .",
          "warning"
        );
      }
    });
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    async llenarMarca() {
      try {
        const res = await fetch("http://localhost:3000/api/v1/marcas");
        const data = await res.json();
        const marcas = data["Marcas"];

        let marcaBody = `<option value="" disabled selected>Selecciona una marca</option>`;
        marcas.forEach((marca) => {
          marcaBody += `<option data-id="${marca.id}">${marca.nombre}</option>`;
        });
        $("#marca").html(marcaBody);
      } catch (error) {
        console.error("Error llenando marcas:", error);
      }
    },
    async llenarCategoria() {
      try {
        const res = await fetch("http://localhost:3000/api/v1/categorias");
        const data = await res.json();
        const categorias = data["categorias"];

        let categoriaBody = `<option value="" disabled selected>Selecciona una categoría</option>`;
        categorias.forEach((categoria) => {
          categoriaBody += `<option data-id="${categoria.id}">${categoria.nombre}</option>`;
        });
        $("#categoria").html(categoriaBody);
      } catch (error) {
        console.error("Error llenando categorías:", error);
      }
    },
    async llenarProveedor() {
      try {
        const res = await fetch("http://localhost:3000/api/v1/proveedores");
        const data = await res.json();
        const proveedores = data["proveedores"];

        let proveedoresBody = `<option value="" disabled selected>Selecciona un proveedor</option>`;
        proveedores.forEach((proveedor) => {
          proveedoresBody += `<option data-id="${proveedor.IdProveedor}">${proveedor.NombreEmpresa}</option>`;
        });
        $("#proveedor").html(proveedoresBody);
      } catch (error) {
        console.error("Error llenando proveedores:", error);
      }
    },
  },
};
</script>

<style>
/* Estilos opcionales */
</style>