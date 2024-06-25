<template>
  <section class="section-profile">
    <div class="element-decor decor-1"></div>
    <div class="element-decor decor-2"></div>
    <div class="container">
      <div class="row appear-animate">
        <div class="col-lg-12">
          <div class="mb-6">
            <div class="cr-banner">
              <h2>Tài khoản</h2>
            </div>
            <div class="cr-banner-sub-title">
              <p>Tra cứu, chỉnh sửa tài khoản của bạn </p>
            </div>
          </div>
        </div>
      </div>

      <div class="row appear-animate">
        <div class="col-xl-12">
          <div class="vendor-sticky-bar">
            <div class="col-xl-12">
              <div class="cr-card">
                <div class="cr-card-content">
                  <div class="cr-vendor-block-img">
                    <div class="cr-vendor-block-detail">
                      <div class="profile-img cursor-pointer" @click="changeAvatar">
                        <img class="v-img" :src="me.avatar || 'https://statics.pancake.vn/web-media/91/68/aa/4d/2f5c95ba23476f5549910882e4e42530fdee6123b4a995e226e18e3e.svg'" alt="">
                        <input
                          @change="e => fileChange(e)"
                          multiple="multiple"
                          type="file"
                          accept="image/png, image/gif, image/jpeg"
                          id="upload-avatar"
                          hidden
                        />
                      </div>

                      <h5 class="name">{{(me.first_name || '') + ' ' + (me.last_name || '')}}</h5>

                      <p>({{ me.email || 'No email' }})</p>

                      <div class="cr-settings">

                      </div>
                    </div>

                    <form class="cr-content-form">
                      <div class="row">
                        <div class="col-12 col-sm-6">
                          <div class="form-group">
                            <label>Họ*</label>
                            <a-input class="cr-form-control" placeholder="Nhập họ" v-model:value="first_name" :disabled="!editing"></a-input>
                          </div>
                        </div>

                        <div class="col-12 col-sm-6">
                          <div class="form-group">
                            <label>Tên*</label>
                            <a-input class="cr-form-control" placeholder="Nhập tên và tên đệm" v-model:value="last_name" :disabled="!editing"></a-input>
                          </div>
                        </div>

                        <div class="col-12 col-sm-6">
                          <div class="form-group">
                            <label>Email*</label>
                            <a-input class="cr-form-control" placeholder="Nhập email" v-model:value="email" :disabled="!editing"></a-input>
                          </div>
                        </div>

                        <div class="col-12 col-sm-6">
                          <div class="form-group">
                            <label>Số điện thoại*</label>
                            <a-input class="cr-form-control" placeholder="Số điện thoại" v-model:value="phone_number" :disabled="!editing"></a-input>
                          </div>
                        </div>

                        <div class="col-12">
                          <div class="form-group">
                            <label>Địa chỉ</label>
                            <a-input class="cr-form-control" placeholder="Số nhà, đường, quận, thành phố,..." v-model:value="address" :disabled="!editing"></a-input>
                          </div>
                        </div>

                        <div class="cr-register-buttons">
                          <a-button class="cr-button" type="primary" @click="handleEdit" v-if="!editing">Chỉnh sửa</a-button>
                          <template v-else>
                            <button class="cr-button" @click="handleUpdateAccount">Cập nhật</button>
                            <button class="cr-btn-secondary" @click="handleCancelEdit">Hủy</button>
                          </template>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row appear-animate">
        <div class="col-xl-12">
          <div class="col-xl-12">
            <div class="cr-card">
              <div class="cr-card-content">
                <table class="w-full text-center table dataTable no-footer">
                  <thead style="height: 32px; background: #e1e1e1">
                    <th>
                      Mã đơn hàng
                    </th>
                    <th>
                      Số sản phẩm
                    </th>
                    <th>
                      Giá trị đơn hàng
                    </th>
                    <th>
                      Ngày tạo
                    </th>
                    <th>
                      Trạng thái
                    </th>
                  </thead>
                  <tbody>
                    <tr v-for="order in user.orders.data" class="cursor-pointer" @click="openOrder(order)">
                      <th>
                        {{ order.display_id }}
                      </th>
                      <th>
                        {{ order.order_items.length }}
                      </th>
                      <th>
                        {{ order.invoice_value }}
                      </th>
                      <th>
                        {{ formatDateTime(7, order.inserted_at) }}
                      </th>
                      <th style="padding: 5px 0">
                        <OrderStatus :item="order" :width="'auto'"/>
                      </th>
                    </tr>
                  </tbody>
                </table>

                <a-pagination :total="user?.orders?.total_entries || 0" :current="user.orders.page || 1"
                  :pageSize="user.orders.limit" :show-size-changer="false" class="p-2 flex justify-end custom-pagination"
                  @change="handleChangePaginate" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useUserStore } from '@/stores/user'
import { useApipost, useApiget } from "@/composable/fetch.js"
import OrderStatus from "@/components/admin-view/order/OrderStatus.vue"

import { formatDateTime } from "@/composable/common"

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL

export default {
  setup() {
    const user = useUserStore()

    return {
      user,
      formatDateTime
    }
  },
  components: {
    OrderStatus
  },
  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      address: '',
      editing: false
    }
  },
  mounted() {
    if (this.me) {
      this.resetValue()
    }

    this.user.getOrders({limit: 5})
  },
  watch: {
    me(value) {
      this.first_name = value.first_name || ''
      this.last_name = value.last_name || ''
      this.email = value.email || ''
      this.phone_number = value.phone_number || ''
      this.address = value.address || ''
    }
  },
  computed: {
    me() {
      return this.user.me || {}
    },
  },
  methods: {
    handleEdit() {
      this.editing = true
    },
    resetValue() {
      this.first_name = this.me.first_name || ''
      this.last_name = this.me.last_name || ''
      this.email = this.me.email || ''
      this.phone_number = this.me.phone_number || ''
      this.address = this.me.address || ''
    },
    handleUpdateAccount() {
      this.editing = false
      const params = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        phone_number: this.phone_number,
        address: this.address
      }

      this.user.updateInfo(params)
        .then(res => {
          if (res.data.success && res.status == 200) {
            const user = res.data.data
            this.user.setMe(user)
            this.$message.success('Cập nhật thông tin thành công!')
          }
        })
        .catch(error => {
          console.log(error)
          this.$message.error('Update thông tin thất bại!')
        })
    },
    handleCancelEdit() {
      this.resetValue()
      this.editing = false
    },
    changeAvatar() {
      document.getElementById(`upload-avatar`).click()
    },
    fileChange(event) {
      let files = event.target.files || []
      let typeFile = files[0].type
      const ImgSize = files[0].size / 1024 / 1024
      const that = this

      if (ImgSize <= 100) {
        let _URL = window.URL || window.webkitURL

        let img = new Image()
        let objectUrl = _URL.createObjectURL(files[0])

        console.log(objectUrl)

        img.onload = function() {
          _URL.revokeObjectURL(objectUrl)
          let data = new FormData()
          data.append('file', files[0], files[0].name || files[0].filename)

          let url = `${VITE_BACKEND_API_URL}/api/admin/content/upload_file`

          useApipost(url, null, data)
            .then(res => {
              if (res.data.success && res.status == 200) {
                const url = res.data.content_url
                that.user.updateInfo({ avatar: url })
                  .then(ress => {
                    if (ress.data.success && ress.status == 200) {
                      const user = ress.data.data
                      that.user.setMe(user)
                      that.$message.success('Đã thay đổi ảnh đại diện!')
                    }
                  })
                  .catch(error => {
                    console.log(error)

                    that.$message.error('Update thông tin thất bại!')
                  })
              }
            })
            .catch(error => {
              console.log(error)

              that.$message.error('Upload ảnh bị lỗi!')
            })
        }

        img.src = objectUrl
      } else {
        this.$message.error("File vượt quá dung lượng")
      }
    },
    openOrder(order) {
      this.$router.push(`/order/${order.id}`)
    },
    handleChangePaginate(page, pageSize) {
      this.user.getOrders({ page: page })
    },
  }
}
</script>