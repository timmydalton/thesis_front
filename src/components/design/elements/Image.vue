<script>
import { PROPERTY_NOW_SHOW, getStyle } from '@/composable/common.js'

import { get } from 'lodash'

export default {
  props: {
    element: Object
  },
  computed: {
    src() {
      return this.element.specials.src || ''
    },
    style() {
      const style = Object.assign({}, this.element.style || {})

      PROPERTY_NOW_SHOW.forEach(k => delete style[k])

      return style
    },
    styleImage() {
      const transform = []

      if (this.flipX) transform.push('scaleX(-1)')
      if (this.flipY) transform.push('scaleY(-1)')

      return {
        transform: transform.join(' ') + getStyle(this.element, 'transform', '')
      }
    },
    flipX() {
      return get(this.element, ['specials', 'flipX'], false)
    },
    flipY() {
      return get(this.element, ['specials', 'flipY'], false)
    }
  }
}
</script>

<template>
  <img :src="src" draggable="false" :style="styleImage">
</template>