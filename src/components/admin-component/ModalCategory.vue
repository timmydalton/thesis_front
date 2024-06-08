<template>
  <a-modal centered class="custom-modal editor-modal relative overflow-hidden z-[100000]" :open="true"
    :closable="false" :maskClosable="false" @cancel="onClickCloseModal" @ok="onClickOk">
    <template #title>
      <div class="modal-order__title">
        <div class="font-semibold" v-if="categoryStore.editCategory.is_new">
          Tạo danh mục
        </div>

        <div class="flex items-center" v-else>
          Cập nhật danh mục
        </div>

        <div class="modal-order__title__action">
          <svg @click="onClickCloseModal"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24" fill="currentColor" class="ml-2 cursor-pointer"><g><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></g></svg>
        </div>
      </div>
    </template>

    <a-card size="small" title="Thông tin danh mục">
      <div class="mb-3">
        <label>Tên danh mục</label>
        <a-input class="mt-1" @blur="onBlurName" :value="name" @change="onChangeName" />
      </div>

      <div>
        <label>Ảnh danh mục</label>
        <div class="w-full">
          <img v-if="image" class="w-full h-full object-contain" :src="image"/>
          <div v-else>
            <a-upload-dragger
              v-model:file-list="fileList"
              name="file"
              accept="image/*"
              :customRequest="uploadFile"
              :showUploadList="false"
            >
            <template v-if="uploadStatus == 1">
              <p class="ant-upload-text">Kéo thả ảnh</p>
            </template>
            <template v-else-if="uploadStatus == 2">
              <p class="ant-upload-text">
                <a-spin />
              </p>
              <p class="ant-upload-hint">
                Ảnh đang tải lên...
              </p>
            </template>
            <template v-else>
              <p class="ant-upload-text">
                <a-spin />
              </p>
              <p class="ant-upload-hint">
                Vui lòng chờ!
              </p>
            </template>
            </a-upload-dragger>
          </div>
        </div>
      </div>
    </a-card>
  </a-modal>
</template>

<script>
import { useCategoryStore } from "@/stores/categories.js"
import { useApipost, useApiget } from "@/composable/fetch.js"
import axios from 'axios'

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL

export default {
  setup() {
    const categoryStore = useCategoryStore()

    return {
      categoryStore
    }
  },
  data() {
    return {
      name: this.categoryStore.editCategory.name,
      image: this.categoryStore.editCategory.image,
      fileList: [],
      uploadStatus: 1,
    }
  },
  methods: {
    onClickCloseModal() {
      this.categoryStore.setStateField("visibleModalCategory", false)
      this.categoryStore.setStateField("commands", [])
    },
    onClickOk() {
      const callback = () => {
        this.$message.success("Cập nhật danh mục thành công!")
        this.categoryStore.setStateField("visibleModalCategory", false)
        this.categoryStore.getCategories({ limit: 1000 })
          .then(res => {
            if (res.status == 200) {
              let dataTree = this.categoryStore.flattenTree(this.categoryStore.buildNestedSetModel(res.data.categories.data.filter(el => !el.is_default))).map((el, index) => ({...el, position: index}))
              this.categoryStore.buildTree(dataTree)
            }
          })
      }

      this.categoryStore.executeCommands(callback)
        .catch(error => {
          let messageCode = error?.response?.data?.reason?.message_code
          console.log(error)
          this.$message.error("Thao tác thất bại!!!")
        })
    },
    onBlurName(e) {
      let data = { name: e.target.value, id: this.categoryStore.editCategory.id }
      if (this.categoryStore.editCategory.is_new) {
        this.categoryStore.buildExecuteCommands("create_category", data)
      } else {
        this.categoryStore.buildExecuteCommands("name_category", data)
      }
    },
    onChangeName(e) {
      this.name = e.target.value
    },
    uploadFile(data) {
      const file = data.file
      if (!file) return

      //Check size
      if (file.size / 1024 / 1024 > 10) {
        Modal.error({
          title: 'Lỗi tải lên file',
          content: 'File tải lên vượt quá 10Mb'
        })

        return
      }

      this.reader(file, (err, res) => {
        this.uploadImage(res)
      });
    },
    async uploadImage(base64) {
      this.uploadStatus = 2

      const res = await axios.post(`${VITE_BACKEND_API_URL}/api/admin/content/b64`, { base64: base64 }, {})
        .finally(() => {
          this.uploadStatus = 1
        })
      const link = res.data.data

      this.image = link
      this.categoryStore.buildExecuteCommands("image_category", { id: this.categoryStore.editCategory.id, image: link })
    },
    reader(file, callback) {
      const fr = new FileReader();
      fr.onload = () => callback(null, fr.result);
      fr.onerror = (err) => callback(err);
      fr.readAsDataURL(file);
    },
  }
}
</script>