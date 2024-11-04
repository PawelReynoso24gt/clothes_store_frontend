<template>
  <div>
    <!-- Banner Area -->
    <section id="common_banner_one">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="common_banner_text">
              <h2>{{ this.title }}</h2>
              <b-breadcrumb
                :items="breadcrumbItems"
                class="bg-transparent"
              ></b-breadcrumb>
            </div>
          </div>
        </div>
      </div>
    </section>

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
                      <th class="product_thumb">Hola</th>
                      <th class="product_name">Product</th>
                      <th class="product-price">Price</th>
                      <th class="product_quantity">Quantity</th>
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
                        <label>Quantity</label>
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
          <!-- <div class="col-lg-6 col-md-6">
            <div
              class="coupon_code left"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h3>Coupon</h3>
              <div class="coupon_inner">
                <p>Enter your coupon code if you have one.</p>
                <input class="mb-2" placeholder="Coupon code" type="text" />
                <button
                  type="submit"
                  class="theme-btn-one btn-black-overlay btn_sm"
                >
                  Apply coupon
                </button>
              </div>
            </div>
          </div> -->
          <div class="col-lg-6 col-md-6">
            <div
              class="coupon_code right"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <h3>Cart Total</h3>
              <div class="coupon_inner">
                <div class="cart_subtotal">
                  <p>Subtotal</p>
                  <p class="cart_amount">${{ cartTotal }}</p>
                </div>
                <div class="cart_subtotal">
                  <p>Shipping</p>
                  <p class="cart_amount"><span>Flat Rate:</span> $25.00</p>
                </div>
                <a href="#">Calculate shipping</a>

                <div class="cart_subtotal">
                  <p>Total</p>
                  <p class="cart_amount">${{ cartTotal + 25 }}</p>
                </div>
                <!-- <div class="checkout_btn">
                  <nuxt-link
                    to="/my-account/checkout-1"
                    class="theme-btn-one btn-black-overlay btn_sm"
                    >Proceed to Checkout</nuxt-link
                  >
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="payment" style="font-size: 20px;">
        <div class="order_review bg-white">
            <div class="check-heading">
                <h2>Forma de pago</h2>
            </div>
            <div class="payment_method">
                <div class="payment_option">
                    <p style="font-size: 20px;"><b>Ingrese y llene los campos que serán usados para el pago</b></p>
                    <br>
                    <div class="form-group-pago">
                        <label for="transferencia">Pago con Transferencia Bancaria</label>
                        <input type="number" v-model="pago.transferencia" id="transferencia" class="form-control" placeholder="Monto de transferencia bancaria" />
                    </div>
                    <div class="form-group-pago">
                        <label for="banco">Banco de Transferencia</label>
                        <input type="text" v-model="pago.banco" id="banco" class="form-control" placeholder="Nombre del banco" />
                    </div>
                    <div class="form-group-pago">
                        <label for="correlativo">Correlativo de Transferencia</label>
                        <input type="text" v-model="pago.correlativo" id="correlativo" class="form-control" placeholder="Número de correlativo" />
                    </div>
                    <div class="form-group-pago">
                        <label for="tarjetaCredito">Pago con Tarjeta de Crédito</label>
                        <input type="number" v-model="pago.tarjetaCredito" id="tarjetaCredito" class="form-control" placeholder="Monto de pago con tarjeta de crédito" />
                    </div>
                    <div class="form-group-pago">
                        <label for="numeroCredito">Número de Tarjeta de Crédito</label>
                        <input type="text" v-model="pago.numeroCredito" id="numeroCredito" class="form-control" placeholder="Número de tarjeta de crédito" />
                    </div>
                    <div class="form-group-pago">
                        <label for="tarjetaDebito">Pago con Tarjeta de Débito</label>
                        <input type="number" v-model="pago.tarjetaDebito" id="tarjetaDebito" class="form-control" placeholder="Monto de pago con tarjeta de débito" />
                    </div>
                    <div class="form-group-pago">
                        <label for="numeroDebito">Número de Tarjeta de Débito</label>
                        <input type="text" v-model="pago.numeroDebito" id="numeroDebito" class="form-control" placeholder="Número de tarjeta de débito" />
                    </div>
                    <div class="form-group-pago">
                        <label for="efectivo">Pago con Efectivo</label>
                        <input type="number" v-model="pago.efectivo" id="efectivo" class="form-control" placeholder="Monto en efectivo" />
                    </div>
                    <div class="form-group-pago">
                        <label for="paypal">PayPal</label>
                        <input type="number" v-model="pago.paypal" id="paypal" class="form-control" placeholder="Monto de pago con PayPal" />
                    </div>
                </div>
            </div>
            <!-- <button class="theme-btn-one btn-black-overlay btn_sm">Place Order</button> -->
            <button @click="hacerCompra" class="buttonPay">Completar Orden</button>
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
      pago: {
        transferencia: 0.0,
        banco: "",
        correlativo: "",
        tarjetaCredito: 0.0,
        numeroCredito: "",
        tarjetaDebito: 0.0,
        numeroDebito: "",
        efectivo: 0.0,
        paypal: 0.0,
      },
      quantity: 1,
    };
  },

  computed: {
    ...mapGetters({
      cart: "cart/cartItems",
      cartTotal: "cart/cartTotalAmount",
    }),
  },

  mounted() {
    window.scrollTo(0, 0);
  },

  methods: {
    getImageUrl(path) {
      return require("@/assets/img/product-image/" + path);
    },

    discountedPrice(product) {
      const price = product.price - (product.price * product.discount) / 100;
      return price;
    },

    removeCartItem: function (product) {
      this.$store.dispatch("cart/removeCartItem", product);
    },

    async hacerCompra() {
      try {
        const response = await axios.post("http://localhost:5000/pagos/create", this.pago);
        alert("Compra realizada exitosamente!");
        console.log("Respuesta del servidor:", response.data);
        
        this.pago = {
          transferencia: 0.0,
          banco: "",
          correlativo: "",
          tarjetaCredito: 0.0,
          numeroCredito: "",
          tarjetaDebito: 0.0,
          numeroDebito: "",
          efectivo: 0.0,
          paypal: 0.0,
        };
      } catch (error) {
        console.error("Error al realizar la compra:", error);
        alert("Hubo un error al procesar el pago.");
      }
    },
  },

  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Cart page - AndShop Ecommerce Vue js, Nuxt js Template",
        },
      ],
    };
  },
};
</script>
// CSS 
<style scoped>
    .form-group-pago {
        margin-right: 1000px;
        margin-bottom: 20px;
    }

    .form-group-pago input{
        font-size: 20px;
    }

    .buttonPay {
        background-color: #4CAF50;
        color: #fff;
        padding: 10px 20px;
        border: none;
    }
</style>