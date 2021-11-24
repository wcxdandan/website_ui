<template>
  <div class="add-news">
    <div class="add-news-detail">
      <div class="add-ordinary-log-top" id="head">
        <div class="title">{{counterpartSupportId !== null ? '编辑对口支援' : '新增对口支援'}}</div>
        <div class="close" @click="confirm(false)"><i class="iconfont icon-style">&#xea60;</i></div>
      </div>
      <div style="clear: both;"></div>
      <div class="content">
        <div class="detail">
          <div class="detail-left"><span class="span-style">*</span>类别:</div>
          <div class="detail-right" style="width: 40%;text-align: left;">
            <Select id="zhifufangshi"  clearable style="width: 50%;float: left;" placeholder="请选择类型" v-model="counterpartSupport.type">
              <Option value="wmys">万名医师支援农村卫生工程</Option>
              <Option value="wsqj">卫生强基工程</Option>
              <Option value="xjyy">县级医院骨干医师培训</Option>
              <Option value="sjsn">省际、省内东西部对口支援</Option>
            </Select>
          </div>
        </div>
        <div class="detail">
          <div class="detail-left"><span class="span-style">*</span>发布日期:</div>
          <div class="detail-right" style="width: 40%;">
            <!--<DatePicker  type="datetime" format="yyyy-MM-dd" style="width: 100%" placeholder="请选择日志日期" v-model="counterpartSupport.createDate" >-->
            <!--</DatePicker>-->
            <Date-picker type="date" :options="options4" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" v-model="counterpartSupport.createDate">
            </Date-picker>
          </div>
        </div>
        <div class="detail">
          <div class="detail-left"><span class="span-style">*</span>标题:</div>
          <div class="detail-right" style="width: 40%;">
            <Input  placeholder="请输入标题" style="width: 100%" v-model="counterpartSupport.title" :maxlength = 80 />
          </div>
        </div>
        <div class="detail" style="height: 370px;">
          <div class="detail-left"><span class="span-style">*</span>内容描述:</div>
          <div class="detail-right" style="width: 90%;text-align: left;">
            <vue-ueditor-wrap v-model="counterpartSupport.content" :config="config"></vue-ueditor-wrap>
            <!--<quill-editor :options="editorOption" ref="myQuillEditor" v-model="counterpartSupport.content" >-->
            <!--</quill-editor>-->
            <!--<div @click="selectImgs">-->
              <!--<input class="select-Img-File-input" ref="selectImgOrFileInputs" type="file" accept="image/*" @change="selectCallBacks">-->
            <!--</div>-->
          </div>
        </div>
      </div>
      <div class="bottom-content">
        <div class="btn-common cancel" @click="confirm(false)">取消</div>
        <div class="btn-common" @click="incheck(1)">保存</div>
        <div class="btn-common" @click="incheck(0)">发布</div>
      </div>
    </div>
    <alert-message v-if="alertStates" v-on:confirmstate="getconfirm" :message="alertMessage"></alert-message>
  </div>
</template>
<script>
  import * as constantsUtil from '../utils/constantsUtil';
//  import * as ToolClassUtil from '../utils/toolClassUtil';
  import * as UtilsService from '../utils/utilsService';
  import * as counterpartSupportService from '../service/counterpartSupportService';
//  import Quill from 'quill';

  export default {
    name: 'add-counterpartSupport',
    props: {},
    data() {
      return {
        options4: {
          disabledDate(date) {
            return date && date.valueOf() > Date.now();
          }
        },
        counterpartSupportId: '',
        alertMessage: '',
        alertStates: false,
        imgUrlPath: constantsUtil.ALI_CLOUD_VISIT_SERVER,
        isLoading: false,
        content: '',
        ueditorImgUrl: '',
        imgUrlPhoto: '',
        newTypeList: [],
        newsType: '',
        associationList: '',
        counterpartSupport: {
          id: '',
          title: '',
          type: '',
          content: '',
          createDate: new Date().toString('yyyy-MM-dd'),
          userId: UtilsService.getAccountId(),
          isRelease: ''
        },
        config: {
          // 编辑器不自动被内容撑高
          autoHeightEnabled: false,
          // 初始容器高度
          initialFrameHeight: 240,
          // 初始容器宽度
          initialFrameWidth: '100%',
          // 上传文件接口
          serverUrl: UtilsService.LOCALHOSTHim + 'controller.jsp'
        }
//        editorOption: {
//          placeholder: '请输入正文内容',
//          modules: {
//            toolbar: [
//              [{ 'size': ['small', 'large', 'huge'] }],
//              ['bold', 'italic', 'underline'],
//              ['blockquote'],
//              [{'align': []}],
//              [{ 'font': [] }],
//              [{ 'align': [] }],
//              ['link', 'image', 'video']
//            ]
//          }
//        }
      };
    },
    mounted() {
//      let Align = Quill.import('attributors/style/align');
//      Quill.register(Align, true);
//      this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler);
      if (!window.ActiveXObject || 'ActiveXObject' in window) {
        document.getElementById('head').style.zIndex = '1000';
        document.getElementById('head').style.position = 'absolute';
      }
    },
    methods: {
      getconfirm(value) {
        if (value === true) {
          this.saveNews(0);
        }
        this.alertStates = false;
      },
      // 发布消息
      releaseInfo() {
        this.alertStates = true;
        this.alertMessage = '是否发布信息？';
      },
      incheck(params) {
        if (UtilsService.isStringBlank(this.counterpartSupport.title)) {
          this.alertMsg('标题不能为空');
          return false;
        }
        else if (UtilsService.isStringBlank(this.counterpartSupport.createDate)) {
          this.alertMsg('日期选择不能为空');
          return false;
        }
        else if (UtilsService.isStringBlank(this.counterpartSupport.type)) {
          this.alertMsg('类型不能为空');
          return false;
        }
        else if (UtilsService.isStringBlank(this.counterpartSupport.content)) {
          this.alertMsg('内容不能为空');
          return false;
        }
        else if (params === 0) {
          this.releaseInfo(params);
        }
        else {
          this.saveNews(params);
        }
      },
      saveNews(params) {
        if (params === 0) { // 发布
          this.counterpartSupport.isRelease = '2';
          counterpartSupportService.insertCounterpartSupport(this.counterpartSupport).then(result => {
            if (result.code === '0') {
              this.alertMsg(result.msg);
              this.confirm(false);
            }
            else {
              this.alertMsg(result.msg);
            }
          });
        }
        else { // 保存
          this.counterpartSupport.isRelease = '1';
          counterpartSupportService.insertCounterpartSupport(this.counterpartSupport).then(result => {
            if (result.code === '0') {
              this.alertMsg(result.msg);
              this.confirm(false);
            }
            else {
              this.alertMsg(result.msg);
            }
          });
        }
      },
//      imgHandler() {
//        this.selectImgs();
//      },
      confirm(value) {
        if (value === false) {
          this.$emit('addconfirmstate', value);
          UtilsService.cleanSessionStorage('newsList');
        }
      },
//      selectImgs() {
//        this.$refs.selectImgOrFileInputs.click();
//      },
//      selectCallBacks() {
//        if (this.$refs.selectImgOrFileInputs.files.length !== 0) {
//          if (this.$refs.selectImgOrFileInputs.files.length > 1) {
//            this.alertMsg('请选择一张图片');
//            return false;
//          }
//          let key = '/ysxhweb/news';
//          this.isLoading = true;
//          ToolClassUtil.uploadImage(this.$refs.selectImgOrFileInputs.files, key, this.sendCallBacks);
//        }
//      },
      // 上传OSS回调
//      sendCallBacks(val, files, imageUrl, result) {
//        this.isLoading = false;
//        this.$refs.selectImgOrFileInputs.value = '';
//        if (result) {
//          if (result === 'error') {
//            this.alertMsg('图片大小请不超过' + constantsUtil.IMAGE_SIZE / 1024 / 1024 + 'MB');
//            return false;
//          }
//          if (val === 1) {
//            this.ueditorImgUrl = constantsUtil.ALI_CLOUD_VISIT_SERVER + imageUrl;
//            let quill = this.$refs.myQuillEditor.quill;
//            let length = quill.getSelection().index;
//            quill.insertEmbed(length, 'image', this.ueditorImgUrl);
//            quill.setSelection(length + 1);
//          }
//          else {
//            this.alertMsg(constantsUtil.MESSAGE_CAN_NOT_CONNECT);
//          }
//        }
//        else {
//          this.alertMsg(constantsUtil.MESSAGE_CAN_NOT_CONNECT);
//        }
//      },
      // 提示信息
      alertMsg(msg) {
        this.$Notice.info({
          title: '信息提示：',
          desc: msg
        });
      },
      fmtDate(obj) {
        var date = new Date(obj);
        var y = 1900 + date.getYear();
        var m = '0' + (date.getMonth() + 1);
        var d = '0' + date.getDate();
        return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length);
      },
      getDate() {
        let date = new Date();
        return date.getFullYear() + '' + (date.getMonth() + 1) + '' + date.getDate() + '' + date.getHours() + '' + date.getMinutes() + '' + date.getSeconds();
      },
      queryCounterpartSupportById(id) {
        counterpartSupportService.queryCounterpartSupportById(id).then(result => {
          if (result.code === '0') {
            for (let i = 0; i < result.list.length; i++) {
              this.counterpartSupport.title = result.list[0].title;
              this.counterpartSupport.content = result.list[0].newsContent;
              this.counterpartSupport.type = result.list[0].type;
              this.counterpartSupport.id = result.list[0].id;
              this.counterpartSupport.createDate = this.fmtDate(result.list[0].createDate * 1000);
            }
          }
          else {
            this.alertMsg(result.msg);
          }
        });
      }
    },
    created: function() {
      this.counterpartSupportId = UtilsService.getSessionStorage('counterpartSupportId');
      if (this.counterpartSupportId !== null) {
        this.queryCounterpartSupportById(this.counterpartSupportId);
      }
    }
  };
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../assets/css/base/fn.scss";
  .select-Img-File-input {
    display: none;
  }
  .span-style {
    float: left;
    color: red;
    display: block;
    margin-top: 2px;
    margin-left: -15%;
  }
  .quill-editor {
    height: 300px;
  }
  .add-news {
    height: 100vh;
    width: 100vw;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3999;
    box-sizing: content-box;
    background-color: rgba(55, 55, 55, 0.6);
    .iconfont {
      font-family: 'iconfont' !important;
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;
    }
    .icon-style {
      font-size: 20px;
      color: $black;
    }
    .add-news-detail {
      top: 17%;
      left: 55%;
      position: fixed;
      border: 0;
      border-radius: 6px;
      background-clip: padding-box;
      z-index: 3000;
      width: 70%;
      height: 73%;
      transform: translate(-50%, 0);
      background-color: $white;
      .add-ordinary-log-top {
        position: fixed;
        left: 0;
        top: 0;
        height: 50px;
        width: 100%;
        border-bottom: 1px solid $grey63;
        .title {
          float: left;
          width: auto;
          height: 50px;
          line-height: 50px;
          font-size: 20px;
          margin-left: 30px;
          color: $black;
        }
        .close {
          float: right;
          margin-right: 15px;
          margin-top: 5px;
          font-size: 20px;
          cursor: pointer;
        }
      }
      .content {
        overflow: auto;
        padding: 1% 5%;
        margin-top: 50px;
        width: 100%;
        height: 79%;
        // background-color: pink;
        .detail {
          width: 90%;
          height: 30px;
          margin-bottom: 10px;
          .detail-left {
            float: left;
            width: 10%;
            height: 32px;
            font-size: 15px;
            text-align: left;
            line-height: 32px;
          }
          .detail-right {
            float: left;
            width: 60%;
          }
        }
      }
      .bottom-content {
        padding-top: 9px;
        margin-top: 30px;
        width: 100%;
        border-top: 1px solid $grey63;
        .btn-common {
          float: right;
          width: 170px;
          height: 35px;
          background-color: $blue41;
          border-radius: 5px;
          text-align: center;
          line-height: 35px;
          margin-right: 20px;
          color: $white;
          cursor: pointer;
          margin-bottom: 1%;
          margin-top: 5px;
        }
        .cancel {
          background-color: $white;
          color: $blue41;
          border: 1px solid $blue41;
        }
      }
    }
  }
</style>
