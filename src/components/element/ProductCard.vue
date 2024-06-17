<template>
  <!-- <div class="product-card">
    <a :href="`/product/${product.id}`">
      <div class="thumbnail-img">
        <img :src="product.image" alt="">
      </div>
    </a>

    <div class="product-info">
      <div class="name">{{ product.name }}</div>
      <div class="price">
        <span class="retail-price">{{ product.retail_price }} đ</span>
        <template v-if="product.original_price > product.retail_price">
          &nbsp;-&nbsp;
          <span class="original-price">{{ product.original_price }} đ</span>
        </template>
      </div>
    </div>
  </div> -->

  <div class="cr-product-card">
    <div class="cr-product-image">
      <div class="cr-image-inner">
        <img :src="product.image" alt="">
      </div>
    </div>

    <div class="cr-product-details">
      <div class="cr-brand">
        <a @click="redirect(`/category/${showCategory.id}`)" v-if="showCategory">{{ showCategory.name }}</a>
        <span v-else>&nbsp;</span>
      </div>
      <a @click="redirect(`/product/${product.id}`)" class="title">{{product.name}}</a>
      <p class="cr-price"><span class="new-price">{{ product.retail_price }}</span> <span class="old-price">{{ product.original_price }}</span></p>
    </div>
  </div>
</template>

<script>
import { get } from 'lodash'
export default {
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