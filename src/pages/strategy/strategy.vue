<!-- 兑换攻略 -->
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
    <div class="imgs">
      <img
        :src="glImg1"
        alt=""
        mode="widthFix"
      />
      <img
        :src="glImg2"
        alt=""
        mode="widthFix"
      />
      <img
        :src="glImg3"
        alt=""
        mode="widthFix"
      />
      <img
        :src="glImg4"
        alt=""
        mode="widthFix"
      />
    </div>

    <div
      class="btns"
      @click="goDetail"
    >
      <div class="btn-1">查看</div>
      <div class="btn-2">详细规则</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import headBar from "@/components/headBar";
// import util from "@/utils/util";
// import api from "@/utils/api";
// import request from "@/utils/request";

export default {
  data() {
    return {
      title: "兑换攻略",
      headerBackground: "#fff",
      titleColor: "black",
      showCustomBar: !0,
      customBarStyle: "black"
    };
  },

  components: {
    headBar
  },

  computed: {
    glImg1() {
      return this.globalData.img_url + "gl01.png";
    },
    glImg2() {
      return this.globalData.img_url + "gl02.png";
    },
    glImg3() {
      return this.globalData.img_url + "gl03.png";
    },
    glImg4() {
      return this.globalData.img_url + "gl04.png";
    }
  },

  methods: {
    // 详细规则
    goDetail() {
      wx.navigateTo({
        url: "/pages/detail_rules/main"
      });
    }
  },

  // 页面加载
  async onLoad() {
    // var { id, income, detail } = this.$root.$mp.query;
  }
};
</script>

<style lang='scss'>
@import "../../common/style/variable";

page {
  background: #fdebe7;
}
.imgs {
  width: 100%;

  img {
    display: block;
    width: 100%;
  }
}

.btns {
  padding: 20px 15px;
  text-align: center;

  .btn-1 {
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    color: #6c1f1f;
  }
  .btn-2 {
    padding-left: 6px;
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    color: #4a90e2;
  }
}
</style>