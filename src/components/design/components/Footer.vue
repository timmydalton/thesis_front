<template>
  <div class="editor-footer">
    <template v-if="!selectedElement">
      <div class="footer-btn">
        <div class="composite-btn" @click="addText">
          <div class="btn-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path d="M16.321 2H4.18A.18.18 0 0 0 4 2.179v2.857c0 .098.08.178.179.178h1.25a.18.18 0 0 0 .178-.178V3.607h3.75v12.5H7.304a.18.18 0 0 0-.179.179v1.25c0 .098.08.178.179.178h5.892a.18.18 0 0 0 .179-.178v-1.25a.18.18 0 0 0-.179-.179h-2.053v-12.5h3.75v1.429c0 .098.08.178.178.178h1.25a.18.18 0 0 0 .179-.178V2.179A.18.18 0 0 0 16.321 2Z" fill="#1C2536"></path></svg>
          </div>
          <div class="btn-title">Thêm chữ</div>
        </div>
      </div>

      <div class="footer-btn">
        <div class="composite-btn" @click="openImageModal">
          <div class="btn-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256"><path d="M216,40H72A16,16,0,0,0,56,56V72H40A16,16,0,0,0,24,88V200a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V184h16a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM72,56H216v62.75l-10.07-10.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L72,109.37ZM184,200H40V88H56v80a16,16,0,0,0,16,16H184Zm32-32H72V132l36-36,49.66,49.66a8,8,0,0,0,11.31,0L194.63,120,216,141.38V168ZM160,84a12,12,0,1,1,12,12A12,12,0,0,1,160,84Z"></path></svg>
          </div>
          <div class="btn-title">Thêm ảnh</div>
        </div>
      </div>
    </template>

    <template v-else>
      <CommonSettingMobileTrait />
    </template>
  </div>
</template>

<script>
import SideBar from '../SideBar.vue'
import MobileDrawer from './MobileDrawer.vue'
import CommonSettingMobileTrait from '../traits/CommonSettingMobileTrait.vue'

import { useUIStore } from '@/stores/design/editor.js'
import { useLibraryStore } from '@/stores/design/library.js'
import { createText } from '@/common/factory.js'
import { get } from 'lodash'

export default {
  setup() {
    const ui = useUIStore()
    const lib = useLibraryStore()

    return { ui, lib }
  },
  components: {
    MobileDrawer,
    SideBar,
    CommonSettingMobileTrait
  },
  computed: {
    selectedElement() {
      return this.ui.selectedElement
    },
    images_design() {
      return get(this.variation, ['images_design']) || []
    },
  },
  methods: {
    addText() {
      const text = createText({
        style: {
          top: 44,
          left: 41
        }
      })

      this.ui.addElement(text, { history: true })
      this.ui.setSelected([text.id])
    },
    openImageModal() {
      this.lib.toggleImageModal({ visible: true })
    },
  }
}
</script>

<style lang="sass" scoped>
.editor-footer
  display: flex
  height: 64px
  width: 100vw
  border-top: 1px solid #DBDDDE
  background: #fff
  position: absolute
  bottom: 0

.footer-btn
  flex: 1
  display: flex
  align-items: center
  justify-content: center

.btn-add
  position: absolute
  width: 70px
  height: 70px
  left: 50%
  bottom: 5px
  border-radius: 50%
  background: #5C5F61
  transform: translate3d(-50%, 0, 0)
  display: flex
  align-items: center
  justify-content: center

.product-view-picker
  position: absolute
  bottom: 100%
  left: 50%
  transform: translateX(-50%)

.product-view-picker-wrapper
  padding-bottom: 16px
  gap: 8px

.product-view-picker-item
  height: 40px
  width: 40px
  padding: 4px
  border-radius: 4px
  border: 1px solid #DBDDDE
  &.active
    border-color: #1677ff
  img
    width: 100%
    height: 100%
</style>