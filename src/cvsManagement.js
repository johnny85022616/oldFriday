import tools from './utils/tools.js'
// redirect to desktop if not use mobile device.
const desktopPath = location.pathname.replace('/mobileweb/member/creditCardInfo','/ec2/memberSelfService/myCreditCardList') + '.html'
tools.checkMweb(desktopPath)
// prevent open browser in-app on LINE
tools.openExternalFromLine()

import Vue from 'vue'
import cvsManagement from './CvsManagement.vue'
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
Vue.prototype.ga = ga
Vue.prototype.seo = seo
Vue.prototype.tools = tools
Vue.prototype.lighthouse = tools.isLighthouse

// axios default setting
axios.defaults.baseURL = configs.apiPath()
console.log(configs.apiPath());

// Invoke friday component
Vue.prototype.fridayComponent = window.fridayComponent

Vue.use(VueCarousel)
Vue.use(VueLazyload)

if (!tools.isLighthouse) {
  Vue.use(VueCookies)
  Vue.use(VueYoutube)
}
Vue.use(VueAxios, axios)

new Vue({
  render: (h) => h(cvsManagement),
  beforeCreate(){
    Vue.prototype.$bus = this //事件總線 
  }
}).$mount('#app')
