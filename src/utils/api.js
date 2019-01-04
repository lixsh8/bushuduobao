import request from "./request";

const ApiRootUrl = "https://devapi.xiaotaotao123.cn/";

const api = {
  // 首页
  Index: ApiRootUrl + "?act=index&op=index",
  IndexExchangeStep: ApiRootUrl + "?act=index&op=exchangeSteps",
  IndexNewZone: ApiRootUrl + "?act=duobao&op=newbornZone",
  IndexLatestAward: ApiRootUrl + "?act=duobao&op=latestAward",
  IndexDuobao: ApiRootUrl + "?act=duobao&op=index",
  WelfareAd: ApiRootUrl + "?act=index&op=makeMoney",
  IndexPackPrize: ApiRootUrl + "?act=index&op=getIndexInfo",
  getPacks: r =>
    request.get("?act=index&op=getIndexInfo", null, {
      baseURL: ApiRootUrl
    }),

  // 好友加成页面
  Friend: ApiRootUrl + "?act=friend&op=index",
  FriendUserlist: ApiRootUrl + "?act=friend&op=userlist",

  getFriendData: r =>
    request.get("?act=friend&op=index", null, {
      baseURL: ApiRootUrl
    }),

  // 夺宝详情页
  DuobaoDetail: ApiRootUrl + "?act=duobao&op=getDetail",
  // 最新开奖
  DuobaoHistory: ApiRootUrl + "?act=duobao&op=latestAwardList",
  JoinDuobao: ApiRootUrl + "?act=duobao&op=join",
  // 参与明细
  JoinList: ApiRootUrl + "?act=duobao&op=getBuyTimesDetail",

  // 订单
  OderList: ApiRootUrl + "?act=duobao_order&op=orderList",
  OderDetail: ApiRootUrl + "?act=duobao_order&op=orderDetail",
  AddressSave: ApiRootUrl + "?act=address&op=saveAddress",
  IncomeRule: ApiRootUrl + "?act=duobao&op=revenuRule",

  // 我的
  MineIndex: ApiRootUrl + "?act=home&op=index",
  // 赚红包
  PackList: ApiRootUrl + "?act=home&op=hbDetail",
  // 最新开奖

  // 首页数据接口
  getIndexData: r =>
    request.get("?act=index&op=index", null, {
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
  Login: ApiRootUrl + "?act=little&op=getToken",
  // 微信登录 授权获取用户信息登录
  AuthLoginByWeixin: ApiRootUrl + "?act=little&op=updateUserInfo",
  // 获取微信统一下单prepay_id
  PayPrepayId: ApiRootUrl + "pay/prepay",
  // （pay单独使用）获取微信统一下单prepay_id
  PayPrepayIdFunc: paramObj =>
    request.get("pay/prepay", paramObj, {
      baseURL: ApiRootUrl
    })
};

export default api;
