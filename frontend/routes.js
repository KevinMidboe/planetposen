import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter)

let routes = [
  {
    name: 'Home',
    path: '/',
    component: (resolve) => require(['./components/Home.vue'], resolve)
  },
  {
    name: 'Cart',
    path: '/cart',
    component: (resolve) => require(['./components/Cart.vue'], resolve)
  },
  {
    name: 'About',
    path: '/about',
    component: (resolve) => require(['./components/About.vue'], resolve)
  },
  {
    name: 'Shop product view',
    path: '/shop/:slug',
    component: (resolve) => require(['./components/Product.vue'], resolve)
  },
  {
    name: 'Shop',
    path: '/shop',
    component: (resolve) => require(['./components/Shop.vue'], resolve)
  },
  {
    name: 'admin',
    path: '/admin',
    component: (resolve) => require(['./components/Admin.vue'], resolve)
  },
  // {
  //   name: 'styleguide',
  //   path: '/styleguide',
  //   component: (resolve) => require(['./components/Styleguide.vue'], resolve)
  // },
  // {
  //   name: '404',
  //   path: '/404',
  //   component: (resolve) => require(['./components/404.vue'], resolve)
  // }
];

const router =  new VueRouter({
  mode: 'hash',
  base: '/',
  routes,
  linkActiveClass: 'is-active'
});

export default router;
