<template>
<div>
  <downloadapp v-on:downloadAppOpened="downloadAppOpened" />
  <navigation :isShowRedTop="isShowRedTop" :windowY="windowY" v-on:stopBodyScroll="stopBodyScroll" :isDownloadAppOpened="isDownloadAppOpened" />
  <div class="QADetail">
    <div class="QADetail__header">
      <span class="QADetail__header-icon"></span>
      <p class="QADetail__header-content notice">注意事項：</p>
      <p class="QADetail__header-content">• 問答中心將保留您6個月內的詢問與回覆紀錄。</p>
    </div>
    <div v-if="data" class="QADetail__info">
      <div v-for="(item , i) in data" :key="i" class="orderItem">
        <template v-if="item.orderId !== null && item.orderId !== '' && (item.products && item.products.length > 0)">
          <div class="orderDetail">
            <div class="orderDetail__orderInfo">
              <p class="orderDetail__orderInfo-num">訂單編號：{{item.orderId}}</p>
              <a class="orderDetail__orderInfo-url" :href="`/mobileweb/member/ViewMyOrderMenuDetail?module=detail&dealId=${item.dealId}&orderId=${item.orderId}`">訂單明細</a>
            </div>
            <div class="orderDetail__productInfo">
              <div class="orderDetail__productInfo-img">
                <img :src="item.products[0].productImage">
              </div>
              <div class="orderDetail__productInfo-name">
                <p>{{item.products[0].productName}}</p>
                <div>
                  <p>{{item.products[0].productSpec}}</p>
                  <p>x {{item.products[0].proudctQuantity}}</p>
                </div>
              </div>
            </div>
          </div>
          <transition name="slide">
            <ul v-if="isOtherProductShow" class="otherProduct">
              <template v-for="(product , index) in item.products">
                <template v-if="index!==0">
                  <template v-if="product.productType !== 'GIFT'">
                    <li class="orderDetail" :key="index">
                      <div class="orderDetail__productInfo">
                        <div class="orderDetail__productInfo-img">
                          <img :src="product.productImage">
                        </div>
                        <div class="orderDetail__productInfo-name">
                          <span>
                            <p v-if="product.productType ==='ACC'" class="red">(加購品)</p>
                            <p>{{product.productName}}</p>
                          </span>
                          <div>
                            <p>{{product.productSpec}}</p>
                            <p>x {{product.proudctQuantity}}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </template>
                  <li v-else :key="index" class="extraDetail">
                    <span>贈品</span>
                    <p class="extraDetail__name">{{product.productName}}</p>
                    <p>x {{product.proudctQuantity}}</p>
                  </li>
                </template>
              </template>
            </ul>
          </transition>
          <div class="otherProductCtrlBtn" v-if="item.products.length > 1" @click="otherProductBtnClick">
            <span>{{isOtherProductShow?`收起全部商品`:`看全部${item.products.length}件商品`}}</span>
          </div>
        </template>
        <template v-else-if="item.orderId !== null && item.orderId !== '' && ( !item.products || item.products.length === 0)">
          <div class="orderDetail">
            <div class="orderDetail__orderInfo">
              <p class="orderDetail__orderInfo-num">訂單編號：{{item.orderId}}</p>
            </div>
            <div class="orderDetail__productInfo">
              <div class="orderDetail__productInfo-img">
                <img src="./images/icons/QAImg.svg">
              </div>
            </div>
          </div>
        </template>
        <div v-if="item.caseNo != null" class="dialog">
          <div class="dialog__title">
            <div class="case">
              <span class="case__num">案件編號 {{item.caseNo}}</span>
            </div>
            <span class="date">{{item.createTime}}</span>
          </div>
          <div class="dialog__content">
            <p class="client">{{item.questionDesc}}</p>
            <div v-if="item.replyRecord === null || item.replyRecord[0].replyTime === null" class="service">
              <div class="service__title">
                <span class="service__title-icon"></span>
                <p>客服回覆</p>
                <p class="service__title-date">{{item.createTime}}</p>
              </div>
              <p>我們已經收到您的問題，正在為您處理中，請稍候。</p>
            </div>
            <template v-else>
              <div v-if="item.replyRecord[0].replyTime !== null" class="service">
                <div class="service__title">
                  <span class="service__title-icon"></span>
                  <p>客服回覆</p>
                  <p class="service__title-date">{{item.replyRecord[0].replyTime}}</p>
                </div>
                <p>{{item.replyRecord[0].replyContent}}</p>
              </div>
              <transition name="slide">
                <div v-if="isOtherDialogShow && item.replyRecord.length > 1" class="otherService" ref="otherService">
                  <template v-for="(replyRecord , index) in item.replyRecord">
                    <div v-if="replyRecord.replyTime !== null && index!== 0" class="service" :key="index">
                      <div class="service__title">
                        <span class="service__title-icon"></span>
                        <p>客服回覆</p>
                        <p class="service__title-date">{{replyRecord.replyTime}}</p>
                      </div>
                      <p>{{replyRecord.replyContent}}</p>
                    </div>
                  </template>
                </div>
              </transition>
            </template>
          </div>
          <div v-if="item.replyRecord !== null && item.replyRecord.length>1" class="dialog__otherBtn" @click="otherDialogBtnClick">
            <p>全部回覆</p>
            <img v-if="!isOtherDialogShow" src="./images/icons/arrow-down.svg" alt="">
            <img v-else src="./images/icons/arrow-up.svg" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="QADetail__askBtn">
      <a :href="`/mobileweb/CustomerService?orderId=${tools.urlSearchToObj().orderId}`">我要發問</a>
    </div>
  </div>
</div>
</template>

<script>
import downloadapp from "./components/common/downloadapp.vue"; // 頁面最上方的app下載提示
import navigation from "./components/common/navigationFix.vue"; // 共用天的導覽列

export default {
  name: "QADetail",
  data() {
    return {
      isDownloadAppOpened: false,
      isShowRedTop: true,
      windowY: 0,
      isStopScrolling: false,
      data: null,
      isOtherProductShow: false,
      isOtherDialogShow: false
    };
  },
  components: {
    downloadapp,
    navigation,
  },
  methods: {
    downloadAppOpened() {
      this.isDownloadAppOpened = !this.isDownloadAppOpened;
    },
    stopBodyScroll(action, jumpCurrentY = true) {
      const body = document.body;
      if (!this.isStopScrolling) {
        body.style = "padding:0;margin:0;overflow:hidden;height:100%";
        this.isStopScrolling = !this.isStopScrolling;
      }
      if (action === "close") {
        body.style = "padding:0;margin:0;";
        if (jumpCurrentY) {
          setTimeout(() => {
            window.scrollTo(0, this.currentY);
          }, 0);
        }
        this.isStopScrolling = false;
      }
    },
    getQAData() { // 取得api原始資料
      let searchObj = this.tools.urlSearchToObj()
      const ticket = this.$cookies.get('FEEC-B2C-TICKET')
      if (ticket) {
        this.axios.get(`api/case/detail?orderId=${searchObj.orderId}&caseNo=${searchObj.caseNo}`, {
          headers: {
            'authorization': 'Bearer' + ticket
          }
        }).then(res => {
          const data = res.data;
          if (data.code === 1 && data.payload) {
            this.data = data.payload;
          }
        }).catch((err) => {
          console.error(err);
        });
      }
    },
    otherProductBtnClick() {
      this.isOtherProductShow = !this.isOtherProductShow
    },
    otherDialogBtnClick() {
      this.isOtherDialogShow = !this.isOtherDialogShow
    },
  },
  created() {
    window.addEventListener(
      "scroll",
      () => {
        const wy = window.scrollY;
        this.windowY = wy;
        this.currentY = wy !== 70 && wy !== 0 ? wy : this.currentY;
        this.isShowRedTop = wy > 0 ? false : true;
      }, {
        passive: true,
      }
    );
    this.getQAData()
  },
};
</script>

<style lang="scss">
@import "./style/reset.module.scss";
@import "./style/flex.module.scss";
@import "./style/rwd.module.scss";
@import "./style/icons.module.scss";
@import "./style/global.module.scss";
</style>

<style lang="scss" scoped>
@import "./style/_color.scss";
.QADetail {
  background: $background;
  width: 100%;
  color: $grayapprox;

  &__header {
    background: $white;
    font-size: 1.2rem;
    padding: 9px 8px;
    box-sizing: border-box;
    margin-bottom: 10px;

    &-icon {
      background: url(./images/icons/QARecord.svg) no-repeat;
      display: inline-block;
      width: 100%;
      height: 33px;
      margin-bottom: 10px;
    }

    &-content {
      padding-left: 6px;
      box-sizing: border-box;
    }
  }

  &__info {
    .orderItem {
      background: $white;
      padding: 10px 0;

      .orderDetail {
        padding: 0 20px;

        &__orderInfo {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: $mine-shaft;
          font-size: 1.4rem;

          &-url {
            display: block;
            font-size: 1.4rem;
            text-decoration: none;
            color: $white;
            background: $dodger-blue;
            padding: 5px 16px;
            -webkit-border-radius: 12px;
            -moz-border-radius: 12px;
            border-radius: 15px;
          }
        }

        &__productInfo {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;

          &-img {
            width: 25%;

            img {
              width: 100%;
            }
          }

          &-name {
            width: 73%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-size: 1.4rem;
            color: $mine-shaft;

            p {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }

            div {
              display: flex;
              justify-content: space-between;
            }
          }
        }
      }

      .otherProduct {
        list-style-type: none;

        .extraDetail {
          display: flex;
          padding: 10px 20px;
          color: $mine-shaft;
          font-size: 1.4rem;
          box-sizing: border-box;
          justify-content: space-between;
          align-items: center;

          &__name {
            flex: 1;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }

          span {
            white-space: nowrap;
            display: inline-block;
            border: 1px solid $black;
            padding: 3px 5px;
            margin-right: 5px;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            color: $black;
          }
        }
      }

      .otherProductCtrlBtn {
        text-align: center;
        margin-top: 20px;

        span {
          font-size: 1.3rem;
          display: inline-block;
          border: 1px solid $mine-shaft;
          background: $white;
          -webkit-border-radius: 13px;
          -moz-border-radius: 13px;
          border-radius: 13px;
          padding: 4px 25px;
          outline: none;
          color: $mine-shaft;
        }
      }

      .dialog {
        margin-top: 10px;

        &__title {
          display: flex;
          justify-content: space-between;
          color: $mine-shaft;
          font-size: 1.4rem;
          border-bottom: 1px solid $alto;
          border-top: 1px solid $alto;
          padding: 7px 10px 7px 0;

          .case {
            padding-left: 10px;
            border-left: 3px solid $pomegranateapprox;

            &__num {
              font-weight: bold;
            }
          }
        }

        &__content {
          padding: 15px 10px;
          font-size: 1.4rem;
          color: $mine-shaft;

          .client {
            margin-bottom: 15px;
          }

          .service {
            background: $background;
            padding: 10px 6px;
            font-size: 1.4rem;

            &__title {
              display: flex;
              margin-bottom: 3px;
              justify-content: space-between;

              &-icon {
                width: 8%;
                padding-bottom: 8%;
                display: inline-block;
                background-size: cover;
                background-position: center;
                background-image: url(./images/icons/ansIcon.svg);
                margin-right: 5px;
              }

              p {
                display: flex;
                align-items: center;

                &:first-of-type {
                  font-weight: bold;
                  flex: 1;
                }
              }
            }
          }

          .otherService {
            .service {
              margin-top: 5px;
            }
          }
        }

        &__otherBtn {
          display: flex;
          padding-top: 15px;
          justify-content: center;
          align-items: center;
          font-size: 1.4rem;
          color: $mine-shaft;
        }
      }
    }
  }

  &__askBtn {
    background: $white;
    border-top: 1px solid $alto;
    padding: 9px 7px;
    box-sizing: border-box;

    a {
      display: inline-block;
      background: $pomegranateapprox;
      color: $white;
      width: 100%;
      font-size: 1.4rem;
      border-radius: 2px;
      padding: 10px 0;
      border: 0;
      text-decoration-line: none;
      text-align: center;
    }
  }

  .red {
    color: $pomegranateapprox;
  }

  .slide-enter-active {
    transition: .4s ease-in;
  }

  .slide-leave-active {
    transition: .4s cubic-bezier(0, 1, 0.5, 1);
  }

  .slide-enter,
  .slide-leave-to {
    max-height: 0px;
    overflow: hidden;
  }

  .slide-enter-to,
  .slide-leave {
    overflow: hidden;
    max-height: 8000px;
  }
}
</style>
