<template>
<div>
  <popupDialog v-if="isDeletePopupShow" @closeCenterDialog="closeCenterDialog" :callback="deleteStore">是否刪除此門市</popupDialog>
  <ul class="storeList">
    <li v-for="item in data" :key="item.expressCheckoutId" class="storeList__item">
      <div class="top">
        <div class="top__radio">
          <i v-if="item.isDefault" class="top__radio--on" @click="updateStore(item.expressCheckoutId)"></i>
          <i v-else class="top__radio--off" @click="updateStore(item.expressCheckoutId)"></i>
        </div>
        <div class="top__content">
          <i :class="`storeType${item.storeType}`"></i>
          <span v-if="item.storeType===1 || item.storeType===2 || item.storeType===9">{{getStoreTypeName(item.storeType)}}</span>
          <span>{{item.storeName}}</span>
          <span v-if="item.isDefault" class="red">[預設]</span>
        </div>
        <div class="top__trashBtn" @click="openCenterDialog(item.expressCheckoutId)">
          <i></i>
        </div>
      </div>
      <div class="gray">
        <span>{{item.maskConsigneeName}}</span>
        <span>{{item.maskPhoneNumber}}</span>
        <p>{{item.storeAddress}}</p>
      </div>
      <div v-if="item.storeStatus === 0" class="expireMask" @click="openCenterDialog(item.expressCheckoutId)">
        <i></i>
      </div>
      <p></p>
    </li>
    <p v-if="data.length >= 10" class="storeList__limit">已達可新增門市上限</p>
  </ul>
</div>
</template>

<script>
import popupDialog from '../common/popupDialog.vue';
export default {
  data() {
    return {
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
    popupDialog
  },
  methods: {
    getStoreTypeName(storeType) {
      switch (storeType) {
        case 1:
          return "7-11"
        case 2:
          return "全家"
        case 9:
          return "遠傳"
      }
    },
    updateStore(expressCheckoutId) {  //變更門市
      let arr = this.data.filter(ele => ele.expressCheckoutId === expressCheckoutId) //api payload
      let postData = {
        ...arr[0]
      }
      postData.isDefault = true;
      if (this.ticket) {
        this.axios.put(`api/member/store`, postData, {
          headers: {
            'authorization': 'Bearer' + this.ticket
          }
        }).then(res => {
          const data = res.data;
          if (data.code === 1 || data.message === 'OK') {
            this.$emit('updateDataList'); //觸發父類別更新data
            const Message = this.fridayComponent.Message
            var updateStoreSuccessMessage = new Message({
              name: 'add-cart-success__message',
              className: 'friday',
              type: 'success',
              message: '您已變更預設的門市',
            });
            updateStoreSuccessMessage.init()
            updateStoreSuccessMessage.show()
          }
        }).catch((err) => {
          console.error(err);
        });
      }
    },
    deleteStore(){  //刪除門市
      if (this.ticket) {
        this.axios.delete(`api/member/store?expressCheckoutId=${this.deleteExpressCheckoutId}`, {
          headers: {
            'authorization': 'Bearer' + this.ticket
          }
        }).then(res => {
          const data = res.data;
          if (data.code !== 1 || data.message !== 'OK') {
            alert(data.message) 
            return false;
          }
          this.$emit('updateDataList');  //觸發父類別更新data
        }).catch((err) => {
          console.error(err)
          alert('此門市系統維護中，請選擇其他門市或聯繫客服人員。')
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

.storeList {
  list-style-type: none;

  &__item {
    min-height: 94px;
    margin: 0 0 10px 0;
    padding: 10px;
    border-radius: 8px;
    background-color: $white;
    box-sizing: border-box;
    position: relative;

    .top {
      display: flex;

      &__radio {
        i {
          width: 20px;
          height: 20px;
        }

        &--on {
          background: url(../../images/icons/double-circle.png) center/20px no-repeat;
        }

        &--off {
          background: url(../../images/icons/circle-line-gy.png) center/20px no-repeat;
        }
      }

      &__content {
        flex-grow: 1;
        display: flex;
        align-items: center;

        span {
          margin-left: 10px;
        }

        i {
          width: 24px;
          height: 24px;
          margin-left: 10px;
        }

        .storeType1 {
          background: url('../../images/icons/icon-7-11.svg') center/24px 24px no-repeat
        }

        .storeType2 {
          background: url('../../images/icons/icon-family.svg') center/24px 24px no-repeat
        }

        .storeType8 {
          background: url('../../images/icons/de.svg') center/24px 24px no-repeat
        }

        .storeType9 {
          background: url('../../images/icons/fet.svg') center/24px 24px no-repeat
        }

        .storeType4 {
          background: url('../../images/icons/icon-family.svg') center/20px 20px no-repeat
        }

      }

      &__trashBtn {
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
  }

  &__limit {
    color: $sliver;
  }

  .red {
    color: $pomegranateapprox;
  }

  .gray {
    color: $sliver;
    text-align: left;
    margin-top: 10px;
  }

  .expireMask {
    width: 96%;
    position: absolute;
    top: 0px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      cursor: pointer;
      width: 60px;
      height: 60px;
      background: url(../../images/icons/exp.svg) center/60px no-repeat;
    }
  }
}
</style>
