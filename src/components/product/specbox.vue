<template>
<div class="cart-spec-box wrap">
  <div
    v-if="specInfo && (specInfo.length >= 1 || (specInfo.subSpecInfo && specInfo.subSpecInfo.length > 0))"
    class="wrap">
    <label>{{ specTitle }}</label>
    <div class="cart-spec-box__items">
      <a @click="changeFirstSpec(index)" v-for="(item, index) of specInfo" :key="index" :class="['cart-spec-box__item', {active: nowSpecIndex === index, disable: item.sold_out}]" :title="item.groupName">
        <font v-if="item.groupName">{{ item.groupName }}</font>
        <font v-else>單一規格</font>
      </a>
    </div>
  </div>

  <div
    v-if="nowGroupInfo.length > 0"
    class="wrap">
    <label>{{ specTitle2 }}</label>
    <div class="cart-spec-box__items">
      <a @click="changeChooseSpec(item.id, index)" v-for="(item, index) of nowGroupInfo" :key="index" :class="['cart-spec-box__item', {active: nowGroupIndex === index, disable: item.sold_out}]" :title="item.groupName">
        {{ item.groupName }}
      </a>
    </div>
  </div>

  <div
    v-if="!isCombo&&!allSpecSoldOut"
    class="cart-spec-qty">
    <div>
      <label>數量</label>
      <div class="cart-spec-qty-choose">
        <font v-if="productLimit > 0" class="cart-spec-qty-choose__hint">每會員限購 {{productLimit}} 件</font>
        <i @click="minus()" :class="['minus', {'active': isMinusActive}]"></i>
        <div class="count">
          <input type="number" @blur="setCartBuyQuantity" @input="checkCartBuyQuantity" v-model="cartBuyQuantity" maxlength="2" />
        </div>
        <i @click="plus()" :class="['plus', {'active': isPlusActive}]"></i>
      </div>
    </div>
  </div>


</div>
</template>

<script>
export default {
  name: 'specbox',
  data() {
    return {
      nowGroupIndex: 0,
      nowGroupInfo: [],
      nowSpecId: null,
      nowSpecName: "", // 顯示在UI的規格名稱
      nowSpecMappingName: '', // 用來Mapping規格2已選擇的項目
      nowSpecQty: 0,
      nowSpecIndex: 0,
      cartBuyQuantity: 1,
      isOneLayerSpec: true, // 是否為單規格
      allSpecSoldOut:false
    }
  },
  components: {},
  props: {
    // 是否為組合商品
    isCombo: {
      type: Boolean,
      default: () => false
    },
    specInfo: {
      type: Array
    },
    cartComboData: {
      type: Array,
      default: () => null
    },
    productLimit: {
      type: Number,
      default: () => 0
    },
    pid: {
      type: Number,
      required: true,
    },
  },
  created() {
    const specInfo = this.specInfo
    this.allSpecSoldOut = window.productsPool[this.pid].soldout;
  
    // 定義預設規格
    if (specInfo && specInfo.length > 0) {
      // 取得預設的規格資料，判斷是否為SOLD OUT
      specInfo.some((v, i) => {
        if (!v.subSpecInfo) {
          this.isOneLayerSpec = true

          if (!v.sold_out || this.allSpecSoldOut) {
            this.nowSpecId = v.id
            this.nowSpecName = v.groupName;
            this.nowSpecQty = v.qty;
            this.cartBuyQuantity = v.purchase_min_qty
            this.nowSpecIndex = i
            return true
          }
          
        } else {
          this.isOneLayerSpec = false
          const subSpecExisted = v.subSpecInfo.some((val, idx) => {
            if (!val.sold_out || this.allSpecSoldOut) {
              this.nowSpecId = val.id
              this.nowSpecName = val.group1 + ' ' + val.group2;
              this.nowSpecMappingName = val.group2;
              this.nowSpecQty = val.qty;
              this.cartBuyQuantity = val.purchase_min_qty
              this.nowSpecIndex = i
              this.nowGroupIndex = idx
              this.nowGroupInfo = v.subSpecInfo
              return true
            }
          })

          return subSpecExisted
        }
      })

      this.sendSpecInfo()
    }
  },
  watch: {},
  computed: {
    specTitle() {
      return this.specInfo ? this.specInfo[0].groupTitle : '規格一'
    },
    specTitle2() {
      return this.specInfo && this.specInfo[0].subSpecInfo ? this.specInfo[0].subSpecInfo[0].groupTitle : '規格二'
    },
    isMinusActive() {
      const dataObj = (this.isOneLayerSpec) ? this.specInfo[this.nowSpecIndex] : this.nowGroupInfo[this.nowGroupIndex]
      return this.cartBuyQuantity !== dataObj.purchase_min_qty
    },
    isPlusActive() {
      // 組合商品以選擇的商品規格條件為主 並同時不能大於50s
      if (this.cartComboData !== null) {
        const cpQty = this.calcuComboQty()
        return cpQty > this.cartBuyQuantity
      } else {
        const dataObj = (this.isOneLayerSpec) ? this.specInfo[this.nowSpecIndex] : this.nowGroupInfo[this.nowGroupIndex]
        return dataObj.purchase_qty > this.cartBuyQuantity
      }
    }
  },
  methods: {
    calcuComboQty() {
      const isSelAry = this.cartComboData.filter(v => v.isSelected)
      const selectedPool = isSelAry.map(v => Math.floor(v.qty / v.minQty))
      const minimalQty = Math.min(...selectedPool)
      if (minimalQty >= this.specInfo[0].purchase_qty) {
        return this.specInfo[0].purchase_qty >= 50 ? 50 : this.specInfo[0].purchase_qty
      } else {
        return minimalQty >= 50 ? 50 : minimalQty
      }
    },
    sendSpecInfo() {
      this.$emit('setSpecInfo', {
        nowSelectedSpecId: this.nowSpecId,
        nowSelectedSpecName: this.nowSpecName,
        qty: this.nowSpecQty,
        cartBuyQuantity: this.cartBuyQuantity
      })
    },
    /* 切換規格一有情境為二
     *  單規格 - 取規格一資料為主
     *  雙規格 - 以規格一連動規格二切換
     */
    changeFirstSpec(idx) {
      this.nowSpecIndex = parseInt(idx);
      
      // 單規格
      if (this.isOneLayerSpec) {
        this.cartBuyQuantity = this.specInfo[idx].purchase_min_qty;
        this.nowSpecId = this.specInfo[idx].id;
        this.nowSpecName = this.specInfo[idx].groupName;
        this.nowSpecQty = this.specInfo[idx].qty;
        this.sendSpecInfo()
        return
      }

      // 雙規格
      let lstObj = this.specInfo[this.nowSpecIndex].subSpecInfo.filter((v,i) => {
        if (v.group2 === this.nowSpecMappingName) {
          return Object.assign(v, {index: i})
        } else {
          return null
        }
      })

      if (lstObj && lstObj.length > 0) {
        lstObj = lstObj[0]
        this.nowGroupIndex = lstObj.index
        this.cartBuyQuantity = lstObj.purchase_min_qty;
        this.nowSpecId = lstObj.id
        this.nowSpecName = lstObj.group1 + ' ' + lstObj.group2
        this.nowSpecQty = lstObj.qty
        this.nowGroupInfo = this.specInfo[this.nowSpecIndex].subSpecInfo
        this.sendSpecInfo()
      } else {
        this.specInfo[this.nowSpecIndex].subSpecInfo.some((v, i) => {
          if (!v.sold_out) {
            this.nowGroupIndex = i
            this.cartBuyQuantity = v.purchase_min_qty;
            this.nowSpecId = v.id
            this.nowSpecName = v.group1 + ' ' + v.group2
            this.nowSpecQty = v.qty
            this.nowGroupInfo = this.specInfo[this.nowSpecIndex].subSpecInfo
            this.sendSpecInfo()
            return true
          }
        })
      }
    },
    // 選擇目前規格
    changeChooseSpec(id, idx) {
      if (!this.nowGroupInfo[idx].sold_out || this.allSpecSoldOut) {   //全數賣完的情況soldout的才可選，一般情況下賣完的規格不可選取
        const { purchase_min_qty, group1, group2, qty } = this.nowGroupInfo[idx]
        this.nowGroupIndex = idx;
        this.cartBuyQuantity = purchase_min_qty;
        this.nowSpecId = id;
        this.nowSpecName = group1 + ' ' + group2;
        this.nowSpecMappingName = group2;
        this.nowSpecQty = qty;
        this.sendSpecInfo()
      }
    },
    setCartBuyQuantity(obj) {
      if (obj.target.value === '') {
        this.cartBuyQuantity = 1
      }
    },
    checkCartBuyQuantity(obj) {
      if (obj.target.value === '') {
        return
      }
      const inputNumber = parseInt(obj.target.value, 10)
      const dataObj = this.isOneLayerSpec ? this.specInfo[this.nowSpecIndex] : this.nowGroupInfo[this.nowGroupIndex]
      const minQty = dataObj.purchase_min_qty
      const maxQty = dataObj.purchase_qty
      if (inputNumber === 0) {
        this.cartBuyQuantity = 1
      } else if (inputNumber < minQty) {
        this.cartBuyQuantity = minQty
        alert('最少購買量為' + minQty)
      } else if (inputNumber > maxQty) {
        if (/^(6|7|8|9)/i.test(inputNumber)) {
          this.cartBuyQuantity = maxQty
        } else {
          this.cartBuyQuantity = inputNumber.toString().slice(0, -1)
        }
        alert('最多購買量為' + maxQty)
      } else {
        this.cartBuyQuantity = inputNumber
        this.sendSpecInfo()
      }
    },
    minus() {
      const dataObj = this.isOneLayerSpec ? this.specInfo[this.nowSpecIndex] : this.nowGroupInfo[this.nowGroupIndex];
      const purchase_min_qty = dataObj.purchase_min_qty ? dataObj.purchase_min_qty : 1;
      let nowQty = parseInt(this.cartBuyQuantity, 10)
      this.cartBuyQuantity = nowQty === purchase_min_qty ? purchase_min_qty : (nowQty -= purchase_min_qty);
      this.sendSpecInfo()
    },
    plus() {
      let purchase_qty = 0, purchase_min_qty = 0
      let nowQty = parseInt(this.cartBuyQuantity, 10)

      if (this.cartComboData && this.cartComboData.length > 0) {
        purchase_qty = this.calcuComboQty()
        purchase_min_qty = 1
      } else {
        const dataObj = this.isOneLayerSpec ? this.specInfo[this.nowSpecIndex] : this.nowGroupInfo[this.nowGroupIndex];
        purchase_min_qty = dataObj.purchase_min_qty ? dataObj.purchase_min_qty : 1;
        purchase_qty = dataObj.purchase_qty;
      }
      

      this.cartBuyQuantity = nowQty < purchase_qty ?
        (nowQty += purchase_min_qty) : purchase_qty;
      this.sendSpecInfo()
    },
  }
}
</script>

<style lang="scss" scoped>
.cart-spec-box {
  max-width: 100%;
  width: 100%;
  flex-direction: column;
  height: 100%;

  label {
      color: #adadad;
      line-height: 50px;
    }
  &__items {
    display: flex;
    flex-wrap: wrap;
  }

  &__item {
    display: block;
    position: relative;
    margin-right: 10px;
    margin-bottom: 5px;
    padding: 5px 10px;
    border-radius: 8px;
    color: #3c3c3c;
    border: 1px solid #e0e0e0;
    font-size: 14px;
    word-break: break-all;
    word-wrap: break-word;

    &.disable {
      color: #e0e0e0;
      border: 1px dashed #e0e0e0;
    }

    &.active {
      color: #f34f59;
      border: 1px solid #f34f59;
      border-bottom-right-radius: 0;
      background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDEyIDEyIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9IiNGMzRGNTkiIGQ9Ik0xMiAwdjEwYzAgMS4xMDUtLjg5NSAyLTIgMkgwTDEyIDB6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNTYuMDAwMDAwLCAtNTQ4LjAwMDAwMCkgdHJhbnNsYXRlKDAuMDAwMDAwLCAyMC4wMDAwMDApIHRyYW5zbGF0ZSgyMC4wMDAwMDAsIDQ2NS4wMDAwMDApIHRyYW5zbGF0ZSgwLjAwMDAwMCwgNDUuMDAwMDAwKSB0cmFuc2xhdGUoMzYuMDAwMDAwLCAxOC4wMDAwMDApIi8+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0xMC4zODYgNi4wMDJjLS4xNTYuMDExLS4zLjA4Ny0uNDA0LjIxbC0yLjI0NSAyLjU4LTEuMjM1LTEuMTE3Yy0uMjQ0LS4yMzUtLjYyMi0uMjE3LS44NDUuMDQtLjIyMy4yNTgtLjIwNi42NTguMDM4Ljg5M2wuMDMuMDI3TDcuNCAxMC4xNWMuMjQ1LjIyMi42MTIuMi44My0uMDVsMi42MzUtMy4wMzJjLjIyOC0uMjUzLjIxOS0uNjUzLS4wMi0uODkzLS4xMjMtLjEyNC0uMjktLjE4Ny0uNDYtLjE3MyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTU2LjAwMDAwMCwgLTU0OC4wMDAwMDApIHRyYW5zbGF0ZSgwLjAwMDAwMCwgMjAuMDAwMDAwKSB0cmFuc2xhdGUoMjAuMDAwMDAwLCA0NjUuMDAwMDAwKSB0cmFuc2xhdGUoMC4wMDAwMDAsIDQ1LjAwMDAwMCkgdHJhbnNsYXRlKDM2LjAwMDAwMCwgMTguMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==') right bottom no-repeat
    }
  }
}

.cart-spec-qty {
  >div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-choose {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    font-size: 16px;

    &__hint {
      margin-right: 1rem !important;
      font-size: 1.2rem;
    }

    input {
      min-width: 20px;
      max-width: 40px;
      border: 0;
      outline: none;
      font-size: 1.6rem;
      text-align: center;
    }

    span {
      color: #aaaaaa;
      padding: 0 10px;
    }
  }
}

</style>
