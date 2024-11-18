<template>
<div>
  <gotoTop></gotoTop>
  <downloadapp v-on:downloadAppOpened="downloadAppOpened" />
  <navigation :isShowRedTop="isShowRedTop" :windowY="windowY" v-on:stopBodyScroll="stopBodyScroll" :isDownloadAppOpened="isDownloadAppOpened" />
  <div class="intro">
    <div class="intro__title">
      <span class="intro__title-word">購物說明</span>
    </div>
    <div class="intro__note">
      <p class="intro__note-word">
        歡迎光臨 friDay購物！為了幫助您購物更快更輕鬆，我們提供了詳細的購物說明，邀您一起享受夠你買、夠你逛、永不打烊的購物樂趣！
      </p>
    </div>
    <qa></qa>
  </div>
</div>
</template>

<script>
import downloadapp from "./components/common/downloadapp.vue"; // 頁面最上方的app下載提示
import navigation from "./components/common/navigationFix.vue"; // 共用天的導覽列
import qa from "./components/shoppingIntro/qa.vue";
import gotoTop from './components/common/gotoTop.vue';

export default {
  name: 'shoppingIntro',
  data() {
    return {
      isDownloadAppOpened: false,
      isShowRedTop: true,
      windowY: 0,
      isStopScrolling: false,
    }
  },
  components: {
    downloadapp,
    navigation,
    qa,
    gotoTop
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
  }
}
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
.intro {
  width: 95%;
  margin: 15px auto 0 auto;
  color: $tundora;

  &__title {
    width: 100%;
    height: 70px;
    border-left: 1px solid $silver1;
    background: url(./images/icons/newtitle2-box-bg.jpeg)right top no-repeat;
    overflow: hidden;

    &-word {
      width: 94%;
      margin: 1% 3% 0;
      display: inline-block;
      line-height: 55px;
      border-bottom: 1px dotted $silver1;
      overflow: hidden;
      text-indent: -999px;
      background: url(./images/icons/intro1-status-bg.jpeg)left center no-repeat;
    }
  }

  &__note {
    width: 100%;
    margin-top: 1%;

    &-word {
      padding: 1% 2%;
      background-color: $concretesolid;
      line-height: 150%;
      border-radius: 5px;
      font-size: 1.3rem;
    }

    &::after {
      content: '';
      width: 0;
      height: 0;
      display: block;
      border-style: solid;
      border-width: 12px 12px 0 0;
      border-color: $concretesolid transparent transparent transparent;
      margin-left: 5%;
    }
  }
}
</style>
