import request from "./request";
var ApiRootUrl, mienvVersion, SocketRootUrl;
if (process.env.NODE_ENV === 'development') {
  // dev
  ApiRootUrl = "https://devapi.xiaotaotao123.cn/";
  SocketRootUrl = "wss://devapi.xiaotaotao123.cn/ws";

  // 小程序环境。开发和正式
  mienvVersion = "release";
} else {
  // 正式环境
  ApiRootUrl = "https://api.xiaotaotao123.cn/";
  SocketRootUrl = "wss://api.xiaotaotao123.cn/ws";
  mienvVersion = "release"
  // build
}


const api = {
  SocketRootUrl: SocketRootUrl,
  mienvVersion: mienvVersion,
  // 首页
  Index: ApiRootUrl + "?act=index&op=index",
  IndexExchangeStep: ApiRootUrl + "?act=index&op=exchangeSteps",
  IndexNewZone: ApiRootUrl + "?act=duobao&op=newbornZone",
  IndexLatestAward: ApiRootUrl + "?act=duobao&op=latestAward",
  IndexDuobao: ApiRootUrl + "?act=duobao&op=index",
  WelfareAd: ApiRootUrl + "?act=index&op=makeMoney",
  IndexPackPrize: ApiRootUrl + "?act=index&op=getIndexInfo",
  DoubleReward: ApiRootUrl + "?act=index&op=getDoubleReward",
  // 用户指引 
  MemberInfoSet: ApiRootUrl + "?act=index&op=setMemberInfo",

  // 发送消息模板
  sendMessage: r =>
    request.get("?act=friend&op=signSendMsg", r, {
      baseURL: ApiRootUrl
    }),
  // 看广告得红包 
  ZHBAdReward: ApiRootUrl + "?act=index&op=getAdReward",
  AdReport: ApiRootUrl + "?act=index&op=adReport",
  // 获取首页要登录才显示的数据
  getPacks: r =>
    request.get("?act=index&op=getIndexInfo", r, {
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

  // 兑商品详情页
  DuobaoDetail: ApiRootUrl + "?act=duobao&op=getDetail",
  DuobaoMessage: ApiRootUrl + "?act=duobao&op=duobaoInfo",
  DuobaoResult: ApiRootUrl + "?act=duobao&op=joinSuccess",
  DuobaoResultDB: ApiRootUrl + "?act=duobao&op=getJoinSuccReward",
  // 加体力规则
  PowerRule: ApiRootUrl + "?act=duobao&op=power",
  PowerGet: ApiRootUrl + "?act=duobao&op=getPower",

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
  OrderShareRecord: ApiRootUrl + "?act=duobao_order&op=saveOrderState",
  // 物流信息
  Logistics: ApiRootUrl + "?act=duobao_order&op=deliveryInfo",


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
