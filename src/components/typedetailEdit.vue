<template>
  <div class="typedetailloading" style="min-height:100vh;">
    <div class="himtypedetail">
      <div class="typedetailhead">
        <div class="headdeparte">字典类型管理</div>
        <div class="departesectitle">
          <div class="secdiv"></div>&nbsp;&nbsp;&nbsp;字典类型信息</div>
      </div>
      <div class="typedetailbody">
        <div class="typedetail-detail">
          <div class="typedetail-leftdetail">字典类型名称：</div>
          <div class="typedetail-rightdetail">
            <Input v-model="typedetaildata.typename" placeholder="请输入字典类型名称" clearable/>
          </div>
        </div>
        <div class="typedetail-detail">
          <div class="typedetail-leftdetail">字典类型编码：</div>
          <div class="typedetail-rightdetail">
            <Input v-model="typedetaildata.typecode" placeholder="请输入字典类型编码" clearable/>
          </div>
        </div>
      <div class="typedetailfoot">
        <Button style="width: 15%" @click="confirm(false)">取消</Button>
        <Button type="primary" style="width: 15%" @click="confirm(true)">提交</Button>
      </div>
    </div>
    <loading v-if='isLoading'></loading>
    </div>
  </div>
</template>
<script type="text/javascript">
  import * as SystemService from '../service/system.service';
  import * as CommonService from '../service/commondata.service';
  export default {
    name: 'dictdetail-edit',
    props: {
      typedetaildata: {
        id: '',
        typegroupid: '',
        typename: '',
        typecode: '',
        createDate: '',
        createName: ''
      },
      dictdetailAddState: false // false为预览，true为编辑
    },
    data() {
      return {
        isLoading: false,
        dbtype: [],
        sumitState: true // 提交标识
      };
    },
    created: function() {
      let newparams = {
        types: 'dict',
        params: 'dbtype',
        system: ''
      };
      CommonService.getDictionary(newparams).then(response => {
        this.dbtype = response;
      });
    },
    methods: {
      /*
      * 任务数据编辑
      * 2018年4月18日16:54:50 gk
      * */
      typedetailedit() {
        this.isLoading = true;
        if (!this.dictdetailAddState) { // 创建
          SystemService.addOrUpdateDictdetail(this.typedetaildata).then(response => {
            this.isLoading = false;
            if (response.code === '0') {
              this.warnDisplay('新增成功！');
              this.$emit('taskconfirmstate', true);
            }
            else {
              this.warnDisplay(response.msg);
            }
          });
        }
        else { // 编辑
          SystemService.addOrUpdateDictdetail(this.typedetaildata).then(response => {
            this.isLoading = false;
            if (response.code === '0') {
              this.warnDisplay('修改成功！');
              this.$emit('taskconfirmstate', true);
            }
            else {
              this.warnDisplay(response.msg);
            }
          });
        }
      },
      /*
       * 输入内容校验
       * 2018年4月13日16:36:49 gk
       * */
      taskcheck() {
        if (this.typedetaildata.typename === '' || this.typedetaildata.typename === undefined) {
          this.sumitState = false;
          this.warnDisplay('请输入字典分类名称！');
        }
        else if (this.typedetaildata.typecode === '' || this.typedetaildata.typecode === undefined) {
          this.sumitState = false;
          this.warnDisplay('请输入字典分类编码！');
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
          this.taskcheck();
          if (this.sumitState) {
            this.typedetailedit();
          }
        }
        else {
          this.$emit('taskconfirmstate', value);
        }
      },
      /*
       * 修改dbClass，url
       * 2018年4月10日11:49:27 gk
       * */
      changeDbValues(value) {
        SystemService.getDbParam(value).then(response => {
          if (response.code === '0') {
            this.typedetail.driverClass = response.driverClass;
            this.typedetail.url = response.url;
          }
          else {
            this.warnDisplay(response.msg);
            return;
          }
        });
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../assets/css/base/fn.scss";

  .typedetailloading {
    height: 100vh;
    width: 100vw;
    text-align: center;
    background-color: $faintBlack;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2999;
    box-sizing: content-box;
    .himtypedetail {
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
      .typedetailhead {
        padding: 14px 16px;
        line-height: 1;
      }
      .typedetailbody {
        padding: 3px 16px 16px;
        font-size: 12px;
        line-height: 3;
        text-align: left;
        .typedetail-detail {
          width: 90%;
          margin: auto;
          margin-top: 10px;
        }
        .typedetail-right {
          width: 90%;
          margin: auto;
          margin-top: 10px;
        }
        .typedetail-leftdetail {
          display: inline-block;
          width: 20%;
          font-size: 14px;
        }
        .typedetail-leftrightdetail {
          display: inline-block;
          width: 20%;
          font-size: 14px;
          color: $grey20;
        }
        .typedetail-rightdetail {
          display: inline-block;
          width: 70%;
          font-size: 14px;
        }
        .typedetail-rightcheckdetail {
          display: inline-block;
          width: 75%;
          font-size: 14px;
        }
      }
      .typedetailfoot {
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
  .typedetail {
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
