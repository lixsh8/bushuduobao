<!-- 通用规则弹窗组件 -->
<template>
  <form report-submit="true">
    <div
      class="rule-modal"
      :class="{show:ifShowSign}"
    >
      <div class="dialog-cnt">
        <div class="dialog-top">
          <div
            class="cls-btn"
            @click="clsSignModal"
          ></div>
          <div class="title">连续签到第{{days}}天</div>
          <div class="pack-num">
            <div class="unit">￥</div>
            <div class="num">{{packAmount}}</div>
          </div>
          <div class="subtitle">今日签到红包</div>
          <div class="sign">
            <div class="day-box">
              <div
                class="day"
                :class="{active:days>=1}"
              >1</div>
              <div
                class="day"
                :class="{active:days>=2}"
              >2</div>
              <div
                class="day"
                :class="{active:days>=3}"
              >3</div>
              <div
                class="day"
                :class="{active:days>=4}"
              >4</div>
              <div
                class="day"
                :class="{active:days>=5}"
              >5</div>
              <div
                class="day"
                :class="{active:days>=6}"
              >6</div>
              <div
                class="day day-7"
                :class="{active:days>=7}"
              ></div>
            </div>
            <div class="line"></div>
          </div>
        </div>

        <div class="dialog-md">预约明天20:00签到提醒</div>

        <div class="dialog-ft">
          <!-- <div class="btn" @click="clsSignModal">不用了</div> -->
          <button
            @click="okBtnHandler"
            :open-type="openType"
            class="btn btn-subscribe"
          >{{confirmText}}</button>
        </div>

      </div>
    </div>
  </form>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  components: {},

  props: {
    ifShowSign: {
      type: Boolean,
      default: !1
    },
    days: {
      type: Number,
      default: 0
    },
    packAmount: {
      type: Number,
      default: 0
    },
    confirmText: {
      type: String,
      default: "确定"
    },
    openType: {
      type: String,
      default: ""
    }
  },

  methods: {
    clsSignModal(ev) {
      this.$emit("clsSignModal", ev);
    },
    okBtnHandler(ev) {
      console.log(ev);
      this.$emit("okBtnHandler", ev);
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../common/style/variable";
@import "../common/style/mixin";
.rule-modal {
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
    border-radius: 6px;

    .dialog-top {
      width: 290px;
      height: 239px;
      position: relative;
      background: url(#{$img_url}signin_bg.png?v=2) no-repeat center;
      background-size: 100%;

      .cls-btn {
        /* width: 36px;
        height: 36px;
        position: absolute;
        right: -10px;
        top: 10px;
        background: url(#{$img_url}icon_close_black.png) no-repeat center;
        background-size: 12px; */
        position:absolute;
        top:-20px;
        right:0;
        width:72rpx;
        height:72rpx;
        background:url(#{$img_url}dialog_close.png) no-repeat;
        background-size:100% 100%;
      }

      .title {
        padding-top: 13px;
        font-size: 18px;
        color: #fff;
        text-align: center;
        line-height: 1;
      }

      .pack-num {
        width: 53px;
        height: 70px;
        margin: 35px auto 0 auto;
        line-height: 1;
        padding-top: 35px;
        box-sizing: border-box;
        background: url(#{$img_url}signin_pack_bg.png) no-repeat center;
        background-size: 100%;
        color: #ffecba;
        text-align: center;

        .unit {
          display: inline-block;
          line-height: 1;
          font-size: 12px;
        }

        .num {
          display: inline-block;
          vertical-align: top;
          line-height: 1;
          font-size: 22px;
        }
      }

      .subtitle {
        padding: 20px 0 10px 0;
        text-align: center;
        line-height: 1;
        font-size: 14px;
        color: #f5a623;
      }

      .sign {
        width: 246px;
        margin: 0 auto;
        position: relative;
        height: 24px;

        .day-box {
          width: 100%;
          height: 24px;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        .day {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          background: url(#{$img_url}signin_date.png) no-repeat center;
          background-size: 100%;
          font-size: 14px;
          line-height: 24px;
          text-align: center;
          color: #fff;
        }
        .day.active {
          background: url(#{$img_url}signin_date_active.png) no-repeat center;
          background-size: 100%;
        }
        .day-7 {
          background: url(#{$img_url}signin_gift.png) no-repeat center;
          background-size: 18px 19px;
        }
        .day-7.active {
          background: url(#{$img_url}signin_gift_open.png) no-repeat center;
          background-size: 18px 22px;
        }

        .line {
          position: absolute;
          width: 90%;
          top: 50%;
          left: 5%;
          height: 2px;
          z-index: 1;
          background: #ffe18b;
        }
      }
    }

    .dialog-md {
      width: 100%;
      height: 48px;
      line-height: 48px;
      text-align: center;
      font-size: 14px;
      color: #9b9b9b;
      background: #fff;
    }

    .dialog-ft {
      width: 100%;
      display: flex;
      flex-direction: row;

      /* .btn{
        width: 120px;
        text-align: center;
        line-height: 44px;
        font-size: 16px;
        color: #333;
        background: #e9e9e9;
        border-radius: 0 0 0 6px;
      } */
      .btn-subscribe {
        flex: 1;
        background: #fc3d46;
        border-radius: 0;
        color: #fff;
        border-radius: 0 0 6px 6px;
      }
    }
  }

  &.show {
    visibility: visible;
    opacity: 1;
  }
}
</style>