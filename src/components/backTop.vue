<!-- 分类组件 -->
<template>
  <div
    v-show="showBackTop"
    class='back-top'
    @click="backTop"
  >
    <img
      :src="backTopIcon"
      mode="widthFix"
      alt=""
    >
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      showBackTop: false
    };
  },
  computed: {
    backTopIcon() {
      return this.globalData.img_url + 'back_top.png';
    }
  },

  onPageScroll(ev) {
    var wh = 667;
    try {
      const res = wx.getSystemInfoSync();
      wh = res.windowHeight;
    } catch (e) {
      // Do something when catch error
    }
    if (ev.scrollTop >= wh) {
      this.showBackTop = true;
    } else {
      this.showBackTop = false;
    }
  },

  methods: {
    backTop(ev) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  }
};
</script>

<style lang='scss' scoped>
.back-top {
  position: fixed;
  width: 50px;
  height: 50px;
  bottom: 50px;
  right: 0;
  z-index: 5;

  img {
    display: block;
    width: 50px;
    height: 50px;
  }
}
</style>