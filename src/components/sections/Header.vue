<template>
  <section class="sect-h1">
    <div class="sect-left">
      <div class="icon mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 24 24" class="phone-in-talk"><path d="M15,12H17A5,5 0 0,0 12,7V9A3,3 0 0,1 15,12M19,12H21C21,7 16.97,3 12,3V5C15.86,5 19,8.13 19,12M20,15.5C18.75,15.5 17.55,15.3 16.43,14.93C16.08,14.82 15.69,14.9 15.41,15.18L13.21,17.38C10.38,15.94 8.06,13.62 6.62,10.79L8.82,8.59C9.1,8.31 9.18,7.92 9.07,7.57C8.7,6.45 8.5,5.25 8.5,4A1,1 0 0,0 7.5,3H4A1,1 0 0,0 3,4A17,17 0 0,0 20,21A1,1 0 0,0 21,20V16.5A1,1 0 0,0 20,15.5Z"/></svg>
      </div>
      <div class="mr-2">
        Hotline:
      </div>
      <div class="phone-number">
        0392645338
      </div>
    </div>

    <div class="sect-right">
    </div>
  </section>

  <section class="sect-h2">
    <div class="logo">
      <picture>
        <source media="(min-width: 1920px)" comp="auto" srcset="https://content.pancake.vn/1/s1050x700/fwebp/fc/e0/d4/19/b47dadb810fd9b0b56963ff1bc6a853f9e3161de7eb8ebf8b835027a.png">
        <source media="(min-width: 1680px) and (max-width: 1919px)" comp="auto" srcset="https://content.pancake.vn/1/s1050x700/fwebp/fc/e0/d4/19/b47dadb810fd9b0b56963ff1bc6a853f9e3161de7eb8ebf8b835027a.png">
        <source media="(min-width: 1024px) and (max-width: 1679px)" comp="auto" srcset="https://content.pancake.vn/1/s1050x700/fwebp/fc/e0/d4/19/b47dadb810fd9b0b56963ff1bc6a853f9e3161de7eb8ebf8b835027a.png">
        <source media="(max-width: 424px)" comp="auto" srcset="https://content.pancake.vn/1/s1050x700/fwebp/fc/e0/d4/19/b47dadb810fd9b0b56963ff1bc6a853f9e3161de7eb8ebf8b835027a.png">
        <source media="(min-width: 768px) and (max-width: 1023px)" comp="auto" srcset="https://content.pancake.vn/1/s1050x700/fwebp/fc/e0/d4/19/b47dadb810fd9b0b56963ff1bc6a853f9e3161de7eb8ebf8b835027a.png">
        <source media="(min-width: 425px) and (max-width: 767px)" comp="auto" srcset="https://content.pancake.vn/1/s1050x700/fwebp/fc/e0/d4/19/b47dadb810fd9b0b56963ff1bc6a853f9e3161de7eb8ebf8b835027a.png">

        <img x:visible="" src="https://content.pancake.vn/1/s900x900/fwebp/fc/e0/d4/19/b47dadb810fd9b0b56963ff1bc6a853f9e3161de7eb8ebf8b835027a.png" draggable="false" fetchpriority="high" class="w-full h-full">
      </picture>
    </div>

    <div class="menu">
      <div class="menu-item">
        <a href="/home">
          Trang chủ
        </a>
      </div>
      <a-popover trigger="hover" overlayClassName="header-popover" placement="bottom">
        <template #content>
          <a-menu :selected-keys="[]" style="width: 256px" mode="vertical">
            <component :is="cate.children?.length ? 'a-sub-menu' : 'a-menu-item'" v-for="cate in listCategories" :key="cate.id" :title="cate.name" @click="handleClickCate(cate.id)">
              <template v-if="cate.children?.length">
                <a-menu-item v-for="item in cate.children" @click="handleClickCate(item.id)">
                  {{ item.name }}
                </a-menu-item>
              </template>
              <span v-else>{{ cate.name }}</span>
            </component>
          </a-menu>
        </template>
        <div class="menu-item">
          <a href="/category/all">
            Sản phẩm
            <CaretDownOutlined/>
          </a>
        </div>
      </a-popover>
      <div class="menu-item">
        <a href="/design">
          Thiết kế
        </a>
      </div>
    </div>

    <div class="header-right">
      <div class="flex">
        <div class="cart mr-4 cursor-pointer" @click="visibleCart = !visibleCart">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.2991 9.50857L13.472 3H10.528L6.70093 9.50857H1.5L3.46262 17.6686C3.75701 19.0286 4.93458 20 6.30841 20H17.6916C19.0654 20 20.1449 19.0286 20.5374 17.6686L22.5 9.50857H17.2991V9.50857ZM11.4112 4.74857H12.5888L15.4346 9.60571H8.56542L11.4112 4.74857ZM18.9673 17.28C18.8692 17.5714 18.771 17.8629 18.4766 18.0571C18.2804 18.2514 17.986 18.3486 17.6916 18.3486H6.30841C6.01402 18.3486 5.71963 18.2514 5.52336 18.0571C5.3271 17.8629 5.13084 17.5714 5.03271 17.3771L3.56075 11.2571H20.4393L18.9673 17.28Z" fill="currentColor"></path>
          </svg>

          <div class="cart-item-count">
            0
          </div>
        </div>

        <a href="/login" v-if="!user.me?.username">
          <div class="account flex items-center">
            <div style="height: 24px; width: 24px;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none"></rect><circle cx="128" cy="96" r="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></circle><path d="M32,216c19.37-33.47,54.55-56,96-56s76.63,22.53,96,56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
              </svg>
            </div>

            <div>Tài khoản</div>
          </div>
        </a>

        <AdminProfileMenu :user="user" v-else/>
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
  </section>
</template>

<script>
import { CaretDownOutlined } from "@ant-design/icons-vue"

import AdminProfileMenu from '../admin/AdminProfileMenu.vue'
import Cart from '@/components/element/Cart.vue'

import { useUserStore } from '@/stores/user'
import { useMainStore } from '@/stores/store'

export default {
  setup() {
    const user = useUserStore()
    const mainStore = useMainStore()

    return {
      user,
      mainStore
    }
  },
  components: {
    CaretDownOutlined,
    AdminProfileMenu,
    Cart
  },
  data() {
    return {
      visibleCart: false
    }
  },
  computed: {
    listCategories() {
      return this.mainStore.categories.data
    }
  },
  methods: {
    handleClickCate(id) {
      this.$router.replace(`/category/${id}`)
    }
  }
}
</script>