<template>
  <fullscreenDialog v-if="showDialog" @closeDialog="closeDialog" :useClose="true">
    <template v-slot:header>
      <span>新增門市</span>
    </template>
    <template v-slot:body>
      <div class="createStore">
        <div class="createStore__preset">
          <p class="createStore__preset-content">設為預設門市</p>
          <i :class="switchObj" @click="switchClick"></i>
        </div>
        <div :class="['createStore__input' , {'error': error.isNameErrorShow}]">
          <label>
            <span>收貨人</span>
            <div>
              <i :class="checkboxClassObj" @click="sameCheckboxClick"></i>
              <p>同會員資料</p>
            </div>
          </label>
          <div class='inputArea'>
            <input class="inputArea__nameInput" v-model="input.name" type="text" @change="handleInputChange" placeholder="請輸入收貨人姓名">
            <i class="inputArea__nameClearBtn" v-if="clearBtn.isNameClearBtnShow" @click="handleClearBtnClick"></i>
          </div>
          <p class="errorMsg">請輸入收貨人姓名</p>
        </div>
        <div :class="['createStore__input' , {'error': error.isPhoneErrorShow}]">
          <label>手機號碼</label>
          <div class='inputArea'>
            <input class="inputArea__phoneInput" v-model="input.phoneNum" type="text" @change="handleInputChange" placeholder="請輸入收貨人手機號碼" maxlength="10">
            <i class="inputArea__phoneClearBtn" v-if="clearBtn.isPhoneClearBtnShow" @click="handleClearBtnClick"></i>
          </div>
          <p class="errorMsg">請輸入收貨人手機號碼</p>
        </div>
        <div v-if="!selectStore" class="createStore__input">
          <label>取貨門市</label>
          <div class="store" @click="getStoreMap(9)">
            <i class="storeImg storeType9"></i>
            <span>請選擇遠傳門市</span>
            <i class="arrow"></i>
          </div>
          <div class="store" @click="getStoreMap(8)">
            <i class="storeImg storeType8"></i>
            <span>請選擇德誼門市</span>
            <i class="arrow"></i>
          </div>
          <div class="store" @click="getStoreMap(1)">
            <i class="storeImg storeType1"></i>
            <span>請選擇7-11門市</span>
            <i class="arrow"></i>
          </div>
          <div class="store" @click="getStoreMap(2)">
            <i class="storeImg storeType2"></i>
            <span>請選擇全家門市</span>
            <i class="arrow"></i>
          </div>
        </div>
        <div v-else class="createStore__result">
          <label>取貨門市</label>
          <div class="storeInfo">
            <i class='delChoseBtn' @click="selectStore=null"></i>
            <div>
              <i :class="`storeImg storeType${selectStore.storeType}`"></i>
              <font>{{selectStore.storeTypeName}}{{selectStore.storeName}}</font>
            </div>
            <font>{{selectStore.storeAddress}}</font>
          </div>
        </div>
        <p class="createStore__message">按下確認即表示同意將本次信用卡資料紀錄於「取貨門市管理」中，節省下次結帳時間。</p>
        <div v-if="alertObj.isShow" class="createStore__alert">
          <i></i>
          <p>{{alertObj.message}}</p>
        </div>
        <div class="createStore__confirmBtn">
          <span @click="confirmBtnClick">確認</span>
        </div>
      </div>
      <!-- 供選擇取貨門市之後後端將各門市資訊帶入-->
      <input type="hidden" name="srvno" value="" id="storeId">
      <input type="hidden" name="storename" value="" id="storeName">
      <input type="hidden" name="storeaddress" value="" id="storeAddress">
      <input type="hidden" name="storeType" value="" id="storeType">
      <input type="hidden" name="storeStatus" value="" id="storeStatus">
    </template>
  </fullscreenDialog>
</template>

<script>
import fullscreenDialog from '../common/fullscreenDialog.vue';
var observer;
export default {
  name: 'createDialog',
  data() {
    return {
      switchObj: { //控制預設switch button
        'createStore__preset-switch': true,
        off: false
      },
      checkboxClassObj: { //同會員資料checkbox
        sameCheckbox: true,
        on: false,
      },
      input: { //使用者輸入資料
        name: '',
        phoneNum: '',
      },
      alertObj: { //alert區塊
        isShow: false,
        message: '',
      },
      clearBtn: { //清除按鈕
        isNameClearBtnShow: false,
        isPhoneClearBtnShow: false
      },
      selectStore: null,
      error: { //input框的錯誤區塊
        isNameErrorShow: false,
        isPhoneErrorShow: false
      }
    }
  },
  props: {
    showDialog: {
      type: Boolean,
      default: () => false
    },
    ticket: {
      type: String,
      default: () => ''
    },
    userInfo: {
      type: Object,
      require: true
    },
  },
  components: {
    fullscreenDialog
  },
  methods: {
    closeDialog() { //關閉新增視窗
      this.$emit("closeDialog")
    },
    switchClick() { //設為預設門市switch切換
      this.switchObj.off = !this.switchObj.off;
    },
    sameCheckboxClick() { // 同會員資料
      if (!this.checkboxClassObj.on) {
        this.checkboxClassObj.on = true
        this.input.name = this.userInfo.name;
        let [phoneObj] = this.userInfo.phones.filter(ele => ele.type === "MOBILE");
        this.input.phoneNum = phoneObj.number;
        this.clearBtn.isNameClearBtnShow = true;
        this.clearBtn.isPhoneClearBtnShow = true;
        return false;
      }
      this.checkboxClassObj.on = false;
    },
    handleInputChange(e) { //觸發change事件時，控制clearBtn出現或消失 
      if (e.target.className === "inputArea__nameInput") {
        if (this.input.name !== '') {
          this.clearBtn.isNameClearBtnShow = true;
          return false
        }
        this.clearBtn.isNameClearBtnShow = false;
      } else {
        if (this.input.phoneNum !== '') {
          this.clearBtn.isPhoneClearBtnShow = true;
          return false
        }
        this.clearBtn.isPhoneClearBtnShow = false;
      }
    },
    handleClearBtnClick(e) { //點擊clear button清除對應input值，並讓clearBtn消失
      if (e.target.className === "inputArea__nameClearBtn") {
        this.input.name = '';
        this.clearBtn.isNameClearBtnShow = false;
      } else {
        this.input.phoneNum = ''
        this.clearBtn.isPhoneClearBtnShow = false;
      }
    },
    //點選各門市選項
    getStoreMap(type) {
      const serviceType = 1;
      const storeType = type;
      let eMapWindow;
      if (!(/(localhost)/i.test(location.host))) {  //非localhost環境
        const host = location.host;
        const mserviceUrl = 'https://mservice-event.shopping.friday.tw/mobileweb/redirect?redirectUri=';
        const url = encodeURIComponent(`https://${host}/mobileweb/member/cvs/eMap?serviceType=${serviceType}&storeType=${storeType}&device=mobileweb`);
        const url1 = mserviceUrl + url
        console.log(`https://${host}/mobileweb/member/cvs/eMap?serviceType=${serviceType}&storeType=${storeType}&device=mobileweb`);
        var jScript = `<script>window.location.href="${url1}"<\/script>` // eslint-disable-line
        eMapWindow = window.open('', '電子地圖')
        eMapWindow.document.write(jScript);
        eMapWindow.focus()
      } else {
        eMapWindow = window.open('http://localhost:8080/store.html', '電子地圖')
        eMapWindow.focus()
      }
      var target = document.querySelector('#storeId');
      observer = new MutationObserver(() => { //監聽dom target變化
        const storeId = document.querySelector('#storeId').value;
        const storeName = document.querySelector('#storeName').value;
        const storeAddress = document.querySelector('#storeAddress').value;
        const storeType = document.querySelector('#storeType').value;
        const storeStatus = document.querySelector('#storeStatus').value;

        var storeTypeName = '';
        if (storeType == 1) {
          storeTypeName = "7-11 ";
        } else if (storeType == 2) {
          storeTypeName = "全家 ";
        } else if (storeType == 9) {
          storeTypeName = "遠傳 ";
        }

        this.selectStore = {
          storeId,
          storeName,
          storeAddress,
          storeType,
          storeStatus,
          storeTypeName
        }
      });
      var config = {
        attributes: true,
        childList: true,
        characterData: true
      };
      observer.observe(target, config);
    },
    //檢查新增欄位資料
    checkData() { 
      let check = true
      if (this.input.name === '') {  //姓名
        this.error.isNameErrorShow = true;
        check = false;
      }
      if (this.input.phoneNum === '') {  //手機
        this.error.isPhoneErrorShow = true;
        check = false;
      }
      if (!this.selectStore) { //門市
        alert('請選擇取貨門市')
        check = false;
      } else if(this.selectStore && this.selectStore.storeStatus === 0){ //有選擇門市但門市已失效
        alert('此門市已失效，請重新選擇。')
        check = false;
      }

      return check
    },
    insertMemberStore(){ //將新增的門市送至後端且更新資料後關閉popup
      const temp = false 
      const postData = {
        storeType: this.selectStore.storeType,
        storeName: this.selectStore.storeName,
        consigneeName: this.input.name,
        storeId: this.selectStore.storeId,
        phoneNumber: this.input.phoneNum,
        storeAddress: this.selectStore.storeAddress,
        isDefault: temp ? false : !this.switchObj.off
      }

      

      if (this.ticket) {
        this.axios.post(`api/member/store`, postData, {
          headers: {
            'authorization': 'Bearer' + this.ticket
          }
        }).then(res => {
          const data = res.data;
          if(data.code != '1' || data.message != 'OK'){
            console.error(data.message)
            alert(data.message)
          }else{
            this.$emit('updateDataList'); //觸發父類別更新data
            this.closeDialog(); //關閉新增門市popup框
          }
        }).catch((err) => {
          console.error(err);
          console.log('json有問題請檢查')
          alert('此門市系統維護中，請選擇其他門市或聯繫客服人員')
        });
      }
    },
    //確認新增按鈕click
    confirmBtnClick() {  
      this.error.isNameErrorShow = false;
      this.error.isPhoneErrorShow = false;

      const check = this.checkData();  //防呆檢查
      if (!check) {
        return false
      }
      this.insertMemberStore()
    },
  },
  created() {
  },
  watch: {
    selectStore() {
      observer.disconnect(); //關閉observer釋放資源
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/_color.scss";

.createStore {
  margin: 0 10px;
  color: $tundora;
  padding-bottom: 100px;

  &__preset {
    margin: 10px 0;
    min-height: 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $tundora;

    &-content {
      font-weight: 500;
      color: $heavy-metal;
    }

    &-switch {
      width: 40px;
      height: 22px;
      background: url(../../images/icons/switch-on.png) center/40px 22px no-repeat;

      &.off {
        background: url(../../images/icons/switch-off.png) center/40px 22px no-repeat;
      }
    }
  }

  &__input {
    margin-bottom: 20px;

    .store {
      height: 40px;
      font-size: 1.4rem;
      margin: 0px 0px 10px 0px;
      box-sizing: border-box;
      padding: 10px 5px 5px 15px;
      border-radius: 8px;
      border: solid 1px $alto;
      position: relative;
      display: flex;
      align-items: center;

      .arrow {
        width: 22px;
        height: 22px;
        background: url(../../images/icons/angle-right.svg) center/22px no-repeat;
        position: absolute;
        right: 15px;
      }

      span {
        margin-left: 10px;
      }
    }

    .inputArea {
      position: relative;

      i {
        width: 16px;
        height: 16px;
        background: url(../../images/icons/circle-cross-gy.svg) center/16px 16px no-repeat;
        position: absolute;
        bottom: 13px;
        right: 15px;
      }
    }

    label {
      display: inline-block;
      min-height: 45px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      div {
        display: flex;
        align-items: center;

        .sameCheckbox {
          cursor: pointer;
          width: 30px;
          height: 19px;
          background: url(../../images/icons/square.png) center/19px 19px no-repeat;

          &.on {
            background: url(../../images/icons/square-tick-rd.png) center/19px 19px no-repeat;
          }
        }
      }
    }

    input {
      width: 100%;
      height: 40px;
      background-color: $black-haze;
      border-radius: 10px;
      font-size: 16px;
      box-sizing: border-box;
      margin: 0;
      padding: 10px;
      border: 0;
      outline: none;
    }

    .errorMsg {
      display: none;
    }

    &.error {
      .errorMsg {
        display: block;
        font-size: 1rem;
        color: $red;
      }

      input {
        border: 1px solid $red;
      }
    }
  }

  &__result {
    label {
      display: inline-block;
      min-height: 45px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .storeInfo {
      width: 100%;
      font-size: 1.4rem;
      margin: 0 0 10px 0;
      box-sizing: border-box;
      padding: 10px 15px;
      border-radius: 8px;
      vertical-align: middle;
      position: relative;
      background-color: $background;
      color: $sliver;

      >div {
        display: flex;
        align-items: center;

        font {
          margin-left: 8px;
          color: $tundora;
        }

        margin-bottom: 8px;
      }

      .delChoseBtn {
        width: 16px;
        height: 16px;
        background: url(../../images/icons/circle-cross-gy.svg) center/16px no-repeat;
        position: absolute;
        right: 14px;
      }
    }
  }

  .storeImg {
    width: 24px;
    height: 24px;

    &.storeType9 {
      background: url(../../images/icons/fet.svg) center/24px 24px no-repeat;
    }

    &.storeType8 {
      background: url(../../images/icons/de.svg) center/24px 24px no-repeat;
    }

    &.storeType1 {
      background: url(../../images/icons/icon-7-11.svg) center/24px 24px no-repeat
    }

    &.storeType2 {
      background: url(../../images/icons/icon-family.svg) center/24px 24px no-repeat;
    }
  }

  &__message {
    margin-bottom: 10px;
  }

  &__alert {
    display: flex;
    align-items: center;

    i {
      width: 20px;
      height: 20px;
      background: url(../../images/icons/notice.png) center/20px 20px no-repeat;
      margin-right: 5px;
    }

    p {
      color: $pomegranateapprox;
    }
  }

  &__confirmBtn {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px 0 10px;
    border-top: 1px solid $alto;
    background-color: $white;
    display: flex;
    justify-content: center;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 95%;
      height: 40px;
      text-align: center;
      border-radius: 10px;
      background-color: $red;
      color: $white;
      font-size: 16px;
      cursor: pointer;
      border: 0;
      line-height: 16px;
    }
  }
}

.flex {
  display: flex;
  justify-content: space-between;

  input {
    width: 49%;
    text-align: center;
  }
}

::-webkit-input-placeholder {
  color: $sliver;
}
</style>
