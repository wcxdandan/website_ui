<template>
  <div class="datasourceloading" style="min-height:100vh;">
    <div class="himdatasource">
      <div class="datasourcehead">
        <div class="headdeparte">多数据源管理</div>
        <div class="departesectitle">
          <div class="secdiv"></div>&nbsp;&nbsp;&nbsp;请填写多数据源信息</div>
      </div>
      <div class="datasourcebody">
        <div class="datasource-detail">
          <div class="datasource-leftdetail">多数据源主键：</div>
          <div class="datasource-rightdetail">
            <Input v-model="datasourcedata.dbKey" placeholder="请输多数据源主键" clearable></Input>
          </div>
        </div>
        <div class="datasource-detail">
          <div class="datasource-leftdetail">描述：</div>
          <div class="datasource-rightdetail">
            <Input v-model="datasourcedata.description" placeholder="请输入描述" clearable></Input>
          </div>
        </div>
        <div class="datasource-detail">
          <div class="datasource-leftdetail">数据库类型：</div>
          <div class="datasource-rightdetail">
            <Select @on-change="changeDbValues" v-model="datasourcedata.dbType" clearable style="display: inline-block"
                    placeholder="选择数据库类型">
              <Option v-for="areaitem in  dbtype" :value="areaitem.key" :key="areaitem.key">{{ areaitem.value }}</Option>
            </Select>
          </div>
        </div>
        <div  class="datasource-detail">
          <div class="datasource-leftdetail">驱动：</div>
          <div class="datasource-rightdetail">
            <Input v-model="datasourcedata.driverClass" placeholder="请输入驱动" clearable></Input>
          </div>
        </div>
        <div class="datasource-detail">
            <div class="datasource-leftdetail">URL：</div>
            <div class="datasource-rightdetail"><Input v-model="datasourcedata.url" type="textarea" :rows="4" placeholder="请输入URL" clearable></Input></div>
        </div>
      <div class="datasource-detail">
        <div class="datasource-leftdetail">用户名：</div>
        <div class="datasource-rightdetail">
          <Input v-model="datasourcedata.dbUser" placeholder="请输入用户名" clearable></Input>
        </div>
      </div>
      <div class="datasource-detail">
        <div class="datasource-leftdetail">密码：</div>
        <div class="datasource-rightdetail">
          <Input v-model="datasourcedata.wordtext" type="password" placeholder="请输入密码" clearable></Input>
        </div>
      </div>
      <div class="datasource-detail">
        <div class="datasource-leftdetail">数据库名：</div>
        <div class="datasource-rightdetail">
          <Input v-model="datasourcedata.dbName" placeholder="请输入数据库名" clearable></Input>
        </div>
      </div>
      </div>
      <div class="datasourcefoot">
        <Button  style="width: 15%" @click="confirm(false)">取消</Button>
        <Button  style="width: 15%" @click="testConnect()">测试连接</Button>
        <Button type="primary" style="width: 15%" @click="confirm(true)">提交</Button>
      </div>
    </div>
    <loading v-if='isLoading'></loading>
  </div>
</template>
<script type="text/javascript">
  import * as SystemService from '../service/system.service';
  import * as CommonService from '../service/commondata.service';
  export default {
    name: 'datasource-edit',
    props: {
      datasourcedata: {
        id: '',
        dbKey: '',
        description: '',
        driverClass: '',
        url: '',
        dbUser: '',
        dbPassword: '',
        dbType: '',
        wordtext: '',
        dbName: ''
      },
      datasorceAddState: false // false为预览，true为编辑
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
      datasourcedataedit() {
        this.isLoading = true;
        this.datasourcedata.dbPassword = this.datasourcedata.wordtext;
        if (!this.datasorceAddState) { // 创建
          SystemService.addOrUpdateDatasource(this.datasourcedata).then(response => {
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
          SystemService.addOrUpdateDatasource(this.datasourcedata).then(response => {
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
        if (this.datasourcedata.dbKey === '' || this.datasourcedata.dbKey === undefined) {
          this.sumitState = false;
          this.warnDisplay('请输入数据库主键！');
        }
        else if (this.datasourcedata.description === '' || this.datasourcedata.description === undefined) {
          this.sumitState = false;
          this.warnDisplay('请输入描述！');
        }
        else if (this.datasourcedata.driverClass === '' || this.datasourcedata.driverClass === undefined) {
          this.sumitState = false;
          this.warnDisplay('请选择数据库类型！');
        }
        else if (this.datasourcedata.dbType === '' || this.datasourcedata.dbType === undefined) {
          this.sumitState = false;
          this.warnDisplay('请选择数据库类型！');
        }
        else if (this.datasourcedata.url === '' || this.datasourcedata.url === undefined) {
          this.sumitState = false;
          this.warnDisplay('请输入数据库连接！');
        }
        else if (!this.datasorceAddState && (this.datasourcedata.dbUser === '' || this.datasourcedata.dbUser === undefined)) {
          this.sumitState = false;
          this.warnDisplay('请输入用户名！');
        }
        else if (this.datasourcedata.dbPassword === '' || this.datasourcedata.dbPassword === undefined) {
          this.sumitState = false;
          this.warnDisplay('请输入密码！');
        }
        else if (this.datasourcedata.dbName === '' || this.datasourcedata.dbName === undefined) {
          this.sumitState = false;
          this.warnDisplay('请输入数据库名！');
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
      testConnect() {
        this.taskcheck();
        if (this.sumitState) {
          this.datasourcedata.dbPassword = this.datasourcedata.wordtext;
          SystemService.testConnect(this.datasourcedata).then(response => {
            if (response.code === '0') {
              this.warnDisplay('数据库连接成功！');
            }
            else {
              this.warnDisplay(response.msg);
            }
          });
        }
      },
      /*
       * 确认操作
       * 2018年4月10日11:49:27 gk
       * */
      confirm(value) {
        if (value) {
          this.taskcheck();
          if (this.sumitState) {
            this.datasourcedataedit();
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
            this.datasourcedata.driverClass = response.driverClass;
            this.datasourcedata.url = response.url;
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

  .datasourceloading {
    height: 100vh;
    width: 100vw;
    text-align: center;
    background-color: $faintBlack;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2999;
    box-sizing: content-box;
    .himdatasource {
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
      .datasourcehead {
        padding: 14px 16px;
        line-height: 1;
      }
      .datasourcebody {
        padding: 3px 16px 16px;
        font-size: 12px;
        line-height: 3;
        text-align: left;
        .datasource-detail {
          width: 90%;
          margin: auto;
          margin-top: 10px;
        }
        .datasource-right {
          width: 90%;
          margin: auto;
          margin-top: 10px;
        }
        .datasource-leftdetail {
          display: inline-block;
          width: 20%;
          font-size: 14px;
        }
        .datasource-leftrightdetail {
          display: inline-block;
          width: 20%;
          font-size: 14px;
          color: $grey20;
        }
        .datasource-rightdetail {
          display: inline-block;
          width: 70%;
          font-size: 14px;
        }
        .datasource-rightcheckdetail {
          display: inline-block;
          width: 75%;
          font-size: 14px;
        }
      }
      .datasourcefoot {
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
  .datasource {
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
