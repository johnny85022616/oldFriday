<template>
<div class="container" :style="containerStyle">
  <div class="bg"></div>
  <div :class="['dialog', {'fullwidth': isFullWidth}]">
    <div :style="multiFilterStyle">
      <div class="header">
        <div class="filter_flex">
          <h2>篩選條件</h2>
          <a @click="cleanFilters">清除條件</a>
        </div>
      </div>
      <div class="filter_bar searchengine_bar">
        <h2>縮小查詢範圍</h2>
        <div class="enter_close">
          <input type="text" v-model="apiParams.precise" name="smallSearchText" placeholder="請輸入關鍵字">
          <a href="#"></a>
        </div>
      </div>

      <div v-for="(item, index) of filters" :key="index" class="filter_bar">
        <h2>{{item.name}}</h2>
        <div v-if="item.type === 2" :class="priceErrorClass">
          <input type="text" name="price_low" :value="price_low" @input="price_low = $event.target.value" :placeholder="item.items[0].name" width="70"> ～
          <input type="text" name="price_high" :value="price_high" @input="price_high = $event.target.value" :placeholder="item.items[1].name" width="70">
          <button class="clearprice" @click="clearPrice()">清除</button>
          <div class="tips">最小金額大於最大金額，請重新輸入！</div>
        </div>
        <div v-else>
          <p :class="{
            'select_condition': apiParams[item.key] && apiParams[item.key].indexOf(child.value) > -1
            }" v-for="(child, childKey) of item.items" :key="childKey" @click="selectBtn(item.key, child.value)">
            {{child.name}}
            <input type="checkbox" :name="item.key" :value="child.value" hidden="">
          </p>
        </div>
      </div>
    </div>
    <div class="filter_btn">
      <div>
        <button class="cancel" @click="closeDialog()">取消</button>
      </div>
      <div>
        <button class="confirm" @click="submit()">確定</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'filters',
  data() {
    return {
      apiParams: {},
      price_low: null,
      price_high: null,
      isFullWidth: window.innerWidth === 320 ? true : false
    }
  },
  props: {
    filters: {
      type: Array,
      default: () => []
    },
  },
  watch: {
    price_low(n) {
      if (/^0/i.test(n) || !/^([0-9]+)$/.test(n)) {
        this.price_low = ''
      }
      if (!this.apiParams.price) this.apiParams.price = [0, 9999999]

      if (this.price_high === '' && this.price_low === '') {
        delete this.apiParams['price']
      } else {
        this.apiParams.price[0] = this.price_low
      }
    },
    price_high(n) {
      if (/^0/i.test(n) || !/^([0-9]+)$/.test(n)) {
        this.price_high = ''
      }
      if (!this.apiParams.price) this.apiParams.price = [0, 9999999]

      if (this.price_high === '' && this.price_low === '') {
        delete this.apiParams['price']
      } else {
        this.apiParams.price[1] = this.price_high
      }
    }
  },
  computed: {
    containerStyle() {
      return {
        height: window.innerHeight,
        'overflow-y': 'auto'
      }
    },
    priceErrorClass() {
      let price_low = this.price_low
      let price_high = this.price_high
      let checkPrice = false
      if (price_low) price_low = parseInt(price_low);
      if (price_high) price_high = parseInt(price_high);
      if (price_low > price_high && price_high) {
        checkPrice = true
      }
      return {
        'error': checkPrice
      }
    },
    multiFilterStyle() {
      return {
        height: (window.innerHeight - 60) + 'px',
        'overflow-y': 'auto',
        'overflow-x': 'hidden'
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('showFiltersDialog')
    },
    clearPrice() {
      this.price_low = ''
      this.price_high = ''
      delete this.apiParams['price']
    },
    selectBtn(key, val) {
      if (!this.apiParams[key]) this.apiParams[key] = []
      if (this.apiParams[key].indexOf(val) === -1) {
        this.apiParams[key].push(val)
      } else {
        this.apiParams[key].splice(this.apiParams[key].indexOf(val), 1)
      }
      if (this.apiParams[key].length === 0) {
        delete this.apiParams[key]
      }
      this.apiParams = Object.assign({}, this.apiParams)
    },
    cleanFilters() {
      this.price_low = ''
      this.price_high = ''
      this.$nextTick(() => {
        this.apiParams = {}
      })
    },
    submit() {
      const params = {}
      if (Object.keys(this.apiParams).length > 0) {
        for (let i in this.apiParams) {
          const o = this.apiParams[i]
          params[i] = Array.isArray(o) ? o.map(v => parseInt(v)) : o
        }
      }

      this.$emit('mergeFilterRule', params)
      this.closeDialog()
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  .bg {
    display: block;
    opacity: 0.6;
    z-index: 98;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vh;
    height: 100vh;
    background-color: #000000;
  }
}

.dialog {
  z-index: 99;
  position: fixed;
  top: 0;
  right: 0;
  width: 90vw;
  height: 100vh;
  background: #fff;

  &.fullwidth {
    width: 100vw;

    .filter_btn {
      width: 100vw;
    }
  }

  .header {
    .filter_flex {
      display: flex;
      justify-content: space-between;
      padding: 1.5rem;
      background: #fff;

      h2 {
        font-size: 1.5rem;
      }
    }

    a {
      font-size: 1.4rem;
      text-align: right;
      width: 65px;
      height: 21px;
    }
  }

  .filter_bar {
    padding: 15px;
    border-top: 1px solid #e0e0e0;
    font-size: 1.3rem;
    color: #3c3c3c;

    h2 {
      font-size: 1.4rem;
      margin: 5px 0 10px 0;
    }

    p {
      display: inline-block;
      position: relative;
      margin-right: 1rem;
      margin-bottom: 0.5rem;
      padding: 1rem 0;
      border-radius: 10px;
      font-size: 1.4rem;
      text-align: center;
      background: #f4f4f4;
      width: 30%;

      &.select_condition {
        color: #f34f59;
        background-color: #ffe2e1;

        &::after {
          display: inline-block;
          content: 'X';
          width: 8px;
          height: 15px;
        }
      }
    }

    .enter_close {
      input {
        width: 100%;
        border: 0;
        background-color: #f8f9f9;
        border-radius: 10px;
      }
    }

    input {
      box-sizing: border-box;
      width: 110px;
      height: 36px;
      padding: 8px 10px;
      border: 0;
      border-radius: 10px;
      font-size: 1.4rem;
      text-align: center;
      background: #f8f9f9;
    }

    .error {
      input {
        border: 1px solid #f45f59;
      }

      .tips {
        display: block;
      }
    }

    button {
      margin-left: 10px;
      padding: 6px 10px;
      border: 0;
      border-radius: 10px;
      outline: 0;
      color: #fff;
      font-size: 1.3rem;
      cursor: pointer;
      background: #000;
    }

    .tips {
      display: none;
      margin-top: 5px;
      color: #f34f59;
    }
  }

  .searchengine_bar {
    position: relative;

    input {
      text-align: left;
      width: 200px;
    }
  }

  .filter_btn {
    display: flex;
    position: fixed;
    bottom: 0;
    justify-content: space-between;
    box-sizing: border-box;
    width: 90vw;
    padding: 0 10px;

    div {
      flex-basis: 50%;
      padding: 10px 5px;
    }

    button {
      box-sizing: border-box;
      width: 100%;
      padding: 10px 0;
      border: 0;
      border-radius: 10px;
      outline: 0;
      font-size: 1.5rem;
      text-align: center;
      cursor: pointer;
    }

    .cancel {
      border: 1px solid #f34f59;
      color: #f34f59;
      background: #ffffff;
    }

    .confirm {
      color: #ffffff;
      background: #f34f59;
    }
  }
}

@media (max-width: 360px) {
  .dialog {
    .filter_bar {
      input {
        width: 90px;
      }
    }
  }

}
</style>
