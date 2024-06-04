<template>
  <div :class="{'h-full db-sidebar--main': true}">
    <div :class="{
      'sidebar-left-panel flex': true,
      'minimized': general.minimizedSidebar
    }">
      <div class="flex w-full items-center">
        <div class="icon-wrapper">
          <LogoSmall v-if="general.minimizedSidebar"/>
          <LogoLight v-else/>
        </div>
        <div class="toggle-sidebar-btn flex items-center justify-center cursor-pointer" @click="toggleSidebar">
          <!-- <svg class="svg-theme-stroke" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7.33331 4.66665L3.99998 7.99998L7.33331 11.3333" stroke="#262626" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 4.66665L8.66667 7.99998L12 11.3333" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
          </svg> -->
          <svg class="svg-theme-stroke" width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 6C12.5 6.13261 12.4473 6.25979 12.3536 6.35355C12.2598 6.44732 12.1326 6.5 12 6.5H3.70687L7.35375 10.1462C7.40021 10.1927 7.43706 10.2479 7.4622 10.3086C7.48734 10.3692 7.50028 10.4343 7.50028 10.5C7.50028 10.5657 7.48734 10.6308 7.4622 10.6914C7.43706 10.7521 7.40021 10.8073 7.35375 10.8538C7.3073 10.9002 7.25214 10.9371 7.19145 10.9622C7.13075 10.9873 7.0657 11.0003 7 11.0003C6.9343 11.0003 6.86925 10.9873 6.80855 10.9622C6.74786 10.9371 6.6927 10.9002 6.64625 10.8538L2.14625 6.35375C2.09976 6.30731 2.06288 6.25217 2.03772 6.19147C2.01256 6.13077 1.99961 6.06571 1.99961 6C1.99961 5.93429 2.01256 5.86923 2.03772 5.80853C2.06288 5.74783 2.09976 5.69269 2.14625 5.64625L6.64625 1.14625C6.6927 1.09979 6.74786 1.06294 6.80855 1.0378C6.86925 1.01266 6.9343 0.999722 7 0.999722C7.0657 0.999722 7.13075 1.01266 7.19145 1.0378C7.25214 1.06294 7.3073 1.09979 7.35375 1.14625C7.40021 1.19271 7.43706 1.24786 7.4622 1.30855C7.48734 1.36925 7.50028 1.4343 7.50028 1.5C7.50028 1.5657 7.48734 1.63075 7.4622 1.69145C7.43706 1.75214 7.40021 1.80729 7.35375 1.85375L3.70687 5.5H12C12.1326 5.5 12.2598 5.55268 12.3536 5.64645C12.4473 5.74021 12.5 5.86739 12.5 6ZM0.5 0C0.367392 0 0.240215 0.0526785 0.146447 0.146447C0.0526785 0.240215 0 0.367392 0 0.5V11.5C0 11.6326 0.0526785 11.7598 0.146447 11.8536C0.240215 11.9473 0.367392 12 0.5 12C0.632608 12 0.759785 11.9473 0.853553 11.8536C0.947321 11.7598 1 11.6326 1 11.5V0.5C1 0.367392 0.947321 0.240215 0.853553 0.146447C0.759785 0.0526785 0.632608 0 0.5 0Z" fill="#808587"/>
          </svg>
        </div>
      </div>
    </div>

    <div :class="{ 'flex db-sidebar--wrapper flex-1': true, 'minimized': general.minimizedSidebar }">
      <div class="flex flex-col w-full justify-between h-full db-sidebar">
        <div class="flex-1 db-sidebar--content--wrapper">
          <div class="db-sidebar--content">
            <div class="sidebar-menu">
              <template v-for="tab in tabs" :key="tab.key">
                <a-popover
                  trigger="hover"
                  placement="rightTop"
                  :overlayClassName="`sidebar-menu-popover ${!general.minimizedSidebar || !tab.sub ? 'hidden' : ''}`"
                >
                  <component :is="!tab.sub ? 'a' : 'span'" :href="`/manage/${siteId}/${tab.key}`">
                    <div
                      :class="{ 'sidebar-menu--item': true, 'sidebar-menu--item-selected': selectedKeys.includes(tab.key), 'sidebar-menu-expand': !!tab.sub, 'sidebar-menu-expand-open': expandedTab.includes(tab.key) }"
                      @click.stop.prevent="handleClickItem(tab)">
                      <div class="sidebar-menu--item-label">
                        <div class="sidebar-menu--item-icon" v-html="tab.icon"></div>
                        <div class="sidebar-menu--item-title">{{ tab.title }}</div>
                      </div>
                      <div class="sidebar-menu--item-arrow" v-if="!!tab.sub"></div>
                    </div>
                  </component>
                  <template #content v-if="minimized">
                    <div
                      :class="{ 'sidebar-menu--sub-item-wrapper': true, 'sidebar-menu--sub-item-wrapper-open': expandedTab.includes(tab.key) }"
                      v-if="!!tab.sub">
                      <template v-for="subTab in tab.sub" :key="subTab.key">
                        <a :href="`/manage/${siteId}/${subTab.key}`">
                          <div
                            :class="{ 'sidebar-menu--sub-item': true, 'sidebar-menu--sub-item-selected': selectedKeys.includes(subTab.key) }"
                            @click.stop.prevent="handleClickItem(subTab)">
                            <div class="sidebar-menu--sub-item-label">
                              <div class="sidebar-menu--sub-item-icon" v-html="subTab.icon"></div>
                              <div class="sidebar-menu--sub-item-title">{{ subTab.title }}</div>
                            </div>
                          </div>
                        </a>
                      </template>
                    </div>
                  </template>
                  <div
                    :class="{ 'sidebar-menu--sub-item-wrapper': true, 'sidebar-menu--sub-item-wrapper-open': expandedTab.includes(tab.key) }"
                    v-if="!!tab.sub">
                    <template v-for="subTab in tab.sub" :key="subTab.key">
                      <a :href="`/manage/${siteId}/${subTab.key}`">
                        <div
                          :class="{ 'sidebar-menu--sub-item': true, 'sidebar-menu--sub-item-selected': selectedKeys.includes(subTab.key) }"
                          @click.stop.prevent="handleClickItem(subTab)">
                          <div class="sidebar-menu--sub-item-label">
                            <div class="sidebar-menu--sub-item-icon" v-html="subTab.icon"></div>
                            <div class="sidebar-menu--sub-item-title">{{ subTab.title }}</div>
                          </div>
                        </div>
                      </a>
                    </template>
                  </div>
                </a-popover>
                <div class="sidebar-menu--divider" v-if="tab.divide"></div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useGeneralStore } from "@/stores/general.js"
import {
  homePageLogo,
  analyticLogo,
  orderLogo,
  productLogo,
  customerLogo,
  domainLogo,
  discountLogo,
  applicationLogo,
  settingLogo,
  automationIcon,
  articleIcon,
  multilingualIcon,
  integrationLogo,
  appIcon,
  affiliateIcon
} from '@/common/sidebar-icon.js'

import LogoSmall from "@/assets/icon/logo-small.svg?component"
import LogoLight from "@/assets/icon/logo-v2-light.svg?component"

export default {
  components: {
    LogoLight,
    LogoSmall
  },
  setup() {
    const general = useGeneralStore();
    return { general }
  },
  watch: {
    minimized(value) {
      this.expandedTab = []
    }
  },
  computed: {
    expandedTab: {
      get() {
        return this.general.expandedTab
      },
      set(value) {
        this.general.setState({expandedTab: value})
      }
    },
    minimized() {
      return this.general.minimizedSidebar
    },
    selectedKeys() {
      return [this.$route.name];
    },
    tabs() {
      return [
        { key: 'analytics', title: 'Thống kê', icon: homePageLogo },
        {
          key: 'product', title: 'Sản phẩm', icon: productLogo,
          sub: [
            { key: 'products', title: 'Tất cả', icon: '' },
            { key: 'categories', title: 'Danh mục', icon: '' },
          ]
        },
        { key: 'orders', title: 'Đơn hàng', icon: orderLogo },
        // { key: 'home', title: this.$t("dashboard.home_page"), icon: homePageLogo },
        // { key: 'analytics', title: this.$t("dashboard.analytic"), icon: analyticLogo, divide: true },
        // {
        //   key: 'customer', title: this.$t("dashboard.customer"), icon: customerLogo, divide: true,
        //   sub: [
        //     { key: 'customer_list', title: this.$t("dashboard.customer_list"), icon: '' },
        //     { key: 'email_list', title: this.$t("dashboard.email_list"), icon: '' },

        //   ]
        // },
        // { key: 'domains', title: this.$t("dashboard.domains"), icon: domainLogo },
        // { key: 'discounts', title: this.$t("dashboard.discount"), icon: discountLogo },
        // { key: 'integrations', title: this.$t("dashboard.integrations"), icon: integrationLogo },
        // {
        //   key: 'sale-channel', title: this.$t("dashboard.maketing_and_sale"), icon: applicationLogo, divide: true,
        //   sub: [
        //     { key: 'sale-channels', title: this.$t("dashboard.sale_channels"), icon: "" },
        //     { key: 'seo-settings', title: "SEO", icon: '' },
        //     { key: 'site_utms', title: "UTM", icon: '' },
        //     // { key: 'send_email', title: this.$t("dashboard.send_email"), icon: '' }
        //   ]
        // },
        // { key: 'applications', title: this.$t("dashboard.application"), icon: appIcon, divide: true,
        //   sub: [
        //     { key: 'app_installed', title: this.$t("dashboard.app_installed"), icon: ""},
        //     { key: 'app_store', title: this.$t("dashboard.app_store"), icon: ""}
        //   ]
        // },
        // { key: 'blog', title: this.$t("dashboard.blog"), icon: articleIcon, divide: true,
        //   sub: [
        //     { key: 'articles', title: this.$t("dashboard.articles"), icon: ''},
        //     { key: 'blog_categories', title: this.$t("dashboard.categories"), icon: ''}
        //   ]
        // },
        // { key: 'settings', title: this.$t("dashboard.setting"), icon: settingLogo },
      ]
    }
  },
  methods: {
    onClickMenuItem({ key }) {
      this.$router.push(`/admin/${key}`);
    },
    handleClickItem(tab) {
      if (tab.key == 'analytics') {
        this.$router.push(`/admin`);
      }
      else if (!tab.sub) {
        this.$router.push(`/admin/${tab.key}`);
      } else {
        this.handleExpandSub(tab)
      }
    },
    handleExpandSub(tab) {
      if (this.minimized) return
      if (this.expandedTab.includes(tab.key)) this.expandedTab = this.expandedTab.filter(el => el != tab.key)
      else this.expandedTab.push(tab.key)
      let localStorage_expandedTab = localStorage.getItem('expandedTab');
      if (localStorage_expandedTab) {
        let expandedTabArray = JSON.parse(localStorage_expandedTab);

        if (expandedTabArray.includes(tab.key)) {
          expandedTabArray = expandedTabArray.filter(el => el !== tab.key);
        } else {
          expandedTabArray.push(tab.key);
        }

        localStorage.setItem('expandedTab', JSON.stringify(expandedTabArray));
      } else {
        localStorage.setItem('expandedTab', JSON.stringify([tab.key]));
      }
    },
    toggleSidebar() {
      if (this.general.minimizedSidebar) {
        localStorage.minimizedSidebar = false
      } else {
        localStorage.minimizedSidebar = true
      }
      this.general.setMinimizedSidebar(!this.general.minimizedSidebar)
    },
  },
};
</script>

<style>

</style>