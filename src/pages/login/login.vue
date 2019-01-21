<!-- 登录页面 -->
<template>
  <div
    class="login"
    @click="refresh"
  >
    <img
      :src="loginBg"
      mode="widthFix"
      alt=""
    ></div>
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

  computed: {
    loginBg() {
      return this.globalData.img_url + "login_bg.png?v=124";
    }
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
            scene: wx.getStorageSync("scene"),
            channel: wx.getStorageSync("channel"),
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

            if (this.page.indexOf("/login/") > 0) {
              wx.reLaunch({
                url: "/pages/index/main",
                success: function() {
                  wx.removeStorageSync("ifDirectToLogin");
                }
              });
            } else {
              wx.reLaunch({
                url:
                  "/" +
                  this.page +
                  "?ifBack=0&" +
                  util.parseParams(this.options),
                success: function() {
                  wx.removeStorageSync("ifDirectToLogin");
                }
              });
            }
          }
        }
      } else {
        console.log("has token==" + util.parseParams(this.options));

        if (this.page.indexOf("/login/") > 0) {
          wx.reLaunch({
            url: "/pages/index/main",
            success: function() {
              wx.removeStorageSync("ifDirectToLogin");
            }
          });
        } else {
          wx.reLaunch({
            url:
              "/" + this.page + "?ifBack=0&" + util.parseParams(this.options),
            success: function() {
              wx.removeStorageSync("ifDirectToLogin");
            }
          });
        }
      }
    }
  },
  // 页面加载
  onLoad() {
    // mta统计
    mta.Page.init();

    // 删除存储的商品详情的来源
    // wx.removeStorageSync("goodsDetailFrom");
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
  align-items: top;
  justify-content: center;

  img {
    display: block;
    width: 100%;
  }
}
.btn {
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #999;
}
</style>