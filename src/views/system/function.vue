<template>
  <div>
    <Card id="functioner">
      <h4 slot="title">
        <div style="height: 30px">
        <Button type="primary" icon="md-add" class="function-addbtn" style="width: 10%"
                @click="addFunction">菜单录入
        </Button>
        </div>
      </h4>
      <Col>
        <div style="margin-top: 30px;">
          <div :style="{'display': 'inline-block','vertical-align': 'top','width': parentwidth}" >
            <div>
              <Table border :columns="historyColumns" :data="functiondata" no-data-text="暂无数据"></Table>
              <Page :total="dataCount" :page-size="pageSize" show-total class="paging" show-elevator
                    @on-change="changepage"></Page>
            </div>
          </div>
          <div v-if="righttabvisible" style="width: 47%;vertical-align: top;display: inline-block;">
            <Table border width="100%":columns="childrenColumns" :data="childrenData"
                   no-data-text="暂无数据"></Table>
          </div>
        </div>
      </Col>
    </Card>
    <loading v-if='isLoading'></loading>
    <alert-message v-if="alertStates" v-on:confirmstate="getconfirm" :message="alertMessage"></alert-message>
    <function-edit v-if="functionAddState" v-on:functionconfirmstate="getstate" :functionAddState="addeditState" :functiondata="functionTransData"></function-edit>
  </div>
</template>
<script>
  import * as SystemService from '../../service/system.service';
  export default {
    created: function() {
      // 设置标题
      document.title = '菜单管理';
      this.functionListsearch();
    },
    data() {
      return {
        pageindex: 1,
        addeditState: false, // 新增还是编辑标识，新增false，编辑true
        functionTransData: {}, // 编辑传递数据
        alertStates: false,
        functionAddState: false,
        righttabvisible: false,
        isLoading: false,
        changeChildren: false,
        username: '',
        functionData: [], // 短信通知列表
        childrenData: [],
        dataCount: 0, // 初始化信息总条数
        pageSize: 15, // 每页显示多少条
        historyColumns: [
          {
            title: '菜单名称',
            key: 'functionName',
            align: 'center'
          },
          {
            title: '菜单地址',
            key: 'functionUrl',
            align: 'center'
          },
          {
            title: '菜单路径',
            key: 'functionIconStyle',
            align: 'center'
          },
          {
            title: '菜单排序',
            key: 'functionOrder',
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
                    width: '26%',
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
                    width: '26%',
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
                    width: '26%',
                    padding: '3px 3px'
                  },
                  on: {
                    click: () => {
                      this.getFunction(params.index);
                    }
                  }
                }, '子菜单')
              ]);
            }
          }
        ],
        childrenColumns: [
          {
            title: '菜单名称',
            key: 'functionName',
            align: 'center'
          },
          {
            title: '菜单地址',
            key: 'functionUrl',
            align: 'center'
          },
          {
            title: '菜单路径',
            key: 'functionIconStyle',
            align: 'center'
          },
          {
            title: '菜单排序',
            key: 'functionOrder',
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
                      this.editChildren(params.index);
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
                      this.deleteChildren(params.index);
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
        cselectedindex: '', // 选中index
        parentwidth: '100%', // 选中index
        functiondata: []
      };
    },
    methods: {
      /*
      * 菜单删除
      * 2018年4月19日10:05:16 gk
      * */
      functiondelete(id) {
        SystemService.deletefunction(id).then(response => {
          if (response.code === '0') {
            this.functionwarn('菜单删除成功！');
            this.functionListsearch();
            this.getFunction(this.selectedindex);
          }
          else {
            this.functionwarn(response.msg);
          }
        });
      },
      /*
       * 菜单列表查询
       * 2018年4月10日15:05:50 gk
       * */
      functionListsearch() {
        this.isLoading = true;
        SystemService.getFunctionlist('').then(response => {
          this.isLoading = false;
          if (response.code === '0') {
            this.functionData = response.list;
            this.handleListApproveHistory();
          }
          else {
            this.functionwarn(response.msg);
            return;
          }
        });
      },
      /*
       * 菜单列表查询
       * 2018年4月10日15:05:50 gk
       * */
      getFunction(index) {
        this.selectedindex = index;
        this.righttabvisible = true;
        this.parentwidth = '50%';
        this.isLoading = true;
        SystemService.getFunctionlist(this.functiondata[index].id).then(response => {
          this.isLoading = false;
          if (response.code === '0') {
            this.childrenData = response.list;
//            this.handleListApproveHistory();
          }
          else {
            this.functionwarn(response.msg);
            return;
          }
        });
      },
      /*
       * 编辑菜单
       * 2018年4月18日09:32:26 gk
       * */
      edit(index) {
        this.changeChildren = false;
        this.addeditState = true;
        this.functionTransData = this.functiondata[index];
        this.functionAddState = true;
      },
      /*
       * 编辑菜单
       * 2018年4月18日09:32:26 gk
       * */
      editChildren(index) {
        this.changeChildren = true;
        this.addeditState = true;
        this.functionTransData = this.childrenData[index];
        this.functionAddState = true;
      },
      /*
       * 删除菜单
       * 2018年4月13日11:08:23 gk
       * */
      delete(index) {
        this.changeChildren = false;
        this.selectedindex = index;
        this.alertMessage = '确定删除该条记录？';
        this.alertStates = true;
      },
      /*
       * 删除菜单
       * 2018年4月13日11:08:23 gk
       * */
      deleteChildren(index) {
        this.changeChildren = true;
        this.cselectedindex = index;
        this.alertMessage = '确定删除该条记录？';
        this.alertStates = true;
      },
      /*
       * 获取对话框确认信息
       * 2018年4月10日11:51:54 gk
       * */
      getconfirm(value) {
        if (value === true) {
          if (this.changeChildren === true) {
            this.functiondelete(this.childrenData[this.cselectedindex].id);
            this.changeChildren = false;
          }
          else {
            this.functiondelete(this.functionData[this.selectedindex].id);
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
          this.functionListsearch();
        }
        this.functionAddState = false;
      },
      /*
       * 新增菜单
       * 2018年4月10日15:05:50 gk
       * */
      addFunction() {
        this.righttabvisible = false;
        this.parentwidth = '100%';
        this.addeditState = false;
        this.functionAddState = true;
        this.functionTransData = {
          id: '',
          functionName: '',
          functionUrl: '',
          functionIconStyle: '',
          functionOrder: ''
        };
      },
      /*
       * 信息提示
       * 2018年4月10日09:32:25 gk
       * */
      functionwarn(msg) {
        this.$Notice.info({
          title: '信息提示：',
          desc: msg
        });
      },
      // 获取历史记录信息
      handleListApproveHistory() {
        // 保存取到的所有数据
        this.dataCount = this.functionData.length;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if (this.functionData.length < this.pageSize) {
          this.functiondata = this.functionData;
        }
        else {
          this.functiondata = this.functionData.slice(0, this.pageSize);
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
        this.functiondata = this.functionData.slice(_start, _end);
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/base/fn.scss";

  .timer {
    height: 100%;
  }

  #functioner .ivu-card-head {
    background-color: $grey8;
  }

  .ivu-btn-primary {
    width: 44%;
  }

  .function-addbtn {
    float: right;
    width: 10%;
  }

  .function-savebtn {
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
