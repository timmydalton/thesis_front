<script>
import { useCategoryStore } from "@/stores/categories.js"

export default {
  setup() {
    const categoryStore = useCategoryStore()
    return { categoryStore }
  },
  methods: {
    handleCancel() {
      this.categoryStore.setStateField("deleteCategories", [])
      this.categoryStore.setStateField("visibleModalDeleteCategory", false)
    },
    handleOk() {
      let data = { ids: this.categoryStore.deleteCategories }
      this.categoryStore.buildExecuteCommands("bulk_delete_category", data)

      const callback = () => {
        this.$message.success("Xóa thành công")
        this.categoryStore.setStateField("visibleModalDeleteCategory", false)
        this.categoryStore.setStateField("selectedRowKeys", [])
        this.categoryStore.getCategories({ limit: 1000 })
          .then(res => {
            if (res.status == 200) {
              let dataTree = this.categoryStore.flattenTree(this.categoryStore.buildNestedSetModel(res.data.categories.data.filter(el => !el.is_default))).map((el, index) => ({...el, position: index}))
              this.categoryStore.buildTree(dataTree)
            }
          })
      }

      this.categoryStore.executeCommands(callback, true)
        .catch(error => {
          let messageCode = error?.response?.data?.reason?.message_code
          console.log(messageCode)
          this.$message.error("Xóa thất bại!!!")
        })
    }
  }
}
</script>

<template>
  <a-modal centered class="custom-modal !w-[600px] !h-[300px] rounded overflow-hidden" :open="true"
    @cancel="handleCancel">
    <div class="flex mt-8">
      <div>
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M53.57 33.18c4.873 3.63 5.88 10.52 2.25 15.391-3.628 4.871-10.52 5.878-15.391 2.25-4.871-3.63-5.88-10.52-2.25-15.393 3.629-4.87 10.52-5.878 15.392-2.249zm45.769-7.62l7.907 9.157c1.596 1.867 1.508 4.701-.197 6.296-1.704 1.596-4.404 1.374-6-.493l-7.907-9.159c-1.596-1.867-1.508-4.7.197-6.295 1.704-1.596 4.404-1.374 6 .493zM60.5 17a3.5 3.5 0 01.192 6.995L60.5 24a3.5 3.5 0 110-7z"
            fill="#D72E15"></path>
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M92.118 43l-13.235 64h-39l-8.765-64h61zM48.709 4.736l7.364 1.741-40.048 35.588-.956-7.435L48.71 4.736z"
            fill="#FFB6AC"></path>
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M78.717 52.906l.982.188-9.176 48-.982-.188 9.176-48zm-34.892.033l5.824 48-.993.121-5.824-48 .993-.12zm15.944.043l.999.035-1.676 48-1-.035 1.677-48zM58.558 3.507l.666.746L13.54 45.036l-.666-.746L58.558 3.507zm-9.7 30.99a3.608 3.608 0 002.482 2.902 3.62 3.62 0 001.81.102l.197.98a4.644 4.644 0 01-2.311-.13 4.606 4.606 0 01-3.166-3.701l.988-.153zm33.785-15.659c3.612 5.242 2.23 12.466-3.087 16.136-5.316 3.67-12.555 2.395-16.167-2.846l19.253-13.29zm3.451-12.242c1.387.542 2.391 1.3 2.984 2.251.074.12.14.24.199.365 2.626-.53 5.582-.063 7.952 1.383 2.807 1.711 4.925 4.708 5.963 8.437l-.963.268c-.97-3.484-2.931-6.272-5.521-7.852-2.131-1.3-4.778-1.733-7.131-1.28.143.863-.036 1.75-.537 2.44-.551.763-1.453 1.22-2.304 1.164a1.929 1.929 0 01-1.399-.747 1.467 1.467 0 01-.286-1.206c.155-.724.798-1.188 1.269-1.474a8.874 8.874 0 011.962-.879l-.053-.09c-.47-.754-1.334-1.393-2.499-1.848-2.356-.92-5.341-.93-8.405-.026-2.855.841-5.48 2.338-7.892 3.83l-.526-.85c2.471-1.529 5.167-3.065 8.135-3.94 3.276-.965 6.491-.946 9.052.054zm2.51 3.814a7.995 7.995 0 00-1.765.79c-.49.297-.755.568-.811.83a.49.49 0 00.107.393c.151.2.406.334.667.351.497.032 1.079-.269 1.428-.752.328-.453.453-1.033.374-1.612z"
            fill="#182D55"></path>
        </svg>
      </div>

      <div class="ml-6">
        <div class="font-semibold text-lg">
          Xóa danh mục
        </div>

        <div class="mt-3 text-base">
          Sau khi xóa, bạn sẽ không thể khôi phục các danh mục này
        </div>
      </div>
    </div>

    <template #footer>
      <a-button key="back" @click="handleCancel">Hủy</a-button>
      <a-button key="submit" type="danger" @click="handleOk">Xóa</a-button>
    </template>
  </a-modal>
</template>