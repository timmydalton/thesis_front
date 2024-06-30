import { defineStore } from "pinia";
import { useApipost, useApiget } from "@/composable/fetch.js"
import { pick } from 'lodash'

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL

export const useMainStore = defineStore('main', {
  state: () => ({
    selectedCategory: '',
    loadingCategories: false,
    categories: { data: [] },
    products: { data: [], limit: 20, page: 1, total: 0 },
    product: {},
    selectedAttrs: {}
  }),
  getters: {
    renderProducts() {
      const getRetailPrice = (variations) => {
        let arrayPrice = variations.map(el => el.retail_price)
        let min = Math.min(...arrayPrice) || 0
        let max = Math.max(...arrayPrice) || 0

        let result = (min == max || arrayPrice.length == 0)  ? max : min

        return result
      }

      const getOriginalPrice = (variations) => {
        let arrayPrice = variations.map(el => el.original_price)
        let min = Math.min(...arrayPrice) || 0
        let max = Math.max(...arrayPrice) || 0

        let result = (min == max || arrayPrice.length == 0) ? max : max

        return result
      }

      const getRemainQuantity = (variations) => {
        let arrayAmount = variations.map(el => el.remain_quantity)
        return arrayAmount.reduce((total, num) => {return total+num}, 0)
      }

      const getImage = (variations) => {
        let arrayImage = variations.filter(el => el.images && el.images.length > 0)
        let src = arrayImage.length > 0 ? arrayImage[0].images[0] : null
        if (src == null) return ''
        return src

      }

      const getInfoVariationsObj = {
        retailPrice: getRetailPrice,
        originalPrice: getOriginalPrice,
        remainQuantity: getRemainQuantity,
        image: getImage
      }

      const getInfoVariations = (variations, type) => {
        return getInfoVariationsObj[type](variations)
      }

      return this.products.data.map((el, idx) => {
        return {
          key: el.id,
          name: el.name,
          custom_id: el.custom_id,
          retail_price: getInfoVariations(el.variations, "retailPrice"),
          original_price: getInfoVariations(el.variations, "originalPrice"),
          remain_quantity: getInfoVariations(el.variations, "remainQuantity"),
          image: el.image ? el.image : getInfoVariations(el.variations, "image"),
          id: el.id,
          variations: el.variations,
          categories: (el.categories || []).map(el => el.name).join(', '),
          quantity_variation: el.variations.length,
          description: el.description,
          is_hidden: el.is_hidden
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
    getProductById(id) {
      const url = `${VITE_BACKEND_API_URL}/api/store/products/${id}`

      return useApiget(url)
        .then(res => {
          if (res.status == 200 && res.data.success == true) {
            this.product = res.data.product
          }
        })
    },
    getProducts(page = this.products.page, limit = this.products.limit) {
      if (this.selectedCategory && this.selectedCategory != 'all') {
        return this.getAllProductsByCategory(page, limit)
      } else {
        return this.getAllProducts(page, limit)
      }
    },
    getAllProducts(page = this.products.page, limit = this.products.limit) {
      const url = `${VITE_BACKEND_API_URL}/api/store/products/all?page=${page}&limit=${limit}`

      return useApiget(url)
        .then(res => {
          if (res.status == 200 && res.data.success == true) {
            this.products = {
              data: res.data.products,
              limit: res.data.limit,
              page: res.data.page,
              total: res.data.total_product
            }
          }
        })
    },
    getAllProductsByCategory(page = this.products.page, limit = this.products.limit) {
      const url = `${VITE_BACKEND_API_URL}/api/store/products/all_by_category?page=${page}&limit=${limit}&category_id=${this.selectedCategory}`

      return useApiget(url)
        .then(res => {
          if (res.status == 200 && res.data.success == true) {
            this.products = {
              data: res.data.products,
              limit: parseInt(res.data.limit),
              page: parseInt(res.data.page),
              total: parseInt(res.data.total_product)
            }
          }
        })
    },
    getCategories(payload, cb) {
      this.loadingCategories = true
      let params = pick(this.categories, ["term", "page", "limit"])
      params = { ...params, ...payload }

      let url = `${VITE_BACKEND_API_URL}/api/store/categories/all`
      return useApiget(url, params)
        .then(res => {
          if (res.status == 200) {
            this.categories = { ...params, ...res.data.categories }
          }
          return res
        })
        .finally(() => {
          this.loadingCategories = false
        })
    },
    getPaymentLink(order) {
      const params = {
        order_id: order.id,
        order_description: `Thanh toan don hang ${order.display_id}`,
        amount: order.invoice_value
      }
      
      return useApipost(`${VITE_FRONTEND_URL}/create_payment_url`, null, params)
    },
    orderPaymentSuccess(order_id) {
      const params = {
        order_id
      }
      
      let url = `${VITE_BACKEND_API_URL}/api/store/order/payment_success`

      return useApipost(url, null, params)
    }
  }
})