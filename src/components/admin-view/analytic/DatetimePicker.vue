<script lang="ts">
import dayjs, { Dayjs } from 'dayjs';
import { defineComponent, ref } from 'vue';
import { useOrderStore } from "@/stores/order.js";

export default defineComponent({
  setup() {
    const order = useOrderStore();
    
    const ranges = {
      Today: [dayjs(), dayjs()] as Dayjs[],
      'Yesterday': [dayjs().subtract(1, 'day').startOf('day'), dayjs().subtract(1, 'day')] as Dayjs[],
      'Last 7 days': [dayjs().add(-7, 'd'), dayjs()] as Dayjs[],
      'This Month': [dayjs().subtract(1, 'month').startOf('month').startOf('day'), dayjs().subtract(1, 'month').endOf('month')] as Dayjs[],
    };

    return {
      order,
      ranges
    };
  },
  data: () => ({
    value_datePick: [dayjs().subtract(6, 'day').startOf('day'), dayjs().endOf('day')],
    value_format:[dayjs().subtract(6, 'day').startOf('day').toISOString(), dayjs().endOf('day').toISOString()],
    
  }),
  mounted() {
    this.order.getOrders_insight(this.order.setOrder)
  },
  methods: {
    handleChangeDatePicher(dateString: string[]) {
      if (dateString && dateString.length === 2) {
        let startTime = dayjs(dateString[0]).startOf('day');
        let endTime = dayjs(dateString[1]).endOf('day');
        startTime = startTime.toISOString()
        endTime = endTime.toISOString()
        this.order.setOrder.startTime = startTime
        this.order.setOrder.endTime = endTime
      }
    },
    handleSumbitDatePicker() {
      this.order.getOrders_insight(this.order.setOrder)
    }
  }
});
</script>

<template>
  <a-space direction="vertical" :size="10">
    <a-range-picker v-model:value="value_datePick" :presets="ranges" @change="handleChangeDatePicher"/>
  </a-space>
  <a-button style="background-color:var(--primary-v2); color:#fff" class="ml-3" @click="handleSumbitDatePicker">Áp dụng</a-button>
</template>
