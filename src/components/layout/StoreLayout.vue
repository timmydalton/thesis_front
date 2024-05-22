<template>
  <Header />

  <router-view/>

  <Footer />
</template>

<script>
import Footer from '@/components/sections/Footer.vue'
import Header from '@/components/sections/Header.vue'

export default {
  components: {
    Footer,
    Header
  }
}
</script>