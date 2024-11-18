<template>
<div>
  <downloadapp v-on:downloadAppOpened="downloadAppOpened" />
  <navigation :isShowRedTop="isShowRedTop" :windowY="windowY" v-on:stopBodyScroll="stopBodyScroll" :isDownloadAppOpened="isDownloadAppOpened" />
  <createDialog v-if="isFullscreenDialogShow" :ticket="ticket" :showDialog="isFullscreenDialogShow" @closeDialog="closeDialog" @updateDataList="getMemberStore" :userInfo="userInfo"></createDialog>
  <div v-if="data" class="cvs">
    <div class="cvs__head">
      <p class="cvs__head-content">
        取貨門市管理
      </p>
      <span v-if="data.length < limit" class="cvs__head-addBtn" @click="openDialog">新增</span>
    </div>
    <div class="cvs__info">
      <storeList v-if="data.length > 0" :data="data" :ticket="ticket" @updateDataList="getMemberStore" />
      <div v-else class="noStore">
        <i class="noStore__img" />
        <p>你沒有任何已儲存的取貨門市</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import downloadapp from "./components/common/downloadapp.vue"; // 頁面最上方的app下載提示
import navigation from "./components/common/navigationFix.vue"; // 共用天的導覽列
import storeList from './components/cvsManagement/storeList.vue';
import createDialog from './components/cvsManagement/createDialog.vue';
export default {
  name: "cvsManagement",
  data() {
    return {
      isDownloadAppOpened: false,
      isShowRedTop: true,
      windowY: 0,
      isStopScrolling: false,
      data: null, //信用卡資訊物件
      ticket: null, //cookie中ticket
      limit: null, //系統設定信用卡儲存上限筆數
      isFullscreenDialogShow: false, // 控制新增門市視窗
      userInfo: null
    };
  },
  components: {
    downloadapp,
    navigation,
    storeList,
    createDialog
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
    getMemberStore() {  //取得目前設定的取貨門市
      this.ticket = this.$cookies.get('FEEC-B2C-TICKET')
      if (this.ticket) {
        this.axios.get(`api/member/store`, {
          headers: {
            'authorization': 'Bearer' + this.ticket
          }
        }).then(res => {
          const data = res.data;
          if (data.code === 1 && data.payload && data.payload.length > 0) {
            this.data = data.payload[0].convenienceStoreInfos
            this.limit = parseInt(data.payload[0].limit)
          }
        }).catch((err) => {
          console.error(err);
        });
      }
    },
    getMemeberInfo() {  //取得使用者資料供新增時使用
      if (this.ticket) {
        this.axios.get(`api/member/detail`, {
          headers: {
            'authorization': 'Bearer' + this.ticket
          }
        }).then(res => {
          const data = res.data;
          if (data.status === 1 && data.data && data.data.length > 0) {
            this.userInfo = data.data[0]
          }
        }).catch((err) => {
          console.error(err);
        });
      }
    },
    openDialog() { //開啟新增門市視窗
      this.isFullscreenDialogShow = true;
    },
    closeDialog() { // 關閉新增門市視窗
      this.isFullscreenDialogShow = false;
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
    this.getMemberStore();
    this.getMemeberInfo();
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

.cvs {
  text-align: center;

  &__head {
    color: $mine-shaft;
    font-weight: 500;
    border-bottom: 1px solid $alto;
    position: relative;

    &-content {
      font-size: 1.8rem;
      line-height: 50px;
      text-align: center;
    }

    &-addBtn {
      position: absolute;
      right: 19px;
      top: 0px;
      bottom: 0px;
      font-size: 15px;
      line-height: 50px;
    }
  }

  &__info {
    background-color: $background;
    font-size: 1.4rem;
    color: $heavy-metal;
    padding: 10px;
    min-height: 300px;

    .noStore {
      margin-top: 20px;
      min-height: 300px;

      &__img {
        margin: 20px 0;
        width: 212px;
        height: 163px;
        background: url(./images/icons/store_manage_big_img.png) no-repeat;
      }

      p {
        font-size: 1.6rem;
        color: $sliver;
      }
    }
  }
}
</style>
