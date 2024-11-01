import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6f1d38f6 = () => interopDefault(import('..\\pages\\404.vue' /* webpackChunkName: "pages/404" */))
const _0b9ee1e0 = () => interopDefault(import('..\\pages\\about-us.vue' /* webpackChunkName: "pages/about-us" */))
const _e2909da4 = () => interopDefault(import('..\\pages\\blog\\index.vue' /* webpackChunkName: "pages/blog/index" */))
const _6399eaf0 = () => interopDefault(import('..\\pages\\cart\\index.vue' /* webpackChunkName: "pages/cart/index" */))
const _558a1705 = () => interopDefault(import('..\\pages\\coming-soon.vue' /* webpackChunkName: "pages/coming-soon" */))
const _4a924545 = () => interopDefault(import('..\\pages\\contact-us\\index.vue' /* webpackChunkName: "pages/contact-us/index" */))
const _c2e1a096 = () => interopDefault(import('..\\pages\\electronics.vue' /* webpackChunkName: "pages/electronics" */))
const _1b0ddbd4 = () => interopDefault(import('..\\pages\\faq.vue' /* webpackChunkName: "pages/faq" */))
const _08ffe630 = () => interopDefault(import('..\\pages\\furniture.vue' /* webpackChunkName: "pages/furniture" */))
const _f412f96a = () => interopDefault(import('..\\pages\\grocery.vue' /* webpackChunkName: "pages/grocery" */))
const _0a102d27 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _5e9bb73a = () => interopDefault(import('..\\pages\\lookbook.vue' /* webpackChunkName: "pages/lookbook" */))
const _236111f8 = () => interopDefault(import('..\\pages\\my-account\\index.vue' /* webpackChunkName: "pages/my-account/index" */))
const _c945d736 = () => interopDefault(import('..\\pages\\pharmacy.vue' /* webpackChunkName: "pages/pharmacy" */))
const _45bef56e = () => interopDefault(import('..\\pages\\privacy-policy.vue' /* webpackChunkName: "pages/privacy-policy" */))
const _6270f356 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _4411695a = () => interopDefault(import('..\\pages\\shop\\index.vue' /* webpackChunkName: "pages/shop/index" */))
const _28ecbd3e = () => interopDefault(import('..\\pages\\vendor-dashboard\\index.vue' /* webpackChunkName: "pages/vendor-dashboard/index" */))
const _5b6dd4ca = () => interopDefault(import('..\\pages\\blog\\blog-2.vue' /* webpackChunkName: "pages/blog/blog-2" */))
const _5b51a5c8 = () => interopDefault(import('..\\pages\\blog\\blog-3.vue' /* webpackChunkName: "pages/blog/blog-3" */))
const _b7fdf9d8 = () => interopDefault(import('..\\pages\\blog\\blog-single-2.vue' /* webpackChunkName: "pages/blog/blog-single-2" */))
const _165b4917 = () => interopDefault(import('..\\pages\\cart\\cart-2.vue' /* webpackChunkName: "pages/cart/cart-2" */))
const _16696098 = () => interopDefault(import('..\\pages\\cart\\cart-3.vue' /* webpackChunkName: "pages/cart/cart-3" */))
const _16777819 = () => interopDefault(import('..\\pages\\cart\\cart-4.vue' /* webpackChunkName: "pages/cart/cart-4" */))
const _204ddd72 = () => interopDefault(import('..\\pages\\cart\\empty-cart.vue' /* webpackChunkName: "pages/cart/empty-cart" */))
const _9b1efca6 = () => interopDefault(import('..\\pages\\contact-us\\contact-us-2.vue' /* webpackChunkName: "pages/contact-us/contact-us-2" */))
const _616f85ae = () => interopDefault(import('..\\pages\\crud\\clientes.vue' /* webpackChunkName: "pages/crud/clientes" */))
const _4e6926cb = () => interopDefault(import('..\\pages\\crud\\cupones.vue' /* webpackChunkName: "pages/crud/cupones" */))
const _33e32a0a = () => interopDefault(import('..\\pages\\crud\\descuentos.vue' /* webpackChunkName: "pages/crud/descuentos" */))
const _cae44570 = () => interopDefault(import('..\\pages\\crud\\empleados.vue' /* webpackChunkName: "pages/crud/empleados" */))
const _3a2c24e1 = () => interopDefault(import('..\\pages\\crud\\inventario.vue' /* webpackChunkName: "pages/crud/inventario" */))
const _dab15ca0 = () => interopDefault(import('..\\pages\\crud\\ocasiones.vue' /* webpackChunkName: "pages/crud/ocasiones" */))
const _2be421d3 = () => interopDefault(import('..\\pages\\crud\\productos.vue' /* webpackChunkName: "pages/crud/productos" */))
const _0e10f706 = () => interopDefault(import('..\\pages\\crud\\roles.vue' /* webpackChunkName: "pages/crud/roles" */))
const _4a0de00f = () => interopDefault(import('..\\pages\\crud\\tallas.vue' /* webpackChunkName: "pages/crud/tallas" */))
const _f32f3e88 = () => interopDefault(import('..\\pages\\crud\\temporadas.vue' /* webpackChunkName: "pages/crud/temporadas" */))
const _0dd21f16 = () => interopDefault(import('..\\pages\\crud\\usuarios.vue' /* webpackChunkName: "pages/crud/usuarios" */))
const _051c5054 = () => interopDefault(import('..\\pages\\my-account\\account-details.vue' /* webpackChunkName: "pages/my-account/account-details" */))
const _085bf3db = () => interopDefault(import('..\\pages\\my-account\\account-info-edit.vue' /* webpackChunkName: "pages/my-account/account-info-edit" */))
const _afc1f658 = () => interopDefault(import('..\\pages\\my-account\\addresses.vue' /* webpackChunkName: "pages/my-account/addresses" */))
const _025182a8 = () => interopDefault(import('..\\pages\\my-account\\checkout-1.vue' /* webpackChunkName: "pages/my-account/checkout-1" */))
const _025f9a29 = () => interopDefault(import('..\\pages\\my-account\\checkout-2.vue' /* webpackChunkName: "pages/my-account/checkout-2" */))
const _6e9a8b17 = () => interopDefault(import('..\\pages\\my-account\\compare.vue' /* webpackChunkName: "pages/my-account/compare" */))
const _8ed9f4c6 = () => interopDefault(import('..\\pages\\my-account\\downloads.vue' /* webpackChunkName: "pages/my-account/downloads" */))
const _2c277ad8 = () => interopDefault(import('..\\pages\\my-account\\order-tracking.vue' /* webpackChunkName: "pages/my-account/order-tracking" */))
const _404f4cba = () => interopDefault(import('..\\pages\\my-account\\orders.vue' /* webpackChunkName: "pages/my-account/orders" */))
const _4f032b03 = () => interopDefault(import('..\\pages\\my-account\\wishlist.vue' /* webpackChunkName: "pages/my-account/wishlist" */))
const _4d50db78 = () => interopDefault(import('..\\pages\\otras-paginas\\jackets.vue' /* webpackChunkName: "pages/otras-paginas/jackets" */))
const _862195a2 = () => interopDefault(import('..\\pages\\otras-paginas\\pants.vue' /* webpackChunkName: "pages/otras-paginas/pants" */))
const _364513ae = () => interopDefault(import('..\\pages\\otras-paginas\\sueteres.vue' /* webpackChunkName: "pages/otras-paginas/sueteres" */))
const _0e603810 = () => interopDefault(import('..\\pages\\product\\product-single-2.vue' /* webpackChunkName: "pages/product/product-single-2" */))
const _0e44090e = () => interopDefault(import('..\\pages\\product\\product-single-3.vue' /* webpackChunkName: "pages/product/product-single-3" */))
const _e7e5817a = () => interopDefault(import('..\\pages\\shop\\shop-2.vue' /* webpackChunkName: "pages/shop/shop-2" */))
const _e7c95278 = () => interopDefault(import('..\\pages\\shop\\shop-3.vue' /* webpackChunkName: "pages/shop/shop-3" */))
const _e7ad2376 = () => interopDefault(import('..\\pages\\shop\\shop-4.vue' /* webpackChunkName: "pages/shop/shop-4" */))
const _e790f474 = () => interopDefault(import('..\\pages\\shop\\shop-5.vue' /* webpackChunkName: "pages/shop/shop-5" */))
const _2d3e3a92 = () => interopDefault(import('..\\pages\\vendor-dashboard\\add-product.vue' /* webpackChunkName: "pages/vendor-dashboard/add-product" */))
const _045461dd = () => interopDefault(import('..\\pages\\vendor-dashboard\\order.vue' /* webpackChunkName: "pages/vendor-dashboard/order" */))
const _74c1e584 = () => interopDefault(import('..\\pages\\vendor-dashboard\\product.vue' /* webpackChunkName: "pages/vendor-dashboard/product" */))
const _291edcf8 = () => interopDefault(import('..\\pages\\vendor-dashboard\\profile.vue' /* webpackChunkName: "pages/vendor-dashboard/profile" */))
const _173eb61f = () => interopDefault(import('..\\pages\\vendor-dashboard\\setting.vue' /* webpackChunkName: "pages/vendor-dashboard/setting" */))
const _40688a10 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _e5fde034 = () => interopDefault(import('..\\pages\\blog\\_slug.vue' /* webpackChunkName: "pages/blog/_slug" */))
const _3f96dd5d = () => interopDefault(import('..\\pages\\product\\_id.vue' /* webpackChunkName: "pages/product/_id" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/404",
    component: _6f1d38f6,
    name: "404"
  }, {
    path: "/about-us",
    component: _0b9ee1e0,
    name: "about-us"
  }, {
    path: "/blog",
    component: _e2909da4,
    name: "blog"
  }, {
    path: "/cart",
    component: _6399eaf0,
    name: "cart"
  }, {
    path: "/coming-soon",
    component: _558a1705,
    name: "coming-soon"
  }, {
    path: "/contact-us",
    component: _4a924545,
    name: "contact-us"
  }, {
    path: "/electronics",
    component: _c2e1a096,
    name: "electronics"
  }, {
    path: "/faq",
    component: _1b0ddbd4,
    name: "faq"
  }, {
    path: "/furniture",
    component: _08ffe630,
    name: "furniture"
  }, {
    path: "/grocery",
    component: _f412f96a,
    name: "grocery"
  }, {
    path: "/login",
    component: _0a102d27,
    name: "login"
  }, {
    path: "/lookbook",
    component: _5e9bb73a,
    name: "lookbook"
  }, {
    path: "/my-account",
    component: _236111f8,
    name: "my-account"
  }, {
    path: "/pharmacy",
    component: _c945d736,
    name: "pharmacy"
  }, {
    path: "/privacy-policy",
    component: _45bef56e,
    name: "privacy-policy"
  }, {
    path: "/register",
    component: _6270f356,
    name: "register"
  }, {
    path: "/shop",
    component: _4411695a,
    name: "shop"
  }, {
    path: "/vendor-dashboard",
    component: _28ecbd3e,
    name: "vendor-dashboard"
  }, {
    path: "/blog/blog-2",
    component: _5b6dd4ca,
    name: "blog-blog-2"
  }, {
    path: "/blog/blog-3",
    component: _5b51a5c8,
    name: "blog-blog-3"
  }, {
    path: "/blog/blog-single-2",
    component: _b7fdf9d8,
    name: "blog-blog-single-2"
  }, {
    path: "/cart/cart-2",
    component: _165b4917,
    name: "cart-cart-2"
  }, {
    path: "/cart/cart-3",
    component: _16696098,
    name: "cart-cart-3"
  }, {
    path: "/cart/cart-4",
    component: _16777819,
    name: "cart-cart-4"
  }, {
    path: "/cart/empty-cart",
    component: _204ddd72,
    name: "cart-empty-cart"
  }, {
    path: "/contact-us/contact-us-2",
    component: _9b1efca6,
    name: "contact-us-contact-us-2"
  }, {
    path: "/crud/clientes",
    component: _616f85ae,
    name: "crud-clientes"
  }, {
    path: "/crud/cupones",
    component: _4e6926cb,
    name: "crud-cupones"
  }, {
    path: "/crud/descuentos",
    component: _33e32a0a,
    name: "crud-descuentos"
  }, {
    path: "/crud/empleados",
    component: _cae44570,
    name: "crud-empleados"
  }, {
    path: "/crud/inventario",
    component: _3a2c24e1,
    name: "crud-inventario"
  }, {
    path: "/crud/ocasiones",
    component: _dab15ca0,
    name: "crud-ocasiones"
  }, {
    path: "/crud/productos",
    component: _2be421d3,
    name: "crud-productos"
  }, {
    path: "/crud/roles",
    component: _0e10f706,
    name: "crud-roles"
  }, {
    path: "/crud/tallas",
    component: _4a0de00f,
    name: "crud-tallas"
  }, {
    path: "/crud/temporadas",
    component: _f32f3e88,
    name: "crud-temporadas"
  }, {
    path: "/crud/usuarios",
    component: _0dd21f16,
    name: "crud-usuarios"
  }, {
    path: "/my-account/account-details",
    component: _051c5054,
    name: "my-account-account-details"
  }, {
    path: "/my-account/account-info-edit",
    component: _085bf3db,
    name: "my-account-account-info-edit"
  }, {
    path: "/my-account/addresses",
    component: _afc1f658,
    name: "my-account-addresses"
  }, {
    path: "/my-account/checkout-1",
    component: _025182a8,
    name: "my-account-checkout-1"
  }, {
    path: "/my-account/checkout-2",
    component: _025f9a29,
    name: "my-account-checkout-2"
  }, {
    path: "/my-account/compare",
    component: _6e9a8b17,
    name: "my-account-compare"
  }, {
    path: "/my-account/downloads",
    component: _8ed9f4c6,
    name: "my-account-downloads"
  }, {
    path: "/my-account/order-tracking",
    component: _2c277ad8,
    name: "my-account-order-tracking"
  }, {
    path: "/my-account/orders",
    component: _404f4cba,
    name: "my-account-orders"
  }, {
    path: "/my-account/wishlist",
    component: _4f032b03,
    name: "my-account-wishlist"
  }, {
    path: "/otras-paginas/jackets",
    component: _4d50db78,
    name: "otras-paginas-jackets"
  }, {
    path: "/otras-paginas/pants",
    component: _862195a2,
    name: "otras-paginas-pants"
  }, {
    path: "/otras-paginas/sueteres",
    component: _364513ae,
    name: "otras-paginas-sueteres"
  }, {
    path: "/product/product-single-2",
    component: _0e603810,
    name: "product-product-single-2"
  }, {
    path: "/product/product-single-3",
    component: _0e44090e,
    name: "product-product-single-3"
  }, {
    path: "/shop/shop-2",
    component: _e7e5817a,
    name: "shop-shop-2"
  }, {
    path: "/shop/shop-3",
    component: _e7c95278,
    name: "shop-shop-3"
  }, {
    path: "/shop/shop-4",
    component: _e7ad2376,
    name: "shop-shop-4"
  }, {
    path: "/shop/shop-5",
    component: _e790f474,
    name: "shop-shop-5"
  }, {
    path: "/vendor-dashboard/add-product",
    component: _2d3e3a92,
    name: "vendor-dashboard-add-product"
  }, {
    path: "/vendor-dashboard/order",
    component: _045461dd,
    name: "vendor-dashboard-order"
  }, {
    path: "/vendor-dashboard/product",
    component: _74c1e584,
    name: "vendor-dashboard-product"
  }, {
    path: "/vendor-dashboard/profile",
    component: _291edcf8,
    name: "vendor-dashboard-profile"
  }, {
    path: "/vendor-dashboard/setting",
    component: _173eb61f,
    name: "vendor-dashboard-setting"
  }, {
    path: "/",
    component: _40688a10,
    name: "index"
  }, {
    path: "/blog/:slug",
    component: _e5fde034,
    name: "blog-slug"
  }, {
    path: "/product/:id?",
    component: _3f96dd5d,
    name: "product-id"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
