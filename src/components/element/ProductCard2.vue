<template>
  <div class="cr-product-box">
    <div class="cr-product-card">
      <div class="cr-product-image">
        <div class="cr-image-inner">
          <img :src="product.image" alt="">
        </div>
      </div>
      <div class="cr-product-details">
        <div class="cr-brand">
          <a :href="`/category/${showCategory.id}`">{{ showCategory }}</a>
          <div class="cr-star">
            <i class="ri-star-fill"></i>
            <i class="ri-star-fill"></i>
            <i class="ri-star-fill"></i>
            <i class="ri-star-fill"></i>
            <i class="ri-star-fill"></i>
            <p>(5)</p>
          </div>
        </div>
        <a :href="`/product/${product.id}`" class="title">{{ product.name }}</a>
        <p class="text">{{ product.description }}</p>
        <p class="cr-price flex mt-2">
          <span class="new-price">{{ formatNumber(product.retail_price) }}₫</span>
          <span class="old-price">{{ formatNumber(product.original_price) }}₫</span>

          <a :href="`/product/${product.id}`" style="margin-left: auto" class="text-green underline">Mua ngay >></a>
        </p>
      </div>
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
      return get(this.product, ['categories'], '')
    }
  },
  methods: {
    redirect(path) {
      this.$router.push(path)
    }
  }
}
</script>