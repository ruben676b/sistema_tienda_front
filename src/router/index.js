// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Estadisticas from "@/components/Estadisticas.vue";
import Dashboard from "@/views/Dashboard.vue";
import store from "@/store";

import ProductList from "@/components/ProductList.vue";
import ProvedorList from "@/components/ProvedorList.vue";
import ProvedorAdd from "@/components/ProvedorAdd.vue";
import ProvedorEdit from "@/components/ProveedorEdit.vue"; // Corregido el nombre del archivo
import AddCategoria from "@/components/AddCategoria.vue";
import ModifyCategoria from "@/components/ModifyCategoria.vue";
import ListCategoria from "@/components/ListCategoria.vue";
import AddCustomer from "@/components/AddCustomer.vue"
import AddProduct from "@/components/Productadd.vue";

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
        path: 'provedorList',
        name: 'ProvedorList',
        component: ProvedorList
      },
      {
        path: 'provedorAdd',
        name: 'ProvedorAdd',
        component: ProvedorAdd
      },
      {
        path: 'provedorEdit/:id',
        name: 'ProvedorEdit',
        component: ProvedorEdit
      },
      {
        path: 'categoria',
        name: 'AddCategoria',
        component: AddCategoria
      },
      {
        path: 'modifyCate',
        name: 'ModifyCategoria',
        component: ModifyCategoria
      },
      {
        path: 'listCate',
        name: 'ListCategoria',
        component: ListCategoria
      },
      {
        path: 'AddClients',
        name: 'AddCustomer',
        component: AddCustomer
      },
      {
        path: "add-product",
        name: "AddProduct",
        component: AddProduct,
      },
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
