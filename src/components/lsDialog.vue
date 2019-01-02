<!-- 弹窗 -->
<template>
  <div class='dialog' :class="{show:showDialog}">
    <div class="dialog-cnt">
      <div class="dialog-hd">{{dialogTitle}}</div>
      <div class="dialog-bd">{{dialogContent}}</div>
      <div class="dialog-ft">
        <div class="btn btn-cancel" @click="close">取消</div>
        <button class="btn btn-ok" @click="okBtnHandler" :open-type="share">邀请好友</button>
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
    showDialog: {
      type: Boolean,
      default: !0
    },
    dialogTitle: {
      type: String,
      default: '提示'
    },
    dialogContent: {
      type: String,
      default: '内容'
    },
    openType: {
      type: String,
      default: ''
    }
  },
  methods: {
    close() {
      this.$emit('closeDialog')
    },
    okBtnHandler() {
      this.$emit('okBtnHandler')
    },
    stopPropagation() {}
  }
};
</script>

<style lang='scss' scoped>
.dialog{
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
      font-size: 16px;
      text-align: center;
      line-height: 1.5;
      padding: 25px 10px;
    }

    .dialog-ft{
      display: flex;
      flex-direction: row;

      .btn{
        width: 50%;
        flex-shrink: 0;
        padding: 14px 0;
        line-height: 1;
        text-align: center;
        font-size: 16px;
      }

      .btn-cancel{
        color: #333;
        background: #E9E9E9;
        border-radius:0px 0px 0px 6px;
      }
      .btn-ok{
        color: #fff;
        background:linear-gradient(135deg,rgba(255,106,107,1) 0%,rgba(255,58,57,1) 100%);
        border-radius:0px 0px 6px 0px;
      }
    }
  }

  &.show{
    visibility: visible;
    opacity: 1;
  }
}
</style>