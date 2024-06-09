import { defineStore } from 'pinia'

export const useLibraryStore = defineStore('library', {
  state: () => ({
    imageModal: {
      visible: false,
    },
    imgSrc: [],
  }),
  actions: {
    getImgSrc() {
      const uploaded_img = localStorage.getItem('uploaded_img')
      if (uploaded_img) this.imgSrc = JSON.parse(uploaded_img)
    },
    addImgSrc(src) {
      if (!this.imgSrc.find(img => img.src == src)) {
        this.imgSrc.push({
          src
        })
      }

      localStorage.setItem('uploaded_img', JSON.stringify(this.imgSrc))
    },
    toggleImageModal(opts = {}) {
      for(const key in opts) {
        this.imageModal[key] = opts[key]
      }
    },
  }
})