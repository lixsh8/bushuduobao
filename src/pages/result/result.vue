<!-- 新人专区 -->
<template>
  <div style="height:100%;">
    <head-bar
      :title="title"
      :headerBackground="headerBackground"
      :titleColor="titleColor"
      :showCustomBar="showCustomBar"
      :customBarStyle="customBarStyle"
      ifCustomBack="true"
      @back="back"
    />

    <!-- 正文 -->
    <!-- banner -->
    <div class="banner">
      <div class="suc-tips"><img
          mode="widthFix"
          :src="sucTxt"
          alt=""
        ></div>
      <div
        class="btn-order"
        @click="goOrderDetail"
      >订单详情</div>
    </div>

    <div class="share-panel">
      <img
        class="share-img"
        mode="widthFix"
        :src="bannerImg"
      />
      <div class="share-btn-wrapper">
        <button
          class="share-btn"
          openType="share"
        >
          <img
            :src="hyImg"
            alt=""
          >
          <div class="btn-title">晒单给好友</div>
        </button>
        <!-- <div
          class="share-btn"
          @click="savePic"
        >
          <img
            :src="pyqImg"
            alt=""
          >
          <div class="btn-title">保存海报</div>
        </div> -->
      </div>
    </div>

    <!-- list -->
    <div class="list-title"><img
        mode="widthFix"
        :src="listTitle"
        alt=""
      ></div>
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

    <!-- 无数据 -->
    <no-data :showNoData="!list||list.length<=0" />

    <!-- 弹窗 -->
    <ls-dialog
      @closeDialog="closeDialog"
      @okBtnHandler="okBtnHandler"
      :showDialog="showDialog"
      :dialogTitle="dialogTitle"
      :dialogContent="dialogContent"
      :openType="openType"
      :singleBtn="singleBtn"
      :confirmText="confirmText"
    />

    <!-- 返回頂部 -->
    <back-top :showBackTop="showBackTop" />

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
import lsDialog from "@/components/lsDialog";

var mta = require("@/utils/mta_analysis.js");

export default {
  data() {
    return {
      title: "兑换成功",
      headerBackground: "#fff",
      titleColor: "black",
      showCustomBar: !0,
      customBarStyle: "black",
      // 弹窗
      showDialog: false,
      dialogTitle: "",
      dialogContent: "",
      openType: "",
      singleBtn: true,
      confirmText: "",

      banner: null,
      id: "",
      orderId: "",
      dgoods_id: "",
      shareData: {},
      list: null
    };
  },

  components: {
    headBar,
    goodsItem,
    backTop,
    quickNavigate,
    rulesModal,
    lsDialog
  },

  computed: {
    bannerImg() {
      return this.globalData.img_url + "result_banner.png";
    },
    hyImg() {
      return this.globalData.img_url + "icon_hy.png";
    },
    pyqImg() {
      return this.globalData.img_url + "icon_pyq.png";
    },
    listTitle() {
      return this.globalData.img_url + "like_title.png";
    },
    sucTxt() {
      return this.globalData.img_url + "sucTxt.png";
    }
  },

  methods: {
    // 确定按钮关闭弹窗事件
    okBtnHandler() {
      this.showDialog = false;
    },
    // 关闭弹窗
    closeDialog(ev) {
      console.log("closeDialog");

      this.showDialog = false;
    },
    // 返回上一页
    back() {
      console.log("back func");
      wx.redirectTo({
        url: "/pages/goods_detail/main?id=" + this.id + "&ifBack=0"
      });
    },
    // 点击购买按钮
    btnClickHandler(ev) {
      console.log(ev);
      wx.navigateTo({
        url: "/pages/goods_detail/main?id=" + ev
      });
    },
    // 点击查看订单详情
    goOrderDetail() {
      wx.navigateTo({
        url: "/pages/order_detail/main?from=result&orderId=" + this.orderId
      });
    },
    // 保存图片
    savePic() {
      wx.showToast({
        title: "正在保存图片...",
        icon: "loading",
        duration: 20000,
        mask: true,
        success: res => {}
      });

      wx.getImageInfo({
        src: "https://resourcecdn.xiaotaotao123.cn/wxapp_img/result_banner.png",
        success: function(sres) {
          wx.saveImageToPhotosAlbum({
            filePath: sres.path,
            success: function(res) {
              console.log(res);
              if (res.errMsg === "saveImageToPhotosAlbum:ok") {
                wx.showModal({
                  title: "提示",
                  content: "图片已经保存到相册，可以到微信去分享了",
                  showCancel: false,
                  confirmText: "确定",
                  confirmColor: "#3CC51F",
                  success: res => {}
                });
              }
            },
            complete: function() {
              wx.hideToast();
            }
          });
        }
      });
    }
  },

  // 分享
  onShareAppMessage(res) {
    console.log(res);
    var resData = res[0]
    if (resData.from === "button") {
      // 来自页面内转发按钮
      return util.getCommonShareData(
        this.shareData.title,
        this.shareData.image,
        this.shareData.link
      );
    }
    return util.getCommonShareData(
      this.shareData.title,
      this.shareData.image,
      this.shareData.link
    );
  },

  // 页面加载
  async onLoad(e) {
    // mta统计
    mta.Page.init();
    this.orderId = this.$root.$mp.query.orderId;
    this.id = this.$root.$mp.query.id;
    this.dgoods_id = this.$root.$mp.query.dgoods_id;
    console.log("this.orderId=" + this.orderId);
    // 列表
    const res = await util.request(
      api.DuobaoResult,
      {
        id: this.orderId,
        dgoods_id: this.dgoods_id
      },
      "GET",
      this
    );
    if (res.data && res.code === 0) {
      // this.totalData = res.data;
      console.log(res.data);

      this.list = res.data.list;
      this.shareData = res.data.share;

      // 好友贡献弹窗
      this.dialogTitle = "恭喜获得";
      this.dialogContent = "参与兑商品收益" + res.data.fuli_amount + "元";
      this.confirmText = "收下";
      this.showDialog = true;
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
  background: url(#{$img_url}result_top_banner.png) no-repeat center;
  background-size: 100%;
  text-align: center;

  .suc-tips {
    width: 151px;
    height: 33px;
    margin: 0 auto;
    padding-top: 33px;
    padding-bottom: 10px;

    img {
      display: block;
      width: 100%;
    }
  }

  .btn-order {
    display: inline-block;
    width: 90px;
    padding: 5px 12px 5px 8px;
    margin: 0 auto;
    text-align: center;
    font-size: 14px;
    line-height: 1;
    color: #fff;
    border-radius: 12px;
    border: 1px solid #fff;
    box-sizing: border-box;
    background: url(#{$img_url}icon_arr_r_white.png) no-repeat 95% center;
    background-size: 14px;
  }
}

.share-panel {
  width: 306px;
  margin: -24px auto 10px auto;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  padding: 12px;

  .share-img {
    display: block;
    width: 100%;
  }

  .share-btn-wrapper {
    display: flex;
    flex-direction: row;
    margin-top: 22px;

    .share-btn {
      width: 50%;
      display: block;
      background: none !important;
      border: none !important;

      img {
        display: block;
        width: 44px;
        height: 44px;
        margin: 0 auto;
      }

      .btn-title {
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

button::after {
  border: none;
}

/* 商品列表 */
.list-title {
  width: 182px;
  height: 16px;
  margin: 30px auto 20px auto;

  img {
    display: block;
    width: 100%;
  }
}
.goods-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>