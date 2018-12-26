<!-- 广告福利 -->
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
    <div class="ad _7200772">

      <div class="ad-banner _7200772">
        <image
          class="_7200772"
          src="https://pic6.zhuanstatic.com/zhuanzh/n_v2b0a37aecfd014588a29a12162d865193.png"
        />
      </div>

      <scroll-div class="ad-list _7200772">
        <div
          bindtap="getCoin"
          class="ad-list-item _7200772"
          v-for="(item,index) in list"
          :key="index"
        >
          <image
            class="pic _7200772"
            :src="item.pic"
          />
          <div class="box _7200772">
            <div class="title _7200772">{{item.title}}</div>
            <div class="content _7200772">{{item.desc}}</div>
          </div>
          <div class="status _7200772">
            <image
              class="_7200772"
              src="https://pic3.zhuanstatic.com/zhuanzh/n_v2f9803264f4c64352a5febfc9ca5fca8e.png"
              v-if="item.gotStatus==0"
            />
            <image
              class="_7200772"
              src="https://img1.zhuanstatic.com/common/img/gotcoin.png"
              v-else
            />
          </div>
        </div>
      </scroll-div>

    </div>

    <!-- 快速导航 -->
    <quick-navigate/>
  </div>
</template>

<script type="text/ecmascript-6">
import headBar from "@/components/headBar";
import quickNavigate from "@/components/quickNavigate";

export default {
  data() {
    return {
      title: "广告福利",
      headerBackground: "#8054ff",
      titleColor: "#fff",
      showCustomBar: !0,
      customBarStyle: "white",
      list: [
        {
          pic:
            "http://pic1.zhuanstatic.com/zhuanzh/n_v2a32fd8f035ea48e5b72e59006ccd113f.png",
          url:
            "/pages/index/index?gdt_vid=wandehai&weixinadinfo=0001&channel=wandehai.h5wzcc.01408",
          title: "猜词赢红包",
          desc: "填字猜词，成语闯关！",
          actId: "8444757676530818001:3555819730003056640",
          type: null,
          clickCount: null,
          appId: "wx06317e9fcb72749f",
          gotStatus: 0,
          field1: "",
          field2: null,
          field3: null,
          field4: null,
          field5: null,
          field6: null,
          field7: null,
          field8: null,
          field9: null
        },
        {
          pic:
            "http://pic1.zhuanstatic.com/zhuanzh/n_v2c63020b066a74f79b2a3f62550bf2da1.png",
          url: "pages/index/index?ChannelID=TG001&IndirectChannel=LK",
          title: "最强抽奖",
          desc: "新人免费领百元大奖",
          actId: "8444757676530818001:7650129710392610816",
          type: null,
          clickCount: null,
          appId: "wxe20f2a757ccbbce3",
          gotStatus: 0,
          field1: "",
          field2: null,
          field3: null,
          field4: null,
          field5: null,
          field6: null,
          field7: null,
          field8: null,
          field9: null
        },
        {
          pic:
            "http://pic1.zhuanstatic.com/zhuanzh/n_v247f0900a525744999c65a41a382ebadb.png",
          url: "pages/step/step?chl=tiantbus&s=tiantbus",
          title: "运动赚",
          desc: "微信步数换红包，每天走路就能领现金！",
          actId: "8444757676530818001:9019485040512249856",
          type: null,
          clickCount: null,
          appId: "wx13dd723fb3aa9c5f",
          gotStatus: 0,
          field1: "",
          field2: null,
          field3: null,
          field4: null,
          field5: null,
          field6: null,
          field7: null,
          field8: null,
          field9: null
        },
        {
          pic:
            "http://pic1.zhuanstatic.com/zhuanzh/n_v2ae58ba5c21be4caa9c44a5277ff2b80a.png",
          url: "?from=2051",
          title: "攻城三国",
          desc: "开局送华佗，灭董卓，收吕布，十天称霸三国！",
          actId: "8444757676530818001:6811051636138594304",
          type: null,
          clickCount: null,
          appId: "wx8b3a98563fc40251",
          gotStatus: 0,
          field1: "",
          field2: null,
          field3: null,
          field4: null,
          field5: null,
          field6: null,
          field7: null,
          field8: null,
          field9: null
        },
        {
          pic:
            "http://pic1.zhuanstatic.com/zhuanzh/n_v279560d922f2c4befa48b574f08226650.png",
          url: "?from=2051",
          title: "狂暴西游",
          desc: "如果你连1元都不想冲，那就来这个西游吧，无限资源！",
          actId: "8444757676530818001:1069756340382281728",
          type: null,
          clickCount: null,
          appId: "wxbdfee33ea394a980",
          gotStatus: 0,
          field1: null,
          field2: null,
          field3: null,
          field4: null,
          field5: null,
          field6: null,
          field7: null,
          field8: null,
          field9: null
        },
        {
          pic:
            "http://pic1.zhuanstatic.com/zhuanzh/n_v2058652af38f64ea881e0346d468e51fc.jpg",
          url: "?chid=1966&subchid=cq_zhuan01",
          title: "传奇来了",
          desc: "传奇复古经典版，来玩就是我兄弟！",
          actId: "8444757676530818001:5595753046679727104",
          type: null,
          clickCount: null,
          appId: "wx79ade44c39cefc7f",
          gotStatus: 0,
          field1: "",
          field2: null,
          field3: null,
          field4: null,
          field5: null,
          field6: null,
          field7: null,
          field8: null,
          field9: null
        },
        {
          pic:
            "http://pic1.zhuanstatic.com/zhuanzh/n_v24274e27a71e64a5f94d57d6a509eac4c.png",
          url: "pages/home/index?scene=c%3D149",
          title: "够货",
          desc: "来够货，购好货，一元白拿",
          actId: "8444757676530818001:551858039226903552",
          type: null,
          clickCount: null,
          appId: "wxc3a8c0b476dfa08c",
          gotStatus: 0,
          field1: "",
          field2: null,
          field3: null,
          field4: null,
          field5: null,
          field6: null,
          field7: null,
          field8: null,
          field9: null
        },
        {
          pic:
            "http://pic1.zhuanstatic.com/zhuanzh/n_v2c8aaefc81320480885d176f7dec90840.png",
          url: "?from=2051",
          title: "决战沙城",
          desc: "传奇世界正版授权，全民抢BOSS，橙装人人有",
          actId: "8444757676530818001:7843845176170357760",
          type: null,
          clickCount: null,
          appId: "wx591a9df1eaf73a4b",
          gotStatus: 0,
          field1: "",
          field2: null,
          field3: null,
          field4: null,
          field5: null,
          field6: null,
          field7: null,
          field8: null,
          field9: null
        },
        {
          pic:
            "http://pic1.zhuanstatic.com/zhuanzh/n_v25c4a280e47ce40c58404d853d973f5fe.png",
          url:
            "pages/index/index?gdt_vid=wandehai&weixinadinfo=0001&channel=wandehai.h5xxxstar.3407",
          title: "疯狂消星星",
          desc: "最火热消除玩法，无尽关卡等你来挑战！",
          actId: "8444757676530818001:7392508140993186816",
          type: null,
          clickCount: null,
          appId: "wx7d2e1dd8fd7ea905",
          gotStatus: 0,
          field1: "",
          field2: null,
          field3: null,
          field4: null,
          field5: null,
          field6: null,
          field7: null,
          field8: null,
          field9: null
        },
        {
          pic:
            "http://pic1.zhuanstatic.com/zhuanzh/n_v2508dc30d52e245bdb7fb1ff5849554d1.png",
          url:
            "pages/index/index?origin=bububaoUV&ald_media_id=8103&ald_link_key=70fc7c9cb18fdd9b",
          title: "集步运动",
          desc: "走走路免费领话费、优惠券等众多爆款商品",
          actId: "8444757676530818001:2044681693656238080",
          type: null,
          clickCount: null,
          appId: "wx371df2518b80e0c3",
          gotStatus: 0,
          field1: "",
          field2: null,
          field3: null,
          field4: null,
          field5: null,
          field6: null,
          field7: null,
          field8: null,
          field9: null
        }
      ],
      deviceType: "",
      selectedIndex: "",
      timer: null,
      count: 0
    };
  },

  components: {
    headBar,
    quickNavigate
  },

  computed: {},

  mounted(ev) {},

  methods: {}
};
</script>

<style lang='scss'>
@import "../../common/style/0.scss";
@import "../../common/style/2.scss";

page {
  background: #5a3ba9;
}
/* 导航 */
.nav {
  width: 100%;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
}
.nav .back {
  width: 24.5rpx;
  height: 42rpx;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 20rpx 20rpx;
}

.nav .index {
  width: 44rpx;
  height: 44rpx;
  position: absolute;
  bottom: 0;
  left: 60rpx;
  padding: 20rpx 10rpx;
}

.nav-title {
  width: 100%;
  height: 45px;
  line-height: 45px;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
  font-family: PingFang-SC-Medium;
  font-weight: 600;
  font-size: 36rpx;
  color: black;
}
.ad._7200772 {
  height: 100vh;
  background: #5a3ba9;
}

.ad-banner._7200772 {
  width: 100%;
  height: 300rpx;
}

.ad-banner image._7200772 {
  width: 100%;
  height: 100%;
}

.ad-list._7200772 {
  padding-bottom: 40rpx;
  background: #5a3ba9;
}

.ad-list-item._7200772 {
  margin: 30rpx auto;
  width: 702rpx;
  height: 188rpx;
  background: #8368cc;
  border-radius: 10rpx;
  display: flex;
  align-items: center;
}

.pic._7200772 {
  width: 112rpx;
  height: 112rpx;
  border-radius: 56rpx;
  margin: 0 20rpx 0 30rpx;
}

.box._7200772 {
  width: 350rpx;
  color: #fff;
  margin-right: 30rpx;
}

.box .title._7200772 {
  font-family: PingFang-SC-Medium;
  font-size: 30rpx;
  line-height: 52rpx;
}

.box .content._7200772 {
  font-family: PingFang-SC-Regular;
  font-size: 24rpx;
  line-height: 40rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
}

.status image._7200772 {
  width: 176rpx;
  height: 176rpx;
}
</style>