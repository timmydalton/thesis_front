<template>
  <section class="section-tracking" style="padding: 100px 0">
    <div class="container">
      <div class="row appear-animate">
        <div class="col-lg-12">
          <div class="mb-6">
            <div class="cr-banner">
              <h2>Tra cứu đơn hàng</h2>
            </div>
            <div class="cr-banner-sub-title">
              <p>Tra cứu đơn hàng dựa theo mã đơn và sdt</p>
            </div>
          </div>
        </div>
      </div>

      <div class="row appear-animate">
        <div class="col-12">
          <div class="cr-register">
            <form class="cr-content-form">
              <div class="row">
                <div class="col-12 col-sm-6">
                  <div class="form-group">
                    <label>Mã đơn hàng</label>
                    <a-input class="cr-form-control" placeholder="Mã đơn có dạng 3, 10, hoặc 50" v-model:value="id"></a-input>
                  </div>
                </div>

                <div class="col-12 col-sm-6">
                  <div class="form-group">
                    <label>Số điện thoại</label>
                    <a-input class="cr-form-control" placeholder="Nhập số điện thoại sử dụng với đơn hàng" v-model:value="phone"></a-input>
                  </div>
                </div>

                <div class="flex items-center justify-center">
                  <a-button class="cr-button" type="primary" :loading="loading" @click="handleTracking">Tìm kiếm</a-button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useApipost, useApiget } from "@/composable/fetch.js"

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL

export default {
  data() {
    return {
      id: '',
      phone: '',
      loading: false,
      viewOrder: {}
    }
  },
  methods: {
    handleTracking() {
      if (!this.phone || !this.id) {
        this.$message.error("Bạn chưa nhập đầy đủ thông tin!")
        return
      }

      this.loading = true

      const params = {
        order_display_id: this.id,
        phone_number: this.phone
      }

      return useApiget(`${VITE_BACKEND_API_URL}/api/store/order/tracking_order`, params)
        .then(res => {
          if (res.status == 200 && res.data) this.$router.push(`/order/${res.data.order.id}`)
        })
        .catch(err => {
          console.log(err)
          this.$message.error("Thông tin đơn hàng không đúng!")
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>