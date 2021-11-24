<template>
  <div>
    <Card id="userMessage">
      <h4 slot="title">
        <div style="height: 30px">
        <Input v-model="timertaskCondition.userName" placeholder="用户名" style="width: 15%;" clearable></Input>
          <div class="firstUser-btn">
            <Button type="primary" icon="md-add" class="timertask-addbtn" style="width: 44%"
                    @click="addDatasource">新增
            </Button>
            <Button type="primary" style="width: 44%" icon="ios-search"
                    @click="firstUserListsearch">查询
            </Button>
          </div>
        </div>
      </h4>
      <div class="userlist-twodiv">
        <Table id="apptab" border :columns="historyColumns" :data="userMessagedata" no-data-text="暂无数据"></Table>
        <Page :total="dataCount" :page-size="pageSize" show-total class="paging" show-elevator show-sizer :page-size-opts="[15,30,50,100]"
              @on-change="changepage" @on-page-size-change="changgepagesize"></Page>
      </div>
    </Card>
    <loading v-if='isLoading'></loading>
    <alert-message v-if="alertStates" v-on:confirmstate="getconfirm" :message="alertMessage"></alert-message>
    <userMessage-edit v-if="usermessageAddState" v-on:userconfirmstate="getstate" :usermessageAddState="addeditState" :userMessagedata="usermessageTransData"></userMessage-edit>
    <userMessage-editMessage v-if="usermessageeditState" v-on:userconfirmstate="getstate" :userMessagedata="userMessageData"></userMessage-editMessage>
    <userMessage-editPs v-if="usermessageToEditPs" v-on:userconfirmstate="getstate" :userMessagedata="userMessageData"></userMessage-editPs>
  </div>
</template>
<script>
  import * as SystemService from '../../service/system.service';
  import UserDelDel from '../../components/userToEdit.vue';
  import UserMessageEdit from '../../components/userMessageEdit';
//  import * as BaseInfoService from '../../service/baseinfo.service';
  export default {
    components: {
      UserMessageEdit,
      UserDelDel},
    created: function() {
      // 设置标题
      document.title = '用户管理';
      this.firstUserListsearch();
    },
    data() {
      return {
        pageindex: 1,
        timertaskCondition: {
          userName: ''
        }, // 一级科室查询条件
        addeditState: false, // 新增还是编辑标识，新增false，编辑true
        usermessageTransData: {}, // 编辑传递数据
        alertStates: false,
        usermessageAddState: false,
        usermessageeditState: false,
        usermessageToEditPs: false,
        isLoading: false,
        userMessageData: [],
        dataCount: 0, // 初始化信息总条数
        pageSize: 15, // 每页显示多少条
        historyColumns: [
          {
            title: '用户名',
            key: 'userName',
            align: 'center'
          },
          {
            title: '真实姓名',
            key: 'realName',
            ellipsis: true,
            align: 'center'
          },
          {
            title: '角色',
            key: 'userKey',
            align: 'center'
          },
          {
            title: '院区',
            key: 'hosIdName',
            align: 'center'
          },
          {
            title: '操作',
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
                    width: '25%',
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
                    width: '25%',
                    padding: '3px 3px'
                  },
                  on: {
                    click: () => {
                      this.editPassword(params.index);
                    }
                  }
                }, '密码重置'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    width: '25%',
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
        selectedindex: '', // 选中index
        changeQueueList: [], // 更改排序后一页的数据排列
        hosareacollections: [], // 院区集合
        hosarwaid: '', // 院区id
        area: [],
        userMessagedata: []
      };
    },
    methods: {
      /*
      * 删除
      * 2018年4月19日10:05:16 gk
      * */
      taskdelete() {
        let param = {
          id: this.userMessagedata[this.selectedindex].id,
          userName: this.userMessagedata[this.selectedindex].userName
        };
        SystemService.deleteUser(param).then(response => {
          if (response.code === '0') {
            this.taskwarn('用户删除成功！');
            this.firstUserListsearch();
          }
          else {
            this.taskwarn(response.msg);
          }
        });
      },
      /*
       * 查询
       * 2018年4月10日15:05:50 gk
       * */
      firstUserListsearch() {
        this.isLoading = true;
        SystemService.getUserlist(this.timertaskCondition).then(response => {
          this.isLoading = false;
          if (response.code === '0') {
            this.userMessageData = response.list;
            this.handleListApproveHistory();
          }
          else {
            this.taskwarn(response.msg);
            return;
          }
        });
      },
      /*
       * 编辑
       * 2018年4月18日09:32:26 gk
       * */

      edit(index) {
        this.userMessageData = this.userMessagedata[index];
        this.usermessageeditState = true;
      },
      editPassword(index) {
        this.userMessageData = this.userMessagedata[index];
        this.usermessageToEditPs = true;
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
          this.firstUserListsearch();
        }
        this.usermessageAddState = false;
        this.usermessageeditState = false;
        this.usermessageToEditPs = false;
      },
      /*
       * 新增
       * 2018年4月10日15:05:50 gk
       * */
      addDatasource() {
        this.addeditState = false;
        this.usermessageAddState = true;
        this.usermessageTransData = {
          id: '',
          userName: '',
          realName: '',
          userkey: '',
          mobilePhone: '',
          job_number: '',
          hosName: '',
          email: '',
          hosId: '',
          roleCode: ''
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
        // 替换状态值
        this.replaceState();
        // 保存取到的所有数据
        this.dataCount = this.userMessageData.length;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if (this.userMessageData.length < this.pageSize) {
          this.userMessagedata = this.userMessageData;
        }
        else {
          this.userMessagedata = this.userMessageData.slice(0, this.pageSize);
        }
      },
      /*
       * 替换状态值
       * 2018年4月16日10:12:50 gk
       * */
      replaceState() {
        for (let data of this.userMessageData) {
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
        this.userMessagedata = this.userMessageData.slice(_start, _end);
      },
      changgepagesize(value) {
        this.pageSize = value;
        this.handleListApproveHistory();
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/base/fn.scss";

  .timer {
    height: 100%;
  }

  #userMessage .ivu-card-head {
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
  .firstUser-btn {
    display: inline-block;
    float: right;
    width: 18%;
  }
  .userlist-twodiv {
    margin-top: 16px;
  }
</style>
