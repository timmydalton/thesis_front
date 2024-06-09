import { onMounted, onBeforeUnmount, nextTick } from 'vue'

import { useUIStore } from '@/stores/design/editor.js'


const keydown = (e, instance) => {
  const isModal = e.target.closest('.ant-modal');
  if(isModal) return
  e.stopPropagation()

  const ui = useUIStore()

  const isMac = !!(window.navigator?.userAgent && window.navigator.userAgent.includes('Macintosh'))
  const ctrlKey = isMac ? e.metaKey : e.ctrlKey

  switch(e.keyCode) {
    //Ctrl + D => Duplicate
    case 68: {
      e.preventDefault()
      const selected = ui.selected
      if(selected.length === 0) return

      if(ctrlKey) {
        ui.cloneSelectedElements()
      }
      break
    }

    //Ctrl + C => Copy to clipboard
    case 67: {
      const selected = ui.selected
      if(selected.length === 0 || !ctrlKey) return
      e.preventDefault()

      copyElements()
      break
    }

    //Ctrl + V => Paste from clipboard
    case 86:
      if(!ctrlKey) return
      e.preventDefault()

      pasteElements()
      break

    // => Delete element
    // Backspace key
    case 8:
    // Delete key
    case 46:
      const selected = ui.selected
      if(selected.length === 0) return
      e.preventDefault()
      
      ui.removeElementByIds(selected)
      break
  }
}

function copyElements() {
  const ui = useUIStore()
  const els = ui.selected.map(id => {
    const el = ui.elements?.[id]
    if (!el) return
    const copyBounding = document.getElementById(el.id).getBoundingClientRect()

    return {
      el,
      bounding: copyBounding
    }
  }).filter(el => el)

  const data = {
    elements: els
  }

  navigator.clipboard.writeText(JSON.stringify(data))
}

async function pasteElements() {
  const ui = useUIStore()

  const textCopy = await navigator.clipboard.readText()
  const data = JSON.parse(textCopy || '{}')
  const elements = data.elements
  const designArea = document.getElementById('design-area')

  if (!elements || !designArea) return

  const { top, left } = designArea.getBoundingClientRect()
  const copyIds = []

  elements.forEach(dt => {
    const { el, bounding } = dt
    el.id = el.type.toUpperCase() + '-' + ui.increaseCount(el.type)
    el.style.top = window.y - top - bounding.height/2
    el.style.left = window.x - left - bounding.width/2

    copyIds.push(el.id)
    ui.addElement(el)
  })

  ui.setSelected(copyIds)
}

function mousemove(e) {
  window.mouseTarget = e.target
  window.x = e.clientX
  window.y = e.clientY
}

export function useShortkey(instance) {
  onMounted(() => {
    window.addEventListener('keydown', e => keydown(e, instance))
    window.addEventListener('mousemove', mousemove)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', keydown)
    window.removeEventListener('mousemove', mousemove)
  })
}