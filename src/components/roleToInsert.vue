<template>
  <div class="roleMessageloading" style="min-height:100vh;">
    <div class="himroleMessage">
      <div class="roleMessagehead">
        <div class="headdeparte">角色管理</div>
        <div class="departesectitle">
          <div class="secdiv"></div>&nbsp;&nbsp;&nbsp;新增角色信息</div>
      </div>
      <div class="roleMessagebody">
        <div class="roleMessage-detail">
          <div class="roleMessage-leftdetail">角色名称：</div>
          <div class="roleMessage-rightdetail">
            <Input v-model="roleMessagedata.roleName" placeholder="请输入角色名称" clearable></Input>
          </div>
        </div>
        <div class="roleMessage-detail">
          <div class="roleMessage-leftdetail">角色编码：</div>
          <div class="roleMessage-rightdetail">
            <Input v-model="roleMessagedata.roleCode" placeholder="请输入角色编码" clearable></Input>
          </div>
        </div>
      </div>
      <div class="roleMessagefoot">
        <Button  style="width: 15%" @click="confirm(false)">取消</Button>
        <Button type="primary" style="width: 15%" @click="confirm(true)">提交</Button>
      </div>
    </div>
    <loading v-if='isLoading'></loading>
  </div>
</template>
<script type="text/javascript">
  import * as SystemService from '../service/system.service';
//  import * as CommonService from '../service/commondata.service';
  export default {
    name: 'roleMgs-Insert',
    props: {
      roleMessagedata: {
        id: '',
        roleName: '',
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
    },
    methods: {
      /*
      * 新增
      * */
      roleMessageInsert() {
        this.isLoading = true;
        SystemService.insertRole(this.roleMessagedata).then(response => {
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
       * 输入内容校验
       * 2018年4月13日16:36:49 gk
       * */
      usercheck() {
        if (this.roleMessagedata.roleName === '' || this.roleMessagedata.roleName === undefined) {
          this.sumitState = false;
          this.warnDisplay('请输入角色名称！');
        }
        else if (this.roleMessagedata.roleCode === '' || this.roleMessagedata.roleCode === undefined) {
          this.sumitState = false;
          this.warnDisplay('请输入角色编码！');
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
       * 确认操作
       * 2018年4月10日11:49:27 gk
       * */
      confirm(value) {
        if (value) {
          this.usercheck();
          if (this.sumitState) {
            this.roleMessageInsert();
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

  .roleMessageloading {
    height: 100vh;
    width: 100vw;
    text-align: center;
    background-color: $faintBlack;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2999;
    box-sizing: content-box;
    .himroleMessage {
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
      .roleMessagehead {
        padding: 14px 16px;
        line-height: 1;
      }
      .roleMessagebody {
        padding: 3px 16px 16px;
        font-size: 12px;
        line-height: 3;
        text-align: left;
        .roleMessage-detail {
          width: 90%;
          margin: auto;
          margin-top: 10px;
        }
        .roleMessage-right {
          width: 90%;
          margin: auto;
          margin-top: 10px;
        }
        .roleMessage-leftdetail {
          display: inline-block;
          width: 20%;
          font-size: 14px;
        }
        .roleMessage-leftrightdetail {
          display: inline-block;
          width: 20%;
          font-size: 14px;
          color: $grey20;
        }
        .roleMessage-rightdetail {
          display: inline-block;
          width: 70%;
          font-size: 14px;
        }
        .roleMessage-rightcheckdetail {
          display: inline-block;
          width: 75%;
          font-size: 14px;
        }
      }
      .roleMessagefoot {
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
  .roleMessage {
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
