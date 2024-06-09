<script>
export default {
  emits: ['change'],
  props: {
    width: {
      type: [String, Number],
      default: 120
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    range() {
      return (this.value - this.min) / (this.max - this.min) * 100
    }
  },
  methods: {
    handleChange(e) {
      const value = parseInt(e.target.value)
      this.$emit('change', value)
    }
  }
}
</script>

<template>
  <div class="input-range" :style="{'width': width + 'px'}">
    <span class="line">
      <span class="fill" :style="{width: range + '%'}"></span>
    </span>

    <input
      ref="input"
      id="slider"
      class="slider"
      type="range"
      :min="min"
      :max="max"
      :value="value"
      @input="handleChange"
    >
  </div>
</template>
