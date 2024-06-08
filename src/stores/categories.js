import { defineStore } from "pinia"
import { pick, findIndex, cloneDeep } from "lodash"

import { useApipost, useApiget } from "@/composable/fetch.js"

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL

export const useCategoryStore = defineStore("category", {
  state: () => {
    return {
      categories: { data: [] },
      loadingCategories: false,
      visibleModalCategory: false,
      editCategory: {},
      commands: [],
      visibleModalDeleteCategory: false,
      deleteCategoryIds: [],
      selectedRowKeys: [],
      loadingCategoryProducts: false,
    }
  },
  actions: {
    setSearchTerm(value) {
      this.categories.term = value
    },
    setStateField(key, value) {
      this[key] = value
    },
    setEditCategoryField(key, value) {
      this.editCategory[key] = value
    },
    setFieldInListCategory(id, data) {
      this.categories.data = this.setFieldInList(id, this.categories.data, data)
    },
    setFieldInList(id, list, data) {
      return list.map((el, index) => {
        if (el.id == id) {
          return { ...el, ...data }
        }
        let children = this.setFieldInList(id, el.children || [], data)
        return { ...el, children: children }
      })
    },
    getCategories(payload, cb) {
      this.loadingCategories = true
      let params = pick(this.categories, ["term", "page", "limit"])
      params = { ...params, ...payload }

      let url = `${VITE_BACKEND_API_URL}/api/admin/categories/all`
      return useApiget(url, params)
        .then(res => {
          if (res.status == 200) {
            this.categories = { ...params, ...res.data.categories }
          }
          return res
        })
        .finally(() => {
          this.loadingCategories = false
        })
    },
    buildExecuteCommands(name, data) {
      const findIndexExisted = () => {
        if (name == "move_product_before") {
          return -1
        }
        return findIndex(this.commands, el => el.name == name)
      }

      let indexExisted = findIndexExisted()

      if (indexExisted > -1) {
        this.commands[indexExisted].data = { ...this.commands[indexExisted].data, ...data }
      } else {
        this.commands = this.commands.concat({ name: name, data: data })
      }
    },
    executeCommands(callback, isDeleted = false) {
      let url = `${VITE_BACKEND_API_URL}/api/admin/categories/update`
      if (this.editCategory.is_new) {
        url = `${VITE_BACKEND_API_URL}/api/admin/categories/create`
      }
      if (isDeleted) {
        url = `${VITE_BACKEND_API_URL}/api/admin/categories/delete`
      }
      return useApipost(url, null, { commands: this.commands })
        .then(res => {
          if (res.status == 200) {
            this.commands = []
            if (callback) callback()
          }
          return res
        })
    },
    buildTree(treeData) {
      let url = `${VITE_BACKEND_API_URL}/api/admin/categories/build_tree`
      return useApipost(url, null, { tree_data: treeData })
    },
    flattenTree(tree, parentId = null, depth = 0) {
      const flattenedArray = []

      tree.forEach((node, index) => {
        const { id, children } = node

        flattenedArray.push({
          id,
          parent_id: parentId,
          name: node.name, 
          depth: depth,
          left: node.left,
          right: node.right
        })

        if (children && children.length > 0) {
          const childrenArray = this.flattenTree(children, id, depth + 1)
          flattenedArray.push(...childrenArray)
        }
      })

      return flattenedArray
    },
    convertNestedSetModel(tree) {
      let index = 1
      function traverse(node) {
          node.left = index++
          if (node.children && node.children.length > 0) {
              node.children.forEach(child => traverse(child))
          }
          node.right = index++
      }
  
      tree.forEach(node => traverse(node))
    },
    buildNestedSetModel(tree) {
      let cloneTree = [{id: "ALL", children: cloneDeep(tree)}]
      this.convertNestedSetModel(cloneTree)
      return cloneTree[0].children
    }
  }
})
