<template>
  <main class="flex overflow-hidden h-screen">
    <AdminSidebar/>
    <div :class="{'flex page-view-right flex-col': true, 'minimized': general.minimizedSidebar}">
      <AdminTopbar></AdminTopbar>
      <div class="flex flex-1 bg-page overflow-x-auto overflow-y-hidden flex--center flex--h-center layout-view--wrapper">
        <div class="w-full h-full relative rounded">
          <router-view class="flex-1 p-6"> </router-view>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useGeneralStore } from "@/stores/general.js"

import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import AdminTopbar from '@/components/admin/AdminTopbar.vue'

export default {
  setup() {
    const general = useGeneralStore()

    return { general }
  },
  components: {
    AdminSidebar,
    AdminTopbar
  }
}
</script>