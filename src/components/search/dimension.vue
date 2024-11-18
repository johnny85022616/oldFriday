<template>
<div
  class="container dimension-filter-bar"
  ref="container"
>
  <div
    class="dimension-item"
    :style="itemBoxStyle"
  >
    <span v-for="(item,index) of dimensionItems" :key="index" :class="['triangle', {'active': index === nowOpenTabIdx}, {'highlight': index === nowOpenTabIdx || Object.keys(selectedItems).includes(item.key) }]" @click="openMenu(index)">
      {{item.name}}
      <i class="triangle-down"></i>
    </span>
  </div>

  <div
    class="bg"
    v-if="isShowMenu"
    @click="closeMenu"
  ></div>

  <div
    v-if="isShowMenu"
    class="sub-item"
    ref="sub-item"
    :style="subItemStyle"
  >
    <div class="item-box d-flex flex-wrap">
      <div
        v-for="(item, index) of subMenuTree"
        :key="index"
        @click="chooseSelectionItem(item)"
        class=""
      >
        <i :class="['circle', {'active': tmpSelectedItems.includes(item.value)}]"></i>{{item.name}}
      </div>
    </div>
    <div
      class="filter_btn"
      ref="filter_btn"
    >
      <div>
        <button class="cancel" @click="clearSubMenuDialog()">清除條件</button>
      </div>
      <div>
        <button class="confirm" @click="submitSubMenu()">確定</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'dimension',
  data() {
    return {
      isShowMenu: false,
      subMenuTree: [],
      nowOpenTabIdx: -1,
      nowOpenTabKey: null,
      selectedItems: {},
      tmpSelectedItems: []
    }
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    hiddenDimensionMenu: {
      type: Boolean
    }
  },
  watch: {
    hiddenDimensionMenu(n) {
      if (n) {
        this.nowOpenTabIdx = -1
        this.isShowMenu = false
      }
    }
  },
  methods: {
    closeMenu() {
      this.isShowMenu = false
      this.nowOpenTabIdx = -1
      this.$emit('stopBodyScroll', 'close')
    },
    openMenu(idx) {
      window.scrollTo(0, 0)
      if (this.nowOpenTabIdx !== -1 && this.nowOpenTabIdx !== idx) {
        this.nowOpenTabIdx = idx
        this.nowOpenTabKey = this.items[idx].key
        if (this.selectedItems[this.nowOpenTabKey]) {
          this.tmpSelectedItems = this.selectedItems[this.nowOpenTabKey]
        }
        this.subMenuTree = this.items[idx].items
        return
      }

      this.isShowMenu = !this.isShowMenu
      if (this.isShowMenu) {
        this.$emit('enableDimensionMenu')
        this.$emit('stopBodyScroll')
        this.nowOpenTabIdx = idx
        this.nowOpenTabKey = this.items[idx].key

        if (this.selectedItems[this.nowOpenTabKey]) {
          this.tmpSelectedItems = this.selectedItems[this.nowOpenTabKey]
        }

        this.subMenuTree = this.items[idx].items
      } else {
        this.nowOpenTabIdx = -1
        this.$emit('stopBodyScroll', 'close')
      }
    },
    chooseSelectionItem(itemObj) {
      if (this.tmpSelectedItems.includes(itemObj.value)) {
        this.tmpSelectedItems.splice(this.tmpSelectedItems.indexOf(itemObj.value), 1)
      } else {
        this.tmpSelectedItems.push(itemObj.value)
      }
    },
    restoreToDefault() {
      this.subMenuTree = []
      this.nowOpenTabIdx = -1
      this.nowOpenTabKey = null
      this.selectedItems = {}
      this.tmpSelectedItems = []
    },
    clearSubMenuDialog() {
      this.closeMenu()
      this.nowOpenTabIdx = -1
      this.tmpSelectedItems = []

      if (this.selectedItems[this.nowOpenTabKey]) {
        delete this.selectedItems[this.nowOpenTabKey]
      }

      this.$emit('searchByDimension', this.selectedItems, this.nowOpenTabKey)
    },
    submitSubMenu() {
      if (this.tmpSelectedItems.length === 0) {
        this.nowOpenTabIdx = -1
        return
      }

      const tabKey = this.items[this.nowOpenTabIdx].key
      if (!this.selectedItems[tabKey]) {
        this.selectedItems[tabKey] = this.tmpSelectedItems
        this.tmpSelectedItems = []
        this.nowOpenTabIdx = -1
      }

      this.closeMenu()
      this.$emit('searchByDimension', this.selectedItems)

      this.ga.event(
        "小網搜尋頁",
        "click",
        `規格篩選 - ${this.nowOpenTabKey}`
      );

      // scroll to horizontal head.
      const subItemDom = this.$el.querySelector('.dimension-item')
      if (subItemDom) this.$el.querySelector('.dimension-item').scrollTo(0, 0);
    }
  },
  computed: {
    dimensionItems() {
      let selectedKeys = Object.keys(this.selectedItems).length > 0 ? Object.keys(this.selectedItems) : []
      let items = this.items
      items = items.sort((a) => {
        if (selectedKeys.includes(a.key)) {
          return -1
        }
        return 0
      })
      return items
    },
    itemBoxStyle() {
      return {
        width: (window.innerWidth - 20) + 'px'
      }
    },
    subItemStyle() {
      let heightPixel = {}
      const appH = this.isDownloadAppOpened ? 50 : 0
      const menuH = document.querySelector('.navigation-bar').clientHeight
      const categoryH = document.querySelector('.category-filter-bar').clientHeight
      const thisH = this.$refs.container.clientHeight
      const btnH = 60
      const itemH = Math.ceil(this.subMenuTree.length / 2) * 44
      let itemBoxH = (window.innerHeight - (appH + menuH + categoryH + thisH + btnH))

      if (itemH > itemBoxH) {
        if (/iphone/i.test(navigator.userAgent)) {
          // itemBoxH = itemBoxH
        }
        heightPixel = {
          height: itemBoxH + 'px'
        }
      }
      return heightPixel
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  color: #3c3c3c;
  font-size: 1.4rem;
  background-color: #ffffff;

  .dimension-item {
    height: 25px;
    overflow-x: auto;
    white-space: nowrap;
    padding-top: 3px;

    &::-webkit-scrollbar {
      display: none;
    }

    span {
      box-sizing: border-box;
      margin-right: 10px;
      padding: 2px 3px;
      border: 1px solid #e0e0e0;
      border-radius: 5px;
    }
  }
}

.bg {
  display: block;
  opacity: 0.6;
  z-index: 5;
  position: fixed;
  left: 0;
  width: 100vh;
  height: 100vh;
  margin-top: 10px;
  background-color: #000000;
}

.dimension-item {
  span {
    &.active,
    &.highlight {
      color: #f34f59;
    }
  }
}

.sub-item {
  z-index: 6;
  position: fixed;
  left: 0;
  width: 100%;
  margin-top: 10px;
  border-top: 1px solid #e0e0e0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background: #fff;

  .item-box {
    padding-top: 10px;
    padding-left: 10px;
    box-sizing: border-box;

    div {
      flex: 0 0 50%;
      line-height: 44px;
      overflow: hidden;
      word-break: break-all;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;

      i {
        margin-right: 5px;
      }
    }
  }

  .filter_btn {
    display: flex;
    position: sticky;
    bottom: 0;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    padding: 0 10px;
    border-top: 1px solid #e0e0e0;
    background-color: #ffffff;

    div {
      flex-basis: 50%;
      padding: 10px 5px;
    }

    button {
      box-sizing: border-box;
      width: 100%;
      padding: 10px 0;
      border: 0;
      border-radius: 10px;
      outline: 0;
      font-size: 1.5rem;
      text-align: center;
      cursor: pointer;
    }

    .cancel {
      border: 1px solid #f34f59;
      color: #f34f59;
      background: #ffffff;
    }

    .confirm {
      color: #ffffff;
      background: #f34f59;
    }
  }

}
</style>
