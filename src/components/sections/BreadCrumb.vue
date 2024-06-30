<template>
  <section class="section-breadcrumb">
    <div class="cr-breadcrumb-image">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="cr-breadcrumb-title">
              <h2>{{ title }}</h2>
              <span><a href="/home">Trang chủ</a> - {{ title }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    siteName() {
      return this.$route.name
    },
    title() {
      switch (this.siteName) {
        case 'cart':
          return 'Giỏ hàng'
        case 'product':
          return 'Sản phẩm'
        case 'category':
          return 'Danh mục'
        case 'checkout':
          return 'Đặt đơn'
        case 'tracking':
          return 'Tra cứu đơn'
        case 'design':
          return 'Thiết kế'
        case 'profile':
          return 'Trang cá nhân'
        default:
          return 'Page title'
      }
    },
  }
}
</script>