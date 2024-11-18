<template>
<div :class="['product-combo', { mask: !isShowMore }]">
  <div class="ele-info">
    <i class="notice"></i>
    組合商品無法單一退換貨，詳細說明請參考退換貨需知。
  </div>
  <div
    v-for="(item, index) of productData"
    :key="index"
    :class="['product-list-box', { soldout: item.soldout }]"
    >
    <div>
      <img :src="item.img" :alt="item.name" @click="openComboProduct(item)" />
      <span v-if="item.soldout" class="circlemask">
        <font>補貨中</font>
      </span>
    </div>
    <div>
      <span @click="openComboProduct(item)">{{ item.name }}</span>
      <span @click="openCartUI()">
        <font v-if="cartComboData && cartComboData[index] && cartComboData[index].isSelected">{{ cartComboData[index].specName }}</font>
        <font v-else>請選擇商品規格</font>
        <font>x {{ item.qty }}</font>
      </span>
    </div>
  </div>
  <div
    v-if="productData.length > 3"
    class="product-combo__show-more">
    <button @click="swapShowMore">
      {{ showMoreText }}({{ this.itemData.length }})
    </button>
  </div>
  <div class="gap-line"></div>

  <!-- 商品說明 -->
  <div v-if="isShowProductDetailDialog">
    <fullscreendialog
      :isFullscreen="true"
      :closeDialog="closeDialog"
      v-on:closeDialog="closeDialog">
      <template v-slot:header>商品詳細說明</template>
      <template v-slot:body>
        <div class="product-combo-detail">
          <div>{{productDetailName}}</div>
          <div v-html="productDetailContentFilters"></div>
        </div>
      </template>
    </fullscreendialog>
  </div>
</div>
</template>

<script>
import fullscreendialog from "../../components/common/fullscreenDialog.vue"; // 全畫面蓋版提示框

export default {
  name: "comboProducts",
  components: {
    fullscreendialog
  },
  data() {
    return {
      isShowMore: true,
      isShowProductDetailDialog: false,
      productDetailName: '',
      productDetailContent: ''
    };
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    cartComboData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    swapShowMore() {
      this.isShowMore = !this.isShowMore;
    },
    openComboProduct(obj) {
      /**
       * 放隱藏目錄(表示不可購買)，會跳POPUP顯示圖文資訊
       * 放一般目錄，會另開分頁導去商品頁
       */
      if (obj.isHiddenCid) {
        this.productDetailName = obj.name
        this.getProductDescription(obj.pid)
      }
      if (obj.isValidCid) {
        window.location.href = `/mobileweb/product?sid=${obj.sid}&cid=${obj.cid}&pid=${obj.pid}&mid=${obj.mid}`
      }

    },
    closeDialog() {
      this.isShowProductDetailDialog = false
    },
    getProductDescription(pid) {
      this.axios.get(`productDesc?pid=${pid}`).then((res) => {
        const data = res.data;
        if (data.response.status === "OK") {
          this.productDetailContent = data.payload.productDescVO.strDescDescription;
          this.isShowProductDetailDialog = true
        }
      });
    },
    openCartUI() {
      this.$emit('openCartUI')
    }
  },
  computed: {
    itemData() {
      return this.data ?
        this.data.map((v) => {
          let minQty = 0

          if (!v.specInfo[0].subSpecInfo) {
            minQty = v.specInfo[0].purchase_min_qty
          } else {
            minQty = v.specInfo[0].subSpecInfo[0].purchase_min_qty
          }

          return {
            mid: v.mid,
            sid: v.sid,
            pid: v.pid,
            cid: v.cid,
            name: v.name,
            img: v.image_url,
            spec: v.specInfo.map((v) => v.groupName).join("、"),
            qty: minQty,
            soldout: v.soldout,
            isHiddenCid: v.isHiddenCid,
            isValidCid: v.isValidCid,
          };
        }) : [];
    },
    productData() {
      return this.isShowMore ? this.itemData : this.itemData.slice(0, 3);
    },
    showMoreText() {
      return this.isShowMore ? "收起全部商品" : "展開全部商品";
    },
    productDetailContentFilters() {
      let content = this.productDetailContent;
      content = this.tools.replaceTplImagePath(content);
      return this.tools.replaceWidthAndHeight(content);
    },
  },
};
</script>

<style lang="sass" scoped>
@import '../../style/color.scss'
.product-combo-detail
  >div
    &:first-child
      font-size: 1.6rem
      margin-bottom: 20px
.product-combo
  font-size: 1.4rem
  &__show-more
    padding: 10px 15px
    button
      width: 100%
      height: 40px
      border: 1px solid $web_main
      border-radius: 10px
      text-align: center
      background-color: $white
      font-size: 16px
  &.mask
    .product-list-box
      &:nth-last-child(2)
        -webkit-mask-image: linear-gradient(#000000 20%, transparent)
</style>
