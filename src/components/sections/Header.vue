<template>
  <header>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="top-header">
            <a :href="'/home'" class="cr-logo">
              <img src="/logo.png" alt="logo" class="logo">
            </a>
            <div class="cr-search">
              <a-input class="search-input" v-model:value="searchTerm" @keyup="keyupSearch" type="text" placeholder="Tìm kiếm sản phẩm..."></a-input>
              <a class="search-btn" @click="clickSearch">
                <SearchOutlined/>
              </a>
            </div>
            <div class="cr-right-bar">
              <ul class="navbar-nav">
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle cr-right-bar-item" v-if="!isLoggedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="96" r="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></circle><path d="M32,216c19.37-33.47,54.55-56,96-56s76.63,22.53,96,56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
                    <span>Tài khoản</span>
                  </a>
                  <a class="nav-link dropdown-toggle cr-right-bar-item" href="/profile" v-else>
                    <img
                      style="width: 21px; height: 21px; border-radius: 50%"
                      :src="me.avatar || 'https://statics.pancake.vn/web-media/91/68/aa/4d/2f5c95ba23476f5549910882e4e42530fdee6123b4a995e226e18e3e.svg'"
                      alt=""
                      class="mr-1"
                    >
                    <span>{{ getName(me) }}</span>
                  </a>
                  <ul class="dropdown-menu">
                    <template v-if="!me.username">
                      <li>
                        <a class="dropdown-item" :href="'/register'">Đăng ký</a>
                      </li>
                      <li>
                        <a class="dropdown-item" :href="'/login'">Đăng nhập</a>
                      </li>
                    </template>
                    <template v-else>
                      <li>
                        <a class="dropdown-item" :href="'/profile'">Trang cá nhân</a>
                      </li>
                      <li v-if="me.role == 0">
                        <a class="dropdown-item" :href="'/admin'">Quản lý cửa hàng</a>
                      </li>
                      <li>
                        <a class="dropdown-item" @click="handleLogOut">Đăng xuất</a>
                      </li>
                    </template>
                  </ul>
                </li>
              </ul>
              <a @click="visibleCart = !visibleCart" class="cr-right-bar-item cursor-pointer Shopping-toggle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.2991 9.50857L13.472 3H10.528L6.70093 9.50857H1.5L3.46262 17.6686C3.75701 19.0286 4.93458 20 6.30841 20H17.6916C19.0654 20 20.1449 19.0286 20.5374 17.6686L22.5 9.50857H17.2991V9.50857ZM11.4112 4.74857H12.5888L15.4346 9.60571H8.56542L11.4112 4.74857ZM18.9673 17.28C18.8692 17.5714 18.771 17.8629 18.4766 18.0571C18.2804 18.2514 17.986 18.3486 17.6916 18.3486H6.30841C6.01402 18.3486 5.71963 18.2514 5.52336 18.0571C5.3271 17.8629 5.13084 17.5714 5.03271 17.3771L3.56075 11.2571H20.4393L18.9673 17.28Z" fill="currentColor"></path>
                </svg>
                <span>Giỏ hàng</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cr-fix">
      <div class="container">
        <div class="cr-menu-list">
          <div class="cr-category-icon-block">
            <div class="cr-category-menu">
              <div class="cr-category-toggle">
                <i class="ri-menu-2-line"></i>
              </div>
            </div>
            <div class="cr-cat-dropdown">
              <div class="cr-cat-block">
                <div class="cr-cat-tab">
                  <div class="cr-tab-list nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <button class="nav-link" :class="{'active': selectedCategoryId == cate.id}" v-for="cate in listCategories" :key="cate.id" @click="selectCategory(cate)">
                      {{ cate.name }}
                    </button>
                  </div>
                  <div class="tab-content" id="v-pills-tabContent">
                    <div class="tab-pane fade active show">
                      <div class="tab-list row">
                        <div class="col">
                          <h6 class="cr-col-title cursor-pointer" @click="openCategory(selectedCategory)">{{ selectedCategory.name }}</h6>
                          <ul class="cat-list">
                            <li v-for="item in selectedCategory.children" :key="item.id" @click="openCategory(item)"><a>{{ item.name }}</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <nav class="navbar navbar-expand-lg">
            <div class="navbar-collapse">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a :href="'/home'" class="nav-link">Trang chủ</a>
                </li>
                <li class="nav-item">
                  <a :href="'/category/all'" class="nav-link">Tất cả sản phẩm</a>
                </li>
                <li class="nav-item">
                  <a :href="'/tracking'" class="nav-link">Tra cứu đơn</a>
                </li>
                <li class="nav-item">
                  <a :href="'/design'" class="nav-link">Thiết kế</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>

    <a-drawer
      title="Giỏ hàng"
      placement="right"
      :closable="false"
      class="custom-cart"
      v-model:open="visibleCart"
    >
      <Cart />
    </a-drawer>
  </header>
</template>

<script>
import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons-vue"

import AdminProfileMenu from '../admin/AdminProfileMenu.vue'
import Cart from '@/components/element/Cart.vue'

import { useUserStore } from '@/stores/user'
import { useMainStore } from '@/stores/store'
import { useCartStore } from '@/stores/cart'

export default {
  setup() {
    const user = useUserStore()
    const mainStore = useMainStore()
    const cart = useCartStore()

    return {
      user,
      cart,
      mainStore
    }
  },
  components: {
    CaretDownOutlined,
    SearchOutlined,
    AdminProfileMenu,
    Cart
  },
  mounted() {
    const params = new URLSearchParams(window.location.href.split('?')?.[1] || '')

    this.searchTerm = params.get('term')
  },
  data() {
    return {
      selectedCate: '',
      searchTerm: ''
    }
  },
  computed: {
    me() {
      return this.user.me || {}
    },
    listCategories() {
      return this.mainStore.categories.data
    },
    visibleCart: {
      get() {
        return this.cart.visibleCart
      },
      set(value) {
        this.cart.setState({ visibleCart: value })
      }
    },
    selectedCategoryId: {
      get() {
        return this.selectedCate || this.listCategories?.[0]?.id || ''
      },
      set(value) {
        this.selectedCate = value
      }
    },
    selectedCategory() {
      return (this.listCategories || []).find(el => el.id == this.selectedCategoryId) || this.listCategories[0] || {}
    },
    isLoggedIn() {
      return !!this.me.username
    }
  },
  methods: {
    handleClickCate(id) {
      this.$router.replace(`/category/${id}`)
    },
    redirect(path) {
      this.$router.push(path)
    },
    handleLogOut(e) {
      e.stopPropagation()
      this.delete_cookie('jwt')
      window.location.replace('/home')
    },
    delete_cookie(name) {
      document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    },
    selectCategory(cate) {
      this.selectedCate = cate.id
    },
    openCategory(cate) {
      this.handleClickCate(cate.id)
    },
    getName(user) {
      let text = ''
      if (user.first_name) text += user.first_name
      if (user.last_name) text += ' ' + user.last_name
      if (!text) text += user.username

      return text
    },
    keyupSearch(e) {
      if (e.keyCode == 13) this.clickSearch()
    },
    clickSearch() {
      if (!this.searchTerm) {
        this.$message.error('Bạn chưa nhập từ khóa tìm kiếm!')
        return
      }
      window.open(`/search?term=${this.searchTerm}`, '_self')
    }
  }
}
</script>