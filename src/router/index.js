// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Estadisticas from '@/components/Estadisticas.vue';
import Dashboard from '@/views/Dashboard.vue'
import store from '@/store';

import MarcaList from '@/components/MarcaList.vue';
import AddMarcas from '@/components/AddMarcas.vue';
import GestionStock from '@/components/GestionStock.vue';
import ProductList from '@/components/ProductList.vue';
import ProductAdd from '@/components/ProductAdd.vue';
import VentaAdd from '@/components/VentaAdd.vue';
import FormasPago from '@/components/FormasPago.vue';
import AddFormasPago from '@/components/AddFormasPago.vue';
import cajaList from '@/components/cajaList.vue';
import AddCaja from '@/components/AddCaja.vue';
import VentaList from '@/components/VentaList.vue';

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
      {
        path: 'productlist',
        name: 'ProductList',
        component: ProductList
      },
      {
        path: 'productadd',
        name: 'ProductAdd',
        component: ProductAdd
      },
      {
        path: 'ventaadd',
        name: 'VentaAdd',
        component: VentaAdd
      },
      {
        path: 'formaspago',
        name: 'FormasPago',
        component: FormasPago
      },
      {
        path: 'addformaspago',
        name: 'AddFormasPago',
        component: AddFormasPago
      },
      {
        path: 'cajalist',
        name: 'cajaList',
        component: cajaList
      },
      {
        path: 'addcaja',
        name: 'AddCaja',
        component: AddCaja
      },
      {
        path: 'ventalist',
        name: 'VentaList',
        component: VentaList
      },
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
