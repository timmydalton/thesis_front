<template>
  <section class="section-product">
    <div class="container">
      <div class="row">
        <div class="col-xxl-4 col-xl-5 col-md-6 col-12 mb-24">
          <div class="vehicle-detail-banner banner-content clearfix">
            <div class="banner-slider">
              <swiper
                class="mySwiper"
                :navigation="true"
                :thumbs="{ swiper: thumbsSwiper }"
                :modules="modules"
              >
                <swiper-slide v-for="img in images" :key="img">
                  <div class="swiper-banner-image">
                    <img :src="img" alt="">
                  </div>
                </swiper-slide>
              </swiper>

              <swiper
                @swiper="setThumbsSwiper"
                :spaceBetween="10"
                :slidesPerView="6"
                :freeMode="true"
                :watchSlidesProgress="true"
                :modules="modules"
                class="mySwiper"
              >
                <swiper-slide v-for="img in images" :key="img">
                  <div class="swiper-thumbnail-image">
                    <img :src="img" alt="">
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>

        <div class="col-xxl-8 col-xl-7 col-md-6 col-12 mb-24">
          <div class="cr-size-and-weight-contain">
            <h2 class="heading">{{ product.name }}</h2>
          </div>

          <div class="cr-size-and-weight">
            <div class="list">
              <ul>
                <li v-if="categoriesName">
                  <label>Danh mục<span>:</span></label>
                  {{ categoriesName }}
                </li>
                <li>
                  <label>Đã bán<span>:</span></label>
                  {{ product.total_sold || 0 }}
                </li>
                <li>
                  <label>Còn<span>:</span></label>
                  {{ remain_quantity }}
                </li>
              </ul>
            </div>

            <div class="cr-product-price">
              <span class="new-price">{{ price }}₫</span>
              <span class="old-price ml-2" v-if="originalPrice > price">{{ originalPrice }}₫</span>
            </div>

            <div class="cr-attrs" v-for="attr in product_attributes" :key="attr.name">
              <h5>{{ attr.name }}:</h5>
              <div class="cr-attr">
                <ul>
                  <li :class="{'active-color': selectedAttrs[attr.name] == value, 'disabled': !(availableAttr[attr.name] || []).includes(value) }" v-for="value in (attr.values || [])" :key="value" @click="selectAttr(attr.name, value)">
                    {{ value }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="cr-add-card">
              <div class="cr-qty-main">
                <input :value="quantity" @input="quantity = parseInt($event.target.value) || 1" type="text" placeholder="." value="1" minlength="1" maxlength="20" class="quantity">
                <button type="button" class="plus" @click="quantity = quantity + 1">+</button>
                <button type="button" class="minus" @click="quantity = quantity - 1 || 1">-</button>
              </div>
              <div class="cr-add-button">
                <button type="button" class="cr-button cr-shopping-bag" @click="addToCart">Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useMainStore } from '@/stores/store'
import { useCartStore } from '@/stores/cart'
import { cloneDeep } from 'lodash'

export default {
  setup() {
    const mainStore = useMainStore()
    const cart = useCartStore()

    return {
      cart,
      mainStore
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      currentSlide: 0,
      quantity: 1,
      thumbsSwiper: null
    }
  },
  computed: {
    product() {
      return this.mainStore.product || {}
    },
    selectedAttrs() {
      return this.mainStore.selectedAttrs || {}
    },
    variations() {
      return this.product.variations || []
    },
    categories() {
      return this.product.categories || []
    },
    categoriesName() {
      return this.categories.map(e => e.name).join(', ')
    },
    images() {
      const images = this.variations
        .reduce((acc, cur) => cur.images ? [...acc, ...cur.images] : acc, [])
        .filter(function(item, pos, a) {
          return a.indexOf(item) == pos;
        })

      return images
    },
    price() {
      const listPrice = this.variations.map(el => el.retail_price)
      return Math.min(...listPrice) || 0
    },
    originalPrice() {
      const listPrice = this.variations.map(el => el.original_price)
      return Math.max(...listPrice) || 0
    },
    product_attributes() {
      return this.product.product_attributes || []
    },
    remain_quantity() {
      return this.variations.reduce((acc, cur) => {
        return acc + cur.remain_quantity
      }, 0)
    },
    modules() {
      return [FreeMode, Navigation, Thumbs]
    },
    availableAttr() {
      return this.variations.reduce((acc, cur) => {
        const fields = cur.fields || []

        fields.forEach(field => {
          if (!acc[field.name]) acc[field.name] = []
          if (!acc[field.name].includes(field.value)) acc[field.name].push(field.value)
        })

        return acc
      }, {})
    }
  },
  methods: {
    slideTo(val) {
      this.currentSlide = val
    },
    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper;
    },
    selectAttr(name, value) {
      const attrs = cloneDeep(this.selectedAttrs)

      if (attrs[name] == value) delete attrs[name]
      else attrs[name] = value

      this.mainStore.setState({ selectedAttrs: attrs })
    },
    addToCart() {
      const product = cloneDeep(this.product)
      const attrs = cloneDeep(this.selectedAttrs)
      const quantity = this.quantity

      this.cart.addToCart(product, attrs, quantity)
    }
  }
}
</script>