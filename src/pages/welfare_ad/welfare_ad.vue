<!-- 赚红包广告福利 -->
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
          :src="bannerImg"
        />
      </div>

      <scroll-div class="ad-list _7200772">
        <div
          @click="getCoin"
          :data-id="item.id"
          :data-appid="item.appid"
          :data-url="item.url"
          :gotStatus="item.gotStatus"
          class="ad-list-item _7200772"
          v-for="(item,index) in list"
          :key="index"
        >
          <image
            class="pic _7200772"
            :src="item.img"
          />
          <div class="box _7200772">
            <div class="title _7200772">{{item.title}}</div>
            <div class="content _7200772">{{item.description}}</div>
          </div>
          <div class="status _7200772">
            <image
              class="_7200772"
              :src="packImgOpened"
              v-if="item.gotStatus"
            />
            <image
              class="_7200772"
              :src="packImg"
              v-else
            />
          </div>
        </div>
      </scroll-div>

      <!-- 无数据 -->
      <no-data :showNoData="!list||list.length<=0" />

    </div>
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
      title: "赚红包",
      headerBackground: "#fff",
      titleColor: "#000",
      showCustomBar: !0,
      customBarStyle: "black",
      list: null,
      viewTimer: null,
      currentId: null,
      num: 0,
      second: 20000,
      tips: "",
      count: 0
    };
  },

  components: {
    headBar,
    quickNavigate
  },

  computed: {
    packImgOpened() {
      return this.globalData.img_url + "zhb_pack.png";
    },
    packImg() {
      return this.globalData.img_url + "zhb_pack_active.png";
    },
    bannerImg() {
      return this.globalData.img_url + "banner_zhb.png";
    }
  },

  methods: {
    getCoin(e) {
      var _this = this;
      let { id, appid, link, gotStatus } = e.currentTarget.dataset;
      this.currentId = id;
      if (_this.viewTimer) clearInterval(_this.viewTimer);
      wx.navigateToMiniProgram({
        appId: appid,
        path: link,
        extraData: {
          foo: "bar"
        },
        envVersion: "develop",
        success(res) {
          console.log("跳转成功");
          if (gotStatus) return;
          _this.viewTimer = setInterval(() => {
            console.log("1111");

            _this.num++;
          }, 1000);
        }
      });
    },
    getPrize() {
      var _this = this;
      util
        .request(api.ZHBAdReward, { advertid: _this.currentId }, "GET", _this)
        .then(function(res) {
          if (res.code === 0) {
            console.log(res);

            _this.list = res.data.list;

            wx.showModal({
              title: "提示", // 提示的标题,
              content: res.msg,
              showCancel: false,
              confirmText: "收下"
            });
          } else {
            // wx.showModal({
            //   title: "提示", // 提示的标题,
            //   content: _this.tips // 提示的内容,
            // });
          }
        });

      console.log("恭喜你获得多少金币");
    }
  },

  onShow(e) {
    console.log("show：打开应用多少秒=" + this.num);
    if (this.num >= this.second) {
      this.getPrize();
    } else if (this.num < this.second && this.num > 0) {
      wx.showModal({
        title: "提示", 
        content: this.tips,
        showCancel: false,
        confirmText: "知道了"
      });
    }
    if (this.viewTimer) clearInterval(this.viewTimer);
    this.num = 0;
  },

  async onLoad(e) {
    // 列表
    const res = await util.request(api.WelfareAd, "GET", this);
    if (res.data && res.code === 0) {
      // this.totalData = res.data;
      console.log(res.data);

      this.list = res.data.list;
      this.tips = res.data.tips;
      this.second = res.data.second;
    } else {
    }
  }
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