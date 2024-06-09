<script>
import { usePanelStore } from '@/stores/design/panel.js'
import { useUIStore } from '@/stores/design/editor.js'
import { cloneDeep } from 'lodash'
import { getStyle, eventParser } from '@/composable/common.js'

export default {
  setup() {
    const ui = useUIStore()
    const panel = usePanelStore()

    return { ui, panel }
  },
  props: {
    element: Object,
  },
  data() {
    return {
      position: {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      }
    }
  },
  mounted() {
    this.updatePosition()
  },
  watch: {
    selectedStyle() {
      this.updatePosition()
    },
    editorPosition() {
      this.updatePosition()
    }
  },
  computed: {
    selectedStyle() {
      const style = Object.assign({}, this.element.style || {})
      return style
    },
    editorPosition() {
      const pos = Object.assign({}, this.ui.position || {})

      return pos
    },
    style() {
      const position = this.position

      const transform = getStyle(this.element, 'transform', '') ? getStyle(this.element, 'transform', '') : 0

      const style = {
        top: position.top + 'px',
        left: position.left + 'px',
        width: position.width + 'px',
        height: position.height + 'px',
        transform
      }

      return style
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
    updatePosition() {
      const element = document.getElementById(this.element.id)
      if (element) {
        const { top, left, width, height } = element.getBoundingClientRect()
        this.position = { top: top + window.scrollY, left, width, height }
      }
    },
    remove() {
      this.ui.removeElementById(this.ui.selected, {history: true})
      this.ui.setSelected([])
    },
    downResize(e) {
      if(![0, 1].includes(e.which)) return
      e = eventParser(e)

      this.y = e.y
      this.currentElement = cloneDeep(this.element)

      const dom = document.getElementById(this.currentElement.id)
      const { height, width } = dom.getBoundingClientRect()

      this.width = width
      this.height = height
      this.fontSize = getStyle(this.currentElement, 'fontSize')

      document.addEventListener('mousemove', this.moveResize)
      document.addEventListener('mouseup', this.upResize)

      document.addEventListener('touchmove', this.moveResize, { passive: false })
      document.addEventListener('touchend', this.upResize, { passive: false })
    },
    moveResize(e) {
      e.preventDefault()
      e = eventParser(e)

      let changeY = e.y - this.y

      const scaleValue = 1 + changeY/this.height

      //This project only have like 2 elements, text & image
      if (this.currentElement.type == 'text') {
        const fontSize = getStyle(this.currentElement, 'fontSize', this.fontSize)

        this.ui.changeStyle(this.element, {fontSize: parseInt(fontSize * scaleValue)})
      } else {
        const {width: cW, height: cH} = document.getElementById('design-area').getBoundingClientRect()
        const newWidth = 100 * (this.width * scaleValue) / cW
        const newHeight = 100 * (this.height * scaleValue) / cH

        this.ui.changeStyle(this.element, {width: newWidth, height: newHeight })
      }
    },
    upResize() {
      document.removeEventListener('mousemove', this.moveResize)
      document.removeEventListener('mouseup', this.upResize)

      document.removeEventListener('touchmove', this.moveResize, { passive: false })
      document.removeEventListener('touchend', this.upResize, { passive: false })
    },
    downRotate(e) {
      const dom = document.getElementById(this.element.id)
      const { top, left, width,  height} = dom.getBoundingClientRect()

      this.x = left + width/2
      this.y = top + height/2

      this.deg = this.rotate
      this.startAngle = Math.round((Math.atan2(e.pageX - this.x, -(e.pageY - this.y)) * 180) / Math.PI)
      if(this.startAngle < 0) this.startAngle +=360

      document.addEventListener('mousemove', this.moveRotate)
      document.addEventListener('mouseup', this.upRotate)

      document.addEventListener('touchmove', this.moveRotate, { passive: false })
      document.addEventListener('touchend', this.upRotate, { passive: false })
    },
    moveRotate(e) {
      let angle = Math.round((Math.atan2(e.pageX - this.x, -(e.pageY - this.y)) * 180) / Math.PI)
      if(angle < 0) angle +=360
      const value = (angle - this.startAngle + this.deg + 360) % 360

      this.ui.changeStyle(this.element, {transform: `rotate(${value}deg)`})
    },
    upRotate(e) {
      document.removeEventListener('mousemove', this.moveRotate)
      document.removeEventListener('mouseup', this.upRotate)

      document.removeEventListener('touchmove', this.moveRotate, { passive: false })
      document.removeEventListener('touchend', this.upRotate, { passive: false })
    }
  }
}
</script>

<template>
  <Teleport to="body">
    <div class="utils-btn" :style="style">
      <template v-if="panel.visible">
        <div class="rotate-icon selected-icon" @mousedown.stop="downRotate" @touchstart.stop="downRotate">
          <span class="flex items-center justify-center w-full h-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256">
              <path d="M240,56v48a8,8,0,0,1-8,8H184a8,8,0,0,1,0-16H211.4L184.81,71.64l-.25-.24a80,80,0,1,0-1.67,114.78,8,8,0,0,1,11,11.63A95.44,95.44,0,0,1,128,224h-1.32A96,96,0,1,1,195.75,60L224,85.8V56a8,8,0,1,1,16,0Z"></path>
            </svg>
          </span>
        </div>
        <div class="drag-icon selected-icon">
          <span class="flex items-center justify-center w-full h-full cursor-move">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256">
              <path d="M90.34,61.66a8,8,0,0,1,0-11.32l32-32a8,8,0,0,1,11.32,0l32,32a8,8,0,0,1-11.32,11.32L136,43.31V96a8,8,0,0,1-16,0V43.31L101.66,61.66A8,8,0,0,1,90.34,61.66Zm64,132.68L136,212.69V160a8,8,0,0,0-16,0v52.69l-18.34-18.35a8,8,0,0,0-11.32,11.32l32,32a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Zm83.32-72-32-32a8,8,0,0,0-11.32,11.32L212.69,120H160a8,8,0,0,0,0,16h52.69l-18.35,18.34a8,8,0,0,0,11.32,11.32l32-32A8,8,0,0,0,237.66,122.34ZM43.31,136H96a8,8,0,0,0,0-16H43.31l18.35-18.34A8,8,0,0,0,50.34,90.34l-32,32a8,8,0,0,0,0,11.32l32,32a8,8,0,0,0,11.32-11.32Z"></path>
            </svg>
          </span>
        </div>
        <div class="resize-icon selected-icon" @mousedown.stop="downResize" @touchstart.stop="downResize">
          <span class="flex items-center justify-center w-full h-full">
            <svg style="transform: rotate(45deg);" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256">
              <path d="M237.66,133.66l-32,32a8,8,0,0,1-11.32-11.32L212.69,136H43.31l18.35,18.34a8,8,0,0,1-11.32,11.32l-32-32a8,8,0,0,1,0-11.32l32-32a8,8,0,0,1,11.32,11.32L43.31,120H212.69l-18.35-18.34a8,8,0,0,1,11.32-11.32l32,32A8,8,0,0,1,237.66,133.66Z"></path>
            </svg>
          </span>
        </div>
        <div class="trash-icon selected-icon" @click.stop="remove">
          <span class="flex items-center justify-center w-full h-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256">
              <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
            </svg>
          </span>
        </div>
      </template>
    </div>
  </Teleport>
</template>

<style lang="sass" scoped>
.selected-icon
  position: absolute
  width: 25px
  height: 25px
  background-color: #fff
  border: 1px solid #e5e5e5
  cursor: pointer
  pointer-events: all

.drag-icon
  top: -25px
  left: -26px

.rotate-icon
  top: -25px
  right: -26px
  cursor: ew-resize

.resize-icon
  right: -26px
  bottom: -25px
  cursor: nwse-resize

.trash-icon
  left: -26px
  bottom: -25px
</style>