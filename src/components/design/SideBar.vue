<script>
import { useUIStore } from '@/stores/design/editor.js'
import { useLibraryStore } from '@/stores/design/library.js'
import { createText } from '@/common/factory.js'

export default {
  setup() {
    const ui = useUIStore()
    const lib = useLibraryStore()

    return { ui, lib }
  },
  data: () => ({
    visible: false
  }),
  methods: {
    addText() {
      const text = createText({
        style: {
          top: 44,
          left: 41
        }
      })

      this.ui.addElement(text)
      this.ui.setSelected([text.id])
    },
    openImageModal() {
      this.lib.toggleImageModal({ visible: true })
    },
  }
}
</script>

<template>
  <div class="side-bar" :data-type="ui.deviceType">
    <div class="side-bar--wrapper">
      <div class="side-bar--item flex items-center" @click.stop="addText">
        <span class="flex items-center justify-center side-bar--icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"><path d="M16.321 2H4.18A.18.18 0 0 0 4 2.179v2.857c0 .098.08.178.179.178h1.25a.18.18 0 0 0 .178-.178V3.607h3.75v12.5H7.304a.18.18 0 0 0-.179.179v1.25c0 .098.08.178.179.178h5.892a.18.18 0 0 0 .179-.178v-1.25a.18.18 0 0 0-.179-.179h-2.053v-12.5h3.75v1.429c0 .098.08.178.178.178h1.25a.18.18 0 0 0 .179-.178V2.179A.18.18 0 0 0 16.321 2Z" fill="#1C2536"></path></svg>
        </span>
        <span>Thêm chữ</span>
      </div>
      <div class="side-bar--item flex items-center" @click="openImageModal">
        <span class="flex items-center justify-center side-bar--icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#000000" viewBox="0 0 256 256"><path d="M216,40H72A16,16,0,0,0,56,56V72H40A16,16,0,0,0,24,88V200a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V184h16a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM72,56H216v62.75l-10.07-10.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L72,109.37ZM184,200H40V88H56v80a16,16,0,0,0,16,16H184Zm32-32H72V132l36-36,49.66,49.66a8,8,0,0,0,11.31,0L194.63,120,216,141.38V168ZM160,84a12,12,0,1,1,12,12A12,12,0,0,1,160,84Z"></path></svg>
        </span>
        <span>Thêm ảnh</span>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.side-bar
  z-index: 1
  &:not([data-type="mobile"])
    position: absolute
    left: 0
    top: 58px
    border: 1px solid #e3e4e5
    box-shadow: 0 3px 8px rgba(0,0,0,.04)
    .side-bar--wrapper
      flex-direction: column

.side-bar--header
  margin-bottom: 30px

.side-bar--wrapper
  display: flex
  height: 100%
  background: #ffffff

.side-bar--item
  display: flex
  flex-direction: column
  align-items: center
  padding: 14px 6px
  justify-content: center
  cursor: pointer
  user-select: none
  span
    font-size: 12px
    white-space: nowrap
.desktop .side-bar--item
  border-right: 2px solid transparent
.desktop .side-bar--item
  box-sizing: border-box 
  &:hover
    padding-left: 4px
    background: #f4f7f8
    border-left: 2px solid #00C1A2

.side-bar[data-type="mobile"]
  .side-bar--wrapper
    display: grid
    grid-template-columns: 1fr 1fr 1fr 1fr
    .side-bar--item
      display: flex
      flex-direction: column
      justify-content: center
      .side-bar--icon
        scale: 1.5
        width: 40px
        height: 40px
      span
        font-size: 14px

.side-bar[data-type="mobile"]
  .side-bar--wrapper
    justify-content: space-around
  .side-bar--item
    padding: 14px 12px
    border-bottom: 2px solid transparent
    &:hover
      background: #f4f7f8
      border-bottom: 2px solid #00C1A2

.sidebar--sm-menu-item svg
  margin-bottom: 0.25rem
</style>