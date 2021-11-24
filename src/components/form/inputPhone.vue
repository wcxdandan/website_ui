<template>
  <div class="input-group">
    <div>
      <el-input v-model="inputValue" :placeholder="placeholder" :change="onKeyup()" :maxlength="11" size="small"></el-input>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'input-phone',
    props: {
      placeholder: {
        type: String,
        default: '请输入手机号'
      }
    },
    data() {
      return {
        inputValue: ''
      };
    },
    methods: {
      onKeyup() {
        // 将手机号发射给父组件
        this.$emit('onKey', this.inputValue);
      }
    }
  };
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/base/fn.scss";

  .input-group {
    width: 100%;
    margin: 30px auto 0;
    input {
      width: 350px;
    }
  }
</style>
