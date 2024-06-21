<template>
  <div class="order-product">
    <div class="order-product__list">
      <a-card size="small custom-card">
        <template #title>
          <div class="flex items-center">
            <div class="flex mr-1">
              <PackageSvg />
            </div>
            <div>
              Sản phẩm
            </div>
          </div>
        </template>

        <div>
          <div class="h-[400px] overflow-y-auto bg-ui-3" v-if="(orderStore.editOrder.order_items || []).length">
            <OrderItem class="order-product__item bg-ui m-4"
              v-for="(el, index) in orderStore.editOrder.order_items || []"
              :key="index"
              :item="el"
              :index="index"
            />
          </div>

          <div v-else class="flex flex-col justify-center items-center h-[400px]">
            <EmptyOrderLight />
            <span>Không có sản phẩm nào trong đơn hàng</span>
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
import { PackageSvg } from 'vue-pancake-icons'
import { useOrderStore } from "@/stores/order.js"

import OrderItem from "@/components/admin-view/order/OrderItem.vue"
import EmptyOrderLight from '@/assets/svg/empty_order_light.svg?component'

export default {
  setup() {
    const orderStore = useOrderStore()

    return {
      orderStore
    }
  },
  components: {
    PackageSvg,
    EmptyOrderLight,
    OrderItem
  }
}
</script>