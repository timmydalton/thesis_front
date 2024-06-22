// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Input, InputPassword, InputNumber, Button, Alert, Popover, Tooltip, Table, Pagination, Modal, TreeSelect,
  Select, SelectOption, SelectOptGroup, Empty, AutoComplete, Tag, Switch, Avatar, Card, UploadDragger, Upload,
  Spin, Menu, MenuItem, SubMenu, Divider, TabPane, Tabs, Drawer, Radio, RadioGroup, Checkbox, DatePicker,
  Textarea, Space } from 'ant-design-vue'

import {
  CheckCircle,
  ArrowsLeftRight,
  ArrowLeft,
  ArrowRight,
  MapPinLine,
  PhoneSvg,
  WarehouseSvg,
  DeviceDesktop,
  PlugConnected,
  EyeSvg,
  EyeSlash,
  TrashSvg,
  DotsThree,
  PencilSimple,
  CopySvg,
  SeoSvg,
  CaretRight,
  CloseSvg,
  CheckSvg,
  CheckSquareOffset,
  ArrowUp,
  OrderProduct,
  ImageSquare,
  EnvelopeSimple,
  PlusCircle,
  MessageCircle,
  NotePencil,
  PlusSvg,
  SearchSvg,
  MagnifyingSearch,
  NoteSvg,
  ArticleSvg,
  SwatchesSvg,
  BoundingBox,
  PencilMinus,
  FilterSvg,
  DownloadSimple,
  UploadSimple,
  CaretDoubleDown,
  Home2,
  HistorySvg,
  DescriptionSvg
} from "vue-pancake-icons"

import '../style/tailwind/index.css'

import 'ant-design-vue/dist/reset.css'
import 'vue3-carousel/dist/carousel.css'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'remixicon/fonts/remixicon.css'

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
app.use(Menu)
app.use(MenuItem)
app.use(SubMenu)
app.use(Divider)
app.use(TabPane)
app.use(Tabs)
app.use(InputNumber)
app.use(Drawer)
app.use(Radio)
app.use(RadioGroup)
app.use(Checkbox)
app.use(DatePicker)
app.use(Textarea)
app.use(Space)

app.use(CheckCircle)
app.use(ArrowsLeftRight)
app.use(ArrowLeft)
app.use(ArrowRight)
app.use(MapPinLine)
app.use(PhoneSvg)
app.use(WarehouseSvg)
app.use(DeviceDesktop)
app.use(PlugConnected)
app.use(EyeSvg)
app.use(EyeSlash)
app.use(TrashSvg)
app.use(DotsThree)
app.use(PencilSimple)
app.use(CopySvg)
app.use(SeoSvg)
app.use(CaretRight)
app.use(CloseSvg)
app.use(CheckSvg)
app.use(CheckSquareOffset)
app.use(ArrowUp)
app.use(OrderProduct)
app.use(ImageSquare)
app.use(EnvelopeSimple)
app.use(PlusCircle)
app.use(MessageCircle)
app.use(NotePencil)
app.use(PlusSvg)
app.use(SearchSvg)
app.use(MagnifyingSearch)
app.use(NoteSvg)
app.use(ArticleSvg)
app.use(SwatchesSvg)
app.use(BoundingBox)
app.use(PencilMinus)
app.use(FilterSvg)
app.use(DownloadSimple)
app.use(UploadSimple)
app.use(CaretDoubleDown)
app.use(Home2)
app.use(HistorySvg)
app.use(DescriptionSvg)

app.use(createPinia())
app.use(router)

app.mount('#app')
