<template>
  <section class="section-order-detail">
    <div class="container">
      <div class="row appear-animate">
        <div class="col-lg-12">
          <div class="mb-6">
            <div class="cr-banner">
              <h2>Thông tin đơn hàng</h2>
            </div>
            <div class="cr-banner-sub-title">
              <p>Đơn hàng mã số: #{{ order.display_id }} </p>
              <p class="flex items-center justify-center mt-2">Trạng thái: <OrderStatus class="ml-2" :item="order"/> </p>
            </div>
          </div>
        </div>
      </div>

      <div class="order-content">
        <div class="order-content__left">
          <OrderItems :items="totalItems"/>
          <div class="grid gap-3">
            <OrderPayment :order="order" class="col-span-1"/>
          </div>

          <span class="cr-check-order-btn flex" style="margin-left: auto;" v-if="order.payment_method == 1 && !order.transfer_money">
            <a class="cr-button mt-2" @click="paymentOrder">Tiếp tục thanh toán</a>
          </span>
        </div>
        <div class="order-content__right">
          <CustomerShipping :order="order" />
          <div class="order-note mt-2">
            <a-card size="small" title="Ghi chú">
              <a-textarea :rows="6" :maxlength="100" :value="order.note || 'Không có ghi chú'" :disabled="true"/>
            </a-card>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useUserStore } from '@/stores/user'

import OrderStatus from "@/components/admin-view/order/OrderStatus.vue"
import OrderItems from "@/components/admin-view/order/OrderItems.vue"
import OrderPayment from "@/components/admin-view/order/OrderPayment.vue"
import CustomerShipping from "@/components/admin-view/order/CustomerShipping.vue"

export default {
  setup() {
    const user = useUserStore()

    return {
      user
    }
  },
  components: {
    OrderStatus,
    OrderItems,
    OrderPayment,
    CustomerShipping
  },
  computed: {
    order() {
      return this.user.viewOrder || {}
    },
    order_items() {
      return this.order.order_items || []
    },
    custom_items() {
      const items = this.order.custom_items || []

      return items.map(el => {
        return {
          variation_info: {
            fields: [],
            original_price: 200000,
            retail_price: 149000,
            images: el.images,
            name: "Sản phẩm thiết kế",
            custom_id: "DES-ITEM"
          },
          quantity: el.quantity,
        }
      })
    },
    totalItems() {
      return this.order_items.concat(this.custom_items)
    }
  }
}
</script>