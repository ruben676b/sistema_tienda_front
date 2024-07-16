import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Estadisticas from "@/components/Estadisticas.vue";
import Dashboard from "@/views/Dashboard.vue";
import store from "@/store";

import ProductList from "@/components/ProductList.vue";
import ProvedorList from "@/components/ProvedorList.vue";
import ProvedorAdd from "@/components/ProvedorAdd.vue";
import ProvedorEdit from "@/components/ProveedorEdit.vue"; // Asegúrate de que la extensión es .vue

import AddProduct from "@/components/Productadd.vue";

import ProductCompare from "@/components/ProductCompare.vue";
import ProductEdit from "@/components/ProductEdit.vue";
import DetailProduct from "@/components/DetailProduct.vue";

// VENTAS RUTAS
import VentaList from "@/components/VentaList.vue";
import VentaAdd from "@/components/VentaAdd.vue";

import ClienteAddJuridico from "@/components/ClienteAddJuridico.vue";
import ClienteAddNatural from "@/components/ClienteAddNatural.vue";

import AñadirMarca from "@/components/MarcaList.vue";
import Graficos from "@/components/Grafics.vue";
import NotFound from "@/components/Notfound.vue";

import AddFormasPago from "@/components/AddFormasPago.vue";
import AddCategoria from "@/components/AddCategoria.vue";
import ModifyCategoria from "@/components/ModifyCategoria.vue";
import ListCategoria from "@/components/ListCategoria.vue";
import ListUsers from "@/components/ListUsers.vue";
import ListEmpleados from "@/components/ListEmpleados.vue";
import AddEmpleados from "@/components/AddEmpleados.vue";
import ListClients from "@/components/ListClients.vue";
import ListClientesNatural from "@/components/ListClintsNatural.vue";
import ListClientesJuridicos from "@/components/ListClintesJuridicos.vue";
import AddUsers from "@/components/AddUsers.vue";
const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: "estadisticas",
        name: "Estadisticas",
        component: Estadisticas,
        meta: { requiresAuth: true, requiredRole: "admin" },
      },
      {
        path: "products",
        name: "ProductList",
        component: ProductList,
        meta: { requiresAuth: true, requiredRole: "admin" },
      },
      {
        path: "provedorList",
        name: "ProvedorList",
        component: ProvedorList,
        meta: { requiresAuth: true, requiredRole: "admin" },
      },
      {
        path: "provedorAdd",
        name: "ProvedorAdd",
        component: ProvedorAdd,
        meta: { requiresAuth: true, requiredRole: "admin" },
      },
      {
        path: "provedorEdit/:id",
        name: "ProvedorEdit",
        component: ProvedorEdit,
        meta: { requiresAuth: true, requiredRole: "admin" },
      },
      {
        path: "addProduct",
        name: "AddProduct",
        component: AddProduct,
        meta: { requiresAuth: true, requiredRole: "admin" },
      },
      {
        path: "productCompare",
        name: "productCompare",
        component: ProductCompare,
        meta: { requiresAuth: true, requiredRole: "admin" },
      },
      {
        path: "ProductEdit/:id",
        name: "ProductEdit",
        component: ProductEdit,
        meta: { requiresAuth: true, requiredRole: "admin" },
      },
      {
        path: "DetailProduct/:id",
        name: "DetailProduct",
        component: DetailProduct,
        meta: { requiresAuth: true, requiredRole: "admin" },
      },
      {
        path: "ventaAdd",
        name: "VentaAdd",
        component: VentaAdd,
        meta: { requiresAuth: true, requiredRole: "cajero" },
      },
      {
        path: "ventaList",
        name: "VentaList",
        component: VentaList,
        meta: { requiresAuth: true, requiredRole: "admin" },
      },
      {
        path: "clienteAddJuridico",
        name: "ClienteAddJuridico",
        component: ClienteAddJuridico,
        meta: { requiresAuth: true, requiredRole: "admin" },
      },
      {
        path: "clienteAddNatural",
        name: "ClienteAddNatural",
        component: ClienteAddNatural,
        meta: { requiresAuth: true, requiredRole: "admin" },
      },
      {
        path: "añadirMarca",
        name: "añadirMarca",
        component: AñadirMarca,
        meta: { requiresAuth: true, requiredRole: "admin" },
      },
      {
        path: "graficos",
        name: "graficos",
        component: Graficos,
        meta: { requiresAuth: true, requiredRole: "admin" },
      },
      {
        path: "addFormasPago",
        name: "addFormasPago",
        component: AddFormasPago,
        meta: { requiresAuth: true, requiredRole: "admin" },
      },
      {
        path: "categoria",
        name: "AddCategoria",
        component: AddCategoria,
      },
      {
        path: "modifyCate",
        name: "ModifyCategoria",
        component: ModifyCategoria,
      },
      {
        path: "listCate",
        name: "ListCategoria",
        component: ListCategoria,
      },
      {
        path: "ListUsers",
        name: "ListUsers",
        component: ListUsers,
      },
      {
        path: "ListEmpleados",
        name: "ListEmpleados",
        component: ListEmpleados,
      },
      {
        path: "AddEmpleados",
        name: "AddEmpleados",
        component: AddEmpleados,
      },
      {
        path: "ListClients",
        name: "ListClients",
        component: ListClients,
      },
      {
        path: "ListClientesJuridicos",
        name: "ListClientesJuridicos",
        component: ListClientesJuridicos,
      },
      {
        path: "ListClintsNatural",
        name: "ListClintsNatural",
        component: ListClientesNatural,
      },
      {
        path: "AddUsers",
        name: "AddUsers",
        component: AddUsers,
      },
      // {
      //   path: "ProductoEdit/:id",
      //   name: "ProductoEdit",
      //   component: EditProduct,
      // },

      // {
      //   path: 'categories',
      //   name: 'CategoryList',
      //   component: CategoryList
      // },
      // {
      //   path: 'add-category',
      //   name: 'AddCategory',
      //   component: AddCategory
      // },
    ],
  },
  {
    path: "/notfound",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  const userRole = store.state.user
    ? store.state.user.TipoUsuario.toLowerCase()
    : null;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: "Login" });
    } else if (to.meta.requiredRole && to.meta.requiredRole !== userRole) {
      next({ path: "/Notfound" }); // o redirige a una página de acceso denegado
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
