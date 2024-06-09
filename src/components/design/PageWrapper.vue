<script>
import SideBar from './SideBar.vue'
import PageView from './PageView.vue'
import ImageLibraryModal from './ImageLibraryModal.vue'
import Footer from './components/Footer.vue'

import { useShortkey } from '@/composable/shortkey.js'

import { useUIStore } from '@/stores/design/editor.js'
import { useLibraryStore } from '@/stores/design/library.js'

export default {
  setup() {
    const ui = useUIStore()
    const lib = useLibraryStore()

    return { ui, lib }
  },
  components: {
    SideBar,
    PageView,
    Footer,
    ImageLibraryModal
  },
  created() {
    //Add event handler short key
    useShortkey(this)

    //Load img src from local storage
    this.lib.getImgSrc()

    //Event responsive toggle device type
    window.addEventListener('resize', () => {
      this.ui.checkViewType()
    })
  }
}
</script>

<template>
  <div id="page-wrapper" :class="{[ui.deviceType]: true}">
    <PageView />

    <Footer v-if="ui.deviceType == 'mobile'"/>

    <ImageLibraryModal/>
  </div>
</template>

<style lang="sass" scoped>
#page-wrapper
  display: flex
  width: 100%
  height: 100%

#page-wrapper.mobile
  flex-direction: column
</style>