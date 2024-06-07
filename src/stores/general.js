import { defineStore } from "pinia"

export const useGeneralStore = defineStore("generalConfig", {
  state: () => {
    return {
      theme: '',
      minimizedSidebar: false,
      expandedTab: JSON.parse(localStorage.getItem("expandedTab")) || [],
      minimizedPageGroup: [],
      currency: "VND"
    }
  },
  actions: {
    fetchConfig() {
      //theme
      if (window.localStorage.theme) this.theme = window.localStorage.theme
      // else if (!('theme' in window.localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) this.theme = window.localStorage.theme
      else this.theme = 'light'

      //sidebar
      if (window.localStorage.minimizedSidebar) {
        this.minimizedSidebar = window.localStorage.minimizedSidebar == 'true' ? true : false
      }
    },
    setTheme(val) {
      this.theme = val
    },
    setMinimizedSidebar(bool) {
      this.minimizedSidebar = bool
    },
    setState(obj = {}) {
      for(const key in obj) {
        this[key] = obj[key]
      }
    }
  }
})