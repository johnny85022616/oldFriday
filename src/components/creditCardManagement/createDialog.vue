<template>
<fullscreenDialog v-if="showDialog" @closeDialog="closeDialog" :useClose="true">
  <template v-slot:header>
    <span>新增信用卡</span>
  </template>
  <template v-slot:body>
    <div class="createCreditCard">
      <div v-if="creditCardData.length < creditCardLimit" class="createCreditCard__preset">
        <p class="createCreditCard__preset-content">設為預設信用卡</p>
        <i :class="switchObj" @click="switchClick"></i>
      </div>
      <div class="createCreditCard__input">
        <label>持卡人姓名</label>
        <input v-model="input.name" type="text" placeholder="請輸入持卡人姓名">
      </div>
      <div class="createCreditCard__input">
        <label>信用卡號碼</label>
        <input v-model="input.creditNum" @input="creditNumInput" type="text" class="credit-number" placeholder="XXXX XXXX XXXX XXXX" maxlength="19">
      </div>
      <div class="createCreditCard__input">
        <label>有效期限</label>
        <div class="flex">
          <input v-model="input.expireMonth" @input="expireInput('expireMonth')" ref="expireMonth" type="text" placeholder="MM" maxlength="2">
          <input v-model="input.expireYear" @input="expireInput('expireYear')" ref="expireYear" type="text" placeholder="YY" maxlength="2">
        </div>
      </div>
      <p class="createCreditCard__message">按下確認即表示同意將本次信用卡資料紀錄於「信用卡管理」中，節省下次結帳時間。</p>
      <div v-if="alertObj.isShow" class="createCreditCard__alert">
        <i></i>
        <p>{{alertObj.message}}</p>
      </div>
      <div class="createCreditCard__confirmBtn">
        <span @click="confirmBtnClick">確認</span>
      </div>
    </div>
  </template>
</fullscreenDialog>
</template>

<script>
import fullscreenDialog from '../common/fullscreenDialog.vue';
export default {
  name: 'createDialog',
  data() {
    return {
      switchObj: { //控制預設switch button
        'createCreditCard__preset-switch': true,
        off: false
      },
      input: { //使用者輸入資料
        name: '',
        creditNum: '',
        expireMonth: '',
        expireYear: ''
      },
      alertObj: {
        isShow: false,
        message: '',
      },
    }
  },
  props: {
    showDialog: {
      type: Boolean,
      default: () => false
    },
    creditCardData: {
      type: Array,
      default: () => []
    },
    creditCardLimit: {
      type: Number,
      default: () => 5
    },
    ticket: {
      type: String,
      default: () => ''
    }
  },
  components: {
    fullscreenDialog
  },
  methods: {
    closeDialog() { //關閉新增視窗
      this.$emit("closeDialog")
    },
    switchClick() {
      this.switchObj.off = !this.switchObj.off;
    },
    creditNumInput() { //信用卡號碼4個一組去除非數字輸入(每次輸入驗證)
      let val = this.input.creditNum;
      val = val.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
      let matches = val.match(/\d{4,16}/g)
      let match = (matches && matches[0]) || ''
      let parts = []
      for (let i = 0, len = match.length; i < len; i += 4) { //4個一組
        parts.push(match.substring(i, i + 4))
      }
      if (parts.length) {
        this.input.creditNum = parts.join(' ')
      } else {
        this.input.creditNum = val
      }
    },
    expireInput(key) { //到期日到期月去除非數字輸入＆輸入完月份自動focus到年份(每次輸入驗證)
      this.input[key] = this.input[key].replace(/\s+/g, '').replace(/[^0-9]/gi, '')
      if (/([\d]{2})/i.test(this.input[key]) && key === 'expireMonth') {
        this.$refs.expireMonth.nextSibling.focus();
      }
    },
    confirmBtnClick() {
      let errMesssage = this.checkData();

      if (errMesssage !== '') { // 第一次檢查
        alert(errMesssage)
        return false;
      }

      let isDefault = 'N';
      let temp = false;

      if (!(this.switchObj.off)) {
        isDefault = 'Y';
      }
      if (!(this.creditCardData.length < this.creditCardLimit)) {
        temp = true
      }

      let postData = {
        number: this.input.creditNum.replace(/\s+/g, ''),
        name: this.input.name,
        expiration: `20${this.input.expireYear}${this.input.expireMonth}`,
        isDefault: isDefault,
        temp: temp
      }

      if (this.ticket) {
        this.axios.post(`api/member/creditCard`, postData, {
          headers: {
            'authorization': 'Bearer' + this.ticket
          }
        }).then(res => {
          const data = res.data;
          if (data.code === 3101 || data.code === 3100) {
            this.alertObj.isShow = true;
            this.alertObj.message = data.message;
            return false;
          }
          else if (data.code === 1 || data.message === 'OK') {
            this.$emit('updateDataList')
            this.closeDialog();
          }else{
            alert(data.message)
          }
        }).catch((err) => {
          console.error(err);
        });
      }

      console.log(postData);

    },
    checkData() { // 按下確認後先做第一次檢查
      let errorMessage = '';
      let name = this.input.name;
      let number = this.input.creditNum;
      let month = this.input.expireMonth;
      let year = this.input.expireYear;

      // 檢查卡號
      if (!number.length) {
        errorMessage = '請輸入信用卡卡號'
        return errorMessage
      } else {
        // 長度檢查
        if (number.length < 16) {
          errorMessage = '請輸入16碼信用卡卡號'
          return errorMessage
        }

        // 必須為數字
        if (isNaN(parseInt(number))) {
          errorMessage = '錯誤的信用卡卡號格式,請重新輸入'
          return errorMessage
        }

        // 不可使用的卡別（第一碼 為3/4/5以外的卡。)
        if (
          !number.startsWith('3') &&
          !number.startsWith('4') &&
          !number.startsWith('5')
        ) {
          errorMessage = '輸入卡片資料無效/無法使用,請重新輸入或更換卡片'
          return errorMessage
        }
      }

      // 檢查到期日資料長度
      if (month.length < 2 || year.length < 2) {
        errorMessage = '請輸入有效期限'
        return errorMessage
      } else {
        year = '20' + year
        // 檢查到期日
        var today = new Date()
        if (today.getFullYear() > year) {
          errorMessage = '有效期限已過期,請重新輸入'
          return errorMessage
        }

        if (month < 0 || month > 12) {
          errorMessage = '錯誤的有效期限,請重新輸入'
          return errorMessage
        }
      }

      //檢查姓名
      if (!name.length) {
        errorMessage = '請輸入真實姓名'
        return errorMessage
      }
      return errorMessage
    }
  },
  created() {
    this.$bus.$on('getCreateAlert', (alertObj) => { //把自訂義事件註冊到事件總線
      this.alertObj = alertObj;
    })
  },
  beforeDestroy() {
    this.$bus.$off('getCreateAlert') //事件總線解綁
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/_color.scss";

.createCreditCard {
  margin: 0 10px;
  color: $tundora;

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

    label {
      display: inline-block;
      min-height: 45px;
      display: flex;
      align-items: center;
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
  }
  &__message{
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
    p{
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
