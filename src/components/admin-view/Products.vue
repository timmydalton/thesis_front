<template>
  <div class="products p-6">
    <div class="products_top">
      <div class="products_top-action">
        <div class="products_top-action--left flex">
          <div class="products_top-action--plus" @click="handleCreateNewProduct">
            <PlusIcon/>
          </div>

          <div v-if="idsRowSelected.length > 0" class="products_top-action--default rm-selected mr-2" @click="showConfirm">
            <TrashIcon class="scale-75" />
            Xóa
          </div>

          <div v-if="idsRowSelected.length > 0" class="products_top-action--default mr-2" >
            <span class="pl-1"> {{ idsRowSelected.length }} đã chọn </span>
            <CloseIcon @click="removeAllSelected" />
          </div>
        </div>

        <div class="products_top-action--right flex shrink-0">
        </div>
      </div>

      <div class="products_top-search flex justify-end pb-4 pt-2">
      </div>
    </div>

    <div class="products_mid">
      <div class="products_mid_content">
        <div class="products_mid_content_table">
          <a-table
            :dataSource="allProducts.renderProducts"
            :pagination="false"
            :customRow="customRow"
            :rowSelection="rowSelection"
            :loading="allProducts.loading_products"
            :scroll="{x: 1500, y: 'calc(100vh - 310px)' }"
            @resizeColumn="handleResizeColumn"
            class="table-dark-mode"
            :rowClassName="rowClassName"
          >
            <template #expandedRowRender="{ record }">
              <div
                v-for="(vari, idx) in record.variations"
                :class="['flex py-2 justify-center ', {'border-b border-slate-200 border-solid border-x-0 border-t-0': record.variations.length - 1 != idx }]"
              >
                <div class="w-3/6 flex" :style="{'margin-left': '95px'} ">
                  <div class="flex items-center justify-center pr-2">
                    <div class="w-10 h-10">
                      <img v-if="(vari.images || []).length > 0" class="w-full h-full object-cover shrink-0" :src="resizeImageSize(vari.images[0], 40, 40) || ''" />
                      <div v-else class="image-default">
                        <ImageIcon />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col justify-center">
                    <div class="font-bold"> {{ vari.custom_id }} </div>
                    <div class="flex">
                      <div v-for="att in vari.fields">
                        <span class="text-green-800"> {{ att.name }}:</span>
                        <span class="pr-1"> {{ att.value }} </span>
                      </div>
                      <div class="pr-1"> - </div>
                      <div class="text-cyan-500 pr-1"> {{ vari.weight }} <span>g</span></div>
                    </div>
                  </div>
                </div>
                <div class="w-3/6 flex">
                  <div class="w-3/12 flex items-center">
                    <span>Giá bán:</span>
                    <span class="pl-1 text-cyan-500">{{ formatNumber(vari.retail_price, general.currency, false) }}</span>
                    <span class="pl-1 text-cyan-500">{{ getCurrencySymbol(general.currency) }}</span>
                  </div>
                  <div class="w-3/12 flex items-center">
                    <span>Giá gốc:</span>
                    <span class="pl-1 text-cyan-500">{{ formatNumber(vari.original_price, general.currency, false) }}</span>
                    <span class="pl-1 text-cyan-500">{{ getCurrencySymbol(general.currency) }}</span>
                  </div>
                  <div class="w-3/12 flex items-center">
                    <span>Tồn kho:</span>
                    <span class="pl-1 text-cyan-500">{{ formatNumber(vari.remain_quantity) }}</span>
                  </div>
                </div>
              </div>
            </template>

            <template #bodyCell="{column, record}">
              <template v-if="column.key === 'name'">
                <div class="flex items-center">
                  <a-popover
                    v-if="record.image"
                    placement="right"
                  >
                    <template #content>
                      <img :src="record.image" class="w-72 h-auto object-cover"/>
                    </template>
                    <img :src="record.image" class="w-10 h-10 object-cover shrink-0"/>
                  </a-popover>
                  <div v-else class="image-default w-10 h-10">
                    <ImageIcon />
                  </div>
                </div>
              </template>

              <template v-if="column.key === 'total_sold'">
                <span>{{record.total_sold}}</span>
              </template>

              <template v-if="column.key === 'custom_id'">
                <a-tooltip placement="top">
                  <template #title>
                    <span>{{ record.custom_id }}</span>
                  </template>
                  <div class="truncate"> {{ record.custom_id }}</div>
                </a-tooltip>
              </template>

              <template v-if="column.key === 'categories'">
                <div class="flex">
                  <a-tooltip placement="top">
                    <template #title>
                      <span>Danh mục</span>
                    </template>
                    <span class="truncate">Danh mục</span>
                  </a-tooltip>
                </div>
              </template>
            </template>
          </a-table>

          <a-pagination
            @change="onChangePagination"
            :total="allProducts.total_product"
            :current="allProducts.products?.page || 1"
            :pageSize="allProducts.products?.limit || 20"
            class="flex justify-end p-2.5 pagination-dark-mode"
          />
        </div>
      </div>
    </div>

    <a-modal
      v-if="visibleModalEditProduct"
      class="modal_edit_product modal-dark-mode custom-modal relative overflow-hidden z-[100000] editor-modal"
      style="top: 20px"
      title="Cài đặt sản phẩm"
      centered
      :open="visibleModalEditProduct"
      @cancel="handleCancelEditProduct"
    >
      <template #footer>
        <div class="flex">
          <div class="flex justify-end w-full">
            <a-button @click="handleCancelEditProduct"> cancel </a-button>
            <a-button type="primary" :loading="loaddingSaveProduct" @click="handleOkEditProduct">Save</a-button>
          </div>
        </div>
      </template>

      <EditProduct ref="editProduct"
        :productId="productId"
        :gotoPage="gotoPage"
        @change-loading-save="changeLoadingSaveProduct($event)"
        @visible-edit-product="handleCancelEditProduct($event)"
      />
    </a-modal>
  </div>
</template>

<script>
import PlusIcon from '@/assets/svg/plus-sm.svg?component'
import TrashIcon from '@/assets/svg/trash-sm.svg?component'
import CloseIcon from '@/assets/svg/close-sm.svg?component'
import ImageIcon from '@/assets/svg/image.svg?component'

import EditProduct from '@/components/admin-component/EditProduct.vue'
import { Modal } from 'ant-design-vue';

import { getCurrencySymbol, formatNumber } from '@/composable/formatNumber.js'
import { ExclamationCircleOutlined, DownOutlined, TagsOutlined, WarningOutlined } from '@ant-design/icons-vue'
import { createVNode } from 'vue'

import { useEditProductStore, useAllProductStore } from '@/stores/product.js'
import { useGeneralStore } from "@/stores/general.js"

export default {
  setup() {
    const editProductStore = useEditProductStore()
    const allProducts = useAllProductStore()
    const general = useGeneralStore()

    return {
      editProductStore,
      allProducts,
      general,
      getCurrencySymbol,
      formatNumber,
    }
  },
  components: {
    PlusIcon,
    TrashIcon,
    CloseIcon,
    ImageIcon,
    EditProduct
  },
  data() {
    // let columns = [
    //   {
    //     dataIndex: 'name',
    //     key: 'name',
    //     width: 250,
    //     title: 'Tên sản phẩm',
    //     align: 'left',
    //     fixed: true,
    //     ellipsis: true,
    //   },
    //   {
    //     dataIndex: 'display_id',
    //     key: 'display_id',
    //     width: 100,
    //     title: 'Mã SP',
    //     align: 'center',
    //     fixed: true,
    //     ellipsis: true,
    //   },
    //   {
    //     dataIndex: 'categories',
    //     key: 'categories',
    //     width: 200,
    //     title: 'Danh mục',
    //     align: 'left',
    //     ellipsis: true,
    //     resizable: true
    //   },
      // {
      //   dataIndex: 'retail_price',
      //   key: 'retail_price',
      //   width: 200,
      //   title: this.$t('products.retail_price'),
      //   align: 'right',
      //   ellipsis: true,
      //   resizable: true
      // },
      // {
      //   dataIndex: 'original_price',
      //   key: 'original_price',
      //   width: 200,
      //   title: this.$t('products.original_price'),
      //   align: 'right',
      //   ellipsis: true,
      //   resizable: true
      // },
      // {
      //   dataIndex: 'remain_quantity',
      //   key: 'remain_quantity',
      //   width: 100,
      //   title: this.$t('products.amount'),
      //   align: 'center',
      //   ellipsis: true,
      //   resizable: true
      // },
      // {
      //   dataIndex: 'total_sold',
      //   key: 'total_sold',
      //   width: 100,
      //   title: 'Đã bán',
      //   align: 'center',
      //   ellipsis: true,
      //   resizable: true
      // },
    // ]

    return {
      visibleModalEditProduct: false,
      productId: null,
      idsRowSelected: [],
      rowsSelected: [],
      loaddingSaveProduct: false,
      // columns
    }
  },
  created() {
    this.gotoPage()
  },
  computed: {
    rowSelection() {
      return {
        onSelect: (record, selected, selectedRows) => {
          if (selected) {
            this.idsRowSelected.push(record.id)
            let product = this.allProducts.products.data.filter(el => el.id == record.id)[0]
            this.rowsSelected.push(product)
          } else {
            this.idsRowSelected.splice(this.idsRowSelected.indexOf(record.id), 1)
            this.rowsSelected.splice(this.rowsSelected.findIndex(el => el.id == record.id), 1)
          }
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          const ids = changeRows.map(r => r.id)
          let products = this.allProducts.products.data.filter(el => ids.includes(el.id))
          if (selected) {
            this.idsRowSelected = [...this.idsRowSelected, ...ids]
            this.rowsSelected = [...this.rowsSelected, ...products]
          } else {
            this.idsRowSelected.splice(this.idsRowSelected.length - ids.length)
            this.rowsSelected.splice(this.rowsSelected.length - changeRows.length)
          }

        },
        columnWidth: '50px',
        selectedRowKeys: this.idsRowSelected,
      }
    },
  },
  methods: {
    handleCreateNewProduct() {
      this.editProductStore.reset()
      this.productId = ''

      if (localStorage.getItem(`editProduct`)) {
        let that = this
        Modal.confirm({
          title: "Bạn có muốn hoàn thành sản phẩm đang tạo mới không ?",
          okText: 'Tiếp tục',
          cancelText: "Hủy",
          onOk() {
            let draftProduct = JSON.parse(localStorage.getItem(`editProduct`))
            that.editProductStore.setUpdateProduct(draftProduct)
            that.visibleModalEditProduct = true
          },
          onCancel() {
            localStorage.removeItem(`editProduct-${that.siteId}`)
            that.visibleModalEditProduct = true

          }
        })
      } else {
        this.visibleModalEditProduct = true
      }
    },
    showConfirm() {
      let that = this
      Modal.confirm({
        title: `Bạn có chắc chắn muốn xóa ${this.idsRowSelected.length} sản phẩm đã chọn?`,
        icon: createVNode(ExclamationCircleOutlined),
        okText: 'Đồng ý',
        cancelText: "Không",
        onOk() {
          that.removeProducts()
        },
        onCancel() {
          //          Modal.destroyAll()
        },
      })
    },
    async removeProducts() {

    },
    removeAllSelected() {
      this.idsRowSelected = []
      this.rowsSelected = []
    },
    customRow(record, idx) {
      return {
        onClick: this.handleClickRowProduct.bind(this, record, idx)
      }
    },
    handleClickRowProduct(record, idx) {
      if (record.id != this.productId) this.editProductStore.reset()

      this.visibleModalEditProduct = true
      this.productId = record.id
    },
    handleResizeColumn(w, col) {
      if(w < 80) {
        col.width = 80
      } else {
        col.width = w
      }
    },
    rowClassName(record) {
      return record.id == this.editProductStore.id ? "bg-theme-table-selected" : ""
    },
    onChangePagination(p, ps) {
    },
    handleCancelEditProduct() {
      if ( !this.productId
        && (!!this.editProductStore.name
        || !!this.editProductStore.custom_id
        || !!this.editProductStore.description
        || this.editProductStore.tags.length > 0
        || this.editProductStore.categories.length > 0
        || this.editProductStore.variations.length > 0)
      ) {
        localStorage.setItem(`editProduct`, JSON.stringify(this.editProductStore.$state))
      
      }
      this.visibleModalEditProduct = false
    },
    handleOkEditProduct() {
      this.loaddingSaveProduct = true
      this.$refs.editProduct.handleSave()
    },
    changeLoadingSaveProduct() {
      this.loaddingSaveProduct = false
    },
    gotoPage() {
      this.allProducts.getProducts()
    },
  }
}
</script>

<style>

</style>