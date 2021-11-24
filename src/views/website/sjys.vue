<template>
  <div id="sjyx-main">
    <div class="main-header">
      <sn-main v-on:watchSecondMenu="getSecondMenu"></sn-main>
    </div>
    <div class="sjyx-content">
      <div class="menu-crumbs-info">
        <label class="empty-block">&nbsp;</label>
        <label @click="mixinSendClickEvent($event, $route.fullPath, 'shouye');goUrl('/websiteHome')">首页<i  class="iconfont icon-jiantouyou"></i></label>
        <label>十佳医师</label>
      </div>
      <div class="left-menu">
        <div :class="fristType === 'zyxx' ? 'title-text-sel' : 'title-text'" @click="mixinSendClickEvent($event, $route.fullPath, 'shijiayishi-zhongyaoxiaoxi');fristClick('zyxx')">重要消息</div>
        <div :class="fristType === 'dhzp' ? 'title-text-sel' : 'title-text'" @click="mixinSendClickEvent($event, $route.fullPath, 'shijiayishi-dahuizhaopian');fristClick('dhzp')">大会照片</div>
        <div :class="fristType === 'sjys' ? 'title-text-sel' : 'title-text'" @click="mixinSendClickEvent($event, $route.fullPath, 'shijiayishi-shijiayishi');fristClick('sjys')">十佳医师</div>
        <div class="menu-second" v-if="fristType === 'sjys'">
          <div v-for="category in categoryList" :class="secondType === category.typecode ? 'title-ld-sel' : 'title-ld'" @click="mixinSendClickEvent($event, $route.fullPath, 'shijiayishijieshu');secondTypeSel(fristType, category.typecode)">{{category.typename}}</div>
        </div>
        <div :class="fristType === 'yxys' ? 'title-text-sel' : 'title-text'" @click="mixinSendClickEvent($event, $route.fullPath, 'shijiayishi-youxiuyishi');fristClick('yxys')">优秀医师</div>
        <div class="menu-second" v-if="fristType === 'yxys'">
          <div v-for="category in categoryList" :class="secondType === category.typecode ? 'title-ld-sel' : 'title-ld'" @click="mixinSendClickEvent($event, $route.fullPath, 'youxiuyishijieshu');secondTypeSel(fristType, category.typecode)">{{category.typename}}</div>
        </div>
        <div :class="fristType === 'sjnys' ? 'title-text-sel' : 'title-text'" @click="mixinSendClickEvent($event, $route.fullPath, 'shijiayishi-shijianvyishi');fristClick('sjnys')">十佳女医师</div>
        <div class="menu-second" v-if="fristType === 'sjnys'">
          <div v-for="category in categoryList" :class="secondType === category.typecode ? 'title-ld-sel' : 'title-ld'" @click="mixinSendClickEvent($event, $route.fullPath, 'shijianvyishijieshu');secondTypeSel(fristType, category.typecode)">{{category.typename}}</div>
        </div>
        <div :class="fristType === 'sjqnys' ? 'title-text-sel' : 'title-text'" @click="mixinSendClickEvent($event, $route.fullPath, 'shijiayishi-shijiaqingnianyishi');fristClick('sjqnys')">十佳青年医师</div>
        <div class="menu-second" v-if="fristType === 'sjqnys'">
          <div v-for="category in categoryList" :class="secondType === category.typecode ? 'title-ld-sel' : 'title-ld'" @click="mixinSendClickEvent($event, $route.fullPath, 'shijiaqingnianyishijieshu');secondTypeSel(fristType, category.typecode)">{{category.typename}}</div>
        </div>
      </div>
      <div class="right-context">
        <div class="sjys">
          <!-- 列表面包屑 -->
          <div v-if="showList" class="sjys-header-list">
            <div class="sjys-header" v-if="this.fristType === 'zyxx'" >重要消息</div>
            <div class="sjys-header" v-if="this.fristType === 'dhzp'" >大会照片</div>
            <div class="sjys-header" v-if="this.fristType === 'sjys'" >十佳医师</div>
            <div class="sjys-header" v-if="this.fristType === 'yxys'" >优秀医师</div>
            <div class="sjys-header" v-if="this.fristType === 'sjnys'" >十佳女医师</div>
            <div class="sjys-header" v-if="this.fristType === 'sjqnys'" >十佳青年医师</div>
          </div>
          <!-- 详情面包屑 -->
          <div class="menu-header" v-else @click="showCont">
            <label v-if="this.fristType === 'sjys'">十佳医师 > </label>
            <label v-if="this.fristType === 'yxys'">优秀医师 > </label>
            <label v-if="this.fristType === 'sjnys'">十佳女医师 > </label>
            <label v-if="this.fristType === 'sjqnys'">十佳青年医师 > </label>
            <label>{{formatText()}}</label>
          </div>
          <div v-if="showList" class="menu-list">
            <div class=" menu-list-top">
              <div v-if="displayData.length !== 0">
                <div class="sjys-div" @click="mixinSendClickEvent($event, $route.fullPath, 'shijiayishixiangqing');getDoctor(item.id)" v-for="(item,index) in displayData">
                  <div v-if="fristType === 'zyxx'" class="zyxx-title">
                    <div :class="index % 2 === 0 ? 'table-line blue-bgc':'table-line'">
                      <div class="text-info" v-html="item.titleInfo"  @click="showCont"></div>
                      <div class="date-info">{{item.createDate}}</div>
                    </div>
                  </div>
                  <div v-else-if="fristType === 'dhzp'" class="dhzp">
                    <div class="dhzp-img" v-if="item.titlePicture !== ''" id="dhzpImgUrlIdOne"  @click="showCont"><img :src="item.titlePicture"></div>
                    <div class="dhzp-img" id="dhzpImgUrlIdTwo" v-else  @click="showCont"><img src="../../assets/images/timg.jpg"></div>
                    <div class="dhzp-title">{{item.title}}</div>
                  </div>
                  <div class="else" v-else>
                    <div class="ld-img" v-if="item.titlePicture !== ''" id="imgUrl"  @click="showCont"><img :src="item.titlePicture"></div>
                    <div class="ld-img"  @click="showCont" id="replacementimgUrl" v-else><img src="../../assets/images/timg.jpg"></div>
                    <div class="sjys-title">{{item.title}}</div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="Dialog">
                    <img src="../../assets/images/no_data.png" class="img"/>
                    <div class="fontStyle">暂无数据</div>
                </div>
              </div>
            </div>
            <div v-if="fristType === 'zyxx'" class="paging-div">
              <Page :total="dataCount" :page-size="pageSize" show-total class="paging" :transfer="true"
                    @on-change="changepage"></Page>
            </div>
          </div>
          <div class="menu-content" v-else>
            <div class="sjys-divs">
              <div class="sjys-titles">{{doctorInfo.title}}</div>
              <div class="sjys-date">发布日期：{{doctorInfo.createDate}}&nbsp;&nbsp;&nbsp;&nbsp;浏览次数：{{doctorInfo.browseNumber}}</div>
            <!--  <div class="sjys-info">
                <label>发布日期: {{doctorInfo.createDate}} &nbsp;&nbsp;</label>
                <label>浏览次数: {{doctorInfo.browseNumber}}</label>
              </div>-->
              <div class="sjys-content"  v-html="doctorInfo.content"></div>
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
  import * as UtilsService from '../../utils/utilsService';
  import * as associationIntroduceService from '../../service/associationIntroduceService';
  export default{
    data() {
      return {
        fristType: 'zyxx', // 一层菜单选中
        secondType: '',  // 二层菜单选中
        doctorList: [],
        isBack: false,  // 返回控制
        categoryList: [],
        doctorInfo: {
          id: '',
          title: '',
          titleInfo: '',
          createDate: '',
          content: '',
          browseNumber: '',
          titlePicture: ''
        },
        titleArray: ['十佳医师', '优秀医师', '十佳女医师', '十佳青年医师'],
        showList: true,
        pageSize: 15, //  每页显示条数
        displayData: [], // 展示数据
        doctorDataList: [],
        dataCount: 0
      };
    },
    mounted() {
      if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        if (document.getElementById('dhzpImgUrlIdOne') !== null) {
          document.getElementById('dhzpImgUrlIdOne').style.width = '295px';
        }
        if (document.getElementById('dhzpImgUrlIdOne') !== null) {
          document.getElementById('dhzpImgUrlIdOne').style.height = '200px';
        }
        if (document.getElementById('dhzpImgUrlIdTwo') !== null) {
          document.getElementById('dhzpImgUrlIdTwo').style.width = '295px';
        }
        if (document.getElementById('dhzpImgUrlIdTwo') !== null) {
          document.getElementById('dhzpImgUrlIdTwo').style.height = '200px';
        }
      }
      else {
        if (document.getElementById('dhzpImgUrlIdOne') !== null) {
          document.getElementById('dhzpImgUrlIdOne').style.width = '295px';
        }
        if (document.getElementById('dhzpImgUrlIdOne') !== null) {
          document.getElementById('dhzpImgUrlIdOne').style.height = '200px';
        }
        if (document.getElementById('dhzpImgUrlIdTwo') !== null) {
          document.getElementById('dhzpImgUrlIdTwo').style.width = '295px';
        }
        if (document.getElementById('dhzpImgUrlIdTwo') !== null) {
          document.getElementById('dhzpImgUrlIdTwo').style.height = '200px';
        }
        if (document.getElementById('dhzpImgUrlIdTwo') !== null) {
          document.getElementById('dhzpImgUrlIdTwo').style.float = 'left';
        }
        if (document.getElementById('dhzpImgUrlIdOne') !== null) {
          document.getElementById('dhzpImgUrlIdOne').style.float = 'left';
        }
        if (document.getElementById('dhzpImgUrlIdOne') !== null) {
          document.getElementById('dhzpImgUrlIdOne').style.float = 'left';
        }
        if (document.getElementById('dhzpImgUrlIdOne') !== null) {
          document.getElementById('dhzpImgUrlIdOne').style.float = 'left';
        }
        if (document.getElementById('imgUrl') !== null) {
          document.getElementById('imgUrl').style.float = 'left';
        }
        if (document.getElementById('replacementimgUrl') !== null) {
          document.getElementById('replacementimgUrl').style.float = 'left';
        }
      }
    },
    methods: {
      formatText() {
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
      },
      fmtDate(obj) {
        var date = new Date(obj);
        var y = 1900 + date.getYear();
        var m = '0' + (date.getMonth() + 1);
        var d = '0' + date.getDate();
        return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length);
      },
      selectCategoryList() {
        associationIntroduceService.selectCategory().then(result => {
          if (result !== null) {
            this.categoryList = result.category;
          }
        });
      },
      showCont() {
        this.showList = !this.showList;
        this.isBack = this.showList === false;
      },
      tenDoctor(type, numberType) {
        associationIntroduceService.tenDoctor(type, numberType).then(result => {
          if (result !== null) {
            if (result.code === '0') {
              this.doctorList = result.list;
              for (let i = 0; i < this.doctorList.length; i++) {
                this.doctorList[i].createDate = this.fmtDate(this.doctorList[i].createDate * 1000);
              }
              this.page();
            }
            else {
              this.alertMsg(result.msg);
            }
          }
          else {
            this.alertMsg(UtilsService.MESSAGE_CAN_NOT_CONNECT);
          }
        });
      },
      getDoctor(id) {
        associationIntroduceService.homePage(id).then(result => {
          if (result !== null) {
            if (result.code === '0') {
              for (let i = 0; i < result.list.length; i++) {
                let doctorInfo = result.list[0];
                this.doctorInfo.title = doctorInfo.title;
                this.doctorInfo.createDate = this.fmtDate(doctorInfo.createDate * 1000);
                this.doctorInfo.browseNumber = doctorInfo.browseNumber;
                this.doctorInfo.content = doctorInfo.content;
              }
            }
            else {
              this.alertMsg(result.msg);
            }
          }
          else {
            this.alertMsg(UtilsService.MESSAGE_CAN_NOT_CONNECT);
          }
        });
      },
      alertMsg(msg) {
        this.$Notice.info({
          title: '信息提示：',
          desc: msg
        });
      },
      // 一层点击
      fristClick(name) {
        this.fristType = name;
        if (this.fristType === 'sjys' || this.fristType === 'sjnys' || this.fristType === 'sjqnys' || this.fristType === 'yxys') {
          this.secondType = '07';
          name = '07';
        }
        else {
          this.secondType = '';
        }
        this.secondTypeSel(this.fristType, this.secondType);
      },
      // 二层点击
      secondTypeSel(fristType, secondType) {
        this.fristType = fristType;
        this.secondType = secondType;
        this.tenDoctor(fristType, secondType);
        this.showList = true;
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
      // 分页显示
      page() {
        this.dataCount = this.doctorList.length;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        // this.title,IndexOf(this.doctorList);
        if (this.doctorList.length < this.pageSize) {
          this.displayData = this.doctorList;
        }
        else {
          this.displayData = this.doctorList.slice(0, this.pageSize);
        }
      },
      // 上一页
      changepage(index) {
        var _start = (index - 1) * this.pageSize;
        var _end = index * this.pageSize;
        this.displayData = this.doctorList.slice(_start, _end);
      },
      getSecondMenu(tempData) {
        this.fristType = tempData.fristType;
        this.secondType = tempData.secondType;
      }
    },
    beforeRouteLeave(to, from, next) {
      UtilsService.cleanSessionStorage('sjys-param');
      let lastPath = UtilsService.getSessionStorage('lastPath');
      if (lastPath === '/sjys') {
        if (this.isBack) {
          this.showList = true;
          this.isBack = false;
          // this.fristType = 'sjys';
          // this.fristType = 'sjys';
          // this.secondType = '07';
          this.tenDoctor(this.fristType, this.secondType);
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
      let tempData = UtilsService.getSessionStorage('sjys-param');
      if (tempData) {
        this.fristType = tempData.fristType;
        this.secondType = tempData.secondType;
//        this.fristType = 'zyxx';
//        this.secondType = '';
//      }
//      else {
//        this.fristType = this.$route.query.name;
//        this.secondType = this.$route.query.secondname;
      }
      let id = this.$route.query.id;
      if (id) {
        this.showList = false;
        this.getDoctor(id);
      }
      this.tenDoctor(this.fristType, this.secondType);
      // 协会详情状态  判断
//      let xhStatus = UtilsService.getSessionStorage('XHstatus');
      this.selectCategoryList();
    }
  };
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/base/fn.scss";
  .img {
    width: 150px;
  }
  .Dialog {
    margin: 0 auto;
    width: 160px;
    padding-top: 120px;
  }
  .fontStyle {
    font-size: 25px;
    font-weight: 400;
    width: 100%;
    color: $grey39;
    text-align: center;
    padding-top: 15px;
  }
  #sjyx-main {
    .main-header {
      width: 100%;
      height: 180px;
    }
    .sjyx-content {
      width: 1180px;
      margin: 0 auto;
      overflow: hidden;
      margin-top: 20px;
      margin-bottom: 40px;
      height: auto;
      .menu-crumbs-info {
        width: 210px;
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
        border-right: 1px solid $grey32;
        padding-right: 20px;
        .title-text {
          font-size: 20px;
          font-weight: bold;
          color: $blue11;
          margin-bottom: 20px;
          text-align: center;
          height: 50px;
          line-height: 50px;
          background-color: $grey38;
          border-radius: 5px;
        }
        .title-text-sel {
          font-size: 20px;
          font-weight: bold;
          color: $grey38;
          margin-bottom: 20px;
          text-align: center;
          height: 50px;
          line-height: 50px;
          background-color: $blue11;
          border-radius: 5px;
        }
        .menu-second {
          margin-top: -10px;
          margin-bottom: 10px;
          .title-ld {
            height: 30px;
            line-height: 30px;
            font-size: 16px;
            color: $blue11;
            padding-left: 20px;
            background-color: $grey38;
            margin-bottom: 5px;
            border-radius: 4px;
            text-align: center;
          }
          .title-ld-sel {
            height: 30px;
            line-height: 30px;
            font-size: 16px;
            color: $grey38;
            padding-left: 20px;
            background-color: $blue11;
            margin-bottom: 5px;
            border-radius: 4px;
            text-align: center;
          }
        }
      }
      .right-context {
        width: 950px;
        float: left;
        margin-left: 20px;
        .sjys {
          .sjys-header-list {
            .sjys-header {
              font-size: 30px;
              color: $grey72;
              margin-bottom: 30px;
            }
          }
          .menu-header {
            font-size: 16px;
            color: $grey72;
          }
          .menu-list {
            .menu-list-top {
              .sjys-div {
                float: left;
                margin-right: 20px;
                width: min-content;
                .zyxx-title {
                  width: 950px;
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
                      margin-right: 15px;
                    }
                  }
                  .blue-bgc {
                    background-color: $grey32;
                  }
                }
                .dhzp {
                  .dhzp-img {
                    img {
                      width: 265px;
                      border: solid 1px $grey36;
                      padding: 7px;
                      height: 200px;
                    }
                  }
                  .dhzp-title {
                    font-size: 15px;
                    text-align: center;
                    color: $grey71;
                    font-weight: 600;
                    margin-bottom: 50px;
                  }
                }
                .else {
                  .ld-img {
                    height: 230px;
                    img {
                      width: 170px;
                      height: 216px;
                      border: solid 1px $grey36;
                      padding: 7px;
                    }
                  }
                  .sjys-title {
                    font-size: 15px;
                    text-align: center;
                    color: $grey71;
                    font-weight: 600;
                    margin-bottom: 50px;
                  }
                }
              }
            }
            .paging-div {
              padding-right: 40px;
              margin-top: 20px;
              width: 970px;
              text-align: right;
              font-size: 16px;
              color: $blue11;
              .paging-input {
                width: 30px;
                height: 20px;
              }
            }
          }
          .menu-content {
            padding-right: 20px;
            .sjys-divs {
              .sjys-titles {
                font-size: 32px;
                text-align: center;
                font-weight: bold;
                margin-bottom: 20px;
                border-bottom: solid 1px $grey37;
                padding-bottom: 30px;
                color: $grey71;
              }
              .sjys-date {
                text-align: right;
                font-size: 16px;
                font-weight: bold;
              }
              .sjys-content {
                margin-top: 20px;
                font-size: 16px;
                line-height: 28px;
                text-align: justify;
              }
            }
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

