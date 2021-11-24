<template>
  <div>
    <Card id="association_manager">
      <h4 slot="title">
        <Select id="zhifufangshi" style="width: 8%;" placeholder="请选择协会类型" v-model="bracchCategory">
          <Option value="全部">全部分类</Option>
          <Option value="zkysfh">专科医师分会</Option>
          <Option value="hydw">会员单位</Option>
          <Option value="dfysxh">地方医师协会</Option>
        </Select>
       <!-- <Select  style="width: 8%;" placeholder="请选择协会分类" v-model="newsType" v-if="showSelectStatus">
          <Option value="全部">全部类型</Option>
          <Option v-for="item in dataTemp" :value="item.id" :key="item.id">{{ item.typeName }}</Option>
        </Select>-->
        <Button class="resetData" type="primary" style="width: 10%;float: right;margin-left: 34%;" @click="resert">重置</Button>
        <Button v-if="showSelectStatus" class="searchData" type="primary" style="width: 9%;float: right;margin-left: 2%;" @click="queryBranchVipList">查询</Button>
      </h4>
      <div style="margin-top: 30px;">
        <div :style="{'display': 'inline-block','vertical-align': 'top','width': typewidth}" >
          <div>
            <Table border width="100%" :columns="historyColumns" :data="newTypeList" no-data-text="暂无数据"></Table>
            <Page :total="dataCount" :page-size="pageSize" show-total class="paging" show-elevator
                  @on-change="changepage" :current="currentPage"></Page>
          </div>
        </div>
        <div v-if="righttabvisible" style="width: 49.5%;vertical-align: top;display: inline-block;">
          <Button type="primary" icon="md-add" class="timertask-addbtn" style="width: 20%;margin-top: -39px;"
                  @click="addNews">新增
          </Button>
          <Table border width="100%" :columns="secondListColumns" :data="secondListData"
                 no-data-text="暂无数据"></Table>
          <Page :total="secondDataCount" :page-size="secondPageSize" show-total class="paging" show-elevator
                @on-change="secondesChangepage" :current="secondCurrentPage"></Page>
        </div>
      </div>
    </Card>
    <loading v-if="isLoading"></loading>
    <add-branchVip v-if="addNewsStatus" v-on:addconfirmstate="getAddNewsStatus"></add-branchVip>
    <alert-message v-if="alertStates" v-on:confirmstate="getconfirm" :message="alertMessage"></alert-message>
  </div>
</template>
<script type="text/javascript">
  import * as associationIntroduceService from '../../service/associationIntroduceService';
  import * as branchVipService from '../../service/branchVipService';
  import * as UtilsService from '../../utils/utilsService';
  export default {
    data() {
      return {
        pageStatus: false,
        selectedindex: '', // 选中的index
        typewidth: '100%',
        righttabvisible: false,
        showSelectStatus: false,
        bracchCategory: '全部', // 协会类型
        alertStates: false,
        addNewsStatus: false,
        alertMessage: '',
        dataCount: 0, // 初始化信息总条数
        secondDataCount: 0,
        pageSize: 10, // 每页显示多少条
        secondPageSize: 10,
        currentPage: 1, // 当前页数
        secondCurrentPage: 1,
        isLoading: false,
        newTypeList: [], // 存放新闻类别list
        newTypeData: [], // 临时存放缓存数据
        newsType: '', // 新闻类型
        dataTemp: [], // 存放临时数据
        newsList: [], // 存放列表数据
        firstDataTemp: [],
        secondListData: [],
        historyColumns: [
          {
            title: '类型',
            key: 'typeGroupName',
            align: 'center'
          },
          {
            title: '类别',
            key: 'typeName',
            align: 'center'
          },
          {
            title: '操作',
            align: 'center',
            width: 200,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginLeft: '5px',
                    width: '50%',
                    padding: '3px 3px'
                  },
                  on: {
                    click: () => {
                      this.secondList(params.index); // 二级列表
                    }
                  }
                }, '列表详情')
              ]);
            }
          }
        ],
        secondListColumns: [
          {
            title: '标题',
            key: 'title',
            align: 'center'
          },
          {
            title: '是否已发布',
            key: 'isReleaseInfo',
            align: 'center'
          },
          {
            title: '操作',
            align: 'center',
            width: 200,
            render: (h, params) => {
              let temp = h('div', '');
              if (this.secondListData[params.index].isRelease === '1' || this.secondListData[params.index].isRelease === '3') {
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
    watch: {
      bracchCategory: function() {
        this.righttabvisible = false;
        this.typewidth = '100%';
        if (this.bracchCategory === '全部') {
          this.queryBracchCategory('');
          this.showSelectStatus = false;
        }
        else {
          this.queryBracchCategory(this.bracchCategory);
          this.showSelectStatus = true;
        }
      }
    },
    methods: {
      queryBranchVipList() {
        this.currentPage = 1;
        this.newTypeList = this.newTypeData;
        // this.handleListApproveHistory();
        // this.newTypeList = this.newTypeList.filter(result => result.id === this.newsType);
        this.pageStatus = true;
        this.righttabvisible = false;
        this.typewidth = '100%';
        this.handleListApproveHistory();
      },
      // 二级菜单
      secondList(index) {
        this.secondCurrentPage = 1;
        this.selectedindex = index;
        this.typewidth = '50%';
        this.righttabvisible = true;
        branchVipService.queryBranchVipInfoTypeId(this.newTypeList[index].id).then(result => {
          if (result.code === '0') {
            // this.handleListApproveHistory();
            this.firstDataTemp = result.list;
            this.secondesHandleListApproveHistory();
          }
          else {
            this.alertMsg(result.msg);
          }
        });
      },
      // 查询分会列表
      queryBracchCategory() {
        if (this.bracchCategory === '全部') {
          associationIntroduceService.queryAssociationCategory('').then(result => {
            if (result.code === '0') {
              this.dataTemp = result.list;
              this.handleListApproveHistory();
              this.newsType = this.dataTemp[0].id;
            }
            else {
              this.alertMsg(result.msg);
            }
          });
        }
        else {
          associationIntroduceService.queryAssociationCategory(this.bracchCategory).then(result => {
            if (result.code === '0') {
              this.dataTemp = result.list;
              this.newsType = this.dataTemp[0].id;
              // this.handleListApproveHistory();
            }
            else {
              this.alertMsg(result.msg);
            }
          });
        }
      },
      getconfirm(value) {
        let index = UtilsService.getSessionStorage('deleteIndex');
        let brachVipId = UtilsService.getSessionStorage('branchVipId');
        if (value === true) {
          if (brachVipId !== null) {
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
        UtilsService.cleanSessionStorage('branchVipId');
        UtilsService.setSessionStorage('branchVipId', this.secondListData[index].id);
      },
      getAddNewsStatus() {
        this.addNewsStatus = false;
        this.secondList(this.selectedindex);
      },
      editNews(index) {
        this.addNewsStatus = true;
        UtilsService.cleanLocalStorage('branchVipList');
        UtilsService.setSessionStorage('branchVipList', this.secondListData[index]);
      },
      deleteMsg(index) {
        this.alertStates = true;
        this.alertMessage = '您确定删除该条信息吗？';
        UtilsService.cleanSessionStorage('deleteIndex');
        UtilsService.setSessionStorage('deleteIndex', index);
      },
      deleteNews(index) {
        branchVipService.deleteInfo(this.secondListData[index].id).then(result => {
          if (result.code === '0') {
            this.alertMsg('删除成功');
            this.secondList(this.selectedindex);
          }
          else {
            this.alertMsg(result.msg);
          }
        });
      },
      addNews() {
        UtilsService.cleanSessionStorage('branchVipList');
        this.addNewsStatus = true;
      },
      // 重置
      resert() {
        this.bracchCategory = '全部';
      },
      confirm(value) {
        if (value === false) {
          this.$emit('addconfirmstate', value);
        }
      },
      releaseNews() {
        let id = UtilsService.getSessionStorage('branchVipId');
        branchVipService.releaseInfo(id).then(result => {
          if (result.code === '0') {
            UtilsService.cleanSessionStorage('branchVipId');
            this.alertMsg('发布成功');
            this.secondList(this.selectedindex);
          }
          else {
            this.alertMsg(result.msg);
          }
        });
      },
      alertMsg(msg) {
        this.$Notice.info({
          title: '信息提示：',
          desc: msg
        });
      },
      secondesChangepage(index) {
        var _start = (index - 1) * this.pageSize;
        var _end = index * this.pageSize;
        this.secondCurrentPage = index;
        this.secondListData = this.firstDataTemp.slice(_start, _end);
      },
      secondesHandleListApproveHistory() {
        // 保存取到的所有数据
        this.secondDataCount = this.firstDataTemp.length;
        if (this.firstDataTemp.length < this.pageSize) {
          this.secondListData = this.firstDataTemp;
        }
        else {
          this.secondListData = this.firstDataTemp.slice(0, this.pageSize);
        }
      },
      changepage(index) {
        var _start = (index - 1) * this.pageSize;
        var _end = index * this.pageSize;
        this.currentPage = index;
        this.newTypeList = this.dataTemp.slice(_start, _end);
        this.newTypeData = this.dataTemp.slice(_start, _end);
      },
      // 获取历史记录信息
      handleListApproveHistory() {
        // 保存取到的所有数据
        // if (this.pageStatus) {
        //   this.dataCount = this.newTypeList.length;
        //   if (this.newTypeList.length < this.pageSize) {
        //     this.newTypeList = this.newTypeList;
        //   }
        //   else {
        //     this.newTypeList = this.newTypeList.slice(0, this.pageSize);
        //   }
        // }
        // else {
        this.dataCount = this.dataTemp.length;
        if (this.dataTemp.length < this.pageSize) {
          this.newTypeList = this.dataTemp;
          this.newTypeData = this.dataTemp;
        }
        else {
          this.newTypeList = this.dataTemp.slice(0, this.pageSize);
          this.newTypeData = this.dataTemp.slice(0, this.pageSize);
        }
        // }
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
      document.title = '分会管理';
      this.queryBracchCategory();
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
