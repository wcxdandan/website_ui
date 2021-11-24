<template>
  <div id="fixedlayerTop" v-if="openLayer" ref="cancelWindow">
    <!--新版直接展示-->
      <div class="left-qrcode-box">
        <div class="qrcode-img"><img src="../assets/websiteImg/ysfw_wx_qrcode.jpg"></div>
        <div class="qrcode-info">
          <div>欢迎关注</div>
          <div>医师服务公众号</div>
        </div>
        <div class="qrcode-img"><img src="../assets/websiteImg/ylsd_wx_qrcode.jpg"></div>
        <div class="qrcode-info">
          <div>欢迎关注</div>
          <div>医联山东公众号</div>
        </div>
      </div>
    <div class="close" @click="closeLayer();">
      <i class="iconfont icon-tongzhi-"></i>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'right-suspension',
    data() {
      return {
        openLayer: true
      };
    },
    methods: {
      backTop() {
        this.setScrollTop(0);
      },
      closeLayer() {
        this.openLayer = false;
      }
    }
  };
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../assets/css/base/fn";
  #fixedlayerTop {
    position: fixed;
    top: 250px;
    right: 120px;
    width: 120px;
    background: $blue11;
    border-radius: 10px;
    cursor: pointer;
    z-index: 20000;
    padding: 10px;
    text-align: center;
    color: $white;
    .left-qrcode-box {
      width: 100px;
      background: $blue11;
      .qrcode-img {
        float: left;
        img {
          width: 100px;
          height: 100px;
        }
      }
      .qrcode-info {
        margin-bottom: 5px;
        width: 100px;
        font-size: 14px;
        float: left;
        text-align: center;
      }
    }
    .close {
      position: absolute;
      right: -15px;
      top: -25px;
      border-radius: 50%;
      text-align: center;
      width: 24px;
      height: 24px;
      // background: $blue11;
      .icon-tongzhi- {
        color: $blue11;
        font-size: 26px;
        vertical-align: middle;
      }
    }
  }
</style>
