<template>
    <div>
      <div id="global-loader">
        <div class="whirly-loader"></div>
      </div>
  
      <div class="main-wrapper">
        <div class="header">
          <div class="header-left active">
            <a href="index.html" class="logo">
              <img src="assets/img/logo.png" alt="Logo" />
            </a>
            <a href="index.html" class="logo-small">
              <img src="assets/img/logo-small.png" alt="Logo pequeño" />
            </a>
            <a id="toggle_btn" href="javascript:void(0);"></a>
          </div>
  
          <a id="mobile_btn" class="mobile_btn" href="#sidebar">
            <span class="bar-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </a>
  
          <ul class="nav user-menu">
            <!-- Aquí van los elementos del menú de usuario -->
          </ul>
  
          <div class="dropdown mobile-user-menu">
            <a href="javascript:void(0);" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa fa-ellipsis-v"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right">
              <a class="dropdown-item" href="profile.html">Mi Perfil</a>
              <a class="dropdown-item" href="generalsettings.html">Configuraciones</a>
              <a class="dropdown-item" href="signin.html">Cerrar Sesión</a>
            </div>
          </div>
        </div>
  
        <div class="sidebar" id="sidebar">
          <div class="sidebar-inner slimscroll">
            <div id="sidebar-menu" class="sidebar-menu">
              <ul>
                <li class="active">
                  <a href="dashboard.html">
                    <img src="assets/img/icons/dashboard.svg" alt="Dashboard" />
                    <span>Dashboard</span>
                  </a>
                </li>
                <!-- Aquí van los demás elementos del menú lateral -->
              </ul>
            </div>
          </div>
        </div>
  
        <div class="page-wrapper pagehead">
          <div class="content">
            <div class="page-header">
              <div class="row">
                <div class="col-sm-12">
                  <h3 class="page-title">Lista de Proveedores</h3>
                </div>
              </div>
            </div>
  
            <div class="row">
              <div class="card">
                <div class="card-body">
                  <div class="col-lg-3 col-sm-6 col-12">
                    <div class="form-group">
                      <label>Añadir Categoria</label>
                      <input type="text" id="categoria" class="form-control" />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <button id="button-submit" type="submit" class="btn btn-submit me-2">
                      Añadir Categoria
                    </button>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-body">
                  <div class="col-sm-12">
                    <div class="table-responsive">
                      <table class="table datanew">
                        <thead>
                          <tr>
                            <th>Empresa</th>
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
        </div> <!-- Cierre de main-wrapper -->
      </div> <!-- Cierre de page-wrapper -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'AddCategoria',
    mounted() {
      document.getElementById("button-submit").addEventListener("click", async function(event){
        event.preventDefault();
        const categoria = document.getElementById("categoria").value;
        let formData = new FormData();
        formData.append("Nombre", categoria);
  
        const res = await fetch("http://localhost:3000/api/v1/categorias", {
          method: "POST",
          body: formData
        });
  
        const data = await res.json();
        if (data["success"] === true) {
          Swal.fire({
            title: "Buen trabajo!",
            text: `Creaste una nueva Categoria!`,
            icon: "success",
            confirmButtonClass: "btn btn-primary",
            buttonsStyling: false,
          });
  
          const res = await fetch("http://localhost:3000/api/v1/categorias", {
            method: "GET",
          });
          const data = await res.json();
  
          let tableBody = "";
          const categorias = data["categorias"];
          categorias.forEach((categoria) => {
            tableBody += `
              <tr>
                <td>${categoria["nombre"]}</td>
                <td>
                  <a class="confirm-text deleteCategoria" data-id=${categoria["id"]}>
                    <img src="assets/img/icons/delete.svg" alt="Eliminar" />
                  </a>
                </td>
              </tr>`;
          });
          document.getElementById("tbody").innerHTML = tableBody;
        }
      });
  
      this.loadCategories();
    },
    methods: {
      async loadCategories() {
        const res = await fetch("http://localhost:3000/api/v1/categorias", {
          method: "GET",
        });
        const data = await res.json();
  
        let tableBody = "";
        const categorias = data["categorias"];
        categorias.forEach((categoria) => {
          tableBody += `
            <tr>
              <td>${categoria["nombre"]}</td>
              <td>
                <a class="confirm-text deleteCategoria" data-id=${categoria["id"]}>
                  <img src="assets/img/icons/delete.svg" alt="Eliminar" />
                </a>
              </td>
            </tr>`;
        });
        document.getElementById("tbody").innerHTML = tableBody;
  
        $(document).on("click", ".deleteCategoria", async function () {
          const IdCategoria = $(this).data("id");
  
          const swalConfirmation = await Swal.fire({
            title: "Estas Seguro de remover esta Categoria?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "SI, Hagamoslo!",
            cancelButtonText: "Cancelar",
            confirmButtonClass: "btn btn-primary",
            cancelButtonClass: "btn btn-danger ml-1",
            buttonsStyling: false,
          });
  
          if (swalConfirmation.isConfirmed) {
            const res = await fetch(`http://localhost:3000/api/v1/categorias/${IdCategoria}`, {
              method: "DELETE",
            });
            const data = await res.json();
            if (data["success"] === true) {
              Swal.fire({
                title: "Buen trabajo!",
                text: `Eliminaste la categoria`,
                icon: "success",
                confirmButtonClass: "btn btn-primary",
                buttonsStyling: false,
              });
  
              this.loadCategories();
            }
          }
        }.bind(this));
  
        $(".datanew").DataTable();
      }
    }
  };
  </script>
  
  <style scoped>
  /* Tus estilos aquí */
  </style>
  