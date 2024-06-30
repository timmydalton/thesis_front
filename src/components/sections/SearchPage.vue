<template>
  <section class="category-page">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="mb-30 appear-animate">
            <div class="cr-banner">
              <h2>{{ categoryName == 'all' ? 'Tất cả sản phẩm' : categoryName }}</h2>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-12">
              <div class="cr-shop-bredekamp">
                <div class="center-content">
                  <span>Hiển thị {{ products.length }} trên {{ productData.total }} sản phẩm tìm được!</span>
                </div>
              </div>
            </div>
          </div>

          <div class="row col-50 mb-minus-24 col-size">
            <ProductCard2 v-for="product in products" :product="product" class="col-lg-3 col-6 mb-4"/>
          </div>
        </div>

        <div class="col-12">
          <a-pagination :total="productData.total || 0" :current="productData.page || 1"
            :pageSize="productData.limit" :show-size-changer="false" class="p-2 flex justify-center custom-pagination"
            @change="onChangePagination" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useMainStore } from '@/stores/store'
import { traversal } from '@/composable/common'

import ProductCard2 from '@/components/element/ProductCard2.vue'

export default {
  setup() {
    const mainStore = useMainStore()

    return {
      mainStore
    }
  },
  data() {
    return {
      term: ''
    }
  },
  components: {
    ProductCard2
  },
  mounted() {
    const params = new URLSearchParams(window.location.href.split('?')?.[1] || '')

    this.term = params.get('term')

    this.getByTerm()
  },
  computed: {
    productData() {
      return this.mainStore.products || {}
    },
    products() {
      return this.mainStore.renderProducts
    },
    listCategories() {
      return this.mainStore.categories.data || []
    },
    categoryName() {
      if (this.mainStore.selectedCategory && this.mainStore.selectedCategory != 'all') {
        let category
        
        this.listCategories.forEach(cate => {
          traversal(cate, (node, parent) => {
            if (node.id == this.mainStore.selectedCategory) category = node
          })
        })
        
        if (category) return category.name
      }
      return this.mainStore.selectedCategory || 'all'
    },
  },
  methods: {
    onChangePagination(p, ps) {
      if (ps != this.mainStore.products?.limit && p != 1) p = 1
      this.getByTerm(p, ps)
    },
    getByTerm(p = 1, ps = 20) {
      if (this.term) {
        this.mainStore.getAllProductByKeyword(p, ps, this.term)
      } else {
        this.mainStore.getAllProducts(p, ps)
      }
    }
  }
}
</script>