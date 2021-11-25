<template>
  <div class="website-home-main">
    <div class="main-header-sl">
      <!--头部-->
      <div class="head-logo-sl" @mouseenter="henter()">
        <div class="logo-sl">
          <img src="../assets/websiteImg/sdysxh.jpg">
          <div class="xh-name">
            <div class="china-name">黄土坡煤业集团</div>
            <div class="english-name">SHANDONG MEDICAL DOCTOR ASSOCIATION</div>
          </div>
        </div>
        <div class="btn-list">
          <div class="runlight-list">
            <div class="msg-info">管理</div>
            <div class="msg-info">监督</div>
            <div class="msg-info">维权</div>
            <div class="msg-info">自律</div>
            <div class="msg-info">协调</div>
            <div class="msg-info">服务</div>
          </div>
        </div>

        <div class="header-line">
          <div class="new-list">
            <div class="logout-sl">&nbsp;听医生说话、为医生说话、帮医生解忧、促进行业自律</div>
          </div>
        </div>
        <div class="header-search">
          <div class="search">
            <i class="icon iconfont icon-sousuo"></i>
            <input class="search-input" type="text" placeholder="搜索" v-model="searchContent">
            <button class="search-btn" @click="mixinSendClickEvent($event, $route.fullPath, 'search');goUrlSearch('/search')">搜索</button>
          </div>
        </div>
      </div>
    </div>
    <!--导航栏-->
    <div class="main-menu">
      <div class="navigation">
        <div class="menu-">
          <div class="menu-line"></div>
          <div class="menu-item" @click="mixinSendClickEvent($event, $route.fullPath, 'shouye');goUrl('/websiteHome')" @mouseleave="leave()">首页</div>
        </div>
        <div class="menu-">
          <div class="menu-line"></div>
          <div class="menu-item menu-one" @mouseenter="enter()" style="height: auto">
          <p @click="mixinSendClickEvent($event, $route.fullPath, 'xiehuijieshao');goXHJS('xhjj')">黄煤介绍</p>
          <div class="menu-two" v-if="menu_two_status"  @mouseleave="leave()">
          <ul>
          <li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'xiehuijieshao-guanlibanfa');goXHJS('glbf')">管理办法</li>
          <li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'xiehuijieshao-xiehuijianjie');goXHJS('xhjj')">协会简介</li>
          <li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'xiehuijieshao-mingyuhuizhang');goXHJS('myhz')">名誉会长</li>
          <li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'xiehuijieshao-huizhang');goXHJS('hz')">会长</li>
          <li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'xiehuijieshao-fuhuizhang');goXHJS('fhz')">副会长</li>
          <li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'xiehuijieshao-mishuzhang');goXHJS('msz')">秘书长</li>
          <li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'xiehuijieshao-lishizhang');goXHJS('lsh')">理事会</li>
          <li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'xiehuijieshao-jianshihui');goXHJS('jsh')">监事会</li>
          <li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'xiehuijieshao-zuzhijigou');goXHJS('zzjg')">组织机构</li>
          </ul>
          </div>
          </div>
        </div>
        <div class="menu-">
          <div class="menu-line"></div>
          <div class="menu-item" @click="mixinSendClickEvent($event, $route.fullPath, 'shouye');goUrl('/sjys')" @mouseleave="leave()">产品中心</div>
        </div>
        <div class="menu-">
          <div class="menu-line"></div>
          <div class="menu-item" @click="mixinSendClickEvent($event, $route.fullPath, 'shouye');goUrl('/newsList/gzdt', 'gzdt')" @mouseleave="leave()">工作动态</div>
        </div>
        <div class="menu-">
          <div class="menu-line"></div>
          <div class="menu-item" @click="mixinSendClickEvent($event, $route.fullPath, 'shouye');goUrl('/websiteHome')" @mouseleave="leave()">信息公告</div>
        </div>
        <div class="menu-">
          <div class="menu-line"></div>
          <div class="menu-item" @click="mixinSendClickEvent($event, $route.fullPath, 'shouye');goUrl('/websiteHome')" @mouseleave="leave()">新闻中心</div>
        </div>
        <div class="menu-">
          <div class="menu-line"></div>
          <div class="menu-item" @click="mixinSendClickEvent($event, $route.fullPath, 'shouye');goUrl('/websiteHome')" @mouseleave="leave()">线上服务</div>
        </div>
        <div class="menu-">
          <div class="menu-line"></div>
          <div class="menu-item" @click="mixinSendClickEvent($event, $route.fullPath, 'shouye');goUrl('/websiteHome')" @mouseleave="leave()">联系我们</div>
        </div>
        <!--<div class="menu-line"></div>-->
        <!--<div class="menu-item menu-one" @mouseenter="enter()" style="height: auto">-->
          <!--<p @click="mixinSendClickEvent($event, $route.fullPath, 'xiehuijieshao');goXHJS('xhjj')">黄煤介绍</p>-->
          <!--<div class="menu-two" v-if="menu_two_status"  @mouseleave="leave()">-->
            <!--<ul>-->
              <!--<li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'xiehuijieshao-guanlibanfa');goXHJS('glbf')">管理办法</li>-->
              <!--<li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'xiehuijieshao-xiehuijianjie');goXHJS('xhjj')">协会简介</li>-->
              <!--<li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'xiehuijieshao-mingyuhuizhang');goXHJS('myhz')">名誉会长</li>-->
              <!--<li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'xiehuijieshao-huizhang');goXHJS('hz')">会长</li>-->
              <!--<li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'xiehuijieshao-fuhuizhang');goXHJS('fhz')">副会长</li>-->
              <!--<li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'xiehuijieshao-mishuzhang');goXHJS('msz')">秘书长</li>-->
              <!--<li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'xiehuijieshao-lishizhang');goXHJS('lsh')">理事会</li>-->
              <!--<li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'xiehuijieshao-jianshihui');goXHJS('jsh')">监事会</li>-->
              <!--<li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'xiehuijieshao-zuzhijigou');goXHJS('zzjg')">组织机构</li>-->
            <!--</ul>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="menu-line"></div>-->
        <!--<div class="menu-item menu-one" @mouseenter="enterOne()" style="height: auto">-->
          <!--<p @click="mixinSendClickEvent($event, $route.fullPath, 'dangjiangongzuo');goUrl('/djgz')">产品中心</p>-->
          <!--<div class="menu-two" v-if="menu_one_status"  @mouseleave="leave()">-->
            <!--<ul>-->
              <!--<li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'dangjiandongtai');goUrl('/newsList/partyBuildingNews','partyBuildingNews')">党建动态</li>-->
              <!--<li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'dangzhangdanggui');goUrl('/newsList/partyRegulations','partyRegulations')">党章党规</li>-->
              <!--<li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'xiliejianghau');goUrl('/newsList/seriesSpeech','seriesSpeech')">系列讲话</li>-->
            <!--</ul>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="menu-line"></div>-->
        <!--<div class="menu-item" @click="mixinSendClickEvent($event, $route.fullPath, 'gongzuodongtai');goUrl('/newsList/gzdt', 'gzdt')" @mouseleave="leave()">工作动态</div>-->
        <!--<div class="menu-line"></div>-->
        <!--<div class="menu-item" @click="mixinSendClickEvent($event, $route.fullPath, 'xinxigonggao');goUrl('/newsList/xxgg', 'xxgg')" @mouseleave="leave()">信息公告</div>-->
        <!--<div class="menu-line"></div>-->
        <!--<div class="menu-item" @click="mixinSendClickEvent($event, $route.fullPath, 'hangyexinwen');goUrl('/newsList/hyxw', 'hyxw')" @mouseleave="leave()">新闻中心</div>-->
        <!--<div class="menu-line"></div>-->
        <!--<div class="menu-item" @click="mixinSendClickEvent($event, $route.fullPath, 'hangyexinwen');goUrl('/newsList/hyxw', 'hyxw')" @mouseleave="leave()">线上服务</div>-->
        <!--<div class="menu-line"></div>-->

        <!--&lt;!&ndash;<div class="menu-item" @click="mixinSendClickEvent($event, $route.fullPath, 'shaungbaifupin');goUrl('/newsList/sbfp','sbfp')" @mouseleave="leave()">双百扶贫</div>&ndash;&gt;-->
        <!--<div class="menu-item menu-one" @mouseenter="enterFour()" @click="mixinSendClickEvent($event, $route.fullPath, 'zhuan-ti-ji-jin')" style="height: auto">-->
          <!--<p>联系我们</p>-->
          <!--<div class="menu-two" v-if="menu_four_status"  @mouseleave="leave()" style="width: 126px;">-->
            <!--<ul>-->
              <!--<li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'zhuantijijin-duikouzhiyuan');goUrl('/dkzy')" style="height: auto;width: auto">对口支援</li>-->
              <!--<li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'zhuantijijin-disancidahui');goUrl('/metting')" style="height: auto;width: auto">第三次代表大会</li>-->
            <!--</ul>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="menu-line"></div>-->
      </div>
    </div>
    <div class="main-menu training-registration-main-menu"></div>
    <!-- 右侧二维码 -->
    <right-suspension></right-suspension>
  </div>
</template>
<script type="text/javascript">
  import * as UtilsService from '../utils/utilsService';
  export default {
    name: 'header-main',
    data() {
      return {
        menu_one_status: false,
        menu_two_status: false,
        menu_three_status: false,
        menu_four_status: false,
        newTime: '',
        searchContent: '',
        newsType: ['gzdt', 'xxgg', 'yspy', 'zlwq', 'hyxw', 'xyg', 'sbfp']
      };
    },
    created: function() {
      for (let i = 0; i < this.newsType.length; i++) {
        UtilsService.cleanSessionStorage('list_' + this.newsType[i]);
      }
      this.newTime = new Date().getTime();
//      this.goUrl('/websiteHome');
      this.newTime = '';
    },
    methods: {
      enter() {
        this.menu_two_status = true;
        this.menu_one_status = false;
        this.menu_three_status = false;
        this.menu_four_status = false;
      },
      henter() {
        this.menu_one_status = false;
        this.menu_two_status = false;
        this.menu_three_status = false;
        this.menu_four_status = false;
      },
      enterOne() {
        this.menu_one_status = true;
        this.menu_two_status = false;
        this.menu_three_status = false;
        this.menu_four_status = false;
      },
      enterThree() {
        this.menu_three_status = true;
        this.menu_one_status = false;
        this.menu_two_status = false;
        this.menu_four_status = false;
      },
      enterFour() {
        this.menu_four_status = true;
        this.menu_one_status = false;
        this.menu_two_status = false;
        this.menu_three_status = false;
      },
      // 鼠标移出
      leave() {
        this.menu_one_status = false;
        this.menu_two_status = false;
        this.menu_three_status = false;
        this.menu_four_status = false;
      },
      // 协会简介
      goXHJS(status) {
        this.menu_two_status = false;
        this.newTime = new Date().getTime();
        this.$router.push({path: '/xhjs'});
        this.$emit('watchXh', status);
        UtilsService.setSessionStorage('XHstatus', status);
      },
      goUrl(url, param) {
        this.menu_one_status = false;
        this.menu_two_status = false;
        this.newTime = new Date().getTime();
        UtilsService.setSessionStorage('lastPath', url);
        if (url && param) {
          this.$emit('watchnewtype', param);
        }
        this.$router.push(url);
      },
      goUrlSearch(url) {
        this.menu_one_status = false;
        this.menu_two_status = false;
        this.newTime = new Date().getTime();
        UtilsService.cleanSessionStorage('lastPath');
        UtilsService.setSessionStorage('lastPath', url);
        if (this.searchContent !== '') {
          this.$router.push(
            {
              path: url,
              query: {
                content: this.searchContent
              }
            }
          );
          this.$emit('search', this.searchContent);
        }
      },
      goUrlNewClass(url, param, type) {
        this.newTime = '';
        this.$router.push({path: url});
        let tempData = {'fristType': param, 'secondType': type};
        this.$emit('watchSecondMenu', tempData);
      },
      goLogin() {
        this.$router.push({path: '/login'});
      }
    }
  };
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../assets/css/base/fn";
  .website-home-main {
    cursor: pointer;
    .main-header-sl {
      overflow: hidden;
      .head-logo-sl {
        width: 1180px;
        margin: 0 auto;
        .logo-sl {
          float: left;
          height: 100px;
          width: 480px;
          margin: 20px 0;
          position: relative;
          img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100px;
            height: 100px;
          }
          .xh-name {
            position: absolute;
            top: -3px;
            left: 100px;
            width: 360px;
            display: inline-block;
            margin-left: 20px;
            color: $blue11;
            .china-name {
              font-size: 50px;
              font-weight: bold;
              font-family: "Microsoft YaHei";
            }
            .english-name {
              font-size: 15px;
              font-family: "Microsoft YaHei";
              font-weight: bold;
            }
          }
        }
        .btn-list {
          position: relative;
          height: 95px;
          width: 425px;
          padding-top: 14px;
          margin-right: 180px;
          overflow: hidden;
          .runlight-list {
            position: absolute;
            width: 425px;
            animation: mymove 3s linear 1 forwards;
            margin-left: 20px;
            .msg-info {
              float: right;
              margin-right: 20px;
              font-size: 24px;
              font-family: "Microsoft YaHei";
              line-height: 70px;
              color: $blue12;
            }
          }
        }
        .header-search {
          position: relative;
          .search {
            position: absolute;
            right: 0;
            top: -60px;
            .icon-sousuo {
              position: absolute;
              top: 5px;
              left: 13px;
              font-size: 15px;
            }
            .search-input {
              width: 180px;
              height: 35px;
              padding-left: 35px;
              background-color: $grey34;
              border: 1px solid $grey35;
              outline: none;
              border-radius: 24px;
            }
            .search-btn {
              width: 60px;
              height: 35px;
              margin-left: 5px;
              background-color: $blue11;
              color: $white;
              border: none;
              outline: none;
              border-radius: 24px;
              text-align: center;
            }
          }
        }
        .header-line {
          float: right;
          overflow: hidden;
          width: 416px;
          .new-list {
            width: 416px;
            animation: mymove 3s linear 1 forwards;
            .logout-sl {
              color: $blue12;
              font-size: 17px;
            }
          }
        }
      }
    }
    .main-menu {
      width: 100%;
      height: 40px;
      background-color: $blue11;
      .navigation {
        width: 1180px;
        // width: 100vh;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .menu- {
          width: 100%;
          .menu-item {
            // width: 86px;

            flex-grow: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            // float: left;
            text-align: center;
            line-height: 20px;
            margin: 10px;
            cursor: pointer;
            color: $white;
            font-size: 16px;
          }
          .menu-one {
            position: relative;
            .menu-two {
              position: absolute;
              z-index: 1000;
              top: 31px;
              left: -10px;
              width: 116px;
              height: auto;
              .menu-common {
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
          }
          .menu-line {
            width: 1px;
            height: 20px;
            float: left;
            background-color: $main;
            margin: 10px 0;
          }
        }
      }
    }
    .training-registration-main-menu {
      height: 1px !important;
      border-bottom: none;
    }
    .main-main-content {
      overflow: scroll;
      width: 100vw;
      height: 80%;
      margin-bottom: 20%;
    }

    @-webkit-keyframes mymove {
      from {
        transform: translate(100%, 0);
      }
      to {
        transform: translate(0, 0);
      }
    }

    @keyframes mymove {
      from {
        transform: translate(100%, 0);
      }
      to {
        transform: translate(0, 0);
      }
    }
  }
</style>
