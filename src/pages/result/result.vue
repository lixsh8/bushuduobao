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
    <div class="banner">
      <div class="suc-tips">参与成功</div>
      <div class="btn-order">订单详情</div>
    </div>

    <div class="share-panel">
      <img
        class="share-img"
        mode="widthFix"
        src="http://img12.360buyimg.com/n1/jfs/t2014/94/1522737578/284282/12f3dd7f/56c6d05aN2bb596ad.jpg"
      />
      <div class="share-btn-wrapper">
        <div class="share-btn">
          <img
            src="/static/images/tab/duobao_selected.png"
            alt=""
          >
          <div class="btn-title">晒单给好友</div>
        </div>
        <div class="share-btn">
          <img
            src="/static/images/tab/duobao_selected.png"
            alt=""
          >
          <div class="btn-title">保存海报</div>
        </div>
      </div>
    </div>

    <!-- list -->
    <div class="list-title"></div>
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
      title: "兑换成功",
      headerBackground: "#fff",
      titleColor: "black",
      showCustomBar: !0,
      customBarStyle: "black",
      banner: null,
      ifShowRules: !0,
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
      this.banner = res.data.banner;
      this.hasMore = res.data.hasMore;
    } else {
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../../common/style/variable";

.banner {
  width: 100%;
  height: 146px;
  background: url(#{$img_url}duobao_bg.png) no-repeat center;
  background-size: 100%;

  .suc-tips {
    width: 100%;
    padding-top: 33px;
    padding-bottom: 14px;
    font-size: 24px;
    color: #fff;
    line-height: 1;
    text-align: center;
  }

  .btn-order {
    width: 80px;
    height: 24px;
    margin: 0 auto;
    line-height: 24px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    border-radius: 12px;
    border: 1px solid #fff;
    box-sizing: border-box;
  }
}

.share-panel {
  width: 306px;
  margin: -24px auto 10px auto;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  padding: 12px;

  .share-img{
    display: block;
    width: 100%;
  }

  .share-btn-wrapper{
    display: flex;
    flex-direction: row;
    margin-top: 22px;

    .share-btn{
      width: 50%;

      img{
        display: block;
        width: 44px;
        height: 44px;
        margin: 0 auto;
      }

      .btn-title{
        padding-top: 8px;
        padding-bottom: 26px;
        text-align: center;
        line-height: 1;
        font-size: 14px;
        color: #666;
      }
    }
  }
}

/* 商品列表 */
.list-title{
  width: 100%;
  height: 14px;
  background: url(#{$img_url}) no-repeat center;
  background-size: 100%;
}
.goods-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>