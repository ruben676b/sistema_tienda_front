import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Estadisticas from "@/components/Estadisticas.vue";
import Dashboard from "@/views/Dashboard.vue";
import store from "@/store";

import ProductList from "@/components/ProductList.vue";
import ProvedorEdit from "@/components/ProveedorEdit.vue"; // Asegúrate de que la extensión es .vue

import ProvedorList from "@/components/ProvedorList.vue";
import ProvedorAdd from "@/components/ProvedorAdd.vue";
import AddCategoria from "@/components/AddCategoria.vue";
import ModifyCategoria from "@/components/ModifyCategoria.vue";
import ListCategoria from "@/components/ListCategoria.vue";
import AddCustomer from "@/components/AddCustomer.vue"
import AddProduct from "@/components/Productadd.vue";
import ProductCompare from "@/components/ProductCompare.vue";
import ProductEdit from "@/components/ProductEdit.vue";
import DetailProduct from "@/components/DetailProduct.vue";
import ListUsers from "@/components/ListUsers.vue";
import ListEmpleados from "@/components/ListEmpleados.vue";
import AddEmpleados from "@/components/AddEmpleados.vue";
import ListClients from "@/components/ListClients.vue";
import ListClientesJuridicos from "@/components/ListClintesJuridicos.vue";
import ListClintsNatural from "@/components/ListClintsNatural.vue";
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
        component: ListClintsNatural,
      },
      {
        path: "AddUsers",
        name: "AddUsers",
        component: AddUsers,
      },
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
