import request from "./request";
var ApiRootUrl, mienvVersion;
if (process.env.NODE_ENV === 'development') {
  // dev
  ApiRootUrl = "https://devapi.xiaotaotao123.cn/";
  // 小程序环境。开发和正式
  mienvVersion = "develop";
} else {
  ApiRootUrl = "https://api.xiaotaotao123.cn/";
  mienvVersion = "release"
  // build
}


const api = {
  mienvVersion: mienvVersion,
  // 首页
  Index: ApiRootUrl + "?act=index&op=index",
  IndexExchangeStep: ApiRootUrl + "?act=index&op=exchangeSteps",
  IndexNewZone: ApiRootUrl + "?act=duobao&op=newbornZone",
  IndexLatestAward: ApiRootUrl + "?act=duobao&op=latestAward",
  IndexDuobao: ApiRootUrl + "?act=duobao&op=index",
  WelfareAd: ApiRootUrl + "?act=index&op=makeMoney",
  IndexPackPrize: ApiRootUrl + "?act=index&op=getIndexInfo",
  // 发送消息模板
  sendMessage: r =>
    request.get("?act=friend&op=signSendMsg", r, {
      baseURL: ApiRootUrl
    }),
  // 看广告得红包 
  ZHBAdReward: ApiRootUrl + "?act=index&op=getAdReward",
  // 获取首页要登录才显示的数据
  getPacks: r =>
    request.get("?act=index&op=getIndexInfo", null, {
      baseURL: ApiRootUrl
    }),
  // 红包气泡点击请求
  clickPacks: r =>
    request.post("?act=index&op=getBubbleReward", r, {
      baseURL: ApiRootUrl
    }),

  // 好友加成页面
  Friend: ApiRootUrl + "?act=friend&op=index",
  FriendUserlist: ApiRootUrl + "?act=friend&op=getUserList",
  Promotelist: ApiRootUrl + "?act=friend&op=getAdditionLog",

  getFriendData: r =>
    request.get("?act=friend&op=index", null, {
      baseURL: ApiRootUrl
    }),

  // 夺宝详情页
  DuobaoDetail: ApiRootUrl + "?act=duobao&op=getDetail",
  DuobaoMessage: ApiRootUrl + "?act=duobao&op=duobaoInfo",
  // 最新开奖
  DuobaoHistory: ApiRootUrl + "?act=duobao&op=latestAwardList",
  JoinDuobao: ApiRootUrl + "?act=duobao&op=join",
  // 参与明细
  JoinList: ApiRootUrl + "?act=duobao&op=getBuyTimesDetail",
  JoinListDetail: ApiRootUrl + "?act=duobao&op=getBuyTimesDetailNumbers",

  // 订单
  OderList: ApiRootUrl + "?act=duobao_order&op=orderList",
  OderDetail: ApiRootUrl + "?act=duobao_order&op=orderDetail",
  AddressSave: ApiRootUrl + "?act=address&op=saveAddress",
  IncomeRule: ApiRootUrl + "?act=duobao&op=revenuRule",
  OrderReceive: ApiRootUrl + "?act=duobao_order&op=receiveOrder",

  // 我的
  MineIndex: ApiRootUrl + "?act=home&op=index",
  // 赚红包
  PackList: ApiRootUrl + "?act=home&op=hbDetail",
  // 使用util的request方法，字符串变量即可
  // 微信登录静默登录
  Login: ApiRootUrl + "?act=little&op=getToken",

  login: r =>
    request.get("?act=little&op=getToken", r, {
      baseURL: ApiRootUrl
    }),
  // 微信登录 授权获取用户信息登录
  AuthLoginByWeixin: ApiRootUrl + "?act=little&op=updateUserInfo"
};

export default api;
