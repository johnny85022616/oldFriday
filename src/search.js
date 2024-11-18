import tools from './utils/tools.js'

// redirect to desktop if not use mobile device.
tools.checkMweb('/ec2/search')
// prevent open browser in-app on LINE
tools.openExternalFromLine()

import Vue from 'vue'
import Search from './Search.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload from 'vue-lazyload'
import VueCookies from 'vue-cookies'
import configs from './config/configs.js'
import seo from './utils/seo.js'
import ga from './utils/ga.js'

Vue.config.productionTip = false

// export configs
Vue.prototype.configs = configs
Vue.prototype.tools = tools
Vue.prototype.seo = seo
Vue.prototype.ga = ga
Vue.prototype.lighthouse = tools.isLighthouse

// axios default setting
axios.defaults.baseURL = configs.apiPath()

// Invoke friday component
Vue.prototype.fridayComponent = window.fridayComponent

if (!tools.isLighthouse) {
  Vue.use(VueCookies)
}
Vue.use(VueAxios, axios)
Vue.use(VueLazyload)

new Vue({
  render: (h) => h(Search),
}).$mount('#app')
