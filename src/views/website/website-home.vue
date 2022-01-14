<template>
  <div id="app-home">
    <div class="main-header">
      <header-main></header-main>
    </div>
    <div class="app-content">
      <div class="news-div">
        <!--轮播图、重要消息-->
        <div class="news-first">
          <Carousel v-model="value1" loop>
            <CarouselItem>
              <img src="http://www.qinxin.cn//upload/banner/IMG_9535621205198.jpg" style="width: 100%;">
            </CarouselItem>
          </Carousel>
        </div>
        <!--对口支援、医师考定系统、继续教育学习-->
        <!--<div class="news-second">-->
          <!--<div class="btn-style btn-margin" @click="mixinSendClickEvent($event, $route.fullPath, 'shaungbaifupin');goUrl('/newsList/sbfp','sbfp')">-->
            <!--<i class="icon iconfont icon-xiehuijieshao"></i>-->
            <!--<div>双百扶贫</div>-->
          <!--</div>-->
          <!--&lt;!&ndash;<div class="btn-style btn-margin" onclick="window.open('http://dk.h-share.com/user_login.html')">&ndash;&gt;-->
          <!--<div class="btn-style btn-margin" @click="mixinSendClickEvent($event, $route.fullPath, 'yishidingkao');goUrl('/ysdk')">-->
            <!--<i class="icon iconfont icon-yishidingkao1"></i>-->
            <!--<div>医师定考专网</div>-->
          <!--</div>-->
          <!--<div class="btn-style btn-margin">-->
            <!--<i class="icon iconfont icon-jiaoyuxuexi"></i>-->
            <!--<div>继续教育学习</div>-->
          <!--</div>-->
          <!--<div class="btn-style" @click="mixinSendClickEvent($event, $route.fullPath,'xiazaizhuanlan');goUrl('/newsList/xzzl', '', 'xzzl')">-->
            <!--<i class="icon iconfont icon-xiazai"></i>-->
            <!--<div>下载专栏</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--工作动态、信息公告-->
        <div class="news-three">
          <div class="news-left-three">
            <div class="title-mark-three" @click="mixinSendClickEvent($event, $route.fullPath, 'gongzuodongtai');goUrl('/newsList/gzdt', '', 'gzdt')">
              <div class="info-three">工作动态(Dynamic work)</div>
              <div class="detail-three">更多<i  class="iconfont icon-jiantouyou"></i> </div>
            </div>
            <ul>
              <li @click="mixinSendClickEvent($event, $route.fullPath, 'gongzuodongtaixiangqing');goUrl('/newsInfo', workDynamics.id, 'gzdt')" v-for="workDynamics in workDynamicsList">
                <div class="text-info">
                  <img v-if="workDynamics.newest" style="padding-right: 5px; width: 30px;" src="../../assets/images/new.gif" alt="">
                  <i v-else class="icon iconfont icon-jiantouyou"></i>
                  <span v-html="workDynamics.newsTitle"></span>
                </div>
                <div class="date-info">{{workDynamics.createDate}}</div>
              </li>
            </ul>
          </div>
          <div class="news-right-three">
            <div class="title-mark-three" @click="mixinSendClickEvent($event, $route.fullPath, 'xinxigonggao');goUrl('/newsList/xxgg', '', 'xxgg')">
              <div class="info-three">信息公告(Information Announcement)</div>
              <div class="detail-three">更多 <i  class="iconfont icon-jiantouyou"></i> </div>
            </div>
            <ul>
              <li @click="mixinSendClickEvent($event, $route.fullPath, 'xinxigonggaoxiangqing');goUrl('/newsInfo', informationAnnouncement.id, 'xxgg')"  v-for="informationAnnouncement in informationAnnouncementList">
                <div class="text-info">
                  <img v-if="informationAnnouncement.newest" style="padding-right: 5px; width: 30px;" src="../../assets/images/new.gif" alt="">
                  <i v-else class="icon iconfont icon-jiantouyou"></i>
                  <span v-html="informationAnnouncement.newsTitle"></span>
                </div>
                <div class="date-info">{{informationAnnouncement.createDate}}</div>
              </li>
            </ul>
          </div>
        </div>
        <!--视频中心、行业新闻-->
        <div class="news-three">
          <div class="news-left-three">
            <div class="title-mark-three">
              <div class="info-three">视频中心(Video Center)</div>
              <div class="detail-three" @click="mixinSendClickEvent($event, $route.fullPath, 'shipinzhongxin');goUrl('/videoInfo')">更多<i  class="iconfont icon-jiantouyou"></i></div>
            </div>
            <div class="radio-list">
              <div class="radio-info" @click="mixinSendClickEvent($event, $route.fullPath, 'shipinzhongxinxiangqing');videoInfo(0)"  v-if="videoLists.length >= 1">
                <img :src="videoLists[0].titlePic"/>
                <i class="icon iconfont icon-bofang icon-bofang-left"></i>
              </div>
              <div class="radio-info radio-padding-left" @click="mixinSendClickEvent($event, $route.fullPath, 'shipinzhongxinxiangqing');videoInfo(1)" v-if="videoLists.length >= 2">
                <img :src="videoLists[1].titlePic"/>
                <i class="icon iconfont icon-bofang icon-bofang-right"></i>
              </div>
            </div>
          </div>
          <div class="news-right-three">
            <div class="title-mark-three"  @click="mixinSendClickEvent($event, $route.fullPath, 'hangyexinwen');goUrl('/newsList/hyxw', '', 'hyxw')">
              <div class="info-three">行业新闻(Industry News)</div>
              <div class="detail-three">更多<i  class="iconfont icon-jiantouyou"></i> </div>
            </div>
            <ul>
              <li @click="mixinSendClickEvent($event, $route.fullPath, 'hangyexinwenxiangqing');goUrl('/newsInfo', industryNews.id, 'hyxw')" v-for="industryNews in industryNewsList">
                <div class="text-info">
                  <img v-if="industryNews.newest" style="padding-right: 5px; width: 30px;" src="../../assets/images/new.gif" alt="">
                  <i v-else class="icon iconfont icon-jiantouyou"></i>
                  <span v-html="industryNews.newsTitle"></span>
                </div>
                <div class="date-info">{{industryNews.createDate}}</div>
              </li>
            </ul>
          </div>
        </div>
        <!--会员单位、专科医师分会、地方医师分会-->
        <div class="branch-link">
          <div class="branch-top">
            <div @click="mixinSendClickEvent($event, $route.fullPath, 'huiyuandanwei');queryBranchAndVip('hydw')" :class="branchType === 'hydw' ? 'common active' : 'common default'">合作单位</div>
            <div @click="mixinSendClickEvent($event, $route.fullPath, 'difangyishixiehui');queryBranchAndVip('dfysxh')" :class="branchType === 'dfysxh' ? 'common active' : 'common default'">地方医师协会</div>
            <div @click="mixinSendClickEvent($event, $route.fullPath, 'zhuankeyishifenhui');queryBranchAndVip('zkysfh')" :class="branchType === 'zkysfh' ? 'common active' : 'common default'">二级机构</div>
            <div class="branch-top-right" @click="goUrl('/categoryList', '', branchType)">更多 <i  class="iconfont icon-jiantouyou"></i></div>
          </div>
          <div class="branch-content">
            <div class="part" v-for="(item,index) in branchAndVipList" v-if="branchType === 'hydw' && index < 14">
              <a :href="item.linkUrl" style="color: black" target="_blank">
                <div class="circular">
                  <img :src="imgUrl + item.imgSrc + '.png'" style="height:100px;width: 100px; ">
                </div>
                <div class="title">
                  {{item.title}}
                </div>
              </a>
            </div>
            <div class="part" @click="mixinSendClickEvent($event, $route.fullPath, 'difangyishixiehuiliebiao');queryBranchAndVipSession('/newsList/dfysxh', item.id, 'dfysxh', item.typename)" v-for="(item,index) in branchAndVipList" v-if="branchType === 'dfysxh' && index < 14">
              <div class="circular">
                <!--<img src="../../../static/city/yantai.png" style="height:100px;width: 100px; ">-->
                <img :src="imgUrl + item.typeCode + '.png'" style="height:100px;width: 100px; ">
              </div>
              <div class="title">
                {{item.typename}}
              </div>
            </div>
            <div class="part" @click="mixinSendClickEvent($event, $route.fullPath, 'zhuankeyishifenhuiliebiao');queryBranchAndVipSession('zkysfh', item.id, 'zkysfh', item.typename)" v-for="(item,index) in branchAndVipList" v-if="branchType === 'zkysfh' && index < 14">
              <div class="circular">
                <!--<img src="../../../static/city/yantai.png" style="height:100px;width: 100px; ">-->
                <i :class="'iconfont icon-style icon-' + item.typeCode"></i>
              </div>
              <div class="title">
                {{item.typename}}
              </div>
            </div>
          </div>
        </div>
        <!--友情链接-->
        <div class="link-div">
          <div class="link-title">友情链接：</div>
          <div class="link-list">
            <div class="link-info" onclick="window.open('http://www.cmda.net/')">鑫盛公司</div>
            <div class="link-info" onclick="window.open('http://www.sph.com.cn/')">鑫能煤业</div>
            <div class="link-info" onclick="window.open('http://www.qiluhospital.com/')">鑫运煤业</div>
            <div class="link-info" onclick="window.open('http://www.sdwsjs.gov.cn/')">鑫益煤业</div>
          </div>
        </div>
      </div>
      <sn-footer></sn-footer>
    </div>
  </div>
</template>
<script type="text/javascript">
  import * as UtilsService from '../../utils/utilsService';
  import * as homeService from '../../service/homeService';
  export default{
    data() {
      return {
        menu_two_status: false,
        sign: 1,
        value1: 0,
        DH: 'all', // 地方医师协会
        ZK: '', // 专科医师分会
        HY: '', // 会员单位,
        workDynamicsList: [], // 工作动态
        informationAnnouncementList: [], // 信息公告
        industryNewsList: [], // 行业新闻
        importantNewslist: [], // 重要新闻
        CounterpartSupportList: [], // 对口支援
        roundPic: [], // 存放轮播图
        videoLists: [], // 视频中心
        firstImportantNewslist: [], // 第一条重要新闻
        branchAndVipList: [], // 地方医师协会，专科医师分会，会员中心
        branchType: 'hydw',
        imgUrl: UtilsService.STATIC_LOCALHOST + UtilsService.HOSPITAL_LOGO_PATH // 地方医师协会和会员单位图片路径
      };
    },
    created: function() {
      this.queryInformation();
      this.queryVideoType();
      this.queryBranchAndVip(this.branchType);
      // 解决第一次通过域名访问首页不轮播
      UtilsService.cleanSessionStorage('lastPath');
      UtilsService.setSessionStorage('lastPath', '/websiteHome');
    },
    watch: {
    },
    methods: {
      // 协会详情
      // 鼠标移入
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
      goUrl(url, param, type, name) {
        if (url && param && type) {
          if (name) {
            this.$router.push(
              {
                path: url,
                query: {
                  id: param,
                  type: type,
                  name: name
                }
              }
            );
          }
          else {
            this.$router.push(
              {
                path: url,
                query: {
                  id: param,
                  type: type
                }
              }
            );
          }
        }
        if (url && !param && type) {
          this.$router.push(
            {
              path: url,
              query: {
                type: type
              }
            }
          );
        }
        if (url && !param && !type) { // 医师定考轮播图
          if (url === '/ysdk') {
            UtilsService.setSessionStorage('lastPath', url);
          }
          this.$router.push(url);
        }
        if (url && param && !type) {
          this.$router.push(url);
        }
      },
      goUrlNew(url, param, type) {
        if (url && param && type) {
//          this.$router.push(
//            {
//              path: url,
//              query: {
//                name: param,
//                secondname: type
//              }
//            }
//          );
          this.$router.push({path: url});
          let tempData = {'fristType': param, 'secondType': type};
          UtilsService.setSessionStorage('sjys-param', tempData);
        }
        if (url && !param && !type) {
          this.$router.push(url);
        }
      },
      // goDKZY(index) {
      //   this.goUrl('/dkzy', '', this.CounterpartSupportList[index].typecode);
      //   // UtilsService.setSessionStorage('DKZY', this.CounterpartSupportList[index]);
      // },
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
      // 信息提示
      open(msg) {
        this.$Notice.info({
          title: '信息提示：',
          desc: msg
        });
      },

      fmtDate(obj) {
        var date = new Date(obj);
        var m = '0' + (date.getMonth() + 1);
        var d = '0' + date.getDate();
        return m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length);
      },
      // 获取所有数据
      queryInformation() {
        homeService.queryWebsiteHome().then(response => {
          if (response.code === '0') {
            this.workDynamicsList = response.list.dynamicWorkList;
            /* // 图片轮播列表
            this.roundPic = this.workDynamicsList.filter(result => result.titlePicture !== '');
            UtilsService.setSessionStorage('roundPic', this.roundPic); */
            this.informationAnnouncementList = response.list.informationAnnouncementList;
            this.industryNewsList = response.list.industryNewsList;
            this.importantNewslist = response.list.importantInfoNewsList;
            this.CounterpartSupportList = response.list.CounterpartSupportList;
            // 提出重要新闻第一条信息
            this.firstImportantNewslist = this.importantNewslist[0];
            // 去除重要新闻第一条信息
            this.importantNewslist.splice(0, 1);
          }
          else {
            this.open(response.msg);
          }
        });
      },
      // 时间戳转化时间
      timestampToTime(timestamp) {
        let date = new Date(timestamp);
        let Y = date.getFullYear() + '';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '';
        let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '';
        return Y + '-' + M + '-' + D;
      },
      // 视频中心
      queryVideoType() {
        homeService.queryVideoType('').then(response => {
          if (response.code === '0') {
            this.videoLists = response.list;
            for (let i = 0; i < this.videoLists.length; i++) {
              this.videoLists[i].createDate = this.timestampToTime(this.videoLists[i].createDate);
            }
          }
          else {
            this.open(response.msg);
          }
        });
      },
      // 点击视频中心
      videoInfo(index) {
        UtilsService.setSessionStorage('videoInfo', this.videoLists[index]);
        this.goUrl('/videoNewsInfo');
      },
      queryBranchAndVip(type) {
        this.branchType = type;
        homeService.queryBranchAndVip(type).then(response => {
          if (response.code === '0') {
            this.branchAndVipList = response.list;
          }
          else {
            this.open(response.msg);
          }
        });
      },
      queryBranchAndVipSession(url, id, type, name) {
        this.goUrl(url, id, type, name);
        UtilsService.setSessionStorage('BranchAndVipId', id);
      }
    }
  };
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/base/fn.scss";
  #app-home {
    height: 100vh;
    .main-header {
      width: 100%;
      height: 180px;
    }
    .main-header {
      width: 100%;
      height: 180px;
    }
    .iconfont {
      font-family: 'iconfont' !important;
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;
    }
    .app-content {
      overflow: hidden;
      .news-div {
        width: 1180px;
        margin: 40px auto;
        .news-first {
          width: 1180px;
          //height: 360px;
          .news-info {
            width: 580px;
            float: left;
            margin-left: 20px;
            .news-top {
              width: 100%;
              height: 162px;
              background: $grey32;
              position: relative;
              box-sizing: border-box;
              padding: 0 20px;
              .title-mark {
                width: 100%;
                height: 53px;
                font-size: 19px;
                line-height: 19px;
                font-family: "Microsoft YaHei";
                color: $blue11;
                padding-top: 22px;
                padding-bottom: 12px;
                border-bottom: 1px solid $blue11;
                .info {
                  float: left;
                  font-weight: bold;
                }
              }
              .title-msg {
                text-align: center;
                font-size: 16px;
                padding: 15px 0 10px;
                font-weight: bold;
              }
              .msg-info {
                font-size: 14px;
                .detail {
                  color: $blue11;
                  float: right;
                  cursor: pointer;
                  margin-right: 10px;
                  .iconfont {
                    color: $blue11;
                    font-size: 15px;
                  }
                }
              }
            }
            .news-bottom {
              width: 100%;
              margin-top: 10px;
              height: 190px;
              overflow: hidden;
              li {
                height: 38px;
                line-height: 33px;
                font-size: 14px;
                border-bottom: 1px solid $grey33;
                .text-info {
                  width: 90%;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
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
                  margin-right: 15px;
                }
              }
            }
          }
        }
        .news-second {
          height: 80px;
          margin-top: 30px;
          .btn-style {
            float: left;
            width: 280px;
            height: 62px;
            line-height: 62px;
            background: $grey33;
            border-radius: 5px;
            box-shadow: 0 3px 0 lightgray;
            transition: all 0.2s ease 0s;
            -webkit-transition: all 0.2s ease 0s;
            font-size: 23px;
            font-family: "Microsoft YaHei";
            color: $blue11;
            text-align: center;
            position: relative;
            overflow: hidden;
            .icon-yishidingkao1 {
              position: absolute;
              left: 30px;
              font-size: 30px;
              color: $blue11;
            }
            .icon-xiehuijieshao {
              position: absolute;
              left: 50px;
              font-size: 32px;
              color: $blue11;
            }
            .icon-jiaoyuxuexi {
              position: absolute;
              left: 30px;
              font-size: 30px;
              color: $blue11;
            }
            .icon-xiazai {
              position: absolute;
              left: 50px;
              font-size: 30px;
              color: $blue11;
            }
          }
          .btn-margin {
            margin-right: 20px;
          }
        }
        .branch-link {
          height: 310px;
          width: 1180px;
          margin: 0 auto;
          .branch-top {
            margin-top: 40px;
            color: lightgray;
            width: 1180px;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid $blue11;
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
              margin-right: 15px;
              .iconfont {
                color: $blue11;
                font-size: 15px;
              }
            }
          }
          .branch-content {
            clear: both;
            width: 100%;
            height: 280px;
            padding: 30px 0;
            .part {
              float: left;
              width: 168px;
              height: 150px;
              margin-top: 10px;
              .circular {
                margin: 0 auto;
                overflow: hidden;
                position: relative;
                width: 100px;
                height: 100px;
                border-radius: 50%;
                border: 1px solid $grey36;
                text-align: center;
                margin-bottom: 10px;
                .icon-style {
                  position: absolute;
                  left: 25px;
                  top: 10px;
                  width: 30px;
                  height: 30px;
                  color: $blue11;
                  font-size: 50px;
                }
              }
              .title {
                text-align: center;
                margin: 0 auto;
                height: 20px;
                width: 170px;
                font-size: 13px;
                cursor: pointer;
              }
            }
          }
        }
        .news-three {
          height: 310px;
          width: 1180px;
          margin: 0 auto;
          .news-left-three {
            width: 580px;
            float: left;
            height: 310px;
            position: relative;
            box-sizing: border-box;
            margin: 10px 20px 10px 0;
            margin-right: 20px;
            overflow: hidden;
            .title-mark-three {
              height: 40px;
              line-height: 40px;
              width: 100%;
              border-bottom: 1px solid $blue11;
              color: $blue11;
              .info-three {
                float: left;
                font-weight: bold;
                font-size: 19px;
              }
              .detail-three {
                font-size: 15px;
                float: right;
                cursor: pointer;
                margin-right: 15px;
                .iconfont {
                  color: $blue11;
                  font-size: 15px;
                }
              }
            }
            .radio-list {
              width: 100%;
              margin-top: 10px;
              .radio-info {
                width: 50%;
                float: left;
                text-align: center;
                img {
                  width: 100%;
                  height: 220px;
                }
                .icon-bofang-left {
                  position: absolute;
                  font-size: 60px;
                  color: $white;
                  margin-top: -158px;
                  margin-left: -30px;
                }
                .icon-bofang-right {
                  position: absolute;
                  font-size: 60px;
                  color: $white;
                  margin-top: -158px;
                  margin-left: -30px;
                }
              }
              .radio-padding-left {
                padding-left: 4%;
              }
            }
            .sjys-info {
              float: left;
              text-align: center;
              font-size: 24px;
              width: 50%;
              height: 130px;
              line-height: 130px;
            }
            .sjys-bottom-boder {
              border-bottom: solid 1px $grey30;
            }
            .sjys-left-boder {
              border-right: solid 1px $grey30;
            }
            li {
              height: 38px;
              line-height: 33px;
              font-size: 14px;
              border-bottom: 1px solid $grey33;
              .text-info {
                float: left;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                width: 80%;
                .icon-jiantouyou {
                  font-size: 14px;
                  margin-right: 10px;
                }
              }
              .date-info {
                float: right;
                margin-right: 15px;
              }
            }
          }
          .news-right-three {
            width: 580px;
            float: left;
            height: 310px;
            position: relative;
            box-sizing: border-box;
            margin: 10px 0;
            overflow: hidden;
            .title-mark-three {
              height: 40px;
              line-height: 40px;
              width: 100%;
              border-bottom: 1px solid $blue11;
              color: $blue11;
              .info-three {
                float: left;
                font-weight: bold;
                font-size: 19px;
              }
              .detail-three {
                font-size: 15px;
                float: right;
                cursor: pointer;
                margin-right: 15px;
                .iconfont {
                  color: $blue11;
                  font-size: 15px;
                }
              }
            }
            .radio-list {
              width: 100%;
              margin-top: 10px;
              .radio-info {
                width: 50%;
                float: left;
                text-align: center;
                img {
                  width: 100%;
                  height: 220px;
                }
                .icon-bofang-left {
                  position: absolute;
                  font-size: 60px;
                  color: $white;
                  margin-top: -158px;
                  margin-left: -30px;
                }
                .icon-bofang-right {
                  position: absolute;
                  font-size: 60px;
                  color: $white;
                  margin-top: -158px;
                  margin-left: -30px;
                }
              }
              .radio-padding-left {
                padding-left: 4%;
              }
            }
            .sjys-info {
              float: left;
              text-align: center;
              font-size: 24px;
              width: 50%;
              height: 130px;
              line-height: 130px;
            }
            .sjys-bottom-boder {
              border-bottom: solid 1px $grey30;
            }
            .sjys-left-boder {
              border-right: solid 1px $grey30;
            }
            li {
              height: 38px;
              line-height: 33px;
              font-size: 14px;
              border-bottom: 1px solid $grey33;
              .text-info {
                float: left;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                width: 80%;
                .icon-jiantouyou {
                  font-size: 14px;
                  margin-right: 10px;
                }
              }
              .date-info {
                float: right;
                margin-right: 15px;
              }
            }
          }
        }
        .link-div {
          overflow: hidden;
          clear: both;
          margin-top: 30px;
          border: 1px solid lightgray;
          border-radius: 6px;
          width: 1180px;
          height: 100px;
          line-height: 100px;
          font-size: 16px;
          .link-title {
            float: left;
            width: 118px;
            text-align: right;
          }
          .link-list {
            float: left;
            .link-info {
              float: left;
              font-size: 15px;
              color: $blue11;
              padding-left: 30px;
            }
          }
        }
      }
    }
  }
</style>
