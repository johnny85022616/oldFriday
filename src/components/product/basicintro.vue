<template>
<div>
  <div
    class="product-component-container tab-section"
    data-tab="簡介">
    <div
      class="product-intro"
      v-html="introFilters"></div>

    <!-- <div
      v-if="showInsurance"
      class="product-insurance">
      行動裝置保險 月付{{ insurancePrice }}
      <a href="https://shopping.friday.tw/event/201909-Insurance/mobile/index.html" target="_blank">了解更多</a>
    </div> -->
  </div>
  <div class="gap-line"></div>
</div>
</template>

<script>
export default {
  name: "basicintro",
  data() {
    return {
      insurancePrice: 0,
      showInsurance: false,
    };
  },
  props: {
    intro: {
      type: String,
      default: "",
    },
    insurance: {
      type: Boolean,
      default: () => false,
    },
    discount: {
      type: Boolean,
    },
    price: {
      type: Number,
    }
  },
  created() {
    // if (this.insurance && !this.discount) {
    //   this.getInsurancePrice();
    // }
  },
  computed: {
    introFilters() {
      let content = this.intro;
      content = content.replace(/\\r\\n/g, "");
      content = this.tools.figureToIframe(content);
      return content;
    },
  },
  methods: {
    // getInsurancePrice() {
    //   const calcuPrice = this.price;
    //   this.axios
    //     .get(`api/product/insuranceQuote?price=${calcuPrice}`)
    //     .then((res) => {
    //       const {
    //         status,
    //         data
    //       } = res.data;
    //       if (status === 1 && data.length > 0) {
    //         const info = data[0].quoteProduct;
    //         this.insurancePrice = info.premium;
    //         this.showInsurance = true;
    //       }
    //     });
    // },
  },
};
</script>

<style lang="sass" scoped>
@import '../../style/color.scss'
.product-tags
  padding: 10px 0
  span
    display: inline-block
    padding: 0 3px
    margin-right: 4px
    text-align: center
    font-size: 1.3rem
    color: $web_minor
    border-radius: 5px
    border: 1px solid $web_border

.product-intro
  color: $web_main
  font-size: 1.4rem
  p
    strong
      font-weight: 700
    span
      font-weight: 700

.product-insurance
  font-size: 1.4rem
  height: 34px
  line-height: 34px
  vertical-align: middle
  border-radius: 10px
  border: 1px solid #3c3c3c
  text-align: center
  margin-top: 20px
  a
    text-decoration: none
    color: 0064c8
</style>

<style lang="sass">
.intro
  p
    strong
      font-weight: 700
</style>
