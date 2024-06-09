<template>
  <a-modal wrapClassName="editor-modal hide-header" title="Thư viện hình ảnh" v-model:open="visible" :footer="null">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="Tải ảnh lên">
        <a-upload-dragger
          v-model:file-list="fileList"
          name="file"
          :multiple="true"
          accept="image/*"
          :customRequest="uploadFile"
          :showUploadList="false"
        >
          <template v-if="uploadStatus == 1">
            <p class="ant-upload-text">Click hoặc kéo thả ảnh để tải lên</p>
            <p class="ant-upload-hint">
              Hỗ trợ định dạng tệp hình ảnh
            </p>
          </template>
          <template v-else-if="uploadStatus == 2">
            <p class="ant-upload-text">
              <a-spin />
            </p>
            <p class="ant-upload-hint">
              Ảnh đang được tải lên...
            </p>
          </template>
          <template v-else>
            <p class="ant-upload-text">
              <a-spin />
            </p>
            <p class="ant-upload-hint">
              Đã tải lên, vui lòng chờ!
            </p>
          </template>
        </a-upload-dragger>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Ảnh đã tải">
        <div class="image-picker-wrapper" v-if="lib.imgSrc.length">
          <div class="image-picker-item" v-for="(item, idx) in lib.imgSrc" :key="item.src" @click="useImg(item.src, $event)">
            <img :src="item.src">
          </div>
        </div>
        <div class="image-picker--empty" v-else>
          <div class="content-container">
            <div class="content-img">
              <img src="https://content.pancake.vn/web-media/65/f8/d9/f6/c73c0239222e6fa967d17a8f9df879c6c2129b0aaf13d51bcf922026.svg" alt="" class="background-image">
            </div>

            <h3 class="content-title">
              Không có hình ảnh nào
            </h3>

            <div class="content-descript">
              Bạn chưa tải lên hình ảnh nào
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script>
import { useUIStore } from '@/stores/design/editor.js'
import { useLibraryStore } from '@/stores/design/library.js'
import { createImage } from '@/common/factory.js'
import { Modal } from 'ant-design-vue'
import { get } from 'lodash'

import Spinner from './DesignSpinner.vue'
import axios from 'axios'

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL

export default {
  setup() {
    const ui = useUIStore()
    const lib = useLibraryStore()

    return { ui, lib }
  },
  components: {
    Spinner
  },
  data() {
    return {
      activeKey: '1',
      fileList: [],
      uploadStatus: 1,
      loading: false
    }
  },
  computed: {
    visible: {
      get() {
        return this.lib.imageModal?.visible || false
      },
      set(value) {
        this.lib.toggleImageModal({ visible: value })
      }
    },
  },
  methods: {
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

      this.lib.addImgSrc(link)

      this.useImg(link)
    },
    reader(file, callback) {
      const fr = new FileReader();
      fr.onload = () => callback(null, fr.result);
      fr.onerror = (err) => callback(err);
      fr.readAsDataURL(file);
    },
    async useImg(src, e) {
      if (this.uploadStatus != 1) return

      let ratio

      try {
        const load = e.target.querySelector('img')
        ratio = load.naturalHeight / load.naturalWidth
      } catch (error) {
        this.uploadStatus = 3
        const load = await this.getMeta(src)
          .finally(() => {
            this.uploadStatus = 1
          })

        ratio = load.naturalHeight / load.naturalWidth
      }

      const {width: areaW, height: areaH } = document.getElementById('design-area').getBoundingClientRect()
      const scaleEditor = areaH / areaW

      const elementWidth = 30

      const img = createImage({
        src,
        style: {
          width: elementWidth,
          height: elementWidth * ratio / scaleEditor,
          top: 50 - (elementWidth * ratio / scaleEditor) / 2,
          left: 50 - elementWidth/2
        }
      })

      this.ui.addElement(img, { history: true })
      this.ui.setSelected([img.id])
      this.visible = false
    },
    getMeta(url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
        img.src = url;
      });
    }
  }
}
</script>

<style lang="sass">
.content-container
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  padding: 1rem
  .content-title
    margin-bottom: .25rem
.image-loading
  position: relative
  height: 120px
</style>