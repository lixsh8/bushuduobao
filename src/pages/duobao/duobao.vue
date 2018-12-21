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
      title: "夺宝",
      headerBackground: "#8054ff",
      titleColor: "#fff",
      showBackTop: true
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