import { defineStore } from "pinia"
import { message } from 'ant-design-vue'
import { cloneDeep } from 'lodash'

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      items: JSON.parse(localStorage.getItem("cart-items")) || [],
      custom_items: JSON.parse(localStorage.getItem("custom-items")) || [],
      visibleCart: false
    }
  },
  getters: {
    totalPrice() {
      const total_normal = this.items.reduce((acc, cur) => {
        return acc + cur.retail_price * cur.quantity
      }, 0)

      const total_custom = this.custom_items.reduce((acc, cur) => {
        return acc + 149000 * cur.quantity
      }, 0)

      return total_normal + total_custom
    },
    listCustomItems() {
      return this.custom_items.map(el => {
        return {
          fields: [],
          product: {
            name: "Sản phẩm thiết kế"
          },
          original_price: 200000,
          retail_price: 149000,
          quantity: el.quantity,
          images: el.images
        }
      })
    }
  },
  actions: {
    setState(obj = {}) {
      for(const key in obj) {
        this[key] = obj[key]
      }
    },
    resetCart() {
      this.changeItems([])
      this.changeCustomItems([])
    },
    changeItems(items) {
      this.items = items
      localStorage.setItem('cart-items', JSON.stringify(this.items))
    },
    changeCustomItems(items) {
      this.custom_items = items
      localStorage.setItem('custom-items', JSON.stringify(this.custom_items))
    },
    addCustomItem(item) {
      const custom_items = cloneDeep(this.custom_items)
      custom_items.push(item)

      this.changeCustomItems(custom_items)
    },
    addItem(item) {
      const items = cloneDeep(this.items)
      const existIdx = items.findIndex(el => el.id == item.id)

      if (existIdx == -1) {
        items.push(item)
      } else {
        items[existIdx].quantity += item.quantity
      }

      this.items = items
      localStorage.setItem('cart-items', JSON.stringify(this.items))
    },
    fetchItems() {
      const items = JSON.parse(localStorage.getItem("cart-items"))
      if (items) this.items = items
    },
    addToCart(product, attrs, quantity) {
      const variations = product.variations || []
      const objAttrs = Object.entries(attrs)

      const variation = variations.find(v => {
        const fields = v.fields || []
        if(!fields.length) return !objAttrs.length

        return objAttrs.every(([k, v]) => fields.find(f => f.name == k && f.value == v)) && objAttrs.length == fields.length
      })

      if (!variation) {
        this.alertAddToCart(product, attrs)
        return
      }

      const existQuantity = this.items.find(el => el.id == variation.id)?.quantity || 0
      
      if (variation.remain_quantity < quantity + existQuantity) {
        message.error(`Số mẫu mã còn lại không đủ với số bạn đặt!`)
        return
      }

      const item = {
        ...variation,
        product,
        quantity
      }

      this.addItem(item)
      this.visibleCart = true
    },
    alertAddToCart(product, attrs) {
      const product_attrs = product.product_attributes || []

      const attr = product_attrs.find(e => !e.values.includes(attrs[e.name]))
      console.log(attr, attrs)
      if (attr) return message.error(`Vui lòng chọn thuộc tính ${attr.name}!`)
    }
  }
})