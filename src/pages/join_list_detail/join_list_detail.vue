<!-- 参与明细 -->
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
    <div class="list-wrapper" v-if="data">
      <div class="top">
        <img :src="data.avatarUrl" class="avatar" mode="widthFix">
        <div class="username">{{data.nickName}}</div>
        <div class="r">共参与{{data.buy_times}}份</div>
      </div>

      <div class="list-t">号码：</div>
      <div
        class="list"
        v-if="data.list"
      >

        <div
          class="item"
          v-for="(item,index) in data.list"
          data-index="index"
          :key="index"
        >
          {{item}}
        </div>

        <block v-if="data.list&&(data.list.length%3)==1">
          <div class="item">
          </div>
          <div class="item">
          </div>
        </block>

        <block v-if="data.list&&(data.list.length%3)==2">
          <div class="item">
          </div>
        </block>

      </div>

      <!-- 无数据 -->
      <no-data :showNoData="data&&!data.list||data.list.length<=0" />
    </div>

    <!-- 返回頂部 -->
    <back-top :showBackTop="showBackTop" />
    <!-- 快速导航 -->
    <!-- <quick-navigate /> -->
  </div>
</template>

<script type="text/ecmascript-6">
import util from "@/utils/util";
import api from "@/utils/api";
// import request from "@/utils/request";
import headBar from "@/components/headBar";
import quickNavigate from "@/components/quickNavigate";
import backTop from "@/components/backTop";
import pagingFooter from "@/components/pagingFooter";
import noData from "@/components/noData";
import buyModal from "@/components/buyModal";

var mta = require("@/utils/mta_analysis.js");

export default {
  data() {
    return {
      title: "号码明细",
      headerBackground: "#fff",
      titleColor: "black",
      showCustomBar: !0,
      customBarStyle: "black",
      is_id: "",
      member_id: "",
      data: null
    };
  },

  components: {
    headBar,
    backTop,
    pagingFooter,
    noData,
    quickNavigate,
    buyModal
  },

  computed: {
    icon_pack_sm() {
      return this.globalData.img_url + "icon_pack_sm.png";
    }
  },

  methods: {
    async getList() {
      // 参与列表
      const res = await util.request(
        api.JoinListDetail,
        {
          is_id: this.is_id,
          member_id: this.member_id
        },
        "GET",
        this
      );
      if (res.data && res.code === 0) {
        // this.totalData = res.data;
        console.log(res.data);

        this.data = res.data;
      } else {
      }
    }
  },

  // 页面加载
  async onLoad(e) {
    // mta统计
    mta.Page.init();
    this.is_id = this.$root.$mp.query.is_id;
    this.member_id = this.$root.$mp.query.member_id;

    this.getList();
  }
};
</script>

<style lang='scss' scoped>
@import "../../common/style/variable";
@import "../../common/style/mixin";

.top {
  display: flex;
  flex-direction: row;
  padding: 15px;
  align-items: center;
  line-height: 1;
  border-top: 1px solid #efeff4;

  .avatar{
    width: 16px;
    height: 16px;
    display: block;
    border-radius: 50%;
    margin-right: 10px;
    flex-shrink: 0;
  }
  .username {
    flex: 1;
    color: #333;
    font-size: 14px;
    line-height: 1;
  }

  .r {
    width: 40%;
    flex-shrink: 0;
    font-size: 14px;
    color: #666;
    text-align: right;
  }
}

.list-t {
  padding: 10px 15px;
  font-size: #666;
  background: #efeff4;
}

.list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  background: #fff;
  color: #333;

  .item {
    width: 33.33%;
    padding: 10px 0;
    font-size: 12px;
    text-align: center;
    color: #333;
    border-bottom: 1px solid #e9e9e9;
  }
}
</style>