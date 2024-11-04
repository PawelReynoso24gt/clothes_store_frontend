import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _afa8a888 = () => interopDefault(import('..\\pages\\404.vue' /* webpackChunkName: "pages/404" */))
const _1438e80a = () => interopDefault(import('..\\pages\\about-us.vue' /* webpackChunkName: "pages/about-us" */))
const _0021fdf4 = () => interopDefault(import('..\\pages\\blog\\index.vue' /* webpackChunkName: "pages/blog/index" */))
const _55f79094 = () => interopDefault(import('..\\pages\\cart\\index.vue' /* webpackChunkName: "pages/cart/index" */))
const _7217386a = () => interopDefault(import('..\\pages\\coming-soon.vue' /* webpackChunkName: "pages/coming-soon" */))
const _6fb534ea = () => interopDefault(import('..\\pages\\contact-us\\index.vue' /* webpackChunkName: "pages/contact-us/index" */))
const _0ff97c7b = () => interopDefault(import('..\\pages\\electronics.vue' /* webpackChunkName: "pages/electronics" */))
const _541c4e9a = () => interopDefault(import('..\\pages\\faq.vue' /* webpackChunkName: "pages/faq" */))
const _3002ac76 = () => interopDefault(import('..\\pages\\furniture.vue' /* webpackChunkName: "pages/furniture" */))
const _4d3bb9de = () => interopDefault(import('..\\pages\\grocery.vue' /* webpackChunkName: "pages/grocery" */))
const _394d066d = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _78a41034 = () => interopDefault(import('..\\pages\\lookbook.vue' /* webpackChunkName: "pages/lookbook" */))
const _6be2974a = () => interopDefault(import('..\\pages\\my-account\\index.vue' /* webpackChunkName: "pages/my-account/index" */))
const _95352542 = () => interopDefault(import('..\\pages\\pharmacy.vue' /* webpackChunkName: "pages/pharmacy" */))
const _1e5cbac3 = () => interopDefault(import('..\\pages\\privacy-policy.vue' /* webpackChunkName: "pages/privacy-policy" */))
const _2e604162 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _950893c0 = () => interopDefault(import('..\\pages\\shop\\index.vue' /* webpackChunkName: "pages/shop/index" */))
const _258e15b2 = () => interopDefault(import('..\\pages\\vendor-dashboard\\index.vue' /* webpackChunkName: "pages/vendor-dashboard/index" */))
const _e3af3cd6 = () => interopDefault(import('..\\pages\\blog\\blog-2.vue' /* webpackChunkName: "pages/blog/blog-2" */))
const _e3930dd4 = () => interopDefault(import('..\\pages\\blog\\blog-3.vue' /* webpackChunkName: "pages/blog/blog-3" */))
const _094d29da = () => interopDefault(import('..\\pages\\blog\\blog-single-2.vue' /* webpackChunkName: "pages/blog/blog-single-2" */))
const _5b8ad5de = () => interopDefault(import('..\\pages\\cart\\cart-2.vue' /* webpackChunkName: "pages/cart/cart-2" */))
const _5b6ea6dc = () => interopDefault(import('..\\pages\\cart\\cart-3.vue' /* webpackChunkName: "pages/cart/cart-3" */))
const _5b5277da = () => interopDefault(import('..\\pages\\cart\\cart-4.vue' /* webpackChunkName: "pages/cart/cart-4" */))
const _03529c6c = () => interopDefault(import('..\\pages\\cart\\empty-cart.vue' /* webpackChunkName: "pages/cart/empty-cart" */))
const _32a8b2b2 = () => interopDefault(import('..\\pages\\contact-us\\contact-us-2.vue' /* webpackChunkName: "pages/contact-us/contact-us-2" */))
const _108472a3 = () => interopDefault(import('..\\pages\\crud\\clientes.vue' /* webpackChunkName: "pages/crud/clientes" */))
const _0e735a11 = () => interopDefault(import('..\\pages\\crud\\cupones.vue' /* webpackChunkName: "pages/crud/cupones" */))
const _6dd9ac16 = () => interopDefault(import('..\\pages\\crud\\descuentos.vue' /* webpackChunkName: "pages/crud/descuentos" */))
const _fe4f51e4 = () => interopDefault(import('..\\pages\\crud\\empleados.vue' /* webpackChunkName: "pages/crud/empleados" */))
const _1d30e3db = () => interopDefault(import('..\\pages\\crud\\inventario.vue' /* webpackChunkName: "pages/crud/inventario" */))
const _78f1cb76 = () => interopDefault(import('..\\pages\\crud\\ocasiones.vue' /* webpackChunkName: "pages/crud/ocasiones" */))
const _122e9b99 = () => interopDefault(import('..\\pages\\crud\\productos.vue' /* webpackChunkName: "pages/crud/productos" */))
const _6a61d143 = () => interopDefault(import('..\\pages\\crud\\roles.vue' /* webpackChunkName: "pages/crud/roles" */))
const _05ed2c09 = () => interopDefault(import('..\\pages\\crud\\tallas.vue' /* webpackChunkName: "pages/crud/tallas" */))
const _696d1fb6 = () => interopDefault(import('..\\pages\\crud\\temporadas.vue' /* webpackChunkName: "pages/crud/temporadas" */))
const _3a5325ef = () => interopDefault(import('..\\pages\\crud\\usuarios.vue' /* webpackChunkName: "pages/crud/usuarios" */))
const _33d0511a = () => interopDefault(import('..\\pages\\my-account\\account-details.vue' /* webpackChunkName: "pages/my-account/account-details" */))
const _5a12db21 = () => interopDefault(import('..\\pages\\my-account\\account-info-edit.vue' /* webpackChunkName: "pages/my-account/account-info-edit" */))
const _2a06dbcc = () => interopDefault(import('..\\pages\\my-account\\addresses.vue' /* webpackChunkName: "pages/my-account/addresses" */))
const _1b259e22 = () => interopDefault(import('..\\pages\\my-account\\checkout-1.vue' /* webpackChunkName: "pages/my-account/checkout-1" */))
const _1b33b5a3 = () => interopDefault(import('..\\pages\\my-account\\checkout-2.vue' /* webpackChunkName: "pages/my-account/checkout-2" */))
const _58329c46 = () => interopDefault(import('..\\pages\\my-account\\compare.vue' /* webpackChunkName: "pages/my-account/compare" */))
const _091eda3a = () => interopDefault(import('..\\pages\\my-account\\downloads.vue' /* webpackChunkName: "pages/my-account/downloads" */))
const _081bdde4 = () => interopDefault(import('..\\pages\\my-account\\order-tracking.vue' /* webpackChunkName: "pages/my-account/order-tracking" */))
const _14a9421d = () => interopDefault(import('..\\pages\\my-account\\orders.vue' /* webpackChunkName: "pages/my-account/orders" */))
const _d9884606 = () => interopDefault(import('..\\pages\\my-account\\wishlist.vue' /* webpackChunkName: "pages/my-account/wishlist" */))
const _6624f6f2 = () => interopDefault(import('..\\pages\\otras-paginas\\jackets.vue' /* webpackChunkName: "pages/otras-paginas/jackets" */))
const _0127e729 = () => interopDefault(import('..\\pages\\otras-paginas\\pants.vue' /* webpackChunkName: "pages/otras-paginas/pants" */))
const _32e66c22 = () => interopDefault(import('..\\pages\\otras-paginas\\sueteres.vue' /* webpackChunkName: "pages/otras-paginas/sueteres" */))
const _4bf95e3e = () => interopDefault(import('..\\pages\\product\\product-single-2.vue' /* webpackChunkName: "pages/product/product-single-2" */))
const _4c0775bf = () => interopDefault(import('..\\pages\\product\\product-single-3.vue' /* webpackChunkName: "pages/product/product-single-3" */))
const _ee3178c4 = () => interopDefault(import('..\\pages\\productosHombres\\camisas.vue' /* webpackChunkName: "pages/productosHombres/camisas" */))
const _47d9fe50 = () => interopDefault(import('..\\pages\\productosHombres\\jackets.vue' /* webpackChunkName: "pages/productosHombres/jackets" */))
const _2cd9658c = () => interopDefault(import('..\\pages\\productosHombres\\pantalones.vue' /* webpackChunkName: "pages/productosHombres/pantalones" */))
const _308d5202 = () => interopDefault(import('..\\pages\\productosHombres\\pantalonetas.vue' /* webpackChunkName: "pages/productosHombres/pantalonetas" */))
const _2ec47020 = () => interopDefault(import('..\\pages\\productosHombres\\playeras.vue' /* webpackChunkName: "pages/productosHombres/playeras" */))
const _2e5ffcc9 = () => interopDefault(import('..\\pages\\productosHombres\\sueteres.vue' /* webpackChunkName: "pages/productosHombres/sueteres" */))
const _f293191c = () => interopDefault(import('..\\pages\\productosHombres\\trajes.vue' /* webpackChunkName: "pages/productosHombres/trajes" */))
const _47ec8b3d = () => interopDefault(import('..\\pages\\shop\\shop-2.vue' /* webpackChunkName: "pages/shop/shop-2" */))
const _47faa2be = () => interopDefault(import('..\\pages\\shop\\shop-3.vue' /* webpackChunkName: "pages/shop/shop-3" */))
const _4808ba3f = () => interopDefault(import('..\\pages\\shop\\shop-4.vue' /* webpackChunkName: "pages/shop/shop-4" */))
const _4816d1c0 = () => interopDefault(import('..\\pages\\shop\\shop-5.vue' /* webpackChunkName: "pages/shop/shop-5" */))
const _7ef521d8 = () => interopDefault(import('..\\pages\\vendor-dashboard\\add-product.vue' /* webpackChunkName: "pages/vendor-dashboard/add-product" */))
const _0603b5a3 = () => interopDefault(import('..\\pages\\vendor-dashboard\\order.vue' /* webpackChunkName: "pages/vendor-dashboard/order" */))
const _5d8c1864 = () => interopDefault(import('..\\pages\\vendor-dashboard\\orderClient.vue' /* webpackChunkName: "pages/vendor-dashboard/orderClient" */))
const _18c88784 = () => interopDefault(import('..\\pages\\vendor-dashboard\\product.vue' /* webpackChunkName: "pages/vendor-dashboard/product" */))
const _7c48573e = () => interopDefault(import('..\\pages\\vendor-dashboard\\profile.vue' /* webpackChunkName: "pages/vendor-dashboard/profile" */))
const _6a683065 = () => interopDefault(import('..\\pages\\vendor-dashboard\\setting.vue' /* webpackChunkName: "pages/vendor-dashboard/setting" */))
const _6fa56356 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _032946a8 = () => interopDefault(import('..\\pages\\blog\\_slug.vue' /* webpackChunkName: "pages/blog/_slug" */))
const _0913ad52 = () => interopDefault(import('..\\pages\\product\\_id.vue' /* webpackChunkName: "pages/product/_id" */))

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
    component: _1b32c116,
    component: _1b32c116,
    name: "404"
  }, {
    path: "/about-us",
    component: _038e5ff1,
    component: _038e5ff1,
    name: "about-us"
  }, {
    path: "/blog",
    component: _e9a3aea6,
    component: _e9a3aea6,
    name: "blog"
  }, {
    path: "/cart",
    component: _6010626f,
    component: _6010626f,
    name: "cart"
  }, {
    path: "/coming-soon",
    component: _52008e84,
    component: _52008e84,
    name: "coming-soon"
  }, {
    path: "/contact-us",
    component: _4b6a3cf8,
    component: _4b6a3cf8,
    name: "contact-us"
  }, {
    path: "/electronics",
    component: _c9f4b198,
    component: _c9f4b198,
    name: "electronics"
  }, {
    path: "/faq",
    component: _c3517b5a,
    component: _c3517b5a,
    name: "faq"
  }, {
    path: "/furniture",
    component: _2b5c316f,
    component: _2b5c316f,
    name: "furniture"
  }, {
    path: "/grocery",
    component: _3dcadb6c,
    component: _3dcadb6c,
    name: "grocery"
  }, {
    path: "/login",
    component: _3ecc2034,
    component: _3ecc2034,
    name: "login"
  }, {
    path: "/lookbook",
    component: _67f9881b,
    component: _67f9881b,
    name: "lookbook"
  }, {
    path: "/my-account",
    component: _7e081343,
    component: _7e081343,
    name: "my-account"
  }, {
    path: "/pharmacy",
    component: _b68a3574,
    component: _b68a3574,
    name: "pharmacy"
  }, {
    path: "/privacy-policy",
    component: _3b3c696a,
    component: _3b3c696a,
    name: "privacy-policy"
  }, {
    path: "/register",
    component: _4fb55194,
    component: _4fb55194,
    name: "register"
  }, {
    path: "/shop",
    component: _4087e0d9,
    component: _4087e0d9,
    name: "shop"
  }, {
    path: "/vendor-dashboard",
    component: _2205d260,
    component: _2205d260,
    name: "vendor-dashboard"
  }, {
    path: "/blog/blog-2",
    component: _64a18dfc,
    component: _64a18dfc,
    name: "blog-blog-2"
  }, {
    path: "/blog/blog-3",
    component: _64afa57d,
    component: _64afa57d,
    name: "blog-blog-3"
  }, {
    path: "/blog/blog-single-2",
    component: _28038b93,
    component: _28038b93,
    name: "blog-blog-single-2"
  }, {
    path: "/cart/cart-2",
    component: _ae987d10,
    component: _ae987d10,
    name: "cart-cart-2"
  }, {
    path: "/cart/cart-3",
    component: _ae7c4e0e,
    component: _ae7c4e0e,
    name: "cart-cart-3"
  }, {
    path: "/cart/cart-4",
    component: _ae601f0c,
    component: _ae601f0c,
    name: "cart-cart-4"
  }, {
    path: "/cart/empty-cart",
    component: _67013d53,
    component: _67013d53,
    name: "cart-empty-cart"
  }, {
    path: "/contact-us/contact-us-2",
    component: _4b7a708e,
    component: _4b7a708e,
    name: "contact-us-contact-us-2"
  }, {
    path: "/crud/clientes",
    component: _2d64214a,
    component: _2d64214a,
    name: "crud-clientes"
  }, {
    path: "/crud/cupones",
    component: _071fba8a,
    component: _071fba8a,
    name: "crud-cupones"
  }, {
    path: "/crud/descuentos",
    component: _2cc1cadc,
    component: _2cc1cadc,
    name: "crud-descuentos"
  }, {
    path: "/crud/empleados",
    component: _00230572,
    component: _00230572,
    name: "crud-empleados"
  }, {
    path: "/crud/inventario",
    component: _fe40f67c,
    component: _fe40f67c,
    name: "crud-inventario"
  }, {
    path: "/crud/ocasiones",
    component: _0ff01ca2,
    component: _0ff01ca2,
    name: "crud-ocasiones"
  }, {
    path: "/crud/productos",
    component: _dd767c5c,
    component: _dd767c5c,
    name: "crud-productos"
  }, {
    path: "/crud/roles",
    component: _15240808,
    component: _15240808,
    name: "crud-roles"
  }, {
    path: "/crud/tallas",
    component: _47334f20,
    component: _47334f20,
    name: "crud-tallas"
  }, {
    path: "/crud/temporadas",
    component: _65c87ec6,
    component: _65c87ec6,
    name: "crud-temporadas"
  }, {
    path: "/crud/usuarios",
    component: _5732d496,
    component: _5732d496,
    name: "crud-usuarios"
  }, {
    path: "/my-account/account-details",
    component: _5009e9d3,
    component: _5009e9d3,
    name: "my-account-account-details"
  }, {
    path: "/my-account/account-info-edit",
    component: _4e49299a,
    component: _4e49299a,
    name: "my-account-account-info-edit"
  }, {
    path: "/my-account/addresses",
    component: _35a16993,
    component: _35a16993,
    name: "my-account-addresses"
  }, {
    path: "/my-account/checkout-1",
    component: _251bb5c9,
    component: _251bb5c9,
    name: "my-account-checkout-1"
  }, {
    path: "/my-account/checkout-2",
    component: _2529cd4a,
    component: _2529cd4a,
    name: "my-account-checkout-2"
  }, {
    path: "/my-account/compare",
    component: _1ac5d8d4,
    component: _1ac5d8d4,
    name: "my-account-compare"
  }, {
    path: "/my-account/downloads",
    component: _46156a5c,
    component: _46156a5c,
    name: "my-account-downloads"
  }, {
    path: "/my-account/order-tracking",
    component: _6835fd35,
    component: _6835fd35,
    name: "my-account-order-tracking"
  }, {
    path: "/my-account/orders",
    component: _47334544,
    component: _47334544,
    name: "my-account-orders"
  }, {
    path: "/my-account/wishlist",
    component: _4b51b264,
    component: _4b51b264,
    name: "my-account-wishlist"
  }, {
    path: "/otras-paginas/jackets",
    component: _701b0e99,
    component: _701b0e99,
    name: "otras-paginas-jackets"
  }, {
    path: "/otras-paginas/pants",
    component: _8d8486e0,
    component: _8d8486e0,
    name: "otras-paginas-pants"
  }, {
    path: "/otras-paginas/sueteres",
    component: _1b59a728,
    component: _1b59a728,
    name: "otras-paginas-sueteres"
  }, {
    path: "/product/product-single-2",
    component: _fdf85d92,
    component: _fdf85d92,
    name: "product-product-single-2"
  }, {
    path: "/product/product-single-3",
    component: _fddc2e90,
    component: _fddc2e90,
    name: "product-product-single-3"
  }, {
    path: "/productosHombres/camisas",
    component: _ee3178c4,
    name: "productosHombres-camisas"
  }, {
    path: "/productosHombres/jackets",
    component: _47d9fe50,
    name: "productosHombres-jackets"
  }, {
    path: "/productosHombres/pantalones",
    component: _2cd9658c,
    name: "productosHombres-pantalones"
  }, {
    path: "/productosHombres/pantalonetas",
    component: _308d5202,
    name: "productosHombres-pantalonetas"
  }, {
    path: "/productosHombres/playeras",
    component: _2ec47020,
    name: "productosHombres-playeras"
  }, {
    path: "/productosHombres/sueteres",
    component: _2e5ffcc9,
    name: "productosHombres-sueteres"
  }, {
    path: "/productosHombres/trajes",
    component: _f293191c,
    name: "productosHombres-trajes"
  }, {
    path: "/shop/shop-2",
    component: _1e65b7a4,
    component: _1e65b7a4,
    name: "shop-shop-2"
  }, {
    path: "/shop/shop-3",
    component: _1e73cf25,
    component: _1e73cf25,
    name: "shop-shop-3"
  }, {
    path: "/shop/shop-4",
    component: _1e81e6a6,
    component: _1e81e6a6,
    name: "shop-shop-4"
  }, {
    path: "/shop/shop-5",
    component: _1e8ffe27,
    component: _1e8ffe27,
    name: "shop-shop-5"
  }, {
    path: "/vendor-dashboard/add-product",
    component: _732b7051,
    component: _732b7051,
    name: "vendor-dashboard-add-product"
  }, {
    path: "/vendor-dashboard/order",
    component: _3ad092dc,
    component: _3ad092dc,
    name: "vendor-dashboard-order"
  }, {
    path: "/vendor-dashboard/orderClient",
    component: _5d8c1864,
    name: "vendor-dashboard-orderClient"
  }, {
    path: "/vendor-dashboard/product",
    component: _4dd2fa7d,
    component: _4dd2fa7d,
    name: "vendor-dashboard-product"
  }, {
    path: "/vendor-dashboard/profile",
    component: _9d5a6b92,
    component: _9d5a6b92,
    name: "vendor-dashboard-profile"
  }, {
    path: "/vendor-dashboard/setting",
    component: _c11ab944,
    component: _c11ab944,
    name: "vendor-dashboard-setting"
  }, {
    path: "/",
    component: _16f24ccf,
    component: _16f24ccf,
    name: "index"
  }, {
    path: "/blog/:slug",
    component: _ed10f136,
    component: _ed10f136,
    name: "blog-slug"
  }, {
    path: "/product/:id?",
    component: _5c215484,
    component: _5c215484,
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
