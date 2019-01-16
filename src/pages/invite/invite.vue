<template>
  <div>
    <head-bar
      :title="title"
      :headerBackground="headerBackground"
      :titleColor="titleColor"
    />

    <div class="wrapper-box _b562ac6">
      <div
        class="wrapper1 _b562ac6"
        formType="submit"
      >
        <!-- 頁面加載 -->
        <div
          class="loading"
          v-if="isLoading"
        ></div>
        <!-- 加载内容 -->
        <div
          class="outPage"
          v-else
        >
          <div
            @click="showRule"
            class="activityRule"
          >加成规则</div>

          <div class="topBg">
            <div
              class="gotReward"
              @click="goPromoteList"
            >
              {{totalData.plusNum}}
              <!-- <text>币</text> -->
            </div>
            <div
              class="tips"
              @click="goPromoteList"
            >
              <!-- 累计奖励{{totalData.accumulateReward}}红包 -->
              加成倍数越高，到手红包越大
              <!-- <text bindtap="goDetailPage">查看明细</text> -->
            </div>
            <button
              class="inviteBtn"
              data-type="3"
              openType="share"
            >邀请新用户得{{totalData.inviteTotalReward}}加成</button>
            <!-- <div class="bottomTips">邀请成功立得</div> -->
          </div>

          <div class="centerBg voidHeight">
            <!-- 无邀请列表 -->
            <!-- <block v-if="friendList.length==0">
              <div class="totalCoin">每邀请1位好友，可获得{{totalData.inviteTotalReward}}币</div>
              <div class="inviteCoin">邀请成功立得{{totalData.inviteReward}}币，连续5天唤醒好友领剩余{{totalData.inviteTotalReward-totalData.inviteReward}}币</div>
              <div class="award1">
                <div class="eachCoin">
                  <div
                    class="eachItem"
                    v-for="(item, index) in eachCoin"
                    :key="index"
                  >{{item}}</div>
                </div>
              </div>
              <div class="award2"></div>
            </block> -->
            <!-- 有邀请列表 -->
            <block v-if="friendList">
              <div class="importantInfo">
                <div class="inviteTotalUserNum">{{f_title}}</div>
                <div
                  class="remainGetRewardToday"
                  v-if="ifLimited"
                >今日已到
                  <text>{{coinRewardLimit}}</text>奖励上限
                </div>
                <block v-else>
                  <div class="remainGetRewardToday">{{f_subtitle}}
                  </div>
                </block>
              </div>
              <!-- 用户列表 -->
              <div class="list-page">
                <block v-if="friendList&&friendList.length>0">
                  <div
                    class="userItem"
                    v-for="(item, index) in friendList"
                    :key="index"
                  >
                    <image
                      class="portrait"
                      :src="item.avatarUrl"
                    />
                    <div class="nameInfo">
                      <div class="nickName">{{item.nickName}}</div>
                      <div
                        class="tips"
                        v-if="item.hb_amount>0"
                      >好友今日已兑换{{item.StepNumber}}步</div>
                      <div
                        class="tips"
                        v-else
                      >好友今日未兑换步数</div>
                    </div>
                    <div
                      class="coinInfo2 gray2"
                      v-if="item.hb_amount>0"
                    >
                      已获得红包<text class="info-m">￥{{item.hb_amount}}</text>
                    </div>
                    <button
                      class="coinInfo2"
                      openType="share"
                      data-type="6"
                      v-else
                    >召唤好友兑换</button>
                  </div>
                </block>
                <div
                  v-else
                  class="no-data"
                >还没有邀请任何好友~</div>
              </div>
            </block>

          </div>
        </div>
      </div>
    </div>

    <!-- 规则 -->
    <div
      class="launchScreen _6a61420"
      v-if="ruleDialogShow"
    >
      <div class="launcher _6a61420">
        <div class="title _6a61420">加成规则</div>
        <scroll-div
          class="content _6a61420"
          scrollY="true"
        >
          <rich-text :nodes="totalData&&totalData.rules"></rich-text>
        </scroll-div>
        <div
          @click="ruleDialogClose"
          class="close _6a61420"
        ></div>
      </div>
    </div>

    <!-- 网络错误 -->
    <!-- <page-error
      @refresh="refresh"
      :showPageError="!isNet"
    /> -->
    <!-- 没有更多 -->
    <paging-footer
      :showNoMore="showNoMore&&page!=1"
      noMoreTips="没有更多数据了"
    />
  </div>
</template>

<script>
import headBar from "@/components/headBar";
import pagingFooter from "@/components/pagingFooter";
import util from "@/utils/util";
import api from "@/utils/api";

var mta = require("@/utils/mta_analysis.js");

export default {
  data() {
    return {
      title: "好友加成",
      headerBackground: "#d03430",
      titleColor: "#fff",
      isNet: !0,
      isLoading: 0,
      totalData: {},
      friendList: [],
      reloadFn: [],
      f_title: "",
      f_subtitle: "",
      page: 1,
      hasMore: !0,
      showNoMore: !1,
      ifLimited: !1, 
      ruleDialogShow: 0
    };
  },

  components: {
    headBar,
    pagingFooter
  },

  methods: {
    // 跳转到加成明细
    goPromoteList() {
      wx.navigateTo({
        url: "/pages/promote_list/main"
      });
    },
    showRule() {
      this.ruleDialogShow = !0;
    },
    ruleDialogClose() {
      this.ruleDialogShow = !1;
    },
    reload() {
      console.log(1);
      api.getFriendData();
    },
    refresh() {
      console.log(this.reloadFn);
      // this.reloadFn && this.reloadFn();
      for (var i = 0, len = this.reloadFn.length; i < len; i++) {
        this.reloadFn[i] && this.reloadFn[i]();
      }
    },
    async getData() {
      const res = await util.request(api.Friend, null, "GET", this);
      if (res.data && res.code === 0) {
        this.totalData = res.data;
      }

      // 请求列表
      const resFriendUserlist = await util.request(
        api.FriendUserlist,
        { page: 1 },
        "GET",
        this
      );
      if (resFriendUserlist.data && resFriendUserlist.code === 0) {
        this.friendList = resFriendUserlist.data.list || [];
        this.f_title = resFriendUserlist.data.title;
        this.f_subtitle = resFriendUserlist.data.subtitle;
        this.hasMore = resFriendUserlist.data.hasMore;
        this.page = resFriendUserlist.data.page;
      }
    }
  },

  created() {},
  // 分享
  onShareAppMessage(res) {
    var resData = res[0]
    console.log(resData);
    if (resData.from === "button" && resData.target.dataset.type == 3) {
      console.log("加成按钮");

      // 来自页面内转发按钮
      return util.getCommonShareData(
        this.totalData.share.title,
        this.totalData.share.image,
        this.totalData.share.link
      );
    } else if (resData.from === "button" && resData.target.dataset.type == 6) {
      console.log("召唤按钮");
      // 来自页面内转发按钮
      return util.getCommonShareData(
        this.totalData.shareFriend.title,
        this.totalData.shareFriend.image,
        this.totalData.shareFriend.link
      );
    }
    // 公用的分享转发数据
    return util.getCommonShareData(
      this.totalData.share.title,
      this.totalData.share.image,
      this.totalData.share.link
    );
  },
  // 滚动加载
  async onReachBottom(e) {
    let list = this.friendList;
    let page = this.page;
    page++;

    if (this.hasMore) {
      const resFriendUserlist = await util.request(
        api.FriendUserlist,
        { page: page },
        "GET",
        this
      );

      if (
        resFriendUserlist.data &&
        resFriendUserlist.code === 0 &&
        resFriendUserlist.data.list &&
        resFriendUserlist.data.list.length > 0
      ) {
        var hasMore = resFriendUserlist.data.hasMore;
        this.friendList = list.concat(resFriendUserlist.data.list || []);
        this.hasMore = hasMore;
        this.page = resFriendUserlist.data.page;
        if (hasMore) {
          this.showNoMore = !1;
        } else {
          this.showNoMore = !0;
        }
      }
    } else {
      this.showNoMore = !0;
    }
  },

  // 页面加载
  onLoad() {
    // mta统计
    mta.Page.init();

    this.page = 1;

    // 删除存储的商品详情的来源
    wx.removeStorageSync("goodsDetailFrom");
  },
  onShow() {
    // 设置顶级以便返回的时候使用tab页面
    wx.setStorageSync("tabPage", "invite");

    this.getData();
  }
};
</script>

<style lang='scss'>
@import "../../common/style/8.scss";
@import "../../common/style/9.scss";
@import "../../common/style/curtain.scss";
@import "../../common/style/variable";

page {
  background: #d03430;
  height: 100%;
}
.wrapper-box {
  height: 100%;
  line-height: 1;
}
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
.outPage {
  position: relative;
  background: #d03430;
  padding-bottom: 40rpx;
}

.launchScreen._6a61420 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100%;
  z-index: 100;
  background: rgba(0, 0, 0, 0.7);
  overflow: hidden;
  display: flex;
  align-items: center;
}

.launchScreen .launcher._6a61420 {
  position: relative;
  margin: 167rpx auto 0;
  width: 548rpx;
  background: #fff;
  border-radius: 10rpx;
  height: 700rpx;
}

.launchScreen .launcher .bg._6a61420 {
  width: 100%;
  height: 284rpx;
  background: url("https://img1.zhuanstatic.com/open/zhuanzhuan/zzwa/runningbear/award/wave.png")
    no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
}

.launchScreen .launcher .totalCoin._6a61420 {
  width: 100%;
  text-align: center;
  font-family: PingFangSC-Medium;
  font-weight: 600;
  font-size: 28rpx;
  color: #bb6100;
  position: absolute;
  top: 48rpx;
}

.launchScreen .launcher .inviteCoin._6a61420 {
  width: 100%;
  text-align: center;
  font-size: 24rpx;
  color: #bb6100;
  position: absolute;
  top: 86rpx;
}

.launchScreen .launcher .award1._6a61420 {
  width: 460rpx;
  height: 124rpx;
  background: url("https://img1.zhuanstatic.com/open/zhuanzhuan/zzwa/runningbear/award/temp.png")
    no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 118rpx;
  left: 41rpx;
}

.launchScreen .launcher .award1 .eachCoin._6a61420 {
  margin-top: 30rpx;
  width: 354rpx;
  margin-left: 55rpx;
  display: flex;
  justify-content: space-between;
  font-family: "DIN Condensed";
  font-size: 32rpx;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  text-shadow: 0 2rpx 2rpx #ff9100;
  box-sizing: content-box;
  line-height: 1;
}

.launchScreen .launcher .title._6a61420 {
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  font-size: 40rpx;
  color: #333333;
  position: absolute;
  top: 30rpx;
  left: 194rpx;
}

.launchScreen .launcher .content._6a61420 {
  width: 468rpx;
  height: 270px;
  overflow: scroll;
  font-size: 28rpx;
  color: #2e3135;
  line-height: 48rpx;
  position: absolute;
  top: 50px;
  left: 40rpx;
}

.launchScreen .launcher .close._6a61420 {
  position: absolute;
  bottom: -108rpx;
  left: 238rpx;
  width: 72rpx;
  height: 72rpx;
  background: url(#{$img_url}dialog_close.png) no-repeat;
  background-size: 100% 100%;
}

button._e59e4f5::after {
  border: none;
}

@keyframes breathe {
  0% {
    transform: scale(0.95);
  }

  17% {
    transform: scale(1);
  }

  33% {
    transform: scale(1.05);
  }

  66% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.95);
  }
}

.launchScreen._e59e4f5 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100%;
  z-index: 100;
  background: rgba(0, 0, 0, 0.7);
  overflow: hidden;
}

.launchScreen .launcher._e59e4f5 {
  position: relative;
  margin: 167rpx auto 0;
  width: 548rpx;
  background: #fff;
  background-size: 100% 100%;
  border-radius: 10rpx;
  height: 782rpx;
}

.launchScreen .launcher .top._e59e4f5 {
  position: absolute;
  top: -70rpx;
  width: 547rpx;
  height: 184rpx;
  background: url("https://img1.zhuanstatic.com/open/zhuanzhuan/zzwa/runningbear/award/curtain.png")
    no-repeat;
  background-size: 100% 100%;
  line-height: 124rpx;
  text-align: center;
  color: #fff;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
}

.launchScreen .launcher .totalTips._e59e4f5 {
  position: absolute;
  top: 86rpx;
  width: 100%;
  text-align: center;
  font-size: 28rpx;
  color: #2e3135;
}

.launchScreen .launcher .list-page._e59e4f5 {
  position: absolute;
  top: 150rpx;
  width: 100%;
  height: 480rpx;
}

.launchScreen .launcher .list-page .userItem._e59e4f5 {
  width: 100%;
  height: 120rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}

.launchScreen .launcher .list-page .userItem image._e59e4f5 {
  width: 56rpx;
  height: 56rpx;
  border-radius: 50%;
  margin-left: 32rpx;
}

.launchScreen .launcher .list-page .userItem .nameInfo._e59e4f5 {
  margin-left: 10rpx;
}

.launchScreen .launcher .list-page .userItem .nameInfo .nickName._e59e4f5 {
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  font-size: 22rpx;
  width: 200rpx;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 30rpx;
  color: #333333;
}

.launchScreen .launcher .list-page .userItem .nameInfo .tips._e59e4f5 {
  font-size: 20rpx;
  color: #999999;
  line-height: 28rpx;
}

.userItem .coinInfo {
  font-size: 24rpx;
  color: #c55a00;
  position: absolute;
  top: 32rpx;
  right: 24rpx;
  width: 215rpx;
  height: 56rpx;
  border-radius: 28rpx;
  background: #ffd66b;
  line-height: 56rpx;
  text-align: center;
}

.userItem .coinInfo text {
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  margin-left: 10rpx;
  font-size: 20rpx;
}

.userItem .gray {
  background: #f3f3f3;
  font-size: 20rpx;
  color: #666666;
}
.userItem .coinInfo2 {
  font-size: 24rpx;
  color: #c55a00;
  position: absolute;
  top: 32rpx;
  right: 24rpx;
  width: 215rpx;
  height: 56rpx;
  border-radius: 28rpx;
  background: #ffd66b;
  line-height: 56rpx;
  text-align: center;
}

.userItem .coinInfo2 text {
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  margin-left: 10rpx;
  font-size: 20rpx;
}

.userItem .gray2 {
  background: #f3f3f3;
  font-size: 20rpx;
  color: #666666;
}
.userItem .gray2 .info-m {
  color: #d03430;
}

.launchScreen .launcher .changeList._e59e4f5 {
  width: 484rpx;
  height: 80rpx;
  margin: 48rpx auto 0;
  line-height: 80rpx;
  text-align: center;
  color: #fff;
  background-image: linear-gradient(139deg, #ff7171 0, #ff5555 100%);
  border-radius: 40rpx;
  position: absolute;
  bottom: 32rpx;
  left: 32rpx;
  font-size: 28rpx;
  animation: breathe 1.2s infinite linear;
}

.launchScreen .launcher .close._e59e4f5 {
  position: absolute;
  bottom: -108rpx;
  left: 238rpx;
  width: 72rpx;
  height: 72rpx;
  background: url("https://img1.zhuanstatic.com/open/zhuanzhuan/zzwa/runningbear/dialog/dialog_close.png")
    no-repeat;
  background-size: 100% 100%;
}
button {
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

@keyframes breathe {
  0% {
    transform: scale(0.95);
  }

  17% {
    transform: scale(1);
  }

  33% {
    transform: scale(1.05);
  }

  66% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.95);
  }
}

page {
  background: #d03430;
}

.outPage {
  position: relative;
  background: #d03430;
  padding-bottom: 40rpx;
}

.activityRule {
  position: absolute;
  right: 0;
  top: 32rpx;
  width: 137rpx;
  height: 56rpx;
  line-height: 60rpx;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 28rpx 0 0 28rpx;
  font-size: 24rpx;
  color: #ffffff;
}

.loading {
  background: url(https://img1.zhuanstatic.com/open/zhuanzhuan/zzwa/common/loading2.gif)
    no-repeat center center #fff;
  background-size: 115rpx 100rpx;
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
}

.topBg {
  width: 750rpx;
  height: 511rpx;
  background: url(#{$img_url}invite_bg.png) no-repeat;
  background-size: 100% 100%;
}

.topBg .gotReward {
  font-family: PingFangSC-Semibold;
  font-size: 60px;
  color: #ff6742;
  text-align: center;
  padding-top: 100rpx;
}

.topBg .gotReward text {
  font-size: 24rpx;
}

.topBg .tips {
  font-size: 24rpx;
  color: #ff6742;
  text-align: center;
  margin-top: 16rpx;
}

.topBg .tips text {
  margin-left: 10rpx;
  background: url(https://img1.zhuanstatic.com/open/zhuanzhuan/zzwa/runningbear/award/arrow.png)
    no-repeat center right;
  background-size: 13rpx 20rpx;
  padding-right: 20rpx;
}

.topBg .inviteBtn {
  width: 626rpx;
  height: 134rpx;
  line-height: 130rpx;
  text-align: center;
  background: url(https://img1.zhuanstatic.com/open/zhuanzhuan/zzwa/runningbear/award/inviteBtnbg.png)
    no-repeat;
  background-size: 100% 100%;
  animation: breathe 1.2s infinite linear;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  font-size: 32rpx;
  color: #ac4700;
  margin: 60rpx auto 0;
}

.topBg .bottomTips {
  text-align: center;
  font-size: 24rpx;
  color: #9b1a1a;
}

.voidHeight {
  min-height: 551rpx;
}

.listHeight {
  min-height: 240rpx;
}

.centerBg {
  width: 670rpx;
  margin: 32rpx auto 0;
  background: #fff;
  border-radius: 10rpx;
  position: relative;
}

.centerBg .totalCoin {
  width: 100%;
  text-align: center;
  font-family: PingFangSC-Medium;
  font-weight: 600;
  font-size: 28rpx;
  color: #bb6100;
  position: absolute;
  top: 64rpx;
}

.centerBg .inviteCoin {
  width: 100%;
  text-align: center;
  font-size: 24rpx;
  color: #bb6100;
  position: absolute;
  top: 112rpx;
}

.centerBg .award1 {
  width: 460rpx;
  height: 124rpx;
  background: url("https://img1.zhuanstatic.com/open/zhuanzhuan/zzwa/runningbear/award/temp.png")
    no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 134rpx;
  left: 118rpx;
}

.centerBg .award1 .eachCoin {
  margin-top: 34rpx;
  width: 354rpx;
  margin-left: 55rpx;
  display: flex;
  justify-content: space-between;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  text-shadow: 0 2rpx 2rpx #ff9100;
}

.centerBg .award1 .eachCoin .eachItem {
  font-family: "DIN Condensed";
  font-size: 33.6rpx;
}

.centerBg .award2 {
  width: 453rpx;
  height: 267rpx;
  background: url("https://img1.zhuanstatic.com/open/zhuanzhuan/zzwa/runningbear/award/award2.png")
    no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 277rpx;
  left: 106rpx;
}

.centerBg .importantInfo {
  width: 100%;
  height: 120rpx;
  border-radius: 10rpx;
  background: url("https://pic1.zhuanstatic.com/zhuanzh/n_v2f351b51d2ab5423d836717f13746a624.png")
    no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.centerBg .importantInfo .inviteTotalUserNum {
  font-size: 24rpx;
  color: #ac4700;
  margin-left: 32rpx;
}

.centerBg .importantInfo .remainGetRewardToday {
  font-size: 24rpx;
  color: #ac4700;
  margin-right: 32rpx;
}

.centerBg .importantInfo .remainGetRewardToday text {
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  font-size: 40rpx;
  margin: 0 5rpx;
}

.centerBg .list-page {
  width: 100%;
  min-height: 120rpx;
}

.centerBg .list-page .userItem {
  width: 100%;
  height: 120rpx;
  border: none !important;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}

.centerBg .list-page .userItem:before {
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
  border-bottom: 1px solid #e8e8e8;
}

.centerBg .list-page .userItem:last-child {
  border: none !important;
}

.centerBg .list-page .userItem:last-child:before {
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
  border-bottom: 1px solid transparent;
}

.centerBg .list-page .userItem image {
  width: 56rpx;
  height: 56rpx;
  border-radius: 50%;
  margin-left: 32rpx;
}

.centerBg .list-page .userItem .nameInfo {
  margin-left: 10rpx;
}

.centerBg .list-page .userItem .nameInfo .nickName {
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  font-size: 22rpx;
  width: 200rpx;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 30rpx;
  color: #333333;
}

.centerBg .list-page .userItem .nameInfo .tips {
  font-size: 20rpx;
  color: #999999;
  line-height: 28rpx;
  width: 310rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.centerBg .list-page .userItem .coinInfo {
  font-size: 24rpx;
  color: #666666;
  position: absolute;
  right: 32rpx;
  top: 32rpx;
  width: 215rpx;
  height: 56rpx;
  border-radius: 56rpx;
  background: #f3f3f3;
  line-height: 56rpx;
  text-align: center;
}

.centerBg .list-page .userItem .coinInfo text {
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  margin-left: 10rpx;
  font-size: 24rpx;
}

.centerBg .list-page .userItem .btnStyle {
  color: #c55a00;
  background: #ffd66b;
}
.no-data {
  padding-top: 30px;
  text-align: center;
  font-size: 14px;
  color: #999;
}
</style>