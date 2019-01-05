<!-- 列表无数据组件 -->
<template>
  <div
    v-show="showNoData"
    class='no-data'
  >
    空空如也~！
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
    };
  },
  computed: {
    backTopIcon() {
      return this.globalData.img_url + 'back_top.png';
    }
  },

  props: {
    showNoData: {
      type: Boolean,
      default: false
    }
  },

  methods: {
  }
};
</script>

<style lang='scss' scoped>
.no-data {
  padding-top: 100px;
  font-size: 14px;
  text-align: center;
  color: #999;
}
</style>