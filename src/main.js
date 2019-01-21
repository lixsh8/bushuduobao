// 阿拉丁统计
import '../static/sdk/ald-stat'
import Vue from "vue";
import App from "./App";


// import { MpvueApp } from "../static/sdk/ald-stat";

Vue.config.productionTip = false;
App.mpType = "app";

const app = new Vue(App)
// const app = new Vue(MpvueApp(App));
app.$mount();

Vue.prototype.globalData = getApp().globalData;
Vue.prototype.globalData.img_url =
  "https://resourcecdn.xiaotaotao123.cn/wxapp_img/";
Vue.prototype.globalData.indexScrollTop = 0;

wx.getSystemInfo({
  success: res => {
    // 导航高度
    Vue.prototype.globalData.statusBarHeight = res.statusBarHeight;
  },
  fail(err) {
    console.log(err);
  }
});
