import { defineStore } from 'pinia'

export const useTraitStore = defineStore('trait', {
  state: () => ({
		visible: true,
    visibleSidebar: true
	}),
	actions: {
    setState(key) {
      this[key] = !this[key]
    }
  }
})
