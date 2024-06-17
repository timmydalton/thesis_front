<template>
  <header>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="top-header">
            <a @click="redirect('/home')" class="cr-logo">
              <img src="https://maraviyainfotech.com/projects/carrot/carrot-v2/carrot-html/assets/img/logo/logo.png" alt="logo" class="logo">
            </a>
            <form class="cr-search">
              <input class="search-input" type="text" placeholder="Tìm kiếm sản phẩm...">
              <!-- <select class="form-select" aria-label="Default select example">
                <option selected="">All Categories</option>
                <option value="1">Mens</option>
                <option value="2">Womens</option>
                <option value="3">Electronics</option>
              </select> -->
              <a href="" class="search-btn">
                <SearchOutlined/>
              </a>
            </form>
            <div class="cr-right-bar">
              <ul class="navbar-nav">
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle cr-right-bar-item" :href="me.username ? '/profile' : ''">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="96" r="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></circle><path d="M32,216c19.37-33.47,54.55-56,96-56s76.63,22.53,96,56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
                    <span>{{ me.username ? me.username : 'Account' }}</span>
                  </a>
                  <ul class="dropdown-menu">
                    <template v-if="!me.username">
                      <li>
                        <a class="dropdown-item" href="/register">Đăng ký</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/login">Đăng nhập</a>
                      </li>
                    </template>
                    <template v-else>
                      <li>
                        <a class="dropdown-item" href="/admin">Quản lý</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="">Đăng xuất</a>
                      </li>
                    </template>
                  </ul>
                </li>
              </ul>
              <a @click="visibleCart = !visibleCart" class="cr-right-bar-item cursor-pointer Shopping-toggle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.2991 9.50857L13.472 3H10.528L6.70093 9.50857H1.5L3.46262 17.6686C3.75701 19.0286 4.93458 20 6.30841 20H17.6916C19.0654 20 20.1449 19.0286 20.5374 17.6686L22.5 9.50857H17.2991V9.50857ZM11.4112 4.74857H12.5888L15.4346 9.60571H8.56542L11.4112 4.74857ZM18.9673 17.28C18.8692 17.5714 18.771 17.8629 18.4766 18.0571C18.2804 18.2514 17.986 18.3486 17.6916 18.3486H6.30841C6.01402 18.3486 5.71963 18.2514 5.52336 18.0571C5.3271 17.8629 5.13084 17.5714 5.03271 17.3771L3.56075 11.2571H20.4393L18.9673 17.28Z" fill="currentColor"></path>
                </svg>
                <span>Cart</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cr-fix">
      <div class="container">
        <div class="cr-menu-list">
          <div></div>
          <nav class="navbar navbar-expand-lg">
            <div class="navbar-collapse">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a @click="redirect('/home')" class="nav-link">Trang chủ</a>
                </li>
                <li class="nav-item">
                  <a @click="redirect('/category/all')" class="nav-link">Tất cả sản phẩm</a>
                </li>
                <li class="nav-item">
                  <a @click="redirect('/design')" class="nav-link">Thiết kế</a>
                </li>
                <!-- <li class="nav-item dropdown">
                  <a href="/category/all" class="nav-link dropdown-toggle">Danh mục <CaretDownOutlined class="icon"/> </a>
                  <ul class="dropdown-menu">
                    <li>
                      <a href="" class="dropdown-item"></a>
                    </li>
                  </ul>
                </li> -->
              </ul>
            </div>
          </nav>
          <div></div>
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
    }
  },
  methods: {
    handleClickCate(id) {
      this.$router.replace(`/category/${id}`)
    },
    redirect(path) {
      this.$router.push(path)
    }
  }
}
</script>