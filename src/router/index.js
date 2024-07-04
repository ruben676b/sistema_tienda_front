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
      },
      {
        path: "products",
        name: "ProductList",
        component: ProductList,
      },
      {
        path: "provedorList",
        name: "ProvedorList",
        component: ProvedorList,
      },
      {
        path: "provedorAdd",
        name: "ProvedorAdd",
        component: ProvedorAdd,
      },
      {
        path: "provedorEdit/:id",
        name: "ProvedorEdit",
        component: ProvedorEdit,
      },
      {
        path: "addProduct",
        name: "AddProduct",
        component: AddProduct,
      },
      {
        path: "productCompare",
        name: "productCompare",
        component: ProductCompare,
      },
      {
        path: "ProductEdit/:id",
        name: "ProductEdit",
        component: ProductEdit,
      },
      {
        path: "DetailProduct/:id",
        name: "DetailProduct",
        component: DetailProduct,
      },
      {
        path: "ventaAdd",
        name: "VentaAdd",
        component: VentaAdd,
      },
      {
        path: "ventaList",
        name: "VentaList",
        component: VentaList,
      },
      {
        path: "clienteAddJuridico",
        name: "ClienteAddJuridico",
        component: ClienteAddJuridico,
      },
      {
        path: "clienteAddNatural",
        name: "ClienteAddNatural",
        component: ClienteAddNatural,
      },
      {
        path: "añadirMarca",
        name: "añadirMarca",
        component: AñadirMarca,
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
    path: "/:pathMatch(.*)*",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
