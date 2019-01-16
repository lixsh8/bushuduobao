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
    <div class="list-wrapper">
      <div class="list-filter">
        <div
          class="chb"
          :class="{checked:isshowmine === 1}"
          @click="showList"
        ></div>
        <div class="filter-title">
          仅显示 我的号码
        </div>
      </div>

      <div
        class="list"
        v-if="list"
      >

        <div
          class="item"
          v-for="(item,index) in list"
          data-index="index"
          :key="index"
          @click="goDetail(item.is_id, item.member_id)"
        >
          <img
            :src="item.avatarUrl"
            alt=""
            class="avatar"
          >
          <div class="username">{{item.nickName}}</div>
          <div class="info">
            <div class="number">份数：{{item.number}}</div>
            <div class="time">{{item.date}}</div>
          </div>
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
      title: "参与明细",
      headerBackground: "#fff",
      titleColor: "black",
      showCustomBar: !0,
      customBarStyle: "black",
      id: "",
      isshowmine: 0,
      page: 1,
      page_size: 20,
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
    icon_pack_sm() {
      return this.globalData.img_url + "icon_pack_sm.png";
    }
  },

  methods: {
    // 跳转到号码详情
    goDetail(is_id, member_id) {
      wx.navigateTo({
        url:
          "/pages/join_list_detail/main?is_id=" +
          is_id +
          "&member_id=" +
          member_id
      });
    },
    async getList() {
      // 参与列表
      const res = await util.request(
        api.JoinList,
        {
          page: 1,
          is_id: this.id,
          isshowmine: this.isshowmine,
          page_size: this.page_size
        },
        "GET",
        this
      );
      if (res.data && res.code === 0) {
        // this.totalData = res.data;
        console.log(res.data);

        this.list = res.data.list;
        // this.hasMore = res.data.hasMore;
      } else {
      }
    },
    showList() {
      var isshowmine = this.isshowmine;
      this.page = 1;
      if (isshowmine === 1) {
        this.isshowmine = 0;
      } else {
        this.isshowmine = 1;
      }
      this.getList();
    }
  },

  // 滚动加载更多
  async onReachBottom() {
    if (this.hasMore) {
      let list = this.list;
      let page = this.page;

      page++;

      wx.showToast({
        title: "数据加载中...", // 提示的内容,
        icon: "loading", // 图标,
        duration: 1000 // 延迟时间,
      });

      const res = await util.request(
        api.JoinList,
        {
          page: page,
          is_id: this.id,
          isshowmine: this.isshowmine,
          page_size: this.page_size
        },
        "GET",
        this
      );

      if (res.data && res.code === 0 && res.data.list) {
        // this.totalData = res.data;
        var data = res.data;
        if (res.data.list.length > 0) {
          this.list = list.concat(data.list);
          this.page = data.page;
        }
        this.hasMore = data.hasMore;
        if (data.hasMore) {
          this.showNoMore = !1;
        } else {
          this.showNoMore = !0;
        }
      }
      if (this.scrollTimer) clearTimeout(this.scrollTimer);
      this.scrollTimer = setTimeout(() => {
        this.canScroll = true;
      }, 3000);
    } else {
      this.showNoMore = !0;
    }
  },
  // 页面加载
  async onLoad(e) {
    // mta统计
    mta.Page.init();
    this.id = this.$root.$mp.query.id;
    this.page = 1;
    this.getList();
  }
};
</script>

<style lang='scss' scoped>
@import "../../common/style/variable";
@import "../../common/style/mixin";

.list-filter {
  display: flex;
  flex-direction: row;
  height: 40px;
  font-size: 14px;
  color: #333;
  background: #f8f8f8;

  .chb {
    width: 40px;
    height: 40px;
    background: url(#{$img_url}/icon_chb.png) no-repeat center;
    background-size: 17px;

    &.checked {
      background: url(#{$img_url}/icon_chb_checked.png) no-repeat center;
      background-size: 17px;
    }
  }
  .filter-title {
    line-height: 40px;
  }
}

.list {
  background: #fff;
  color: #333;

  .item {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 0;
    line-height: 1;
    overflow: hidden;
    border-bottom: 1px solid #e9e9e9;
    background: url(#{$img_url}icon_arr_gray.png) no-repeat 97% center;
    background-size: 15px;

    .avatar {
      display: block;
      width: 34px;
      height: 34px;
      margin: 0 10px 0 15px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .username {
      width: 32%;
      overflow: hidden;
      flex-shrink: 0;
      font-size: 14px;
      @include sg_line_ellipsis;
    }
    .info {
      flex: 1;
      padding-right: 30px;
      text-align: right;

      .number {
        font-size: 14px;
        color: #333;
      }
      .time {
        padding-top: 6px;
        font-size: 12px;
        color: #888899;
      }
    }
  }
}
</style>