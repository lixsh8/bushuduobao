<!-- 我的订单 -->
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
    <!-- 订单进度 -->
    <div
      class="process-sec"
      v-if="data&&data.join_state"
    >
      <div class="process">
        <div class="process-item process-1">
          <div class="process-t active">待开奖</div>
          <img
            src="https://resource.xiaotaotao123.cn/wxapp_img/logistics_process1.png"
            alt=""
          >
        </div>
        <div class="process-item process-2">
          <div
            class="process-t"
            :class="{active:data.join_state>1}"
          >已开奖</div>
          <img
            v-if="data.join_state>1"
            src="https://resource.xiaotaotao123.cn/wxapp_img/logistics_process2_active.png?v=201812001"
            alt=""
          >
          <img
            v-else
            src="https://resource.xiaotaotao123.cn/wxapp_img/logistics_process2.png?v=201812001"
            alt=""
          >
        </div>
        <div class="process-item process-3">
          <div
            class="process-t"
            :class="{active:data.join_state>8}"
          >待发货</div>
          <img
            v-if="data.join_state>8"
            src="https://resource.xiaotaotao123.cn/wxapp_img/logistics_process3_active.png?v=201812001"
            alt=""
          >
          <img
            v-else
            src="https://resource.xiaotaotao123.cn/wxapp_img/logistics_process3.png?v=201812001"
            alt=""
          >
        </div>
        <div class="process-item process-4">
          <div
            class="process-t"
            :class="{active:data.join_state>9}"
          >已发货</div>
          <img
            v-if="data.join_state>9"
            src="https://resource.xiaotaotao123.cn/wxapp_img/logistics_process4_active.png?v=201812001"
            alt=""
          >
          <img
            v-else
            src="https://resource.xiaotaotao123.cn/wxapp_img/logistics_process4.png?v=201812001"
            alt=""
          >
        </div>
      </div>
      <div class="process-desc">{{data.join_state_name}}</div>
    </div>

    <!-- 信息 -->
    <div
      class="info-sec"
      v-if="data"
    >
      <!-- 物流信息 -->
      <div
        class="logistics"
        v-if="data&&data.deliveryState==1 &&data.deliveryInfo"
        @click="gotologistics"
      >
        <img
          class="logistics-icon"
          :src="logisticsIcon"
          alt=""
        />
        <div class="logistics-info">
          <div class="logistics-node">{{data&&data.deliveryInfo&&data.deliveryInfo.title}}</div>
          <div class="logistics-time">{{data&&data.deliveryInfo&&data.deliveryInfo.time}}</div>
        </div>
        <img
          class="arr-r"
          src="/static/images/icon_arr_gray.png"
          alt=""
        >
      </div>
      <!-- 地址信息 -->
      <div
        class="address-panel"
        v-if="receivingState==1||receivingState==2"
      >
        <div
          class="has-address"
          v-if="receivingState==1 && receivingInfo"
        >
          <div class="info">
            <div class="r-name">收货人：{{receivingInfo.deliveryName}}</div>
            <div class="r-tel">{{receivingInfo.deliveryPhone}}</div>
          </div>
          <div class="address">收货地址：{{receivingInfo.deliveryAddress}}</div>
        </div>
        <div
          class="no-address"
          @click="gotoAddress"
          v-if="receivingState==2"
        >
          点击填写收货地址
        </div>
      </div>
      <!-- 产品信息 -->
      <div class="goods-panel">
        <div
          class="goods-info"
          @click="goDetail(data.is_id,data.dgoods_state)"
        >
          <img
            class="goods-avatar"
            :src="data.dgoods_image"
            alt=""
          >
          <div class="goods-title">{{data.dgoods_name}}</div>
        </div>
        <div class="price-info">
          <div class="price-item">
            <div class="price-t">参与总额</div>
            <div class="price-cnt">￥{{data.dgoods_hb}}</div>
          </div>
          <div
            class="price-item"
            v-if="data.freight"
          >
            <div class="price-t">运费</div>
            <div class="price-cnt">￥{{data.freight}}</div>
          </div>
        </div>

        <div class="price-total-wrapper">
          <div class="total-t">红包支付总价</div>
          <div class="total-num">￥{{data.dgoods_total_hb}}</div>
        </div>
      </div>
    </div>
    <!-- 我的号码和收益 -->
    <div
      class="income-panel"
      v-if="data"
    >
      <div
        class="income-item"
        :data-is_id="data.is_id"
        @click="goJoinList"
      >
        <div class="income-t">号码份数</div>
        <div class="income-num">{{data.buy_times}}</div>
        <img
          class="arr-r"
          src="/static/images/icon_arr_gray.png"
          alt=""
        >
      </div>
      <div
        class="income-item"
        :data-is_id="data.is_id"
        @click="goIncome"
      >
        <div class="income-t">当前收益</div>
        <div class="income-num">￥{{data.hb_amount}}</div>
        <img
          class="arr-r"
          src="/static/images/icon_arr_gray.png"
          alt=""
        >
      </div>
    </div>

    <!-- 订单信息 -->
    <div
      class="order-panel"
      v-if="data"
    >
      <div class="order-item">订单编号：{{data.order_id}}</div>
      <div class="order-item">下单时间：{{data.orderDate}}</div>
      <div
        class="order-item"
        v-if="data.prizeDate"
      >开奖时间：{{data.prizeDate}}</div>
      <div
        class="order-item"
        v-if="data.deliveryDate"
      >发货时间：{{data.deliveryDate}}</div>
      <div
        class="order-item"
        v-if="data.receivingDate"
      >收货时间：{{data.receivingDate}}</div>
      <div
        class="btn-copy"
        @click="copyOrderNo(data.order_id)"
      >复制</div>
    </div>

    <!-- 底部按钮客服 -->
    <div
      class="btns"
      v-if="data&&data.join_state==10"
    >
      <button
        open-type="contact"
        class="btn-kf"
      >
        <img
          :src="kfIcon"
          alt=""
          class="kf-icon"
        />
        <div class="kf-txt">联系客服</div>
      </button>

      <div
        class="receipt"
        @click.stop="confirmReceipt"
      >
        确认收货
      </div>
    </div>
    <button
      open-type="contact"
      class="btn-kf"
      v-else
    >
      <img
        :src="kfIcon"
        alt=""
        class="kf-icon"
      >
      <div class="kf-txt">联系客服</div>
    </button>

    <div class="btn-kf-cover"></div>

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

    <!-- 快速导航 -->
    <!-- <quick-navigate /> -->
  </div>
</template>

<script type="text/ecmascript-6">
import util from "@/utils/util";
import api from "@/utils/api";
// import request from "@/utils/request";
import headBar from "@/components/headBar";
import quickNavigate from "@/components/quickNavigate";
import lsDialog from "@/components/lsDialog";

var mta = require("@/utils/mta_analysis.js");

export default {
  data() {
    return {
      title: "订单详情",
      headerBackground: "#fff",
      titleColor: "black",
      showCustomBar: !0,
      customBarStyle: "black",
      // 弹窗
      showDialog: false,
      dialogTitle: "",
      dialogContent: "",
      openType: "",
      singleBtn: false,
      confirmText: "",

      orderId: "",
      from: "",
      receivingInfo: null,
      receivingState: "",
      data: null
    };
  },

  components: {
    headBar,
    quickNavigate,
    lsDialog
  },

  computed: {
    logisticsIcon() {
      return this.globalData.img_url + "icon_logistics.png";
    },
    kfIcon() {
      return this.globalData.img_url + "icon_kf.png";
    }
  },

  methods: {
    // 返回上一页
    back() {
      console.log("back func");
      if (this.from == "result") {
        wx.navigateBack({
          delta: 1,
          fail: function() {
            console.log("backFailed");

            wx.switchTab({ url: "/pages/index/main" });
          }
        });
      } else {
        wx.redirectTo({
          url:
            "/pages/order/main?ifBack=0&type=" +
              wx.getStorageSync("currentType") || ""
        });
      }
    },
    // 跳转到商品详情
    goDetail(is_id, dgoods_state) {
      if (dgoods_state == 1) {
        wx.navigateTo({
          url: "/pages/goods_detail/main?id=" + is_id
        });
      } else {
        wx.showToast({
          title: "商品已经下架",
          icon: "none"
        });
      }
    },
    // 跳转到收益规则
    goIncome() {
      wx.navigateTo({
        url:
          "/pages/income_rules/main?id=" +
          this.data.is_id +
          "&detail=1&income=" +
          this.data.hb_amount
      });
    },
    // 跳转到参与明细
    goJoinList() {
      wx.navigateTo({
        url: "/pages/join_list/main?id=" + this.data.is_id
      });
    },
    // 查看物流
    gotologistics() {
      wx.navigateTo({
        url: "/pages/logistics/main?id=" + this.data.delivery_id
      });
      console.log("查看物流");
    },
    // 确认收货
    async confirmReceipt() {
      var _this = this;
      console.log("确认收货");
      const res = await util.request(
        api.OrderReceive,
        {
          order_id: this.orderId
        },
        "GET",
        this
      );
      if (res.data && res.code === 0) {
        wx.showModal({
          title: "提示",
          content: "确认收货成功"
        });
        _this.getData(_this.orderId);
      } else {
        wx.showModal({
          title: "提示",
          content: "确认收货失败"
        });
      }
    },
    // 去微信选择地址
    goChooseAddress() {
      var _this = this;
      wx.chooseAddress({
        success: function(res) {
          var data = res;
          console.log(JSON.stringify(res));
          util
            .request(
              api.AddressSave,
              {
                order_id: _this.orderId,
                address: JSON.stringify(res)
              },
              "POST",
              this
            )
            .then(res => {
              console.log(res);
              if (res.code === 0) {
                console.log(data);

                _this.receivingState = 1;
                _this.receivingInfo = {};
                _this.receivingInfo.deliveryName = data.telNumber;
                _this.receivingInfo.deliveryPhone = data.userName;
                _this.receivingInfo.deliveryAddress =
                  data.provinceName +
                  data.cityName +
                  data.countyName +
                  data.detailInfo;
              } else {
                wx.showModal({
                  title: "提示",
                  content: "保存地址失败",
                  showCancel: true,
                  cancelText: "取消",
                  cancelColor: "#000000",
                  confirmText: "确定",
                  confirmColor: "#3CC51F",
                  success: res => {}
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    // 确定按钮关闭弹窗事件
    okBtnHandler() {
      // this.showDialog = false;
      wx.setStorageSync("mineHideDialog", "1");
      console.log(this.showDialog);
    },
    // 关闭弹窗
    closeDialog(ev) {
      console.log("closeDialog");

      this.showDialog = false;
    },
    // 选择地址
    gotoAddress() {
      var _this = this;

      wx.getSetting({
        success(res) {
          if (!res.authSetting["scope.address"]) {
            wx.authorize({
              scope: "scope.address",
              success() {
                _this.goChooseAddress();
              },
              fail() {
                console.log("系统自带的授权弹窗点了拒绝授权");
                // 自定义地址授权按钮弹窗
                _this.dialogTitle = "通讯地址授权失败，请重新授权";
                _this.dialogContent =
                  "为了方便你管理收货地址，步数换商品申请获取你的通讯地址";
                _this.confirmText = "去授权";
                _this.cancelText = "取消";
                _this.singleBtn = false;
                _this.openType = "openSetting";
                _this.showDialog = true;
              }
            });
          } else {
            _this.goChooseAddress();
          }
        }
      });
    },
    makePhoneCall() {
      wx.makePhoneCall({
        phoneNumber: this.data.servicePhone
      });
    },
    copyOrderNo(No) {
      wx.setClipboardData({
        data: No,
        success(res) {
          wx.getClipboardData({
            success(res) {
              wx.showToast({
                title: "复制成功"
              });
            }
          });
        }
      });
    },
    async getData(orderId) {
      const res = await util.request(
        api.OderDetail,
        {
          order_id: orderId
        },
        "GET",
        this
      );
      if (res.data && res.code === 0) {
        // this.totalData = res.data;
        console.log(res.data);

        this.data = res.data;
        this.receivingState = res.data.receivingState;
        this.receivingInfo = res.data.receivingInfo;
      } else {
      }
    }
  },
  onLoad(e) {
    // mta统计
    mta.Page.init();

    var orderId = this.$root.$mp.query.orderId;
    this.from = this.$root.$mp.query.from;
    this.orderId = orderId;
    console.log(orderId);

    this.getData(orderId);
  },
  onShow() {
    // 跳转到其他地方授权回来关闭弹窗
    if (wx.getStorageSync("mineHideDialog") == "1") {
      this.showDialog = false;
    }
  }
};
</script>

<style lang='scss'>
@import "../../common/style/variable";
@import "../../common/style/mixin";

page {
  background: #f2f2f2;
}

.process-sec {
  background: #fffaf9;
  height: 123px;

  .process {
    font-size: 0;
    text-align: center;
    padding-top: 17px;

    .process-item {
      display: inline-block;
      font-size: 14px;
      line-height: 1;

      .process-t {
        color: #d9d1cf;
        padding-bottom: 10px;

        &.active {
          color: #ff5540;
        }
      }
      img {
        display: block;
        width: 100%;
        height: 32px;
      }
    }
    .process-1,
    .process-4 {
      width: 47px;
    }
    .process-2,
    .process-3 {
      width: 64px;
    }
  }

  .process-desc {
    padding-top: 15px;
    text-align: center;
    line-height: 1;
    font-size: 12px;
    color: #444;
  }
}

.info-sec {
  margin-top: 12px;
  padding: 0 15px;
  background: #fff;

  .logistics {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #e8edf0;

    .logistics-icon {
      display: block;
      flex-shrink: 0;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .logistics-info {
      flex: 1;
      margin-left: 10px;

      .logistics-node {
        font-size: 14px;
        color: #4a90e2;
        line-height: 16px;
        @include mult_line_ellipsis_2;
      }
      .logistics-time {
        font-size: 12px;
        color: #aaaeb9;
      }
    }
    .arr-r {
      width: 15px;
      height: 15px;
      flex-shrink: 0;
    }
  }

  .address-panel {
    border-bottom: 1px solid #f2f2f2;
    font-size: 14px;
    color: #333;
    line-height: 1;
    padding: 18px 0;

    .info {
      display: flex;
      flex-direction: row;
      padding-bottom: 10px;

      .r-name {
        width: 50%;
      }
      .r-tel {
        width: 50%;
        text-align: right;
      }
    }

    .no-address {
      text-align: center;
      background: url(#{$img_url}/icon_arr_gray.png) no-repeat right center;
      background-size: 15px;
    }
  }

  .goods-panel {
    .goods-info {
      display: flex;
      flex-direction: row;
      padding: 15px 0;

      .goods-avatar {
        width: 60px;
        height: 60px;
        display: block;
        flex-shrink: 0;
        margin-right: 10px;
      }
      .goods-title {
        flex: 1;
        @include mult_line_ellipsis_2;
        font-size: 14px;
        color: #aaaeb9;
        line-height: 20px;
        height: 36px;
      }
    }

    .price-info {
      padding: 0 0 24px 0;

      .price-item {
        display: flex;
        flex-direction: row;
        padding-bottom: 5px;
        line-height: 1;
        font-size: 14px;

        .price-t {
          width: 50%;
          color: #333;
        }
        .price-cnt {
          width: 50%;
          color: #aaaeb9;
          text-align: right;
        }
      }
    }

    .price-total-wrapper {
      padding: 17px 0;
      border-top: 1px solid #e8edf0;
      line-height: 1;
      font-size: 0;
      text-align: right;
      color: #333;

      .total-t {
        display: inline-block;
        font-size: 14px;
      }
      .total-num {
        display: inline-block;
        padding-left: 15px;
        font-size: 14px;
        color: #ff5454;
      }
    }
  }
}

.income-panel {
  margin-top: 12px;
  padding: 12px 15px;
  background: #fff;

  .income-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 6px 0;
    font-size: 14px;

    .income-t {
      width: 50%;
      flex-shrink: 0;
      color: #333;
    }
    .income-num {
      flex: 1;
      color: #ff5454;
      text-align: right;
    }
    .arr-r {
      width: 15px;
      height: 15px;
      flex-shrink: 0;
    }
  }
}

.order-panel {
  position: relative;
  padding: 16px 15px;
  margin-top: 12px;
  background: #ffffff;

  .order-item {
    font-size: 12px;
    color: #aaaeb9;
    line-height: 1;
    padding: 6px 0;
  }

  .btn-copy {
    width: 51px;
    height: 16px;
    position: absolute;
    top: 20px;
    right: 15px;
    line-height: 16px;
    text-align: center;
    font-size: 12px;
    color: #070707;
    border: 1px solid #42474b;
  }
}

.btn-kf {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 0;
  text-align: center;
  background: #fff;
  border-radius: none;

  .kf-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: middle;
  }
  .kf-txt {
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    color: #333;
    padding-left: 6px;
  }
}
.btn-kf-cover {
  height: 50px;
  padding-top: 12px;
}
button::after {
  border-radius: 0;
  box-shadow: none;
  border: 0;
}
.btns {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  background: #fff;
  justify-content: space-around;
  align-items: center;

  .btn-kf {
    display: inline-block;
    position: relative;
    width: 40%;
    height: 36px;
    line-height: 36px;
    flex-shrink: 0;
    padding: 0;
    margin: 0;
    border: 1px solid #ccc;
  }

  .receipt {
    width: 40%;
    display: inline-block;
    height: 36px;
    line-height: 36px;
    text-align: center;
    flex-shrink: 0;
    font-size: 14px;
    color: #fff;
    background: #ff5454;
    border: 1px solid #ff5454;
    border-radius: 5px;
  }
}
</style>