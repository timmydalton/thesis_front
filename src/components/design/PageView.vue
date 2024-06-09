<script>
import ElementWrapper from './ElementWrapper.vue'
import QuickEditor from './QuickEditor.vue'
// import QuickBottom from './QuickBottom.vue'

import { getStyle, eventParser, clamp } from '@/composable/common.js'
import { useUIStore } from '@/stores/design/editor.js'
import { usePanelStore } from '@/stores/design/panel.js'
import { cloneDeep, get } from 'lodash'

export default {
  setup() {
    const ui = useUIStore()
    const panel = usePanelStore()

    ui.load()

    return { ui, panel }
  },
  data: () => ({
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    isMoving: false,
  }),
  components: {
    ElementWrapper,
    QuickEditor,
    // QuickBottom
  },
  computed: {
    elements() {
      return Object.values(this.ui.elements)
    },
    editorPosition() {
      const style = cloneDeep(this.ui.position)

      style.top += '%'
      style.left += '%'

      style.width += 'px'
      style.height += 'px'

      return style
    },
    variation() {
      return []
    },
    src() {
      return 'https://content.pancake.vn/web_content/fc/35/88/e4/83f6a1b3da3d6a88b40f4535d7a48e44ad9f9e9dd7732d81fb3fde86.png'
    },
    editingView() {
      return this.ui.editingProductView || 0
    },
    selectedElement() {
      return this.ui.selectedElement
    }
  },
  methods: {
    down(e) {
      const isLeftMouse = e.which == 1
      const isOneFingerTouch = e.which == 0 && e.touches?.length == 1
      if(!isLeftMouse && !isOneFingerTouch) return
      
      e.preventDefault()

      const target = e.target

      const closest = target.closest('[data-element]')

      if(!closest) return this.ui.setSelected([])

      this.ui.setSelected([closest.id])

      this.isMoving = false
      document.addEventListener('mouseup', this.up)
      document.addEventListener('touchend', this.up, { passive: false })

      this.element = this.ui.getElementById(closest.id)
      if(!this.element) return

      e = eventParser(e)

      this.x = e.x
      this.y = e.y

      this.left = getStyle(this.element, 'left', 0)
      this.top = getStyle(this.element, 'top', 0)

      this.oldPosition = { left: this.left, top: this.top }

      document.addEventListener('mousemove', this.move)
      document.addEventListener('touchmove', this.move, { passive: false })
    },
    async move(e) {
      const isLeftMouse = e.which == 1
      const isOneFingerTouch = e.which == 0 && e.touches?.length == 1

      if(!isLeftMouse && !isOneFingerTouch) return

      e.preventDefault()
      e = eventParser(e)

      this.isMoving = true
      this.panel.setVisible(false)

      const changeX = e.x - this.x
      const changeY = e.y - this.y
      const designArea = document.getElementById('design-area')

      if((Math.abs(changeX) < 5 && Math.abs(changeY) < 5) || !designArea) return
      
      const { height, width } = designArea.getBoundingClientRect()
      const { height: eH, width: eW } = document.getElementById(this.element.id).getBoundingClientRect()

      const l = clamp(this.left + 100 * changeX/width, (-eW * 100) / width + 1, 99)
      const t = clamp(this.top + 100 * changeY/height, (-eH * 100) / height + 1, 99)

      if (t > 99
        || t / 100 * height < -eH
        || l > 99
        || l / 100 * width < -eW
      ) return

      this.ui.changeStyle(this.element, { top: t, left: l })
    },
    async up(e) {
      document.removeEventListener('mousemove', this.move)
      document.removeEventListener('mouseup', this.up)

      document.removeEventListener('touchmove', this.move, { passive: false })
      document.removeEventListener('touchend', this.up, { passive: false })

      if(!this.isMoving) return this.handleSelected(e)

      this.left = getStyle(this.element, 'left', 0)
      this.top = getStyle(this.element, 'top', 0)

      this.newPosition = { left: this.left, top: this.top }

      await this.$nextTick()

      this.panel.setVisible(true)
    },
    async wheelZoom(e) {
      e.preventDefault()
      e = eventParser(e)

      const deltaY = -e.raw.deltaY
      if (Math.abs(deltaY) < 2) return

      //Calculate scale width & height
      const { width, height, OGWidth, OGHeight } = cloneDeep(this.ui.position)
      const newWidth = clamp(width * (1 + deltaY*0.001), OGWidth / 5, OGWidth * 3)
      const newHeight = clamp(height * (1 + deltaY*0.001), OGHeight / 5, OGHeight * 3)

      this.ui.changeEditorPosition({ width: newWidth, height: newHeight })
    },
    downMoveEditor(e) {
      if (e.which != 3) return
      e.preventDefault()
      e.stopPropagation()

      e = eventParser(e)

      this.x = e.x
      this.y = e.y

      document.body.style.cursor = 'grabbing'

      document.addEventListener('mousemove', this.moveEditor)
      document.addEventListener('mouseup', this.upEditor)
    },
    moveEditor(e) {
      e.preventDefault()
      e.stopPropagation()

      e = eventParser(e)

      const changeX = e.x - this.x
      const changeY = e.y - this.y

      this.x = e.x
      this.y = e.y

      const container = document.querySelector('.container-editor')

      const { height, width } = container.getBoundingClientRect()
      const { top, left } = cloneDeep(this.ui.position)

      const newTop = top + changeY*100/height
      const newLeft = left + changeX*100/width

      const position = {
        top: newTop,
        left: newLeft
      }

      this.ui.changeEditorPosition(position)
    },
    upEditor(e) {
      document.body.style.cursor = ''

      document.removeEventListener('mousemove', this.moveEditor)
      document.removeEventListener('mouseup', this.upEditor)
    },
    downTouchEditor(e) {
      const isPinchZoom = e.which == 0 && e.touches?.length == 2
      const element = this.selectedElement

      if (isPinchZoom && element) {
        e.preventDefault()
        e.stopPropagation()

        e = eventParser(e)

        this.x = e.x
        this.y = e.y

        this.hypot = Math.hypot(
          e.raw.touches[0].pageX - e.raw.touches[1].pageX,
          e.raw.touches[0].pageY - e.raw.touches[1].pageY
        )

        this.midpoint = [
          (e.raw.touches[0].pageX + e.raw.touches[1].pageX)/2,
          (e.raw.touches[0].pageY + e.raw.touches[1].pageY)/2
        ]

        this.rect = document.getElementById(element.id).getBoundingClientRect()
        this.top = getStyle(this.selectedElement, 'top')
        this.left = getStyle(this.selectedElement, 'left')

        if (element.type == 'text') {
          this.fontSize = getStyle(element, 'fontSize', 10)
        }

        document.addEventListener('touchmove', this.moveTouchEditor, { passive: false })
        document.addEventListener('touchend', this.upTouchEditor, { passive: false })
      }
    },
    moveTouchEditor(e) {
      e = eventParser(e)
      const position = {}

      const hypot = Math.hypot(
        e.raw.touches[0].pageX - e.raw.touches[1].pageX,
        e.raw.touches[0].pageY - e.raw.touches[1].pageY
      )

      const midpoint = [
        (e.raw.touches[0].pageX + e.raw.touches[1].pageX)/2,
        (e.raw.touches[0].pageY + e.raw.touches[1].pageY)/2
      ]

      const changeX = midpoint[0] - this.midpoint[0]
      const changeY = midpoint[1] - this.midpoint[1]

      // -- Resize element --
      const scale = hypot / this.hypot

      if (this.selectedElement.type == 'text') {
        this.ui.changeStyle(this.selectedElement, {fontSize: parseInt(this.fontSize * scale) || 1})
      } else {
        const {width: cW, height: cH} = document.getElementById('design-area').getBoundingClientRect()
        const oldWidth = 100 * this.rect.width / cW
        const oldHeight = 100 * this.rect.height / cH
        const newWidth = Math.max(oldWidth * scale, 5)
        const newHeight = Math.max(oldHeight * scale, 5)

        this.ui.changeStyle(this.selectedElement, {
          width: newWidth,
          height: newHeight,
          top: this.top + 100*changeY/cH - (newHeight - oldHeight) / 2,
          left: this.left + 100*changeX/cW - (newWidth - oldWidth) / 2
        })
      }
      // -- Resize element --
    },
    upTouchEditor() {
      document.removeEventListener('touchmove', this.moveTouchEditor, { passive: false })
      document.removeEventListener('touchend', this.upTouchEditor, { passive: false })
    },
    handleSelected(e) {
      const target = e.target
      if(!target) return

      const closest = target.closest('[data-element]')
      if(!closest || closest.id === this.element.id) return

      this.ui.setSelected([closest.id])
    },
    context(e) {
      e.preventDefault()
    }
  }
}
</script>

<template>
  <div class="container-editor flex flex-col flex-1">
    <QuickEditor />
    <div class="editor-wrapper flex-1 flex items-center justify-center" @wheel="wheelZoom" @mousedown="downMoveEditor" @touchstart="downTouchEditor" @contextmenu="context">
      <div class="editor-bounding" :style="editorPosition">
        <div class="editor" @mousedown="down" @touchstart="down">
          <div class="product-design">
            <img :src="src" draggable="false" />
          </div>
          <div id="design-area">
            <ElementWrapper
              v-for="el in elements"
              :key="el.id"
              :element="el"
            />
          </div>
        </div>
      </div>
    </div>
    
    <!-- <QuickBottom  v-if="ui.deviceType == 'desktop'"/> -->
  </div>
</template>

<style lang="sass" scoped>
.container-editor
  position: relative

.editor-wrapper, .editor-wrapper
  z-index: 0

.editor-bounding
  overflow: hidden
  position: absolute
  transform: translate(-50%, -50%)

.editor
  position: absolute
  width: 100% //500px
  height: 100% //500px
  margin: 0 auto
  user-select: none
  text-align: center
  container-type: size

.product-design
  width: 100%
  height: 100%
  img
    width: 100%
    height: 100%
    object-fit: contain
    object-position: centerk

#design-area
  position: absolute
  height: 100%
  width: 100% //50%
  left: 50%
  top: 50%
  transform: translate(-50%, -50%)
  border-radius: 0px
  //overflow: hidden
</style>