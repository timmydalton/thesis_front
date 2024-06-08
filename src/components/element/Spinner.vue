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
