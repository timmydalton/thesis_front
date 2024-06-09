<script>
import { useUIStore } from '@/stores/design/editor.js'
import CommonSettingTrait from './CommonSettingTrait.vue'

export default {
  setup() {
    const ui = useUIStore()
    return { ui }
  },
  components: {
    CommonSettingTrait
  },
  watch: {
    'ui.selected'(oldVal, newVal) {
      if(oldVal[0] == newVal[0]) return
      this.scrollToElement()
    }
  },
  computed: {
    elements() {
      return Object.values(this.ui.elements)
    },
    device() {
      return this.ui.deviceType
    },
    selectedElement() {
      return this.ui.selectedElement
    }
  },
  methods: {
    remove(id) {
      this.ui.removeElementById(id)
      this.ui.setSelected([])
    },
    selectElement(el) {
      if (this.ui.selected[0] == el.id) {
        this.ui.setSelected([])
      } else this.ui.setSelected([el.id])
    },
    scrollToElement() {
      setTimeout(() => {
        const target = document.getElementById(`${this.ui.selected[0]}-layer`)
        if(!target) return
        const index = parseInt(target.getAttribute('data-index'))
        const traitEditor = document.querySelector('.trait--editor')

        const heightItem = 50
        const top = heightItem * (index - 1) - 27

        traitEditor.scroll({
          top: top,
          left: 0,
          behavior: 'smooth'
        })
      }, 100)
    },
  }
}
</script>

<template>
  <div class="trait--editor" v-if="selectedElement">
    <div class="trait--variation-title">
      Chỉnh sửa
    </div>

    <div
      class="trait--layers-element"
    >
      <CommonSettingTrait />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.trait--editor
  max-height: 400px
  overflow: hidden
  overflow: auto
  border-top: 1px solid #e3e4e5

.trait--layers-element
  border: 1px solid #e3e4e5
  border-radius: 4px
  margin: 5px
</style>