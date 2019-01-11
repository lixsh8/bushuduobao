<!-- 分类组件 -->
<template>
  <div class='message'>
    <swiper
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
      :circular="circular"
      vertical="true"
      @change="changeTab"
    >
      <swiper-item  class="sg_line_ellipsis"
        v-for="(item, index) in messages"
        :key="index"
      >
        <!-- <text>{{item}}</text> -->
        <rich-text :nodes="item"></rich-text>
      </swiper-item>
    </swiper>
    <div class="cover"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
    };
  },

  // props: ["messages", "indicatorDots", "autoplay", "interval", "duration"],
  props: {
    messages: {
      type: Array,
      default: []
    },
    indicatorDots: {
      type: Boolean,
      default: !1
    },
    circular: {
      type: Boolean,
      default: !0
    },
    autoplay: {
      type: Boolean,
      default: !0
    },
    interval: {
      type: Number,
      default: 3000
    },
    duration: {
      type: Number,
      default: 1000
    }
  },

  methods: {
    changeTab(e) {
      let currentId = e.mp.detail.current;
      // console.log(currentId);
      
      this.$emit("change", currentId);
    }
  }
};
</script>

<style lang='scss' scoped>

.message {
  width: 250px;
  height: 24px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;

  swiper,
  swiper-item {
    height: 24px;
    line-height: 24px;
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