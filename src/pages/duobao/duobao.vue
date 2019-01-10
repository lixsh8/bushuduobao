<!-- 夺宝 兑换商品 -->
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
        <scroll-message
          :messages="messages"
          :autoplay="autoplay"
          @change="change"
        />
      </div>
    </div>

    <!-- list -->
    <div
      class="goods-list"
      v-if="list"
    >
      <block
        v-for="item in list"
        :key="item.is_id"
      >
        <goodsItem
          :goodsItem="item"
          @btnClickHandler="btnClickHandler"
        />
      </block>
    </div>
    <!-- 底部没有更多 -->
    <paging-footer
      :showNoMore="showNoMore&&page==1"
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
import { setTimeout, clearTimeout } from "timers";

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
      autoplay: !0,
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
    // 获取列表
    async getList() {
      const res = await util.request(api.IndexDuobao, "GET", this);
      if (res.data && res.code === 0) {
        // this.totalData = res.data;
        console.log(res.data);

        this.list = res.data.list;
        this.banner = res.data.banner;
        this.hasMore = res.data.hasMore;
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
    // 消息滚动事件
    change(ev) {
      // console.log(ev);
      // if (ev === this.list.length - 1) {
      //   this.getMessage();
      // }
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
      for (var i = 0, len = newData.length; i < len; i++) {
        for (var j = 0, len2 = this.list.length; j < len2; j++) {
          if (newData[i].is_id == this.list[j].is_id) {
            this.list[j].is_oddnum = newData[i].is_oddnum;
            this.list[j].is_rate = newData[i].is_rate;
          }
        }
      }
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    console.log("刷新");
    this.getList();
    wx.stopPullDownRefresh();
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
        api.IndexDuobao,
        { page: page },
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
        this.hasMore = res.data.hasMore;
        this.page = res.data.page;
        if (res.data.hasMore) {
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

  onShow() {
    var _this = this;
    this.autoplay = true;
    // this.timer = setInterval(this.getList, 3000);
    wx.connectSocket({
      url: "ws://ws.chaojitao.cn",
      // url: "ws://devws.xiaotaotao123.cn",
      header: {
        // Authorization: "cjt eadd53444b70c87361ebc6026a2850de"
        "X-TOKEN": "854f671efa14b949e75a91616d878e20",
        "X-M": "qq_9339c4b5e8a00a73c25667ae07f67624"
      },
      success(res) {
        console.log("连接成功");
      }
    });

    wx.onSocketOpen(function(res) {
      console.log("WebSocket连接已打开！");

      // wx.sendSocketMessage({
      //   data: "Hello,World:" + Math.round(Math.random() * 0xffffff).toString()
      // });

      // wx.closeSocket()
    });

    wx.onSocketMessage(function(res) {
      // 接收到消息
      var num = Math.floor(Math.random() * 1050);
      var rate = Math.floor(Math.random() * 100) + "%";
      _this.updateData([
        { is_id: 101, is_oddnum: num, is_rate: rate },
        { is_id: 97, is_oddnum: num, is_rate: rate },
        { is_id: 98, is_oddnum: num, is_rate: rate }
      ]);
      console.log(res);
    });

    wx.onSocketClose(function(res) {
      console.log("WebSocket连接已关闭！");
      console.log(res.code);
      
    });
  },
  onHide() {
    this.autoplay = false;
    console.log("onHide");
    wx.closeSocket()
  },
  // 页面加载
  onLoad(e) {
    // mta统计
    mta.Page.init();
    // 列表
    this.getList();
    this.getMessage();
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