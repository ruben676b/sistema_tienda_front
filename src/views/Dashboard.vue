<template>
  <div>
    <!-- Loader -->
    <div>
      <div class="whirly-loader"></div>
    </div>

    <!-- Main Wrapper -->
    <div class="main-wrapper">
      <!-- Header -->
      <!-- ... (mantener el código del header sin cambios) ... -->
      <div class="header">
        <div class="header-left active">
          <router-link to="/dashboard/estadisticas" class="logo">
            <img src="../../public/img/fresko-log.png" alt="logo" />
          </router-link>
          <router-link to="/dashboard/estadisticas" class="logo-small">
            <img src="../../public/img/logo-small.png" alt="logo" />
          </router-link>
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
          <li class="nav-item dropdown has-arrow main-drop">
            <a
              href="javascript:void(0);"
              class="dropdown-toggle nav-link userset"
              data-bs-toggle="dropdown"
            >
              <span class="user-img">
                <img src="../../public/img/perfil.jpg" alt="perfil" />
                <span class="status online"></span>
              </span>
            </a>
            <div class="dropdown-menu menu-drop-user">
              <div class="profilename">
                <div class="profileset">
                  <span class="user-img">
                    <img src="../../public/img/perfil.jpg" alt="perfil" />
                    <span class="status online"></span>
                  </span>
                  <div class="profilesets">
                    <h6>John Doe</h6>
                    <h5>Admin</h5>
                  </div>
                </div>
                <hr class="m-0" />
                <a class="dropdown-item" href="profile.html">
                  <i class="me-2" data-feather="user"></i> My Profile
                </a>
                <a class="dropdown-item" href="generalsettings.html">
                  <i class="me-2" data-feather="settings"></i> Settings
                </a>
                <hr class="m-0" />
                <a class="dropdown-item logout pb-0" href="signin.html">
                  <img
                    src="../../public/img/icons/log-out.svg"
                    class="me-2"
                    alt="logout"
                  />
                  Logout
                </a>
              </div>
            </div>
          </li>
        </ul>
        <div class="dropdown mobile-user-menu">
          <a
            href="javascript:void(0);"
            class="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fa fa-ellipsis-v"></i>
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <a class="dropdown-item" href="profile.html">My Profile</a>
            <a class="dropdown-item" href="generalsettings.html">Settings</a>
            <a class="dropdown-item">Logout</a>
          </div>
        </div>
      </div>
      <!-- Sidebar -->
      <div v-if="isAdmin" class="sidebar" id="sidebar">
        <div class="sidebar-inner slimscroll">
          <div id="sidebar-menu" class="sidebar-menu">
            <ul>
              <!-- Estadísticas (solo para admin) -->
              <li v-if="isAdmin" class="active">
                <router-link to="/dashboard/estadisticas">
                  <img
                    src="../../public/img/icons/dashboard.svg"
                    alt="dashboard"
                  />
                  <span>Estadísticas</span>
                </router-link>
              </li>

              <!-- PRODUCTOS (solo para admin) -->
              <li v-if="isAdmin" class="submenu">
                <a
                  :class="submenus.product ? 'subdrop' : ''"
                  @click="toggleSubmenu('product')"
                >
                  <img src="../../public/img/icons/product.svg" alt="product" />
                  <span>Productos</span>
                  <span class="menu-arrow"></span>
                </a>
                <ul :style="{ display: submenus.product ? 'block' : 'none' }">
                  <li>
                    <router-link to="/dashboard/products"
                      >Lista de Productos</router-link
                    >
                  </li>
                  <li>
                    <router-link to="/dashboard/addProduct"
                      >Añadir Producto</router-link
                    >
                  </li>
                  <li>
                    <router-link to="/dashboard/productCompare"
                      >Comparar Precios</router-link
                    >
                  </li>
                  <li>
                    <router-link to="/dashboard/categories"
                      >Category List</router-link
                    >
                  </li>
                  <li>
                    <router-link to="/dashboard/añadirMarca"
                      >Lista marcas</router-link
                    >
                  </li>
                </ul>
              </li>

              <!-- CLIENTE (solo para admin) -->
              <li v-if="isAdmin" class="submenu">
                <!-- ... (mantener el código del submenu de cliente) ... -->
                <a
                  :class="submenus.client ? 'subdrop' : ''"
                  @click="toggleSubmenu('client')"
                >
                  <img src="../../public/img/icons/users1.svg" alt="client" />
                  <span>Cliente</span>
                  <span class="menu-arrow"></span>
                </a>
                <ul :style="{ display: submenus.client ? 'block' : 'none' }">
                  <li>
                    <router-link to="/dashboard/customerlist"
                      >Customer List</router-link
                    >
                  </li>
                  <li>
                    <router-link to="/dashboard/addcustomer"
                      >Add Customer</router-link
                    >
                  </li>
                  <li>
                    <router-link to="/dashboard/supplierlist"
                      >Supplier List</router-link
                    >
                  </li>
                  <li>
                    <router-link to="/dashboard/addsupplier"
                      >Add Supplier</router-link
                    >
                  </li>
                  <li>
                    <router-link to="/dashboard/userlist"
                      >User List</router-link
                    >
                  </li>
                  <li>
                    <router-link to="/dashboard/adduser">Add User</router-link>
                  </li>
                  <li>
                    <router-link to="/dashboard/storelist"
                      >Store List</router-link
                    >
                  </li>
                  <li>
                    <router-link to="/dashboard/addstore"
                      >Add Store</router-link
                    >
                  </li>
                </ul>
              </li>

              <!-- PROVEEDOR (solo para admin) -->
              <li v-if="isAdmin" class="submenu">
                <!-- ... (mantener el código del submenu de proveedor) ... -->
                <a
                  :class="submenus.provedor ? 'subdrop' : ''"
                  @click="toggleSubmenu('provedor')"
                >
                  <img src="../../public/img/icons/users1.svg" alt="client" />
                  <span>Provedor</span>
                  <span class="menu-arrow"></span>
                </a>
                <ul :style="{ display: submenus.provedor ? 'block' : 'none' }">
                  <li>
                    <router-link to="/dashboard/provedorList"
                      >Lista de proveedores</router-link
                    >
                  </li>
                  <li>
                    <router-link to="/dashboard/provedorAdd"
                      >Añadir Proveedor</router-link
                    >
                  </li>
                </ul>
              </li>

              <!-- Venta Submenu (para admin y cajero) -->
              <li class="submenu" v-if="isCajero">
                <div style="display: none"></div>
                <a
                  :class="submenus.venta ? 'subdrop' : ''"
                  @click="toggleSubmenu('venta')"
                >
                  <img src="../../public/img/icons/sales1.svg" alt="img" />
                  <span>Ventas</span>
                  <span class="menu-arrow"></span>
                </a>
                <ul :style="{ display: submenus.venta ? 'block' : 'none' }">
                  <li v-if="isAdmin">
                    <router-link to="/dashboard/ventaList"
                      >Listado de ventas</router-link
                    >
                  </li>
                  <li>
                    <router-link to="/dashboard/ventaAdd"
                      >Añadir Ventas</router-link
                    >
                  </li>
                </ul>
              </li>

              <!-- GRÁFICOS (solo para admin) -->
              <li v-if="isAdmin" class="submenu">
                <a
                  :class="submenus.graficos ? 'subdrop' : ''"
                  @click="toggleSubmenu('graficos')"
                >
                  <img src="../../public/img/icons/time.svg" alt="img" />
                  <span>Gráficos</span>
                  <span class="menu-arrow"></span>
                </a>
                <ul :style="{ display: submenus.graficos ? 'block' : 'none' }">
                  <li>
                    <router-link to="/dashboard/graficos"
                      >Ver gráficos</router-link
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Page Wrapper -->
      <div class="page-wrapper">
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      submenus: {
        product: false,
        client: false,
        venta: false,
        provedor: false,
        graficos: false,
      },
    };
  },
  computed: {
    userRole() {
      return this.$store.state.user
        ? this.$store.state.user.TipoUsuario.toLowerCase()
        : null;
    },
    isAdmin() {
      return this.userRole === "admin";
    },
    isCajero() {
      return this.userRole === "cajero";
    },
  },
  methods: {
    toggleSubmenu(submenu) {
      this.submenus[submenu] = !this.submenus[submenu];
    },
  },
};
</script>

<style scoped>
/* ... (mantener los estilos sin cambios) ... */
</style>
<style scoped>
/* Estilo para el sidebar y submenú */
.sidebar-inner {
  overflow-y: auto;
}

#sidebar-menu ul {
  list-style: none;
  padding-left: 0;
}

.submenu ul {
  padding-left: 15px;
}

.submenu ul li {
  padding-left: 20px;
}

.submenu ul li a {
  color: #333;
  display: block;
  padding: 10px 15px;
}
</style>
