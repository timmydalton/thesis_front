<template>
  <div>
    <div class="flex-col pb-3 flex-wrap border-b-theme-border border-b border-solid border-t-0 border-r-0 border-l-0">
      <div class="flex justify-between">
        <div class="products_top-action--plus" @click="onClickCreate">
          <PlusIcon :size="16"/>
        </div>
      </div>
    </div>

    <CategoryTree/>

    <ModalCategory v-if="categoryStore.visibleModalCategory" />
    <ModalDeleteCategory v-if="categoryStore.visibleModalDeleteCategory"/>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid"

import PlusIcon from '@/assets/svg/plus-sm.svg?component'

import ModalDeleteCategory from '@/components/admin-component/ModalDeleteCategory.vue'
import ModalCategory from '@/components/admin-component/ModalCategory.vue'
import CategoryTree from '@/components/admin-component/CategoryTree.vue'

import { useCategoryStore } from "@/stores/categories.js"

export default {
  setup() {
    const categoryStore = useCategoryStore()

    return {
      categoryStore
    }
  },
  components: {
    PlusIcon,
    ModalDeleteCategory,
    ModalCategory,
    CategoryTree
  },
  mounted() {
    this.categoryStore.getCategories({ limit: 1000 })
      .catch(error => {
        let messageCode = error?.response?.data?.reason?.message_code
          console.log(messageCode)
          this.$message.error("Có gì đó sai sai!!!")
      })
  },
  methods: {
    onClickCreate() {
      let uuid = uuidv4()
      this.categoryStore.setStateField("editCategory", { id: uuid, is_new: true })
      this.categoryStore.buildExecuteCommands("create_category", { name: null, id: uuid })

      this.categoryStore.setStateField("visibleModalCategory", true)
    },
  }
}
</script>