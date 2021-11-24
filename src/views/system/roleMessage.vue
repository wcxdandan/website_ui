<template>
  <div>
    <Card id="roleMessage">
      <h4 slot="title">
        <Input v-model="timertaskCondition.roleName" placeholder="请输入角色名称" style="width: 15%;" clearable></Input>
        <Button type="primary"   icon="ios-search" style="width: 10%;display: inline-block;"
                @click="firstUserListsearch">查询
        </Button>
      </h4>
      <Col>
      <div style="margin-top: 30px;">
        <div :style="{'display': 'inline-block','vertical-align': 'top','width': typewidth}" >
          <Button type="primary" icon="md-add" class="timertask-addbtn" style="width: 10%;margin-top: -39px;"
                  @click="addRoleMsg">新增
          </Button>
          <div>
            <Table  border :columns="historyColumns" :data="roleMessagedata" no-data-text="暂无数据"></Table>
            <Page :total="dataCount" :page-size="pageSize" show-total class="paging" show-elevator
                  @on-change="changepage"></Page>
          </div>
        </div>
        <div v-if="righttabvisible" style="width: 47%;vertical-align: top;display: inline-block;">
          <!--<Button type="primary" icon="ios-filing" class="firstUser-btn" style="width: 10%;margin-top: -39px"-->
                  <!--@click="addDictdetail">新增-->
          <!--</Button>-->
          <Table border :columns="roleuserColumns" :data="roleUserData" no-data-text="暂无数据"></Table>
        </div>
        <div v-if="functiontabvisible" style="width: 47%;vertical-align: top;display: inline-block;padding-left: 50px;">
          <Button type="primary" icon="plus" class="timertask-addbtn" style="width: 10%;margin-top: -39px;"
                  @click="saveRoleFunction">保存
          </Button>
          <Tree :data="roleFunctionData" selected show-checkbox multiple :render="renderContent" ref="functionTree"></Tree>
        </div>
      </div>
      </Col>
    </Card>
    <loading v-if='isLoading'></loading>
    <alert-message v-if="alertStates" v-on:confirmstate="getconfirm" :message="alertMessage"></alert-message>
    <roleMgs-Insert v-if="usermessageAddState" v-on:userconfirmstate="getstate" :roleMessagedata="rolemessageTransData"></roleMgs-Insert>
    <roleMgs-Edit v-if="usermessageeditState" v-on:userconfirmstate="getstate" :roleMessagedataToEdit="userMessageData"></roleMgs-Edit>
  </div>
</template>
<script>
  import * as SystemService from '../../service/system.service';
  import UserDelDel from '../../components/userToEdit.vue';
  import UserMessageEdit from '../../components/userMessageEdit';
  import RoleMgsEdit from '../../components/roleToEdit';
//  import * as BaseInfoService from '../../service/baseinfo.service';
  export default {
    components: {
      RoleMgsEdit,
      UserMessageEdit,
      UserDelDel},
    created: function() {
      // 设置标题
      document.title = '角色管理';
      this.firstUserListsearch();
    },
    data() {
      return {
        righttabvisible: false,
        functiontabvisible: false,
        pageindex: 1,
        timertaskCondition: {
          roleName: ''
        }, // 查询条件
        addeditState: false, // 新增还是编辑标识，新增false，编辑true
        rolemessageTransData: {}, // 编辑传递数据
        alertStates: false,
        usermessageAddState: false,
        usermessageeditState: false,
        usermessageToEditPs: false,
        typewidth: '100%',
        detialwidth: '0%',
        detailshow: 'none',
        isLoading: false,
        userMessageData: [],
        roleUserData: [],
        roleFunctionData: [],
        dataCount: 0, // 初始化信息总条数
        pageSize: 15, // 每页显示多少条
        historyColumns: [
          {
            title: '编码',
            key: 'roleCode',
            align: 'center'
          },
          {
            title: '名称',
            key: 'roleName',
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
                    width: '16%',
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
                    width: '16%',
                    padding: '3px 3px'
                  },
                  on: {
                    click: () => {
                      this.queryRoleOfUser(params.index);
                    }
                  }
                }, '用户'),
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
                      this.queryRoleFunction(params.index);
                    }
                  }
                }, '权限管理'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    width: '16%',
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
        roleuserColumns: [
          {
            title: '用户名',
            key: 'userName',
            align: 'center'
          },
          {
            title: '真实姓名',
            key: 'realName',
            align: 'center'
          }
        ],
        selectedindex: '', // 选中index
        changeQueueList: [], // 更改排序后一页的数据排列
        hosareacollections: [], // 院区集合
        hosarwaid: '', // 院区id
        area: [],
        roleMessagedata: []
      };
    },
    methods: {
      /*
      * 删除
      * 2018年4月19日10:05:16 gk
      * */
      taskdelete() {
        let param = {
          id: this.roleMessagedata[this.selectedindex].id
        };
        SystemService.deleteRole(param).then(response => {
          if (response.code === '0') {
            this.taskwarn('角色删除成功！');
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
        SystemService.getRoleList(this.timertaskCondition).then(response => {
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
      queryRoleOfUser(index) {
        this.righttabvisible = true;
        this.functiontabvisible = false;
        this.typewidth = '50%';
        this.detailshow = 'inline-block';
        this.selectedindex = index;
        this.isLoading = true;
        SystemService.getRoleOfUser(this.roleMessagedata[index].id).then(response => {
          this.isLoading = false;
          if (response.code === '0') {
            this.roleUserData = response.list;
            this.handleListApproveHistory();
          }
          else {
            this.taskwarn(response.msg);
            return;
          }
        });
      },
      queryRoleFunction(index) {
        this.functiontabvisible = true;
        this.righttabvisible = false;
        this.typewidth = '50%';
        this.detailshow = 'inline-block';
        this.selectedindex = index;
        this.isLoading = true;
        SystemService.getRoleFunction(this.roleMessagedata[index].id).then(response => {
          this.isLoading = false;
          if (response.code === '0') {
            this.roleFunctionData = response.list;
          }
          else {
            this.taskwarn(response.msg);
            return;
          }
        });
      },
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
       * 编辑
       * 2018年4月18日09:32:26 gk
       * */

      edit(index) {
        this.userMessageData = this.roleMessagedata[index];
        this.usermessageeditState = true;
      },
      editPassword(index) {
        this.userMessageData = this.roleMessagedata[index];
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
      addRoleMsg() {
        this.addeditState = false;
        this.usermessageAddState = true;
        this.rolemessageTransData = {
          id: '',
          roleName: '',
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
          this.roleMessagedata = this.userMessageData;
        }
        else {
          this.roleMessagedata = this.userMessageData.slice(0, this.pageSize);
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
        this.roleMessagedata = this.userMessageData.slice(_start, _end);
      },
      changgepagesize(value) {
        this.pageSize = value;
        this.handleListApproveHistory();
      },
      renderContent(h, { root, node, data }) {
        let level = data.level;
        let iclass = '';
        if (level === '1') {
          iclass = 'folder';
        }
        else {
          iclass = 'document';
        }
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%'
          }
        }, [
          h('span', [
            h('Icon', {
              props: {
                type: iclass,
                size: 16
              },
              style: {
                marginRight: '8px'
              }
            }),
            h('span', data.title)
          ])
        ]);
      },
      saveRoleFunction() {
        let choicesAll = this.$refs.functionTree.getCheckedNodes();
        let param = {
          roleId: this.roleMessagedata[this.selectedindex].id,
          selected: choicesAll
        };
        SystemService.saveRoleFunction(param).then(response => {
          if (response.code === '0') {
            this.taskwarn('保存成功！');
          }
          else {
            this.taskwarn(response.msg);
          }
        });
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
