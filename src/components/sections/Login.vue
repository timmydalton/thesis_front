<template>
  <main class="wrapper sb-default">
    <section class="section-login-2">
      <div class="cr-login-page">
        <div class="container-fluid no-gutters">
          <div class="row">
            <div class="offset-lg-6 col-lg-6">
              <div class="content-detail">
                <div class="main-info">
                  <div class="hero-container login-form">
                    <div class="form-logo">
                      <img src="/logo.png" alt="logo">
                    </div>
                    <form class="cr-content-form">
                      <div class="form-group">
                        <label>Tên đăng nhập*</label>
                        <a-input class="cr-form-control" id="username" placeholder="Nhập tên đăng nhập..." v-model:value="username" />
                      </div>
                      <div class="form-group">
                        <label>Mật khẩu*</label>
                        <a-input-password class="cr-form-control" id="password" placeholder="Nhập mật khẩu..." v-model:value="password" />
                      </div>
                      <div class="remember">
                        <span class="form-group custom">
                          <a-checkbox id="html" :checked="true"/>
                          <label class="pl-2" for="html">Nhớ tài khoản</label>
                        </span>
                        <a class="link" href="forgot.html">Quên mật khẩu?</a>
                      </div><br>
                      <div class="login-buttons">
                        <a-button type="button" class="cr-button" @click="handleLogin" :loading="loading">Đăng nhập</a-button>
                        <a href="register.html" class="link">
                          Đăng ký?
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <!-- <section class="section-login padding-tb-100">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="mb-30 aos-init appear-animate">
            <div class="cr-banner">
              <h2>Đăng nhập tài khoản</h2>
            </div>
            <div class="cr-banner-sub-title">
              <p>Sử dụng thông tin đã được đăng ký để đăng nhập. </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="cr-login aos-init appear-animate">
            <div class="form-logo">
              <img src="/logo.png" alt="logo">
            </div>
            <form class="cr-content-form">
              <div class="form-group">
                <label>Tên đăng nhập*</label>
                <a-input class="cr-form-control" id="username" placeholder="Nhập tên đăng nhập..." v-model:value="username" />
              </div>
              <div class="form-group">
                <label>Mật khẩu*</label>
                <a-input-password class="cr-form-control" id="password" placeholder="Nhập mật khẩu..." v-model:value="password" />
              </div>
              <div class="remember">
                <span class="form-group custom">
                  <a-checkbox id="html" :checked="true"/>
                  <label class="pl-2" for="html">Nhớ tài khoản</label>
                </span>
                <a class="link" href="forgot.html">Quên mật khẩu?</a>
              </div><br>
              <div class="login-buttons">
                <button type="button" class="cr-button" @click="handleLogin">Đăng nhập</button>
                <a href="register.html" class="link">
                  Đăng ký?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section> -->
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
  mounted() {
    if (this.user.me.username) this.$router.push('/home')
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
          this.$message.success("Đăng nhập thành công!")
          const user = res.data.data
          const jwt = user.access_token

          setCookie('jwt', jwt)
          this.$router.push('/home')
        })
        .catch(err => {
          this.$message.error("Tên đăng nhập hoặc tài khoản không chính xác!")
          console.log(err)
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