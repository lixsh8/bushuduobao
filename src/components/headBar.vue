<template>
  <div>
    <div
      class="header"
      :style="{height: headerHeightTotal + 'px', background: headerBackground}"
    >
      <div
        class="header-title"
        :style="{color: titleColor}"
      >
        {{title}}

        <block v-if="showCustomBar">
          <view
            class="_c71564c"
            v-if="customBarStyle==='white'"
          >
            <image
              @click="navBack"
              class="back _c71564c"
              mode="aspectFit"
              src="/static/images/whiteBack.png"
            />
            <image
              @click="navIndex"
              class="index _c71564c"
              mode="aspectFit"
              src="/static/images/whiteHome.png"
            />
          </view>
          <view
            class="_c71564c"
            v-else
          >
            <image
              @click="navBack"
              class="back _c71564c"
              mode="aspectFit"
              src="/static/images/blackBack.png"
            />
            <image
              @click="navIndex"
              class="index _c71564c"
              mode="aspectFit"
              src="/static/images/blackHome.png"
            />
          </view>
        </block>
      </div>
    </div>
    <div
      class="cover"
      :style="{height: headerHeightTotal + 'px'}"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "步数夺宝"
    },
    headerHeight: {
      type: Number,
      default: 46
    },
    headerBackground: {
      type: String,
      default: "#fff"
    },
    titleColor: {
      type: String,
      default: "#000"
    },
    showCustomBar: {
      type: Boolean,
      default: !1
    },
    customBarStyle: {
      type: String,
      default: "black"
    }
  },
  computed: {
    headerHeightTotal() {
      return this.headerHeight + this.globalData.statusBarHeight;
    }
  },
  methods: {
    navBack() {
      wx.navigateBack({
        delta: 1
      });
    },
    navIndex() {
      wx.switchTab({
        url: "/pages/index/main"
      });
    }
  },
  created() {
  }
};
</script>

<style  scoped lang='scss'>
.header {
  width: 100%;
  height: 66px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  .header-title {
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 10;
    font-family: PingFang-SC-Medium;
    font-weight: 600;
    font-size: 36rpx;
    color: black;
  }

  .back {
    width: 24.5rpx;
    height: 42rpx;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 20rpx 20rpx;
  }

  .index {
    width: 44rpx;
    height: 44rpx;
    position: absolute;
    bottom: 0;
    left: 60rpx;
    padding: 20rpx 10rpx;
  }
}
.cover {
  width: 100%;
}
</style>
