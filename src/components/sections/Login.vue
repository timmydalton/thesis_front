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

          <a-alert class="mt-2" type="error" :message="alertText" v-if="showAlert"/>
        </div>

        <div class="flex flex-col items-center mt-4">
          <a-button type="primary" @click="handleLogin">Đăng nhập</a-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'
import { setCookie } from '@/composable/common.js'

export default {
  setup() {
    const user = useUserStore()

    return { user }
  },
  data() {
    return {
      username: '',
      password: '',
      alertText: '',
      showAlert: false,
      loading: false,
    }
  },
  methods: {
    handleLogin() {
      if (!this.username || !this.password) {
        this.alertText = 'Bạn phải nhập đầy đủ thông tin!'
        this.showAlert = true
        return
      }

      this.loading = true

      this.user.handleLogin(this.username, this.password)
        .then(res => {
          const user = res.data.data
          const jwt = user.access_token

          setCookie('jwt', jwt)
          this.$router.push('/home')
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>