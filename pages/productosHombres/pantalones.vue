<template>
    <div>
      <!-- Banner Area -->
      <section id="common_banner_one">
          <div class="container ">
              <div class="row">
                  <div class="col-lg-12">
                      <div class="common_banner_text">
                      </div>
                  </div>
              </div>
          </div>
      </section>
  
      <!-- Shop Main Area -->
      <section id="shop_main_area" class="ptb-100">
          <div class="container">
              <div class="row">
                  <div class="col-lg-6 col-md-12">
                      <div class="product_filter">
                          <div class="customs_selects">
                          </div>
                      </div>
                  </div>
                  <div v-for="(product, index) in filteredProducts" :key="index">
                        <ProductBox2 :product="product" />
                  </div>
              </div>
          </div>
      </section>
  
      <!-- Instagram Arae -->
      <InstagramArea />
  
      <!-- Add to cart Alert / Notification  -->
      <b-alert
        :show="dismissCountDown"
        dismissible
        fade
        variant="success"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="alert"
      >
        <p class="font-weight-normal">Successfully added to your list</p>
      </b-alert>
      <!-- Add to cart Alert / Notification  -->
  
      <!-- Add to wishlist / wishlist Notification  -->
      <b-alert
        :show="dismissCountDown"
        dismissible
        fade
        variant="success"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="alert"
      >
        <p class="font-weight-normal">Successfully added to your list</p>
      </b-alert>
      <!-- Add to wishlist / wishlist Notification  -->
  
      <!-- Add to Compare / Compare Notification  -->
      <b-alert
        :show="dismissCountDown"
        dismissible
        fade
        variant="success"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="alert"
      >
        <p class="font-weight-normal">Successfully added to your list</p>
      </b-alert>
      <!-- Add to Compare / Compare Notification  -->
  
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex'
  import ProductBox2 from '~/components/product-box/ProductBox2'
  import InstagramArea from '~/components/instagram/InstagramArea'
  
  export default {
      name: 'shop-list-view',
      components: {
          ProductBox2,
          InstagramArea
      },
      data() {
          return {
              title: 'Shop',
              dismissCountDown: 0,
  
              // Breadcrumb Items Data
              breadcrumbItems: [
                  {
                      text: 'Home',
                      to: '/'
                  },
                  {
                      text: 'Shop',
                      to: '/shop/shop-3'
                  }
              ],
  
              // Paginaion 
              current: 1,
              paginate: 12,
              paginateRange: 3,
              pages: [],
              paginates: '',
              filteredProducts: [],
          }
      },
      computed: {
          ...mapState({
            productslist: state => state.products.productslist, 
              shuffleproducts: state => state.products.shuffleproducts
      })
      },
      mounted() {
            this.filteredProducts = this.productslist.filter(product => 
            product.collection.includes("Pantalones")
        );
          this.getPaginate()
          this.updatePaginate(1)
          
          // For scroll page top for every Route 
          window.scrollTo(0, 0)
      },
      methods: {
        filterByCollection(event) {
                const selectedCollection = event.target.value;
                if (selectedCollection) {
                    // Filtra los productos que incluyan la colección seleccionada
                    this.filteredProducts = this.productslist.filter(product => 
                        product.collection.includes(selectedCollection)
                    );
                } else {
                    // Si no hay una colección seleccionada, muestra todos los productos
                    this.filteredProducts = this.productslist;
                }
                this.getPaginate();
                this.updatePaginate(1);
            },
          // Product added Alert / notificaion 
          alert(item) {
              this.dismissCountDown = item
          },        
          // For Pagination 
          getPaginate() {
              this.paginates = Math.round(this.shuffleproducts.length / this.paginate)
              this.page = []
              for (let i = 0; i < this.paginates; i++) {
                  this.pages.push(i + 1)
              }
          },
          setPaginate(i) {
              if (this.current === 1) {
                  return i < this.paginate
              } else {
                  return ( i >= (this.paginate * (this.current -1)) && i < (this.current * this.paginate))
              }
          },
          updatePaginate(i) {
              this.current = i
              let start = 0
              let end = 0
              if (this.current < this.paginateRange - 1) {
                  start = 1
                  end = start + this.paginateRange - 1
              } else {
                  start = this.current - 1
                  end = this.current + 1
              }
              if (start < 1) {
                  start = 1
              }
              if (end > this.paginates) {
                  end = this.paginates
              }
              this.pages = []
              for (let i = start; i <= end; i++) {
                  this.pages.push(i)
              }
              return this.pages
          },
          // For Shop Left Shorting and Up Shorting 
          randomProduct(){
              let array = this.shuffleproducts;
              for (var i = array.length - 1; i > 0; i--) {
                  var j = Math.floor(Math.random() * (i + 1));
                  var temp = array[i];
                  array[i] = array[j];
                  array[j] = temp;
              }
              this.$store.dispatch('products/shuffleProduct', array.slice(0, 30))  
          }
      },
      
      // Page head() Title, description for SEO 
      head() {
        return {
          title: this.title,
          meta: [
            {
              hid: 'description',
              name: 'description',
              content: 'Shop page - AndShop Ecommerce Vue js, Nuxt js Template'
            }
          ]
        }
      }
  }
  </script>