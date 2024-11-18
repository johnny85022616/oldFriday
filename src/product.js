import tools from './utils/tools.js'

// redirect to desktop if not use mobile device.
tools.checkMweb('/ec2/product')
// prevent open browser in-app on LINE
tools.openExternalFromLine()

import Vue from 'vue'
import Product from './Product.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCarousel from 'vue-carousel'
import VueLazyload from 'vue-lazyload'
import VueCookies from 'vue-cookies'
import VueYoutube from 'vue-youtube-embed'
import configs from './config/configs.js'
import storage from './utils/storage.js'
import ga from './utils/ga.js'
import seo from './utils/seo.js'

Vue.config.productionTip = false

// export configs
Vue.prototype.configs = configs
Vue.prototype.storage = storage
Vue.prototype.tools = tools
Vue.prototype.ga = ga
Vue.prototype.seo = seo
Vue.prototype.lighthouse = tools.isLighthouse

// axios default setting
axios.defaults.baseURL = configs.apiPath()

// Invoke friday component
Vue.prototype.fridayComponent = window.fridayComponent

Vue.use(VueCarousel)
if (!tools.isLighthouse) {
  Vue.use(VueCookies)
  Vue.use(VueYoutube)
}
Vue.use(VueAxios, axios)
Vue.use(VueLazyload)

new Vue({
  render: (h) => h(Product),
}).$mount('#app')
