import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _560cdd60 = () => interopDefault(import('..\\pages\\404.vue' /* webpackChunkName: "pages/404" */))
const _bf6dc634 = () => interopDefault(import('..\\pages\\about-us.vue' /* webpackChunkName: "pages/about-us" */))
const _52194b98 = () => interopDefault(import('..\\pages\\blog\\index.vue' /* webpackChunkName: "pages/blog/index" */))
const _26fb855a = () => interopDefault(import('..\\pages\\cart\\index.vue' /* webpackChunkName: "pages/cart/index" */))
const _18ebb16f = () => interopDefault(import('..\\pages\\coming-soon.vue' /* webpackChunkName: "pages/coming-soon" */))
const _afa62fa2 = () => interopDefault(import('..\\pages\\contact-us\\index.vue' /* webpackChunkName: "pages/contact-us/index" */))
const _61f0ca1f = () => interopDefault(import('..\\pages\\electronics.vue' /* webpackChunkName: "pages/electronics" */))
const _01fd803e = () => interopDefault(import('..\\pages\\faq.vue' /* webpackChunkName: "pages/faq" */))
const _b9773f3e = () => interopDefault(import('..\\pages\\faqAdmin.vue' /* webpackChunkName: "pages/faqAdmin" */))
const _25f9131a = () => interopDefault(import('..\\pages\\furniture.vue' /* webpackChunkName: "pages/furniture" */))
const _6a49e2b5 = () => interopDefault(import('..\\pages\\grocery.vue' /* webpackChunkName: "pages/grocery" */))
const _18af41de = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _04b44510 = () => interopDefault(import('..\\pages\\lookbook.vue' /* webpackChunkName: "pages/lookbook" */))
const _4bea19ee = () => interopDefault(import('..\\pages\\my-account\\index.vue' /* webpackChunkName: "pages/my-account/index" */))
const _4175a23b = () => interopDefault(import('..\\pages\\pharmacy.vue' /* webpackChunkName: "pages/pharmacy" */))
const _cf5e4ac2 = () => interopDefault(import('..\\pages\\privacy-policy.vue' /* webpackChunkName: "pages/privacy-policy" */))
const _74e0142b = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _077303c4 = () => interopDefault(import('..\\pages\\shop\\index.vue' /* webpackChunkName: "pages/shop/index" */))
const _3994eccb = () => interopDefault(import('..\\pages\\vendor-dashboard\\index.vue' /* webpackChunkName: "pages/vendor-dashboard/index" */))
const _7b1ac871 = () => interopDefault(import('..\\pages\\blog\\blog-2.vue' /* webpackChunkName: "pages/blog/blog-2" */))
const _7b28dff2 = () => interopDefault(import('..\\pages\\blog\\blog-3.vue' /* webpackChunkName: "pages/blog/blog-3" */))
const _057e937e = () => interopDefault(import('..\\pages\\blog\\blog-single-2.vue' /* webpackChunkName: "pages/blog/blog-single-2" */))
const _81a60826 = () => interopDefault(import('..\\pages\\cart\\cart-2.vue' /* webpackChunkName: "pages/cart/cart-2" */))
const _8189d924 = () => interopDefault(import('..\\pages\\cart\\cart-3.vue' /* webpackChunkName: "pages/cart/cart-3" */))
const _816daa22 = () => interopDefault(import('..\\pages\\cart\\cart-4.vue' /* webpackChunkName: "pages/cart/cart-4" */))
const _5e839570 = () => interopDefault(import('..\\pages\\cart\\empty-cart.vue' /* webpackChunkName: "pages/cart/empty-cart" */))
const _25cea383 = () => interopDefault(import('..\\pages\\contact-us\\contact-us-2.vue' /* webpackChunkName: "pages/contact-us/contact-us-2" */))
const _eb0edb02 = () => interopDefault(import('..\\pages\\crud\\clientes.vue' /* webpackChunkName: "pages/crud/clientes" */))
const _80646296 = () => interopDefault(import('..\\pages\\crud\\cupones.vue' /* webpackChunkName: "pages/crud/cupones" */))
const _d3027a5e = () => interopDefault(import('..\\pages\\crud\\descuentos.vue' /* webpackChunkName: "pages/crud/descuentos" */))
const _456832b2 = () => interopDefault(import('..\\pages\\crud\\empleados.vue' /* webpackChunkName: "pages/crud/empleados" */))
const _2ac70692 = () => interopDefault(import('..\\pages\\crud\\inventario.vue' /* webpackChunkName: "pages/crud/inventario" */))
const _3d81a71a = () => interopDefault(import('..\\pages\\crud\\ocasiones.vue' /* webpackChunkName: "pages/crud/ocasiones" */))
const _52831186 = () => interopDefault(import('..\\pages\\crud\\productos.vue' /* webpackChunkName: "pages/crud/productos" */))
const _874dc232 = () => interopDefault(import('..\\pages\\crud\\roles.vue' /* webpackChunkName: "pages/crud/roles" */))
const _1a40da36 = () => interopDefault(import('..\\pages\\crud\\tallas.vue' /* webpackChunkName: "pages/crud/tallas" */))
const _36d8b892 = () => interopDefault(import('..\\pages\\crud\\temporadas.vue' /* webpackChunkName: "pages/crud/temporadas" */))
const _9771746a = () => interopDefault(import('..\\pages\\crud\\usuarios.vue' /* webpackChunkName: "pages/crud/usuarios" */))
const _7c5fd6be = () => interopDefault(import('..\\pages\\my-account\\account-details.vue' /* webpackChunkName: "pages/my-account/account-details" */))
const _8650f076 = () => interopDefault(import('..\\pages\\my-account\\account-info-edit.vue' /* webpackChunkName: "pages/my-account/account-info-edit" */))
const _bf0bba84 = () => interopDefault(import('..\\pages\\my-account\\addresses.vue' /* webpackChunkName: "pages/my-account/addresses" */))
const _155a21fe = () => interopDefault(import('..\\pages\\my-account\\checkout-1.vue' /* webpackChunkName: "pages/my-account/checkout-1" */))
const _1568397f = () => interopDefault(import('..\\pages\\my-account\\checkout-2.vue' /* webpackChunkName: "pages/my-account/checkout-2" */))
const _5fcfc8fe = () => interopDefault(import('..\\pages\\my-account\\compare.vue' /* webpackChunkName: "pages/my-account/compare" */))
const _9e23b8f2 = () => interopDefault(import('..\\pages\\my-account\\downloads.vue' /* webpackChunkName: "pages/my-account/downloads" */))
const _036d722c = () => interopDefault(import('..\\pages\\my-account\\order-tracking.vue' /* webpackChunkName: "pages/my-account/order-tracking" */))
const _359213f9 = () => interopDefault(import('..\\pages\\my-account\\orders.vue' /* webpackChunkName: "pages/my-account/orders" */))
const _1d37a7d9 = () => interopDefault(import('..\\pages\\my-account\\wishlist.vue' /* webpackChunkName: "pages/my-account/wishlist" */))
const _60597ace = () => interopDefault(import('..\\pages\\otras-paginas\\jackets.vue' /* webpackChunkName: "pages/otras-paginas/jackets" */))
const _e9b89bf6 = () => interopDefault(import('..\\pages\\otras-paginas\\pants.vue' /* webpackChunkName: "pages/otras-paginas/pants" */))
const _32e8c193 = () => interopDefault(import('..\\pages\\otras-paginas\\sueteres.vue' /* webpackChunkName: "pages/otras-paginas/sueteres" */))
const _1d94063c = () => interopDefault(import('..\\pages\\product\\product-single-2.vue' /* webpackChunkName: "pages/product/product-single-2" */))
const _1d77d73a = () => interopDefault(import('..\\pages\\product\\product-single-3.vue' /* webpackChunkName: "pages/product/product-single-3" */))
const _1d5ba838 = () => interopDefault(import('..\\pages\\product\\product-single-4.vue' /* webpackChunkName: "pages/product/product-single-4" */))
const _1d3f7936 = () => interopDefault(import('..\\pages\\product\\product-single-5.vue' /* webpackChunkName: "pages/product/product-single-5" */))
const _1d234a34 = () => interopDefault(import('..\\pages\\product\\product-single-6.vue' /* webpackChunkName: "pages/product/product-single-6" */))
const _1d071b32 = () => interopDefault(import('..\\pages\\product\\product-single-7.vue' /* webpackChunkName: "pages/product/product-single-7" */))
const _1ceaec30 = () => interopDefault(import('..\\pages\\product\\product-single-8.vue' /* webpackChunkName: "pages/product/product-single-8" */))
const _2e23e242 = () => interopDefault(import('..\\pages\\productosHombres\\camisas.vue' /* webpackChunkName: "pages/productosHombres/camisas" */))
const _fd60c108 = () => interopDefault(import('..\\pages\\productosHombres\\jackets.vue' /* webpackChunkName: "pages/productosHombres/jackets" */))
const _138ad730 = () => interopDefault(import('..\\pages\\productosHombres\\pantalones.vue' /* webpackChunkName: "pages/productosHombres/pantalones" */))
const _44eb824a = () => interopDefault(import('..\\pages\\productosHombres\\pantalonetas.vue' /* webpackChunkName: "pages/productosHombres/pantalonetas" */))
const _49d1ab9a = () => interopDefault(import('..\\pages\\productosHombres\\pants.vue' /* webpackChunkName: "pages/productosHombres/pants" */))
const _2a160468 = () => interopDefault(import('..\\pages\\productosHombres\\playeras.vue' /* webpackChunkName: "pages/productosHombres/playeras" */))
const _30b732a5 = () => interopDefault(import('..\\pages\\productosHombres\\sueteres.vue' /* webpackChunkName: "pages/productosHombres/sueteres" */))
const _744d1f64 = () => interopDefault(import('..\\pages\\productosHombres\\trajes.vue' /* webpackChunkName: "pages/productosHombres/trajes" */))
const _34def219 = () => interopDefault(import('..\\pages\\shop\\shop-2.vue' /* webpackChunkName: "pages/shop/shop-2" */))
const _34ed099a = () => interopDefault(import('..\\pages\\shop\\shop-3.vue' /* webpackChunkName: "pages/shop/shop-3" */))
const _34fb211b = () => interopDefault(import('..\\pages\\shop\\shop-4.vue' /* webpackChunkName: "pages/shop/shop-4" */))
const _3509389c = () => interopDefault(import('..\\pages\\shop\\shop-5.vue' /* webpackChunkName: "pages/shop/shop-5" */))
const _3c8c6308 = () => interopDefault(import('..\\pages\\vendor-dashboard\\add-product.vue' /* webpackChunkName: "pages/vendor-dashboard/add-product" */))
const _525fad47 = () => interopDefault(import('..\\pages\\vendor-dashboard\\order.vue' /* webpackChunkName: "pages/vendor-dashboard/order" */))
const _33fea072 = () => interopDefault(import('..\\pages\\vendor-dashboard\\orderClient.vue' /* webpackChunkName: "pages/vendor-dashboard/orderClient" */))
const _83f5b3b0 = () => interopDefault(import('..\\pages\\vendor-dashboard\\product.vue' /* webpackChunkName: "pages/vendor-dashboard/product" */))
const _2184f5e2 = () => interopDefault(import('..\\pages\\vendor-dashboard\\profile.vue' /* webpackChunkName: "pages/vendor-dashboard/profile" */))
const _0fa4cf09 = () => interopDefault(import('..\\pages\\vendor-dashboard\\setting.vue' /* webpackChunkName: "pages/vendor-dashboard/setting" */))
const _2a00bbfa = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _5062aa50 = () => interopDefault(import('..\\pages\\blog\\_slug.vue' /* webpackChunkName: "pages/blog/_slug" */))
const _2f2edf9a = () => interopDefault(import('..\\pages\\product\\_id.vue' /* webpackChunkName: "pages/product/_id" */))

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
    name: "404"
  }, {
    path: "/about-us",
    component: _038e5ff1,
    name: "about-us"
  }, {
    path: "/blog",
    component: _e9a3aea6,
    name: "blog"
  }, {
    path: "/cart",
    component: _6010626f,
    name: "cart"
  }, {
    path: "/coming-soon",
    component: _52008e84,
    name: "coming-soon"
  }, {
    path: "/contact-us",
    component: _4b6a3cf8,
    name: "contact-us"
  }, {
    path: "/electronics",
    component: _c9f4b198,
    name: "electronics"
  }, {
    path: "/faq",
    component: _c3517b5a,
    name: "faq"
  }, {
    path: "/faqAdmin",
    component: _b9773f3e,
    name: "faqAdmin"
  }, {
    path: "/furniture",
    component: _2b5c316f,
    name: "furniture"
  }, {
    path: "/grocery",
    component: _3dcadb6c,
    name: "grocery"
  }, {
    path: "/login",
    component: _3ecc2034,
    name: "login"
  }, {
    path: "/lookbook",
    component: _67f9881b,
    name: "lookbook"
  }, {
    path: "/my-account",
    component: _7e081343,
    name: "my-account"
  }, {
    path: "/pharmacy",
    component: _b68a3574,
    name: "pharmacy"
  }, {
    path: "/privacy-policy",
    component: _3b3c696a,
    name: "privacy-policy"
  }, {
    path: "/register",
    component: _4fb55194,
    name: "register"
  }, {
    path: "/shop",
    component: _4087e0d9,
    name: "shop"
  }, {
    path: "/vendor-dashboard",
    component: _2205d260,
    name: "vendor-dashboard"
  }, {
    path: "/blog/blog-2",
    component: _64a18dfc,
    name: "blog-blog-2"
  }, {
    path: "/blog/blog-3",
    component: _64afa57d,
    name: "blog-blog-3"
  }, {
    path: "/blog/blog-single-2",
    component: _28038b93,
    name: "blog-blog-single-2"
  }, {
    path: "/cart/cart-2",
    component: _ae987d10,
    name: "cart-cart-2"
  }, {
    path: "/cart/cart-3",
    component: _ae7c4e0e,
    name: "cart-cart-3"
  }, {
    path: "/cart/cart-4",
    component: _ae601f0c,
    name: "cart-cart-4"
  }, {
    path: "/cart/empty-cart",
    component: _67013d53,
    name: "cart-empty-cart"
  }, {
    path: "/contact-us/contact-us-2",
    component: _4b7a708e,
    name: "contact-us-contact-us-2"
  }, {
    path: "/crud/clientes",
    component: _2d64214a,
    name: "crud-clientes"
  }, {
    path: "/crud/cupones",
    component: _071fba8a,
    name: "crud-cupones"
  }, {
    path: "/crud/descuentos",
    component: _2cc1cadc,
    name: "crud-descuentos"
  }, {
    path: "/crud/empleados",
    component: _00230572,
    name: "crud-empleados"
  }, {
    path: "/crud/inventario",
    component: _fe40f67c,
    name: "crud-inventario"
  }, {
    path: "/crud/ocasiones",
    component: _0ff01ca2,
    name: "crud-ocasiones"
  }, {
    path: "/crud/productos",
    component: _dd767c5c,
    name: "crud-productos"
  }, {
    path: "/crud/roles",
    component: _15240808,
    name: "crud-roles"
  }, {
    path: "/crud/tallas",
    component: _47334f20,
    name: "crud-tallas"
  }, {
    path: "/crud/temporadas",
    component: _65c87ec6,
    name: "crud-temporadas"
  }, {
    path: "/crud/usuarios",
    component: _5732d496,
    name: "crud-usuarios"
  }, {
    path: "/my-account/account-details",
    component: _5009e9d3,
    name: "my-account-account-details"
  }, {
    path: "/my-account/account-info-edit",
    component: _4e49299a,
    name: "my-account-account-info-edit"
  }, {
    path: "/my-account/addresses",
    component: _35a16993,
    name: "my-account-addresses"
  }, {
    path: "/my-account/checkout-1",
    component: _251bb5c9,
    name: "my-account-checkout-1"
  }, {
    path: "/my-account/checkout-2",
    component: _2529cd4a,
    name: "my-account-checkout-2"
  }, {
    path: "/my-account/compare",
    component: _1ac5d8d4,
    name: "my-account-compare"
  }, {
    path: "/my-account/downloads",
    component: _46156a5c,
    name: "my-account-downloads"
  }, {
    path: "/my-account/order-tracking",
    component: _6835fd35,
    name: "my-account-order-tracking"
  }, {
    path: "/my-account/orders",
    component: _47334544,
    name: "my-account-orders"
  }, {
    path: "/my-account/wishlist",
    component: _4b51b264,
    name: "my-account-wishlist"
  }, {
    path: "/otras-paginas/jackets",
    component: _701b0e99,
    name: "otras-paginas-jackets"
  }, {
    path: "/otras-paginas/pants",
    component: _8d8486e0,
    name: "otras-paginas-pants"
  }, {
    path: "/otras-paginas/sueteres",
    component: _1b59a728,
    name: "otras-paginas-sueteres"
  }, {
    path: "/product/product-single-2",
    component: _fdf85d92,
    name: "product-product-single-2"
  }, {
    path: "/product/product-single-3",
    component: _fddc2e90,
    name: "product-product-single-3"
  }, {
    path: "/product/product-single-4",
    component: _fdbfff8e,
    name: "product-product-single-4"
  }, {
    path: "/product/product-single-5",
    component: _fda3d08c,
    name: "product-product-single-5"
  }, {
    path: "/product/product-single-6",
    component: _fd87a18a,
    name: "product-product-single-6"
  }, {
    path: "/product/product-single-7",
    component: _fd6b7288,
    name: "product-product-single-7"
  }, {
    path: "/product/product-single-8",
    component: _fd4f4386,
    name: "product-product-single-8"
  }, {
    path: "/productosHombres/camisas",
    component: _841c92d2,
    name: "productosHombres-camisas"
  }, {
    path: "/productosHombres/jackets",
    component: _111d73d1,
    name: "productosHombres-jackets"
  }, {
    path: "/productosHombres/pantalones",
    component: _d05a381a,
    name: "productosHombres-pantalones"
  }, {
    path: "/productosHombres/pantalonetas",
    component: _7a4cd7a6,
    name: "productosHombres-pantalonetas"
  }, {
    path: "/productosHombres/pants",
    component: _78efe070,
    name: "productosHombres-pants"
  }, {
    path: "/productosHombres/playeras",
    component: _54e1b417,
    name: "productosHombres-playeras"
  }, {
    path: "/productosHombres/sueteres",
    component: _cab82e20,
    name: "productosHombres-sueteres"
  }, {
    path: "/productosHombres/trajes",
    component: _28f5854e,
    name: "productosHombres-trajes"
  }, {
    path: "/shop/shop-2",
    component: _1e65b7a4,
    name: "shop-shop-2"
  }, {
    path: "/shop/shop-3",
    component: _1e73cf25,
    name: "shop-shop-3"
  }, {
    path: "/shop/shop-4",
    component: _1e81e6a6,
    name: "shop-shop-4"
  }, {
    path: "/shop/shop-5",
    component: _1e8ffe27,
    name: "shop-shop-5"
  }, {
    path: "/vendor-dashboard/add-product",
    component: _732b7051,
    name: "vendor-dashboard-add-product"
  }, {
    path: "/vendor-dashboard/order",
    component: _3ad092dc,
    name: "vendor-dashboard-order"
  }, {
    path: "/vendor-dashboard/orderClient",
    component: _751f7b72,
    name: "vendor-dashboard-orderClient"
  }, {
    path: "/vendor-dashboard/product",
    component: _4dd2fa7d,
    name: "vendor-dashboard-product"
  }, {
    path: "/vendor-dashboard/profile",
    component: _9d5a6b92,
    name: "vendor-dashboard-profile"
  }, {
    path: "/vendor-dashboard/setting",
    component: _c11ab944,
    name: "vendor-dashboard-setting"
  }, {
    path: "/",
    component: _16f24ccf,
    name: "index"
  }, {
    path: "/blog/:slug",
    component: _ed10f136,
    name: "blog-slug"
  }, {
    path: "/product/:id?",
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
