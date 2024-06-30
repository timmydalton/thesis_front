<template>
  <div class="trait--variation">
    <div class="trait--variation-title">
      Thuộc tính
    </div>

    <div class="trait--variation-attr">
      <div class="trait--variation-name">Màu sắc</div>
      <div class="trait--variation-values flex">
        <div
          class="trait--variation-value"
          :class="{ 'active' : idx == selectedImgIdx }"
          v-for="(item, idx) in listImg" :key="idx"
          @click.stop="ui.setSelectedImgIdx(idx)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from 'lodash'
import { useUIStore } from '@/stores/design/editor.js'

export default {
  setup() {
    const ui = useUIStore()

    return { ui }
  },
  computed: {
    listImg() {
      return this.ui.listColorImg || []
    },
    selectedImg() {
      return this.listImg[this.selectedImgIdx] || {}
    },
    selectedImgIdx() {
      return this.ui.selectedImgIdx || 0
    }
  }
}
</script>