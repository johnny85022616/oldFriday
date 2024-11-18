<template>
  <div>
    <div class="product-component-container">
      <div class="product-component-blocks">
        <div @click="checkCounpon">
          <label>折價券</label>
          <div v-if="isLoginStatus">
            <p v-if="coupon.length > 0 && !isDiscountAfterCheckout">
              查詢可使用的折價券 <i class="arrow-right inline"></i>
            </p>
            <span v-else-if="coupon.length === 0">
              優惠商品，不適用折價券
            </span>
            <span v-else>優惠商品，不適用折價券</span>
          </div>
          <p v-if="!isLoginStatus">
            查詢可使用的折價券 <i class="arrow-right inline"></i>
          </p>
        </div>
      </div>

      <div v-if="data.insurance || promotionInfo.length > 0" class="product-component-blocks">
        <div>
          <label>優惠活動</label>
        </div>
      </div>

      <div class="product-component-blocks">
        <div
          v-for="(item, index) of promotionInfo"
          :key="index"
          class="product-campaign short-tag"
        >
          <span>
            <label v-if="item.promotionType === 1">促銷</label>
            <label v-else>現折</label>
          </span>
          <span class="product-campaign__evt-desc">
            <font class="product-campaign__desc-txt">
              {{ item.promotionName }}
            </font>
            <a
              v-if="item.promotionType === 1 && item.promotionUrl"
              :href="item.promotionUrl"
              >前往</a
            >
            <font
              v-if="item.promotionDetail && item.promotionDetail && item.promotionDetail[0].rule"
              class="product-campaign__desc-txt text-light"
            >
              {{ item.promotionDetail[0].rule }}
            </font>
            <font
              v-if="item.promotionDetail && item.promotionDetail.length > 1 && item.promotionDetail[1].rule"
              class="product-campaign__desc-txt text-light"
            >
              {{ item.promotionDetail[1].rule }}
            </font>
          </span>
        </div>

        <div v-if="showInsurance" class="product-campaign short-tag">
          <span><label>保險</label></span>
          <span class="product-campaign__evt-desc">
            <font class="product-campaign__desc-txt"
              >加購行動裝置保險月付{{insurancePrice}}起</font
            >
            <a
              href="https://shopping.friday.tw/event/201909-Insurance/index.html"
              target="_blank"
              >前往</a
            >
          </span>
        </div>
      </div>

      <autoscreendialog
        v-if="showDialog"
        :closeDialog="closeDialog"
        v-on:closeDialog="closeDialog"
      >
        <template v-slot:header>折價券</template>
        <template v-slot:body>
          <div class="coupon_list">
            <div class="coupon_price align-right">
              折抵前
              <span class="product_price"
                >$<font>{{ tools.priceFormat(data.special_price) }}</font></span
              >
            </div>
            <div class="split-line mb5 mt5"></div>
            <div>
              <ul>
                <li v-for="(item, index) of coupon" :key="index">
                  <div class="desc">{{ item.title }},{{ item.expiration }}</div>
                  <div class="d-flex justify-content-between">
                    <span class="price"
                      >$<font>{{ tools.priceFormat(item.amount) }}</font></span
                    >
                    <span>
                      折抵後<span class="product_price"
                        >$<font>{{
                          tools.priceFormat(data.special_price - item.amount)
                        }}</font></span
                      >
                    </span>
                  </div>
                  <div
                    v-if="index < coupon.length - 1"
                    class="split-line mt5"
                  ></div>
                </li>
              </ul>
            </div>
          </div>
          <div class="ele-info">
            <i class="notice"></i>
            欲使用折價券，請於購物車結帳頁選用。實際折抵金額以購物車結帳頁為準。
          </div>
        </template>
      </autoscreendialog>
    </div>
    <div class="gap-line"></div>
  </div>
</template>

<script>
import autoscreendialog from "../common/autoscreenDialog.vue"; // 蓋版提示框

export default {
  name: "campaign",
  data() {
    return {
      showInsurance:false,
      insurancePrice:0,
      showDialog: false,
      coupon: []
    };
  },
  components: {
    autoscreendialog,
  },
  props: {
    data: {
      type: Object,
    }
  },
  created() {
    this.getCoupon();
     if (this.data.insurance && !this.data.discount) {
      this.getInsurancePrice();
    }
  },
  methods: {
    getInsurancePrice() {
      const calcuPrice = this.data.price;
      this.axios
      .get(`api/product/insuranceQuote?price=${calcuPrice}`)
      .then((res) => {
        const {
          status,
          data
        } = res.data;
        if (status === 1 && data.length > 0) {
          const info = data[0].quoteProduct;
          this.insurancePrice = info.premium;
          this.showInsurance = true;
        }
      });
    },
    closeDialog() {
      this.showDialog = false;
      this.$emit("stopBodyScroll", "close");
    },
    openDialog() {
      this.showDialog = true;
      this.$emit("stopBodyScroll");
    },
    checkCounpon() {
      const ticket = this.$cookies.get("FEEC-B2C-TICKET");
      if (!ticket) {
        window.location.href = this.configs.loginUrl();
        return false;
      }
      this.openDialog();
    },
    getCoupon(checkLogin, callback) {
      const ticket = this.$cookies.get("FEEC-B2C-TICKET");
      const { sid, cid, pid, price } = this.data;

      const paramsPrice = price;
      this.axios
        .get(
          `api/coupon/queryProductCoupon?sid=${sid}&cid=${cid}&pid=${pid}&price=${paramsPrice}`,
          {
            headers: {
              authorization: "Bearer" + ticket,
            },
          }
        )
        .then((res) => {
          const data = res.data;
          if (data.code === 1 && data.payload.length > 0) {
            this.coupon = data.payload[0].coupons;
            if (typeof callback === "function") {
              callback.call();
            }
          }
          if (checkLogin && data.code === 90401) {
            window.location.href = this.configs.loginUrl();
          }
        });
    },
  },
  computed: {
    promotionInfo() {
      return this.data.promotionInfo
        ? this.data.promotionInfo.filter((v) =>
            [1, 2].includes(v.promotionType)
          )
        : [];
    },
    // 是否結帳再折扣商品
    isDiscountAfterCheckout() {
      return this.data ? this.data.tags.some(v => v.id === 8) : false
    },
    isLoginStatus() {
      return this.$cookies.get("FEEC-B2C-TICKET")
    },
  },
};
</script>
