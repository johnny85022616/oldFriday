<template>
<div
  class="product-tabs"
  v-if="isShow"
  :style="{ top: topVal }">
  <ul>
    <li
      v-for="(item, index) of tabs"
      :key="index"
      @click="swapIndex(index)">
      <span :class="{ active: index === selectedIndex }">{{ item }}</span>
    </li>
  </ul>
  <i :class="'share'" @click="shareApp"></i>
</div>
</template>

<script>
export default {
  name: "headtabs",
  data() {
    return {
      tabs: ["簡介", "詳情", "規格", "推薦"],
      tabSections: [],
      secTop: [],
      topDistance: 45,
      selectedIndex: 0,
      detailContentTop: 0,
      isShow: false,
      lockScrollState: false,
      isUp: false,
    };
  },
  props: {
    hasRelateProduct: {
      type: Boolean,
      default: () => false
    },
    isDownloadAppOpened: {
      type: Boolean,
    },
    windowY: {
      type: Number,
    },
    additional: {
      type: Array,
      default: () => [],
    },
  },
  updated() {
    this.tabSections = [...document.querySelectorAll(".tab-section")];
    this.tabSections.forEach((e, i) => {
      this.secTop[i] = e.offsetTop - this.topDistance;
    });
  },
  watch: {
    hasRelateProduct: function () {
      if (this.hasRelateProduct && this.tabs.indexOf("推薦") === -1) {
        this.tabs.push("推薦")
      }
    },
    additional: function () {
      if (this.additional && this.additional.length > 0) {
        this.tabs = ["簡介", "詳情", "規格", "加購", "推薦"];
      }
    },
    windowY: function (n , o) {
      // scroll over 50px and show headtab
      this.isShow = n > 58 ? true : false;

      //向上滾動
      if(n<o){
        this.isUp = true;
      }else{ //向下滾動
        this.isUp = false;
      }
      // listen y position and tabs add red underline.
      if (!this.lockScrollState) {
        const findOverTopIndex = this.secTop.filter((v) => {
          return this.windowY >= v ? v : 0
        })
        this.selectedIndex = findOverTopIndex.length - 1 < 0 ? 0 : findOverTopIndex.length - 1
      }
    },
  },
  methods: {
    shareApp() {
      if (navigator.share) {
        navigator
          .share({
            title: document.title,
            text: document.title,
            url: document.location.href,
          })
          .then(() => console.log("Successful share"))
          .catch((error) => console.log("Error sharing", error));
      }
    },
    swapIndex(i) {
      this.lockScrollState = true // prevent click tab effect windowY event.
      this.selectedIndex = i;

      const tab = this.tabs[i];
      this.tabSections = [...document.querySelectorAll(".tab-section")];
      this.tabSections.forEach((e) => {
        if (tab === e.getAttribute("data-tab")) {
          this.detailContentTop = e.offsetTop;
          window.scrollTo({
            top: this.detailContentTop - this.topDistance,
            left: 0,
            behavior: "instant",
          });
        }
      });

      setTimeout(() => {
        this.lockScrollState = false
      }, 50)
    },
  },
  computed: {
    topVal() {
      if(this.isDownloadAppOpened && this.isUp){
        return '103px' //天加上app高度
      }else if(this.isDownloadAppOpened){
        return '58px' //app高度
      }else if(this.isUp === true){
        console.log(this.isUp);
        return '45px'  //天高度
      }else{
        return '0'
      }
    },
  }
};
</script>

<style lang="sass" scoped>
@import '../../style/color.scss'
.product-tabs
  position: sticky
  z-index: 2
  width: 100%
  height: 45px
  background-color: $white
  border-bottom: 1px solid $web_border
  ul
    padding: 0 20px 0 12.5px
    height: 100%
  li
    display: inline-block
    padding: 0
    margin: 12px 7.5px 0
    width: 35px
    vertical-align: middle
    list-style-type: none
    font-size: 1.4rem
    color: #adadad
    text-align: center
  span
    padding-bottom: 5px
    &.active
      color: #3c3c3c
      border-bottom: 2px solid #f34f59
</style>
