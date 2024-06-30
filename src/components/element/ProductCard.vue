<template>
  <div class="cr-product-card">
    <div class="cr-product-image">
      <div class="cr-image-inner">
        <img :src="product.image" alt="">
      </div>
    </div>

    <div class="cr-product-details">
      <div class="cr-brand">
        <a :href="`/category/${showCategory.id}`" v-if="showCategory">{{ showCategory.name }}</a>
        <span v-else>&nbsp;</span>
      </div>
      <a :href="`/product/${product.id}`" class="title">{{product.name}}</a>
      <p class="cr-price">
        <span class="new-price">{{ formatNumber(product.retail_price) }}₫</span>
        <span class="old-price">{{ formatNumber(product.original_price) }}₫</span>
      </p>
    </div>
  </div>
</template>

<script>
import { get } from 'lodash'
import { formatNumber } from '@/composable/formatNumber.js'

export default {
  setup() {
    return {
      formatNumber
    }
  },
  props: {
    product: {
      type: Object,
      default: {}
    }
  },
  computed: {
    showCategory() {
      return get(this.product, ['categories', 0], '')
    }
  },
  methods: {
    redirect(path) {
      this.$router.push(path)
    }
  }
}
</script>