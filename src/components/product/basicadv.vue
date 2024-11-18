<template>
<div>
  <div class="product-component-container">
    <div class="product-detail">
      <div
        class="product-detail__title tab-section"
        data-tab="詳情">
        －商品詳情－
      </div>
      <div class="product-detail__content">
        <div class="product-detail__sku">
          <label>商品代碼</label>
          <span>{{ pid }} <i class="copy" @click="copyNumber(pid)"></i></span>
        </div>
        <div
          v-html="productDescriptionFilters"
          class="html-content"></div>
      </div>
      <div
        class="product-detail__title tab-section"
        data-tab="規格">
        －商品規格－
      </div>
      <div class="product-detail__spec-content">
        <div
          v-html="productSpecFilter"
          class="html-content"></div>
      </div>
    </div>
  </div>
  <div class="gap-line"></div>
</div>
</template>

<script>
export default {
  name: "basicadv",
  data() {
    return {
      productDescription: "",
      productSpec: "",
      productGuide: "",
    };
  },
  components: {},
  props: {
    pid: {
      type: Number,
    },
    cid: {
      type: Number,
    },
    sid: {
      type: Number,
    },
    mid: {
      type: Number,
    },
  },
  created() {
    this.axios.get(`productDesc?pid=${this.pid}`).then((res) => {
      const {
        response,
        payload
      } = res.data;

      if (response.status === "OK") {
        this.productGuide = payload.productDescVO.strDescBrief;
        this.productSpec = payload.productDescVO.strDescSpecification;
        this.productDescription = payload.productDescVO.strDescDescription;
      }
    });
  },
  mounted() {},
  computed: {
    productDescriptionFilters() {
      let content = this.productDescription;
      if (content) {
        content = this.tools.replaceTplImagePath(content);
        content = this.tools.replaceWidthAndHeight(content);
        content = this.tools.figureToIframe(content)
      }
      return content
    },
    productSpecFilter() {
      let content = this.productSpec;
      if (content) {
        content = content.replace(/(width:[\s\d]+px;?)/gi, "");
        content = this.tools.replaceTplImagePath(content);
        content = this.tools.replaceWidthAndHeight(content);
      }
      return content
    }
  },
  methods: {
    copyNumber(content) {
      navigator.clipboard.writeText(content).then(() => {
        alert(`已複製${content}至剪貼簿`);
      });
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/color.scss";

.product-component-container {
  padding: 15px 0;
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

.product-detail {
  label {
    width: 20%;
    color: $sliver;
  }

  &__sku {
    padding: 10px 20px;
  }

  &__title {
    display: inline-block;
    width: 100%;
    height: 44px;
    line-height: 44px;
    color: $sliver;
    text-align: center;
    background-color: $background;
    padding-top: 10px;
  }

  &__spec-content {
    // display: inline-block;
    padding: 0 15px;
    > div {
      display: unset;
    }
    ul {
      li {
        line-height: 40px;
      }
    }
  }
}
</style>

<style lang="scss">
@import "../../style/color.scss";
@import "../../style/mixin.scss";

.html-content {
  img {
    width: 100%;
    padding: unset;
  }
}

.product-detail__spec-content {
  ul {
    padding: 10px 0 0;
  }
  li {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    label {
      flex: 0 1 20%;
      color: $sliver;
    }
    span {
      flex: 0 1 80%;
      padding-right: 10px;
      @include font-break
    }
  }
  p {
    margin-top: 10px;
  }
}
</style>
