<script>
import { useUIStore } from '@/stores/design/editor.js'
import { getStyle } from '@/composable/common.js'
import InputNumber from '@/components/design/components/InputNumber.vue'

export default {
  setup() {
    const ui = useUIStore()

    return { ui }
  },
  components: {
    InputNumber
  },
  data: () => ({
    fonts: ['Arial', 'Roboto', 'Open Sans', 'Rubik', 'Montserrat', 'Poppins', 'BoosterNextFY-Thin', 'FS-AmeliaScript-FineVersion', 'FS-Just-Awesome-Regular', 
      'FS-Just-Awesome-Script', 'Geogrotesque-Light', "QX Banda regular", 'Saigonese', 'SignericaVi', 'SVN-Astronout', 'SVN-Sharpen', 
      'SVN-Teaters', "VL HandsomeScript-Regular", "VL Lovepen-Regular", "VL Selfie Regular"
    ]
  }),
  computed: {
    element() {
      return this.ui.selectedElement
    },
    fontFamily() {
      const font = getStyle(this.element, 'fontFamily', "'Roboto', sans-serif")
      if (typeof font != 'string') return ''

      const match = font.match(/(?!<=font-family:\s*')[\w\-\.\s]+(?=',\s*sans-serif)/)
      return match ? match[0] : ''
    },
    fontWeight() {
      return getStyle(this.element, 'fontWeight', '')
    },
    fontStyle() {
      return getStyle(this.element, 'fontStyle', '')
    },    
    textDecoration() {
      return getStyle(this.element, 'textDecoration', '')
    },
    textTransform() {
      return getStyle(this.element, 'textTransform', '')
    },
    lineHeight() {
      return getStyle(this.element, 'lineHeight', 1.5)
    },
    letterSpacing() {
      return parseInt(getStyle(this.element, 'letterSpacing', '0px'))
    },
    color() {
      return getStyle(this.element, 'color', '#000000')
    },
  },
  methods: {
    loadFonts() {
      Font.loadAll()
    },
    handleChangeFont(value) {
      this.ui.changeStyle(this.element, {fontFamily: `'${value}', sans-serif`})
    },
    filterOption(input, option) {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    changeStyle(key, value) {
      this.ui.changeStyle(this.element, {[key]: value })
    },
    changeFontWeight() {
      const value = this.fontWeight == '700' ? '400' : '700'
      this.changeStyle('fontWeight', value)
    },
    handleChange(key, value) {
      const currentValue = getStyle(this.element, key, '')

      switch (key) {
        case 'textTransform':
        case 'fontStyle':
        case 'textDecoration':
          value = currentValue === value ? 'initial' : value
          break
        default:
          value = currentValue === value ? '' : value
          break
      }

      this.ui.changeStyle(this.element, { [key]: value })
    },
    changeInput(value, key) {
      this.ui.changeStyle(this.element, { [key]: value })
    },
    changeColor(e) {
      this.ui.changeStyle(this.element, { color: e.target.value })
    }
  }
}
</script>

<template>
  <div class="text-panel">
    <a-select
      show-search
      class="select-font"
      style="width: 120px;"
      :value="fontFamily"
      :filter-option="filterOption"
      :style="{'font-family': fontFamily }"
      @keydown.stop
      @change="handleChangeFont"
    >
      <template #suffixIcon>
        <svg width="6" style="transform: rotate(-270deg);" fill="#9fa4a5" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 346.02 512.76">
          <path fill-rule="nonzero" d="M338.31 241.09 30.62 3.95c-8.29-6.39-20.2-4.87-26.6 3.42A18.905 18.905 0 0 0 .06 18.96H0v474.77c0 10.51 8.52 19.03 19.03 19.03 4.91 0 9.39-1.87 12.77-4.93l306.85-236.46c8.29-6.4 9.81-18.32 3.41-26.6-1.1-1.43-2.36-2.66-3.75-3.68z"></path>
        </svg>
      </template>
      <a-select-option
        v-for="item in fonts"
        :value="item"
        :key="item"
        :style="{'font-family': `'${item}', sans-serif` }"
      >{{ item }}</a-select-option>
    </a-select>

    <InputNumber
      class="panel--input"
      :value="letterSpacing"
      :min="0"
      :max="100"
      :decimal="false"
      :style="{ width: '80px' }"
      :listValue="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
      :showDropdownValue="true"
      @onchange="changeInput(($event || 0) + 'px', 'letterSpacing')"
    >
      <template #addonAfter>
        <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-letter-spacing"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12v-5.5a2.5 2.5 0 0 1 5 0v5.5m0 -4h-5" /><path d="M13 4l3 8l3 -8" /><path d="M5 18h14" /><path d="M17 20l2 -2l-2 -2" /><path d="M7 16l-2 2l2 2" /></svg>
      </template>
    </InputNumber>

    <a-tooltip title="Màu chữ">
      <div class="panel--item">
        <input @keydown.stop type="color" id="colorpicker" :value="color" @input="changeColor">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 18.5H24V22.5H0V18.5Z" :fill="color"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 15.5L11 1.5H13L18.49 15.5H16.24L15.12 12.5H8.87L7.75 15.5H5.5ZM12 4.17001L9.62 10.5H14.38L12 4.17001Z" fill="currentColor"></path>
        </svg>
      </div>
    </a-tooltip>
    <a-tooltip title="Độ đậm">
      <div class="panel--item" :class="{active: fontWeight == '700'}" @click.stop="changeFontWeight">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.825 5c1.975 0 3.506 1.837 3.506 4.007 0 .858-.24 1.663-.65 2.324C16.046 11.948 17 13.368 17 15c0 2.191-1.718 4-3.85 4H7V5h4.825Zm1.325 8-1.062.002a3.152 3.152 0 0 1-.263.011L9 13.012V17h4.15c1.004 0 1.85-.891 1.85-2s-.846-2-1.85-2Zm-1.325-6H9l-.001 4 2.98.002c.72-.105 1.352-.933 1.352-1.995C13.331 7.87 12.606 7 11.825 7Z"></path></svg>
      </div>
    </a-tooltip>
    <a-tooltip title="Nghiêng">
      <div class="panel--item" :class="{active: fontStyle == 'italic'}" @click.stop="handleChange('fontStyle', 'italic')">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4903 5.45801H17.4903L16.7788 7.32716H14.7788L11.2212 16.6729H13.2212L12.5097 18.5421H6.5097L7.22122 16.6729H9.22122L12.7788 7.32716H10.7788L11.4903 5.45801Z" fill="currentColor" /></svg>
      </div>
    </a-tooltip>
    <a-tooltip title="Gạch chân">
      <div class="panel--item" :class="{active: textDecoration == 'underline'}" @click.stop="handleChange('textDecoration', 'underline')">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 10V4H8V10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10V4H18V10C18 13.3137 15.3137 16 12 16C8.68629 16 6 13.3137 6 10Z" fill="currentColor" /><path d="M7 18C6.44772 18 6 18.4477 6 19C6 19.5523 6.44771 20 7 20H17C17.5523 20 18 19.5523 18 19C18 18.4477 17.5523 18 17 18H7Z" fill="currentColor" /></svg>
      </div>
    </a-tooltip>
    <a-tooltip title="Gạch ngang">
      <div class="panel--item" :class="{active: textDecoration == 'line-through'}" @click.stop="handleChange('textDecoration', 'line-through')">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 7H17V5H7V7H11V10H13V7Z" fill="currentColor" /><path d="M11 19V14H13V19H11Z" fill="currentColor" /><path d="M5 13H19V11H5V13Z" fill="currentColor" /></svg>
      </div>
    </a-tooltip>
    <a-tooltip title="In hoa">
      <div class="panel--item" :class="{active: textTransform == 'uppercase'}" @click.stop="handleChange('textTransform', 'uppercase')">
        <svg  xmlns="http://www.w3.org/2000/svg"  width="22"  height="22"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-letter-case-upper"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 19v-10.5a3.5 3.5 0 0 1 7 0v10.5" /><path d="M3 13h7" /><path d="M14 19v-10.5a3.5 3.5 0 0 1 7 0v10.5" /><path d="M14 13h7" /></svg>
      </div>
    </a-tooltip>
  </div>
</template>