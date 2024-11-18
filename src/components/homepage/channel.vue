<template>
<div class="channel-wrap">
  <div v-show="isSowChannelMenu" class="channel-dropmenu" :style="reCalcTop">
    <div class="top">
      選擇分類項目
      <div class="more" @click="openChannelOptions">
        <img src="https://event.shopping.friday.tw/event/CP/common/mobile_icon/arrow_up@2x.png" />
      </div>
    </div>
    <div class="list">
      <ul>
        <li @click="activate(index)" v-for="(item, index) of items" :key="index">
          <font :class="{ active: itemsActive == index }">
            {{
              item.title
              }}
          </font>
        </li>
      </ul>
    </div>
  </div>

  <div class="channel-box" :style="reCalcTop">
    <div class="channel-bar">
      <span @click="activate(index)" :class="'channel-bar-'+index" v-for="(item, index) of items" :key="index">
        <font :class="{ active: itemsActive == index }">
          {{
            item.title
            }}
        </font>
      </span>
    </div>
    <div class="more" @click="openChannelOptions">
      <img src="https://event.shopping.friday.tw/event/CP/common/mobile_icon/more@2x.png" />
    </div>
  </div>

  <div v-if="showOnLighthouse">

    <div v-if="isShowCountdown">
      <countdown :endTime="endTime" />
    </div>

    <productItem v-if="items.length" class="wudibox" :gaCategoryTitle="'小網首頁'" :itemList="reformatProducts(items[0].items)" />

    <div v-if="showOnScrollStarted">
      <div v-for="(item, index) of items" :key="index" :class="'pbox box-' + index">
        <div v-if="index > 0" class="product-box">
          <bannerOnly v-if="item.type == 8" :itemList="item.items" />
          <bannerText v-else-if="item.type == 999" :itemList="item.items" />
          <youmaylike v-else-if="item.type == 888" recpos="p" v-on:calcuProductBoxOffset="calcuProductBoxOffset" />
          <productItem v-else :gaCategoryTitle="'小網首頁'" :itemList="reformatProducts(item.items)" />
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import productItem from "../common/productItem";
import bannerOnly from "../common/bannerOnly";
import bannerText from "../common/bannerText";
import countdown from "../common/countdown";
import youmaylike from "../common/youmaylike";

export default {
  name: "channel",
  data() {
    return {
      showOnScrollStarted: true, // default false
      showOnLighthouse: true,
      items: [],
      itemsActive: 0,
      endTime: 0,
      isShowCountdown: false,
      isSowChannelMenu: false,
      productBoxOffsetTop: [],
      channelTopGap: 0,
    };
  },
  props: {
    isDownloadAppOpened: {
      type: Boolean,
      required: true
    },
    directJumpToBestBuy: {
      type: Boolean,
      required: true
    },
    windowY: {
      type: Number
    }
  },
  watch: {
    directJumpToBestBuy(newValue) {
      if (newValue) {
        this.activate(0);
      }
    },
    windowY(newValue) {
      if (newValue > (window.innerHeight * 2)) {
        this.$nextTick(() => {
          this.showOnScrollStarted = true
        })
      }
      this.channelBarActiveByWindowY(newValue)
    },
    showOnScrollStarted(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          this.calcuProductBoxOffset()
        })
      }
    }
  },
  components: {
    productItem,
    bannerOnly,
    bannerText,
    countdown,
    youmaylike
  },
  updated() {
    this.calcuProductBoxOffset()
  },
  computed: {
    reCalcTop: function () {
      if (this.isDownloadAppOpened) {
        return {
          top: "102px"
        };
      }
      return {};
    }
  },
  methods: {
    reformatProducts(ary) {
      return ary.map(v => {
        return {
          pid: v.pid,
          img: v.img,
          url: v.url,
          name: v.itemName,
          price: v.saleDesc,
          pricePreix: v.labelFront ? v.labelFront : '',
          priceSuffix: v.labelBack ? v.labelBack : ''
        }
      })
    },
    channelBarActiveByWindowY(newValue) {
      newValue += this.channelTopGap
      const offset = this.productBoxOffsetTop
      const offsetLen = offset.length
      if (newValue > offset[0]) {
        for (let key in offset) {
          const i = parseInt(key)
          // direct jump by click menu.
          if (offset[i] === newValue) {
            this.itemsActive = i
            this.barMoveToSelected(i);
            break

            // scroll
          } else if (offset[i] < newValue && newValue < offset[i + 1]) {
            this.itemsActive = i
            this.barMoveToSelected(i);
            break

            // scroll to last one
          } else if (newValue > offset[offsetLen - 1]) {
            this.itemsActive = i
            this.barMoveToSelected(i);
          }
        }
      } else {
        this.itemsActive = 0
        this.barMoveToSelected(0);
      }
    },
    activate(el) {
      this.ga.event(
        "小網首頁",
        "click",
        `MWA5 - ${this.items[el].title}`
      );

      // check directive click channel tab before scrolling.
      if (!this.showOnScrollStarted) {
        this.showOnScrollStarted = true
        this.$nextTick(() => {
          this.activateScrollTo(el)
        })
      } else {
        this.activateScrollTo(el)
      }

      // hidden channel bar after click channel on tab's dropmenu.
      this.isSowChannelMenu = false;
    },
    activateScrollTo(el) {
      const fixGap = /android/i.test(navigator.userAgent) ? 10 : 0
      window.scrollTo(0, this.productBoxOffsetTop[el] - this.channelTopGap + fixGap);
    },
    barMoveToSelected(el) {
      // according to title choosed then scroll horizontal bar.
      const bar = this.$el.querySelector(".channel-bar");
      if (el >= 2) {
        const child = this.$el.querySelector('.channel-bar-' + el)
        const xx = child.offsetLeft - ((window.innerWidth / 2) - (child.offsetWidth / 2))
        bar.scrollTo(xx, 0)
      } else {
        bar.scrollTo(0, 0);
      }
    },
    openChannelOptions() {
      this.isSowChannelMenu = !this.isSowChannelMenu;

      if (this.isSowChannelMenu && this.windowY < 70) {
        window.scrollTo(0, 70)
      }
    },
    scrollChannelBarToScreenTop() {
      const topHeight = document.querySelector(".homepage-top").offsetHeight;
      setTimeout(() => {
        window.scrollTo(0, topHeight + 40);
      }, 0);
    },
    calcuProductBoxOffset() {
      const wrap = this.$el.offsetTop
      const wudibox = this.$el.querySelector('.wudibox')
      const boxs = this.$el.querySelectorAll('.pbox')
      this.productBoxOffsetTop = []
      boxs.forEach(item => {
        const top = item.offsetTop + wrap
        this.productBoxOffsetTop.push(top)
      })
      if (wudibox) {
        this.productBoxOffsetTop[0] = (wudibox.offsetTop + wrap) - 20
      }
    },
    calcuTopBarHeight() {
      // const downloadappHeight = document.querySelector('.downloadapp').offsetHeight
      const navigatorHeight = document.querySelector('.navigation-bar').offsetHeight
      const channelBarHeight = this.$el.querySelector('.channel-box').offsetHeight
      this.channelTopGap = navigatorHeight + channelBarHeight
    }
  },
  created() {
    this.showOnLighthouse = this.lighthouse ? false : true

    // GET PromoEvent
    this.axios.get("api/home/mobileWebChannel").then(res => {
      const data = res.data;
      if (data.code === 1 && data.payload.length > 0) {
        this.items = data.payload[0].channels.filter(item => !!item);
        this.items.splice(this.items.length - 1, 0, {
          type: 888,
          title: '你可能也喜歡'
        });

        if (this.items[0].endTime) {
          this.endTime = this.items[0].endTime;
          this.isShowCountdown = true;
        }

        this.calcuTopBarHeight()
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.wudibox {
  margin-bottom: 15px;
}
.channel-dropmenu {
  position: fixed;
  top: 45px;
  z-index: 9;
  width: 100%;
  height: auto;
  background-color: #ffffff;
  font-size: 1.6rem;
  color: #adadad;

  .top {
    line-height: 50px;
    padding-left: 20px;
    border-bottom: 1px solid #e0e0e0;
  }

  .list {
    padding-top: 9px;

    ul {
      margin: 0;
      padding: 0 0 0 20px;
      box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.1);

      li {
        line-height: 46px;
        list-style-type: none;

        font {
          font-size: 1.6rem;
          color: #adadad;

          &.active {
            display: inline-block;
            width: 96%;
            font-size: 1.6rem;
            color: #3c3c3c;
            background: #ffffff url("https://event.shopping.friday.tw/event/CP/common/mobile_icon/tick@2x.png") center/24px no-repeat;
            background-position: center right;
          }
        }
      }
    }
  }
}

.channel-wrap {
  width: 100%;
  position: relative;
  margin: 0 0 15px;
  box-sizing: border-box;

  .product-box {
    padding: 0 ;
  }

  .channel-box {
    z-index: 1;
    position: sticky;
    position: -webkit-sticky;
    top: 45px;
    margin-bottom: 10px;
    padding: 15px 50px 15px 20px;
    background-color: #ffffff;

    .top {
      .more {
        top: 15px;
        height: 35px;
      }
    }
  }

  .channel-bar {
    width: 100%;
    height: 22px;
    overflow-y: hidden;
    overflow-x: scroll;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
    }

    span {
      height: 22px;
      padding: 12px 6px;
      box-sizing: border-box;

      font {
        font-size: 1.6rem;
        color: #adadad;

        &.active {
          font-size: 1.6rem;
          color: #3c3c3c;
        }
      }
    }
  }

  .more {
    position: absolute;
    top: 10px;
    right: 5px;
    border-left: 1px solid #e0e0e0;
    height: 32px;

    img {
      position: relative;
      top: -6px;
      width: 42px;
      height: 45px;
    }
  }
}
</style>
