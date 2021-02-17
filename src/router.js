import Vue from "vue";
import Router from "vue-router";
//import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Pauta from './components/Pauta.vue';

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: Pauta
    },
    {
      path: '/home',
      component: Pauta
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      // lazy-loaded
      component: () => import('./views/BoardAdmin.vue')
    },
    {
      path: '/mod',
      name: 'moderator',
      // lazy-loaded
      component: () => import('./views/BoardModerator.vue')
    },
    {
      path: '/user',
      name: 'user',
      // lazy-loaded
      component: () => import('./views/BoardUser.vue')
    },
    {
      path: "/",
      alias: "/tutorials",
      name: "tutorials",
      component: () => import("./components/TutorialsList")
    },
    {
      path: "/tutorials/:id",
      name: "tutorial-details",
      component: () => import("./components/Tutorial")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddTutorial")
    },
    {
      path: "/addClient",
      name: "add Client",
      component: () => import("./components/AddClient")
    },
    {
      path: "/clients",
      name: "clients",
      component: () => import("./components/ClientsList")
    },
    {
      path: "/clients/:id",
      name: "clients-details",
      component: () => import("./components/Client")
    },
    {
      path: "/addOrder",
      name: "add Order",
      component: () => import("./components/AddOrder")
    }
  ]
});
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});
