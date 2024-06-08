// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Input, InputPassword, Button, Alert, Popover, Tooltip, Table, Pagination, Modal, TreeSelect,
  Select, SelectOption, SelectOptGroup, Empty, AutoComplete, Tag, Switch } from 'ant-design-vue'

import 'ant-design-vue/dist/reset.css'
import 'vue3-carousel/dist/carousel.css'
import '../style/main.sass'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(Input)
app.use(InputPassword)
app.use(Button)
app.use(Alert)
app.use(Popover)
app.use(Tooltip)
app.use(Table)
app.use(Pagination)
app.use(Modal)
app.use(TreeSelect)
app.use(Select)
app.use(SelectOption)
app.use(SelectOptGroup)
app.use(Empty)
app.use(AutoComplete)
app.use(Tag)
app.use(Switch)

app.use(createPinia())
app.use(router)

app.mount('#app')
