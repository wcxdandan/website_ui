<template>
  <div class="alertloading" style="min-height:100vh;">
  <div class="himalert">
    <div class="alerthead">
      <div class="headmessage">提示信息</div>
    </div>
    <div class="alertbody">
      <p>{{message}}</p>
    </div>
    <div class="alertfoot">
      <Button style="width: 15%" @click="confirm(false)">取消</Button>
      <Button type="primary" style="width: 15%" @click="confirm(true)">确定</Button>
    </div>
  </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'alert-message',
    props: ['message'],
    methods: {
      /*
      * 确认操作
      * 2018年4月10日11:49:27 gk
      * */
      confirm(value) {
        this.$emit('confirmstate', value);
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../assets/css/base/fn.scss";

  .alertloading {
    height: 100vh;
    width: 100vw;
    text-align: center;
    background-color: $faintBlack;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    box-sizing: content-box;
    .himalert {
      top: 30%;
      left: 55%;
      position: fixed;
      background-color: $white;
      border: 0;
      border-radius: 6px;
      background-clip: padding-box;
      z-index: 3000;
      width: 30%;
      transform: translate(-50%, 0);
      .headmessage {
        display: inline-block;
        width: 100%;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: $grey67;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
      }
      .alerthead {
        border-bottom: 1px solid $grey64;
        padding: 14px 16px;
        line-height: 1;
      }
      .alertbody {
        padding: 16px;
        font-size: 14px;
        line-height: 3;
        text-align: left;
      }
      .alertfoot {
        border-top: 1px solid $grey64;
        padding: 12px 18px;
        text-align: right;
      }
    }
  }
  .alert {
    .message-div {
      font-size: 14px;
      color: $grey36;
      text-align: center;
      background-color: rgb(50, 50, 50);
      opacity: 0.9; /* 其他，透明度50% */
      border-radius: 5px;
      width: 200px;
      position: fixed;
      top: 45%;
      left: 55%;
      transform: translate(-50%, 0);
      padding: 30px;
      z-index: 3000;
    }
  }
</style>
