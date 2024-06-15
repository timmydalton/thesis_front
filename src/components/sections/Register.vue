<template>
  <section class="section-register">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="mb-6">
            <div class="cr-banner">
                <h2>Đăng ký</h2>
            </div>
            <div class="cr-banner-sub-title">
              <p>Đăng ký tài khoản mới dành cho bạn. </p>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="cr-register">
            <!-- <div class="form-logo">
              <img src="assets/img/logo/logo.png" alt="logo">
            </div> -->
            <form class="cr-content-form">
              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <label>Tên đăng nhập</label>
                    <a-input class="cr-form-control" placeholder="Tên sử dụng để đăng nhập tài khoản" v-model:value="username"></a-input>
                  </div>
                </div>

                <div class="col-12 col-sm-6">
                  <div class="form-group">
                    <label>Mật khẩu</label>
                    <a-input-password class="cr-form-control" placeholder="Nhập mật khẩu" v-model:value="password"></a-input-password>
                  </div>
                </div>
                
                <div class="col-12 col-sm-6">
                  <div class="form-group">
                    <label>Nhập lại mật khẩu</label>
                    <a-input-password class="cr-form-control" placeholder="Nhập lại mật khẩu" v-model:value="repassword"></a-input-password>
                  </div>
                </div>

                <div class="col-12 col-sm-6">
                  <div class="form-group">
                    <label>Họ*</label>
                    <a-input class="cr-form-control" placeholder="Nhập họ" v-model:value="first_name"></a-input>
                  </div>
                </div>

                <div class="col-12 col-sm-6">
                  <div class="form-group">
                    <label>Tên*</label>
                    <a-input class="cr-form-control" placeholder="Nhập tên và tên đệm" v-model:value="last_name"></a-input>
                  </div>
                </div>

                <div class="col-12 col-sm-6">
                  <div class="form-group">
                    <label>Email*</label>
                    <a-input class="cr-form-control" placeholder="Nhập email" v-model:value="email"></a-input>
                  </div>
                </div>

                <div class="col-12 col-sm-6">
                  <div class="form-group">
                    <label>Số điện thoại*</label>
                    <a-input class="cr-form-control" placeholder="Số điện thoại" v-model:value="phone_number"></a-input>
                  </div>
                </div>

                <div class="col-12">
                  <div class="form-group">
                    <label>Địa chỉ</label>
                    <a-input class="cr-form-control" placeholder="Số nhà, đường, quận, thành phố,..." v-model:value="address"></a-input>
                  </div>
                </div>

                <div class="cr-register-buttons">
                  <a-button class="cr-button" type="primary" :loading="loading" @click="handleRegister">Đăng ký</a-button>

                  <a href="/login" class="link">Đã có tài khoản?</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- <div class="section-account-form">
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
  </div> -->
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
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      address: '',
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