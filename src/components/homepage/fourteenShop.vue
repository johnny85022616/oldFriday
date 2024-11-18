<template>
  <div class="fourteen-wrap">
    <div v-show="isSowChannelMenu" class="fourteen-dropmenu__background"></div>
    <div v-show="isSowChannelMenu" class="fourteen-dropmenu" :style="reCalcTop">
      <div>
        選擇分類項目
        <div class="fourteen-wrap__more" @click="openChannelOptions">
          <img
            src="https://event.shopping.friday.tw/event/CP/common/mobile_icon/arrow_up@2x.png"
          />
        </div>
      </div>
      <div>
        <ul>
          <li
            @click="activate(index)"
            v-for="(item, keyName, index) of shopDetailTitle"
            :key="index"
          >
            <font :class="[{ active: itemsActive == index }]">
              <i :class="[{active: itemsActive == index}, item.icon_style]"></i> {{ item.block_title }}
            </font>
          </li>
        </ul>
      </div>
    </div>

    <div :class="['fourteen-menu',{shadow: isShowShadow}]" :style="reCalcTop">
      <div class="fourteen-bar">
        <span
          @click="activate(index)"
          :class="['fourteen-bar-' + index, { active: itemsActive == index }]"
          v-for="(item, keyName, index) of shopDetailTitle"
          :key="index"
        >
          <font>
            {{ item.block_title }}
          </font>
        </span>
      </div>
      <div class="fourteen-wrap__more" @click="openChannelOptions">
        <img
          src="https://event.shopping.friday.tw/event/CP/common/mobile_icon/more@2x.png"
        />
      </div>
    </div>

    <div v-if="isBlockDataReady" class="fourteen-products">
      <div v-for="(item, keyName, index) of shopDetails" :key="index">
        <div :class="['fourteen-products__head', 'block-item', keyName]">
          <i :class="item.icon_style"></i> {{ item.block_title }}
          <a :href="item.look_more_path">看更多<i class="arrow"></i></a>
        </div>
        <div class="fourteen-products__body">
          <productItem
            :itemList="item.productItems"
            :lookMore="reformatLookMore(item)"
          />
        </div>
      </div>

      <youmaylike
        class="block-item homepage_shop_15"
        title="－ 熱賣特選 －"
        recpos="p"
        v-on:calcuProductBoxOffset="addRecBlock"
      />
    </div>
  </div>
</template>

<script>
import productItem from "../common/productItem";
import youmaylike from "../common/youmaylike";

export default {
  name: "fourteenShop",
  data() {
    return {
      version: '',
      showOnScrollStarted: true, // default false
      isSowChannelMenu: false,
      isShowShadow: false,
      isShowYouMayLike: false,
      itemsActive: 0,
      shopDetailTitle: {},
      shopDetails: {
        homepage_shop_1: {
          block_index: "A11_4",
          block_title: "手機平板",
          icon_style: "friday-icon-logo",
          look_more_path: "https://shopping.friday.tw/1/1.html",
        },
        homepage_shop_2: {
          block_index: "A11_3",
          block_title: "3C 資訊",
          icon_style: "friday-icon-logo",
          look_more_path: "https://shopping.friday.tw/1/0.html",
        },
        homepage_shop_3: {
          block_index: "A11_1",
          block_title: "家電影音",
          icon_style: "friday-icon-logo",
          look_more_path: "https://shopping.friday.tw/1/2.html",
        },
        homepage_shop_4: {
          block_index: "A11_6",
          block_title: "運動休閒",
          icon_style: "friday-icon-logo",
          look_more_path: "https://shopping.friday.tw/1/7.html",
        },
        homepage_shop_5: {
          block_index: "A10_6",
          block_title: "居家生活",
          icon_style: "friday-icon-logo",
          look_more_path: "https://shopping.friday.tw/1/158.html",
        },
        homepage_shop_6: {
          block_index: "A10_1",
          block_title: "傢俱寢飾",
          icon_style: "friday-icon-logo",
          look_more_path: "https://shopping.friday.tw/1/8.html",
        },
        homepage_shop_7: {
          block_index: "A10_4",
          block_title: "美食生鮮",
          icon_style: "friday-icon-logo",
          look_more_path: "https://shopping.friday.tw/1/11.html",
        },
        homepage_shop_8: {
          block_index: "A10_5",
          block_title: "養生保健",
          icon_style: "friday-icon-logo",
          look_more_path: "https://shopping.friday.tw/1/891.html",
        },
        homepage_shop_9: {
          block_index: "A12_9",
          block_title: "美妝保養",
          icon_style: "friday-icon-logo",
          look_more_path: "https://shopping.friday.tw/1/3.html",
        },
        homepage_shop_10: {
          block_index: "A12_8",
          block_title: "服裝鞋包",
          icon_style: "friday-icon-logo",
          look_more_path: "https://shopping.friday.tw/1/4.html",
        },
        homepage_shop_11: {
          block_index: "A9_3",
          block_title: "愛買線上",
          icon_style: "amart-icon-logo",
          look_more_path: "https://shopping.friday.tw/1/699.html",
        },
        homepage_shop_12: {
          block_index: "A9_4",
          block_title: "city'super",
          icon_style: "citysuper-icon-logo",
          look_more_path: "https://shopping.friday.tw/1/167.html",
        },
        homepage_shop_13: {
          block_index: "A9_1",
          block_title: "遠東百貨",
          icon_style: "fed-icon-logo",
          look_more_path: "https://shopping.friday.tw/1/145.html",
        },
        homepage_shop_14: {
          block_index: "A9_2",
          block_title: "SOGO百貨",
          icon_style: "sogo-icon-logo",
          look_more_path: "https://shopping.friday.tw/1/146.html",
        },
      },
      blockDataObj: {},
      productBoxOffsetTop: [],
      productViewItemPool: [],
      isBlockDataReady: false,
      channelTopGap: 0,
      menuBarDom: null,
      lockScrollingExec: false
    };
  },
  components: {
    productItem,
    youmaylike,
  },
  props: {
    isDownloadAppOpened: {
      type: Boolean,
      required: true,
    },
    windowY: {
      type: Number,
    },
     homepageData: {
      type: Object,
      default: () => null
    }
  },
  watch: {
    windowY(newValue) {
      if (!this.lockScrollingExec) {
        if (newValue > window.innerHeight * 2) {
          this.$nextTick(() => {
            this.showOnScrollStarted = true;
          });
        }
        this.channelBarActiveByWindowY(newValue);

        const menuTop = this.menuBarDom.getBoundingClientRect().top;
        this.isShowShadow = menuTop === 103 || menuTop === 45;
      }
    },
    showOnScrollStarted(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          this.calcuProductBoxOffset();
        });
      }
    },
  },
  updated() {
    this.calcuProductBoxOffset();
  },
  mounted() {
    this.menuBarDom = document.querySelector('.fourteen-menu')
  },
  created() {    
    let sortData = []
    let gender 
    let cookieInfo 
    let newShopDetails = {}
    try{
      // 從cookie取得性別
      cookieInfo = this.$cookies.get('FEEC-B2C-INFO')
      gender = cookieInfo.data.gender;
    }catch(e){
      gender = 1;
    }

    let {male , female} = this.parseJsonData(this.homepageData);

    if(gender === 1 && male){
      sortData = male 
    }else if(gender === 0 && female){
      sortData = female 
    }
    let shopDetailsKeys = Object.keys(this.shopDetails)

    if(sortData.length > 0 ){
      sortData.forEach(sd=>{
        shopDetailsKeys.forEach(sk=>{
          if(sd === this.shopDetails[sk].block_index){ 
            newShopDetails[sk] = this.shopDetails[sk]
          }
        })
      })
      this.shopDetails = newShopDetails;
    }
    
    this.version = this.tools.version();

    // 各館JSON對應
    const blockIndex = ["A9", "A10", "A11", "A12"];

    this.shopDetailTitle = Object.assign({}, this.shopDetails);

    this.axios("https://shopping.friday.tw/1/index.json").then((res) => {
      const { data } = res;
      let indexData = data.replace("var data = ", "");
      indexData = JSON.parse(indexData);

      if (indexData?.pageModel?.contentBlock?.itemMap) {
        const { itemMap } = indexData.pageModel.contentBlock;
        blockIndex.forEach((v) => {
          if (itemMap[v].cmsTabs) {
            itemMap[v].cmsTabs.forEach((tabItem) => {
              this.blockDataObj[tabItem.tabCode] = tabItem.cmsItems.sort(
                (a, b) => {
                  return a.itemGroupId < b.itemGroupId ? 1 : -1;
                }
              );

              let [group1, group2] = [
                this.blockDataObj[tabItem.tabCode].slice(0, 4),
                this.blockDataObj[tabItem.tabCode].slice(4, 8),
              ];
              group1 = group1.sort((a, b) => {
                return a.itemOrderNum > b.itemOrderNum ? 1 : -1;
              });
              group2 = group2.sort((a, b) => {
                return a.itemOrderNum > b.itemOrderNum ? 1 : -1;
              });
              group2 = group2.slice(0, 3);
              this.blockDataObj[tabItem.tabCode] = [...group1, ...group2];
            });
          }
        });

        // 組合區塊對應商品資料
        Object.keys(this.shopDetails).forEach((v, i) => {
          this.shopDetails[v] = Object.assign({}, this.shopDetails[v], {
            productItems: this.reformatProducts(this.blockDataObj[this.shopDetails[v].block_index], i)
          })
        })

        this.isBlockDataReady = true;

        // 計算區塊TOP位置
        this.$nextTick(() => {
          this.calcuProductBoxOffset();
          this.initSwipeAction();
        });
      }
    });
  },
  computed: {
    reCalcTop: function () {
      if (this.isDownloadAppOpened) {
        return {
          top: "103px",
        };
      }
      return {};
    },
  },
  methods: {
     parseJsonData(json) {
      const {
        fourteen_shop_sort
      } = json

      return Object.assign({male: null, female: null}, fourteen_shop_sort)
    },

    addRecBlock() {
      this.shopDetailTitle = Object.assign({}, this.shopDetailTitle, {
        homepage_shop_15: {
          block_title: "熱賣特選",
          icon_style: "friday-icon-logo",
        },
      });
    },
    openChannelOptions() {
      this.isSowChannelMenu = !this.isSowChannelMenu;

      if (this.isSowChannelMenu && this.windowY < 70) {
        window.scrollTo(0, 70);
      }
    },
    reformatProducts(ary, index) {
      this.productViewItemPool[index] = {
        isSendGALog: false,
        logItems: []
      }
      
      return ary.map((v, i) => {
        let hrefLink = v.url;
        if (!/^http/i.test(hrefLink)) {
          hrefLink =
            this.configs.productionDomain +
            v.url.replace(/\/ec2\/product/i, "/mobileweb/product") +
            "&item_list_id=homepage_14shop";
        }

        this.productViewItemPool[index].logItems.push({
          item_id: v.productId,
          item_name: v.itemName,
          item_list_id: 'homepage_14shop',
          index: i,
          price: v.salePrice
        });

        return {
          pid: v.productId,
          img: this.parseShopTemplateImageUrl(v.img),
          url: hrefLink,
          name: v.itemName,
          price: v.salePrice,
          discount:
            /^(\d+)$/i.test(v.salePrice) &&
            /^(\d+)$/i.test(v.marketPrice) &&
            v.salePrice !== v.marketPrice
              ? Math.floor((v.salePrice / v.marketPrice) * 100)
                  .toString()
                  .replace(/(0){1}$/i, "")
              : "",
          pricePreix: "",
          priceSuffix: "",
        };
      });
    },
    parseShopTemplateImageUrl(image_url) {
      const new_image_url = /^\/images\/product/i.test(image_url)
        ? "https://img.shopping.friday.tw" + image_url
        : "https://img.shopping.friday.tw/cmsimg" + image_url;
      return new_image_url.replace(/\?(\d+)$/i, "?" + this.version);
    },
    reformatLookMore(obj) {
      return {
        title: obj.block_title,
        url: obj.look_more_path,
      };
    },
    calcuProductBoxOffset() {
      const wrap = this.$el.offsetTop;
      const diffDistance = wrap - 105;

      const boxs = this.$el.querySelectorAll(".block-item");
      this.productBoxOffsetTop = [];
      boxs.forEach((item) => {
        const top = item.offsetTop + diffDistance;
        this.productBoxOffsetTop.push(top);
      });
    },
    channelBarActiveByWindowY(newValue) {
      newValue += this.channelTopGap;
      const offset = this.productBoxOffsetTop;
      const offsetLen = offset.length;
      if (newValue > offset[0]) {
        for (let key in offset) {
          const i = parseInt(key);
          // direct jump by click menu.
          if (offset[i] === newValue) {
            this.itemsActive = i;
            this.barMoveToSelected(i);
            break;

            // scroll
          } else if (offset[i] < newValue && newValue < offset[i + 1]) {
            this.itemsActive = i;
            this.barMoveToSelected(i);
            break;

            // scroll to last one
          } else if (newValue > offset[offsetLen - 1]) {
            this.itemsActive = i;
            this.barMoveToSelected(i);
          }
        }
      } else {
        this.itemsActive = 0;
        this.barMoveToSelected(0);
      }
    },
    activate(el) {
      // check directive click channel tab before scrolling.
      if (!this.showOnScrollStarted) {
        this.showOnScrollStarted = true;
        this.$nextTick(() => {
          this.activateScrollTo(el);
        });
      } else {
        this.activateScrollTo(el);
      }

      // hidden channel bar after click channel on tab's dropmenu.
      this.isSowChannelMenu = false;
    },
    activateScrollTo(el) {
      const fixGap = /android/i.test(navigator.userAgent) ? 5 : 0;
      window.scrollTo({
        top: this.productBoxOffsetTop[el] - this.channelTopGap + fixGap,
        left: 0,
        behavior: 'smooth'
      });
    },
    barMoveToSelected(el) {
      if (this.productViewItemPool[el] && !this.productViewItemPool[el].isSendGALog && window.dataLayer) {
        this.productViewItemPool[el].isSendGALog = true
        window.dataLayer.push({
          event: 'eventViewItemListTrigger',
          'DLV-view_item_list': this.productViewItemPool[el].logItems
        })
      }

      // according to title choosed then scroll horizontal bar.
      const bar = this.$el.querySelector(".fourteen-bar");
      if (el >= 2) {
        const child = this.$el.querySelector(".fourteen-bar-" + el);
        const xx =
          child.offsetLeft - (window.innerWidth / 2 - child.offsetWidth / 2);
        bar.scrollTo(xx, 0);
      } else {
        bar.scrollTo(0, 0);
      }
    },
    initSwipeAction() {
      const dom = document.querySelector('.fourteen-products');
      let xDown = null, yDown = null;

      const getTouches = (evt) => {
        return evt.touches || evt.originEvent.touches;
      }
      const handleTouchStart = (evt) => {
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
      }
      
      const handleTouchMove = (evt) => {
        if (!xDown || !yDown) return;

        let xUp = evt.touches[0].clientX;
        let yUp = evt.touches[0].clientY;
        let xDiff = xDown - xUp;
        let yDiff = yDown - yUp;
        
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
          if (Math.abs(xDiff) < 20) return;
          evt.preventDefault();
          this.lockScrollingExec = true;

          let pos = 0;

          if (xDiff > 0) {
            // console.log('swipeRight')
            if (this.itemsActive < this.productViewItemPool.length - 1) {
              pos = this.itemsActive += 1
              this.activate(pos)
              this.barMoveToSelected(pos);
            }
          } else {
            // console.log('swipeLeft')
            if (this.itemsActive !== 0) {
              pos = this.itemsActive -= 1
              this.activate(pos)
              this.barMoveToSelected(pos);
            }
          }
          setTimeout(() => {
            this.lockScrollingExec = false
          }, 1000)
        }
        xDown = null;
        yDown = null;
      }
      dom.addEventListener('touchstart', handleTouchStart, {passive: false});
      dom.addEventListener('touchmove', handleTouchMove, {passive: false});
      dom.addEventListener('click', () => {
        console.log('click')
      }, false);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/color";

.fourteen-dropmenu {
  z-index: 9;
  position: fixed;
  top: 45px;
  width: 100%;
  height: auto;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  color: #adadad;
  font-size: 1.6rem;
  background-color: #ffffff;

  &__background {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 8;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }

  > div {
    &:first-child {
      line-height: 50px;
      padding-left: 20px;
      border-bottom: 1px solid #e0e0e0;
    }

    &:nth-child(2) {
      padding-top: 9px;
      overflow: scroll;
      height: 70vh;

      ul {
        margin: 0;
        box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.1);
      }

      li {
        line-height: 46px;
        padding: 0 20px;
        list-style-type: none;
      }

      font {
        font-size: 1.6rem;
        color: $web_main;
        display: flex;
        align-items: center;

        i {
          margin-right: 10px;
        }

        &.active {
          color: $red;
          background: #ffffff
            url("https://event.shopping.friday.tw/event/CP/common/mobile_icon/tick@2x.png")
            center/24px no-repeat;
          background-position: center right;
        }
      }
    }
  }
}

.fourteen-wrap {
  width: 100%;
  position: relative;
  margin: 0 0 15px;
  box-sizing: border-box;

  &__more {
    position: absolute;
    top: 6px;
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

.fourteen-menu {
  z-index: 1;
  position: sticky;
  position: -webkit-sticky;
  top: 45px;
  left: 0;
  height: 35px;
  padding: 10px 50px 0px 20px;
  background-color: #ffffff;
  
  &.shadow {
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.3);
  }
}

.fourteen-bar {
  width: 100%;
  height: 40px;
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

    &.active {
      border-bottom: 2px solid $red;
      font {
        font-size: 1.6rem;
        color: $red;
      }
    }

    font {
      font-size: 1.6rem;
      color: $web_main;
    }
  }
}

.fourteen-products {
  padding: 0;

  > div {
    &:first-child {
      > div {
        margin-top: 10px;
      }
    }
  }
  &__body {
    margin: 10px 15px;
  }

  &__head {
    display: flex;
    position: relative;
    align-items: center;
    margin: 10px 15px;
    padding: 0 12px;
    border-radius: 10px;
    color: $web_main;
    font-size: 1.6rem;
    line-height: 46px;
    background-color: $white;

    > i {
      margin-right: 10px;
    }

    a {
      position: absolute;
      right: 9px;
      top: 50%;
      transform: translateY(-50%);
      box-sizing: border-box;
      min-width: 74px;
      max-height: 2.4rem;
      padding: 3px 7.1px 3px 9.9px;
      border: 1px solid $web_main;
      border-radius: 18px;
      text-decoration: none;
      color: $web_main;
      font-size: 1.3rem;
      font-weight: 500;
      line-height: normal;
      display: inline-flex;
      align-items: center;
    }
    .arrow {
      display: inline-block;
      width: 15px;
      height: 14px;
      margin-left: 4px;
      vertical-align: text-bottom;
      background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNSAxNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik03LjMxMyAwYzMuOTgyIDAgNy4yMSAzLjEzNCA3LjIxIDdzLTMuMjI4IDctNy4yMSA3QzMuMzMyIDE0IC4xMDQgMTAuODY2LjEwNCA3czMuMjI4LTcgNy4yMS03em0tLjk1NSAzLjIyOGEuOTk2Ljk5NiAwIDAgMC0xLjI3OC4yOTYuOTI2LjkyNiAwIDAgMC0uMTcuNTM0djUuODg0bC4wMDUuMDkxYy4wNDcuNDguNDY1Ljg1Ni45NzMuODU2YTEgMSAwIDAgMCAuNTUtLjE2NWw0LjQ1NC0yLjk0MS4wNzUtLjA1NWEuOTI3LjkyNyAwIDAgMCAuMTgyLTEuMjYuOTYyLjk2MiAwIDAgMC0uMjU3LS4yNUw2LjQzOCAzLjI3N3oiIGZpbGw9IiMzQzNDM0MiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgo8L3N2Zz4K");
    }
  }
}
</style>
