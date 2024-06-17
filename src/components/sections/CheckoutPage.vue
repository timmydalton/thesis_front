<template>
  <section class="checkout-section">
    <div class="container">
      <div class="row">
        <div class="cr-checkout-rightside col-lg-4 col-md-12">
          <div class="cr-sidebar-wrap">
            <div class="cr-sidebar-block">
              <div class="cr-sb-title">
                <h3 class="cr-sidebar-title">Giỏ hàng</h3>
              </div>
              
              <div class="cr-sb-block-content">
                <div class="cr-checkout-summary">
                  <div>
                    <span class="text-left">Tổng tiền hàng</span>
                    <span class="text-right">{{ totalPrice }}₫</span>
                  </div>
                  <div>
                    <span class="text-left">Phí ship</span>
                    <span class="text-right">{{ shippingFee }}₫</span>
                  </div>

                  <div class="cr-checkout-summary-total">
                    <span class="text-left">Tổng thanh toán</span>
                    <span class="text-right">{{ totalPrice + shippingFee }}₫</span>
                  </div>
                </div>

                <div class="cr-checkout-pro">
                  <template v-if="items.length">
                    <div class="col-sm-12 mb-6" v-for="item in items" :key="item.id">
                      <div class="cr-product-inner">
                        <div class="cr-pro-image-outer">
                          <div class="cr-pro-image">
                            <a :href="`/product/${item.product.id}`" class="image">
                              <img class="main-image" :src="item.images?.[0]" alt="Product">
                            </a>
                          </div>
                        </div>
                        <div class="cr-pro-content cr-product-details">
                          <h5 class="cr-pro-title"><a :href="`/product/${item.product.id}`">{{ item.product?.name }}</a></h5>
                          <div class="cr-pro-quantity">{{ getAttrString(item) }} × {{ item.quantity }}</div>
                          <div class="cr-pro-rating">
                            <svg v-for="i in 5" width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path fill="#FCD53F" d="m18.7 4.627l2.247 4.31a2.27 2.27 0 0 0 1.686 1.189l4.746.65c2.538.35 3.522 3.479 1.645 5.219l-3.25 2.999a2.225 2.225 0 0 0-.683 2.04l.793 4.398c.441 2.45-2.108 4.36-4.345 3.24l-4.536-2.25a2.282 2.282 0 0 0-2.006 0l-4.536 2.25c-2.238 1.11-4.786-.79-4.345-3.24l.793-4.399c.14-.75-.12-1.52-.682-2.04l-3.251-2.998c-1.877-1.73-.893-4.87 1.645-5.22l4.746-.65a2.23 2.23 0 0 0 1.686-1.189l2.248-4.309c1.144-2.17 4.264-2.17 5.398 0"/></svg>
                          </div>
                          <p class="cr-price"><span class="new-price">{{ item.retail_price }}₫</span> <span class="old-price">{{ item.original_price }}₫</span></p>
                        </div>
                      </div>
                    </div>
                  </template>

                  <div v-else>
                    <picture>
                      <img src="https://content.pancake.vn/1/s900x900/fwebp/ac/f6/82/34/890483fbc5aad0bf331182612830234c9844faf8813519157a5a512e.png" draggable="false" fetchpriority="high" style="width: 200px; margin: 0 auto;">
                    </picture>

                    <div class="w-full flex justify-center">
                      Bạn chưa có sản phẩm nào trong giỏ
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="cr-sidebar-wrap cr-checkout-pay-wrap">
            <div class="cr-sidebar-block">
              <div class="cr-sb-title">
                <h3 class="cr-sidebar-title">Phương thức thanh toán</h3>
              </div>

              <div class="cr-sb-block-content">
                <div class="cr-checkout-pay">
                  <div class="cr-pay-desc">
                    Vui lòng phương thức thanh toán cho đơn hàng của bạn
                  </div>

                  <a-radio-group name="radioGroup" v-model:value="paymentMethod">
                    <div class="radio-option" @click="paymentMethod = 'cod'">
                      <a-radio value="cod">Thanh toán khi nhận hàng (COD)</a-radio>
                    </div>
                    <div class="radio-option mt-2" @click="paymentMethod = 'banking'">
                      <a-radio value="banking">Chuyển khoản</a-radio>
                    </div>
                  </a-radio-group>
                </div>
              </div>
            </div>
          </div>

          <div class="cr-sidebar-wrap cr-check-pay-img-wrap" v-if="paymentMethod == 'banking'">
            <div class="cr-sidebar-block">
              <div class="cr-sb-title">
                <h3 class="cr-sidebar-title">Chấp nhận thanh toán</h3>
              </div>

              <div class="cr-sb-block-content">
                <div class="cr-check-pay-img-inner">
                  <div class="cr-check-pay-img">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9q0sqA5NdwQUjBroTrgKxBchTW7cB40KjUQ&s" alt="payment">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="cr-checkout-leftside col-lg-8 col-md-12 m-t-991">
          <div class="cr-checkout-content">
            <div class="cr-checkout-inner">
              <div class="cr-checkout-wrap">
                <div class="cr-checkout-block cr-check-bill">
                  <h3 class="cr-checkout-title">Thông tin đơn hàng</h3>

                  <div class="cr-bl-block-content">
                    <div class="cr-check-bill-form mb-minus-24">
                      <form>
                        <span class="cr-bill-wrap cr-bill-half">
                          <label>Họ*</label>
                          <input type="text" name="firstname" placeholder="Nhập họ" required="">
                        </span>
                        <span class="cr-bill-wrap cr-bill-half">
                          <label>Tên*</label>
                          <input type="text" name="lastname" placeholder="Nhập tên đệm và tên" required="">
                        </span>
                        <span class="cr-bill-wrap">
                          <label>Địa chỉ</label>
                          <input type="text" name="address" placeholder="Số nhà xx, đường yy,...">
                        </span>
                        <span class="cr-bill-wrap cr-bill-half">
                          <label>Tỉnh/Thành phố *</label>
                          <span class="cr-bl-select-inner">
                            <select name="cr_select_city" id="cr-select-city" class="cr-bill-select" :value="selectedCity"  @change="selectedCity = $event.target.value">
                              <option value="" selected="" disabled="">Chưa chọn</option>
                              <option :value="city.code" v-for="city in listCity" :key="city.code">{{ city.name }}</option>
                            </select>
                          </span>
                        </span>
                        <span class="cr-bill-wrap cr-bill-half">
                          <label>Số điện thoại</label>
                          <input type="text" name="phonenumber" placeholder="09xxxxxxxxx">
                        </span>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <span class="cr-check-order-btn">
                <a class="cr-button mt-8" href="#">Đặt hàng</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getAttrString } from '@/composable/common.js'
import { useCartStore } from '@/stores/cart'
import { cloneDeep } from 'lodash'
import city from '@/common/city.json'

export default {
  setup() {
    const cart = useCartStore()

    return {
      cart,
      getAttrString
    }
  },
  data() {
    return {
      full_name: '',
      phone_number: '',
      address: '',
      shipping: "1",
      paymentMethod: 'cod',
      selectedCity: ''
    }
  },
  computed: {
    items() {
      return this.cart.items || []
    },
    totalPrice() {
      return this.cart.totalPrice
    },
    shippingFee() {
      switch (this.selectedCity) {
        case '01':
          return 0
        default:
          return 20000
      }
    },
    listCity() {
      return Object.values(city)
    }
  },
  methods: {
  }
}
</script>