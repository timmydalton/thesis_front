import { defineStore } from 'pinia'
import { useApiget, useApipost } from '@/composable/fetch'

const BACKEND_API_URL = import.meta.env.BACKEND_API_URL

export const useUserStore = defineStore('user', {
  state: () => ({
    me: {}
  }),
  actions: {
    setMe(value) {
      this.me = value
    },
    fetchAccount() {
      return useApiget(`${BACKEND_API_URL}/api/@me`, null, {})
      .then((res) => {
        this.setMe(res.data.data)
      })
    },
    createAccount(username, password) {
      const params = {
        username,
        password
      }
      
      return useApipost(`${BACKEND_API_URL}/api/user/create_account`, params)
    }
  }
})
