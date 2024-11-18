<template>
<div>
  <div class="filter-bar-bottom">
    <div
      :class="['sort-txt','triangle', {'active': apiParams.sorting !== 'RELEVANT'}]"
      @click="showSortMenu()"
    >
      <i class="sort-icon"></i>
      <font>{{sortSource[sortKey].name}}</font>
      <i class="triangle-down"></i>
    </div>
    <div
      :class="['filter-txt', {'active': bodyParams && Object.keys(bodyParams).length > 0}]"
      @click="showFiltersDialog()"
    ><font>篩選</font></div>
  </div>

  <div
    v-if="isShowSortMenu"
    class="sort-downmenu"
  >
    <div class="bg" @click="closeDialog"></div>
    <ul>
      <li
        v-for="(item, index) of sortSource"
        :key="index"
        :class="{'active': item.key === apiParams.sorting}"
        @click="onSort(item.key, index)"
      >
        <i></i>
        {{item.name}}
      </li>
    </ul>
  </div>

  <filters
    :filters="filters"
    v-show="isShowFilterDialog"
    v-on:showFiltersDialog="showFiltersDialog"
    v-on:mergeFilterRule="mergeFilterRule"
  ></filters>
</div>
</template>

<script>
import filters from "./filters.vue"; // 篩選對話框

export default {
  name: 'controls',
  components: {
    filters,
  },
  data() {
    return {
      apiParams: {
        sorting: 'RELEVANT'
      },
      bodyParams: null,
      isShowSortMenu: false,
      isShowFilterDialog: false,
      sortKey: 0,
      sortSource: [{
          name: '相關性',
          key: 'RELEVANT'
        },
        {
          name: '最新商品',
          key: 'NEW_ARRIVAL'
        },
        {
          name: '熱銷排行',
          key: 'SALE_COUNT'
        },
        {
          name: '價格低到高',
          key: 'PRICE_LOW'
        },
        {
          name: '價格高到低',
          key: 'PRICE_HIGH'
        },
      ]
    }
  },
  props: {
    filters: {
      type: Array,
      default: () => []
    },
  },
  created() {
  },
  computed: {
  },
  methods: {
    closeDialog() {
      this.isShowSortMenu = false
      this.isShowFilterDialog = false
    },
    showSortMenu() {
      this.isShowSortMenu = !this.isShowSortMenu
      if (this.isShowSortMenu) {
        this.$emit('stopBodyScroll')
      } else {
        this.$emit('stopBodyScroll', 'close')
      }
    },
    showFiltersDialog() {
      this.isShowFilterDialog = !this.isShowFilterDialog
      if (this.isShowFilterDialog) {
        this.$emit('stopBodyScroll')
      } else {
        this.$emit('stopBodyScroll', 'close')
      }
    },
    onSort(str, idx) {
      const obj = {
        sorting: str,
        bodyParams: this.bodyParams
      }
      this.sortKey = idx
      this.apiParams.sorting = str
      this.showSortMenu()
      this.$emit('controlsParams', obj)

      // tracking
      let sortTxt = '價格高到低'
      switch (idx) {
        case 0:
          sortTxt = '相關性'
          break;
        case 1:
          sortTxt = '最新商品'
          break;
        case 2:
          sortTxt = '熱銷排行'
          break;
        case 3:
          sortTxt = '價格低到高'
          break;
        default:
      }

      this.ga.event(
        "小網搜尋頁",
        "click",
        `價格排序 - ${sortTxt}`
      );
    },
    mergeFilterRule(filterObj) {
      if (filterObj) {
        this.bodyParams = filterObj
        this.$emit('controlsParams', {
          sorting: this.apiParams.sorting,
          bodyParams: filterObj
        })
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.filter-bar-bottom {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-size: 13px;
  line-height: 20px;

  div {
    line-height: 2.9rem;
    vertical-align: middle;
  }

  .sort-txt {
    flex: 0 0 80%;
    font-size: 1.4rem;
    color: #3c3c3c;

    .sort-icon {
      display: inline-block;
      width: 24px;
      height: 24px;
      vertical-align: middle;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAADbN2wMAAAAy0lEQVRoBe2YsQ3DMAwEJc6RhbJB+gAuPFCKAO6zQRbKHJbBgrUomIQd+Nz6TTxPD+jhUnggAAEIQAACEDiOQH0tn3td13dr5eaxUWv5NZFpfj6+Hn22RkbMqxldVL/JNuadL17hWXWicdBYeA1ahLx6dBCAAAQgAIFMAsNdKMqMXYh7O9VwF4paIKpTXa8LRZ2ARShqHnMgAAEIQOCaBNK6kF1Ue7tO71jSulBU1+ku0BOc/f3wfyHvQhYhrx4dBCAAAQhAAAL/SGADw0xLFrzUQSgAAAAASUVORK5CYII=') no-repeat top/20px;

    }

    &.active {
      font {
        color: #f34f59;
      }

      .sort-icon {
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAADbN2wMAAAA/klEQVRoBe2WMRLCIBBF2WilXsPaozhJmZwPy3gWa69h7AiSgibN38zKMI6fhgEWWB7M8JxjIQESIAESIAESqEdANFu/u6ENc7xoYkXc8zj6m4hETbw1Zo8WmNr+GsI8org8HlPaUzcsTZ/7StYNWjzlc0Ix6/F0ra91X6k2fEIxRklE+0T2rEli18jjMPq7JpYxJEACJEACJGAlAD+yZYMtLmRNKM/XOtXXXSgnYK21TlXEhazJ5/kap4JPaKsL5c2tNZ3KSpDzSYAESOA/CMCPbMFQwoW0roOuoZoLaV0HHaCqC2lcBx0APqFSLkTXQVfDcRIgARIgARL4BQIfkH9cp/xLcq8AAAAASUVORK5CYII=') no-repeat top/20px;
      }
    }
  }

  .filter-txt {
    font-size: 1.4rem; 
    &.active {
      font {
        color: #f34f59;
      }
    }
  }


  .forlist_icon {
    i {
      display: inline-block;
      width: 24px;
      height: 24px;
      vertical-align: middle;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAADbN2wMAAAB1klEQVRoBe1Zz0qGQBD/TA/RR3Tu0Kljr6Cij9GfcwRFUYeORU/wUdQbWL2GoI9Q3Tp16BxRBGr2m4+URcePYMn1g1mQXWdndn4zszrjOhpJEw+IB+baAxaHPgiCxTzPLzG3g2uJ4+mLZlnWG3Td27Z9HMfxV1Ov0yTQPcCfo9vl5vqmlWW5Ap17RVG8oz9t6l9oEugeVm9zdMM02g2txkYAVq9VnGmastusmv/v3nXdknQA0yqni40AxzhUmhhgOjISAYmApgdkC2k6UFucTWTqqmEYbqj3fY+zLKtUflcDte8y4BlM68SIBR5UAVNjlDeEqdXYZwDMNy1OwwSUEtcchM46x/O8Awhs4aJq0GT7APgINdmVSRCiWzwgHhAP8B7ofI36vn+E1xd9G4950d6odCpxlyTJ3/MAvkMPIUTHKoNpSK4nMGLSBNSViSmJDaphN+xzgNhaCMzTOogEYLnRYg5YHn+B15hUQ1gDwFBHBmF7UgX6HmM7z1RZA53JNeBJMcB0cCQCEgFND8gW0nSgtjibyJB9X5EBp+fx1fm8tibNBYDphVuiawtFHLNJGhx6y+lnI4Afamf4J7UMgU0Imj6V+ASOyHGcC84AoYkHxANz7oEfRi1pdNA0q94AAAAASUVORK5CYII=') no-repeat center/24px;
    }
  }
}

.sort-downmenu {
  display: block;
  position: relative;
  width: 100%;
  z-index: 1;

  .bg {
    display: block;
    position: absolute;
    top: 0;
    background-color: #000000;
    opacity: 0.6;
    width: 100vh;
    height: 100vh;
  }

  ul {
    position: absolute;
    width: 100%;
    background-color: #ffffff;

    li {
      list-style-type: none;
      line-height: 4.4rem;
      font-size: 1.4rem;
      color: #3c3c3c;
      padding-left: 20px;

      i {
        display: inline-block;
        width: 18px;
        height: 18px;
        background-size: 18px;
        background-repeat: no-repeat;
        vertical-align: text-top;
      }

      &.active {
        i {
          display: inline-block;
          width: 18px;
          height: 18px;
          vertical-align: middle;
          background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAJKADAAQAAAABAAAAJAAAAAAqDuP8AAADAUlEQVRYCe2WPUxTURTHz3ktWnmgBh10MG4OGhPDYnRQRsVECuQpUPyKSoyTCZsRgwmjo9EBqYmVKhJsMYCwOJmo0cFEJ01MjNHBSdM+iLz2Hs8p3vp8/aDPhDLYO/T2fpxzf+/cc/65ALVWi0AtAv9ZBHA1vzfdFukhUMeNgDFkPhp9JSzB1QISGAB1j89HUrTAfZewGPJT7ZYK97YAqjvEMHI2IUxohqoD/bQiOzkyCSJYIxCGAVcaE/FxDVTVHEpbp7eAs/iCiLYLACKONCTj5zSM9FWLEFkXGxhmOg8DMGvu2XHBDVM1ILIeBmzn+xjDNMuhHJk35qZ1x3BwMOMFqkqVpZ3kTSBqXYKBzxgKHcFoNOWFkfGKX5nd1nOZYfpyhyP8IAy2mg+iX4vByNyKJrXWGilvbg5h4FBjIva0FMxfQHZHb7NSasAgmjYn798uZ1TJmmgNQnZOlzcDneSKii1nm78yUqqfQxtWAMPpcPd1TsB/jl6B1iAOVAIjsHkgJBhF/iSZ5K/qt8OROFmDOfGSuUobR3qr49AMO9koNhyZETMZH6rUPg9kTsZnEI0wAs6LMQF12YvvZ8nq21CpM9EajvRUXmsQ54ppTTl/Bdcy33libzaTnWKkzWLIX/jWqAserh+/+6WcoyWtST5mmN/lzVrTFDpQqrxL+cpHSG+on4i9rAvCfib5KHN8wG7lOM9Tnad26T3FetGaPzDltaaYvZ4rAJKF0ET8A2BgH4fvtYw5p7ZB1nm20N59UMbe5ldrvPbucVEg2cB68c1cH2zhK3uSM+AkzSqYS7X3WG4HS48syiUt73UAgx1s+869x8//kkDiBGMxm5PyKFdfVMYscGtR0Vg6HLkkY++7hqfOLid8YleuFSR1qc2ptsg1fsdc1esCSYAdurwN1ho/5a39ePuKgcTQbo+cJ1K3OKcCbkeiNd53jXvdz/+yV+Z1ZCZGh91aJesM41trvH7dY18R0oaiVSqTuUGInxqaQmf8ao32U+trEahFYDUi8AuSUiofIJvaEwAAAABJRU5ErkJggg==');
        }

      }
    }
  }
}
</style>
