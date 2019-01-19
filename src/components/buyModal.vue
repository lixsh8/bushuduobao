<!-- 底部弹窗购买 -->
<template>
  <div
    class='buy-modal'
    :class="{show:showBuyModal}"
    @click="close"
  >
    <form
      @submit="subBtnClick"
      report-submit="true"
    >
      <div
        class="buy-cnt"
        @click.stop="stopPropagation"
      >
        <div class="buy-hd">
          <div class="buy-title">满{{totalNum}}份开奖，差<text>{{leftNum}}</text>份</div>
          <div
            class="cls-btn"
            @click="close"
          ></div>
        </div>

        <div class="buy-bd">
          <div class="num-box">
            <div class="num-t">参与份数</div>
            <div class="num-wrapper">
              <div
                class="num-btn-minus btn"
                @click="minus"
              ></div>
              <input
                class="num-input"
                :value="buyNum"
                type="number"
                @blur="blur"
              />
              <div
                class="num-btn-plus btn"
                @click="plus"
              ></div>
            </div>
          </div>
          <div class="buy-chance"><text>体力 <text class="red">{{useTime>=0?useTime:0}}</text></text>
            <div
              class="add-chance"
              :class="{green:useTime>=100}"
              @click="tiliHandler"
              open-type="share"
            >{{useTime>=100?"体力充沛":"补充体力"}}</div>
          </div>
        </div>

        <div class="buy-ft">
          <div class="total-t">合计：</div>
          <div class="total">￥{{totalPrice}}</div>
          <button
            form-type="submit"
            class="makeBuy"
          >确认</button>
        </div>

      </div>
    </form>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  props: {
    showBuyModal: {
      type: Boolean,
      default: !0
    },
    totalNum: {
      type: Number,
      default: 0
    },
    leftNum: {
      type: Number,
      default: 0
    },
    // 剩余次数 体力次数
    useTime: {
      type: Number,
      default: 0
    },
    totalPrice: {
      type: Number,
      default: 0
    },
    // 购买次数
    buyNum: {
      type: Number,
      default: 1
    }
  },
  methods: {
    close() {
      this.$emit("closeBuyModal");
    },
    stopPropagation() {},
    blur(e) {
      this.$emit("changeNum", e.target.value);
    },
    plus() {
      if (this.useTime === 0) {
        return;
      }
      this.$emit("changeNum", this.buyNum * 1 + 1);
    },
    minus() {
      if (this.buyNum <= 1) return;
      this.$emit("changeNum", this.buyNum * 1 - 1);
    },
    subBtnClick(ev) {
      console.log("formId=" + ev.target.formId);

      this.$emit("makeBuy", ev.target.formId);
    },
    tiliHandler() {
      this.$emit("tili");
      wx.navigateTo({
        url: '/pages/promote_rules/main'
      })
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../common/style/variable";

.buy-modal {
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
  color: #333;
  opacity: 0;
  transition: opacity 0.5s;

  .buy-cnt {
    width: 100%;
    height: 185px;
    position: absolute;
    left: 0;
    bottom: -200px;
    background: #fff;
    transition: bottom 0.5s;

    .buy-hd {
      padding: 15px;
      position: relative;
      font-size: 14px;
      line-height: 1;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);

      .buy-title {
        text {
          color: #ff3b30;
        }
      }
      .cls-btn {
        width: 32px;
        height: 32px;
        position: absolute;
        top: 6px;
        right: 10px;
        background: url(#{$img_url}/icon_close_black.png) no-repeat center;
        background-size: 16px;
      }
    }

    .buy-bd {
      padding: 0 15px;
      .num-box {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-top: 15px;

        .num-t {
          flex: 1;
          font-size: 14px;
        }
        .num-wrapper {
          width: 94px;
          font-size: 0;
          border: 1px solid #edebe9;
          border-radius: 5px;

          .btn {
            width: 24px;
            height: 24px;
            display: inline-block;
            vertical-align: middle;
          }

          .num-btn-minus {
            background: url(#{$img_url}/icon_minus.png) no-repeat center;
            background-size: 10px 2px;
          }
          .num-input {
            display: inline-block;
            width: 44px;
            height: 24px;
            vertical-align: middle;
            text-align: center;
            font-size: 14px;
            line-height: 24px;
            color: #9b9b9b;
            border-left: 1px solid #edebe9;
            border-right: 1px solid #edebe9;
          }
          .num-btn-plus {
            background: url(#{$img_url}/icon_plus.png) no-repeat center;
            background-size: 10px;
          }
        }
      }

      .buy-chance {
        padding: 12px 0;
        font-size: 12px;
        color: #9b9b9b;
        text-align: right;

        text {
          display: inline-block;
          vertical-align: center;
        }
        .red {
          color: #ff3b30;
        }

        .add-chance {
          display: inline-block;
          padding: 2px 5px;
          vertical-align: center;
          margin: 0 0 0 10px !important;
          line-height: 1;
          text-align: center;
          font-size: 10px;
          color: #ff3b30;
          border-radius: 2px;
          background: #fff !important;
          box-shadow: none !important;
          outline: 0 !important;
          border: 1px solid #ff3b30 !important;
        }
        .green{
          border: 1px solid #3ba700 !important;
          color: #3ba700;
        }
        button::after {
          padding: 0 !important;
          margin: 0 !important;
          border: none !important;
          border-radius: 0;
        }
      }
    }

    .buy-ft {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      border-top: 10px solid #f5f5f5;
      height: 48px;

      .total-t {
        width: 36px;
        margin-left: 15px;
        font-size: 12px;
        flex-shrink: 0;
      }
      .total {
        flex: 1;
        font-size: 21px;
        color: #ff3b30;
        overflow: hidden;
      }
      .makeBuy {
        display: block;
        flex-shrink: 0;
        width: 130px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 18px;
        color: #fff;
        border-radius: 0 !important;
        background: linear-gradient(
          135deg,
          rgba(255, 106, 107, 1) 0%,
          rgba(255, 58, 57, 1) 100%
        );
      }

      button::after {
        padding: 0 !important;
        margin: 0 !important;
        border: none !important;
        border-radius: 0 !important;
      }
    }
  }

  &.show {
    visibility: visible;
    opacity: 1;

    .buy-cnt {
      bottom: 0;
    }
  }
}
</style>