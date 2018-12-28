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
    <div class="process-sec">
      <div class="process">
        <div class="process-item process-1">
          <div class="process-t">待开奖</div>
          <img
            src="https://resource.xiaotaotao123.cn/wxapp_img/logistics_process1.png"
            alt=""
          >
        </div>
        <div class="process-item process-2">
          <div class="process-t">待开奖</div>
          <img
            src="https://resource.xiaotaotao123.cn/wxapp_img/logistics_process2.png?v=201812001"
            alt=""
          >
        </div>
        <div class="process-item process-3">
          <div class="process-t">待开奖</div>
          <img
            src="https://resource.xiaotaotao123.cn/wxapp_img/logistics_process3.png?v=201812001"
            alt=""
          >
        </div>
        <div class="process-item process-4">
          <div class="process-t">待开奖</div>
          <img
            src="https://resource.xiaotaotao123.cn/wxapp_img/logistics_process4.png?v=201812001"
            alt=""
          >
        </div>
      </div>
      <div class="process-desc">恭喜中奖，已发货</div>
    </div>

    <!-- 信息 -->
    <div class="info-sec">
      <!-- 物流信息 -->
      <div class="logistics">
        <img
          class="logistics-icon"
          :src="logisticsIcon"
          alt=""
        />
        <div class="logistics-info">
          <div class="logistics-node">[代收点]已签收，签收人凭取货码签收。感谢您使用中通快递已签收，签收人凭取货码签收。感谢您使用中通快递</div>
          <div class="logistics-time">2018-12-19 23:49:52</div>
        </div>
        <img
          class="arr-r"
          src="/static/images/icon_arr_gray.png"
          alt=""
        >
      </div>
      <!-- 地址信息 -->
      <div class="address-panel">
        <div class="info">
          <div class="r-name">收货人：HAPPY</div>
          <div class="r-tel">13682989812</div>
        </div>
        <div class="address">收货地址：深圳市南山区西丽街道</div>
      </div>
      <!-- 产品信息 -->
      <div class="goods-panel">
        <div class="goods-info">
          <img
            class="goods-avatar"
            src="https://resource.xiaotaotao123.cn/wxapp_img/avatar.png"
            alt=""
          >
          <div class="goods-title">原宿文艺女帆布包 商品规格：32cm*36cm 工测量误差见谅 商品描述：高品质涤棉牛...</div>
        </div>
        <div class="price-info">
          <div class="price-item">
            <div class="price-t">参与总额</div>
            <div class="price-cnt">参￥9.00</div>
          </div>
          <div class="price-item">
            <div class="price-t">运费</div>
            <div class="price-cnt">参￥9.00</div>
          </div>
        </div>

        <div class="price-total-wrapper">
          <div class="total-t">红包支付总价</div>
          <div class="total-num">￥100</div>
        </div>
      </div>
    </div>
    <!-- 我的号码和收益 -->
    <div class="income-panel">
      <div class="income-item">
        <div class="income-t">号码份数</div>
        <div class="income-num">52</div>
        <img
          class="arr-r"
          src="/static/images/icon_arr_gray.png"
          alt=""
        >
      </div>
      <div class="income-item">
        <div class="income-t">当前收益</div>
        <div class="income-num">￥511112</div>
        <img
          class="arr-r"
          src="/static/images/icon_arr_gray.png"
          alt=""
        >
      </div>
    </div>

    <!-- 订单信息 -->
    <div class="order-panel">
      <div class="order-item">订单编号：075355839266603030</div>
      <div class="order-item">下单时间：2018-12-19 23:49:52</div>
      <div class="order-item">开奖时间：1075355839266603030</div>
      <div class="order-item">下单时间：2018012-19 23:49:52</div>
      <div
        class="btn-copy"
        @click="copyOrderNo('123456789')"
      >复制</div>
    </div>

    <!-- 底部按钮客服 -->
    <div
      class="btn-kf"
      @click="makePhoneCall"
      v-if="!isNet"
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
      navs: [
        { id: 1, name: "全部" },
        { id: 2, name: "已开奖" },
        { id: 3, name: "已开奖" },
        { id: 4, name: "已开奖" },
        { id: 5, name: "已开奖" }
      ],
      list: [1, 2, 3, 4]
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

  onLoad(ev) {
    // console.log(util.wxRequest)
  },

  methods: {
    makePhoneCall() {
      console.log(this.reloadFn);
      this.reloadFn();
      // wx.makePhoneCall({
      //   phoneNumber: "15888888888"
      // });
    },
    copyOrderNo(No) {
      util.request(
        "http://api.xiaotaotao123.cn/application/mobile/index.php?act=little&op=getToken",
        null,
        "GET",
        this
      );

      // wx.setClipboardData({
      //   data: No,
      //   success(res) {
      //     wx.getClipboardData({
      //       success(res) {
      //         wx.showToast({
      //           title: "复制成功"
      //         });
      //       }
      //     });
      //   }
      // });
    }
  }
};
</script>

<style lang='scss'>
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
      color: #ff5540;

      .process-t {
        padding-bottom: 10px;
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