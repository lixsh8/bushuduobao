<!-- 广告福利 -->
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
    <div class="line"></div>
    <div class="banner"></div>
    <div class="btn-wrapper sg">
      <button class="btn btn-friend"
       openType="share"></button>
      <!-- <div class="btn btn-ad"></div> -->
    </div>

    <div class="rules">
      <div class="rules-hd">体力规则说明</div>
      <div class="rules-bd">
        <text>1.参与抽奖会消耗体力，参与份数越多，消耗的体力越多。 </text>
        <text>2.体力会随着时间推移而逐渐恢复。 </text>
        <text>3.喊好友加油，可立即获得一定体力，每天最多可喊10个好友帮忙加油。 </text>
        <!-- <text>4.休闲一会，可立即获得一定体力，每天不限量哦。</text> -->
      </div>
    </div>
    <!-- 底部按钮 -->
    <!-- <div
      class="fixed-btn"
      @click="goBuy"
    >立即参与</div>
    <div class="fixed-btn-cover"></div> -->
  </div>
</template>

<script type="text/ecmascript-6">
import headBar from "@/components/headBar";
import util from "@/utils/util";
import api from "@/utils/api";
// import request from "@/utils/request";

var mta = require("@/utils/mta_analysis.js");

export default {
  data() {
    return {
      title: "体力规则",
      headerBackground: "#fff",
      titleColor: "black",
      showCustomBar: !0,
      customBarStyle: "black",
      shareData: {}
    };
  },

  components: {
    headBar
  },

  computed: {},

  methods: {
    
  },

  // 分享
  onShareAppMessage(res) {
    var resData = res[0];
    console.log(resData);
    if (resData.from === "button") {
      console.log("按钮分享");

      // 来自页面内转发按钮
      return util.getCommonShareData(
        this.shareData.title,
        this.shareData.image,
        this.shareData.link
      );
    }
    // 公用的分享转发数据
    return util.getCommonShareData(
      this.shareData.title,
      this.shareData.image,
      this.shareData.link
    );
  },

  // 页面加载
  async onLoad() {
    // mta统计
    mta.Page.init();

    const res = await util.request(api.PowerRule, null, "GET", this);
    if (res.data && res.code === 0) {
      // this.totalData = res.data;
      console.log(res.data);

      this.shareData = res.data.share;
    } else {
    }
  },
  async onShow() {
  }
};
</script>

<style lang='scss' scoped>
@import "../../common/style/variable";

.line {
  width: 100%;
  height: 1px;
  background: #e9e9e9;
}

.banner {
  width: 345px;
  height: 130px;
  margin: 15px auto 10px auto;
  background: url(#{$img_url}tili_banner.png) no-repeat center;
  background-size: 100%;
}
.btn-wrapper {
  padding: 0 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &.sg {
    justify-content: center;
  }

  .btn {
    width: 166px;
    height: 48px;
  }

  .btn-friend {
    background: url(#{$img_url}tili_btn_call_friend.png) no-repeat center;
    background-size: 100%;
  }

  .btn-ad {
    background: url(#{$img_url}tili_btn_ad.png) no-repeat center;
    background-size: 100%;
  }
}

.rules {
  padding: 15px;
}
.rules-hd {
  padding-top: 15px;
  height: 23px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 23px;
}
.rules-bd {
  padding-top: 10px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;

  text{
    display: block;
  }
}
button::after{
  border: none;
}
</style>