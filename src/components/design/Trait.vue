<script>
// import VariationTrait from './traits/VariationTrait.vue'
import LayersTrait from './traits/LayersTrait.vue'

import { useUIStore } from '@/stores/design/editor.js'
import { useTraitStore } from '@/stores/design/trait.js'

export default {
  setup() {
    const ui = useUIStore()
    const trait = useTraitStore()

    return { ui, trait }
  },
  components: {
    // VariationTrait,
    LayersTrait
  },
  methods: {
    close() {
      this.trait.setState('visible')
    }
  }
}
</script>

<template>
  <div class="trait">
    <div class="trait-top">
      <div class="trait--title-item">Tùy chỉnh</div>
      <div class="trait--btn-close" @click="close">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
      </div>
    </div>

    <!-- <VariationTrait/> -->
    <LayersTrait />
  </div>
</template>

<style lang="sass" scoped>
.trait
  position: absolute
  width: 265px
  right: 0
  top: 50px
  background: #ffffff
  border: 1px solid #e3e4e5
  border-radius: 2px
  color: #333b4a
  box-shadow: 0 3px 8px rgba(0,0,0,.04)
.trait-top
  display: flex
  justify-content: space-between
  border-bottom: 1px solid #e3e4e5
  padding: 10px
  align-items: center

.trait--btn-close
  display: flex
  padding: 6px
  border: 1px solid #e3e4e5
  cursor: pointer

.trait--title-item  
  font-weight: 600
  color: #333b4a
  font-size: 14px

</style>