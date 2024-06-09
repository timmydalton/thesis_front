const useText = {
	data() {
		return {
			oldTextSlected: null,
      pressShift: false,
      first: false
		}
	},
	mounted() {
		document.execCommand('styleWithCSS', false, true)
		this.$refs["ref_text"].addEventListener('paste', this.paste)
	},
	watch: {
		mx_editable(value) {
			if (!value) return
      this.first = false
			this.mx_selectElementContent(this.$refs.ref_text)
		},
		"txt.visible"(value) {
			const [container] = this.mx_getSelection()
			const html = container.innerText
			if (value && html.trim() == '') {
				this.mx_selectElementContent(this.$refs.ref_text)
			}
		}
	},
	computed: {
		mx_editable() {
			return this.ui.selected.includes(this.element.id) && this.element.id == this.txt.elementEditing
		}
	},
	methods: {
		mx_mousedown(e) {
      this.first = true

			if (!this.mx_editable) return

			e.stopPropagation()
			document.addEventListener('mouseup', this.mouseup)
			document.addEventListener('touchend', this.mouseup, { passive: false })
		},
		mouseup(e) {
			e.stopPropagation()
			const [container] = this.mx_getSelection()
      const html = container.innerText
			let visible = true

			if (this.oldTextSlected == html || !html.trim()) visible = false

			this.oldTextSlected = html
			this.txt.displayTextPanel(visible)

			document.removeEventListener('mouseup', this.mouseup)
			document.removeEventListener('touchend', this.mouseup, { passive: false })
      setTimeout(() => {
        this.first = false
      }, 100)
		},
		paste(e) {
			const paste = (e.clipboardData || window.clipboardData).getData('text')
			document.execCommand('insertText', false, paste || '')
			e.preventDefault()
		},
		mx_updateText() {
			if (this.element.id != this.txt.elementEditing || this.first) return

			const text = this.$refs.ref_text.innerText
			if (!/[^\s\n]/.test(text)) {
				this.ui.removeElementByIds(this.element.id)
				this.txt.displayTextPanel(false)
				this.txt.setElementEditing(null)
				return
			}

      const value = this.$refs.ref_text.innerHTML
			this.ui.changeSpecial(this.element, { text: value })
      this.txt.setElementEditing(null)
      this.txt.displayTextPanel(false)
		},
		mx_editText() {
			this.txt.displayTextPanel(true)
			this.txt.setElementEditing(this.element.id)
		},
		mx_selectElementContent(domCurrent) {
      this.$nextTick(() => {
        let range, selection
        if (document.body.createTextRange) {
          range = document.body.createTextRange()
          range.moveToElementText(domCurrent)
          range.select()
        } else if (window.getSelection) {
          selection = window.getSelection()
          range = document.createRange()
          range.selectNodeContents(domCurrent)
          selection.removeAllRanges()
          selection.addRange(range)
        }
      })
		},
		mx_getSelection() {
			let container = document.createElement("span")
			let parent
			if (typeof window.getSelection != "undefined") {
				let sel = window.getSelection()
				if (sel.rangeCount) {
					for (let i = 0, len = sel.rangeCount; i < len; ++i) {
						parent = sel.getRangeAt(i).commonAncestorContainer
						container.appendChild(sel.getRangeAt(i).cloneContents())
					}
				}
			}
			return [container, parent]
		},
    mx_keydown(e) {
      e.stopPropagation()
      
      if(e.keyCode == 16) {
        this.pressShift = true
      }

      if([38, 40, 37, 39].includes(e.keyCode)) {
        if(!e.shiftKey) {
          this.txt.displayTextPanel(false)
          return
        }
        setTimeout(() => {
          let [container] = this.mx_getSelection()
          let html = container.innerHTML
          let visible = !!html

          this.txt.displayTextPanel(visible)
        })
      }

      if([8, 46].includes(e.keyCode)) {
        this.txt.displayTextPanel(false)
      }
    },
    mx_keyup(e) {
      e.stopPropagation()
      if(e.keyCode == 16) this.pressShift = false
    }
	},
	beforeUnmount() {
		this.$refs["ref_text"].removeEventListener('paste', this.paste)
	}
}
export default useText
