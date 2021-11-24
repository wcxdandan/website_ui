<template>
  <div id="sjyx-main">
    <sn-main></sn-main>
    <div class="sjyx-content">
      <div class="menu-crumbs-info">
        <label class="empty-block">&nbsp;</label>
        <label @click="mixinSendClickEvent($event, $route.fullPath, 'shouye');goUrl('/websiteHome')">首页<i  class="iconfont icon-jiantouyou"></i></label>
        <label>对口支援</label>
      </div>
      <div class="left-menu">
        <div class="total-title">
          <i class="icon iconfont icon-zizhuyuyue"></i>
          对口支援
        </div>
        <div :class="fristType === 'wmys' ? 'title-text-sel' : 'title-text'" @click="mixinSendClickEvent($event, $route.fullPath, 'duikouzhiyuan-wanmingyishi');getDKZY('wmys')">
          万名医师支援<br>农村卫生工程
          <!--<div class="block"></div>-->
        </div>
        <div :class="fristType === 'wsqj' ? 'title-text-sel' : 'title-text'" @click="mixinSendClickEvent($event, $route.fullPath, 'duikouzhiyuan-weishengqiangji');getDKZY('wsqj')"
             style="line-height: 40px">
          卫生强基工程
          <!--<div class="block"></div>-->
        </div>
        <div :class="fristType === 'xjyy' ? 'title-text-sel' : 'title-text'" @click="mixinSendClickEvent($event, $route.fullPath, 'duikouzhiyuan-xianjiyiyuan');getDKZY('xjyy')">
          县级医院骨干<br>医师培训
          <!--<div class="block"></div>-->
        </div>
        <div :class="fristType === 'sjsn' ? 'title-text-sel' : 'title-text'" @click="mixinSendClickEvent($event, $route.fullPath, 'duikouzhiyuan-shengjishengnei');getDKZY('sjsn')">
          省际、省内东<br>西部对口支援
          <!--<div class="block"></div>-->
        </div>
        <div class="total-title">
          <i class="icon iconfont icon-renshixitong"></i>
          城乡卫生系统
        </div>
        <div class="pic">
          <img src="../../assets/images/cxyy.jpg" onclick="window.open('http://wmys.wsb001.cn/account/logon')" alt="">
        </div>
        <div class="pic">
          <img src="../../assets/images/xjyy.jpg" onclick="window.open('http://ggys.wsb001.cn/Organ/Account/Logon')"
               alt="">
        </div>
        <div class="pic">
          <img src="../../assets/images/dxbd.jpg" onclick="window.open('http://dxb.wsb001.cn/account/logon')" alt="">
        </div>
        <div class="total-title">
          <i class="icon iconfont icon-zonghe"></i>
          省卫生系统
        </div>
        <div class="pic">
          <img src="../../assets/images/sdsy.jpg" onclick="window.open('http://60.216.53.103:2026/')" alt="">
        </div>
      </div>
      <div class="right-context">
        <div class="sjys">
          <!-- 列表面包屑 -->
          <div v-if="showList">
            <div class="sjys-header" v-if="fristType === 'wmys'">万名医师支援农村卫生工程</div>
            <div class="sjys-header" v-if="fristType === 'wsqj'">卫生强基工程</div>
            <div class="sjys-header" v-if="fristType === 'xjyy'">县级医院骨干医师培训</div>
            <div class="sjys-header" v-if="fristType === 'sjsn'">省际、省内东西部对口支援</div>
          </div>
          <!-- 详情面包屑 -->
          <div v-if="showList">
            <div @click="showCont">
              <div class="news-list-table" @click="mixinSendClickEvent($event, $route.fullPath, 'duikouzhiyuanxiangqing');getDKZYInfo(index,item.id)" v-for="(item,index) in displayData">
                <div :class="index % 2 === 0 ? 'table-line blue-bgc':'table-line'">
                  <div class="text-info" v-html="item.title"></div>
                  <div class="date-info">{{item.createDate}}</div>
                </div>
              </div>
            </div>
            <div class="paging-div">
              <Page :total="dataCount" :page-size="pageSize" show-total class="paging" :transfer="true"
                    @on-change="changepage"></Page>
            </div>
          </div>
          <div v-else>
            <div class="dkzy-detail" v-if="dkzyInfoLists.length > 0">
              <div class="dkzy-title" v-html="dkzyInfoLists[0].title"></div>
              <div class="dkzy-date">发布日期：{{dkzyInfoLists[0].createDate}}&nbsp;&nbsp;&nbsp;&nbsp;浏览次数：{{dkzyInfoLists[0].browseNumber+1}}</div>
              <div class="dkzy-content" v-html="dkzyInfoLists[0].content"></div>
              <div class="dkzy-bottom">
                <div v-if="currentIndex !== 0 && dkzyLists.length > 0"
                     @click="mixinSendClickEvent($event, $route.fullPath, 'duikouzhiyuanshangyipian');getDKZYInfo(currentIndex - 1,dkzyLists[currentIndex - 1].id)">上一篇：<span
                  v-html="dkzyLists[currentIndex - 1].title"></span></div>
                <div v-if="currentIndex + 1 !== dkzyLists.length && dkzyLists.length > 0"
                     @click="mixinSendClickEvent($event, $route.fullPath, 'duikouzhiyuanxiayipian');getDKZYInfo(currentIndex + 1,dkzyLists[currentIndex + 1].id)">下一篇：<span
                  v-html="dkzyLists[currentIndex + 1].title"></span></div>
              </div>
            </div>
          </div>
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
  import * as associationIntroduceService from '../../service/associationIntroduceService';
  import * as UtilsService from '../../utils/utilsService';

  export default {
    data() {
      return {
        fristType: 'wmys', // 一层菜单选中
        isBack: false,  // 返回控制
        showList: true,
        dkzyLists: [], // 对口支援信息
        dkzyInfoLists: [], // 对口支援详细信息
        pageSize: 15, //  每页显示条数
        displayData: [], // 展示数据
        dataCount: 0,
        currentIndex: 0, // 当前索引
        sessionList: [],
        DKZYId: ''
      };
    },
    methods: {
      /*  formatText() {
         switch (this.secondType) {
           case '07':
             return '第七届';
           case '06':
             return '第六届';
           case '05':
             return '第五届';
           case '04':
             return '第四届';
           case '03':
             return '第三届';
           case '02':
             return '第二届';
           case '01':
             return '第一届';
         }
       }, */
      showCont() {
        this.showList = !this.showList;
        this.isBack = this.showList === false;
      },
      alertMsg(msg) {
        this.$Notice.info({
          title: '信息提示：',
          desc: msg
        });
      },
      goUrl(url) {
        this.isBack = false;
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
      // 信息提示
      open(msg) {
        this.$Notice.info({
          title: '信息提示：',
          desc: msg
        });
      },
      // 获取对口支援各个分类的信息
      getDKZY(type) {
        this.fristType = type;
        this.showList = true;
        homeService.getDKZY(this.fristType).then(response => {
          if (response.code === '0') {
            this.dkzyLists = response.list;
            for (let i = 0; i < this.dkzyLists.length; i++) {
              this.dkzyLists[i].createDate = this.fmtDate(this.dkzyLists[i].createDate * 1000);
            }
            this.page();
          }
          else {
            this.open(response.msg);
          }
        });
      },
      fmtDate(obj) {
        var date = new Date(obj);
        var y = 1900 + date.getYear();
        var m = '0' + (date.getMonth() + 1);
        var d = '0' + date.getDate();
        return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length);
      },
      // 获取具体内容
      getDKZYInfo(index, id) {
        this.currentIndex = index;
        this.DKZYId = id;
        associationIntroduceService.homePage(this.DKZYId).then(response => {
          if (response.code === '0') {
            this.dkzyInfoLists = response.list;
            for (let i = 0; i < this.dkzyInfoLists.length; i++) {
              this.dkzyInfoLists[i].createDate = this.fmtDate(this.dkzyInfoLists[i].createDate * 1000);
            }
          }
          else {
            this.open(response.msg);
          }
        });
      },
      // 分页显示
      page() {
        this.dataCount = this.dkzyLists.length;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if (this.dkzyLists.length < this.pageSize) {
          this.displayData = this.dkzyLists;
        }
        else {
          this.displayData = this.dkzyLists.slice(0, this.pageSize);
        }
      },
      // 上一页
      changepage(index) {
        var _start = (index - 1) * this.pageSize;
        var _end = index * this.pageSize;
        this.displayData = this.dkzyLists.slice(_start, _end);
      }
    },
    beforeRouteLeave(to, from, next) {
      let lastPath = UtilsService.getSessionStorage('lastPath');
      if (lastPath === '/dkzy') {
        if (this.isBack) {
          this.showList = true;
          this.isBack = false;
          this.getDKZY(this.fristType);
          next(false);
        }
        else {
          next();
        }
      }
      else {
        next();
      }
    },
    created: function() {
      if (this.$route.query.type === undefined) {
        this.getDKZY('wmys');
      }
      else {
        this.fristType = this.$route.query.type;
        this.DKZYId = this.$route.query.id;
        for (let i = 0; i < this.dkzyLists.length; i++) {
          if (this.DKZYId === this.dkzyLists.id) {
            this.currentIndex = i;
          }
        }
        this.showCont();
        this.getDKZYInfo(this.currentIndex, this.DKZYId);
      }
    }
  };
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/base/fn.scss";
  #sjyx-main {
    .sjyx-content {
      width: 1180px;
      margin: 0 auto;
      overflow: hidden;
      margin-top: 40px;
      margin-bottom: 40px;
      height: auto;
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
      .left-menu {
        float: left;
        margin-top: 20px;
        width: 210px;
        // height: 600px;
        border-right: 1px solid $grey32;
        padding-right: 20px;
        .total-title {
          font-size: 20px;
          font-weight: bold;
          color: $blue11;
          margin-bottom: 15px;
          .icon-zizhuyuyue {
            font-size: 25px;
          }
          .icon-zonghe {
            font-size: 25px;
          }
          .icon-renshixitong {
            font-size: 26px;
          }
        }
        .title-text {
          font-size: 16px;
          color: $blue11;
          margin-bottom: 20px;
          text-align: center;
          height: 50px;
          line-height: 20px;
          padding: 5px 0;
          background-color: $grey38;
          border-radius: 5px;
        }
        .title-text-sel {
          font-size: 16px;
          color: $grey38;
          margin-bottom: 20px;
          text-align: center;
          height: 50px;
          line-height: 20px;
          padding: 5px 0;
          background-color: $blue11;
          border-radius: 5px;
        }
        .pic {
          height: 50px;
          margin-bottom: 20px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .right-context {
        width: 950px;
        float: left;
        margin-left: 20px;
        .menu-header {
          font-size: 16px;
          color: $grey72;
        }
        .sjys {
          .sjys-header {
            font-size: 30px;
            color: $grey72;
            margin-bottom: 30px;
          }
          .paging-div {
            text-align: right;
            margin-top: 20px;
            font-size: 16px;
            color: $blue11;
            .paging-input {
              width: 30px;
              height: 20px;
            }
          }
          .news-list-table {
            width: 100%;
            font-size: 16px;
            .table-line {
              height: 40px;
              line-height: 40px;
              padding: 0 10px;
              .text-info {
                float: left;
                width: 754px;
                height: 40px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              .date-info {
                float: right;
              }
            }
            .blue-bgc {
              background-color: $grey32;
            }
          }
          .sjys-titles {
            font-size: 34px;
            text-align: center;
            color: $grey71;
            padding: 25px 10px;
            border-bottom: solid 1px $grey37;
          }
          .sjys-info {
            text-align: left;
            padding: 4px 10px;
            margin-bottom: 25px;
            border-bottom: solid 1px $grey37;
            color: $grey69;
            font-family: Verdana, Arial, Helvetica, sans-serif;
            font-size: 12px;
            line-height: 18px;
          }
          .ldjs-content {
            font-size: 24px;
            margin-top: 20px;
            margin-bottom: 10px;
          }
          .ldjs-text {
            margin-top: 5px;
            font-size: 16px;
            text-align: justify;
          }
          .lsh-title {
            width: auto;
            height: 30px;
            font-size: 20px;
            font-weight: bold;
            margin-top: 20px;
          }
          .name-list {
            width: auto;
            min-height: 50px;
            .lsh-left-text {
              margin-top: 20px;
              float: left;
              font-size: 18px;
              font-weight: bold;
            }
            .lsh-text {
              width: 70px;
              float: left;
              font-size: 16px;
              text-align: justify;
              margin-top: 20px;
            }
          }
        }
        .dkzy-detail {
          margin-top: 30px;
          .dkzy-title {
            font-size: 32px;
            text-align: center;
            font-weight: bold;
            margin-bottom: 20px;
            border-bottom: solid 1px $grey37;
            padding-bottom: 30px;
            color: $grey71;
          }
          .dkzy-date {
            text-align: right;
            font-size: 16px;
            font-weight: bold;
          }
          .dkzy-content {
            margin-top: 20px;
            font-size: 16px;
            line-height: 28px;
            text-align: justify;
          }
          .dkzy-bottom {
            margin-top: 10px;
            font-size: 14px;
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

