// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Input, InputPassword, Button, Alert, Popover } from 'ant-design-vue'

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

app.use(createPinia())
app.use(router)

app.mount('#app')
