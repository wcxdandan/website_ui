<template>
  <div class="snui-getpw">
    <div class="title">修改密码</div>
    <div class="form-box">
      <input-phone v-on:onKey="inputPhone"></input-phone>
      <input-message v-on:onKey="inputMessage" :codeType="'2'" :phone="phone"></input-message>
      <input-password v-on:onKey="inputPassword" :placeholder="'输入新的8~16位新密码'"></input-password>
    </div>
    <div class="password-requirement"><div>密码必须由8-16位的数字，字母或特殊字符中的任意两种组成。</div></div>
    <div class="button-box">
      <el-button type="primary" v-bind:disabled="isDisabled" @click="confirmBtnClick()" class="reset-button">确定
      </el-button>
    </div>
    <alert-message v-if="alertStates" :message="alertMessage"></alert-message>
    <loading v-if="isLoading"></loading>
  </div>
</template>
<script type="text/javascript">
  import * as UtilsService from '../../utils/utilsService';
  import * as loginService from '../../service/loginService';
  import * as validateService from '../../utils/validateService';

  export default{
    data() {
      return {
        phone: '', // 手机号
        password: '', // 新密码
        code: '', // 验证码
        isDisabled: true, // 初始化按钮为不可用
        alertStates: false, // 提示信息弹窗状态
        alertMessage: '', // 提示信息
        isLoading: false // 是否加载中
      };
    },
    created: function() {
    },
    methods: {
      // 按钮样式控制
      btnState() {
        this.isDisabled = !(this.phone !== '' && this.password !== '' && this.code !== '');
      },
      // 确定按钮点击事件
      confirmBtnClick() {
        if (validateService.phoneValidate(this.phone)) {
          if (validateService.passwordValidate(this.password)) {
            this.isLoading = true;
            loginService.checkRegister(this.phone).then(result => {
              if (result.code === 0) {
                this.isLoading = false;
                // 弹窗提示消息
                this.alertStates = true;
                this.alertMessage = '该手机号还未注册请先去注册账号';
                setTimeout(() => {
                  this.alertStates = false;
                }, UtilsService.ALERT_TIME);
              }
              else {
                loginService.checkCode('2', this.phone, this.code).then(result => {
                  this.isLoading = false;
                  if (result.code !== 0) {
                    // 弹窗提示消息
                    this.alertStates = true;
                    this.alertMessage = '验证码不正确';
                    setTimeout(() => {
                      this.alertStates = false;
                    }, UtilsService.ALERT_TIME);
                  }
                  else {
                    this.isLoading = true;
                    loginService.modifyPasswd(this.phone, this.password, this.code).then(result => {
                      this.isLoading = false;
                      if (result.code !== 0) {
                        // 弹窗提示消息
                        this.alertStates = true;
                        this.alertMessage = result.msg;
                        setTimeout(() => {
                          this.alertStates = false;
                        }, UtilsService.ALERT_TIME);
                      }
                      else {
                        // 弹窗提示消息
                        this.alertStates = true;
                        this.alertMessage = '重置密码成功';
                        setTimeout(() => {
                          this.alertStates = false;
                          // 路由跳转
                          this.$router.push({path: '/login'});
                        }, UtilsService.ALERT_TIME);
                      }
                    });
                  }
                });
              }
            });
          }
          else {
            // 弹窗提示消息
            this.alertStates = true;
            this.alertMessage = '密码必须由8-16位的数字，字母或特殊字符中的任意两种组成。';
            setTimeout(() => {
              this.alertStates = false;
            }, UtilsService.ALERT_TIME);
          }
        }
        else {
          // 弹窗提示消息
          this.alertStates = true;
          this.alertMessage = '请输入正确的手机号';
          setTimeout(() => {
            this.alertStates = false;
          }, UtilsService.ALERT_TIME);
        }
      },
      // 密码共用组件回传值
      inputPassword(text) {
        this.password = text;
        this.btnState();
      },
      // 手机共用组件回传值
      inputPhone(text) {
        this.phone = text;
        this.btnState();
      },
      // 验证码共用组件回传值
      inputMessage(text) {
        this.code = text;
        this.btnState();
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/base/fn.scss";

  .snui-getpw {
    height: 600px;
    margin: 0 auto;
    background: $white;
    .title {
      width: 300px;
      margin: 0 auto;
      text-align: center;
      border-width: 2px;
    }
    .form-box {
      width: 300px;
      margin: 30px auto 0;
      border-width: 2px;
    }
    .password-requirement {
      overflow: hidden;
      width: 300px;
      font-size: 13px;
      line-height: 20px;
      margin: 12px auto;
      div {
        text-indent: 2em;
      }
    }
    .button-box {
      width: 300px;
      margin: 30px auto 0;
      .reset-button {
        width: 100%;
      }
    }
  }
</style>
