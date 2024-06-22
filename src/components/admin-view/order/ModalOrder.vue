<template>
  <a-modal v-if="orderStore.visibleModalOrder" centered class="custom-modal modal-order"
    :open="true" :closable="false"
    :keyboard="false" :maskClosable="false" :maskStyle="{
      'background': 'gba(5, 5, 5, 0.72)',
      'backdrop-filter': 'blur(5.5px)',
    }" :onCancel="closeModal">
    <template #title>
      <div class="modal-order__title">
        <div class="font-semibold" v-if="!orderStore.editOrder.id">
          Tạo đơn hàng
        </div>

        <div class="flex items-center" v-if="orderStore.editOrder.id">
          <div class="modal-order__title__id">
            <a-avatar shape="square" size="large">#{{ orderStore.editOrder.display_id }}</a-avatar>
          </div>

          <div class="ml-3">
            <div class="modal-order__title__status">
              <div class="modal-order__title__status__label">
                Trạng thái:
              </div>
              <OrderStatus :item="orderStore.editOrder" :width="'auto'"/>
            </div>

            <div class="modal-order__title__created">
              <div class="modal-order__title__created__label">
                Thời gian tạo:
              </div>
              <div class="modal-order__title__created__time">
                {{ formatDateTime(7, orderStore.editOrder.inserted_at) }}
              </div>
            </div>
          </div>
        </div>

        <div class="modal-order__title__action">
          <CloseOutlined @click="closeModal" />
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-between">
        <div class="">
          <div class="modal-order__title__function ml-0" v-if="orderStore.editOrder.id">
          </div>
        </div>
        <div class="flex">
          <a-button @click="closeModal">
            Thoát
          </a-button>
        </div>
      </div>
    </template>

    <div class="order-content">
      <div class="order-content__left">
        <OrderItems/>
        <div class="grid gap-3">
          <OrderPayment class="col-span-1"/>
        </div>
      </div>
      <div class="order-content__right">
        <CustomerShipping />
        <div class="order-note">
          <a-card size="small" title="Ghi chú">
            <a-textarea :rows="6" :maxlength="100" :value="orderStore.editOrder.note || 'Không có ghi chú'" :disabled="true"/>
          </a-card>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script>
import { CloseOutlined } from "@ant-design/icons-vue"
import OrderStatus from "@/components/admin-view/order/OrderStatus.vue"
import OrderItems from "@/components/admin-view/order/OrderItems.vue"
import OrderPayment from "@/components/admin-view/order/OrderPayment.vue"
import CustomerShipping from "@/components/admin-view/order/CustomerShipping.vue"

import { useOrderStore } from "@/stores/order.js"
import { getOrderStatus } from "@/composable/common"
import { formatDateTime, formatNumber } from "@/composable/common"

export default {
  setup() {
    const orderStore = useOrderStore()

    return {
      orderStore,
      getOrderStatus,
      formatDateTime
    }
  },
  components: {
    CloseOutlined,
    OrderStatus,
    OrderItems,
    OrderPayment,
    CustomerShipping
  },
  methods: {
    closeModal() {
      this.orderStore.setStateField("visibleModalOrder", false)
    },
  }
}
</script>