<template>
  <div class="w-full h-full relative cart-container">
    <template v-if="items.length">
      <ul class="crcart-pro-items">
        <li v-for="(item, idx) in items" :key="item.id">
          <a @click="redirect(`/product/${item.product.id}`)" class="crside_pro_img">
            <img :src="item.images?.[0] || ''" alt="">
          </a>

          <div class="cr-pro-content">
            <a @click="redirect(`/product/${item.product.id}`)" class="cart_pro_title">{{ item.product?.name || "No name" }}</a>
            <span class="cart-price"><span>{{ formatNumber(item.retail_price) }}₫</span> - {{ getAttrString(item) }}</span>
            <div class="cr-cart-qty">
              <div class="cart-qty-plus-minus">
                <button type="button" class="plus" @click="changeQuantity(idx, item.quantity + 1)">+</button>
                <input :value="item.quantity" @input="changeQuantity(idx, parseInt($event.target.value) || 1)" type="text" placeholder="." value="1" minlength="1" maxlength="20" class="quantity">
                <button type="button" class="minus" @click="changeQuantity(idx, item.quantity - 1 || 1)">-</button>
              </div>
              <div class="cursor-pointer remove" @click="confirmDeleteItem(idx)">×</div>
            </div>
          </div>
        </li>
      </ul>

      <div class="cr-cart-bottom">
        <div class="cart-sub-total">
          <table class="table cart-table">
            <tbody>
              <tr>
                <td class="text-left">Tổng cộng :</td>
                <td class="text-right primary-color">{{ formatNumber(totalPrice) }}₫</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="cart_btn">
          <a @click="redirect(`/cart`)" class="cr-button">Xem giỏ</a>
          <a @click="redirect(`/checkout`)" class="cr-btn-secondary">Checkout</a>
        </div>
      </div>
    </template>

    <template v-else>
      <picture>
        <img src="https://content.pancake.vn/1/s900x900/fwebp/ac/f6/82/34/890483fbc5aad0bf331182612830234c9844faf8813519157a5a512e.png" draggable="false" fetchpriority="high" class="w-full h-full">
      </picture>

      <div class="w-full flex justify-center">
        Bạn chưa có sản phẩm nào trong giỏ
      </div>
    </template>
  </div>
</template>

<script>
import { getAttrString } from '@/composable/common.js'
import { useCartStore } from '@/stores/cart'
import { cloneDeep } from 'lodash'
import { formatNumber } from '@/composable/formatNumber.js'

import { Modal } from 'ant-design-vue';

export default {
  setup() {
    const cart = useCartStore()

    return {
      cart,
      getAttrString,
      formatNumber
    }
  },
  computed: {
    items() {
      return this.cart.items || []
    },
    totalPrice() {
      return this.cart.totalPrice
    }
  },
  methods: {
    redirect(path) {
      this.cart.setState({ visibleCart: false })
      this.$router.push(path)
    },
    changeQuantity(idx, quantity) {
      const items = cloneDeep(this.items)

      items[idx].quantity = quantity
      this.cart.changeItems(items)
    },
    confirmDeleteItem(idx) {
      let that = this
      Modal.confirm({
        title: "Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?",
        okText: 'Tiếp tục',
        cancelText: "Hủy",
        onOk() {
          that.deleteItem(idx)
        },
        onCancel() {
        }
      })
    },
    deleteItem(idx) {
      const items = cloneDeep(this.items).splice(idx, 1)

      this.cart.changeItems(items)
    }
  }
}
</script>