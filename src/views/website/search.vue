<template>
  <div id="search-main">
    <div class="main-header">
      <sn-main v-on:search="getSearch"></sn-main>
    </div>
    <section class="search-section">
      <h3>您搜索的 "{{searchContent}}" 共有{{titleCounts}}个结果</h3>
      <div class="result" v-for="item in titleList">
        <!--协会-->
        <h2 v-if="item.newsType === 'associationLeader' || item.newsType === 'associationDepartment' || item.newsType === 'associationInfoCategory'">
          <span @click="mixinSendClickEvent($event, $route.fullPath, 'wenzhangxiangqing');goUrl('/xhjs', item.id, item.newsType, item.typeName)">{{item.title}}</span>
        </h2>
        <!--十佳医师-->
        <h2 v-else-if="item.newsType === 'sjysType' || item.typeName === '重要信息'">
          <span @click="mixinSendClickEvent($event, $route.fullPath, 'wenzhangxiangqing');goUrl('/sjys', item.id, item.newsType, item.typeName)">{{item.title}}</span>
        </h2>
        <!--视频-->
        <h2 v-else-if="item.newsType === 'videoType'">
          <span @click="mixinSendClickEvent($event, $route.fullPath, 'wenzhangxiangqing');queryVideoById(item.id)">{{item.title}}</span>
        </h2>
        <!--对口支援-->
        <h2 v-else-if="item.newsType === 'dkzy'">
          <span @click="mixinSendClickEvent($event, $route.fullPath, 'wenzhangxiangqing');goUrl('/dkzy', item.id, item.typeCode, item.typeName)">{{item.title}}</span>
        </h2>
         <!--医师定考、党建工作、新闻类型-->
        <h2 v-else-if="item.newsType === 'doctorExamination' || item.newsType === 'partyBuildingWork' || item.newsType === 'newsType'">
          <span @click="mixinSendClickEvent($event, $route.fullPath, 'wenzhangxiangqing');goUrl('/newsInfo', item.id, item.typeCode, item.typeName)">{{item.title}}</span>
        </h2>
        <h2 v-else>
          <span @click="mixinSendClickEvent($event, $route.fullPath, 'wenzhangxiangqing');goUrl('/newsInfo', item.id, item.newsType, item.typeName)">{{item.title}}</span>
        </h2>
        <p class="result-content" v-html="item.content"></p>
        <div class="result-date">
          <span class="type">{{item.typeName}}</span><span class="date">{{item.createDate}}</span>
        </div>
      </div>
      <div class="paging-div">
        <Page :total="titleCounts" :page-size="pageSize" show-total class="paging" :transfer="true"
              @on-change="changePage"></Page>
      </div>
    </section>
    <sn-footer></sn-footer>
  </div>
</template>
<script type="text/javascript">
  import * as homeService from '../../service/homeService';
  import * as validateService from '../../utils/validateService';
  import * as UtilsService from '../../utils/utilsService';
  export default{
    data() {
      return {
        searchContent: '',
        titleCounts: 0,
        pageSize: 10,
        titleTemp: [],
        titleList: []
      };
    },
    methods: {
      queryVideoById(id) {
        homeService.queryVideoById(id).then(response => {
          if (response.code === '0') {
            let videoList = response.list;
            UtilsService.cleanSessionStorage('videoInfo');
            UtilsService.setSessionStorage('videoInfo', videoList[0]);
            this.goUrl('/videoNewsInfo');
          }
          else {
            this.open(response.msg);
          }
        });
      },
      querAllTitle(title) {
        homeService.querAllTitle(title).then(response => {
          if (response.code === '0') {
            let tmp = [];
            let associationList = response.list.associationList;
            let branchList = response.list.branchList;
            let newsList = response.list.newsList;
            let sjysList = response.list.sjysList;
            let videoList = response.list.videoList;
            this.titleTemp = tmp.concat(associationList, branchList, newsList, sjysList, videoList);
            for (let i = 0; i < this.titleTemp.length; i++) {
              this.titleTemp[i].createDate = this.fmtDate(this.titleTemp[i].createDate * 1000);
              if (validateService.upper(this.titleTemp[i].typeCode)) {
                this.titleTemp[i].typeCode = this.titleTemp[i].typeCode.toLowerCase();
              }
            }
            this.page();
          }
          else {
            this.open(response.msg);
          }
        });
      },
      page() {
        this.titleCounts = this.titleTemp.length;
        if (this.titleCounts < this.pageSize) {
          this.titleList = this.titleTemp;
        }
        else {
          this.titleList = this.titleTemp.slice(0, this.pageSize);
        }
      },
      changePage(index) {
        let _start = (index - 1) * this.pageSize;
        let _end = index * this.pageSize;
        this.titleList = this.titleTemp.slice(_start, _end);
      },
      open(msg) {
        this.$Notice.info({
          title: '信息提示：',
          desc: msg
        });
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
        if (url && param && !type) {
          this.$router.push(
            {
              path: url,
              query: {
                id: param
              }
            }
          );
        }
      },
      addBrowseNumer(id) {
        homeService.addBrowseNumer(id);
      },
      fmtDate(obj) {
        var date = new Date(obj);
        var y = 1900 + date.getYear();
        var m = '0' + (date.getMonth() + 1);
        var d = '0' + date.getDate();
        return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length);
      },
      getSearch(title) {
        this.searchContent = title;
        this.querAllTitle(title);
      }
    },
    created: function() {
      let title = this.$route.query.content;
      this.searchContent = title;
      this.querAllTitle(title);
    }
  };
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/base/fn.scss";
  #search-main {
    .main-header {
      width: 100%;
      height: 180px;
    }
    .search-section {
      width: 780px;
      min-height: 100vh;
      margin: 0 auto;
      h3 {
        font-size: 16px;
        margin: 10px 0;
      }
      .result {
        width: 780px;
        height: auto;
        font-size: 16px;
        margin-bottom: 20px;
        h2 {
          margin-bottom: 8px;
          font-size: 20px;
          font-weight: 600;
          color: $blue11;
        }
        .result-content {
          width: 780px;
          height: 45px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 8px;
        }
        .result-date {
          width: 780px;
          .type {
            display: inline-block;
            width: auto;
            // font-weight: 600;
          }
          .date {
            display: inline-block;
            width: auto;
            margin-left: 20px;
          }
        }
      }
      .paging-div {
        text-align: right;
        margin-top: 20px;
        font-size: 16px;
        color: $blue11;
      }
    }
  }
</style>

