<template>
<div>
  <restrict
    v-if="isShowRestrict"
    v-on:passRestrictOkay="passRestrictOkay" />
  <downloadapp v-on:downloadAppOpened="downloadAppOpened" />
  <div class="product">
    <!-- 選單 天 -->
    <navigation
      :isShowRedTop="isShowRedTop"
      :windowY="windowY"
      v-on:stopBodyScroll="stopBodyScroll"
      v-on:directBestbuy="directBestbuy"
      :isDownloadAppOpened="isDownloadAppOpened" />

    <!-- 快捷TAB -->
    <headtabs
      :hasRelateProduct="relatedProducts.length > 0"
      :additional="pInfo.additional"
      :isDownloadAppOpened="isDownloadAppOpened"
      :windowY="windowY" />

    <!-- 導覽列 -->
    <breadcrumb
      :cid="cid"
      :mid="mid"
      :sid="sid"
      :pid="pid"
      v-on:getCatalogLevel="getCatalogLevel" />

    <!-- 商品圖 -->
    <mainimage
      :images="pInfo.sample_images"
      :video="pInfo.videoUrl" />

    <!-- 商品價格 -->
    <basicinfo
      :data="pInfo"
      v-on:stopBodyScroll="stopBodyScroll"
      :tags="pInfo.tags" />

    <!-- 遠傳幣回饋 -->
    <div
      v-if="hasRebate && pInfo.vipRebateRate > 0"
      class="product-rebate">
      <span>
        再享回饋
        <font>{{ pInfo.vipRebateRate }}%</font>
      </span>
      <i class="rebate"></i>
    </div>
    <div v-if="hasRebate && pInfo.vipRebateRate > 0" class="gap-line"></div>

    <div v-if="showOnLighthouse">
      <!-- 商品資訊 -->
      <basicintro
        v-if="pInfo.pid"
        :intro="pInfo.intro"
        :insurance="pInfo.insurance"
        :discount="pInfo.discount"
        :price="parseInt(pInfo.price)" />

      <!-- 活動資訊、折價券 -->
      <campaign
        v-if="pInfo.pid"
        :data="pInfo" />

      <!-- 組合商品 -->
      <comboCnt
        v-if="comboInfo.length > 0"
        :data="comboInfo"
        :cartComboData="cartComboData"
        v-on:openCartUI="goToCart" />

      <!-- 贈品 -->
      <gift
        v-if="productGift"
        :data="productGift"
        :noticeMsg="pInfo.noticeMsg" />

      <!-- 商品規格、運送方式、付款方式、促銷活動 -->
      <shipway
        :payment="pInfo.payment"
        :pre_order_info="pInfo.pre_order_info"
        :deliveryInfos="pInfo.deliveryInfos"
        v-on:openCartUI="goToCart" />

      <!-- 商品說明 -->
      <basicadv
        v-if="pInfo.pid"
        :pid="pid"
        :cid="cid"
        :sid="sid"
        :mid="mid" />

      <!-- 加購商品 -->
      <additional
        :itemData="pInfo.additional"
        v-if="pInfo.additional && pInfo.additional.length > 0" />

      <!-- 購物須知 -->
      <shoppingguide
        v-if="pInfo.pid"
        :guideurl="pInfo.guide"
        v-on:stopBodyScroll="stopBodyScroll" />

      <!-- 溫馨提醒 -->
      <reminder
        v-if="pInfo.pid"
        :pid="pInfo.pid"
        :cid="pInfo.cid" />

      <!-- 相關商品 -->
      <div
        class="tab-section"
        data-tab="推薦"></div>
      <relatedCnt
        :sid="sid"
        :cid="cid"
        :pid="pid"
        @setRelateProduct="setRelateProduct" />
      <!-- 相關商品 -->
      <recommandation
        :sid="sid"
        :cid="cid"
        :pid="pid" />

    </div>
    <div v-if="isProductInfoLoaded">
      <div
        v-if="!pInfo.soldout && !isPromotionProduct && !comboInfo.length && isStartSold"
        :class="[
            'd-flex bottom-btn',
            { combinedNotAchieve: combinedPdBtn == false },
          ]">
        <span class="flex-auto wish-box">
          <i :class="['wish', { active: wishActive }]" @click="addWish"></i>
        </span>
        <span class="flex-auto btns btn-1">
          <button v-if="isDiscountProduct" @click="goToCart(true)">點我再折扣</button>
          <button v-else @click="goToCart(true)">立刻買</button>
        </span>
        <span class="flex-auto btns btn-2">
          <button @click="goToCart()">加入購物車</button>
        </span>
      </div>
      <div
        v-else-if="!pInfo.soldout && !isPromotionProduct && comboInfo.length > 0 && !comboSoldoutCheck && isStartSold"
        :class="[
            'd-flex bottom-btn',
            { combinedNotAchieve: combinedPdBtn == false },
          ]">
        <span class="flex-auto wish-box">
          <i :class="['wish', { active: wishActive }]" @click="addWish"></i>
        </span>
        <span class="flex-auto btns btn-1">
          <button @click="goToCart(true)">立刻買</button>
        </span>
        <span class="flex-auto btns btn-2">
          <button @click="goToCart()">加入購物車</button>
        </span>
      </div>
      <div v-else-if="!pInfo.soldout && isPromotionProduct && isStartSold">
        <div :class="[
              'd-flex bottom-btn',
              { combinedNotAchieve: combinedPdBtn == false },
            ]">
          <span class="flex-auto wish-box">
            <i :class="['wish', { active: wishActive }]" @click="addWish"></i>
          </span>
          <span class="flex-auto btns btn-1">
            <button @click="goToCart(true)">立刻買</button>
          </span>
          <span class="flex-auto btns btn-2">
            <button v-if="isPromotionProductNeedShipFee" @click="goSaleArea()">前往湊免運</button>
            <button v-else @click="goSaleArea()">前往活動專區</button>
          </span>
        </div>
      </div>
      <div
        v-else-if="!isStartSold"
        class="d-flex bottom-btn sold-out">
        <span class="flex-auto wish-box">
          <i :class="['wish', { active: wishActive }]" @click="addWish"></i>
        </span>
        <span class="flex-auto btns btn-1">
          <button>尚未開賣</button>
        </span>
      </div>
      <div
        v-else
        class="d-flex bottom-btn sold-out">
        <span class="flex-auto wish-box">
          <i :class="['wish', { active: wishActive }]" @click="addWish"></i>
        </span>
        <span class="flex-auto btns btn-1">
          <button @click="goToCart()">補貨中，貨到通知</button>
        </span>
      </div>
    </div>

    <buyitem
      v-if="showCartDialog"
      :pid="pid"
      :cid="cid"
      :mid="mid"
      :isProdPage="!fullInfoStyle"
      :isBuyRedirect="isBuyRedirect"
      :comboInfo="comboInfo"
      v-on:closeBuyItem="closeBuyItem"
      v-on:sendProductNotification="sendProductNotification"
      v-on:setCartComboData="setCartComboData" />

    <div v-if="showDialog">
      <fullscreendialog
        :isFullscreen="true"
        :additionalGift="additionalGift"
        :closeDialog="closeDialog"
        v-on:closeDialog="closeDialog">
        <template v-slot:header>商品說明</template>
        <template v-slot:body>
          <div class="container">
            <div v-if="Object.prototype.hasOwnProperty.call(dialogData, 'name')">
              <img :src="dialogData.imgUrl" alt="" />
              <h3>{{ dialogData.name }}</h3>
            </div>
            <div
              v-else-if="additionalGift == 'gift'"
              class="pd-list-items">
              <!-- <h3
              v-for="(item,index) in pInfo.gift"
                :key="index">{{item.name}}</h3> -->
              <div
                v-for="(item, index) in pInfo.gift"
                :key="index"
                @click="productDetail(item.image_url, item.name)">
                <div class="flex-container">
                  <div class="flexBox">
                    <img :src="item.image_url" alt="" />
                  </div>
                  <div class="flexBox">
                    <h3>{{ item.name }}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-else
              v-for="(item, index) in pInfo.additional"
              :key="index"
              class="pd-list-items"
              @click="productDetail(item.image_url, item.name)">
              <div class="flex-container">
                <div class="flexBox">
                  <img :src="item.image_url" alt="" />
                </div>
                <div class="flexBox">
                  <h3>{{ item.name }}</h3>
                  <h3 class="price">{{ item.special_price }}</h3>
                </div>
              </div>
            </div>
          </div>
        </template>
      </fullscreendialog>
    </div>
  </div>
</div>
</template>

<script>
import downloadapp from "./components/common/downloadapp.vue"; // 頁面最上方的app下載提示
import navigation from "./components/common/navigationFix.vue"; // 共用天的導覽列
import headtabs from "./components/product/headtabs.vue"; // 簡介、詳情 切換
import breadcrumb from "./components/product/breadcrumb.vue"; // 麵包屑
import mainimage from "./components/product/mainimage.vue"; // 商品主圖
import basicinfo from "./components/product/basicinfo.vue"; // 基本資訊、價格
import campaign from "./components/product/campaign.vue"; // 折價券 活動
import gift from "./components/product/gift.vue"; // 贈品
import additional from "./components/product/additional.vue"; // 加購
import comboCnt from "./components/product/comboProducts.vue"; // 組合商品
import basicintro from "./components/product/basicintro.vue"; // 券、點我再折icon、基本簡介、保險
import shipway from "./components/product/shipway.vue"; // 選規格、運送方式、付款方式
import basicadv from "./components/product/basicadv.vue"; // 商品說明
import shoppingguide from "./components/product/shoppingguide.vue"; // 購物須知
import reminder from "./components/product/reminder.vue"; // 溫馨小提醒
import relatedCnt from "./components/product/relatedProducts.vue"; // 相關商品
import recommandation from "./components/product/recommandation.vue"; // 推薦商品
import fullscreendialog from "./components/common/fullscreenDialog.vue"; // 全畫面蓋版提示框
import buyitem from "./components/product/buyitem";
import restrict from "./components/product/restrict.vue"; // 18禁提醒

export default {
  name: "Product",
  components: {
    downloadapp,
    navigation,
    headtabs,
    breadcrumb,
    mainimage,
    basicinfo,
    campaign,
    gift,
    comboCnt,
    basicintro,
    shipway,
    basicadv,
    shoppingguide,
    reminder,
    relatedCnt,
    recommandation,
    fullscreendialog,
    additional,
    buyitem,
    restrict
  },
  data() {
    return {
      showOnLighthouse: true,
      pInfo: {},
      comboInfo: [],
      productGift: [],
      cid: null,
      mid: null,
      pid: null,
      sid: null,
      currentY: 0,
      windowY: 0,
      hasRebate: false,
      isProductInfoLoaded: false,
      isSoldOut: false,
      isShowRedTop: true,
      isStopScrolling: false,
      isDownloadAppOpened: false,
      isBuyRedirect: false,
      directJumpToBestBuy: false,
      relatedProducts: [],
      combinedPdBtn: true,
      catalogLevel: "",
      showDialog: false,
      showCartDialog: false,
      fullInfoStyle: false,
      wishActive: false,
      cartComboData: [],
      isShowRestrict: false
    };
  },
  created() {
    // save product api data
    window.productsPool = {};
    this.showOnLighthouse = this.lighthouse ? false : true;
    window.addEventListener(
      "scroll",
      () => {
        const wy = window.scrollY;
        this.windowY = wy;
        // this.currentY = wy !== 70 && wy !== 0 ? wy : this.currentY;
        if (this.windowY === 0) {
          this.currentY = 0;
        } else {
          this.currentY = this.windowY;
        }
        this.isShowRedTop = wy > 0 ? false : true;
      }, {
        passive: true,
      }
    );

    const {
      pid,
      cid,
      mid,
      sid
    } = this.tools.urlSearchToObj();
    this.sid = parseInt(sid);
    this.pid = parseInt(pid);
    this.mid = parseInt(mid);
    this.cid = parseInt(cid);

    // check wish record
    this.checkWishStatus();

    // member cookie
    let loginInfo = null
    const feecInfo = this.$cookies.get("FEEC-B2C-INFO");
    if (feecInfo) {
      loginInfo = feecInfo.data
      
      // 是否為員工可以返利
      if (loginInfo?.rebateInfo?.hasRebate) {
        this.hasRebate = true
      }
    }

    // get product info
    const apiHeaders = {
      apiversion: "4"
    }

    // localhost cors issue.
    if (loginInfo && loginInfo.tid && !/localhost/i.test(location.host)) {
      apiHeaders['memberId'] = loginInfo.tid
    }

    this.axios
      .get(`api/product/${pid}/detail?cid=${cid}`, {
        headers: apiHeaders
      })
      .then((res) => {
        const data = res.data;
        this.isProductInfoLoaded = true

        if (data.status === 1 && data.data.length > 0) {
          const productInfo = data.data[0];

          this.ga.ec.viewcontent([{
            name: productInfo.name,
            price: productInfo.price,
            quantity: 1,
            sku: productInfo.pid,
            id: productInfo.pid,
            item_price: productInfo.price
          }])

          this.mid = productInfo.mid ? parseInt(productInfo.mid) : 1

          this.seo.product(productInfo)

          // check purchaseLimit 限購欄位處理
          if (!productInfo.purchaseLimitInfo?.isValidate && location.hostname !== 'localhost') {
            this.doPurchaseLimitInfo(productInfo.purchaseLimitInfo)
          }

          // check 18 restrict
          const passRestrict = this.$cookies.get("r18");
          if (productInfo.restricted && !passRestrict) {
            this.isShowRestrict = true
          }

          window.productsPool[pid] = productInfo;
          this.pInfo = productInfo;
          this.isSoldOut = productInfo.soldout;
          if (this.pInfo.combined) {
            this.combinedPdBtn = false;
            this.getProductComboInfo(this.pInfo.pid)
          }

          //活動資料處理
          // 一般贈品
          if (productInfo.gift) {
            productInfo.gift.forEach((v) => {
              this.productGift.push({
                giftType: 1,
                list_name: v.name,
                qty: v.with_main_product_qty,
                soldout: v.max_qty === 0,
                details: [{
                  gift: [{
                    name: v.name,
                    imageUrl: v.image_url,
                    soldOut: v.max_qty === 0,
                    maxQty: v.with_main_product_qty,
                  }, ],
                }, ],
              });
            });
          }
          // 活動贈品
          if (productInfo.promotionInfo) {
            productInfo.promotionInfo.forEach((v) => {
              if (v.promotionType === 3) {
                this.productGift.push({
                  giftType: 3,
                  list_name: v.promotionName,
                  endTime: v.promotionEndTime,
                  description: v.description,
                  qty: v.with_main_product_qty,
                  soldout: v.allSoldOut,
                  details: v.promotionDetail,
                });
              }
            });
          }
        } else {
          this.pInfo = {};
        }
      });

    // 判斷是否執行過貨到通知
    const isNotify = window.sessionStorage.getItem('productNotification')
    if (isNotify) {
      this.sendProductNotification(JSON.parse(isNotify))
    }
  },
  methods: {
    goToCart(directBuy) {
      this.isBuyRedirect = directBuy ? true : false;
      this.showCartDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
    },
    productDetail(img, name) {
      this.showDialog = true;

      this.dialogData = {
        name: name,
        imgUrl: img,
      };
    },
    // 限購欄位處理
    doPurchaseLimitInfo(data = null) {
      // const data = {
      //   "showMessage": "此為金卡會員專區，歡迎升級金卡會員!",
      //   "redirectUrl": "https://shopping.friday.tw/event/2018mem/11/goldencard/",
      //   "redirectText": "前往升級~",
      //   "locationChange": false,
      //   "isValidate": false
      // }
      if (data) {
        if (data.locationChange) {
          if (data.redirectUrl.indexOf("login")) {
            window.location.href = "/ec2/login?requestURL=" + encodeURIComponent(window.location.href);
          } else {
            window.location.href = data.redirectUrl;
          }
        } else if (data.showMessage !== '') {
          const btns = []
          btns.push({
            name: 'close',
            className: data.redirectUrl != null && data.redirectUrl != "" ? "mr-1" : 'primary',
            text: '回首頁',
            action: function action() {
              return window.location.href = "/";
            }
          });
          if (data.redirectUrl != null && data.redirectUrl != "") {
            btns.push({
              name: 'upgrade',
              className: 'primary',
              text: data.redirectText,
              action: function action() {
                return window.location.href = data.redirectUrl;
              }
            });
          }
          const purchaseLimitMsgT = this.fridayComponent.MessageBox.template.fridayMessage({
            name: 'friday_message-box',
            message: data.showMessage,
            btnPos: 'right',
            btns: btns
          });
          const purchaseLimitMsgB = new this.fridayComponent.MessageBox(purchaseLimitMsgT);
          purchaseLimitMsgB.isTriggerCloseOverlay = false;
          purchaseLimitMsgB.init();
          purchaseLimitMsgB.show();
        }
      }
    },
    // 組合商品的購物車資料
    setCartComboData(data) {
      this.cartComboData = data;
    },
    // 取得組合商品資料
    getProductComboInfo(pid) {
      this.axios
        .get(`api/product/${pid}/combo`, {
          headers: {
            apiversion: "4",
          },
        })
        .then((res) => {
          const data = res.data;
          if (
            data.status === 1 &&
            data.data.length > 0 &&
            data.data[0] &&
            data.data[0].products
          ) {
            this.comboInfo = data.data[0].products;
          }
        });
    },
    goSaleArea() {
      const promotionInfo = this.pInfo.promotionInfo.find(v => v.promotionType === 1);
      window.location.href = promotionInfo.promotionUrl;
    },
    getCatalogLevel(level) {
      this.catalogLevel = level;
    },
    combinedAchieve(i) {
      i ? (this.combinedPdBtn = true) : (this.combinedPdBtn = false);
    },
    stopBodyScroll(action, jumpCurrentY = true) {
      const body = document.body;
      if (!this.isStopScrolling) {
        body.style = "padding:0;margin:0;height:100%;overflow:hidden";
        this.isStopScrolling = !this.isStopScrolling;
      }
      if (action === "close") {
        body.style = "padding:0;margin:0;overflow:scroll";
        if (jumpCurrentY) {
          setTimeout(() => {
            // window.scrollTo(0, 0);
            window.scrollTo(0, this.currentY);
          }, 0);
        }
        this.isStopScrolling = false;
      }
    },
    downloadAppOpened() {
      this.isDownloadAppOpened = !this.isDownloadAppOpened;
    },
    directBestbuy() {
      this.directJumpToBestBuy = true;
      setTimeout(() => {
        this.directJumpToBestBuy = false;
      }, 100);
    },
    closeBuyItem() {
      this.showCartDialog = false;
    },
    checkWishStatus() {
      const ticket = this.$cookies.get("FEEC-B2C-TICKET");
      if (ticket) {
        this.axios
          .get(`api/collection/product/status?productId=${this.pid}`, {
            headers: {
              authorization: "Bearer" + ticket,
            },
          })
          .then((res) => {
            const data = res.data;
            if (data.code === 1) {
              const payload = data.payload;
              const status = payload[0].collectionStatusList;
              for (let i = 0; i < status.length; i++) {
                if (status[i].pid === this.pid && status[i].isCollected) {
                  this.wishActive = true;
                }
              }
            }
          });
      }
    },
    addWish() {
      const ticket = this.$cookies.get("FEEC-B2C-TICKET");
      if (ticket) {
        if (!this.wishActive) {
          this.axios
            .post(`api/collection/product?productId=${this.pid}`, null, {
              headers: {
                authorization: "Bearer" + ticket,
              },
            })
            .then((res) => {
              const data = res.data;
              if (data.code === 1) {
                this.wishActive = true;
              } else if (data.code === 90401) {
                const Message = window.fridayComponent.Message
                var registerMessage = new Message({
                  name: 'register_message',
                  className: 'friday',
                  type: 'warning',
                  message: '請先登入會員！'
                });
                registerMessage.init()
                registerMessage.show()
              }
            });
        } else {
          this.delWish()
        }
      } else {
        window.location.href = this.configs.loginUrl();
      }
    },
    delWish() {
      const ticket = this.$cookies.get("FEEC-B2C-TICKET");
      this.axios
        .delete(`api/collection/product?productId=${this.pid}`, {
          headers: {
            authorization: "Bearer" + ticket,
          },
        })
        .then((resDel) => {
          const data = resDel.data;
          if (data.code === 1) {
            this.wishActive = false;
          }
        });
    },
    sendProductNotification(notifyData) {
      const ticket = this.$cookies.get("FEEC-B2C-TICKET");
      if (ticket) {
        this.axios
          .get('api/product/notification', {
            params: notifyData,
            headers: {
              authorization: "Bearer" + ticket,
              requestId: new Date().getTime(),
            },
          })
          .then((res) => {
            const data = res.data;
            if (data.code === 1) {
              const Message = window.fridayComponent.Message
              var registerMessage = new Message({
                name: 'register_message',
                className: 'friday',
                type: 'success',
                message: '已登記貨到通知'
              });
              registerMessage.init()
              registerMessage.show()
              window.sessionStorage.removeItem('productNotification')
            } else if (data.code === 90401) {
              window.sessionStorage.setItem('productNotification', JSON.stringify(notifyData))
              window.location.href = this.configs.loginUrl();
            }
          });
      } else {
        window.sessionStorage.setItem('productNotification', JSON.stringify(notifyData))
        window.location.href = this.configs.loginUrl();
      }
    },
    setRelateProduct(data) {
      this.relatedProducts = data;
    },
    passRestrictOkay() {
      this.isShowRestrict = false
    }
  },
  computed: {
    comboSoldoutCheck() {
      return this.comboInfo.some(v => v.soldout)
    },
    isPromotionProduct() {
      return this.pInfo.promotionInfo?.some(v => v.promotionType === 1)
    },
    isPromotionProductNeedShipFee() {
      const o = this.pInfo.promotionInfo?.some(v => v.promotionType === 1)
      if (!o) return false
      return this.pInfo.promotionInfo?.some(v => v.shipType === 1)
    },
    isDiscountProduct() {
      return this.pInfo?.productStatus ? this.pInfo.productStatus.id === 5 : false
    },
    isStartSold(){
      let startDate = this.tools.apiTimeFormat(this.pInfo.startSaleTime);
      let isStartSold = this.pInfo.productStatus.id !== 2 || new Date().getTime() > startDate.getTime() 
      console.log(isStartSold);
      return isStartSold
    }
  }
};
</script>

<style lang="scss">
@import "./style/reset.module.scss";
@import "./style/flex.module.scss";
@import "./style/rwd.module.scss";
@import "./style/icons.module.scss";
@import "./style/global.module.scss";
@import "./style/product.module.scss";
@import "./style/color.scss";

html {
  scroll-behavior: smooth;
}

.product {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0 0 60px 0;
  box-sizing: border-box;
  position: relative;
  color: #3c3c3c;

  ul {
    li {
      list-style-type: none;
    }
  }

  .control-bar {
    position: relative;

    .control-bar-title {
      font-size: 1.4rem;
      padding: 10px 20px;
    }
  }

  .gift-box,
  .additional-box {
    box-sizing: border-box;
    font-size: 1.4rem;
    white-space: nowrap;

    .items {
      width: 100%;
      overflow-x: scroll;
      overflow-y: hidden;
      padding-left: 20px;
      box-sizing: border-box;

      .items-list {
        position: relative;
        display: inline-block;
        padding: 0 5px 10px 5px;

        &.sold-out {
          .sold-out-txt {
            display: block;
          }

          .price {
            color: $sliver;
          }
        }

        font {
          display: block;
        }

        img {
          border: 1px solid $web_border;
          width: 90px;
          height: 90px;
          border-radius: 10px;
          background-color: $background;

          &.sold-out {
            opacity: 0.5;
          }
        }

        .sold-out-txt {
          display: none;
          position: absolute;
          left: 20px;
          top: 15px;
          width: 60px;
          height: 60px;
          line-height: 60px;
          border-radius: 50px;
          background-color: $black;
          opacity: 0.6;
          text-align: center;

          font {
            font-size: 1.3rem;
            color: $white;
          }
        }
      }
    }
  }

  .bottom-btn {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $white;
    border-top: 1px solid $web_border;

    &.combinedNotAchieve {
      div:first-child {
        button {
          border: solid 1px $web_border;
          color: $alto;
        }
      }

      div:last-child {
        button {
          border: solid 1px $web_border;
          background-color: $alto;
        }
      }
    }

    .wish-box {
      display: flex;
      flex: 1 1 16%;
      justify-content: center;
      align-items: center;
    }

    button {
      width: 100%;
      height: 40px;
      text-align: center;
      font-size: 1.6rem;
      font-weight: 500;
      border-radius: 10px;
    }

    .btns {
      flex: 1 1 42%;
      line-height: 40px;
      text-align: center;
      padding: 9px 9px 9px 0;
      box-sizing: border-box;
    }

    .btn-1 {
      button {
        color: $red;
        background-color: $white;
        border: 1px solid $red;
      }
    }

    .btn-2 {
      button {
        color: $white;
        background-color: $red;
        border: 0;
      }
    }

    &.sold-out {
      .btns {
        flex: 1 1 84%;
      }
      .btn-1 {
        button {
          color: $white;
          background-color: $special;
          border: unset;
        }
      }
    }
  }

  .pd-list-items {
    color: $special;

    overflow: hidden;

    .flex-container {
      display: flex;
      max-height: 100px;
      margin-bottom: 10px;
      background-color: $white;
      border-radius: 10px;

      .flexBox {
        padding: 0;

        &:first-child {
          width: 30%;
          overflow: hidden;
          border-radius: 10px;

          img {
            width: 100%;
            height: 100%;
            max-height: 100px;
          }
        }

        &:nth-child(2) {
          width: 70%;
          padding: 5px 0 5px 10px;
          text-align: left;
          position: relative;

          h3 {
            color: #333;
            font-size: 1.4rem;
            max-width: 191px;

            &.price {
              color: $red;
              font-size: 2.2rem;

              &::before {
                content: "$";
                font-size: 1.4rem;
              }
            }
          }
        }
      }
    }
  }
}

.product-rebate {
  padding: 10px 20px;
  font-size: 1.6rem;

  span {
    vertical-align: middle;
  }

  font {
    color: #ffaf00;
    margin-right: 5px;
  }
}

.product-component-container {
  padding: 15px 20px;
  font-size: 1.4rem;
}

.product-component-blocks {
  > div {
    display: flex;
    position: relative;
    padding: 5px 0;
  }

  label {
    width: 20%;
    color: $sliver;
  }

  span {
    flex: 0 1 12%;
  }
}
</style>

<style lang="scss">
.arrow-right {
  position: absolute;
  right: 20px;
  top: 12px;

  &.inline {
    right: 0;
    top: 8px;
  }
}
</style>
