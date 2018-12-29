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
    <div class="list-wrapper">
      <div class="list-filter">
        <div class="chb"></div>
        <div class="filter-title">
          仅显示 我的号码
        </div>
      </div>

      <div class="list">

        <div class="item" v-for="(item,index) in list" data-index="index" :key="index">
          <img src="/static/images/blackHome.png" alt="" class="avatar">
          <div class="username">panel</div>
          <div class="number">号码：15484848</div>
          <div class="time">21312323123123123</div>
        </div>

      </div>
    </div>

    <!-- 返回頂部 -->
    <back-top :showBackTop="showBackTop" />
    <!-- 底部没有更多 -->
    <paging-footer
      :showNoMore="showNoMore"
      noMoreTips="没有更多数据了"
    />
    <!-- 快速导航 -->
    <quick-navigate />
  </div>
</template>

<script type="text/ecmascript-6">
import util from "@/utils/util";
import api from "@/utils/api";
// import request from "@/utils/request";
import wxParse from "mpvue-wxparse";
import { setTimeout, clearTimeout } from "timers";
import headBar from "@/components/headBar";
import quickNavigate from "@/components/quickNavigate";
import backTop from "@/components/backTop";
import pagingFooter from "@/components/pagingFooter";
import buyModal from "@/components/buyModal";

export default {
  data() {
    return {
      title: "参与明细",
      headerBackground: "#fff",
      titleColor: "black",
      showCustomBar: !0,
      customBarStyle: "black",
      list: [1, 2, 3]
    };
  },

  components: {
    headBar,
    backTop,
    pagingFooter,
    quickNavigate,
    buyModal,
    wxParse
  },

  computed: {
    icon_pack_sm() {
      return this.globalData.img_url + "icon_pack_sm.png";
    }
  },

  mounted(ev) {
  },

  methods: {
  },

  // 滚动加载更多
  async onReachBottom() {
    if (this.hasMore && this.currentTab === 1 && this.canScroll) {
      let list = this.historyList;
      let page = this.page;
      page++;
      this.canScroll = false;

      wx.showToast({
        title: "数据加载中...", // 提示的内容,
        icon: "loading", // 图标,
        duration: 1000 // 延迟时间,
      });

      const DuobaoHistory = await util.request(
        api.JoinList,
        { page: page, id: this.id },
        "GET",
        this
      );

      if (
        DuobaoHistory.data &&
        DuobaoHistory.code === 0 &&
        DuobaoHistory.data.list &&
        DuobaoHistory.data.list.length > 0
      ) {
        // this.totalData = res.data;
        var data = DuobaoHistory.data;
        this.historyList = list.concat(data.list);
        this.hasMore = DuobaoHistory.data.hasMore;
        this.page = DuobaoHistory.data.page;
        if (DuobaoHistory.data.hasMore) {
          this.showNoMore = !1;
        } else {
          this.showNoMore = !0;
        }
      }
      if (this.scrollTimer) clearTimeout(this.scrollTimer);
      this.scrollTimer = setTimeout(() => {
        this.canScroll = true;
      }, 3000);
    } else if (!this.hasMore && this.currentTab === 1) {
      this.showNoMore = !0;
    }
  },
  // 页面加载
  async onLoad(e) {
    var id = e.id;

    // 往期回顾
    const res = await util.request(
      api.JoinList,
      { page: 1, id: id },
      "GET",
      this
    );
    if (res.data && res.code === 0) {
      // this.totalData = res.data;
      console.log(res.data);

      this.list = res.data.list;
      this.hasMore = res.data.hasMore;
    } else {
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../../common/style/variable";

.list-filter{
  display: flex;
  flex-direction: row;
  height: 40px;
  font-size: 14px;
  color: #333;
  background: #F8F8F8;

  .chb{
    width: 40px;
    height: 40px;
  }
  .filter-title{
    line-height: 40px;
  }
}

.list{
  
}
</style>