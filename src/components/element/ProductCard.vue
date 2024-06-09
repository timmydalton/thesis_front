<template>
  <div class="product-card">
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
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: {}
    }
  }
}
</script>