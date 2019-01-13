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
      ifCustomBack="true"
      @back="back"
    />

    <!-- 正文 -->
    <!-- 头部导航 -->
    <div
      class="notice-wrap"
      v-if="notice"
    >
      <div
        class="notice"
        :style="{top: headBarHeight + 'px'}"
      >
        <div
          class="notice-txt"
          :class="{'txt-scroll':isScroll}"
          :style="{'animation-duration': scrollSec+'s'}"
        >{{notice}}</div>
      </div>
      <div
        class="notice-cover"
        style="height:34px;"
      ></div>
    </div>
    <div
      class="tab"
      :style="{top: tabTop + 'px'}"
    >
      <div
        class="tab-item"
        :class="{active: currentType==item.id}"
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
          <div class="order-no">订单号:{{item.order_id}}</div>
          <div
            class="order-status"
            :class="{red:item.join_state_code!=8}"
          >{{item.join_state}}</div>
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
        <div
          class="item-ft"
          v-if="item.showlogistics"
        >
          <div
            class="btn-logistics"
            @click.stop="goLogistics(item.delivery_id)"
          >查看物流</div>
        </div>
        <div
          class="item-ft"
          v-if="item.showAddress"
        >
          <div
            class="btn-logistics"
            @click.stop="setAddress(item.order_id)"
          >收货地址</div>
        </div>
      </div>

    </div>

    <!-- 无数据 -->
    <no-data :showNoData="!list||list.length<=0" />

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
import noData from "@/components/noData";
import quickNavigate from "@/components/quickNavigate";

var mta = require("@/utils/mta_analysis.js");

export default {
  data() {
    return {
      title: "我的订单",
      headerBackground: "#fff",
      titleColor: "black",
      showCustomBar: !0,
      customBarStyle: "black",
      headerHeight: 46,
      notice: "",
      navs: [
        { id: 0, name: "全部" },
        { id: 1, name: "待开奖" },
        { id: 9, name: "已中奖" },
        { id: 8, name: "未中奖" }
      ],
      page: 1,
      page_size: 10,
      showNoMore: false,
      hasMore: !0,
      currentType: 0,
      list: []
    };
  },

  components: {
    headBar,
    backTop,
    pagingFooter,
    noData,
    quickNavigate
  },

  computed: {
    headBarHeight() {
      return this.globalData.statusBarHeight + this.headerHeight;
    },
    tabTop() {
      if (this.notice) {
        return this.globalData.statusBarHeight + this.headerHeight + 34;
      } else {
        return this.globalData.statusBarHeight + this.headerHeight;
      }
    },
    isScroll() {
      if (this.notice.length > 375 / 14 - 2) {
        return true;
      } else {
        return false;
      }
    },
    scrollSec() {
      return 8 * this.notice.length / (375 / 14 - 2);
    }
  },

  methods: {
    // 返回上一页
    back() {
      console.log("自定义back func");
      wx.switchTab({
        url: "/pages/mine/main"
      });
    },
    // 参与列表
    async getList(idx, isFirst) {
      console.log("订单页面的getList");

      if (idx == this.currentType && !isFirst) {
        return false;
      }
      this.currentType = idx;

      const res = await util.request(
        api.OderList,
        {
          page: 1,
          type: idx,
          page_size: this.page_size
        },
        "GET",
        this
      );
      if (res.data && res.code === 0) {
        // this.totalData = res.data;
        console.log(res.data);

        this.list = res.data.list;
        this.notice = res.data.tips;
        // this.hasMore = res.data.hasMore;
      } else {
      }
    },
    // 切换tab
    changeTab(idx) {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });
      this.page = 1;
      this.getList(idx);
    },
    // 跳转到物流信息
    goLogistics(oid) {
      wx.navigateTo({ url: "/pages/logistics/main?id=" + oid });
    },
    // 跳转订单详情页
    goDetail(oid) {
      wx.setStorageSync("currentType", this.currentType);

      wx.navigateTo({ url: "/pages/order_detail/main?orderId=" + oid });
    },
    // 设置地址
    setAddress(orderId) {
      console.log();
      var _this = this;
      wx.chooseAddress({
        success: function(res) {
          var data = res;
          console.log(JSON.stringify(data));
          util
            .request(
              api.AddressSave,
              {
                order_id: orderId,
                address: JSON.stringify(res)
              },
              "POST",
              _this
            )
            .then(res => {
              console.log(res);
              if (res.code === 0) {
                console.log('保存地址成功');
                _this.page = 1;
                _this.getList(_this.currentType, 1);

                wx.showModal({
                  title: "提示",
                  content: "保存成功",
                  showCancel: false,
                  confirmText: "确定",
                  confirmColor: "#3CC51F",
                  success: res => {}
                });
              } else {
                wx.showModal({
                  title: "提示",
                  content: res.msg || "保存失败",
                  showCancel: false,
                  confirmText: "确定",
                  confirmColor: "#3CC51F",
                  success: res => {}
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    console.log("刷新");
    this.page = 1;
    this.showNoMore = false;
    this.getList(0, 1);

    wx.stopPullDownRefresh();
  },

  // 滚动加载更多
  async onReachBottom() {
    if (this.hasMore) {
      let list = this.list;
      let page = this.page; // eslint-disable-line

      page++;

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
    } else {
      this.showNoMore = !0;
    }
  },
  // 页面加载
  onLoad(e) {
    // mta统计
    mta.Page.init();

    var ifBack = this.$root.$mp.query.ifBack;
    console.log("ifback=", ifBack);
    if (ifBack == 0) {
      // this.ifBack = false;
      // this.ifCustomBack = true;
    } else {
      // this.ifBack = true;
      // this.ifCustomBack = false;
    }
    console.log("id, this.ifback", this.ifBack);

    var type = this.$root.$mp.query.type || 0;
    this.currentType = type;
    console.log("order页面的onload  type==" + type);
    this.getList(type, 1);
    wx.removeStorageSync("currentType");
  },
  onShow(e) {
    this.page = 1;
    // var type = e.type || 0;
    // this.currentType = type;
  }
};
</script>

<style lang='scss'>
@import "../../common/style/mixin";

page {
  background: #f2f2f2;
}
.notice {
  width: 100%;
  position: fixed;
  background: #feefec;
  color: #ff5454;
  font-size: 14px;
  height: 34px;
  line-height: 34px;
  box-sizing: border-box;
  overflow: hidden;

  .notice-txt {
    position: absolute;
    left: 15px;
    top: 0;
    white-space: nowrap;
  }
  .txt-scroll {
    animation-name: txtscroll;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-delay: 1s;
  }
}

@keyframes txtscroll {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-100%, 0, 0);
  }
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