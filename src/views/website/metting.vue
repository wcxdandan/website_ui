<template>
  <div id="metting" class="metting">
    <div class="header" id="header">
      <div class="top">
        <a href="http://www.sdmda.org.cn/#/websiteHome">< 返回山东省医师协会官网</a>
      </div>
    </div>
    <div class="content">
      <div class="content-left">
        <div class="con-left">
          <h5 class="title"><span>大会现场图片</span></h5>
          <div class="player"><!--轮播图-->
            <div class="banner">
              <banner-new></banner-new>
            </div>
          </div>
          <h5 class="title"><span>大会现场视频</span></h5>
          <div class="video" @click="goUrl('/newsInfo','1354','dsjhy')">
            <img src="../../assets/images/152055971.jpg" style="width: 353px;height: 235px"/>
          </div>
        </div>
        <div class="con-right">
          <h5 class="title"><span>大会现场直播</span></h5>
          <div class="con-right-txt">
            <span><h5 @click="mixinSendClickEvent($event, $route.fullPath, 'gongzuodongtai');goUrl('/newsInfo', '1358', 'dsjhy')">新任会长 孙洪军讲话</h5></span>
            <p>尊敬的各位领导、各位代表，同志们：在全党全国各族人民学习贯彻党的十八届三中、四中全会精神，国家政治、经济、社会、文化各方面改革发展取得重大成就的形势下，
              我们隆重召开山东省医师协会第三次会员代表大会，是在新形势下推动我省医师队伍建设与发展继往开来，具有重要的意义。 省卫生计生委、省民政厅的领导对这次会议
            </p>
            <span><h5 @click="mixinSendClickEvent($event, $route.fullPath, 'gongzuodongtai');goUrl('/newsInfo', '1357', 'dsjhy')">山东省卫计委医政医管处处长刘桂刚讲话</h5></span>
            <p>尊敬的陈主席、蔡会长，各位领导、各位代表： 大家下午好！今天，省医师协会第三次会员代表大会暨换届选举会议在这里隆重召开。在此，受委领导委托，
              我对会议的召开和当选的新一届领导班子表示热烈的祝贺！并通过各位代表向工作在全省医疗卫生一线的全体医务人员表示崇高的敬意！我省现有执业医师队伍近24万人，肩负着全省9
            </p>
            <span><h5 @click="mixinSendClickEvent($event, $route.fullPath, 'gongzuodongtai');goUrl('/newsInfo', '1356', 'dsjhy')">中国医师协会原副会长蔡忠军讲话</h5></span>
            <p>尊敬的陈光副主席、尊敬的各位领导、各位代表、各位医师同道:大家好!很高兴在这美好的季节来到美丽的泉城，参加山东省医师协会第三次会员代表大会。
              首先,我代表中国医师协会向大会的胜利召开表示祝贺，同时向第二届理事会刘玉芹会长和各位理事的辛勤工作表示衷心感谢！向第三届理事会孙洪军会长、各位副会长和新任理事表示热
            </p>
            <span><h5 @click="mixinSendClickEvent($event, $route.fullPath, 'gongzuodongtai');goUrl('/newsInfo', '1355', 'dsjhy')">山东省政协副主席陈光讲话</h5></span>
            <p>各位专家，各位代表：大家下午好！在这草木葱茏，百鸟争鸣的初夏时节，山东省医师协会第三次会员代表大会暨换届选举会议在这里隆重召开了。首先，
              我代表省委、省政府向大会的顺利召开表示热烈的欢迎！向新当选的孙洪军会长，各位副会长、秘书长以及奋斗在全省医疗战线上的24万医师表示诚挚的敬意！近年来，在名誉会长张运院
            </p>
          </div>
        </div>
        <div class="blank clear"></div>
        <a class="pic" href="#" target="_blank"><img src="../../assets/images/nav.jpg"/></a>
        <div class="blank"></div>
        <div class="course">
          <span class="menu" @click="mixinSendClickEvent($event, $route.fullPath, 'gongzuodongtai');goUrl('/newsList/gzdt', '', 'gzdt')">工作动态</span>
          <span class="menu" @click="mixinSendClickEvent($event, $route.fullPath, 'xinxigonggao');goUrl('/newsList/xxgg', '', 'xxgg')">信息公告</span>
          <div class="blank clear"></div>
          <span class="menu" @click="mixinSendClickEvent($event, $route.fullPath, 'yishipeiyang');goUrl('/newsList/yspy','','yspy')">医师培养</span>
          <span class="menu" @click="mixinSendClickEvent($event, $route.fullPath, 'hangyexinwen');goUrl('/newsList/hyxw', '', 'hyxw')">行业新闻</span>
          <div class="blank clear"></div>
          <span class="menu" @click="mixinSendClickEvent($event, $route.fullPath, 'zilvweiquan');goUrl('/newsList/zlwq','','zlwq')">自律维权</span>
          <span class="menu" @click="mixinSendClickEvent($event, $route.fullPath, 'shijiayishi');goUrl('/sjys')">十佳医师</span>
        </div>
      </div>
      <div class="content-right">
        <div class="mingdan" @click="goUrl('/newsInfo', '1338', 'dsjhy')"><img src="../../assets/images/imgg1.jpg"/></div>
        <div class="mingdan" @click="goUrl('/newsInfo', '1339', 'dsjhy')"><img src="../../assets/images/imgg2.jpg"/></div>
        <div class="mingdan" @click="goUrl('/newsInfo', '1340', 'dsjhy')"><img src="../../assets/images/imgg3.jpg"/></div>
        <!--<div class="mingdan"><img style="height: 2px;width: 100%"></div>-->
        <div class="box">
          <h5><span class="more" @click="goUrl('/newsList/dsjhy')">更多></span>大会现场花絮</h5>
          <span class="leader left">
            <img src="../../assets/images/151346191.jpg" @click="goUrl('/newsInfo', '1353', 'dsjhy')"/><p @click="goUrl('/newsInfo', '1353', 'dsjhy')">山东省政协副主席 陈光</p>
          </span>
          <span class="leader right">
            <img src="../../assets/images/145545501.jpg" @click="goUrl('/newsInfo', '1351', 'dsjhy')"/><p @click="goUrl('/newsInfo', '1351', 'dsjhy')">中国医师协会副会长蔡忠军</p>
          </span>
          <span class="leader left">
            <img src="../../assets/images/145423781.jpg" @click="goUrl('/newsInfo', '1350', 'dsjhy')"/><p @click="goUrl('/newsInfo', '1350', 'dsjhy')">山东省社会组织管理局管理处田甫珈处长</p>
          </span>
          <span class="leader right">
            <img src="../../assets/images/144911571.jpg" @click="goUrl('/newsInfo', '1349', 'dsjhy')"/><p @click="goUrl('/newsInfo', '1349', 'dsjhy')">山东省卫生和计划生育委员会医管处处长刘桂刚</p>
          </span>
          <span class="leader left">
            <img src="../../assets/images/144726421.jpg" @click="goUrl('/newsInfo', '1348', 'dsjhy')"/><p @click="goUrl('/newsInfo', '1348', 'dsjhy')">会长 孙洪军</p>
          </span>
          <span class="leader right">
            <img src="../../assets/images/144534641.jpg" @click="goUrl('/newsInfo', '1347', 'dsjhy')"/><p @click="goUrl('/newsInfo', '1347', 'dsjhy')">副会长兼秘书长  宋良贞</p>
          </span>
          <span class="leader left">
            <img src="../../assets/images/142619631.jpg" @click="goUrl('/newsInfo', '1346', 'dsjhy')"/><p @click="goUrl('/newsInfo', '1346', 'dsjhy')">副会长 王新生</p>
          </span>
          <span class="leader right">
            <img src="../../assets/images/142524401.jpg" @click="goUrl('/newsInfo', '1345', 'dsjhy')"/><p @click="goUrl('/newsInfo', '1345', 'dsjhy')">副会长 张福仁</p>
          </span>
        </div>
      </div>
    </div>
    <div class="clear"></div>
    <div class="footer-top">
      <div class="top-info"></div>
      <div class="top-dw">
        <h5>支持单位</h5><div class="zcdw"><div class="blank"></div></div>
      </div>
    </div>
    <div class="footer-middle"></div>
    <div class="footer-bottom">
      本网站（www.sdmda.org.cn）所刊载的山东省医师协会所有资料，包括文字、图片、软件、声音、相片、录相、图表，广告、商业信息及电子邮件的全部内容，<br/>
      除标明之外，版权归山东医师协会所有，受版权、商标和其它财产所有权法及国际条约的保护。<br/>
      © 2015-2020 All rights reserved <a href="#" target="_blank">鲁ICP备10006138号</a>Processed in 0.277 second(s), 13 queries, Memory 0.41 M
    </div>
  </div>
</template>
<script type="text/javascript">
  import * as UtilsService from '../../utils/utilsService';
  export default{
    data() {
      return {
        dataLists: [],
        leaderList: [],
        speakList: [],
        imgUrl: UtilsService.STATIC_LOCALHOST + UtilsService.HOSPITAL_LOGO_PATH,
        src: ['../../assets/images/imgg1.jpg', '../../assets/images/imgg2.jpg', '../../assets/images/imgg3.jpg']
      };
    },
    created: function() {
    },
    watch: {
    },
    methods: {
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
      fmtDate(obj) {
        var date = new Date(obj);
        var y = 1900 + date.getYear();
        var m = '0' + (date.getMonth() + 1);
        var d = '0' + date.getDate();
        return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length);
      }
    }
  };
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/base/fn.scss";
  .clear {
    margin-top: 0 !important;
    clear: both;
    // width: 1px;
  }
  .metting {
    .header {
      height: 255px;
      border-bottom: 5px solid #126052;
      background: #067361 none;
      .top {
        height: 255px;
        background: url("../../assets/images/top.jpg") no-repeat;
        a {
          display: inline-block;
          margin-left: 140px;
          margin-top: 5px;
          color: #fdf5bd;
        }
      }
    }
    .content {
      width: 990px;
      margin: 0 auto;
      margin-top: 20px;
      .content-left {
        width: 724px;
        float: left;
        .title {
          width: 353px;
          height: 20px;
          padding-left: 22px;
          background: url("../../assets/images/h5tit.jpg") repeat-x left;
          line-height: 20px;
          font-weight: normal;
          span {
            display: inline-block;
            height: 20px;
            padding: 0 20px;
            background: $white;
            color: rgb(0, 117, 99);
            font-size: 20px;
          }
        }
        .con-left {
          width: 353px;
          height: 580px;
          float: left;
          .player {
            position: relative;
            width: 353px;
            height: 260px;
            margin: 16px auto 12px;
            overflow: hidden;
            .banner {
              width: 100%;
              height: 236px;
              border: 5px solid #179c86;
            }
          }
          .video {
            width: 353px;
            margin-top: 16px;
            cursor: pointer;
            img {
              border: 5px solid #179c86;
            }
          }
        }
        .con-right {
          width: 356px;
          height: 580px;
          float: right;
          .con-right-txt {
            width: 356px;
            height: 460px;
            margin: 12px 0 10px;
            padding: 16px 12px;
            border: 1px solid #d4d0c8;
            overflow: auto;
            h5 {
              color: #126052;
              font-size: 14px;
              margin-bottom: 4px;
              cursor: pointer;
            }
            p {
              margin-bottom: 24px;
              line-height: 20px;
              color: #3b3b3b;
              font-size: 12px;
              text-indent: 2em;
            }
          }
        }
        .blank {
          height: 16px;
        }
        .pic {
          width: 100%;
          display: inline;
          img {
            vertical-align: middle;
          }
        }
        .course {
          height: 422px;
          padding: 105px 32px 15px;
          border: 1px solid #d4d0c8;
          background: url("../../assets/images/course_bg.jpg") no-repeat left top;
          .menu {
            display: inline-block;
            width: 314px;
            height: 77px;
            padding-left: 92px;
            background: url("../../assets/images/img.png") no-repeat 0 -197px;
            line-height: 72px;
            color: $grey66;
            font-size: 24px;
            font-weight: bold;
            cursor: pointer;
          }
          .menu:hover {
            color: rgb(20, 122, 105);
          }
          .bg-left {
            float: left;
          }
          .bg-right {
            float: right;
          }
        }
      }
      .content-right {
        width: 253px;
        float: right;
        .blank2 {
          height: 12px;
        }
        .mingdan {
          height: 52px;
          margin-bottom: 12px;
        }
        .box {
          height: 548px;
          padding: 10px 8px;
          border: 1px solid #d4d0c8;
          background: #eaf2e5;
          h5 {
            margin-bottom: 12px;
            font-size: 20px;
            line-height: 20px;
            color: #126052;
            font-weight: normal;
            span {
              float: right;
              font-size: 12px;
              color: $grey66;
            }
            span:hover {
              color: #f00;
            }
          }
          .leader {
            width: 111px;
            height: 125px;
            margin-top: 5px;
            span {
              display: inline-block;
              color: $grey66;
            }
            img {
              width: 109px;
              height: 70px;
              cursor: pointer;
            }
            p {
              padding-top: 5px;
              line-height: 16px;
              text-align: center;
              cursor: pointer;
            }
            p:hover {
              text-decoration: underline;
            }
          }
          .left {
            float: left;
          }
          .right {
            float: right;
          }
        }
      }
    }
    .footer-top {
      border-top: 4px solid #024237;
      margin-top: 32px;
      background: url("../../assets/images/qlink_bg.jpg") no-repeat top center #126052;
      .top-info {
        width: 990px;
        height: 82px;
        margin: auto;
      }
      .top-dw {
        width: 986px;
        margin: auto;
        padding: 0 34px;
        h5 {
          color: $white;
          font-size: 14px;
          margin-bottom: 26px;
        }
        .zcdw {
          .blank {
            height: 16px;
          }
        }
      }
    }
    .footer-middle {
      height: 160px;
      background: url("../../assets/images/qlink_bg2.jpg") no-repeat bottom center #126052;
    }
    .footer-bottom {
      padding: 38px;
      background-color: #064b3f;
      color: #f7ebc6;
      text-align: center;
    }
  }
</style>

