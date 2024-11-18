<template>
  <div class="navigation-bar" :style="{'margin-top': isDownloadAppOpened ? '58px':'0px'}">
    <div class="whiteBg" :style="{ transform: whiteBgTop }">
      <div class="logo">
      </div>
      <div class="new-search" @click="showSearchInput">
        <img
          :style="{ opacity: bottomImgOpacity }"
          src="https://event.shopping.friday.tw/event/CP/common/mobile_icon/logo-ten-scrollup-d.svg"
        />
        <span>{{ searchInputHotKeyword }}</span>
        <img
          :style="{ opacity: bottomImgOpacity }"
          src="https://event.shopping.friday.tw/event/CP/common/mobile_icon/search-gy.svg"
        />
      </div>
    </div>

    <div class="icon-box">
      <div class="new-menu">
        <a href @click="showMenu">
          <img
            class="top"
            :style="{ opacity: topImgOpacity }"
            src="https://event.shopping.friday.tw/event/CP/common/mobile_icon/menu_wt.svg"
          />
          <img
            class="bottom"
            :style="{ opacity: bottomImgOpacity }"
            src="https://event.shopping.friday.tw/event/CP/common/mobile_icon/menu_wt.svg"
          />
        </a>
      </div>

      <div class="new-logo" v-show="checkShowLogo">
        <a href="/">
          <img
            class="top"
            :style="{ opacity: topLogoImgOpacity }"
            src="https://event.shopping.friday.tw/event/CP/common/mobile_icon/friday_fetnet_logo.svg"
          />
        </a>
      </div>

      <div class="new-people">
        <a href @click="showPeopleLinks">
          <img
            class="top"
            :style="{ opacity: topImgOpacity }"
            src="https://event.shopping.friday.tw/event/CP/common/mobile_icon/member_wt.svg"
          />
          <img
            class="bottom"
            :style="{ opacity: bottomImgOpacity }"
            src="https://event.shopping.friday.tw/event/CP/common/mobile_icon/member_wt.svg"
          />
        </a>
      </div>

      <div class="new-cart">
        <a href="/mobileweb/shoppingcart">
          <img
            class="top"
            :style="{ opacity: topImgOpacity }"
            src="https://event.shopping.friday.tw/event/CP/common/mobile_icon/cart_wt.svg"
          />
          <img
            class="bottom"
            :style="{ opacity: bottomImgOpacity }"
            src="https://event.shopping.friday.tw/event/CP/common/mobile_icon/cart_wt.svg"
          />
        </a>
        <span :class="{ active: isRedCartNumber }">{{ cartNum }}</span>
      </div>
    </div>

    <peopleLinks
      v-if="isShowPeopleLinks"
      :isDownloadAppOpened="isDownloadAppOpened"
    />

    <searchinput
      v-show="isShowSearchInput"
      v-on:closeSearchMenu="closeSearchMenu"
      v-on:setHotKeyword="setHotKeyword"
      :isDownloadAppOpened="isDownloadAppOpened"
    />

    <menutree
      v-if="isShowMenu"
      v-on:closeShowMenu="closeShowMenu"
      v-on:directBestbuy="directBestbuy"
      :isDownloadAppOpened="isDownloadAppOpened"
    />
  </div>
</template>

<script>
import peopleLinks from "./peoplelinks";
import searchinput from "./searchinput";
import menutree from "./menutree";

export default {
  name: "nagivation",
  components: {
    peopleLinks,
    searchinput,
    menutree,
  },
  data() {
    return {
      cartNum: 0,
      scrollBegin: 50, // how many window.scrollY start opacity animation.
      redCartBegin: 20,
      isShowPeopleLinks: false,
      isShowSearchInput: false,
      isShowMenu: false,
      searchInputHotKeyword: '',
    };
  },
  props: {
    isShowRedTop: {
      type: Boolean,
      required: true,
    },
    windowY: {
      type: Number,
      required: true,
    },
    isDownloadAppOpened: {
      type: Boolean,
      required: true,
    },
    directShowSearchInput: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    directShowSearchInput: function (n) {
      if (n) {
        this.showSearchInput();
      }
    },
  },
  created() {
    const isLoginInfo = this.$cookies.get("FEEC-B2C-INFO");
    if (
      !!isLoginInfo &&
      !!isLoginInfo.data &&
      isLoginInfo.data.shoppingBagCount
    ) {
      this.cartNum = isLoginInfo.data.shoppingBagCount;
    }
  },
  computed: {
    // 舊navigation height: 70px，icons剛好在50px位置
    checkShowLogo() {
      return this.windowY > 50 ? false : true;
    },
    // 新navigation底色height: 45px，到45px時Y軸歸零->top=0
    whiteBgTop() {
      const n = this.windowY - 45;
      return "translateY(" + (n > 0 ? 0 : n) + "px)";
    },
    topLogoImgOpacity() {
      const n = 1 - this.windowY / this.scrollBegin;
      return n < 1 ? (n < 0 ? 0 : n) : 1;
    },
    topImgOpacity() {
      return this.windowY >= this.scrollBegin ? 0 : 1;
    },
    bottomImgOpacity() {
      const n = 1 - this.windowY / 60;
      return n >= 1 ? 0 : 1 - n > 1 ? 1 : 1 - n;
    },
    // .icon-box height: 12px ->translateY: 12px
    // topImgPos() {
    //   const n = 12 - this.windowY * (12 / this.scrollBegin);
    //   return "translateY(" + (n < 0 ? 0 : n) + "px)";
    // },
    // 購物車數量樣式red or white
    isRedCartNumber() {
      return this.windowY > this.redCartBegin ? true : false;
    }
  },
  methods: {
    setHotKeyword(keyword) {
      this.searchInputHotKeyword = keyword
      this.$emit('setHotKeyword', keyword)
    },
    closeSearchMenu() {
      this.isShowSearchInput = false;
      this.$emit("stopBodyScroll", "close");
      this.$emit("disableShowSearchInput");
    },
    closeShowMenu() {
      this.isShowMenu = false;
      this.$emit("stopBodyScroll", "close");
    },
    // 前往無敵大好康
    directBestbuy() {
      this.$emit("directBestbuy");
    },
    // 打開漢堡選單
    showMenu(evt) {
      if (evt) evt.preventDefault();
      if (!this.isShowMenu) {
        this.isShowSearchInput = false;
        this.isShowPeopleLinks = false;
        // 顯示新navigation，移出舊navigation(height: 70px)
        setTimeout(() => {
          window.scrollTo(0, 70);
        }, 0);
        this.isShowMenu = true;
        this.$emit("stopBodyScroll");
      } else {
        this.isShowMenu = false;
        this.$emit("stopBodyScroll", "close");
        this.$emit("disableShowSearchInput");
      }
    },
    // 打開會員中心
    showPeopleLinks(evt) {
      if (evt) evt.preventDefault();
      this.isShowPeopleLinks = !this.isShowPeopleLinks;
      if (this.isShowPeopleLinks) {
        this.isShowMenu = false;
        this.isShowSearchInput = false;
        // 顯示新navigation，移出舊navigation(height: 70px)
        setTimeout(function () {
          window.scrollTo(0, 70);
        }, 0);
        this.$emit("stopBodyScroll");
      } else {
        this.$emit("stopBodyScroll", "close");
        this.$emit("disableShowSearchInput");
      }
    },
    showSearchInput(evt) {
      if (evt) evt.preventDefault();
      this.isShowSearchInput = !this.isShowSearchInput;
      if (this.isShowSearchInput) {
        this.isShowMenu = false;
        this.isShowPeopleLinks = false;
        // 顯示新navigation，移出舊navigation(height: 70px)
        setTimeout(function () {
          window.scrollTo(0, 70);
        }, 0);
        this.$emit("stopBodyScroll");
      } else {
        this.$emit("stopBodyScroll", "close");
        this.$emit("disableShowSearchInput");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../style/color';
@import '../../style/mixin';

.navigation-bar {
  z-index: 10;
  position: relative;
  height: 50px;
  margin: 0;

  .icon-box {
    z-index: 2;
    position: fixed;
    width: 100%;
    will-change: transform;
    // transform: translateY(12px);
  }

  .whiteBg {
    z-index: 1;
    position: fixed;
    width: 100%;
    height: 45px;
    background-color: $red;
    will-change: transform;
    transform: translateY(-45px);

    .new-search {
      position: relative;
      background-color: $white;
      min-width: 225px;
      height: 34px;
      border-radius: 10px;
      display: inline-flex;
      align-items: center;
      padding-right: 34px;
      box-sizing: border-box;
      margin: 6px 105px 0 45px;
      a {
        text-decoration: none;
      }
      span {
        color: $web_minor;
        font-size: 1.6rem;
        margin-left: 40px;
        @include font-break(1)
      }
      img {
        opacity: 0;
        left: 0;
        width: 34px;
        height: 34px;
        &:last-of-type {
          right: 5px;
          left: unset;
          top: 5px;
          width: 24px;
          height: 24px;
        }
      }
    }
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 45px;
    height: 45px;

    &.bottom {
      opacity: 0;
    }
  }

  .new-menu {
    position: absolute;
  }

  .new-people {
    position: absolute;
    top: 0;
    right: 95px;
  }

  .new-cart {
    position: absolute;
    top: 0;
    right: 5px;
    height: 45px;
    width: 45px;

    span {
      position: absolute;
      top: 4px;
      right: 0px;
      color: $red;
      background-color: $white;
      border-radius: 25px;
      font-size: 1.2rem;
      font-weight: 500;
      width: 18px;
      line-height: 18px;
      text-align: center;

      // &.active {
      //   color: $white;
      //   background-color: $red;
      // }
    }
  }

  .new-logo {
    position: relative;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.2s;
    display: inline-block;
    width: 155px;
    height: 25px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
