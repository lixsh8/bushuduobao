<!-- 商品列表组件 -->
<template>
  <div class="goods-item"  @click="btnClickHandler(goodsItem.is_id)">
    <div class="avatar-box">
      <img
        class="avatar"
        :src="goodsItem.dgoods_image"
        alt=""
        mode="widthFix"
      />
      <div class="soldout" v-if="goodsItem.is_soldout"></div>
      <div class="top-tips" v-if="showTips">{{goodsItem.is_totalnum}}份即开奖</div>
      <div class="process">
        <div
          class="process-bar"
          :style="{width:goodsItem.is_rate}"
        ></div>
        <div class="process-txt">{{goodsItem.is_oddnum}}/{{goodsItem.is_totalnum}} 份</div>
      </div>
    </div>
    <div class="cnt">
      <div class="goods-title">{{goodsItem.dgoods_name}}</div>
      <div class="join-btn">{{goodsItem.dgoods_hb}}元红包参与</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },

  props: ["goodsItem", "showTips"],

  computed: {
    soldoutIcon() {
      return this.globalData.img_url + 'icon_soldout.png'
    }
  },

  methods: {
    btnClickHandler(ev) {
      this.$emit('btnClickHandler', ev)
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../common/style/variable";
@import "../common/style/mixin";

.goods-item {
  width: 165px;
  margin:10px 15px 0 15px;
  padding-bottom: 10px;
  box-sizing: border-box;
  overflow: hidden;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px #eee;

  &:nth-child(2n){
    margin: 10px 15px 0 0;
  }

  .avatar-box {
    width: 165px;
    height: 165px;
    overflow: hidden;
    position: relative;

    .avatar {
      display: block;
      width: 100%;
      height: 100%;
    }

    .soldout{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.3) url(#{$img_url}icon_soldout.png) no-repeat center;
      background-size: 99px 77px;
      z-index: 6;
    }

    .top-tips {
      position: absolute;
      top: 0;
      left: 0;
      padding: 5px;
      line-height: 1;
      text-align: center;
      font-size: 12px;
      color: #fff;
      background: linear-gradient(
        135deg,
        rgba(255, 106, 107, 1) 0%,
        rgba(255, 58, 57, 1) 100%
      );
      border-radius: 0px 0px 6px 0px;
    }
    .process {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 16px;
      background: rgba(0, 0, 0, 0.5);

      .process-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0%;
        height: 16px;
        background: url(#{$img_url}/process_bar.png) no-repeat left center;
        background-size: 165px 16px;
      }
      .process-txt {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 16px;
        line-height: 16px;
        font-size: 11px;
        color: #fff;
        text-indent: 10px;
      }
    }
  }

  .cnt {
    padding: 0 15px;

    .goods-title {
      width: 100%;
      padding: 10px 0;
      font-size: 14px;
      line-height: 1;
      @include sg_line_ellipsis;
    }

    .join-btn {
      width: 130px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 14px;
      color: #fff;
      background: linear-gradient(
        135deg,
        rgba(255, 106, 107, 1) 0%,
        rgba(255, 58, 57, 1) 100%
      );
      border-radius: 15px;
    }
  }
}
</style>