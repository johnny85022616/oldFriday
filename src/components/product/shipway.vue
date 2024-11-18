<template>
  <div class="product-component-container">
    <div class="product-component-blocks">
      <div>
        <label>商品規格</label>
        <span @click="openCartUI">請選擇商品規格和數量 <i class="arrow-right inline"></i></span>
      </div>
      <div>
        <label>運送方式</label>
        <span>{{ delivery_txt }}</span>
      </div>
      <div v-if="is_pre_order_txt">
        <label>預計出貨</label>
        <span>{{ is_pre_order_txt }}</span>
      </div>
      <div>
        <label>付款方式</label>
        <span>{{ payment_txt }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shipway",
  data() {
    return {
    };
  },
  components: {
  },
  props: {
    payment: {
      type: String,
      default: () => ''
    },
    deliveryInfos: {
      type: Array,
      default: () => [],
    },
    pre_order_info: {
      type: String,
    }
  },
  computed: {
    is_pre_order_txt() {
      return this.pre_order_info || "訂購後，會由出貨廠商與您聯絡出貨日期及事宜";
    },
    delivery_txt() {
      return this.deliveryInfos.map(v => v.deliveryName).join('、');
    },
    payment_txt() {
      return this.payment.replace(/\s\|\s/ig, '、').replace(/、$/i, '')
    }
  },
  methods: {
    openCartUI() {
      this.$emit('openCartUI')
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/color.scss";

.product-component-container {
  padding: 15px 0 0;
}

.product-component-blocks {
  padding: 0 20px;
  span {
    width: 80%;
    flex: 1 1 80%;
  }
}

.product-campaign__promotion {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
