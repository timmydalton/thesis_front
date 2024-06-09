<template>
  <section class="home-page">
    <div class="carousel">
      <Carousel :wrap-around="true">
        <Slide v-for="image in carouselBanner" :key="image">
          <div class="carousel__item">
            <img :src="image" alt="">
          </div>
        </Slide>

        <template #addons>
          <Pagination />
        </template>
      </Carousel>
    </div>

    <div class="home-sect-1 mt-4">
      <div class="item flex-1" v-for="image in displayBanner">
        <img :src="image" alt="">
      </div>
    </div>

    <div class="home-sect-2 mt-4 pb-4">
      <div class="header pt-4 pb-4">
        Sản phẩm mới nhất
      </div>

      <div class="product-container pl-4 pr-4">
        <ProductCard v-for="product in products" :product="product" :key="product.id"/>
      </div>

      <div class="see-more">
        <a class="btn" href="/category/all">
          Xem thêm
        </a>
      </div>
    </div>

    <div class="home-sect-1 mt-4">
      <div class="item flex-1" v-for="image in displayBanner">
        <img :src="image" alt="">
      </div>
    </div>
  </section>
</template>

<script>
import { Carousel, Navigation, Slide, Pagination } from 'vue3-carousel'
import { useAllProductStore } from '@/stores/product.js'

import ProductCard from '@/components/element/ProductCard.vue'

export default {
  setup() {
    const allProductStore = useAllProductStore()

    return {
      allProductStore
    }
  },
  components: {
    Pagination,
    Carousel,
    Slide,
    Navigation,
    ProductCard
  },
  data() {
    return {
      carouselBanner: [
        'https://content.pancake.vn/1/s4650x1950/fwebp0/3c/cd/00/c6/1b882495b3bd9b822d9c16892da07780ca61b4381026f2343a9c0e89.png',
        'https://content.pancake.vn/1/s900x900/fwebp/a8/4d/c8/0c/f51f27166bc58cd95863d7e5d57ef7ee9099d387ae95a5bd4f5ab538.png'
      ],
      displayBanner: [
        'https://content.pancake.vn/1/s4650x1950/fwebp0/3c/cd/00/c6/1b882495b3bd9b822d9c16892da07780ca61b4381026f2343a9c0e89.png',
        'https://content.pancake.vn/1/s900x900/fwebp/f3/ee/50/34/912c591ef6e0efed4ebfedec8486b73f5f44e9a83a4c2160ca0e8e1d.webp',
        'https://content.pancake.vn/1/s900x900/fwebp/a8/4d/c8/0c/f51f27166bc58cd95863d7e5d57ef7ee9099d387ae95a5bd4f5ab538.png'
      ]
    }
  },
  mounted() {
    this.allProductStore.getProducts()
  },
  computed: {
    products() {
      return this.allProductStore.renderProductsMinMax.splice(0, 4)
    }
  }
}
</script>

<style lang="sass" scoped>
.carousel__item
  width: 100%
  img
    width: 100%
</style>