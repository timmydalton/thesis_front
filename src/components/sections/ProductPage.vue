<template>
  <section class="section-product">
    <div class="container">
      <div class="row appear-animate">
        <div class="col-xxl-4 col-xl-5 col-md-6 col-12 mb-24">
          <div class="vehicle-detail-banner banner-content clearfix">
            <div class="banner-slider">
              <swiper
                class="mySwiper swiper-head"
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
                class="mySwiper swiper-nav"
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
            <p>{{ product.description || 'Sản phẩm chất liệu được chọn lọc, thương hiệu trẻ tới từ nhà bán hàng hàng đầu' }}</p>
          </div>

          <div class="cr-size-and-weight">
            <div class="cr-review-star">
              <div class="cr-star">
                <svg v-for="i in 5" width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path fill="#FCD53F" d="m18.7 4.627l2.247 4.31a2.27 2.27 0 0 0 1.686 1.189l4.746.65c2.538.35 3.522 3.479 1.645 5.219l-3.25 2.999a2.225 2.225 0 0 0-.683 2.04l.793 4.398c.441 2.45-2.108 4.36-4.345 3.24l-4.536-2.25a2.282 2.282 0 0 0-2.006 0l-4.536 2.25c-2.238 1.11-4.786-.79-4.345-3.24l.793-4.399c.14-.75-.12-1.52-.682-2.04l-3.251-2.998c-1.877-1.73-.893-4.87 1.645-5.22l4.746-.65a2.23 2.23 0 0 0 1.686-1.189l2.248-4.309c1.144-2.17 4.264-2.17 5.398 0"/></svg>
              </div>
              <p>( 5.0 )</p>
            </div>

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
              <div class="price-wrapper">
                <span class="new-price">{{ formatNumber(price) }}₫</span>
                <span class="old-price ml-2" v-if="originalPrice > price">{{ formatNumber(originalPrice) }}₫</span>
              </div>
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

      <div class="row appear-animate lazyload">
        <div class="col-12">
          <div class="cr-paking-delivery">
            <a-tabs>
              <a-tab-pane key="1" tab="Mô tả sản phẩm">
                <div class="cr-tab-content">
                  <div class="cr-description">
                    <p>
                      {{ product.description || "Sản phẩm chất liệu được chọn lọc, thương hiệu trẻ tới từ nhà bán hàng hàng đầu" }}
                    </p>
                  </div>

                  <h4 class="heading">Chính sách vận chuyển</h4>

                  <div class="cr-description">
                    <p>Nội thành Hà Nội: Free ship</p>
                    <p>Các tỉnh khác: 20.000₫ phí cod</p>
                  </div>
                </div>
              </a-tab-pane>
              <a-tab-pane key="2" tab="Thông số">
              </a-tab-pane>
            </a-tabs>
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
import { formatNumber } from '@/composable/formatNumber.js'

export default {
  setup() {
    const mainStore = useMainStore()
    const cart = useCartStore()

    return {
      cart,
      mainStore,
      formatNumber
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
      const selected = Object.entries(this.selectedAttrs)
      return this.variations.reduce((acc, cur) => {
        const fields = cur.fields || []

        if (
          selected
          && selected.some(([k, v]) =>
            !!fields.find(f => f.name == k && f.value != v)
          )
        ) return acc

        if (!cur.remain_quantity) return acc

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