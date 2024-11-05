<template>
  <div>
    <!-- Cart-Area -->
    <section id="cart_area_one" class="ptb-100">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="table_desc border-bottom-0">
              <div class="table_page table-responsive">
                <table>
                  <!-- Start Cart Table Head -->
                  <thead>
                    <tr>
                      <th class="product_remove">Remove</th>
                      <th class="product_thumb">Producto</th>
                      <th class="product_name">Descripción</th>
                      <th class="product-price">Precio</th>
                      <th class="product_quantity">Cantidad</th>
                      <th class="product_total">Total</th>
                    </tr>
                  </thead>
                  <!-- End Cart Table Head -->
                  <tbody v-if="cart.length">
                    <!-- Start Cart Single Item-->
                    <tr v-for="(item, index) in cart" :key="index">
                      <td class="product_remove">
                        <button
                          @click="removeCartItem(index)"
                          class="bg-transparent remove-btn"
                        >
                          <i class="far fa-trash-alt"></i>
                        </button>
                      </td>
                      <td class="product_thumb">
                        <nuxt-link :to="{ path: '/product/' + item.id }">
                          <img
                            :src="getImageUrl(item.images[0].src)"
                            alt="img"
                          />
                        </nuxt-link>
                      </td>
                      <td class="product_name">
                        <nuxt-link :to="{ path: '/product/' + item.id }">{{
                          item.title
                        }}</nuxt-link>
                      </td>
                      <td class="product-price">
                        ${{ discountedPrice(item) }}
                      </td>
                      <td class="product_quantity">
                        <label>Cantidad</label>
                        <input
                          min="1"
                          max="100"
                          v-model="item.quantity"
                          type="number"
                        />
                      </td>
                      <td class="product_total">
                        ${{ discountedPrice(item) * item.quantity }}
                      </td>
                    </tr>
                    <!-- End Cart Single Item-->
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td class="border-0">No Item found!</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-6">
            <div
              class="coupon_code left"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h3>Cupón</h3>
              <div class="coupon_inner">
                <p>Ingresa tu código de cupón si tienes un código</p>
                <input class="mb-2" placeholder="Código de cupón" type="text" />
                <button
                  type="submit"
                  class="theme-btn-one btn-black-overlay btn_sm"
                >
                  Aplicar cupón
                </button>
              </div>
            </div>
          </div> 
          <div class="col-lg-6 col-md-6">
            <div
              class="coupon_code right"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <h3>Total de carrito</h3>
              <div class="coupon_inner">
                <div class="cart_subtotal">
                  <p>Subtotal</p>
                  <p class="cart_amount">${{ cartTotal }}</p>
                </div>
                <div class="cart_subtotal">
                  <p>Envío</p>  
                  <p class="cart_amount"><span>Tarifa:</span> Q40.00</p>
                </div>
                <div class="cart_subtotal">
                  <p>Total</p>
                  <p class="cart_amount">${{ cartTotal + 40 }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "cart",

  data() {
    return {
      title: "Cart",
      breadcrumbItems: [
        {
          text: "Home",
          to: "/",
        },
        {
          text: "Cart",
          to: "/cart",
        },
      ],
    };
  },

  computed: {
    ...mapGetters({
      cart: "cart/cartItems",
      cartTotal: "cart/cartTotalAmount",
    }),
  },

  methods: {
    getImageUrl(path) {
      return require("@/assets/img/product-image/" + path);
    },

    discountedPrice(product) {
      const price = product.price - (product.price * product.discount) / 100;
      return price;
    },

    removeCartItem: function (index) {
      this.$store.dispatch("cart/removeCartItem", index);
    },
  },
};
</script>

<style scoped>
  .form-group-pago {
    margin-right: 1000px;
    margin-bottom: 20px;
  }

  .form-group-pago input {
    font-size: 20px;
  }

  .buttonPay {
    background-color: #4CAF50;
    color: #fff;
    padding: 10px 20px;
    border: none;
  }
</style>
