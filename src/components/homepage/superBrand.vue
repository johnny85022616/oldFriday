<template>
  <div class="homepage-superbrand">
    <div><i></i>超級品牌</div>
    <div>
      <div v-for="(item, index) of brandData" :key="index" class="homepage-superbrand__brand-box">
        <div class="homepage-superbrand__head">
          <a :href="item.look_more_path">
            <img :src="item.brand_icon" alt=""/>
          </a>
          <div>
            <p class="homepage-superbrand__head-brand">{{item.brand_name}}</p>
            <p class="homepage-superbrand__head-event">{{item.campaign_name}}</p>
          </div>
          <a :href="item.look_more_path" class="homepage-superbrand__head-more">看更多<i class="arrow"></i></a>
        </div>
        <div class="homepage-superbrand__contents">
          <a v-for="(sku, skuKey) of item.products" :key="skuKey" :href="tools.getProductPageLink(sku, '&item_list_id=homepage_superbrand')">
            <div class="homepage-superbrand__items">
              <img :src="sku.image_url" :alt="sku.name" />
              <p class="homepage-superbrand__items-name">{{sku.name}}</p>
              <span class="homepage-superbrand__items-price">{{tools.priceFormat(sku.real_price)}}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'superBrand',
  data() {
    return {
      version: '',
      brandData: {},
      productData: {}
    }
  },
  created() {
    const jsonFile = this.configs.homepageSuperbrandJson('superbrand')
    this.version = this.tools.version();

    this.axios.get(jsonFile).then((res) => {
      const { data } = res.data

      if (data.length > 0) {
        const jsonBrandData = data
        const pids = data.reduce((p, c) => {
          return p.concat(c.sku.split(','));
        }, []);

        this.getApiData(pids.join(','), () => {
          this.brandData = jsonBrandData.map(val => {
            const skuAry = val.sku.split(',')
            const skuData = skuAry.map(v => {
              return this.productData[v]
            })
            return Object.assign(val, {
              products: skuData,
              brand_icon: this.configs.homepageProjectFolder + val.brand_icon
            })
          })
        })
      }
    });
  },
  methods: {
    getApiData(payload, funcs) {
      // 商品資料API
      const postData = payload.split(',');
      const postPayload = postData.map((v) => {
        return {
          pid: v,
        };
      });
      const dataObj = {
        cachecode: 'livesync-homepage-' + payload.replace(/,/g, ''),
        data: postPayload,
      };

      this.axios.post(this.configs.livesyncApiPath, dataObj).then(res => {
        this.productData = res.data
        funcs.call(this, res.data)
      });
    }
  }
};
</script>

<style lang="sass" scoped>
@import "../../style/color.scss"
@import "../../style/mixin.scss"

$width: 100%

.homepage-superbrand
  width: $width
  margin-top: 10px
  background-color: $background
  border-radius: 10px
  padding: 12px 0
  font-size: 1.4rem
  margin-bottom: 10px
  a
    text-decoration: none
  p
    color: $web_main
  >div
    &:first-of-type
      margin-left: 15px
      font-size: 1.6rem
      font-weight: 500
      color: $red
      display: flex
      align-items: center
      margin-bottom: 11px
      i
        margin-right: 5px
        display: inline-block
        width: 21px
        height: 21px
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxkZWZzPgogICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0iNTAlIiB5MT0iMCUiIHgyPSI1MCUiIHkyPSIxMDAlIiBpZD0iYSI+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNGMzRGNTkiIG9mZnNldD0iMCUiLz4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0ZGOTA5MCIgb2Zmc2V0PSIxMDAlIi8+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDwvZGVmcz4KICAgIDxwYXRoIGQ9Ik0xMSAwYzQuODEgMCA4LjcwOCAzLjkwOSA4LjcwOCA4LjczYTguNzE4IDguNzE4IDAgMCAxLTIuOTIxIDYuNTI0bDIuMjUyIDQuMjYtMy4xMi0uMjA1TDE0LjY5OCAyMmwtMi4zMDItNC42NTFhOC43NDggOC43NDggMCAwIDEtMi43NTIuMDA2TDcuMzQ2IDIybC0xLjIyLTIuNjkxLTMuMTIyLjIwNSAyLjI0LTQuMjMzYTguNzE5IDguNzE5IDAgMCAxLTIuOTUyLTYuNTVDMi4yOTIgMy45MDggNi4xOSAwIDExIDB6bTAgMS40MjljLTQuMDIyIDAtNy4yODMgMy4yNy03LjI4MyA3LjMwMSAwIDQuMDMyIDMuMjYxIDcuMzAyIDcuMjgzIDcuMzAyczcuMjgzLTMuMjcgNy4yODMtNy4zMDJTMTUuMDIyIDEuNDMgMTEgMS40M3ptLjE0NyAyLjAwOGEuNS41IDAgMCAxIC4zMy4zM2wuOTM5IDMuMDQzaDMuMTA1YS41LjUgMCAwIDEgLjMwNC44OTdMMTMuMjkxIDkuNjVsLjk1NCAzLjA5NmEuNS41IDAgMCAxLS43ODIuNTQ0TDExIDExLjQwM2wtMi40NjMgMS44ODZhLjUuNSAwIDAgMS0uNzgyLS41NDRsLjk1NC0zLjA5Ni0yLjUzNC0xLjk0MmEuNS41IDAgMCAxIC4zMDQtLjg5N2gzLjEwNWwuOTM4LTMuMDQyYS41LjUgMCAwIDEgLjYyNS0uMzMxeiIgZmlsbD0idXJsKCNhKSIgZmlsbC1ydWxlPSJub256ZXJvIi8+Cjwvc3ZnPgo=')
    &:last-of-type
      min-height: 292px
      display: flex
      overflow-x: auto
      align-items: flex-end
      -webkit-overflow-scrolling: touch
      &::-webkit-scrollbar
        display: none
  &__brand-box
    min-width: 298px
    background-color: $white
    border-radius: 10px
    margin-right: 12px
    &:first-of-type
      margin-left: 15px
    &:last-of-type
      margin-right: 15px
  &__head
    width: 100%
    height: 58px
    position: relative
    margin-bottom: 1rem
    a
      &:last-of-type
        border-radius: 18px 0 0 18px
        background-color: $web_main
        display: inline-flex
        align-items: center
        position: absolute
        right: 0
        top: 12px
    img
      width: 70px
      height: 48px
      box-shadow: 0 2px 4px 0 rgba($black, 0.3)
      border-radius: 0 16px 16px 16px
      position: absolute
      top: -3px
      left: -5px
    div
      max-width: 209px
      position: absolute
      top: 14px
      left: 79px
    &-brand
      font-weight: 900
    &-event
      @include font-break(1)
    &-more
      font-size: 1.2rem
      color: $white
      padding: 2px 6px 2px 8px
      box-sizing: border-box
      i
        display: inline-block
        width: 12px
        height: 12px
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik02IDBhNiA2IDAgMSAxIDAgMTJBNiA2IDAgMCAxIDYgMHptLS43OTUgMi43NjdBLjgxNC44MTQgMCAwIDAgNCAzLjQ3OHY1LjA0NGwuMDA0LjA3OGEuODEzLjgxMyAwIDAgMCAxLjI2Ny41OTJsMy43MDctMi41Mi4wNjMtLjA0OGEuODEuODEgMCAwIDAtLjA2My0xLjI5NEw1LjI3MSAyLjgwOHoiIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgo8L3N2Zz4K')
        margin-left: 3px
  &__contents
    padding: 0 12px 9px 12px
    box-sizing: border-box
    display: flex
    a:first-of-type
      margin-right: 10px
  &__items
    img
      width: 132px
      border-radius: 10px 10px 0 0
    &-name
      @include font-break(2)
      white-space: unset !important
      margin: 5px 6px 2px 6px 
    &-price
      color: $red
      font-size: 2rem
      &::before
        content: '$'
        font-size: 1.3rem
        color: $red
        margin-left: 6px
</style>
