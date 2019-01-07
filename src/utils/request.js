// import wx from 'wx'
import Fly from "flyio";

const request = new Fly();

// 设置请求基地址
// request.config.baseURL = "http://127.0.0.1:8360/"

request.interceptors.request.use(request => {
  // 给所有请求添加自定义header，带上token信息让服务器验证用户登陆
  request.headers["Authorization"] = "cjt " + wx.getStorageSync("token");
  request.headers["Content-Type"] =
    "application/x-www-form-urlencoded; charset=UTF-8";
  // console.log('flyio发请求,request为', request);
  wx.showNavigationBarLoading();
  return request;
});

request.interceptors.response.use(
  (response, promise) => {
    wx.hideNavigationBarLoading();
    if (response.data.code === 401 && wx.getStorageSync("ifDirectToLogin") != "1") {
      wx.setStorageSync("ifDirectToLogin", "1");
      wx.removeStorageSync("code");
      wx.removeStorageSync("token");
      wx.removeStorageSync("register_code");
      wx.navigateTo({
        url: "/pages/login/main"
      });
    }

    return promise.resolve(response.data);
  },
  (err, promise) => {
    wx.hideNavigationBarLoading();
    wx.showToast({
      title: err.message,
      icon: "none"
    });

    return promise.resolve();
  }
);

export default request;
