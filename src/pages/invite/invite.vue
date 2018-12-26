<template>
  <div>
    <head-bar
      :title="title"
      :headerBackground="headerBackground"
      :titleColor="titleColor"
    />

    <div
      class="wrapper-box _b562ac6"
     >
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
          >活动规则</div>

          <div class="topBg">
            <div class="gotReward">
              {{totalData.haveGotRewardToday}}
              <text>币</text>
            </div>
            <div class="tips">
              累计奖励{{totalData.accumulateReward}}步数币
              <text bindtap="goDetailPage">查看明细</text>
            </div>
            <button
              class="inviteBtn"
              data-type="0"
              openType="share"
            >邀请新用户得{{totalData.inviteTotalReward}}币</button>
            <div class="bottomTips">邀请成功立得{{totalData.inviteReward}}币，连续5天唤醒好友领剩余{{totalData.inviteRemainReward}}币</div>
          </div>

          <div class="centerBg voidHeight">
            <block v-if="friendList.length==0">
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
            </block>
            <block v-else>
              <div class="importantInfo">
                <div class="inviteTotalUserNum">累计邀请{{totalData.inviteTotalUserNum}}好友</div>
                <div
                  class="remainGetRewardToday"
                  v-if="ifLimited"
                >今日已到
                  <text>{{coinRewardLimit}}</text>币奖励上限
                </div>
                <block v-else>
                  <div
                    class="remainGetRewardToday"
                    v-if="totalData.remainGetRewardToday!=null||totalData.remainGetRewardToday!='null'"
                  >今日唤醒好友还可领
                    <text>{{totalData.remainGetRewardToday}}</text>币
                  </div>
                </block>
              </div>
              <div class="list-page">
                <div
                  class="userItem"
                  v-for="(item, index) in friendList"
                  :key="index"
                >
                  <image
                    class="portrait"
                    src="item.userPic"
                  />
                  <div class="nameInfo">
                    <div class="nickName">{{item.userNickName}}</div>
                    <div class="tips">{{item.backupDesc}}</div>
                  </div>
                  <button
                    bindtap="reCallUser"
                    class="coinInfo"
                    data-index="index"
                  >
                    {{item.btnTxt}}
                    <text
                      style=""
                      v-if="item.rewardCoin!=''"
                    >{{item.style?'领'+item.rewardCoin+'币':item.rewardCoin+'币'}}</text>
                  </button>
                </div>
              </div>
            </block>
          </div>
        </div>
      </div>
    </div>

    <!-- 规则 -->
    <div bindtap="$RuleDialog$onModal" catchtouchmove="$RuleDialog$touchmoveHandler" class="launchScreen _6a61420" data-ele="modal" style="top:px;" v-if="ruleDialogShow">
      <div class="launcher _6a61420">
        <div class="bg _6a61420"></div>
        <div class="totalCoin _6a61420">每邀请1位好友，可获得{{$RuleDialog$totalCoin}}币</div>
        <div class="inviteCoin _6a61420">邀请成功立得{{$RuleDialog$inviteReward}}币，连续5天唤醒好友领剩余{{$RuleDialog$totalCoin-$RuleDialog$inviteReward}}币</div>
        <div class="award1 _6a61420">
          <div class="eachCoin _6a61420">
            <div class="eachItem _6a61420" v-for="(item,index) in eachCoin" :key="index">{{item}}</div>
          </div>
        </div>
        <div class="title _6a61420">活动细则</div>
        <scroll-div class="content _6a61420" scrollY="true">
          <div class="_6a61420">1、邀请好友奖励：每邀请1位好友，好友注册后的5天里，每天将自己运动的步数兑换成转币，您即可拿到当天对应的奖励，第一天奖励5币，第二天奖励2币，第三天奖励5币，第四天奖励2币，第五天奖励6币；</div>
          <div class="_6a61420">2、好友加成：邀请的好友每日步数币加成，好友每日兑换步数，你就可以获得1个步数币奖励，好友数越多，每日奖励币数越多；</div>
          <div class="_6a61420">3、加成时间：好友注册30天内，每天兑换步数币，你都可以获得1步数币奖励，好友注册超过30天则无法收到奖励；</div>
          <div class="_6a61420">4、账号异常：如果你与邀请好友的账号是同一个人，则无法获得邀请奖励和好友加成。同一个手机号、设备号、银行卡、收货地址均视为同一个账号；</div>
          <div class="_6a61420">5、奖励领取：每日获得邀请好友和好友加成的奖励，需要你点击步数换首页奖励气泡进行领取；</div>
        </scroll-div>
        <div @click="ruleDialogClose" class="close _6a61420"></div>
      </div>
    </div>

  </div>
</template>

<script>
import headBar from "@/components/headBar";

export default {
  data() {
    return {
      title: "好友加成",
      headerBackground: "#d03430",
      titleColor: "#fff",
      isLoading: 0,
      totalData: {
        haveGotRewardToday: "0",
        accumulateReward: "0",
        inviteTotalUserNum: "0",
        remainGetRewardToday: "0",
        inviteReward: "5",
        inviteRemainReward: "0",
        inviteRewardMap: {},
        inviteTotalReward: "20"
      },
      eachCoin: ["5", "2", "5", "2", "6"],
      listSharePic: "",
      listShareTitle: "",
      pageSharePic: "",
      pageShareTitle: "",
      friendList: [],
      coinRewardLimit: "",
      ifLimited: !1,
      ruleDialogShow: 0
    };
  },

  components: {
    headBar
  },

  methods: {
    showRule() {
      this.ruleDialogShow = !0;
    },
    ruleDialogClose() {
      this.ruleDialogShow = !1;
    }
  },

  created() {},

  onLoad() {
    console.log(this.globalData.id);
  }
};
</script>

<style lang='scss'>
@import "../../common/style/8.scss";
@import "../../common/style/9.scss";
@import "../../common/style/curtain.scss";

page {
  background: #d03430;
  height: 100%;
}
.wrapper-box{
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
  top: 312rpx;
  left: 194rpx;
}

.launchScreen .launcher .content._6a61420 {
  width: 468rpx;
  height: 276rpx;
  overflow: scroll;
  font-size: 28rpx;
  color: #2e3135;
  line-height: 48rpx;
  position: absolute;
  top: 384rpx;
  left: 40rpx;
}

.launchScreen .launcher .close._6a61420 {
  position: absolute;
  bottom: -108rpx;
  left: 238rpx;
  width: 72rpx;
  height: 72rpx;
  background: url("https://img1.zhuanstatic.com/open/zhuanzhuan/zzwa/runningbear/dialog/dialog_close.png")
    no-repeat;
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

.launchScreen .launcher .list-page .userItem .coinInfo._e59e4f5 {
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

.launchScreen .launcher .list-page .userItem .coinInfo text._e59e4f5 {
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  margin-left: 10rpx;
  font-size: 24rpx;
}

.launchScreen .launcher .list-page .userItem .gray._e59e4f5 {
  background: #f3f3f3;
  font-size: 24rpx;
  color: #666666;
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
  background: url(https://img1.zhuanstatic.com/open/zhuanzhuan/zzwa/runningbear/award/inviteTopbgNew.png)
    no-repeat;
  background-size: 100% 100%;
}

.topBg .gotReward {
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  font-size: 120rpx;
  color: #ac4700;
  text-align: center;
  padding-top: 125rpx;
}

.topBg .gotReward text {
  font-size: 24rpx;
}

.topBg .tips {
  font-size: 24rpx;
  color: #ac4700;
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
  margin: 42rpx auto 0;
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
  margin-top: -12rpx;
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
</style>