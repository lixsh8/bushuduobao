<!-- 广告福利 -->
<template>
  <div style="height:100%;">
    <head-bar
      :title="title"
      :headerBackground="headerBackground"
      :titleColor="titleColor"
      :showCustomBar="showCustomBar"
      :customBarStyle="customBarStyle"
    />

    <!-- 正文 -->
    <div class="income-box">
      <div class="income-hd">当前收益</div>
      <div class="income-bd">￥{{income}}</div>
    </div>
    <div class="rules">
      <wx-parse
          v-if="article"
          :content="article"
          @preview="preview"
          @navigate="navigate"
        />
    </div>
    <!-- 底部按钮 -->
    <div
      class="fixed-btn"
      @click="goBuy"
    >立即参与</div>
    <div class="fixed-btn-cover"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import headBar from "@/components/headBar";
// import util from "@/utils/util";
// import api from "@/utils/api";
// import request from "@/utils/request";
import wxParse from "mpvue-wxparse";

export default {
  data() {
    return {
      title: "收益规则",
      headerBackground: "#fff",
      titleColor: "black",
      showCustomBar: !0,
      customBarStyle: "black",
      income: '-',
      article: "<div style='background:#eee;'><div style='color:#fff;padding:10px;'>12121212</div></div>"
    };
  },

  components: {
    headBar,
    wxParse
  },

  computed: {},

  mounted(ev) {},

  methods: {
    // 购买
    goBuy() {
      wx.navigateBack({
        delta: 1
      })
    }
  },

  // 页面加载
  async onLoad(e) {
    var { id, income } = e;

    this.id = id;
    this.income = income
  }
};
</script>

<style lang='scss' scoped>
@import "../../common/style/variable";

.income{}
.rules{
  padding: 15px;
}

.fixed-btn {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  color: #fff;
  font-size: 18px;
  line-height: 50px;
  background: linear-gradient(
    135deg,
    rgba(255, 106, 107, 1) 0%,
    rgba(255, 58, 57, 1) 100%
  );
}
.fixed-btn-cover{
  height: 50px;
}
</style>