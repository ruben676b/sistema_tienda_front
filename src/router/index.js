// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Estadisticas from '@/components/Estadisticas.vue';
import Dashboard from '@/views/Dashboard.vue'
import store from '@/store';

import ProductList from '@/components/ProductList.vue';
import ProvedorList from '@/components/ProvedorList.vue';
import MarcaList from '@/components/MarcaList.vue';
import AddMarcas from '@/components/AddMarcas.vue';
import GestionStock from '@/components/GestionStock.vue';


const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    name:'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [

      {
        path: 'estadisticas',
        name: 'Estadisticas',
        component: Estadisticas
      },
      {
        path: 'products',
        name: 'ProductList',
        component: ProductList
      },
      {
        path: 'provedor',
        name: 'ProvedorList',
        component: ProvedorList
      },
      {
        path: 'marca',
        name: 'MarcaList',
        component: MarcaList
      },
      {
        path: 'addmarca',
        name: 'AddMarcas',
        component: AddMarcas
      },
      {
        path: 'gestionstock',
        name: 'GestionStock',
        component: GestionStock
      },
      
      // {
      //   path: 'add-product',
      //   name: 'AddProduct',
      //   component: AddProduct
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
      
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
