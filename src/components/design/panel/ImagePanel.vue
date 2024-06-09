<template>
  <div class="text-panel">
    <InputNumber
      :value="brightness"
      :min="50"
      :max="150"
      :decimal="false"
      :style="{ width: '80px' }"
      :listValue="[50, 60, 72, 86, 100, 112, 124, 148, 150]"
      :showDropdownValue="true"
      @onchange="brightness = $event"
      class="panel--input"
    >
      <template #addonAfter>
        <a-tooltip title="Độ sáng">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><line x1="128" y1="40" x2="128" y2="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><circle cx="128" cy="128" r="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="64" y1="64" x2="48" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="64" y1="192" x2="48" y2="208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="192" y1="64" x2="208" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="192" y1="192" x2="208" y2="208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="40" y1="128" x2="16" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="128" y1="216" x2="128" y2="240" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="216" y1="128" x2="240" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
        </a-tooltip>
      </template>
    </InputNumber>

    <InputNumber
      :value="saturate"
      :min="0"
      :max="200"
      :decimal="false"
      :style="{ width: '80px' }"
      :listValue="[0, 12, 24, 48, 64, 86, 112, 128, 144, 168, 180, 200]"
      :showDropdownValue="true"
      @onchange="saturate = $event"
      class="panel--input"
    >
      <template #addonAfter>
        <a-tooltip title="Tương phản">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><path d="M208,144c0-72-80-128-80-128S48,72,48,144a80,80,0,0,0,160,0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="128" y1="224" x2="128" y2="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="128" y1="128" x2="206.7" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="128" y1="96" x2="196.63" y2="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="128" y1="160" x2="206.4" y2="160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="128" y1="192" x2="192" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="128" y1="64" x2="176.98" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
        </a-tooltip>
      </template>
    </InputNumber>

    <a-tooltip title="Lật ngang">
      <div class="panel--item" :class="{active: flipX}" @click.stop="changeSpecial('flipX', !flipX)">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M107.18,24.33a15.86,15.86,0,0,0-17.92,9.45l-.06.14-64,159.93A16,16,0,0,0,40,216h64a16,16,0,0,0,16-16V40A15.85,15.85,0,0,0,107.18,24.33ZM104,200H40l.06-.15L104,40Zm126.77-6.15-64-159.93-.06-.14A16,16,0,0,0,136,40V200a16,16,0,0,0,16,16h64a16,16,0,0,0,14.78-22.15ZM152,200V40l63.93,159.84.06.15Z"></path></svg>
      </div>
    </a-tooltip>

    <a-tooltip title="Lật dọc">
      <div class="panel--item" :class="{active: flipY}" @click.stop="changeSpecial('flipY', !flipY)">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M56,120H216a16,16,0,0,0,6.23-30.74l-.14-.06-159.93-64A16,16,0,0,0,40,40v64A16,16,0,0,0,56,120Zm0-80,.15.06L216,104H56l0-64Zm160,96H56a16,16,0,0,0-16,16v64a16,16,0,0,0,22.15,14.78l159.93-64,.14-.06A16,16,0,0,0,216,136ZM56.15,215.93,56,216V152H216Z"></path></svg>
      </div>
    </a-tooltip>
  </div>
</template>

<script>
import { useUIStore } from '@/stores/design/editor.js'
import { getStyle } from '@/composable/common.js'
import InputNumber from '@/components/design/components/InputNumber.vue'

import { get } from 'lodash'

export default {
  setup() {
    const ui = useUIStore()

    return { ui }
  },
  components: {
    InputNumber
  },
  data() {
    return {
      property: [
        { name: 'contrast', max: 200, deft: 100, unit: '%' },
        { name: 'brightness', max: 200, deft: 100, unit: '%' },
        { name: 'saturate', max: 200, deft: 100, unit: '%' },
        { name: 'sepia', max: 100, deft: 0, unit: '%' },
        { name: 'grayscale', max: 100, deft: 0, unit: '%' },
        { name: 'invert', max: 100, deft: 0, unit: '%' },
        { name: 'hue-rotate', max: 360, scale: 1, deft: 0, unit: 'deg' },
        { name: 'blur', max: 10, deft: 0, unit: 'px' },
      ],
      value2: 100
    }
  },
  computed: {
    element() {
      return this.ui.selectedElement
    },
    flipX() {
      return get(this.element, ['specials', 'flipX'], false)
    },
    flipY() {
      return get(this.element, ['specials', 'flipY'], false)
    },
    filter() {
      return getStyle(this.element, 'filter', '')
    },
    brightness: {
      get() {
        return parseInt(this.getProperty('brightness') * 100)
      },
      set(value) {
        this.setProperty('brightness', value / 100)
      }
    },
    saturate: {
      get() {
        return parseInt(this.getProperty('saturate') * 100)
      },
      set(value) {
        this.setProperty('saturate', value / 100)
      }
    }
  },
  methods: {
    changeSpecial(key, value) {
      this.ui.changeSpecial(this.element, {[key]: value})
    },
    changeStyle(key, value) {
      this.ui.changeStyle(this.element, {[key]: value})
    },
    getProperty(name) {
      let ret = this.filter.split(' ').find(el => el.includes(name))
      if (ret) return parseFloat(ret.replace(`${name}(`, '').replace(')', ''))
      return ['contrast', 'brightness', 'saturate'].includes(name) ? 1 : 0
    },
    setProperty(name, value) {
      let newFilter = []
      this.property.forEach(item => {
        let title = item.name
        if (title == name) newFilter.push(this.processValue(name, value))
        else if (this.getProperty(title)) newFilter.push(this.processValue(title, this.getProperty(title)))
      })
      this.changeStyle('filter', newFilter.join(' '))
    },
    processValue(name, value) {
      if (name == 'hue-rotate') return `hue-rotate(${value}deg)`
      else if (name == 'blur') return `blur(${value}px)`
      else return `${name}(${value})`
    },
  }
}
</script>