<!-- 通用规则弹窗组件 -->
<template>
  <div class="rule-modal" :class="{show:ifShowRules}">
    <div class="dialog-cnt">
      <div class="dialog-hd">活动规则</div>
      <div class="dialog-bd">
        <scroll-view scroll-y scroll-with-animation>
          <rich-text
            v-if="rules"
            :nodes="rules"
          >
          </rich-text>

          
        </scroll-view>
      </div>
      <div class="cls-btn" @click="clsRulesModal"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  data() {
    return {};
  },
  components: {
  },

  props: {
    ifShowRules: {
      type: Boolean,
      default: !1
    },
    rules: {
      type: String,
      default: ''
    }
  },

  methods: {
    clsRulesModal(ev) {
      this.$emit('clsRulesModal', ev)
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../common/style/variable";
@import "../common/style/mixin";
.rule-modal{
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

  .dialog-cnt{
    width: 290px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%,-50%,0);
    background: #fff;
    border-radius: 6px;

    .dialog-hd{
      padding: 25px 10px 0 10px;
      text-align: center;
      line-height: 1;
      font-size: 18px;
      overflow: hidden;
    }
    .dialog-bd{
      max-height: 300px;
      font-size: 16px;
      text-align: center;
      line-height: 1.5;
      padding: 25px 10px;
      overflow: hidden;

      scroll-view{
        height: 300px;
      }
    }

  }

  .cls-btn{
    width: 36px;
    height: 36px;
    position: absolute;
    left: 50%;
    bottom: -66px;
    margin-left: -18px;
    background: url(#{$img_url}dialog_close.png) no-repeat center;
    background-size: 36px;
  }

  &.show{
    visibility: visible;
    opacity: 1;
  }
}
</style>