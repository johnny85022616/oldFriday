<template>
  <div>
    <div class="product-component-container">
      <div>{{ data.promotion }}</div>
      <div>{{ data.name }}</div>
      <div v-if="checkPaymentWay('CASH')" class="product-payment">
        <span>
          <span class="product-payment__list-price">{{
            this.tools.priceFormat(data.list_price)
          }}</span>
          <span class="product-payment__currency">$</span>
          <span v-if="data.price" class="product-payment__real-price">{{
            this.tools.priceFormat(data.price)
          }}</span>
          <span v-else class="product-payment__real-price">{{
            this.tools.priceFormat(data.real_price)
          }}</span>
          <i
            v-if="data.flags && data.flags.includes('折扣後')"
            class="discount"
          ></i>
          <i
            v-if="data.flags && data.flags.includes('期間限定')"
            class="periodlimit"
          ></i>
        </span>
        <span class="product-payment__tags">
          <i v-if="isShow24h()" class="fastdelivery"></i>
          <i v-if="isShowSpeed()" class="speed"></i>
        </span>
      </div>
      <div
        class="product-discount"
        v-if="
          checkPaymentWay('LIFE_PARTIAL_POINT') ||
          checkPaymentWay('LIFE_EXCHANGE_POINT')
        "
      >
        <div class="product-discount__title fcoin">遠傳幣兌換</div>
        <div class="product-discount__details fcoin">
          <ul>
            <li v-if="checkPaymentWay('LIFE_PARTIAL_POINT')">
              <i class="fcoin"></i>
              {{
                this.tools.priceFormat(data.rewardPointInfo.lifePartialPoint)
              }}點 +
              <span
                >${{
                  this.tools.priceFormat(data.rewardPointInfo.lifePartialPrice)
                }}</span
              >
            </li>
            <li v-if="checkPaymentWay('LIFE_EXCHANGE_POINT')">
              <i class="fcoin"></i>
              {{ this.tools.priceFormat(data.rewardPointInfo.lifeExchangePoint) }}點
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="gap-line"></div>
  </div>
</template>

<script>
export default {
  name: "basicinfo",
  data() {
    return {
      showDialog: false,
      coupon: [],
      couponTips: [],
    };
  },
  components: {},
  props: {
    data: {
      type: Object,
    },
    tags: {
      type: Array,
    },
  },
  methods: {
    isShow24h() {
      return this.tags && this.tags.some((v) => v.name === "急速24H");
    },
    isShowSpeed() {
      return this.tags && this.tags.some((v) => v.name === "速");
    },
    checkPaymentWay(type) {
      return (
        this.data &&
        this.data.payMethodList &&
        this.data.payMethodList.some((v) => v === type)
      );
    },
  },
  computed: {
    // 點+金
    hasPartialPoint() {
      return (
        this.data.payMethodList &&
        this.data.payMethodList.includes("PARTIAL_POINT")
      );
    },
    // 純點
    hasExhangePoint() {
      return (
        this.data.payMethodList &&
        this.data.payMethodList.includes("EXCHANGE_POINT")
      );
    },
    loginObj() {
      const isLoginInfo = this.$cookies.get("FEEC-B2C-INFO");
      if (!isLoginInfo) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style lang="sass" scoped>
@import '../../style/color.scss'

.product-component-container
  >div
    &:first-child
      font-size: 1.4rem
      color: $special
    &:nth-last-of-type(2)
      font-size: 1.6rem
      color: $web_main
.product-payment
  display: flex
  position: relative
  justify-content: space-between
  padding: 5px 0 0
  + .product-discount
    border-top: 1px solid $web_border
  >span
    &:first-child
      i
        position: relative
        top: -10px
        left: 5px
  &__tags
    display: flex
    justify-content: right
    align-items: flex-end
    // width: 35%
    padding-bottom: 5px

  &__real-price
    font-size: 2.2rem
    color: $red

  &__list-price
    display: block
    width: 100%
    color: $web_minor
    font-size: 1.4rem
    text-decoration: line-through

  &__currency
    color: $red
    font-size: 1.3rem

  i
    display: inline-block
    margin-right: 3px
    &.discount
      width: 45px
      height: 19px
      background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDUiIGhlaWdodD0iMTkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwYXRoIGQ9Ik04LjM1IDYgLjI5NyAxOC41MzhBLjMuMyAwIDAgMCAuNTQ5IDE5SDE3VjZIOC4zNXoiIGZpbGw9IiNGRkUyRTEiLz4KICAgICAgICA8cGF0aCBkPSJNOCAwaDMyYTUgNSAwIDAgMSA1IDV2OWE1IDUgMCAwIDEtNSA1SDNWNWE1IDUgMCAwIDEgNS01eiIgZmlsbD0iI0ZGRTJFMSIvPgogICAgICAgIDx0ZXh0IGZvbnQtZmFtaWx5PSJQaW5nRmFuZ1RDLVJlZ3VsYXIsIFBpbmdGYW5nIFRDIiBmb250LXNpemU9IjEyIiBmaWxsPSIjRjM0RjU5Ij4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRzcGFuIHg9IjYiIHk9IjE0Ij7mipjmiaPlvow8L3RzcGFuPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGV4dD4KICAgIDwvZz4KPC9zdmc+Cg==')

    &.periodlimit
      width: 57px
      height: 19px
      background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTciIGhlaWdodD0iMTkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwYXRoIGQ9Ik04LjM1IDYgLjI5NyAxOC41MzhBLjMuMyAwIDAgMCAuNTQ5IDE5SDE3VjZIOC4zNXoiIGZpbGw9IiNGRkUyRTEiLz4KICAgICAgICA8cGF0aCBkPSJNOCAwaDQ0YTUgNSAwIDAgMSA1IDV2OWE1IDUgMCAwIDEtNSA1SDNWNWE1IDUgMCAwIDEgNS01eiIgZmlsbD0iI0ZGRTJFMSIvPgogICAgICAgIDx0ZXh0IGZvbnQtZmFtaWx5PSJQaW5nRmFuZ1RDLVJlZ3VsYXIsIFBpbmdGYW5nIFRDIiBmb250LXNpemU9IjEyIiBmaWxsPSIjRjM0RjU5Ij4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRzcGFuIHg9IjYiIHk9IjE0Ij7mnJ/plpPpmZDlrpo8L3RzcGFuPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGV4dD4KICAgIDwvZz4KPC9zdmc+Cg==')

    &.fastdelivery
      width: 62px
      height: 20px
      background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNS40LjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0i5ZyW5bGkXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTggMTgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU4IDE4OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPg0KCS5zdDB7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojMDA4NEZGO30NCgkuc3Qxe2VuYWJsZS1iYWNrZ3JvdW5kOm5ldyAgICA7fQ0KCS5zdDJ7ZmlsbDojRkZGRkZGO30NCgkuc3Qze2ZvbnQtZmFtaWx5OidBZG9iZU1pbmdTdGQtTGlnaHQtQjVwYy1IJzt9DQoJLnN0NHtmb250LXNpemU6MTNweDt9DQoJLnN0NXtmb250LWZhbWlseTonQXJpYWxNVCc7fQ0KPC9zdHlsZT4NCjxnPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yLDFoNTRjMS4xLDAsMiwwLjksMiwydjEzYzAsMS4xLTAuOSwyLTIsMkgyYy0xLjEsMC0yLTAuOS0yLTJWM0MwLDEuOSwwLjksMSwyLDF6Ii8+DQoJPHRleHQgdHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgMSAzIDE0KSIgY2xhc3M9InN0MSI+PHRzcGFuIHg9IjAiIHk9IjAiIGNsYXNzPSJzdDIgc3QzIHN0NCI+5oCl6YCfPC90c3Bhbj48dHNwYW4geD0iMjYiIHk9IjAiIGNsYXNzPSJzdDIgc3Q1IHN0NCI+MjRIPC90c3Bhbj48L3RleHQ+DQo8L2c+DQo8L3N2Zz4NCg==')

    &.speed
      width: 20px
      height: 20px
      background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8cGF0aCBkPSJNMTUgMGE1IDUgMCAwIDEgNSA1djEwYTUgNSAwIDAgMS01IDVINWE1IDUgMCAwIDEtNS01VjVhNSA1IDAgMCAxIDUtNWgxMHpNNy4wMTggNy4wNjJIMy43ODR2LjkyNGgyLjEyOGMtLjQ3Ni43ODQtMS4wNzggMS41NjgtMS43NzggMi4zNjZ2Ljc3aDIuMWMtLjE5Ni45MS0uNDc2IDEuNzIyLS44MTIgMi40NS0uNTc0LjE1NC0xLjE3Ni44NjgtMS44MiAyLjE0MmwuNzQyLjY1OGMuNTg4LTEuMjMyIDEuMDUtMS44NDggMS4zNTgtMS44NDhhLjUxLjUxIDAgMCAxIC4zNS4xNGMuNDc2LjQ3NiAxLjAyMi44NCAxLjYxIDEuMDY0LjUwNC4yMSAxLjI0Ni4zMjIgMi4yMTIuMzUuNzIuMDI0IDEuNTEyLjAzOCAyLjM5NC4wNDFsMy45Mi4wMDEuMjI0LS45NjZjLTEuNTY4LjA1Ni0yLjg0Mi4wODQtMy44MjIuMDg0LS45OTQgMC0xLjg3Ni0uMDE0LTIuNjQ2LS4wMTQtLjgxMi0uMDI4LTEuNDU2LS4xMjYtMS45MDQtLjI5NC0uNDc2LS4yMS0uOTI0LS41MTgtMS4zNzItLjkyNGExLjMxNiAxLjMxNiAwIDAgMC0uMzM2LS4yNTJjLjMzNi0uNzU2LjYxNi0xLjY5NC44NC0yLjgxNHYtLjY3Mkg1LjMyNEExOS4yNzEgMTkuMjcxIDAgMCAwIDcuMDE4IDcuODZ2LS43OTh6bTUuNDQ2LTMuNDg2aC0uOTM4VjQuNzFoLTMuNTd2LjkyNGgzLjU3djEuMTlIOC40NzR2My41N2gyLjM5NGMtLjY1OCAxLjA3OC0xLjc1IDIuMDE2LTMuMjkgMi44bC42My43OThjMS40OTgtLjg4MiAyLjYwNC0xLjk0NiAzLjMxOC0zLjE5MnYzLjg3OGguOTM4di0zLjcyNGMxLjI0NiAxLjAzNiAyLjI0IDIuMDMgMi45ODIgMi45NjhsLjY4Ni0uNjg2Yy0uODEyLS45MzgtMS44MDYtMS44OS0yLjk4Mi0yLjg0MmgyLjM2NnYtMy41N2gtMy4wNTJ2LTEuMTloMy41MjhWNC43MWgtMy41MjhWMy41NzZ6bTIuMTI4IDQuMTN2MS43OTJoLTIuMTI4VjcuNzA2aDIuMTI4em0tMy4wNjYgMHYxLjc5Mkg5LjQxMlY3LjcwNmgyLjExNHptLTYuNjUtNC4wMTgtLjY1OC42NDRjLjg5Ni43MTQgMS42MSAxLjM4NiAyLjE0MiAyLjAzbC42NTgtLjY1OGExNi42OTUgMTYuNjk1IDAgMCAwLTIuMTQyLTIuMDE2eiIgZmlsbD0iI0YzNEY1OSIgZmlsbC1ydWxlPSJldmVub2RkIi8+Cjwvc3ZnPgo=') no-repeat

.product-discount
  display: flex
  padding-top: 15px

  &__title
    width: 20%
    color: $web_minor
    &.fcoin
      width: 25%

  &__details
    width: 80%
    font-size: 1.6rem
    color: $web_main
    &.fcoin
      width: 75%

    span
      color: $red

    ul
      position: relative
      top: -5px
      li
        display: flex
        align-items: center
        height: 30px
        list-style-type: none
        text-indent: 5px
</style>
