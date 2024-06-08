// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Input, InputPassword, Button, Alert, Popover, Tooltip, Table, Pagination, Modal, TreeSelect,
  Select, SelectOption, SelectOptGroup, Empty, AutoComplete, Tag, Switch, Avatar, Card, UploadDragger, Upload,
  Spin } from 'ant-design-vue'

import 'ant-design-vue/dist/reset.css'
import 'vue3-carousel/dist/carousel.css'
import '../style/main.sass'

import Message from '@/plugins/message.js'

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
app.use(Avatar)
app.use(Card)
app.use(UploadDragger)
app.use(Spin)
app.use(Upload)
app.use(Message)

app.use(createPinia())
app.use(router)

app.mount('#app')
