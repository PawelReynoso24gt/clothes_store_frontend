export { default as Footer } from '../..\\components\\Footer.vue'
export { default as Header } from '../..\\components\\Header.vue'
export { default as BlogItem1 } from '../..\\components\\blog\\BlogItem1.vue'
export { default as BlogItem2 } from '../..\\components\\blog\\BlogItem2.vue'
export { default as BlogItem3 } from '../..\\components\\blog\\BlogItem3.vue'
export { default as BlogSidebar } from '../..\\components\\blog\\BlogSidebar.vue'
export { default as BlogSidebar2 } from '../..\\components\\blog\\BlogSidebar2.vue'
export { default as InstagramArea } from '../..\\components\\instagram\\InstagramArea.vue'
export { default as InstagramAreaElectronics } from '../..\\components\\instagram\\InstagramAreaElectronics.vue'
export { default as InstagramAreaFurniture } from '../..\\components\\instagram\\InstagramAreaFurniture.vue'
export { default as InstagramSliderItem } from '../..\\components\\instagram\\InstagramSliderItem.vue'
export { default as WidgetsRelatedProducts } from '../..\\components\\widgets\\RelatedProducts.vue'
export { default as WidgetsShopSidebar } from '../..\\components\\widgets\\ShopSidebar.vue'
export { default as WidgetsTimer } from '../..\\components\\widgets\\Timer.vue'
export { default as ProductBox1 } from '../..\\components\\product-box\\ProductBox1.vue'
export { default as ProductBox2 } from '../..\\components\\product-box\\ProductBox2.vue'
export { default as ProductBox3 } from '../..\\components\\product-box\\ProductBox3.vue'
export { default as ProductBox4 } from '../..\\components\\product-box\\ProductBox4.vue'
export { default as ProductBox5 } from '../..\\components\\product-box\\ProductBox5.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
