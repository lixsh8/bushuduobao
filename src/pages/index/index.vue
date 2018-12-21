<template>
  <div>
    <head-bar
      :title="title"
      :headerBackground="headerBackground"
      :titleColor="titleColor"
    />

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
          bindtap="goStepDetail"
          class="powerCoin"
        >
          <text class="agentCoinInteger">10</text>
          <text class="agentCoinDecimal">000</text>
        </div>
        <!-- 挂着的金币 -->
        <div
          bindtap="handlePrize"
          class="prize-common"
          :class="item.className"
          :data-wpyhandleprize-a="item"
          v-for="(item, index) in prizeList"
          :key="index"
        >
          <div
            class="prize-common-num"
            v-if="item.coin>0"
          >{{item.coin}}<text>币</text>
          </div>
          <div class="prize-common-name">{{item.name}}</div>
        </div>
        <!-- 分享金币 -->
        <button
          bindtap="$RunningTopArea$shareGroup"
          class="share-group"
          data-type="1"
          hoverClass="none"
          openType="share"
        >
          <div class="share-group-image"></div>
          <div class="share-group-name">分享领币</div>
        </button>
        <!-- 赚步数币 -->
        <div
          bindtap="$RunningTopArea$navToAdv"
          class="adv-prize prize-common"
        >
          <div class="prize-common-num">10<text>币</text>
          </div>
          <div class="prize-common-name">赚步数币</div>
        </div>
        <!-- 领取 -->
        <div
          animation="centerAnim"
          bindtap="$RunningTopArea$exchangeCoinTwo"
          class="centerData"
        >
          <div class="centerData-nickName">未兑换步数</div>
          <div class="centerData-totalStep">12123<text class="step-class">步</text>
          </div>
          <div class="centerData-stepTips">每日24点步数清零</div>
          <div
            bindtap="$RunningTopArea$logClick"
            class="centerData-stepBottom"
            v-if="totalStep==0"
          >{{$RunningTopArea$loadingWeRunData?'正在获取...':'获取最新微信步数'}}</div>
          <div
            bindtap="$RunningTopArea$exchangeClick"
            class="centerData-stepBottom breathe-btn"
            wx:else
          >点击兑换成步数币</div>
        </div>
        <!-- 邀请按钮 -->
        <button
          bindtap="$RunningTopArea$inviteNew"
          class="inviteNew"
          data-type="0"
          openType="share"
        >
          邀请新人赚5-20币
        </button>
        <div class="middleArea">
          <div
            bindtap="$RunningTopArea$handleCardBtn"
            class="card"
            data-wpyhandlecardbtn-a="item"
            v-for="(item, index) in cardsList"
            :key="index"
          >
            <div
              class="card-pic"
              :style="{'background': 'url('+item.pic+') no-repeat center top','background-size': '120rpx 120rpx'}"
            ></div>
            <div class="card-name">{{item.name}}</div>
            <div class="card-icon">领12币</div>
          </div>
        </div>
        <div
          bindtap="$RunningTopArea$beginChallenge"
          class="activity-challenge"
          v-if="newUserChallengeBanner"
        >
          <image
            mode="aspectFit"
            :src="newUserChallengeBanner"
          />
        </div>
      </div>

      <!-- 新人专区 -->
      <div
        class="new _b790fd0"
        v-if="newUserZoneInfo.name"
      >
        <div class="head _b790fd0">
          <div class="title _b790fd0">{{newUserZoneInfo.name}}</div>
          <div
            bindtap="$NewUserZone$goActivity"
            class="more _b790fd0"
            data-wpygoactivity-a="newUserZoneInfo.url"
            data-wpygoactivity-b="newUserZoneInfo.id"
          >{{newUserZoneInfo.subTitle}}</div>
        </div>
        <div class="list _b790fd0">
          <div
            bindtap="$NewUserZone$goDetail"
            class="GoodCardA _b790fd0"
            data-wpygodetail-a="$NewUserZone$item"
            v-for="item in newUserZoneInfo.infoList"
            :key="item.id"
          >
            <image
              class="_b790fd0"
              mode="aspectFill"
              :src="item.pic"
            />
            <div class="GoodCardA-title _b790fd0">
              {{item.title}}
            </div>
            <div class="GoodCardA-price _b790fd0">{{item.coin}}</div>
          </div>
        </div>
        <div
          bindtap="$NewUserZone$goActivity"
          class="div-more _b790fd0"
          data-wpygoactivity-a="newUserZoneInfo.url"
          data-wpygoactivity-b="newUserZoneInfo.id"
        >
          <text class="_b790fd0">点击查看更多</text>
        </div>
      </div>

      <!-- 1元兑换 -->
      <div
        class="one-coin _2edb85c"
        wx:if="oneCoinZoneInfo.name"
      >
        <div class="head _2edb85c">
          <div class="title _2edb85c">{{oneCoinZoneInfo.name}}</div>
          <div
            bindtap="$OneCoinZone$goActivity"
            class="more _2edb85c"
            data-wpygoactivity-a="oneCoinZoneInfo.url"
            data-wpygoactivity-b="oneCoinZoneInfo.id"
          >{{oneCoinZoneInfo.subTitle}}</div>
        </div>
        <div class="box _2edb85c">
          <swiper
            class="swiper _2edb85c"
            :autoplay="config.autoplay"
            :circular="config.circular"
            :duration="config.duration"
            :indicatorActiveColor="config.indicatorActiveColor"
            :indicatorColor="config.indicatorColor"
            :indicatorDots="config.indicatorDots"
            :interval="config.interval"
          >
            <swiper-item
              class="swiper-item _2edb85c"
              v-for="(item, index) in oneCoinZoneInfoList"
              :data-index="index"
              :key="item.cid"
            >
              <div
                bindtap="$OneCoinZone$goDetail"
                class="goods _2edb85c"
                data-wpygodetail-a="goods"
                :data-index="goodsindex"
                v-for="(goods, goodsindex)  in item.goods"
                :key="goods.id"
              >
                <image
                  class="_2edb85c"
                  :src="goods.pic"
                />
                <div class="goods-title _2edb85c">{{goods.title}}</div>
                <div class="goods-price _2edb85c">
                  {{goods.coin}}
                </div>
              </div>
            </swiper-item>
          </swiper>
        </div>
      </div>

      <!-- banner -->
      <div class="banner">
        <div
          class="box _3142106 indexBanner"
          wx:if="banners.length>0"
        >
          <swiper
            :autoplay="config.autoplay"
            :circular="config.circular"
            :duration="config.duration"
            :indicatorActiveColor="config.indicatorActiveColor"
            :indicatorColor="config.indicatorColor"
            :indicatorDots="config.indicatorDots"
            :interval="config.interval"
            wx:if="banners.length>1"
          >
            <swiper-item
              catchtap="onBanner"
              class="banner-wrap _3142106"
              data-wpyonbanner-a="index"
              v-for="banner in banners"
              :key="banner.id"
            >
              <image
                class="pic _3142106"
                :src="banner.pic"
              />
              <div class="banner-tip _3142106">
                <div class="banner-tip-title _3142106">{{banner.title}}</div>
              </div>
            </swiper-item>
          </swiper>
          <div
            class="banners single _3142106"
            wx:if="banners.length==1"
          >
            <div
              catchtap="onBanner"
              class="banner-wrap _3142106"
              data-wpyonbanner-a="0"
            >
              <image
                class="pic _3142106"
                :src="banners[0].pic"
              />
              <div class="banner-tip _3142106">
                <div class="banner-tip-title _3142106">{{banners[0].title}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 大家都在免费换  -->
      <view class="Recommend">
        <view class="Recommend-title">
          <text class="left">大家都在免费换</text>
          <text class="right">每周二上新</text>
        </view>
      </view>
      <!-- 商品列表 滚动类别-->
      <view
        class="goodslist"
        id="goodslist"
        style="top: navHeghtpx;"
      >
        <scroll-view
          class="tabsArea"
          scrollIntoView="tab-position"
          scrollX="true"
          v-if="tabs.length"
        >
          <view
            bindtap="changeTab"
            class="tab"
            data-wpychangetab-a="index"
            id="tab-index"
            v-for="(item, index) in tabs"
            :key="index"
          >
            {{item.cateName}}
          </view>
        </scroll-view>
      </view>

      <!-- 商品列表 -->
      <view
        bindtouchend="$RunningGoods$moveEndTab"
        bindtouchstart="$RunningGoods$startTouch"
        class="RecommendGoods"
      >
        <view class="RecommendGoods-list">
          <block
            v-for="item in recList"
            :key="item.id"
          >
            <form
              bindsubmit="$RunningGoods$goodCard$onTap"
              class="GoodCardA"
              data-com-index="$RunningGoods$index"
              data-index="$RunningGoods$index"
              reportSubmit="true"
              v-if="!item.showAd"
            >
              <image
                class="ad"
                mode="aspectFill"
                :src="item.pic"
                v-if="item.appId"
              />
              <block v-else>
                <image
                  mode="aspectFill"
                  :src="item.pic"
                />
                <view
                  class="statusLogo"
                  v-if="!item.ownStock&&item.id"
                >已售罄</view>
                <view class="GoodCardA-title">
                  {{item.name||item.title}}
                </view>
                <view class="GoodCardA-labels">
                  <image
                    class="free"
                    mode="aspectFit"
                    src="https://pic1.zhuanstatic.com/zhuanzh/n_v2af580778b9364c6bb73e0d0e00784548.png"
                    wx:if="!item.freeLable&&item.id"
                  />
                  <image
                    class="youfei"
                    mode="aspectFit"
                    src="https://pic1.zhuanstatic.com/zhuanzh/n_v2ff2e38f4a8384445ae202dd8246d67ca.png"
                    wx:if="item.freeLable&&item.id"
                  />
                </view>
                <view
                  class="GoodCardA-price"
                  wx:if="item.step"
                >
                  <view class="coinStep">
                    <text class="step">{{item.step}}</text>
                  </view>
                </view>
              </block>
              <button
                class="makeSubmit"
                formType="submit"
              ></button>
            </form>

            <ad
              class="ad-banner"
              unitId="adunit-35c5d7764460c855"
              v-if="item.showAd==1"
            ></ad>

            <ad
              class="ad-banner"
              unitId="adunit-33e3062f3743e51e"
              v-if="item.showAd==2"
            ></ad>

          </block>
          <!-- loading -->
          <view
            class="loading-tip _be7d132"
            v-if="showTip"
          >
            <view
              class="text _be7d132"
              v-if="loadText&&loading"
            >{{tip.text}}</view>
            <block v-else>
              <image
                class="loading-icon _be7d132"
                mode="aspectFit"
                :src="tips.noMore.icon"
              />
              <text class="loading-text _be7d132">{{tips.noMore.text}}</text>
            </block>
          </view>

          <!-- 返回頂部 -->
          <back-top :showBackTop="showBackTop"/>
        </view>
      </view>

    </div>
  </div>
</template>

<script>
import headBar from "@/components/headBar";
import backTop from "@/components/backTop";

export default {
  data() {
    return {
      title: "首页",
      headerBackground: "#8054ff",
      titleColor: "#fff",
      showBackTop: true,
      // 金币列表
      prizeList: [
        { coin: 10, name: "新手", className: "left-bottom" },
        { coin: 110, name: "新手", className: "adv-prize" },
        { coin: 10, name: "新手", className: "left-bottom" }
      ],
      // 导航
      cardsList: [
        {
          id: 10,
          name: "夺宝",
          path: "/pages/duobao/main",
          pic:
            "https://pic3.zhuanstatic.com/zhuanzh/n_v2ceb4574225ce4b8fa8b93eb7f4a661fa.png"
        },
        {
          id: 10,
          name: "好友加成",
          path: "/pages/invite/main",
          pic:
            "https://pic3.zhuanstatic.com/zhuanzh/n_v2ceb4574225ce4b8fa8b93eb7f4a661fa.png"
        },
        {
          id: 10,
          name: "我的",
          path: "/pages/mine/main",
          pic:
            "https://pic3.zhuanstatic.com/zhuanzh/n_v2ceb4574225ce4b8fa8b93eb7f4a661fa.png"
        }
      ],
      // 新用户banner
      newUserChallengeBanner:
        "http://pic1.zhuanstatic.com/zhuanzh/n_v2e08361d71bce45978543ebfafe157222.png",
      // 新用户专享
      newUserZoneInfo: {
        id: "1050347089071964161",
        name: "新人专区",
        subTitle: "注册10天内未兑用户专享",
        infoList: [
          {
            id: "1075299398411354112",
            pic:
              "https://pic3.zhuanstatic.com/zhuanzh/n_v21f2a79d9bf894913b4366fa523e31183_bafefbd9e39002df.png?w=600&h=600",
            coin: "5",
            infoUrl: null,
            metric: "4407d08dbd7a61c1403fe4e21c8984fc",
            title: "【新人专属】0.4元福袋"
          },
          {
            id: "1074606862390788096",
            pic:
              "https://pic3.zhuanstatic.com/zhuanzh/n_v270f2518369a74c90b02c0943036db72e_b31e1422093902cb.png?w=600&h=600",
            coin: "10",
            infoUrl: null,
            metric: "7659a20963cd17c21eada1907e560a49",
            title: "【新人限量秒杀】1元话费"
          },
          {
            id: "1074920443065925632",
            pic:
              "https://pic2.zhuanstatic.com/zhuanzh/n_v2561a43f9dcde472bb61b80d8815e3606_0764e0d7b2833055.jpg?w=600&h=600",
            coin: "30",
            infoUrl: null,
            metric: "fea2dc1adcafd167314bd443381dd9b0",
            title: "【免费送】30g护手霜"
          },
          {
            id: "1075234855744176128",
            pic:
              "https://pic1.zhuanstatic.com/zhuanzh/n_v2b714599e9d6c402c9b1129066616bc8a_07c7a34c444a1c6d.jpg?w=600&h=600",
            coin: "50",
            infoUrl: null,
            metric: "7003733fa5e8d25da92fc718ced27584",
            title: "手机懒人折叠支架"
          }
        ],
        url: "/pages/activity/newuser",
        infoUrl: null
      },
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
      // 一元购
      oneCoinZoneInfo: {
        id: "1052566806314614785",
        name: "1币免费换",
        subTitle: "全场1币起",
        url: "/pages/activity/oneCoinFree",
        infoUrl: null
      },
      // 一元购
      oneCoinZoneInfoList: [
        {
          cid: 11111,
          goods: [
            {
              id: "1074925028769792000",
              pic:
                "https://pic2.zhuanstatic.com/zhuanzh/n_v22984f444bcfa425892eeb863cd4ed67f_d0aac94bd4ddb5c9.jpg?w=600&h=600",
              coin: "1",
              infoUrl: "/pages/detail/runningOneCoinDetail",
              metric: "1c7c1322d65861b2a994bab5b85a1ba9",
              title: "黑胶防紫外线雨伞"
            },
            {
              id: "1071976977017077760",
              pic:
                "https://pic1.zhuanstatic.com/zhuanzh/n_v21ef9e011240a47caabac166320ca52bc_ca5183bbc416225f.png?w=600&h=600",
              coin: "1",
              infoUrl: "/pages/detail/runningOneCoinDetail",
              metric: "4546f87b063e94e7f34108b4ca0e023c",
              title: "助力福袋"
            },
            {
              id: "1075287983923396608",
              pic:
                "https://pic2.zhuanstatic.com/zhuanzh/n_v246d2477beb284fb0bf08aafe0618e06b_e401d1274b4dbcde.jpg?w=600&h=600",
              coin: "1",
              infoUrl: "/pages/detail/runningOneCoinDetail",
              metric: "01435762fe2b9eea8d03ef6ebb7ae343",
              title: "女士水钻手表"
            }
          ]
        },
        {
          cid: 2222,
          goods: [
            {
              id: "1074906707009732608",
              pic:
                "https://pic2.zhuanstatic.com/zhuanzh/n_v2b0521fc5220f4b778291bd091af1a95a_bab7b1dc23930de9.jpg?w=600&h=600",
              coin: "1",
              infoUrl: "/pages/detail/runningOneCoinDetail",
              metric: "f83e3e378e7186378396ff3717db6e11",
              title: "充电毛绒暖手袋"
            },
            {
              id: "1068434312640069632",
              pic:
                "https://pic2.zhuanstatic.com/zhuanzh/n_v2994ff3d392144fda8a2981435669f743_29f2f93d4c4d05ff.png?w=600&h=600",
              coin: "1",
              infoUrl: "/pages/detail/runningOneCoinDetail",
              metric: "4f5e7ee352059f89eceeb12b54faacb0",
              title: "6元话费"
            },
            {
              id: "1075288349108862976",
              pic:
                "https://pic2.zhuanstatic.com/zhuanzh/n_v29fe95facfcf04d5b88ad4c7fa76a5c3b_7bc59b631c0256ca.jpg?w=600&h=600",
              coin: "1",
              infoUrl: "/pages/detail/runningOneCoinDetail",
              metric: "1e047c4573dad613833ddf0144ea7905",
              title: "ＣＯＣＯZEUSEE香氛洗发露"
            }
          ]
        },
        {
          cid: 3333,
          goods: [
            {
              id: "1065791633645109248",
              pic:
                "https://pic1.zhuanstatic.com/zhuanzh/n_v28a2603bb43864971a5935082b31a9b04_98414919452bae9c.jpg?w=600&h=600",
              coin: "1",
              infoUrl: "/pages/detail/runningOneCoinDetail",
              metric: "3029159985c50472f978e35fd6aa467b",
              title: "彩色垃圾袋5卷100只"
            },
            {
              id: "1075349807440068608",
              pic:
                "https://pic1.zhuanstatic.com/zhuanzh/n_v2012a424b126d4a3a933b3dc4c9f80e4c_ae14cbf51e5ab202.jpg?w=600&h=600",
              coin: "1",
              infoUrl: "/pages/detail/runningOneCoinDetail",
              metric: "986decf392e85d5ec513536114fb63e6",
              title: "男女情侣电子手环"
            },
            {
              id: "1075288731818131456",
              pic:
                "https://pic1.zhuanstatic.com/zhuanzh/n_v2f36c0e5a91b1425e88b7b21c6672eab1_25425f2e618804a5.jpg?w=600&h=600",
              coin: "1",
              infoUrl: "/pages/detail/runningOneCoinDetail",
              metric: "ad19634a044f47dad619772e66fb19a2",
              title: "猫耳朵束发带"
            }
          ]
        }
      ],
      // banner
      banners: [
        {
          appId: "wxe20f2a757ccbbce3",
          actId: "7444024759441471890:8420599615471447040",
          pic:
            "http://pic1.zhuanstatic.com/zhuanzh/n_v221559d55f21244e7943427145a4e1aee.jpg",
          title: "新人免费领百元大奖",
          url: "pages/index/index?ChannelID=TG001&IndirectChannel=LK"
        },
        {
          appId: "wxbdfee33ea394a980",
          actId: "7444024759441471890:5808073694722452480",
          pic:
            "http://pic1.zhuanstatic.com/zhuanzh/n_v27434fcdc57294b4a8a3c7b1499f7eed8.gif",
          title: "1元都不想冲？来这个西游吧，无限资源！",
          url: "?from=2051"
        },
        {
          appId: "wx79ade44c39cefc7f",
          actId: "7444024759441471890:5229291174667191296",
          pic:
            "http://pic1.zhuanstatic.com/zhuanzh/n_v22ab511d8b13749318d1ab002032dc85d.gif",
          title: "传奇复古1.76单机版，来玩就送麻痹戒指！",
          url: "?chid=1966&subchid=cq_zhuan01"
        }
      ],
      // 推荐商品 分类
      tabs: [
        { cateId: 0, cateName: "包邮专区", havePrice: "false" },
        { cateId: 111, cateName: "付邮免费拿", havePrice: "true" },
        { cateId: 100, cateName: "家居", havePrice: null },
        { cateId: 101, cateName: "数码", havePrice: null },
        { cateId: 103, cateName: "配饰", havePrice: null },
        { cateId: 110, cateName: "食品", havePrice: null },
        { cateId: 104, cateName: "美妆", havePrice: null },
        { cateId: 106, cateName: "母婴", havePrice: null },
        { cateId: 107, cateName: "电器", havePrice: null },
        { cateId: 108, cateName: "图书", havePrice: null },
        { cateId: 109, cateName: "鞋包", havePrice: null },
        { cateId: 200, cateName: "其他", havePrice: null }
      ],
      // 推荐商品 列表
      recList: [
        {
          step: 5,
          pic:
            "https://pic2.zhuanstatic.com/zhuanzh/n_v26b65bf1091944226b6e1824c4cd38597_853add83ebd39462.jpg?w=1000&h=1000",
          name: "【秒杀即将结束】折叠漏斗",
          oriPrice: "15.00",
          ownStock: 1,
          exchangeType: 2,
          id: "1074997590363209728",
          metric: "2207346b84692b976be09d31384d385f",
          freeLable: 1,
          desc:
            "商品规格：一个，直径7.5cm\n商品材质:食品级硅胶\n商品介绍:用于厨房内酱油 ,料酒,食用油等装罐不会泄露,也可用于洗发水,沐浴露等替换装的装罐,食品级硅胶,可折叠经久耐用                                                                                特别说明：\n1:请确保收货信息正确\n2:若有多款色，颜色，随机发货\n3:暂不支持港澳台，新疆，西藏，内蒙古，甘肃，宁夏，青海等偏远地区兑换。",
          payPrice: 2
        },
        {
          step: 5,
          pic:
            "https://pic1.zhuanstatic.com/zhuanzh/n_v2880e4f40edfa4e3792991d8c05278c56_4ac87c621c61e6e9.jpg?w=1000&h=1000",
          name: "【秒杀即将结束】削皮刨丝器",
          oriPrice: "12.00",
          ownStock: 1,
          exchangeType: 2,
          id: "1074998392897142784",
          metric: "555f7a358f7055bd2141910596a23a56",
          freeLable: 1,
          desc:
            "商品规格；一个                                                                                 商品描述；家居用水果蔬菜刨皮器【特点】二合一组合设计，叠加方便，轻松削皮，刨丝省时省力。【功能】可用于日常果蔬削皮，刨丝，方便实用                                                                                                                                                                                        说明：1:请确保收货信息无误                                     \n           2:暂不支持港澳台等片，新疆，，甘肃。宁夏，内蒙，海南，北京等偏远地区兑换",
          payPrice: 5
        },
        {
          step: 5,
          pic:
            "https://pic2.zhuanstatic.com/zhuanzh/n_v2737a44c6be8c48988405fc56b318d0e0_1aaca6ad2cce6403.jpg?w=1000&h=1000",
          name: "【秒杀即将结束】大白小夜灯",
          oriPrice: "10.00",
          ownStock: 1,
          exchangeType: 2,
          id: "1074599143738966016",
          metric: "988e00b2b8574fc9d31ad87dc4b52193",
          freeLable: 1,
          desc:
            "商品材质：\t搪胶 电子元件 LED灯\n商品尺寸：\t6*6.5cm\n特别说明\n1、请确保收货信息无误；\n2、若有多种款式、颜色，随机发货；\n3、暂不支持港澳台、新疆、西藏、内蒙、青海、宁夏等偏远地区兑换",
          payPrice: 5
        },
        {
          step: 1,
          pic:
            "https://pic1.zhuanstatic.com/zhuanzh/n_v2da2f38e2989540a2b50a5ad651197ef6_09b7a561db601f1d.jpg?w=1000&h=1000",
          name: "【秒杀即将结束】圣诞树小夜灯",
          oriPrice: "0.00",
          ownStock: 1,
          exchangeType: 2,
          id: "1075258515003539456",
          metric: "5eac5ecfda4e73a16201a6a5f6dccd1c",
          freeLable: 1,
          desc:
            "品材质：\t亚克力+电子元件\t商品款式：\t透明白色\n商品重量：   \t50g\t包装尺寸：\t12.5*6*6cm\n商品尺寸：\t12*5.5cm\n特别说明（拍前请看）\n1、请确保收货信息无误；\n2、商品为全新\n3、若有多种款式、颜色，随机发货；\n4、暂不支持港澳台、新疆、西藏、青海、等偏远地区不兑换\n5、48小时内发货",
          payPrice: 6
        },
        {
          step: 1,
          pic:
            "https://pic3.zhuanstatic.com/zhuanzh/n_v2130bba7c8404432b87d8ff417e0ba06d_6a6e7abe7498a490.jpg?w=1000&h=1000",
          name: "【秒杀即将结束】圣诞发箍",
          oriPrice: "0.00",
          ownStock: 1,
          exchangeType: 2,
          id: "1075259055166980096",
          metric: "f65a21048b5815a684b9251cde973eaf",
          freeLable: 1,
          desc:
            "特别说明（拍前请看）\n随机一个发\n1、请确保收货信息无误；\n2、商品为全新\n3、若有多种款式、颜色，随机发货；\n4、暂不支持港澳台、新疆、西藏、青海、等偏远地区不兑换\n5、48小时内发货",
          payPrice: 7
        },
        {
          step: 5,
          pic:
            "https://pic2.zhuanstatic.com/zhuanzh/n_v2d076cad9b9ed4f1f8e70105f1d9292f4_17c29fdefd8f71e5.jpg?w=1000&h=1000",
          name: "【秒杀即将结束】儿童益智口琴",
          oriPrice: "18.00",
          ownStock: 1,
          exchangeType: 2,
          id: "1074999970920136704",
          metric: "e0c4510ad8fde93b380a15b985c840a2",
          freeLable: 1,
          desc:
            "图案很多随机发,在宝宝大脑发育的过程中,聆听音乐将会增加大脑联系通道。在幼L时期，如果父母忽略音乐的作用，有可能会错过开发宝宝的大脑潜能的机会。口琴是培训宝宝的音乐素养和对音乐感知能力的工具;同时还能锻炼宝宝的肺活量,调节呼吸气量和节奏的技巧。\n【产品尺寸】13*2.8*2cm\n【关于发货】48小时内发出偏远地区除外，新疆，西藏，内蒙古，青海，甘肃，北京不发货勿拍！谢谢",
          payPrice: 5
        },
        {
          step: 5,
          pic:
            "https://pic1.zhuanstatic.com/zhuanzh/n_v2b10ab4f4808f4507a761ec0fe780781e_0b8fc31ac002976c.jpg?w=1000&h=1000",
          name: "【秒杀即将结束】时尚女表",
          oriPrice: "39.00",
          ownStock: 1,
          exchangeType: 2,
          id: "1064807414370402304",
          metric: "e1bd53cfd50d785fe078a73d128f87f1",
          freeLable: 1,
          desc:
            "菱形切割表壳，时尚款式设计，带上美美滴！表盘直径36mm，表盘厚度8mm，总长20mm（可缩短）。颜色有红色、黑色、棕色、灰色、绿色，白色，粉色等，每单送出一个，颜色随机哦",
          payPrice: 9
        },
        {
          step: 1,
          pic:
            "https://pic2.zhuanstatic.com/zhuanzh/n_v22e129f0960d045f2a36081e881c07191_e7a07bc14655b816.jpg?w=1000&h=1000",
          name: "【秒杀即将结束】圣诞袜大号1只",
          oriPrice: "0.00",
          ownStock: 1,
          exchangeType: 2,
          id: "1075259967109332992",
          metric: "c82fd99b837f302f8123ecb5f1bc2b47",
          freeLable: 1,
          desc:
            "尺寸\t23*36cm\n一个装随机\n特别说明（拍前请看）\n1、请确保收货信息无误；\n2、商品为全新\n3、若有多种款式、颜色，随机发货；\n4、暂不支持港澳台、新疆、西藏、青海、等偏远地区不兑换\n5、48小时内发货",
          payPrice: 7
        },
        {
          step: 5,
          pic:
            "https://pic3.zhuanstatic.com/zhuanzh/n_v21d110a0ef56147a5aa81e977c5644863_2747df1a211bb384.jpg?w=1000&h=1000",
          name: "【秒杀即将结束】时尚男表",
          oriPrice: "28.00",
          ownStock: 1,
          exchangeType: 2,
          id: "1074620054844211200",
          metric: "a9f93903696e7d4a5ba97f7a5ae37ca1",
          freeLable: 1,
          desc: "表盘直径约4cm，总长22cm，表带可以缩短。颜色有2种，随机送出哦~",
          payPrice: 9
        },
        {
          step: 5,
          pic:
            "https://pic3.zhuanstatic.com/zhuanzh/n_v23beca57576fc41bab4f0caaa5ef8e462_dab4f761325f46fc.png?w=1000&h=1000",
          name: "【秒杀即将结束】亚克力小夜灯",
          oriPrice: "0.00",
          ownStock: 1,
          exchangeType: 2,
          id: "1075001301131067392",
          metric: "6e174377686f0f912073b2d12f9d9a51",
          freeLable: 1,
          desc:
            "商品材质：\t亚克力+PP+电子元件\t商品款式：\t雪人、圣诞老人、圣诞树、苹果、埃菲尔铁塔*（款式随机一个装）\n商品净重：\t40g\t商品包装：\t盒装\n商品尺寸：\t9*14cm，底座直径3.6cm（造型不同，尺寸存在差异）\n特别说明（拍前请看）\n1、请确保收货信息无误；\n2、商品为全新\n3、若有多种款式、颜色，随机发货；\n4、暂不支持港澳台、新疆、西藏、青海、等偏远地区不兑换\n5、48小时内发货",
          payPrice: 5
        },
        {
          step: 5,
          pic:
            "https://pic3.zhuanstatic.com/zhuanzh/n_v2d2589bd3f0e240dc95b0a376a7729e0c_3f3c5bdf3376b7b6.jpg?w=1000&h=1000",
          name: "【秒杀即将结束】封口机",
          oriPrice: "19.00",
          ownStock: 1,
          exchangeType: 2,
          id: "1075000376479973376",
          metric: "7deb83da8475d916dbb1dbf320200573",
          freeLable: 1,
          desc:
            "家用彩色迷你密封机，手压式热封口机。\n在您要封口的袋子上左右轻轻一过，具有防潮、防霉的密封袋就形成了。适用于各种零食、蔬果的塑料袋，保鲜袋轻松一次性密封保鲜很放心，下次使用新鲜如初。没吃完的零食、干果花茶等轻轻- -压即可密封储存哦，【产品尺寸】9.5*4*3.7\n[ 必须使用2节5号正品南孚电池，]才能使其发热达到封口作用，重要的事说三E遍[不要使用普通电池] [ 不要使用普通电池] ( 不要使用普通电池]，不配带电池。\n【关于发货】拍下必发48小时内发货，偏远地区除外，新疆，西藏，不发货哦！其余地方正常发货！最后图片是教程。",
          payPrice: 5
        },
        {
          step: 5,
          pic:
            "https://pic3.zhuanstatic.com/zhuanzh/n_v2ac583805b0344700b1e2b739c828c15b_eacc981122a1f847.jpg?w=1000&h=1000",
          name: "【秒杀即将结束】大理石口红",
          oriPrice: "38.88",
          ownStock: 1,
          exchangeType: 2,
          id: "1075000886121463808",
          metric: "9af337069403e8d54ca532eb4aeffc09",
          freeLable: 1,
          desc:
            "新品大理石口红，不沾杯不掉色，持久显色思柔滑丰盈的色泽和柔顺感，修饰唇色的效果，轻柔肌肤，不易脱色，缔造丰盈丝柔般的性感双唇，展现出你性感的唇.上风采，款式多样。\n【规格】3g\n101 #水润豆沙色\n102#水润斩男色\n103#水润海棠色\n104#水润砖红色\n105#水润人鱼姬\n109#哑光豆沙色\n107 #哑光珊瑚色\n110#哑光CHINI色\n108#哑光复古红\n【款式选择】拍下后在收货地址后面备注颜色型号，\n收货地址后面备注颜色型号。\n收货地址后面备注颜色型号，没有备注的随机发货。没有备注的 不接受任何指责，辱骂，退货，退款。\n《关于发货》拍下后48小时内发货，《偏 远地区除外》新疆，西藏，青海，甘肃，内蒙，海南，宁夏，北京不发货请勿拍",
          payPrice: 5
        },
        {
          step: 5,
          pic:
            "https://pic1.zhuanstatic.com/zhuanzh/n_v270ac188f423b45ebb44e66c1f0c373e7_dbe5d41048f4aafa.jpg?w=1000&h=1000",
          name: "【秒杀即将结束】二次元眼镜",
          oriPrice: "29.00",
          ownStock: 1,
          exchangeType: 2,
          id: "1075000668260925440",
          metric: "a2a5050bd44dcc457a073eacb9af5ce2",
          freeLable: 1,
          desc:
            "抖音秦奋同款马赛克装逼像素眼镜抖音眼镜太阳镜二次元搞笑我的世界，拍照片拍视频必备。和正常眼镜一样。【规格】长度约14.5cm颜色黑【度数】平光镜，材质ABS材料。\n【支持使用免邮卷】\n【关于发货】拍下必发48小时内发出偏远地区除外，新疆，西藏，内蒙古，青海。甘肃不发货勿拍，谢谢！",
          payPrice: 5
        },
        {
          step: 5,
          pic:
            "https://pic3.zhuanstatic.com/zhuanzh/n_v28322dcb725c84a26951a8fa33c5dff98_af4fed39a20d5843.jpg?w=1000&h=1000",
          name: "【秒杀即将结束】水龙头滤水器防溅水",
          oriPrice: "25.00",
          ownStock: 1,
          exchangeType: 2,
          id: "1075002367209897984",
          metric: "02c879927b73c5e6ca1d0f3e62537600",
          freeLable: 1,
          desc:
            "商品规格：一个装；适用于16～23mm水龙头安装\n商品描述：[防溅水] [可伸缩] 创意家居生活新帮手,采用PP材质制作,PVC材质套口，安全无毒可伸缩并能360度旋转分支水流,喷洒均匀,方便洗碗洗菜,节约用水。安装方便。健康生活,从水龙头开始!\n特别说明：\n1:请确保收货信息无误\n2:有【蓝色，绿色，红色】三款，拍下收货地址后面备注款式，没备注随机发货\n3:暂不支持港澳台，新疆，西藏，内蒙古，青海，甘肃，宁夏，海南等偏远地区兑换。",
          payPrice: 6
        },
        {
          step: 5,
          pic:
            "https://pic3.zhuanstatic.com/zhuanzh/n_v26dc0b21df0544386beb6fcccde9ee76b_72508b7ae8d436f0.jpg?w=1000&h=1000",
          name: "【秒杀即将结束】淘米器",
          oriPrice: "12.00",
          ownStock: 1,
          exchangeType: 2,
          id: "1075002768692871168",
          metric: "114b264ee14b01e348dab68a451b5b2a",
          freeLable: 1,
          desc:
            "淘米器，优质PP材质，环保健康，加厚设计，手感舒适，适用于厨房淘米洗米，清洗水果蔬菜等！\n1、每天上午9点补充库存\n2、已兑换商品将在48小时内发货，颜色随机发！请确保收货信息无误！\n3 北京，海南，黑龙江，宁夏，青海，新疆，内蒙，西藏偏远省不发，其他非偏远省拍下会按下单时间发货！",
          payPrice: 6
        },
        {
          step: 5,
          pic:
            "https://pic2.zhuanstatic.com/zhuanzh/n_v21988173a283c44bfb1f538a891c36945_00fb87454d0ce5f1.jpg?w=1000&h=1000",
          name: "【秒杀即将结束】衣架10支",
          oriPrice: "15.00",
          ownStock: 1,
          exchangeType: 2,
          id: "1075002925769555968",
          metric: "79d8fb9aebb4d77ddeb24420597b340e",
          freeLable: 1,
          desc:
            "产品材质\t 铁丝+浸塑\n产品重量\t 318克/把\n产品尺寸\t 肩宽38.8cm 高度21.8cm\n产品说明\t 加高设计（更实用），浸塑不生锈  \n说明：\n1、请确保收货信息无误；\n2、若有多种款式、颜色，随机发货；\n3、暂不支持港澳台、新疆、西藏、内蒙、青海、宁夏等偏远地区兑换\n4、每天上午9点补充库存\n5、已兑换商品将在48小时内发货",
          payPrice: 7
        },
        {
          step: 5,
          pic:
            "https://pic2.zhuanstatic.com/zhuanzh/n_v245ae03e8041c41f783d6b29b667a1c53_4780869f604cf171.jpg?w=1000&h=1000",
          name: "【秒杀即将结束】垃圾袋点段式五卷",
          oriPrice: "19.89",
          ownStock: 1,
          exchangeType: 2,
          id: "1075003152253583360",
          metric: "0912ac9a22d1e3360aad52f1587aeb09",
          freeLable: 1,
          desc:
            "材质；聚乙烯+pp \n颜色；五卷随机发\n规格；约42*49cm/个\n偏远地区不发货 特价清仓",
          payPrice: 7
        },
        {
          step: 10,
          pic:
            "https://pic1.zhuanstatic.com/zhuanzh/n_v2a09bd4bdc83e48af98de1987058f6c75_49025994ea1336ad.jpg?w=1000&h=1000",
          name: "【秒杀即将结束】双动圈耳机",
          oriPrice: "88.00",
          ownStock: 1,
          exchangeType: 2,
          id: "1073522034035654656",
          metric: "b40d530ad902b4b604b475cb4006bc8e",
          freeLable: 1,
          desc:
            "商品规格：一条\n商品描述：免费送一条双动圈入耳式耳机，喜欢的点个关注，原价88的耳机免费送了，质量超级好~~~拍下都会发货，全国发货~~~\n说明：\n1、请确保收货信息无误；\n3、暂不支持港澳台偏远地区兑换",
          payPrice: 7
        },
        {
          step: 5,
          pic:
            "https://pic2.zhuanstatic.com/zhuanzh/n_v211f40f9693994dfdbdb2b40ae8012d8b_1572d24757a314fb.jpg?w=1000&h=1000",
          name: "【秒杀即将结束】化妆品收纳盒",
          oriPrice: "0.00",
          ownStock: 1,
          exchangeType: 2,
          id: "1075003320940101632",
          metric: "6c5b747f5446267b2b61183577993412",
          freeLable: 1,
          desc:
            "商品规格：抽屉化妆品收纳盒化妆品整理桌面首选护肤品梳分盒。\n说明\n1、请确保收货信息无误；\n2、每天上午9点补充库存\n3、已兑换商品将在48小时内发货\n4、若有多种款式、颜色，随机发货；\n5、暂不支持港澳台、新疆、西藏等偏远地区兑换",
          payPrice: 7
        },
        {
          step: 5,
          pic:
            "https://pic3.zhuanstatic.com/zhuanzh/n_v2edf587cb775b4660b724c676f7ae5414_5f348d913e483fc1.jpg?w=1000&h=1000",
          name: "【秒杀即将结束】隐形双头修容笔",
          oriPrice: "19.89",
          ownStock: 1,
          exchangeType: 2,
          id: "1075003542500016128",
          metric: "2b2d5fdfb4f81d32f74fc6eaf622e784",
          freeLable: 1,
          desc: "限时促销 高光两用初学者修脸粉V脸阴影鼻影膏笔女 颜色随机",
          payPrice: 8
        },
        { showAd: 1 }
      ],
      // 提示
      showTip: true,
      tips: {
        loading: {
          icon:
            "https://img1.zhuanstatic.com/open/zhuanzhuan/zzwa/common/load_more2.png",
          text: "加载中…"
        },
        failed: {
          icon:
            "https://img1.zhuanstatic.com/open/zhuanzhuan/zzwa/common/load_more2.png",
          text: "加载失败"
        },
        noMore: {
          icon:
            "https://img1.zhuanstatic.com/open/zhuanzhuan/zzwa/common/load_more2.png",
          text: "没有更多了"
        }
      }
    };
  },

  components: {
    headBar,
    backTop
  },

  methods: {},

  created() {},

  onLoad(options) {
    const {id} = options;
    this.globalData.id = id;
  }
};
</script>

<style scoped lang='scss'>
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
  background: url("https://pic6.zhuanstatic.com/zhuanzh/n_v2d2ef78c357f0437180b7b39f07d38edd.png")
    no-repeat center top;
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
  width: 190rpx;
  font-size: 28rpx;
  padding-right: 8rpx;
  line-height: 48rpx;
  background-color: rgba(0, 0, 0, 0.13);
  border-top-right-radius: 24rpx;
  border-bottom-right-radius: 24rpx;
  color: #fff;
}

.topArea .powerCoin .agentCoinInteger {
  background: url("https://img1.zhuanstatic.com/open/zhuanzhuan/zzwa/runningbear/newIndex/powerCoin.png")
    no-repeat 12rpx center;
  background-size: 34rpx 34rpx;
  padding-left: 56rpx;
}

.topArea .powerCoin .agentCoinDecimal {
  background: url(https://pic4.zhuanstatic.com/zhuanzh/n_v28392c9ee3bc545d1a5b2fee86a7d4582.png)
    no-repeat right center;
  background-size: 24rpx 24rpx;
  padding-right: 24rpx;
  margin-left: 8rpx;
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
  background: url("https://pic3.zhuanstatic.com/zhuanzh/n_v292ba40e6cc8b4a63844e2ac8f7ef1c2c.png")
    no-repeat center center;
  background-size: 256rpx 56rpx;
  font-family: PingFang-SC-HK;
  font-size: 24rpx;
  line-height: 56rpx;
  text-align: center;
  color: #7d54ff;
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
  background: url("https://pic4.zhuanstatic.com/zhuanzh/n_v2d2f6a56ed4354dbca10d0b7d1e878e50.png")
    no-repeat;
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
  width: 114rpx;
  animation: prize-ani 2s infinite;
  z-index: 15;
}

.prize-common-num {
  width: 96rpx;
  height: 96rpx;
  padding-top: 32rpx;
  padding-left: 6rpx;
  box-sizing: border-box;
  background: url("https://pic1.zhuanstatic.com/zhuanzh/n_v2983c3325dfb7402dadb12e2cfb4c5f60.png")
    no-repeat center top;
  background-size: 100% 100%;
  font-family: "DIN Condensed";
  font-weight: bold;
  font-size: 44rpx;
  text-align: center;
  line-height: 44rpx;
  color: #c94900;
  margin: 0 auto;
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

.signin-prize {
  position: absolute;
  right: 40rpx;
  top: 220rpx;
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

.new-user-prize {
  position: absolute;
  top: 120rpx;
  left: 70rpx;
  z-index: 100;
}

.invite-new-prize {
  position: absolute;
  top: 120rpx;
  right: 120rpx;
  z-index: 100;
}

.recall-user-prize {
  position: absolute;
  top: 40rpx;
  right: 20rpx;
  z-index: 100;
}

.friend-help-prize {
  position: absolute;
  top: 290rpx;
  left: 10rpx;
  z-index: 100;
}

.activity-challenge {
  width: 686rpx;
  height: 200rpx;
  margin: 0 auto 24rpx;
}

.activity-challenge image {
  width: 100%;
  height: 100%;
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
  height: 300rpx;
  background: #fff;
  overflow: hidden;
  border-radius: 8rpx;
  box-shadow: 0 2rpx 7rpx rgba(0, 0, 0, 0.16);
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

.list._b790fd0 {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 686rpx;
  margin-left: 32rpx;
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
  min-height: 1200rpx;
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
  width: 686rpx;
  margin-top: 32rpx;
  margin-left: 32rpx;
  padding-bottom: 180rpx;
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
    color: #5B5A5A;
}

.text._be7d132 {
    text-align: center;
    color: #9B9B9B;
    font-size: 28rpx;
}
</style>
