<template>
<div
  class="container category-filter-bar"
  ref="container"
>

  <div :class="['items', {'item-select': navBar.length > 0}]">
    <span @click="openAll()" :class="['triangle', {'active': navBar.length === 0 && nowOpenLevelIdx === 0 && isShowMenu}]">
      全站分類
      <i v-if="navBar.length === 0" class="triangle-down"></i>
    </span>
    <span v-for="(item, index) of navBar" :key="index" :class="['triangle', {'active': nowOpenLevelIdx === index && isShowMenu}, {'highlight': (index+1) === navBar.length && selectedCidAry.length > 0}]" @click="openMenu(index)">
      {{item.name}}
      <i v-if="item.menu" class="triangle-down"></i>
    </span>
  </div>
  <div
    class="bg"
    v-if="isShowMenu"
    @click="closeMenu"
  ></div>
  <div
    v-if="isShowMenu"
    class="category-item"
    :style="menuStyle"
  >
    <div v-if="nowOpenLevelIdx < (acceptMaxMenuItem - 1)">
      <ul>
        <li
          v-for="(item, index) of cateMenuTree[nowOpenLevelIdx]"
          :key="index"
          @click="chooseItem(item)"
        >
          {{item.name}}
          <font>({{item.count}})</font>
        </li>
      </ul>
    </div>
    <div v-else>
      <ul class="is_check_type">
        <li
          v-for="(item, index) of cateMenuTree[nowOpenLevelIdx]"
          :key="index"
          @click="chooseSelectionItem(item)"
        >
          <i :class="['circle', {'active': selectedCidAry.includes(item.cid)}]"></i>{{item.name}}
          <font>({{item.count}})</font>
        </li>
      </ul>
      <div class="filter_btn">
        <div>
          <button class="cancel" @click="closeSubMenuDialog()">清除條件</button>
        </div>
        <div>
          <button class="confirm" @click="submitSubMenu()">確定</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'category',
  data() {
    return {
      acceptMaxMenuItem: 2, // 全站分類目錄列表最多幾層 (全站2 關企3 "愛買、遠百、sogo、citysuper")
      cateMenuTree: [], // 下拉選單資料
      isShowMenu: false, // 是否顯示下拉選單
      navBar: [], // 全站分類目錄列表
      nowOpenLevelIdx: 0, // 目前所選目錄階層
      selectedCidAry: [], // 目前所選cid
      selectedSid: null, // 目前所選sid
      selectedCid: null, // 目前所選cid
      corpSidData: [145, 146, 167, 699], // 關企所屬sid

    }
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    isDownloadAppOpened: {
      type: Boolean
    }
  },
  watch: {
    items(newValue) {
      if (newValue && newValue.length > 0 && this.cateMenuTree.length < this.acceptMaxMenuItem) {
        this.cateMenuTree[this.nowOpenLevelIdx] = newValue
      }
    }
  },
  methods: {
    openAll() {
      window.scrollTo(0, 0)
      this.$emit('disableDimensionMenu')
      this.nowOpenLevelIdx = 0
      if (this.navBar.length > 0) {
        this.navBar = []
        this.cateMenuTree.splice(1)
        this.isShowMenu = false
        this.$emit('searchByCategoryID', null, null, [])
      } else {
        this.isShowMenu = !this.isShowMenu
        if (this.isShowMenu) {
          this.$emit('stopBodyScroll')
        } else {
          this.$emit('stopBodyScroll', 'close')
        }
      }
    },
    closeMenu() {
      this.isShowMenu = false
    },
    openMenu(menuLevelIdx) {
      window.scrollTo(0, 0)
      this.isShowMenu = !this.isShowMenu
      if (this.isShowMenu) {
        this.nowOpenLevelIdx = menuLevelIdx
        this.$emit('disableDimensionMenu')
        this.$emit('stopBodyScroll')
      } else {
        this.$emit('stopBodyScroll', 'close')
      }
    },
    chooseItem(itemObj) {
      // choose level 1, sid
      if (typeof itemObj.sid === 'number') {
        if (this.navBar.length === 0) {
          this.navBar.push({
            name: itemObj.name,
            menu: true
          })
          this.navBar.push({
            name: '選擇分類',
            menu: true
          })
        } else {
          this.navBar[0].name = itemObj.name
          this.navBar.splice(2)
        }
        this.selectedSid = itemObj.sid
        this.selectedCid = null
        this.selectedCidAry = []
      }

      // coose level 2, cid .  only for 關企
      if (itemObj.cid) {
        if (this.navBar.length === 2) {
          this.navBar.push({
            name: '選擇分類',
            menu: true
          })
        }
        this.navBar[1].name = itemObj.name
        this.selectedCid = itemObj.cid
      }

      // reset cid ary & tabs ary
      this.cateMenuTree.splice(typeof itemObj.sid === 'number' ? 1 : 2)
      this.selectedCidAry = []
      this.changeLastSubMenuName('選擇分類')

      // change tabs max num.
      if (typeof itemObj.sid === 'number') this.acceptMaxMenuItem = this.corpSidData.includes(itemObj.sid) ? 3 : 2

      this.nowOpenLevelIdx += 1
      this.isShowMenu = false

      // send parameters and get api
      this.$emit('searchByCategoryID', this.selectedSid, this.selectedCid, this.selectedCidAry)
      this.$emit('stopBodyScroll', 'close')

      // tracking
      this.ga.event(
        "小網搜尋頁",
        "click",
        `過濾條件 - 商品分類`
      );
    },
    chooseSelectionItem(itemObj) {
      // choose level 2, cid
      if (itemObj.cid) {
        if (!this.selectedCidAry.includes(itemObj.cid)) {
          this.selectedCidAry.push(itemObj.cid)
        } else {
          this.selectedCidAry.splice(this.selectedCidAry.indexOf(itemObj.cid), 1)
        }
      }
    },
    closeSubMenuDialog() {
      this.$emit('searchBySid', this.selectedSid, [])
      this.selectedCidAry = []
      this.changeLastSubMenuName('選擇分類')
      this.isShowMenu = false
      this.$emit('stopBodyScroll', 'close')
    },
    submitSubMenu() {
      let menuName = ''
      let tmpObj = {}
      switch (this.selectedCidAry.length) {
        case 0:
          menuName = '選擇分類'
          break;
        case 1:
          tmpObj = this.cateMenuTree[this.nowOpenLevelIdx].find(o => this.selectedCidAry[0] === o.cid)
          menuName = tmpObj.name
          break;
        default:
          menuName = `選擇分類(${this.selectedCidAry.length})`
      }
      this.changeLastSubMenuName(menuName)
      this.isShowMenu = false
      this.$emit('searchByCategoryID', this.selectedSid, this.selectedCid, this.selectedCidAry)
      this.$emit('stopBodyScroll', 'close')

      // tracking
      this.ga.event(
        "小網搜尋頁",
        "click",
        `過濾條件 - 商品分類`
      );
    },
    changeLastSubMenuName(name) {
      this.navBar[this.navBar.length - 1].name = name
    }
  },
  computed: {
    menuStyle() {
      let heightPixel = {}

      if (this.nowOpenLevelIdx === 0) {
        const appH = this.isDownloadAppOpened ? 50 : 0
        const menuH = document.querySelector('.navigation-bar').clientHeight
        const thisH = this.$refs.container.clientHeight
        heightPixel = {
          height: (window.innerHeight - (appH + menuH + thisH)) + 'px'
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

  .items {

    span {

      &.active,
      &.highlight {
        color: #f34f59;
      }
    }

    &.item-select {
      span {
        &::after {
          content: ' > ';
          color: #adadad;
        }

        &:last-child {
          &::after {
            content: '';
          }
        }
      }
    }

    &.active {
      span:last-child {
        &::after {
          content: '';
        }
      }
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

.category-item {
  z-index: 6;
  position: fixed;
  left: 0;
  width: 100%;
  margin-top: 10px;
  border-top: 1px solid #e0e0e0;
  overflow: auto;
  background: #fff;

  ul {
    padding-left: 45px;

    &.is_check_type {
      padding-left: 20px;

      i {
        margin-right: 5px;
      }
    }

    li {
      list-style-type: none;
      line-height: 44px;

      font {
        color: #adadad;
      }
    }
  }

  .filter_btn {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    padding: 0 10px;
    border-top: 1px solid #e0e0e0;

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

i.circle {
  display: inline-block;
  width: 18px;
  height: 18px;
  vertical-align: middle;
  ;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAJKADAAQAAAABAAAAJAAAAAAqDuP8AAADkklEQVRYCc1YTWtTQRR9+aobC27jwkX8C9WFhUjQQoyJISnUH+DCghYXWemiiy7cdSFaaMFfICQhxsZCkWChLmr/QrtwoUuFCsF8es7k3vCSPJpX+/rMwLz7Zt6995y5M5m5E8vyoNTr9cusHriyAmd1Uq1Wr7Xb7Qe9Xu8+bGOoUbzP0k8gEDiB+IF6jPftcDj8PpPJfOM3t8U1oVKplIbTVYDfcOuceiD2FWItn89/cGM3kVClUplDRNbhLK4OJRI7aB8Eg8HvaDMqFshGu93uVbzeRE1q5PgNZQ8RK2Sz2cN+0/l5KqFisfgYZq9RI2K+HwqFXs7MzHxKpVJ/nF32e2u12qVms3mn0+m8QM+86LYgVxYXF7ekPSYcCWFkoXK5/AryCS0QgSOIAsJeGfPgogPTnYXaOvxdpzr8beRyuWeQnVFzR0Jw8MZGZheGS3Dwa9T4LG0M8Ap8vkNdoB1JYYBPR32MEZJp2hSjtyCy7DSSUUdu2iATwmA5XY9Ef3l0+oYIyQL+AuUISOyCzD2vyChhkkK0PkqkWljot+wLPaiKlPJrIpkj1CWvyRCDPvGjeEgMNCOCyU+mDAjJPqM/7cJ514wCOMl0Ov0T/QX5Fhds0xwQQmtVFPb/9dck9q6EYOyLsmJbhhCPA8yp2YG5z7jy6IGSYhGbHOjSEMIGxn2C83vCTY/vfhRiEZNYPB8pDSF0pthA2Zm0A/fVvHkKFo8gHjs8rPuEIGNsoBz0ha9PxTQcTITAjgeixYPSVyo2zAEHSaxMcoWpM6e2n6RsmCbJMxHyk8AkrGAikfitKx1hi04y8Pq7YpIDuWiEzFRJcuU15qn+bJiGgxI6Fitmen4XxeTZNtiHtoVFkpmeX4wEK0k8TFmN0kSItwM2MJ+zTDv57kdpNBp3iUks5WAI8aoChrwdWJID89WP8pwgxNbrkq4h9q/xgTKPdMCcbf3mxTwFQ5N/xR6+KCJ9/Qz4OBgzQZu7qJxI8utDTBeT/j2ksbd12PYIcR6ZNLWoiMqEPKSKXkn6FN8kwxRWEzUDMURIctsVfoHRAkay6SUp+sJUbdG3QccdzZ5Ps28oyRclC0b/7Ro0FCElhLXDS9wG2xwN6uF5Fjpt6UMjQ9/EUDy7dIyQKkzNVVoJUU7Vnw12Ygj7dPwdYyfFd94OeCnAOmAeHsO6YLZpEjxIpjLMOo/RX0MSX9EdGH3+FS//0vsLSfjLEj9esIsAAAAASUVORK5CYII=') no-repeat center/18px;

  &.active {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAJKADAAQAAAABAAAAJAAAAAAqDuP8AAAENklEQVRYCc1YTWhUVxQ+582bCenMLEqhxWhtsVB3pZV2EyRuRMWKkzSNNQmGNv6VWnFhF11JUHRXaAmKugj+RcHBdtI2LgRBh5Iu7KIUSkFoURcVF1XLzDNx5r05nnNfbvLmZd6bN8lM7YOZe+/5/e65v+cCNOGjvs9S8muCKcBGjUz3Da20y/ZWJHqfEFYB4TIASrt2sABI95HgL0KcNOPm9+3Zc/ca8REZkNUzuIWIDvHvvYYcIN5CxMPJ78Z/jKJXF5DVu+Pdiu18xVHoimIwWAbzhhk7mLxy/pdgGQgfMivTv5dDP8pRiYcZicrjSJV5qPcnJy6dCtKpGSHquxx7Usp9UwHaF6S4FLoBePyFRPcBzG5z/HZMP0HarQQj9qWj7EOqn8uf91sQIRmmCsBJr1Cr6gbAp/7hqwIkE5gcZ6pZc6ZeR9ScisU6vROdQc5/spr+KzDiVXy5K3gewxwg2WeWvrTnDUevUZfr29WYA8RoD0U30lxJr281h9RxUCrfba4btckR73TnCAwLofIJEbQH+TAT8dfkmFERsstOJkhwKXQ0jF2p3KWP07nxfYC4O8yWnI/CV4CQKpvDhBfFQzzC59eY1jUN+FnXa5VyWAtdAVKndi2pRdIQ4UI6d7FqTtoOfhhmTmPQk7ojTLgRHoO5kYyv3unVKXYPbgCqHPXSatQVBpSLVbH0qFBDoIrEm9h1isUPoGMv583/FE/Q16sEpIHwRwraOjF35rHmFXuH3iLb/mn+zqQ5C8tU4sW0jtBCro9ixmBP+srZ31O58WtoxDp5ef7mFeH2AxPaNnvBWNuHO8CxJ6OA0bYMzJ4octfqRogM09ZKyW8v3E8m0l28cm4KDQGfoGluac+duaNlaHg4TTMzk7zHrNC08BILgsWNEF87w4UB7FJ5lPpGEloOs6f/Tb360kYGlUWg7d7ziEZGTOuf6csM5m0tX7ecxaCuH+oODPBmHaWtVun2JPf8AxwbUxHF0dGnrLPNr1f89fZxpm3y08PaHOU/hT+77JHHuf5HQOuthzM3Cj07Xg6SLvb0f8mn5p4gfhCdAK4KTwGS7CBI0E/nYVgDZE/N9A6s8vMKmcGP+PZ1zE+P0tYYFCA5Q3hZ34qiqGQI3rBtmrJ6h97ROtM9/Wv5vDrLPeUF19gnvnW6NHeFZeJh7v0PUU2x41fIKecL3QNfc68YH33Bum1R9b1y4lu3q3pTyAzwMl5quqNNRy0xn564uE5LqyGba3DexGjLut3qUnxJrub1UwVI9hLJm7wCrayrHM2XOFYBEueSBUje1EogYlt8+DMOl17DsyRxrQSlE8UarsOX6PNIpRcMmRe1hBQ5b+KtJe+lL66OebFVa5i89qqWvZfhr/9vnmP8wNwHKycj9/DZa2cHELivZwh8lYG/3Qcr46oZj03oHdhvp6XtZj7pPQOrx59Xsm9OAgAAAABJRU5ErkJggg==') no-repeat center/18px;
  }
}
</style>
