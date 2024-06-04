<template>
  <div class="
      db-topbar
      w-full
    ">
    <div class="flex h-full w-full items-center">
      <div class="
          right-panel
          flex
          h-full
          flex-1
          items-center
          justify-between
          pr-6
          pt-1
          pb-1
        ">

        <div class="flex h-8 items-center flex-1">
          
        </div>

        <div class="flex items-center justify-center h-fit">
          <div class="flex items-center mr-5">
            <div style="height: 16px;border-left: 1px solid var(--divider);"></div>
          </div>
        </div>

        <AdminProfileMenu :user="user"/>
      </div>
    </div>
  </div>
</template>

<script>
import AdminProfileMenu from './AdminProfileMenu.vue'

import { useUserStore } from '@/stores/user'

export default {
  setup() {
    const user = useUserStore()

    return { user }
  },
  components: {
    AdminProfileMenu
  },
}
</script>

<style>

</style>