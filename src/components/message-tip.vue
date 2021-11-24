<template>
  <div @click="showMessage" class="message-con">
    <Tooltip :content="value > 0 ? '有' + value + '条未读消息' : '无未读消息'" placement="bottom">
      <Badge :count="value" dot>
        <Icon type="ios-bell" class="ios-bellcolor" :size="22"></Icon>
      </Badge>
    </Tooltip>
  </div>
</template>

<script>
  export default {
    name: 'message-Tip',
    props: {
      value: {
        type: Number,
        default: 0
      }
    },
    methods: {
      showMessage() {
        this.$router.push({
          path: '/message/message'
        });
      }
    }
  };
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../assets/css/base/fn.scss";
  .message-con {
    margin-right: 30px;
    cursor: pointer;
    display: inline-block;
    text-align: center;
    i {
      vertical-align: middle;
    }
  }
  .ios-bellcolor {
    color: $white;
  }
</style>
