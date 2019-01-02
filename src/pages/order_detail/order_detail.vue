<!-- 我的订单 -->
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
        v-if="data.deliveryState==1"
        @click="gotologistics"
      >
        <img
          class="logistics-icon"
          :src="logisticsIcon"
          alt=""
        />
        <div class="logistics-info">
          <div class="logistics-node">{{data.deliveryInfo.title}}</div>
          <div class="logistics-time">{{data.deliveryInfo.time}}</div>
        </div>
        <img
          class="arr-r"
          src="/static/images/icon_arr_gray.png"
          alt=""
        >
      </div>
      <!-- 地址信息 -->
      <div class="address-panel">
        <div
          class="has-address"
          v-if="data.receivingState==1"
        >
          <div class="info">
            <div class="r-name">收货人：{{data.receivingInfo.deliveryName}}</div>
            <div class="r-tel">{{data.receivingInfo.deliveryPhone}}</div>
          </div>
          <div class="address">收货地址：{{data.receivingInfo.deliveryAddress}}</div>
        </div>
        <div
          class="no-address"
          @click="gotoAddress"
          v-if="data.receivingState==2"
        >
          去添加地址
        </div>
      </div>
      <!-- 产品信息 -->
      <div class="goods-panel">
        <div class="goods-info">
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
            <div class="price-cnt">参￥{{data.dgoods_hb}}</div>
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
      class="btn-kf"
      @click="makePhoneCall"
    >
      <img
        :src="kfIcon"
        alt=""
        class="kf-icon"
      >
      <div class="kf-txt">电话客服</div>
    </div>
    <div class="btn-kf-cover"></div>

    <!-- 快速导航 -->
    <quick-navigate />
  </div>
</template>

<script type="text/ecmascript-6">
import util from "@/utils/util";
import api from "@/utils/api";
// import request from "@/utils/request";
import headBar from "@/components/headBar";
import quickNavigate from "@/components/quickNavigate";

export default {
  data() {
    return {
      title: "订单详情",
      headerBackground: "#fff",
      titleColor: "black",
      showCustomBar: !0,
      customBarStyle: "black",
      isNet: !0,
      data: null
    };
  },

  components: {
    headBar,
    quickNavigate
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
      console.log('查看物流');
      
    },
    // 选择地址
    gotoAddress() {
      wx.chooseAddress({
        success: function(res) {
          console.log(JSON.stringify(res));
          const res = await util.request(
              api.AddressSave,
              {
                address: JSON.stringify(res)
              },
              "POST",
              this
            );
            if (res.data && res.code === 0) {
              // this.totalData = res.data;
              console.log(res.data);

              this.data = res.data;
            } else {
            }
        }
      })
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
    }
  },
  async onLoad(e) {
    var orderId = e.orderId;

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
    } else {
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
</style>