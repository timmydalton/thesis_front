import { message } from 'ant-design-vue'

export default {
	install(app, options) {
		app.mixin({
			created() {
				if (!this.$message) {
					this.$message = {
						success: config => message.success(config),
						warning: config => message.warning(config),
						error: config => message.error(config),
						info: config => message.info(config),
						destroy: () => message.destroy()
					}
				}
			}
		})
	}
}
