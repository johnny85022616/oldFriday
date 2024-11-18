<template>
<div class="cart-combo wrap">
  <label>組合商品</label>
  <div
    v-for="(item, index) of itemsFilter"
    :key="index">
    <div :class="['cart-combo__item', {'soldout': item.soldout}]">
      <div class="cart-combo__item-image">
        <img :src="item.image_url" :alt="item.name">
      </div>
      <div class="cart-combo__item-name">
        <span>{{item.name}}</span>
        <div class="cart-combo__item-spec">
          <span v-if="item.specInfo.length > 1" :class="['cart-combo__item-select', {'active': chooseData.indexOf(index) > -1}]">
            <font
              v-if="chooseData.indexOf(index) > -1"
              @click="openSpecUI(item, index)">{{cartComboData[index].specName}}</font>
            <font
              v-else
              @click="openSpecUI(item, index)">請選擇商品規格</font>
          </span>
          <span v-else>
            <font>單一規格</font>
          </span>
          <span>x {{item.qty}}</span>
        </div>
      </div>
    </div>
  </div>

  <autoscreendialog
    :zIndex="1000"
    v-if="showDialog"
    v-on:closeDialog="closeDialog">
    <template v-slot:header>
      <div class="cart-header">
        <img :src="specData.image_url" />
        <span class="text-break-1">{{specData.name}}</span>
      </div>
    </template>
    <template v-slot:body>
      <div class="cart-combo-body">
        <specbox
          :isCombo="true"
          :specInfo="specData.specInfo"
          :cartComboData="cartComboData"
          v-on:setSpecInfo="setSpecInfo" />
      </div>
    </template>
    <template v-slot:footer>
      <div
        ref="footer"
        class="cart-footer d-flex">
        <button class="confirmBtn" @click="closeDialog" value="">確定</button>
      </div>
    </template>

  </autoscreendialog>
</div>
</template>

<script>
import autoscreendialog from "../common/autoscreenDialog.vue"; // 蓋版提示框
import specbox from "./specbox"; //規格一 規格二 選擇

export default {
  name: "buycombo",
  data() {
    return {
      showDialog: false,
      specData: {},
      nowOpenSpecIndex: 0,
      cartComboData: [],
      chooseData: []
    }
  },
  components: {
    autoscreendialog,
    specbox
  },
  props: {
    items: {
      type: Array
    }
  },
  created() {
    this.cartComboData = this.items.map(v => {
      let id = null,
        name = '',
        qty = 0,
        minQty = 0,
        subInfo = {};
      const specLen = v.specInfo.length;

      v.specInfo.forEach(x => {
        const subSpecInfo = x.subSpecInfo
        if (subSpecInfo) {
          subInfo = subSpecInfo.find(z => {
            if (!z.sold_out) {
              return z
            } else {
              return null
            }
          })
          if (subInfo) {
            id = subInfo.id
            name = subInfo.group1 + ' ' + subInfo.group2
            qty = subInfo.qty
            minQty = subInfo.purchase_min_qty
          }
        } else {
          id = x.id
          name = x.groupName
          qty = x.qty
          minQty = x.purchase_min_qty
        }
      })

      return {
        comboId: v.comboId,
        sid: v.sid,
        cid: v.cid,
        pid: v.pid,
        mid: v.mid,
        specId: id,
        specName: name,
        qty: qty,
        minQty: minQty,
        isSelected: specLen > 1 ? false : true
      }
    })

    this.sendCartComboData()
  },
  watch: {},
  computed: {
    itemsFilter() {
      return this.items.map(v => {
        let minQty = 0

        if (!v.specInfo[0].subSpecInfo) {
          minQty = v.specInfo[0].purchase_min_qty
        } else {
          minQty = v.specInfo[0].subSpecInfo[0].purchase_min_qty
        }

        return {
          pid: v.pid,
          name: v.name,
          image_url: v.image_url,
          specInfo: v.specInfo,
          qty: minQty,
          soldout: v.soldout
        }
      })
    }
  },
  methods: {
    openSpecUI(obj, index) {
      this.nowOpenSpecIndex = index
      this.specData = obj
      this.showDialog = true
    },
    closeDialog() {
      this.showDialog = false
      if (!this.chooseData.includes(this.nowOpenSpecIndex)) {
        this.chooseData.push(this.nowOpenSpecIndex)
      }
    },
    setSpecInfo(obj) {
      this.cartComboData[this.nowOpenSpecIndex] = Object.assign(this.cartComboData[this.nowOpenSpecIndex], {
        specId: obj.nowSelectedSpecId,
        specName: obj.nowSelectedSpecName,
        qty: obj.qty,
        isSelected: true
      })
    },
    sendCartComboData() {
      this.$emit('setCombo', this.cartComboData)
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../../style/color.scss';
@import '../../style/mixin.scss';

label {
  color: $web_minor;
  font-size: 1.4rem;
  line-height: 30px;
}

.cart-combo {
  &-body {
    padding: 0 15px 15px 15px
  }
  &__item {
    display: flex;
    margin-bottom: 12px;

    &.soldout {
      border-radius: 10px;
      background-color: $background;

      img,
      span {
        opacity: .5;
      }
    }

    &-image {
      width: 100px;
      flex-basis: 100px;
      max-width: 100px;

      img {
        width: 100%;
        display: block;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }
    }

    &-name {
      width: 70%;
      max-width: 68%;
      padding: 10px 6px;
      font-size: 1.4rem;
      position: relative;

      >span {
        height: 40px;
        @include font-break(2)
      }
    }

    &-spec {
      position: absolute;
      bottom: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      span {
        &:first-child {
          flex: 1 1 70%;
        }
        &:last-child {
          display: flex;
          flex: 1 1 30%;
          justify-content: flex-end;
          align-items: center;
          padding-right: 20px;
          text-align: right;
        }
      }

      font {
        display: block;
        width: 100%;
        color: $web_minor;
      }
    }

    &-select {
      position: relative;
      width: 100%;
      padding: 6px 10px;
      border: 0;
      border-radius: 8px;
      outline: none;
      color: $web_minor;
      background: $background url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xMS42MzEgNC40Yy4yMzUgMCAuNDY1LjA2Ny42NTkuMTkuNTAyLjMyMi42NTMuOTQ2LjM2NiAxLjQzNmwtLjA2LjA5LTMuNjMyIDUuMDA1YTEuMTM2IDEuMTM2IDAgMCAxLS4zMDcuMjg4IDEuMjIxIDEuMjIxIDAgMCAxLTEuNTU2LS4yMDRsLS4wNjctLjA4NS0zLjYzMS01LjAwNGExLjA1MiAxLjA1MiAwIDAgMS0uMjAzLS42MThjMC0uNTcuNDYzLTEuMDQgMS4wNTYtMS4wOTNsLjExMi0uMDA1aDcuMjYzeiIgZmlsbD0iIzNDM0MzQyIgZmlsbC1ydWxlPSJub256ZXJvIi8+Cjwvc3ZnPgo=') center right 5px no-repeat;
      -webkit-appearance: none;
      &.active {
        font {
          color: $web_main; 
        }
      }
    }
  }
}
</style>
