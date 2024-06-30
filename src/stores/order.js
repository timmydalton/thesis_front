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
      info_order: [],
      insight_order: [],
      insight_revenue: [],
      insight_account: [],
      dataCountDay: [],
      data_product_hot: []
    }
  },
  getters: {
    total_order_count(state) {
      return state.insight_order.reduce((acc, cur) => {
        return acc + cur
      }, 0)
    },
    total_revenue_count(state) {
      return state.insight_revenue.reduce((acc, cur) => {
        return acc + cur
      }, 0)
    },
    total_account_count(state) {
      return state.insight_account.reduce((acc, cur) => {
        return acc + cur
      }, 0)
    },
    total_sold_count(state) {
      return state.info_order.reduce((acc, cur) => {
        const amount = (cur.order_items).reduce((a, c) => a + c.quantity, 0)
        return acc + amount
      }, 0)
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
    getOrders_insight(setOrder){
      let url = `${VITE_BACKEND_API_URL}/api/admin/orders/get_by_time`
      return useApiget(url, setOrder)
        .then(res => {
          this.info_order = res.data.insight.info_order
          this.insight_order = res.data.insight.insight_order.map(item => item.count)
          this.insight_revenue = res.data.insight.insight_revenue.map(item => item.count)
          this.insight_account = res.data.insight.insight_account.map(item => item.count)
          this.dataCountDay = res.data.insight.insight_revenue.map(item => item.day)

          let order_items = this.info_order.reduce((arr, item) => {
            let newItem = item.order_items.map(order_item => {
              order_item ={
                ...order_item,
                abc: item.id
              }
              return order_item
            })
            return [...arr, ...newItem]
          },[])
  
          let product_info = order_items.map(el => ({
            ...el.variation_info,  
            quantity: el.quantity,  
          }));

          let aggregatedData = {};

          this.data_product_hot = product_info.reduce((acc, item) => {
            let productId = item.product_id;

            if (!aggregatedData[productId]) {
              aggregatedData[productId] = {
                quantity: item.quantity,
                retail_price: item.retail_price,
                retailPriceTotal: item.retail_price * item.quantity,
                image: item.images[0],
                name: item.name,
              };
              acc.push(aggregatedData[productId]);
            } else {
              aggregatedData[productId].quantity += item.quantity;
              aggregatedData[productId].retailPriceTotal += item.retail_price * item.quantity;
            }

            return acc;
          }, []);
          this.data_product_hot.sort((a, b) => b.quantity - a.quantity);
        })
    },
    updateOrder(order, attrs) {
      const params = {
        attrs,
        order_id: order.id
      }

      const url = `${VITE_BACKEND_API_URL}/api/admin/orders/update_order`
      return useApipost(url, null, params)
    }
  }
})