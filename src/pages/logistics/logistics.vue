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
    <div class="deliver-detail">
      <div class="deliver-detail-info">
        <div class="deliver-detail-info-left">
          <image
            class="deliver-detail-info-left-pic"
            :src="logisticsInfo.companyPic"
          ></image>
        </div>
        <div class="deliver-detail-info-right">
          <div class="deliver-detail-info-right-list deliver-detail-info-right-status">物流状态：<div class="deliver-detail-info-right-list-state">{{logisticsInfo.state}}</div>
          </div>
          <div class="deliver-detail-info-right-list deliver-detail-info-right-campany">承运公司：{{logisticsInfo.companyType==1?'--':logisticsInfo.companyName}}</div>
          <div class="deliver-detail-info-right-list deliver-detail-info-right-id">运单编号：{{logisticsInfo.logisticsNumber==1?'--':logisticsInfo.logisticsNumber}}</div>
          <div
            class="deliver-detail-info-right-list deliver-detail-info-right-tel"
            v-if="logisticsInfo.companyType!=1"
          >官方电话：<div class="deliver-detail-info-right-list-tel">{{logisticsInfo.servicePhoneNum}}</div>
          </div>
        </div>
      </div>

      <div
        class="deliver-detail-list"
        v-for="(logisticsItem,index1) in logisticsDetail"
        :key="index1"
      >
        <div
          class="deliver-detail-list-item"
          v-for="(item,index2) in logisticsItem.data"
          :key="index2"
        >
          <div class="deliver-detail-list-item-context">
            <div class="deliver-detail-list-item-context-point deliver-detail-list-item-context-point-index"></div>
            {{item.content}}
          </div>
          <div class="deliver-detail-list-item-bottom">
            <div class="deliver-detail-list-item-bottom-subContext">
              {{item.subContent}}
            </div>
            <div class="deliver-detail-list-item-bottom-line"></div>
          </div>
        </div>
      </div>
      <div class="deliver-detail-tip">
        物流信息来自：
        <div class="deliver-detail-tip-color">{{logisticsInfo.jumpTitle}}</div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import headBar from "@/components/headBar";

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
      logisticsInfo: {
        servicePhoneNum: "95311",
        companyType: "0",
        companyName: "中通速递",
        bottomText:
          "<font color='#333333'>部分物流信息由</font><font color='#ff472e'>菜鸟裹裹</font><font color='#333333'>提供</font>",
        canModifyDeliver: "0",
        companyPic:
          "http://img.58cdn.com.cn/zhuanzhuanftp/images/kuaidi/pic-zhongtong@3x.png",
        bottomJumpUrl:
          "http://newconnection.cainiao.com/act/check-download.html?source=10014022",
        jumpTitle: "菜鸟裹裹",
        state: "已签收",
        logisticsNumber: "75118420085789",
        logisticsDetail: [
          {
            sortId: 10,
            icon:
              "http://img.58cdn.com.cn/zhuanzhuan/zz/kuaidi/normal_logistics_icon.png",
            title: "物流动态",
            data: [
              {
                content:
                  "【深圳市】 快件已在 【深圳桃源】 签收, 签收人: 菜鸟, 如有疑问请电联:13149908822 / 0755-36550506, 您的快递已经妥投, 如果您对我们的服务感到满意, 请给个五星好评, 鼓励一下我们【请在评价快递员处帮忙点亮五颗星星哦~】",
                subContent: "2018-12-23 14:13:06",
                time: "1545545586000"
              },
              {
                content: "【深圳市】 快件到达 【深圳桃源】",
                subContent: "2018-12-23 08:44:03",
                time: "1545525843000"
              },
              {
                content: "【深圳市】 快件离开 【深圳中心】 发往 【深圳桃源】",
                subContent: "2018-12-22 14:39:24",
                time: "1545460764000"
              },
              {
                content: "【深圳市】 快件到达 【深圳中心】",
                subContent: "2018-12-22 14:37:08",
                time: "1545460628000"
              },
              {
                content: "在转转录入快递单号操作发货",
                subContent:
                  "承运公司:中通速递 运单编号:75118420085789\n2018-12-21 22:22:29",
                time: "1545402149221"
              },
              {
                content: "【金华市】 快件离开 【义乌中转部】 发往 【深圳中心】",
                subContent: "2018-12-21 19:32:50",
                time: "1545391970000"
              },
              {
                content: "【金华市】 快件到达 【义乌中转部】",
                subContent: "2018-12-21 19:31:05",
                time: "1545391865000"
              },
              {
                content: "【金华市】 快件离开 【义乌童店】 发往 【深圳中心】",
                subContent: "2018-12-21 16:45:06",
                time: "1545381906000"
              },
              {
                content:
                  "【金华市】 【义乌童店】（0579-85877276） 的 郑葆帅 （15924266431） 已揽收",
                subContent: "2018-12-21 16:35:20",
                time: "1545381320000"
              }
            ]
          }
        ]
      },
      logisticsDetail: [
        {
          sortId: 10,
          icon:
            "http://img.58cdn.com.cn/zhuanzhuan/zz/kuaidi/normal_logistics_icon.png",
          title: "物流动态",
          data: [
            {
              content:
                "【深圳市】 快件已在 【深圳桃源】 签收, 签收人: 菜鸟, 如有疑问请电联:13149908822 / 0755-36550506, 您的快递已经妥投, 如果您对我们的服务感到满意, 请给个五星好评, 鼓励一下我们【请在评价快递员处帮忙点亮五颗星星哦~】",
              subContent: "2018-12-23 14:13:06",
              time: "1545545586000"
            },
            {
              content: "【深圳市】 快件到达 【深圳桃源】",
              subContent: "2018-12-23 08:44:03",
              time: "1545525843000"
            },
            {
              content: "【深圳市】 快件离开 【深圳中心】 发往 【深圳桃源】",
              subContent: "2018-12-22 14:39:24",
              time: "1545460764000"
            },
            {
              content: "【深圳市】 快件到达 【深圳中心】",
              subContent: "2018-12-22 14:37:08",
              time: "1545460628000"
            },
            {
              content: "在转转录入快递单号操作发货",
              subContent:
                "承运公司:中通速递 运单编号:75118420085789\n2018-12-21 22:22:29",
              time: "1545402149221"
            },
            {
              content: "【金华市】 快件离开 【义乌中转部】 发往 【深圳中心】",
              subContent: "2018-12-21 19:32:50",
              time: "1545391970000"
            },
            {
              content: "【金华市】 快件到达 【义乌中转部】",
              subContent: "2018-12-21 19:31:05",
              time: "1545391865000"
            },
            {
              content: "【金华市】 快件离开 【义乌童店】 发往 【深圳中心】",
              subContent: "2018-12-21 16:45:06",
              time: "1545381906000"
            },
            {
              content:
                "【金华市】 【义乌童店】（0579-85877276） 的 郑葆帅 （15924266431） 已揽收",
              subContent: "2018-12-21 16:35:20",
              time: "1545381320000"
            }
          ]
        }
      ]
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

  methods: {},
  onShow(ev) {
    // console.log(this.globalData.statusBarHeight);
  },
  onLoad() {
    // mta统计
    mta.Page.init();
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