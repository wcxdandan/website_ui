<template>
  <div class="footer">
    <!--底部开始-->
    <div class="footer_W">
      <div class="footer_L">
        <div class="footer_logo">黄土坡煤业集团</div>
        <!--<div class="foot_lin"></div>-->
      </div>
      <div class="shiye" style="width:85px; float:left;">
            <span>
              <img id="imgConac" vspace="0" hspace="0" border="0" src="//dcs.conac.cn/image/blue.png" data-bd-imgshare-binded="1">
            </span>
      </div>
      <div class="footer_R fl">
        <p>黄土坡煤业集团版权所有 <span>Copyrights © 2015-2020 All rights reserved </span></p>
        <p>黄土坡煤业集团总机：0531-82628023 0531-82628019</p>
        <p>黄土坡煤业集团F北6002。 邮编：046500 </p>
        <p>
          <span>ICP备案：鲁ICP备10006138号</span>　
          <span>技术支持：黄土坡煤业集团</span>
        </p>
        <p>工信部链接：
          <a href="http://www.miitbeian.gov.cn/state/outPortal/loginPortal.action" target="_bank" style="color: #fff !important">http://www.miitbeian.gov.cn     </a>
          <span class="login">
            <i class="icon iconfont icon-weidenglutouxiang"></i>
            <span class="logout-sl" @click="goLogin">登录</span>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'sn-footer',
    data() {
      return {
      };
    },
    methods: {
      goLogin() {
        this.$router.push({path: '/login'});
      }
    }
  };
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../assets/css/base/fn";
  .footer {
    height: 206px;
    padding: 30px 0;
    background: $blue11;
    color: $white;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
    margin-top: 30px;
  }
  .footer_W {
    width: 1200px;
    margin: 0 auto;
  }
  .footer_L {
    float: left;
    // background: url(assets/images/foot_lin.png) no-repeat right center;
    width: 430px;
    padding: 0 50px;
    margin-right: 25px;
  }
  .footer_R {
    float: left;
    p {
      margin-top: 0;
      margin-bottom: 12px;
      .login {
        width: 100px;
        margin-left: 20px;
        font-size: 14px;
        .icon-weidenglutouxiang {
          font-size: 16px;
          color: $white;
        }
        .logout-sl {
          width: 30px;
          color: $white;
          font-size: 14px;
          border-bottom: 1px solid $white;
        }
      }
    }
  }
  .footer_logo {
    float: left;
    // background-image: url(assets/images/footer_logo.png);
    width: 339px;
    height: 84px;
    font-size: 46px;
    padding-top: 30px;
  }
  .foot_lin {
    float: left;
    // background-image: url(assets/images/foot_lin.png);
    width: 2px;
    height: 113px;
  }
  .shiye {
    width: 85px;
    float: left;
  }
  p {
    display: block;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
  }
</style>
