import tools from './utils/tools.js'

// redirect to desktop if not use mobile device.
tools.checkMweb()
// prevent open browser in-app on LINE
tools.openExternalFromLine()

import Vue from 'vue'
import invoiceManagement from './invoiceManagement.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import VueYoutube from 'vue-youtube-embed'
import configs from './config/configs.js'
import storage from './utils/storage.js'
import ga from './utils/ga.js'


Vue.config.productionTip = false

// export configs
Vue.prototype.configs = configs
Vue.prototype.storage = storage
Vue.prototype.tools = tools
Vue.prototype.ga = ga
Vue.prototype.lighthouse = tools.isLighthouse

// axios default setting
axios.defaults.baseURL = configs.apiPath()

if (!tools.isLighthouse) {
  Vue.use(VueCookies)
  Vue.use(VueYoutube)
}
Vue.use(VueAxios, axios)

new Vue({
  render: (h) => h(invoiceManagement),
}).$mount('#app')
