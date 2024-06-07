import { defineStore } from "pinia";
import { useApipost, useApiget } from "@/composable/fetch.js"
import { message } from "ant-design-vue"

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL

export const useEditProductStore = defineStore('edit_product', {
  state: () => ({
    id: '',
    name: '',
    display_id: '',
    description: '',
    tags: [],
    categories: [],
    slug: '',
    product_attributes: [],
    total_sold: 0,
    image: '',
    variations: []
  }),
  getters: {
    listAttributes(state) {
      let attrs = []
      state.product_attributes.map(el => {
        if(el.values.length > 0) {
          el.values.map(v => {
            attrs.push({name: el.name, value: v})
          })
        }
      })
      return attrs
    }
  },
  actions: {
    reset() {
      this.id = ''
      this.name = ''
      this.display_id = ''
      this.description = ''
      this.tags = []
      this.categories = []
      this.slug = ''
      this.product_attributes = []
      this.total_sold = 0
      this.image = ''
      this.variations = []
    },
    setEditProduct(key, value) {
      this[key] = value
    },
    updateProduct(data, t) {
      const url = `${VITE_BACKEND_API_URL}/api/admin/products/update_product`
      
      return useApipost(url, null, data)
        .then(res => {
          if (res.status == 200) {
            message.success(t("message.update_success"))
          }
          return res
        })
    },
  }
})

export const useAllProductStore = defineStore('all_products', {
  state: () => ({
    products: { data: [], limit: 20, page: 1 },
    total_product: 0,
    loading_products: false,
  }),
  actions: {
    setValue(key, value) {
      this[key] = value
    },
    setAllProducts(value) {
      this.products.data = value
    },
    setTotalProduct(value) {
      this.total_product = value
    },
    setSearchTerm(value) {
      this.products.term = value
    },
    setLimit(value) {
      this.products.limit = value
    },
    setPage(value) {
      this.products.page = value
    },
    resetSearchProduct(siteId) {
      this.products.term = undefined

      this.getProducts(1)
    },
    getProducts(page = this.products.page, limit = this.products.limit) {
      if(this.products.term){
        // this.getSearch(siteId, {})
      }else{
        this.setPage(page)
        this.setLimit(limit)
        this.loading_products = true
        const url = `${VITE_BACKEND_API_URL}/api/admin/products/all?page=${page}&limit=${limit}`
        useApiget(url)
          .then(res => {
            this.products.data = res.data.products
            this.total_product = res.data.total_product
            this.products.limit = res.data.limit
            this.products.page = res.data.page
          })
          .finally(() => this.loading_products = false)
      }
    }
  }
})