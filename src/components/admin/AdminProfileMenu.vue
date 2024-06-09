<template>
  <a-popover trigger="hover" overlayClassName="db--topbar-profile--popover" placement="bottomRight">
    <div class="db--topbar-profile flex items-center cursor-pointer h-10">
      <div class="db--topbar-avatar mr-2">
        <img :src="user.me?.avatar || 'https://64.media.tumblr.com/0a049264fba0072a818f733a6c533578/tumblr_mqvlz4t5FK1qcnibxo1_540.pnj'" />
      </div>
      <div class="db--topbar-username flex items-center">
        <div class="username-text">
          <span id="account-text">{{fullName}}</span>
          <span id="email">
            <div style="overflow: hidden; vertical-align: middle;font-weight: 400; white-space: nowrap; text-align: center; display: inline-block;">{{ user.me.email }}</div>
          </span>
        </div>
        <Triangle class="svg-theme-2 ml-2"/>
      </div>
    </div>
    <template #content>
      <div class="db--topbar-user flex items-center"
        @click="onClickBackSites('/home')"
      >
        <span>Trang chủ</span>
      </div>

      <div class="db--topbar-user flex items-center"
        v-if="user.me?.role == 0"
        @click="onClickBackSites('/admin')"
      >
        <span>Quản lý cửa hàng</span>
      </div>

      <a-divider class="divider-3-0"/>

      <div class="db--topbar-user db--topbar--dropdown-avatar" @click="onClickProfile">
        <div style="display: flex; pointer-events: none;height: 46px; width: 46px;justify-content:center;align-items:center;">
          <span class="rr-status-badge ant-badge">
            <img :src="user.me.avatar || 'https://64.media.tumblr.com/0a049264fba0072a818f733a6c533578/tumblr_mqvlz4t5FK1qcnibxo1_540.pnj'" alt="" width="46" height="46" class=" customer-avatar-undefined" style="border-radius: 30px; background-color: rgb(225, 225, 225); object-fit: cover;width:100%;height:100%;">
          </span>
        </div>
        <div class="username-container">
          <span id="account-text">Tài khoản</span>
          <span>
            <div style="overflow: hidden; vertical-align: middle; text-overflow: ellipsis; max-width: 125px; font-weight: 400; white-space: nowrap; text-align: center; display: inline-block;">{{fullName}}</div>
          </span>
        </div>
        <a-tooltip title="Đăng xuất" placement="bottom">
          <div id="log-out-btn" @click="handleLogOut">
            <i aria-label="icon: logout" id="log-out-icon" class="anticon anticon-logout">
              <svg viewBox="64 64 896 896" class="" data-icon="logout" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9 353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z"></path>
              </svg>
            </i>
          </div>
        </a-tooltip>
      </div>
    </template>
  </a-popover>
</template>

<script>
import Triangle from "@/assets/icon/triangle.svg?component";
import LogOutIcon from "@/assets/icon/logout.svg?url";
import UserIcon from "@/assets/icon/user.svg?url";
import { ArrowBackUp } from 'vue-pancake-icons'

export default {
  setup() {
    return { LogOutIcon, UserIcon }
  },
  props: ["user"],
  components: {
    ArrowBackUp,
    Triangle
  },
  computed: {
    fullName() {
      const name = '' + (this.user.me.first_name || "") + (this.user.me.last_name ? " " + this.user.me.last_name : "") || this.user.me.username || "No name"
      return name;
    },
  },
  methods: {
    onClickProfile() {
      // this.$router.push(`/dashboard/setting`);
    },
    onClickBackSites(path) {
      this.$router.push(path);
    },
    goTo(page) {
      window.open(page, '_blank')
    },
    handleLogOut(e) {
      e.stopPropagation()
      this.delete_cookie('jwt')
      this.$router.replace({path: '/'})
    },
    delete_cookie(name) {
      document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  }
}
</script>

<style>

</style>