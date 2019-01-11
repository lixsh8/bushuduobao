<!-- 广告福利 -->
<template>
  <div class="login">
    <!-- 底部按钮 -->
    <div
      class="btn"
      @click="refresh"
    >
      <img
        src="/static/images/net_err.png"
        mode="widthFix"
        alt=""
      >
      唔，网络不给力，轻触屏幕重试</div>
  </div>
</template>

<script type="text/ecmascript-6">
import util from "@/utils/util";
import api from "@/utils/api";
// import request from "@/utils/request";

var mta = require("@/utils/mta_analysis.js");

export default {
  data() {
    return {
      page: "",
      options: ""
    };
  },

  components: {},

  methods: {
    // 购买
    async refresh() {
      console.log("login页面登录,即将登陆");

      if (!wx.getStorageSync("token")) {
        let loginResult = await util.login();
        console.log("loginResult");
        if (loginResult && loginResult.code) {
          console.log("login页面登录,222");
          wx.setStorageSync("code", loginResult.code);
          let tokenResult = await util.request(api.Login, {
            code: loginResult.code,
            register_code: "",
            assistance: wx.getStorageSync("assistance")
          });
          console.log(
            "login页面登录tokenResult=" + JSON.stringify(tokenResult)
          );

          if (tokenResult && tokenResult.data && tokenResult.data.token) {
            console.log("login页面登录,333");
            wx.setStorageSync("token", tokenResult.data.token);
            wx.setStorageSync(
              "register_code",
              tokenResult.data.user.register_code
            );
            wx.setStorageSync("is_update", tokenResult.data.user.is_update);
            console.log("has no token==" + JSON.stringify(this.options));

            wx.reLaunch({
              url:
                "/" + this.page + "?ifBack=0&" + util.parseParams(this.options),
              success: function() {
                wx.removeStorageSync("ifDirectToLogin");
              }
            });
          }
        }
      } else {
        console.log("has token==" + util.parseParams(this.options));

        wx.reLaunch({
          url: "/" + this.page + "?ifBack=0&" + util.parseParams(this.options),
          success: function() {
            wx.removeStorageSync("ifDirectToLogin");
          }
        });
      }
    }
  },
  // 页面加载
  onLoad() {
    // mta统计
    mta.Page.init();

    // 删除存储的商品详情的来源
    wx.removeStorageSync("goodsDetailFrom");
    // var { id, income, detail } = this.$root.$mp.query;

    var pages = getCurrentPages();
    console.log("getCurrentPages==" + JSON.stringify(pages));
    this.page = pages[pages.length - 2].route || "pages/index/main";
    this.options = pages[pages.length - 2].options || "";
    console.log("首页options" + JSON.stringify(this.options));
  }
};
</script>

<style lang='scss' scoped>
@import "../../common/style/variable";

.login {
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

  img {
    display: block;
    margin: 0 auto;
    width: 130px;
    height: 130px;
  }
}
</style>