<template>
  <div>
    <head-bar
      :title="title"
      :headerBackground="headerBackground"
      :titleColor="titleColor"
    />
  </div>
</template>

<script>
import headBar from "@/components/headBar";

export default {
  data() {
    return {
      title: "好友加成",
      headerBackground: "#d03430",
      titleColor: "#fff"
    };
  },

  components: {
    headBar
  },

  methods: {},

  created() {},

  onLoad() {
    console.log(this.globalData.id);
  }
};
</script>

<style scoped lang='scss'>
</style>