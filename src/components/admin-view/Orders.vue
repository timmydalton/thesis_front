<template>
  <div class="h-full flex flex-col custom-order">
    <OrderActions/>
    <div class="custom-tab">
      <a-tabs :activeKey="orderStore.orders.status" @change="changeStatusTab">
        <a-tab-pane v-for="(el, index) in getOrderStatus()" :key="el.id">
          <template #tab>
            <div class="flex">
              <div class=""> {{ el.text }}</div>
              <div class="ml-1 rounded bg-theme-border px-2 bg-count">{{ getOrderCount(el.id) }}</div>
            </div>
          </template>
        </a-tab-pane>
      </a-tabs>
    </div>

    <OrderTable/>
  </div>
</template>

<script>
import { useOrderStore } from "@/stores/order.js"

import { find } from "lodash"
import { getOrderStatus } from "@/composable/common"

import { ORDER_STATUS } from "@/common/enum"

import OrderActions from "@/components/admin-view/order/OrderActions.vue"
import OrderTable from "@/components/admin-view/order/OrderTable.vue"

export default {
  setup() {
    const orderStore = useOrderStore()

    return {
      orderStore,
      getOrderStatus
    }
  },
  components: {
    OrderActions,
    OrderTable
  },
  mounted() {
    this.orderStore.getOrders({ limit: 30 })
      .catch(error => {
        let messageCode = error?.response?.data?.reason?.message_code
        this.$message.error("Lỗi lấy thông tin đơn hàng")
      })
  },
  methods: {
    changeStatusTab(value) {
      this.orderStore.getOrders({ page: 1, status: value })
    },
    getOrderCount(status) {
      if (status == ORDER_STATUS.all) return this.orderStore.countOrderStatus.filter(el => el.status != ORDER_STATUS.removed).reduce((acc, el) => acc + el.total, 0)

      return find(this.orderStore.countOrderStatus, el => el.status == status)?.total || 0
    }
  }
}
</script>

<style>

</style>