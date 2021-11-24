<template>
  <div>
    <Card id="datasourceer">
      <h4 slot="title">
        <Input v-model="searchCondition.typegroupcode" style="width: 12%;margin-left: 2%;" placeholder="请输入字典分类编码" clearable></Input>
        <!--<Input v-model="searchCondition.typegroupname" style="width: 12%;margin-left: 2%;" placeholder="请输入字典分类名称" clearable></Input>-->
        <Button type="primary" style="width: 8%;margin-left: 3%;" icon="ios-search" @click="dicttypeListsearch">查询</Button>
      </h4>
      <Col>
      <div style="margin-top: 30px;">
      <div :style="{'display': 'inline-block','vertical-align': 'top','width': typewidth}" >
        <Button type="primary" icon="md-add" class="timertask-addbtn" style="width: 20%;margin-top: -39px;float: right;"
                @click="addDicttype">新增分类
        </Button>
        <div>
        <Table border width="100%" :columns="dicttypeColumns" :data="dicttypedata" no-data-text="暂无数据"></Table>
        <Page :total="groupCount" :page-size="pageSize" show-total class="paging" show-elevator
              @on-change="changepage"></Page>
        </div>
      </div>
      <div v-if="righttabvisible" style="width: 47%;vertical-align: top;display: inline-block;">
        <Button type="primary" icon="md-add" class="timertask-addbtn" style="width: 20%;margin-top: -39px;"
                @click="addDictdetail">新增类型
        </Button>
        <Table border width="100%":columns="dictdetailColumns" :data="dictdetailData"
               no-data-text="暂无数据"></Table>
      </div>
      </div>
      </Col>
    </Card>
    <loading v-if='isLoading'></loading>
    <alert-message v-if="alertStates" v-on:confirmstate="getconfirm" :message="alertMessage"></alert-message>
    <dictgroup-edit v-if="dictgroupAddState" v-on:taskconfirmstate="getstate" :dictgroupAddState="addeditState" :typegroupdata="typegroupTransData"></dictgroup-edit>
    <dictdetail-edit v-if="dictdetailAddState" v-on:taskconfirmstate="getstate" :dictdetailAddState="addeditState" :typedetaildata="typedetailTransData"></dictdetail-edit>
  </div>
</template>
<script>
  import * as SystemService from '../../service/system.service';
//  import * as BaseInfoService from '../../service/baseinfo.service';
  export default {
    created: function() {
      // 设置标题
      document.title = '字典管理';
      this.dicttypeListsearch();
    },
    data() {
      return {
        righttabvisible: false,
        pageindex: 1,
        searchCondition: {
          typegroupcode: '',
          typegroupname: ''
        }, // 一级科室查询条件
        addeditState: false, // 新增还是编辑标识，新增false，编辑true
        typegroupTransData: {}, // 编辑传递数据
        typedetailTransData: {}, // 编辑传递数据
        alertStates: false,
        detailDelete: false,
        dictgroupAddState: false,
        dictdetailAddState: false,
        isLoading: false,
        typewidth: '100%',
        detialwidth: '0%',
        detailshow: 'none',
        username: '',
        groupCount: 0, // 初始化信息总条数
        pageSize: 15, // 每页显示多少条
        dicttypeColumns: [
          {
            title: '字典名称',
            key: 'typegroupname',
            align: 'center'
          },
          {
            title: '字典code',
            key: 'typegroupcode',
            align: 'center'
          },
          {
            title: '数据操作',
            key: 'id',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    width: '22%',
                    padding: '3px 3px'
                  },
                  on: {
                    click: () => {
                      this.edit(params.index);
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    width: '22%',
                    padding: '3px 3px'
                  },
                  on: {
                    click: () => {
                      this.delete(params.index);
                    }
                  }
                }, '删除'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    width: '28%',
                    padding: '3px 3px'
                  },
                  on: {
                    click: () => {
                      this.queryDictdetail(params.index);
                    }
                  }
                }, '查看类型')
              ]);
            }
          }
        ],
        dictdetailColumns: [
          {
            title: '类型名称',
            key: 'typename',
            align: 'center'
          },
          {
            title: '类型编码',
            key: 'typecode',
            align: 'center'
          },
          {
            title: '数据操作',
            key: 'typepid',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    width: '26%',
                    padding: '3px 3px'
                  },
                  on: {
                    click: () => {
                      this.editDetail(params.index);
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    width: '26%',
                    padding: '3px 3px'
                  },
                  on: {
                    click: () => {
                      this.deleteDetail(params.index);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        table1: {
          hasDragged: false,
          isDragging: false,
          oldIndex: 0,
          newIndex: 0,
          draggingRecord: []
        },
        selectedindex: '', // 选中index
        selecteddetailindex: '', // 选中index
        changeQueueList: [], // 更改排序后一页的数据排列
        dictdetailData: [], // 字典类型
        dicttypedata: [], // 字典类型
        loadGroup: true, // 字典类型
        dicttypeData: []
      };
    },
    methods: {
      /*
      * 任务删除
      * 2018年4月19日10:05:16 gk
      * */
      taskdelete() {
        SystemService.deleteDictgroup(this.dicttypedata[this.selectedindex].id).then(response => {
          if (response.code === '0') {
            this.taskwarn('任务删除成功！');
            this.dicttypeListsearch();
          }
          else {
            this.taskwarn(response.msg);
          }
        });
      },
      /*
      * 任务删除
      * 2018年4月19日10:05:16 gk
      * */
      taskdeleteDetail() {
        SystemService.deleteDictdetail(this.dictdetailData[this.selecteddetailindex].id).then(response => {
          if (response.code === '0') {
            this.taskwarn('任务删除成功！');
            this.queryDictdetail(this.selectedindex);
          }
          else {
            this.taskwarn(response.msg);
          }
        });
      },
      /*
       * 任务列表查询
       * 2018年4月10日15:05:50 gk
       * */
      dicttypeListsearch() {
        this.isLoading = true;
        SystemService.getDicttypelist(this.searchCondition).then(response => {
          this.isLoading = false;
          if (response.code === '0') {
            this.dicttypeData = response.list;
            this.handleListApproveHistory();
          }
          else {
            this.taskwarn(response.msg);
            return;
          }
        });
      },
      /*
       * 查询字典类型
       * 2018年4月10日15:05:50 gk
       * */
      queryDictdetail(index) {
        this.righttabvisible = true;
        this.isLoading = true;
        this.typewidth = '50%';
        this.detailshow = 'inline-block';
        this.isLoading = false;
        this.selectedindex = index;
        SystemService.getDictdetaillist(this.dicttypedata[index].id).then(response => {
          this.isLoading = false;
          if (response.code === '0') {
            this.dictdetailData = response.list;
          }
          else {
            this.taskwarn(response.msg);
            return;
          }
        });
      },
      /*
       * 编辑分类
       * 2018年4月18日09:32:26 gk
       * */
      edit(index) {
        this.addeditState = true;
        this.typegroupTransData = this.dicttypedata[index];
        this.dictgroupAddState = true;
        this.typewidth = '100%';
        this.righttabvisible = false;
      },
      /*
       * 编辑分类
       * 2018年4月18日09:32:26 gk
       * */
      editDetail(index) {
        this.addeditState = true;
        this.typedetailTransData = this.dictdetailData[index];
        this.dictdetailAddState = true;
      },
      /*
       * 删除
       * 2018年4月13日11:08:23 gk
       * */
      delete(index) {
        this.selectedindex = index;
        this.alertMessage = '确定删除该条记录？';
        this.alertStates = true;
      },
      /*
       * 删除
       * 2018年4月13日11:08:23 gk
       * */
      deleteDetail(index) {
        this.selecteddetailindex = index;
        this.detailDelete = true;
        this.alertMessage = '确定删除该条记录？';
        this.alertStates = true;
      },
      /*
       * 获取对话框确认信息
       * 2018年4月10日11:51:54 gk
       * */
      getconfirm(value) {
        if (value === true) {
          if (this.detailDelete === true) {
            this.taskdeleteDetail();
            this.detailDelete = false;
          }
          else {
            this.taskdelete();
          }
        }
        this.alertStates = false;
      },
      /*
       * 获取添加窗口关闭状态
       * 2018年4月13日09:40:54 gk
       * */
      getstate(value) {
        if (value) {
          if (this.righttabvisible) {
            this.queryDictdetail(this.selectedindex);
          }
          else {
            this.dicttypeListsearch();
          }
        }
        this.dictgroupAddState = false;
        this.dictdetailAddState = false;
      },
      /*
       * 新增字典分类
       * 2018年4月10日15:05:50 gk
       * */
      addDicttype() {
        this.addeditState = false;
        this.dictgroupAddState = true;
        this.typewidth = '100%';
        this.righttabvisible = false;
        this.detailshow = 'none';
        this.typegroupTransData = {
          id: '',
          typegroupcode: '',
          typegroupname: '',
          createDate: '',
          createName: ''
        };
      },
      /*
       * 新增字典类型明细
       * 2018年4月10日15:05:50 gk
       * */
      addDictdetail() {
        this.addeditState = false;
        this.dictdetailAddState = true;
        this.typedetailTransData = {
          id: '',
          typegroupid: this.dicttypedata[this.selectedindex].id,
          typegroupcode: '',
          typegroupname: '',
          createDate: '',
          createName: ''
        };
      },
      /*
       * 信息提示
       * 2018年4月10日09:32:25 gk
       * */
      taskwarn(msg) {
        this.$Notice.info({
          title: '信息提示：',
          desc: msg
        });
      },
      /*
       * 删除选中行
       * 2018年4月2日15:44:05 gk
       * */
      remove(index) {
        this.alertMessage = '确定删除该条记录？';
        this.alertStates = true;
      },
      // 获取历史记录信息
      handleListApproveHistory() {
        // 保存取到的所有数据
        this.groupCount = this.dicttypeData.length;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if (this.dicttypeData.length < this.pageSize) {
          this.dicttypedata = this.dicttypeData;
        }
        else {
          this.dicttypedata = this.dicttypeData.slice(0, this.pageSize);
        }
      },
      /*
       * 翻页
       * 2018年4月16日10:12:23 gk
       * */
      changepage(index) {
        this.pageindex = index;
        var _start = (index - 1) * this.pageSize;
        var _end = index * this.pageSize;
        this.dicttypedata = this.dicttypeData.slice(_start, _end);
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/base/fn.scss";

  .timer {
    height: 100%;
  }

  #datasourceer .ivu-card-head {
    background-color: $grey8;
  }

  .ivu-btn-primary {
    width: 44%;
  }

  .timertask-addbtn {
    float: right;
    width: 10%;
  }

  .timertask-savebtn {
    float: right;
    width: 10%;
  }

  .timer-usersearch {
    display: inline-block;
    width: 20%;
  }

  .timer-iview-date {
    width: 18%;
  }

  .date-sel {
    font-family: "Microsoft YaHei";
    font-size: 15px;
    padding-left: 4%;
    cursor: pointer;
  }

  .paging {
    margin-top: 10px;
  }

  .ivu-table tr {
    height: 30px;
  }
</style>
