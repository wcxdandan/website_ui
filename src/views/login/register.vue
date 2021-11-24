<template>
  <div class="snui-register">
    <div class="login-container login-form">
      <div class="title">注册</div>
      <div class="form-box">
        <input-phone v-on:onKey="inputPhone"></input-phone>
        <input-message v-on:onKey="inputMessage" :codeType="'1'" :phone="phone"></input-message>
        <input-password v-on:onKey="inputPassword" :placeholder="'输入新的8~16位登录密码'"></input-password>
      </div>
      <div class="password-requirement"><div>密码必须由8-16位的数字，字母或特殊字符中的任意两种组成。</div></div>
      <div class="button-box">
        <el-button type="primary" v-bind:disabled="isDisabled" @click="btnClick()" class="register-button btn" :style="btnTheme">立即注册</el-button>
        <el-button type="text" @click="login()" class="login-button">登陆</el-button>
      </div>
    </div>
    <alert-message v-if="alertStates" :message="alertMessage"></alert-message>
    <loading v-if="isLoading"></loading>
  </div>
</template>
<script type="text/javascript">
import * as UtilsService from '../../utils/utilsService';
import * as loginService from '../../service/loginService';
import * as validateService from '../../utils/validateService';
import * as AppConfig from '../../app.config';

export default {
  data() {
    return {
      phone: '', // 手机号
      password: '', // 密码
      code: '', // 验证码
      isDisabled: true, // 初始化按钮为不可用
      alertStates: false, // 提示信息弹窗状态
      alertMessage: '', // 提示信息
      isLoading: false, // 是否加载中
      showPhone: '', // 画面显示手机号
      timeStart: true, // 启用倒计时
      btnTheme: '',
      hosid: ''
    };
  },
  created: function() {
    this.hosid = AppConfig.getConfig().hosId;
  },
  methods: {
    // 按钮样式控制
    btnState() {
      this.isDisabled = !(this.phone !== '' && this.password !== '' && this.code !== '');
    },
    // 按钮点击事件
    btnClick() {
      if (validateService.phoneValidate(this.phone)) {
        if (validateService.passwordValidate(this.password)) {
          this.isLoading = true;
          loginService.checkRegister(this.phone).then(result => {
            if (result.code !== 0) {
              this.isLoading = false;
              // 弹窗提示消息
              this.alertStates = true;
              this.alertMessage = '该手机号已经注册请直接登录';
              setTimeout(() => {
                this.alertStates = false;
              }, UtilsService.ALERT_TIME);
            }
            else {
              this.isLoading = true;
              loginService.checkCode('1', this.phone, this.code).then(result => {
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
                  loginService.register(this.phone, this.password, this.code).then(result => {
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
                      this.alertMessage = '注册成功';
                      setTimeout(() => {
                        // 自动登录
                        loginService.login(this.phone, this.password).then(result => {
                          UtilsService.setSessionStorage('loginUser', result.data);
                          UtilsService.setLocalStorageString('isUserLogin', 'true');

                          // 为全局变量赋值
                          this.$root.$data.isLogin = true;
                          this.$root.$data.userName = result.data.mobile;

                          // 登录成功
                          myCollectionService.getMyCollectionByAccountId()
                            .then(collections => {
                              UtilsService.setSessionStorage('login_collectionModuleSession', collections);
                            });
                          patientService.findAllPatient()
                            .then(patient => {
                              if (patient && patient.code === 0 && patient.data && patient.data.length > 0) {
                                UtilsService.setLocalStorageParam('managepatient_list', patient.data);
                                let patientModel = patient.data.filter(data => data.defaultState === '1');
                                if (patientModel.length > 0) {
                                  UtilsService.setSessionStorage('login_defaultPatient', patientModel[0]);
                                }
                              }
                              else {
                                UtilsService.setLocalStorageParam('managepatient_list', []);
                              }
                            });

                          this.$router.push({ path: '/system' });
                        });

                        this.alertStates = false;
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
    // 手机共用组件回传值
    inputPassword(text) {
      this.password = text;
      this.btnState();
    },
    // 手机共用组件回传值
    inputMessage(text) {
      this.code = text;
      this.btnState();
    },
    // 手机共用组件回传值
    inputPhone(text) {
      this.phone = text;
      this.btnState();
    },
    login() {
      this.$router.push({ path: '/login' });
    }
  },
  mounted() {
    if (this.hosid === 'fc8e5782114740c68b1fd6f8cfe986cf') {
      this.btnTheme = {
        'background-image': 'linear-gradient(90deg, rgb(255, 171, 203) 0%, rgb(255, 255, 255)) !important'
      };
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
@import "../../assets/css/base/fn.scss";
.snui-register {
  position: relative;
  max-width: 1000px;
  height: 600px;
  margin: 105px auto 0;
  background: no-repeat center center;
  background-size: 100% 100%;
  .login-container {
    position: absolute;
    right: 100px;
    top: 120px;
    padding: 10px 15px 0;
    box-shadow: 0 0 15px 0 rgba(181, 181, 181, 0.3);
    -moz-box-shadow: 0 0 15px 0 rgba(181, 181, 181, 0.3);
    -webkit-box-shadow: 0 0 15px 0 rgba(181, 181, 181, 0.3);
    background-image: -moz-linear-gradient(top, rgb(240, 247, 253) 0%, rgb(161, 215, 244) 100%);
    background-image: -webkit-linear-gradient(top, rgb(240, 247, 253) 0%, rgb(161, 215, 244) 100%);
    background-image: linear-gradient(to bottom, rgb(240, 247, 253) 0%, rgb(161, 215, 244) 100%);
    .title {
      width: 220px;
      margin: 0 auto;
      text-align: center;
      border-width: 2px;
      color: $grey65;
      font-weight: bold;
    }
    .form-box {
      width: 220px;
      margin: 0 auto;
      border-width: 2px;
      .input-group {
        margin-top: 15px;
      }
    }
    .password-requirement {
      overflow: hidden;
      width: 220px;
      font-size: 13px;
      line-height: 20px;
      margin: 12px auto;
      div {
        text-indent: 2em;
      }
    }
    .button-box {
      width: 220px;
      margin: 30px auto 0;
      .register-button {
        width: 100%;
        color: $grey65;
        font-weight: bold;
        box-shadow: 0 0 15px 0 rgba(181, 181, 181, 0.3);
        -moz-box-shadow: 0 0 15px 0 rgba(181, 181, 181, 0.3);
        -webkit-box-shadow: 0 0 15px 0 rgba(181, 181, 181, 0.3);
        background-image: linear-gradient(to bottom, rgb(251, 255, 253) 60%, rgb(184, 221, 240) 100%);
      }
      .login-button {
        color: $grey65;
        font-weight: bold;
        float: right;
      }
    }
  }
  .login-form {
    background-color: $blue40;
    background-image: none;
    border-radius: 5px;
    .btn {
      border: none !important;
      color: $main !important;
    }
    .forgot {
      color: $white !important;
    }
  }
}
</style>
