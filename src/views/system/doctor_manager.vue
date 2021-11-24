<template>
  <div>
    <Card id="doctor_manager">
      <h4 slot="title">
        <Select id="type"  style="width: 15%;" clearable placeholder="类型" v-model="doctorType">
          <Option value="全部">全部类型</Option>
          <Option v-for="item in doctorTypeList" :value="item" :key="item">{{ item }}</Option>
        </Select>
        <Select id="fallDueNum"  clearable style="width: 15%;" placeholder="届数" v-model="number">
          <Option value="全部">全部届数</Option>
          <Option v-for="item in numberList" :value="item" :key="item">{{ item }}</Option>
        </Select>
        <Input placeholder="请输入标题" style="width: 15%;margin-left: 1%;" clearable v-model="doctorTitle"/>
        <Button class="addData" type="primary" style="width: 10%;float: right;margin-left: 2%;" @click="addDoctor">新增</Button>
        <Button class="resetData" type="primary" style="width: 10%;float: right;margin-left: 18%;" @click="resert">重置</Button>
        <Button class="searchData" type="primary" style="width: 10%;float: right;margin-left: 2%;" @click="queryDoctors">查询</Button>
      </h4>
      <div class="content">
        <Table border :columns="historyColumns" :data="doctorList" no-data-text="暂无数据"></Table>
        <Page :total="dataCount" :page-size="pageSize" show-total class="paging" :transfer="true"
              @on-change="changepage" :current="currentPage"></Page>
      </div>
    </Card>
    <loading v-if="isLoading"></loading>
    <add-doctor v-if="addDoctorStatus" v-on:confirmstate="getAddDoctorStatus"></add-doctor>
    <alert-message v-if="alertStates" v-on:confirmstate="getconfirm" message="是否删除该医师信息"></alert-message>
  </div>
</template>
<script type="text/javascript">
  // import * as newsManagerService from '../../service/newsManagerService';
  import * as associationIntroduceService from '../../service/associationIntroduceService';
  import * as UtilsService from '../../utils/utilsService';
  export default {
    data() {
      return {
        addDoctorStatus: false,
        alertStates: false,
        dataCount: 0, // 初始化信息总条数
        pageSize: 10, // 每页显示多少条
        currentPage: 1,
        isLoading: false,
        doctorTypeList: ['重要消息', '大会照片', '十佳医师', '优秀医师', '十佳女医师', '十佳青年医师'], // 存放医师类别list
        doctorTitle: '', // 标题
        doctorType: '全部类型', // 医师类型
        typeEnglish: '',
        numberList: ['第一届', '第二届', '第三届', '第四届', '第五届', '第六届', '第七届'],
        number: '全部届数', // 届数
        newnumber: '',
        doctorId: '',
        dataTemp: [], // 存放临时数据
        doctorList: [], // 存放列表数据
        historyColumns: [
          {
            title: '类型',
            key: 'type',
            align: 'center'
          },
          {
            title: '届数',
            key: 'jieShu',
            align: 'center'
          },
          {
            title: '标题',
            key: 'title',
            align: 'center',
            width: 250
          },
          {
            title: '信息状态',
            key: 'isRelease',
            align: 'center'
          },
          {
            title: '浏览次数',
            key: 'browseNumber',
            align: 'center'
          },
          {
            title: '创建时间',
            key: 'createDate',
            align: 'center'
          },
          {
            title: '操作',
            align: 'center',
            render: (h, params) => {
              let temp = h('div', '');
              if (this.doctorList[params.index].isRelease === '待发布') {
                temp = h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    width: '25%',
                    padding: '3px 3px',
                    float: 'left',
                    marginRight: '8px'
                  },
                  on: {
                    click: () => {
                      this.release(params.index);
                    }
                  }
                }, '发布');
              }
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    width: '25%',
                    padding: '3px 3px',
                    float: 'left',
                    marginRight: '8px'
                  },
                  on: {
                    click: () => {
                      this.editDoctor(params.index);
                    }
                  }
                }, '编辑'),
                temp,
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    width: '25%',
                    padding: '3px 3px',
                    float: 'left',
                    marginRight: '8px'
                  },
                  on: {
                    click: () => {
                      this.delete(params.index);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ]
      };
    },
    methods: {
      getAddDoctorStatus() {
        this.addDoctorStatus = false;
        this.queryDoctors();
      },
      addDoctor() {
        UtilsService.cleanSessionStorage('d');
        this.addDoctorStatus = true;
        this.queryDoctors();
      },
      // 重置
      resert() {
        this.doctorTitle = '';
        this.doctorType = '全部';
        this.number = '全部';
        this.queryDoctors();
      },
      confirm(value) {
        if (value === false) {
          this.$emit('addconfirmstate', value);
        }
      },
      // 判断
      judge() {
        // 类型判断
        if (this.doctorType === '重要消息') {
          this.typeEnglish = 'zyxx';
        }
        else if (this.doctorType === '大会照片') {
          this.typeEnglish = 'dhzp';
        }
        else if (this.doctorType === '十佳医师') {
          this.typeEnglish = 'sjys';
        }
        else if (this.doctorType === '优秀医师') {
          this.typeEnglish = 'yxys';
        }
        else if (this.doctorType === '十佳青年医师') {
          this.typeEnglish = 'sjqnys';
        }
        else if (this.doctorType === '十佳女医师') {
          this.typeEnglish = 'sjnys';
        }
        else {
          this.typeEnglish = '';
        }
        // 届数判断
        if (this.number === '第一届') {
          this.newnumber = '01';
        }
        else if (this.number === '第二届') {
          this.newnumber = '02';
        }
        else if (this.number === '第三届') {
          this.newnumber = '03';
        }
        else if (this.number === '第四届') {
          this.newnumber = '04';
        }
        else if (this.number === '第五届') {
          this.newnumber = '05';
        }
        else if (this.number === '第六届') {
          this.newnumber = '06';
        }
        else if (this.number === '第七届') {
          this.newnumber = '07';
        }
        else {
          this.newnumber = '';
        }
      },
      queryDoctors() {
        this.currentPage = 1;
        this.judge();
        associationIntroduceService.tenDoctorSelect(this.typeEnglish, this.newnumber, this.doctorTitle).then(result => {
          if (result !== null) {
            if (result.code === '0') {
              this.dataTemp = result.list;
              // this.doctorList = result.list;
              this.handleListApproveHistory();
              for (let i = 0; i < this.dataTemp.length; i++) {
                this.dataTemp[i].createDate = this.fmtDate(this.dataTemp[i].createDate * 1000);
              }
            }
            else {
              this.alertMsg(result.msg);
            }
          }
          else {
            this.alertMsg(UtilsService.MESSAGE_CAN_NOT_CONNECT);
          }
        });
      },
      alertMsg(msg) {
        this.$Notice.info({
          title: '信息提示：',
          desc: msg
        });
      },
      changepage(index) {
        var _start = (index - 1) * this.pageSize;
        var _end = index * this.pageSize;
        this.currentPage = index;
        this.doctorList = this.dataTemp.slice(_start, _end);
      },
      editDoctor(index) {
        this.addDoctorStatus = true;
        UtilsService.cleanSessionStorage('d');
        UtilsService.setSessionStorage('d', this.doctorList[index]);
        this.queryDoctors();
      },
      // 获取历史记录信息
      handleListApproveHistory() {
        // 保存取到的所有数据
        this.dataCount = this.dataTemp.length;
        if (this.dataTemp.length < this.pageSize) {
          this.doctorList = this.dataTemp;
        }
        else {
          this.doctorList = this.dataTemp.slice(0, this.pageSize);
        }
      },
      fmtDate(obj) {
        var date = new Date(obj);
        var y = 1900 + date.getYear();
        var m = '0' + (date.getMonth() + 1);
        var d = '0' + date.getDate();
        return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length);
      },
      delete(index) {
        this.alertStates = true;
        this.doctorId = index;
      },
      getconfirm(value) {
        this.alertStates = false;
        if (value) {
          associationIntroduceService.deleteDoctors(this.doctorList[this.doctorId].id).then(result => {
            if (result.code === '0') {
              this.$Notice.info({
                title: '信息提示：',
                desc: '删除成功'
              });
              this.queryDoctors();
            }
            else {
              this.alertMsg(result.msg);
            }
          });
          this.queryDoctors();
        }
        else {
          this.alertStates = false;
        }
      },
      release(index) {
        associationIntroduceService.release(this.doctorList[index].id).then(result => {
          if (result.code === '0') {
            this.$Notice.info({
              title: '信息提示：',
              desc: '发布成功'
            });
            this.queryDoctors();
          }
          else {
            this.alertMsg(result.msg);
          }
        });
      }
    },
    created: function() {
      document.title = '十佳医师';
      this.doctorType = '全部';
      this.number = '全部';
      this.queryDoctors();
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/base/fn";
  #doctor_manager .ivu-card-head {
    background-color: $grey8;
  }
  #doctor_manager .ivu-card-body {
    padding-top: 20px;
  }
  .content {
    width: 100%;
    height: auto;
  }
</style>
