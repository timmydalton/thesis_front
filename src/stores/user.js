import { defineStore } from 'pinia'
import { useApiget, useApipost } from '@/composable/fetch'

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL

export const useUserStore = defineStore('user', {
  state: () => ({
    me: {}
  }),
  actions: {
    setMe(value) {
      this.me = value
    },
    fetchAccount() {
      return useApiget(`${VITE_BACKEND_API_URL}/api/@me`, null, {})
      .then((res) => {
        this.setMe(res.data.data)
      })
    },
    createAccount(username, password) {
      const params = {
        username,
        password
      }
      
      return useApipost(`${VITE_BACKEND_API_URL}/auth/signup`, params)
    },
    handleLogin(username, password) {
      const params = {
        username,
        password
      }
      
      return useApipost(`${VITE_BACKEND_API_URL}/auth/signin`, params)
    },
  }
})
