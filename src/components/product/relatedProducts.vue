<template>
  <div v-if="itemData.length > 0" class="container">
    <div class="block-split">－相關商品－</div>

    <productItem
      v-if="itemData.length"
      :itemList="itemData"
      :fullInfoStyle="false"
    />
  </div>
</template>

<script>
import productItem from "../common/productItem";

export default {
  name: "relatedProducts",
  data() {
    return {
      itemData: [],
    };
  },
  props: {
    sid: {
      type: Number,
    },
    cid: {
      type: Number,
    },
    pid: {
      type: Number,
    },
  },
  created() {
    this.axios.get(`api/product/${this.pid}/relation`).then((res) => {
      const data = res.data;
      if (
        data.code === 1 &&
        data.payload.length > 0 &&
        data.payload[0].relationalProducts.length > 0
      ) {
        const products = data.payload[0].relationalProducts;
        this.itemData = products.map((i) => {
          return {
            url: i.product_page_url,
            img: i.image_url,
            name: i.name,
            labelFront: "",
            price: i.price,
            labelBack: "",
          };
        });
        this.$emit('setRelateProduct', this.itemData)
      }
    });
  },
  components: {
    productItem,
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #f4f4f4;
  padding-bottom: 20px;
}

.block-split {
  display: block;
  height: 44px;
  line-height: 44px;
  color: #adadad;
  text-align: center;
  padding-top: 10px;
  font-size: 1.4rem;
}
</style>
