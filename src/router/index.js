// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Estadisticas from '@/components/Estadisticas.vue';
import Dashboard from '@/views/Dashboard.vue'
import store from '@/store';

import ProductList from '@/components/ProductList.vue';
import ProvedorList from '@/components/ProvedorList.vue';
import AddCategoria from '@/components/AddCategoria.vue';
import ModifyProduct from '@/components/ModifyProduct.vue';



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
        path: 'categoria',
        name: 'AddCategoria',
        component: AddCategoria
      },
      {
        path: 'modifypro',
        name: 'ModifyProduct',
        component: ModifyProduct
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
