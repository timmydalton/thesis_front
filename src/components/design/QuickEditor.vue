<script>
import Trait from './Trait.vue'
import Panel from './panel/Panel.vue'
import SideBar from './SideBar.vue'

import { useUIStore } from '@/stores/design/editor.js'
import { useTraitStore } from '@/stores/design/trait.js'
// import { useAddToCart } from '@/src/composable/addToCart.js'
import { message } from 'ant-design-vue'

export default {
  setup() {
    const ui = useUIStore()
    const trait = useTraitStore()

    // const { loading, addToCart } = useAddToCart()

    // return { ui, trait, loading, addToCart }
    return { ui, trait }
  },
  data: () => ({
    visible: false
  }),
  components: {
    Trait,
    Panel,
    SideBar
  },
  methods: {
    toggleTrait() {
      this.trait.setState('visible')
    },
    toggleSidebar() {
      this.trait.setState('visibleSidebar')
    },
    save() {
      this.ui.saveSource()

      message.success('Lưu thành công')
    },
    async handleAddToCart() {
      // await this.addToCart()
      this.visible = false
    }
  }
}
</script>

<template>
  <div class="quick-wrapper panel-border-bottom">
    <div class="quick-action flex items-center">
      <template v-if="ui.deviceType == 'desktop'">
        <div class="btn-open-trait" :class="{active: trait.visible}" :style="{ margin: '0 12px'}" @click.stop="toggleSidebar">
          <svg xmlns="http://www.w3.org/2000/svg" width="22"  height="22" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="40" y1="64" x2="216" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="40" y1="192" x2="144" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="184" y1="192" x2="232" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="208" y1="168" x2="208" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
        </div>

        <Transition name="appear">
          <SideBar v-if="trait.visibleSidebar"/>
        </Transition>
      </template>
    </div>

    <div v-if="ui.selected[0]" class="quick-editer-panel flex items-center">
      <Panel />
    </div>

    <div class="quick-editor">
      <div class="save" @click.stop="save">
        <a-tooltip title="Lưu thiết kế">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M219.31,72,184,36.69A15.86,15.86,0,0,0,172.69,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V83.31A15.86,15.86,0,0,0,219.31,72ZM168,208H88V152h80Zm40,0H184V152a16,16,0,0,0-16-16H88a16,16,0,0,0-16,16v56H48V48H172.69L208,83.31ZM160,72a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h56A8,8,0,0,1,160,72Z"></path></svg>
        </a-tooltip>
      </div>

      <a-button v-if="ui.deviceType == 'mobile'" type="primary" @click.stop="visible = true">Mua ngay</a-button>

      <template v-if="ui.deviceType == 'desktop'">
        <div class="btn-open-trait" :class="{active: trait.visible}" @click.stop="toggleTrait">
          <svg  xmlns="http://www.w3.org/2000/svg" width="22"  height="22" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-tools"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4" /><path d="M14.5 5.5l4 4" /><path d="M12 8l-5 -5l-4 4l5 5" /><path d="M7 8l-1.5 1.5" /><path d="M16 12l5 5l-4 4l-5 -5" /><path d="M16 17l-1.5 1.5" /></svg>
        </div>

        <Transition name="appear">
          <Trait v-if="trait.visible"/>
        </Transition>
      </template>
    </div>

    <a-modal
      v-model:open="visible"
      :centered="true"
      :footer="null"
      width="90%"
    >
      <!-- <variation-trait /> -->

      <div class="flex items-center justify-center" style="margin-top: 20px;">
        <a-button type="primary" @click.stop="handleAddToCart" :loading="loading">Thêm vào giỏ</a-button>
      </div>
    </a-modal>
  </div>
</template>

<style lang="sass" scoped>
.quick-wrapper
  display: flex
  height: 50px
  z-index: 1
  padding-left: 8px
.panel-border-bottom
  background: #ffffff
  border-bottom: 1px solid #e3e4e5
  box-shadow: 0 3px 8px rgba(0,0,0,.04)

.quick-action
  gap: 5px
  position: relative
.quick-action--item
  cursor: pointer
  padding: 5px
  border-radius: 2px
  &:hover
    background: #17262b1a
.quick-editor
  position: fixed
  display: flex
  right: 15px
  top: 8px
  .save
    display: flex
    margin-right: 14px
    cursor: pointer
    align-items: center
    outline: none
    user-select: none
    &:hover
      background: #f7f7f7
.btn-open-trait
  height: 34px
  width: 34px
.btn-open-trait.active
  background: #f7f7f7
.btn-open-trait, .btn-preview
  display: flex
  border: 1px solid #c4c7c8
  border-radius: 2px
  align-items: center
  justify-content: center
  cursor: pointer

.btn-preview
  height: 34px
  padding: 0 15px
  font-weight: 500
  color: #333b4a
  font-size: 14px
  user-select: none
</style>