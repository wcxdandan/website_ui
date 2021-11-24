<template>
  <div id="login" class="login">
    <div style="overflow: hidden;width: 100%;height:10%;min-height:75px;text-align: center;">
      <div class="head divcenter" style="padding-top: 0px;height: 100%;padding-left: 100px;width: 100%;text-align: left;color: #fde67d;background-color: #2d8cf0;">
        <p style="display:inline-block;vertical-align:middle;margin-top: 10px;">
          <br>
          <span style="font-family: 微软雅黑;font-size: 18px;">山东医师协会</span><br>
          <span style="font-family: ArialMT;font-size: 14px">SHANDONG MEDICAL DOCTOR ASSOCIATION</span>
        </p>
      </div>
    </div>
    <div>
      <!--<div class="rightdiv"></div>-->
      <div class="head-logo-login">
        <div class="logo-sl"><img src="../../assets/websiteImg/sdysxh.jpg"></div>
        <div class="xh-name">
          <div class="china-name">山东省医师协会</div>
          <div class="english-name">SHANDONG MEDICAL DOCTOR ASSOCIATION</div>
        </div>
      </div>
      <div class="login-con" @keydown.enter="login">
        <Card :bordered="false">
          <p slot="title">
            <Icon type="log-in"></Icon>
            欢迎登录
          </p>
          <div class="form-con">
            <Form>
              <FormItem >
                <Input  placeholder="请输入用户名" v-model="accountNo">
                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                </Input>
              </FormItem>
              <FormItem >
                <Input type="password" placeholder="请输入密码" v-model="password">
                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                </Input>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="login" long>登录</Button>
              </FormItem>
            </Form>
            <!--<p class="login-tip">输入任意用户名和密码即可</p>-->
          </div>
        </Card>
      </div>
    </div>
    <passwordreset-editPs v-if="resetstate" :passwordresetconfirmstate="getsesetstate" :username="accountNo"></passwordreset-editPs>
    <loading v-if='isLoading'></loading>
  </div>
</template>
<script>
  import * as UtilsService from '../../utils/utilsService';
  import * as loginService from '../../service/loginService';
  import * as validateService from '../../utils/validateService';
  export default{
    data() {
      return {
        resetstate: false, // 密码重置页面state
        accountNo: '',
        mobile: '',
        password: '',
        alertStates: false, // 提示信息弹窗状态
        alertMessage: '', // 提示信息
        isLoading: false // 是否加载中
      };
    },
    created: function() {
      document.title = '登录';
    },
    methods: {
      /*
      * 获取密码重置页面返回值
      * 2018年8月7日17:26:07 gk
      * */
      getsesetstate(value) {
        if (value) {
          this.resetstate = false;
        }
      },
      /*
       * 信息提示
       * 2018年4月13日14:29:04 gk
       * */
      warnDisplay(msg) {
        this.$Notice.info({
          title: '信息提示：',
          desc: msg
        });
      },
      // 登录
      login() {
        this.isLoading = true;
        loginService.login(this.accountNo, this.password).then(result => {
          this.isLoading = false;
          this.callLogin(result);
        });
      },
      // 登录后的操作
      callLogin(result) {
        if (result === null) {
          this.warnDisplay(UtilsService.MESSAGE_CAN_NOT_CONNECT);
          return false;
        }
        else if (result.code !== '0') {
          this.warnDisplay(result.msg);
          return false;
        }
        else {
          UtilsService.setSessionStorage('ysxhLoginUser', JSON.parse(result.user));
          UtilsService.setSessionStorage('ysxhAccessToken', result.access_token);
          UtilsService.setSessionStorage('ysxhMenuData', result.menuedata);
          if (!validateService.passwordsValidate(this.password)) {
            this.resetstate = true;
          }
          else {
            this.$router.push({
              path: '/system'
            });
          }
        }
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/base/fn.scss";
  html,
  body {
    width: 100%;
    height: 100%;
    background: $grey31;
    overflow: hidden;
  }

  .rightdiv {
    float: left;
    height: 500px;
    width: 500px;
    margin-left: 200px;
    background-image: url('../../assets/images/bg.jpg');
    background-repeat: no-repeat;
    background-position: center;
    min-width: 500px;
  }
  .head-logo-login {
    float: left;
    // height: 10%;
    // width: 70%;
    margin-left: 100px;
    // background-repeat: no-repeat;
    // background-position: center;
    // min-width: 10%;
    margin-top: 80px;
    .logo-sl {
      width: 250px;
      height: 250px;
      float: left;
      img {
        width: 250px;
        height: 250px;
        // margin-top: 18px;
      }
    }
    .xh-name {
      float: left;
      // width: 600px;
      height: 140px;
      padding-top: 60px;
      color: $blue11;
      padding-left: 20px;
      .china-name {
        font-size: 56px;
        font-weight: bold;
      }
      .english-name {
        margin-top: 30px;
        font-size: 22px;
      }
    }
  }
  .login {
    width: 100%;
    height: 100%;
    position: relative;
    &-con {
      position: absolute;
      right: 100px;
      top: 350px;
      transform: translateY(-60%);
      width: 300px;
      border: 1px solid $grey64;
      &-header {
        font-size: 16px;
        font-weight: 300;
        text-align: center;
        padding: 30px 0;
      }
      .form-con {
        padding: 10px 0 0;
      }
      .login-tip {
        font-size: 10px;
        text-align: center;
        color: $grey21;
      }
    }
  }
</style>
