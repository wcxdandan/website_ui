<template>
  <div class="loading-div" style="min-height:100vh;">
    <div class="loader-div">
      <div class="loader">
        <div class="loader-inner">Loading</div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'loading'
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../assets/css/base/fn.scss";
  .loading-div {
    height: 100vh;
    width: 100vw;
    text-align: center;
    background-color: $faintBlack;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    box-sizing: content-box;
    .loader-div {
      position: fixed;
      top: 45%;
      left: 55%;
      transform: translate(-50%, 0);
      width: 85px;
      height: 85px;
      line-height: 85px;
      background-color: $darkBlack;
      z-index: 10001;
      border-radius: 5px;
    }
    .loader {
      font-size: 12px;
      width: 55px;
      height: 55px;
      line-height: 55px;
      border-radius: 60%;
      border-top: 4px solid $blue41;
      text-align: center;
      margin: 16px auto;
      -webkit-animation: 2s loading1 ease-in-out infinite;
      animation: 2s loading1 ease-in-out infinite;
    }
    .loader::before,
    .loader::after {
      content: "";
      display: block;
      width: 55px;
      height: 55px;
      border-radius: 50%;
      position: absolute;
      top: -4px;
      left: 0;
    }
    .loader::before {
      border-top: 4px solid $blue41;
      -webkit-transform: rotate(110deg);
      transform: rotate(110deg);
    }
    .loader::after {
      border-top: 4px solid $blue41;
      -webkit-transform: rotate(230deg);
      transform: rotate(230deg);
    }

    .loader .loader-inner {
      display: block;
      width: 55px;
      height: 55px;
      position: absolute;
      top: -4px;
      left: 0;
      -webkit-animation: 2s loading2 linear infinite;
      animation: 2s loading2 linear infinite;
      color: $blue41;
    }

    @-webkit-keyframes loading1 {
      50% {
        -webkit-transform: rotate(180deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
      }
    }

    @keyframes loading1 {
      50% {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }

    @-webkit-keyframes loading2 {
      50% {
        -webkit-transform: rotate(-180deg);
      }
      100% {
        -webkit-transform: rotate(-360deg);
      }
    }

    @keyframes loading2 {
      50% {
        -webkit-transform: rotate(-180deg);
        transform: rotate(-180deg);
      }
      100% {
        -webkit-transform: rotate(-360deg);
        transform: rotate(-360deg);
      }
    }
  }
</style>
