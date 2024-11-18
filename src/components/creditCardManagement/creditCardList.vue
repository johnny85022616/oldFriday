<template>
<div>
  <popupDialog v-if="isDeletePopupShow" @closeCenterDialog="closeCenterDialog" :callback="deleteCreditCard">是否刪除此信用卡</popupDialog>
  <ul class="creditCardList">
    <li v-for="item in data" :key="item.expressCheckoutId" class="creditCardList__item">
      <div class="creditCardList__item-radio">
        <i v-if="item.isDefault === 'Y'" class="creditCardList__item-radio--on" @click="updateCreditCard(item.expressCheckoutId)"></i>
        <i v-else class="creditCardList__item-radio--off" @click="updateCreditCard(item.expressCheckoutId)"></i>
      </div>
      <div class="creditCardList__item-content">
        <div>
          <span>{{item.bankName}}</span>
          <span v-if="item.isDefault === 'Y'" class="red">[預設]</span>
        </div>
        <div>
          <span class="gray">**** {{item.lastFourDigits}} {{item.expiration.substr(4)}}/{{item.expiration.substr(2, 2)}} </span>
          <i :class="`creditCardType${item.creditCardType}`"></i>
        </div>
        <div>
          <span class="gray">{{item.name}}</span>
        </div>
      </div>
      <div class="creditCardList__item-trashBtn" @click="openCenterDialog(item.expressCheckoutId)">
        <i></i>
      </div>
    </li>
    <p v-if="data.length >= 5" class="creditCardList__limit">儲存的卡片已達上限</p>
  </ul>
</div>
</template>

<script>
import popupDialog from '../common/popupDialog.vue';
export default {
  data() {
    return {
      createAlertArea: {
        isShow: false,
        message: '',
      },
      isDeletePopupShow: false, //控制刪除視窗
      isCreateDialogShow: false, // 控制新增視窗  
      deleteExpressCheckoutId: null, //要刪除的信用卡id
}
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    ticket: {
      type: String
    }
  },
  components: {
    popupDialog,
  },
  methods: {
    updateCreditCard(expressCheckoutId) { //點選 radio button 
      if (this.ticket) {
        this.axios.put(`api/member/creditCard`, {
          expressCheckoutId,
          isDefault: 'Y'
        }, {
          headers: {
            'authorization': 'Bearer' + this.ticket
          }
        }).then(res => {
          const data = res.data;
          if (data.code === 3101 || data.code === 3100) {
            this.createAlertArea.isShow = true;
            this.createAlertArea.message = data.message;
            this.$bus.$emit('getCreateAlert', this.createAlertArea) //透過事件總線將alert訊息傳給createDialog組件
          }
          if (data.code === 1 || data.message === 'OK') {
            this.$emit('updateDataList')  //通知服組建重新取得creditCard List
            const Message = this.fridayComponent.Message
            var addCardSuccessMessage = new Message({
              name: 'add-cart-success__message',
              className: 'friday',
              type: 'success',
              message: '您已變更預設的信用卡',
            });
            addCardSuccessMessage.init()
            addCardSuccessMessage.show()
          }
        }).catch((err) => {
          console.error(err);
        });
      }
    },
    deleteCreditCard() { //刪除視窗點選確認鍵
      if (this.ticket) {
        this.axios.delete(`api/member/creditCard/${this.deleteExpressCheckoutId}`, {
          headers: {
            'authorization': 'Bearer' + this.ticket
          }
        }).then(res => {
          const data = res.data;
          if (data.code === 1 || data.message === 'OK') {
            this.$emit('updateDataList')
          }
        }).catch((err) => {
          console.error(err);
        });
      }
    },
    openCenterDialog(expressCheckoutId) {
      this.isDeletePopupShow = true;
      this.deleteExpressCheckoutId = expressCheckoutId;
    },
    closeCenterDialog() {
      this.isDeletePopupShow = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../../style/_color.scss";

.creditCardList {
  list-style-type: none;

  &__item {
    display: flex;
    min-height: 80px;
    margin: 0 0 10px 0;
    padding: 10px;
    border-radius: 8px;
    background-color: $white;
    box-sizing: border-box;

    &-radio {
      i {
        width: 20px;
        height: 20px;
        margin: 0 10px;
      }

      &--on {
        background: url(../../images/icons/double-circle.png) center/20px no-repeat;
      }

      &--off {
        background: url(../../images/icons/circle-line-gy.png) center/20px no-repeat;
      }
    }

    &-content {
      flex-grow: 1;

      div {
        display: flex;
        align-items: center;

        span {
          &:nth-of-type(2n+1) {
            margin-right: 5px;
          }
        }

        i {
          width: 26px;
          height: 16px;
        }

        .creditCardType1 {
          background: url(../../images/icons/visa.png) center/26px 16px no-repeat;
        }

        .creditCardType2 {
          background: url(../../images/icons/mastercard.png) center/26px 16px no-repeat;
        }

        .creditCardType4 {
          background: url(../../images/icons/jcb.png) center/26px 16px no-repeat;
        }
      }
    }

    &-trashBtn {
      width: 7%;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;

      i {
        width: 20px;
        height: 20px;
        background: url(../../images/icons/icon-delete.png) center/20px no-repeat;
      }
    }
  }

  &__limit {
    color: $sliver;
  }

  .red {
    color: $pomegranateapprox;
  }

  .gray {
    color: $sliver;
  }
}
</style>
