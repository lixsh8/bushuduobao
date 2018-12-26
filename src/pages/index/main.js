import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

Vue.prototype.globalData = getApp().globalData;
Vue.prototype.globalData.resourceUrl = 'https://resource.xiaotaotao123.cn/wxapp_img/';

wx.getSystemInfo({
  success: res => {
    // 导航高度
    Vue.prototype.globalData.statusBarHeight = res.statusBarHeight;
  },
  fail(err) {
    console.log(err);
  }
});
