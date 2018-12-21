<!-- 分类组件 -->
<template>
  <div class='message'>
    <swiper
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
      vertical="true"
      :current="currentTab"
      @change="changeTab"
    >
      <swiper-item  class="sg_line_ellipsis"
        v-for="(item, index) in messages"
        :key="index"
      >
        <text>{{item}}</text>
      </swiper-item>
    </swiper>
    <div class="cover"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      currentTab: 0
    };
  },

  props: ["messages", "indicatorDots", "autoplay", "interval", "duration"],

  methods: {
    changeTab(e) {
      let currentId = e.mp.detail.current;
      this.$emit("change", currentId);
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../common/common";

.message {
  width: 250px;
  height: 24px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;

  swiper,
  swiper-item {
    height: 24px;
  }

  .cover {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>