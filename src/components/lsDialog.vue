<!-- 弹窗 -->
<template>
  <div
    class='dialog'
    :class="{show:showDialog}"
    @touchmove.stop="stopPropagation"
  >
    <div
      class="dialog-cnt"
      @click.stop="stopPropagation"
    >
      <div class="cls-btn" @click="close"></div>
      <div class="dialog-hd">{{dialogTitle}}</div>
      <div class="dialog-bd">
        <rich-text :nodes="dialogContent" />
      </div>
      <div class="dialog-ft">
        <div
          class="btn-wrapper"
          v-if="singleBtn"
        >
          <button
            class="btn btn-ok btn-sg"
            @click="okBtnHandler"
            :open-type="openType"
          >{{confirmText}}</button>
        </div>

        <block v-else>
          <div
            class="btn btn-cancel"
            @click="close"
          >{{cancelText}}</div>
          <button
            class="btn btn-ok"
            @click="okBtnHandler"
            @opensetting='handleSetting'
            :open-type="openType"
          >{{confirmText}}</button>
        </block>

      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  props: {
    showDialog: {
      type: Boolean,
      default: !0
    },
    dialogTitle: {
      type: String,
      default: "提示"
    },
    dialogContent: {
      type: String,
      default: "内容"
    },
    singleBtn: {
      type: Boolean,
      default: !1
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    confirmText: {
      type: String,
      default: "邀请好友"
    },
    openType: {
      type: String,
      default: ""
    }
  },
  methods: {
    close() {
      console.log("closeDialog组件里");
      this.$emit("closeDialog");
    },
    okBtnHandler() {
      this.$emit("okBtnHandler");
    },
    handleSetting(e) {
    },
    stopPropagation() {}
  }
};
</script>

<style lang='scss' scoped>
@import "../common/style/variable";
.dialog {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 90;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.5s;

  .dialog-cnt {
    width: 290px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    background: #fff;
    border-radius: 6px;
    color: #666;

    .cls-btn{
      width: 36px;
      height: 36px;
      position: absolute;
      right: 0;
      top: 0;
      background: url(#{$img_url}icon_close_black.png) no-repeat center;
      background-size: 16px;
      border-radius: 0 6px 0 0;
    }

    .dialog-hd {
      padding: 25px 10px 0 10px;
      text-align: center;
      line-height: 1;
      font-size: 14px;
      overflow: hidden;
    }
    .dialog-bd {
      font-size: 14px;
      text-align: center;
      line-height: 1.5;
      padding: 25px 10px;
    }

    .dialog-ft {
      display: flex;
      flex-direction: row;

      .btn {
        width: 50%;
        flex-shrink: 0;
        padding: 14px 0;
        line-height: 1;
        text-align: center;
        font-size: 16px;
      }

      .btn-cancel {
        color: #333;
        background: #e9e9e9;
        border-radius: 0px 0px 0px 6px;
      }
      .btn-ok {
        color: #fff;
        background: linear-gradient(
          135deg,
          rgba(255, 106, 107, 1) 0%,
          rgba(255, 58, 57, 1) 100%
        );
        border-radius: 0px 0px 6px 0px;
      }
      .btn-sg {
        width: 100%;
        font-size: 14px;
        color: #3ed48f;
        background: none !important;
        border: none!important;
      }
      button::after{
        background: none !important;
        border: none!important;
        box-shadow: none;
      }
      .btn-wrapper{
        width: 100%;
        border-top: 1px solid #ccc;
      }
    }
  }

  &.show {
    visibility: visible;
    opacity: 1;
  }
}
</style>