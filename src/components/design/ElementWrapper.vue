<script>
import { useUIStore } from '@/stores/design/editor.js'

import Text from './elements/Text.vue'
import Image from './elements/Image.vue'
import Selected from './Selected.vue'

export default {
  setup() {
    const ui = useUIStore()

    return { ui }
  },
  props: {
    element: Object,
    Selected
  },
  data() {
    return {
      observer: null,
      isHover: false
    }
  },
  mounted() {
    if (this.$refs.element) {
      this.observer = new ResizeObserver(() => {
        this.recalcSelectedPosition()
      })

      this.observer.observe(this.$refs.element)
    }
  },
  components: {
    Text,
    Image,
    Selected
  },
  computed: {
    style() {
      const style = Object.assign({}, this.element.style || {})

      const res = {
        top: style.top + '%',
        left: style.left + '%',
        width: style.width + '%',
        height: style.height + '%'
      }

      if(['text'].includes(this.element.type)) {
        res.width = 'auto'
        res.height = 'auto'
        res.fontSize = style.fontSize + 'cqw'
      }

      if(['image'].includes(this.element.type) && style.filter) {
        res.filter = style.filter
      }

      return res
    }
  },
  methods: {
    recalcSelectedPosition() {
      if (this.$refs['selected']) {
        this.$refs.selected.updatePosition()
      }
    }
  }
}
</script>

<template>
  <div
    :id="element.id"
    :style="style"
    data-element
    class="absolute cursor-move"
    :data-type="element.type"
    ref="element"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <Text v-if="element.type == 'text'" :element="element" />
    <Image v-else-if="element.type == 'image'" :element="element" />

    <Selected v-if="ui.selected.includes(element.id)" :element="element" ref="selected"/>
    <div class="element-hover" v-if="isHover && !ui.selected.includes(element.id)"></div>
  </div>
</template>