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
        :class="{active: currentTab===index}"
        :style="{width: (100/navs.length) + '%'}"
        v-for="(item, index) in navs"
        :key="index"
        @click="changeTab(index)"
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
      >
        <div class="item-hd">
          <div class="order-no">订单号:1075355839266603030</div>
          <div class="order-status">恭喜中奖，已发货</div>
        </div>
        <div class="item-bd">
          <img
            src="https://resource.xiaotaotao123.cn/wxapp_img/avatar.png"
            class="avatar"
          />
          <div class="info">
            <div class="title">【秒杀即将结束】亚克力小夜灯(商 品材质： 亚克力+PP+电子元件...</div>
            <div class="count-wrapper">号码份数：<div class="count">5</div>
            </div>
          </div>
        </div>
        <div class="item-ft">
          <div
            class="btn-logistics"
            @click="goLogistics(item)"
          >查看物流</div>
        </div>
      </div>

    </div>

    <!-- 快速导航 -->
    <!-- <quick-navigate /> -->
    <back-top />

  </div>
</template>

<script type="text/ecmascript-6">
import headBar from "@/components/headBar";
import backTop from "@/components/backTop";
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
        { id: 1, name: "全部" },
        { id: 2, name: "已开奖" },
        { id: 3, name: "已开奖" },
        { id: 4, name: "已开奖" },
        { id: 5, name: "已开奖" }
      ],
      currentTab: 0,
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14, 15]
    };
  },

  components: {
    headBar,
    backTop,
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
    changeTab(idx) {
      this.currentTab = idx;
    },
    goLogistics(oid) {
      wx.navigateTo({ url: "/pages/logistics/main?orderId=" + oid });
    }
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