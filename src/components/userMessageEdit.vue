<template>
  <div class="usermessageloading" style="min-height:100vh;">
    <div class="himusermessage">
      <div class="usermessagehead">
        <div class="headdeparte">用户管理</div>
        <div class="departesectitle">
          <div class="secdiv"></div>&nbsp;&nbsp;&nbsp;请填写用户信息</div>
      </div>
      <div class="usermessagebody">
        <div class="usermessage-detail">
          <div class="usermessage-leftdetail">用户名：</div>
          <div class="usermessage-rightdetail">
            <Input v-model="userMessagedata.userName" placeholder="请输入用户名" clearable></Input>
          </div>
        </div>
        <div class="usermessage-detail">
          <div class="usermessage-leftdetail">真实姓名：</div>
          <div class="usermessage-rightdetail">
            <Input v-model="userMessagedata.realName" placeholder="请输入真实姓名" clearable></Input>
          </div>
        </div>
        <div class="usermessage-detail">
          <div class="usermessage-leftdetail">密码：</div>
          <div class="usermessage-rightdetail">
            <Input type="password" v-model="userMessagedata.possword" placeholder="请输入密码" clearable></Input>

          </div>
        </div>
        <div  class="usermessage-detail">
          <div class="usermessage-leftdetail">重复密码：</div>
          <div class="usermessage-rightdetail">
            <Input type="password" v-model="userMessagedata.passwordAgain" placeholder="重复密码" clearable></Input>
          </div>
        </div>
        <div  class="usermessage-detail">
          <div class="usermessage-leftdetail">角色：</div>
          <div class="usermessage-rightdetail">
            <Select  style="display: inline-block" v-model="teamUserMsg"
                    placeholder="选择角色" filterable multiple>
              <Option v-for="item in teamUserMsglist" :value="item.roleName+','+item.id" :key="item.roleName">{{ item.roleName }}</Option>
            </Select>
          </div>
        </div>
        <div  class="usermessage-detail">
          <div class="usermessage-leftdetail">手机号：</div>
          <div class="usermessage-rightdetail">
            <Input v-model="userMessagedata.mobilePhone" placeholder="请输入手机号" clearable></Input>
          </div>
        </div>
        <div  class="usermessage-detail">
          <div class="usermessage-leftdetail">邮箱：</div>
          <div class="usermessage-rightdetail">
            <Input v-model="userMessagedata.email" placeholder="请输入邮箱" clearable></Input>
          </div>
        </div>
        <div  class="usermessage-detail">
          <div class="usermessage-leftdetail">工号：</div>
          <div class="usermessage-rightdetail">
            <Input v-model="userMessagedata.job_number" placeholder="请输入工号" clearable></Input>
          </div>
        </div>
        <div  class="usermessage-detail">
          <div class="usermessage-leftdetail">院区：</div>
          <div class="usermessage-rightdetail">
            <Select v-model="userMessagedata.hosName" clearable style="display: inline-block;width: 100%"
                    placeholder="请选择院区">
              <Option v-for="item in  worktypeslist" :value="item.key" :key="item.key">{{ item.value }}</Option>
            </Select>
          </div>
        </div>
      </div>
      <div class="usermessagefoot">
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
    name: 'userMessage-edit',
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
        hosId: '',
        possword: '',
        passwordAgain: '',
        roleCode: ''
      },
      datasorceAddState: false // false为预览，true为编辑
    },
    data() {
      return {
        teamUserMsg: [],
        teamUserMsglist: [],
        worktypeslist: [],
        userMessagestr: '',
        userRole: '',
        isLoading: false,
        sumitState: true // 提交标识
      };
    },
    created: function() {
      this.getAreaName();
      this.userMessageListsearch();
    },
    methods: {
      /*
      * 新增
      * */
      usermessagedataedit() {
        // 处理角色
        if (this.teamUserMsg.length > 0) {
          for (let i = 0; i < this.teamUserMsg.length; i++) {
            this.userMessagestr += this.teamUserMsg[i] + ';';
          }
          this.userMessagedata.userkey = this.userMessagestr;
        }
        this.isLoading = true;
        SystemService.insertUser(this.userMessagedata).then(response => {
          this.isLoading = false;
          if (response.code === '0') {
            this.warnDisplay('新增成功！');
            this.$emit('userconfirmstate', true);
          }
          else {
            this.warnDisplay(response.msg);
          }
        });
      },
      /*
      * 获取字典值
      * */
      getAreaName() {
        let params = {
          types: 'dict',
          params: 'hospitalType',
          system: ''
        };
        CommonService.getDictionary(params).then(response => {
          this.worktypeslist = response;
        });
      },
      /*
       * 输入内容校验
       * 2018年4月13日16:36:49 gk
       * */
      usercheck() {
        if (this.userMessagedata.userName === '' || this.userMessagedata.userName === undefined) {
          this.sumitState = false;
          this.warnDisplay('请输入用户名！');
        }
        else if (this.userMessagedata.realName === '' || this.userMessagedata.realName === undefined) {
          this.sumitState = false;
          this.warnDisplay('请输入真实姓名！');
        }
        else if (this.userMessagedata.possword === '' || this.userMessagedata.possword === undefined) {
          this.sumitState = false;
          this.warnDisplay('请输入密码！');
        }
        else if (this.userMessagedata.passwordAgain === '' || this.userMessagedata.passwordAgain === undefined) {
          this.sumitState = false;
          this.warnDisplay('请输入重复密码！');
        }
        else if (this.teamUserMsg === '' || this.teamUserMsg === undefined) {
          this.sumitState = false;
          this.warnDisplay('请选择角色！');
        }
        else if (this.userMessagedata.possword !== this.userMessagedata.passwordAgain) {
          this.sumitState = false;
          this.warnDisplay('两次密码不一致！');
        }
        else if (!/(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,30}/.test(this.userMessagedata.possword)) {
          this.sumitState = false;
          this.warnDisplay('密码格式不正确，请输入6-30位数字、字母、特殊字符组合密码！');
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
      * 获取列表
      * */
      userMessageListsearch() {
        this.isLoading = true;
        let params = {
          roleName: ''
        };
        SystemService.getRoleList(params).then(response => {
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
       * 确认操作
       * 2018年4月10日11:49:27 gk
       * */
      confirm(value) {
        if (value) {
          this.usercheck();
          if (this.sumitState) {
            this.usermessagedataedit();
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

  .usermessageloading {
    height: 100vh;
    width: 100vw;
    text-align: center;
    background-color: $faintBlack;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2999;
    box-sizing: content-box;
    .himusermessage {
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
      .usermessagehead {
        padding: 14px 16px;
        line-height: 1;
      }
      .usermessagebody {
        padding: 3px 16px 16px;
        font-size: 12px;
        line-height: 3;
        text-align: left;
        .usermessage-detail {
          width: 90%;
          margin: auto;
          margin-top: 10px;
        }
        .usermessage-right {
          width: 90%;
          margin: auto;
          margin-top: 10px;
        }
        .usermessage-leftdetail {
          display: inline-block;
          width: 20%;
          font-size: 14px;
        }
        .usermessage-leftrightdetail {
          display: inline-block;
          width: 20%;
          font-size: 14px;
          color: $grey20;
        }
        .usermessage-rightdetail {
          display: inline-block;
          width: 70%;
          font-size: 14px;
        }
        .usermessage-rightcheckdetail {
          display: inline-block;
          width: 75%;
          font-size: 14px;
        }
      }
      .usermessagefoot {
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
  .usermessage {
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
