<template>
  <div>
    <Card id="news_manager">
      <h4 slot="title" style="height: 30px;">
        <Button class="addData" type="primary" style="width: 10%;float: right;margin-right: 2%;" @click="addNews">新增</Button>
      </h4>
      <div class="content">
        <Table border :columns="historyColumns" :data="newsList" no-data-text="暂无数据"></Table>
        <Page :total="dataCount" :page-size="pageSize" show-total class="paging" :transfer="true"
              @on-change="changepage" :current="currentPage"></Page>
      </div>
    </Card>
    <loading v-if="isLoading"></loading>
    <add-committee v-if="addNewsStatus" v-on:addconfirmstate="getAddNewsStatus"></add-committee>
    <alert-message v-if="alertStates" v-on:confirmstate="getconfirm" :message="alertMessage"></alert-message>
  </div>
</template>
<script type="text/javascript">
  import * as UtilsService from '../../utils/utilsService';
  import * as associationIntroduceService from '../../service/associationIntroduceService';
  import * as branchVipService from '../../service/branchVipService';
  export default {
    data() {
      return {
        isLoading: false,
        alertMessage: '',
        alertStates: false,
        addNewsStatus: false,
        dataCount: 0, // 初始化信息总条数
        pageSize: 10, // 每页显示多少条
        currentPage: 1, // 当前页
        newTypeList: [], // 存放数据
        newsTitle: '', // 新闻标题
        committeeType: '全部', // 分会类型
        dataTemp: [], // 存放临时数据
        newsList: [], // 存放列表数据
        historyColumns: [
          {
            title: '分会',
            key: 'typename',
            align: 'center'
          },
          {
            title: '标题',
            key: 'title',
            align: 'center',
            width: 400
          },
          {
            title: '是否已发布',
            key: 'isReleaseInfo',
            align: 'center'
          },
          {
            title: '操作',
            align: 'center',
            width: 300,
            render: (h, params) => {
              let temp = h('div', '');
              if (this.newsList[params.index].isRelease === '1' || this.newsList[params.index].isRelease === '3') {
                temp = h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    width: '25%',
                    padding: '3px 3px',
                    float: 'left',
                    marginRight: '8px'
                  },
                  on: {
                    click: () => {
                      this.release(params.index);
                    }
                  }
                }, '发布');
              }
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    width: '25%',
                    padding: '3px 3px',
                    float: 'left',
                    marginRight: '8px'
                  },
                  on: {
                    click: () => {
                      this.editNews(params.index);
                    }
                  }
                }, '编辑'),
                temp,
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    width: '25%',
                    padding: '3px 3px',
                    float: 'left',
                    marginRight: '8px'
                  },
                  on: {
                    click: () => {
                      this.deleteNewsMsg(params.index);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ]
      };
    },
    methods: {
      getconfirm(value) {
        if (value === true) {
          let index = UtilsService.getSessionStorage('deleteCommitteeIndex');
          let committeId = UtilsService.getSessionStorage('committeId');
          if (committeId !== null) {
            this.releaseNews();
          }
          else {
            this.deleteNews(index);
          }
          this.confirm(false);
        }
        this.alertStates = false;
      },
      release(index) {
        this.alertStates = true;
        this.alertMessage = '是否发布信息？';
        UtilsService.cleanSessionStorage('committeId');
        UtilsService.setSessionStorage('committeId', this.newsList[index].id);
      },
      // 发布信息
      releaseNews() {
        let committeId = UtilsService.getSessionStorage('committeId');
        branchVipService.releaseInfo(committeId).then(result => {
          if (result.code === '0') {
            this.alertMsg('发布成功');
            UtilsService.cleanSessionStorage('committeId');
            this.queryAllCommitte();
          }
          else {
            this.alertMsg(result.msg);
          }
        });
      },
      getAddNewsStatus() {
        this.queryAllCommitte();
        this.addNewsStatus = false;
      },
      editNews(index) {
        this.addNewsStatus = true;
        UtilsService.cleanLocalStorage('committeeList');
        UtilsService.setSessionStorage('committeeList', this.newsList[index]);
      },
      deleteNewsMsg(index) {
        this.alertStates = true;
        this.alertMessage = '您确定删除该条信息吗？';
        UtilsService.cleanSessionStorage('deleteCommitteeIndex');
        UtilsService.setSessionStorage('deleteCommitteeIndex', index);
      },
      deleteNews(index) {
        branchVipService.deleteInfo(this.newsList[index].id).then(result => {
          if (result.code === '0') {
            this.alertMsg('删除成功');
            this.queryAllCommitte();
          }
          else {
            this.alertMsg(result.msg);
          }
        });
      },
      addNews() {
        UtilsService.cleanSessionStorage('committeeList');
        this.addNewsStatus = true;
      },
      confirm(value) {
        this.queryAllCommitte();
        if (value === false) {
          this.$emit('addconfirmstate', value);
        }
      },
      // 查询各分会主任委员信息
      queryAllCommitte() {
        this.currentPage = 1;
        if (this.committeeType === '全部') {
          this.isLoading = true;
          associationIntroduceService.queryAssociationCommittee().then(result => {
            this.isLoading = false;
            if (result.code === '0') {
              this.dataTemp = result.list;
              for (let i = 0; i < this.dataTemp.length; i++) {
                this.dataTemp[i].createDate = this.fmtDate(this.dataTemp[i].createDate * 1000);
              }
              this.handleListApproveHistory();
            }
            else {
              this.alertMsg(result.msg);
            }
          });
        }
      },
      alertMsg(msg) {
        this.$Notice.info({
          title: '信息提示：',
          desc: msg
        });
      },
      changepage(index) {
        var _start = (index - 1) * this.pageSize;
        var _end = index * this.pageSize;
        this.currentPage = index;
        this.committeeList = this.dataTemp.slice(_start, _end);
      },
      // 分页
      handleListApproveHistory() {
        this.dataCount = this.dataTemp.length;
        if (this.dataTemp.length < this.pageSize) {
          this.newsList = this.dataTemp;
        }
        else {
          this.newsList = this.dataTemp.slice(0, this.pageSize);
        }
      },
      fmtDate(obj) {
        var date = new Date(obj);
        var y = 1900 + date.getYear();
        var m = '0' + (date.getMonth() + 1);
        var d = '0' + date.getDate();
        return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length);
      }
    },
    created: function() {
      document.title = '主任委员';
      this.queryAllCommitte();
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/base/fn";
  #news_manager .ivu-card-head {
    background-color: $grey8;
  }
  #news_manager .ivu-card-body {
    padding-top: 20px;
  }
  .content {
    width: 100%;
    height: auto;
  }
</style>
