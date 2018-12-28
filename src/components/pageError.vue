<!-- 网络错误等没有网络的情况下 -->
<template>
  <div
    @click="refresh"
    class="tip"
    v-if="showPageError"
  >
    <img
      class="error-icon "
      :src="errorIcon"
    />
    <div class="error-tip ">{{errorTip}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  props: {
    showPageError: {
      type: Boolean,
      default: !0
    },
    errorTip: {
      type: String,
      default: "唔，网络不给力，轻触屏幕重试"
    },
    errorIcon: {
      type: String,
      default: "/static/images/net_err.png"
    }
  },
  methods: {
    refresh() {
      // this.reloadFn && this.reloadFn();
      console.log('1')
      this.$emit('refresh')
    }
  }
};
</script>

<style lang='scss' scoped>
.tip {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100000000;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: PingFangSC-Regular;
  font-size: 24rpx;
  color: #909090;

  .error-icon {
    width: 260rpx;
    height: 259rpx;
  }
}
</style>