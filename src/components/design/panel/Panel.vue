<script>
import TextPanel from './TextPanel.vue'
import UtilPanel from './UtilPanel.vue'
import ImagePanel from './ImagePanel.vue'
import { useUIStore } from '@/stores/design/editor.js'
import { usePanelStore } from '@/stores/design/panel.js'
import { getStyle } from '@/composable/common.js'

export default {
  setup() {
    const ui = useUIStore()
    const panel = usePanelStore()

    return { ui, panel }
  },
  components: {
    TextPanel,
    UtilPanel,
    ImagePanel
  },
  data: () => ({
    top: 0,
    left: 0
  }),
  watch: {
    element: {
      handler() {
        this.updatePosition()
      },
      immediate: true
    },
    topEl() {
      this.updatePosition()
    }
  },
  computed: {
    element() {
      return this.ui.selectedElement
    },
    topEl() {
      return getStyle(this.element , 'top', 0)
    },
    panels() {
      if(!this.ui.selected.length) return []

      if (!this.element) return []
      const type = this.element.type

      switch (type) {
        case 'text':
          return ['text', 'util']
        case 'image':
          return ['image', 'util']
        default:
          return ['util']
      }
    },
    style() {
      return {
        top: this.top - 50 + 'px'
      }
    }
  },
  methods: {
    updatePosition() {
      const element = document.getElementById(this.element?.id)
      if (!element) return
      const { top } = element.getBoundingClientRect()

      this.top = top + window.scrollY

    },
  },
}
</script>

<template>
  <Teleport to="body" :disabled="ui.deviceType == 'desktop'">
    <div v-if="panel.visible && ui.deviceType == 'mobile' || ui.deviceType == 'desktop'" 
      id="panel" :class="{'mobile': ui.deviceType == 'mobile'}" 
      :style="style"
    >
      <TextPanel v-if="panels.includes('text')"/>
      <ImagePanel v-if="panels.includes('image')"/>
      <UtilPanel v-if="panels.includes('util')"/>
    </div>
  </Teleport>
</template>

<style lang="sass" scoped>
  
</style>