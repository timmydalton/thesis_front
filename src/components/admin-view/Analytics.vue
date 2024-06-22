<template>
  <section class="section-analytic">
    <div class="cr-page-title">
      <div class="cr-breadcrumb">
        <h5>Thống kê cửa hàng</h5>
        <ul>
          <li><a href="index.html">Quản lý</a></li>
          <li>Thống kê</li>
        </ul>
      </div>
      
      <div class="cr-tools">
        <DatetimePicker/>
      </div>
    </div>

    <div class="row">
      <div class="col-xl-12">
        <div class="row">
          <div class="col-xl-3 col-md-6">
            <div class="cr-card">
              <div class="cr-card-content label-card">
                <div class="title">
                  <span class="icon icon-1"><i class="ri-shield-user-line"></i></span>
                  <div class="growth-numbers">
                    <h4>Khách hàng</h4>
                    <h5>{{ total_account_count }}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-md-6">
            <div class="cr-card">
              <div class="cr-card-content label-card">
                <div class="title">
                  <span class="icon icon-2"><i class="ri-shopping-bag-3-line"></i></span>
                  <div class="growth-numbers">
                    <h4>Đơn hàng</h4>
                    <h5>{{ total_order_count }}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-md-6">
            <div class="cr-card">
              <div class="cr-card-content label-card">
                <div class="title">
                  <span class="icon icon-3"><i class="ri-money-dollar-circle-line"></i></span>
                  <div class="growth-numbers">
                    <h4>Doanh thu</h4>
                    <h5>{{ formatNumber(total_revenue_count) }}₫</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-md-6">
            <div class="cr-card">
              <div class="cr-card-content label-card">
                <div class="title">
                  <span class="icon icon-4"><i class="ri-exchange-dollar-line"></i></span>
                  <div class="growth-numbers">
                    <h4>Sản phẩm bán</h4>
                    <h5>{{ total_sold_count }}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xl-12">
        <div class="cr-card revenue-overview">
          <div class="cr-card-header header-575">
            <h4 class="cr-card-title">Thống kê doanh thu</h4>
          </div>

          <div class="cr-card-content">
            <!-- <div class="cr-chart-header">
              <div class="block">
                <h6>Tổng đơn</h6>
                <h5>{{ total_order_count }}</h5>
              </div>
              <div class="block">
                <h6>Doanh thu</h6>
                <h5>{{ formatNumber(total_revenue_count) }}₫</h5>
              </div>
            </div> -->
            
            <div class="cr-chart-content">
              <RevenueTable/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xl-12">
        <div class="cr-card revenue-overview">
          <div class="cr-card-header header-575">
            <h4 class="cr-card-title">Sản phẩm bán chạy</h4>
          </div>

          <div class="cr-card-content table-responsive">
            <table id="top_product_data_table" class="table dataTable no-footer" aria-describedby="top_product_data_table_info">
              <thead>
                <tr>
                  <th rowspan="1" colspan="1" style="width: 249.25px;">
                    Sản phẩm
                  </th>
                  <th class="sorting" rowspan="1" colspan="1" style="width: 98.1562px;">
                    Giá
                  </th>
                  <th class="sorting" rowspan="1" colspan="1" style="width: 104.312px;">
                    Số lượng
                  </th>
                  <th class="sorting" rowspan="1" colspan="1" style="width: 97.7969px;">
                    Tổng thu
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="odd" v-for="item in orderStore.data_product_hot">
                  <td class="sorting_1">
                    <img class="cat-thumb" :src="item.image" alt="clients Image">
                    <span class="name">{{ item.name }}</span>
                  </td>
                  <td>{{ formatNumber(item.retail_price) }}₫</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ formatNumber(item.retailPriceTotal) }}₫</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import RevenueTable from "@/components/admin-view/analytic/RevenueTable.vue"
import DatetimePicker from "@/components/admin-view/analytic/DatetimePicker.vue"

import { useOrderStore } from "@/stores/order.js"
import { formatNumber } from '@/composable/formatNumber.js'

export default {
  setup() {
    const orderStore = useOrderStore()

    return {
      orderStore,
      formatNumber
    }
  },
  components: {
    RevenueTable,
    DatetimePicker
  },
  computed: {
    total_order_count() {
      return this.orderStore.total_order_count
    },
    total_revenue_count() {
      return this.orderStore.total_revenue_count
    },
    total_account_count() {
      return this.orderStore.total_account_count
    },
    total_sold_count() {
      return this.orderStore.total_sold_count
    },
  }
}
</script>

<style>

</style>