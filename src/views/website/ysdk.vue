<template>
  <div id="app-home">
    <div class="main-header">
      <sn-main></sn-main>
    </div>
    <div class="app-content">
      <div class="news-div">
        <!--轮播图、党建动态-->
        <div class="news-first  ">
          <div class="news-img">
            <banner class="hospital-btn-banner"></banner>
          </div>
          <div class="news-info">
            <div class="news-three">
            <div class="news-left-three">
              <div class="title-mark-three" @click="mixinSendClickEvent($event, $route.fullPath, 'dangjiandongtai');goUrl('/newsList/noticeAnnouncement', '', 'noticeAnnouncement')">
                <div class="info-three">通知公告</div>
                <div class="detail-three">更多 <i  class="iconfont icon-jiantouyou"></i> </div>
              </div>
              <ul>
                <li @click="mixinSendClickEvent($event, $route.fullPath, 'dangjiandongtaixiangqing');goUrl('/newsInfo', workDynamics.id, 'noticeAnnouncement')" v-for="workDynamics in partyBuildingDynamicList">
                  <div class="text-info">
                    <img v-if="workDynamics.newest" style="padding-right: 5px; width: 30px;" src="../../assets/images/new.gif" alt="">
                    <i class="icon iconfont icon-jiantouyou" v-else></i>
                    <span v-html="workDynamics.title"></span>
                  </div>
                  <div class="date-info">{{workDynamics.createDate}}</div>
                </li>
              </ul>
            </div>
          </div>
          </div>
        </div>
        <!--党章党规、系列讲话-->
        <div class="news-three">
          <div class="news-left-three">
            <div class="title-mark-three" @click="mixinSendClickEvent($event, $route.fullPath, 'dongguidangzhang');goUrl('/newsList/policyInterpretation', '', 'policyInterpretation')">
              <div class="info-three">政策解读</div>
              <div class="detail-three">更多 <i  class="iconfont icon-jiantouyou"></i> </div>
            </div>
            <ul>
              <li @click="mixinSendClickEvent($event, $route.fullPath, 'dongguidangzhangxiangqing');goUrl('/newsInfo', workDynamics.id, 'policyInterpretation')" v-for="workDynamics in partyConstitution">
                <div class="text-info">
                  <img v-if="workDynamics.newest" style="padding-right: 5px; width: 30px;" src="../../assets/images/new.gif" alt="">
                  <i class="icon iconfont icon-jiantouyou" v-else></i>
                  <span v-html="workDynamics.title"></span>
                </div>
                <div class="date-info">{{workDynamics.createDate}}</div>
              </li>
            </ul>
          </div>
          <div class="news-right-three">
            <div class="title-mark-three" @click="mixinSendClickEvent($event, $route.fullPath, 'xiliejianghau');goUrl('/newsList/downloadColumn', '', 'downloadColumn')">
              <div class="info-three">下载专栏</div>
              <div class="detail-three">更多 <i  class="iconfont icon-jiantouyou"></i> </div>
            </div>
            <ul>
              <li @click="mixinSendClickEvent($event, $route.fullPath, 'xiliejianghauxiangqing');goUrl('/newsInfo', informationAnnouncement.id, 'downloadColumn')"  v-for="informationAnnouncement in seriesOfSpeech">
                <div class="text-info">
                  <img v-if="informationAnnouncement.newest" style="padding-right: 5px; width: 30px;" src="../../assets/images/new.gif" alt="">
                  <i class="icon iconfont icon-jiantouyou" v-else></i>
                  <span v-html="informationAnnouncement.title"></span>
                </div>
                <div class="date-info">{{informationAnnouncement.createDate}}</div>
              </li>
            </ul>
          </div>
        </div>
        <!--&lt;!&ndash;党员&ndash;&gt;-->
        <!--<div class="link-div">-->
          <!--<div class="link-title">党员：</div>-->
          <!--<div class="link-list">-->
            <!--<div class="link-info" >xxx</div>-->
            <!--<div class="link-info" >xxx</div>-->
            <!--<div class="link-info" >xxx</div>-->
            <!--<div class="link-info" >xxx</div>-->
            <!--<div class="link-info" >xxx</div>-->
            <!--<div class="link-info" >xxx</div>-->
          <!--</div>-->
        <!--</div>-->
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
        roundPic: [], // 存放轮播图
        partyBuildingDynamicList: [], // 党建动态
        partyConstitution: [], // 党章党规
        seriesOfSpeech: [] // 系列讲话
      };
    },
    created: function() {
      this.queryInformation();
    },
    watch: {
    },
    methods: {
      // 跳转详情
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
        if (url && !param && !type) {
          this.$router.push(url);
        }
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
        var y = 1900 + date.getYear();
        var m = '0' + (date.getMonth() + 1);
        var d = '0' + date.getDate();
        return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length);
      },
      // 获取所有数据
      queryInformation() {
        // noticeAnnouncement 通知公告
        homeService.getParty('noticeAnnouncement', 'doctorExamination', '').then(response => {
          if (response.code === '0') {
            for (let i = 0; i < response.list.length; i++) {
              if (response.list[i].isReleaseInfo === '已发布') {
                response.list[i].createDate = this.fmtDate(response.list[i].createDate * 1000);
                this.partyBuildingDynamicList.push(response.list[i]);
              }
            }
          }
          else {
            this.open(response.msg);
          }
        });
        // policyInterpretation 政策解读
        homeService.getParty('policyInterpretation', 'doctorExamination', '').then(response => {
          if (response.code === '0') {
            for (let i = 0; i < response.list.length; i++) {
              if (response.list[i].isReleaseInfo === '已发布') {
                response.list[i].createDate = this.fmtDate(response.list[i].createDate * 1000);
                this.partyConstitution.push(response.list[i]);
              }
            }
          }
          else {
            this.open(response.msg);
          }
        });
        // downloadColumn 下载专栏
        homeService.getParty('downloadColumn', 'doctorExamination', '').then(response => {
          if (response.code === '0') {
            for (let i = 0; i < response.list.length; i++) {
              if (response.list[i].isReleaseInfo === '已发布') {
                response.list[i].createDate = this.fmtDate(response.list[i].createDate * 1000);
                this.seriesOfSpeech.push(response.list[i]);
              }
            }
          }
          else {
            this.open(response.msg);
          }
        });
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
          height: 360px;
          .news-img {
            width: 580px;
            height: 360px;
            float: left;
            img {
              width: 100%;
              height: 360px;
            }
          }
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
                }
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
                width: 75%;
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
            width: 1060px;
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

