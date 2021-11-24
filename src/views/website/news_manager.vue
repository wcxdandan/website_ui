<template>
  <div>
    <Card id="news_manager">
      <h4 slot="title">
        <Select id="zhifufangshi"  clearable style="width: 15%;" placeholder="新闻类型" v-model="newsType">
          <Option value="全部">全部</Option>
          <Option v-for="item in newTypeList" :value="item.id" :key="item.id">{{ item.typeName }}</Option>
        </Select>
        <Input placeholder="请输入标题" style="width: 15%;margin-left: 1%;" clearable v-model="newsTitle"/>
        <Button class="addData" type="primary" style="width: 10%;float: right;margin-left: 2%;" @click="addNews">新增</Button>
        <Button class="resetData" type="primary" style="width: 10%;float: right;margin-left: 34%;" @click="resert">重置</Button>
        <Button class="searchData" type="primary" style="width: 10%;float: right;margin-left: 2%;" @click="queryAllNews">搜索</Button>
      </h4>
      <div class="content">
        <Table border :columns="historyColumns" :data="newsList" no-data-text="暂无数据"></Table>
        <Page :total="dataCount" :page-size="pageSize" show-total class="paging" :transfer="true"
              @on-change="changepage"></Page>
      </div>
    </Card>
    <loading v-if="isLoading"></loading>
    <add-news v-if="addNewsStatus" v-on:addconfirmstate="getAddNewsStatus"></add-news>
  </div>
</template>
<script type="text/javascript">
  import * as newsManagerService from '../../service/newsManagerService';
//  import * as UtilsService from '../../utils/utilsService';
  export default {
    data() {
      return {
        addNewsStatus: false,
        dataCount: 0, // 初始化信息总条数
        pageSize: 10, // 每页显示多少条
        isLoading: false,
        newTypeList: [], // 存放新闻类别list
        newsTitle: '', // 新闻标题
        newsType: '全部', // 新闻类型
        dataTemp: [], // 存放临时数据
        newsList: [], // 存放列表数据
        historyColumns: [
          {
            title: '新闻标题',
            key: 'newsTitle',
            align: 'center'
          },
          {
            title: '新闻类型',
            key: 'typename',
            align: 'center',
            width: 300
          },
          {
            title: '创建时间',
            key: 'createDate',
            align: 'center',
            width: 300
          },
          {
            title: '操作',
            align: 'center',
            width: 200,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    width: '46%',
                    padding: '3px 3px'
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
      getAddNewsStatus() {
        this.addNewsStatus = false;
      },
      addNews() {
        this.addNewsStatus = true;
      },
      // 重置
      resert() {
        this.newsType = '全部';
        this.newsTitle = '';
      },
      confirm(value) {
        if (value === false) {
          this.$emit('addconfirmstate', value);
        }
      },
      queryNewsType() {
        this.isLoading = true;
        newsManagerService.queryNewsType().then(result => {
          this.isLoading = false;
          if (result.code === '0') {
            this.newTypeList = result.list;
          }
          else {
            this.alertMsg(result.msg);
          }
        });
      },
      // 查询新闻
      queryAllNews() {
        if (this.newsType === '全部') {
          newsManagerService.queryNewsByNewsTypeIdAndNewsTitle('', this.newsTitle).then(result => {
            if (result.code === '0') {
              this.dataTemp = result.list;
              for (let i = 0; i < this.dataTemp.length; i++) {
                this.dataTemp[i].createDate = this.fmtDate(this.dataTemp[i].createDate * 1000);
              }
              this.handleListApproveHistory();
            }
            else {
              this.alertMsg(result.msg);
            }
          });
        }
        else {
          newsManagerService.queryNewsByNewsTypeIdAndNewsTitle(this.newsType, this.newsTitle).then(result => {
            if (result.code === '0') {
              this.dataTemp = result.list;
              for (let i = 0; i < this.dataTemp.length; i++) {
                this.dataTemp[i].createDate = this.fmtDate(this.dataTemp[i].createDate * 1000);
              }
              this.handleListApproveHistory();
            }
            else {
              this.alertMsg(result.msg);
            }
          });
        }
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
        this.newsList = this.dataTemp.slice(_start, _end);
      },
      // 获取历史记录信息
      handleListApproveHistory() {
        // 保存取到的所有数据
        this.dataCount = this.dataTemp.length;
        // console.log('count:' + this.dataCount);
        if (this.dataTemp.length < this.pageSize) {
          this.newsList = this.dataTemp;
        }
        else {
          this.newsList = this.dataTemp.slice(0, this.pageSize);
        }
      },
      fmtDate(obj) {
        var date = new Date(obj);
        var y = 1900 + date.getYear();
        var m = '0' + (date.getMonth() + 1);
        var d = '0' + date.getDate();
        return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length);
      }
    },
    created: function() {
      document.title = '新闻管理';
      this.queryNewsType();
      this.queryAllNews();
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/base/fn.scss";
  #news_manager .ivu-card-head {
    background-color: $grey8;
  }
  #news_manager .ivu-card-body {
    padding-top: 20px;
  }
  .content {
    width: 100%;
    height: auto;
  }
</style>
