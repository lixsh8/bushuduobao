<!-- 商品列表组件 -->
<template>
  <div>
    <div class='goods-list'>
      <div
        class="goods-item"
        v-for="item in goods"
        :key="item.id"
      >
        <div class="avatar-box">
          <img
            :src="item.img"
            alt=""
            mode="widthFix"
            />
          <div class="top-tips">200份即开奖</div>
          <div class="process">
            <img class="process-bar" src="" alt=""/>
            <div class="process-txt">124/200 份</div>
          </div>
        </div>
        <div class="cnt">
          <text class="goods-title sg_line_ellipsis">{{item.goodsName}}</text>
          <div class="join-btn">一元参与</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },

  props: ["goods"],

  methods: {}
};
</script>

<style lang='scss' scoped>

.goods-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 6px;

  .goods-item {
    width: 50%;
    padding: 5px 6px;
    box-sizing: border-box;

    .cnt {
      position: relative;
      padding: 10px 0;
    }

    img {
      display: block;
      width: 100%;
    }

    .goods-title {
      display: block;
      font-size: 14px;
      line-height: 1;
    }

  }
}

</style>