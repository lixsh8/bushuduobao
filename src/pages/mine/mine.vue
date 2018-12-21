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
      title: "我的",
      headerBackground: "#8054ff",
      titleColor: "#fff"
    };
  },

  components: {
    headBar
  },

  methods: {},

  created() {},

  onLoad() {
  }
};
</script>

<style scoped lang='scss'>
</style>