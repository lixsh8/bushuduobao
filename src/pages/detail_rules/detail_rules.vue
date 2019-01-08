<!-- 详细规则 -->
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
    <div class="detail">

      红包有什么用？
      红包可参与平台内商品交易活动。

      如何获得更多红包？
      1.	 每日运动步数可兑换为红包，步数越多，获得红包越多；
      2.	每成功邀请1名好友注册加入，可永久提升加成倍数，加成倍数越高，获得的红包越大；
      3.	邀请的好友每日兑换步数，你可得10%红包奖励；
      4.	参与商品兑换还能获得红包收益，越早参与，收益越多；
      5.	参与平台签到、赚红包等活动，可获得更多红包。

      步数兑换说明
      1.	 平台所记录的步数是基于个人微信运动步数的授权数据，步数更新与微信运动更新时间同步，每日步数会在24点自动清零，次日重新计数；
      2.	步数与红包的兑换比例不是固定的，会视平台整体收益进行阶段性调整，当前兑换比例为1000步=1元红包；
      3.	每人每日可兑换的步数上限为30000步，超出后不计。

      免费兑商品说明
      1.	 每个商品根据价值不同，划分为不同份数，商品份数售完后，实时进行开奖；
      2.	用户使用红包购买商品份数，每购买1份可获得1个号码；
      3.	每人每天默认可参与购买10份，邀请好友助力可获得更多参与机会（上限50份），参与机会当日有效，过期清零；
      4.	开奖后，每个商品有1个号码中奖，中奖用户可免费获得商品；
      5.	中奖后需在[我的]-[我的订单]中，填写中奖商品收货地址；
      6.	收货地址填写后，平台将在3个工作日内安排发货，如因地址或手机号填写错误，导致无法收到快递，平台不会补寄商品（新疆、西藏及港澳台地区暂不支持发货）；
      7.	中奖商品不可退换货，收到商品后，若商品有质量问题，可联系在线客服进行咨询。

      其他说明
      1.	 平台提倡多运动更健康！为保障公平的兑换环境，您在使用平台过程中，如有违规获取步数的行为，平台有权判定您的部分或所有兑换无效，并对您做出暂时或永久性的封号。情节严重者将移交有关行政管理机关给予行政处罚。违规行为包括但不限于：使用摇步器获取步数，使用外挂程序刷步数等；
      2.	若发现用户通过违规行为或恶意作弊参与商品活动，平台有权取消用户中奖资格，并收回奖励；
      3.	若出现不可抗力或情势变更（如重大灾害、活动收相关单位指令需要停止进行调整等），平台可依据法律法规主张免责。
      <rich-text :nodes="article"></rich-text>
    </div>
   
  </div>
</template>

<script type="text/ecmascript-6">
import headBar from "@/components/headBar";
// import util from "@/utils/util";
// import api from "@/utils/api";
// import request from "@/utils/request";

export default {
  data() {
    return {
      title: "详细规则",
      headerBackground: "#fff",
      titleColor: "black",
      showCustomBar: !0,
      customBarStyle: "black",
      article:
        "<div style='background:#eee;'><div style='color:#fff;padding:10px;'>12121212</div></div>"
    };
  },

  components: {
    headBar
  },

  computed: {},

  methods: {
  },

  // 页面加载
  async onLoad() {
    // var { id, income, detail } = this.$root.$mp.query;
  }
};
</script>

<style lang='scss' scoped>
@import "../../common/style/variable";

.detail{
  padding: 15px;
}
</style>