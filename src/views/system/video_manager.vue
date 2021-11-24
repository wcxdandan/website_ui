<template>
  <div>
    <Card id="video_manager">
      <h4 slot="title">
        <Select id="zhifufangshi"  clearable style="width: 15%;" placeholder="全部类型" v-model="videoType">
          <Option value="全部类型">全部类型</Option>
          <Option v-for="item in videoTypeList" :value="item.id" :key="item.id">{{item.TypeName}}</Option>
        </Select>
        <Input placeholder="请输入标题" style="width: 15%;margin-left: 1%;" clearable v-model="videoTitle"/>
        <Button class="addData" type="primary" style="width: 10%;float: right;margin-left: 2%;" @click="addVideo">新增</Button>
        <Button class="resetData" type="primary" style="width: 10%;float: right;margin-left: 34%;" @click="resert">重置</Button>
        <Button class="searchData" type="primary" style="width: 10%;float: right;margin-left: 2%;" @click="queryVideoTypEAndTitle">查询</Button>
      </h4>
      <alert-message v-if="alertStates" v-on:confirmstate="getconfirm" message="是否删除该视频"></alert-message>
      <div class="content">
        <Table border :columns="historyColumns" :data="videoInfo" no-data-text="暂无数据"></Table>
      </div>
      <Page :total="dataCount" :page-size="pageSize" show-total class="paging" :transfer="true"
            @on-change="changepage" :current="currentPage"></Page>
    </Card>
    <loading v-if="isLoading"></loading>
    <add-video v-if="addVideoStatus" v-on:confirmstate="getaddVideoStatus"></add-video>
  </div>
</template>
<script type="text/javascript">
  import * as homeService from '../../service/homeService';
  import * as UtilsService from '../../utils/utilsService';
  export default {
    data() {
      return {
        addVideoStatus: false,
        dataCount: 0, // 初始化信息总条数
        pageSize: 10, // 每页显示多少条
        currentPage: 1,
        isLoading: false,
        videoTypeList: [], // 存放视频类别list
        videoTitle: '', // 视频标题
        alertStates: false,
        videoId: '',
        videoType: '全部类型', // 视频类型
        typeEnglish: '', // 视频类型缩写
        dataTemp: [], // 存放临时数据
        videoInfo: [], // 存放列表数据
        historyColumns: [
          {
            title: '视频类型',
            key: 'TypeName',
            align: 'center'
          },
          {
            title: '视频标题',
            key: 'title',
            align: 'center',
            width: 250
          },
          {
            title: '视频状态',
            key: 'status',
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
              if (this.videoInfo[params.index].status === '待发布') {
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
                      this.editVideo(params.index);
                      // UtilsService.cleanSessionStorage('v');
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
                      this.deleteInfo(params.index);
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
      getAddVideoStatus() {
        this.addVideoStatus = false;
        this.queryVideoType();
      },
      queryvideoTypeList() {
        this.isLoading = true;
        homeService.queryVideoTypeList('videoType').then(result => {
          this.isLoading = false;
          if (result.code === '0') {
//            console.log(result.videoTypeList);
            this.videoTypeList = result.videoTypeList;
          }
          else {
            this.alertMsg(result.msg);
          }
        });
      },
      addVideo() {
        UtilsService.cleanSessionStorage('v');
        this.addVideoStatus = true;
      },
      editVideo(index) {
        this.addVideoStatus = true;
        UtilsService.cleanSessionStorage('v');
        UtilsService.setSessionStorage('v', this.videoInfo[index]);
        this.queryVideoType();
      },
      getaddVideoStatus() {
        this.addVideoStatus = false;
        this.queryVideoTypEAndTitle();
        this.queryVideoType();
      },
      // 重置
      resert() {
        this.videoTitle = '';
        this.videoType = '全部类型';
        this.queryVideoTypEAndTitle();
      },
      judge() {
        if (this.videoType === 'ff80808151399d0d015139b2c9ce0011') {
          this.typeEnglish = '山东省会员代表大会';
        }
        else if (this.videoType === 'ff80808151399d0d015139b2c9ce0012') {
          this.typeEnglish = '人文医学';
        }
        else {
          this.typeEnglish = '';
        }
      },
      queryVideoType() {
        this.judge();
        homeService.queryVideoTypEAndTitle(this.typeEnglish, '').then(response => {
          if (response.code === '0') {
            this.dataTemp = response.list;
            for (let i = 0; i < this.dataTemp.length; i++) {
              this.dataTemp[i].createDate = this.timestampToTime(this.dataTemp[i].createDate);
            }
            this.handleListApproveHistory();
          }
          else {
            this.open(response.msg);
            return;
          }
        });
      },
      delete(index) {
        homeService.deleteNews(this.videoInfo[index].id).then(result => {
          if (result.code === '0') {
            this.$Notice.info({
              title: '信息提示：',
              desc: '删除成功'
            });
            this.queryVideoType();
          }
          else {
            this.alertMsg(result.msg);
          }
        });
      },
      release(index) {
        homeService.release(this.videoInfo[index].id).then(response => {
          if (response.code === '0') {
            this.alertMsg(response.msg);
            this.queryVideoTypEAndTitle();
            this.queryVideoType();
          }
        });
      },
      deleteInfo(index) {
        this.alertStates = true;
        this.videoId = index;
        this.queryVideoType();
        this.queryvideoTypeList();
      },
      queryVideoTypEAndTitle() {
        this.currentPage = 1;
        this.judge();
        homeService.queryVideoTypEAndTitle(this.typeEnglish, this.videoTitle).then(response => {
          if (response.code === '0') {
            this.dataTemp = response.list;
            this.handleListApproveHistory();
            for (let i = 0; i < this.dataTemp.length; i++) {
              this.dataTemp[i].createDate = this.timestampToTime(this.dataTemp[i].createDate);
            }
          }
        });
      },
      // 时间戳转化时间
      timestampToTime(timestamp) {
        let date = new Date(timestamp * 1000);
        let Y = date.getFullYear() + '';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '';
        let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '';
        return Y + '-' + M + '-' + D;
      },
      getconfirm(value) {
        if (value) {
          this.alertStates = false;
          this.delete(this.videoId);
        }
        else {
          this.alertStates = false;
        }
        this.queryVideoTypEAndTitle();
      },
      // 获取历史记录信息
      handleListApproveHistory() {
        // 保存取到的所有数据
        this.dataCount = this.dataTemp.length;
        if (this.dataTemp.length < this.pageSize) {
          this.videoInfo = this.dataTemp;
        }
        else {
          this.videoInfo = this.dataTemp.slice(0, this.pageSize);
        }
      },
      changepage(index) {
        var _start = (index - 1) * this.pageSize;
        var _end = index * this.pageSize;
        this.currentPage = index;
        this.videoInfo = this.dataTemp.slice(_start, _end);
      },
      alertMsg(msg) {
        this.$Notice.info({
          title: '信息提示：',
          desc: msg
        });
      }
    },
    created: function() {
      this.queryvideoTypeList();
      this.queryVideoType();
      this.queryVideoTypEAndTitle();
      document.title = '视频中心';
      this.videoType = '全部类型';
    }
  };

</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/base/fn";
  #video_manager .ivu-card-head {
    background-color: $grey8;
  }
  #video_manager .ivu-card-body {
    padding-top: 20px;
  }
  .content {
    width: 100%;
    height: auto;
  }
</style>
