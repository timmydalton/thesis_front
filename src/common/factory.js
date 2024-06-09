import { useUIStore } from '@/stores/design/editor.js'

const SKELETON = {
  id: '',
  type: '',
  style: {},
  config: {},
  specials: {}
}

export const createText = (opts = {}) => {
  const ui = useUIStore()
  const text = Object.assign({}, SKELETON)

  text.id = 'TEXT-' + ui.increaseCount('text')
  text.type = 'text'
  text.style = {
    fontSize: 10,
    ...opts.style
  }
  text.config = opts.config || {}
  text.specials = { text: 'Text' }

  return text
}

export const createImage = (opts = {}) => {
  const ui = useUIStore()
  const img = Object.assign({}, SKELETON)

  img.id = 'IMAGE-' + ui.increaseCount('image')
  img.type = 'image'
  img.style = opts.style || {}
  img.config = opts.config || {}
  img.specials = {
    src: opts.src || 'https://64.media.tumblr.com/0a049264fba0072a818f733a6c533578/tumblr_mqvlz4t5FK1qcnibxo1_540.pnj'
  }

  return img
}