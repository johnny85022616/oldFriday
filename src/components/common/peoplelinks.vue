<template>
  <div class="wrap" :style="reCalcTop">
    <ul :style="{ height: menuHeight }">
      <li>
        <div v-if="loginObj.isLogin" class="loginStatus">
          {{ loginObj.user }}
          <a :href="loginObj.url" class="loggout">{{ loginObj.text }}</a>
        </div>
        <div v-else>
          <a :href="loginObj.url">{{ loginObj.text }}</a>
        </div>
      </li>
      <li>
        <a href="/mobileweb/member/ListMyOrderMenu?module=list">查訂單</a>
      </li>
      <li>
        <a href="/mobileweb/member/MemberQueryProduct">追蹤清單</a>
      </li>
      <li>
        <a href="/mobileweb/member/invitation">我的推薦碼</a>
      </li>
      <li>
        <a href="/mobileweb/member/fcoin/list">查遠傳幣</a>
      </li>
      <li>
        <a href="/mobileweb/member/queryCoupon">查折價券</a>
      </li>
      <li>
        <a href="/mobileweb/member/queryHappyGoPoints">快樂購點數</a>
      </li>
      <li v-if="loginObj.isLogin">
        <a href="//shopping.friday.tw/event/20180528_rebate/" target="_blank">遠傳幣返利說明</a>
      </li>
      <li v-if="loginObj.isLogin">
        <a href="//friday.tw/staff" target="_blank">員購專區</a>
      </li>
      <li v-if="loginObj.isLogin">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSewukqCbv_96hBQcAxxmX-jvwX5q-OvBz_zQppnIbidTowOyQ/viewform"
          target="_blank"
        >員購回饋</a>
      </li>
      <li @click="openMenu('checkout')" class="menu">
        結帳管理
        <i class="arrow"></i>
      </li>
      <li v-if="isShowMenu.checkout">
        <a href="/mobileweb/member/creditCardInfo">信用卡管理</a>
      </li>
      <li v-if="isShowMenu.checkout">
        <a href="/mobileweb/member/cvsInfo">取貨門市管理</a>
      </li>
      <li v-if="isShowMenu.checkout">
        <a href="/mobileweb/member/einvoiceInfo">發票管理</a>
      </li>
      <li @click="openMenu('service')" class="menu">
        客服中心
        <i class="arrow"></i>
      </li>
      <li v-if="isShowMenu.service">
        <a href="/mobileweb/intro/commonProblem">常見問題</a>
      </li>
      <li v-if="isShowMenu.service">
        <a href="/mobileweb/member/myQAList">問答記錄</a>
      </li>
      <li v-if="isShowMenu.service">
        <a href="/mobileweb/intro/service_line">聯絡客服</a>
      </li>
      <li @click="openMenu('rights')" class="menu">
        會員權益
        <i class="arrow"></i>
      </li>
      <li v-if="isShowMenu.rights">
        <a href="https://shopping.friday.tw/event/goldencard/" target="_blank">金卡會員權益</a>
      </li>
      <li v-if="isShowMenu.rights">
        <a href="/mobileweb/intro/shopping_intro">購物說明</a>
      </li>
      <li v-if="isShowMenu.rights">
        <a href="/mobileweb/intro/privacy-intro">隱私權說明</a>
      </li>
      <li v-if="isShowMenu.rights">
        <a href="/mobileweb/intro/memterms-intro">服務條款</a>
      </li>
      <li v-if="isShowMenu.rights">
        <a href="/mobileweb/intro/conditions-intro">購物約定條款</a>
      </li>
      <li @click="openMenu('follow')" class="menu">
        追蹤我們
        <i class="arrow"></i>
      </li>
      <li v-if="isShowMenu.follow"><a href="https://www.facebook.com/fridayshopping" target="_blank"><i class="fb"></i>Facebook</a></li>
      <li v-if="isShowMenu.follow"><a href="https://maac.io/1xDKI" target="_blank"><i class="line"></i>LINE</a></li>
      <li v-if="isShowMenu.follow"><a href="https://fri.page.link/mweb-memlist-download" target="_blank"><i class="appDownload"></i>App下載</a></li>
    </ul>
    <div class="copyright">
      遠時數位科技股份有限公司為遠傳電信集團關係企業/版權所有 Copyright © 2017
      All Rights Reserved by YSDT.
    </div>
  </div>
</template>

<script>
export default {
  name: "peopleLinks",
  data() {
    return {
      isShowMenu: {
        checkout: false,
        service: false,
        rights: false,
        follow: false,
      },
      menuHeight: "0px",
    };
  },
  props: {
    isDownloadAppOpened: {
      type: Boolean,
      required: true,
    },
  },
  created() {
    this.calcHeight();
    window.addEventListener(
      "resize",
      () => {
        this.calcHeight();
      }, {
        passive: true
      }
    );
  },
  methods: {
    openMenu: function (key) {
      Object.keys(this.isShowMenu).forEach((k) => {
        if (k === key) {
          this.isShowMenu[k] = true;
        } else {
          this.isShowMenu[k] = false;
        }
      });
    },
    calcHeight: function () {
      const gap = this.isDownloadAppOpened ? 50 : 0;
      this.menuHeight = window.innerHeight - 102 - gap + "px";
    },
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
    loginObj: function () {
      const isLoginInfo = this.$cookies.get("FEEC-B2C-INFO");
      let obj = {
        isLogin: false,
        url: "",
        text: "登出",
        user: "",
      };
      if (!isLoginInfo) {
        obj.url = `//${
          window.location.host
        }/mobileweb/login?requestURL=${encodeURIComponent(location.href)}`;
        obj.text = "會員登入";
      } else {
        obj.isLogin = true;
        obj.user = decodeURIComponent(isLoginInfo.data.userNeme);
        obj.url = this.configs.loggoutUrl();
      }
      return obj;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/icons.module.scss";
.wrap {
  position: fixed;
  z-index: 9;
  top: 45px;
  width: 100%;
  height: 100%;
  background-color: #ffffff;

  .loginStatus {
    position: relative;

    a {
      justify-content: center;
    }

    .loggout {
      position: absolute;
      top: 13px;
      right: 0;
      width: 58px;
      height: 23px;
      line-height: 23px;
      font-size: 1.2rem;
      border: 1px solid #4a4a4a;
      border-radius: 12px;
      text-align: center;
      box-sizing: border-box;
    }
  }

  ul {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;

    li {
      position: relative;
      line-height: 48px;
      border-bottom: 1px solid #efefef;
      padding: 0 15px;
      box-sizing: border-box;
      list-style-type: none;
      font-size: 1.5rem;
      color: #333333;

      &.menu {
        background-color: #f9f9f9;

        i.arrow {
          position: absolute;
          top: 10px;
          right: 15px;
          display: block;
          background: #f9f9f9 url("https://m.shopping.friday.tw/static/images/down.svg") no-repeat;
          width: 24px;
          height: 24px;
        }
      }

      a {
        display: flex;
        color: #333333;
        text-decoration: none;
      }
    }
  }

  .copyright {
    font-size: 1rem;
    padding: 0 16px;
    margin: 20px 0 10px 0;
    line-height: 16px;
    text-align: center;
    color: #9b9b9b;
    position: fixed;
    bottom: 0;
  }
}
</style>
