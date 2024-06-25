<template>
  <div class="flex justify-between text-sm last:mb-0">
    <div class="w-28 h-28 relative">
      <img class="w-full h-full object-cover overflow-hidden rounded " :src="image" />
    </div>

    <div class="flex-1 ml-4 flex justify-center flex-col rounded py-2" :style="{ 'color': 'var(--text-normal)' }">
      <div class="flex items-center">
        <div class="font-medium text-sm">
          {{ item?.variation_info?.name }}
        </div>
        <div class="ml-4 background text-primary font-medium px-3 py-1 text-sm rounded-[4px]">
          {{ item?.variation_info?.custom_id || item?.variation_info?.display_id }}
        </div>
      </div>

      <div class="flex my-2 items-center">
        <div class="mr-[12px]" v-for="(el, index) in item.variation_info?.fields" :key="index">
          <span class="text-theme-text-color-1 capitalize">{{ el.name }}:</span>
          <span class="ml-1 capitalize">{{ getVariationValue(item.variation_info, el.name) }}</span>
        </div>
        <div>
          {{ formatNumber(retailPrice) }}₫
        </div>
        <div class="ml-3 text-theme-text-color-1">
          (
          {{ formatNumber(originalPrice) }}₫
          )
        </div>
      </div>

      <div class="flex justify-start items-center">
        <div class="inline-flex mr-4">
          <span class="text-theme-text-color-1 mr-1">Quantity:</span>
          {{ `${item.quantity}` }}
        </div>

        <div class="text-primary font-medium ml-2">
          <span class="text-theme-text-color-1">Total:</span>
          {{ formatNumber(retailPrice * item.quantity) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { find } from 'lodash'
import { formatNumber } from "@/composable/common"

export default {
  setup() {
    return {
      formatNumber
    }
  },
  props: ["item", "index"],
  computed: {
    image() {
      if ((this?.item?.variation_info?.images || []).length) {
        return this.item.variation_info.images[0]
      }
      return "https://content.pancake.vn/1/1d/58/cb/7e/a43b3f11a05df59ef40150693cc2de037716558eb5dd65a758052eb0.jpg"
    },
    quantity() {
      return this.item?.quantity || 0
    },
    retailPrice() {
      return this.item?.variation_info?.retail_price || 0
    },
    originalPrice() {
      return this.item?.variation_info?.original_price
    },
  },
  methods: {
    getVariationValue(variation, title) {
      let fields = variation.fields
      return find(fields, el => el.name == title)?.value || ""
    },
  }
}
</script>