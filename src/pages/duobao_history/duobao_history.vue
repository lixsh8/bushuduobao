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
    <div class="tab">
      <div class="tab-content">
        <div class="content-item active">
          <div
            class="duobao-list"
            v-if="historyList&&historyList.length>0"
          >

            <div
              class="duobao-item"
              @click="goDetail"
              v-for="item in historyList"
              :data-is_id="item.is_id"
              :key="item.is_id"
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

          <!-- 无数据 -->
          <no-data :showNoData="!historyList||historyList.length<=0" />
        </div>
      </div>
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
import { setTimeout, clearTimeout } from "timers";
import headBar from "@/components/headBar";
import quickNavigate from "@/components/quickNavigate";
import backTop from "@/components/backTop";
import pagingFooter from "@/components/pagingFooter";
import noData from "@/components/noData";

export default {
  data() {
    return {
      title: "最新开奖",
      headerBackground: "#fff",
      titleColor: "black",
      showCustomBar: !0,
      customBarStyle: "black",
      page: 1,
      hasMore: !0,
      showNoMore: !1,
      canScroll: !0,
      scrollTimer: null,
      historyList: []
    };
  },

  components: {
    headBar,
    backTop,
    pagingFooter,
    noData,
    quickNavigate
  },

  methods: {
    // 跳转详情
    goDetail(e) {
      console.log(e);

      wx.navigateTo({
        url: "/pages/goods_detail/main?id=" + e.currentTarget.dataset.is_id
      });
    }
  },

  // 滚动加载更多
  async onReachBottom() {
    if (this.hasMore && this.canScroll) {
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
        { page: page },
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
    // 往期回顾
    const resDuobaoHistory = await util.request(
      api.DuobaoHistory,
      { page: 1 },
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