<template>
  <div class="order-payment relative">
    <a-card size="small">
      <template #title>
        <div class="flex justify-between">
          <div class="flex items-center">
            <div class="flex mr-1">
              <CreditCard />
            </div>
            <div class="">
              Thanh toán
            </div>
          </div>
        </div>
      </template>

      <div class="grid gap-3 grid-cols-1 lg:grid-cols-2">
        <div class="order-payment__item my-0 flex justify-between px-[11px] py-[4px]">
          <div class="flex items-center">
            <CarOutlined />
            <div class="order-payment__item__title ml-2">Phí vận chuyển</div>
          </div>
          <div class="flex items-center">
            {{formatNumber(orderStore.editOrder.shipping_fee)}}₫
          </div>
        </div>

        <div class="order-payment__item my-0 flex justify-between px-[11px] py-[4px]">
          <div class="flex items-center">
            <SwapOutlined />
            <div class="order-payment__item__title ml-2">Chuyển khoản</div>
          </div>
          <div class="flex items-center">
            {{formatNumber(orderStore.editOrder.transfer_money)}}₫
          </div>
        </div>
      </div>

      <div class="order-payment__item my-2 flex justify-between px-[11px] py-[4px]">
        <div class="flex items-center">
          <div class="invoice__item__title font-medium">Tổng số tiền</div>
        </div>
        <div class="flex items-center">
          {{formatNumber(orderStore.editOrder.invoice_value + orderStore.editOrder.shipping_fee)}}₫
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { CreditCard } from 'vue-pancake-icons'
import { CarOutlined, PercentageOutlined, SwapOutlined, CreditCardOutlined, DollarOutlined } from "@ant-design/icons-vue"

import { formatNumber } from "@/composable/common"
import { useOrderStore } from "@/stores/order.js"

export default {
  setup() {
    const orderStore = useOrderStore()
    return {
      orderStore,
      formatNumber
    }
  },
  components: {
    CreditCard,
    CarOutlined,
    SwapOutlined
  }
}
</script>