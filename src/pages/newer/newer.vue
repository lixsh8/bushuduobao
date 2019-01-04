<!-- 新人专区 -->
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
    <!-- banner -->
    <div
      class="banner"
      v-if="banner"
    >
      <img
        :src="banner"
        alt=""
        mode="widthFix"
      >
      <div
        class="rule-btn"
        @click="showRules"
      >活动规则</div>
    </div>

    <!-- list -->
    <div
      class="goods-list"
      v-if="list"
    >
      <block
        v-for="item in list"
        :key="item.is_id"
      >
        <goodsItem
          :goodsItem="item"
          @btnClickHandler="btnClickHandler"
        />
      </block>
    </div>

    <!-- 返回頂部 -->
    <back-top :showBackTop="showBackTop" />
    <!-- 规则弹窗 -->
    <rules-modal
      :ifShowRules="ifShowRules"
      :rules="rules"
      @clsRulesModal="clsRulesModal"
    />

    <!-- 快速导航 -->
    <quick-navigate />
  </div>
</template>

<script type="text/ecmascript-6">
import util from "@/utils/util";
import api from "@/utils/api";
// import request from "@/utils/request";
import headBar from "@/components/headBar";
import goodsItem from "@/components/goodsItem";
import quickNavigate from "@/components/quickNavigate";
import backTop from "@/components/backTop";
import rulesModal from "@/components/rulesModal";

export default {
  data() {
    return {
      title: "新人专区",
      headerBackground: "#fff",
      titleColor: "black",
      showCustomBar: !0,
      customBarStyle: "black",
      // banner: null,
      ifShowRules: !1,
      list: null
    };
  },

  components: {
    headBar,
    goodsItem,
    backTop,
    quickNavigate,
    rulesModal
  },

  computed: {
    banner() {
      return this.globalData.img_url + "banner_newer.png";
    }
  },

  methods: {
    // 规则弹窗
    showRules() {
      this.ifShowRules = !0;
    },
    clsRulesModal() {
      this.ifShowRules = !1;
    },
    // 点击购买按钮
    btnClickHandler(ev) {
      console.log(ev);
      wx.navigateTo({
        url: "/pages/goods_detail/main?id=" + ev
      });
    }
  },

  // 页面加载
  async onLoad(e) {
    // 列表
    const res = await util.request(api.IndexNewZone, "GET", this);
    if (res.data && res.code === 0) {
      // this.totalData = res.data;
      console.log(res.data);

      this.list = res.data.list;
      this.rules = res.data.rules;
      // this.banner = res.data.banner
      this.hasMore = res.data.hasMore;
    } else {
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../../common/style/variable";

.banner {
  position: relative;

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  .rule-btn {
    position: absolute;
    top: 10px;
    right: 0;
    width: 60px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    font-size: 12px;
    color: #fff;
    border-radius: 12px 0 0 12px;
    background: rgba(0, 0, 0, 0.5);
  }
}

/* 商品列表 */
.goods-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>