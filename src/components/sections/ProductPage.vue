<template>
  <section class="product-page">
    <div class="sect-item flex">
      <div class="left carousel flex-1">
        <Carousel id="gallery" :wrap-around="true">
          <Slide v-for="image in images" :key="image">
            <div class="carousel__item w-full h-full">
              <img :src="image" class="w-full h-full" alt="">
            </div>
          </Slide>
        </Carousel>

        <!-- <div class="mt-2"></div>

        <Carousel
          id="thumbnails"
          :items-to-show="4"
          :wrap-around="true"
          v-model="currentSlide"
          ref="carousel"
        >
          <Slide v-for="image in images" :key="image">
            <div class="carousel__item cursor-pointer" @click="slideTo(image - 1)"><img :src="image"></div>
          </Slide>
        </Carousel> -->
      </div>

      <div class="right flex-1">
        <div class="flex flex-col">
          <div class="product-name mb-2">{{ product.name }}</div>

          <div class="total-sold mb-4">Đã bán: {{ product.total_sold }}</div>

          <div class="price">
            <span class="retail-price">{{ price }} đ</span>
            <template v-if="originalPrice > price">
              <span class="original-price ml-8">{{ originalPrice }} đ</span>
            </template>
          </div>

          <div class="attr mt-4" v-for="attr in product_attributes">
            <div class="attr-title">
              {{ attr.name }}
            </div>

            <div class="attr-options flex mt-2">
              <div class="attr-options-item cursor-pointer" v-for="item in (attr.values || [])">
                {{ item }}
              </div>
            </div>
          </div>

          <div class="quantity mt-4">
            <div class="quantity-btn plus" @click="quantity = quantity+1">+</div>
            <div class="quantity-number flex-1">{{ quantity }}</div>
            <div class="quantity-btn minus" @click="quantity = quantity-1 ? quantity-1 : 1">-</div>
          </div>

          <div class="action w-full flex mt-4">
            <div class="buy-now action-btn flex-1">Mua ngay</div>
            <div class="add-to-cart action-btn flex-1">Thêm vào giỏ hàng</div>
          </div>
        </div>
      </div>
    </div>

    <div class="sect-item mt-4 flex">
      <div class="title">
        Mô tả sản phẩm
      </div>
    </div>
  </section>
</template>

<script>
import { Carousel, Navigation, Slide, Pagination } from 'vue3-carousel'
import { useMainStore } from '@/stores/store'

export default {
  setup() {
    const mainStore = useMainStore()

    return {
      mainStore
    }
  },
  components: {
    Pagination,
    Carousel,
    Slide,
    Navigation,
  },
  data() {
    return {
      currentSlide: 0,
      quantity: 1
    }
  },
  computed: {
    product() {
      return this.mainStore.product || {}
    },
    variations() {
      return this.product.variations || []
    },
    images() {
      return this.variations.reduce((acc, cur) => cur.images ? [...acc, ...cur.images] : acc, [])
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
    }
  },
  methods: {
    slideTo(val) {
      this.currentSlide = val
    },
  }
}
</script>