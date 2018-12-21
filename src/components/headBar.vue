<template>
  <div>
    <div
      class="header"
      :style="{height: headerHeightTotal + 'px', background: headerBackground}"
    >
      <div
        class="header-title"
        :style="{color: titleColor}"
      >{{title}}</div>
    </div>
    <div class="cover" :style="{height: headerHeightTotal + 'px'}"></div>
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
    }
  },
  computed: {
    headerHeightTotal() {
      return this.headerHeight + this.statusBarHeight;
    }
  },
  created() {
    wx.getSystemInfo({
      success: res => {
        // 导航高度
        this.statusBarHeight = res.statusBarHeight;
      },
      fail(err) {
        console.log(err);
      }
    });
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
}
.cover{
  width: 100%;
}
</style>
