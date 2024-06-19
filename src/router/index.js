// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Estadisticas from '@/components/Estadisticas.vue';
import Dashboard from '@/views/Dashboard.vue'
import store from '@/store';

import ProductList from '@/components/ProductList.vue';


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
