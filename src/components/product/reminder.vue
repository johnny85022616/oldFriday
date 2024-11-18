<template>
<div>
  <div v-if="show">
    <div class="control-bar">
      <div
        class="control-bar-title"
        @click="openReminder">溫馨小提醒</div>
      <i class="arrow-right"></i>
    </div>
  </div>
  <div v-if="showDialog">
    <autoscreendialog
      :closeDialog="closeDialog"
      v-on:closeDialog="closeDialog">
      <template v-slot:header>溫馨小提醒</template>
      <template v-slot:body>
        <div
          v-html="content"
          class="reminder-content"></div>
      </template>
    </autoscreendialog>
  </div>
</div>
</template>

<script>
import autoscreendialog from "../common/autoscreenDialog.vue"; // 蓋版提示框

export default {
  name: "reminder",
  data() {
    return {
      show: false,
      showDialog: false,
      content: "",
    };
  },
  components: {
    autoscreendialog,
  },
  props: {
    pid: {
      type: Number,
    },
    cid: {
      type: Number,
    },
  },
  created() {
    this.getReminder();
  },
  methods: {
    closeDialog() {
      this.showDialog = false;
    },
    openReminder() {
      this.showDialog = true;
    },
    getReminder() {
      this.axios.get(`reminder?pid=${this.pid}&cid=${this.cid}`).then((res) => {
        const {
          response,
          payload
        } = res.data;
        if (response.status === "OK") {
          this.show = true;

          let content = "";
          payload.forEach((v) => {
            content += v.description;
          });

          content = this.tools.replaceLineBreak(content);
          this.content = this.tools.replaceWidthAndHeight(content);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.reminder-content {
  padding: 20px;
}
</style>
