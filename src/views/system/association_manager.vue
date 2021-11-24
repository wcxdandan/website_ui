<template>
  <div>
    <Card id="association_manager">
      <h4 slot="title">
        <Select id="zhifufangshi"  clearable style="width: 15%;" placeholder="请选择类型" v-model="newsType">
          <Option value="全部">全部分类</Option>
          <Option value="XHJJ">协会简介</Option>
          <Option value="XHZC">协会章程</Option>
          <Option value="FWGY">服务公约</Option>
          <Option value="associationLeader">协会领导</Option>
          <Option value="ZZJG">组织机构</Option>
          <Option value="glbf">管理办法</Option>
          <Option value="associationDepartment">职能部门</Option>
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
    <add-AssociationIntroduce v-if="addNewsStatus" v-on:addconfirmstate="getAddNewsStatus"></add-AssociationIntroduce>
    <alert-message v-if="alertStates" v-on:confirmstate="getconfirm" :message="alertMessage"></alert-message>
  </div>
</template>
<script type="text/javascript">
  import * as associationIntroduceService from '../../service/associationIntroduceService';
  import * as UtilsService from '../../utils/utilsService';
  export default {
    data() {
      return {
        alertStates: false,
        addNewsStatus: false,
        alertMessage: '',
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
            title: '类型',
            key: 'typeName',
            align: 'center'
          },
          {
            title: '标题',
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
              if (this.newsList[params.index].isRelease === '1' || this.newsList[params.index].isRelease === '3') {
                temp = h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    float: 'left',
                    width: '25%',
                    padding: '3px 3px',
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
                    float: 'left',
                    marginRight: '5px',
                    width: '25%',
                    padding: '3px 3px'
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
                    float: 'left',
                    width: '25%',
                    padding: '3px 3px'
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
        if (value === true) {
          let deleteId = UtilsService.getSessionStorage('deleteIndex');
          let id = UtilsService.getSessionStorage('id');
          if (id === null) {
            this.deleteNews(deleteId);
          }
          else {
            this.releaseNews();
          }
          this.confirm(false);
        }
        this.alertStates = false;
      },
      release(index) {
        this.alertStates = true;
        this.alertMessage = '是否发布信息？';
        UtilsService.cleanSessionStorage('id');
        UtilsService.setSessionStorage('id', this.newsList[index].id);
      },
      getAddNewsStatus() {
        UtilsService.cleanSessionStorage('associationList');
        this.addNewsStatus = false;
        this.queryAllNews();
      },
      editNews(index) {
        this.addNewsStatus = true;
        UtilsService.cleanSessionStorage('associationList');
        UtilsService.setSessionStorage('associationList', this.newsList[index]);
      },
      deleteMsg(index) {
        this.alertStates = true;
        this.alertMessage = '您确定删除该条信息吗？';
        UtilsService.cleanSessionStorage('deleteIndex');
        UtilsService.setSessionStorage('deleteIndex', index);
      },
      deleteNews(index) {
        associationIntroduceService.deleteAssociation(this.newsList[index].id).then(result => {
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
        UtilsService.cleanSessionStorage('associationList');
        this.addNewsStatus = true;
      },
      // 重置
      resert() {
        this.newsType = '全部';
        this.newsTitle = '';
        this.queryAllNews();
      },
      confirm(value) {
        if (value === false) {
          this.$emit('addconfirmstate', value);
        }
      },
      releaseNews() {
        let id = UtilsService.getSessionStorage('id');
        associationIntroduceService.releaseInfo(id).then(result => {
          if (result.code === '0') {
            UtilsService.cleanSessionStorage('id');
            this.alertMsg('发布成功');
            this.queryAllNews();
          }
          else {
            this.alertMsg(result.msg);
          }
        });
      },
      // 查询新闻
      queryAllNews() {
        this.currentPage = 1;
        if (this.newsType === '全部' || this.newsType === undefined) {
          associationIntroduceService.queryAssociationByAssociationTypeAndTitle('', this.newsTitle).then(result => {
            if (result.code === '0') {
              this.dataTemp = result.list;
              this.handleListApproveHistory();
            }
            else {
              this.alertMsg(result.msg);
            }
          });
        }
        else {
          associationIntroduceService.queryAssociationByAssociationTypeAndTitle(this.newsType, this.newsTitle).then(result => {
            if (result.code === '0') {
              this.dataTemp = result.list;
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
      document.title = '协会管理';
      this.queryAllNews();
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/base/fn";
  #association_manager .ivu-card-head {
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
