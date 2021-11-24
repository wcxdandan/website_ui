<template>
  <div>
    <Card id="news_manager">
      <h4 slot="title">
        <Select id="zhifufangshi"  clearable style="width: 15%;" placeholder="新闻类型" v-model="newsType">
          <Option value="全部">全部</Option>
          <Option value="wmys">万名医师支援农村卫生工程</Option>
          <Option value="wsqj">卫生强基工程</Option>
          <Option value="xjyy">县级医院骨干医师培训</Option>
          <Option value="sjsn">省际、省内东西部对口支援</Option>
        </Select>
        <Input placeholder="请输入标题" style="width: 15%;margin-left: 1%;" clearable v-model="newsTitle"/>
        <Button class="addData" type="primary" style="width: 10%;float: right;margin-left: 2%;" @click="addNews">新增</Button>
        <Button class="resetData" type="primary" style="width: 10%;float: right;margin-left: 34%;" @click="resert">重置</Button>
        <Button class="searchData" type="primary" style="width: 10%;float: right;margin-left: 2%;" @click="queryAllNews">查询</Button>
      </h4>
      <div class="content">
        <Table border :columns="historyColumns" :data="newsList" no-data-text="暂无数据"></Table>
        <Page :total="dataCount" :page-size="pageSize" show-total class="paging" :transfer="true"
              @on-change="changepage" :current="currentPage"></Page>
      </div>
    </Card>
    <loading v-if="isLoading"></loading>
    <add-counterpartSupport v-if="addNewsStatus" v-on:addconfirmstate="getAddNewsStatus"></add-counterpartSupport>
    <alert-message v-if="alertStates" v-on:confirmstate="getconfirm" :message="alertMessage"></alert-message>
  </div>
</template>
<script type="text/javascript">
  import * as counterpartSupportService from '../../service/counterpartSupportService';
  import * as UtilsService from '../../utils/utilsService';
  export default {
    data() {
      return {
        alertMessage: '',
        alertStates: false,
        addNewsStatus: false,
        dataCount: 0, // 初始化信息总条数
        pageSize: 10, // 每页显示多少条
        currentPage: 1,
        isLoading: false,
        newTypeList: [], // 存放新闻类别list
        newsTitle: '', // 新闻标题
        newsType: '全部', // 新闻类型
        dataTemp: [], // 存放临时数据
        newsList: [], // 存放列表数据
        historyColumns: [
          {
            title: '新闻类型',
            key: 'typename',
            align: 'center'
          },
          {
            title: '新闻标题',
            key: 'title',
            align: 'center',
            width: 250
          },
          {
            title: '是否已发布',
            key: 'isReleaseInfo',
            align: 'center'
          },
          {
            title: '浏览次数',
            key: 'browseNumber',
            align: 'center'
          },
          {
            title: '创建时间',
            key: 'createDate',
            align: 'center'
          },
          {
            title: '操作',
            align: 'center',
            render: (h, params) => {
              let temp = h('div', '');
              if (this.newsList[params.index].isReleaseStatus === '1' || this.newsList[params.index].isReleaseStatus === '3') {
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
                      this.deleteMsg(params.index);
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
        let index = UtilsService.getSessionStorage('deleteIndex'); // counterpartId
        let counterpartId = UtilsService.getSessionStorage('counterpartId');
        if (value === true) {
          if (counterpartId !== null) {
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
        UtilsService.cleanSessionStorage('counterpartId');
        UtilsService.setSessionStorage('counterpartId', this.newsList[index].id);
      },
      // 发布新闻
      releaseNews() {
        let newsId = UtilsService.getSessionStorage('counterpartId');
        counterpartSupportService.releaseInfo(newsId).then(result => {
          if (result.code === '0') {
            this.alertMsg('发布成功');
            UtilsService.cleanSessionStorage('counterpartId');
            this.queryAllNews();
          }
          else {
            this.alertMsg(result.msg);
          }
        });
      },
      getAddNewsStatus() {
        this.queryAllNews();
        this.addNewsStatus = false;
      },
      editNews(index) {
        this.addNewsStatus = true;
        UtilsService.cleanLocalStorage('counterpartSupportId');
        UtilsService.setSessionStorage('counterpartSupportId', this.newsList[index].id);
      },
      deleteMsg(index) {
        this.alertStates = true;
        this.alertMessage = '您确定删除该条信息吗？';
        UtilsService.cleanSessionStorage('deleteIndex');
        UtilsService.setSessionStorage('deleteIndex', index);
      },
      deleteNews(index) {
        counterpartSupportService.deleteCounterpartSupportInfo(this.newsList[index].id).then(result => {
          if (result.code === '0') {
            this.alertMsg('删除成功');
            this.queryAllNews();
          }
          else {
            this.alertMsg(result.msg);
          }
        });
      },
      addNews() {
        UtilsService.cleanSessionStorage('counterpartSupportId');
        this.addNewsStatus = true;
      },
      // 重置
      resert() {
        this.newsType = '全部';
        this.newsTitle = '';
        this.queryAllNews();
      },
      fmtDate(obj) {
        var date = new Date(obj);
        var y = 1900 + date.getYear();
        var m = '0' + (date.getMonth() + 1);
        var d = '0' + date.getDate();
        return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length);
      },
      confirm(value) {
        this.queryAllNews();
        if (value === false) {
          this.$emit('addconfirmstate', value);
        }
      },
      // 查询新闻
      queryAllNews() {
        this.currentPage = 1;
        if (this.newsType === '全部' || this.newsType === undefined) {
          counterpartSupportService.queryCounterpartSupportByTypeAndTitle('', this.newsTitle).then(result => {
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
        else {
          counterpartSupportService.queryCounterpartSupportByTypeAndTitle(this.newsType, this.newsTitle).then(result => {
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
        this.newsList = this.dataTemp.slice(_start, _end);
      },
      // 获取历史记录信息
      handleListApproveHistory() {
        // 保存取到的所有数据
        this.dataCount = this.dataTemp.length;
        if (this.dataTemp.length < this.pageSize) {
          this.newsList = this.dataTemp;
        }
        else {
          this.newsList = this.dataTemp.slice(0, this.pageSize);
        }
      }
    },
    created: function() {
      document.title = '对口支援';
      this.queryAllNews();
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

