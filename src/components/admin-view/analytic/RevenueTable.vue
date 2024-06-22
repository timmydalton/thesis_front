<template>
  <apexcharts type="area" height="350" width="100%" :options="chartOptions" :series="series"></apexcharts>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import { formatNumber } from '@/composable/formatNumber.js'
import { useOrderStore } from "@/stores/order.js"

export default {
  setup() {
    const order = useOrderStore();

    return {
      formatNumber,
      order,
    }
  },
  components: {
    apexcharts: VueApexCharts
  },
  computed: {
    insight() {
      return this.order.insight_order
    },
    revenue() {
      return this.order.insight_revenue
    },
    series() {
      return [
        {
          name: "Đơn hàng đặt",
          type: 'area',
          data: this.insight
        },
        {
          name: "Doanh thu",
          type: 'area',
          data: this.revenue
        }
      ]
    },
    chartOptions() {
      return {
        chart: {
          height: 350,
          type: 'area',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false,
            tools: {
              download: false,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false | '<img src="/static/icons/reset.png" width="20">',
              customIcons: []
            }
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 2,
          curve: 'smooth'
        },
        legend: {
          tooltipHoverFormatter: function(val, opts) {
            return val
          }
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6
          }
        },
        xaxis: {
          categories: this.order.dataCountDay,
          labels: {
            formatter: (value) => { 
              return value; 
            },
          }
        },
        yaxis: [
          {
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: '#008FFB'
            },
            tooltips: {
              enabled: true
            }
          },
          {
            seriesName: "pl",
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: "#00e396"
            },
            labels: {
              formatter: (value) => { 
                return value; 
              },
            }
          }
        ],
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val
                }
              }
            },
            {
              formatter: (value) => { return `${formatNumber(value)}` },
              title: {
                formatter: function (val) {
                  return val
                }
              }
            }
          ]
        },
        grid: {
          borderColor: '#f1f1f1',
        }
      }
    }
  }
}
</script>