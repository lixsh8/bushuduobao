<template>
  <!-- 授权获取用户信息弹窗 -->
  <div
    class="modal"
    v-if="authModalShow"
  >
    <div class="window">
      <div class="title">{{AuthModalTitle}}</div>
      <scroll-view
        class="content"
        scrollY="authModal$options.contentScrollable"
      >{{authModalContent}}</scroll-view>
      <div class="buttons">
        <button
          @getuserinfo="authModalOnGetUserInfo"
          @opensetting="authModalOnOpenSetting"
          @tap="authModalOnButton"
          class="button"
          v-for="(button,index) in AuthModalButtons"
          :key="index"
          :openType="button.openType"
        >{{button.text}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      authModalContent: "小程序需要您的授权，才能免费换商品哦~",
      contentScrollable: "auto",
      AuthModalButtons: [{ text: "去授权", openType: "getUserInfo" }]
    };
  },
  props: {
    authModalShow: {
      type: Boolean,
      default: !0
    },
    AuthModalTitle: {
      type: String,
      default: ""
    }
  },
  computed: {},
  methods: {
    authModalOnGetUserInfo(e) {
      // console.log(e.target);
      this.$emit('getUserInfo', e.target);
      this.authModalShow = !1;
    }
  },
  created() {}
};
</script>

<style  scoped lang='scss'>
@import "../common/style/curtain";
</style>
