import { defineStore } from 'pinia'
import { useApiget, useApipost } from '@/composable/fetch'
import { pick } from 'lodash'

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL

export const useUserStore = defineStore('user', {
  state: () => ({
    me: {},
    orders: { data: [], filter_options: {} },
    viewOrder: {}
  }),
  actions: {
    setMe(value) {
      this.me = value
    },
    fetchAccount() {
      return useApiget(`${VITE_BACKEND_API_URL}/api/@me`, null, {})
      .then((res) => {
        const account = res.data.data || {}
        this.setMe(account)
      })
    },
    createAccount(params) {
      return useApipost(`${VITE_BACKEND_API_URL}/auth/signup`, null, params)
    },
    handleLogin(username, password) {
      const params = {
        username,
        password
      }
      
      return useApipost(`${VITE_BACKEND_API_URL}/auth/signin`, null, params)
    },
    updateInfo(params) {
      return useApipost(`${VITE_BACKEND_API_URL}/api/user/update`, null, params)
    },
    getOrders(payload, cb) {
      if (!cb) this.loadingOrders = true
      let params = pick(this.orders, ["term", "page", "limit", "status", "filter_options"])
      params = { ...params, ...payload }
      params['account_id'] = this.me.id

      let url = `${VITE_BACKEND_API_URL}/api/user/orders`
      return useApiget(url, {...params, filter_options: JSON.stringify(params.filter_options || {}) })
        .then(res => {
          if (res.status == 200) {
            if (!cb) {
              this.orders = { ...params, ...res.data.orders }
            } else {
              cb(res)
            }
          }
          return res
        })
        .finally(() => {
          this.loadingOrders = false
        })
    },
    loadViewOrder(id) {
      let params = {
        order_id: id
      }

      let url = `${VITE_BACKEND_API_URL}/api/user/order_by_id`
      return useApiget(url, params)
      .then(res => {
        if (res.status == 200) {
          this.viewOrder = res.data.order || {}
        }
        return res
      })
    }
  }
})
