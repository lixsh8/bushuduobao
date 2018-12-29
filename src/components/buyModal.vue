<!-- 底部弹窗购买 -->
<template>
  <div class='buy-modal' :class="{show:showBuyModal}" @click="close">
    <div class="buy-cnt" @click.stop="stopPropagation">
      <div class="buy-hd">
        <div class="buy-title">满9000份开奖，差30份</div>
        <div class="cls-btn" @click="close">close</div>
      </div>

      <div class="buy-bd">
        <div class="num-box">
          <div class="num-t">参与份数</div>
          <div class="num-wrapper">
            <div class="num-btn-minus" @click="minus">减---</div>
            <input class="num-input" :value="buyNum" type="text" @blur="blur"/>
            <div class="num-btn-plus" @click="plus">加+++</div>
          </div>
        </div>
        <div class="buy-chance">今日剩余<text>1</text>份参与机会<div class="add-chance">提升</div></div>
      </div>

      <div class="buy-ft">
        <div class="total-t">合计：</div>
        <div class="total">￥1</div>
        <div class="makeBuy" @click="makeBuy">确认</div>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
    };
  },
  props: {
    showBuyModal: {
      type: Boolean,
      default: !0
    },
    buyNum: {
      type: Number,
      default: 1
    }
  },
  methods: {
    close() {
      this.$emit('closeBuyModal')
    },
    stopPropagation() {},
    blur(e) {
      this.$emit('changeNum', e.target.value)
    },
    plus() {
      this.$emit('changeNum', this.buyNum + 1)
    },
    changeNum() {
      this.$emit('changeNum', this.buyNum + 1)
    },
    makeBuy() {
      this.$emit('makeBuy')
    }
  }
};
</script>

<style lang='scss' scoped>
.buy-modal{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0,0,0,.5);
  z-index: 90;
  visibility: hidden;
  opacity: 0;
  transition: opacity .5s;

  .buy-cnt{
    width: 100%;
    height: 200px;
    position: absolute;
    left: 0;
    bottom: -200px;
    background: #fff;
    transition: bottom .5s;

    .num-btn-plus{
      background: #f00;
      height: 30px;
    }
  }

  &.show{
    visibility: visible;
    opacity: 1;

    .buy-cnt{
      bottom: 0;
    }
  }
}
</style>