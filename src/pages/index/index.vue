<template>
  <div>
    <head-bar
      :title="title"
      :headerBackground="headerBackground"
      :titleColor="titleColor"
    />

    <div class="page">
      <div class="topArea">
        <div class="shootingStar">
          <div class="star"></div>
          <div class="star blue"></div>
          <div class="star red"></div>
        </div>
        <div
          bindtap="$RunningTopArea$goStepDetail"
          class="powerCoin"
        >
          <text class="agentCoinInteger">{{$RunningTopArea$agentCoinInteger}}</text>
          <text class="agentCoinDecimal">{{$RunningTopArea$agentCoinDecimal}}</text>
        </div>
        <!-- <div
          bindtap="$RunningTopArea$handlePrize"
          class="prize-common {{item.className}}"
          data-wpyhandleprize-a="{{item}}"
          wx:for="{{$RunningTopArea$prizeList}}"
        >
          <div
            class="prize-common-num"
            wx:if="{{item.coin}}"
          >{{item.coin}}<text wx:if="{{item.id!='active'&&item.id!='invite'}}">币</text>
          </div>
          <div class="prize-common-name">{{item.name}}</div>
        </div> -->
        <!-- <button
          bindtap="$RunningTopArea$shareGroup"
          class="share-group"
          data-type="1"
          hoverClass="none"
          openType="share"
          wx:if="{{$RunningTopArea$shareBubble==1&&$RunningTopArea$prizeList.length<=4}}"
        >
          <div class="share-group-image"></div>
          <div class="share-group-name">分享领币</div>
        </button> -->
        <!-- <div
          bindtap="$RunningTopArea$navToAdv"
          class="adv-prize prize-common"
          wx:if="{{$RunningTopArea$showGoldAdBubble==1&&$RunningTopArea$bubbleAdList.length>0&&$RunningTopArea$prizeList.length<=3}}"
        >
          <div class="prize-common-num">10<text>币</text>
          </div>
          <div class="prize-common-name">赚步数币</div>
        </div> -->
        <!-- <div
          animation="{{$RunningTopArea$centerAnim}}"
          bindtap="$RunningTopArea$exchangeCoinTwo"
          class="centerData"
        >
          <div class="centerData-nickName">未兑换步数</div>
          <div class="centerData-totalStep">{{$RunningTopArea$totalStep}}<text class="step-class">步</text>
          </div>
          <div class="centerData-stepTips">每日24点步数清零</div>
          <div
            bindtap="$RunningTopArea$logClick"
            class="centerData-stepBottom"
            wx:if="{{$RunningTopArea$totalStep==0}}"
          >{{$RunningTopArea$loadingWeRunData?'正在获取...':'获取最新微信步数'}}</div>
          <div
            bindtap="$RunningTopArea$exchangeClick"
            class="centerData-stepBottom breathe-btn"
            wx:else
          >点击兑换成步数币</div>
        </div> -->
        <!-- <button
          bindtap="$RunningTopArea$inviteNew"
          class="inviteNew"
          data-type="0"
          openType="share"
        >
          邀请新人赚5-20币
        </button> -->
        <!-- <div class="middleArea">
          <div
            bindtap="$RunningTopArea$handleCardBtn"
            class="card"
            data-wpyhandlecardbtn-a="{{item}}"
            wx:for="{{$RunningTopArea$cardsList}}"
          >
            <div
              class="card-pic"
              style="background: url({{item.pic}}) no-repeat center top;background-size: 120rpx 120rpx;"
            ></div>
            <div class="card-name">{{item.name}}</div>
            <div
              class="card-icon"
              wx:if="{{item.id==='ad'&&$RunningTopArea$adCoin>0}}"
            >领{{$RunningTopArea$adCoin}}币</div>
            <div
              class="card-icon"
              wx:if="{{item.id==='invite'&&$RunningTopArea$showFloat!=0}}"
            >领{{$RunningTopArea$rewardCoin}}币</div>
          </div>
        </div> -->
        <!-- <div
          bindtap="$RunningTopArea$beginChallenge"
          class="activity-challenge"
          wx:if="{{$RunningTopArea$challengeInfo.newUserChallengeBanner}}"
        >
          <image
            mode="aspectFit"
            src="{{$RunningTopArea$challengeInfo.newUserChallengeBanner}}"
          />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import headBar from "@/components/head-bar";

export default {
  data() {
    return {
      title: "首页",
      headerBackground: "#8054ff",
      titleColor: "#fff"
    };
  },

  components: {
    headBar
  },

  methods: {},

  created() {}
};
</script>

<style scoped lang='scss'>
.banner {
  height: 100px;
}
</style>
