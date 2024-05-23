<template>
  <div class="section-account-form">
    <div class="content-wrapper">
      <div class="account-header mb-6">
        Đăng nhập
      </div>
      <div class="account-header-2 mb-2">
        <span>Chưa có tài khoản?&nbsp;</span>
        <a href="/register">Đăng ký ngay</a>
      </div>

      <form>
        <div class="form-wrapper">
          <div class="form-text mb-2">
            Tên đăng nhập
          </div>

          <a-input class="mb-2" placeholder="Nhập tên đăng nhập..." v-model:value="username" />

          <div class="form-text mb-2">
            Mật khẩu
          </div>

          <a-input-password placeholder="Nhập mật khẩu..." v-model:value="password" />
        </div>

        <div class="flex flex-col items-center mt-4">
          <a-button type="primary">Đăng nhập</a-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style lang="sass" scoped>
</style>