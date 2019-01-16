<template>
  <div>
    <head-bar
      :title="title"
      :headerBackground="headerBackground"
      :titleColor="titleColor"
    />
    <!-- <button
      open-type="getUserInfo"
      @getuserinfo="bindGetUserInfo"
    >授权登录</button> -->

    <div class="page">
      <!-- top -->
      <div class="topArea">
        <!-- 动画星星 -->
        <div class="shootingStar">
          <div class="star"></div>
          <div class="star blue"></div>
          <div class="star red"></div>
        </div>
        <!-- 总共多少金币 -->
        <div
          @click="goPakcDetail"
          class="powerCoin"
        >
          <text class="agentCoinInteger">{{hb_amount}}</text>
          <text class="agentCoinDecimal"></text>
        </div>
        <!-- 挂着的金币 -->
        <div
          @click="handlePrize"
          class="prize-common"
          :data-type="item.type"
          :data-id="item.id"
          :class="item.type"
          v-for="(item, index) in bubble"
          :key="index"
        >
          <block v-if="item.type==='attendanceReward' ||item.type==='newReward'">
            <div
              class="prize-common-num"
              v-if="item.hb>0"
            >
              <div class="unit">￥</div>{{item.hb}}
            </div>
            <div class="prize-common-name">{{item.title}}</div>
          </block>
          <block v-else>
            <div
              class="prize-common-num"
              v-if="item.hb>0"
            >
              <div class="unit"></div>
            </div>
            <div class="prize-common-name">{{item.title}}</div>
          </block>
        </div>

        <!-- 分享金币 -->
        <!-- <button
          @click="$RunningTopArea$shareGroup"
          class="share-group"
          data-type="1"
          hoverClass="none"
          openType="share"
        >
          <div class="share-group-image"></div>
          <div class="share-group-name">分享领币</div>
        </button> -->

        <!-- 赚红包 -->
        <!-- <div
          @click="$RunningTopArea$navToAdv"
          class="adv-prize prize-common"
        >
          <div class="prize-common-num">10<text>币</text>
          </div>
          <div class="prize-common-name">赚红包</div>
        </div> -->

        <!-- 领取 -->
        <div
          animation="centerAnim"
          @click="$RunningTopArea$exchangeCoinTwo"
          class="centerData"
        >
          <div class="centerData-nickName">未兑换步数</div>
          <div class="centerData-totalStep">{{totalStep}}<text class="step-class">步</text>
          </div>
          <div class="centerData-stepTips">每日24点步数清零</div>
          <div
            @tap="getWeRunData"
            class="centerData-stepBottom"
            v-if="totalStep<=0"
          >{{loadingWeRunData?'正在获取...':'获取最新微信步数'}}</div>
          <div
            @click="exchangeStep"
            class="centerData-stepBottom breathe-btn"
            v-else
          >点击兑换成红包</div>
        </div>
        <!-- 邀请按钮 -->
        <button
          @click="inviteNew"
          class="inviteNew"
          data-type="0"
          openType="share"
        >
          邀请新人永久加成
        </button>

        <div
          class="middleArea"
          v-if="menuList&&menuList.length>0"
        >
          <!-- 导航 -->
          <div
            @click="jump"
            class="card"
            :data-url="item.link"
            v-for="(item, index) in menuList"
            :key="index"
          >
            <div
              class="card-pic"
              :style="{'background': 'url('+item.img+') no-repeat center top','background-size': '120rpx 120rpx'}"
            ></div>
            <div class="card-name">{{item.title}}</div>
            <div
              class="card-icon"
              v-if="item.bubble"
            >{{item.bubble}}</div>
          </div>
        </div>

        <!-- banner -->
        <div
          @click="jump"
          :data-url='banner.link'
          class="activity-challenge"
          v-if="banner"
          :style="{margin: menuList&&menuList.length>0?'':'150rpx auto 32rpx'}"
        >
          <image
            mode="aspectFill"
            :src="banner.img"
          />
        </div>
      </div>

      <!-- 新人专区 -->
      <div
        class="new _b790fd0"
        v-if="newUserZoneInfo&&newUserZoneInfo.list&&newUserZoneInfo.list.length>0"
      >
        <div class="head _b790fd0">
          <div class="title _b790fd0">{{newUserZoneInfo.title}}</div>
          <div
            @click="gotoNewer"
            class="more _b790fd0"
            :data-url="newUserZoneInfo.url"
          >{{newUserZoneInfo.subtitle}}</div>
        </div>
        <div class="list">
          <block
            @click="goDetail"
            :data-is_id="item.is_id"
            v-for="item in newUserZoneInfo.list"
            :key="item.is_id"
          >
            <goods-item
              showTips="true"
              :goodsItem="item"
              @btnClickHandler="btnClickHandler"
            />
          </block>
        </div>
        <div
          @click="gotoNewer"
          class="div-more _b790fd0"
          data-wpygoactivity-a="newUserZoneInfo.url"
        >
          <text class="_b790fd0">点击查看更多</text>
        </div>
      </div>
      
      <!-- 最新开奖 -->
      <div
        class="one-coin _2edb85c"
        v-if="latestAward&&latestAwardList&&latestAwardList.length>0"
      >
        <div class="head _2edb85c">
          <div class="title _2edb85c">{{latestAward&&latestAward.title}}</div>
          <div
            @click="goDuobaoHistory"
            class="more _2edb85c"
            :data-url="latestAward&&latestAward.subtitle"
          >{{latestAward&&latestAward.subtitle}}</div>
        </div>
        <div
          class="box _2edb85c"
          v-if="latestAward"
        >
          <swiper
            class="swiper _2edb85c"
            :autoplay="latestAwardList.length>1"
            :circular="config.circular"
            :duration="config.duration"
            :indicatorActiveColor="config.indicatorActiveColor"
            :indicatorColor="config.indicatorColor"
            :indicatorDots="latestAwardList.length>1"
            :interval="config.interval"
          >
            <swiper-item
              class="swiper-item _2edb85c"
              v-for="(item, index) in latestAward.list"
              :data-index="index"
              :key="index"
            >
              <div
                @click="goDetail"
                class="goods _2edb85c"
                v-for="(goods, goodsindex) in item"
                :data-index="goodsindex"
                :key="goods.id"
                :data-is_id="goods.is_id"
              >
                <image
                  class="_2edb85c"
                  :src="goods.img"
                />
                <div class="goods-title _2edb85c">
                  <rich-text
                    class=""
                    :nodes="goods.title"
                  ></rich-text>
                </div>
                <!-- <rich-text class="goods-title _2edb85c" :nodes="goods.title"></rich-text> -->
                <!-- <div class="goods-price _2edb85c">
                  {{goods.coin}}
                </div> -->
              </div>
            </swiper-item>
          </swiper>
        </div>
      </div>

      <!-- 中间广告advertList -->
      <div
        class="banner"
        v-if="advertList&&advertList.length>0"
      >
        <div class="box _3142106 indexBanner advBanner">
          <swiper
            :autoplay="advertList.length>1"
            :circular="config.circular"
            :current="config.current"
            :duration="config.duration"
            :indicatorActiveColor="config.indicatorActiveColor"
            :indicatorColor="config.indicatorColor"
            :indicatorDots="advertList.length>1"
            :interval="config.interval"
          >
            <swiper-item
              @click="jump"
              class="banner-wrap _3142106"
              v-for="(advert,index) in advertList"
              :data-index="index"
              :data-id="advert.id"
              :data-link="advert.link"
              :data-appid="advert.appid"
              :key="advert.id"
            >

              <img
                class="pic _3142106"
                :src="advert.img"
              />
              <div class="banner-tip _3142106">
                <div class="banner-tip-title _3142106">{{advert.title}}</div>
              </div>
            </swiper-item>
          </swiper>
        </div>
      </div>

      <!-- 兑换商品夺宝  -->
      <div
        class="duobao"
        v-if="duobao&&duobaoList&&duobaoList.length>0"
      >
        <div class="Recommend">
          <div class="Recommend-title">
            <text class="left">{{duobao.title}}</text>
            <text class="right">{{duobao.subtitle}}</text>
          </div>
        </div>
        <!-- 滚动类别-->
        <!-- <div
          class="goodslist"
          id="goodslist"
          style="top: navHeghtpx;"
         >
          <scroll-div
            class="tabsArea"
            scrollIntodiv="tab-position"
            scrollX="true"
            v-if="tabs.length"
          >
            <div
              @click="changeTab"
              class="tab"
              data-wpychangetab-a="index"
              id="tab-index"
              v-for="(item, index) in tabs"
              :key="index"
            >
              {{item.cateName}}
            </div>
          </scroll-div>
        </div> -->

        <!-- 商品列表 -->
        <div class="RecommendGoods">
          <div class="RecommendGoods-list">
            <block
              v-for="item in duobao.list"
              :key="item.is_id"
            >
              <goods-item
                :goodsItem="item"
                @btnClickHandler="btnClickHandler"
              />
            </block>
          </div>
        </div>

      </div>

    </div>
    <!-- 底部没有更多 -->
    <paging-footer
      :showNoMore="showNoMore"
      noMoreTips="没有更多数据了"
    />
    <!-- 空白为了滚动 -->
    <div
      class="blank"
      style="height:100px;"
      v-if="showBlank"
    ></div>
    <div
      id="flag"
      style="height:1px;"
    ></div>

    <!-- 腾讯广告 -->

    <!-- 签到弹窗 -->
    <signModal
      :ifShowSign="ifShowSign"
      :days="days"
      :packAmount="packAmount"
      @clsSignModal="clsSignModal"
      @subBtnClick="subBtnClick"
    />
    <!-- 弹窗 -->
    <ls-dialog
      @closeDialog="closeDialog"
      :showDialog="showDialog"
      :dialogTitle="dialogTitle"
      :dialogContent="dialogContent"
      :openType="openType"
      :singleBtn="singleBtn"
      :confirmText="confirmText"
    />
    <!-- 返回頂部 -->
    <back-top :showBackTop="showBackTop" />
    <!-- 授权弹窗 -->
    <auth-modal
      @getUserInfos="getUserInfos"
      :authModalShow="authModalShow"
    />
  </div>
</template>

<script>
import headBar from "@/components/headBar";
import goodsItem from "@/components/goodsItem";
import signModal from "@/components/signModal";
import lsDialog from "@/components/lsDialog";
import backTop from "@/components/backTop";
import authModal from "@/components/authModal";
import pagingFooter from "@/components/pagingFooter";
import util from "@/utils/util";
import api from "@/utils/api";
import request from "@/utils/request";

var mta = require("@/utils/mta_analysis.js");

export default {
  data() {
    return {
      title: "首页",
      headerBackground: "#FF696C",
      titleColor: "#fff",
      showBackTop: true,
      // 是否需要弹窗授权获取用户信息
      authModalShow: !1,
      // 签到弹窗
      ifShowSign: !1,
      // 弹窗
      showDialog: false,
      dialogTitle: "",
      dialogContent: "",
      openType: "share",
      singleBtn: true,
      confirmText: "",
      days: 0,
      hb_amount: 0,
      packAmount: 0,
      share: {},
      // 金币列表
      bubble: null,
      // 步数
      totalStep: 0,
      loadingWeRunData: !1,
      // 导航
      menuList: [],
      banner: null,
      // 新用户专享
      newUserZoneInfo: null,
      // 轮播图配置
      config: {
        current: 0,
        indicatorDots: !0,
        indicatorColor: "#ccc",
        indicatorActiveColor: "#808080",
        autoplay: !0,
        interval: 5000,
        duration: 500,
        circular: !0
      },
      // 最新开奖
      latestAward: null,
      latestAwardList: null,
      // advertList
      advertList: [],
      // 推荐商品 列表
      page: 1,
      hasMore: !0,
      showBlank: false,
      showNoMore: !1,
      duobao: null,
      duobaoList: null,
      requestNum: 0,
      requestTimer: {}
    };
  },
  computed: {
    // showExchangeBtb() {
    //   return this.totalStep > 0 ? !0 : !1
    // }
  },

  components: {
    headBar,
    goodsItem,
    signModal,
    lsDialog,
    backTop,
    authModal,
    pagingFooter
  },
  methods: {
    // 通过id来更新数据
    updateData(newData) {
      var _this = this;
      console.log(2222);
      // 新手
      if (
        !newData ||
        newData.length <= 0 ||
        !this.newUserZoneInfo ||
        !this.newUserZoneInfo.list ||
        this.newUserZoneInfo.list.length <= 0
      ) {
        return;
      }
      for (var i = 0, len = newData.length; i < len; i++) {
        console.log(newData[i]);

        for (
          var j = 0, len2 = this.newUserZoneInfo.list.length;
          j < len2;
          j++
        ) {
          if (newData[i].id == this.newUserZoneInfo.list[j].is_id) {
            this.newUserZoneInfo.list[j].is_oddnum = newData[i].n;
            this.newUserZoneInfo.list[j].is_rate = newData[i].r;
          }
        }
      }

      // 夺宝
      if (!newData || !this.duobaoList || this.duobaoList.length <= 0) {
        return;
      }
      console.log(1111);
      for (var iNew = 0, lenNew = newData.length; iNew < lenNew; iNew++) {
        for (
          var jNew = 0, len2New = _this.duobaoList.length;
          jNew < len2New;
          jNew++
        ) {
          if (newData[iNew].id == _this.duobaoList[jNew].is_id) {
            _this.duobaoList[jNew].is_oddnum = newData[iNew].n;
            _this.duobaoList[jNew].is_rate = newData[iNew].r;
          }
        }
      }
    },
    // 跳转到红包明细
    goPakcDetail() {
      wx.navigateTo({
        url: "/pages/pack_list/main"
      });
    },
    // 关闭签到弹窗按钮
    clsSignModal(ev) {
      this.ifShowSign = false;
    },
    // 关闭弹窗
    closeDialog(ev) {
      console.log("closeDialog");

      this.showDialog = false;
    },
    // 预订提醒按钮 发送消息
    subBtnClick(ev) {
      var _this = this;
      console.log("form_id=" + ev);
      // this.ifShowSign = false
      api.sendMessage("form_id=" + ev).then(function(res) {
        console.log("提交发送消息1：" + JSON.stringify(res));
        if (res.code === 0) {
          _this.ifShowSign = false;
          wx.showToast({
            title: "预定提醒成功",
            icon: "none"
          });
        }
      });
    },
    // 获取气泡红包和红包数据，需登录
    getPacks(register_code_url, assistance_url) {
      var _this = this;

      if (_this.requestNum > 20 && _this.requestTimer.getPacks) {
        clearInterval(_this.requestTimer.getPacks);
      }

      api
        .getPacks(
          "register_code=" +
            (register_code_url || "") +
            "&assistance=" +
            (assistance_url || "")
        )
        .then(function(res) {
          if (res.code === 0) {
            console.log(11);
            _this.hb_amount = res.data.hb_amount;
            _this.bubble = res.data.bubble;
            _this.share = res.data.share;

            if (_this.requestTimer.getPacks) {
              clearInterval(_this.requestTimer.getPacks);
            }
          }
        });
    },
    // 点击气泡获取金币
    handlePrize(e) {
      var type = e.currentTarget.dataset.type;
      var _this = this;
      console.log(type);

      if (type) {
        api.clickPacks("type=" + type).then(function(res) {
          console.log(res);
          if (res.code === 0) {
            var bubble = _this.bubble || [];
            var index = bubble.findIndex(
              (value, index, arr) => value.type === type
            );
            _this.bubble.splice(index, 1);
            _this.hb_amount = res.data.hb_amount;

            // 签到气泡点击弹窗
            if (type === "attendanceReward") {
              _this.ifShowSign = true;
              _this.packAmount = res.data.hb;
              _this.days = res.data.continueSign;
            } else if (type === "newReward") {
              // 新用户
            } else {
              console.log("好友贡献弹窗");

              // 好友贡献弹窗
              _this.dialogTitle = "领取成功";
              _this.dialogContent = res.msg;
              _this.confirmText = "爱分享的人,红包都不会少";
              _this.showDialog = true;
              // wx.showModal({
              //   title: "提示",
              //   content: res.msg,
              //   showCancel: false,
              //   cancelColor: "#000000",
              //   confirmText: "知道了",
              //   confirmColor: "#3CC51F",
              //   success: res => {}
              // });
            }
          }
        });
      }
    },
    // 统一跳转
    jump(e) {
      util.jump(e);
    },
    // 跳转到最新夺宝
    goDuobaoHistory() {
      wx.navigateTo({
        url: "/pages/duobao_history/main"
      });
    },
    // 跳转到新人专区
    gotoNewer(e) {
      wx.navigateTo({
        url: "/pages/newer/main"
      });
    },
    // 跳转详情
    goDetail(e) {
      console.log(e);

      wx.navigateTo({
        url: "/pages/goods_detail/main?id=" + e.currentTarget.dataset.is_id
      });
    },
    // 点击购买按钮
    btnClickHandler(ev, dgoods_state) {
      console.log(ev, dgoods_state);

      wx.navigateTo({
        url: "/pages/goods_detail/main?id=" + ev
      });
    },
    beginChallenge() {
      wx.navigateTo({
        url: "/pages/welfare_ad/main"
      });
    },
    // 更新用户信息
    getUserInfos(e) {
      var _this = this;
      console.log("外面调用" + this.authModalShow);

      request
        .get("https://devapi.xiaotaotao123.cn/?act=little&op=updateUserInfo", {
          iv: encodeURIComponent(e.iv),
          encrypted_data: encodeURIComponent(e.encryptedData)
        })
        .then(function(res) {
          if (res.code === 0) {
            _this.authModalShow = false;
            if (res.data) {
              wx.setStorageSync("is_update", res.data.is_update || 0);
            }
            console.log(
              "更新用户信息后：this.authModalShow=" + _this.authModalShow
            );
          }
        });
    },
    // 微信原生获取微信步数方法
    wxRunDataHandler() {
      var _this = this;
      wx.getWeRunData({
        success(res) {
          // 发送数据到后台解码
          const encryptedData = res.encryptedData;
          const iv = res.iv;
          console.log(res);
          request
            .get("https://devapi.xiaotaotao123.cn/?act=index&op=getStep", {
              iv: encodeURIComponent(iv),
              encrypted_data: encodeURIComponent(encryptedData)
            })
            .then(res => {
              console.log(res);
              _this.totalStep = res.data;
              _this.loadingWeRunData = !1;
            })
            .catch(res => {
              console.log(res);
            });
        },
        fail() {
          wx.showModal({
            title: "提示",
            // content: "如需授权请点击右上角【...】-【关于】- 右上角【...】-【设置】-打开微信运动",
            content: "为了更好的为你提供服务，请允许访问微信步数",
            success(res) {
              if (res.confirm) {
                wx.openSetting({
                  success(res) {
                    console.log(res.authSetting);
                  }
                });
              } else if (res.cancel) {
                console.log("用户点击取消");
              }
            }
          });
        }
      });
    },
    // 获取微信步数
    getWeRunData() {
      console.log("正在获取步数...");

      var _this = this;
      _this.loadingWeRunData = !0;

      _this.wxRunDataHandler();
    },
    // 兑换步数
    async exchangeStep() {
      const res = await util.request(api.IndexExchangeStep, null, "POST", this);
      if (res.data && res.code === 0) {
        // this.totalData = res.data;
        console.log(res.data);

        this.totalStep = 0;
        this.hb_amount = res.data.hb_amount;
        // 兑换步数成功弹窗
        this.dialogTitle = "兑换成功";
        this.dialogContent = res.data.msg;
        this.confirmText = "邀好友兑换，拿红包奖励";
        this.showDialog = true;
      } else {
      }
    },
    checkAuth() {
      // 查看是否授权
      console.log("checkAuth");

      var _this = this;
      wx.getSetting({
        success(res) {
          if (res.authSetting["scope.userInfo"]) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            console.log("checkAuth");
            _this.authModalShow = !1;
            wx.getUserInfo({
              success(res) {
                console.log(res.userInfo);
              }
            });
          } else {
            _this.authModalShow = !0;
          }
        }
      });
    },
    async getIndexData() {
      var _this = this;
      request.get(api.Index, null).then(res => {
        _this.menuList = res.data.menuList;
        _this.banner = res.data.banner;
        _this.advertList = res.data.advertList;
      });
    },
    // 获取新人专区列表
    async getNewZone() {
      const resNewZone = await util.request(
        api.IndexNewZone,
        null,
        "GET",
        this
      );
      if (resNewZone.data && resNewZone.code === 0) {
        console.log(resNewZone.data);

        this.newUserZoneInfo = resNewZone.data;
      }
    },
    // 获取最新获奖列表
    async getLatestAward() {
      const resLatestAward = await util.request(
        api.IndexLatestAward,
        null,
        "GET",
        this
      );
      console.log(resLatestAward.data);
      if (resLatestAward.data && resLatestAward.code === 0) {
        // this.totalData = res.data;

        this.latestAward = resLatestAward.data;
        this.latestAwardList = resLatestAward.data.list;
      }
    },
    // 获取兑换列表
    async getDuobaoList() {
      const Duobao = await util.request(
        api.IndexDuobao,
        { page: 1, hasTitle: 1 },
        "GET",
        this
      );
      console.log(Duobao.data);
      if (Duobao.data && Duobao.code === 0) {
        // this.totalData = res.data;

        this.duobao = Duobao.data;
        this.duobaoList = Duobao.data.list;
        // this.hasMore = Duobao.data.hasMore;
      }
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    console.log("刷新");
    this.page = 1;
    this.hasMore = true;
    this.showNoMore = false;
    this.getIndexData();
    this.getNewZone();
    this.getLatestAward();
    this.getDuobaoList();
    this.getPacks();
    this.getWeRunData();
    wx.stopPullDownRefresh();
  },

  // 分享
  onShareAppMessage(res) {
    var resData = res[0]
    if (resData.from === "button") {
      // 来自页面内转发按钮
      console.log(resData);
      return util.getCommonShareData(
        this.share.title,
        this.share.image,
        this.share.link
      );
    }
    // 公用的分享转发数据
    return util.getCommonShareData(
      this.share.title,
      this.share.image,
      this.share.link
    );
  },
  // 页面滚动事件
  onPageScroll(e) {
    // console.log(e); // {scrollTop:99}
    this.globalData.indexScrollTop = e.scrollTop;
  },
  // 滚动加载
  async onReachBottom() {
    console.log(
      "srcoll onReachBottom========showAuthModal:" + this.authModalShow
    );
    this.showBlank = false;

    if (this.hasMore) {
      let list = this.duobao.list;
      let page = this.page;
      page++;

      wx.showToast({
        title: "数据加载中...", // 提示的内容,
        icon: "loading", // 图标,
        duration: 1000 // 延迟时间,
      });

      const Duobao = await util.request(
        api.IndexDuobao,
        { page: page, hasTitle: 1 },
        "GET",
        this
      );
      console.log(Duobao.data);
      if (Duobao.data && Duobao.code === 0 && Duobao.data.list) {
        // this.totalData = res.data;
        var data = Duobao.data;
        if (Duobao.data.list.length > 0) {
          data.list = list.concat(data.list);
          this.page = Duobao.data.page;
        }

        this.showBlank = true;

        this.duobao = data;
        this.hasMore = Duobao.data.hasMore;
        if (Duobao.data.hasMore) {
          this.showNoMore = !1;
        } else {
          this.showNoMore = !0;
        }
      }
    } else {
      this.showNoMore = !0;
    }
  },

  // 页面隐藏
  onHide() {
    wx.closeSocket();
  },

  // 页面加载
  async onLoad(options) {
    // mta统计
    mta.Page.init();
    if (wx.getStorageSync("is_update") != 1) {
      this.checkAuth();
    }

    // 删除存储的商品详情的来源
    wx.removeStorageSync("goodsDetailFrom");
    _this.showBlank = true;
  },

  async onShow(options) {
    console.log("index");
    var _this = this;
    _this.page = 1;
    _this.hasMore = true;

    // 设置顶级以便返回的时候使用tab页面
    wx.setStorageSync("tabPage", "index");

    // 计算文档高度
    // const query = wx.createSelectorQuery();
    // query.select("#flag").boundingClientRect();
    // query.selectViewport().scrollOffset();
    // query.exec(function(res) {
    //   console.log(
    //     "res.scrollTop,this.globalData.indexScrollTop",
    //     res.scrollTop,
    //     _this.globalData.indexScrollTop
    //   );
    //   var scrollTop = Math.min(_this.globalData.indexScrollTop, res.scrollTop);
    //   if (scrollTop) {
    //     wx.pageScrollTo({
    //       scrollTop: scrollTop - 300
    //     });
    //   }
    // });
    // 往上滚动
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    });

    // 登录
    const checkSession = await util.checkSession();
    console.log("checkSession");
    if (!checkSession || !wx.getStorageSync("token")) {
      let loginResult = await util.login();
      if (loginResult && loginResult.code) {
        wx.setStorageSync("code", loginResult.code);
        let tokenResult = await request.get(api.Login, {
          code: loginResult.code,
          register_code: wx.getStorageSync("register_code"),
          assistance: wx.getStorageSync("assistance")
        });
        console.log("app全局登录");

        if (tokenResult && tokenResult.data && tokenResult.data.token) {
          wx.setStorageSync("token", tokenResult.data.token);
          wx.setStorageSync(
            "register_code",
            tokenResult.data.user.register_code
          );
          wx.setStorageSync("is_update", tokenResult.data.user.is_update);

          // 获取红包等数据 需要登录的
          _this.getPacks();
        }
      }
    } else {
      // 已经登录了
      // 获取红包等数据 需要登录的
      _this.getPacks(
        wx.getStorageSync("register_code_url"),
        wx.getStorageSync("assistance_url")
      );
    }

    // const { id } = options;
    // _this.globalData.id = id;

    // 获取首页数据
    _this.getIndexData();
    // 获取步数
    _this.getWeRunData();

    // 获取新手专区数据 act=duobao&op=newbornZone
    _this.getNewZone();

    // 最新开奖 IndexLatestAward
    _this.getLatestAward();

    // 夺宝列表 IndexDuobao
    _this.getDuobaoList();

    // socket
    util.socket(function(res) {
      if (res && res.data) {
        var data = JSON.parse(res.data);
        console.log(data.updateoddtimes);
        console.log(data.newwin);

        if (data.updateoddtimes && data.updateoddtimes.length > 0) {
          _this.updateData(data.updateoddtimes);
        }
        if (data.newwin && data.newwin.length > 0) {
          _this.latestAwardList = data.newwin;
        }
      }
    });
  }
};
</script>

<style scoped lang='scss'>
@import "../../common/style/variable";
.page {
  position: relative;
}

button {
  position: static;
  display: block;
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: content-box;
  font-size: 18px;
  text-align: center;
  text-decoration: none;
  line-height: 1;
  border-radius: 0;
  -webkit-tap-highlight-color: transparent;
  overflow: hidden;
  color: #000000;
  background-color: transparent;
}

button::before,
button::after {
  content: "";
  margin: 0;
  padding: 0;
  border: 0;
  width: 0;
  height: 0;
  display: none;
}

button::after {
  border: none;
}

@font-face {
  font-family: "DIN Condensed";
  src: url(data:application/x-font-ttf;charset=utf-8;base64,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)
    format("truetype");
  font-style: normal;
  font-weight: normal;
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

@keyframes redEnvelope {
  0% {
    transform: rotate(0deg);
  }

  17% {
    transform: rotate(15deg);
  }

  33% {
    transform: rotate(0deg);
  }

  66% {
    transform: rotate(-15deg);
  }

  100% {
    transform: rotate(0deg);
  }
}

@keyframes star-ani {
  0% {
    opacity: 0.3;
    transform: scale(0) rotate(0) translate3d(0, 0, 0);
  }

  50% {
    opacity: 0.7;
    transform: scale(1) rotate(0) translate3d(-250rpx, 250rpx, 0);
  }

  100% {
    opacity: 0;
    transform: scale(1) rotate(0) translate3d(-400rpx, 400rpx, 0);
  }
}

@keyframes prize-ani {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(15rpx);
  }

  100% {
    transform: translateY(0);
  }
}

.shootingStar {
  width: 100%;
  overflow: hidden;
  height: 400rpx;
  position: absolute;
  top: 0;
}

.star {
  display: block;
  width: 15rpx;
  height: 15rpx;
  border-radius: 50%;
  background: #fff;
  top: 0;
  left: 300rpx;
  animation: star-ani 6s 1s infinite linear;
  transform-origin: 100% 0;
  box-shadow: 0 0 5rpx 5rpx rgba(255, 255, 255, 0.3);
  opacity: 0;
  z-index: 2;
  position: absolute;
}

.star:after {
  content: "";
  display: block;
  top: 0;
  left: 6rpx;
  border: 0 solid #fff;
  border-width: 0 180rpx 4rpx 180rpx;
  border-color: transparent transparent transparent rgba(255, 255, 255, 0.3);
  transform: rotate(-45deg) translate3d(3rpx, 9rpx, 0);
  box-shadow: 0 0 1rpx 0 rgba(255, 255, 255, 0.1);
  transform-origin: 0 100%;
}

.pink {
  top: 30rpx;
  left: 395rpx;
  background: #fff;
  animation-delay: 3s;
}

.pink:after {
  border-width: 0 120rpx 3rpx 120rpx;
  border-color: transparent transparent transparent #fff;
  animation-delay: 3s;
}

.blue {
  top: 35rpx;
  left: 532rpx;
  background: #fff;
  animation-delay: 5.5s;
}

.blue:after {
  border-width: 0 150rpx 3rpx 150rpx;
  border-color: transparent transparent transparent #fff;
  animation-delay: 5.5s;
}

.yellow {
  top: 70rpx;
  left: 570rpx;
  background: #fff;
  animation-delay: 7.8s;
}

.yellow:after {
  border-width: 0 120rpx 3rpx 120rpx;
  border-color: transparent transparent transparent #fff;
  animation-delay: 7.8s;
}

.green {
  top: 150rpx;
  left: 600rpx;
  background: #fff;
  animation-delay: 6.2s;
}

.green:after {
  border-width: 0 150rpx 3rpx 150rpx;
  border-color: transparent transparent transparent #fff;
  animation-delay: 6.2s;
}

.red {
  top: 350rpx;
  left: 630rpx;
  background: #fff;
  animation-delay: 8.8s;
}

.red:after {
  border-width: 0 120rpx 3rpx 120rpx;
  border-color: transparent transparent transparent #fff;
  animation-delay: 8.8s;
}

.topArea {
  width: 750rpx;
  min-height: 676rpx;
  position: relative;
  background: url("#{$img_url}index_banner_bg.png") no-repeat center top;
  background-size: 750rpx 441rpx;
  padding-top: 30rpx;
  box-sizing: border-box;
  border-bottom: 16rpx solid #f8f8f8;
}

.topArea .moneyInfo {
  position: relative;
  width: 387rpx;
  height: 60rpx;
  line-height: 60rpx;
  margin: 0 auto 19rpx;
  padding-left: 28rpx;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 30rpx;
  font-size: 28rpx;
  color: #ffffff;
}

.topArea .moneyInfo .balance {
  font-family: PingFang-SC-Heavy;
  font-size: 28rpx;
  margin-left: 24rpx;
  font-weight: 900;
}

.topArea .moneyInfo .cash {
  position: absolute;
  font-family: PingFang-SC-Medium;
  font-size: 28rpx;
  color: #fdde64;
  right: 28rpx;
  font-weight: 500;
}

.topArea .powerCoin {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  height: 48rpx;
  z-index: 5;
  font-family: PingFang-SC-SemiBold;
  width: 100px;
  font-size: 28rpx;
  padding-right: 8px;
  line-height: 48rpx;
  border-top-right-radius: 24rpx;
  border-bottom-right-radius: 24rpx;
  color: #fff;
  background: rgba(0, 0, 0, 0.13) url(#{$img_url}icon_arr_r_white.png) no-repeat
    right center;
  background-size: 12px;
}

.topArea .powerCoin .agentCoinInteger {
  background: url(#{$img_url}icon_pack_xsm.png) no-repeat 12rpx center;
  background-size: 34rpx 34rpx;
  padding-left: 56rpx;
}

.topArea .powerCoin .addCoin {
  position: absolute;
  left: 164rpx;
  top: 20rpx;
  width: 39rpx;
  height: 39rpx;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAYAAACMo1E1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAERUlEQVRYw9WYzUsjSRTAf9XZjc44xoN6223RJYlzGPawix+XBRUFBYP5AwZWBCOCxn9FkQUP6oKXvZkgJIjoYS9i3Mue7HQYJRlvJgfj52Q2qT2kO7TxKx3jiO+Sei/1qn71qrv61RNUIVJKB+AC3gFvgHpAARxAHigA18AVcA5khRB5u/MIm1AuoBVosukrgVPgRAiRrSmclLIB+BFosLv6O+QC+CyEuHgSnJRSAX4wonVDYrEYkUiEWCxGPB4nk8lwenpKU1MTzc3NeL1eurq6GBkZoaur667hT4BjIUTBNpyU0gn8BLw1bdfX1ywvL7OwsICu6xWHyuPxMDs7y8TEBPX19da/LoFPQohcxXBSynrADThN28bGBjMzMySTyYqhykVVVRYXFxkdHbWac0BCCHFd3l+5J2IlsFwux9TUFD6f70lgAKlUCp/PRyAQIJcrBcsJuI1574+c8Yx5Mbby7OwMv9/P9vb2k6DukoGBAdbX12lsbDRNl0Dc+gyWw6kYD38ul2N4eJidnZ2ag5nS399PNBrF6SwF7UQIkTKV0rYax0XprQwGg88KBrCzs0MwGLSaWg2Om5GTUnZinGOhUAi/3/+sYFYJh8P4fD5TvRBCaKXIGSd/AxSPi7LVVCSapk3n8/m/NU2btus7OzvL1dWVqTYYPKVtLW3nysoKqVTK5vDg8Xh+VxTlrcfj+WjXN5lMsrq6ajW1AgjjI/4zxhZ7vV5bB6wpUsp/zLYQ4le7/l6vF03TSsMB/yoUswsBsL+/XxVYLSQej7O3t1daH+BSKKY9AGxubr4ImClbW1tW9Z1CMR8DYHd390XhyuZ/owB1pnZwcPCicGXz131HMXsFIJPJPOisadq0x+P5KIT4/qF+1pfDYvuq6/paZ2fnH/f5pdNpq+oQUspfTE2Ih3PPQqGw+xjYI/6XDofjt0cWVmorFHN+AFwu14OD67q+JqX8Wg2YlPK/RCLx10N9LEkAQF5IKT9gpEcdHR0cHR1VFZWnnnMA7e3tHB4emmpOAb6Y2vv376sCq5WUzf9FoXh9A6Cnp+dF4Xp7e63qlULxXgnA0NDQi8INDg5a1XMFyFL8ltHd3Y3b7X4RMLfbTXd3t6lKIKsYN/FT0zo3N1fV4FLKgvFb1dtcNu+pECJvpkwnpnV8fBxVVW0Pruv6n4VC4UrX9TW7vqqqMj4+bjWdwGvIhA35bDbGxsYIBALfBCwQCFjBAI7Nxuu4fVmoLwGcTiehUIiBgYFnAevr6yMUClnBLq1RuwVnXGg/USwR0NjYSCQSYXJysqZgk5OTRKNR67c0R7FmcqOoc6scYRRVEiag0+lkaWmJcDhMW1vbk6BUVSUUCrG0tERdXSmNNGslt4o5VVWZ5ufnSSQSFUO53W6CwWBtqkwWwIrrc+l0mmw2i8vloqWl5Xnrc2WQta5sHgshzh/r+PprwndAfpNq+v9GH9m4WpREtwAAAABJRU5ErkJggg==)
    no-repeat;
  background-size: 39rpx 39rpx;
}

.topArea .coinBubble {
  margin: 0 auto;
  width: 194rpx;
  height: 55rpx;
  line-height: 45rpx;
  text-align: center;
  background: url("https://img1.zhuanstatic.com/open/zhuanzhuan/zzwa/runningbear/newIndex/coinBubble.png")
    no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 40rpx;
  left: 280rpx;
  font-size: 22rpx;
  color: #ffffff;
}

.topArea .asyncRun {
  position: absolute;
  top: 241rpx;
  left: 118rpx;
  width: 42rpx;
  height: 42rpx;
}

.topArea .your-style {
  font-family: "DIN Condensed";
  font-weight: bold;
  font-style: normal;
}

.topArea .stepTitle {
  display: block;
  font-size: 22rpx;
  line-height: 33rpx;
  color: #ffffff;
}

.topArea .stepNum {
  display: block;
  font-family: "DIN Condensed";
  font-weight: 700;
  font-size: 40rpx;
  line-height: 33rpx;
  margin-top: 10rpx;
  color: #ffffff;
}

.topArea .werunStep {
  position: absolute;
  top: 225rpx;
  left: 25rpx;
  width: 90rpx;
  text-align: center;
}

.topArea .stepDetail {
  position: absolute;
  top: 35rpx;
  right: 30rpx;
  width: 148rpx;
  height: 42rpx;
  line-height: 45rpx;
  text-align: center;
  border-radius: 20rpx;
  font-size: 24rpx;
  color: #ffffff;
  border: solid 1rpx rgba(255, 255, 255, 0.6);
}

.topArea .oneCoinEntry {
  position: absolute;
  top: 105rpx;
  right: 30rpx;
  width: 168rpx;
  height: 42rpx;
  line-height: 45rpx;
  text-align: center;
  border-radius: 20rpx;
  font-size: 24rpx;
  color: #ffffff;
  border: solid 1rpx rgba(255, 255, 255, 0.6);
}

.topArea .friendsStep {
  position: absolute;
  top: 170rpx;
  right: 60rpx;
  width: 90rpx;
  text-align: center;
}

.topArea .systemStep {
  position: absolute;
  top: 303rpx;
  left: 60rpx;
}

.topArea .dailyEnvelope {
  position: absolute;
  top: 414rpx;
  right: 20rpx;
  height: 130rpx;
  width: 108rpx;
  background: url("https://img1.zhuanstatic.com/open/zhuanzhuan/zzwa/runningbear/newIndex/dailyEnvelope.png")
    no-repeat;
  background-size: 100% 100%;
  animation: redEnvelope 0.3s 8;
  animation-fill-mode: forwards;
}

.topArea .award {
  position: absolute;
  top: 290rpx;
  right: 32rpx;
  height: 127rpx;
  width: 106rpx;
  font-family: "DIN Condensed";
  font-size: 48rpx;
  line-height: 98rpx;
  color: #fff;
  text-align: center;
  z-index: 5;
  animation: redEnvelope 0.3s 8;
  animation-fill-mode: forwards;
}

.topArea .inviteBg {
  background: url("https://pic1.zhuanstatic.com/zhuanzh/n_v22bbe1cf24df143a8bc7ad37781850324.png")
    no-repeat;
  background-size: 100% 100%;
}

.topArea .activeBg {
  background: url("https://pic1.zhuanstatic.com/zhuanzh/n_v295c661a2681d43b789f2353ae40962d2.png")
    no-repeat;
  background-size: 100% 100%;
}

.topArea .scaleSize {
  font-size: 36rpx;
}

.topArea .centerData {
  position: relative;
  z-index: 3;
  margin: 0 auto;
  width: 340rpx;
  height: 320rpx;
  background: url("https://pic1.zhuanstatic.com/zhuanzh/n_v2649a06032f744127a30dfa346ff15d1a.png")
    no-repeat center top;
  background-size: 320rpx 246rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-start;
}

.topArea .centerData-nickName {
  font-family: PingFang-SC-Medium;
  font-size: 22rpx;
  color: #fff;
  margin-top: 48rpx;
  line-height: 30rpx;
}

.topArea .centerData-totalStep {
  font-family: "DIN Condensed";
  font-weight: bold;
  font-size: 120rpx;
  line-height: 120rpx;
  color: #fff;
  padding-top: 20rpx;
  padding-left: 28rpx;
}

.topArea .centerData-totalStep .step-class {
  font-family: PingFang-SC-Semibold;
  font-size: 28rpx;
}

.topArea .centerData-stepTips {
  font-family: PingFang-SC-Medium;
  font-size: 22rpx;
  letter-spacing: 0;
  color: #fff;
  margin-top: -20rpx;
}

.topArea .centerData-stepBottom {
  margin-top: 16rpx;
  width: 256rpx;
  height: 56rpx;
  background: url(#{$img_url}index_btn.png) no-repeat center center;
  background-size: 256rpx 56rpx;
  font-family: PingFang-SC-HK;
  font-size: 24rpx;
  line-height: 56rpx;
  text-align: center;
  color: #ff3b30;
}

.topArea .inviteNew {
  position: absolute;
  top: 349rpx;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  width: 447rpx;
  height: 143rpx;
  margin: 10rpx auto 0;
  padding-top: 41rpx;
  box-sizing: border-box;
  background: url(#{$img_url}index_invite_btn.png) no-repeat;
  background-size: 100% 100%;
  font-size: 32rpx;
  color: #ffffff;
  font-family: "PingFang-SC-Medium";
  padding-left: 36rpx;
  text-shadow: 0 2rpx 4rpx 0 rgba(255, 107, 0, 0.5);
}

.middleArea {
  width: 702rpx;
  display: flex;
  justify-content: space-around;
  margin: 150rpx auto 32rpx;
  height: 141rpx;
}

.middleArea .card {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.middleArea .card-pic {
  width: 124rpx;
  height: 124rpx;
}

.middleArea .card-name {
  font-family: PingFang-SC-Medium;
  font-size: 24rpx;
  color: #333;
  line-height: 33rpx;
}

.middleArea .card-icon {
  position: absolute;
  left: 50%;
  top: -5rpx;
  min-width: 54rpx;
  height: 28rpx;
  line-height: 30rpx;
  background-image: linear-gradient(-136deg, #ff8e8e 0, #ff5555 100%);
  border: 2rpx solid #ffffff;
  border-radius: 28rpx 28rpx 28rpx 2rpx;
  font-family: PingFangSC-Semibold;
  font-size: 20rpx;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
  text-shadow: 0 1rpx 2rpx rgba(225, 0, 0, 0.5);
  padding: 0 8rpx;
}

.good_box {
  width: 40rpx;
  height: 40rpx;
  position: fixed;
  border-radius: 50%;
  overflow: hidden;
  opacity: 1;
  left: 50%;
  top: 50%;
  z-index: 99;
  border: 1rpx solid rgba(0, 116, 255, 0.61);
  background: rgba(120, 188, 255, 0.2);
}

.good_box image {
  display: block;
  width: 100%;
  height: 100%;
}

.hideBox {
  opacity: 0;
}

.prize-common {
  width: 132rpx;
  animation: prize-ani 2s infinite;
  z-index: 15;
}

.prize-common-num {
  width: 44px;
  height: 44px;
  padding-top: 16px;
  box-sizing: border-box;
  background: url(#{$img_url}icon_pack_float.png) no-repeat center top;
  background-size: 100% 100%;
  font-family: "DIN Condensed";
  font-size: 16px;
  text-align: center;
  line-height: 22px;
  color: #ffecba;
  margin: 0 auto;

  .unit {
    display: inline-block;
    font-size: 10px;
  }
}

.prize-common-num text {
  display: inline-block;
  font-weight: normal;
  font-size: 20rpx;
  padding-left: 2rpx;
}

.prize-common-name {
  font-family: PingFang-SC-Semibold;
  font-size: 22rpx;
  color: #fff;
  text-align: center;
  padding-top: 8rpx;
  line-height: 30rpx;
  background: rgba(0, 0, 0, 0.11);
  border-radius: 16rpx;
  line-height: 32rpx;
  padding: 0 12rpx;
}
.adv-prize {
  position: absolute;
  top: 50rpx;
  left: 20rpx;
}

.collect-prize {
  position: absolute;
  top: 240rpx;
  left: 100rpx;
}

.breathe-btn {
  animation: breathe 1.2s infinite linear;
}
/* 签到气泡红包 */
.signin-prize,
.attendanceReward {
  position: absolute;
  right: 40rpx;
  top: 260rpx;
}
/* 新用户红包 */
.new-user-prize,
.newReward {
  position: absolute;
  top: 60rpx;
  left: 50rpx;
  z-index: 89;
}
/* 邀请拉新红包 */
.invite-new-prize,
.invitationReward {
  position: absolute;
  top: 200rpx;
  left: 50rpx;
  z-index: 89;
}

/* 好友夺宝兑换 */
.friendsduobaoReward {
  position: absolute;
  top: 20rpx;
  right: 60rpx;
  z-index: 89;
}
/* 兑换商品收益 */
.duobaoReward {
  position: absolute;
  top: 140rpx;
  right: 60rpx;
  z-index: 89;
}

.recall-user-prize {
  position: absolute;
  top: 40rpx;
  right: 20rpx;
  z-index: 89;
}

.friend-help-prize {
  position: absolute;
  top: 290rpx;
  left: 10rpx;
  z-index: 89;
}

.activity-challenge {
  width: 686rpx;
  height: 200rpx;
  margin: 0 auto 24rpx;
}

.activity-challenge image {
  width: 100%;
  height: 100%;
  border-radius: 6px;
}

.left-top {
  position: absolute;
  left: 20rpx;
  top: 50rpx;
}

.left-bottom {
  position: absolute;
  left: 30rpx;
  top: 200rpx;
}

.middle-top {
  position: absolute;
  right: 10rpx;
  top: 100rpx;
}

.right-top {
  position: absolute;
  right: 100rpx;
  top: 0;
}

.right-bottom {
  position: absolute;
  right: 50rpx;
  top: 250rpx;
}

.share-group {
  position: absolute;
  top: 0;
  right: 100rpx;
  width: 104rpx;
  height: 160rpx;
  z-index: 50;
  animation: prize-ani 2s infinite;
}

.share-group-image {
  width: 96rpx;
  height: 96rpx;
  background: url(https://pic1.zhuanstatic.com/zhuanzh/n_v27f55d2b6747841ad9e557bd75d2d4e80.png)
    no-repeat center center;
  background-size: 100% 100%;
}

.share-group-name {
  font-family: PingFang-SC-Medium;
  font-size: 20rpx;
  color: #fff;
  text-align: center;
  line-height: 24rpx;
  padding: 4rpx 0;
  background: rgba(0, 0, 0, 0.11);
  border-radius: 8rpx;
}

page {
  background: #8054ff;
}

ad {
  position: absolute;
  bottom: 0;
}

.outPage {
  position: relative;
}

.fixed-position {
  width: 100%;
  height: 1rpx;
  position: fixed;
  visibility: hidden;
}

.Recommend {
  position: relative;
  width: 100%;
  background-color: #fff;
  height: 90rpx;
}

.Recommend-title {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.Recommend-title text {
  display: inline-block;
}

.Recommend-title .left {
  font-family: PingFang-SC-Semibold;
  font-size: 40rpx;
  color: #2e3135;
  line-height: 56rpx;
  padding-top: 26rpx;
  padding-left: 32rpx;
}

.Recommend-title .right {
  font-family: PingFang-SC-Regular;
  font-size: 28rpx;
  color: #9b9b9b;
  line-height: 40rpx;
  padding-right: 24rpx;
  padding-top: 39rpx;
}

.goodslist {
  position: sticky;
  z-index: 10;
  height: 88rpx;
}

.tabsArea {
  z-index: 10;
  width: 718rpx;
  height: 88rpx;
  line-height: 88rpx;
  background: #fff;
  white-space: nowrap;
  padding-left: 32rpx;
}

.tabsArea .tab {
  display: inline-block;
  height: 82rpx;
  margin-right: 32rpx;
  box-sizing: border-box;
}

.tabsArea .tabSelected {
  font-family: PingFangHK-Semibold;
  font-weight: 700;
  font-size: 28rpx;
  color: #ff5555;
  border-bottom: 4rpx solid #ff5555;
}

.tabsArea .tabUnselected {
  font-size: 28rpx;
  color: #2e3135;
}

.guide {
  position: fixed;
  top: 30rpx;
  left: 400rpx;
  z-index: 10000;
  font-size: 80rpx;
}

.block-line {
  width: 100%;
  height: 70rpx;
}

.banner {
  border-bottom: 16rpx solid #f8f8f8;
}

.indexBanner {
  margin: 24rpx auto;
  width: 702rpx;
  height: 240rpx;
  background: #fff;
  overflow: hidden;
  border-radius: 8rpx;
  box-shadow: 0 2rpx 7rpx rgba(0, 0, 0, 0.16);
}
.indexBanner img {
  width: 100%;
  height: 100%;
}

.loading {
  background: url(https://img1.zhuanstatic.com/open/zhuanzhuan/zzwa/common/loading2.gif)
    no-repeat center center #8054ff;
  background-size: 115rpx 100rpx;
  width: 750rpx;
  height: 100vh;
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
}

.friendsInfo {
  position: fixed;
  z-index: 10;
  right: 46rpx;
  top: 106rpx;
  min-width: 302rpx;
  max-width: 500rpx;
  height: 48rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #f85852;
  border-radius: 23rpx;
  padding-right: 33rpx;
}

.friendsInfo .friendPic {
  margin-left: 2rpx;
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
}

.friendsInfo .friendTxt {
  margin-left: 18rpx;
  font-size: 22rpx;
  color: #ffffff;
}

.runningGoods {
  width: 100%;
}

.back-top {
  width: 108rpx;
  height: 108rpx;
  border-radius: 50%;
  position: fixed;
  bottom: 140rpx;
  right: 10rpx;
  text-align: center;
  z-index: 101;
  line-height: 24rpx;
}

.back-top text {
  position: absolute;
  top: 28rpx;
  right: 28rpx;
}

.back-top image {
  width: 100%;
  height: 100%;
}

// 新人
.GoodCardA {
  position: relative;
  width: 330rpx;
  background-color: #fff;
  box-shadow: 0 2rpx 14rpx 0 rgba(144, 144, 144, 0.12);
  border-radius: 10rpx;
  margin-bottom: 26rpx;
}

.GoodCardA .makeSubmit {
  position: static;
  display: block;
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: content-box;
  font-size: 18px;
  text-align: center;
  text-decoration: none;
  line-height: 1;
  border-radius: 0;
  -webkit-tap-highlight-color: transparent;
  overflow: hidden;
  color: #000000;
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.GoodCardA .makeSubmit::before,
.GoodCardA .makeSubmit::after {
  content: "";
  margin: 0;
  padding: 0;
  border: 0;
  width: 0;
  height: 0;
  display: none;
}

.GoodCardA .statusLogo {
  position: absolute;
  vertical-align: middle;
  left: 101rpx;
  width: 128rpx;
  height: 128rpx;
  border-radius: 50%;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  font-size: 28rpx;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  top: 101rpx;
  line-height: 128rpx;
  text-align: center;
}

.GoodCardA image {
  width: 330rpx;
  height: 330rpx;
}

.GoodCardA-title {
  font-size: 30rpx;
  color: #2e3135;
  box-sizing: border-box;
  width: 299rpx;
  height: 30rpx;
  line-height: 30rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 20rpx;
  margin-left: 16rpx;
}

.GoodCardA-labels {
  margin: 18rpx auto auto 10rpx;
  height: 28rpx;
}

.GoodCardA-labels image {
  display: inline-block;
}

.GoodCardA-labels .free,
.GoodCardA-labels .fuli {
  width: 56rpx;
  height: 28rpx;
  margin: 0 6rpx;
}

.GoodCardA-labels .youfei {
  width: 136rpx;
  height: 28rpx;
  margin: 0 6rpx;
}

.GoodCardA-price {
  width: 298rpx;
  font-size: 36rpx;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  position: relative;
  margin: 14rpx auto;
  height: 50rpx;
  line-height: 50rpx;
}

.GoodCardA-price .coinStep {
  display: inline-block;
  color: #f6a000;
  background: url(https://pic1.zhuanstatic.com/zhuanzh/n_v2693e0243c74f4c5fa381c0679844fad4.png)
    no-repeat 0 center;
  background-size: 32rpx 32rpx;
  padding-left: 45rpx;
  padding-top: 0;
}

.GoodCardA-price .payInfo {
  display: inline-block;
}

.GoodCardA-price .payInfo .payPrice {
  font-size: 36rpx;
  color: #f55;
  margin-right: 5rpx;
}

.GoodCardA-price .oriStep {
  position: absolute;
  right: 0;
  bottom: 0;
  color: #9b9b9b;
}

.GoodCardA-price .oriStep text {
  text-decoration: line-through;
}

.GoodCardA-exchange {
  width: 299rpx;
  height: 56rpx;
  margin: 16rpx auto 0;
  background-color: #ff5555;
  border-radius: 28rpx;
  font-family: PingFang-SC-Medium;
  font-size: 28rpx;
  color: #fff;
  text-align: center;
  line-height: 56rpx;
}

.ad {
  width: 330rpx;
  height: 510rpx;
}

.ad image {
  width: 100%;
  height: 100%;
}

.new._b790fd0 {
  border-bottom: 16rpx solid #f8f8f8;
}

.head._b790fd0 {
  width: 100%;
  height: 110rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title._b790fd0 {
  font-family: PingFang-SC-Medium;
  font-size: 40rpx;
  color: #2e3135;
  line-height: 56rpx;
  padding-left: 32rpx;
}

.more._b790fd0 {
  background: url(https://img1.zhuanstatic.com/open/zhuanzhuan/zzwa/runningbear/mine/slice.png)
    no-repeat right center;
  background-size: 28rpx 28rpx;
  font-family: PingFang-SC-Regular;
  color: #9b9b9b;
  font-size: 28rpx;
  line-height: 40rpx;
  margin-right: 24rpx;
  padding-right: 30rpx;
}

.list {
  display: flex;
  flex-flow: row wrap;
}

.list .GoodCardA._b790fd0 {
  overflow: hidden;
  display: inline-block;
}

.GoodCardA._b790fd0 {
  position: relative;
  width: 330rpx;
  background-color: #fff;
  box-shadow: 0 2rpx 14rpx 0 rgba(144, 144, 144, 0.12);
  border-radius: 10rpx;
  margin-bottom: 26rpx;
}

.GoodCardA .makeSubmit._b790fd0 {
  position: static;
  display: block;
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: content-box;
  font-size: 18px;
  text-align: center;
  text-decoration: none;
  line-height: 1;
  border-radius: 0;
  -webkit-tap-highlight-color: transparent;
  overflow: hidden;
  color: #000000;
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.GoodCardA .makeSubmit._b790fd0::before,
.GoodCardA .makeSubmit._b790fd0::after {
  content: "";
  margin: 0;
  padding: 0;
  border: 0;
  width: 0;
  height: 0;
  display: none;
}

.GoodCardA image._b790fd0 {
  width: 330rpx;
  height: 330rpx;
}

.GoodCardA-title._b790fd0 {
  font-size: 30rpx;
  color: #2e3135;
  box-sizing: border-box;
  width: 299rpx;
  height: 30rpx;
  line-height: 30rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 20rpx;
  margin-left: 16rpx;
}

.GoodCardA-price._b790fd0 {
  font-size: 24rpx;
  position: relative;
  margin: 8rpx 0 20rpx;
  height: 50rpx;
  background: url(https://pic1.zhuanstatic.com/zhuanzh/n_v2693e0243c74f4c5fa381c0679844fad4.png)
    no-repeat 16rpx center;
  background-size: 32rpx 32rpx;
  padding-left: 56rpx;
  line-height: 50rpx;
  font-family: PingFang-SC-Medium;
  font-size: 36rpx;
  color: #f6a000;
}

.div-more._b790fd0 {
  padding-top: 6rpx;
  padding-bottom: 32rpx;
  text-align: center;
}

.div-more text._b790fd0 {
  display: inline-block;
  background: url(https://img1.zhuanstatic.com/open/zhuanzhuan/zzwa/runningbear/mine/slice.png)
    no-repeat right center;
  background-size: 28rpx 28rpx;
  font-family: PingFang-SC-Regular;
  font-size: 28rpx;
  color: #9b9b9b;
  line-height: 40rpx;
  padding-right: 35rpx;
  margin: 0 auto;
}

//一元换购
.one-coin._2edb85c {
  border-bottom: 16rpx solid #f8f8f8;
}

.head._2edb85c {
  width: 100%;
  height: 110rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title._2edb85c {
  font-family: PingFang-SC-Medium;
  font-size: 40rpx;
  color: #2e3135;
  line-height: 56rpx;
  padding-left: 32rpx;
}

.more._2edb85c {
  background: url(https://img1.zhuanstatic.com/open/zhuanzhuan/zzwa/runningbear/mine/slice.png)
    no-repeat right center;
  background-size: 28rpx 28rpx;
  font-family: PingFang-SC-Regular;
  color: #9b9b9b;
  font-size: 28rpx;
  line-height: 40rpx;
  margin-right: 24rpx;
  padding-right: 30rpx;
}

.box._2edb85c {
  width: 686rpx;
  height: 392rpx;
  margin: 0 auto;
}

.swiper._2edb85c {
  width: 100%;
  height: 100%;
}

.swiper-item._2edb85c {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 10rpx;
}

.goods._2edb85c {
  position: relative;
  width: 218rpx;
  height: 326rpx;
  background-color: #fff;
  box-shadow: 0 8rpx 16rpx 0 rgba(74, 74, 74, 0.08);
  border-radius: 10rpx;
  margin-bottom: 12rpx;
}

.goods image._2edb85c {
  width: 218rpx;
  height: 218rpx;
  border-top-left-radius: 10rpx;
  border-top-right-radius: 10rpx;
}

.goods-title._2edb85c {
  font-size: 24rpx;
  color: #2e3135;
  box-sizing: border-box;
  width: 194rpx;
  height: 30rpx;
  line-height: 30rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 12rpx;
  margin-left: 12rpx;
}

.goods-price._2edb85c {
  font-size: 24rpx;
  position: relative;
  height: 50rpx;
  background: url(https://pic1.zhuanstatic.com/zhuanzh/n_v2693e0243c74f4c5fa381c0679844fad4.png)
    no-repeat 12rpx center;
  background-size: 32rpx 32rpx;
  padding-left: 52rpx;
  line-height: 50rpx;
  font-family: PingFang-SC-Medium;
  font-size: 36rpx;
  color: #f6a000;
}

// 推荐商品
.tabsArea {
  width: 718rpx;
  height: 88rpx;
  line-height: 88rpx;
  background: #fff;
  white-space: nowrap;
  padding-left: 32rpx;
}

.tabsArea .tab {
  display: inline-block;
  height: 84rpx;
  margin-right: 32rpx;
}

.tabsArea .tabSelected {
  font-family: PingFangHK-Semibold;
  font-weight: 700;
  font-size: 28rpx;
  color: #ff5555;
  border-bottom: 4rpx solid #ff5555;
}

.tabsArea .tabUnselected {
  font-size: 28rpx;
  color: #2e3135;
}

.stickyTop {
  position: fixed;
  z-index: 100;
}

.otherTop {
  padding-top: 1rpx;
}

.indexTop {
  padding-top: 1rpx;
}

.RecommendGoods {
  position: relative;
  width: 100%;
  background-color: #ffffff;
}

.RecommendGoods-title {
  background: url(https://pic5.zhuanstatic.com/zhuanzh/n_v2e75fb35bd46f4c1e8ae5daabb4fe2fe2.png)
    no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 45rpx;
}

.RecommendGoods-intro {
  width: 100%;
  text-align: center;
  font-size: 20rpx;
  color: #9b9b9b;
  margin-bottom: 22rpx;
}

.RecommendGoods-intro-new {
  float: right;
  background: url("https://pic1.zhuanstatic.com/zhuanzh/n_v261ed2b67db0d4dc5a09d23ddb06fdb54.png")
    no-repeat;
  background-size: 100% 100%;
  width: 104rpx;
  text-align: center;
  height: 29rpx;
  line-height: 24rpx;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  font-size: 18rpx;
  color: #ffffff;
  margin-right: 160rpx;
  margin-top: -65rpx;
}

.RecommendGoods-freeTip {
  position: absolute;
  right: -30rpx;
  top: 87rpx;
  width: 204rpx;
  height: 45rpx;
  line-height: 45rpx;
  text-align: center;
  font-size: 28rpx;
  color: #ffffff;
  background-color: #fdae64;
  border-radius: 22rpx 0 0 22rpx;
}

.RecommendGoods-freeTipNew {
  position: fixed;
  right: 32rpx;
  bottom: 32rpx;
  width: 142rpx;
  height: 142rpx;
  background: url("https://img1.zhuanstatic.com/open/zhuanzhuan/zzwa/runningbear/newIndex/exchangeRecord.png")
    no-repeat;
  background-size: 100% 100%;
  z-index: 10;
}

.RecommendGoods-list {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  /* width: 686rpx; */
  margin-top: 32rpx;
  /* margin-left: 32rpx; */
  padding-bottom: 10rpx;
}

.RecommendGoods-list .GoodCardA {
  overflow: hidden;
  display: inline-block;
}

.RecommendGoods-more {
  margin-top: -9rpx;
  background: #fff;
  height: 88rpx;
  line-height: 88rpx;
  font-size: 28rpx;
  text-align: center;
  color: #6d6f73;
}

.RecommendGoods-more text {
  letter-spacing: -5rpx;
}

.ad-banner {
  display: block;
  margin-bottom: 26rpx;
  box-sizing: border-box;
  position: static;
  background: #f8f8f8;
  border-radius: 10rpx;
}
.loading-tip._be7d132 {
  width: 100%;
  height: 76rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 80rpx;
}

.loading-tip image._be7d132 {
  width: 76rpx;
  height: 76rpx;
}

.loading-tip text._be7d132 {
  font-size: 30rpx;
  color: #5b5a5a;
}

.text._be7d132 {
  text-align: center;
  color: #9b9b9b;
  font-size: 28rpx;
}
.advBanner {
  height: 150px !important;

  swiper {
    width: 100%;
    height: 100%;

    swiper-item {
      width: 100%;
      height: 100%;
    }
  }

  .pic {
    height: 114px !important;
    border-radius: 6px;
  }

  .banner-tip {
    width: 100%;
    height: 80rpx;
    padding: 0 27rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .banner-tip-title {
    font-size: 28rpx;
    color: #2e3135;
    line-height: 40rpx;
  }
}
</style>
