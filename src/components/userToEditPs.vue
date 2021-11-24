<template>
  <div class="usermessageEditloading" style="min-height:100vh;">
    <div class="himusermessageEdit">
      <div class="usermessageEdithead">
        <div class="headdeparte">重置密码</div>
        <div class="departesectitle">
          <div class="secdiv"></div>&nbsp;&nbsp;&nbsp;请填写密码</div>
      </div>
      <div class="usermessageEditbody">
        <div class="usermessageEdit-detail">
          <div class="usermessageEdit-leftdetail">新密码：</div>
          <div class="usermessageEdit-rightdetail">
            <Input type="password" v-model="userMessagedata.password" placeholder="请输入新密码" clearable></Input>
          </div>
        </div>
        <div class="usermessageEdit-detail">
          <div class="usermessageEdit-leftdetail">重复新密码：</div>
          <div class="usermessageEdit-rightdetail">
            <Input type="password" v-model="userMessagedata.passwordAgain" placeholder="请再次输入新密码" clearable></Input>
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
  export default {
    name: 'userMessage-editPs',
    props: {
      userMessagedata: {
        id: '',
        password: '',
        passwordAgain: '',
        userName: ''
      },
      datasorceAddState: false // false为预览，true为编辑
    },
    data() {
      return {
        teamUserMsg: [],
        teamUserMsglist: [],
        areaNameList: [],
        isLoading: false,
        sumitState: true // 提交标识
      };
    },
    created: function() {
    },
    methods: {
      /*
       * 任务数据编辑
       * 2018年4月18日16:54:50 gk
       * */
      usermessageEditdataedit() {
        SystemService.editUserPs(this.userMessagedata).then(response => {
          this.isLoading = false;
          if (response.code === '0') {
            this.warnDisplay('密码修改成功！');
            this.$emit('userconfirmstate', true);
          }
          else {
            this.warnDisplay(response.msg);
          }
        });
      },
      /*
       * 输入内容校验
       * 2018年4月13日16:36:49 gk
       * */
      usercheck() {
        if (this.userMessagedata.password !== this.userMessagedata.passwordAgain) {
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
       * 获取角色列表
       * */
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
