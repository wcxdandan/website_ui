<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script type="text/javascript">
  import * as UtilsService from './utils/utilsService';

  export default{
    data() {
      return {
        isHeader: true
      };
    },
    watch: {
      '$route': function(value) {
        if (value.path === '/outShowPage/outShowDeptList') {
          this.isHeader = false;
        }
        else {
          this.isHeader = true;
        }
      }
    },
    methods: {
      logout() {
        this.$confirm('确认退出？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(_ => {
//            loginService.exit();
            // 退出成功
            let hosId = UtilsService.getHosId();
            let hos = UtilsService.getLocalStorageParam('selectedhospitalInfoSession');
            let areas = UtilsService.getLocalStorageParam('AllHosAreaSession');
            UtilsService.cleanLocalAll();
            UtilsService.cleanSessionAll();
            UtilsService.setLocalStorageString('isUserLogin', 'false');
            UtilsService.setLocalStorageString('appointmentTime', '1');
            UtilsService.setLocalStorageString('hosAbbreviationSession', hosId);
            UtilsService.setLocalStorageParam('selectedhospitalInfoSession', hos);
            UtilsService.setLocalStorageParam('AllHosAreaSession', areas);
            this.$root.$data.isLogin = false;
            this.$root.$data.userName = '';
            this.$router.push('/login');
          })
          .catch(_ => {
          });
      }
    },
    created: function() {
//      this.$router.push('/main');
    }
  };
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "assets/css/base/fn.scss";
  html,
  body {
    width: 100%;
    height: 100%;
    background: $grey31;
    overflow: hidden;
  }
  #app {
    width: 100%;
    background-color: $white;
    height: 100%;
    overflow: auto;
  }

</style>

