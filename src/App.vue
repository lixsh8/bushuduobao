<script>
import api from "@/utils/api";
import util from "@/utils/util";
import request from "@/utils/request";

export default {
  created() {},

  onLaunch(opts) {
    // console.log(opts);
  },
  async onShow(opts) {
    console.log("apponShow" + JSON.stringify(opts));
    var register_code = opts.query.register_code
    console.log('上一个人的register_code=' + register_code);
    
    wx.setStorageSync("register_code", register_code);
    
    const checkSession = await util.checkSession();
    
    if (!checkSession || !wx.getStorageSync("token")) {
      let loginResult = await util.login();
      if (loginResult && loginResult.code) {
        wx.setStorageSync("code", loginResult.code);
        let tokenResult = await request.get(
          api.Login,
          { code: loginResult.code, register_code: register_code }
        );
        console.log('app全局登录');
        
        if (tokenResult && tokenResult.data && tokenResult.data.token) {
          wx.setStorageSync("token", tokenResult.data.token);
          wx.setStorageSync("register_code", tokenResult.data.user.register_code);
        }
      }
    }
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
