<template>
  <header class="main-header-sl">
  <div class="header-line">
  <!--<router-link to="" tag="div" class="logout-sl">用户注册</router-link>-->
    <router-link to="/login" tag="div" class="logout-sl">登录</router-link>
  </div>
  <div class="head-logo-sl">
    <div class="logo-sl"><img src="../assets/websiteImg/sdysxh.jpg"></div>
    <div class="xh-name">
      <div class="china-name">山东省医师协会</div>
      <div class="english-name">SHANDONG MEDICAL DOCTOR ASSOCIATION</div>
    </div>
    <div class="btn-list">
      <div class="msg-info">服务协调</div>
      <div class="msg-info">自律维权</div>
      <div class="msg-info">监督管理</div>
    </div>
  </div>
  <div class="main-menu">
    <div class="menu-line"></div>
    <div class="menu-item" @click="goUrl('/websiteHome')">首页</div>
    <div class="menu-line"></div>
    <div class="menu-item" @click="goUrl('/xhjs')">协会介绍</div>
 <!--   <div class="menu-item menu-one" @mouseenter="enter()" style="height: auto">协会介绍</div>
    <div class="menu-two" v-if="menu_two_status"  @mouseleave="leave()">
    <ul>
    <li class="menu-common" @click="goXHJS('xhjj')">协会简介</li>
    <li class="menu-common" @click="goXHJS('myhz')">名誉会长</li>
    <li class="menu-common" @click="goXHJS('hz')">会长</li>
    <li class="menu-common" @click="goXHJS('fhz')">副会长</li>
    <li class="menu-common" @click="goXHJS('msz')">秘书长</li>
    <li class="menu-common" @click="goXHJS('lsh')">理事会</li>
    <li class="menu-common" @click="goXHJS('jsh')">监事会</li>
    <li class="menu-common" @click="goXHJS('zzjg')">组织机构</li>
    </ul>
    </div>-->
    <div class="menu-line"></div>
    <div class="menu-item" @click="navigation('gzdt')">工作动态</div>
    <div class="menu-line"></div>
    <div class="menu-item" @click="navigation('xxgg')">信息公告</div>
    <div class="menu-line"></div>
    <div class="menu-item" @click="navigation('yspy')">医师培养</div>
    <div class="menu-line"></div>
    <div class="menu-item" @click="navigation('zlwq')">自律维权</div>
    <div class="menu-line"></div>
    <div class="menu-item" @click="navigation('hyxw')">行业新闻</div>
    <div class="menu-line"></div>
    <div class="menu-item" @click="navigation('xywy')">寻医问药</div>
    <div class="menu-line"></div>
    <div class="menu-item" @click="navigation('xyg')">新医改</div>
    <div class="menu-line"></div>
    <div class="menu-item" onclick="window.open('http://www.sdmda.org.cn/info_sjys/')">十佳医师</div>
    <div class="menu-line"></div>
  </div>
  <div class="main-menu training-registration-main-menu"></div>
  </header>
</template>
<script type="text/javascript">
  import * as UtilsService from '../utils/utilsService';
  export default {
    name: 'sn-header',
    data() {
      return {
        menu_two_status: false,
        type: ''
      };
    },
    methods: {
      enter() {
        this.menu_two_status = true;
      },
      // 鼠标移出
      leave() {
        this.menu_two_status = false;
      },
      // 协会简介
      goXHJS(status) {
        this.$router.push({path: '/xhjs'});
        UtilsService.setSessionStorage('XHstatus', status);
      },
      goUrl(url) {
        this.$router.push(url);
          // {
          //   path: url,
          //   params: this.type
          // });
      },
      // 导航栏跳转
      navigation(newsType) {
        UtilsService.setSessionStorage('more', newsType);
        // this.type = newsType;
        this.goUrl('/newsList/');
      }
    }
  };
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../assets/css/base/fn";
  header.main-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding-top: 20px;
    background: $white;
    border-bottom: 25px solid $main;
    color: $grey61;
    z-index: 250;
    .container {
      position: relative;
      margin: auto;
      // max-width: 1280px;
      height: 100%;
      .logo-img {
        margin-right: 20px;
        vertical-align: middle;
        width: 261px;
        height: 60px;
      }
      .main-nav {
        float: right;
        li {
          height: 25px;
          line-height: 25px;
          margin-left: 20px;
          text-align: right;
        }
      }
    }
  }
  .main-header-sl {
    .header-line {
      height: 4.5vh;
      width: 100%;
      background: $grey32;
      padding-right: 17%;
    }
    .logout-sl {
      float: right;
      color: $blue11;
      size: 10px;
      padding: 10px 15px;
      cursor: pointer;
      font-size: 14px;
    }
    .user-name {
      cursor: auto;
    }
    .head-logo-sl {
      width: 66%;
      // margin-left: 17%;
      margin: 0 auto;
      height: 140px;
      padding: 10px 0;
      position: relative;
      .logo-sl {
        width: 130px;
        height: 140px;
        float: left;
        img {
          width: 100px;
          height: 100px;
          margin-top: 18px;
        }
      }
      .xh-name {
        float: left;
        width: 35%;
        height: 140px;
        padding-top: 25px;
        color: $blue11;
        .china-name {
          font-size: 40px;
          font-weight: bold;
        }
        .english-name {
          font-size: 16px;
        }
      }
      .btn-list {
        float: left;
        height: 140px;
        width: 50%;
        padding-top: 20px;
        .btns-div {
          height: 35px;
          .btn-info {
            padding-left: 20px;
            float: right;
            font-size: 14px;
            color: $blue11;
          }
        }
        .msg-info {
          margin-right: 5%;
          float: right;
          font-size: 30px;
          line-height: 90px;
          // padding-right: 60px;
          color: $blue12;
        }
      }
      .search-div {
        float: right;
        height: 140px;
        width: 33%;
        margin-right: 20%;
        .icon-search1 {
          position: absolute;
          width: 25px;
          height: 25px;
          font-size: 25px;
          padding-top: 2px;
          padding-left: 10px;
        }
        .search-input {
          width: 340px;
          height: 40px;
          outline: none;
          border-radius: 6px;
          background: $grey34;
          border: 1px solid $grey35;
          padding-left: 50px;
          font-size: 16px;
        }
      }
      .head {
        position: absolute;
        top: 10px;
        right: 0;
        bottom: 10px;
        width: 150px;
        height: 99px;
        cursor: pointer;
        .text {
          height: 20px;
          size: 10px;
          text-align: center;
          color: $main;
          margin: 5px 0;
        }
        .sl {
          width: 60px;
          height: 60px;
          // background: url(assets/images/wx-code.png) no-repeat 100% 100%;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;
          margin: 5px auto;
        }
        .bottom-qrcode-box {
          display: none;
          position: absolute;
          left: -80px;
          bottom: -160px;
          z-index: 10000;
          width: 310px;
          height: 160px;
          // background: $lightPrimaryTransparent;
          border-radius: 10px;
          padding: 10px;
        }
      }
      .ali-head {
        right: 150px;
        .sl {
          // background-image: url(assets/images/ali-code.png);
        }
      }
      .ali-head:hover,
      .wechat-head:hover {
        .bottom-qrcode-box {
          display: block;
        }
      }
    }
    .main-menu {
      width: 100vw;
      height: 40px;
      padding-left: 17%;
      background-color: $blue11;
      // border-top: 1px solid $main;
      // border-bottom: 1px solid $main;
      overflow: hidden;
      .menu-item {
        width: 6.65%;
        float: left;
        text-align: center;
        margin: 8px 10px;
        cursor: pointer;
        color: $white;
        font-size: 16px;
      }
      .menu-two {
        position: fixed;
        z-index: 1000;
        top: 24%;
        left: 453px;
        width: 140px;
        height: auto;
        // background-color: black;
        .menu-common {
          width: 128px;
          height: 40px;
          background-color: $blue11;
          border-bottom: 1px solid $white;
          text-align: center;
          line-height: 40px;
          color: $white;
          font-size: 16px;
          cursor: pointer;
        }
        .menu-common:hover {
          background-color: $white;
          color: $blue11;
          font-weight: 700;
        }
      }
      .menu-item:hover {
        // color: $prominent;
      }
      .menu-line {
        width: 1px;
        height: 20px;
        float: left;
        background-color: $main;
        margin: 8px 0;
      }
    }
    .training-registration-main-menu {
      height: 1px !important;
      border-bottom: none;
    }
  }
  .logout {
    cursor: pointer;
    color: $blue21;
  }
  .content {
    width: 80%;
    margin-left: 17%;
    overflow: hidden;
    margin-top: 40px;
    margin-bottom: 40px;
    .news-first {
      height: 360px;
      .news-img {
        width: 40%;
        height: 360px;
        float: left;
        img {
          width: 100%;
          height: 360px;
        }
      }
      .news-info {
        width: 41%;
        float: left;
        margin-left: 30px;
        .news-top {
          width: 100%;
          height: 150px;
          background: $grey32;
          position: relative;
          box-sizing: border-box;
          padding: 10px 20px;
          .title-mark {
            height: 30px;
            width: 100%;
            border-bottom: 1px solid $blue11;
            font-size: 15px;
            color: $blue11;
            .info {
              float: left;
              font-weight: bold;
            }
            .detail {
              float: right;
            }
          }
          .title-msg {
            text-align: center;
            font-size: 18px;
            padding: 15px 0 10px;
            font-weight: bold;
          }
          .msg-info {
            font-size: 14px;
          }
        }
        .news-bottom {
          width: 100%;
          margin-top: 20px;
          li {
            height: 38px;
            line-height: 33px;
            font-size: 14px;
            border-bottom: 1px solid $grey33;
            .text-info {
              float: left;
              .icon-tuoyuan {
                font-size: 6px;
                color: $blue11;
                float: left;
                margin-right: 10px;
              }
            }
            .date-info {
              float: right;
            }
          }
        }
      }
    }
    .news-second {
      height: 80px;
      margin-top: 30px;
      .btn-style {
        margin-right: 40px;
        float: left;
        width: 26%;
        height: 62px;
        line-height: 62px;
        background: $grey33;
        border-radius: 5px;
        box-shadow: 0 3px 0 lightgray;
        transition: all 0.2s ease 0s;
        -webkit-transition: all 0.2s ease 0s;
        font-size: 22px;
        color: $grey66;
        text-align: center;
        .icon-monikaoshi {
          font-size: 30px;
          padding-right: 20px;
          float: left;
          margin-left: 100px;
        }
        .icon-shouye-keshizhuye {
          float: left;
          font-size: 38px;
          padding-right: 20px;
          margin-left: 120px;
        }
        .icon-search1 {
          float: left;
          font-size: 38px;
          padding-right: 20px;
          margin-left: 90px;
        }
      }
    }
    .branch-link {
      height: 310px;
      width: 83%;
      margin-bottom: 85px;
      .branch-top {
        color: lightgray;
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid lightgray;
        .common {
          float: left;
          width: auto;
          height: 100%;
          font-weight: bold;
          font-size: 20px;
          margin-right: 50px;
          cursor: pointer;
          color: $blue11;
        }
        .default {
          color: lightgray;
        }
        .active {
          color: $blue11;
          border-bottom: 2px solid $blue11;
        }
        .branch-top-right {
          color: $blue11;
          cursor: pointer;
          font-size: 15px;
          float: right;
        }
      }
    }
    .news-three {
      height: 310px;
      .news-left-three {
        width: 40%;
        float: left;
        height: 310px;
        position: relative;
        box-sizing: border-box;
        padding: 10px 0;
        margin-right: 50px;
        .title-mark-three {
          height: 40px;
          line-height: 40px;
          width: 100%;
          border-bottom: 1px solid $blue11;
          color: $blue11;
          .info-three {
            float: left;
            font-weight: bold;
            font-size: 20px;
          }
          .detail-three {
            font-size: 15px;
            float: right;
            cursor: pointer;
          }
        }
        .radio-list {
          width: 100%;
          margin-top: 10px;
          .radio-info {
            width: 48%;
            float: left;
            img {
              width: 290px;
              height: 220px;
            }
            .icon-bofang-left {
              position: absolute;
              font-size: 60px;
              color: $white;
              margin-top: 65px;
              margin-left: -170px;
            }
            .icon-bofang-right {
              position: absolute;
              font-size: 60px;
              color: $white;
              margin-top: -158px;
              margin-left: 120px;
            }
          }
          .radio-padding-left {
            padding-left: 4%;
          }
        }
        li {
          height: 38px;
          line-height: 33px;
          font-size: 14px;
          border-bottom: 1px solid $grey33;
          .text-info {
            float: left;
            .icon-jiantouyou {
              font-size: 14px;
              margin-right: 10px;
            }
          }
          .date-info {
            float: right;
          }
        }
      }
    }
    .link-div {
      clear: both;
      margin-top: 30px;
      border: 1px solid lightgray;
      border-radius: 6px;
      width: 83%;
      height: 100px;
      line-height: 100px;
      font-size: 16px;
      .link-title {
        float: left;
        width: 12%;
        padding-left: 20px;
      }
      .link-list {
        float: left;
        .link-info {
          float: left;
          font-size: 16px;
          color: $blue11;
          padding-right: 60px;
        }
      }
    }
  }
  #fixedlayerTop {
    position: fixed;
    top: 250px;
    right: 40px;
    width: 60px;
    background: $blue11;
    border-radius: 10px;
    cursor: pointer;
    z-index: 20000;
    .fixedlayerTop-item {
      text-align: center;
      padding: 5px 8px;
      color: $white;
      .iconfont {
        color: $grey40;
        font-size: 36px;
      }
      .icon-tongzhi-6 {
        font-size: 50px;
      }
      .icon-right-arrow {
        font-size: 24px;
      }
      .app-text {
        font-size: 18px;
        padding-bottom: 15px;
      }
      .left-qrcode-box {
        display: none;
        position: absolute;
        top: 0;
        left: -320px;
        width: 310px;
        height: 160px;
        background: $blue11;
        border-radius: 10px;
        padding: 10px;
        .qrcode-img {
          float: left;
        }
        .qrcode-info {
          font-size: 24px;
          float: left;
          text-align: center;
          padding: 15px 0 0 30px;
        }
      }
      label {
        color: $white;
      }
    }
    .ali:hover,
    .wechat:hover {
      .left-qrcode-box {
        display: block;
      }
    }
    .fixedlayerTop-item.up::before {
      display: block;
      content: '';
      text-align: center;
      width: 24px;
      border-bottom: 4px solid $grey40;
      margin: 0 auto;
    }
    .close {
      position: absolute;
      left: 18px;
      bottom: -35px;
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
  .footer {
    height: 206px;
    padding: 30px 0;
    background: $blue11;
    color: $white;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
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
