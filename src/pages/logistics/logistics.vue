<!-- 我的订单 -->
<template>
  <div style="height:100%;">
    <head-bar
      :title="title"
      :headerBackground="headerBackground"
      :titleColor="titleColor"
      :showCustomBar="showCustomBar"
      :customBarStyle="customBarStyle"
      :headerHeight="headerHeight"
    />

    <!-- 正文 -->
    <div class="deliver-detail" v-if="logistics">
      <div class="deliver-detail-info">
        <div class="deliver-detail-info-left">
          <image
            class="deliver-detail-info-left-pic"
            :src="logistics.img"
          ></image>
        </div>
        <div class="deliver-detail-info-right">
          <div class="deliver-detail-info-right-list deliver-detail-info-right-status">物流状态：<div class="deliver-detail-info-right-list-state">{{logistics.state}}</div>
          </div>
          <div class="deliver-detail-info-right-list deliver-detail-info-right-campany">承运公司：{{logistics.name}}</div>
          <div class="deliver-detail-info-right-list deliver-detail-info-right-id">运单编号：{{logistics.nu}}</div>
          <div
            class="deliver-detail-info-right-list deliver-detail-info-right-tel"
            v-if="logistics.companyType!=1"
          >官方电话：<div class="deliver-detail-info-right-list-tel">{{logistics.servicePhoneNum}}</div>
          </div>
        </div>
      </div>

      <div
        class="deliver-detail-list"
        >
        <div
          class="deliver-detail-list-item"
          v-for="(item,index2) in logistics.data"
          :key="index2"
         >
          <div class="deliver-detail-list-item-context">
            <div class="deliver-detail-list-item-context-point deliver-detail-list-item-context-point-index"></div>
            {{item.context}}
          </div>
          <div class="deliver-detail-list-item-bottom">
            <div class="deliver-detail-list-item-bottom-subContext">
              {{item.time}}
            </div>
            <div class="deliver-detail-list-item-bottom-line"></div>
          </div>
        </div>
      </div>
      <!-- <div class="deliver-detail-tip">
        物流信息来自：
        <div class="deliver-detail-tip-color">{{logistics.jumpTitle}}</div>
      </div> -->
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import headBar from "@/components/headBar";
import util from "@/utils/util";
import api from "@/utils/api";

var mta = require("@/utils/mta_analysis.js");

export default {
  data() {
    return {
      title: "我的订单",
      headerBackground: "#fff",
      titleColor: "black",
      showCustomBar: !0,
      customBarStyle: "black",
      headerHeight: 46,
      logistics: null
    };
  },

  components: {
    headBar
  },

  computed: {
    headBarHeight() {
      return this.globalData.statusBarHeight + this.headerHeight;
    }
  },

  methods: {
    async getData(deliveryId) {
      const res = await util.request(
        api.Logistics,
        {
          delivery_id: deliveryId
        },
        "GET",
        this
      );
      if (res.data && res.code === 0) {
        // this.totalData = res.data;
        console.log(res.data);

        this.logistics = res.data;
      } else {
      }
    }
  },
  onShow(ev) {
    // console.log(this.globalData.statusBarHeight);
  },
  onLoad() {
    // mta统计
    mta.Page.init();
    var deliveryId = this.$root.$mp.query.id;

    this.getData(deliveryId)
  }
};
</script>

<style lang='scss' scoped>
@import "../../common/style/mixin";
@import "../../common/style/curtain";

.deliver-detail-info {
  height: 220rpx;
  background: #ffffff;
  color: #43474c;
}

.deliver-detail-info-left {
  margin-left: 30rpx;
  margin-top: 30rpx;
  float: left;
}

.deliver-detail-info-left-pic {
  width: 160rpx;
  height: 160rpx;
}

.deliver-detail-info-right {
  margin-left: 30rpx;
  margin-top: 30rpx;
  float: left;
}

.deliver-detail-info-right-list {
  font-size: 30rpx;
}

.deliver-detail-info-right-list-state {
  color: #ff5647;
  display: inline;
}

.deliver-detail-info-right-list-tel {
  color: #6da5ff;
  display: inline;
}

.deliver-detail-list {
  background: #ffffff;
  margin-top: 30rpx;
  padding-top: 30rpx;
  padding-bottom: 30rpx;
}

.deliver-detail-list-item {
  font-size: 26rpx;
}

.deliver-detail-list-item-context {
  color: #43474c;
  margin-left: 60rpx;
  position: relative;
}

.deliver-detail-list-item-context-point {
  position: absolute;
  left: -30rpx;
  background-image: url("https://img1.zhuanstatic.com/open/zhuanzhuan/zzwa/main/deliver/point-gray.png");
  background-size: cover;
  width: 20rpx;
  height: 26rpx;
  display: inline-block;
  margin-right: 10rpx;
}

.deliver-detail-list-item-context-point-0 {
  background-image: url("https://img1.zhuanstatic.com/open/zhuanzhuan/zzwa/main/deliver/point-red.png");
}

.deliver-detail-list-item-bottom {
  margin-left: 40rpx;
  border-left: 1px solid #e8ebf0;
  padding-bottom: 30rpx;
}

.deliver-detail-list-item-bottom-subContext {
  color: #b2b8c2;
  margin-left: 25rpx;
  width: 550rpx;
}

.deliver-detail-list-item-bottom-line {
  width: 650rpx;
  height: 1px;
  background: #e8ebf0;
  margin-left: 25rpx;
  position: relative;
  top: 15rpx;
}

.deliver-detail-tip {
  color: #43474c;
  font-size: 28rpx;
  margin-left: 30rpx;
  margin-top: 30rpx;
  margin-bottom: 128rpx;
}

.deliver-detail-tip-color {
  display: inline;
  color: #ff5a21;
}

.deliver-detail-modify {
  position: fixed;
  bottom: 0;
  background: #ff5647;
  width: 100%;
  height: 98rpx;
  line-height: 98rpx;
  text-align: center;
  font-family: PingFangHK-Regular;
  font-size: 36rpx;
  color: #ffffff;
  letter-spacing: 0;
}
</style>