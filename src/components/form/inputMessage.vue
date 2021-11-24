<template>
  <div class="input-group">
    <el-input v-model="inputValue" placeholder="请输入动态码" :change="onKey()" :maxlength="6" size="small"></el-input>
    <span class="input-group-addon">
      <el-button type="primary" v-bind:disabled="isDisabled" @click="getCodeClick()" size="small">{{buttonLable}}</el-button>
    </span>
    <alert-message v-if="alertStates" :message="alertMessage"></alert-message>
  </div>
</template>
<script type="text/javascript">
  import {ALERT_TIME} from '../../utils/utilsService';
  import {phoneValidate} from '../../utils/validateService';
  import {sendVerifyCode} from '../../service/loginService';

  export default {
    name: 'input-message',
    props: {
      codeType: {
        default: '3'
      },
      phone: {
        default: '手机号'
      },
      timeStart: {
        default: false // 启用倒计时标记
      }
    },
    data() {
      return {
        inputValue: '',
        isDisabled: false, // 获取动态码状态初始化为可用
        countdown: 60, // 获取验证码重新发送倒计时
        alertStates: false, // 提示信息弹窗状态
        alertMessage: '', // 提示信息
        buttonLable: '获取动态码'
      };
    },
    methods: {
      onKey() {
        // 将手机号发射给父组件
        this.$emit('onKey', this.inputValue);
      },
      // 获取验证码按钮点击事件
      getCodeClick() {
        if (phoneValidate(this.phone)) {
          this.isDisabled = true;
          sendVerifyCode(this.phone, this.codeType).then(result => {
            if (result.code !== 0) {
              this.isDisabled = false;
              // 弹窗提示消息
              this.alertStates = true;
              this.alertMessage = result.msg;
              setTimeout(() => {
                this.alertStates = false;
              }, ALERT_TIME);
            }
            else {
              this.settime();
              // 弹窗提示消息
              this.alertStates = true;
              this.alertMessage = '动态码短信已发送至' + this.phone.substr(0, 3) + '******' + this.phone.substr(8, 3);
              setTimeout(() => {
                this.alertStates = false;
              }, ALERT_TIME);
            }
          });
        }
        else {
          // 弹窗提示消息
          this.alertStates = true;
          this.alertMessage = '请输入正确的手机号';
          setTimeout(() => {
            this.alertStates = false;
          }, ALERT_TIME);
        }
      },
      // 重新发送验证码计时器
      settime() {
        if (this.countdown === 0) {
          this.isDisabled = false;
          this.buttonLable = '获取动态码';
          this.countdown = 60;
        }
        else {
          this.isDisabled = true;
          this.buttonLable = '重新发送' + this.countdown + 's';
          this.countdown--;
          setTimeout(() => {
            this.settime();
          }, 1000);
        }
      }
    },
    created: function() {
      if (this.timeStart) {
        // 开始倒计时
        this.settime();
      }
    }
  };
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/base/fn.scss";

  .input-group {
    width: 100%;
    margin: 30px auto 0;
    .el-input {
      width: 120px;
    }
    .input-group-addon {
      padding: 0;
      vertical-align: middle;
      border-radius: 4px;
      background-color: $blue40;
    }
  }

  .code-btn {
    display: inline-block;
    border-radius: 5px;
    padding: 0 5px;
    margin-left: 10px;
    background-color: $transparent;
    font-size: 12px;
    box-shadow: none;
    border: 1px solid $blue40;
    color: $blue40;
    width: 120px;
    height: 100%;
  }
</style>
