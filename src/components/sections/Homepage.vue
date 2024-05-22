<template>
  <Carousel :wrap-around="true">
    <Slide v-for="image in images" :key="image">
      <div class="carousel__item">
        <img :src="image" alt="">
      </div>
    </Slide>

    <template #addons>
      <Pagination />
    </template>
  </Carousel>
</template>

<script>
import { Carousel, Navigation, Slide, Pagination } from 'vue3-carousel'

export default {
  components: {
    Pagination,
    Carousel,
    Slide,
    Navigation,
  },
  data() {
    return {
      images: [
        'https://content.pancake.vn/1/s3900x2250/fwebp0/5b/00/95/9e/ca7027fe3582377881f17cb94e58eac593d62e81df5f0e47f9cb950d.jpg',
        'https://content.pancake.vn/1/s3900x2250/fwebp0/5b/00/95/9e/ca7027fe3582377881f17cb94e58eac593d62e81df5f0e47f9cb950d.jpg'
      ]
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