import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Login from './views/Login.vue';
import Elections from './views/Elections.vue';
import Vote from './views/Vote.vue';
import Callback from './views/Callback.vue';
import Admin from './views/Admin.vue';
import Root from './views/Root.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      component: Root,
      meta: {
        active: false
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        active: true
      }
    },
    {
      path: '/elections',
      name: 'elections',
      component: Elections,
      meta: {
        active: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        active: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        active: true
      }
    },
    {
      path: '/callback',
      component: Callback,
      meta: {
        active: false
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        active: true
      }
    },
    {
      path: '/vote',
      name: 'vote',
      component: Vote,
      meta: {
        active: false
      }
    }
  ]
});
