<template>
  <div class="home-page">
    <!-- Banner Area -->
    <section id="banner_one">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="banner_text_one">
              <h1
                class="flipInX"
                style="animation-duration: 3s; animation-delay: 0.3s"
              >
                Live For
                <span
                  class="flipInX"
                  style="animation-duration: 2s; animation-delay: 0.5s"
                  >Fashion</span
                >
              </h1>
              <h3>Save Up To 50%</h3>
              <nuxt-link to="/shop/shop-3" class="theme-btn-one bg-black btn_md"
                >Shop Now</nuxt-link
              >
            </div>
          </div>
          <div class="col-lg-6">
            <div class="hero_img">
              <img
                :src="require('@/assets/img/common/man.png')"
                alt="img"
                class="slideInRight"
                style="animation-duration: 3s; animation-delay: 0.3s"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Product variation -->
    <section id="product_variation_one" class="pt-100">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-4 col-md-6">
            <div class="product_variation_one_boxed img-zoom-hover">
              <img :src="require('@/assets/img/offer/woman.png')" alt="img" />
              <div class="product_var_one_text">
                <h4 class="color_one">Outerwear</h4>
                <h2>New</h2>
                <h4>Collection</h4>
                <nuxt-link
                  to="/shop/shop-2"
                  class="theme-btn-one bg-black btn_sm"
                  >Shop Now</nuxt-link
                >
              </div>
            </div>
            <div class="product_variation_one_boxed img-zoom-hover">
              <img :src="require('@/assets/img/offer/woman1.png')" alt="img" />
              <div class="product_var_one_text">
                <h4 class="color_one">Summer</h4>
                <h2>Hot</h2>
                <h4>Collection</h4>
                <nuxt-link to="/shop" class="theme-btn-one bg-black btn_sm"
                  >Shop Now</nuxt-link
                >
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="product_variation_one_boxed img-zoom-hover">
              <img :src="require('@/assets/img/offer/bag.png')" alt="img" />
              <div class="product_var_one_text_center">
                <h2 class="color_one">10% Offer</h2>
                <h4>No Selected Models</h4>
                <nuxt-link
                  to="/shop/shop-3"
                  class="theme-btn-one bg-black btn_sm"
                  >Shop Now</nuxt-link
                >
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="product_variation_one_boxed img-zoom-hover">
              <img :src="require('@/assets/img/offer/woman4.png')" alt="img" />
              <div class="product_var_one_text">
                <h2>New</h2>
                <h4 class="color_one">Arrivals</h4>
                <nuxt-link
                  to="/shop/shop-2"
                  class="theme-btn-one bg-black btn_sm"
                  >Shop Now</nuxt-link
                >
              </div>
            </div>
            <div class="product_variation_one_boxed img-zoom-hover">
              <img :src="require('@/assets/img/offer/kids.png')" alt="img" />
              <div class="product_var_one_text">
                <h2>Hot</h2>
                <h4 class="color_one">Offer</h4>
                <nuxt-link to="/shop" class="theme-btn-one bg-black btn_sm"
                  >Shop Now</nuxt-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Hot Product Area -->
    <section id="hot_Product_area" class="ptb-100">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="center_heading">
              <h2>Hot Product</h2>
              <p>Mauris luctus nisi sapien tristique dignissim ornare</p>
            </div>
          </div>
        </div>

        <b-tabs class="hot-product-area-tabs">
          <b-tab
            :title="collection"
            v-for="(collection, index) in category"
            :key="index"
            class="row"
          >
            <div
              class="col-lg-3 col-md-4 col-sm-6 col-12"
              v-for="(product, index) in getCategoryProduct(collection)"
              :key="index"
            >
              <ProductBox1
                :product="product"
                :index="index"
                @showalert="alert"
                @alertseconds="alert"
              />
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </section>

    <!-- Offer Time Area -->
    <section id="offer_timer_one">
      <div class="container">
        <div class="row">
          <div
            class="col-lg-8 offset-lg-4 col-md-7 offset-md-4 col-sm-12 col-12"
          >
            <div class="offer_time_flex">
              <div class="count_down">
                <div id="countdown">
                  <Timer date="October 15, 2025" />
                </div>
              </div>
              <div class="offer_timer_text">
                <h2>20% OFF FOR ALL T-SHIRT COLLECTION</h2>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Porro quisquam, odit assumenda sit modi commodi esse
                  necessitatibus temporibus aperiam veritatis eveniet!
                </p>
                <a href="#!" class="theme-btn-one bg-black btn_md">View More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- To Days Area -->
    <section id="to_days_area" class="ptb-100 slider_arrows_one">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="center_heading">
              <h2>ToDay's Deal</h2>
              <p>Mauris luctus nisi sapien tristique dignissim ornare</p>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12">
            <swiper
              class="swiper todays_slider position-relative"
              :options="swiperOption"
            >
              <swiper-slide v-for="(product, index) in products" :key="index">
                <ProductBox1
                  :product="product"
                  :index="index"
                  @showalert="alert"
                  @alertseconds="alert"
                />
              </swiper-slide>

              <div
                class="swiper-button-prev swiper-button-white"
                slot="button-prev"
              ></div>
              <div
                class="swiper-button-next swiper-button-white"
                slot="button-next"
              ></div>
            </swiper>
          </div>
        </div>
      </div>
    </section>

    <!-- Special offer -->
    <section id="special_offer_one">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 offset-lg-4 col-md-12 col-sm-12 col-12">
            <div class="offer_banner_one text-center">
              <h5>TRENDING</h5>
              <h2>New Fashion</h2>
              <p>
                Consectetur adipisicing elit. Dolores nisi distinctio magni,
                iure deserunt doloribus optio
              </p>
              <nuxt-link to="/shop" class="theme-btn-one bg-whites btn_md"
                >Shop Now</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest Blog Arae -->
    <section id="blog_area_one" class="ptb-100">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="center_heading">
              <h2>Latest Blog</h2>
              <p>Mauris luctus nisi sapien tristique dignissim ornare</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div
            v-for="blogItem in blogItems.slice(0, 3)"
            :key="blogItem.id"
            class="col-lg-4 col-md-4 col-sm-6 col-12"
          >
            <BlogItem1
              :blogThumb="blogItem.blogThumb"
              :blogTitle="blogItem.blogTitle"
              :blogDescription="blogItem.blogDescription"
              :blogPublishDate="blogItem.blogPublishDate"
            />
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
      @dismissed="dismissCountDown = 0"
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
      @dismissed="dismissCountDown = 0"
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
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="alert"
    >
      <p class="font-weight-normal">Successfully added to your list</p>
    </b-alert>
    <!-- Add to Compare / Compare Notification  -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProductBox1 from "~/components/product-box/ProductBox1";
import Timer from "../components/widgets/Timer";
import InstagramArea from "../components/instagram/InstagramArea";
import BlogItem1 from "~/components/blog/BlogItem1";

export default {
  name: "Home",
  components: {
    ProductBox1,
    Timer,
    InstagramArea,
    BlogItem1,
  },

  data() {
    return {
      title: "Home",
      blogItems: [
        {
          id: 1,
          blogThumb: require("assets/img/blog/post1.png"),
          blogTitle:
            "This Designer Bronzer Has Even The Drugstore-Beauty-Buyers Splurging!",
          blogDescription:
            "Today kicks off early access to the Sephora Spring Sales Event so I wanted to share some of my top recent beauty buys I’ve been",
          blogPublishDate: "24 February 2021",
        },
        {
          id: 2,
          blogThumb: require("assets/img/blog/post2.png"),
          blogTitle: "4 Fresh Ways To Style Leather Shorts For Spring",
          blogDescription:
            "We spent spring break this year in California with Cody’s family and it was such a fun getaway. Cody’s family always goes hard on vacation",
          blogPublishDate: "29 jan 2018",
        },
        {
          id: 3,
          blogThumb: require("assets/img/blog/post3.png"),
          blogTitle: "Shopbop Spring Sale Selects All Under Around $100!",
          blogDescription:
            "STRAIGHT LEG DENIM (UNDER $100) – Love all the Ribcage Levi’s styles! They are all really flattering. but since these are wider leg I stuck with my usual size (25).",
          blogPublishDate: "24 February 2021",
        },
        {
          id: 4,
          blogThumb: require("assets/img/blog/post4.png"),
          blogTitle: "This Made Me Splurge on The Apple Watch",
          blogDescription:
            "From our favourite UK influencers to the best missives from Milan and the coolest New Yorkers, read on some of the best fashion blogs out there.",
          blogPublishDate: "21 February 2019",
        },
        {
          id: 5,
          blogThumb: require("assets/img/blog/post5.png"),
          blogTitle: "This Designer Bronzer Has Even Buyers Splurging!",
          blogDescription:
            "Today kicks off early access to the Sephora Spring Sales Event so I wanted to share some of my top recent beauty buys",
          blogPublishDate: "24 February 2021",
        },
        {
          id: 6,
          blogThumb: require("assets/img/blog/post6.png"),
          blogTitle: "4 Tips for A Colorful Easter Tablescape",
          blogDescription:
            "Spring is all about the colors! Especially after what feels like an endless winter, I catch myself craving more color than usual.",
          blogPublishDate: "24 February 2021",
        },
        {
          id: 7,
          blogThumb: require("assets/img/blog/post7.png"),
          blogTitle: "Hawaii Couples Trip Guide and Spring Break Faves",
          blogDescription:
            "After every trip to Hawaii, I always have a few DMs asking where we stayed, our favorite beaches, etc. Especially with spring break around the corner.",
          blogPublishDate: "24 February 2021",
        },
        {
          id: 8,
          blogThumb: require("assets/img/blog/post8.png"),
          blogTitle: "If You Struggle To Hit Your Goals, Try This Instead",
          blogDescription:
            "This year, instead of setting grand, lofty goals and New Years Resolutions, I realized that I respond better to smaller targets that I can cross",
          blogPublishDate: "24 February 2021",
        },
        {
          id: 9,
          blogThumb: require("assets/img/blog/post9.png"),
          blogTitle: "The Luxury Winter Accessory That’s Trending Now",
          blogDescription:
            "No matter what you spend on your wardrobe, there are three pieces that can always elevate your look – shoes, handbags, and sunglasses.",
          blogPublishDate: "24 February 2021",
        },
      ],

      products: [],
      category: [],
      cartproduct: {},

      compareproduct: {},

      dismissCountDown: 0,

      // Todays Slider options
      swiperOption: {
        slidesPerView: 4,
        slidesPerGroup: 1,
        spaceBetween: 30,
        loop: false,
        mousewheel: false,
        keyboard: {
          enabled: false,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          300: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        },
        autoplay: false,
      },
    };
  },
  computed: {
    ...mapState({
      productslist: (state) => state.products.productslist,
    }),
  },
  mounted() {
    // For scroll page top for every Route
    window.scrollTo(0, 0);

    this.productsArray();
  },
  methods: {
    productsArray: function () {
      this.productslist.map((item) => {
        if (item.type === "fashion") {
          this.products.push(item);
          item.collection.map((i) => {
            const index = this.category.indexOf(i);
            if (index === -1) this.category.push(i);
          });
        }
      });
    },
    // For Product Tab
    getCategoryProduct(collection) {
      return this.products.filter((item) => {
        if (item.collection.find((i) => i === collection)) {
          return item;
        }
      });
    },

    // Product added Alert / notificaion
    alert(item) {
      this.dismissCountDown = item;
    },
  },

  // Page head() Title, description for SEO
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Home page - AndShop Ecommerce Vue js, Nuxt js Template ",
        },
      ],
    };
  },
};
</script>