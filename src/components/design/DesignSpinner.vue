<script>
export default {
  props: {
    size: {
      type: Number,
      default: 8
    },
    whitemode: Boolean,
    borderWidth: {
      type: Number,
      default: 1
    }
  },
  computed: {
    style() {
      return {
        width: this.size + 'px',
        height: this.size + 'px',
        left: `calc(50% - ${this.size / 2}px)`,
        top: `calc(50% - ${this.size / 2}px)`,
        borderWidth: this.borderWidth + "px"
      }
    }
  }
}
</script>

<template>
  <span class="spinner" :class="{'whitemode': whitemode}" :style="style"></span>
</template>

<style lang="sass" scoped>
.spinner
  animation: spinner .5s linear infinite
  border: 1px solid #00C1A2
  border-radius: 50%
  border-right-color: transparent
  bottom: 0
  display: inline-block
  height: 10px
  position: absolute
  right: 0
  width: 10px
  &.whitemode
    border-color: #fff
    border-right-color: transparent

@keyframes spinner
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(1turn)
</style>