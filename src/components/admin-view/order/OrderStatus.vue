<script>
import { find } from "lodash"
import { getOrderStatus } from "@/composable/common"

export default {
  setup() {

    return { getOrderStatus }
  },
  props: {
    item: {
      type: Object,
      default: {}
    },
    width: {
      type: [Number, String],
      default: '160px'
    }
  },
  methods: {
    getOrderStatus(order) {
      return find(getOrderStatus(), el => el.id == order.status)
    }
  }
}
</script>

<template>
  <div v-if="item.status == 0" class="text-theme-layout rounded py-[2px] px-[7px] text-center whitespace-nowrap"
    :style="{
      'background': getOrderStatus(item)?.bgColor,
      'color': '#fff',
      'width' : width
      }"
      
    >
      <span>{{getOrderStatus(item)?.text}}</span>
  </div>
  <div v-else class="text-theme-layout rounded py-[2px] px-[7px] text-center whitespace-nowrap"
    :style="{
      'background': getOrderStatus(item)?.bgColor,
      'color': '#fff',
      'width' : width
    }"
    >
      {{getOrderStatus(item)?.text}}
  </div>

</template>
