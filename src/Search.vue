<template>
<div>
  <downloadapp v-on:downloadAppOpened="downloadAppOpened" />
  <navigation
    :isShowRedTop="isShowRedTop"
    :windowY="windowY"
    v-on:stopBodyScroll="stopBodyScroll"
    v-on:directBestbuy="directBestbuy"
    :isDownloadAppOpened="isDownloadAppOpened" />

  <div class="search-wrap">
    <category
      :items="categoryFilters"
      :isDownloadAppOpened="isDownloadAppOpened"
      v-on:searchByCategoryID="searchByCategoryID"
      v-on:stopBodyScroll="stopBodyScroll"
      v-on:disableDimensionMenu="disableDimensionMenu" />
    <dimension
      ref='dimensionCnt'
      v-show="dimensionFilters.length > 0"
      :items="dimensionFilters"
      :isDownloadAppOpened="isDownloadAppOpened"
      :hiddenDimensionMenu="hiddenDimensionMenu"
      v-on:stopBodyScroll="stopBodyScroll"
      v-on:enableDimensionMenu="enableDimensionMenu"
      v-on:searchByDimension="searchByDimension" />
    <controls
      :filters="filters"
      v-on:controlsParams="controlsParams"
      v-on:stopBodyScroll="stopBodyScroll" />
    <xiwutips
      v-if="isShowXiwu && apiLoaded"
      :messages="XiwuMsg" />
    
    <div class="search-box__products">
      <productItem
      v-if="searchResults.length"
      :showCart="true"
      :fullInfoStyle="true"
      :searchKeyword="apiParams.keyword"
      :itemList="searchResults"
      :gaCategoryTitle="'小網搜尋頁'" />
    </div>

    <div
      v-if="searchResults.length > 0"
      class="pagination">
      <span>{{scrollItemIdx}}</span> / <span>{{pagination.total}}</span>
    </div>

    <div
      class="rec-box"
      v-if="!nextPage && apiLoaded">
      <h1>推薦專區</h1>
      <youmaylike v-if="!nextPage" recpos="sep" rectype="ClickStream" :recgid="recPid" :reccid="recCid" :recsid="recSid" />
    </div>
  </div>
</div>
</template>

<script>
import downloadapp from "./components/common/downloadapp.vue"; // 頁面最上方的app下載提示
import navigation from "./components/common/navigationFix.vue"; // 共用天的導覽列
import category from "./components/search/category.vue"; // 全館分類下拉
import dimension from "./components/search/dimension.vue"; // 規格維度過濾
import controls from "./components/search/controls.vue"; // 搜尋排序 、 篩選 、 列表切換
import productItem from "./components/common/productItem"; // 商品
import xiwutips from "./components/search/xiwutips.vue"; // 模糊搜尋的小wu提示
import youmaylike from "./components/common/youmaylike";

export default {
  name: "Search",
  components: {
    category,
    controls,
    dimension,
    downloadapp,
    navigation,
    productItem,
    xiwutips,
    youmaylike
  },
  data() {
    return {
      recPid: null,
      recCid: null,
      recSid: null,
      firstLanding: true,
      apiLoaded: false,
      apiParams: {
        device: "mobile",
        filters: true,
        keyword: "",
        nocache: 1,
        page: 1,
        rows: 10,
        sid: -999
      },
      bodyParams: {},
      categoryFilters: [],
      currentY: 0,
      dimensionFilters: [],
      dueToBottomGap: window.innerHeight / 2,
      // 0=square 1=list 2=one
      filterBarBottomY: 0,
      filters: [],
      fuzzyData: {},
      getFiltersRule: true,
      hiddenDimensionMenu: false,
      isAtBottom: false,
      isDownloadAppOpened: false,
      isShowRedTop: true,
      isStopScrolling: false,
      // for calulate filter-bar-bottom offset position.
      itemWrapHeight: 0 // for calculate each item client height
        ,
      nextPage: true,
      pagination: {},
      searchResults: [],
      showOnLighthouse: true,
      uiListType: 0,
      windowY: 0,
      dimensionSource: {
        L_GROUP_NAME: '大類別',
        M_GROUP_NAME: '中類別',
        S_GROUP_NAME: '小類別',
        BRAND: '商品品牌',
        BRAND_POSITION: '品牌定位',
        ORIGIN: '產地',
        SERIES: '手機系列',
        RAM: '內存(RAM)',
        ROM_TYPE: '儲存類型',
        ROM: '儲存容量(ROM)',
        FUNCTION: '功能規格',
        COMMUNICATE: '通訊技術',
        OS: '作業系統',
        SCREEN_SIZE: '平板/筆電/LCD尺寸',
        CPU: '處理器',
        GPU: '顯示晶片',
        COMBO: '商品組合',
        SOURCE: '貨源',
        WELFARE: '福利品註記',
        CUP: '罩杯',
        DESIGN: '服飾版型',
        PRD_SIZE: '服飾商品尺寸',
        TYPE: '商品類型',
        SKIN_LEVEL: '適用膚質',
        HAIR_EFFECT: '美髮功效',
        CARE_EFFECT: '保養功效',
        PET_EFFECT: '寵物食品功效',
        PET_LEVEL: '寵物食品適用階段',
        TA: '適用對象',
        COLOR: '顏色',
      }
    };
  },
  mounted() {
    this.filterBarBottomY = document.querySelector('.filter-bar-bottom').getBoundingClientRect().bottom;
  },
  created() {
    // save all product api data
    window.productsPool = {}
    
    this.showOnLighthouse = this.lighthouse ? false : true;
    if (!this.showOnLighthouse) {
      this.apiParams = 4
    }
    window.addEventListener(
      "scroll",
      () => {
        const wy = window.scrollY;
        this.windowY = wy;
        this.currentY = wy !== 70 && wy !== 0 ? wy : this.currentY;
        this.isShowRedTop = wy > 0 ? false : true;

        if (
          window.innerHeight + wy + this.dueToBottomGap >=
          document.body.scrollHeight
        ) {
          this.isAtBottom = true;
        } else {
          this.isAtBottom = false;
        }
      }, {
        passive: true,
      }
    );

    this.apiParams = Object.assign(this.apiParams, this.tools.urlSearchToObj());
    this.getAPI();
  },
  updated() {
    this.setItemsClientHeight();
  },
  computed: {
    isShowXiwu() {
      return this.fuzzyData.isFuzzy || this.searchResults.length === 0 ? true : false
    },
    XiwuMsg() {
      const preciseTxt = this.bodyParams && Object.keys(this.bodyParams).length > 0 ? ' + 過濾條件' : ''
      return this.fuzzyData.isFuzzy ? this.fuzzyData.noticeWord : `沒有找到與 <font style="color: #f5281e;">${this.apiParams.keyword}${preciseTxt}</font> 相關的商品`
    },
    scrollItemIdx() {
      const listH = this.uiListType === 0 ? 320 : this.itemWrapHeight
      let gap = 0
      let rs = 1
      let diff = 0
      if (this.uiListType === 0) {
        gap = window.innerHeight / 2
        rs = (Math.ceil((this.windowY + gap) / listH) * 2) - diff
      } else {
        const diff = Math.round((window.innerHeight - this.filterBarBottomY) / listH) - 1
        rs = (Math.ceil((this.windowY + gap) / listH) * 1) + diff
      }

      if (rs > this.pagination.total) {
        rs = this.pagination.total
      }

      return rs > 0 ? rs : 1
    }
  },
  watch: {
    isAtBottom(newValue) {
      if (newValue && this.nextPage) {
        this.getAPI();
      }
    },
  },
  methods: {
    setItemsClientHeight() {
      if (this.windowY < 10) {
        const dom = this.$el.querySelectorAll('.search.list')
        if (dom && dom[0]) {
          this.itemWrapHeight = dom[0].clientHeight
        }
      }
    },
    getAPI() {
      if (this.apiParams.page === 1) {
        window.scrollTo(0, 0)
      }
      this.axios
        .post(`v2/search`, null, {
          params: this.apiParams,
          data: this.bodyParams,
          baseURL: this.configs.mserviceApiPath(),
        })
        .then((res) => {
          const data = res.data;
          if (data.status === 1 && data.meta && data.meta.redirectUrl) {
            window.location.href = data.meta.redirectUrl
            return
          }
          if (data.status === 1 && data.payload.pagination.total > 0) {
            const payload = data.payload;

            if (this.apiParams.page === 1 && Object.keys(this.bodyParams).length === 0) {
              this.ga.event(
                "小網搜尋頁",
                "show",
                `${this.apiParams.keyword} - ${payload.pagination.total}`
              );

              // set rec data
              this.recPid = payload.data[0].pid.toString()
              this.recCid = payload.data[0].cid.toString()
              this.recSid = payload.data[0].sid.toString()
            }

            let searchData = payload.data.map((i) => {
              return {
                pid: i.pid,
                cid: i.cid,
                combined: i.combined ? i.combined : false,
                url: i.url + "&kw=" + this.apiParams.keyword,
                img: i.image_url,
                name: i.name,
                price: i.price,
                tags: i.tags,
                restricted: i.restricted,
                promotion: i.promotion,
                productStatus: i.productStatus,
                fullInfoStyle: true,
                soldout: [3, 4].indexOf(i.productStatus.id) > -1 ? true : false,
                priceSuffix: i.showSaleMsg ? '(折扣後)' : ''
              };
            });
            this.searchResults =
              payload.pagination.current_page === 1 ?
              searchData :
              this.searchResults.concat(searchData);

            if (payload.pagination.current_page >= 2) {
              this.ga.pageview(location.pathname + location.search + '&page=' + payload.pagination.current_page)
            }

            if (
              payload.pagination.current_page < payload.pagination.total_pages
            ) {
              this.apiParams.page = parseInt(this.apiParams.page) + 1;
              this.nextPage = true;
            } else {
              this.nextPage = false;
            }

            if (this.apiParams.page >= 2) {
              this.apiParams.filters = false;
            }

            if (payload.filters) this.filters = payload.filters;
            if (payload.dimension) this.dimensionFilters = payload.dimension;
            this.categoryFilters = payload.category;
            this.fuzzyData = payload.fuzzy;
            this.pagination = payload.pagination;

            if (this.firstLanding) {
              this.seo.search(searchData.map(v => {
                const nameAry = v.name.split(' ')
                const brandName = nameAry && nameAry[0] ? nameAry[0].toUpperCase() : ''

                return {
                  '@context': 'http://schema.org',
                  '@type': 'Product',
                  name: v.name,
                  description: v.promotion ? v.promotion : v.name,
                  url: v.url,
                  productID: v.pid,
                  sku: v.pid,
                  image: v.img,
                  brand: {
                    "@type": "Brand",
                    "name": brandName
                  },
                  offers: {
                    '@type': 'Offer',
                    price: v.price,
                    priceCurrency: 'TWD',
                    availability: 'http://schema.org/InStock',
                    priceValidUntil: '2025-12-31',
                    url: v.url,
                  },
                  "aggregateRating": {
                    name: v.name,
                    "@type": "AggregateRating",
                    "bestRating": 5,
                    "worstRating": 0,
                    "ratingCount": Math.floor(Math.random() * 999) + 111,
                    "ratingValue": "5.00"
                  }
                }
              }), this.apiParams.keyword)
              this.firstLanding = false
            }
          } else {
            this.searchResults = []
            this.categoryFilters = []
            this.dimensionFilters = []
            this.fuzzyData = {}
            this.pagination = {}
            this.ga.event(
                "小網搜尋頁",
                "show",
                `${this.apiParams.keyword} - 0`
              );
          }
          this.apiLoaded = true
        })
    },
    stopBodyScroll(action, jumpCurrentY = true) {
      const body = document.body;
      if (!this.isStopScrolling) {
        body.style = "padding:0;margin:0;overflow:hidden;height:100%";
        this.isStopScrolling = !this.isStopScrolling;
      }
      if (action === "close") {
        body.style = "padding:0;margin:0;";
        if (jumpCurrentY) {
          setTimeout(() => {
            window.scrollTo(0, this.currentY);
          }, 0);
        }
        this.isStopScrolling = false;
      }
    },
    downloadAppOpened() {
      this.isDownloadAppOpened = !this.isDownloadAppOpened;
    },
    directBestbuy() {
      this.directJumpToBestBuy = true;
      setTimeout(() => {
        this.directJumpToBestBuy = false;
      }, 100);
    },
    controlsParams(obj) {
      this.bodyParams = Object.assign({}, obj.bodyParams)
      this.apiParams.sorting = obj.sorting
      this.apiParams.page = 1
      this.getAPI()
    },
    searchByCategoryID(sid, cid, cidAry) {
      // 清除dimension紀錄
      this.dimensionFilters = []
      const dimensionComponent = this.$refs.dimensionCnt
      if (dimensionComponent) {
        dimensionComponent.restoreToDefault()
        Object.keys(this.bodyParams).forEach(k => {
          if (this.dimensionSource[k]) {
            delete this.bodyParams[k]
          }
        })
      }

      if (typeof sid === 'number') {
        this.apiParams.sid = sid
      } else {
        if (typeof this.apiParams.sid === 'number') delete this.apiParams.sid
      }
      if (typeof cid === 'number') {
        this.apiParams.cid = cid
      } else {
        if (this.apiParams.cid) delete this.apiParams.cid
      }

      // for 最小目錄篩選
      if (cidAry && cidAry.length > 0) {
        if (!this.bodyParams.cid) this.bodyParams.cid = []
        this.bodyParams.cid = cidAry
      } else {
        if (this.bodyParams.cid) delete this.bodyParams.cid
      }

      this.apiParams.page = 1
      this.getAPI()
    },
    searchByDimension(obj, deleteKey) {
      if (deleteKey) {
        delete this.bodyParams[deleteKey]
      }
      this.bodyParams = Object.assign({}, this.bodyParams, obj)
      this.apiParams.page = 1
      this.getAPI()
    },
    disableDimensionMenu() {
      this.hiddenDimensionMenu = true
    },
    enableDimensionMenu() {
      this.hiddenDimensionMenu = false
    },
  },

};
</script>

<style lang="scss">
@import "./style/reset.module.scss";
@import "./style/flex.module.scss";
@import "./style/rwd.module.scss";
@import "./style/icons.module.scss";
@import "./style/global.module.scss";
</style>

<style lang="scss" scoped>
.search-box__products {
  padding: 0 20px 20px;
}

.rec-box {
  h1 {
    font-size: 1.6rem;
    padding: 10px;
  }
}

.pagination {
  color: #fff;
  font-size: 10px;
  padding: 5px 10px;
  background: rgba(0, 0, 0, 0.5);
  display: inline-block;
  border-radius: 10px;
  position: fixed;
  bottom: 1%;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 5;
}
</style>
<style lang="scss">
@import "./style/color";

body {
  background-color: $background;
}
</style>
