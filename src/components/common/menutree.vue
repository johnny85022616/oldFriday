<template>
<div class="wrap" :style="reCalcTop">
  <div id="menupanel" class="navgroup">
    <div class="main-menu">
      <ul class="d-flex flex-column justify-content-center" :style="fixIphoneMinimalbar">
        <li v-for="(item, index) of items" :key="index" :sid="item.sid" @click="changeSubMenu(index)" :class="{isOpen: item.sid === nowActiveData.sid}">{{item.itemName}}</li>
        <div class="falseheight"></div>
      </ul>
    </div>
    <div class="sub-menu">
      <div v-if="itemContentHead.url" class="store-banner">
        <a :href="itemContentHead.url">
          <img :style="'background-image:url('+itemContentHead.img+');'" alt />
        </a>
      </div>
      <div v-for="(item, index) of itemContent" :key="index" :class="item.kind === 2 ? 'Category-list' : 'brand-area'">
        <h2 class="d-block">{{item.tabName}}</h2>
        <div class="bg-white d-flex flex-wrap">
          <a v-for="(sub, idx) of item.cmsItems" :key="idx" :href="sub.url" class="listProd" :class="item.kind === 2 ? 'listProd' : 'brandimg'">
            <img :style="'background-image:url('+sub.img+');'" alt />
            <h3 v-if="sub.description">{{sub.description}}</h3>
          </a>
        </div>
      </div>
      <div class="falseheight" :style="fixIphoneMinimalbar"></div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "menutree",
  data() {
    return {
      items: [],
      itemContent: [],
      itemContentHead: {
        url: '',
        img: ''
      },
      contentCache: {},
      nowActiveData: {},
    };
  },
  props: {
    isDownloadAppOpened: {
      type: Boolean,
      required: true
    }
  },
  created() {
    // GET Main menu data
    this.axios.get("api/home/menu?device=mobile&hide=false").then(res => {
      const data = res.data;
      if (data.code === 1 && data.payload.length > 0) {
        this.items = data.payload[0].menus;

        // find default data
        const defaultData = this.items.find(item => item.isDefault);
        if (defaultData) {
          this.nowActiveData = defaultData;
        } else {
          this.nowActiveData = this.items[0];
        }
        this.fetchSubMenus();
      }
    });
  },
  methods: {
    changeSubMenu(idx) {
      this.nowActiveData = this.items[idx];
      if (this.nowActiveData.url) {
        location.href = this.nowActiveData.url;
        return;
      }
      if (this.nowActiveData.sid === -4) {
        this.$emit("closeShowMenu");
        this.$emit("directBestbuy");
        return;
      }
      this.fetchSubMenus();
    },
    filterContentData(data) {
      this.itemContent = data;
      // get content head data
      for (let e of this.itemContent) {
        if (e.kind === 1) {
          this.itemContentHead.url = e.cmsItems[0].url || ''
          this.itemContentHead.img = e.cmsItems[0].img || ''
          break;
        } else {
          this.itemContentHead.url = ''
          this.itemContentHead.img = ''
        }
      }
      // only keep kind === 2 (img+txt) and kine === 4 (img only). except kind === 1 (banner)
      this.itemContent = this.itemContent.filter(
        item => [2, 4].indexOf(item.kind) !== -1
      );
    },
    fetchSubMenus() {
      const sid = this.nowActiveData.sid
      if (this.contentCache[sid]) {
        this.filterContentData(this.contentCache[sid]);
        return;
      }
      // GET Main menu data
      this.axios
        .get(
          `api/home/menu/content?device=mobile&hide=false&sid=${sid}&type=${this.nowActiveData.menuType}`
        )
        .then(res => {
          const data = res.data;
          if (data.code === 1 && data.payload.length > 0) {
            this.contentCache[sid] = data.payload[0].content;
            this.filterContentData(data.payload[0].content);
          } else {
            this.itemContent = []
            this.itemContentHead = {}
          }
        });
    }
  },
  computed: {
    contentSid: function () {
      return this.nowActiveData.sid === -1 ? 3 : this.nowActiveData.sid;
    },
    reCalcTop: function () {
      let obj = {};
      if (this.isDownloadAppOpened) {
        obj = Object.assign(obj, {
          top: "103px"
        });
      }
      return obj;
    },
    fixIphoneMinimalbar: function () {
      const wh = window.innerHeight;
      const fixMargin = this.isDownloadAppOpened ? "120px" : "60px";
      return {
        "margin-bottom": wh > 800 ? "0px" : fixMargin
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  position: fixed;
  z-index: 9;
  top: 45px;
  width: 100%;
  height: 100%;
  background-color: #ffffff;

  #menupanel {
    display: flex;
    background: #f4f4f4;
    width: 100%;
    height: 100vh;
    position: absolute;
    z-index: 100;

    .main-menu {
      width: 30%;
      flex-basis: 30%;
      max-width: 30%;
      height: 100vh;
      overflow-y: auto;
      position: absolute;
      left: 0;
      top: 0px;
      background: #ffffff;
      z-index: 100;

      ul {
        color: #353635;

        li {
          font-size: 1.3rem;
          height: 55px;
          max-height: 55px;
          border-bottom: 1px solid #efefef;
          padding: 0 13px;
          line-height: 18px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          border-left: 4px solid #fff;

          a {
            text-decoration: none;
            color: #353635;
          }

          &.isOpen {
            border-left: 4px solid #f5281e;
            color: #f5281e;
            background: #f4f4f4;
          }
        }

        .falseheight {
          height: 120px;
        }
      }
    }

    .sub-menu {
      width: 70%;
      flex-basis: 70%;
      max-width: 70%;
      padding: 0 2%;
      box-sizing: border-box;
      height: 100vh;
      overflow-y: auto;
      background: #f4f4f4;
      position: absolute;
      z-index: 100;
      right: 0;
      top: 0px;

      .store-banner {
        width: 100%;
        margin: 12px auto;

        a {
          display: block;
          border-radius: 0px;

          img {
            width: 100%;
            height: 0;
            display: block;
            background-size: auto 100%;
            background-repeat: no-repeat;
            background-position: center;
            padding-bottom: 20%;
            border: none;
            image-rendering: pixelated;
          }
        }
      }

      .Category-list {
        width: 100%;
        padding: 2%;
        box-sizing: border-box;

        .listProd {
          width: 33.33%;
          flex-basis: 33.33%;
          max-width: 33.33%;
          padding: 2%;
          box-sizing: border-box;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          h3 {
            font-size: 1.1rem;
            color: #353635;
            text-align: center;
            margin-top: 4px;
            line-height: 16px;
            height: 32px;
            overflow: hidden;
            -webkit-line-clamp: 2;
          }

          img {
            width: 100%;
            height: 0;
            display: block;
            background-size: auto 100%;
            background-repeat: no-repeat;
            background-position: center;
            padding-bottom: 100%;
          }
        }
      }

      h2 {
        font-size: 1.3rem;
        width: 100%;
        color: #353635;
        background: #f4f4f4;
        padding-bottom: 12px;
      }

      .bg-white {
        background: #ffffff;
        padding: 2%;
        box-sizing: border-box;
        margin-bottom: 20px;
      }

      .brand-area {
        width: 100%;
        padding: 2%;
        box-sizing: border-box;

        .brandimg {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 33.33%;
          flex-basis: 33.33%;
          max-width: 33.33%;
          padding: 2%;
          box-sizing: border-box;

          img {
            width: 100%;
            height: 0;
            display: block;
            background-size: auto 100%;
            background-repeat: no-repeat;
            background-position: center;
            padding-bottom: 71.42%;
            image-rendering: pixelated;
          }
        }

        h2 {
          font-size: 1.3rem;
          width: 100%;
          color: #353635;
          background: #f4f4f4;
          padding-bottom: 12px;
        }
      }

      .falseheight {
        height: 85px;
      }
    }
  }
}
</style>
