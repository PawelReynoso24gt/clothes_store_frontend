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
                        <button @click="removeCartItem(index)" class="bg-transparent remove-btn">
                          <i class="far fa-trash-alt"></i>
                        </button>
                      </td>
                      <td class="product_thumb">
                        <nuxt-link :to="{ path: '/product/' + item.id }">
                          <img :src="getImageUrl(item.images[0].src)" alt="img" />
                        </nuxt-link>
                      </td>
                      <td class="product_name">
                        <nuxt-link :to="{ path: '/product/' + item.id }">{{ item.title }}</nuxt-link>
                      </td>
                      <td class="product-price">${{ discountedPrice(item) }}</td>
                      <td class="product_quantity">
                        <label>Cantidad</label>
                        <input min="1" max="100" v-model="item.quantity" type="number" />
                      </td>
                      <td class="product_total">${{ discountedPrice(item) * item.quantity }}</td>
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

          <!-- Coupon and Discount Section -->
          <div class="col-lg-6 col-md-6">
            <div class="coupon_code left" data-aos="fade-up" data-aos-delay="200">
              <h3>Cupón</h3>
              <div class="coupon_inner">
                <p>Ingresa tu código de cupón si tienes un código</p>
                <input v-model="cuponCodigo" class="mb-2" placeholder="Código de cupón" type="text" />
                <button @click="validarCupon" type="button" class="theme-btn-one btn-black-overlay btn_sm">Aplicar cupón</button>
              </div>
            </div>
          </div>

          <div class="col-lg-6 col-md-6">
            <div class="coupon_code left" data-aos="fade-up" data-aos-delay="200">
              <h3>Descuento</h3>
              <div class="coupon_inner">
                <p>Selecciona un descuento disponible:</p>
                <select v-model="descuentoSeleccionado" @change="mostrarDescuentoAplicado">
                  <option value="" disabled>Seleccione un descuento</option>
                  <option v-for="descuento in descuentos" :key="descuento.idDescuento" :value="descuento">
                    {{ descuento.descripcion }} ({{ descuento.descuento }}%)
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="col-lg-6 col-md-6">
            <div class="coupon_code right">
              <h3>Total de carrito</h3>
              <div class="coupon_inner">
                <div class="cart_subtotal">
                  <p>Subtotal (con descuento):</p>
                  <p class="cart_amount">${{ subtotalConDescuento }}</p>
                </div>
                <div class="cart_subtotal">
                  <p>Total (con envío):</p>
                  <p class="cart_amount">${{ totalConEnvio }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pago -->
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
        { text: "Home", to: "/" },
        { text: "Cart", to: "/cart" },
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
      cuponCodigo: "",
      descuentos: [],
      descuentoSeleccionado: null,
      cuponAplicado: null,
    };
  },
  computed: {
    subtotalConDescuento() {
      let subtotal = this.cartTotal || 0;

      if (this.descuentoSeleccionado) {
        subtotal -= subtotal * parseFloat(this.descuentoSeleccionado.descuento) / 100;
      }

      if (this.cuponAplicado) {
        subtotal -= subtotal * parseFloat(this.cuponAplicado.descuento) / 100;
      }

      return parseFloat(subtotal.toFixed(2));
    },
    totalConEnvio() {
  const total = parseFloat((this.subtotalConDescuento + 40).toFixed(2));
  console.log("Total con envío calculado:", total); // Debug
  return total;
},
    ...mapGetters({
      cart: "cart/cartItems",
      cartTotal: "cart/cartTotalAmount",
    }),
  },
  methods: {
    getImageUrl(path) {
      return require(`@/assets/img/product-image/${path}`);
    },

    async hacerCompra() {

// Convertir los valores de pago a números para asegurarnos de que la suma sea correcta
const totalPago = parseFloat(this.pago.transferencia) + 
                parseFloat(this.pago.tarjetaCredito) + 
                parseFloat(this.pago.tarjetaDebito) + 
                parseFloat(this.pago.efectivo) + 
                parseFloat(this.pago.paypal);

// Log de la suma total
console.log("Total de pagos:", totalPago);
console.log("Total a pagar (con envío):", this.totalConEnvio);

// Verificar si la suma de los pagos es igual al total
if (totalPago !== this.totalConEnvio) {
  alert("La suma de los métodos de pago debe ser igual al total de la compra.");
  return;
}

// Guardar los datos de pago con lógica para campos vacíos
const pagoData = {
  transferencia: this.pago.transferencia || 0.0,
  banco: this.pago.banco || "Ninguno",
  correlativo: this.pago.correlativo || "-",
  tarjetaCredito: this.pago.tarjetaCredito || 0.0,
  numeroCredito: this.pago.numeroCredito || "-",
  tarjetaDebito: this.pago.tarjetaDebito || 0.0,
  numeroDebito: this.pago.numeroDebito || "-",
  efectivo: this.pago.efectivo || 0.0,
  paypal: this.pago.paypal || 0.0
};

try {
  const pagoResponse = await axios.post("http://localhost:5000/pagos/create", pagoData);
  const idPago = pagoResponse.data.idPago; // Obtener el ID del pago creado

  // Comprobar el ID del cupón
  let idCupon = null; // Inicializar idCupon como null
  if (this.cuponCodigo) {
    try {
      const cuponResponse = await axios.get(`http://localhost:5000/cupones/${this.cuponCodigo}`);
      idCupon = cuponResponse.data.idCupon; // Asumimos que la respuesta incluye el idCupon
    } catch (error) {
      console.error("Error al validar el cupón:", error);
      alert("El cupón ingresado no es válido.");
    }
  }

  // Construir el objeto para la venta
  const productos = this.cart.map(item => ({
    idInventario: item.idInventario, // Extraer el idInventario del producto
    cantidad: item.quantity // Extraer la cantidad del carrito
  }));

  const fechaVenta = new Date().toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'

  const ventaData = {
    fechaVenta,
    idCliente: 1, // Asegúrate de obtener este ID de forma dinámica según tu lógica de usuario
    idPago, // Usar el ID del pago creado
    idDescuento: this.descuentoSeleccionado ? this.descuentoSeleccionado.idDescuento : null,
    idCupon, // Asignar el idCupon obtenido
    productos
  };

  console.log("Datos que se enviarán al servidor:", JSON.stringify(ventaData, null, 2));

  const response = await axios.post("http://localhost:5000/ventas/createVenta", ventaData);

  console.log("Respuesta del servidor:", response.data);

  const idVenta = response.data.venta.idVenta;


const fechaEnvio = fechaVenta;
const fechaRecepcion = new Date(new Date(fechaVenta).setDate(new Date(fechaVenta).getDate() + 3)).toISOString().split('T')[0];

const envioData = {
  fechaEnvio,
  fechaRecepcion,
  idVenta
};

console.log("Datos de envío a enviar:", JSON.stringify(envioData, null, 2));
await axios.post("http://localhost:5000/envios/create", envioData);

alert("Compra y envío realizados exitosamente!");

  // Reiniciar el carrito y campos de pago después de la compra
  // Limpiar el carrito después de realizar la compra
  for (let i = this.cart.length - 1; i >= 0; i--) {
    this.removeCartItem(i);
  }
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
  this.cuponCodigo = "";
  this.descuentoSeleccionado = null;
} catch (error) {
  console.error("Error al realizar la compra:", error);
  alert("Hubo un error al procesar el pago.");
}
},


    discountedPrice(product) {
      const price = product.price - (product.price * product.discount) / 100;
      return price.toFixed(2);
    },
    async validarCupon() {
      if (!this.cuponCodigo) return;

      try {
        const response = await axios.get(`http://localhost:5000/cupones/${this.cuponCodigo}`);
        this.cuponAplicado = response.data;
        alert(`Cupón aplicado con éxito: ${this.cuponAplicado.descripcion}`);
      } catch (error) {
        alert("Cupón no válido.");
        this.cuponAplicado = null;
      }
    },
    async obtenerDescuentos() {
      try {
        const response = await axios.get("http://localhost:5000/descuentos/activos");
        this.descuentos = response.data;
      } catch (error) {
        console.error("Error al obtener descuentos:", error);
        alert("Hubo un error al cargar los descuentos.");
      }
    },
    removeCartItem(index) {
      this.$store.dispatch("cart/removeCartItem", index);
    },
    mostrarDescuentoAplicado() {
      if (this.descuentoSeleccionado) {
        alert(`Descuento seleccionado: ${this.descuentoSeleccionado.descripcion}`);
      }
    },
  },
  mounted() {
    this.obtenerDescuentos();
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
