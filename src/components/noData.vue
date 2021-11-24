<template>
    <div class="no-data">
        <p>
          <i class="iconfont icon-chawushuju"></i>
        </p>
        <p class="explain">
          {{message}}
        </p>
    </div>
</template>

<script>
export default {
  name: 'no-data',
  props: {
    message: {
      type: String,
      default: '暂无数据'
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
      @import "../assets/css/base/fn.scss";
      .no-data {
        padding-bottom: 20px;
        background-color: $transparent;
        text-align: center;
        .icon-chawushuju {
          font-size: 60px;
        }
        .explain {
          font-size: 16px;
          color: $grey61;
        }
      }

</style>
