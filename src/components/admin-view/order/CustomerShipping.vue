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

      <div class="p-3 border border-solid rounded border-primary bg-theme-color-hover custom-card">
        <div class="font-bold text-base">{{ order.bill_full_name }}</div>

        <div class="flex items-start mt-2">
          <phone-svg-pcon :size="20" class="text-primary"></phone-svg-pcon>
          <div class="ml-2">{{ order.bill_phone_number }}</div>
        </div>

        <div class="flex items-start mt-2">
          <map-pin-line-pcon :size="20" class="text-primary"></map-pin-line-pcon>
          <div class="ml-2">{{ shippingInfo.city_name }}</div>
        </div>

        <div class="flex items-start mt-2">
          <envelope-simple-pcon :size="20" class="text-primary"></envelope-simple-pcon>
          <div class="ml-2">{{ shippingInfo.address }}</div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { UserList } from 'vue-pancake-icons'

import { useOrderStore } from "@/stores/order.js"

export default {
  setup() {
    const orderStore = useOrderStore()

    return {
      orderStore
    }
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