<template>
  <section class="section-cart">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="mb-30 appear-animate">
            <div class="cr-banner">
              <h2>Giỏ hàng</h2>
            </div>
            <div class="cr-banner-sub-title">
              <p>Hiển thị các sản phẩm trong giỏ hàng của bạn, bạn có thể kiểm tra lại giỏ hàng,
                thay đổi số lượng hoặc xóa sản phẩm khỏi giỏ hàng. </p>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="cr-cart-content appear-animate">
            <div class="row">
              <form action="">
                <div class="cr-table-content">
                  <table>
                    <thead>
                      <tr>
                        <th>Tên sản phẩm</th>
                        <th>Thuộc tính</th>
                        <th>Giá</th>
                        <th class="text-center">Số lượng</th>
                        <th>Thành tiền</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, idx) in items" :key="item.id">
                        <td class="cr-cart-name">
                          <a href="javascript:void(0)">
                            <img :src="item.images?.[0]" alt="product-1" class="cr-cart-img">
                            {{ item.product?.name || 'No name' }}
                          </a>
                        </td>
                        <td class="cr-cart-attribute">
                          <span>{{ getAttrString(item) }}</span>
                        </td>
                        <td class="cr-cart-price">
                          <span class="amount">{{ item.retail_price }}₫</span>
                        </td>
                        <td class="cr-cart-qty">
                          <div class="cart-qty-plus-minus">
                            <button type="button" class="plus" @click="changeQuantity(idx, item.quantity + 1)">+</button>
                            <input :value="item.quantity" @input="changeQuantity(idx, parseInt($event.target.value) || 1)" type="text" placeholder="." value="1" minlength="1" maxlength="20" class="quantity">
                            <button type="button" class="minus" @click="changeQuantity(idx, item.quantity - 1 || 1)">-</button>
                          </div>
                        </td>
                        <td class="cr-cart-subtotal">{{ item.retail_price * item.quantity }}₫</td>
                        <td class="cr-cart-remove">
                          <a @click="confirmDeleteItem(idx)">
                            <i class="ri-delete-bin-line"></i>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-12">
              <div class="cr-cart-update-bottom">
                <a @click="redirect('/home')" class="cr-links">Tiếp tục mua sắm</a>
                <a @click="redirect('/checkout')" class="cr-button">
                  Check Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useCartStore } from '@/stores/cart'
import { getAttrString } from '@/composable/common.js'
import { cloneDeep } from 'lodash'
import { Modal } from 'ant-design-vue'

export default {
  setup() {
    const cart = useCartStore()

    return {
      cart,
      getAttrString
    }
  },
  computed: {
    items() {
      return this.cart.items
    }
  },
  methods: {
    redirect(path) {
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