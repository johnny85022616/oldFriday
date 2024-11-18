<template>
<div
  class="product-images"
  :style="imgStyle">
  <span>
    <font>{{ current }}/{{ totals }}</font>
  </span>
  <carousel
    class="custom-carousel"
    :autoplay="true"
    :loop="true"
    :autoplayTimeout="5000"
    :perPage="1"
    :paginationEnabled="false"
    @page-change="currentNumber">
    <slide
      v-for="(item, index) of imagesData"
      :key="index">
      <img :src="item.image_url" :style="imgStyle" />
      <i v-if="item.isVideo" @click="openYoutube" class="product-images__play-icon"></i>
    </slide>
  </carousel>

  <fullscreendialog
    v-if="isShowVideo"
    :isFullscreen="true"
    @closeDialog="closeDialog">
    <template v-slot:header>商品影片</template>
    <template v-slot:body>
      <div class="product-images__youtube-iframe">
        <iframe type="text/html" id="youtubeIframe" :src="
              'https://www.youtube.com/embed/' +
              videoId +
              '?enablejsapi=1&amp;version=3&amp;playerapiid=ytplayer'
            " frameborder="0" allowfullscreen="" :style="youtubeIframeStyle"></iframe>
      </div>
    </template>
  </fullscreendialog>
</div>
</template>

<script>
import fullscreendialog from "../../components/common/fullscreenDialog.vue"; // 全畫面蓋版提示框

export default {
  name: "mainimage",
  components: {
    fullscreendialog,
  },
  data() {
    return {
      current: 1,
      isShowVideo: false,
    };
  },
  props: {
    images: {
      type: Array,
      default: () => [],
    },
    video: {
      type: String,
      default: () => null,
    },
  },
  methods: {
    openYoutube() {
      this.isShowVideo = true;
    },
    closeDialog() {
      this.isShowVideo = false;
    },
    currentNumber(n) {
      this.current = n + 1;
    },
  },
  computed: {
    totals() {
      return this.imagesData.length;
    },
    videoId() {
      return this.tools.getYoutubeId(this.video)
    },
    youtubeIframeStyle() {
      return {
        width: '100%',
        height: Math.floor(window.innerWidth / 1.77) + 'px',
        left: '0px'
      }
    },
    imagesData() {
      let imageObj = this.images.map((v, i) => {
        return {
          image_url: v,
          isVideo: i === 0 && this.video && this.video.match(/v=([\d\w]+)/i) ?
            true :
            false,
        };
      });
      if (this.video) {
        imageObj = [
          {
            image_url: this.video, isVideo: true
          },
          ...imageObj
        ]
      }
      return imageObj;
    },
    imgStyle() {
      const ww = window.innerWidth;
      return {
        width: "100%",
        height: ww + "px",
      };
    },
  },
};
</script>

<style lang="scss">
.product-images .dialog .box .body {
  padding: 0;
}
</style>
<style lang="scss" scoped>
.product-images {
  position: relative;

  .VueCarousel-slide {
    position: relative;
  }

  &__play-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // margin: 50% auto;
    display: inline-block;
    width: 80px;
    height: 80px;
    background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGNpcmNsZSBmaWxsLW9wYWNpdHk9Ii4zIiBmaWxsPSIjMDAwIiBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiLz4KICAgICAgICA8cGF0aCBkPSJNNDAgNS41YzE5LjA1MyAwIDM0LjUgMTUuNDQ0IDM0LjUgMzQuNSAwIDE5LjA1Ni0xNS40NDcgMzQuNS0zNC41IDM0LjVTNS41IDU5LjA1NiA1LjUgNDBDNS41IDIwLjk0NCAyMC45NDcgNS41IDQwIDUuNXptMCAxLjg2N0MyMS45NzcgNy4zNjcgNy4zNjcgMjEuOTc2IDcuMzY3IDQwUzIxLjk3NyA3Mi42MzMgNDAgNzIuNjMzYzE4LjAyMyAwIDMyLjYzMy0xNC42MDkgMzIuNjMzLTMyLjYzM1M1OC4wMjMgNy4zNjcgNDAgNy4zNjd6TTI5LjUgMjJsMjcgMTgtMjcgMThWMjJ6IiBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz4KICAgIDwvZz4KPC9zdmc+Cg==")
      no-repeat;
  }

  &__youtube-iframe {
    display: flex;
    align-items: center;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #000000;
  }

  img {
    object-fit: cover;
  }

  span {
    position: absolute;
    z-index: 1;
    right: 10px;
    bottom: 10px;
    display: inline-block;
    text-align: center;
    width: 55px;
    height: 24px;
    line-height: 24px;
    background-color: #000000;
    opacity: 0.6;
    border-radius: 15px;
  }

  font {
    font-size: 1.3rem;
    font-weight: 500;
    color: #ffffff;
  }
}
</style>
