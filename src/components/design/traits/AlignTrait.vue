<script>
import { useUIStore } from '@/stores/design/editor.js'

export default {
  setup() {
    const ui = useUIStore()
    return { ui }
  },
  computed: {
    element() {
      return this.ui.selectedElement
    },
  },
  methods: {
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
  },
}
</script>

<template>
  <div class="postion-align flex justify-between mb-4">
    <a-tooltip title="Căn trái">
      <div class="postion--align-item" @click.stop="alignLeft">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M232,128a8,8,0,0,1-8,8H91.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L91.31,120H224A8,8,0,0,1,232,128ZM40,32a8,8,0,0,0-8,8V216a8,8,0,0,0,16,0V40A8,8,0,0,0,40,32Z"></path></svg>
      </div>
      </a-tooltip>
    <a-tooltip title="Căn giữa dọc">
      <div class="postion--align-item" @click.stop="alignHorizontalCenter">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M136,40V216a8,8,0,0,1-16,0V40a8,8,0,0,1,16,0ZM69.66,90.34a8,8,0,0,0-11.32,11.32L76.69,120H16a8,8,0,0,0,0,16H76.69L58.34,154.34a8,8,0,0,0,11.32,11.32l32-32a8,8,0,0,0,0-11.32ZM240,120H179.31l18.35-18.34a8,8,0,0,0-11.32-11.32l-32,32a8,8,0,0,0,0,11.32l32,32a8,8,0,0,0,11.32-11.32L179.31,136H240a8,8,0,0,0,0-16Z"></path></svg>
      </div>
    </a-tooltip>
    <a-tooltip title="Căn phải">
      <div class="postion--align-item" @click.stop="alignRight">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M189.66,122.34a8,8,0,0,1,0,11.32l-72,72a8,8,0,0,1-11.32-11.32L164.69,136H32a8,8,0,0,1,0-16H164.69L106.34,61.66a8,8,0,0,1,11.32-11.32ZM216,32a8,8,0,0,0-8,8V216a8,8,0,0,0,16,0V40A8,8,0,0,0,216,32Z"></path></svg>
      </div>
    </a-tooltip>
    <a-tooltip title="Căn trên">
      <div class="postion--align-item" @click.stop="alignTop">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M205.66,138.34a8,8,0,0,1-11.32,11.32L136,91.31V224a8,8,0,0,1-16,0V91.31L61.66,149.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0ZM216,32H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
      </div>
    </a-tooltip>
    <a-tooltip title="Căn giữa ngang">
      <div class="postion--align-item" @click.stop="alignVerticalCenter">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM122.34,101.66a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32L136,76.69V16a8,8,0,0,0-16,0V76.69L101.66,58.34A8,8,0,0,0,90.34,69.66Zm11.32,52.68a8,8,0,0,0-11.32,0l-32,32a8,8,0,0,0,11.32,11.32L120,179.31V240a8,8,0,0,0,16,0V179.31l18.34,18.35a8,8,0,0,0,11.32-11.32Z"></path></svg>
      </div>
    </a-tooltip>
    <a-tooltip title="Căn dưới">
      <div class="postion--align-item" @click.stop="alignBottom">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M50.34,117.66a8,8,0,0,1,11.32-11.32L120,164.69V32a8,8,0,0,1,16,0V164.69l58.34-58.35a8,8,0,0,1,11.32,11.32l-72,72a8,8,0,0,1-11.32,0ZM216,208H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
      </div>
    </a-tooltip>
  </div>
</template>

<style lang="sass" scoped>
.postion-align
  margin-top: 10px
  border: 1px solid #e3e4e5
.postion--align-item  
  padding: 6px
  height: 32px
  width: 100%
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer
  border-right: 1px solid #e3e4e5
  &:hover
    background: #f7f7f7
.postion--align-item:last-child
  border: none
</style>