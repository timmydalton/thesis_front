<template>
  <section class="category-page">
    <div class="sect-item">
      <div class="cate-info flex">
        <div class="text mr-2">
          Danh mục:
        </div>
        <div class="name">
          {{ categoryName }}
        </div>
      </div>

      <div class="products-container">
        <ProductCard v-for="product in products" :product="product"/>
      </div>

      <div class="paginate">
        <a-pagination
          @change="onChangePagination"
          :total="mainStore.products?.total || 0"
          :current="mainStore.products?.page || 1"
          :pageSize="mainStore.products?.limit || 20"
          class="flex justify-center p-2.5 pagination-dark-mode"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { useMainStore } from '@/stores/store'
import { traversal } from '@/composable/common'

import ProductCard from '@/components/element/ProductCard.vue'

export default {
  setup() {
    const mainStore = useMainStore()

    return {
      mainStore
    }
  },
  components: {
    ProductCard
  },
  watch: {
    '$route.params.category_id': {
      handler: function() {
        const category_id = this.$route.params.category_id
        this.mainStore.setState({ selectedCategory: category_id, products: { data: [], limit: 20, page: 1, total: 0 } })
        this.mainStore.getProducts()
      },
      deep: true,
      immediate: true,
    }
  },
  computed: {
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
      this.mainStore.getProducts(p, ps)
    },
  }
}
</script>