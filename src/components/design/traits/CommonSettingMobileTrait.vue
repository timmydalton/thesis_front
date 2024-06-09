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
  data() {
    return {
      editingView: ''
    }
  },
  components: {
    AlignTrait,
    InputRange,
    InputNumber
  },
  watch: {
    element() {
      this.setEdit('')
    }
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
    },
    setEdit(value) {
      this.editingView = value
    },
    handleBack() {
      if (this.editingView) this.setEdit('')
      else this.ui.setSelected([])
    },
    alignLeft() {
      this.ui.changeStyle(this.element, {left: 0})
    },
    alignRight() {
      const designArea = document.getElementById('design-area')
      const width = document.getElementById(this.element.id).offsetWidth

      const left = (designArea.offsetWidth - width) / designArea.offsetWidth * 100
      this.ui.changeStyle(this.element, {left})
    },
    alignTop() {
      this.ui.changeStyle(this.element, {top: 0})
    },
    alignBottom() {
      const designArea = document.getElementById('design-area')
      const height = document.getElementById(this.element.id).offsetHeight

      const top = (designArea.offsetHeight - height) / designArea.offsetHeight * 100
      this.ui.changeStyle(this.element, {top})
    },
    alignHorizontalCenter() {
      const designArea = document.getElementById('design-area')
      const width = document.getElementById(this.element.id).offsetWidth

      const left = (designArea.offsetWidth - width) / designArea.offsetWidth * 100 / 2

      this.ui.changeStyle(this.element, {left})
    },
    alignVerticalCenter() {
      const designArea = document.getElementById('design-area')
      const height = document.getElementById(this.element.id).offsetHeight

      const top = (designArea.offsetHeight - height) / designArea.offsetHeight * 100 / 2

      this.ui.changeStyle(this.element, {top})
    }
  }
}
</script>

<template>
  <div class="list-menu-item">
    <div class="menu-item-wrapper" v-if="!editingView">
      <div class="menu-item" @click="setEdit('rotate')">
        <div class="menu-item--icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><polyline points="88 96 40 96 40 48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M40,96,68.28,67.72A88,88,0,0,1,192,67" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="168 160 216 160 216 208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M216,160l-28.28,28.28A88,88,0,0,1,64,189" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
        </div>
      </div>

      <div class="menu-item" @click="setEdit('left')">
        <div class="menu-item--icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="40" y1="40" x2="40" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><rect x="72" y="56" width="112" height="56" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><rect x="72" y="144" width="152" height="56" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
        </div>
      </div>

      <div class="menu-item" @click="setEdit('top')">
        <div class="menu-item--icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="216" y1="40" x2="40" y2="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><rect x="116" y="100" width="112" height="56" rx="8" transform="translate(300 -44) rotate(90)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><rect x="56" y="72" width="56" height="152" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
        </div>
      </div>

      <div class="menu-item" @click="setEdit('width')" v-if="width != 'auto'">
        <div class="menu-item--icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="104" y1="48" x2="104" y2="208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="152" y1="48" x2="152" y2="208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="152" y1="128" x2="232" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="24" y1="128" x2="104" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="200 96 232 128 200 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="56 96 24 128 56 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
        </div>
      </div>

      <div class="menu-item" @click="setEdit('height')" v-if="height != 'auto'">
        <div class="menu-item--icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="48" y1="152" x2="208" y2="152" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="48" y1="104" x2="208" y2="104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="128" y1="104" x2="128" y2="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="128" y1="232" x2="128" y2="152" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="96 56 128 24 160 56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="160 200 128 232 96 200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
        </div>
      </div>

      <div class="menu-item" @click="setEdit('align')">
        <div class="menu-item--icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="128" y1="160" x2="128" y2="232" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="128" y1="96" x2="128" y2="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="96 56 128 24 160 56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="96 200 128 232 160 200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="96" y1="128" x2="24" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="160" y1="128" x2="232" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="200 96 232 128 200 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="56 96 24 128 56 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
        </div>
      </div>
    </div>

    <template v-else>
      <div class="menu-option flex items-center" v-if="editingView == 'rotate'">
        <div class="menu-option-item flex items-center w-full">
          <div class="menu-item--icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><polyline points="88 96 40 96 40 48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M40,96,68.28,67.72A88,88,0,0,1,192,67" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="168 160 216 160 216 208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M216,160l-28.28,28.28A88,88,0,0,1,64,189" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
          </div>
          
          <InputRange
            class="flex-1"
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
        </div>
      </div>

      <div class="menu-option flex items-center" v-if="editingView == 'left'">
        <div class="menu-option-item flex items-center w-full">
          <div class="menu-item--icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="40" y1="40" x2="40" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><rect x="72" y="56" width="112" height="56" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><rect x="72" y="144" width="152" height="56" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
          </div>
          
          <InputRange
            class="flex-1"
            width="164"
            :value="left"
            :min="0"
            :max="99"
            @change="changeStyle($event, 'left')"
          />

          <InputNumber
            class="panel--input"
            :value="left"
            :min="0"
            :max="99"
            :decimal="false"
            :style="{ width: '48px' }"
            unit="%"
            :hideUnit="false"
            @onchange="changeStyle($event, 'left')"
          />
        </div>
      </div>

      <div class="menu-option flex items-center" v-if="editingView == 'top'">
        <div class="menu-option-item flex items-center w-full">
          <div class="menu-item--icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="216" y1="40" x2="40" y2="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><rect x="116" y="100" width="112" height="56" rx="8" transform="translate(300 -44) rotate(90)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><rect x="56" y="72" width="56" height="152" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
          </div>
          
          <InputRange
            class="flex-1"
            width="164"
            :value="top"
            :min="0"
            :max="99"
            @change="changeStyle($event, 'top')"
          />

          <InputNumber
            class="panel--input"
            :value="top"
            :min="0"
            :max="99"
            :decimal="false"
            :style="{ width: '48px' }"
            unit="%"
            :hideUnit="false"
            @onchange="changeStyle($event, 'top')"
          />
        </div>
      </div>

      <div class="menu-option flex items-center" v-if="editingView == 'width'">
        <div class="menu-option-item flex items-center w-full">
          <div class="menu-item--icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="104" y1="48" x2="104" y2="208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="152" y1="48" x2="152" y2="208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="152" y1="128" x2="232" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="24" y1="128" x2="104" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="200 96 232 128 200 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="56 96 24 128 56 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
          </div>
          
          <InputRange
            class="flex-1"
            width="164"
            :value="width"
            :min="0"
            :max="100"
            @change="changeStyle($event, 'width')"
          />

          <InputNumber
            class="panel--input"
            :value="width"
            :min="0"
            :max="100"
            :decimal="false"
            :style="{ width: '48px' }"
            unit="%"
            :hideUnit="false"
            @onchange="changeStyle($event, 'width')"
          />
        </div>
      </div>

      <div class="menu-option flex items-center" v-if="editingView == 'height'">
        <div class="menu-option-item flex items-center w-full">
          <div class="menu-item--icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="48" y1="152" x2="208" y2="152" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="48" y1="104" x2="208" y2="104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="128" y1="104" x2="128" y2="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="128" y1="232" x2="128" y2="152" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="96 56 128 24 160 56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="160 200 128 232 96 200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
          </div>
          
          <InputRange
            class="flex-1"
            width="164"
            :value="height"
            :min="0"
            :max="100"
            @change="changeStyle($event, 'height')"
          />

          <InputNumber
            class="panel--input"
            :value="top"
            :min="0"
            :max="100"
            :decimal="false"
            :style="{ width: '48px' }"
            unit="%"
            :hideUnit="false"
            @onchange="changeStyle($event, 'height')"
          />
        </div>
      </div>

      <div class="menu-item-wrapper" v-if="editingView == 'align'">
        <div class="menu-item" @click="alignLeft">
          <div class="menu-item--icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M232,128a8,8,0,0,1-8,8H91.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L91.31,120H224A8,8,0,0,1,232,128ZM40,32a8,8,0,0,0-8,8V216a8,8,0,0,0,16,0V40A8,8,0,0,0,40,32Z"></path></svg>
          </div>
        </div>

        <div class="menu-item" @click="alignHorizontalCenter">
          <div class="menu-item--icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M136,40V216a8,8,0,0,1-16,0V40a8,8,0,0,1,16,0ZM69.66,90.34a8,8,0,0,0-11.32,11.32L76.69,120H16a8,8,0,0,0,0,16H76.69L58.34,154.34a8,8,0,0,0,11.32,11.32l32-32a8,8,0,0,0,0-11.32ZM240,120H179.31l18.35-18.34a8,8,0,0,0-11.32-11.32l-32,32a8,8,0,0,0,0,11.32l32,32a8,8,0,0,0,11.32-11.32L179.31,136H240a8,8,0,0,0,0-16Z"></path></svg>
          </div>
        </div>

        <div class="menu-item" @click="alignRight">
          <div class="menu-item--icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M189.66,122.34a8,8,0,0,1,0,11.32l-72,72a8,8,0,0,1-11.32-11.32L164.69,136H32a8,8,0,0,1,0-16H164.69L106.34,61.66a8,8,0,0,1,11.32-11.32ZM216,32a8,8,0,0,0-8,8V216a8,8,0,0,0,16,0V40A8,8,0,0,0,216,32Z"></path></svg>
          </div>
        </div>

        <div class="menu-item" @click="alignTop">
          <div class="menu-item--icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M205.66,138.34a8,8,0,0,1-11.32,11.32L136,91.31V224a8,8,0,0,1-16,0V91.31L61.66,149.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0ZM216,32H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
          </div>
        </div>

        <div class="menu-item" @click="alignVerticalCenter">
          <div class="menu-item--icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM122.34,101.66a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32L136,76.69V16a8,8,0,0,0-16,0V76.69L101.66,58.34A8,8,0,0,0,90.34,69.66Zm11.32,52.68a8,8,0,0,0-11.32,0l-32,32a8,8,0,0,0,11.32,11.32L120,179.31V240a8,8,0,0,0,16,0V179.31l18.34,18.35a8,8,0,0,0,11.32-11.32Z"></path></svg>
          </div>
        </div>

        <div class="menu-item" @click="alignBottom">
          <div class="menu-item--icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M50.34,117.66a8,8,0,0,1,11.32-11.32L120,164.69V32a8,8,0,0,1,16,0V164.69l58.34-58.35a8,8,0,0,1,11.32,11.32l-72,72a8,8,0,0,1-11.32,0ZM216,208H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
          </div>
        </div>
      </div>
    </template>
  </div>

  <div class="back-btn" @click="handleBack">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><polygon points="120 32 24 128 120 224 120 176 184 176 184 80 120 80 120 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="216" y1="176" x2="216" y2="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
    Back
  </div>
</template>

<style lang="sass" scoped>
.list-menu-item
  width: 100%
  height: 100%
  overflow: auto hidden
  color: #353738

.menu-item-wrapper
  height: 100%
  display: flex
  padding: 8px
  gap: 8px

.menu-item
  border: 1px solid #DBDDDE
  border-radius: 4px
  width: 46px
  height: 46px
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.04)
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center

.menu-option
  height: 100%

.menu-option-item
  padding: 0 12px
  gap: 12px

.back-btn
  position: absolute
  bottom: 100%
  left: 0
  padding: 4px 16px 4px 8px
  border: 1px solid #DBDDDE
  background: #DBDDDE
  border-top-right-radius: 12px
  display: flex
  align-items: center
  gap: 4px
</style>