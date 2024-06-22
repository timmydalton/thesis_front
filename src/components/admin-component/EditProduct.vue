<template>
  <div class="edit_product">
    <div class="edit_product_mid overflow-auto">
      <div class="edit_product_mid_collapse flex mb-4">
        <div class="w-1/2 bg-ui-2 p-4 mr-2">
          <div class="flex items-center mb-4 color-text-1">
            <span class="text-base font-medium">Thông tin cơ bản</span>
          </div>

          <div class="flex mb-4">
            <div class="form-content-half pr-2">
              <div class="input-dark-mode">
                <a-input
                  placeholder="Tên sản phẩm"
                  :value="unescapeHTML(editProductStore.name || '')"
                  @change="(e) => handleChangeInputProduct('name', e.target.value)"/>
              </div>
            </div>
            <div class="form-content-half pl-2">
              <div class="input-dark-mode">
                <a-input
                  placeholder="Mã sản phẩm"
                  :value="unescapeHTML(editProductStore.custom_id || '')"
                  @change="(e) => handleChangeInputProduct('custom_id', e.target.value)"/>
              </div>
            </div>
          </div>

          <div class="flex mb-4">
            <div class="w-full select-dark-mode">
              <a-tree-select
                :value="editProductStore.categories"
                placeholder="Chọn danh mục"
                style="width: 100%"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                multiple
                :tree-data="renderTreeCate"
                tree-node-filter-prop="label"
                show-search
                allow-clear
                @change="changeTreeCate"
              >
              </a-tree-select>
            </div>
          </div>
        </div>

        <div class="w-1/2 bg-ui-2 p-4 flex flex-col ml-2">
          <div class="flex items-center justify-between mb-4 color-text-1">
            <span class="text-base font-medium"> 
              Mô tả ngắn
            </span>
          </div>

          <div class="w-full h-full textarea-dark-mode mb-4">
            <a-textarea :rows="6" :maxlength="100" :value="editProductStore.description || ''" @change="handleChangeInputProduct('description', $event.target.value)"/>
          </div>
        </div>
      </div>

      <div class="edit_product_mid_collapse mb-4">
        <div class="w-full bg-ui-2 p-4">
          <div class="flex justify-between items-center">
            <div class="pdb-16">
              <div class="flex items-center color-text-1 mb-2">
                <span class="text-base font-medium">Tạo thuộc tính</span>
              </div>
              <div class="fz-14 color-dgr">Thêm thuộc tính sản phẩm như: size, màu sắc...</div>
            </div>
            <div>
              <a-button type="primary"
                class="flex justify-center items-center bg-button-primary"
                @click="handleAddAttribute"
              >
                <span>Thêm thuộc tính</span>
              </a-button>
            </div>
          </div>
          <div>
            <div class="flex attribute_wrapper w-full h-full">
              <ul class="attribute-content w-full" v-if="editProductStore.product_attributes.length == 0">
                <li>
                  <a-empty :image="simpleImage" />
                </li>
              </ul>
              <div class="w-full h-fulll" v-else>
                <li class="attribute-item w-full flex items-center" v-for="(attr, idx) in editProductStore.product_attributes">
                  <span class="pt-4 mr-2" style="font-size: 15px; cursor: all-scroll;" >
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="more" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                      <path
                        d="M456 231a56 56 0 10112 0 56 56 0 10-112 0zm0 280a56 56 0 10112 0 56 56 0 10-112 0zm0 280a56 56 0 10112 0 56 56 0 10-112 0z">
                      </path>
                    </svg>
                  </span>
                  <span class="attribute-item--name select-dark-mode w-1/5 pt-4 pr-4">
                    <a-auto-complete
                      :value="attr.name"
                      placeholder="Tên thuộc tính"
                      @change="value => onChangeAttribute('name', idx, value)"
                      class="w-full"
                    />
                  </span>
                  <span class="attribute-item--property w-4/5 pt-4 flex items-center select-dark-mode-2">
                    <div class="w-full h-full">
                      <a-select
                        class="w-full h-full hide-suffix"
                        mode="tags"
                        ref="select"
                        :value="attr.values"
                        popupClassName="dropdown-dark-mode"
                        show-search
                        :filter-option="filterOption"
                        @change="value => onChangeAttribute('values', idx, value)"
                      >
                      </a-select>
                    </div>
                    <div class="ml-4 flex">
                      <a-button class="flex btn-remove-attr" @click="deleteAttribute(idx)">
                        <TrashIcon />
                      </a-button>
                    </div>
                  </span>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Variations :productId="productId" />
    </div>
  </div>
</template>

<script>
import TrashIcon from '@/assets/svg/trash-sm.svg?component';
import Variations from "@/components/admin-component/Variations.vue"

import { message, notification, Empty } from 'ant-design-vue';

import { isEqualWith, pick, isEmpty, cloneDeep } from 'lodash';
import { useEditProductStore, useAllProductStore } from '@/stores/product.js'
import { escapeHTML, unescapeHTML, convertVN } from '@/composable/common.js'
import { useApipost, useApiget } from "@/composable/fetch.js"

import { useCategoryStore } from "@/stores/categories.js"

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL

export default {
  setup() {
    const editProductStore = useEditProductStore()
    const allProductStore = useAllProductStore()
    const categoryStore = useCategoryStore()
    
    return {
      editProductStore,
      allProductStore,
      categoryStore,
      escapeHTML,
      unescapeHTML,
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
    }
  },
  props: ['productId', 'gotoPage'],
  components: {
    TrashIcon,
    Variations
  },
  data() {
    return {
      fileList: [],
      variations: [],
      loading: false,
      optionsAttribute: []
    }
  },
  mounted() {
    this.getProductById()
  },
  watch: {
    productId() {
      this.getProductById()
    }
  },
  computed: {
    renderTreeCate() {
      const callback = (children = []) => {
        return children.map(el => {
          if (el.children.length == 0) return {label: el.name, value: el.id}
          return {label: el.name, value: el.id, children: callback(el.children)}
        })
      }

      let tree = this.categoryStore.categories.data.map(el => {
          if (el.children.length == 0) return {label: el.name, value: el.id}
          return {label: el.name, value: el.id, children: callback(el.children)}
      })

      return tree
    },
  },
  methods: {
    getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }

      if (info.file.status === 'done') {
        // Get this url from response in real world.
        this.getBase64(info.file.originFileObj, base64Url => {
          imageUrl.value = base64Url;
          this.loading = false;
        });
      }

      if (info.file.status === 'error') {
        this.loading.value = false;
        message.error('upload error');
      }
    },
    handleChangeInputProduct(key, value) {
      console.log(key, value)
      this.editProductStore.setEditProduct(key, escapeHTML(value))
    },
    filterOption(input, option) {
      input = convertVN(input.toLowerCase())
      let label = convertVN(option.value.toLowerCase())
      return label.indexOf(input) >= 0
    },
    filterOptionTags(input, option) {
      input = convertVN(input.toLowerCase())
      let label = convertVN(option.title.toLowerCase())
      return label.indexOf(input) >= 0
    },
    handleAddAttribute() {
      let newAttributes = this.editProductStore.product_attributes
      newAttributes.push({name: '', values: []})

      this.editProductStore.setEditProduct('product_attributes', newAttributes)
    },
    onChangeAttribute(field, idx, val) {
      let value = Array.isArray(val) ? val.map(el => el.trim()) : val.trim()
      let newAttributes = this.editProductStore.product_attributes
      if (field == "name") {
          newAttributes[idx]["name"] = val
        } else {
          newAttributes[idx]["values"] = value
        }

      this.editProductStore.setEditProduct('product_attributes', newAttributes)
      this.updateAttributes()

    },
    updateAttributes() {
      let attributes = this.editProductStore.product_attributes
      let listVariations = this.editProductStore.variations
      const variationsData = listVariations.map(variation => {
        let listAttValue = attributes.reduce((acc, att) => {
          return acc.concat(att.values || [])
        }, []).map(v => v.trim());
        let listAttName = attributes.map(att => att?.name?.trim())
        let data = variation.fields.filter(item => listAttName.includes(item.name?.trim()) && listAttValue.includes(item.value?.trim())).map(att => ({...att, name: att.name?.trim()}));
        variation.fields = data;
        return variation;
      });

      if (attributes.length > 0) {
        const sortAttributes = attributes.map((item, index) => ({...item, index}))
      }

      this.editProductStore.setEditProduct('variations', variationsData)
    },
    deleteAttribute(idx) {
      let newAttributes = this.editProductStore.product_attributes
      newAttributes.splice(idx, 1)

      this.editProductStore.setEditProduct('product_attributes', newAttributes)
      this.updateAttributes()
    },
    handleSave() {
      const spec = this.editProductStore.id ? "update" : "create"
      const url =  `${VITE_BACKEND_API_URL}/api/admin/products/${spec}`

      const cloneEditProduct = cloneDeep(this.editProductStore)
      const isDuplicateAttributeNames = this.checkDuplicateFields("product_attributes", cloneEditProduct)

      const checkCustomIdVariations = this.editProductStore.variations.filter(el => !el.custom_id && !el.variation_pos_id)

      if (checkCustomIdVariations.length > 0 || this.editProductStore.variations.length == 0) {
        notification.error({
          message: 'Lưu không thành công',
          description: 'Mã mẫu không được để trống',
        })
        this.$emit('change-loading-save')
        return
      }

      if (isEmpty(this.editProductStore.name.trim())) {
        notification.error({
          message: 'Lưu không thành công',
          description: 'Tên sản phẩm không được để trống',
        })
        this.$emit('change-loading-save')
        return
      }

      const isDuplicateFields = this.checkDuplicateFields("fields", cloneEditProduct)
      let product_params = pick(
        this.editProductStore,
        [
          "name", "custom_id", "description", "categories", "image", "variations", "total_sold", "tags"
        ])

      product_params.product_attributes = this.editProductStore.product_attributes.map(el => { return {...el, name: el.name.trim()}})
      product_params = this.editProductStore.id ? Object.assign(product_params, {product_id: this.editProductStore.id}) : product_params

      let price_wrong = this.variations
        .map(item => {
          if (item.original_price !== null && item.original_price !== undefined && item.original_price !== 0) {
            if (item.original_price < item.retail_price || item.original_price === item.retail_price) {
              return item.custom_id;
            }
          }
          return null;
        })
        .filter(value => value !== null);
      
      if (price_wrong.length > 0) {
        notification.error({
          message: 'Lưu không thành công',
          description: `Giá gốc không thể nhỏ hơn hoặc bằng giá bán. Vui lòng kiểm tra lại các mã mẫu: ${price_wrong.join(', ')}`,
        });
        this.$emit('change-loading-save');
        return;
      }

      useApipost(url, null, { product_params})
        .then(res => {
          if (res.status == 200 && res.data.success) {
            let product = res.data.product

            // product.categories = product.categories.map(el => el.id)
            this.editProductStore.setUpdateProduct(product)
            this.variations.value = product.variations

            notification.success({
              message: 'Lưu thành công',
              description: 'Cập nhập sản phẩm thành công',
            })
            this.$emit('change-loading-save')
            this.$emit('visible-edit-product')
          } else {
            let mes_code = res.data.message_code
            notification.error({
              message: "Lưu thất bại",
              description: "Something went wrong!"
            })
            this.$emit('change-loading-save')
          }

          return res
        })
        .catch(err => {
          let mes_code = err?.response?.data?.reason?.message_code
          notification.error({
            message: "Lưu thất bại",
            description: "Something went wrong!"
          })
          this.$emit('change-loading-save')

        })
        .finally(() => {
          localStorage.removeItem(`editProduct`)

          this.allProductStore.getProducts()
        })
    },
    checkDuplicateFields(which, product) {
      let isDuplicate = false
      
      const customizer = (objValue, othValue) => {
        if (!objValue.length && !othValue.length) return false
        let obj = [], oth = [];
        objValue.map(i => {
          obj.push({
            name: i.name,
            value: i.value
          })
        })
        othValue.map(i => {
          oth.push({
            name: i.name,
            value: i.value
          })
        })
        let isDuplicate = true
        if (obj.length == oth.length) {
          obj.map(item => {
            const idx = oth.findIndex(i => i.name == item.name && i.value == item.value)
            if (idx == -1) isDuplicate = false
          })
        } else {
          isDuplicate = false
        }
        return isDuplicate
      }
      
      if (which == "product_attributes") {
        const productAttributes = product.product_attributes
        productAttributes.reduce((acc, att) => {
          if (!acc.find(i => i.name.toString().trim().toLowerCase() == att.name.toString().trim().toLowerCase())) {
            acc.push(att)
            return acc
          } else {
            isDuplicate = true
            return acc
          }
        }, [])
        return isDuplicate;
      } else {
        const variations = (product.variations || [])
        variations.reduce((acc, variation) => {
          if (!acc.find(i => isEqualWith(i.fields, variation.fields, customizer))) {
            acc.push(variation)
            return acc
          } else {
            isDuplicate = true
            return acc
          }
        }, [])
        return isDuplicate;
      }
    },
    getProductById() {
      if (!this.productId) return
      const url = `${VITE_BACKEND_API_URL}/api/admin/products/${this.productId}`

      useApiget(url)
        .then(res => {
          if (res.status == 200 && res.data.success == true) {
            let product = res.data.product

            product.categories = product.categories.map(el => el.id)

            this.editProductStore.setUpdateProduct(product)
            this.variations.value = product.variations
          }
        })
    },
    changeTreeCate(value) {
      this.editProductStore.setEditProduct('categories', value)
    },
  }
}
</script>

<style>

</style>