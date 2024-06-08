<template>
  <div class="relative category-tree mt-3">
    <div class="w-full flex justify-between p-3 font-medium text-[13px] category-tree-header items-center">
      <div class="ml-14 font-medium h-fit">Tên danh mục</div>
      <div class="flex">
        <div class="w-[180px] text-center h-fit">Số sản phẩm hiện</div>
        <div class="w-[180px] text-center h-fit">Số sản phẩm ẩn</div>
        <div class="w-[100px]"></div>
      </div>
    </div>
    <div class="absolute top-0 left-0 bottom-0 right-0 z-50 category-tree-loading" v-if="categoryStore.loadingCategories">
      <Spinner :size="30" :borderWidth="2" />
    </div>

    <div :style="{'overflow-y': 'auto', 'height': 'calc(100vh - 220px)'}" v-if="treeData.length">
      <Tree :draggable="!loadingBuildTree" :value="treeData" @change="handleChange" @onDragFinish="onDragFinish" >
        <template #default="{ node, index, path, tree }">
          <div class="flex items-center justify-between w-full h-full p-3" :class="{ 'active': categoryStore.editCategory.id == node.id }">
            <div class="flex items-center">
              <div class="flex items-center justify-center cursor-pointer" @click="tree.toggleFold(node, path)">
                <div v-if="node.$folded" class="mr-[6px]">
                  <CaretRightOutlined />
                </div>
                <div v-else-if="(node?.children || []).length" class="mr-[6px]">
                  <CaretDownOutlined />
                </div>
              </div>
              <a-avatar class="rounded-[8px]" :src="node.image || 'https://content.pancake.vn/web-media/a4/01/ae/91/6778a835948bd57bf0f74e43d01f999e089d72bb0817360d3d6da512.svg'" :size="40" shape="square" />
              <div class="ml-4 flex items-center">
                {{ node.name }}
              </div>
            </div>

            <div class="flex items-center">
              <div class="w-[180px] text-center">{{ node.total_product_visible }}</div>
              <div class="w-[180px] text-center">{{ node.total_product_hidden }}</div>
              <div class="w-[100px] flex cursor-pointer">
                <a-popover placement="bottomRight" overlayClassName="category-action" trigger="['click']">
                  <template #content>
                    <div class="category-action__item" @click.stop="e => handleClickRow(e, node)">
                      <div class="ml-2">Chỉnh sửa</div>
                    </div>
                    <div class="category-action__item" @click.stop="e => handleClickCreateChild(e, node)">
                      <div class="ml-2">Tạo danh mục con</div>
                    </div>
                    <div class="category-action__item text-theme-danger hover:text-theme-danger"
                      @click.stop="onClickDeleteCategory(node)">
                      <div class="ml-2">Xóa danh mục</div>
                    </div>
                  </template>

                  <div
                    class="ml-2 grid place-items-center w-[34px] h-[34px] rounded-full border border-solid border-[#d6e6fe] text-primary hover:bg-primary hover:text-theme-layout"
                    @click="e => e.stopPropagation()">
                    <svg width="25" height="25" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="color: currentcolor;"><path d="M12.886 13.0625C13.4383 13.0625 13.886 12.6148 13.886 12.0625C13.886 11.5102 13.4383 11.0625 12.886 11.0625C12.3337 11.0625 11.886 11.5102 11.886 12.0625C11.886 12.6148 12.3337 13.0625 12.886 13.0625Z" fill="currentColor"></path><path d="M6.88599 13.0625C7.43827 13.0625 7.88599 12.6148 7.88599 12.0625C7.88599 11.5102 7.43827 11.0625 6.88599 11.0625C6.3337 11.0625 5.88599 11.5102 5.88599 12.0625C5.88599 12.6148 6.3337 13.0625 6.88599 13.0625Z" fill="currentColor"></path><path d="M18.886 13.0625C19.4383 13.0625 19.886 12.6148 19.886 12.0625C19.886 11.5102 19.4383 11.0625 18.886 11.0625C18.3337 11.0625 17.886 11.5102 17.886 12.0625C17.886 12.6148 18.3337 13.0625 18.886 13.0625Z" fill="currentColor"></path></svg>
                  </div>
                </a-popover>
              </div>
            </div>
          </div>
        </template>
      </Tree>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid"

import Spinner from '../element/Spinner.vue'
import { Tree, Draggable, Fold } from "he-tree-vue"
import { Empty } from "ant-design-vue"
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons-vue"
import { cloneDeep } from 'lodash'

import { useCategoryStore } from "@/stores/categories.js"

export default {
  setup() {
    const categoryStore = useCategoryStore()

    return {
      categoryStore
    }
  },
  components: {
    Spinner,
    Tree: Tree.mixPlugins([Draggable, Fold]),
    Empty,
    CaretDownOutlined,
    CaretRightOutlined
  },
  data() {
    return {
      loadingBuildTree: false,
      treeData: []
    }
  },
  watch: {
    "categoryStore.categories.data"() {
      this.treeData = cloneDeep(this.categoryStore.categories.data)
    }
  },
  computed: {
  },
  methods: {
    handleChange(a) {
      let dataTree = this.categoryStore.flattenTree(this.categoryStore.buildNestedSetModel(this.treeData)).map((el, index) => ({...el, position: index}))
      this.loadingBuildTree = true
      this.categoryStore.buildTree(dataTree)
        .then(res => {
          if (res.status == 200) {
            this.loadingBuildTree = false
            this.categoryStore.setStateField("categories", { ...this.categoryStore.categories, data: this.treeData })
          }
        })
        .catch(error => {
          let messageCode = error?.response?.data?.reason?.message_code
          this.$message.error("Có gì đó sai sai!!!")
          this.categoryStore.getCategories({ limit: 1000 })
        })
    },
    handleClickRow(e, record) {
      this.categoryStore.setStateField("commands", [])
      this.categoryStore.setStateField("editCategory", cloneDeep(record))
      this.categoryStore.setStateField("visibleModalCategory", true)
    },
    handleClickCreateChild(e, record) {
      let uuid = uuidv4()
      this.categoryStore.setStateField("addProducts", [])
      this.categoryStore.setStateField("editCategory", { id: uuid, is_new: true })
      this.categoryStore.buildExecuteCommands("create_category", { name: null, id: uuid, parent_id: record.id })

      this.categoryStore.setStateField("visibleModalCategory", true)
    },
    onClickDeleteCategory(record) {
      this.categoryStore.setStateField("deleteCategories", [record.id])
      this.categoryStore.setStateField("visibleModalDeleteCategory", true)
    },
    onDragFinish(targetNode, destinationNode,postion) {
      console.log(targetNode, destinationNode,postion)
      return false
    },
  }
}
</script>

<style>

</style>