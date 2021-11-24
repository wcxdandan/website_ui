<template>
  <div>
    <Card id="datasourceer">
      <h4 slot="title">
        <div style="height: 30px">
        <Button type="primary" icon="md-add" class="timertask-addbtn" style="width: 10%"
                @click="addDatasource">新增
        </Button>
        </div>
      </h4>
      <Col>
      <Table border :columns="historyColumns" :data="datasourcedata" no-data-text="暂无数据"></Table>
      <Page :total="dataCount" :page-size="pageSize" show-total class="paging" show-elevator
            @on-change="changepage"></Page>
      </Col>
    </Card>
    <loading v-if='isLoading'></loading>
    <alert-message v-if="alertStates" v-on:confirmstate="getconfirm" :message="alertMessage"></alert-message>
    <datasource-edit v-if="datasorceAddState" v-on:taskconfirmstate="getstate" :datasorceAddState="addeditState" :datasourcedata="datasorceTransData"></datasource-edit>
  </div>
</template>
<script>
  import * as SystemService from '../../service/system.service';
//  import * as BaseInfoService from '../../service/baseinfo.service';
  export default {
    created: function() {
      // 设置标题
      document.title = '多数据源管理';
      this.datasourceListsearch();
    },
    data() {
      return {
        pageindex: 1,
        timertaskCondition: {
          deptName: '',
          hosArea: ''
        }, // 一级科室查询条件
        addeditState: false, // 新增还是编辑标识，新增false，编辑true
        datasorceTransData: {}, // 编辑传递数据
        alertStates: false,
        datasorceAddState: false,
        isLoading: false,
        username: '',
        datasourceData: [], // 短信通知列表
        dataCount: 0, // 初始化信息总条数
        pageSize: 15, // 每页显示多少条
        historyColumns: [
          {
            title: '多数据源主键',
            key: 'dbKey',
            align: 'center'
          },
          {
            title: '描述',
            key: 'description',
            align: 'center'
          },
          {
            title: '驱动',
            key: 'driverClass',
            align: 'center'
          },
          {
            title: 'url',
            key: 'url',
            ellipsis: true,
            align: 'center'
          },
          {
            title: '用户名',
            key: 'dbUser',
            align: 'center'
          },
          {
            title: '密码',
            key: 'dbPassword',
            ellipsis: true,
            align: 'center'
          },
          {
            title: '数据库类型',
            key: 'dbType',
            align: 'center'
          },
          {
            title: '数据库名称',
            key: 'dbName',
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
                    width: '46%',
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
                    width: '46%',
                    padding: '3px 3px'
                  },
                  on: {
                    click: () => {
                      this.delete(params.index);
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
        changeQueueList: [], // 更改排序后一页的数据排列
        hosareacollections: [], // 院区集合
        hosarwaid: '', // 院区id
        area: [],
        datasourcedata: []
      };
    },
    methods: {
      /*
       * 任务列表查询
       * 2018年4月10日15:05:50 gk
       * */
      datasourceListsearch() {
        this.isLoading = true;
        SystemService.getDatasourcelist().then(response => {
          this.isLoading = false;
          if (response.code === '0') {
            this.datasourceData = response.list;
            this.handleListApproveHistory();
          }
          else {
            this.taskwarn(response.msg);
            return;
          }
        });
      },
      /*
       * 立即执行
       * 2018年4月18日09:34:22 gk
       * */
      done(index) {
        this.tasktrigger(index);
      },
      /*
       * 编辑任务
       * 2018年4月18日09:32:26 gk
       * */
      edit(index) {
        this.addeditState = true;
        this.datasorceTransData = this.datasourcedata[index];
        this.datasorceAddState = true;
      },
      /*
       * 删除一级科室
       * 2018年4月13日11:08:23 gk
       * */
      delete(index) {
        this.selectedindex = index;
        this.alertMessage = '确定删除该条记录？';
        this.alertStates = true;
      },
      /*
       * 获取对话框确认信息
       * 2018年4月10日11:51:54 gk
       * */
      getconfirm(value) {
        if (value === true) {
          this.taskdelete();
        }
        this.alertStates = false;
      },
      /*
       * 获取添加窗口关闭状态
       * 2018年4月13日09:40:54 gk
       * */
      getstate(value) {
        if (value) {
          this.datasourceListsearch();
        }
        this.datasorceAddState = false;
      },
      /*
       * 新增任务
       * 2018年4月10日15:05:50 gk
       * */
      addDatasource() {
        this.addeditState = false;
        this.datasorceAddState = true;
        this.datasorceTransData = {
          id: '',
          dbKey: '',
          description: '',
          driverClass: '',
          url: '',
          dbUser: '',
          dbPassword: '',
          dbType: '',
          dbName: ''
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
//        this.datasourcedata.splice(index, 1);
//        this.historyColumns = this.historyColumns.filter(data => data.key !== 'shenpistatus'); // 筛选数据
      },
      // 获取历史记录信息
      handleListApproveHistory() {
        // 替换状态值
        this.replaceState();
        // 保存取到的所有数据
        this.dataCount = this.datasourceData.length;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if (this.datasourceData.length < this.pageSize) {
          this.datasourcedata = this.datasourceData;
        }
        else {
          this.datasourcedata = this.datasourceData.slice(0, this.pageSize);
        }
      },
      /*
       * 替换状态值
       * 2018年4月16日10:12:50 gk
       * */
      replaceState() {
        for (let data of this.datasourceData) {
          data.triggerStateNEW = data.triggerState;
          if (data.triggerStateNEW === 'PAUSED') {
            data.triggerStateNEW = '暂停';
          }
          else {
            data.triggerStateNEW = '运行中';
          }
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
        this.datasourcedata = this.datasourceData.slice(_start, _end);
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
