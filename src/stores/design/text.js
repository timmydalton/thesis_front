import { defineStore } from 'pinia'

export const useTextStore = defineStore('txt', {
  state: () => ({
		visible: false,
    elementEditing: null,
	}),
	actions: {
    displayTextPanel(visible) {
      this.visible = visible
    },
    setElementEditing(element) {
      this.elementEditing = element
    },
    setState(key) {
      this[key] = !this[key]
    }
  }
})
