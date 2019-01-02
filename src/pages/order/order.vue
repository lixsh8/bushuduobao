<!-- 我的订单 -->
<template>
  <div style="height:100%;">
    <head-bar
      :title="title"
      :headerBackground="headerBackground"
      :titleColor="titleColor"
      :showCustomBar="showCustomBar"
      :customBarStyle="customBarStyle"
      :headerHeight="headerHeight"
    />

    <!-- 正文 -->
    <!-- 头部导航 -->
    <div
      class="tab"
      :style="{top: headBarHeight + 'px'}"
    >
      <div
        class="tab-item"
        :class="{active: currentType===item.id}"
        :style="{width: (100/navs.length) + '%'}"
        v-for="(item, index) in navs"
        :data-index="index"
        :key="item.id"
        @click="changeTab(item.id)"
      >
        <div class="tab-cnt">{{item.name}}</div>
      </div>
    </div>
    <div class="tab-cover"></div>

    <!-- 列表 -->
    <div class="order-list">

      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="goDetail(item.order_id)"
      >
        <div class="item-hd">
          <div class="order-no">订单号:1075355839266603030</div>
          <div class="order-status">{{item.join_state}}</div>
        </div>
        <div class="item-bd">
          <img
            :src="item.dgoods_image"
            class="avatar"
          />
          <div class="info">
            <div class="title">{{item.dgoods_name}}</div>
            <div class="count-wrapper">号码份数：<div class="count">{{item.buy_times}}</div>
            </div>
          </div>
        </div>
        <div class="item-ft" v-if="item.showlogistics">
          <div
            class="btn-logistics"
            @click.stop="goLogistics(item.order_id)"
          >查看物流</div>
        </div>
        <div class="item-ft" v-if="item.showAddress">
          <div
            class="btn-logistics"
            @click.stop="setAddress()"
          >收货地址</div>
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
    <!-- <quick-navigate /> -->
    <back-top />

  </div>
</template>

<script type="text/ecmascript-6">
import util from "@/utils/util";
import api from "@/utils/api";
// import request from "@/utils/request";
import headBar from "@/components/headBar";
import backTop from "@/components/backTop";
import pagingFooter from "@/components/pagingFooter";
import quickNavigate from "@/components/quickNavigate";

export default {
  data() {
    return {
      title: "我的订单",
      headerBackground: "#fff",
      titleColor: "black",
      showCustomBar: !0,
      customBarStyle: "black",
      headerHeight: 46,
      navs: [
        { id: 0, name: "全部" },
        { id: 1, name: "待开奖" },
        { id: 8, name: "未中奖" },
        { id: 9, name: "已中奖" }
      ],
      canRequest: !0,
      canScroll: !0,
      requestTimer: null,
      page: 1,
      page_size: 10,
      hasMore: !0,
      currentType: 0,
      list: []
    };
  },

  components: {
    headBar,
    backTop,
    pagingFooter,
    quickNavigate
  },

  computed: {
    headBarHeight() {
      return this.globalData.statusBarHeight + this.headerHeight;
    }
  },

  onShow(ev) {
    // console.log(this.globalData.statusBarHeight);
  },

  methods: {
    // 参与列表
    async getList(idx) {
      if (!this.canRequest) {
        return;
      }
      this.currentType = idx;
      this.canRequest = !1;
      const res = await util.request(
        api.OderList,
        {
          page: 1,
          type: this.currentType,
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
      if (this.requestTimer) clearTimeout(this.requestTimer);
      this.requestTimer = setTimeout(() => {
        this.canRequest = !0;
      }, 2000);
    },
    // 切换tab
    changeTab(idx) {
      this.getList(idx);
    },
    goLogistics(oid) {
      wx.navigateTo({ url: "/pages/logistics/main?orderId=" + oid });
    },
    goDetail(oid) {
      wx.navigateTo({ url: "/pages/order_detail/main?orderId=" + oid });
    }
  },

  // 滚动加载更多
  async onReachBottom() {
    if (this.hasMore && this.canScroll) {
      let list = this.list;
      let page = this.page; // eslint-disable-line

      page++;
      this.canScroll = false;

      wx.showToast({
        title: "数据加载中...", // 提示的内容,
        icon: "loading", // 图标,
        duration: 1000 // 延迟时间,
      });

      const res = await util.request(
        api.OderList,
        {
          page: page,
          type: this.currentType,
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
      }, 1500);
    } else if (!this.hasMore && this.currentTab === 1) {
      this.showNoMore = !0;
    }
  },
  // 页面加载
  onLoad() {
    this.getList(0);
  }
};
</script>

<style lang='scss'>
@import "../../common/style/mixin";

page {
  background: #f2f2f2;
}
.tab {
  position: fixed;
  width: 100%;
  text-align: center;
  background: #fff;

  .tab-item {
    display: inline-block;
  }
  .tab-cnt {
    display: inline-block;
    padding: 10px 2px;
    font-size: 15px;
    color: #707376;
    box-sizing: border-box;
  }
  .active .tab-cnt {
    color: #ff5454;
    font-size: 16px;
    border-bottom: 3px solid #ff5454;
  }
}
.tab-cover {
  height: 50px;
}

.order-list {
  padding: 12px 15px;

  .item {
    margin-bottom: 12px;
    padding: 10px;
    background: #fff;
    border-radius: 5px;

    .item-hd {
      display: flex;
      flex-direction: row;
      padding: 8px 0;
      line-height: 1;

      .order-no {
        width: 60%;
        font-size: 12px;
        color: #2d3134;
        flex-shrink: 0;
      }
      .order-status {
        width: 40%;
        text-align: right;
        font-size: 14px;
        color: #9b9b9b;

        &.red {
          color: #ff5454;
        }
      }
    }

    .item-bd {
      display: flex;
      flex-direction: row;
      padding: 14px 0;

      .avatar {
        display: block;
        width: 90px;
        height: 90px;
        border-radius: 5px;
        flex-shrink: 0;
      }

      .info {
        flex: 1;
        margin-left: 12px;

        .title {
          width: 100%;
          padding-top: 3px;
          font-size: 14px;
          color: #2d3134;
          line-height: 17px;
          @include mult_line_ellipsis_2;
        }
        .count-wrapper {
          padding-top: 35px;
          font-size: 14px;
          color: #6c6f72;
          line-height: 1;

          .count {
            display: inline-block;
            color: #ff5454;
          }
        }
      }
    }

    .item-ft {
      text-align: right;
      padding-top: 10px;

      .btn-logistics {
        display: inline-block;
        width: 80px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        font-size: 14px;
        color: #070707;
        border-radius: 3px;
        border: 1px solid #6c6f72;
      }
    }
  }
}
</style>