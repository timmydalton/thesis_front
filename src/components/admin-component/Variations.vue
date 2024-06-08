<template>
  <div class="edit_product_mid_collapse mb-4">
    <div class="w-full bg-ui-2 p-4">
      <div class="flex justify-between items-center">
        <div class="">
          <div class="flex items-center color-text-1 mb-2">
            <span class="text-base font-medium">Tạo mẫu mã</span>
          </div>
          <div class="fz-14 color-dgr">Thông tin về giá, mã, số lượng...</div>
        </div>
      </div>

      <div class="attribute_wrapper pt-4">
        <div class="flex justify-between w-full">
          <div class="flex items-center">
          </div>

          <div class="flex">
            <div class="pl-2">
              <a-button
                type="primary"
                class="flex items-center justify-center"
                @click="handleAddVariation"
              >
                <PlusIcon class="fill-white"/>
                <div class="pl-1 text-sm">Thêm mẫu mã</div>
              </a-button>
            </div>
          </div>
        </div>

        <div class="pt-2">
          <a-table
            :dataSource="variations"
            class="table-variations table-dark-mode"
            :pagination="false"
            :scroll="{x: 1000}"
          >
            <a-table-column title="Ảnh" data-index="images" class="w-16" fixed="left">
              <template #default="{text, record, index}">
                <div class="flex items-center justify-center w-10 h-10">
                  <a-popover placement="right" trigger="click"
                  overlayClassName="z-[1033]"
                  >
                    <template #content>
                      <div class="flex flex-row">
                        <div class="flex flex-row">
                          <div class="img-card" v-for="(url, idx) in text">
                            <div class="img-card-content">
                              <div class="img-card-content-info">
                                <img :src="url" />
                                <div>
                                  <div class="img-card-function">
                                    <div class="img-card-function-action flex-col text-[#fff]">
                                      <div class="flex pb-2">
                                        <a-tooltip title="Xóa">
                                          <div @click="handleRemoveImage(index, idx)">
                                            <TrashIcon />
                                          </div>
                                        </a-tooltip>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="img-card" @click="handleClickUploadImage(index)">
                          <div class="">
                              <span>
                                <LoadingOutlined v-if="loadingImage[index]" />
                                <plus-outlined v-else />
                              </span>
                              <div class="whitespace-nowrap mt-2">Tải ảnh</div>
                            </div>
                            <input @change="e => fileChange(e, index, 'image')" multiple="multiple"  type="file" :id="'upload-image-' + index" hidden />
                        </div>
                      </div>
                    </template>

                    <div :id="'vari-image-' + index" class="w-full h-full flex justify-center items-center">
                      <img :src="text" class="w-full h-full object-cover" v-if="(text || []).length > 0"/>

                      <ImageIcon v-else/>
                    </div>
                  </a-popover>
                </div>
              </template>
            </a-table-column>

            <a-table-column title="Mã mẫu" data-index="custom_id" class="w-36 text-left" fixed="left">
              <template #default="{text, record, index, column }">
                <div class="flex items-center w-32"  >
                  <input 
                    :value="record.custom_id"
                    class="ant-input w-full text-left p-1 text-sm border border-solid"
                    @input ="e => handleEditVariation('custom_id', index, e.target.value)"
                  />
                </div>
              </template>
            </a-table-column>

            <a-table-column title="Giá gốc" data-index="original_price" class="w-36 text-left">
              <template #default="{text, record, index, column }">
                <div class="flex items-center w-32"  >
                  <input 
                    :value="record.original_price"
                    class="ant-input w-full text-left p-1 text-sm border border-solid"
                    @input ="e => handleEditVariation('original_price', index, e.target.value)"
                  />
                </div>
              </template>
            </a-table-column>

            <a-table-column title="Giá bán" data-index="retail_price" class="w-36 text-left">
              <template #default="{text, record, index, column }">
                <div class="flex items-center w-32"  >
                  <input 
                    :value="record.retail_price"
                    class="ant-input w-full text-left p-1 text-sm border border-solid"
                    @input ="e => handleEditVariation('retail_price', index, e.target.value)"
                  />
                </div>
              </template>
            </a-table-column>

            <a-table-column align="left" title="Thuộc tính" data-index="fields" class="w-full">
              <template #default="{ text, record, index, column }">
                <div class="select-dark-mode">
                  <a-select
                    mode="tags"
                    style="width: 100%"
                    :value="text.map(el => el.name + '-----' + el.value)"
                    @select="value => handleSelectAttributeVariation(index, value)"
                    @deselect="value => handleDeselectAttributeVariation(index, value)"
                  > 
                    <a-select-opt-group v-for="attr in editProductStore.product_attributes" >
                      <template  #label>
                        <span>{{ attr.name }}</span>
                      </template>
                      <a-select-option v-for="value in attr.values" :value="attr.name + '-----' + value">
                        {{ attr.name + " : " + value }}
                      </a-select-option>

                    </a-select-opt-group>
                  </a-select>
                </div>
              </template>
            </a-table-column>

            <a-table-column title="Có thể bán" data-index="remain_quantity" class="w-36 text-left">
              <template #default="{text, record, index, column }">
                <div class="flex items-center w-32"  >
                  <input 
                    :value="record.remain_quantity"
                    class="ant-input w-full text-left p-1 text-sm border border-solid"
                    @input ="e => handleEditVariation('remain_quantity', index, e.target.value)"
                  />
                </div>
              </template>
            </a-table-column>

            <a-table-column title="Ẩn hiện" data-index="is_hidden" class="w-16 whitespace-nowrap">
              <template #default="{text, record, index, column}">
                <a-switch
                  :checked="!record.is_hidden"
                  @change="checked => handleChangeIsHiddenVariation(index, !checked)"
                />
              </template>
            </a-table-column>

            <a-table-column title="" data-index="action" class="w-14">
              <template #default="{text, record, index}">
                <div class="trash-variation flex" style="visibility: hidden" v-if="editProductStore.variations.length == 1">
                  <TrashIcon/>
                </div>
                <div class="trash-variation flex cursor-pointer" v-else @click="handleDeleteVariation(record, index)">
                  <TrashIcon />
                </div>
              </template>
            </a-table-column>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useEditProductStore, useAllProductStore } from '@/stores/product.js'
import { cloneDeep } from 'lodash'

import PlusIcon from '@/assets/svg/plus-sm.svg?component'
import ImageIcon from "@/assets/svg/image.svg?component"
import TrashIcon from '@/assets/svg/trash-sm.svg?component'
import { PlusOutlined, LoadingOutlined, PictureOutlined } from '@ant-design/icons-vue'
import { useApipost, useApiget } from "@/composable/fetch.js"

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL

export default {
  setup() {
    const editProductStore = useEditProductStore()
    const allProductStore = useAllProductStore()
    
    return {
      editProductStore,
      allProductStore
    }
  },
  props: ['productId'],
  data() {
    return {
      variationKey: '',
      loadingImage: [],
    }
  },
  components: {
    PlusIcon,
    ImageIcon,
    TrashIcon,
    PlusOutlined,
    LoadingOutlined,
    PictureOutlined
  },
  computed: {
    variations() {
      return this.editProductStore.variations || []
    }
  },
  methods: {
    handleRemoveImage(index, idx) {
      let newVariations = cloneDeep(this.editProductStore.variations)
      newVariations[index]['images'].splice(idx, 1)

      this.editProductStore.setEditProduct('variations', newVariations)
    },
    handleClickUploadImage(idx) {
      document.getElementById(`upload-image-${idx}`).click()
    },
    handleAddVariation() {
      let newVariations = cloneDeep(this.editProductStore.variations)
        newVariations.push({
        images: [],
        custom_id: '',
        original_price: 0,
        retail_price: 0,
        fields: [],
        remain_quantity: 0,
        is_hidden: false,
      })
      this.editProductStore.setEditProduct('variations', newVariations)
    },
    handleEditVariation(key, index, value) {
      let newVariations = cloneDeep(this.variations)

      switch(key) {
          case 'original_price':
            newVariations[index].original_price = value
            break

          case 'retail_price':
            newVariations[index].retail_price = value
            break

          case 'remain_quantity':
            newVariations[index].remain_quantity = value || 0
            break

          case 'custom_id':
            newVariations[index].custom_id = value
            break
      }

      this.editProductStore.setEditProduct('variations', newVariations)
    },
    handleClickVariation(key, index, record) {
      this.variationKey = `${key}_${index}`
      this.$nextTick(() => {
        let ref = `${key}_${index}`
        this.$refs[ref].focus()
      })
    },
    handleSelectAttributeVariation(idx, value) {
      let data = {name: value.split("-----")[0], value: value.split("-----")[1]}

      let newVariations = cloneDeep(this.variations)

      if (newVariations[idx].fields.length > 0) {
        let indexDup = newVariations[idx].fields.findIndex(el => el.name == data.name)
        if (indexDup > -1) {
          newVariations[idx].fields[indexDup].value = data.value
        } else {
          newVariations[idx].fields.push(data)
        }
      } else {
        newVariations[idx].fields.push(data)
      }

      let attrs = this.editProductStore.product_attributes.map(el => el.name)
      let fields = []
      attrs.map(el => {
        let field = Object.entries(newVariations[idx].fields).filter(e => e[1].name == el)
        if (field.length > 0) fields.push({name: el, value: field[0][1].value})
      })
      newVariations[idx].fields = fields

      this.editProductStore.setEditProduct('variations', newVariations)

    },
    handleDeselectAttributeVariation(idx, value) {
      let data = {name: value.split("-----")[0], value: value.split("-----")[1]}
      let newVariations = cloneDeep(this.variations)
      let indexDup = newVariations[idx].fields.findIndex(el => el.name == data.name && el.value == data.value)
      newVariations[idx].fields.splice(indexDup, 1)

      this.editProductStore.setEditProduct('variations', newVariations)
    },
    handleChangeIsHiddenVariation(index, value) {
      let newVariations = cloneDeep(this.variations)

      newVariations[index].is_hidden = value
      
      this.editProductStore.setEditProduct('variations', newVariations)
    },
    handleDeleteVariation(record, index) {
      let newVariations = cloneDeep(this.variations)
      newVariations.splice(index, 1)
      this.editProductStore.setEditProduct('variations', newVariations)
    },
    fileChange(event, index, type) {
      let files = event.target.files || []
      let typeFile = files[0].type
      const ImgSize = files[0].size / 1024 / 1024
      const that = this
      if (ImgSize <= 100) {
        let _URL = window.URL || window.webkitURL
        let count = 0
        let uploadedList = []

        for (let i=0; i<files.length; i++) {
          let img = new Image()
          let objectUrl = _URL.createObjectURL(files[i])

          img.onload = function() {
            _URL.revokeObjectURL(objectUrl)
            let data = new FormData()
            data.append('file', files[i], files[i].name || files[i].filename)

            let url = `${VITE_BACKEND_API_URL}/api/admin/content/upload_file`

            that.loadingImage.splice(index, 1, true)
            useApipost(url, null, data)
              .then(res => {
                if (res.data.success && res.status == 200) {
                  let newVariations = [...that.editProductStore.variations]

                  if (newVariations[index]["images"] == null) newVariations[index]["images"] = []
                  newVariations[index]["images"].push(res.data.content_url)
                  let images = [...newVariations[index]["images"]]
                  that.editProductStore.setEditProduct('variations', newVariations)
                  that.loadingImage.splice(index, 1, false)
                }
              })
              .catch(error => {
                that.loadingImage.splice(index, 1, false)
                const reason = error?.response?.data?.reason
              })
          }

          img.src = objectUrl
        }
      } else {
        this.$message.error("File vượt quá dung lượng")
      }
    }
  }
}
</script>

<style>

</style>