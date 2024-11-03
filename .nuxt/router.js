import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _559a7ff5 = () => interopDefault(import('..\\pages\\404.vue' /* webpackChunkName: "pages/404" */))
const _7f9a611e = () => interopDefault(import('..\\pages\\about-us.vue' /* webpackChunkName: "pages/about-us" */))
const _0eb9892d = () => interopDefault(import('..\\pages\\blog\\index.vue' /* webpackChunkName: "pages/blog/index" */))
const _38c87a22 = () => interopDefault(import('..\\pages\\cart\\index.vue' /* webpackChunkName: "pages/cart/index" */))
const _54e821f8 = () => interopDefault(import('..\\pages\\coming-soon.vue' /* webpackChunkName: "pages/coming-soon" */))
const _12ebe204 = () => interopDefault(import('..\\pages\\contact-us\\index.vue' /* webpackChunkName: "pages/contact-us/index" */))
const _1e9107b4 = () => interopDefault(import('..\\pages\\electronics.vue' /* webpackChunkName: "pages/electronics" */))
const _018b22d3 = () => interopDefault(import('..\\pages\\faq.vue' /* webpackChunkName: "pages/faq" */))
const _0345b1ef = () => interopDefault(import('..\\pages\\furniture.vue' /* webpackChunkName: "pages/furniture" */))
const _632b9a6c = () => interopDefault(import('..\\pages\\grocery.vue' /* webpackChunkName: "pages/grocery" */))
const _4657b066 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _249df79b = () => interopDefault(import('..\\pages\\lookbook.vue' /* webpackChunkName: "pages/lookbook" */))
const _92add87a = () => interopDefault(import('..\\pages\\my-account\\index.vue' /* webpackChunkName: "pages/my-account/index" */))
const _615f54c6 = () => interopDefault(import('..\\pages\\pharmacy.vue' /* webpackChunkName: "pages/pharmacy" */))
const _33af38ea = () => interopDefault(import('..\\pages\\privacy-policy.vue' /* webpackChunkName: "pages/privacy-policy" */))
const _d66c7294 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _77d97d4e = () => interopDefault(import('..\\pages\\shop\\index.vue' /* webpackChunkName: "pages/shop/index" */))
const _110472e0 = () => interopDefault(import('..\\pages\\vendor-dashboard\\index.vue' /* webpackChunkName: "pages/vendor-dashboard/index" */))
const _52823d7c = () => interopDefault(import('..\\pages\\blog\\blog-2.vue' /* webpackChunkName: "pages/blog/blog-2" */))
const _529054fd = () => interopDefault(import('..\\pages\\blog\\blog-3.vue' /* webpackChunkName: "pages/blog/blog-3" */))
const _873327da = () => interopDefault(import('..\\pages\\blog\\blog-single-2.vue' /* webpackChunkName: "pages/blog/blog-single-2" */))
const _d2d71e10 = () => interopDefault(import('..\\pages\\cart\\cart-2.vue' /* webpackChunkName: "pages/cart/cart-2" */))
const _d2baef0e = () => interopDefault(import('..\\pages\\cart\\cart-3.vue' /* webpackChunkName: "pages/cart/cart-3" */))
const _d29ec00c = () => interopDefault(import('..\\pages\\cart\\cart-4.vue' /* webpackChunkName: "pages/cart/cart-4" */))
const _0dfe2cd3 = () => interopDefault(import('..\\pages\\cart\\empty-cart.vue' /* webpackChunkName: "pages/cart/empty-cart" */))
const _3c4fe00e = () => interopDefault(import('..\\pages\\contact-us\\contact-us-2.vue' /* webpackChunkName: "pages/contact-us/contact-us-2" */))
const _25d6f0ca = () => interopDefault(import('..\\pages\\crud\\clientes.vue' /* webpackChunkName: "pages/crud/clientes" */))
const _555609ec = () => interopDefault(import('..\\pages\\crud\\cupones.vue' /* webpackChunkName: "pages/crud/cupones" */))
const _58828b48 = () => interopDefault(import('..\\pages\\crud\\descuentos.vue' /* webpackChunkName: "pages/crud/descuentos" */))
const _15d59dc7 = () => interopDefault(import('..\\pages\\crud\\empleados.vue' /* webpackChunkName: "pages/crud/empleados" */))
const _27dc7442 = () => interopDefault(import('..\\pages\\crud\\inventario.vue' /* webpackChunkName: "pages/crud/inventario" */))
const _0def122f = () => interopDefault(import('..\\pages\\crud\\ocasiones.vue' /* webpackChunkName: "pages/crud/ocasiones" */))
const _b1a83b5c = () => interopDefault(import('..\\pages\\crud\\productos.vue' /* webpackChunkName: "pages/crud/productos" */))
const _78f95c7c = () => interopDefault(import('..\\pages\\crud\\roles.vue' /* webpackChunkName: "pages/crud/roles" */))
const _6b71f020 = () => interopDefault(import('..\\pages\\crud\\tallas.vue' /* webpackChunkName: "pages/crud/tallas" */))
const _7418b01d = () => interopDefault(import('..\\pages\\crud\\temporadas.vue' /* webpackChunkName: "pages/crud/temporadas" */))
const _4fa5a416 = () => interopDefault(import('..\\pages\\crud\\usuarios.vue' /* webpackChunkName: "pages/crud/usuarios" */))
const _65c44a53 = () => interopDefault(import('..\\pages\\my-account\\account-details.vue' /* webpackChunkName: "pages/my-account/account-details" */))
const _42252bcc = () => interopDefault(import('..\\pages\\my-account\\account-info-edit.vue' /* webpackChunkName: "pages/my-account/account-info-edit" */))
const _3cce2a13 = () => interopDefault(import('..\\pages\\my-account\\addresses.vue' /* webpackChunkName: "pages/my-account/addresses" */))
const _03870549 = () => interopDefault(import('..\\pages\\my-account\\checkout-1.vue' /* webpackChunkName: "pages/my-account/checkout-1" */))
const _03951cca = () => interopDefault(import('..\\pages\\my-account\\checkout-2.vue' /* webpackChunkName: "pages/my-account/checkout-2" */))
const _f20017d4 = () => interopDefault(import('..\\pages\\my-account\\compare.vue' /* webpackChunkName: "pages/my-account/compare" */))
const _4d422adc = () => interopDefault(import('..\\pages\\my-account\\downloads.vue' /* webpackChunkName: "pages/my-account/downloads" */))
const _796d8cb5 = () => interopDefault(import('..\\pages\\my-account\\order-tracking.vue' /* webpackChunkName: "pages/my-account/order-tracking" */))
const _22b254c4 = () => interopDefault(import('..\\pages\\my-account\\orders.vue' /* webpackChunkName: "pages/my-account/orders" */))
const _434ae1e4 = () => interopDefault(import('..\\pages\\my-account\\wishlist.vue' /* webpackChunkName: "pages/my-account/wishlist" */))
const _4e865e19 = () => interopDefault(import('..\\pages\\otras-paginas\\jackets.vue' /* webpackChunkName: "pages/otras-paginas/jackets" */))
const _9d9227e0 = () => interopDefault(import('..\\pages\\otras-paginas\\pants.vue' /* webpackChunkName: "pages/otras-paginas/pants" */))
const _0a5847a8 = () => interopDefault(import('..\\pages\\otras-paginas\\sueteres.vue' /* webpackChunkName: "pages/otras-paginas/sueteres" */))
const _aa475c92 = () => interopDefault(import('..\\pages\\product\\product-single-2.vue' /* webpackChunkName: "pages/product/product-single-2" */))
const _aa2b2d90 = () => interopDefault(import('..\\pages\\product\\product-single-3.vue' /* webpackChunkName: "pages/product/product-single-3" */))
const _0c466724 = () => interopDefault(import('..\\pages\\shop\\shop-2.vue' /* webpackChunkName: "pages/shop/shop-2" */))
const _0c547ea5 = () => interopDefault(import('..\\pages\\shop\\shop-3.vue' /* webpackChunkName: "pages/shop/shop-3" */))
const _0c629626 = () => interopDefault(import('..\\pages\\shop\\shop-4.vue' /* webpackChunkName: "pages/shop/shop-4" */))
const _0c70ada7 = () => interopDefault(import('..\\pages\\shop\\shop-5.vue' /* webpackChunkName: "pages/shop/shop-5" */))
const _03cfb0d1 = () => interopDefault(import('..\\pages\\vendor-dashboard\\add-product.vue' /* webpackChunkName: "pages/vendor-dashboard/add-product" */))
const _29cf335c = () => interopDefault(import('..\\pages\\vendor-dashboard\\order.vue' /* webpackChunkName: "pages/vendor-dashboard/order" */))
const _77ab7afd = () => interopDefault(import('..\\pages\\vendor-dashboard\\product.vue' /* webpackChunkName: "pages/vendor-dashboard/product" */))
const _49a96a92 = () => interopDefault(import('..\\pages\\vendor-dashboard\\profile.vue' /* webpackChunkName: "pages/vendor-dashboard/profile" */))
const _6d69b844 = () => interopDefault(import('..\\pages\\vendor-dashboard\\setting.vue' /* webpackChunkName: "pages/vendor-dashboard/setting" */))
const _7cb00d4f = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _0d02e7e5 = () => interopDefault(import('..\\pages\\blog\\_slug.vue' /* webpackChunkName: "pages/blog/_slug" */))
const _805ff584 = () => interopDefault(import('..\\pages\\product\\_id.vue' /* webpackChunkName: "pages/product/_id" */))

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
    component: _559a7ff5,
    name: "404"
  }, {
    path: "/about-us",
    component: _7f9a611e,
    name: "about-us"
  }, {
    path: "/blog",
    component: _0eb9892d,
    name: "blog"
  }, {
    path: "/cart",
    component: _38c87a22,
    name: "cart"
  }, {
    path: "/coming-soon",
    component: _54e821f8,
    name: "coming-soon"
  }, {
    path: "/contact-us",
    component: _12ebe204,
    name: "contact-us"
  }, {
    path: "/electronics",
    component: _1e9107b4,
    name: "electronics"
  }, {
    path: "/faq",
    component: _018b22d3,
    name: "faq"
  }, {
    path: "/furniture",
    component: _0345b1ef,
    name: "furniture"
  }, {
    path: "/grocery",
    component: _632b9a6c,
    name: "grocery"
  }, {
    path: "/login",
    component: _4657b066,
    name: "login"
  }, {
    path: "/lookbook",
    component: _249df79b,
    name: "lookbook"
  }, {
    path: "/my-account",
    component: _92add87a,
    name: "my-account"
  }, {
    path: "/pharmacy",
    component: _615f54c6,
    name: "pharmacy"
  }, {
    path: "/privacy-policy",
    component: _33af38ea,
    name: "privacy-policy"
  }, {
    path: "/register",
    component: _d66c7294,
    name: "register"
  }, {
    path: "/shop",
    component: _77d97d4e,
    name: "shop"
  }, {
    path: "/vendor-dashboard",
    component: _110472e0,
    name: "vendor-dashboard"
  }, {
    path: "/blog/blog-2",
    component: _52823d7c,
    name: "blog-blog-2"
  }, {
    path: "/blog/blog-3",
    component: _529054fd,
    name: "blog-blog-3"
  }, {
    path: "/blog/blog-single-2",
    component: _873327da,
    name: "blog-blog-single-2"
  }, {
    path: "/cart/cart-2",
    component: _d2d71e10,
    name: "cart-cart-2"
  }, {
    path: "/cart/cart-3",
    component: _d2baef0e,
    name: "cart-cart-3"
  }, {
    path: "/cart/cart-4",
    component: _d29ec00c,
    name: "cart-cart-4"
  }, {
    path: "/cart/empty-cart",
    component: _0dfe2cd3,
    name: "cart-empty-cart"
  }, {
    path: "/contact-us/contact-us-2",
    component: _3c4fe00e,
    name: "contact-us-contact-us-2"
  }, {
    path: "/crud/clientes",
    component: _25d6f0ca,
    name: "crud-clientes"
  }, {
    path: "/crud/cupones",
    component: _555609ec,
    name: "crud-cupones"
  }, {
    path: "/crud/descuentos",
    component: _58828b48,
    name: "crud-descuentos"
  }, {
    path: "/crud/empleados",
    component: _15d59dc7,
    name: "crud-empleados"
  }, {
    path: "/crud/inventario",
    component: _27dc7442,
    name: "crud-inventario"
  }, {
    path: "/crud/ocasiones",
    component: _0def122f,
    name: "crud-ocasiones"
  }, {
    path: "/crud/productos",
    component: _b1a83b5c,
    name: "crud-productos"
  }, {
    path: "/crud/roles",
    component: _78f95c7c,
    name: "crud-roles"
  }, {
    path: "/crud/tallas",
    component: _6b71f020,
    name: "crud-tallas"
  }, {
    path: "/crud/temporadas",
    component: _7418b01d,
    name: "crud-temporadas"
  }, {
    path: "/crud/usuarios",
    component: _4fa5a416,
    name: "crud-usuarios"
  }, {
    path: "/my-account/account-details",
    component: _65c44a53,
    name: "my-account-account-details"
  }, {
    path: "/my-account/account-info-edit",
    component: _42252bcc,
    name: "my-account-account-info-edit"
  }, {
    path: "/my-account/addresses",
    component: _3cce2a13,
    name: "my-account-addresses"
  }, {
    path: "/my-account/checkout-1",
    component: _03870549,
    name: "my-account-checkout-1"
  }, {
    path: "/my-account/checkout-2",
    component: _03951cca,
    name: "my-account-checkout-2"
  }, {
    path: "/my-account/compare",
    component: _f20017d4,
    name: "my-account-compare"
  }, {
    path: "/my-account/downloads",
    component: _4d422adc,
    name: "my-account-downloads"
  }, {
    path: "/my-account/order-tracking",
    component: _796d8cb5,
    name: "my-account-order-tracking"
  }, {
    path: "/my-account/orders",
    component: _22b254c4,
    name: "my-account-orders"
  }, {
    path: "/my-account/wishlist",
    component: _434ae1e4,
    name: "my-account-wishlist"
  }, {
    path: "/otras-paginas/jackets",
    component: _4e865e19,
    name: "otras-paginas-jackets"
  }, {
    path: "/otras-paginas/pants",
    component: _9d9227e0,
    name: "otras-paginas-pants"
  }, {
    path: "/otras-paginas/sueteres",
    component: _0a5847a8,
    name: "otras-paginas-sueteres"
  }, {
    path: "/product/product-single-2",
    component: _aa475c92,
    name: "product-product-single-2"
  }, {
    path: "/product/product-single-3",
    component: _aa2b2d90,
    name: "product-product-single-3"
  }, {
    path: "/productosHombres/camisas",
    component: _306b91d2,
    name: "productosHombres-camisas"
  }, {
    path: "/productosHombres/jackets",
    component: _3af5f451,
    name: "productosHombres-jackets"
  }, {
    path: "/productosHombres/pantalones",
    component: _39649373,
    name: "productosHombres-pantalones"
  }, {
    path: "/productosHombres/pantalonetas",
    component: _039eb1b4,
    name: "productosHombres-pantalonetas"
  }, {
    path: "/productosHombres/playeras",
    component: _66194397,
    name: "productosHombres-playeras"
  }, {
    path: "/productosHombres/sueteres",
    component: _a8490f20,
    name: "productosHombres-sueteres"
  }, {
    path: "/productosHombres/trajes",
    component: _474aa64e,
    name: "productosHombres-trajes"
  }, {
    path: "/shop/shop-2",
    component: _0c466724,
    name: "shop-shop-2"
  }, {
    path: "/shop/shop-3",
    component: _0c547ea5,
    name: "shop-shop-3"
  }, {
    path: "/shop/shop-4",
    component: _0c629626,
    name: "shop-shop-4"
  }, {
    path: "/shop/shop-5",
    component: _0c70ada7,
    name: "shop-shop-5"
  }, {
    path: "/vendor-dashboard/add-product",
    component: _03cfb0d1,
    name: "vendor-dashboard-add-product"
  }, {
    path: "/vendor-dashboard/order",
    component: _29cf335c,
    name: "vendor-dashboard-order"
  }, {
    path: "/vendor-dashboard/product",
    component: _77ab7afd,
    name: "vendor-dashboard-product"
  }, {
    path: "/vendor-dashboard/profile",
    component: _49a96a92,
    name: "vendor-dashboard-profile"
  }, {
    path: "/vendor-dashboard/setting",
    component: _6d69b844,
    name: "vendor-dashboard-setting"
  }, {
    path: "/",
    component: _7cb00d4f,
    name: "index"
  }, {
    path: "/blog/:slug",
    component: _0d02e7e5,
    name: "blog-slug"
  }, {
    path: "/product/:id?",
    component: _805ff584,
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
