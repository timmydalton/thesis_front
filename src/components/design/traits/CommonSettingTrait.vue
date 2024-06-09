<script>
import { useUIStore } from '@/stores/design/editor.js'
import { getStyle } from '@/composable/common.js'
import AlignTrait from './AlignTrait.vue'
import InputRange from '@/components/design/components/InputRange.vue'
import InputNumber from '@/components/design/components/InputNumber.vue'

export default {
  setup() {
    const ui = useUIStore()

    return { ui }
  },
  components: {
    AlignTrait,
    InputRange,
    InputNumber
  },
  computed: {
    element() {
      return this.ui.selectedElement
    },
    top() {
      return getStyle(this.element, 'top', 0)
    },
    left() {
      return getStyle(this.element, 'left', 0)
    },
    width() {
      return getStyle(this.element, 'width', 'auto')
    },
    height() {
      return getStyle(this.element, 'height', 'auto')
    },
    text() {
      return this.element?.specials?.text || ''
    },
    rotate() {
      const transform = getStyle(this.element, 'transform', 'rotate(0deg)')
      const regex = /rotate\(([-+]?\d*\.?\d+)deg\)/

      const match = transform.match(regex)

      if (match && match[1]) return parseFloat(match[1])
      return 0
    }
  },
  methods: {
    changeTop(value) {
      this.ui.changeStyle(this.element, {top: value})
    },
    changeLeft(value) {
      this.ui.changeStyle(this.element, {left: value})
    },
    keydownInput(e, key) {
      if (e.keyCode == 38) {
        const value = this[key] + 1
        this.ui.changeStyle(this.element, {[key]: value})
      } else if (e.keyCode == 40) {
        const value = this[key] - 1 
        this.ui.changeStyle(this.element, {[key]: value})
      }
    },
    changeStyle(value, key) {
      this.ui.changeStyle(this.element, {[key]: value})
    },
    changeTransform(value) {
      this.ui.changeStyle(this.element, {transform: `rotate(${value}deg)`})
    },
    keydownTransform(e) {
      if (e.keyCode == 38) {
        const value = this.rotate + 1
        this.ui.changeStyle(this.element, {transform: `rotate(${value}deg)`})
      } else if (e.keyCode == 40) {
        const value = this.rotate - 1 
        this.ui.changeStyle(this.element, {transform: `rotate(${value}deg)`})
      }
    },
    changeText(e) {
      const value = e.target.value
      this.ui.changeSpecial(this.element, {text: value})
    }
  }
}
</script>

<template>
  <div class="common-settings--position">
    <div v-if="element?.type == 'text'" class="rotate flex justify-between mb-4">
      <a-input @keydown.stop @change="changeText" :value="text" placeholder="Nhập đoạn text..." />
    </div>

    <div class="rotate flex justify-between mb-4 w-full">
      <div class="postion--item flex-1">
        <div class="postion--item-text">Xoay</div>
        <div class="flex items-center w-full justify-between">
          <InputRange
            width="164"
            :value="rotate"
            :min="0"
            :max="359"
            @change="changeTransform"
          />

          <InputNumber
            class="panel--input"
            :value="rotate"
            :min="0"
            :max="359"
            :decimal="false"
            :style="{ width: '48px' }"
            unit="%"
            :hideUnit="false"
            @onchange="changeTransform"
          />
          
          <!-- <a-input-number @keydown.stop="keydownTransform($event)" :value="rotate" addon-after="&#176;" 
          @change="changeTransform"></a-input-number> -->
        </div>
      </div>
    </div>

    <div class="flex justify-between mb-4">
      <div class="postion--item">
        <div class="postion--item-text">Trên</div>
        <a-input-number @keydown.stop="keydownInput($event, 'top')" :value="top" addon-after="%" 
          @change="changeStyle($event, 'top')"></a-input-number>
      </div>
      <div class="postion--item">
        <div class="postion--item-text">Trái</div>
        <a-input-number @keydown.stop="keydownInput($event, 'left')" :value="left" addon-after="%" 
         @change="changeStyle($event, 'left')"></a-input-number>
      </div>
    </div>
   
    <div class="flex justify-between mb-4">
      <div class="postion--item">
        <div class="postion--item-text">Rộng</div>
        <a-input-number @keydown.stop="keydownInput($event, 'width')" :value="width" addon-after="%" 
          @change="changeStyle($event, 'width')" :disabled="width == 'auto'"></a-input-number>
      </div>
      <div class="postion--item">
        <div class="postion--item-text">Cao</div>
        <a-input-number @keydown.stop="keydownInput($event, 'height')" :value="height" addon-after="%" 
          :disabled="height == 'auto'"></a-input-number>
      </div>
    </div>

    <AlignTrait />
  </div>
</template>

<style lang="sass" scoped>
.common-settings--position
  margin: 10px
.postion--item-text
  font-size: 12px
.postion-align
  margin-top: 10px
  border: 1px solid #e3e4e5
.postion--align-item  
  padding: 6px
  height: 32px
  width: 100%
  text-align: center
  cursor: pointer
  border-right: 1px solid #e3e4e5
  &:hover
    background: #f7f7f7
.postion--align-item:last-child
  border: none
</style>