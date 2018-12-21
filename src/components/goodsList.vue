<!-- 商品列表组件 -->
<template>
  <div>
    <div class='goods-list'>
      <div
        class="goods-item"
        v-for="item in goods"
        :key="item.id"
      >
        <img
          :src="item.img"
          alt=""
          mode="widthFix"
        />
        <div class="cnt">
          <text class="goods-title sg_line_ellipsis">{{item.goodsName}}</text>
          <div class="pack">红包最高抵扣{{item.pack}}元</div>
          <div class="price">￥{{item.price}}</div>
          <div class="sale-num">{{item.saleNum}}人购买</div>
        </div>
      </div>
    </div>

    <div
      class='reflesh-message'
      v-show='!hasMore && goods.length>0&&page!=1'
    >已经到底啦~别扯了</div>
    <div
      class='reflesh-message'
      v-show='loading'
    >正在加载中...</div>
    <div
      class='reflesh-message'
      v-if='goods.length==0 && !isLoadingPage'
      style="padding-top:100rpx;"
    >没有找到相关商品~</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },

  props: ["goods", "hasMore", "page", "loading", "isLoadingPage"],

  methods: {}
};
</script>

<style lang='scss' scoped>
@import "../common/common";

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

    .pack {
      display: inline-block;
      margin-top: 5px;
      padding: 3px 5px;
      font-size: 12px;
      line-height: 1;
      color: $main-color;
      border: 1px solid $main-color;
      border-radius: 3px;
    }

    .price {
      margin-top: 10px;
      font-size: 14px;
      line-height: 1;
      color: $main-color;
    }
    .sale-num {
      position: absolute;
      right: 0;
      bottom: 6px;
      font-size: 14px;
      color: #ccc;
    }
  }
}

.reflesh-message {
  padding: 10px;
  text-align: center;
  font-size: 12px;
  color: #666;
}
</style>