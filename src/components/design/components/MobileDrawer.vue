<template>
  <Teleport to="body">
    <Transition :name="transition || 'drawer'">
      <div class="mobile-drawer" :style="stylePosition" v-if="visible">
        <div class="handle" @touchstart="down" @mousedown="down"/>

        <div class="modra-header" @touchstart="down" @mousedown="down">
          <slot name="header"></slot>
        </div>
        
        <div class="modra-content">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import { eventParser, clamp } from '@/composable/common.js'

export default {
  props: ['visible', 'transition'],
  emits: ['update:visible'],
  data() {
    return {
      position: {
        top: this.transition == 'drawer-2' ? 60 : 80
      }
    }
  },
  watch: {
    visible() {
      this.position.top = this.transition == 'drawer-2' ? 60 : 80
    }
  },
  computed: {
    stylePosition() {
      const style = {}

      style.top = this.position.top + 'vh'
      
      return style
    }
  },
  mounted() {
    document.addEventListener('mousedown', this.checkClickAway)
    document.addEventListener('touchstart', this.checkClickAway, {passive: false})
  },
  beforeUnmount() {
    document.removeEventListener('mousedown', this.checkClickAway)
    document.removeEventListener('touchstart', this.checkClickAway, {passive: false})
  },
  methods: {
    down(e) {
      e.stopPropagation()
      e.preventDefault()

      e = eventParser(e)

      this.y = e.y

      document.addEventListener('touchmove', this.move, {passive: false})
      document.addEventListener('touchend', this.up, {passive: false})

      document.addEventListener('mousemove', this.move)
      document.addEventListener('mouseup', this.up)
    },
    move(e) {
      e.stopPropagation()
      e.preventDefault()

      e = eventParser(e)

      const changeY = e.y - this.y
      const changeYvh = 100 * changeY / window.innerHeight

      this.position.top = clamp(this.position.top + changeYvh, 10, 100)
      this.y = e.y

      if (changeY > 40) {
        this.up()
        this.$emit('update:visible', false)
      }
    },
    up() {
      if (this.position.top > 90) this.$emit('update:visible', false)

      document.removeEventListener('touchmove', this.move, {passive: false})
      document.removeEventListener('touchend', this.up, {passive: false})

      document.removeEventListener('mousemove', this.move)
      document.removeEventListener('mouseup', this.up)
    },
    checkClickAway(e) {
      if (!e.target.closest('.mobile-drawer')) this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="sass" scoped>
.mobile-drawer
  position: absolute
  box-shadow: 0 6px 10px rgba(104,111,113,.1),0 3px 20px rgba(104,111,113,.15),0 3px 4px rgba(104,111,113,.25)
  border-top: 1px solid #e3e4e5
  background: #fff
  left: 0
  width: 100%
  z-index: 1

.handle
  position: absolute
  left: 50%
  top: -40px
  transform: translate3d(-50%, 0, 0)
  width: 60px
  height: 40px
  &::after
    content: ""
    position: absolute
    left: 50%
    top: 50%
    transform: translate3d(-50%, -50%, 0)
    height: .25rem
    width: 48px
    background: #9fa4a5

.modra-header
  display: flex
  align-items: center
  justify-content: center
  height: 44px
  border-bottom: 1px solid #e3e4e5
  font-weight: 500
  font-size: 16px

.modra-content
  height: 90vh
  overflow: auto

.drawer-enter-active, .drawer-leave-active
  transition: top .5s ease

.drawer-enter-to
  top: 80vh !important
  
.drawer-enter-from, .drawer-leave-to
  top: 110vh !important

.drawer-2-enter-active, .drawer-2-leave-active
  transition: top .5s ease

.drawer-2-enter-to
  top: 60vh !important
  
.drawer-2-enter-from, .drawer-2-leave-to
  top: 110vh !important
</style>