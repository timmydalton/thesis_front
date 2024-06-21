<template>
  <div class="order-customer-info">
    <a-card size="small">
      <template #title>
        <div class="flex items-center">
          <div class="flex items-center mr-1.5">
            <UserList />
          </div>
          Địa chỉ giao hàng
        </div>
      </template>
    </a-card>
  </div>

  <div class="p-3 border border-solid rounded border-primary bg-theme-color-hover custom-card">
    <div class="font-bold text-base">{{ order.full_name }}</div>

    <div class="flex items-center">
      <phone-svg-pcon :size="16" class="text-primary"></phone-svg-pcon>
      <div class="ml-2">{{ order.phone_number }}</div>
    </div>

    <div class="flex items-center">
      <map-pin-line-pcon :size="16" class="text-primary"></map-pin-line-pcon>
      <div class="ml-2">{{ shippingInfo.full_address }}</div>
    </div>
  </div>
</template>

<script>
import { UserList } from 'vue-pancake-icons'

import { useOrderStore } from "@/stores/order.js"

export default {
  setup() {
    const orderStore = useOrderStore()
  },
  components: {
    UserList
  },
  computed: {
    order() {
      return this.orderStore.editOrder
    },
    shippingInfo() {
      return this.order.shipping_address
    }
  }
}
</script>