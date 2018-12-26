<template>
  <!-- 快速导航 -->
  <div class="quick-navigate _051ee37">
    <div
      class="_051ee37"
      v-if="show"
    >
      <div
        class="navigation _051ee37"
        style="transform: translate3d(0,0, 0);"
        v-if="!showCircleNavigation"
        @click="changeNav"
      >
        <div class="navigation-bar _051ee37">
          <div
            @click="enterPage"
            class="navigation-item _051ee37"
            v-for="(item,index) in navigationData"
            :key="index"
          >
            <div class="navigation-item-wrap _051ee37">
              <div
                class="navigation-item-wrap-icon _051ee37"
                style="background-image:url('item.iconUrl');width:item.widthrpx;height:item.heightrpx"
              ></div>
              <div class="navigation-item-wrap-text _051ee37">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="circlenavigation _051ee37"
        style="transform: translate3d(0,0, 0);"
        v-if="showCircleNavigation"
        @click="changeNav"
      >
        <div class="circlenavigation-text _051ee37">快捷导航</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      show: !0,
      showCircleNavigation: !0,
      navigationData: [
        {
          name: "首页",
          backColor: "#ffffff",
          iconUrl:
            "https://pic6.zhuanstatic.com/zhuanzh/n_v2af76559a49c447cdb18bbd91031f96e2.png",
          id: "home",
          pagePath: "/pages/index/index",
          width: 28,
          height: 29
        },
        {
          name: "我的助力",
          backColor: "#ffffff",
          iconUrl:
            "https://pic4.zhuanstatic.com/zhuanzh/n_v207be4104839c46829d923eceb486138e.png",
          id: "help",
          pagePath: "/pages/activity/oneCoinFree?tab=right",
          width: 27,
          height: 30
        },
        {
          name: "订单",
          backColor: "#ffffff",
          iconUrl:
            "https://pic6.zhuanstatic.com/zhuanzh/n_v2d13f15c497c646a683a8c7d7ea5e91d3.png",
          pagePath: "/subPages/order/order",
          id: "order",
          width: 25,
          height: 29
        },
        {
          name: "",
          backColor: "#ffffff",
          iconUrl:
            "https://pic1.zhuanstatic.com/zhuanzh/n_v24862b02b7289445180bf62677bf13bf2.png",
          id: "show",
          width: 18,
          height: 28
        }
      ],
      quickNavigate: {
        show: !1
      },
      eleOffset: {
        x: 0,
        y: 0
      },
      moveAct: {
        lastX: 0,
        lastY: 0,
        lastTimestamp: 0
      }
    };
  },

  props: {},

  components: {},

  computed: {},

  mounted(ev) {},

  methods: {
    changeNav() {
      this.showCircleNavigation = !this.showCircleNavigation
    },
    enterPage() {}
  }
};
</script>

<style lang='scss' scoped>
@import "../common/style/12";
</style>