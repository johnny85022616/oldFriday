<template>
<div
  id="searchinput"
  class="wrap"
  :style="reCalcTop">
  <div
    id="search-box"
    class="m_search_box navgroup"
    style="display: block;">
    <div
      id="search-layer__nav"
      class="nav-layer">
      <div class="search-form">
        <form
          action="/mobileweb/search"
          method="get"
          name="frmSearch">
          <div class="d-flex align-items-center">
            <div><a id="search-btn__go-back" class="ficon ficon-arrow-left-normal flex-auto" @click="closeSearchMenu"></a></div>
            <div class="keyword-input flex-auto">
              <div class="d-flex align-items-center">
                <div>
                  <select class="searchShopChoose" name="searchShopChoose" @click="focusInInput" @change="changeShopID">
                    <option
                      value="-999"
                      selected>全站商品</option>
                    <option value="699">愛買線上購物</option>
                  </select>
                </div>
                <div>
                  <p></p>
                </div>
                <div style="overflow: hidden">
                  <input id="searchInput" type="text" name="keyword" autocomplete="off" class="search-input m_keyword" :placeholder="randomHotTerm" v-model="inputTerms" @keydown="goSearchByEnter" @click="focusInInput" />
                </div>
                <div style="line-height: 10px">
                  <a @click="cleanInput" class="clear-search-btn">
                    <div class="ficon ficon-cross-circle-light"></div>
                  </a>
                </div>
              </div>
            </div>
            <div>
              <input @click="goSearch" id="searchBtn" type="button" class="m_search_btn flex-auto" value="搜尋" name />
            </div>
          </div>
        </form>
      </div>
    </div>
    <div
      id="search-layer__remind"
      class="search-layer active">
      <div
        v-if="isShowHistory"
        id="history-keyword"
        class="container px-2">
        <div class="search-title d-flex justify-content-between">
          <h2>搜尋紀錄</h2>
          <a @click="cleanHistoryTerms" id="search-btn__remove-history">
            <div class="ficon ficon-delete"></div>
          </a>
        </div>
        <div
          id="search-history-list"
          class="d-flex flex-wrap row">
          <div
            v-for="(item, index) of historyTerms"
            :key="index"
            class="search-tab light col">
            <a class="historySearchWord" :href="'/mobileweb/search?keyword=' + item">{{item}}</a>
          </div>
        </div>
        <div id="search-btn__show-more-history">
          <div class="ficon ficon-arrow-down-light"></div>
        </div>
      </div>

      <div class="container px-2">
        <h2 class="search-title">熱門搜尋</h2>
        <div class="d-flex flex-wrap row">
          <div
            v-for="(item, index) of hotTerms"
            :key="index"
            class="search-tab col">
            <a class="hotSearchWord" :href="'/mobileweb/search?keyword=' + item">{{item}}</a>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="isShowAutocomplete"
      id="search-layer__recommend"
      class="search-layer">
      <div id="auto-complete-keyword">
        <ul class="list">
          <li
            v-for="(item, index) of autocompleteTerms"
            :key="index"
            class="list__item">
            <a class="link d-flex align-items-center justify-content-between" :href="'/mobileweb/search?keyword=' + item.keyword + '&sid=' + shopSelect" @click="clickAutocomplete">
              <span v-html="item.name"></span>
              <span class="d-flex align-items-center text-muted">
                <div class="mr-1">{{item.count}}</div>
                <div
                  class="d-flex align-items-center justify-content-center border-circle"
                  style="width: 20px; height: 20px;">
                  <div class="ficon ficon-arrow-right-light"></div>
                </div>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "searchinput",
  data() {
    return {
      hotwordAPI: "https://storage.googleapis.com/ysdt-storage/hotKeywords.json?t=", // 熱門詞api
      autocompleteRows: 10, // 建議詞每次筆數
      autocompleteTerms: [], // 建議詞陣列
      historyTerms: [], // 搜尋紀錄
      hotTerms: [], // 熱門關鍵字
      inputTerms: "", // 搜尋關鍵字
      shopSelect: -999, // 全站 or 愛買
      switchSearchInput: true,
      randomHotTermIndex: 0,
      randomHotTerm: '',
    };
  },
  props: {
    isDownloadAppOpened: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    inputTerms(newValue) {
      if (newValue.replace(/\s/g, "") !== "") {
        this.getAutocomplete(newValue);
      } else {
        this.autocompleteTerms = [];
      }
    }
  },
  created() {
    // GET hotTerms
    const t = new Date().toLocaleDateString();
    this.axios
      .get(this.hotwordAPI + t, {
        baseURL: ""
      })
      .then(res => {
        const data = res.data;
        if (data.keywords) {
          this.hotTerms = data.keywords;
          this.randomHotTermIndex = Math.floor(Math.random() * (this.hotTerms.length - 1))
          this.randomHotTerm = this.hotTerms[this.randomHotTermIndex]
          this.$emit('setHotKeyword', this.randomHotTerm)
        }
      });

    // GET history terms
    const hisCache = window.localStorage.getItem("friday_history_keyword");
    if (hisCache) {
      this.historyTerms = JSON.parse(hisCache);
    }
  },
  computed: {
    reCalcTop() {
      if (this.isDownloadAppOpened) {
        return {
          top: "58px"
        };
      }
      return {};
    },
    // recommendation words
    isShowAutocomplete() {
      return this.autocompleteTerms.length > 0 ? true : false;
    },
    isShowHistory() {
      return this.historyTerms.length > 0 ? true : false;
    }
  },
  methods: {
    closeSearchMenu(e) {
      e.preventDefault()
      this.$emit('closeSearchMenu');
    },
    goSearch() {
      let keyword = this.inputTerms
      // 以熱搜詞搜尋
      if (keyword === '' && this.randomHotTerm !== '') {
        keyword = this.randomHotTerm
      }
      // 自然搜尋判斷愛買or全站
      if (keyword !== "") {
        window.location.href = `/mobileweb/search?keyword=${encodeURIComponent(
          keyword
        )}&sid=${this.shopSelect}`;
      }
    },
    goSearchByEnter(evt) {
      if (evt && evt.keyCode === 13) {
        evt.preventDefault();
        this.goSearch();
        evt.stopPropagation();
      }
    },
    // saerch reroute
    changeShopID: function (evt) {
      this.shopSelect = evt.target.value;
    },
    focusInInput() {
      setTimeout(() => {
        window.scrollTo(0, 70);
      }, 0);
    },
    cleanInput() {
      this.inputTerms = "";
      this.autocompleteTerms = [];
    },
    cleanHistoryTerms() {
      this.historyTerms = [];
      window.localStorage.removeItem("friday_history_keyword");
    },
    getAutocomplete(word) {
      const apiDomain = this.configs.searchAPI();
      this.axios
        .get(
          "api/v1/search/suggestion?keyword=" +
          encodeURIComponent(word) +
          "&rows=" +
          this.autocompleteRows, {
            baseURL: apiDomain
          }
        )
        .then(res => {
          const data = res.data;
          if (data.data.length > 0) {
            this.autocompleteTerms = data.data.map(item => {
              return Object.assign({
                  keyword: encodeURIComponent(
                    item.name.replace(/(<b>|<\/b>)/gi, "")
                  )
                },
                item
              );
            });
            // this.ga.event('小網搜尋頁', 'show', '搜尋建議詞')
          } else {
            this.autocompleteTerms = [];
          }
        });
    },
    clickAutocomplete() {
      // this.ga.event('小網搜尋頁', 'click', '搜尋建議詞')
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/color';

@media (max-width: 350px) {
  .keyword-input {
    min-width: 141px !important ;
    padding: 3px 10px !important;
  }
  #searchBtn{
    min-width: 50% !important;
    min-height: 50% !important;
  }
  #search-btn__go-back{
    width: 30px !important;
    height: 30px !important;
    background-size: cover;
  }
}

.wrap {
  position: fixed;
  z-index: 9;
  width: 100%;
  height: 100%;
  background-color: #ffffff;

  .search-title {
    padding: 14px 0;
    font-size: 1.6rem;
    font-weight: 500;
    color: #3c3c3c;
  }

  #history-keyword {
    border-bottom: 1px solid #e0e0e0;

    #search-btn__remove-history {
      font-size: 1.8rem;
      color: #9b9b9b;
    }

    #search-btn__show-more-history {
      padding: 5px;
      text-align: center;
      color: #9b9b9b;
      visibility: hidden;
    }
  }

  #searchBtn {
    display: block;
    padding: 6px 11px !important;
    border: 0;
    border-radius: 10px;
    font-size: 1.6rem;
    font-weight: 500;
    color: $white;
    background: $red;
    -webkit-appearance: none;
    margin: 0 15px 0 5px;
    min-width: 54px;
    min-height: 34px;
  }

  #search-btn__go-back {
    display: block;
    width: 45px;
    height: 45px;
    background-repeat: no-repeat;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDUiIGhlaWdodD0iNDUiIHZpZXdCb3g9IjAgMCA0NSA0NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0yNi4yNSAzMC43ODFhLjUyMy41MjMgMCAwIDAgLjM3NS0uMTU2LjUyLjUyIDAgMCAwIC4xNTYtLjM4My41Mi41MiAwIDAgMC0uMTU2LS4zODNMMTkuNSAyMi43MzRsNy4wMzEtNy4wM2EuNTExLjUxMSAwIDAgMCAuMTU3LS4zNzYuNTExLjUxMSAwIDAgMC0uMTU3LS4zNzUuNTIuNTIgMCAwIDAtLjM4My0uMTU2LjUyLjUyIDAgMCAwLS4zODIuMTU2bC03LjQwNyA3LjQwNmEuNTExLjUxMSAwIDAgMC0uMTU2LjM3NWMwIC4xNDYuMDUyLjI3MS4xNTYuMzc1bDcuNTE2IDcuNTE2YS41NDMuNTQzIDAgMCAwIC4zNzUuMTU2eiIgZmlsbD0iIzNDM0MzQyIgZmlsbC1ydWxlPSJldmVub2RkIi8+Cjwvc3ZnPgo=');
  }

  .keyword-input {
    min-width: 181px;
    background-color: #fff;
    padding: 6px 10px;
    border-radius: 10px;

    input {
      border: none;
      border-left: 1px solid #bdc0c9;
      border-radius: 0;
      line-height: normal;
      padding-left: 10px;
      font-size: 1.6rem;
      -webkit-appearance: none;
      outline: none;
    }

    p {
      display: inline-block;
      width: 15px;
      height: 19px;
      background: url(https://m.shopping.friday.tw/static/images/triangle-down-bk.svg) no-repeat;
      background-size: 8px 8px;
      background-position: 3px 8px;
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
    }
  }

  .searchShopChoose {
    -webkit-appearance: none;
    outline: none;
    border: 0;
    font-size: 1.5rem;
    background-color: white;
    flex: 1;
  }

  .clear-search-btn {
    padding: 0;
    width: 16px;
    height: 16px;
    color: #9b9b9b;
  }

  .m_search_box {
    .nav-layer {
      width: 100%;
      box-sizing: border-box;
      padding: 6px 0;
      z-index: 10;
      background: #f4f4f4;
    }

    .container {
      position: relative;
      overflow: hidden;

      &.px-2 {
        padding: 0 10px;
      }

      h2 {
        font-size: 1.6rem;
        font-weight: 500;
        color: #3c3c3c;
      }

      .row {
        margin-left: -5px;
        margin-right: -5px;

        .col {
          margin-left: 5px;
          margin-right: 5px;
          margin-bottom: 5px;

          a {
            border-radius: 0px;
            color: #de1911;
            text-decoration: none;
          }
        }
      }

      .search-tab {
        margin: 2px;
        padding: 7px 10px;
        font-size: 1.4rem;
        background-color: #fff;
        border: 1px solid #f5281e;
        border-radius: 17px !important;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &.light {
          background: #f4f4f4;
          border: none;

          a {
            color: #9b9b9b;
          }
        }
      }
    }
  }

  .search-layer {
    position: absolute;
    background: #fff;
    top: 64px;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 0;
    padding-bottom: 62px;
    overflow-y: scroll;
  }

  #auto-complete-keyword {
    .list {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;

      .list__item {
        list-style: none;

        .link {
          font-size: 1.4rem;
          padding: 11px 20px;
          border-bottom: 1px solid #e0e0e0;
          color: #3c3c3c;
          text-decoration: none;

          b {
            font-weight: bold;
          }

          .text-muted {
            color: #9b9b9b;
            font-size: 1.3rem;
          }
        }
      }
    }
  }

  .safari input[type="text"] {
    font-size: 1.6rem;
  }
}
</style>
