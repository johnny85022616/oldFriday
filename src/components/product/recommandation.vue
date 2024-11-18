<template>
  <div class="container">
    <div class="block-split">－看了此商品的人也看了－</div>
    <youmaylike recpos="gop" rectype="AlsoView" :recgid="pid" :reccid="cid" :recsid="sid" :limit="10" />

    <div class="block-split">－你可能會喜歡－</div>
    <youmaylike recpos="gop_cs" :recgid="pid" :reccid="cid" :recsid="sid" :limit="10" />
  </div>
</template>

<script>
import youmaylike from "../common/youmaylike";

export default {
  name: "recommandation",
  data() {
    return {
    };
  },
  props: {
    sid: {
      type: Number,
    },
    cid: {
      type: Number,
    },
    pid: {
      type: Number,
    },
  },
  components: {
    youmaylike
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #f4f4f4;
  padding-bottom: 20px;
}

.block-split {
  display: block;
  height: 44px;
  line-height: 44px;
  color: #adadad;
  text-align: center;
  padding-top: 10px;
  font-size: 1.4rem;
}
</style>
