import { defineStore } from "pinia";
import { useApipost, useApiget } from "@/composable/fetch.js"
import { message } from "ant-design-vue"

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL

export const useEditProductStore = defineStore('edit_product', {
  state: () => ({
    id: '',
    name: '',
    custom_id: '',
    description: '',
    tags: [],
    categories: [],
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
      this.custom_id = ''
      this.description = ''
      this.tags = []
      this.categories = []
      this.product_attributes = []
      this.total_sold = 0
      this.image = ''
      this.variations = []
    },
    setUpdateProduct(val){
      this.id = val.id
      this.name = val.name || ''
      this.custom_id = val.custom_id || ''
      this.description = val.description || ''
      this.tags = val.tags || []
      this.categories = val.categories || []
      this.product_attributes = val.product_attributes || []
      this.total_sold = val.total_sold || 0
      this.image = val.image || ''
      this.variations = val.variations || []
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
    product_tags: [],
    isLoadingProductTags: false
  }),
  getters: {
    renderProducts() {
      const getRetailPrice = (variations) => {
        let arrayPrice = variations.map(el => el.retail_price)
        let min = Math.min(...arrayPrice) || 0
        let max = Math.max(...arrayPrice) || 0

        let result = (min == max || arrayPrice.length == 0)  ? max : `${min} - ${max}`

        return result
      }

      const getOriginalPrice = (variations) => {
        let arrayPrice = variations.map(el => el.original_price)
        let min = Math.min(...arrayPrice) || 0
        let max = Math.max(...arrayPrice) || 0

        let result = (min == max || arrayPrice.length == 0) ? max : `${min} - ${max}`

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
          // categories: (el.categories || []).map(el => el.name).join(', '),
          quantity_variation: el.variations.length,
          is_hidden: el.is_hidden
        }
      })
    }
  },
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
    },
    createOrUpdateProductTag(params, type) {
      const url = `${BUILDER_API_HOST}/api/admin/products/product_tags/create_or_update`
      useApipost(url, null, params)
        .then(res => {
          if (res.status == 200) {
            switch(type) {
              case 'create':
                this.product_tags.unshift(res.data.product_tag)
                break

              case 'edit':
                let idx = this.product_tags.findIndex(el => el.id == res.data.product_tag.id)
                this.product_tags[idx].name = res.data.product_tag.name
                this.product_tags[idx].is_edit = false
                break

              case 'remove':
                let idxx = this.product_tags.findIndex(el => el.id == res.data.product_tag.id)
                this.product_tags.splice(idxx, 1)
                break
            }
            message.success("Thành công")

          }
        })
    },
    getAllProductTags() {
      const url = `${VITE_BACKEND_API_URL}/api/admin/products/product_tags/all`

      this.isLoadingProductTags = true
      useApiget(url, null, {})
        .then(res => {
          if (res.status == 200) {
            this.product_tags = res.data.product_tags
          }
        })
        .finally(() => {
          this.isLoadingProductTags = false
        })
    },
    async handleHiddenProduct(product_id, checked) {
      const url = `${VITE_BACKEND_API_URL}/api/admin/products/hidden`
      let data = []
      data.push({product_id, is_hidden: checked})

      return useApipost(url, null ,{data})
        .then(res => {
          if (res.status == 200) {
            res.data.products.map(el => {
              let idx = this.products.data.findIndex(elm => elm.id == el.id)

              this.products.data[idx].is_hidden = el.is_hidden
            })
          }
        })
    },
  }
})