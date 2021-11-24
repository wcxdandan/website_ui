<template>
  <div class="timerfunctionloading" style="min-height:100vh;">
    <div class="himtimerfunction">
      <div class="timerfunctionhead">
        <div class="headdeparte">菜单管理</div>
        <div class="departesectitle">
          <div class="secdiv"></div>&nbsp;&nbsp;&nbsp;请填写菜单信息</div>
      </div>
      <div class="timerfunctionbody">
        <div class="timerfunction-detail">
          <div class="timerfunction-leftdetail">菜单名称：</div>
          <div class="timerfunction-rightdetail">
            <Input v-model="functiondata.functionName" placeholder="请输入菜单名称" clearable></Input>
          </div>
        </div>
        <div v-if="!functionaddState" class="timerfunction-detail">
          <div class="timerfunction-leftdetail">菜单路径：</div>
          <div class="timerfunction-rightdetail">
            <Input v-model="functiondata.functionUrl" placeholder="请输入菜单路径" clearable></Input>
          </div>
        </div>
        <div v-if="!functionaddState" class="timerfunction-detail">
          <div class="timerfunction-leftdetail">菜单地址：</div>
          <div class="timerfunction-rightdetail">
            <Input v-model="functiondata.functionIconStyle" placeholder="请输入菜单地址" clearable></Input>
          </div>
        </div>
        <div class="timerfunction-detail">
          <div class="timerfunction-leftdetail">菜单排序：</div>
          <div class="timerfunction-rightdetail">
            <Input v-model="functiondata.functionOrder" placeholder="请输入菜单排序" clearable></Input>
          </div>
        </div>
        <div class="timerfunction-detail">
          <div class="timerfunction-leftdetail">上级菜单：</div>
          <div class="timerfunction-rightdetail">
            <Select v-model="functiondata.parentfunctionid" clearable filterable>
              <Option v-for="item in menuList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </div>
      </div>
      <div class="timerfunctionfoot">
        <Button style="width: 15%" @click="confirm(false)">取消</Button>
        <Button type="primary" style="width: 15%" @click="confirm(true)">提交</Button>
      </div>
    </div>
    <loading v-if='isLoading'></loading>
  </div>
</template>
<script type="text/javascript">
  import * as SystemService from '../service/system.service';
  export default {
    name: 'function-edit',
    props: {
      functiondata: {
        id: '',
        functionOrder: '',
        parentfunctionid: '',
        functionUrl: '',
        functionIconStyle: '',
        functionName: ''
      },
      functionaddState: false // false为预览，true为编辑
    },
    data() {
      return {
        isLoading: false,
        sumitState: true, // 提交标识
        menuList: []
      };
    },
    created: function() {
      this.loadParentFunction();
    },
    methods: {
      /*
      * 菜单数据编辑
      * 2018年4月18日16:54:50 gk
      * */
      functiondataedit() {
        this.isLoading = true;
        if (!this.functionaddState) { // 创建
          SystemService.insertOrUpdateFunction(this.functiondata).then(response => {
            this.isLoading = false;
            if (response.code === '0') {
              this.warnDisplay('菜单新增成功！');
              this.$emit('functionconfirmstate', true);
            }
            else {
              this.warnDisplay(response.msg);
            }
          });
        }
        else { // 编辑
          SystemService.insertOrUpdateFunction(this.functiondata).then(response => {
            this.isLoading = false;
            if (response.code === '0') {
              this.warnDisplay('菜单修改成功！');
              this.$emit('functionconfirmstate', true);
            }
            else {
              this.warnDisplay(response.msg);
            }
          });
        }
      },
      loadParentFunction() {
        SystemService.getFunctionData().then(response => {
          if (response.code === '0') {
            this.menuList = response.list;
          }
        });
      },
      /*
       * 输入内容校验
       * 2018年4月13日16:36:49 gk
       * */
      functioncheck() {
        if (this.functiondata.functionName === '' || this.functiondata.functionName === undefined) {
          this.sumitState = false;
          this.warnDisplay('请输入菜单ID！');
        }
        else if (!this.functionaddState && (this.functiondata.functionUrl === '' || this.functiondata.functionUrl === undefined)) {
          this.sumitState = false;
          this.warnDisplay('请输入菜单路径！');
        }
        else if (this.functiondata.functionOrder === '' || this.functiondata.functionOrder === undefined) {
          this.sumitState = false;
          this.warnDisplay('请输入菜单排序！');
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
          this.functioncheck();
          if (this.sumitState) {
            this.functiondataedit();
          }
        }
        else {
          this.$emit('functionconfirmstate', value);
        }
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../assets/css/base/fn.scss";

  .timerfunctionloading {
    height: 100vh;
    width: 100vw;
    text-align: center;
    background-color: $faintBlack;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2999;
    box-sizing: content-box;
    .himtimerfunction {
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
      .timerfunctionhead {
        padding: 14px 16px;
        line-height: 1;
      }
      .timerfunctionbody {
        padding: 3px 16px 16px;
        font-size: 12px;
        line-height: 3;
        text-align: left;
        .timerfunction-detail {
          width: 90%;
          margin: auto;
          margin-top: 10px;
        }
        .timerfunction-right {
          width: 90%;
          margin: auto;
          margin-top: 10px;
        }
        .timerfunction-leftdetail {
          display: inline-block;
          width: 20%;
          font-size: 14px;
        }
        .timerfunction-leftrightdetail {
          display: inline-block;
          width: 20%;
          font-size: 14px;
          color: $grey20;
        }
        .timerfunction-rightdetail {
          display: inline-block;
          width: 70%;
          font-size: 14px;
        }
        .timerfunction-rightcheckdetail {
          display: inline-block;
          width: 75%;
          font-size: 14px;
        }
      }
      .timerfunctionfoot {
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
  .timerfunction {
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
