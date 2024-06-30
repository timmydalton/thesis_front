<template>
  <section class="payment-result-section">
    <div class="row appear-animate">
        <div class="col-lg-12">
          <div class="mb-6">
            <div class="cr-banner">
              <h2>{{ processingText }}</h2>
            </div>
            <div class="cr-banner-sub-title">
              <p>Bạn sẽ được chuyển hướng trong giây lát...</p>
            </div>
          </div>
        </div>
      </div>
  </section>
</template>

<script>
import { useMainStore } from '@/stores/store'

export default {
  setup() {
    const mainStore = useMainStore()

    return {
      mainStore
    }
  },
  data() {
    return {
      processingText: 'Đang xử lý...'
    }
  },
  mounted() {
    const params = new URLSearchParams(window.location.href.split('?')?.[1] || '')

    params.entries().forEach(([key, value]) => {
      console.log([key, value])
    })

    const paymentStatus = params.get('vnp_ResponseCode')
    
    switch (paymentStatus) {
      case '00':
        this.processingText = 'Thanh toán thành công!'
        break
      case '11':
        this.processingText = 'Thanh toán thất bại: Quá thời gian thanh toán'
        break
      case '12':
        this.processingText = 'Thanh toán thất bại: Thẻ bị khóa'
        break
      case '13':
        this.processingText = 'Thanh toán thất bại: Nhập sai OTP'
        break
      case '24':
        this.processingText = 'Thanh toán thất bại: Hủy giao dịch'
        break
      case '75':
        this.processingText = 'Thanh toán thất bại: Ngân hàng bảo trì'
        break
      default:
        this.processingText = 'Thanh toán thất bại'
        break
    }

    if (paymentStatus == '00') {
      this.mainStore.orderPaymentSuccess(this.order_id)
    }

    setTimeout(() => {
      window.open(`/order/${this.order_id}`, '_self')
    }, 3000)
  },
  computed: {
    order_id() {
      return this.$route.params?.order_id
    }
  }
}
</script>