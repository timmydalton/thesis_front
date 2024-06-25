<template>
  <section class="section-hero">
    <div class="hero-banner relative">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="cr-left-side-contain slider-animation">
              <div class="cr-left-side-contain slider-animation">
                <h5><span>100%</span> Sản phẩm chất lượng</h5>
                <h1>Khám phá thời trang &amp; phong cách.</h1>
                <p>Nơi phong cách và chất lượng gặp gỡ, mang đến cho bạn những bộ sưu tập
                  quần áo thời trang đẳng cấp và tinh tế nhất!.</p>
                <div class="cr-last-buttons">
                  <a href="/category/all" class="cr-button">
                    Bắt đầu ngay
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section-categories">
    <div class="container">
      <div class="row mb-minus-24">
        <div class="col-lg-4 col-12">
          <div class="cr-categories">
            <ul class="nav nav-tabs">
              <li class="nav-item" v-for="(cate, idx) in listCategoriesFlat">
                <div class="nav-link center-categories-inner cursor-pointer" :class="{ 'active' : idx == selectedCategoryIdx }" @click="setSelectCategory(idx)">
                  {{ cate.name }}
                </div>
              </li>
              <li class="nav-item">
                <div class="nav-link center-categories-inner cursor-pointer active" @click="goAllProduct">
                  Tất cả sản phẩm
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-lg-8 col-12">
          <div class="h-full">
            <div class="row mb-minus-24">
              <div class="col-12 cr-categories-box">
                <div class="cr-side-categories" ref="category-show">
                  <div class="categories-contain">
                    <div class="categories-text">
                      <h5>{{ selectedCategory.name }}</h5>
                    </div>
                    <div class="categories-button">
                      <a href="" @click="goSelectedCategory" class="cr-button">Mua ngay</a>
                    </div>
                  </div>
                  <img :src="selectedCategory.image" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section-home-product">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="mb-30">
            <div class="cr-banner">
              <h2>Sản phẩm mới</h2>
            </div>
            <div class="cr-banner-sub-title">
              <p>Những sản phẩm mới nhất đến từ cửa hàng. </p>
            </div>
          </div>
        </div>
      </div>

      <div class="product-content row mb-minus-24">
        <div class="col-xl-3 col-lg-4 col-12 mb-24">
          <div class="row mb-minus-24 sticky">
            <div class="col-lg-12 col-sm-6 col-6 cr-product-box banner-480 mb-24">
              <div class="cr-ice-cubes">
                <img src="/12.png" alt="product banner">
                <div class="cr-ice-cubes-contain">
                  <h4 class="title">Thời </h4>
                  <h5 class="sub-title">Thượng</h5>
                  <span>100% nhập khẩu</span>
                  <a href="" class="cr-button">Mua ngay</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-9 col-lg-8 col-12 mb-24">
          <div class="row mb-minus-24">
            <div class="mix vegetable col-xxl-3 col-xl-4 col-6 cr-product-box mb-4" v-for="product in products" :key="product.id">
              <ProductCard :product="product"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- <section class="home-page">
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
  </section> -->
</template>

<script>
import { Carousel, Navigation, Slide, Pagination } from 'vue3-carousel'
import { useAllProductStore } from '@/stores/product.js'
import { useMainStore } from '@/stores/store'
import { traversal } from '@/composable/common'

import ProductCard from '@/components/element/ProductCard.vue'

export default {
  setup() {
    const allProductStore = useAllProductStore()
    const mainStore = useMainStore()

    return {
      allProductStore,
      mainStore
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
      ],
      selectedCategoryIdx: 0
    }
  },
  mounted() {
    this.allProductStore.getProducts()
  },
  computed: {
    products() {
      return this.allProductStore.renderProductsMinMax.splice(0, 8)
    },
    listCategoriesFlat() {
      const categories = []
      this.mainStore.categories.data.forEach(el => {
        traversal(el, el => categories.push(el))
      })
      return categories.slice(0, 5)
    },
    selectedCategory() {
      return this.listCategoriesFlat[this.selectedCategoryIdx] || {}
    },
  },
  methods: {
    goAllProduct() {
      this.$router.push('/category/all')
    },
    setSelectCategory(idx) {
      this.selectedCategoryIdx = idx
    }
  }
}
</script>