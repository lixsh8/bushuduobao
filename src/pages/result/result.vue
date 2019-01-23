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

    <div
      class="share-panel"
      v-if="showMsg"
    >
      <div class="title">{{(data&&data.text)||""}}</div>
      <div class="num">{{(data&&data.sub_text)||""}}</div>
      <div class="share-btn-wrapper">
        <button
          class="share-btn"
          @click="dbbtnClickHandler"
          openType="share"
        >{{(data&&data.btn_text)||""}}
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
      :dialogType="dialogType"
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
      dialogType: "",
      showDialog: false,
      dialogTitle: "",
      dialogContent: "",
      openType: "",
      singleBtn: true,
      confirmText: "",
      hasClickShareBtn: false,

      banner: null,
      showMsg: true,
      id: "",
      orderId: "",
      dgoods_id: "",
      data: null,
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
    // 按钮点击事件处理函数
    dbbtnClickHandler() {
      var _this = this;

      // 翻倍按钮点击成功后
      _this.hasClickShareBtn = true;
      // const resDoubleReward = await util.request(
      //     api.DoubleReward,
      //     { sign: _this.sign },
      //     "GET",
      //     this
      //   );
    },
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
      wx.navigateBack({
        delta: 1
      });
      // wx.redirectTo({
      //   url: "/pages/goods_detail/main?id=" + this.id + "&ifBack=0"
      // });
    },
    // 点击购买按钮
    btnClickHandler(ev) {
      console.log(ev);
      // wx.redirectTo({
      //   url: "/pages/goods_detail/main?id=" + ev + "&ifBack=0"
      // });
      wx.setStorageSync("is_id", ev);
      wx.navigateBack({
        delta: 1
      });
    },
    // 点击查看订单详情
    goOrderDetail() {
      wx.navigateTo({
        url: "/pages/order_detail/main?from=result&orderId=" + this.orderId
      });
    },
    // 保存图片
    // savePic() {
    //   wx.showToast({
    //     title: "正在保存图片...",
    //     icon: "loading",
    //     duration: 20000,
    //     mask: true,
    //     success: res => {}
    //   });

    //   wx.getImageInfo({
    //     src: "https://resourcecdn.xiaotaotao123.cn/wxapp_img/result_banner.png",
    //     success: function(sres) {
    //       wx.saveImageToPhotosAlbum({
    //         filePath: sres.path,
    //         success: function(res) {
    //           console.log(res);
    //           if (res.errMsg === "saveImageToPhotosAlbum:ok") {
    //             wx.showModal({
    //               title: "提示",
    //               content: "图片已经保存到相册，可以到微信去分享了",
    //               showCancel: false,
    //               confirmText: "确定",
    //               confirmColor: "#3CC51F",
    //               success: res => {}
    //             });
    //           }
    //         },
    //         complete: function() {
    //           wx.hideToast();
    //         }
    //       });
    //     }
    //   });
    // }
    async getData(orderId, dgoods_id) {
      // 列表
      const res = await util.request(
        api.DuobaoResult,
        {
          id: orderId,
          dgoods_id: dgoods_id
        },
        "GET",
        this
      );
      if (res.data && res.code === 0) {
        // this.totalData = res.data;
        console.log(res.data);
        if (res.data.has_reward > 0) {
          this.showMsg = true;
        } else {
          this.showMsg = false;
        }
        this.data = res.data;
        this.list = res.data.list;
        this.shareData = res.data.share;

        // 好友贡献弹窗
        // this.dialogTitle = "恭喜获得";
        // this.dialogContent = "参与兑商品收益" + res.data.fuli_amount + "元";
        // this.confirmText = "收下";
        // this.showDialog = true;
      } else {
      }
    }
  },

  // 分享
  onShareAppMessage(res) {
    console.log(res);
    var resData = res[0];
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

  onUnload() {
    console.log("unload");

    this.hasClickShareBtn = false;
    this.showDialog = false;
    this.data = null;
    this.list = null;
    this.shareData = null;
  },

  // 页面加载
  async onLoad(e) {
    // mta统计
    mta.Page.init();

    this.orderId = this.$root.$mp.query.orderId;
    this.id = this.$root.$mp.query.id;
    this.dgoods_id = this.$root.$mp.query.dgoods_id;
    this.showMsg = true;
    console.log("this.orderId=, this.dgoods_id=", this.orderId, this.dgoods_id);
    this.getData(this.orderId, this.dgoods_id);
  },

  // 页面显示
  async onShow(e) {
    var _this = this;
    console.log(_this.hasClickShareBtn);
    // 是否点击了分享按钮去翻倍
    if (_this.hasClickShareBtn) {
      // 发送请求去翻倍 DoubleReward
      const resDoubleReward = await util.request(
        api.DuobaoResultDB,
        { sign: _this.data.sign },
        "GET",
        this
      );
      console.log(resDoubleReward);
      if (resDoubleReward && resDoubleReward.code == 0) {
        // 隐藏显示结果
        _this.showMsg = false;
        // this.totalData = res.data;
        // 翻倍按钮点击成功后
        _this.dialogType = this.data.reward_type == "fulihb" ? "pack" : "tili";
        _this.dialogContent = resDoubleReward.msg;
        _this.confirmText = "收下";
        _this.showDialog = true;
        _this.openType = "";
      } else {
        wx.showModal({
          title: "提示",
          content: resDoubleReward.msg
        });
      }

      _this.openType = "";
      _this.hasClickShareBtn = false;
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
  width: 340px;
  height: 322px;
  margin: -24px auto 10px auto;
  background: url(#{$img_url}result_bg.png) no-repeat center;
  background-size: 100%;
  position: relative;

  .title {
    padding-top: 100px;
    text-align: center;
    font-size: 18px;
    line-height: 1;
    color: #9B9B9B;
  }

  .num {
    padding-top: 15px;
    text-align: center;
    font-size: 35px;
    line-height: 1;
    color: #ff3a39;
    font-weight: bold;
  }

  .share-btn-wrapper {
    display: flex;
    flex-direction: row;
    position: absolute;
    bottom: 30px;
    width: 100%;

    .share-btn {
      display: block;
      border: none !important;
      width: 210px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 16px;
      color: #fff;
      background: linear-gradient(
        135deg,
        rgba(255, 106, 107, 1) 0%,
        rgba(255, 58, 57, 1) 100%
      ) !important;
      border-radius: 20px;
      animation: breathe 1.2s infinite linear;
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
@keyframes breathe {
  0% {
    transform: scale(0.95);
  }

  17% {
    transform: scale(1);
  }

  33% {
    transform: scale(1.05);
  }

  66% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.95);
  }
}
</style>