<template>
  <div v-if="data.length > 0">
    <div class="product-component-container">
      <div class="product-component-blocks product-campaign short-tag">
        <div v-for="(item, index) of data" :key="index">
          <span>
            <label>贈品</label>
          </span>
          <span class="product-campaign__evt-desc">
            <font
              :class="[
                'product-campaign__desc-txt',
                { 'text-light': item.soldout },
              ]"
            >
              {{ giftName(item) }}
            </font>
            <a @click="openDialog(item)">查看</a>
          </span>
        </div>
      </div>

      <autoscreendialog v-if="showDialog" v-on:closeDialog="closeDialog">
        <template v-slot:header>贈品</template>
        <template v-slot:body>
          <div class="ele-info">
            <i class="notice"></i>
            {{ giftTypeDescription }}
          </div>
          <div class="ele-content">
            <div v-if="dialogData.endTime" class="text-light mb20">
              活動時間 {{ dialogData.endTime }} 止
            </div>
            <div v-for="(item, index) of dialogData.details" :key="index">
              <div v-if="dialogData.giftType === 1" class="ele-title mb10">
                <i class="redtube"></i>
                買就送
              </div>
              <div v-else class="ele-title mb10">
                <i class="redtube"></i>
                {{ item.rule }}
              </div>
              <div
                v-for="(val, key) of item.gift"
                :key="key"
                :class="['product-list-box', { soldout: val.soldOut }]"
              >
                <div>
                  <img :src="val.imageUrl" alt="" />
                  <span v-if="val.soldOut" class="circlemask">
                    <font>已贈完</font>
                  </span>
                </div>
                <div>
                  <span>{{ val.name }}</span>
                  <span>
                    <font></font>
                    <font>x {{ val.maxQty }}</font>
                  </span>
                </div>
              </div>
            </div>
            <div class="split-line"></div>

            <div v-if="dialogData.description">
              <div class="ele-title mb10 mt20">
                <font class="text-light">活動說明</font>
              </div>
              <div class="ele-desc mb20">
                {{ dialogData.description }}
              </div>
            </div>

            <div v-if="noticeMsg" class="ele-title mb10 mt20">
              <font class="text-light">活動注意事項</font>
            </div>
            <div v-if="noticeMsg" class="ele-desc mb20" v-html="noticeMsg">
            </div>
          </div>
        </template>
      </autoscreendialog>
    </div>
    <div class="gap-line"></div>
  </div>
</template>

<script>
import autoscreendialog from "../common/autoscreenDialog.vue"; // 蓋版提示框

export default {
  name: "gift",
  components: {
    autoscreendialog,
  },
  data() {
    return {
      showDialog: false,
      dialogData: {},
    };
  },
  props: {
    data: {
      type: Array,
    },
    noticeMsg: {
      type: String,
      default: () => "",
    },
  },
  methods: {
    openDialog(data) {
      this.dialogData = data;
      this.showDialog = true;
    },
    closeDialog() {
      this.dialogData = {};
      this.showDialog = false;
    },
    giftName(item) {
      return item.soldout ? "[已送完] " + item.list_name : item.list_name;
    },
  },
  computed: {
    giftTypeDescription() {
      return this.dialogData.giftType === 1
        ? "贈品活動送完為止，請依購物車結帳為準"
        : "此活動僅贈送符合最高門檻之贈品，恕不累贈。贈品活動送完為止，請以購物車結帳為主";
    },
  },
};
</script>

<style lang="sass" scoped>
@import '../../style/color.scss'

.product-list-box
  padding: 10px 0

.product-campaign
  &.short-tag
    label
      color: $red
      border: 1px solid $red
</style>
