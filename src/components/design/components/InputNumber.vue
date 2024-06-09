<template>
  <div class="builder--input-number-container" 
    :class="{disabled: disabled}"
    @mouseover.stop="mouseover"  
    @mouseleave.stop="mouseleave"
    ref="wrapper"
  >
    <input :type="type" class='builder--editable-input-number'
      :class="{disabled: disabled}"
      :value="valueDisplayed"
      :disabled="disabled"
      @keydown="keydown"
      @keyup="keyup"
      @change="handleChange"
      @input="e => valueDisplayed = e.target.value"
      @blur="blurInput"
      @focus="focusInput"
      ref="input"
    >

    <div
      :class="{'hidden': hideUnit || isShowUnit}"
      class="builder--input-number--unit"
    >{{ unit }}</div>

    <Teleport to="body">
      <Transition name="appear">
        <div
          class="input-dropdown"
          :style="styleSelect"
          v-if="showDropdownValue && showDropdown && listValue.length"
        >
          <div
            class="input-dropdown-item"
            v-for="value in listValue"
            :key="value"
            @click="changeValue(value)"
          >
            {{ value }}
          </div>
        </div>
      </Transition>
    </Teleport>

    <div class="add-on flex items-center">
      <slot name="addonAfter" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputNumber',
  props: {
    value: String | Number,
    type: {
      type: String,
      default: 'number'
    },
    unit: {
      type: String,
      default: 'px'
    },
    hideUnit: {
      type: Boolean,
      default: true
    },
    min: {
      type: Number,
      default: -1e9
    },
    max: {
      type: Number,
      default: 1e9
    },
    disabled: {
      type: Boolean,
      default: false
    },
    decimal: {
      type: Boolean,
      default: true
    },
    weight: {
      type: Number,
      default: 1
    },
    listValue: {
      type: Array,
      default: []
    },
    showDropdownValue: {
      type: Boolean,
      default: false
    },
  },
  data: () => ({
    toFixed: 1,
    temp: null,
    valueDisplayed: 0,
    showDropdown: false,
    inputPosition: {},
    isShowUnit: false,
  }),
  mounted() {
    this.getDisplayedValue()
  },
  watch: {
    value() {
      this.$nextTick(() => {
        this.getDisplayedValue()
      })
    },
    showDropdown() {
      this.getInputPosition()
    }
  },
  computed: {
    styleSelect() {
      return {
        top: (this.inputPosition.top + this.inputPosition.height + 4) + 'px',
        left: this.inputPosition.left + 'px',
        width: this.inputPosition.width + 'px'
      }
    }
  },
  methods: {
    getDisplayedValue() {
      if (['Auto', 'auto'].includes(this.value)) return 'Auto'
      if (['Unset', 'unset'].includes(this.value)) return 'Unset'
      if (['Mixed', 'mixed'].includes(this.value)) return this.value
      this.valueDisplayed = this.getNumber(this.value)
    },
    mouseover() {
      if (this.type == 'text') return
      this.isShowUnit = true
    },
    mouseleave() {
      if (this.type == 'text') return
      this.isShowUnit = false
    },
    getNumber(str) {
      if(Number(str) === str && str % 1 !== 0) return str
      if(typeof str == 'number') return parseFloat(str.toFixed(+this.toFixed))
      if(!str) return 0
      const match = str.match(/\-?\d+/g)
      return parseInt(match ? match[0] : 0)
    },
    validation(v) {
      if (v == 0 || /^\-?\d+(\.\d+)?$/.test(v)) return true
      return false
    },
    handleChange(e) {
      let val = this.parseValue(e.target.value)

      if (this.decimal && (/^\d+\.{1}$/.test(val) || /^\.{1}\d+$/.test(val))) return
      if(!this.validation(val)) return e.target.value = this.valueDisplayed

      if(val < this.min || val > this.max) {
        return e.target.value = this.valueDisplayed
      }
      
      val = this.parseValue(val, 1)
      this.valueDisplayed = val

      if(this.value != val) {
        this.$emit('onchange', val)
      }
    },
    keydown(e) {
      e.stopPropagation()
      if (e.keyCode == 13 && this.actionAllowed) {
        return this.handleChange(e)
      }
      const currentValue = this.parseValue(this.valueDisplayed)

      if (e.keyCode == 38) {
        const newValue = currentValue + this.weight
        const value = Math.min(this.max, Math.max(this.min, newValue)).toFixed(this.toFixed)
        this.$emit('onchange', this.parseValue(value))

        if (!this.holdKey) {
          this.$emit('customkeydown')
          this.holdKey = true
        }
      } else if (e.keyCode == 40) {
        const newValue = currentValue - this.weight
        const value = Math.min(this.max, Math.max(this.min, newValue)).toFixed(this.toFixed)
        this.$emit('onchange', this.parseValue(value))

        if (!this.holdKey) {
          this.$emit('customkeydown')
          this.holdKey = true
        }
      }
    },
    keyup(e) {
      e.stopPropagation()
      if (e.keyCode == 38) {
        this.$emit('customkeyup')
        this.holdKey = false
      } else if (e.keyCode == 40) {
        this.$emit('customkeyup')
        this.holdKey = false
      }
    },
    parseValue(number, fixed = 0) {
      if (this.decimal) {
        if (fixed) return parseFloat(number.toFixed(fixed)) 
        else return parseFloat(number)
      } else {
        return this.getNumber(number)
      }
    },
    focusInput(e) {
      this.showDropdown = true
    },
    blurInput(e) {
      this.showDropdown = false
      this.getDisplayedValue()
    },
    getInputPosition() {
      const { top, left, width, height } = this.$refs.wrapper.getBoundingClientRect()

      this.inputPosition = {top: top + window.scrollY, left, width, height}
    },
    changeValue(value) {
      this.$emit('onchange', this.parseValue(value))
    }
  }
}
</script>

<style lang="sass" scoped>
.input-dropdown
  position: absolute
  pointer-events: auto
  box-sizing: border-box
  z-index: 1000
  max-width: 100%
  max-height: 100%
  border: 1px solid #e3e4e5
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.04)
  background: #ffffff
  padding: 0.25rem 4px
  border-radius: 4px
  font-size: 13px
  max-height: 160px
  overflow: auto
  &::-webkit-scrollbar
    width: 6px
  &::-webkit-scrollbar-track
    background: #fff
  &::-webkit-scrollbar-thumb
    background-color: #e5e5e5
    border-radius: 20px
    border: none
  .input-dropdown-item
    display: flex
    align-items: center
    justify-content: flex-start
    height: 24px
    cursor: pointer
    padding: 4px 3px
    &:hover
      background: #e5e5e5
      border-radius: 4px
</style>