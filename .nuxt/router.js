import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _29224d41 = () => interopDefault(import('..\\pages\\404.vue' /* webpackChunkName: "pages/404" */))
const _5c3371a5 = () => interopDefault(import('..\\pages\\about-us.vue' /* webpackChunkName: "pages/about-us" */))
const _3c754a79 = () => interopDefault(import('..\\pages\\blog\\index.vue' /* webpackChunkName: "pages/blog/index" */))
const _1157843b = () => interopDefault(import('..\\pages\\cart\\index.vue' /* webpackChunkName: "pages/cart/index" */))
const _0347b050 = () => interopDefault(import('..\\pages\\coming-soon.vue' /* webpackChunkName: "pages/coming-soon" */))
const _0f6c7a50 = () => interopDefault(import('..\\pages\\contact-us\\index.vue' /* webpackChunkName: "pages/contact-us/index" */))
const _4c4cc900 = () => interopDefault(import('..\\pages\\electronics.vue' /* webpackChunkName: "pages/electronics" */))
const _55da1fc2 = () => interopDefault(import('..\\pages\\faq.vue' /* webpackChunkName: "pages/faq" */))
const _5f2eb520 = () => interopDefault(import('..\\pages\\faqAdmin.vue' /* webpackChunkName: "pages/faqAdmin" */))
const _314d538a = () => interopDefault(import('..\\pages\\furniture.vue' /* webpackChunkName: "pages/furniture" */))
const _591b0bd4 = () => interopDefault(import('..\\pages\\grocery.vue' /* webpackChunkName: "pages/grocery" */))
const _57215ab2 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _7ec2cc62 = () => interopDefault(import('..\\pages\\lookbook.vue' /* webpackChunkName: "pages/lookbook" */))
const _99aca7e2 = () => interopDefault(import('..\\pages\\my-account\\index.vue' /* webpackChunkName: "pages/my-account/index" */))
const _0540120c = () => interopDefault(import('..\\pages\\pharmacy.vue' /* webpackChunkName: "pages/pharmacy" */))
const _3ff2641e = () => interopDefault(import('..\\pages\\privacy-policy.vue' /* webpackChunkName: "pages/privacy-policy" */))
const _30ca68ea = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _1c61fab6 = () => interopDefault(import('..\\pages\\shop\\index.vue' /* webpackChunkName: "pages/shop/index" */))
const _150ca22c = () => interopDefault(import('..\\pages\\vendor-dashboard\\index.vue' /* webpackChunkName: "pages/vendor-dashboard/index" */))
const _2d25d107 = () => interopDefault(import('..\\pages\\vendor-dashboardA\\index.vue' /* webpackChunkName: "pages/vendor-dashboardA/index" */))
const _4782b4a0 = () => interopDefault(import('..\\pages\\blog\\blog-2.vue' /* webpackChunkName: "pages/blog/blog-2" */))
const _4766859e = () => interopDefault(import('..\\pages\\blog\\blog-3.vue' /* webpackChunkName: "pages/blog/blog-3" */))
const _c9bbbd42 = () => interopDefault(import('..\\pages\\blog\\blog-single-2.vue' /* webpackChunkName: "pages/blog/blog-single-2" */))
const _2050d92c = () => interopDefault(import('..\\pages\\cart\\cart-2.vue' /* webpackChunkName: "pages/cart/cart-2" */))
const _205ef0ad = () => interopDefault(import('..\\pages\\cart\\cart-3.vue' /* webpackChunkName: "pages/cart/cart-3" */))
const _206d082e = () => interopDefault(import('..\\pages\\cart\\cart-4.vue' /* webpackChunkName: "pages/cart/cart-4" */))
const _16235b07 = () => interopDefault(import('..\\pages\\cart\\empty-cart.vue' /* webpackChunkName: "pages/cart/empty-cart" */))
const _8d64cb7c = () => interopDefault(import('..\\pages\\contact-us\\contact-us-2.vue' /* webpackChunkName: "pages/contact-us/contact-us-2" */))
const _321a1bfe = () => interopDefault(import('..\\pages\\crud\\clientes.vue' /* webpackChunkName: "pages/crud/clientes" */))
const _f9b4cd54 = () => interopDefault(import('..\\pages\\crud\\cupones.vue' /* webpackChunkName: "pages/crud/cupones" */))
const _48382ee0 = () => interopDefault(import('..\\pages\\crud\\descuentos.vue' /* webpackChunkName: "pages/crud/descuentos" */))
const _dc104dda = () => interopDefault(import('..\\pages\\crud\\empleados.vue' /* webpackChunkName: "pages/crud/empleados" */))
const _3001a276 = () => interopDefault(import('..\\pages\\crud\\inventario.vue' /* webpackChunkName: "pages/crud/inventario" */))
const _ebdd650a = () => interopDefault(import('..\\pages\\crud\\ocasiones.vue' /* webpackChunkName: "pages/crud/ocasiones" */))
const _234e1d9e = () => interopDefault(import('..\\pages\\crud\\productos.vue' /* webpackChunkName: "pages/crud/productos" */))
const _b295c470 = () => interopDefault(import('..\\pages\\crud\\roles.vue' /* webpackChunkName: "pages/crud/roles" */))
const _54037024 = () => interopDefault(import('..\\pages\\crud\\tallas.vue' /* webpackChunkName: "pages/crud/tallas" */))
const _7c3dde51 = () => interopDefault(import('..\\pages\\crud\\temporadas.vue' /* webpackChunkName: "pages/crud/temporadas" */))
const _5be8cf4a = () => interopDefault(import('..\\pages\\crud\\usuarios.vue' /* webpackChunkName: "pages/crud/usuarios" */))
const _7f6818c2 = () => interopDefault(import('..\\pages\\my-account\\account-details.vue' /* webpackChunkName: "pages/my-account/account-details" */))
const _93a01f34 = () => interopDefault(import('..\\pages\\my-account\\account-info-edit.vue' /* webpackChunkName: "pages/my-account/account-info-edit" */))
const _5b71bc5f = () => interopDefault(import('..\\pages\\my-account\\addresses.vue' /* webpackChunkName: "pages/my-account/addresses" */))
const _8d548706 = () => interopDefault(import('..\\pages\\my-account\\checkout-1.vue' /* webpackChunkName: "pages/my-account/checkout-1" */))
const _8d385804 = () => interopDefault(import('..\\pages\\my-account\\checkout-2.vue' /* webpackChunkName: "pages/my-account/checkout-2" */))
const _65bba962 = () => interopDefault(import('..\\pages\\my-account\\compare.vue' /* webpackChunkName: "pages/my-account/compare" */))
const _6be5bd28 = () => interopDefault(import('..\\pages\\my-account\\downloads.vue' /* webpackChunkName: "pages/my-account/downloads" */))
const _a434ec2e = () => interopDefault(import('..\\pages\\my-account\\order-tracking.vue' /* webpackChunkName: "pages/my-account/order-tracking" */))
const _93767410 = () => interopDefault(import('..\\pages\\my-account\\orders.vue' /* webpackChunkName: "pages/my-account/orders" */))
const _3c05d618 = () => interopDefault(import('..\\pages\\my-account\\wishlist.vue' /* webpackChunkName: "pages/my-account/wishlist" */))
const _0455154d = () => interopDefault(import('..\\pages\\otras-paginas\\jackets.vue' /* webpackChunkName: "pages/otras-paginas/jackets" */))
const _ac1c3f78 = () => interopDefault(import('..\\pages\\otras-paginas\\pants.vue' /* webpackChunkName: "pages/otras-paginas/pants" */))
const _0e6076f4 = () => interopDefault(import('..\\pages\\otras-paginas\\sueteres.vue' /* webpackChunkName: "pages/otras-paginas/sueteres" */))
const _64d443fa = () => interopDefault(import('..\\pages\\product\\product-single-2.vue' /* webpackChunkName: "pages/product/product-single-2" */))
const _64b814f8 = () => interopDefault(import('..\\pages\\product\\product-single-3.vue' /* webpackChunkName: "pages/product/product-single-3" */))
const _649be5f6 = () => interopDefault(import('..\\pages\\product\\product-single-4.vue' /* webpackChunkName: "pages/product/product-single-4" */))
const _647fb6f4 = () => interopDefault(import('..\\pages\\product\\product-single-5.vue' /* webpackChunkName: "pages/product/product-single-5" */))
const _646387f2 = () => interopDefault(import('..\\pages\\product\\product-single-6.vue' /* webpackChunkName: "pages/product/product-single-6" */))
const _644758f0 = () => interopDefault(import('..\\pages\\product\\product-single-7.vue' /* webpackChunkName: "pages/product/product-single-7" */))
const _642b29ee = () => interopDefault(import('..\\pages\\product\\product-single-8.vue' /* webpackChunkName: "pages/product/product-single-8" */))
const _0a83c363 = () => interopDefault(import('..\\pages\\productosHombres\\camisas.vue' /* webpackChunkName: "pages/productosHombres/camisas" */))
const _5daf809d = () => interopDefault(import('..\\pages\\productosHombres\\jackets.vue' /* webpackChunkName: "pages/productosHombres/jackets" */))
const _2fd213a7 = () => interopDefault(import('..\\pages\\productosHombres\\pantalones.vue' /* webpackChunkName: "pages/productosHombres/pantalones" */))
const _0f3eea5a = () => interopDefault(import('..\\pages\\productosHombres\\pantalonetas.vue' /* webpackChunkName: "pages/productosHombres/pantalonetas" */))
const _92e240d8 = () => interopDefault(import('..\\pages\\productosHombres\\pants.vue' /* webpackChunkName: "pages/productosHombres/pants" */))
const _cadd7e6a = () => interopDefault(import('..\\pages\\productosHombres\\playeras.vue' /* webpackChunkName: "pages/productosHombres/playeras" */))
const _3f5914b8 = () => interopDefault(import('..\\pages\\productosHombres\\sueteres.vue' /* webpackChunkName: "pages/productosHombres/sueteres" */))
const _5958670d = () => interopDefault(import('..\\pages\\productosHombres\\trajes.vue' /* webpackChunkName: "pages/productosHombres/trajes" */))
const _d3fa6150 = () => interopDefault(import('..\\pages\\shop\\shop-2.vue' /* webpackChunkName: "pages/shop/shop-2" */))
const _d3de324e = () => interopDefault(import('..\\pages\\shop\\shop-3.vue' /* webpackChunkName: "pages/shop/shop-3" */))
const _d3c2034c = () => interopDefault(import('..\\pages\\shop\\shop-4.vue' /* webpackChunkName: "pages/shop/shop-4" */))
const _d3a5d44a = () => interopDefault(import('..\\pages\\shop\\shop-5.vue' /* webpackChunkName: "pages/shop/shop-5" */))
const _49db91c6 = () => interopDefault(import('..\\pages\\vendor-dashboard\\add-product.vue' /* webpackChunkName: "pages/vendor-dashboard/add-product" */))
const _2dd762a8 = () => interopDefault(import('..\\pages\\vendor-dashboard\\order.vue' /* webpackChunkName: "pages/vendor-dashboard/order" */))
const _2d570913 = () => interopDefault(import('..\\pages\\vendor-dashboard\\orderClient.vue' /* webpackChunkName: "pages/vendor-dashboard/orderClient" */))
const _cb35f16e = () => interopDefault(import('..\\pages\\vendor-dashboard\\product.vue' /* webpackChunkName: "pages/vendor-dashboard/product" */))
const _043651fa = () => interopDefault(import('..\\pages\\vendor-dashboard\\profile.vue' /* webpackChunkName: "pages/vendor-dashboard/profile" */))
const _27f69fac = () => interopDefault(import('..\\pages\\vendor-dashboard\\setting.vue' /* webpackChunkName: "pages/vendor-dashboard/setting" */))
const _5c0595b8 = () => interopDefault(import('..\\pages\\vendor-dashboardA\\add-product.vue' /* webpackChunkName: "pages/vendor-dashboardA/add-product" */))
const _45f09183 = () => interopDefault(import('..\\pages\\vendor-dashboardA\\order.vue' /* webpackChunkName: "pages/vendor-dashboardA/order" */))
const _a36b30a4 = () => interopDefault(import('..\\pages\\vendor-dashboardA\\orderClient.vue' /* webpackChunkName: "pages/vendor-dashboardA/orderClient" */))
const _10edeb64 = () => interopDefault(import('..\\pages\\vendor-dashboardA\\product.vue' /* webpackChunkName: "pages/vendor-dashboardA/product" */))
const _746dbb1e = () => interopDefault(import('..\\pages\\vendor-dashboardA\\profile.vue' /* webpackChunkName: "pages/vendor-dashboardA/profile" */))
const _628d9445 = () => interopDefault(import('..\\pages\\vendor-dashboardA\\setting.vue' /* webpackChunkName: "pages/vendor-dashboardA/setting" */))
const _e50c90ca = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _3abea931 = () => interopDefault(import('..\\pages\\blog\\_slug.vue' /* webpackChunkName: "pages/blog/_slug" */))
const _498c6d72 = () => interopDefault(import('..\\pages\\product\\_id.vue' /* webpackChunkName: "pages/product/_id" */))

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
    component: _29224d41,
    name: "404"
  }, {
    path: "/about-us",
    component: _5c3371a5,
    name: "about-us"
  }, {
    path: "/blog",
    component: _3c754a79,
    name: "blog"
  }, {
    path: "/cart",
    component: _1157843b,
    name: "cart"
  }, {
    path: "/coming-soon",
    component: _0347b050,
    name: "coming-soon"
  }, {
    path: "/contact-us",
    component: _0f6c7a50,
    name: "contact-us"
  }, {
    path: "/electronics",
    component: _4c4cc900,
    name: "electronics"
  }, {
    path: "/faq",
    component: _55da1fc2,
    name: "faq"
  }, {
    path: "/faqAdmin",
    component: _5f2eb520,
    name: "faqAdmin"
  }, {
    path: "/furniture",
    component: _314d538a,
    name: "furniture"
  }, {
    path: "/grocery",
    component: _591b0bd4,
    name: "grocery"
  }, {
    path: "/login",
    component: _57215ab2,
    name: "login"
  }, {
    path: "/lookbook",
    component: _7ec2cc62,
    name: "lookbook"
  }, {
    path: "/my-account",
    component: _99aca7e2,
    name: "my-account"
  }, {
    path: "/pharmacy",
    component: _0540120c,
    name: "pharmacy"
  }, {
    path: "/privacy-policy",
    component: _3ff2641e,
    name: "privacy-policy"
  }, {
    path: "/register",
    component: _30ca68ea,
    name: "register"
  }, {
    path: "/shop",
    component: _1c61fab6,
    name: "shop"
  }, {
    path: "/vendor-dashboard",
    component: _150ca22c,
    name: "vendor-dashboard"
  }, {
    path: "/vendor-dashboardA",
    component: _2d25d107,
    name: "vendor-dashboardA"
  }, {
    path: "/blog/blog-2",
    component: _4782b4a0,
    name: "blog-blog-2"
  }, {
    path: "/blog/blog-3",
    component: _4766859e,
    name: "blog-blog-3"
  }, {
    path: "/blog/blog-single-2",
    component: _c9bbbd42,
    name: "blog-blog-single-2"
  }, {
    path: "/cart/cart-2",
    component: _2050d92c,
    name: "cart-cart-2"
  }, {
    path: "/cart/cart-3",
    component: _205ef0ad,
    name: "cart-cart-3"
  }, {
    path: "/cart/cart-4",
    component: _206d082e,
    name: "cart-cart-4"
  }, {
    path: "/cart/empty-cart",
    component: _16235b07,
    name: "cart-empty-cart"
  }, {
    path: "/contact-us/contact-us-2",
    component: _8d64cb7c,
    name: "contact-us-contact-us-2"
  }, {
    path: "/crud/clientes",
    component: _321a1bfe,
    name: "crud-clientes"
  }, {
    path: "/crud/cupones",
    component: _f9b4cd54,
    name: "crud-cupones"
  }, {
    path: "/crud/descuentos",
    component: _48382ee0,
    name: "crud-descuentos"
  }, {
    path: "/crud/empleados",
    component: _dc104dda,
    name: "crud-empleados"
  }, {
    path: "/crud/inventario",
    component: _3001a276,
    name: "crud-inventario"
  }, {
    path: "/crud/ocasiones",
    component: _ebdd650a,
    name: "crud-ocasiones"
  }, {
    path: "/crud/productos",
    component: _234e1d9e,
    name: "crud-productos"
  }, {
    path: "/crud/roles",
    component: _b295c470,
    name: "crud-roles"
  }, {
    path: "/crud/tallas",
    component: _54037024,
    name: "crud-tallas"
  }, {
    path: "/crud/temporadas",
    component: _7c3dde51,
    name: "crud-temporadas"
  }, {
    path: "/crud/usuarios",
    component: _5be8cf4a,
    name: "crud-usuarios"
  }, {
    path: "/my-account/account-details",
    component: _7f6818c2,
    name: "my-account-account-details"
  }, {
    path: "/my-account/account-info-edit",
    component: _93a01f34,
    name: "my-account-account-info-edit"
  }, {
    path: "/my-account/addresses",
    component: _5b71bc5f,
    name: "my-account-addresses"
  }, {
    path: "/my-account/checkout-1",
    component: _8d548706,
    name: "my-account-checkout-1"
  }, {
    path: "/my-account/checkout-2",
    component: _8d385804,
    name: "my-account-checkout-2"
  }, {
    path: "/my-account/compare",
    component: _65bba962,
    name: "my-account-compare"
  }, {
    path: "/my-account/downloads",
    component: _6be5bd28,
    name: "my-account-downloads"
  }, {
    path: "/my-account/order-tracking",
    component: _a434ec2e,
    name: "my-account-order-tracking"
  }, {
    path: "/my-account/orders",
    component: _93767410,
    name: "my-account-orders"
  }, {
    path: "/my-account/wishlist",
    component: _3c05d618,
    name: "my-account-wishlist"
  }, {
    path: "/otras-paginas/jackets",
    component: _0455154d,
    name: "otras-paginas-jackets"
  }, {
    path: "/otras-paginas/pants",
    component: _ac1c3f78,
    name: "otras-paginas-pants"
  }, {
    path: "/otras-paginas/sueteres",
    component: _0e6076f4,
    name: "otras-paginas-sueteres"
  }, {
    path: "/product/product-single-2",
    component: _64d443fa,
    name: "product-product-single-2"
  }, {
    path: "/product/product-single-3",
    component: _64b814f8,
    name: "product-product-single-3"
  }, {
    path: "/product/product-single-4",
    component: _649be5f6,
    name: "product-product-single-4"
  }, {
    path: "/product/product-single-5",
    component: _647fb6f4,
    name: "product-product-single-5"
  }, {
    path: "/product/product-single-6",
    component: _646387f2,
    name: "product-product-single-6"
  }, {
    path: "/product/product-single-7",
    component: _644758f0,
    name: "product-product-single-7"
  }, {
    path: "/product/product-single-8",
    component: _642b29ee,
    name: "product-product-single-8"
  }, {
    path: "/productosHombres/camisas",
    component: _0a83c363,
    name: "productosHombres-camisas"
  }, {
    path: "/productosHombres/jackets",
    component: _5daf809d,
    name: "productosHombres-jackets"
  }, {
    path: "/productosHombres/pantalones",
    component: _2fd213a7,
    name: "productosHombres-pantalones"
  }, {
    path: "/productosHombres/pantalonetas",
    component: _0f3eea5a,
    name: "productosHombres-pantalonetas"
  }, {
    path: "/productosHombres/pants",
    component: _92e240d8,
    name: "productosHombres-pants"
  }, {
    path: "/productosHombres/playeras",
    component: _cadd7e6a,
    name: "productosHombres-playeras"
  }, {
    path: "/productosHombres/sueteres",
    component: _3f5914b8,
    name: "productosHombres-sueteres"
  }, {
    path: "/productosHombres/trajes",
    component: _5958670d,
    name: "productosHombres-trajes"
  }, {
    path: "/shop/shop-2",
    component: _d3fa6150,
    name: "shop-shop-2"
  }, {
    path: "/shop/shop-3",
    component: _d3de324e,
    name: "shop-shop-3"
  }, {
    path: "/shop/shop-4",
    component: _d3c2034c,
    name: "shop-shop-4"
  }, {
    path: "/shop/shop-5",
    component: _d3a5d44a,
    name: "shop-shop-5"
  }, {
    path: "/vendor-dashboard/add-product",
    component: _49db91c6,
    name: "vendor-dashboard-add-product"
  }, {
    path: "/vendor-dashboard/order",
    component: _2dd762a8,
    name: "vendor-dashboard-order"
  }, {
    path: "/vendor-dashboard/orderClient",
    component: _2d570913,
    name: "vendor-dashboard-orderClient"
  }, {
    path: "/vendor-dashboard/product",
    component: _cb35f16e,
    name: "vendor-dashboard-product"
  }, {
    path: "/vendor-dashboard/profile",
    component: _043651fa,
    name: "vendor-dashboard-profile"
  }, {
    path: "/vendor-dashboard/setting",
    component: _27f69fac,
    name: "vendor-dashboard-setting"
  }, {
    path: "/vendor-dashboardA/add-product",
    component: _5c0595b8,
    name: "vendor-dashboardA-add-product"
  }, {
    path: "/vendor-dashboardA/order",
    component: _45f09183,
    name: "vendor-dashboardA-order"
  }, {
    path: "/vendor-dashboardA/orderClient",
    component: _a36b30a4,
    name: "vendor-dashboardA-orderClient"
  }, {
    path: "/vendor-dashboardA/product",
    component: _10edeb64,
    name: "vendor-dashboardA-product"
  }, {
    path: "/vendor-dashboardA/profile",
    component: _746dbb1e,
    name: "vendor-dashboardA-profile"
  }, {
    path: "/vendor-dashboardA/setting",
    component: _628d9445,
    name: "vendor-dashboardA-setting"
  }, {
    path: "/",
    component: _e50c90ca,
    name: "index"
  }, {
    path: "/blog/:slug",
    component: _3abea931,
    name: "blog-slug"
  }, {
    path: "/product/:id?",
    component: _498c6d72,
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
