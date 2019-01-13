<!-- 分页底部没有更多 -->
<template>
  <div
    v-show="showNoMore"
    class='no-more'
    :style="{color: noMoreTipsColor}"
  >
    {{noMoreTips}}
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
    };
  },
  props: {
    showNoMore: {
      type: Boolean,
      default: false
    },
    noMoreTips: {
      type: String,
      default: '没有更多数据了'
    },
    noMoreTipsColor: {
      type: String,
      default: '#333'
    }
  }
};
</script>

<style lang='scss' scoped>
.no-more{
  padding: 20px 0 20px 0;
  text-align: center;
  font-size: 14px;
  color: #333;
}
</style>