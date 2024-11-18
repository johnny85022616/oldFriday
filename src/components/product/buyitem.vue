<template>
<div>
  <autoscreendialog
    v-if="showDialog"
    :isHeadLine="false"
    v-on:closeDialog="closeDialog">
    <template v-slot:header>
      <div class="cart-header">
        <img v-if="info.sample_images" :src="info.sample_images[0]" />
        <img v-else :src="info.image_url" />
        <span class="text-break-1">{{info.name}}</span>
      </div>
    </template>
    <template v-slot:body>
      <div class="cart-box">
        <div class="cart-box-content">
          <div
            class="wrap"
            v-if="!isCombo">
            <ul>
              <li
                v-for="(item,index) of payMethodList"
                :key="index"
                @click="choosePaymentMehtod(item)">
                <i :class="['circle', {'mark': item === nowSelectedPaymentType}]"></i>
                <span v-if="item === 'CASH'" class="price">
                  ${{tools.priceFormat(info.price)}}
                  <font v-if="info.showSaleMsg" class="price-discount">(折扣後)</font>
                </span>
                <span v-else-if="item === 'LIFE_PARTIAL_POINT'">
                  <i class="fcoin"></i>
                  <font class="fcoin">{{tools.priceFormat(info.rewardPointInfo.lifePartialPoint)}}</font> + <font class="price">{{tools.priceFormat(info.rewardPointInfo.lifePartialPrice)}}</font>
                  <font>元</font>
                </span>
                <span v-else-if="item === 'LIFE_EXCHANGE_POINT'">
                  <i class="fcoin"></i>
                  <font class="fcoin">{{tools.priceFormat(info.rewardPointInfo.lifeExchangePoint)}}</font>
                </span>

              </li>
            </ul>
          </div>

          <specbox
            :pid="pid"
            :specInfo="info.specInfo"
            :cartComboData="cartCombo"
            :productLimit="info.productLimit"
            v-on:setSpecInfo="setSpecInfo" />

          <div
            class="wrap"
            v-if="!isCombo">
            <label>運送方式</label>
            <div class="items d-flex flex-wrap">
              <a @click="swapCartType(item.cartTypeId, item.deliveryType)" v-for="(item, index) of info.deliveryInfos" :key="index" :class="['item', {'active': item.deliveryType === nowSelectedCartType}]">
                {{ item.deliveryName}}
              </a>
            </div>
            <span v-if="info.pre_order_info" class="f12">{{ info.pre_order_info }}</span>
          </div>

          <buycombo
            v-if="comboInfo && comboInfo.length > 0"
            :items="comboInfo"
            v-on:setCombo="getCombo" />

          <buyadditional
            v-if="info.additional && info.additional.length > 0"
            :items="info.additional"
            v-on:sendAdditional="getAdditional" />
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div
        v-if="soldoutCheck && !isProdPage && !isCombo && !isSpecialCatalog"
        ref="footer"
        class="cart-footer d-flex">
        <button v-if="info.productStatus" @click="goShop(true)" class="buyBtn" value="">{{buyTxt}}</button>
        <button @click="goShop()" class="addCartBtn" value="">加入購物車</button>
      </div>
      <div
        v-else-if="(soldoutCheck && comboSoldoutCheck) && isProdPage"
        ref="footer"
        class="cart-footer d-flex">
        <button class="confirmBtn" @click="goShop()" value="">確定</button>
      </div>
      <div
        v-else
        ref="footer"
        class="cart-footer d-flex">
        <button class="soldoutBtn" @click="goNotification()" value="">補貨中，貨到通知</button>
      </div>
    </template>
  </autoscreendialog>
</div>
</template>

<script>
import autoscreendialog from "../common/autoscreenDialog.vue"; // 蓋版提示框
import buycombo from "./buycombo"; // 組合商品區塊
import buyadditional from "./buyadditional"; // 加價購區塊
import specbox from "./specbox"; //規格一 規格二 選擇

export default {
  name: "buyitem",
  data() {
    return {
      cartData: [], // 收集購物車API資料
      info: {},
      showDialog: false, // 是否顯示購物車視窗
      nowSelectedCartId: 1, // 運送方式ID
      nowSelectedCartType: '', // 運送方式名稱
      nowSelectedSpecId: null, // 規格ID
      nowSelectedSpecName: "", // 規格名稱
      nowSelectedPaymentType: "CASH", // 付款方式
      cartBuyQuantity: 1, // 購買數量
      cartAdditional: [], // 加價購資料
      cartCombo: [], // 組合商品資料
      isAddToCartLoading: false,
    };
  },
  components: {
    autoscreendialog,
    buyadditional,
    buycombo,
    specbox
  },
  props: {
    pid: {
      type: Number,
      required: true,
    },
    cid: {
      type: Number,
      required: true,
    },
    mid: {
      type: Number,
      required: true,
    },
    // 促銷目錄ID
    promotionId: {
      type: String,
      default: () => null
    },
    // 是否在商品頁觸發
    isProdPage: {
      type: Boolean,
      default: () => true
    },
    // 是否特殊目錄執行購物車
    isSpecialCatalog: {
      type: Boolean,
      default: () => false
    },
    // 是否為組合商品頁執行購物車
    isCombo: {
      type: Boolean,
      default: () => false
    },
    // 是否按完購物車直接轉結帳頁
    isBuyRedirect: {
      type: Boolean,
      default: () => false
    },
    // 組合商品資料
    comboInfo: {
      type: Array,
      default: () => []
    },
    // 加入購物車樣式 分 多選擇 或 直接加入
    isSingleAddToCart: {
      type: Boolean,
      default: () => false
    }
  },
  created() {
    this.axios
      .get(`api/product/${this.pid}/detail?cid=${this.cid}`, {
        headers: {
          apiversion: '4'
        }
      })
      .then((res) => {
        const data = res.data;
        if (data.status === 1 && data.data.length > 0) {
          this.info = data.data[0];
          window.productsPool[this.pid] = this.info
          this.parseProductInfo()
        } else {
          this.$emit('closeBuyItemCnt')
          alert(data.message)
        }
      });
  },
  computed: {
    payMethodList() {
      return this.info.payMethodList.filter(v => ['PARTIAL_POINT', 'EXCHANGE_POINT'].includes(v) ? null : true)
    },
    soldoutCheck() {
      return !this.info.soldout
    },
    comboSoldoutCheck() {
      return !this.comboInfo.some(v => v.soldout)
    },
    buyTxt() {
      return this.info.productStatus.name
    }
  },
  methods: {
    parseProductInfo() {
      // 定義運送方式
      if (this.info.deliveryInfos && this.info.deliveryInfos.length > 0) {
        this.nowSelectedCartId = this.info.deliveryInfos[0].cartTypeId
        this.nowSelectedCartType = this.info.deliveryInfos[0].deliveryType
      }

      //設定初使預設付款方式
      if (this.info.payMethodList.length > 0) {
        this.nowSelectedPaymentType = this.info.payMethodList[0]
      }

      this.$emit("setCartType", this.info.cart_type);
      this.checkShowAddToCart()
    },
    swapCartType(id, type) {
      this.nowSelectedCartId = id
      this.nowSelectedCartType = type
    },
    // 檢查商品 判斷是否能夠加入購物車或是直接轉導至商品頁
    checkShowAddToCart() {
      const prodPageUrl = `/mobileweb/product?sid=${this.info.sid}&cid=${this.info.cid}&pid=${this.info.pid}`
      let pass = true

      // 非商品頁則需判斷條件是否可選擇加入購物車
      if (!this.isProdPage) {
        // 組合商品
        if (this.info.combined) {
          console.log(this.info.pid + '=組合商品')
          pass = false
        }
        // 18禁商品
        if (this.info.restricted) {
          console.log(this.info.pid + '=18禁商品')
          pass = false
        }

        // 員工限購
        if (this.info.purchaseLimitInfo) {
          if (!this.info.purchaseLimitInfo.isValidate || this.info.purchaseLimitInfo.locationChange) {
            console.log(this.info.pid + '=員工限購商品')
            pass = false
          }
        }
      }

      if (pass) {
        this.showDialog = true
      } else {
        this.closeDialog()
        window.location.href = prodPageUrl
      }
    },
    choosePaymentMehtod(txt) {
      this.nowSelectedPaymentType = txt
    },
    closeDialog() {
      this.$emit("closeBuyItem");
    },
    setSpecInfo(obj) {
      this.nowSelectedSpecId = obj.nowSelectedSpecId
      this.nowSelectedSpecName = obj.nowSelectedSpecName
      this.cartBuyQuantity = obj.cartBuyQuantity
    },
    goShop(redirectToShoppingCartPage) {
      // clean all
      this.cartData = [];
      const o = this.info;
      let product_type = 0

      /**
       * 0, "主商品"
          1, "組合母商品"
          2, "組合商品"
          3, "加購"
          4, "贈品" 
          5, "促銷商品" 
          6, "預購商品"
       */

      // 組合商品
      if (this.info.combined) {
        product_type = 1
      }

      // 促銷商品
      if (this.promotionId) {
        product_type = 5
      }

      // 預購商品 ptype: 6
      if (this.info.pre_order_type === 'PREORDER') {
        product_type = 6
      }

      const mainProductParams = {
        carttype: this.nowSelectedCartId,
        ptype: product_type,
        mid: this.mid,
        pid: o.pid,
        sid: o.sid,
        cid: o.cid,
        qty: +this.cartBuyQuantity,
        specid: +this.nowSelectedSpecId,
        payformRadio: "CASH",
        promoid: +this.promotionId,
        partialPoint: +null,
        partialPrice: +null,
        exchangePoint: +null,
        name: o.name,
        price: +o.price,
        specname: this.nowSelectedSpecName,
        imgpath: o.sample_images ? o.sample_images[0] : o.image_url,
      }
      const exProductParams = {}

      // 付款方式 - 幣+金 或 純幣
      if (['LIFE_PARTIAL_POINT', 'LIFE_EXCHANGE_POINT'].indexOf(this.nowSelectedPaymentType) > -1) {
        const reward = o.rewardPointInfo
        // 純幣
        if (this.nowSelectedPaymentType === 'LIFE_EXCHANGE_POINT') {
          exProductParams.lifeExchangePoint = reward.lifeExchangePoint
          exProductParams.lifePartialPoint = null
          exProductParams.lifePartialPrice = null
        }
        // 幣+金
        if (this.nowSelectedPaymentType === 'LIFE_PARTIAL_POINT') {
          exProductParams.lifeExchangePoint = null
          exProductParams.lifePartialPoint = reward.lifePartialPoint
          exProductParams.lifePartialPrice = reward.lifePartialPrice
        }

        exProductParams.payformRadio = this.nowSelectedPaymentType
      }

      // 主商品
      this.cartData.push(Object.assign(mainProductParams, exProductParams));

      // 組合商品
      if (this.cartCombo && this.cartCombo.length > 0) {
        if (this.cartCombo.some(v => v.isSelected === false)) {
          alert('請選擇組合商品規格')
          return false
        }
        this.cartCombo = this.cartCombo.filter(
          (item) => item.qty > 0
        );
        this.cartCombo.forEach((g) => {
          this.cartData.push({
            carttype: this.nowSelectedCartId,
            ptype: 2,
            sid: g.sid,
            pid: g.pid,
            cid: g.cid,
            mid: g.mid,
            ppid: o.pid,
            qty: 1,
            pqty: this.cartBuyQuantity,
            specid: g.specId,
            pspecid: this.nowSelectedSpecId,
            payformRadio: this.nowSelectedPaymentType,
            comboId: g.comboId
          });
        });
      }

      // 加價購
      if (this.cartAdditional && this.cartAdditional.length > 0) {
        this.cartAdditional = this.cartAdditional.filter(
          (item) => item.qty > 0
        );
        this.cartAdditional.forEach((g) => {
          this.cartData.push({
            carttype: this.nowSelectedCartId,
            ptype: 3,
            mid: this.mid,
            sid: o.sid,
            cid: o.cid,
            ppid: o.pid,
            pid: g.aid,
            qty: g.qty,
            pqty: this.cartBuyQuantity,
            specid: this.nowSelectedSpecId,
            pspecid: this.nowSelectedSpecId,
            payformRadio: this.nowSelectedPaymentType,
          });
        });
      }

      // 贈品
      if (o.gift && o.gift.length > 0) {
        o.gift.forEach((g) => {
          this.cartData.push({
            carttype: this.nowSelectedCartId,
            ptype: 4,
            mid: this.mid,
            sid: o.sid,
            cid: o.cid,
            ppid: o.pid,
            pid: g.aid,
            qty: g.max_qty > g.with_main_product_qty * this.cartBuyQuantity ?
              g.with_main_product_qty * this.cartBuyQuantity : g.max_qty,
            pqty: this.cartBuyQuantity,
            specid: this.nowSelectedSpecId,
            pspecid: this.nowSelectedSpecId,
            payformRadio: this.nowSelectedPaymentType,
          });
        });
      }

      if (!this.isAddToCartLoading) {
        this.addToCard(this.cartData, redirectToShoppingCartPage);
      }
    },
    addToCard(cartItem, redirectToShoppingCartPage) {
      this.isAddToCartLoading = true
      this.axios
        .post("shoppingcart", cartItem, {
          withCredentials: true,
        })
        .then((res) => {
          const data = res.data;
          if (data.response.status === "OK") {
            this.setGaECTracking()
            this.closeDialog()

            if (redirectToShoppingCartPage || this.isBuyRedirect) {
              window.location.href = '/mobileweb/checkout/step1?cartType=' + this.nowSelectedCartId
            } else {
              this.getCartInfo()
              const addCartSuccessMessage = new this.fridayComponent.Message({
                name: 'add-cart-success__message',
                className: 'friday',
                type: 'success',
                message: '加入購物車完成。'
              })
              addCartSuccessMessage.init()
              addCartSuccessMessage.show()
              if (!this.isSingleAddToCart) {
                this.$emit('bindGetShoppingCartHistory')
              }
            }
          } else {
            this.isAddToCartLoading = false
            const addCartErrorMessage = new this.fridayComponent.Message({
              name: 'add-cart-error__message',
              className: 'friday',
              type: 'warning',
              message: '加入購物車失敗。'
            })
            addCartErrorMessage.init()
            addCartErrorMessage.show()
            console.error(data.payload.errorUiMsg)
          }
        });
    },
    getCartInfo() {
      this.axios
        .get("shoppingcart")
        .then((res) => {
          const data = res.data;
          if (data.response.status === "OK") {
            document.querySelector('.new-cart span').innerText = data.payload.bagcount
          }
        });
    },
    getCombo(data) {
      this.cartCombo = data
      this.$emit('setCartComboData', data)
    },
    getAdditional(data) {
      this.cartAdditional = data;
    },
    setGaECTracking() {
      let products = this.cartData.map(v => {
        if (v.ptype === 0) {
          return {
            id: v.pid,
            item_price: v.price,
            name: v.name,
            price: v.price,
            quantity: v.qty,
            sku: v.pid
          }
        } else {
          return null
        }
      })
      products = products.filter(v => !!v)
      this.ga.ec.addtocart(products)
    },
    goNotification() {
      this.$emit('sendProductNotification', {
        pid: this.pid,
        specId: this.nowSelectedSpecId
      })
    }
  }
};
</script>

<style lang="scss">
@import "../../style/color";

.cart-header {
  padding: 10px 0 5px 15px;
  display: flex;
  align-items: center;

  img {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 5px;
    margin-right: 5px;
  }

  span {
    flex: 0 1 80%;
    font-size: 1.4rem;
    font-weight: normal;
    text-align: start;
  }
}

.cart-footer {
  border-top: 1px solid $web_border;
  padding: 8px;
  align-items: center;

  button {
    flex: 1 1 100%;
    padding: 8px 5px;
    border: none;
    border-radius: 10px;
    color: $white;
    font-size: 16px;
    text-align: center;
    background-color: $white;
  }

  .buyBtn {
    color: $red;
    border: 1px solid $red;
    margin-right: 5px;
  }

  .addCartBtn {
    background-color: $red;
  }

  .soldoutBtn {
    background-color: $web_border;
  }

  .confirmBtn {
    background-color: $red;
  }
}
</style>

<style lang="scss" scoped>
@import "../../style/color";

.cart-box {
  * {
    box-sizing: border-box;
  }

  ul {
    li {
      list-style-type: none;
      line-height: 40px;
      font-size: 1.6rem;

      span {
        padding-left: 5px;
      }

      .price {
        color: $red;
      }

      .price-discount {
        color: $special;
        font-size: 1.2rem;
      }

      .fcoin {
        color: $fcoin;
      }

      font {
        vertical-align: middle;
      }

      i {
        vertical-align: middle;
        margin-right: 3px;
      }
    }
  }

  .cart-box-content {
    max-width: 100%;
    width: 100%;
    flex-direction: column;
    height: 100%;
    flex: 1;
      flex-direction: column;
      overflow-y: auto;

    label {
      color: $web_minor;
      line-height: 50px;
    }

    .wrap {
      padding: 0 15px 0px 15px;
    }

    .items {
      .item {
        display: block;
        position: relative;
        margin-right: 10px;
        margin-bottom: 5px;
        padding: 5px 10px;
        border-radius: 8px;
        color: $web_main;
        border: 1px solid $web_border;
        font-size: 14px;
        word-break: break-all;
        word-wrap: break-word;

        &.disable {
          color: $web_border;
          border: 1px solid $web_border;
        }

        &.active {
          color: $red;
          border: 1px solid $red;
          border-bottom-right-radius: 0;
          background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDEyIDEyIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9IiNGMzRGNTkiIGQ9Ik0xMiAwdjEwYzAgMS4xMDUtLjg5NSAyLTIgMkgwTDEyIDB6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNTYuMDAwMDAwLCAtNTQ4LjAwMDAwMCkgdHJhbnNsYXRlKDAuMDAwMDAwLCAyMC4wMDAwMDApIHRyYW5zbGF0ZSgyMC4wMDAwMDAsIDQ2NS4wMDAwMDApIHRyYW5zbGF0ZSgwLjAwMDAwMCwgNDUuMDAwMDAwKSB0cmFuc2xhdGUoMzYuMDAwMDAwLCAxOC4wMDAwMDApIi8+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0xMC4zODYgNi4wMDJjLS4xNTYuMDExLS4zLjA4Ny0uNDA0LjIxbC0yLjI0NSAyLjU4LTEuMjM1LTEuMTE3Yy0uMjQ0LS4yMzUtLjYyMi0uMjE3LS44NDUuMDQtLjIyMy4yNTgtLjIwNi42NTguMDM4Ljg5M2wuMDMuMDI3TDcuNCAxMC4xNWMuMjQ1LjIyMi42MTIuMi44My0uMDVsMi42MzUtMy4wMzJjLjIyOC0uMjUzLjIxOS0uNjUzLS4wMi0uODkzLS4xMjMtLjEyNC0uMjktLjE4Ny0uNDYtLjE3MyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTU2LjAwMDAwMCwgLTU0OC4wMDAwMDApIHRyYW5zbGF0ZSgwLjAwMDAwMCwgMjAuMDAwMDAwKSB0cmFuc2xhdGUoMjAuMDAwMDAwLCA0NjUuMDAwMDAwKSB0cmFuc2xhdGUoMC4wMDAwMDAsIDQ1LjAwMDAwMCkgdHJhbnNsYXRlKDM2LjAwMDAwMCwgMTguMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==') right bottom no-repeat
        }
      }
    }
  }
}
</style>
