<!-- 兑商品 兑换商品 -->
<template>
  <div style="height:100%;">
    <head-bar
      :title="title"
      :headerBackground="headerBackground"
      :titleColor="titleColor"
    />

    <!-- 正文 -->
    <!-- banner -->
    <div class="banner">
      <img
        :src="bg"
        alt=""
        mode="widthFix"
      >
    </div>

    <!-- 滚动消息 -->
    <div
      class="scroll-message-wrapper"
      v-if="messages && messages.length>0"
    >
      <div class="message-icon"></div>
      <div class="scroll-message">
        <scroll-message :messages="messages" />
      </div>
    </div>

    <!-- list -->
    <div
      class="goods-list"
      v-if="list"
    >
      <block
        v-for="(item, index) in list"
        :key="item.is_id"
      >
        <goodsItem
          :goodsItem="item"
          :index="index"
          @btnClickHandler="btnClickHandler"
        />
      </block>
    </div>
    <!-- 底部没有更多 -->
    <paging-footer
      :showNoMore="showNoMore&&list&&list.length>0"
      noMoreTips="没有更多数据了"
    />
    <!-- 腾讯广告 -->
    <div class="ad">
      <!-- <ad unitId="adunit-b195e9267cb30a9e"></ad> -->
    </div>

    <!-- 无数据 -->
    <no-data :showNoData="!list||list.length<=0" />

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
import goodsItem from "@/components/goodsItem";
import quickNavigate from "@/components/quickNavigate";
import backTop from "@/components/backTop";
import scrollMessage from "@/components/scrollMessage";
import pagingFooter from "@/components/pagingFooter";
import noData from "@/components/noData";
// import lazyLoad from "@/utils/lazyload";

var mta = require("@/utils/mta_analysis.js");

export default {
  data() {
    return {
      title: "兑商品",
      headerBackground: "#ff5b5c",
      titleColor: "white",
      // showCustomBar: !0,
      // customBarStyle: "white",
      banner: null,
      page: 1,
      hasMore: !0,
      showNoMore: !1,
      canScroll: !0,
      timer: null,
      scrollTimer: null,
      messages: [],
      list: null
    };
  },

  components: {
    headBar,
    goodsItem,
    backTop,
    quickNavigate,
    pagingFooter,
    noData,
    scrollMessage
  },

  computed: {
    bg() {
      return this.globalData.img_url + "duobao_bg.png?v=1";
    }
  },

  methods: {
    // 懒加载图片
    lazyload(group) {
      for (let i in group) {
        // 设置监听回调事件，当元素 .loadImg{{i}},进入页面20px内就触发回调事件，设置图片为真正的图片，通过show控制
        wx
          .createIntersectionObserver()
          .relativeToViewport({ bottom: 20 })
          .observe(".loadImg" + i, ret => {
          // .observe(".loadImg" + i, ret => {
            if (ret.intersectionRatio > 0) {
              group[i].show = true;
              console.log('loadImg');
              
            }
            // 更新数据
            this.list = group;
          });
      }
    },
    // 获取列表
    async getList() {
      const res = await util.request(api.IndexDuobao, "GET", this);
      if (res.data && res.code === 0) {
        // this.totalData = res.data;
        console.log(res.data);

        this.list = res.data.list;
        this.banner = res.data.banner;
        // this.lazyload(this.list);
        // this.hasMore = res.data.hasMore;
      } else {
      }
    },
    // 规则弹窗
    showRules() {
      this.ifShowRules = !0;
    },
    clsRulesModal() {
      this.ifShowRules = !1;
    },
    // 请求消息数据
    async getMessage() {
      const res = await util.request(api.DuobaoMessage, "GET", this);
      if (res.data && res.code === 0) {
        // this.totalData = res.data;
        console.log(res.data);

        this.messages = res.data.rollingMessage;
      } else {
      }
      console.log("getMessage");
    },
    // 点击购买按钮
    btnClickHandler(ev) {
      console.log(ev);
      wx.navigateTo({
        url: "/pages/goods_detail/main?id=" + ev
      });
    },
    // 通过id来更新数据
    updateData(newData) {
      // console.log(newData);

      if (
        !newData ||
        newData.length <= 0 ||
        !this.list ||
        this.list.length <= 0
      ) {
        return;
      }
      for (var i = 0, len = newData.length; i < len; i++) {
        // console.log(newData[i]);

        for (var j = 0, len2 = this.list.length; j < len2; j++) {
          if (newData[i].id == this.list[j].is_id) {
            this.list[j].is_oddnum = newData[i].n;
            // this.list[j].is_rate = newData[i].r;
          }
        }
      }
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    console.log("刷新");
    this.page = 1;
    this.hasMore = true;
    this.canScroll = true;
    this.showNoMore = false;
    this.getList();
    wx.stopPullDownRefresh();
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
        api.IndexDuobao,
        { page: page },
        "GET",
        this
      );

      if (res.data && res.code === 0 && res.data.list) {
        // this.totalData = res.data;
        var data = res.data;
        if (res.data.list.length > 0) {
          this.list = list.concat(data.list);
          this.page = res.data.page;
          // this.lazyload(this.list);
        }

        this.hasMore = res.data.hasMore;
        if (res.data.hasMore) {
          this.showNoMore = !1;
        } else {
          this.showNoMore = !0;
        }
      }
    } else {
      this.showNoMore = !0;
    }
  },

  onShow() {
    var _this = this;
    this.page = 1;
    this.hasMore = true;
    this.canScroll = true;
    this.showNoMore = false;

    // 往上滚动
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    });

    // 设置顶级以便返回的时候使用tab页面
    wx.setStorageSync("tabPage", "duobao");
    // 列表
    this.getList();
    // 消息
    this.getMessage();
    // // this.autoplay = true;
    util.socket(function(res) {
      // console.log(res.data);

      if (res && res.data) {
        var data = JSON.parse(res.data);
        // console.log(data.updateoddtimes);

        if (data.updateoddtimes && data.updateoddtimes.length > 0) {
          _this.updateData(data.updateoddtimes);
        }
      }
    });
  },
  onHide() {
    // this.autoplay = false;
    console.log("onHide");
    wx.closeSocket();
  },
  onReady() {},
  // 页面加载
  onLoad(e) {
    // mta统计
    mta.Page.init();
  }
};
</script>

<style lang='scss' scoped>
@import "../../common/style/variable";

.banner {
  position: relative;

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  .rule-btn {
    position: absolute;
    top: 10px;
    right: 0;
    width: 60px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    font-size: 12px;
    color: #fff;
    border-radius: 12px 0 0 12px;
    background: rgba(0, 0, 0, 0.5);
  }
}

/* 商品列表 */
.goods-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.scroll-message-wrapper {
  display: flex;
  flex-direction: row;
  width: 345px;
  height: 34px;
  margin: 10px auto;
  align-items: center;
  background: #eee;
  border-radius: 17px;

  .message-icon {
    width: 34px;
    height: 18px;
    background: url(#{$img_url}icon_message.png) no-repeat center;
    background-size: 16px;
    border-right: 1px solid #cfcfcf;
  }
  .scroll-message {
    padding-left: 10px;
    height: 24px;
    font-size: 12px;
  }
}
</style>