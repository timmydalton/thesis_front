import { defineStore } from 'pinia'

export const usePanelStore = defineStore('panel', {
  state: () => ({
    visible: true,
  }),
  actions: {
    setVisible(visible) {
      this.visible = visible
    }
  }
})
