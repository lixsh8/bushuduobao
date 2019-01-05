<!-- 广告福利 -->
<template>
  <div class="login">
    <!-- 底部按钮 -->
    <div
      class="btn"
      @click="refresh"
    >
    <img src="/static/images/net_err.png" mode="widthFix" alt="">
    唔，网络不给力，轻触屏幕重试</div>
  </div>
</template>

<script type="text/ecmascript-6">
import util from "@/utils/util";
// import api from "@/utils/api";
// import request from "@/utils/request";

export default {
  data() {
    return {
      page: "",
      options: ""
    };
  },

  components: {},

  computed: {},

  methods: {
    // 购买
    refresh() {
      wx.reLaunch({
        url: "/" + this.page + "?ifBack=0&" + util.parseParams(this.options)
      });
    }
  },
  // 页面加载
  onLoad() {
    // var { id, income, detail } = this.$root.$mp.query;

    var pages = getCurrentPages();
    this.page = pages[pages.length - 2].route;
    this.options = pages[pages.length - 2].options;
    console.log(this.options);
  }
};
</script>

<style lang='scss' scoped>
@import "../../common/style/variable";

.login{
  display: flex;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
}
.btn {
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #999;

  img{
    display: block;
    margin: 0 auto;
    width: 130px;
    height: 130px;
  }
}
</style>