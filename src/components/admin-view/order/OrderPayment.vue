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
            <div class="order-payment__item__title ml-2">Phí vận chuyển:</div>
          </div>
          <div class="flex items-center">
            {{formatNumber(order.shipping_fee)}}₫
          </div>
        </div>

        <div class="order-payment__item my-0 flex justify-between px-[11px] py-[4px]">
          <div class="flex items-center">
            <SwapOutlined />
            <div class="order-payment__item__title ml-2">Chuyển khoản:</div>
          </div>
          <div class="flex items-center">
            {{formatNumber(order.transfer_money)}}₫
          </div>
        </div>
      </div>

      <div class="order-payment__item my-2 flex justify-between px-[11px] py-[4px]">
        <div class="flex items-center">
          <div class="invoice__item__title font-medium">Tiền hàng:</div>
        </div>
        <div class="flex items-center">
          {{formatNumber(order.invoice_value)}}₫
        </div>
      </div>

      <div class="order-payment__item my-2 flex justify-between px-[11px] py-[4px]">
        <div class="flex items-center">
          <div class="invoice__item__title font-medium">Phương thức thanh toán:</div>
        </div>
        <div class="flex items-center">
          {{ order.payment_method ? 'VNPay' : 'Thanh toán khi nhận (COD)' }}
        </div>
      </div>

      <div class="order-payment__item my-2 flex justify-between px-[11px] py-[4px]" v-if="order.payment_method == 1">
        <div class="flex items-center">
          <div class="invoice__item__title font-medium">Trạng thái thanh toán:</div>
        </div>
        <div class="flex items-center">
          <span v-if="order.transfer_money" class="text-green">Đã thanh toán</span>
          <span v-else class="text-danger">Chưa thanh toán</span>
        </div>
      </div>

      <a-divider class="divider-3-0"/>

      <div class="order-payment__item my-2 flex justify-between px-[11px] py-[4px]">
        <div class="flex items-center">
          <div class="invoice__item__title font-medium">Tổng số tiền</div>
        </div>
        <div class="flex items-center">
          {{formatNumber(order.invoice_value + order.shipping_fee)}}₫
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { CreditCard } from 'vue-pancake-icons'
import { CarOutlined, PercentageOutlined, SwapOutlined, CreditCardOutlined, DollarOutlined } from "@ant-design/icons-vue"

import { formatNumber } from "@/composable/common"

export default {
  setup() {
    return {
      formatNumber
    }
  },
  props: ['order'],
  components: {
    CreditCard,
    CarOutlined,
    SwapOutlined
  }
}
</script>