<template>
<div class="homepage-promotion">
  <div class="homepage-promotion-timer">
    <div class="homepage-promotion-timer__head">
      <div>
        <i></i>
       每日10:00開搶．限時24H
      </div>
      <div>
        <div class="homepage-promotion-hot__lookmore">
          <a :href="timerLookMorePath" target="_blank" class="ga-event" data-ga-category="首頁每日限時搶購看更多" data-ga-label="">看更多<i></i></a>
          </div>
      </div>
    </div>
    <div class="homepage-promotion-timer__product-items">
      <a v-for="(item, index) of timerData" :key="index" :href="item.hyperLink" class="ga-event" data-ga-category="首頁每日限時搶購" :data-ga-label="item.name">
        <img v-lazy="item.image_url" :alt="item.name">
        <i v-if="timerFrame" class="homepage-promotion-timer__frame" :style="'background-image:url('+timerFrame+')'"></i>
        <span class="homepage-promotion-timer__price">
          <span v-if="item.discount" class="homepage-promotion-timer__discount">
            {{item.discount}}<font>折</font>
          </span>
          <font
            v-if="item.list_price"
            class="list_price">{{item.list_price}}</font>
          <font class="real_price">{{item.real_price}}</font>
        </span>
        <span class="homepage-promotion-timer__name">
          {{item.name}}
        </span>
        <span class="homepage-promotion-timer__label">
          {{item.promotion}}
        </span>
      </a>
      <a :href="timerLookMorePath">
        <i></i>
        <span class="homepage-promotion-timer__lookmore">看更多</span>
      </a>
    </div>
  </div>

  <div>
    <div class="homepage-promotion-hot">
      <div>
        <i></i>
        每日熱銷推薦
      </div>
      <div class="homepage-promotion-hot__product-items">
        <a v-for="(item, index) of hotData" :key="index" :href="item.hyperLink" :title="item.name" class="ga-event" data-ga-category="首頁每日熱銷推薦" :data-ga-label="item.name">
          <img v-lazy="item.image_url" :alt="item.name">
          <i v-if="hotFrame" class="homepage-promotion-hot__frame" :style="'background-image:url('+hotFrame+')'"></i>
          <div>
            <span class="homepage-promotion-hot__name">{{item.name}}</span>
            <span class="homepage-promotion-hot__price">
              <font class="real_price">{{item.real_price}}</font>
            </span>
            <span class="homepage-promotion-hot__tag">HOT</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'discountAndHot',
  data() {
    return {
      nowTimes: null,
      timerData: [], // 限搶資料
      timerFrame: null, // 限搶壓框
      hotData: [], // 熱銷資料
      hotFrame: null // 熱銷壓框
    }
  },
  props: {
    homepageData: {
      type: Object,
      default: () => null
    }
  },
  created() {
    // 測試固定日期資料
    const debugTime =
      location.search && location.search.match(/homepage_debug/i) ?
      decodeURIComponent(location.search.match(/\??homepage_debug=([\d\s/%:]+)/i)[1]) :
      ''
    // 目前Browser時間
    this.nowTimes = debugTime ? new Date(debugTime) : new Date()

    // 解析商品資料
    this.parseJsonData(this.homepageData)
  },
  methods: {
    // 解析json資料
    parseJsonData(json) {
      const {
        event_start_date,
        timer_promotion,
        hot_promotion
      } = json

      if (event_start_date) {
        if (this.nowTimes.getTime() < new Date(event_start_date).getTime()) {
          return false
        }
      }

      if (timer_promotion) {
        const timerUIData = this.getUIData(timer_promotion.data)
        this.getData(timerUIData, 'homepage_timer', function (data) {
          this.timerData = data
        })

        if (timer_promotion.frame && timer_promotion.frame !== '') {
          this.timerFrame = this.configs.homepageProjectFolder + 'timer/frame_images/' + timer_promotion.frame
        }
      }

      if (hot_promotion) {
        const hotUIData = this.getUIData(hot_promotion.data)
        this.getData(hotUIData, 'homepage_hot',function (data) {
          this.hotData = data
        })

        if (hot_promotion.frame && hot_promotion.frame !== '') {
          this.hotFrame = this.configs.homepageProjectFolder + 'hot/frame_images/' + hot_promotion.frame
        }
      }
    },
    // 取得LIVESYNC資料
    getData(payload, gaItemListId, callback) {
      if (!payload.items && !payload.f_items) {return null}
      let cookieInfo 
      let gender 
      try{
        cookieInfo = this.$cookies.get('FEEC-B2C-INFO')
        gender = cookieInfo.data.gender;
      }catch(e){
        gender = 1;
      }
      let data = gender === 1|| gender === undefined ? payload.items : payload.f_items; 
      this.getApiData(data, function (apiData, payloadData) {
        let n = payloadData.map(pid => {
          const o = apiData[pid]
          if (!o) return null
          return {
            hyperLink: this.configs.productionProductPage + `?sid=${o.sid}&cid=${o.cid}&pid=${pid}&mid=${o.mid}&item_list_id=${gaItemListId}`,
            list_price: o.list_price === o.real_price ? null : this.tools.priceFormat(o.list_price),
            real_price: this.tools.priceFormat(o.real_price),
            discount: o.list_price !== o.real_price ? Math.floor((o.real_price / o.list_price) * 100).toString().replace(/(0){1}$/i, '') : null,
            image_url: o.image_url,
            name: o.name,
            promotion: o.promotion
          }
        })

        n = n.filter(v => v)

        callback.call(this, n)
      })
    },
    getApiData(payload, callback) {
      const postData = payload.split(',')
      const postPayload = postData.map((v) => {
        return {
          pid: v,
        }
      })
      const dataObj = {
        cachecode: 'livesync-homepage-' + payload.replace(/,/g, ''),
        data: postPayload,
      }
      this.axios({
        method: 'POST',
        url: this.configs.livesyncApiPath,
        data: dataObj
      }).then((res) => {
        callback.call(this, res.data, postData)
      })
    },
    // 判斷Json時間 取得對應資料
    getUIData(data) {
      if (!data) return null
      let outputData = []
      data.forEach((v) => {
        if (this.nowTimes.getTime() >= new Date(v.start_date).getTime()) {
          outputData = v
        }
      })
      return outputData
    }
  },
  computed: {
    timerLookMorePath() {
      const look_more_path = this.homepageData?.timer_promotion?.look_more_path
      let url = ''

      if (Array.isArray(look_more_path)) {
        let week = new Date().getDay() - 1
        if (week === -1) {
          week = 5
        }
        url = look_more_path[week].replace(/\s/gi, '')
      }

      return url
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../../style/color.scss"
@import "../../style/mixin.scss"

$width: 100%

.homepage-promotion
  width: $width
  line-height: normal !important
  margin-top: 12px
  /* 每日限時搶購 */
  &-timer
    width: $width
    padding: 44px 0 12px 0
    box-sizing: border-box
    background-color: $background
    border-radius: 10px
    position: relative
    &__head
      box-sizing: border-box
      height: 46px
      margin: -58px 15px 10px 15px
      border-radius: 0 16px 16px 16px
      padding-left: 12px
      color: $white
      font-weight: 500
      background-image: linear-gradient(264deg, #ff9090, $red 57%)
      >div
        &:first-of-type
          height: 100%
          display: inline-flex
          align-items: center
          white-space: nowrap
          font-size: 1.6rem
          margin-right: 12px
          i
            margin-right: 5px
            display: inline-block
            width: 21px
            height: 21px
            background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMSAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik04LjMyNC4zMTUgNC4wNjQgMTAuOThhLjUuNSAwIDAgMCAuNDY1LjY4NmgyLjc2M2EuNS41IDAgMCAxIC40OC42NGwtMS43MjcgNS44NjdhLjUuNSAwIDAgMCAuODI4LjVsOS43NjUtOS40ODNhLjUuNSAwIDAgMC0uMzQ4LS44NThoLTMuODc2YS41LjUgMCAwIDEtLjQ0Ni0uNzI2TDE1LjQ0LjcyNUEuNS41IDAgMCAwIDE0Ljk5NCAwSDguNzg4YS41LjUgMCAwIDAtLjQ2NC4zMTV6IiBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+Cg==') no-repeat
        &:last-of-type
          height: 100%
          display: flex
          align-items: center
          color: $web_main
          font-weight: normal
          float: right
          font
            display: inline-block
            width: 22px
            line-height: 18px
            padding: 2px
            box-sizing: border-box
            margin: 0 2px
            color: $white
            background-color: $web_main
            border-radius: 5px
            font-size: 1.4rem
            text-align: center
          >div
            &:first-of-type
              flex-grow: 1
            &:last-of-type
              padding-left: 9.9px
              box-sizing: border-box
              border: 1px solid $white
              border-radius: 18px
              line-height: 22px
              font-size: 1.3rem
              text-align: center
              margin-right: 7.1px
              &.in
                display: inline-block
              a
                display: flex
                align-items: center
                color: $white
                text-decoration: none
              i
                margin-left: 4px
                margin-right: 7.1px
                display: inline-block
                width: 14px
                height: 14px
                background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxOCAxNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik04LjMxMyAwYzMuOTgyIDAgNy4yMSAzLjEzNCA3LjIxIDdzLTMuMjI4IDctNy4yMSA3Yy0zLjk4MSAwLTcuMjA5LTMuMTM0LTcuMjA5LTdzMy4yMjgtNyA3LjIxLTd6bS0uOTU1IDMuMjI4YS45OTYuOTk2IDAgMCAwLTEuMjc4LjI5Ni45MjYuOTI2IDAgMCAwLS4xNy41MzR2NS44ODRsLjAwNS4wOTFjLjA0Ny40OC40NjUuODU2Ljk3My44NTZhMSAxIDAgMCAwIC41NS0uMTY1bDQuNDU0LTIuOTQxLjA3NS0uMDU1YS45MjcuOTI3IDAgMCAwIC4xODItMS4yNi45NjIuOTYyIDAgMCAwLS4yNTctLjI1TDcuNDM4IDMuMjc3eiIgZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJldmVub2RkIi8+Cjwvc3ZnPgo=')
                background-repeat: no-repeat
                background-size: 115%
    &__product-items
      display: flex
      min-height: 227px
      overflow: scroll
      padding: 0 15px
      -webkit-overflow-scrolling: touch
      -ms-overflow-style: none
      scrollbar-width: none
      &::-webkit-scrollbar
        display: none
      a
        position: relative
        display: inline-block
        width: 132px
        min-height: 227px
        border-radius: 10px
        background-color: $white
        text-decoration: none
        margin-right: 10px
        &:last-of-type
          display: flex
          flex-direction: column
          justify-content: center
          align-items: center
          background-color: unset
          color: $red
          font-size: 1.4rem
          margin-right: unset
          i
            margin-bottom: 6px
            width: 33px
            height: 33px
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzMiIGhlaWdodD0iMzMiIHZpZXdCb3g9IjAgMCAzMyAzMyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xNi42MjkuNWM4LjgzNiAwIDE2IDcuMTYzIDE2IDE2cy03LjE2NCAxNi0xNiAxNmMtOC44MzcgMC0xNi03LjE2My0xNi0xNnM3LjE2My0xNiAxNi0xNnptMCAxLjA2N0M4LjM4IDEuNTY3IDEuNjk1IDguMjUzIDEuNjk1IDE2LjVTOC4zODEgMzEuNDMzIDE2LjYzIDMxLjQzM2M4LjI0NyAwIDE0LjkzMy02LjY4NiAxNC45MzMtMTQuOTMzUzI0Ljg3NiAxLjU2NyAxNi42MjkgMS41Njd6bS0xLjY1IDguMjI3LjEzOC4wODUgNy42ODkgNS4yMzJhMS42OCAxLjY4IDAgMCAxIC4xMyAyLjY4M2wtLjEzLjA5OC03LjY4OSA1LjIzYTEuNjkgMS42OSAwIDAgMS0yLjYyOS0xLjIzbC0uMDA4LS4xNjFWMTEuMjdhMS42OSAxLjY5IDAgMCAxIDIuNDk4LTEuNDc1eiIgZmlsbD0iI0YzNEY1OSIgZmlsbC1ydWxlPSJub256ZXJvIi8+Cjwvc3ZnPgo=')
      img
        width: 132px
        height: auto
        object-fit: cover
        border-top-left-radius: 10px
        border-top-right-radius: 10px
    &__price
      display: flex
      position: relative
      justify-content: flex-end
      align-items: baseline
      padding: 0 8px
      font
        &.list_price
          margin-right: 5px
          color: $sliver
          font-size: 1.2rem
          text-decoration: line-through
          &::before
            content: '$'
        &.real_price
          color: $red
          font-size: 20px
          &::before
            content: '$'
            font-size: 14px
    &__discount
      position: absolute
      left: -5px
      top: -15px
      width: 3.7rem
      height: 2rem
      border-top-left-radius: 10px
      border-bottom-right-radius: 10px
      color: $white
      background-color: $fcoin
      font-size: 1.4rem
      text-align: center
      font
        font-size: 1.2rem
    &__frame
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      display: inline-block
      background-repeat: no-repeat
      background-size: 100% auto
    &__name
      position: relative
      padding: 0 8px
      color: $web_main
      font-size: 1.4rem
      @include font-break(2)
    &__label
      margin: 2px 8px 6px 8px
      color: $special
      font-size: 1.2rem
      @include font-break(1)
    &__lookmore
      font-size: 1.4rem
      display: block
      width: 132px
      text-align: center
  /* End 每日限時搶購 */
  /* 每日熱銷推薦 */
  &-hot
    width: $width
    height: fit-content
    margin-top: 10px
    padding: 0 15px
    box-sizing: border-box
    border-radius: 10px
    background-color: $background
    >div
      &:first-of-type
        display: flex
        align-items: center
        padding: 11px 0
        width: $width
        color: $red
        font-weight: 500
        font-size: 1.6rem
        i
          display: inline-block
          width: 19px
          height: 22px
          margin-right: 5px
          background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAxOSAyMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxkZWZzPgogICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0iMCUiIHkxPSI1MCUiIHgyPSI5OS40NCUiIHkyPSI3MS4wMTklIiBpZD0iYSI+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNGMzRGNTkiIG9mZnNldD0iMCUiLz4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0ZGOTA5MCIgb2Zmc2V0PSIxMDAlIi8+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDwvZGVmcz4KICAgIDxwYXRoIGQ9Ik0xMC43NjIgMi40ODNjLjQ2OS0uNjgzIDEuNC0uODU1IDIuMDgtLjM4NS42ODEuNDcuNTMyIDMuNTUxLjE2MiA0LjItLjUwNC44ODItLjgxNyAxLjgzLS45MDIgMi4zMDktLjAzMy4xODMtLjAxNi4zNTguMDIxLjUyNGg1LjAwNGExLjQ5OCAxLjQ5OCAwIDAgMSAuMzk5IDIuOTRjLjMwMi4yNzMuNDk1LjY2Ni40OTUgMS4xMDggMCAuNzI5LS41MTggMS4zMzUtMS4yMDYgMS40N2ExLjQ5MyAxLjQ5MyAwIDAgMS0uNjU2IDIuNTU0IDEuNDk1IDEuNDk1IDAgMCAxLTEuMzkgMi4wNDdIOC45NzVsLTIuNjItLjc2MnYtOC4xOXMxLjU3Ni0xLjgyNyAxLjg4LTIuMjdsMS42OC0yLjQ0NnptLTUuMzA5IDcuMXY5LjY2N0gwVjkuNTgzaDUuNDUzeiIgZmlsbD0idXJsKCNhKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+Cjwvc3ZnPgo=') center/21px no-repeat  
      &:last-of-type
        width: 100%
        // min-height: 227px
        display: flex
        a
          position: relative
          display: block
          width: 100%
          height: fit-content
          background-color: $white
          border-radius: 10px
          position: relative
          text-decoration: none
          margin-bottom: 10px
          margin-right: 10px
          &:last-of-type
            margin-right: unset
          >div
            display: flex
            flex-wrap: wrap
            padding: 0 10px
        img
          width: 100%
          height: auto
          object-fit: cover
          border-top-left-radius: 10px
    &__frame
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      display: inline-block
      background-repeat: no-repeat
      background-size: 100% auto
    &__name
      color: $web_main
      font-size: 1.4rem
      @include font-break(2)
    &__price
      display: flex
      align-content: flex-end
      flex-wrap: wrap
      margin-bottom: 5px
      font
        width: 100%
        display: block
        &.real_price
          float: left
          color: $red
          font-size: 1.6rem
          &::before
            content: '$'
            font-size: 1.2rem
    &__tag
      position: absolute
      right: -5px
      top: -10px
      padding: 0 3px
      border-top-left-radius: 8px
      border-bottom-right-radius: 8px
      color: $white
      background-color: $red
      font-size: 1.2rem
      text-align: center
  /* End 每日熱銷推薦 */   
</style>
