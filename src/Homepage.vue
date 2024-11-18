<template>
  <div>
    <downloadapp v-on:downloadAppOpened="downloadAppOpened" />
    <coverbanner />
    <div id="Homepage">
      <div class="background-layer" :style="{ transform: translateY }"></div>
      <navigation
        :isShowRedTop="isShowRedTop"
        :windowY="windowY"
        v-on:stopBodyScroll="stopBodyScroll"
        v-on:disableShowSearchInput="disableShowSearchInput"
        v-on:directBestbuy="directBestbuy"
        :isDownloadAppOpened="isDownloadAppOpened"
        :directShowSearchInput="directShowSearchInput"
        v-on:setHotKeyword="setHotKeyword"
      />
      <div class="homepage-top">
        <homeSearchBar
          :windowY="windowY"
          :searchInputHotKeyword="searchInputHotKeyword"
          v-on:jumpToSearchInput="jumpToSearchInput"
        />
        <banners />
      </div>
      <shortcutSlider />
      <discountAndHot
        v-if="homepageData !== null"
        :homepageData="homepageData"
      />
      <superBrand />
      <div class="homepage-bottom">
        <fourteenShop v-if="homepageData"
          :isDownloadAppOpened="isDownloadAppOpened"
          :windowY="windowY"
          :homepageData="homepageData"
        />
      </div>
    </div>
    <a class="goup" v-show="showGoUp" href="#" @click="backToTop">
      <i></i><span>TOP</span>
    </a>
  </div>
</template>

<script>
import downloadapp from './components/common/downloadapp.vue'; // 頁面最上方的app下載提示
import navigation from './components/common/navigation.vue'; // 共用天的導覽列
import coverbanner from './components/homepage/coverbanner.vue'; // 首頁蓋版廣告
import homeSearchBar from './components/homepage/searchbar.vue'; // 首頁搜尋bar
import banners from './components/homepage/banners.vue'; // 首頁上方大幅廣告
import shortcutSlider from './components/homepage/shortcutSlider.vue'; // 首頁中間快捷版位
import discountAndHot from './components/homepage/discountAndHot.vue'; // 限時搶購及熱銷
import superBrand from './components/homepage/superBrand.vue';  //超級品牌
import fourteenShop from './components/homepage/fourteenShop.vue'; // 14館商品

export default {
  name: 'Homepage',
  data() {
    return {
      showOnLighthouse: true,
      currentY: 0,
      windowY: 0,
      isShowRedTop: false,
      isStopScrolling: false,
      background_red_top: 0,
      isDownloadAppOpened: false,
      directShowSearchInput: false,
      directJumpToBestBuy: false,
      homepageData: null,
      showGoUp: false,
      searchInputHotKeyword: ''
    };
  },
  components: {
    downloadapp,
    navigation,
    coverbanner,
    homeSearchBar,
    banners,
    shortcutSlider,
    discountAndHot,
    fourteenShop,
    superBrand,
  },
  created() {
    const jsonFile = this.configs.homepageSuperbrandJson('homepage');
    this.version = this.tools.version();

    this.axios.get(jsonFile).then((res) => {
      this.homepageData = res.data;
    });

    this.showOnLighthouse = this.lighthouse ? false : true;
    window.addEventListener(
      'scroll',
      () => {
        const wy = window.scrollY;
        this.windowY = wy;
        this.currentY = wy !== 70 && wy !== 0 ? wy : this.currentY;
        this.background_red_top = (0 - wy) * 1.5;
        this.isShowRedTop = wy > 0 ? false : true;
        this.showGoUp = wy > 0 ? true : false;
      },
      {
        passive: true,
      }
    );
    this.seo.homepage()
  },
  computed: {
    translateY: function() {
      let top = this.background_red_top;
      if (top > 0) {
        top = 0;
      }
      return 'translateY(' + top + 'px)';
    },
  },
  methods: {
    // 設定搜尋欄熱搜關鍵字
    setHotKeyword(keyword) {
      this.searchInputHotKeyword = keyword
    },
    // 展開搜尋列
    jumpToSearchInput() {
      this.directShowSearchInput = true;
    },
    stopBodyScroll(action, jumpCurrentY = true) {
      const body = document.body;
      if (!this.isStopScrolling) {
        body.style = 'padding:0;margin:0;overflow:hidden;height:100%';
        this.isStopScrolling = !this.isStopScrolling;
      }
      if (action === 'close') {
        body.style = 'padding:0;margin:0;';
        if (jumpCurrentY) {
          setTimeout(() => {
            window.scrollTo(0, this.currentY);
          }, 0);
        }
        this.isStopScrolling = false;
      }
    },
    downloadAppOpened() {
      this.isDownloadAppOpened = !this.isDownloadAppOpened;
    },
    disableShowSearchInput() {
      this.directShowSearchInput = false;
    },
    //前往無敵大好康頁面
    directBestbuy() {
      this.directJumpToBestBuy = true;
      setTimeout(() => {
        this.directJumpToBestBuy = false;
      }, 100);
    },
    backToTop(evt) {
      evt.preventDefault();
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss">
@import './style/reset.module.scss';
@import './style/flex.module.scss';
@import './style/rwd.module.scss';
@import './style/icons.module.scss';
@import './style/color';

#Homepage {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  position: relative;

  .background-layer {
    z-index: 0;
    position: absolute;
    top: 0;
    width: 100%;
    height: 252px;
    background-size: 100%;
    background-repeat: no-repeat;
    background-image: url('https://event.shopping.friday.tw/event/CP/common/mobile_icon/rectangle@2x.png');
    img {
      width: 100%;
      height: 252px;
    }
  }

  .homepage-top {
    position: inherit;
    z-index: 1;
    padding: 0 15px;
  }

  .homepage-bottom {
    background-color: $background;
  }
}
.goup {
  width: 51px;
  height: 38px;
  font-size: 12px;
  font-weight: 600;
  color: $white;
  text-decoration: none;
  background-color: rgba($web_main, 0.6);
  border-radius: 100px 0 0 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 13px;
  right: 0;
  z-index: 2;
}
i {
  width: 20px;
  height: 20px;
  display: inline-block;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xOC4wODQgMTQuMDQ3YS42NDIuNjQyIDAgMCAwLS4xODUtLjQ0NmwtNy41MTYtNy41MTVhLjYxMS42MTEgMCAwIDAtLjQ0NS0uMTg2LjYxMS42MTEgMCAwIDAtLjQ0Ni4xODZsLTcuNDA2IDcuNDA2YS42Mi42MiAwIDAgMC0uMTg2LjQ1M2MwIC4xNzguMDYyLjMzLjE4Ni40NTRhLjYxMS42MTEgMCAwIDAgLjQ0NS4xODVsLjEwMS0uMDA3YS42MS42MSAwIDAgMCAuMzQ1LS4xNzhsNi45Ni02Ljk2MSA3LjA1NSA3LjA1NWEuNjIuNjIgMCAwIDAgLjQ1My4xODUuNjIuNjIgMCAwIDAgLjQ1NC0uMTg1LjYyMy42MjMgMCAwIDAgLjE4Ni0uNDQ2eiIgZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJub256ZXJvIi8+Cjwvc3ZnPgo=');
}
</style>
