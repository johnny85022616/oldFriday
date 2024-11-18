import tools from './utils/tools.js'

// redirect to desktop if not use mobile device.
tools.checkMweb(location.pathname.replace('ec2', 'mobileweb'))
// prevent open browser in-app on LINE
tools.openExternalFromLine()

import Vue from 'vue'
import Campaign from './Promotion.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCarousel from 'vue-carousel'
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
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8;'

// Invoke friday component
Vue.prototype.fridayComponent = window.fridayComponent

Vue.use(VueCarousel)
Vue.use(VueLazyload)
if (!tools.isLighthouse) {
  Vue.use(VueCookies)
}
Vue.use(VueAxios, axios)

new Vue({
  render: (h) => h(Campaign),
}).$mount('#app')
