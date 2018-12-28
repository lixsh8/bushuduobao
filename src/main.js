import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

Vue.prototype.globalData = getApp().globalData;
Vue.prototype.globalData.img_url = 'https://resource.xiaotaotao123.cn/wxapp_img/';

wx.getSystemInfo({
  success: res => {
    // 导航高度
    Vue.prototype.globalData.statusBarHeight = res.statusBarHeight;
  },
  fail(err) {
    console.log(err);
  }
});
