<template>
<div id="venraasRecDom" class="youmaylike-wrap">
  <div v-if="title" class="youmaylike-wrap__title">{{title}}</div>
  <productItem :itemList="items" />
</div>
</template>

<script>
import productItem from "../common/productItem";
export default {
  name: 'youmaylike',
  data() {
    return {
      items: [],
      recParams: {
        token: '9Rs7ZrElXm',
        rec_type: 'ClickStream',
        rec_pos: 'p',
        topk: 20,
        device: 'mb'
      },
      recomd_id: null,
      rec_pos: null,
      isSendLog: false
    }
  },
  props: {
    title: {
      type: String,
      default: () => ''
    },
    recpos: {
      type: String,
      default: () => 'p'
    },
    rectype: {
      type: String,
      default: () => 'ClickStream'
    },
    reccid: {
      type: Number,
      default: () => null
    },
    recgid: {
      type: Number,
      default: () => null
    },
    recsid: {
      type: Number,
      default: () => null
    },
    limit: {
      type: Number,
      default: () => 20
    }
  },
  components: {
    productItem,
  },
  created() {
    this.recParams.rec_pos = this.recpos
    this.recParams.rec_type = this.rectype
    if (this.reccid) {
      this.recParams.categ_code = this.reccid
    }
    if (this.recsid) {
      this.recParams.w_categ_info = [{
        code: 'S' + this.recsid
      }]
    }
    if (this.recgid) {
      this.recParams.gid = this.recgid
    }
    if (this.limit) {
      this.recParams.topk = this.limit
    }

    const timer = setInterval(() => {
      if (window.venraastool) {
        this.getVenraas()
        clearInterval(timer)
      }
    }, 500)
  },
  methods: {
    getVenraas() {
      const venraastool = window.venraastool || null
      const isLoginInfo = this.$cookies.get('FEEC-B2C-INFO')
      if (isLoginInfo) {
        this.recParams.user_id = isLoginInfo.data.userId
      }
      if (venraastool && typeof venraastool.recomd === 'function') {
        venraastool.recomd(this.recParams, jsonStr => {
          const obj = JSON.parse(jsonStr)
          if (obj.recomd_list) {
            this.items = obj.recomd_list.map(item => {
              const urls = item.goods_page_url.split('product')
              const newUrl = '/mobileweb/product' + urls[1]
              return {
                url: newUrl,
                img: item.goods_img_url,
                name: item.name,
                price: item.sale_price,
              }
            })
            this.recomd_id = obj.recomd_id
            this.rec_pos = obj.rec_pos
          }
          this.initEventTrack()
          this.$nextTick(() => {
            this.$emit('calcuProductBoxOffset')
          })
        })
      }
    },
    initEventTrack() {
      const dom = document.querySelector('#venraasRecDom')
      const winH = window.innerHeight
      const inView = () => {
      if (dom) {
        const vavPos = dom.getBoundingClientRect().top
        if (vavPos <= winH && !this.isSendLog) {
          this.isSendLog = true
          this.sendLog()
        }
      }
    }
      window.addEventListener('scroll', inView)
    },
    sendLog() {
      const venraas = window.venraas || null
      venraas.tracking('reccall|create', {
        autosend: false,
        device: 'mb',
        page_type: this.rec_pos
      })
      venraas.tracking('reccall|add_rec', {
        rec: this.recomd_id
      })
      venraas.tracking('reccall|send')
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../style/color';

.youmaylike-wrap {
  &__title {
    text-align: center;
    margin: 25px 0 10px 0;
    font-size: 1.6rem;
    color: $web_minor;
  }
}
</style>
