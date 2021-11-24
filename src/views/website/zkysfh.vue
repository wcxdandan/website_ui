<template>
  <div id="app-xhjs">
    <sn-main></sn-main>
    <div class="xhjs-content">
      <div class="xhjs-content-info-div">
        <div class="menu-crumbs-info">
          <label class="empty-block">&nbsp;</label>
          <label @click="goUrl('/websiteHome')">首页 <i  class="iconfont icon-jiantouyou"></i> </label>
          <label @click="goUrl('/categoryList','','zkysfh')">二级机构 <i  class="iconfont icon-jiantouyou"></i> </label>
          <label>{{$route.query.name}}</label>
        </div>
        <div class="left-menu">
          <div :class="fristType === 'zrwy' ? 'title-text-sel' : 'title-text'" @click="fristClick('zrwy')">主任委员</div>
          <div :class="fristType === 'fhdt' ? 'title-text-sel' : 'title-text'" @click="fristClick('fhdt')">分会动态</div>
        </div>
        <div class="right-context">
          <div class="zkysfh" v-if="fristType === 'fhdt'">
            <div class="zkysfh-title">分会动态</div>
            <div class="zkysfh-text">
              <div v-for="(item,index) in displayData" @click="mixinSendClickEvent($event, $route.fullPath, 'wenzhangxiangqing');goUrl('/newsInfo', item.id, 'zkysfh',$route.query.name)">
                <div :class="index % 2 === 0 ? 'table-line blue-bgc':'table-line'">
                  <div class="text-info" v-html="item.title"></div>
                  <div class="date-info">{{item.createDate}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="zkysfh" v-if="fristType === 'zrwy'">
            <div class="zkysfh-title">主任委员</div>
            <div v-for="(item,index) in committeeList">
              <div class="zkysfh-text" v-html="item.content" ></div>
            </div>
          </div>
          <!--分页-->
          <div v-if="fristType === 'fhdt'" class="paging-div">
            <Page :total="dataCount" :page-size="pageSize" show-total class="paging" :transfer="true"
                  @on-change="changepage"></Page>
          </div>
        </div>
      </div>
      <sn-footer></sn-footer>
    </div>
  </div>
</template>
<script type="text/javascript">
  import * as homeService from '../../service/homeService';
  import * as UtilsService from '../../utils/utilsService';
  export default{
    data() {
      return {
        associationList: [], // 分会动态临时数据
        openLayer: true,
        fristType: 'zrwy', // 一层菜单
        leftMenu: ['fhdt', 'zrwy'],
        dataCount: 0,
        pageSize: 15, //  每页显示条数
        displayData: [], // 分会动态数据
        committeeList: [] // 主任委员数据
      };
    },
    methods: {
      associationIntroduce(id) {
        if (id) {
          homeService.queryBranchAndVipList(this.$route.query.id).then(response => {
            if (response.code === '0') {
              this.associationList = response.list;
              for (let i = 0; i < this.associationList.length; i++) {
                this.associationList[i].createDate = this.fmtDate(this.associationList[i].createDate * 1000);
              }
              this.page();
            }
            else {
              this.open(response.msg);
            }
          });
        }
      },
      queryCommittee(id) {
        if (id) {
          homeService.queryCommittee(this.$route.query.id).then(response => {
            if (response.code === '0') {
              this.committeeList = response.list;
              for (let i = 0; i < this.committeeList.length; i++) {
                this.committeeList[i].createDate = this.fmtDate(this.committeeList[i].createDate * 1000);
              }
              this.page();
            }
            else {
              this.open(response.msg);
            }
          });
        }
      },
      // 分页显示
      page() {
        this.dataCount = this.associationList.length;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if (this.associationList.length < this.pageSize) {
          this.displayData = this.associationList;
        }
        else {
          this.displayData = this.associationList.slice(0, this.pageSize);
        }
      },
      // 上一页
      changepage(index) {
        var _start = (index - 1) * this.pageSize;
        var _end = index * this.pageSize;
        this.displayData = this.associationList.slice(_start, _end);
      },
      fmtDate(obj) {
        var date = new Date(obj);
        var y = 1900 + date.getYear();
        var m = '0' + (date.getMonth() + 1);
        var d = '0' + date.getDate();
        return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length);
      },
      addBrowseNumer(id) {
        homeService.addBrowseNumer(id);
      },
      alertMsg(msg) {
        this.$Notice.info({
          title: '信息提示：',
          desc: msg
        });
      },
      fristClick(name) {
        this.fristType = name;
        if (name === 'zrwy') {
          this.queryCommittee(this.$route.query.id);
        }
        this.associationIntroduce(name);
      },
      goUrl(url, param, type, name) {
        this.addBrowseNumer(param);
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
      }
    },
    created: function() {
      let id = this.$route.query.id;
      this.associationIntroduce(id);
      this.queryCommittee(id); // 主任委员
      UtilsService.cleanSessionStorage('BranchAndVipId');
      UtilsService.setSessionStorage('BranchAndVipId', id);
    }
  };
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/base/fn.scss";

  .imgUrl {
    height: 260px;
  }

  #app-xhjs {
    height: 100vh;
    .main-header {
      width: 100%;
      height: 180px;
    }
    .xhjs-content {
      overflow: hidden;
      margin-top: 40px;
      .xhjs-content-info-div {
        margin: 0 auto;
        overflow: hidden;
        width: 1180px;
        .menu-crumbs-info {
          // width: 210px;
          font-size: 16px;
          color: #18679a;
          .empty-block {
            background-color: #18679a;
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
          height: 100vh;
          border-right: 1px solid #f2f6f6;
          padding-right: 20px;
          .title-text {
            font-size: 20px;
            font-weight: bold;
            color: #18679a;
            margin-bottom: 20px;
            text-align: center;
            height: 50px;
            line-height: 50px;
            background-color: #f0f5f5;
            border-radius: 5px;
          }
          .title-text-sel {
            font-size: 20px;
            font-weight: bold;
            color: #f0f5f5;
            margin-bottom: 20px;
            text-align: center;
            height: 50px;
            line-height: 50px;
            background-color: #18679a;
            border-radius: 5px;
          }
          .menu-second {
            margin-top: -10px;
            margin-bottom: 10px;
            .title-ld {
              height: 30px;
              line-height: 30px;
              font-size: 16px;
              color: #18679a;
              padding-left: 20px;
              background-color: #f0f5f5;
              margin-bottom: 5px;
              border-radius: 4px;
              text-align: center;
            }
            .title-ld-sel {
              height: 30px;
              line-height: 30px;
              font-size: 16px;
              color: #f0f5f5;
              padding-left: 20px;
              background-color: #18679a;
              margin-bottom: 5px;
              border-radius: 4px;
              text-align: center;
            }
          }
        }
        .right-context {
          width: 950px;
          height: 100vh;
          float: left;
          .zkysfh {
            display: flow-root;
            padding: 0 40px;
            .zkysfh-title {
              font-size: 30px;
              text-align: center;
              font-weight: bold;
              border-bottom: solid 2px #18679a;
              padding-bottom: 20px;
              color: #18679a;
            }
            .zkysfh-text {
              margin-top: 18px;
              // padding: 0 40px;
              font-size: 18px;
              text-align: justify;
              .table-line {
                height: 40px;
                line-height: 40px;
                font-size: 16px;
                .text-info {
                  float: left;
                  // width: 870px;
                  height: 40px;
                  padding: 0 10px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
                .date-info {
                  float: right;
                  margin-right: 30px;
                }
              }
              .blue-bgc {
                background-color: $grey32;
              }
            }
            .zkysfh-text-center {
              text-align: center;
            }
            .zzjg-img {
              padding-left: 40px;
              text-align: center;
            }
            .myhz-div {
              float: left;
              height: 400px;
              width: 100%;
            }
            .myhz-divs {
              float: left;
            }
            .ld-img {
              float: left;
              margin-right: 40px;
              height: 400px;
              img {
                width: 180px;
              }
            }
            .ldjs-title {
              font-size: 30px;
              font-weight: bold;
            }
            .ldjs-content {
              font-size: 24px;
              margin-top: 20px;
              margin-bottom: 10px;
            }
            .ldjs-text {
              margin-top: 15px;
              font-size: 18px;
              text-align: justify;
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
      }
    }
  }
</style>

