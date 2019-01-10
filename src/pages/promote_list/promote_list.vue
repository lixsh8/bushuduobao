<!-- 加成明细 -->
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

      <div
        class="list"
        v-if="list"
      >

        <div
          class="item"
          v-for="(item,index) in list"
          data-index="index"
          :key="index"
        >
          <div class="l">
            <div class="title">{{item.title}}</div>
            <div class="time">{{item.date}}</div>
          </div>
          <div class="r"><div class="num">{{item.addition}}</div></div>
        </div>

      </div>

      <!-- 无数据 -->
      <no-data :showNoData="!list||list.length<=0" />
    </div>

    <!-- 返回頂部 -->
    <back-top :showBackTop="showBackTop" />
    <!-- 底部没有更多 -->
    <paging-footer
      :showNoMore="showNoMore&&page!=1"
      noMoreTips="没有更多数据了"
    />
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
      title: "加成明细",
      headerBackground: "#fff",
      titleColor: "black",
      showCustomBar: !0,
      customBarStyle: "black",
      id: "",
      isshowmine: 0,
      page: 1,
      page_size: 20,
      hasMore: !0,
      canRequest: !0,
      requestTimer: null,
      canScroll: !0,
      showNoMore: !1,
      scrollTimer: null,
      list: null
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
  },

  methods: {
    async getList() {
      // 列表
      const res = await util.request(
        api.Promotelist,
        {
          page: 1,
          page_size: this.page_size
        },
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
  },

  // 滚动加载更多
  async onReachBottom() {
    if (this.hasMore && this.canScroll) {
      let list = this.list;
      let page = this.page;

      page++;
      this.canScroll = false;

      wx.showToast({
        title: "数据加载中...", // 提示的内容,
        icon: "loading", // 图标,
        duration: 1000 // 延迟时间,
      });

      const res = await util.request(
        api.Promotelist,
        {
          page: page,
          page_size: this.page_size
        },
        "GET",
        this
      );

      if (
        res.data &&
        res.code === 0 &&
        res.data.list &&
        res.data.list.length > 0
      ) {
        // this.totalData = res.data;
        var data = res.data;
        this.list = list.concat(data.list);
        this.hasMore = data.hasMore;
        this.page = data.page;
        if (data.hasMore) {
          this.showNoMore = !1;
        } else {
          this.showNoMore = !0;
        }
      }
      if (this.scrollTimer) clearTimeout(this.scrollTimer);
      this.scrollTimer = setTimeout(() => {
        this.canScroll = true;
      }, 1000);
    } else if (!this.hasMore) {
      this.showNoMore = !0;
    }
  },
  // 页面加载
  async onLoad(e) {
    // mta统计
    mta.Page.init();

    this.getList();
  }
};
</script>

<style lang='scss' scoped>
@import "../../common/style/variable";
@import "../../common/style/mixin";

.list {
  padding: 15px;
  background: #fff;
  color: #333;

  .item {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 12px 0;
    line-height: 1;
    overflow: hidden;
    border-bottom: 1px solid #e9e9e9;
    line-height: 1;

    .l{
      width: 60%;
      flex-shrink: 0;

      .title{
        font-size: 16px;
        color: #333;
        @include sg_line_ellipsis;
      }
      .time{
        padding-top: 6px;
        font-size: 12px;
        color: #999;
      }
    }
    .r{
      width: 40%;
      flex-shrink: 0;
      font-size: 16px;
      text-align: right;

      .num{
        color: #FF696C;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
</style>