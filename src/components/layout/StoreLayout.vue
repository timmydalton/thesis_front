<template>
  <Header />

  <BreadCrumb v-if="!['home'].includes(routeName)"/>

  <router-view/>

  <Footer />
</template>

<script>
import Footer from '@/components/sections/Footer.vue'
import Header from '@/components/sections/Header.vue'
import BreadCrumb from '@/components/sections/BreadCrumb.vue'

export default {
  components: {
    Footer,
    Header,
    BreadCrumb
  },
  computed: {
    routeName() {
      return this.$route.name
    }
  }
}
</script>