<!-- 新人专区 -->
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
    <!-- banner -->
    <div class="banner">
      <img
        :src="bg"
        alt=""
        mode="widthFix"
      >
    </div>

    <!-- 滚动消息 -->
    <div class="scroll-message-wrapper">
      <div class="message-icon"></div>
      <div class="scroll-message">
        <scroll-message
          :messages="messages"
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
import headBar from "@/components/headBar";
import goodsItem from "@/components/goodsItem";
import quickNavigate from "@/components/quickNavigate";
import backTop from "@/components/backTop";
import scrollMessage from "@/components/scrollMessage";
import pagingFooter from "@/components/pagingFooter";

export default {
  data() {
    return {
      title: "兑商品",
      headerBackground: "#de5b75",
      titleColor: "white",
      showCustomBar: !0,
      customBarStyle: "white",
      banner: null,
      page: 1,
      hasMore: !0,
      showNoMore: !1,
      canScroll: !0,
      scrollTimer: null,
      messages: [1111111, 2222222222222, 33333333333333, 444444444444],
      list: null
    };
  },

  components: {
    headBar,
    goodsItem,
    backTop,
    quickNavigate,
    pagingFooter,
    scrollMessage
  },

  computed: {
    bg() {
      return this.globalData.img_url + "duobao_bg.png";
    }
  },

  methods: {
    // 规则弹窗
    showRules() {
      this.ifShowRules = !0;
    },
    clsRulesModal() {
      this.ifShowRules = !1;
    },
    // 请求消息数据
    getMessage() {
      console.log("getMessage");
    },
    // 消息滚动事件
    change(ev) {
      console.log(ev);
      if (ev === this.list.length - 1) {
        this.getMessage();
      }
    },
    // 点击购买按钮
    btnClickHandler(ev) {
      console.log(ev);
      wx.navigateTo({
        url: "/pages/goods_detail/main?id=" + ev
      });
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

  // 页面加载
  async onLoad(e) {
    // 列表
    const res = await util.request(api.IndexDuobao, "GET", this);
    if (res.data && res.code === 0) {
      // this.totalData = res.data;
      console.log(res.data);

      this.list = res.data.list;
      this.banner = res.data.banner;
      this.hasMore = res.data.hasMore;
    } else {
    }
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