<template>
  <div class="usermessageEditloading" style="min-height:100vh;">
    <div class="himusermessageEdit">
      <div class="usermessageEdithead">
        <div class="headdeparte">用户管理</div>
        <div class="departesectitle">
          <div class="secdiv"></div>&nbsp;&nbsp;&nbsp;请填写用户信息</div>
      </div>
      <div class="usermessageEditbody">
        <div class="usermessageEdit-detail">
          <div class="usermessageEdit-leftdetail">用户名：</div>
          <div class="usermessageEdit-rightdetail">
            <span>{{userMessagedata.userName}} </span>
          </div>
        </div>
        <div class="usermessageEdit-detail">
          <div class="usermessageEdit-leftdetail">真实姓名：</div>
          <div class="usermessageEdit-rightdetail">
            <Input v-model="userMessagedata.realName" placeholder="请输入真实姓名" clearable></Input>
          </div>
        </div>
        <div  class="usermessageEdit-detail">
          <div class="usermessageEdit-leftdetail">角色：</div>
          <div class="usermessageEdit-rightdetail">
            <Select id="tuanduiyishengdisable" style="display: inline-block" v-model="teamUserMsg"
                    placeholder="选择角色" filterable multiple>
              <Option v-for="item in teamUserMsglist" :value="item.roleName+','+item.id" :key="item.roleName">{{ item.roleName }}</Option>
            </Select>
          </div>
        </div>
        <div  class="usermessageEdit-detail">
          <div class="usermessageEdit-leftdetail">手机号：</div>
          <div class="usermessageEdit-rightdetail">
            <Input v-model="userMessagedata.mobilePhone" placeholder="请输入手机号" clearable></Input>
          </div>
        </div>
        <div  class="usermessageEdit-detail">
          <div class="usermessageEdit-leftdetail">邮箱：</div>
          <div class="usermessageEdit-rightdetail">
            <Input v-model="userMessagedata.email" placeholder="请输入邮箱" clearable></Input>
          </div>
        </div>
        <div  class="usermessageEdit-detail">
          <div class="usermessageEdit-leftdetail">工号：</div>
          <div class="usermessageEdit-rightdetail">
            <Input v-model="userMessagedata.job_number" placeholder="请输入工号" clearable></Input>
          </div>
        </div>
        <div  class="usermessageEdit-detail">
          <div class="usermessageEdit-leftdetail">院区：</div>
          <div class="usermessageEdit-rightdetail">
            <Select  v-model="userMessagedata.hosId" clearable style="display: inline-block;width: 100%"
                    placeholder="请选择院区">
              <Option v-for="item in areaNameList" :value="item.key" :key="item.key">{{ item.value }}</Option>
            </Select>
          </div>
        </div>
      </div>
      <div class="usermessageEditfoot">
        <Button  style="width: 15%" @click="confirm(false)">取消</Button>
        <Button type="primary" style="width: 15%" @click="confirm(true)">提交</Button>
      </div>
    </div>
    <loading v-if='isLoading'></loading>
  </div>
</template>
<script type="text/javascript">
  import * as SystemService from '../service/system.service';
  import * as CommonService from '../service/commondata.service';
  export default {
    name: 'userMessage-editMessage',
    props: {
      userMessagedata: {
        id: '',
        userName: '',
        realName: '',
        userkey: '',
        mobilePhone: '',
        job_number: '',
        hosName: '',
        email: '',
        hosId: ''
      },
      datasorceAddState: false // false为预览，true为编辑
    },
    data() {
      return {
        teamUserMsg: [],
        teamUserMsglist: [],
        areaNameList: [],
        userUserKey: '',
        isLoading: false,
        sumitState: true // 提交标识
      };
    },
    created: function() {
      this.getAreaName();
      this.userMessageListsearch();
      this.queryUserRoleList();
    },
    methods: {
      /*
       * 任务数据编辑
       * 2018年4月18日16:54:50 gk
       * */
      usermessageEditdataedit() {
        if (this.teamUserMsg.length > 0) {
          for (let i = 0; i < this.teamUserMsg.length; i++) {
            this.userUserKey += this.teamUserMsg[i] + ';';
          }
          this.userMessagedata.userkey = this.userUserKey;
        }
        SystemService.insertUser(this.userMessagedata).then(response => {
          this.isLoading = false;
          if (response.code === '0') {
            this.warnDisplay('修改成功！');
            this.$emit('userconfirmstate', true);
          }
          else {
            this.warnDisplay(response.msg);
          }
        });
      },
      /*
       * 获取院区字典值
       * */
      getAreaName() {
        let params = {
          types: 'dict',
          params: 'hospitalType',
          system: ''
        };
        CommonService.getDictionary(params).then(response => {
          this.areaNameList = response;
        });
      },
      /*
       * 输入内容校验
       * 2018年4月13日16:36:49 gk
       * */
      usercheck() {
        if (this.userMessagedata.realName === '' || this.userMessagedata.realName === undefined) {
          this.sumitState = false;
          this.warnDisplay('请输入真实姓名！');
        }
        else {
          this.sumitState = true;
        }
      },
      /*
       * 信息提示
       * 2018年4月13日14:29:04 gk
       * */
      warnDisplay(departe) {
        this.$Notice.info({
          title: '信息提示：',
          desc: departe
        });
      },
      /*
       * 获取角色列表
       * */
      userMessageListsearch() {
        this.isLoading = true;
        SystemService.queryUserMessage().then(response => {
          this.isLoading = false;
          if (response.code === '0') {
            this.teamUserMsglist = response.list;
          }
          else {
            this.doctorlistmsgshow(response.msg);
            return;
          }
        });
      },
      /*
       * 获取角色列表
       * */
      queryUserRoleList() {
        this.isLoading = true;
        SystemService.queryUserRole(this.userMessagedata.id).then(response => {
          this.isLoading = false;
          if (response.code === '0') {
            for (var i = 0; i < response.list.length; i++) {
              this.teamUserMsg.push(response.list[i].roleName + ',' + response.list[i].id);
            }
          }
          else {
            this.doctorlistmsgshow(response.msg);
            return;
          }
        });
      },
      /*
       * 确认操作
       * 2018年4月10日11:49:27 gk
       * */
      confirm(value) {
        if (value) {
          this.usercheck();
          if (this.sumitState) {
            this.usermessageEditdataedit();
          }
        }
        else {
          this.$emit('userconfirmstate', value);
        }
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../assets/css/base/fn.scss";

  .usermessageEditloading {
    height: 100vh;
    width: 100vw;
    text-align: center;
    background-color: $faintBlack;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2999;
    box-sizing: content-box;
    .himusermessageEdit {
      top: 20%;
      left: 55%;
      position: fixed;
      background-color: $white;
      border: 0;
      border-radius: 6px;
      background-clip: padding-box;
      z-index: 3000;
      width: 45%;
      transform: translate(-50%, 0);
      .headdeparte {
        display: inline-block;
        width: 100%;
        height: 20px;
        line-height: 20px;
        font-size: 18px;
        color: $grey67;
        font-weight: 700;
        text-align: left;
      }
      .departesectitle {
        margin-top: 15px;
        display: inline-block;
        width: 100%;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: $grey67;
        font-weight: 700;
        text-align: left;
        .secdiv {
          vertical-align: middle;
          background-color: $blue22;
          width: 6px;
          height: 20px;
          display: inline-block;
        }
      }
      .usermessageEdithead {
        padding: 14px 16px;
        line-height: 1;
      }
      .usermessageEditbody {
        padding: 3px 16px 16px;
        font-size: 12px;
        line-height: 3;
        text-align: left;
        .usermessageEdit-detail {
          width: 90%;
          margin: auto;
          margin-top: 10px;
        }
        .usermessageEdit-right {
          width: 90%;
          margin: auto;
          margin-top: 10px;
        }
        .usermessageEdit-leftdetail {
          display: inline-block;
          width: 20%;
          font-size: 14px;
        }
        .usermessageEdit-leftrightdetail {
          display: inline-block;
          width: 20%;
          font-size: 14px;
          color: $grey20;
        }
        .usermessageEdit-rightdetail {
          display: inline-block;
          width: 70%;
          font-size: 14px;
        }
        .usermessageEdit-rightcheckdetail {
          display: inline-block;
          width: 75%;
          font-size: 14px;
        }
      }
      .usermessageEditfoot {
        padding: 12px 18px;
        text-align: right;
      }
    }
  }

  .btnselect {
    width: 20%;
  }
  .new-btnselect {
    margin-left: 4%;
    width: 20%;
  }
  .usermessageEdit {
    .departe-div {
      font-size: 14px;
      color: $grey36;
      text-align: center;
      background-color: rgb(50, 50, 50);
      opacity: 0.9; /* 其他，透明度50% */
      border-radius: 5px;
      width: 200px;
      position: fixed;
      top: 45%;
      left: 55%;
      transform: translate(-50%, 0);
      padding: 30px;
      z-index: 3000;
    }
  }
</style>
