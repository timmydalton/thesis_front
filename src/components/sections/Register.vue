<template>
  <div class="section-account-form">
    <div class="content-wrapper">
      <div class="account-header mb-6">
        Đăng ký tài khoản
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

          <a-input-password class="mb-2" placeholder="Nhập mật khẩu..." v-model:value="password" />

          <div class="form-text mb-2">
            Nhập lại mật khẩu
          </div>

          <a-input-password placeholder="Nhập lại mật khẩu..." v-model:value="repassword" />
        </div>

        <div class="flex flex-col items-center mt-4">
          <a-button type="primary">Đăng ký</a-button>
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
      password: '',
      repassword: ''
    }
  }
}
</script>

<style>

</style>