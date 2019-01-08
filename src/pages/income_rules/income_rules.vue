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
    <div class="rules-title">
      收益规则
    </div>
    <div class="rules">
      <rich-text
        v-if="article"
        :content="article"
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
import util from "@/utils/util";
import api from "@/utils/api";
// import request from "@/utils/request";

export default {
  data() {
    return {
      title: "收益规则",
      headerBackground: "#fff",
      titleColor: "black",
      showCustomBar: !0,
      customBarStyle: "black",
      income: "-",
      detail: "",
      article:
        "<div style='background:#eee;'><div style='color:#fff;padding:10px;'>12121212</div></div>"
    };
  },

  components: {
    headBar
  },

  computed: {},

  methods: {
    // 购买
    goBuy() {
      if (this.detail) {
        wx.navigateTo({
          url: "/pages/goods_detail/main?id=" + this.id
        });
      } else {
        wx.navigateBack({
          delta: 1
        });
      }
    }
  },

  // 页面加载
  async onLoad() {
    var { id, income, detail } = this.$root.$mp.query;

    this.id = id;
    this.income = income;
    this.detail = detail;
    
    const res = await util.request(api.IncomeRule, { id: id }, "GET", this);
    if (res.data && res.code === 0) {
      // this.totalData = res.data;
      console.log(res.data);

      this.article = res.data.content;
    } else {
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../../common/style/variable";

.income-box {
  width: 345px;
  height: 130px;
  margin: 15px auto;
  background: url(#{$img_url}shouyi_banner.png) no-repeat center;
  background-size: 100%;

  .income-hd {
    text-align: center;
    line-height: 1;
    padding-top: 30px;
    font-size: 16px;
    color: #fff;
  }
  .income-bd {
    text-align: center;
    line-height: 1;
    padding-top: 10px;
    font-size: 40px;
    color: #fff;
  }
}
.rules-title {
  padding: 15px 15px 0 15px;
  font-size: 16px;
  color: #333;
}
.rules {
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
.fixed-btn-cover {
  height: 50px;
}
</style>