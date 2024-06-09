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

          <a-alert class="mt-2" type="error" :message="alertText" v-if="showAlert"/>
        </div>

        <div class="flex flex-col items-center mt-4">
          <a-button type="primary" :loading="loading" @click="handleRegister">Đăng ký</a-button>
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
      repassword: '',
      alertText: '',
      showAlert: false,
      loading: false,
    }
  },
  mounted() {
    if (this.user.me.username) this.$router.push('/home')
  },
  watch: {
    password() {
      this.showAlert = false
    },
    repassword() {
      this.showAlert = false
    }
  },
  methods: {
    handleRegister() {
      if (!this.username || !this.password) {
        this.alertText = 'Bạn phải nhập đầy đủ thông tin!'
        this.showAlert = true
        return
      }
      if (this.password != this.repassword) {
        this.alertText = 'Mật khẩu nhập lại không chính xác!'
        this.showAlert = true
        return
      }

      this.loading = true

      this.user.createAccount(this.username, this.password)
        .then(res => {
          if (res.status == 200) {
            this.handleLogin()
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
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

<style>

</style>