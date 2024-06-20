import { defineStore } from "pinia"
import { pick, findIndex, find, omit, set } from "lodash"
import dayjs from 'dayjs';

import { useApipost, useApiget } from "@/composable/fetch.js"
import { ORDER_STATUS, ORDER_STATUS_ALLOW_EDIT } from "@/common/enum"

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL

export const useOrderStore = defineStore("order", {
  state: () => {
    return {
      orders: { data: [], filter_options: {} },
      editOrder: {
        shipping_address: {
        },
        order_items: [],
      },
      visibleModalOrder: false,
      loadingOrders: false,
      countOrderStatus: [],
      selectedRowKeys: [],
      setOrder: {
        page: 1, 
        limit: 20,
        statusOrder: 0,
        siteId: null,
        idProduct: "",
        startTime: dayjs().subtract(6, 'day').startOf('day').toISOString(),
        endTime: dayjs().endOf('day').toISOString()
      },
    }
  },
  actions: {
    setSearchTerm(value) {
      this.orders.term = value
    },
    setStateField(key, value) {
      this[key] = value
    },
    resetEditOrder() {
      this.editOrder = { shipping_address: {}, order_items: [] }
    },
    setEditOrder(value) {
      this.editOrder = value
    },
    setEditOrderField(key, value) {
      this.editOrder[key] = value
    },
    setShippingAddressField(key, value) {
      this.editOrder.shipping_address[key] = value
    },
    setShippingAddress(data) {
      this.editOrder.shipping_address = { ...this.editOrder.shipping_address, ...data }
    },
    setFilterOptions(key, value) {
      this.orders = set(this.orders, `filter_options[${key}]`, value)
    },
    removeFilterOption(keys) {
      this.orders.filter_options = omit(this.orders.filter_options, keys)
    },
    getOrders(payload, cb) {
      if (!cb) this.loadingOrders = true
      let params = pick(this.orders, ["term", "page", "limit", "status", "filter_options"])
      params = { ...params, ...payload }

      let url = `${VITE_BACKEND_API_URL}/api/admin/orders/all`
      return useApiget(url, {...params, filter_options: JSON.stringify(params.filter_options || {}) })
        .then(res => {
          if (res.status == 200) {
            if (!cb) {
              this.orders = { ...params, ...res.data.orders }
              this.selectedRowKeys = []
              this.countOrderStatus = res.data.orders.count_status
            } else {
              cb(res)
            }
          }
          return res
        })
        .finally(() => {
          this.loadingOrders = false
        })
    },
  }
})