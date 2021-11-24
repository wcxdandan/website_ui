<template>
  <div v-if="app" class="snui-app-header">
    <header class="app-header">
        <i :class="iconClass" @click="back"></i>
        {{title}}
    </header>
  </div>
</template>

<script>
export default {
  name: 'app-header',
  props: {
    title: {
      type: String
    },
    iconClass: {
      type: [String, Array, Object],
      default: 'iconfont icon-youjiantou left'
    }
  },
  data() {
    return {
      app: false
    };
  },
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import "../assets/css/base/fn.scss";
    .snui-app-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
    }
    .app-header {
      position: relative;
      width: 100%;
      height: px2rem(88px);
      padding: 0 px2rem(24px);
      line-height: px2rem(88px);
      text-align: center;
      font-size: px2rem(36px);
      color: $white;
      background-image: -moz-linear-gradient(90deg, rgb(109, 91, 255) 0%, rgb(102, 107, 255) 40%, rgb(87, 118, 255) 70%, rgb(81, 141, 255) 100%, rgb(0, 176, 236) 100%);
      background-image: -webkit-linear-gradient(90deg, rgb(109, 91, 255) 0%, rgb(102, 107, 255) 40%, rgb(87, 118, 255) 70%, rgb(81, 141, 255) 100%, rgb(0, 176, 236) 100%);
      background-image: -ms-linear-gradient(90deg, rgb(109, 91, 255) 0%, rgb(102, 107, 255) 40%, rgb(87, 118, 255) 70%, rgb(81, 141, 255) 100%, rgb(0, 176, 236) 100%);
      .iconfont {
        color: $white;
      }
      .left {
        float: left;
      }
      .right {
        float: right;
      }
    }
</style>
