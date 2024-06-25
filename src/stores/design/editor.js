import { defineStore } from 'pinia'
import { cloneDeep, get } from 'lodash'
import { useApipost, useApiget } from "@/composable/fetch.js"
import { nextTick } from 'vue'
import { useCartStore } from '@/stores/cart'

import html2canvas from 'html2canvas'

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL

export const useUIStore = defineStore('ui', {
  state: () => ({
    elements: {},
    count: {},
    selected: [],
    deviceType: '',
    position: {
      top: 50,
      left: 50,
      width: 500,
      height: 500,
      OGWidth: 500,
      OGHeight: 500
    },
    sources: {},
    editingProductView: 0,
    loadingAddToCart: false
  }),
  getters: {
    selectedElement(state) {
      return this.elements[state.selected[0]]
    },
  },
  actions: {
    load() {
      try {
        const params = new URLSearchParams(window.parent.location.search)
        const p = params.get('p')
        const v = params.get('v')

        const source = JSON.parse(localStorage.getItem('source') || '{}')
        let existed = false
        if (source.hasOwnProperty(p)) {
          if (source[p]['variationId'] === v) {
            existed = true
          }
        }

        const obj = existed ? source[p] : get(Object.values(source), [0]) || {}
        const sources = obj.sources || {} 
        this.sources = sources
        this.elements = sources[this.editingProductView] || {}

        const counts = obj.count || {}
        for (const key in counts) {
          this.count[key] = counts[key]
        }
        
        this.checkViewType()
        const productId = existed ? p : Object.keys(source)[0]
        if(!productId) return
        const variationId = existed ? v : source[productId].variationId

        // const product = useProductStore()

        // product.setProductId(productId)
        // product.setVariationId(variationId)
      } catch(e) {
        console.log(e)
      }
    },
    checkViewType() {
      this.deviceType = window.innerWidth < 840 ? 'mobile' : 'desktop'
    },
    increaseCount(type) {
      if (!this.count[type]) this.count[type] = 0
      this.count[type] += 1
      return this.count[type]
    },
    changeEditorPosition(pos) {
      for (const key in pos) {
        this.position[key] = pos[key]
      }
    },
    addElement(el, opts = {}) {
      this.elements[el.id] = el
    },
    addElements(els, opts = {}) {
      els.forEach(el => {
        this.elements[el.id] = el
      })
    },
    //This function only use for history purpose
    updateElement(element) {
      if (this.elements[element.id]) this.elements[element.id] = element
    },
    setSelected(ids) {
      this.selected = ids
    },
    getElementById(id) {
      if (!this.elements.hasOwnProperty(id)) return false
      return  this.elements[id]
    },
    changeStyle(el, style = {}) {
      Object.keys(style).forEach(key => {
        el.style[key] = style[key]
      })
    },
    removeElementById(id, opts = {}) {
      const el = this.elements[id]
      delete this.elements[id]
    },
    removeElementByIds(ids, opts = {}) {
      const els = []
      ids.forEach(id => {
        const el = this.elements[id]
        delete this.elements[id]

        els.push(el)
      })
    },
    cloneSelectedElements() {
      const newIds = []
      this.selected.forEach(id => {
        const oldEl = this.elements[id]
        if (!oldEl) return

        const newEl = cloneDeep(oldEl)
        newEl.id = newEl.type.toUpperCase() + '-' + this.increaseCount(newEl.type)

        newEl.style.top += 5
        newEl.style.left +=5

        this.elements[newEl.id] = newEl
        newIds.push(newEl.id)
      })
      
      this.setSelected(newIds)
    },
    changeSpecial(element, specials = {}) {
      element.specials = { ...element.specials, ...specials }
    },
    saveSource() {
      // const product = useProductStore()
      // const productId = product.productId || product.products[0].id
      // const variationId = product.variationId || get(product.viewProduct, ['variations', 0, 'id'])

      // const sources = JSON.parse(localStorage.getItem('source') || '{}')
      // delete sources[productId]

      // const value = {
      //   [productId]: {
      //     variationId,
      //     sources: this.sources,
      //     count: this.count,
      //   }
      //   ,...sources
      // }

      // if (Object.keys(value).length > 5) delete value[Object.keys(value).pop()]

      // localStorage.setItem('source', JSON.stringify(value))
    },
    setEditingProductView(value) {
      this.sources[this.editingProductView] = cloneDeep(this.elements)
      
      this.editingProductView = value
      this.elements = this.sources[this.editingProductView] || {}
      this.sources[value] = this.elements
    },
    async getContent() {
      const wrapper = document.querySelector('.editor-bounding')
      const node = wrapper.cloneNode(true)
      Array.from(node.querySelectorAll('.product-design')).forEach(el => el.style.opacity = 0)
  
      node.style.top = '-1000%'
      node.style.left = '-1000%'
  
      document.body.appendChild(node)
  
      const canvas = await html2canvas(node.querySelector('.editor'), { useCORS: true })
      const dataURL = canvas.toDataURL('image/jpeg', 1)
      const res = await useApipost(`${VITE_BACKEND_API_URL}/api/admin/content/b64`, null, { base64: dataURL })
      document.body.removeChild(node)
  
      return res.data.data
    },
    async getWrapper() {
      const dom = document.querySelector('.editor')
      const canvas = await html2canvas(dom, { useCORS: true })
      const dataURL = canvas.toDataURL('image/jpeg', 1)
      const res = await useApipost(`${VITE_BACKEND_API_URL}/api/admin/content/b64`, null, { base64: dataURL })
      return res.data.data
    },
    async addToCart() {
      this.loadingAddToCart = true

      const cart = useCartStore()

      const dom = document.querySelector('.editor')
      if(!dom) {
        this.loadingAddToCart = false
        return false
      }

      try {
        this.setEditingProductView(0)
        await nextTick()

        const link = await this.getWrapper()

        const item = {
          quantity: 1,
          images: [link]
        }
  
        cart.addCustomItem(item)
      } catch(e) {
        console.error('oops, something went wrong!', e)
        return false
      }

      this.loadingAddToCart = false
      return true
    }
  }
})