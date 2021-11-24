<template>
  <div class="website-home-main">
    <div class="main-header-sl">
      <!--登录-->
      <!-- <div class="header-line">
         &lt;!&ndash;<router-link to="" tag="div" class="logout-sl">用户注册</router-link>&ndash;&gt;
         <router-link to="/login" tag="div" class="logout-sl">登录</router-link>
       </div>-->
      <!--头部-->
      <div class="head-logo-sl" @mouseenter="henter()">
        <div class="logo-sl">
          <img src="../../assets/websiteImg/sdysxh.jpg">
          <div class="xh-name">
            <div class="china-name">山东省医师协会</div>
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
        <!--    <div class="header-line">
              <i class="icon iconfont icon-weidenglutouxiang"></i>
              <div class="logout-sl" @click="goLogin">登录</div>
            </div>-->
      </div>
    </div>
    <!--导航栏-->
    <div class="main-menu">
      <div class="navigation">
        <div class="menu-line"></div>
        <div class="menu-item" @click="mixinSendClickEvent($event, $route.fullPath, 'shouye');goUrl('/websiteHome')" @mouseleave="leave()">首页</div>
        <div class="menu-line"></div>
        <!--<div class="menu-item" @click="goUrl('/xhjs')">协会介绍</div>-->
        <!--<div class="menu-item menu-one" @mouseenter="enter()" style="height: auto" @click="goXHJS('xhjj')">-->
        <div class="menu-item menu-one" @mouseenter="enter()" style="height: auto">
          <p @click="mixinSendClickEvent($event, $route.fullPath, 'xiehuijieshao');goXHJS('xhjj')">协会介绍</p>
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
        <div class="menu-line"></div>
        <div class="menu-item menu-one" @mouseenter="enterOne()" style="height: auto">
          <p @click="mixinSendClickEvent($event, $route.fullPath, 'dangjiangongzuo');goUrl('/djgz')">党建工作</p>
          <div class="menu-two" v-if="menu_one_status"  @mouseleave="leave()">
            <ul>
              <li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'dangjiandongtai');goUrl('/newsList/partyBuildingNews')">党建动态</li>
              <li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'dangzhangdanggui');goUrl('/newsList/partyRegulations')">党章党规</li>
              <li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'xiliejianghau');goUrl('/newsList/seriesSpeech')">系列讲话</li>
            </ul>
          </div>
        </div>
        <div class="menu-line"></div>
        <div class="menu-item" @click="mixinSendClickEvent($event, $route.fullPath, 'gongzuodongtai');goUrl('/newsList/gzdt')" @mouseleave="leave()">工作动态</div>
        <div class="menu-line"></div>
        <div class="menu-item" @click="mixinSendClickEvent($event, $route.fullPath, 'xinxigonggao');goUrl('/newsList/xxgg')" @mouseleave="leave()">信息公告</div>
        <div class="menu-line"></div>
        <div class="menu-item" @click="mixinSendClickEvent($event, $route.fullPath, 'yishipeiyang');goUrl('/newsList/yspy')" @mouseleave="leave()">医师培养</div>
        <div class="menu-line"></div>
        <div class="menu-item" @click="mixinSendClickEvent($event, $route.fullPath, 'zilvweiquan');goUrl('/newsList/zlwq')" @mouseleave="leave()">自律维权</div>
        <div class="menu-line"></div>
        <div class="menu-item" @click="mixinSendClickEvent($event, $route.fullPath, 'hangyexinwen');goUrl('/newsList/hyxw')" @mouseleave="leave()">行业新闻</div>
        <div class="menu-line"></div>
        <!--<div class="menu-item" @click="goUrl('/newsList/xywy')">寻医问药</div>-->
        <!--<div class="menu-line"></div>-->
        <div class="menu-item" @click="mixinSendClickEvent($event, $route.fullPath, 'xinyigai');goUrl('/newsList/xyg')" @mouseleave="leave()">新医改</div>
        <div class="menu-line"></div>
        <!--<div class="menu-item" @click="goUrl('/sjys')" @mouseleave="leave()">十佳医师</div>-->
        <div class="menu-item menu-one" @mouseenter="enterThree()" @click="mixinSendClickEvent($event, $route.fullPath, 'shijiayishi');goUrl('/sjys')" style="height: auto">
          十佳医师
          <div class="menu-two" v-if="menu_three_status"  @mouseleave="leave()">
            <ul>
              <li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'shijiayishi-zhongyaoxiaoxi');goUrlNewClass('/sjys','zyxx','')">重要信息</li>
              <li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'shijiayishi-dahuizhaopian');goUrlNewClass('/sjys','dhzp','')">大会照片</li>
              <li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'shijiayishi-shijiayishi');goUrlNewClass('/sjys', 'sjys', '07')">十佳医师</li>
              <li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'shijiayishi-youxiuyishi');goUrlNewClass('/sjys', 'yxys', '07')">优秀医师</li>
              <li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'shijiayishi-shijianvyishi');goUrlNewClass('/sjys', 'sjnys', '07')">十佳女医师</li>
              <li class="menu-common" @click="mixinSendClickEvent($event, $route.fullPath, 'shijiayishi-shijiaqingnianyishi');goUrlNewClass('/sjys', 'sjqnys', '07')">十佳青年医师</li>
            </ul>
          </div>
        </div>
        <div class="menu-line"></div>
        <div class="menu-item" @click="mixinSendClickEvent($event, $route.fullPath, 'shaungbaifupin');goUrl('/newsList/sbfp')" @mouseleave="leave()">双百扶贫</div>
        <div class="menu-line"></div>
      </div>
    </div>
    <!--<div class="main-menu training-registration-main-menu"></div>-->
    <div class="main-single-page-con" ref="mainSingleDiv" @mouseenter="henter()">
      <div class="main-single-page">
        <router-view :key="newTime"></router-view>
      </div>
    </div>
    <!-- 右侧二维码 -->
    <right-suspension></right-suspension>
  </div>
</template>
<script type="text/javascript">
  import * as UtilsService from '../../utils/utilsService';
  export default {
    name: '',
    data() {
      return {
        menu_one_status: false,
        menu_two_status: false,
        menu_three_status: false,
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
      this.goUrl('/websiteHome');
      this.newTime = '';
    },
    methods: {
      enter() {
        // this.newTime = '';
        this.menu_two_status = true;
        this.menu_one_status = false;
        this.menu_three_status = false;
      },
      henter() {
        this.menu_one_status = false;
        this.menu_two_status = false;
        this.menu_three_status = false;
      },
      enterOne() {
        // this.newTime = '';
        this.menu_one_status = true;
        this.menu_two_status = false;
        this.menu_three_status = false;
      },
      enterThree() {
        // this.newTime = '';
        this.menu_three_status = true;
        this.menu_one_status = false;
        this.menu_two_status = false;
      },
      // 鼠标移出
      leave() {
        // this.newTime = '';
        this.menu_one_status = false;
        this.menu_two_status = false;
        this.menu_three_status = false;
      },
      // 协会简介
      goXHJS(status) {
        this.menu_two_status = false;
        // this.newTime = '';
        this.newTime = new Date().getTime();
        this.$router.push({path: '/xhjs'});
        UtilsService.setSessionStorage('XHstatus', status);
      },
      goUrl(url) {
        this.menu_one_status = false;
        this.menu_two_status = false;
        this.newTime = new Date().getTime();
        // 定位到顶部
        this.$nextTick(() => {
          this.$refs.mainSingleDiv.scrollTop = 0;
        });
        UtilsService.setSessionStorage('lastPath', url);
        this.$router.push(url);
      },
      goUrlSearch(url) {
        this.menu_one_status = false;
        this.menu_two_status = false;
        this.newTime = new Date().getTime();
        // 定位到顶部
        this.$nextTick(() => {
          this.$refs.mainSingleDiv.scrollTop = 0;
        });
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
        }
      },
      goUrlNewClass(url, param, type) {
        this.newTime = '';
        this.$router.push({path: url});
        let tempData = {'fristType': param, 'secondType': type};
        UtilsService.setSessionStorage('sjys-param', tempData);
//        if (url && param && type) {
//          this.$router.push(
//            {
//              path: url,
//              query: {
//                name: param,
//                secondname: type
//              }
//            });
//        }
      },
      goLogin() {
        this.$router.push({path: '/login'});
      }
    }
  };
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/base/fn";
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
        margin: 0 auto;
        .menu-item {
          width: 86px;
          float: left;
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
    .training-registration-main-menu {
      height: 1px !important;
      border-bottom: none;
    }
    .main-single-page-con {
      width: 100%;
      -ms-overflow-style: none;
      .single-page {
        margin: 10px;
        height: 97%;
      }
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
