import request from "./request";

const ApiRootUrl = "http://127.0.0.1:8360/api/";

const api = {
  // 首页数据接口
  getIndexData: r =>
    request.get("index/index", null, {
      baseURL: ApiRootUrl
    }),
  // 分类目录全部分类数据接口
  getCatalogList: r =>
    request.get("catalog/index", null, {
      baseURL: ApiRootUrl
    }),
  // 分类目录当前分类数据接口
  getCatalogCurrent: paramObj =>
    request.get("catalog/current", paramObj, {
      baseURL: ApiRootUrl
    }),
  // 使用util的request方法，字符串变量即可
  // 微信登录静默登录
  Login: ApiRootUrl + "login/login",
  // 微信登录 授权获取用户信息登录
  AuthLoginByWeixin: ApiRootUrl + "auth/loginByWeixin",
  // 获取微信统一下单prepay_id
  PayPrepayId: ApiRootUrl + "pay/prepay",
  // （pay单独使用）获取微信统一下单prepay_id
  PayPrepayIdFunc: paramObj =>
    request.get("pay/prepay", paramObj, {
      baseURL: ApiRootUrl
    })
};

export default api;
