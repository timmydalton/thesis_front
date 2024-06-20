<template>
  <div class="flex justify-end mt-2">
    <a-button class="action-bar__button action-bar__button--normal mr-4"
      @click="onClickRefresh">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16" fill="currentColor" class="mr-2"><g><path d="M240,56v48a8,8,0,0,1-8,8H184a8,8,0,0,1,0-16H211.4L184.81,71.64l-.25-.24a80,80,0,1,0-1.67,114.78,8,8,0,0,1,11,11.63A95.44,95.44,0,0,1,128,224h-1.32A96,96,0,1,1,195.75,60L224,85.8V56a8,8,0,1,1,16,0Z"></path></g></svg>
      Làm mới
    </a-button>
    <div>
      <a-range-picker format="DD/MM/YY" :placeholder="['Bắt đầu', 'Kết thúc']"
        @change="onDateRangeChange" />
    </div>
  </div>
</template>

<script>
import { useOrderStore } from "@/stores/order.js"

export default {
  setup() {
    const orderStore = useOrderStore()

    return {
      orderStore
    }
  },
  methods: {
    onDateRangeChange(date, dateString) {
      this.orderStore.setFilterOptions("date_range", date || [])
      this.orderStore.getOrders()
    },
    onClickRefresh() {
      this.orderStore.getOrders({ page: 1 })
    },
  }
}
</script>