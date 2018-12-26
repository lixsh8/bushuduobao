<!-- 我的订单 -->
<template>
  <div style="height:100%;">
    <head-bar
      :title="title"
      :headerBackground="headerBackground"
      :titleColor="titleColor"
      :showCustomBar="showCustomBar"
      :customBarStyle="customBarStyle"
    />

    <!-- 正文 -->
    <!-- 头部导航 -->
    <div class="tab">
      <div class="tab-item" v-for="(item, index) in navs" :key="index">{{item.name}}</div>
    </div>

    <!-- 列表 -->
    <div class="list">
      <div class="item">
        <div class="item-hd">
          <div class="order-no"></div>
          <div class="order-status"></div>
        </div>
        <div class="item-bd">
          <img src="https://resource.xiaotaotao123.cn/wxapp_img/avatar.png" class="avatar"/>
          <div class="info">
            <div class="title">【秒杀即将结束】亚克力小夜灯(商 品材质： 亚克力+PP+电子元件...</div>
            <div class="count-wrapper">号码份数<div class="count">5</div></div>
          </div>
        </div>
        <div class="item-ft">
          <div class="btn-logistics">查看物流</div>
        </div>
      </div>


    </div>


    <!-- 快速导航 -->
    <quick-navigate />
  </div>
</template>

<script type="text/ecmascript-6">
import headBar from "@/components/headBar";
import quickNavigate from "@/components/quickNavigate";

export default {
  data() {
    return {
      title: "我的订单",
      headerBackground: "#fff",
      titleColor: "black",
      showCustomBar: !0,
      customBarStyle: "black",
      navs: [
        { id: 1, name: "全部" },
        { id: 2, name: "已开奖" },
        { id: 3, name: "已开奖" },
        { id: 4, name: "已开奖" },
        { id: 5, name: "已开奖" }
      ],
      list: [1, 2, 3, 4]
    };
  },

  components: {
    headBar,
    quickNavigate
  },

  computed: {},

  mounted(ev) {},

  methods: {}
};
</script>

<style lang='scss'>
@import "../../common/style/0.scss";
@import "../../common/style/1.scss";

.loading-tip {
  width: 100%;
  height: 76rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 80rpx;
}

.loading-tip image {
  width: 76rpx;
  height: 76rpx;
}

.loading-tip text {
  font-size: 30rpx;
  color: #5b5a5a;
}

.text {
  text-align: center;
  color: #9b9b9b;
  font-size: 28rpx;
}

@keyframes up {
  0% {
    bottom: -520rpx;
  }

  100% {
    bottom: 0;
  }
}

@keyframes down {
  0% {
    bottom: 0;
  }

  100% {
    bottom: -520rpx;
  }
}

.launchScreen._66ac94e {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100%;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  overflow: hidden;
  z-index: 20;
}

.showUp._66ac94e {
  animation: up linear 0.5s 1 forwards;
}

.hideDown._66ac94e {
  animation: down linear 0.5s 1;
  animation-fill-mode: forwards;
}

.addressPop._66ac94e {
  position: fixed;
  bottom: 0;
  width: 100%;
}

@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .addressPop._66ac94e {
    padding-bottom: 45rpx;
  }
}

.addressPop .topClose._66ac94e {
  width: 100%;
  height: 88rpx;
  position: relative;
  background: #fff;
  text-align: center;
  line-height: 88rpx;
  font-size: 32rpx;
  color: #333333;
}

.addressPop .topClose .close._66ac94e {
  position: absolute;
  top: 10rpx;
  right: 6rpx;
  width: 28rpx;
  height: 28rpx;
  padding: 20rpx;
}

.addressPop .address._66ac94e {
  width: 100%;
  padding-left: 24rpx;
  height: 168rpx;
  border-top: 16rpx solid #f2f3f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
}

.addressPop .address-title._66ac94e {
  color: #6d6f73;
}

.addressPop .address-noAddr._66ac94e {
  color: #9b9b9b;
  font-size: 24rpx;
}

.addressPop .address-Addr._66ac94e {
  color: #383e47;
  width: 647rpx;
  font-size: 28rpx;
}

.addressPop .address-Addr .nickName._66ac94e {
  font-family: PingFangSC-Medium;
  font-weight: 500;
  font-size: 40rpx;
  color: #383e47;
  display: inline-block;
  line-height: 56rpx;
}

.addressPop .address-Addr .userPhone._66ac94e {
  display: inline-block;
  font-size: 28rpx;
  margin-left: 12rpx;
}

.addressPop .address-Addr .userAddr._66ac94e {
  margin-top: 16rpx;
  width: 100%;
  overflow: hidden;
}

.addressPop .address .arrow._66ac94e {
  width: 13rpx;
  height: 20rpx;
  margin-right: 48rpx;
}

.addressPop .addrTips._66ac94e {
  width: 100%;
  height: 104rpx;
  background: #fff;
  border-top: 16rpx solid #f2f3f6;
  line-height: 32rpx;
  padding-left: 24rpx;
  padding-right: 24rpx;
  font-size: 28rpx;
  color: #333333;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.addressPop .addrTips .areaTips._66ac94e {
  color: red;
  font-size: 24rpx;
  width: 702rpx;
}

.addressPop .Tips._66ac94e {
  width: 100%;
  height: 168rpx;
  background: #fff;
  border-top: 0 solid #f2f3f6;
  line-height: 168rpx;
  font-size: 40rpx;
  color: #383e47;
  text-align: center;
  font-family: PingFangSC-Medium;
  font-weight: 500;
}

.addressPop .exchangeBottom._66ac94e {
  width: 100%;
  height: 104rpx;
  background: #fff;
  line-height: 104rpx;
  border-top: 16rpx solid #f2f3f6;
}

.addressPop .exchangeBottom view._66ac94e {
  width: 702rpx;
  height: 72rpx;
  line-height: 72rpx;
  text-align: center;
  margin: 16rpx 24rpx;
  background: #ff5555;
  border-radius: 10rpx;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  font-size: 32rpx;
  color: #ffffff;
}

form._3971fac {
  overflow: visible;
}

button._3971fac {
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
  text-align: left;
  overflow: visible;
}

button._3971fac::before,
button._3971fac::after {
  content: "";
  margin: 0;
  padding: 0;
  border: 0;
  width: 0;
  height: 0;
  display: none;
}
page {
  background: #f8f8f8;
}
/* 导航 */
.nav {
  width: 100%;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
}
.nav .back {
  width: 24.5rpx;
  height: 42rpx;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 20rpx 20rpx;
}

.nav .index {
  width: 44rpx;
  height: 44rpx;
  position: absolute;
  bottom: 0;
  left: 60rpx;
  padding: 20rpx 10rpx;
}

.nav-title {
  width: 100%;
  height: 45px;
  line-height: 45px;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
  font-family: PingFang-SC-Medium;
  font-weight: 600;
  font-size: 36rpx;
  color: black;
}

.outPage {
  position: relative;
  height: 100vh;
  background-color: #f8f8f8;
}

.tabsArea {
  position: fixed;
  width: 650rpx;
  height: 88rpx;
  background: #fff;
  padding: 0 50rpx;
  line-height: 88rpx;
  z-index: 5;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.tabsArea .tab {
  display: inline-block;
  height: 84rpx;
}

.tabsArea .tabSelected {
  font-family: PingFangSC-Medium;
  font-weight: 500;
  font-size: 36rpx;
  color: #ff5555;
  border-bottom: 6rpx solid #ff5555;
}

.tabsArea .tabUnselected {
  font-size: 30rpx;
  color: #6d6f73;
}

.orderList {
  padding-top: 88rpx;
}

.no-list {
  text-align: center;
  color: #43474c;
  font-size: 26rpx;
  line-height: 40rpx;
  padding-bottom: 100rpx;
}

.no-list image {
  width: 260rpx;
  height: 259rpx;
  margin: 50rpx auto 0;
}

.hasBtn {
  height: 415rpx;
}

.noBtn {
  height: 316rpx;
}

.orderItem {
  width: 686rpx;
  margin: 24rpx auto;
  background-color: #fff;
  box-shadow: 0 0 24rpx 0 rgba(59, 59, 59, 0.08);
  border-radius: 10rpx;
}

.orderItem .orderInfos {
  position: relative;
  width: 100%;
  height: 112rpx;
}

.orderItem .orderInfos .orderId {
  position: absolute;
  top: 37rpx;
  left: 24rpx;
  line-height: 33rpx;
  font-size: 24rpx;
  width: 400rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #2e3135;
}

.orderItem .orderInfos .orderStatus {
  position: absolute;
  right: 24rpx;
  top: 37rpx;
  font-family: PingFangHK-Medium;
  font-weight: 500;
  font-size: 28rpx;
  color: #ff5555;
}

.orderItem .goodsInfo {
  height: 180rpx;
  padding: 0 24rpx;
  position: relative;
}

.orderItem .goodsInfo .goodsPic {
  width: 180rpx;
  height: 180rpx;
  border-radius: 10rpx;
}

.orderItem .goodsInfo .goodsTitle {
  position: absolute;
  top: 6rpx;
  left: 228rpx;
  width: 434rpx;
  height: 68rpx;
  font-size: 28rpx;
  color: #2e3135;
  line-height: 34rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.orderItem .goodsInfo .goodsPrice {
  position: absolute;
  bottom: 0;
  left: 228rpx;
  font-size: 28rpx;
  color: #6d6f73;
}

.orderItem .goodsInfo .goodsPrice text {
  font-family: PingFangSC-Medium;
  font-weight: 500;
  font-size: 28rpx;
  color: #2e3135;
}

.orderItem .btns {
  width: 638rpx;
  margin: 24rpx auto 0;
  height: 99rpx;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #ffffff;
  box-shadow: inset 0 1rpx 0 0 #e7e7e7;
}

.orderItem .btns .orderbtn {
  display: inline-block;
  margin-left: 24rpx;
  width: 160rpx;
  height: 50rpx;
  font-size: 28rpx;
  line-height: 50rpx;
  text-align: center;
  position: relative;
  border: none !important;
}

.orderItem .btns .orderbtn:before {
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
  border-radius: 12rpx;
  border: 1px #6d6f73 solid;
}

.orderItem .btns .payStyle {
  border: none !important;
  color: #ff5555;
}

.orderItem .btns .payStyle:before {
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
  border-radius: 12rpx;
  border: 1px #ff5555 solid;
}
</style>