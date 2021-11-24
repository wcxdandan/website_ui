<template>
  <div id="video-main">
    <div class="content">
      <div class="menu-crumbs-info">
        <label class="empty-block">&nbsp;</label>
        <label @click="mixinSendClickEvent($event, $route.fullPath, 'shouye');goUrl('/websiteHome')">首页<i  class="iconfont icon-jiantouyou"></i></label>
        <label @click="mixinSendClickEvent($event, $route.fullPath, 'shipinzhongxin');goUrl('/videoInfo')">视频中心</label>
      </div>
      <div class="news-detail">
        <div class="news-title">{{videoList.title}}</div>
        <div class="news-date">发布日期：{{videoList.createDate}}&nbsp;&nbsp;&nbsp;&nbsp;浏览次数：{{videoList.browseNumber}}</div>
        <div class="news-content">
          <div class="video-content">
            <embed :src="videoList.videoLink" width="100%" height="100%"  type="application/x-shockwave-flash" extendspage="http://get.adobe.com/flashplayer/" autostart="true" quality="high" allowfullscreen="true" allowscriptaccess="never">
            <!--<video src="http://player.youku.com/player.php/sid/XMTU5NjMxMDY4NA==/v.swf"></video>-->
            <!--<img src="../.././assets/websiteImg/gw_news.png" style="width: 100%;height: 100%"/>-->
            <!--<i class="iconfont icon">&#xe604;</i>-->
          </div>
        </div>
        <div class="video-description" v-if="videoList.content !== ''">
          <div class="video-description-content" v-html="videoList.content"></div>
        </div>
      </div>
    </div>
    <!-- 右侧二维码 -->
    <!--<right-suspension></right-suspension>-->
    <sn-footer></sn-footer>
  </div>
</template>
<script type="text/javascript">
  import * as UtilsService from '../../utils/utilsService';
  export default{
    data() {
      return {
        openLayer: true,
        videoList: [] // 视频信息
      };
    },
    watch: {
    },
    methods: {
      goUrl(url) {
        this.$router.push(url);
      },
      backTop() {
        this.setScrollTop(0);
      },
      closeLayer() {
        this.openLayer = false;
      },
      // 页面置顶
      setScrollTop(scrolltop) {
        document.documentElement.scrollTop = scrolltop;
        window.pageYOffset = scrolltop;
        document.body.scrollTop = scrolltop;
      },
      mousedown(event) {
        event = event || window.event;
        let disx = event.clientX - this.$refs.cancelWindow.offsetLeft;
        let disy = event.clientY - this.$refs.cancelWindow.offsetTop;
        document.onmousemove = (event) => {
          event = event || window.event;
          this.move(event, disx, disy);
        };
      },
      move(event, disx, disy) {
        let x = event.clientX - disx;
        let y = event.clientY - disy;
        if (x < 0) {
          x = 0;
        }
        else if (x > this.maxW) {
          x = this.maxW;
        }
        if (y < 0) {
          y = 0;
        }
        else if (y > this.maxH) {
          y = this.maxH;
        }
        this.$refs.cancelWindow.style.left = x + 'px';
        this.$refs.cancelWindow.style.top = y + 'px';
      },
      mouseup() {
        document.onmousemove = null;
        document.onmouseup = null;
      },
      // 获取详细信息
      getVideoInfo() {
        this.videoList = UtilsService.getSessionStorage('videoInfo');
      }
    },
    created: function() {
      this.getVideoInfo();
    }
  };
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/base/fn.scss";
  #video-main {
    height: 100vh;
    overflow-y: hidden;
    .content {
      width: 1180px;
      margin: 0 auto;
      overflow: hidden;
      margin-top: 40px;
      margin-bottom: 40px;
      padding: 0 20px;
      .menu-crumbs-info {
        font-size: 16px;
        color: $blue11;
        .empty-block {
          background-color: $blue11;
          width: 5px;
          height: 15px;
          margin-right: 10px;
        }
        .iconfont {
          color: $blue11;
        }
      }
      .news-detail {
        margin-top: 30px;
        .news-title {
          font-size: 32px;
          text-align: center;
          font-weight: bold;
          margin-bottom: 20px;
          border-bottom: solid 2px $blue11;
          padding-bottom: 30px;
          color: $blue11;
        }
        .news-date {
          text-align: right;
          font-size: 16px;
          font-weight: bold;
        }
        .news-content {
          margin-top: 20px;
          font-size: 16px;
          line-height: 28px;
          text-align: justify;
          .video-content {
            position: relative;
            margin: auto;
            width: 700px;
            height: 400px;
          }
          .content-info {
            margin-top: 20px;
          }
          .center-text {
            text-align: center;
          }
        }
        .video-description {
          .video-description-content {
            font-size: 16px;
          }
        }
      }
    }
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
        height: 40px;
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
        width: 100%;
        margin-left: 17%;
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
          width: 500px;
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
          width: 33%;
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
            float: right;
            font-size: 30px;
            line-height: 90px;
            padding-right: 60px;
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
          width: 120px;
          float: left;
          text-align: center;
          margin: 8px 10px;
          cursor: pointer;
          color: $white;
          font-size: 16px;
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
  }
</style>

