<template>
  <div id="news-info">
    <div class="main-header">
      <sn-main></sn-main>
    </div>
    <div class="content">
      <div class="menu-crumbs-info">
        <label class="empty-block">&nbsp;</label>
        <label @click="mixinSendClickEvent($event, $route.fullPath, 'shouye');goUrl('/websiteHome')">首页<i  class="iconfont icon-jiantouyou"></i></label>
        <label v-if="$route.query.type === 'partyBuildingNews' || $route.query.type === 'partyRegulations' || $route.query.type === 'seriesSpeech' " @click="mixinSendClickEvent($event, $route.fullPath, 'dangjiangongzuo');goUrl('/djgz', '', 'gjgz')">党建工作 <i  class="iconfont icon-jiantouyou"></i></label>
        <label v-if="$route.query.type === 'partyBuildingNews'" @click="mixinSendClickEvent($event, $route.fullPath, 'dangjiandongtai');goUrl('/newsList/partyBuildingNews', '', 'partyBuildingNews')">党建动态</label>
        <label v-if="$route.query.type === 'partyRegulations'" @click="mixinSendClickEvent($event, $route.fullPath, 'dangzhangdanggui');goUrl('/newsList/partyRegulations', '', 'partyRegulations')">党章党规</label>
        <label v-if="$route.query.type === 'seriesSpeech'" @click="mixinSendClickEvent($event, $route.fullPath, 'xiliejianghua');goUrl('/newsList/seriesSpeech', '', 'seriesSpeech')">系列讲话</label>
        <label v-if="$route.query.type === 'policyInterpretation' || $route.query.type === 'noticeAnnouncement' || $route.query.type === 'downloadColumn' " @click="mixinSendClickEvent($event, $route.fullPath, 'dangjiangongzuo');goUrl('/ysdk', '', '')">医师定考 <i  class="iconfont icon-jiantouyou"></i></label>
        <label v-if="$route.query.type === 'policyInterpretation'" @click="mixinSendClickEvent($event, $route.fullPath, 'zhengcejiedu');goUrl('/newsList/policyInterpretation', '', 'policyInterpretation')">政策解读</label>
        <label v-if="$route.query.type === 'noticeAnnouncement'" @click="mixinSendClickEvent($event, $route.fullPath, 'tongzhigonggao');goUrl('/newsList/noticeAnnouncement', '', 'noticeAnnouncement')">通知公告</label>
        <label v-if="$route.query.type === 'downloadColumn'" @click="mixinSendClickEvent($event, $route.fullPath, 'xiazaizhaunlan');goUrl('/newsList/downloadColumn', '', 'downloadColumn')">下载专栏</label>
        <label v-if="$route.query.type === 'gzdt'" @click="mixinSendClickEvent($event, $route.fullPath, 'gongzuodongtai');goUrl('/newsList/gzdt', '', 'gzdt')">工作动态</label>
        <label v-if="$route.query.type === 'xzzl'" @click="mixinSendClickEvent($event, $route.fullPath, 'jiaoyuxuexi');goUrl('/newsList/xzzl', '', 'xzzl')">下载专栏</label>
        <label v-if="$route.query.type === 'xxgg'" @click="mixinSendClickEvent($event, $route.fullPath, 'xinxigonggao');goUrl('/newsList/xxgg', '', 'xxgg')">信息公告</label>
        <label v-if="$route.query.type === 'hyxw'" @click="mixinSendClickEvent($event, $route.fullPath, 'hangyexinwen');goUrl('/newsList/hyxw', '', 'hyxw')">行业新闻</label>
        <label v-if="$route.query.type === 'dkzy'" @click="mixinSendClickEvent($event, $route.fullPath, 'duikouzhiyuan');goUrl('/newsList/dkzy', '', 'dkzy')">对口支援</label>
        <label v-if="$route.query.type === 'yspy'" @click="mixinSendClickEvent($event, $route.fullPath, 'yishipeiyang');goUrl('/newsList/yspy', '', 'yspy')">医师培养</label>
        <label v-if="$route.query.type === 'zlwq'" @click="mixinSendClickEvent($event, $route.fullPath, 'zilvweiquan');goUrl('/newsList/zlwq', '', 'zlwq')">自律维权</label>
        <label v-if="$route.query.type === 'xyg'" @click="mixinSendClickEvent($event, $route.fullPath, 'xinyigai');goUrl('/newsList/xyg', '', 'xyg')">新医改</label>
        <label v-if="$route.query.type === 'sbfp'" @click="mixinSendClickEvent($event, $route.fullPath, 'xinyigai');goUrl('/newsList/sbfp', '', 'sbfp')">双百扶贫</label>
        <label v-if="$route.query.type === 'zyxx'">重要消息</label>
        <label v-if="$route.query.type === 'dfysxh'" @click="mixinSendClickEvent($event, $route.fullPath, 'difangyishixiehui');goUrl('/categoryList', '', 'dfysxh')">地方医师协会 ></label>
        <label v-if="$route.query.type === 'zkysfh'" @click="mixinSendClickEvent($event, $route.fullPath, 'zhuankeyishifenhui');goUrl('/categoryList', '', 'zkysfh')">二级机构 ></label>
        <template v-if="$route.query.name !== undefined">
          <label v-if="$route.query.type ==='zkysfh' "
                 @click="goUrl('/zkysfh', BranchAndVipId,$route.query.type, $route.query.name)" >{{$route.query.name}}</label>
          <label v-if="$route.query.type ==='dfysxh' "
                 @click="goUrl('/newsList/dfysxh', BranchAndVipId,$route.query.type, $route.query.name)" >{{$route.query.name}}</label>
        </template>
        <label v-if="$route.query.type === 'dsjhy'">第三次会员代表大会</label>
      </div>
      <div class="news-detail" v-if="detailedList.length > 0">
        <div class="news-title" v-if="$route.query.type === 'partyBuildingNews' || $route.query.type === 'partyRegulations' || $route.query.type === 'seriesSpeech' " v-html="detailedList[0].title"></div>
        <div class="news-title"  v-else-if="$route.query.type === 'policyInterpretation' || $route.query.type === 'noticeAnnouncement' || $route.query.type === 'downloadColumn' " v-html="detailedList[0].title"></div>
        <div class="news-title" v-else v-html="detailedList[0].newsTitle"></div>
        <div class="news-date">发布日期：{{detailedList[0].createDate}}&nbsp;&nbsp;&nbsp;&nbsp;浏览次数：{{detailedList[0].browseNumber}}</div>
        <div class="news-content" v-html="detailedList[0].newsContent"></div>
        <div style="font-size: 16px;margin-right: 20px;text-indent: 20px;" v-if="$route.query.type ==='xzzl'">
          <a :href="detailedList[0].titlePicture" target="_blank" download>{{detailedList[0].fileName}}</a><br/>
        </div>
        <div class="news-bottom" v-if="Lists.length > 0">
          <a v-if="currentIndex !== 0" @click="mixinSendClickEvent($event, $route.fullPath, 'wenzhangshangyipian');lastInfo(currentIndex - 1)">
            <div>
              <span>上一篇：</span>
              <span v-if="$route.query.type === 'dfysxh' || $route.query.type === 'zkysfh'|| $route.query.type === 'partyBuildingNews' || $route.query.type === 'partyRegulations' || $route.query.type === 'seriesSpeech' ">{{Lists[currentIndex - 1].title}}</span>
              <span v-else>{{Lists[currentIndex - 1].newsTitle}}</span>
            </div>
          </a>
          <a v-if="currentIndex !== Lists.length-1" @click="mixinSendClickEvent($event, $route.fullPath, 'wenzhangxiayipian');nextInfo(currentIndex + 1)">
            <div>
              <span>下一篇：</span>
              <span v-if="$route.query.type === 'dfysxh' || $route.query.type === 'zkysfh' || $route.query.type === 'partyBuildingNews' || $route.query.type === 'partyRegulations' || $route.query.type === 'seriesSpeech' ">{{Lists[currentIndex + 1].title}}</span>
              <span v-else>{{Lists[currentIndex + 1].newsTitle}}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
    <!-- 右侧二维码 -->
    <!--<right-suspension></right-suspension>-->
    <sn-footer></sn-footer>
  </div>
</template>
<script type="text/javascript">
  import * as homeService from '../../service/homeService';
  import * as UtilsService from '../../utils/utilsService';
  export default{
    data() {
      return {
        openLayer: true,
        detailedList: [], // 详细内容
        BranchAndVipId: '',
        currentIndex: [], // 当前索引
        Lists: [],
        id: '',
        newsType: ''
      };
    },
    watch: {
    },
    methods: {
     /*  goUrl(url) {
        this.$router.push(url);
      }, */
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
      // 获取信息
      detailedInformation(id) {
        this.detailedList = [];
        if (this.$route.query.type === 'dfysxh' || this.$route.query.type === 'zkysfh') {
          homeService.queryBranchAndVipDetailById(id).then(response => {
            if (response.code === '0') {
              this.detailedList = response.list;
              this.BranchAndVipId = UtilsService.getSessionStorage('BranchAndVipId');
            }
            else {
              this.open(response.msg);
              return;
            }
          });
        }
        else if (this.$route.query.type !== 'dfysxh' || this.$route.query.type !== 'zkysfh') {
          if (this.$route.query.type === 'policyInterpretation' || this.$route.query.type === 'noticeAnnouncement' || this.$route.query.type === 'downloadColumn') {
            homeService.getPartyPage(id).then(response => {
              if (response.code === '0') {
                this.detailedList = response.list;
                for (let i = 0; i < this.detailedList.length; i++) {
                  this.detailedList[i].createDate = this.timestampToTime(this.detailedList[i].createDate);
                }
              }
              else {
                this.open(response.msg);
                return;
              }
            });
          }
          else if (this.$route.query.type === 'partyBuildingNews' || this.$route.query.type === 'partyRegulations' || this.$route.query.type === 'seriesSpeech') {
            homeService.getPartyPage(id).then(response => {
              if (response.code === '0') {
                this.detailedList = response.list;
                for (let i = 0; i < this.detailedList.length; i++) {
                  this.detailedList[i].createDate = this.timestampToTime(this.detailedList[i].createDate);
                }
              }
              else {
                this.open(response.msg);
                return;
              }
            });
          }
          else {
            homeService.detailedInformation(id).then(response => {
              if (response.code === '0') {
                this.detailedList = response.list;
                for (let i = 0; i < this.detailedList.length; i++) {
                  this.detailedList[i].createDate = this.timestampToTime(this.detailedList[i].createDate);
                }
              }
              else {
                this.open(response.msg);
                return;
              }
            });
          }
        }
      },
      // 时间戳转化时间
      timestampToTime(timestamp) {
        let date = new Date(timestamp * 1000);
        let Y = date.getFullYear() + '';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '';
        let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '';
        return Y + '-' + M + '-' + D;
      },
     /* // 上一篇下一篇信息
      lastAndNext() {
        this.currentIndex = UtilsService.getSessionStorage('index');
        this.Lists = UtilsService.getSessionStorage('list');
      }, */
      // 点击上一篇
      lastInfo(index) {
        this.id = this.Lists[index].id;
        this.currentIndex = this.currentIndex - 1;
        this.detailedInformation(this.id);
//        var top = document.body.scrollTop || document.documentElement.scrollTop;
//        scrollBy(0, -top);
      },
      // 下一篇
      nextInfo(index) {
        this.id = this.Lists[index].id;
        this.currentIndex = this.currentIndex + 1;
        this.detailedInformation(this.id);
//        document.body.scrollTop = 100;
//        document.documentElement.scrollTop = 100;
//        window.pageYOffset = 100;
        var top = document.body.scrollTop || document.documentElement.scrollTop;
        scrollBy(0, -top);
      },
      // 获取上级菜单列表
      getLists() {
        // this.newsType = this.$route.params.type;
        let tempData = UtilsService.getSessionStorage('list_' + this.newsType);
        if (tempData === null) {
          if (this.newsType === 'partyBuildingNews' || this.newsType === 'partyRegulations' || this.newsType === 'seriesSpeech') {
            homeService.getParty(this.newsType, 'partyBuildingWork', '').then(response => {
              if (response.code === '0') {
                for (let i = 0; i < response.list.length; i++) {
                  if (response.list[i].isReleaseInfo === '已发布') {
                    response.list[i].createDate = this.timestampToTime(response.list[i].createDate);
                    this.Lists.push(response.list[i]);
                  }
                }
                for (let i = 0; i < this.Lists.length; i++) {
                  if (this.id === this.Lists[i].id) {
                    this.currentIndex = i;
                  }
                }
              }
              else {
                this.open(response.msg);
              }
            });
          }
          else if (this.newsType !== 'dfysxh' || this.newsType !== 'zkysfh') {
            homeService.openMore(this.newsType).then(response => {
              if (response.code === '0') {
                this.Lists = response.list;
                for (let i = 0; i < this.Lists.length; i++) {
                  if (this.id === this.Lists[i].id) {
                    this.currentIndex = i;
                  }
                }
              }
              else {
                this.open(response.msg);
              }
            });
          }
        }
        else {
          this.Lists = tempData;
          for (let i = 0; i < this.Lists.length; i++) {
            if (this.id === this.Lists[i].id) {
              this.currentIndex = i;
            }
          }
        }
      }
    },
    created: function(type) {
      this.id = this.$route.query.id;
      this.newsType = this.$route.query.type;
      this.detailedInformation(this.id);
      this.getLists();
    }
  };
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/base/fn.scss";
  #news-info {
    /* height: 100vh; */
    .main-header {
      width: 100%;
      height: 180px;
    }
    .content {
      width: 1180px;
      padding: 0 20px;
      margin: 24px auto 258px;
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
          text-indent: 20px;
          img {
            max-width: 100%;
            height: auto;
          }
          .content-info {
            margin-top: 20px;
          }
          .center-text {
            text-align: center;
          }
        }
        .news-bottom {
          margin-top: 20px;
          font-size: 14px;
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

