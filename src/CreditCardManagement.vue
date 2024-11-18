<template>
<div>
  <downloadapp v-on:downloadAppOpened="downloadAppOpened" />
  <navigation :isShowRedTop="isShowRedTop" :windowY="windowY" v-on:stopBodyScroll="stopBodyScroll" :isDownloadAppOpened="isDownloadAppOpened" />
  <createDialog v-if="isFullscreenDialogShow" :creditCardData = "data" :creditCardLimit="limit" :ticket="ticket" :showDialog = "isFullscreenDialogShow" @closeDialog="closeDialog" @updateDataList="updateDataList"></createDialog>
  <div v-if="data" class="creditCard">
    <div class="creditCard__head">
      <p class="creditCard__head-content">
        信用卡管理
      </p>
      <span v-if="data.length < limit" class="creditCard__head-addBtn" @click="openDialog">新增</span>
    </div>
    <div class="creditCard__info">
      <creditCardList v-if="data.length > 0" :data="data" :ticket="ticket" @updateDataList="updateDataList"></creditCardList>
      <div v-else class="noCreditCard">
        <i class="noCreditCard__img" />
        <p>你沒有任何已儲存的信用卡</p>
        <p>快來新增信用卡，以節省您結帳的時間</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import downloadapp from "./components/common/downloadapp.vue"; // 頁面最上方的app下載提示
import navigation from "./components/common/navigationFix.vue"; // 共用天的導覽列
import creditCardList from './components/creditCardManagement/creditCardList.vue';
import createDialog from './components/creditCardManagement/createDialog.vue';

export default {
  name: "creditCardManagement",
  data() {
    return {
      isDownloadAppOpened: false,
      isShowRedTop: true,
      windowY: 0,
      isStopScrolling: false,
      data: null,  //信用卡資訊物件
      ticket:null,  //cookie中ticket
      isFullscreenDialogShow:false, //新增信用卡dialog控制
      limit:null,  //系統設定信用卡儲存上限筆數
    };
  },
  components: {
    downloadapp,
    navigation,
    creditCardList,
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
    getCreditCardData() { // 取得api原始資料
      this.ticket = this.$cookies.get('FEEC-B2C-TICKET')
      if (this.ticket) {
        this.axios.get(`api/member/creditCard`, {
          headers: {
            'authorization': 'Bearer' + this.ticket
          }
        }).then(res => {
          const data = res.data;
          if (data.code === 1 && data.payload) {
            this.data = data.payload[0].creditCardInfos
            this.limit = parseInt(data.payload[0].limit)
          }
        }).catch((err) => {
          console.error(err);
        });
      }
    },
    openDialog(){  //開啟新增信用卡視窗
      this.isFullscreenDialogShow = true ;
    },
    closeDialog(){  // 關閉新增信用卡視窗
      this.isFullscreenDialogShow = false ;
    },
    updateDataList(){ //打api獲得當前信用卡列表
      this.getCreditCardData();  
    } 
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
    this.getCreditCardData()
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
.creditCard{
  text-align: center;
  &__head{
    color: $mine-shaft;
    font-weight: 500;
    border-bottom: 1px solid $alto;
    position: relative;
    &-content{
      font-size: 1.8rem;
      line-height: 50px;
      text-align: center;
    }
    &-addBtn{
      position: absolute;
      right: 19px;
      top: 0px;
      bottom: 0px;
      font-size: 15px;
      line-height: 50px;
    } 
  }
  &__info{
      background-color: $background;
      font-size: 1.4rem;
      color: $heavy-metal;
      padding: 10px;
      min-height: 300px;
    .noCreditCard{
      margin-top: 20px;
      min-height: 300px;
      &__img{
        margin: 20px 0;
        width: 212px;
        height: 163px;
        background: url(./images/icons/credit_manage_big_img.png) no-repeat;
      }
      p{
        font-size: 1.6rem;
        color: $sliver;
      }
    }
  }
}
</style>
