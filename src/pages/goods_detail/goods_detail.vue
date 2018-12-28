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
    <!-- banner -->
    <div class="banner">
      <div
        class="box indexBanner"
        v-if="banners.length>0"
      >
        <swiper
          :autoplay="config.autoplay"
          :circular="config.circular"
          :duration="config.duration"
          :indicatorActiveColor="config.indicatorActiveColor"
          :indicatorColor="config.indicatorColor"
          :indicatorDots="config.indicatorDots"
          :interval="config.interval"
          v-if="banners.length>1"
        >
          <swiper-item
            catchtap="onBanner"
            class="banner-wrap"
            v-for="banner in banners"
            :key="banner.pic"
          >
            <img
              class="pic"
              mode="widthFix"
              :src="banner.pic"
            />
          </swiper-item>
        </swiper>
      </div>
    </div>

    <!-- info -->
    <div class="info">
      <div class="price">
        <img
          :src="icon_pack_sm"
          alt=""
        />
        <div class="sale-price">￥1</div>
        <div class="source-price-t">市场价<div class="source-price">￥513.80</div></div>
      </div>

      <div class="goods-name">瑁恩瑁爱 新生儿宝宝哈衣长袖睡衣爬爬服新生儿宝宝哈衣长袖睡衣爬爬服新生儿宝宝哈衣长袖睡衣爬爬服新生儿宝宝哈衣长袖睡衣爬爬服新生儿宝宝哈衣长袖睡衣爬爬服</div>
      <!-- 进度条 -->
      <div class="progress" style="display:none">
        <div class="progress-bar">
          <div class="progress-cnt"></div>
        </div>
        <div class="progress-desc">
          <div class="progress-desc-total">满9000份开奖</div>
          <div class="progress-desc-left">差30份</div>
        </div>
      </div>
      <!-- 已开奖 -->
      <div class="award">
        <div class="avatar-box">
          <img src="https://resource.xiaotaotao123.cn/wxapp_img/avatar.png" alt=""/>
          <div class="username">小飞飞小飞飞小飞飞小飞飞</div>
        </div>
        <div class="award-bd">
          <div class="award-item">中奖号码：10000123</div>
          <div class="award-item">本期参与：5份</div>
          <div class="award-item">中奖时间：2018-12-19 10:1</div>
        </div>
      </div>
      <div class="my-join-wrapper">
        <div class="my-join">
          <div class="my-join-hd">我的号码</div>
          <div class="my-join-bd">0个</div>
        </div>
        <div class="my-money">
          <div class="my-money-hd">当前收益</div>
          <div class="my-money-bd">¥12.92</div>
        </div>
      </div>

      <div class="join-count">
        <div class="join-count-t">已有24人参与</div>
        <img src="/static/images/icon_arr_gray.png" alt=""/>
      </div>
    </div>

    <!-- 商品详情和往期揭晓tab -->
    <div class="tab">
      <div class="tab-nav">
        <div class="nav-item active" @click="changeTab(0)">商品详情</div>
        <div class="nav-item " @click="changeTab(1)">往期揭晓</div>
      </div>
      <div class="tab-content">
        <div class="content-item">
          <img src="https://pic1.zhuanstatic.com/zhuanzh/n_v28a2603bb43864971a5935082b31a9b04_98414919452bae9c.jpg?w=1500&h=1500" alt="" mode="widthFix"/>
          <img src="https://pic1.zhuanstatic.com/zhuanzh/n_v28a2603bb43864971a5935082b31a9b04_98414919452bae9c.jpg?w=1500&h=1500" alt="" mode="widthFix"/>
          <img src="https://pic1.zhuanstatic.com/zhuanzh/n_v28a2603bb43864971a5935082b31a9b04_98414919452bae9c.jpg?w=1500&h=1500" alt="" mode="widthFix"/>
          <img src="https://pic1.zhuanstatic.com/zhuanzh/n_v28a2603bb43864971a5935082b31a9b04_98414919452bae9c.jpg?w=1500&h=1500" alt="" mode="widthFix"/>
          <img src="https://pic1.zhuanstatic.com/zhuanzh/n_v28a2603bb43864971a5935082b31a9b04_98414919452bae9c.jpg?w=1500&h=1500" alt="" mode="widthFix"/>
        </div>
        <div class="content-item active">
          <div class="duobao-list">
            
            <div class="duobao-item">
              <div class="duobao-hd">
                <div class="user-t">中奖者：</div>
                <img class="user-avatar" src="https://resource.xiaotaotao123.cn/wxapp_img/avatar.png" alt=""/>
                <div class="user-name">happy12312121211111111111111111112</div>
                <div class="time">中奖时间 2018-12-19 09:28:12</div>
              </div>

              <div class="duobao-bd">
                <img src="https://pic1.zhuanstatic.com/zhuanzh/n_v28a2603bb43864971a5935082b31a9b04_98414919452bae9c.jpg?w=1500&h=1500" alt="" class="duobao-avatar"/>
                <div class="duobao-info">
                  <div class="duobao-title">维他锡兰柠檬茶250ML维他锡兰柠檬茶250ML维他锡兰柠檬茶250ML维他锡兰柠檬茶250ML*6盒柠檬</div>
                  <div class="no">中奖号码：1000012331</div>
                  <div class="num">本期参与：5份</div>
                </div>
              </div>
            </div>
            <div class="duobao-item">
              <div class="duobao-hd">
                <div class="user-t">中奖者：</div>
                <img class="user-avatar" src="https://resource.xiaotaotao123.cn/wxapp_img/avatar.png" alt=""/>
                <div class="user-name">中奖者：</div>
                <div class="time">中奖时间 2018-12-19 09:28:12</div>
              </div>

              <div class="duobao-bd">
                <img src="https://pic1.zhuanstatic.com/zhuanzh/n_v28a2603bb43864971a5935082b31a9b04_98414919452bae9c.jpg?w=1500&h=1500" alt="" class="duobao-avatar"/>
                <div class="duobao-info">
                  <div class="duobao-title">维他锡兰柠檬茶250ML*6盒柠檬</div>
                  <div class="no">中奖号码：1000012331</div>
                  <div class="num">本期参与：5份</div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>

    <!-- 返回頂部 -->
    <back-top :showBackTop="showBackTop" />
    <!-- 底部没有更多 -->
    <paging-footer
      :showNoMore="showNoMore"
      noMoreTips="没有更多数据了"
    />
    <!-- 底部按钮 -->
    <div class="fixed-btn">立即参与</div>
    <!-- 快速导航 -->
    <quick-navigate />
  </div>
</template>

<script type="text/ecmascript-6">
import headBar from "@/components/headBar";
import quickNavigate from "@/components/quickNavigate";
import util from "@/utils/util";
import api from "@/utils/api";
// import request from "@/utils/request";
import backTop from "@/components/backTop";
import pagingFooter from "@/components/pagingFooter";

export default {
  data() {
    return {
      title: "商品详情",
      headerBackground: "#fff",
      titleColor: "black",
      showCustomBar: !0,
      customBarStyle: "black",
      // 轮播图配置
      config: {
        current: 0,
        indicatorDots: !0,
        indicatorColor: "#ccc",
        indicatorActiveColor: "#808080",
        autoplay: !1,
        interval: 5000,
        duration: 500,
        circular: !0
      },
      banners: [],
      duobaoData: null
    };
  },

  components: {
    headBar,
    backTop,
    pagingFooter,
    quickNavigate
  },

  computed: {
    icon_pack_sm() {
      return this.globalData.img_url + 'icon_pack_sm.png'
    }
  },

  mounted(ev) {
    console.log(this.globalData.resourceUrl)
  },

  methods: {
    changeTab(idx) {

    }
  },
  // 页面加载
  async onLoad(e) {
    var id = e.id;

    const res = await util.request(api.DuobaoDetail, {id: id}, "GET", this);
    if (res.data && res.code === 0) {
      // this.totalData = res.data;
      console.log(res.data);

      this.duobaoData = res.data;
    } else {
    }
  }
};
</script>

<style lang='scss'>
@import "../../common/style/variable";

.banner {
  padding: 0 15px;

  swiper {
    display: block;
    height: 345px;
  }

  swiper-item {
    display: flex;
    align-items: center;
  }

  img {
    display: block;
    width: 345px;
    height: 345px;
  }
}

.info{
  padding: 10px 15px;
  border-bottom: 10px solid #F5F5F5;

  .price{
    display: flex;
    flex-direction: row;
    align-items: center;
    line-height: 1;

    img{
      display: block;
      width: 20px;
      height: 20px;
    }

    .sale-price{
      flex: 1;
      font-size: 18px;
      color: #FF3B30;
    }
    .source-price-t{
      width: 136px;
      font-size: 12px;
      color: #9B9B9B;
      text-align: right;
    }
    .source-price{
      display: inline-block;
      font-size: 12px;
      color: #9B9B9B;
      text-decoration: line-through;
    }
  }

  .goods-name{
    padding: 7px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    color: #333;
  }
  .progress{
    .progress-bar{
      position: relative;
      width: 100%;
      height: 10px;
      border-radius: 5px;
      background: #E6E6E6;
    }
    .progress-cnt{
      position: absolute;
      top: 0;
      left: 0;
      width: 50%;
      height: 10px;
      background: #FF3B30;
      border-radius: 5px;
    }
    .progress-desc{
      display: flex;
      flex-direction: row;
      padding: 10px 0 15px 0;
      font-size: 12px;
      line-height: 1;
      border-bottom: 1px solid rgba(0,0,0,0.1);

      .progress-desc-total{
        width: 50%;
        color: #9B9B9B;
      }
      .progress-desc-left{
        width: 50%;
        color: #FF3B30;
        text-align: right;
      }
    }
  }
  /* 开奖结果 */
  .award{
    display: flex;
    flex-direction: row;
    padding: 15px 0;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    background: url(#{$img_url}/award_bg.png) no-repeat center;
    background-size: 100%;

    .avatar-box{
      img{
        display: block;
        margin: 0 auto;
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
      .username{
        width: 80px;
        height: 23px;
        padding: 0 15px;
        margin: 0 auto;
        text-align: center;
        font-size: 12px;
        color: #fff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        background: url(#{$img_url}/award_name_bg.png) no-repeat center;
        background-size: 100%;
        box-sizing: border-box;
      }
    }

    .award-bd{
      padding-left: 12px;

      .award-item{
        font-size: 14px;
        line-height: 20px;
        color: #000;
      }
    }
  }

  .my-join-wrapper{
    display: flex;
    flex-direction: row;
    padding: 15px 0;
    line-height: 1;

    .my-join,.my-money{
      width: 50%;
      text-align: center;
    }
    .my-join-hd,.my-money-hd{
      font-size: 12px;
      color: #9B9B9B;
    }
    .my-join-bd,.my-money-bd{
      padding-top: 10px;
      font-size: 18px;
      color: #FF3B30;
    }
  }

  .join-count{
    font-size: 0;
    text-align: center;

    .join-count-t{
      display: inline-block;
      font-size: 12px;
      color: #9B9B9B;
      vertical-align: middle;
    }
    img{
      display: inline-block;
      width: 15px;
      height: 15px;
      vertical-align: middle;
    }
  }
  
}

.tab{
  padding-bottom: 50px;

  .tab-nav{
    font-size: 0;
    border-bottom: 10px solid #F5F5F5;
    text-align: center;

    .nav-item{
      display: inline-block;
      padding: 12px 10px;
      vertical-align: middle;
      font-size: 15px;
      line-height: 13px;
      color: #9B9B9B;

      &.active{
        font-size: 18px;
        color: #000;
      }
    }
  }

  .tab-content{
    .content-item{
      display: none;

      &.active{
        display: block;
      }

      img{
        display: block;
        width: 100%;
      }
    }
  }

  .duobao-list{
    .duobao-item{
      background: #fff;

      .duobao-hd{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        padding: 10px 15px;
        font-size: 12px;
        color: #999;
        line-height: 1;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(0,0,0,0.1);

        .user-t{
          flex-shrink: 0;
          width: 49px;
          padding-left: 3px;
          border-left: 2px solid #FF3B30;
        }
        .user-avatar{
          flex-shrink: 0;
          width: 15px;
          height: 15px;
          border-radius: 50%;
        }
        .user-name{
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .time{
          width: 180px;
          flex-shrink: 0;
          text-align: right;
        }
      }

      .duobao-bd{
        display: flex;
        flex-direction: row;
        padding: 10px 15px;
        border-bottom: 1px solid rgba(0,0,0,0.1);

        .duobao-avatar{
          width: 90px;
          height: 90px;
          margin-right: 10px;
          flex-shrink: 0;
        }
        .duobao-info{
          padding-top: 5px;
          flex: 1 0 0;
          overflow: hidden;

          .duobao-title,.no,.num{
            width: 100%;
            padding: 7px 0;
            font-size: 14px;
            color: #333;
            line-height: 1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}

.fixed-btn{
  width:100%;
  height:50px;
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  color: #fff;
  font-size: 18px;
  line-height: 50px;
  background:linear-gradient(135deg,rgba(255,106,107,1) 0%,rgba(255,58,57,1) 100%);
}

</style>