<script>
import { useUIStore } from '@/stores/design/editor.js'
export default {
  setup() {
    const ui = useUIStore()
    return { ui }
  },
  computed: {
    element() {
      return this.ui.selectedElement
    }
  },
  methods: {
    remove() {
      this.ui.removeElementById(this.element.id)
      this.ui.setSelected([])
    },
    duplicate() {
      this.ui.cloneSelectedElements()
    }
  }
}
</script>

<template>
  <div class="util-panel">
    <a-tooltip title="Nhân đôi">
      <div class="panel--item" @click.stop="duplicate">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256">
          <path d="M184,64H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H184a8,8,0,0,0,8-8V72A8,8,0,0,0,184,64Zm-8,144H48V80H176ZM224,40V184a8,8,0,0,1-16,0V48H72a8,8,0,0,1,0-16H216A8,8,0,0,1,224,40Z"></path>
        </svg>
      </div>
    </a-tooltip>
    <a-tooltip title="Xóa">
      <div class="panel--item" @click.stop="remove">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256">
          <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
        </svg>
      </div>
    </a-tooltip>
  </div>
</template>