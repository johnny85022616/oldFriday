<template>
<div
  class="dialog"
  :style="{'z-index': zIndex}">
  <div class="cover">
    <div :class="['bg', { in: isIn }]"></div>
    <div
      ref="dialog-box"
      :class="['box', { 'bg-gray': isGrayStyle }, { in: isIn }]">
      <div
        ref="dialog-header"
        :class="['header', { 'head-line': isHeadLine }]">
        <slot name="header"></slot>
        <span class="close-box">
          <i @click="close" class="close"></i>
        </span>
      </div>

      <div
        :class="['body']"
        :style="caluBodyHeight">
        <slot name="body"></slot>
      </div>

      <div
        v-if="$slots.footer"
        class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "autoscreenDialog",
  data() {
    return {
      isIn: false,
      bodyHeight: null,
      iframeHeight: (window.innerHeight - 20) + 'px'
    };
  },
  mounted() {
    setTimeout(() => {
      this.isIn = true;
      this.calcuCntHeight();
    }, 50);

    setTimeout(() => {
      const ifm = this.$el.querySelector(".body iframe");
      if (!ifm) {
        // fix height for footer height
        let footerH = 0;
        if (this.$slots.footer) {
          footerH = 55;
        }
        this.bodyHeight =
          window.innerHeight -
          this.$refs["dialog-box"].offsetTop -
          this.$refs["dialog-header"].offsetHeight -
          footerH +
          "px";
      }
    }, 500);
  },
  props: {
    isGrayStyle: {
      type: Boolean,
      default: () => false,
    },
    isHeadLine: {
      type: Boolean,
      default: () => true,
    },
    zIndex: {
      type: Number,
      default: () => 103
    }
  },
  computed: {
    caluBodyHeight() {
      const styleObj = {};
      if (this.bodyHeight) styleObj["height"] = this.bodyHeight;
      return styleObj;
    },
  },
  methods: {
    calcuCntHeight() {
      const ifm = this.$el.querySelector(".body > iframe");
      if (ifm) {
        ifm.style.height = this.iframeHeight;
      }
    },
    close() {
      this.isIn = false;
      setTimeout(() => {
        this.$emit("closeDialog");
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  position: fixed;
  z-index: 103;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;

  .cover {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .bg {
    position: absolute;
    z-index: 102;
    opacity: 0;
    transition: opacity 0.25s ease-out;
    background-color: #000000;
    width: 100%;
    height: 100%;

    &.in {
      opacity: 0.6;
      transition: opacity 0.25s ease-in;
    }
  }

  .box {
    position: absolute;
    bottom: 0;
    z-index: 103;
    background-color: #ffffff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    overflow: hidden;
    width: 100%;
    max-height: 0;
    min-height: 0;
    color: #3c3c3c;
    transition: max-height 0.25s ease-out;

    &.in {
      max-height: 95%;
      transition: max-height 0.25s ease-in;
    }

    &.bg-gray {
      background-color: #f4f4f4;
    }

    .header {
      position: relative;
      line-height: 45px;
      text-align: center;
      font-size: 1.8rem;
      font-weight: bold;

      &.head-line {
        border-bottom: 1px solid #e0e0e0;
      }

      .close-box {
        position: absolute;
        right: 15px;
        top: 0;
        display: flex;
        width: 25px;
        height: 100%;
        align-items: center;
        justify-content: flex-end;
      }
    }

    iframe {
      width: 100%;
      border: 0;
    }

    .body {
      position: relative;
      min-height: 200px;
      font-size: 1.4rem;
      overflow: auto;
    }

    .footer {
      position: sticky;
      bottom: 0;
      background-color: #ffffff;
      width: 100%;
    }
  }
}
</style>
