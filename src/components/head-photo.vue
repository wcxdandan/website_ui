<template>
  <div class='head-photo'>
    <img :src='photo' onerror='this.src="http://static.shunnengnet.com/default.jpg"'>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'head-photo',
    props: {
      photo: {
        default: 'http://static.shunnengnet.com/default.jpg'
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../assets/css/base/fn.scss";
  .head-photo {
    float: left;
    width: 65px;
    height: 70px;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
