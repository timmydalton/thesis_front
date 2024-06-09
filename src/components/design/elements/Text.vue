<script>
import { PROPERTY_NOW_SHOW, getStyle, eventParser } from '@/composable/common.js'
import useText from '@/composable/text.js'

import { useUIStore } from '@/stores/design/editor.js'
import { useTextStore } from '@/stores/design/text.js'

export default {
  setup() {
    const ui = useUIStore()
    const txt = useTextStore()

    return { ui, txt }
  },
  mixins: [useText],
  data() {
    return {
      lastTap: 0,
      moved: false
    }
  },
  props: {
    element: Object
  },
  computed: {
    text() {
      return this.element.specials.text || ''
    },
    style() {
      const style = Object.assign({}, this.element.style || {})

      PROPERTY_NOW_SHOW.forEach(k => delete style[k])

      return style
    }
  },
  methods: {
    downText(e) {
      // Detect a tap
      this.moved = false

      document.addEventListener('mousemove', this.moveText)
      document.addEventListener('touchmove', this.moveText, { passive: false })
      document.addEventListener('mouseup', this.upText)
      document.addEventListener('touchend', this.upText, { passive: false })
      //

      this.mx_mousedown(e)
    },
    moveText(e) {
      this.moved = true
    },
    upText(e) {
      const now = new Date().getTime();
      const delta = now - this.lastTap;

      // If user gesture is not moving -> then it is a tap
      if (!this.moved) {
        if((delta < 500) && (delta > 0) && !this.txt.elementEditing) {
          // double tap
          this.mx_editText(e)

          // Detect click away
          document.addEventListener('mousedown', this.clickAway)
          document.addEventListener('touchstart', this.clickAway, { passive: false })
        }

        this.lastTap = new Date().getTime();
      }

      document.removeEventListener('mousemove', this.moveText)
      document.removeEventListener('touchmove', this.moveText, { passive: false })
      document.removeEventListener('mouseup', this.upText)
      document.removeEventListener('touchend', this.upText, { passive: false })
    },
    clickAway(e) {
      if (!e.target.closest(`*[id=${this.element.id}]`)) {
        this.mx_updateText(e)
        document.removeEventListener('mousedown', this.clickAway)
        document.removeEventListener('touchstart', this.clickAway, { passive: false })
      }
    }
  }
}
</script>

<template>
  <div class="text-wrapper">
    <p
      v-html="text"
      :style="style"
      class="text-css"
      ref="ref_text"
      :contenteditable="mx_editable"
      @mousedown="downText"
      @touchstart="downText"
      @keydown="mx_keydown"
      @keyup="mx_keyup"
      @input="mx_input"
    ></p>
  </div>
</template>