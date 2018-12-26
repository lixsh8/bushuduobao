<template>
  <div>
    <head-bar
      :title="title"
      :headerBackground="headerBackground"
      :titleColor="titleColor"
    />

    <!-- 正文 -->
    <div class="bg-gray _7bb4318">
      <div class="wrapper">

        <div class="mine">

          <div class="mine-head">
            <image
              class="mine-head-portrait"
              mode="aspectFit"
              :src="mine.portrait"
            />
            <div class="mine-head-myinfo">
              <div class="mine-head-myinfo-nickname">{{mine.nickName}}</div>
              <div class="mine-head-myinfo-coininfo">步数币
                <text>{{mine.userCoin}}</text>
                <text>|</text>兑换
                <text>{{mine.exchangeCount}}</text>件</div>
              <div class="mine-head-myinfo-tip">您已连续签到{{mine.signInDays}}天，每日签到可领签到奖励哦~</div>
            </div>
          </div>

          <div class="mine-orderList">
            <div class="mine-orderList-title">
              <div class="mine-orderList-title-tip1">我的订单</div>
              <div
                bindtap="navToOrder"
                class="mine-orderList-title-tip2"
              >查看我的全部订单</div>
            </div>
            <div class="mine-orderList-orders">
              <div
                bindtap="jumpHandle"
                class="orderItem"
                v-for="(item,index) in orderList"
                :key="index"
              >
                <image
                  class="orderIcon"
                  mode="aspectFit"
                  :src="item.icon"
                />
                <div
                  class="orderNum"
                  v-if="item.orderNum"
                >{{item.orderNum}}</div>
                <div class="orderTxt">{{item.title}}</div>
              </div>
            </div>
          </div>

          <div class="mine-operationList">
            <div
              bindtap="jumpHandle"
              class="operationItem"
              v-for="(item,index) in operationList"
              :key="index"
            >
              <image
                class="operationIcon"
                mode="aspectFit"
                :src="item.icon"
              />
              <div class="operationTxt">{{item.title}}</div>
            </div>
            <button
              class="feed-back"
              openType="feedback"
            >
              <image
                class="deviceIcon"
                mode="aspectFit"
                src="https://pic1.zhuanstatic.com/zhuanzh/n_v29b5c0541050e42b781f9f8f581abc574.png"
              />
              <div class="feed-back-item">意见反馈</div>
            </button>
            <div
              bindtap="gotoMessage"
              class="operationItem"
            >
              <image
                class="operationIcon"
                mode="aspectFit"
                src="https://pic1.zhuanstatic.com/zhuanzh/n_v24fabf5d6b8094b369c525a62fd59f32f.png"
              />
              <div
                class="orderNum"
                v-if="unreadMessage"
              >{{unreadMessage}}</div>
              <div class="operationTxt">联系卖家</div>
            </div>
          </div>

          <image
            bindtap="gotoAd"
            class="adv"
            mode="aspectFit"
            src="https://pic3.zhuanstatic.com/zhuanzh/n_v24a4648bd88534e93835fd54c8454d864.jpg"
            v-if="showGoldAd==1"
          />

          <div
            class="mine-recommends"
            v-if="recommends.length>0"
          >
            <div class="header">精品推荐</div>
            <div class="recommends">
              <div
                bindtap="onRecommend"
                class="recommend"
                v-for="(recommend,index) in recommends"
                :key="index"
              >
                <image
                  class="icon"
                  :src="recommend.pic"
                />
                <div class="title">{{recommend.title}}</div>
              </div>
            </div>
          </div>

          <div
            class="box _3142106 indexBanner"
            v-if="banners.length>0"
          >
            <swiper
              autoplay="config.autoplay"
              bindchange="bannerChange"
              circular="config.circular"
              class="banners multiple _3142106"
              current="config.current"
              duration="config.duration"
              indicatorActiveColor="config.indicatorActiveColor"
              indicatorColor="config.indicatorColor"
              indicatorDots="config.indicatorDots"
              interval="config.interval"
              vertical="config.vertical"
              v-if="banners.length>1"
            >
              <swiper-item
                catchtap="onBanner"
                class="banner-wrap _3142106"
                data-wpyonbanner-a="index"
                v-for="(banner,index) in banners"
                :key="index"
              >
                <image
                  class="pic _3142106"
                  :src="banner.pic"
                />
                <div class="banner-tip _3142106">
                  <div class="banner-tip-title _3142106">{{banner.title}}</div>
                </div>
              </swiper-item>
            </swiper>

            <div
              class="banners single _3142106"
              v-if="banners.length==1"
            >
              <div
                catchtap="onBanner"
                class="banner-wrap _3142106"
                data-wpyonbanner-a="0"
              >
                <image
                  class="pic _3142106"
                  :src="banners[0].pic"
                />
                <div class="banner-tip _3142106">
                  <div class="banner-tip-title _3142106">{{banners[0].title}}</div>
                </div>
              </div>
            </div>

          </div>

          <ad unitId="adunit-b195e9267cb30a9e"></ad>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headBar from "@/components/headBar";

export default {
  data() {
    return {
      title: "我的",
      headerBackground: "#8054ff",
      titleColor: "#fff",
      mine: {
        portrait:
          "http://pic1.zhuanstatic.com/zhuanzh/n_v239767dd54209407082b9651f1ce97d12.png",
        nickName: "qwe0620b54b",
        signInDays: 1,
        respCode: 0,
        respMsg: null,
        userCoin: "16.000",
        exchangeCount: 0,
        unPayOrder: 0,
        unDeliveryOrder: 0,
        unReceiveOrder: 0,
        refundOrder: 0,
        showGoldAd: 1
      },
      banners: [
        {
          appId: "wxe20f2a757ccbbce3",
          actId: "4560400557191899351:8461665943529147392",
          pic:
            "https://pic2.zhuanstatic.com/zhuanzh/n_v221559d55f21244e7943427145a4e1aee.jpg?w=800&h=800",
          title: "新人免费领百元大奖",
          url: "pages/index/index?ChannelID=TG001&IndirectChannel=LK"
        }
      ],
      unreadMessage: 0,
      unreadQuery: null,
      orderList: [
        {
          title: "待支付",
          log: "wait-pay",
          icon:
            "https://pic2.zhuanstatic.com/zhuanzh/n_v23c485f7a2e4d4f3487680e7a018fc12c.png",
          path: "/subPages/order/order?status=1",
          orderNum: ""
        },
        {
          title: "待发货",
          log: "wait-deliver",
          icon:
            "https://pic1.zhuanstatic.com/zhuanzh/n_v237c3d7a18b874de688193cd7124117c7.png",
          path: "/subPages/order/order?status=2",
          orderNum: ""
        },
        {
          title: "已发货",
          log: "has-deliver",
          icon:
            "https://pic1.zhuanstatic.com/zhuanzh/n_v2e8f2fb8d550941148dfacb1cad08bc74.png",
          path: "/subPages/order/order?status=3",
          orderNum: null
        },
        {
          title: "退款",
          log: "refund",
          icon:
            "https://pic1.zhuanstatic.com/zhuanzh/n_v2046f7279cd7f46a19e234cceffaa681b.png",
          path: "/subPages/order/order?status=4",
          orderNum: 0
        }
      ],
      operationList: [
        {
          title: "历史兑换",
          log: "exchage-click",
          icon:
            "https://pic2.zhuanstatic.com/zhuanzh/n_v237e03ca0769b414aba00befbd951dc10.png",
          path: "/pages/detail/runningExchangeDetail"
        },
        {
          title: "步数记录",
          log: "coin-detail",
          icon:
            "https://pic3.zhuanstatic.com/zhuanzh/n_v2b486fea469304cd6bd7fec598ae894a0.png",
          path: "/pages/detail/runningDetail"
        },
        {
          title: "步数规则",
          log: "rule-click",
          icon:
            "https://pic1.zhuanstatic.com/zhuanzh/n_v28b55ec3a2f104a34ae009e49dc12ce1f.png",
          path: "/subPages/rule/runningRule"
        },
        {
          title: "助力记录",
          log: "oncoin-click",
          icon:
            "https://pic1.zhuanstatic.com/zhuanzh/n_v2def7ec4a112a42f8b591d5ef4055b54f.png",
          path: "/pages/activity/oneCoinFree"
        },
        {
          title: "常见问题",
          log: "strategy-click",
          icon:
            "https://pic1.zhuanstatic.com/zhuanzh/n_v2d8b198d1b4a047418e852b93cefc0c4d.png",
          path: "/subPages/strategy/strategy"
        },
        {
          title: "在线客服",
          log: "online-service",
          icon:
            "https://pic5.zhuanstatic.com/zhuanzh/n_v262fd78378b124e3c826de830f029b95b.png",
          path:
            "https://m.zhuanzhuan.com/system/zzappimservice/index.html?skillId=10003&robot=42"
        }
      ],
      advExtraData: {
        path: "bubuhuan/box/pages/position1"
      },
      recommends: [
        {
          appId: "wxe20f2a757ccbbce3",
          actId: "2182652141771081143:6302086029329439744",
          pic:
            "https://pic2.zhuanstatic.com/zhuanzh/n_v290f15f56d6fd44e0876af756e38bd244.png?w=800&h=800",
          title: "最强抽奖",
          url: "pages/index/index?ChannelID=TG001&IndirectChannel=LK"
        },
        {
          appId: "wx7d2e1dd8fd7ea905",
          actId: "2182652141771081143:6006420485069176832",
          pic:
            "https://pic2.zhuanstatic.com/zhuanzh/n_v25c4a280e47ce40c58404d853d973f5fe.png?w=800&h=800",
          title: "疯狂消星星",
          url:
            "pages/index/index?gdt_vid=wandehai&weixinadinfo=0001&channel=wandehai.h5xxxstar.3407"
        },
        {
          appId: "wx13dd723fb3aa9c5f",
          actId: "2182652141771081143:5188764942770712576",
          pic:
            "https://pic2.zhuanstatic.com/zhuanzh/n_v247f0900a525744999c65a41a382ebadb.png?w=800&h=800",
          title: "运动赚",
          url: "pages/step/step?chl=tiantbus&s=tiantbus"
        },
        {
          appId: "wxbdfee33ea394a980",
          actId: "2182652141771081143:7823665070077815808",
          pic:
            "https://pic2.zhuanstatic.com/zhuanzh/n_v279560d922f2c4befa48b574f08226650.png?w=800&h=800",
          title: "狂暴西游",
          url: "?from=2051"
        },
        {
          appId: "wxc3a8c0b476dfa08c",
          actId: "2182652141771081143:8677627763932911616",
          pic:
            "https://pic2.zhuanstatic.com/zhuanzh/n_v24274e27a71e64a5f94d57d6a509eac4c.png?w=800&h=800",
          title: "够货",
          url: "pages/home/index?scene=c%3D149"
        },
        {
          appId: "wx8b3a98563fc40251",
          actId: "2182652141771081143:2313007257289895936",
          pic:
            "https://pic2.zhuanstatic.com/zhuanzh/n_v2ae58ba5c21be4caa9c44a5277ff2b80a.png?w=800&h=800",
          title: "攻城三国",
          url: "?from=2051"
        },
        {
          appId: "wx371df2518b80e0c3",
          actId: "2182652141771081143:3695010499574038528",
          pic:
            "https://pic2.zhuanstatic.com/zhuanzh/n_v2508dc30d52e245bdb7fb1ff5849554d1.png?w=800&h=800",
          title: "集步运动",
          url:
            "pages/index/index?origin=bububaoUV&ald_media_id=8103&ald_link_key=70fc7c9cb18fdd9b"
        },
        {
          appId: "wx79ade44c39cefc7f",
          actId: "2182652141771081143:6579252075545804800",
          pic:
            "https://pic2.zhuanstatic.com/zhuanzh/n_v2058652af38f64ea881e0346d468e51fc.jpg?w=800&h=800",
          title: "传奇来了",
          url: "?chid=1966&subchid=cq_zhuan01"
        },
        {
          appId: "wx591a9df1eaf73a4b",
          actId: "2182652141771081143:6894526864229345280",
          pic:
            "https://pic2.zhuanstatic.com/zhuanzh/n_v2c8aaefc81320480885d176f7dec90840.png?w=800&h=800",
          title: "决战沙城",
          url: "?from=2051"
        },
        {
          appId: "wx06317e9fcb72749f",
          actId: "2182652141771081143:4374684052516854784",
          pic:
            "https://pic2.zhuanstatic.com/zhuanzh/n_v2480b5c7c429442bd9d420067b4e60150.png?w=800&h=800",
          title: "猜词赢红包",
          url:
            "/pages/index/index?gdt_vid=wandehai&weixinadinfo=0001&channel=wandehai.h5wzcc.01408"
        }
      ],
      showGoldAd: 0
    };
  },

  components: {
    headBar
  },

  methods: {},

  created() {},

  onLoad() {}
};
</script>

<style scoped lang='scss'>
@import "../../common/style/0.scss";
@import "../../common/style/8.scss";
@import "../../common/style/curtain.scss";

.wrapper {
  position: static;
  display: block;
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: content-box;
  font-size: 18px;
  text-align: center;
  text-decoration: none;
  line-height: 1;
  border-radius: 0;
  -webkit-tap-highlight-color: transparent;
  overflow: hidden;
  color: #000000;
  background-color: transparent;
}

button::before,
button::after {
  content: "";
  margin: 0;
  padding: 0;
  border: 0;
  width: 0;
  height: 0;
  display: none;
}

page {
  height: 100%;
  background: #8054ff;
}

.indexBanner {
  margin: 0 auto 40rpx;
  width: 702rpx;
  height: 300rpx;
  background: #fff;
  overflow: hidden;
  border-radius: 8rpx;
  box-shadow: 0 2rpx 7rpx rgba(0, 0, 0, 0.16);
}

.mine {
  background: #f8f8f8;
  color: #2e3135;
  margin-bottom: 100rpx;
}

.mine-head {
  width: 100%;
  height: 265rpx;
  background: url(https://pic3.zhuanstatic.com/zhuanzh/n_v289278f6da68f48c3a726eac1b4d2a134.png)
    no-repeat center center;
  background-size: 100% 265rpx;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.mine-head-portrait {
  margin: 18rpx 18rpx auto 32rpx;
  width: 92rpx;
  height: 92rpx;
  border-radius: 50%;
  border: 2rpx solid #fff;
}

.mine-head-myinfo {
  display: inline-block;
  margin-top: 18rpx;
  width: 574rpx;
}

.mine-head-myinfo-nickname {
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #fff;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  font-size: 40rpx;
  line-height: 56rpx;
  margin-right: 24rpx;
}

.mine-head-myinfo-coininfo {
  display: block;
  font-size: 24rpx;
  color: #ffffff;
  padding: 8rpx 0;
  line-height: 28rpx;
}

.mine-head-myinfo-coininfo text {
  margin: 0 5rpx;
}

.mine-head-myinfo-tip {
  color: #fff;
  font-size: 24rpx;
  line-height: 33rpx;
}

.mine-orderList {
  width: 702rpx;
  height: 249rpx;
  margin: -100rpx auto 0;
  background: #fff;
  border-radius: 8rpx;
  box-shadow: 0 2rpx 16rpx 0 rgba(0, 0, 0, 0.04);
}

.mine-orderList-title {
  position: relative;
  padding: 0 24rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80rpx;
  border: none !important;
}

.mine-orderList-title:before {
  content: "";
  position: absolute;
  width: 200%;
  height: 200%;
  top: 0;
  left: 0;
  transform: scale(0.5);
  transform-origin: 0 0;
  box-sizing: border-box;
  pointer-events: none;
  border-radius: 0;
  border-bottom: 1px solid #e7e7e7;
}

.mine-orderList-title-tip1 {
  font-family: PingFangSC-Medium;
  font-weight: 500;
  font-size: 32rpx;
  color: #2e3135;
}

.mine-orderList-title-tip2 {
  font-size: 24rpx;
  color: #9b9b9b;
  background: url(https://img1.zhuanstatic.com/open/zhuanzhuan/zzwa/runningbear/mine/slice.png)
    no-repeat right center;
  background-size: 28rpx 28rpx;
  padding-right: 30rpx;
}

.mine-orderList-orders {
  width: 702rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  min-height: 169rpx;
}

.mine-orderList-orders .orderItem {
  flex: 1;
  position: relative;
  display: inline-block;
  margin: 0 auto;
  width: 96rpx;
  text-align: center;
}

.mine-orderList-orders .orderItem .orderNum {
  position: absolute;
  min-width: 20rpx;
  top: 5rpx;
  right: 40rpx;
  height: 32rpx;
  line-height: 32rpx;
  text-align: center;
  color: #ff5555;
  background-color: #fff;
  border-radius: 32rpx;
  border: 2rpx solid #ff5555;
  font-size: 24rpx;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  padding: 0 8rpx;
}

.mine-orderList-orders .orderItem .orderIcon {
  width: 88rpx;
  height: 88rpx;
}

.mine-orderList-orders .orderItem .orderTxt {
  font-size: 24rpx;
  color: #2e3135;
}

.mine-operationList {
  width: 702rpx;
  min-height: 169rpx;
  margin: 24rpx auto;
  padding: 16rpx 0;
  background: #fff;
  border-radius: 8rpx;
  box-shadow: 0 2rpx 16rpx 0 rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  box-sizing: border-box;
}

.mine-operationList .operationItem {
  width: 175.5rpx;
  display: inline-block;
  margin: 0 0 24rpx;
  text-align: center;
  position: relative;
}

.mine-operationList .operationItem .operationIcon {
  width: 88rpx;
  height: 88rpx;
}

.mine-operationList .operationItem .orderNum {
  position: absolute;
  min-width: 20rpx;
  top: 5rpx;
  right: 40rpx;
  height: 32rpx;
  line-height: 32rpx;
  text-align: center;
  color: #ff5555;
  background-color: #fff;
  border-radius: 32rpx;
  border: 2rpx solid #ff5555;
  font-size: 24rpx;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  padding: 0 8rpx;
}

.mine-operationList .operationItem .operationTxt {
  font-size: 24rpx;
  color: #2e3135;
}

.mine-list {
  width: 100%;
  padding-left: 65rpx;
  box-sizing: border-box;
}

.mine-list-item {
  width: 100%;
  height: 120rpx;
  background: url(https://img1.zhuanstatic.com/open/zhuanzhuan/zzwa/runningbear/mine/slice.png)
    no-repeat 605rpx center;
  background-size: 28rpx 28rpx;
  font-size: 32rpx;
  line-height: 120rpx;
  border-bottom: 1rpx solid #e4e4e4;
}

.mine .feed-back {
  position: relative;
  text-align: center;
  width: 175.5rpx;
  transform: translate(0, -12rpx);
}

.mine .feed-back .deviceIcon {
  width: 88rpx;
  height: 88rpx;
}

.mine .feed-back-item {
  font-size: 24rpx;
}

.mine-recommends {
  background: #fff;
  width: 702rpx;
  margin: 0 auto 16rpx;
  box-shadow: 0 2rpx 16rpx 0 rgba(0, 0, 0, 0.04);
  border-radius: 8rpx;
}

.mine-recommends .header {
  position: relative;
  height: 80rpx;
  font-family: PingFangSC-Medium;
  color: #2e3135;
  font-size: 32rpx;
  border: none !important;
  line-height: 80rpx;
  padding-left: 24rpx;
  font-weight: 500;
}

.mine-recommends .header:before {
  content: "";
  position: absolute;
  width: 200%;
  height: 200%;
  top: 0;
  left: 0;
  transform: scale(0.5);
  transform-origin: 0 0;
  box-sizing: border-box;
  pointer-events: none;
  border-radius: 0;
  border-bottom: 1px solid #e7e7e7;
}

.mine-recommends .recommends {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 24rpx 0;
  width: 100%;
  min-height: 139rpx;
}

.mine-recommends .recommends .recommend {
  width: 120rpx;
  box-sizing: border-box;
  margin: 0 27rpx 24rpx;
  text-align: center;
}

.mine-recommends .recommends .recommend .icon {
  display: block;
  width: 86rpx;
  height: 86rpx;
  margin: 0 auto 20rpx;
}

.mine-recommends .recommends .recommend .title {
  text-align: center;
  font-size: 24rpx;
  color: #2e3135;
  line-height: 24rpx;
  height: 24rpx;
}

.mine .adv {
  width: 702rpx;
  height: 160rpx;
  margin: 24rpx auto;
  border-radius: 10rpx;
  display: block;
}
</style>