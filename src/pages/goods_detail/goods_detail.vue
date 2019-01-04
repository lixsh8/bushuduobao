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
    <!-- banner -->
    <div class="banner">
      <div
        class="box indexBanner"
        v-if="duobaoData&&duobaoData.goodsInfo&&duobaoData.goodsInfo.dgoods_image.length>0"
      >
        <swiper
          :autoplay="config.autoplay"
          :circular="config.circular"
          :duration="config.duration"
          :indicatorActiveColor="config.indicatorActiveColor"
          :indicatorColor="config.indicatorColor"
          :indicatorDots="config.indicatorDots"
          :interval="config.interval"
          v-if="duobaoData.goodsInfo.dgoods_image.length>1"
        >
          <swiper-item
            catchtap="onBanner"
            class="banner-wrap"
            v-for="(img, index) in duobaoData.goodsInfo.dgoods_image"
            :key="index"
          >
            <img
              class="pic"
              mode="widthFix"
              :src="img"
            />
          </swiper-item>
        </swiper>
      </div>
    </div>

    <!-- info -->
    <div
      class="info"
      v-if="duobaoData&&duobaoData.goodsInfo"
    >
      <div class="price">
        <img
          :src="icon_pack_sm"
          alt=""
        />
        <div class="sale-price">￥{{duobaoData.goodsInfo.dgoods_hb}}</div>
        <div class="source-price-t">市场价<div class="source-price">￥{{duobaoData.goodsInfo.dgoods_market_price}}</div>
        </div>
      </div>

      <div class="goods-name">{{duobaoData.goodsInfo.dgoods_name}}</div>
      <!-- 进度条 -->
      <div
        class="progress"
        style=""
      >
        <div class="progress-bar">
          <div
            class="progress-cnt"
            :style="{width: duobaoData.goodsInfo.is_rate}"
          ></div>
        </div>
        <div class="progress-desc">
          <div class="progress-desc-total">满{{duobaoData.goodsInfo.is_totalnum}}份开奖</div>
          <div class="progress-desc-left">差{{duobaoData.goodsInfo.is_oddnum}}份</div>
        </div>
      </div>
      <!-- 已开奖 -->
      <div
        class="award"
        v-if="duobaoData&&duobaoData.prizeInfo"
      >
        <div class="avatar-box">
          <img
            :src="duobaoData.prizeInfo.avatarUrl"
            alt=""
          />
          <div class="username">{{duobaoData.prizeInfo.nickName}}</div>
        </div>
        <div class="award-bd">
          <div class="award-item">中奖号码：{{duobaoData.prizeInfo.winNumber}}</div>
          <div class="award-item">本期参与：{{duobaoData.prizeInfo.buyTimes}}</div>
          <div class="award-item">中奖时间：{{duobaoData.prizeInfo.date}}</div>
        </div>
      </div>

      <div class="my-join-wrapper">
        <div class="my-join">
          <div class="my-join-hd">我的号码</div>
          <div class="my-join-bd">{{duobaoData.buyNumbers||"0"}}</div>
        </div>
        <div class="my-money">
          <div class="my-money-hd">当前收益</div>
          <div
            v-if="duobaoData.hb_amount==0"
            class="my-money-bd"
            @click="goIncome()"
          >¥{{duobaoData.hb_amount||"0"}}</div>
          <div
            class="my-money-bd-emy"
            v-else
            @click="goIncome()"
          >
            参与后获得
            <img
              :src="helpIcon"
              alt=""
            >
          </div>
        </div>
      </div>

      <div
        class="join-count"
        @click="goJoinList()"
      >
        <div class="join-count-t">已有{{duobaoData.joinNumber}}人参与</div>
        <img
          src="/static/images/icon_arr_gray.png"
          alt=""
        />
      </div>
    </div>

    <!-- 商品详情和往期揭晓tab -->
    <div class="tab">
      <div class="tab-nav">
        <div
          class="nav-item"
          :class="{active: currentTab == 0}"
          @click="changeTab(0)"
        >商品详情</div>
        <div
          class="nav-item"
          :class="{active: currentTab == 1}"
          @click="changeTab(1)"
        >往期揭晓</div>
      </div>
      <div class="tab-content">
        <div
          class="content-item"
          :class="{active: currentTab == 0}"
        >
          <wx-parse
            v-if="article"
            :content="article"
            @preview="preview"
            @navigate="navigate"
          />
        </div>

        <div
          class="content-item"
          :class="{active: currentTab == 1}"
        >
          <div
            class="duobao-list"
            v-if="historyList&&historyList.length>0"
          >

            <div
              class="duobao-item"
              v-for="item in historyList"
              :key="item.id"
            >
              <div class="duobao-hd">
                <div class="user-t">中奖者：</div>
                <img
                  class="user-avatar"
                  :src="item.avatarUrl"
                  alt=""
                />
                <div class="user-name">{{item.nickName}}</div>
                <div class="time">中奖时间 {{item.date}}</div>
              </div>

              <div class="duobao-bd">
                <img
                  :src="item.dgoods_image"
                  alt=""
                  class="duobao-avatar"
                />
                <div class="duobao-info">
                  <div class="duobao-title">{{item.dgoods_name}}</div>
                  <div class="no">中奖号码：{{item.winNumber}}</div>
                  <div class="num">本期参与：{{item.buyTimes}}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- 购买弹窗 -->
    <buyModal
      :showBuyModal="showBuyModal"
      :totalNum="totalNum"
      :leftNum="leftNum"
      :buyNum="buyNum"
      :totalPrice="totalPrice"
      @closeBuyModal="closeBuyModal"
      @changeNum="changeNum"
      @makeBuy="makeBuy"
    />
    <!-- 返回頂部 -->
    <back-top :showBackTop="showBackTop&&currentTab==1" />
    <!-- 底部没有更多 -->
    <paging-footer
      :showNoMore="showNoMore"
      noMoreTips="没有更多数据了"
    />
    <!-- 底部按钮 -->
    <div
      class="fixed-btn"
      @click="gotobuy"
    >立即参与</div>
    <!-- 快速导航 -->
    <!-- <quick-navigate /> -->
    <!-- 机会不足弹窗 -->
    <ls-dialog
      :showDialog="showDialog"
      :openType="openType"
      :dialogTitle="dialogTitle"
      :dialogContent="dialogContent"
      @okBtnHandler="okBtnHandler"
      @closeDialog="closeDialog"
    />
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
import lsDialog from "@/components/lsDialog";

export default {
  data() {
    return {
      title: "商品详情",
      headerBackground: "#fff",
      titleColor: "black",
      showCustomBar: !0,
      customBarStyle: "black",
      // 轮播图配置
      config: {
        current: 0,
        indicatorDots: !0,
        indicatorColor: "#ccc",
        indicatorActiveColor: "#808080",
        autoplay: !1,
        interval: 5000,
        duration: 500,
        circular: !0
      },
      banners: [],
      article: "",
      // 购买期数id
      is_id: "",
      // 商品id
      dgoods_id: "",
      duobaoData: null,
      currentTab: 0,
      page: 1,
      hasMore: !0,
      showNoMore: !1,
      canScroll: !0,
      scrollTimer: null,
      showBuyModal: !1,
      buyNum: 1,
      leftNum: 0,
      totalNum: 0,
      price: 0,
      totalPrice: 0,
      showDialog: !1,
      dialogTitle: "参与机会不足",
      dialogContent: "可邀请好友赞助更多机会哦！",
      openType: "share",
      historyList: []
    };
  },

  components: {
    headBar,
    backTop,
    pagingFooter,
    quickNavigate,
    buyModal,
    lsDialog,
    wxParse
  },

  computed: {
    icon_pack_sm() {
      return this.globalData.img_url + "icon_pack_sm.png";
    },
    helpIcon() {
      return this.globalData.img_url + "icon_help_gray.png";
    }
  },

  mounted(ev) {
    console.log(this.globalData.resourceUrl);
  },

  methods: {
    changeTab(idx) {
      this.currentTab = idx;
    },
    preview(src, e) {
      // do something
    },
    navigate(href, e) {
      // do something
    },
    // 弹出购买弹窗
    gotobuy() {
      console.log("showBuyModal");
      this.showBuyModal = !0;
    },
    // 购买
    async makeBuy() {
      const res = await util.request(
        api.JoinDuobao,
        { buy_times: this.buyNum, is_id: this.is_id },
        "POST",
        this
      );
      if (res.data && res.code === 0) {
        wx.navigateTo({
          url: "/pages/result/main?id=" + this.is_id + "&orderId=" + res.data.order_id
        });
      } else if (res.code === 402) {
        this.showDialog = !0;
      } else {
        wx.showModal({
          title: "提示",
          content: res.msg || "购买失败",
          showCancel: true,
          cancelText: "取消",
          cancelColor: "#000000",
          confirmText: "确定",
          confirmColor: "#3CC51F",
          success: res => {}
        });
      }
    },
    changeNum(e) {
      var num = e || 0;
      this.buyNum = num;
      this.totalPrice = num * this.price;
      console.log(this.buyNum);
    },
    // 关闭购买弹窗
    closeBuyModal() {
      this.showBuyModal = !1;
    },
    // 关闭dialog
    closeDialog() {
      console.log("closeDialog--click");
      this.showDialog = !1;
    },
    // 跳转到收益规则
    goIncome() {
      wx.navigateTo({
        url:
          "/pages/income_rules/main?id=" +
          this.is_id +
          "&income=" +
          this.duobaoData.hb_amount
      });
    },
    // 跳转到参与明细
    goJoinList() {
      console.log("goJoinList");

      wx.navigateTo({
        url: "/pages/join_list/main?id=" + this.is_id
      });
    }
  },

  // 分享
  onShareAppMessage(res) {
    if (res.from === "button") {
      // 来自页面内转发按钮
      console.log(res);
      return {
        title: this.totalData.share.title,
        imageUrl: this.totalData.share.img,
        path: this.totalData.share.link
      };
    }
    return {
      title: this.totalData.share.title,
      imageUrl: this.totalData.share.img,
      path: this.totalData.share.link
    };
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
        api.DuobaoHistory,
        { page: page, dgoods_id: this.dgoods_id },
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
  async onLoad() {
    var id = this.$root.$mp.query.id;
    console.log(id);

    // var id = e.id;
    // 夺宝详情
    const res = await util.request(api.DuobaoDetail, { id: id }, "GET", this);
    if (res.data && res.code === 0) {
      // this.totalData = res.data;
      console.log(res.data);
      let info = res.data.goodsInfo;

      this.duobaoData = res.data;
      this.title = res.data.title;
      this.is_id = info.is_id;
      this.dgoods_id = info.dgoods_id;
      this.article = info.dgoods_body;
      this.totalNum = info.is_totalnum;
      this.leftNum = info.is_oddnum;
      this.price = info.dgoods_hb;
      this.totalPrice = info.dgoods_hb;
    } else {
    }

    // 往期回顾
    const resDuobaoHistory = await util.request(
      api.DuobaoHistory,
      { page: 1, dgoods_id: this.dgoods_id },
      "GET",
      this
    );
    if (resDuobaoHistory.data && resDuobaoHistory.code === 0) {
      // this.totalData = resDuobaoHistory.data;
      console.log(resDuobaoHistory.data);

      this.historyList = resDuobaoHistory.data.list;
      this.hasMore = resDuobaoHistory.data.hasMore;
    } else {
    }
  }
};
</script>

<style lang='scss'>
@import "../../common/style/variable";
page {
  padding-bottom: 50px;
}

.banner {
  padding: 0 15px;

  swiper {
    display: block;
    height: 345px;
  }

  swiper-item {
    display: flex;
    align-items: center;
  }

  img {
    display: block;
    width: 345px;
    height: 345px;
  }
}

.info {
  padding: 10px 15px;
  border-bottom: 10px solid #f5f5f5;

  .price {
    display: flex;
    flex-direction: row;
    align-items: center;
    line-height: 1;

    img {
      display: block;
      width: 20px;
      height: 20px;
    }

    .sale-price {
      flex: 1;
      font-size: 18px;
      color: #ff3b30;
    }
    .source-price-t {
      width: 136px;
      font-size: 12px;
      color: #9b9b9b;
      text-align: right;
    }
    .source-price {
      display: inline-block;
      font-size: 12px;
      color: #9b9b9b;
      text-decoration: line-through;
    }
  }

  .goods-name {
    padding: 7px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    color: #333;
  }
  .progress {
    .progress-bar {
      position: relative;
      width: 100%;
      height: 10px;
      border-radius: 5px;
      background: #e6e6e6;
    }
    .progress-cnt {
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 10px;
      background: #ff3b30;
      border-radius: 5px;
    }
    .progress-desc {
      display: flex;
      flex-direction: row;
      padding: 10px 0 15px 0;
      font-size: 12px;
      line-height: 1;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);

      .progress-desc-total {
        width: 50%;
        color: #9b9b9b;
      }
      .progress-desc-left {
        width: 50%;
        color: #ff3b30;
        text-align: right;
      }
    }
  }
  /* 开奖结果 */
  .award {
    display: flex;
    flex-direction: row;
    padding: 15px 0;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    background: url(#{$img_url}/award_bg.png) no-repeat center;
    background-size: 100%;

    .avatar-box {
      img {
        display: block;
        margin: 0 auto;
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
      .username {
        width: 80px;
        height: 23px;
        padding: 0 15px;
        margin: 0 auto;
        text-align: center;
        font-size: 12px;
        color: #fff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        background: url(#{$img_url}/award_name_bg.png) no-repeat center;
        background-size: 100%;
        box-sizing: border-box;
      }
    }

    .award-bd {
      padding-left: 12px;

      .award-item {
        font-size: 14px;
        line-height: 20px;
        color: #000;
      }
    }
  }

  .my-join-wrapper {
    display: flex;
    flex-direction: row;
    padding: 15px 0;
    line-height: 1;

    .my-join,
    .my-money {
      width: 50%;
      text-align: center;
    }
    .my-join-hd,
    .my-money-hd {
      font-size: 12px;
      color: #9b9b9b;
    }
    .my-join-bd,
    .my-money-bd {
      padding-top: 10px;
      font-size: 18px;
      color: #ff3b30;
    }
    .my-money-bd-emy {
      padding-top: 10px;
      font-size: 16px;
      color: #bebebe;
      line-height: 1;

      img {
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }
    }
  }

  .join-count {
    font-size: 0;
    text-align: center;

    .join-count-t {
      display: inline-block;
      font-size: 12px;
      color: #9b9b9b;
      vertical-align: middle;
    }
    img {
      display: inline-block;
      width: 15px;
      height: 15px;
      vertical-align: middle;
    }
  }
}

.tab {
  .tab-nav {
    font-size: 0;
    border-bottom: 10px solid #f5f5f5;
    text-align: center;

    .nav-item {
      display: inline-block;
      padding: 12px 10px;
      vertical-align: middle;
      font-size: 15px;
      line-height: 13px;
      color: #9b9b9b;

      &.active {
        font-size: 18px;
        color: #000;
      }
    }
  }

  .tab-content {
    .content-item {
      display: none;

      &.active {
        display: block;
      }

      img {
        display: block;
        width: 100%;
      }
    }
  }

  .duobao-list {
    .duobao-item {
      background: #fff;

      .duobao-hd {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        padding: 10px 15px;
        font-size: 12px;
        color: #999;
        line-height: 1;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);

        .user-t {
          flex-shrink: 0;
          width: 49px;
          padding-left: 3px;
          border-left: 2px solid #ff3b30;
        }
        .user-avatar {
          flex-shrink: 0;
          width: 15px;
          height: 15px;
          border-radius: 50%;
        }
        .user-name {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .time {
          width: 180px;
          flex-shrink: 0;
          text-align: right;
        }
      }

      .duobao-bd {
        display: flex;
        flex-direction: row;
        padding: 10px 15px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);

        .duobao-avatar {
          width: 90px;
          height: 90px;
          margin-right: 10px;
          flex-shrink: 0;
        }
        .duobao-info {
          padding-top: 5px;
          flex: 1 0 0;
          overflow: hidden;

          .duobao-title,
          .no,
          .num {
            width: 100%;
            padding: 7px 0;
            font-size: 14px;
            color: #333;
            line-height: 1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}

.fixed-btn {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  color: #fff;
  font-size: 18px;
  line-height: 50px;
  background: linear-gradient(
    135deg,
    rgba(255, 106, 107, 1) 0%,
    rgba(255, 58, 57, 1) 100%
  );
}
</style>