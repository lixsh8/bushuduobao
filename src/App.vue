<script>
// import api from "@/utils/api";
// import util from "@/utils/util";
// import request from "@/utils/request";
var mta = require("@/utils/mta_analysis.js");

export default {
  created() {},

  onLaunch(opts) {
    mta.App.init({
      appID: "500666011",
      lauchOpts: this.$root.$mp.appOptions,
      eventID: "500666018",
      statPullDownFresh: true,
      statShareApp: true,
      statReachBottom: true
    });
    console.log("appLaunch" + JSON.stringify(this.$root.$mp.appOptions));
  },
  async onShow(opts) {
    console.log("apponShow" + JSON.stringify(opts));
    var register_code = opts.query.register_code;
    var assistance = opts.query.assistance;
    var channel = opts.query.channel;
    var scene = opts.scene;
    wx.setStorageSync("scene", scene);
    wx.setStorageSync("channel", channel);

    console.log("上一个人的register_code=" + register_code);

    if (wx.getStorageSync("token")) {
      wx.setStorageSync("register_code_url", register_code);
      wx.setStorageSync("assistance_url", assistance);
    } else {
      wx.setStorageSync("register_code", register_code);
      wx.setStorageSync("assistance", assistance);
    }

    // const checkSession = await util.checkSession();

    // console.log('checkSession');

    // if (!checkSession || !wx.getStorageSync("token")) {
    //   let loginResult = await util.login();
    //   if (loginResult && loginResult.code) {
    //     wx.setStorageSync("code", loginResult.code);
    //     let tokenResult = await request.get(api.Login, {
    //       code: loginResult.code,
    //       register_code: register_code,
    //       assistance: assistance
    //     });
    //     console.log("app全局登录");

    //     if (tokenResult && tokenResult.data && tokenResult.data.token) {
    //       wx.setStorageSync("token", tokenResult.data.token);
    //       wx.setStorageSync(
    //         "register_code",
    //         tokenResult.data.user.register_code
    //       );
    //       wx.setStorageSync("is_update", tokenResult.data.user.is_update);
    //     }
    //   }
    // }
  }
};
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
</style>
