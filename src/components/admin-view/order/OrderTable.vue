<template>
  <div class="custom-table custom-table--hover-head order-table" ref="tableRef">
    <a-table
      size="small"
      :dataSource="orderStore.orders.data"
      :pagination="false"
      :columns="columns.map(el => ({...el, title: el.title}))"
      :scroll="scrollTable"
      :row-selection="{ selectedRowKeys: orderStore.selectedRowKeys, onChange: onSelectChange }"
      :customRow="customRow"
      :rowClassName="rowClassName"
      :loading="orderStore.loadingOrders"
      :rowKey="(record) => record.id"
      @resizeColumn="handleResizeColumn"
    >
      <template #headerCell="{text, column}">
        <template v-if="column.key === 'status'">
          <div class="flex justify-center">{{column.title}}</div>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key == 'display_id'">
          <div>{{ record.display_id }}</div>
        </template>

        <template v-if="column.key === 'customer'">
          <div :class="{
            'overflow-hidden whitespace-nowrap text-ellipsis': !orderStore.viewDetailOrders,
          }">
            {{ record.bill_full_name }}
          </div>
        </template>

        <template v-if="column.key === 'phone_number'">
          <a-tooltip>
            <template #title>Click để copy</template>
            <div class="text-theme-button-primary w-fit cursor-pointer" @click="handleCopy(record.bill_phone_number, $event)"> {{
              record.bill_phone_number
            }}</div>
          </a-tooltip>
        </template>

        <template v-if="column.key === 'items'">
          <div>
            <div v-if="(record.order_items || []).length || (record.custom_items || []).length">
              <div
                class="flex pb-1 mb-1 items-center border-b border-dashed border-t-0 border-l-0 border-r-0 border-theme-border w-fit last:border-none"
                v-for="(el, index) in record.order_items" :key="index">
                <div class="mr-1">
                  <a-avatar shape="square" :src="getImageVariation(el)" />
                </div>
                <div class="whitespace-nowrap">
                  <div class="leading-[16px]">{{ el.variation_info.name }}</div>
                  <div class="text-color-text-dark-02 leading-[16px]">{{ getVariationTitle(el.variation_info) }}</div>
                </div>
              </div>

              <div
                class="flex pb-1 mb-1 items-center border-b border-dashed border-t-0 border-l-0 border-r-0 border-theme-border w-fit last:border-none"
                v-for="(el, index) in record.custom_items" :key="index">
                <div class="mr-1">
                  <a-avatar shape="square" :src="el.images?.[0]" />
                </div>
                <div class="whitespace-nowrap">
                  <div class="leading-[16px]">Sản phẩm thiết kế</div>
                </div>
              </div>
            </div>
            <div v-else class="text-theme-danger whitespace-nowrap">
              Không có sản phẩm
            </div>
          </div>
        </template>

        <template v-if="column.key === 'receiver_info'">
          <div>
            <div class="flex">
              <div class="text-color-text-dark-02">{{ record.shipping_address.city_name }}</div>
            </div>
          </div>
        </template>

        <template v-if="column.key === 'inserted_at'">
          {{ formatDateTime(7, record.inserted_at) }}
        </template>

        <template v-if="column.key === 'invoice_value'">
          <div class="order-payment">
            <div class="invoice">
              <div class="invoice__item invoice__item--total">
                <div class="invoice__item__title">
                  Tiền hàng
                </div>
                <div class="nvoice__item__money">
                  {{ formatNumber(orderInvoice(record)) }}₫
                </div>
              </div>

              <div class="invoice__item">
                <div class="invoice__item__title">
                  Phí ship
                </div>
                <div class="nvoice__item__money">
                  {{ formatNumber(paidOrder(record.shipping_fee)) }}₫
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-if="column.key === 'status'">
          <div class="flex items-center justify-center">
            <OrderStatus :item="record" />
          </div>
        </template>
      </template>
    </a-table>
  </div>
  <a-pagination :total="orderStore?.orders?.total_entries || 0" :current="orderStore.orders.page || 1"
    :pageSize="orderStore.orders.limit" :show-size-changer="false" class="p-2 flex justify-end custom-pagination"
    @change="handleChangePaginate" />
</template>

<script>
import { useOrderStore } from "@/stores/order.js"
import { cloneDeep, findIndex } from "lodash"
import { formatDateTime, formatNumber } from "@/composable/common"
import { LoadingOutlined } from "@ant-design/icons-vue"
import { h } from "vue"

import OrderStatus from "@/components/admin-view/order/OrderStatus.vue"

export default {
  setup() {
    const orderStore = useOrderStore()
    
    return {
      orderStore,
      formatDateTime,
      formatNumber
    }
  },
  components: {
    OrderStatus
  },
  data() {
    let columns = [
      {
        dataIndex: 'display_id',
        key: 'display_id',
        width: 60,
        title: "ID",
        fixed: "left",
      },
      {
        dataIndex: 'customer',
        key: 'customer',
        resizable: true,
        width: 120,
        minWidth: 120,
        title: 'Khách hàng'
      },
      {
        dataIndex: 'items',
        key: 'items',
        resizable: true,
        width: 250,
        minWidth: 200,
        title: 'Sản phẩm'
      },
      {
        dataIndex: 'phone_number',
        key: 'phone_number',
        resizable: true,
        width: 100,
        minWidth: 100,
        title: 'Số điện thoại'
      },
      {
        dataIndex: 'receiver_info',
        key: 'receiver_info',
        width: 150,
        minWidth: 150,
        resizable: true,
        title: 'Địa chỉ'
      },
      {
        dataIndex: 'inserted_at',
        key: 'inserted_at',
        resizable: true,
        width: 150,
        minWidth: 150,
        title: 'Thời gian tạo'
      },
      {
        dataIndex: 'invoice_value',
        key: 'invoice_value',
        width: 250,
        minWidth: 250,
        resizable: true,
        title: 'Tổng số tiền'
      },
      {
        dataIndex: 'status',
        key: 'status',
        width: 180,
        title: 'Trạng thái',
        fixed: 'right'
      }
    ]
    return {
      columns,
      scrollTable: { x: 1000, y: "100%" }
    }
  },
  methods: {
    onSelectChange(e) {
      this.orderStore.setStateField("selectedRowKeys", e)
    },
    handleClickRow(e, record) {
      this.orderStore.setEditOrder(cloneDeep(record))
      this.orderStore.setStateField("visibleModalOrder", true)
    },
    customRow(record, index) {
      return {
        onClick: (e) => this.handleClickRow(e, record, index),
      };
    },
    handleResizeColumn(w, col) {
      let newWidth = w
      if (w < 120) {
        newWidth = 120;
      }
     let indexCol = findIndex(this.columns, el => el.dataIndex == col.dataIndex)
      if (indexCol > -1) {
        this.columns[indexCol].width = newWidth
      }
    },
    handleChangePaginate(page, pageSize) {
      this.orderStore.getOrders({ page: page })
    },
    rowClassName(record) {
      return record.id == this.orderStore.editOrder.id ? "bg-theme-table-selected" : ""
    },
    getVariationTitle(variation) {
      let fields = variation.fields
      return fields.map(el => `${el.name}: ${el.value}`).join(", ")
    },
    paidOrder(order) {
      return (order.transfer_money || 0)
    },
    lackMoney(order) {
      return this.orderInvoice(order) - this.paidOrder(order) - (order.discount || 0)
    },
    handleCopy(text, event) {
      event.stopPropagation()
      navigator.clipboard.writeText(text)
        .then(() => this.$message.success("Đã copy!"))
        .catch(err => console.log("Error copy clipboard", err))
    },
    orderInvoice(order) {
      return order.invoice_value
    },
    getImageVariation(item) {
      if ((item?.variation_info?.images || []).length) {
        return item.variation_info.images[0]
      }
      return "https://content.pancake.vn/1/1d/58/cb/7e/a43b3f11a05df59ef40150693cc2de037716558eb5dd65a758052eb0.jpg"
    }
  }
}
</script>