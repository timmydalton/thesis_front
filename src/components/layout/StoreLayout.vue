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
  mounted() {
    document.addEventListener('scroll', this.lazyload)
    this.lazyload()
  },
  computed: {
    routeName() {
      return this.$route.name
    },
  },
  methods: {
    lazyload() {
      document.querySelectorAll('.lazyload').forEach(node => {
        const top = node.getBoundingClientRect()?.top
        if (!top) return

        if (top < window.innerHeight) {
          node.classList.remove('appear-animate')
          node.classList.remove('lazyload')
          setTimeout(() => {
            node.classList.add('appear-animate')
          })
        }
      })
    }
  }
}
</script>