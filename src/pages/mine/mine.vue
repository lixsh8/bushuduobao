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

        <div
          class="mine"
          v-if="data"
        >

          <div class="mine-head">
            <image
              class="mine-head-portrait"
              mode="aspectFit"
              :src="data&&data.avatarUrl"
            />
            <div class="mine-head-myinfo">
              <div class="mine-head-myinfo-nickname">{{data&&data.nickName}}</div>
              <div class="mine-head-myinfo-coininfo">红包
                <text>￥{{data&&data.hb_amount}}</text>
                <!-- <text>|</text>兑换 -->
                <!-- <text>{{}}</text>件-->
              </div>
              <div class="mine-head-myinfo-tip">{{data&&data.tips}}</div>
            </div>
          </div>

          <div class="mine-orderList">
            <div class="mine-orderList-title">
              <div class="mine-orderList-title-tip1">我的订单</div>
              <div
                @click="navToOrder"
                class="mine-orderList-title-tip2"
              >查看全部订单</div>
            </div>
            <div class="mine-orderList-orders">
              <div
                @click="jumpHandle(item.type)"
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

          <!-- 操作列表 -->
          <div class="mine-operationList">
            <block
              v-for="(item,index) in data.menuList"
              :key="index"
            >
              <button
                class="operationItem"
                :openType="item.open_type"
                v-if="item.open_type && item.open_type!='address'"
              >
                <image
                  class="operationIcon"
                  mode="aspectFit"
                  :src="item.img"
                />
                <div class="operationTxt">{{item.title}}</div>
              </button>

              <div
                v-else
                @click="jump"
                :data-type="item.open_type"
                :data-link="item.link"
                class="operationItem"
              >
                <image
                  class="operationIcon"
                  mode="aspectFit"
                  :src="item.img"
                />
                <div class="operationTxt">{{item.title}}</div>
              </div>

            </block>

          </div>

          <!-- banner1 -->
          <div
            class="box _3142106 indexBanner bannerImg"
            v-if="banners&&banners.length>0"
          >
            <swiper
              class="banners multiple _3142106"
              :autoplay="banners.length>1"
              :circular="config.circular"
              :current="config.current"
              :duration="config.duration"
              :indicatorActiveColor="config.indicatorActiveColor"
              :indicatorColor="config.indicatorColor"
              :indicatorDots="banners.length>1"
              :interval="config.interval"
            >
              <swiper-item
                @click="jump"
                class="banner-wrap _3142106"
                v-for="(banner,index) in banners"
                :data-url="banner.link"
                :key="index"
              >
                <image
                  class="pic _3142106"
                  :src="banner.img"
                />
              </swiper-item>
            </swiper>
          </div>

          <!-- 推荐 -->
          <div
            class="mine-recommends"
            v-if="data&&data.recommendList&&data.recommendList.length>0"
          >
            <div class="header">精品推荐</div>
            <div class="recommends">
              <div
                @click="jump"
                :data-appid="recommend.appid"
                :data-url="recommend.url"
                class="recommend"
                v-for="(recommend,index) in data.recommendList"
                :key="index"
              >
                <image
                  class="icon"
                  :src="recommend.img"
                />
                <div class="title">{{recommend.title}}</div>
              </div>
            </div>
          </div>

          <!-- banner2 -->
          <div
            class="box _3142106 indexBanner"
            v-if="advertList&&advertList.length>0"
          >
            <swiper
              class="banners multiple _3142106"
              :autoplay="advertList.length>1"
              :circular="config.circular"
              :current="config.current"
              :duration="config.duration"
              :indicatorActiveColor="config.indicatorActiveColor"
              :indicatorColor="config.indicatorColor"
              :indicatorDots="advertList.length>1"
              :interval="config.interval"
            >
              <swiper-item
                @click="jump"
                class="banner-wrap _3142106"
                v-for="(advert,index) in advertList"
                :data-index="index"
                :data-id="advert.id"
                :data-link="advert.link"
                :data-appid="advert.appid"
                :key="advert.id"
              >
                <image
                  class="pic _3142106"
                  :src="advert.img"
                />
                <div class="banner-tip _3142106">
                  <div class="banner-tip-title _3142106">{{advert.title}}</div>
                </div>
              </swiper-item>
            </swiper>
          </div>

          <!-- 腾讯广告 -->
          <div class="ad">
            <ad unitId="adunit-b195e9267cb30a9e"></ad>
          </div>

        </div>
      </div>
    </div>

    <!-- 弹窗 -->
    <ls-dialog
      @closeDialog="closeDialog"
      @okBtnHandler="okBtnHandler"
      :showDialog="showDialog"
      :dialogTitle="dialogTitle"
      :dialogContent="dialogContent"
      :openType="openType"
      :singleBtn="singleBtn"
      :confirmText="confirmText"
    />
  </div>
</template>

<script>
import headBar from "@/components/headBar";
import lsDialog from "@/components/lsDialog";
import util from "@/utils/util";
import api from "@/utils/api";
// import request from "@/utils/request";

var mta = require("@/utils/mta_analysis.js");

export default {
  data() {
    return {
      title: "我的",
      headerBackground: "#FF696C",
      titleColor: "#fff",
      // 弹窗
      showDialog: false,
      dialogTitle: "",
      dialogContent: "",
      openType: "",
      singleBtn: false,
      confirmText: "",

      orderList: [
        {
          type: "1",
          icon: "/static/images/icon_order_dkj.png",
          title: "待开奖"
        },
        {
          type: "9",
          icon: "/static/images/icon_order_yzj.png",
          title: "已中奖"
        },
        {
          type: "8",
          icon: "/static/images/icon_order_wzj.png",
          title: "未中奖"
        }
      ],
      // 轮播图配置
      config: {
        current: 0,
        indicatorDots: !0,
        indicatorColor: "#ccc",
        indicatorActiveColor: "#808080",
        autoplay: !1,
        interval: 5000,
        duration: 500,
        circular: !0
      },
      banners: [],
      advertList: [],
      data: null
    };
  },

  components: {
    headBar,
    lsDialog
  },

  methods: {
    // 确定按钮关闭弹窗事件
    okBtnHandler() {
      // this.showDialog = false;
      wx.setStorageSync("mineHideDialog", "1");
      console.log(this.showDialog);
    },
    // 关闭弹窗
    closeDialog(ev) {
      console.log("closeDialog");

      this.showDialog = false;
    },
    navToOrder() {
      wx.navigateTo({
        url: "/pages/order/main"
      });
    },
    jumpHandle(e) {
      wx.navigateTo({
        url: "/pages/order/main?type=" + e
      });
    },
    // 跳转
    jump(e) {
      util.jump(e, this);
    },
    // 获取数据
    async getData() {
      const res = await util.request(api.MineIndex, "GET", this);
      if (res.data && res.code === 0) {
        // this.totalData = res.data;
        console.log(res.data);
        this.data = res.data;
        this.banners = res.data.banners || [];
        this.advertList = res.data.advertList || [];
      } else {
      }
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    console.log("刷新");
    this.getData();
    wx.stopPullDownRefresh();
  },

  onLoad() {
    // mta统计
    mta.Page.init();

    // 删除存储的商品详情的来源
    wx.removeStorageSync("goodsDetailFrom");
  },
  onShow() {
    // 设置顶级以便返回的时候使用tab页面
    wx.setStorageSync("tabPage", "mine");
    if (wx.getStorageSync("mineHideDialog") == "1") {
      this.showDialog = false;
    }
    this.getData();
  }
};
</script>

<style scoped lang='scss'>
@import "../../common/style/0.scss";
@import "../../common/style/8.scss";
@import "../../common/style/curtain.scss";
@import "../../common/style/variable.scss";

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
}

.mine-head {
  width: 100%;
  height: 265rpx;
  background: url(#{$img_url}mine_banner.png) no-repeat center center;
  background-size: 100% 265rpx;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
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
  line-height: 1;
  background: none !important;
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
.bannerImg {
  height: 80px !important;

  .pic {
    height: 80px !important;
  }
}
</style>