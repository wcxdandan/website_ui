<template>
  <div class="input-group">
    <div v-show="!isPassword">
      <el-input v-model="inputValue" :change="onKeyup()" :placeholder="placeholder"
                :minlength="6" :maxlength="20" size="small"></el-input>
      <i class="el-input__icon is-clickable iconfont icon-yanjing1" @click="close()"></i>
    </div>
    <div v-show="isPassword">
      <el-input v-model="inputValue" type="password" :change="onKeyup()" :placeholder="placeholder"
                :minlength="6" :maxlength="20" size="small"></el-input>
      <i class="el-input__icon is-clickable iconfont icon-yanjing2" @click="open()"></i>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'input-password',
    props: {
      placeholder: {
        default: '请输入密码'
      }
    },
    data() {
      return {
        inputValue: '',
        isPassword: true // 是否显示为密码框
      };
    },
    methods: {
      onKeyup() {
        // 将手机号发射给父组件
        this.$emit('onKey', this.inputValue);
      },
      // 使用密码框
      close() {
        this.isPassword = true;
      },
      // 显示密码
      open() {
        this.isPassword = false;
      }
    }
  };
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/base/fn.scss";

  .input-group {
    width: 100%;
    margin: 30px auto 0;
    .iconfont {
      font-size: 30px;
      color: $grey41;
    }
    input {
      width: 350px;
    }
    i {
      margin-right: 20px;
    }
  }
</style>
