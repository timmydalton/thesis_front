<template>
  <section class="checkout-page">
    <div class="sect-1 sect-card">
      <form>
        <div class="title mt-6">Thông tin giao hàng</div>

        <div class="flex gap-[20px] mt-8 mb-2">
          <a-input placeholder="Họ và tên" v-model:value="full_name" />

          <a-input placeholder="Số điện thoại" v-model:value="phone_number" />
        </div>

        <a-input class="mb-2" placeholder="Địa chỉ" v-model:value="address" />

        <div class="title mt-6 mb-6">Phương thức vận chuyển</div>
        
        <div class="form-radio mb-6">
          <a-radio-group name="radioGroup" v-model:value="shipping">
            <div class="radio-option" @click="shipping = '1'">
              <a-radio value="1">Giao hàng tận nơi</a-radio>
            </div>
            <div class="radio-option mt-2" @click="shipping = '2'">
              <a-radio value="2">Nhận hàng tại shop</a-radio>
            </div>
          </a-radio-group>
        </div>

        <div class="w-full">
          <div class="submit-btn">Hoàn tất đơn hàng</div>
        </div>
      </form>
    </div>

    <div class="sect-2 sect-card">
      <div class="cart-item p-12">
        <picture>
          <img src="https://content.pancake.vn/1/s900x900/fwebp/ac/f6/82/34/890483fbc5aad0bf331182612830234c9844faf8813519157a5a512e.png" draggable="false" fetchpriority="high" class="w-full h-full">
        </picture>

        <div class="w-full flex justify-center">
          Bạn chưa có sản phẩm nào trong giỏ
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      full_name: '',
      phone_number: '',
      address: '',
      shipping: "1"
    }
  }
}
</script>