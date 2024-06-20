<template>
    <div>
      <div class="content">
        <div class="page-header">
          <div class="row">
            <div class="col-sm-12">
              <h3 class="page-title">Lista de productos</h3>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="card">
            <div class="card-body">
              <div class="col-sm-12">
                <div class="table-responsive">
                  <table class="table datanew">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Precio Unitario</th>
                        <th>Precio total</th>
                        <th>Fecha de vencimiento</th>
                        <th>Stock</th>
                        <th>Stock minimo</th>
                        <th>Unidad Medida</th>
                        <th>Codigo de barra</th>
                        <th>Accion</th>
                      </tr>
                    </thead>
                    <tbody id="tbody"></tbody>
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
  
  export default {
    mounted() {
      $(document).ready(async () => {
        const res = await fetch("http://localhost:3000/api/v1/productos/", {
          method: "GET",
        });
        const data = await res.json();
  
        let tableBody = "";
        const productos = data.productos;
  
        productos.forEach((producto) => {
          const date = new Date(producto.FechaVencimiento);
  
          const dia = date.getDate();
          const mes = date.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
          const año = date.getFullYear();
  
          const diaFormateado = dia < 10 ? `0${dia}` : dia;
          const mesFormateado = mes < 10 ? `0${mes}` : mes;
  
          tableBody += `
            <tr>
              <td class="productimgname">
                <a class="product-img">
                  <img src="http://localhost:3000/api/v1/uploads/productos/${producto.RutaImagen}" alt="product"/>
                </a>
                <a href="javascript:void(0);">${producto.Nombre}</a>
              </td>
              <td>${producto.Descripcion}</td>
              <td>${producto.PrecioUnitario}</td>
              <td>${producto.PrecioTotal}</td>
              <td>${diaFormateado}/${mesFormateado}/${año}</td>
              <td>${producto.Stock}</td>
              <td>${producto.StockMinimo}</td>
              <td>${producto.UnidadMedida}</td>
              <td>${producto.CodigoBarra}</td>
              <td>
                <a class="me-3 editproducto" data-id="${producto.IdProducto}">
                  <img src="../../public/img/icons/edit-5.svg" alt="img"/>
                </a>
                <a class="confirm-text deleteproducto" data-id="${producto.IdProducto}">
                  <img src="../../public/img/icons/delete.svg" alt="img"/>
                </a>
              </td>
            </tr>`;
        });
        document.getElementById("tbody").innerHTML = tableBody;
  
        $(".datanew").DataTable();
  
        $(document).on("click", ".editproducto", function () {
          const Idproducto = $(this).data("id");
          const baseUrl = "editproducto.html";
          const fullUrl = baseUrl + "?id=" + Idproducto;
          window.location.href = fullUrl;
        });
  
        $(document).on("click", ".deleteproducto", async function () {
          const Idproducto = $(this).data("id");
  
          const swalConfirmation = await Swal.fire({
            title: "¿Estás seguro de eliminar este producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
          });
  
          if (swalConfirmation.isConfirmed) {
            const res = await fetch(`http://localhost:3000/api/v1/productos/${Idproducto}`, {
              method: "DELETE",
            });
            const data = await res.json();
  
            if (data.success) {
              Swal.fire("¡Eliminado!", "El producto ha sido eliminado.", "success");
  
              const res = await fetch("http://localhost:3000/api/v1/productos", {
                method: "GET",
              });
              const data = await res.json();
  
              let tableBody = "";
              const productos = data.productos;
  
              productos.forEach((producto) => {
                const date = new Date(producto.FechaVencimiento);
  
                const dia = date.getDate();
                const mes = date.getMonth() + 1;
                const año = date.getFullYear();
  
                const diaFormateado = dia < 10 ? `0${dia}` : dia;
                const mesFormateado = mes < 10 ? `0${mes}` : mes;
  
                tableBody += `
                  <tr>
                    <td class="productimgname">
                      <a class="product-img">
                        <img src="http://localhost:3000/api/v1/uploads/productos/${producto.RutaImagen}" alt="product"/>
                      </a>
                      <a href="javascript:void(0);">${producto.Nombre}</a>
                    </td>
                    <td>${producto.Descripcion}</td>
                    <td>${producto.PrecioUnitario}</td>
                    <td>${producto.PrecioTotal}</td>
                    <td>${diaFormateado}/${mesFormateado}/${año}</td>
                    <td>${producto.Stock}</td>
                    <td>${producto.StockMinimo}</td>
                    <td>${producto.UnidadMedida}</td>
                    <td>${producto.CodigoBarra}</td>
                    <td>
                      <a class="me-3 editproducto" data-id="${producto.IdProducto}">
                        <img src="../../public/img/icons/edit.svg" alt="img"/>
                      </a>
                      <a class="confirm-text deleteproducto" data-id="${producto.IdProducto}">
                        <img src="../../public/img/icons/delete.svg" alt="img"/>
                      </a>
                    </td>
                  </tr>`;
              });
              document.getElementById("tbody").innerHTML = tableBody;
            }
          }
        });
      });
    },
  };
  </script>
  
  <style scoped>
  /* Tus estilos aquí */
  </style>
  