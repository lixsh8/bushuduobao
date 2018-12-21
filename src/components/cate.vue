<!-- 分类组件 -->
<template>
  <div class='cate'>
    <scroll-view
      class='cate-scroll'
      scroll-x='true'
      scroll-with-animation
      :scroll-left='scrollLeft'
    >
      <div
        v-for="(item,index) in cates" :key="index"
        :data-index='item.id'
        :data-id='item.id'
        class='cateItem'
        :class="item.id===currentCateId?'active':''"
        @click='changeTab'
      >{{item.name}}</div>
    </scroll-view>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },

  props: ['cates', 'scrollLeft', 'currentCateId'],

  methods: {
    changeTab(ev) {
      var id = ev.currentTarget.dataset.id
      this.$emit('changeTab', id)
    }
  }
};
</script>

<style lang='scss' scoped>
.cate{
  width: 100%;
  height: 90rpx;
  /* position: fixed; */
  left: 0;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  background: #fff;
  border-bottom: 1px solid #e1e1e1; 
  z-index: 98;
}
.cate scroll-view{
  white-space: nowrap;
  font-size: 0;
}
.cate .cateItem{
  /* width: 100rpx; */
  padding: 0 20rpx;
  display: inline-block;
  font-size: 30rpx;
  line-height: 86rpx;
  text-align: center;
  box-sizing: border-box;
  border-bottom: 4rpx solid #fff;
}
.cate .cateItem.active{
  border-bottom: 4rpx solid #DF2E24;
  color: #DF2E24;
}
</style>