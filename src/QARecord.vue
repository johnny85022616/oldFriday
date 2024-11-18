<template>
<div>
  <downloadapp v-on:downloadAppOpened="downloadAppOpened" />
  <navigation :isShowRedTop="isShowRedTop" :windowY="windowY" v-on:stopBodyScroll="stopBodyScroll" :isDownloadAppOpened="isDownloadAppOpened" />
  <div class="QARecord">
    <div class="QARecord__header">
      <span class="QARecord__header-icon"></span>
      <p class="QARecord__header-content notice">注意事項：</p>
      <p class="QARecord__header-content">• 問答中心將保留您6個月內的詢問與回覆紀錄。</p>
    </div>
    <div class="QARecord__info" v-if="dataList">
      <div v-if="dataList.length > 0" class="QARecord__info-QAList">
        <ul>
          <li class="QAItem" v-for="(item , index) in dataList" :key="index">
            <div v-if="item.orderId != null && item.orderId != '' && item.products.length > 0" class="orderQA">
              <div class="orderQA__title">
                <div class="case">
                  <span class="case__num">案件編號 {{item.caseNo}}</span>
                </div>
                <span class="date">{{item.createTime}}</span>
              </div>
              <div class="orderQA__order">
                <p class="orderQA__order-num">訂單編號 {{item.orderId}}</p>
                <div class="two">
                  <div class="two__img">
                    <img :src="item.products[0].productImage" alt="">
                  </div>
                  <div class="two__content">
                    <div class="two__content-productInfo">
                      <p>{{item.products[0].productName}}</p>
                      <p>x{{item.products[0].proudctQuantity}}</p>
                    </div>
                    <span v-if="item.lastReply != null" class="two__content-answer">{{item.lastReply}}</span>
                    <span v-else class="two__content-answer">{{item.questionDesc}}</span>
                  </div>
                </div>
                <a class="orderQA__order-queryBtn" :href='`/mobileweb/member/myQADetail?orderId=${item.orderId}&caseNo=${item.caseNo}`'>查看問答紀錄</a>
              </div>
            </div>
            <div v-else class="noOrederQA">
              <div class="orderQA__title">
                <div class="case">
                  <span class="case__num">案件編號 {{item.caseNo}}</span>
                </div>
                <span class="date">{{item.createTime}}</span>
              </div>
              <div class="orderQA__order">
                <p v-if="item.orderId != null && item.orderId != ''" class="orderQA__order-num">訂單編號 {{item.orderId}}</p>
                <div class="two">
                  <div class="two__img">
                    <img src="./images/icons/QAImg.svg" alt="">
                  </div>
                  <div class="two__content">
                    <span v-if="item.lastReply != null" class="two__content-answer">{{item.lastReply}}</span>
                    <span v-else class="two__content-answer">{{item.questionDesc}}</span>
                  </div>
                </div>
                <a class="orderQA__order-queryBtn" :href='`/mobileweb/member/myQADetail?caseNo=${item.caseNo}`'>查看問答紀錄</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-else class="noQA">
        <img src="./images/icons/QAnone.svg" alt="">
        <p class="noQA__content">您沒有6個月內的問答紀錄喔！</p>
        <a class="noQA__btn" href="/">去逛逛</a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import downloadapp from "./components/common/downloadapp.vue"; // 頁面最上方的app下載提示
import navigation from "./components/common/navigationFix.vue"; // 共用天的導覽列

export default {
  name: "QARecord",
  data() {
    return {
      isDownloadAppOpened: false,
      isShowRedTop: true,
      windowY: 0,
      isStopScrolling: false,
      dataList: null
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
      const ticket = this.$cookies.get('FEEC-B2C-TICKET')
      if (ticket) {
        this.axios.get(`api/case/list?source=mw`, {
          headers: {
            'authorization': 'Bearer' + ticket
          }
        }).then(res => {
          const data = res.data;
          if (data.code === 1) {
            if (data.payload[0].list.length > 0) {
              this.dataList = data.payload[0].list;
            } else {
              this.dataList = []
            }
          }
        }).catch((err) => {
          console.error(err);
        });
      }
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
.QARecord {
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
    width: 100%;
    display: flex;
    flex-direction: column;

    &-QAList {
      .QAItem {
        background: $white;
        margin-top: 10px;

        &:first-of-type {
          margin-top: 0;
        }

        .orderQA {
          &__title {
            display: flex;
            justify-content: space-between;
            color: $mine-shaft;
            font-size: 1.4rem;
            border-bottom: 1px solid $alto;
            padding: 7px 10px 7px 0;

            .case {
              padding-left: 10px;
              border-left: 3px solid $pomegranateapprox;

              &__num {
                font-weight: bold;
              }
            }
          }

          &__order {
            padding: 10px 20px 10px 15px;
            font-size: 1.4rem;
            color: $mine-shaft;
            text-align: center;

            &-num {
              margin: 10px 0;
              text-align: left;
            }

            .two {
              display: flex;
              justify-content: space-between;
              align-items: center;

              &__img {
                width: 22%;

                img {
                  width: 100%
                }
              }

              &__content {
                width: 76%;

                &-productInfo {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 10px;
                  font-size: 1.5rem;
                }

                &-answer {
                  color: $sliver;
                  font-size: 1.4rem;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  line-height: 20px;
                  max-height: 40px;
                  overflow: hidden;
                }
              }
            }

            &-queryBtn {
              display: inline-block;
              text-align: center;
              text-decoration: none;
              color: $mine-shaft;
              padding: 5px 15px;
              margin-top: 20px;
              border: 1px solid $mine-shaft;
              -webkit-border-radius: 12px;
              -moz-border-radius: 12px;
              border-radius: 15px;
            }
          }
        }

        .noOrederQA {
          .two {
            &__content {
              &-answer {
                -webkit-line-clamp: 3;
                max-height: 60px;
              }
            }
          }
        }
      }
    }

    .noQA {
      margin-top: 95px;
      text-align: center;

      &__content {
        font-size: 1.6rem;
        margin-top: 30px
      }

      &__btn {
        display: inline-block;
        font-size: 14px;
        color: $white;
        background: $pomegranateapprox;
        padding: 10px 65px;
        border-radius: 2px;
        font-weight: normal;
        margin-top: 20px;
        text-decoration: none;
      }
    }
  }

  .notice {
    margin-bottom: 10px
  }
}
</style>
