<template>
  <div id="news-list-main">
    <div class="main-header">
      <sn-main v-on:watchnewtype="getNewType"></sn-main>
    </div>
    <div class="news-content">
      <div class="news-content-list-div">
        <div class="menu-crumbs-info">
          <label class="empty-block">&nbsp;</label>
          <label @click="mixinSendClickEvent($event, $route.fullPath, '首页');goUrl('/websiteHome')">首页<i  class="iconfont icon-jiantouyou"></i> </label>
          <label v-if="newsType === 'partyBuildingNews' || newsType === 'partyRegulations' || newsType === 'seriesSpeech'" @click="mixinSendClickEvent($event, $route.fullPath, 'dangjiangongzuo');goUrl('/djgz')">党建工作<i  class="iconfont icon-jiantouyou"></i> </label>
          <label v-if="newsType === 'partyBuildingNews'">党建动态</label>
          <label v-if="newsType === 'partyRegulations'">党章党规</label>
          <label v-if="newsType === 'seriesSpeech'">系列讲话</label>
          <label v-if="newsType === 'policyInterpretation' || newsType === 'noticeAnnouncement' || newsType === 'downloadColumn'" @click="mixinSendClickEvent($event, $route.fullPath, 'yishidingkao');goUrl('/ysdk')">医师定考 <i  class="iconfont icon-jiantouyou"></i> </label>
          <label v-if="newsType === 'policyInterpretation'">政策解读</label>
          <label v-if="newsType === 'noticeAnnouncement'">通知公告</label>
          <label v-if="newsType === 'downloadColumn'">下载专栏</label>
          <label v-if="newsType === 'gzdt'">工作动态</label>
          <label v-if="newsType === 'xxgg'">信息公告</label>
          <label v-if="newsType === 'hyxw'">行业新闻</label>
          <label v-if="newsType === 'yspy'">医师培养</label>
          <label v-if="newsType === 'zlwq'">自律维权</label>
          <label v-if="newsType === 'xyg'">新医改</label>
          <label v-if="newsType === 'sbfp'">双百扶贫</label>
          <label v-if="newsType === 'xzzl'">下载专栏</label>
          <label v-if="newsType === 'dsjhy'">第三次会员代表大会</label>
          <label v-if="newsType === 'dfysxh'" @click="mixinSendClickEvent($event, $route.fullPath, 'difangyishixiehui');goUrl('/categoryList', '', 'dfysxh')">地方医师协会 <i  class="iconfont icon-jiantouyou"></i> </label>
          <label v-if="newsType === 'zkysfh'" @click="mixinSendClickEvent($event, $route.fullPath, 'zhuankeyishifenhui');goUrl('/categoryList', '', 'zkysfh')">二级机构 <i  class="iconfont icon-jiantouyou"></i> </label>
          <label v-if="$route.query.name !== undefined">{{$route.query.name}}</label>
        </div>
        <div class="news-list-table">
          <div :class="index % 2 === 0 ? 'table-line blue-bgc':'table-line'" v-for="(item,index) in displayData"
               v-if="newsType === 'dfysxh' || newsType === 'zkysfh'" @click="mixinSendClickEvent($event, $route.fullPath, 'wenzhangxiangqing');goUrl('/newsInfo', item.id, newsType,$route.query.name)">
            <div class="text-info" v-html="item.title"></div>
            <div class="date-info">{{item.createDate}}</div>
          </div>
          <div :class="index % 2 === 0 ? 'table-line blue-bgc':'table-line'" v-for="(item,index) in displayData"
               @click="mixinSendClickEvent($event, $route.fullPath, 'wenzhangxiangqing');goUrl('/newsInfo', item.id, newsType)"
               v-if="newsType === 'gzdt' || newsType === 'xxgg' || newsType === 'hyxw' || newsType === 'yspy' || newsType === 'zlwq' || newsType === 'xyg' || newsType === 'sbfp' || newsType === 'xzzl' || newsType === 'dsjhy' ">
            <div class="text-info" v-html="item.newsTitle"></div>
            <div class="date-info">{{item.createDate}}</div>
          </div>
          <div :class="index % 2 === 0 ? 'table-line blue-bgc':'table-line'" v-for="(item,index) in displayData"
               @click="mixinSendClickEvent($event, $route.fullPath, 'wenzhangxiangqing');goUrl('/newsInfo', item.id, newsType)"
               v-if="newsType === 'partyBuildingNews' || newsType === 'partyRegulations' || newsType === 'seriesSpeech' ">
            <div class="text-info" v-html="item.title"></div>
            <div class="date-info">{{item.createDate}}</div>
          </div>
          <div :class="index % 2 === 0 ? 'table-line blue-bgc':'table-line'" v-for="(item,index) in displayData"
               @click="mixinSendClickEvent($event, $route.fullPath, 'wenzhangxiangqing');goUrl('/newsInfo', item.id, newsType)"
               v-if="newsType === 'policyInterpretation' || newsType === 'noticeAnnouncement' || newsType === 'downloadColumn' ">
            <div class="text-info" v-html="item.title"></div>
            <div class="date-info">{{item.createDate}}</div>
          </div>
          <!--<div :class="index % 2 === 0 ? 'table-line blue-bgc':'table-line'" v-for="(item,index) in displayData" @click="goUrl('/newsInfo', item.id, $route.query.type)">
            <div class="text-info">{{item.newsTitle}}</div>
            <div class="date-info">{{item.createDate}}</div>
          </div>-->
        </div>
        <div class="paging-div">
          <Page :total="dataCount" :page-size="pageSize" show-total class="paging" :transfer="true"
                @on-change="changepage"></Page>
        </div>
      </div>
    </div>
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
        lists: [],
        pageSize: 10, //  每页显示条数
        displayData: [],
        newsType: '',
        dataCount: 0,
        sessionList: [] // 缓存数据
      };
    },
    methods: {
     /* goUrl(url) {
        this.$router.push(url);
      }, */
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
      addBrowseNumer(id) {
        homeService.addBrowseNumer(id);
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
      fmtDate(obj) {
        var date = new Date(obj);
        var y = 1900 + date.getYear();
        var m = '0' + (date.getMonth() + 1);
        var d = '0' + date.getDate();
        return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length);
      },
      // 获取数据
      getLists() {
        // this.newsType = this.$route.params.type;
        if (this.newsType === 'dfysxh' || this.newsType === 'zkysfh') {
          // this.queryBranchAndVipList();
          homeService.queryBranchAndVipList(this.$route.query.id).then(response => {
            if (response.code === '0') {
              this.lists = response.list;
              for (let i = 0; i < this.lists.length; i++) {
                this.lists[i].createDate = this.fmtDate(this.lists[i].createDate * 1000);
              }
              this.page();
            }
            else {
              this.open(response.msg);
            }
          });
        }
        else if (this.newsType !== 'dfysxh' || this.newsType !== 'zkysfh') {
          UtilsService.cleanSessionStorage('list_' + this.newsType);
          let tempData = UtilsService.getSessionStorage('list_' + this.newsType);
          if (tempData !== null) {
            this.lists = tempData;
            this.page();
          }
          else if (this.newsType === 'policyInterpretation' || this.newsType === 'noticeAnnouncement' || this.newsType === 'downloadColumn') {
            homeService.getParty(this.newsType, 'doctorExamination', '').then(response => {
              if (response.code === '0') {
                for (let i = 0; i < response.list.length; i++) {
                  if (response.list[i].isReleaseInfo === '已发布') {
                    response.list[i].createDate = this.fmtDate(response.list[i].createDate * 1000);
                    this.lists.push(response.list[i]);
                  }
                }
                UtilsService.setSessionStorage('list_' + this.newsType, this.lists);
                this.page();
              }
              else {
                this.open(response.msg);
              }
            });
          }
          else if (this.newsType === 'partyBuildingNews' || this.newsType === 'partyRegulations' || this.newsType === 'seriesSpeech') {
            homeService.getParty(this.newsType, 'partyBuildingWork', '').then(response => {
              if (response.code === '0') {
                for (let i = 0; i < response.list.length; i++) {
                  if (response.list[i].isReleaseInfo === '已发布') {
                    response.list[i].createDate = this.fmtDate(response.list[i].createDate * 1000);
                    this.lists.push(response.list[i]);
                  }
                }
                UtilsService.setSessionStorage('list_' + this.newsType, this.lists);
                this.page();
              }
              else {
                this.open(response.msg);
              }
            });
          }
          else {
            homeService.openMore(this.newsType).then(response => {
              if (response.code === '0') {
                this.lists = response.list;
                for (let i = 0; i < this.lists.length; i++) {
                  this.lists[i].createDate = this.fmtDate(this.lists[i].createDate * 1000);
                }
                UtilsService.setSessionStorage('list_' + this.newsType, this.lists);
                this.page();
              }
              else {
                this.open(response.msg);
              }
            });
          }
        }
      },
      // 分页显示
      page() {
        this.dataCount = this.lists.length;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if (this.lists.length < this.pageSize) {
          this.displayData = this.lists;
        }
        else {
          this.displayData = this.lists.slice(0, this.pageSize);
        }
      },
      // 上一页
      changepage(index) {
        var _start = (index - 1) * this.pageSize;
        var _end = index * this.pageSize;
        this.displayData = this.lists.slice(_start, _end);
      },
      getNewType(newType) {
        this.newsType = newType;
        this.getLists();
      }
    },
    created: function() {
      this.newsType = this.$route.params.type;
      this.getLists();
    }
  };
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/base/fn.scss";
  #news-list-main {
    /* height: 100vh; */
    .main-header {
      width: 100%;
      height: 180px;
    }
    .news-content {
      width: 1180px;
      margin: 0 auto;
      overflow: hidden;
      margin-top: 40px;
      min-height: 520px;
      padding-right: 20px;
      .news-content-list-div {
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
        .news-list-table {
          width: 1180px;
          margin-top: 30px;
          font-size: 16px;
          .table-line {
            height: 40px;
            line-height: 40px;
            padding: 0 10px;
            .text-info {
              float: left;
            }
            .date-info {
              float: right;
            }
          }
          .blue-bgc {
            background-color: $grey32;
          }
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
      }
    }
  }
</style>

