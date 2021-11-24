<template>
  <div class="add-news">
    <div class="add-news-detail">
      <div class="add-ordinary-log-top" id="head">
        <div class="title">{{newsId !== '' ? '编辑新闻' : '新增新闻'}}</div>
        <div class="close" @click="confirm(false)"><i class="iconfont icon-style">&#xea60;</i></div>
      </div>
      <div style="clear: both;"></div>
      <div class="content">
        <div class="detail">
          <div class="detail-left"><span class="span-style">*</span>新闻类别:</div>
          <div class="detail-right" style="width: 40%;text-align: left;">
            <Select id="zhifufangshi"  clearable style="width: 100%;" placeholder="新闻类型" v-model="newsInfo.newsType">
              <Option v-for="item in newTypeList" :value="item.id" :key="item.id">{{ item.typeName }}</Option>
            </Select>
          </div>
        </div>
        <div class="detail">
          <div class="detail-left"><span class="span-style">*</span>新闻标题:</div>
          <div class="detail-right" style="width: 40%;">
            <Input  placeholder="请输入新闻标题" style="width: 100%" v-model="newsInfo.newsTitle" :maxlength=60 />
          </div>
        </div>
        <div class="detail" v-if="this.newsInfo.newsTypeName !== '下载专栏'">
          <div class="detail-left"><span class="span-style">*</span>是否轮播:</div>
          <div class="detail-right" style="width: 16%;">
            <RadioGroup v-model="newsInfo.isCarousel">
              <Radio label="2">是</Radio>
              <Radio label="1">否</Radio>
            </RadioGroup>
          </div>
        </div>
        <div class="detail" style="height: 10%;" v-if="this.newsInfo.newsTypeName !== '下载专栏'">
          <div class="detail-left"><span class="span-style" id="imgageId">*</span>标题图片:</div>
          <div class="detail-right" style="width: 40%;height: 100%;border: 1px solid #dddee1;" @click="selectImg" @mouseover="judgeInfo">
            <span v-if="!newsInfo.titlePicture">点击上传标题图片</span>
            <input class="select-Img-File-input" ref="selectImgOrFileInput" type="file" accept="image/*" @change="selectCallBack">
            <div style="width: 50%;height: 100%;"><img v-if="newsInfo.titlePicture" :src="newsInfo.titlePicture" style="width: 100%;height: 100%;" v-model="newsInfo.titlePicture"></div>
          </div>
        </div>
        <div class="detail" style="height: 10%;" v-if="this.newsInfo.newsTypeName === '下载专栏'">
          <div class="detail-left"><span class="span-style" id="fileId">*</span>文件:</div>
          <div class="detail-right" style="width: 40%;height: 100%;border: 1px solid #dddee1;" @click="selectImgFile" @mouseover="judgeInfo">
            <span v-if="!newsInfo.titlePicture">点击上传文件</span>
            <input class="select-Img-File-input" ref="fileInput" type="file" :accept="fileType.type" @change="selectCallBackFile">
            <div style="width: 100%;height:100%;"><span style="word-wrap:break-word;" v-if="newsInfo.titlePicture">{{newsInfo.titlePicture}}</span></div>
          </div>
        </div>
        <div class="detail" v-if="this.newsInfo.newsTypeName === '下载专栏'">
          <div class="detail-left"><span class="span-style" id="fileName"></span>文件名:</div>
          <div class="detail-right" style="width: 40%;height: 100%;border: 1px solid #dddee1;">
            <input class="select-Img-File-input" ref="fileInput" type="file" :accept="fileType.type">
            <div style="width: 100%;height:100%;"><span style="word-wrap:break-word;" v-if="newsInfo.titlePicture">{{newsInfo.fileName}}</span></div>
          </div>
        </div>
        <div class="detail">
          <div class="detail-left"><span class="span-style">*</span>重要消息:</div>
          <div class="detail-right" style="width: 16%;">
            <RadioGroup v-model="newsInfo.isImportInfo">
              <Radio label="2">是</Radio>
              <Radio label="1">否</Radio>
            </RadioGroup>
          </div>
        </div>
        <div class="detail" style="height: 8%;margin-bottom: 28px">
          <div class="detail-left">新闻简介:</div>
          <div class="detail-right" style="width: 40%;">
            <Input type="textarea" :rows="2"  placeholder="请输入内容简介" v-model="newsInfo.introduce" :maxlength = 150 />
          </div>
        </div>
        <div class="detail">
        <div class="detail-left"><span class="span-style">*</span>发布日期:</div>
          <div class="detail-right" style="width: 40%;">
        <!--<DatePicker  type="datetime" format="yyyy-MM-dd" style="width: 100%" placeholder="请选择日志日期" v-model="newsInfo.createDate" >-->
        <!--</DatePicker>-->
            <Date-picker type="date" :options="options4" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" v-model="newsInfo.createDate">
            </Date-picker>
          </div>
        </div>
        <div class="detail">
          <div class="detail-left">新闻来源:</div>
          <div class="detail-right" style="width: 40%;">
            <Input  placeholder="请输入新闻来源" style="width: 100%" v-model="newsInfo.newsSource" :maxlength = 70 />
          </div>
        </div>
        <div class="detail">
          <div class="detail-left">来源链接:</div>
          <div class="detail-right" style="width: 40%;">
            <Input  placeholder="请输入新闻链接" style="width: 100%" v-model="newsInfo.newsSourceLink" :maxlength = 30 />
          </div>
        </div>
        <div class="detail" style="height: 100%;">
          <div class="detail-left"><span class="span-style">*</span>新闻内容:</div>
          <div class="detail-right" style="width: 90%;height: 100%;text-align: left;">
            <vue-ueditor-wrap v-model="newsInfo.content" :config="config"></vue-ueditor-wrap>
            <!--<quill-editor :options="editorOption" ref="myQuillEditor" v-model="newsInfo.content" >-->
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
        <div class="btn-common" @click="incheck(2)">发布</div>
      </div>
    </div>
    <alert-message v-if="alertStates" v-on:confirmstate="getconfirm" :message="alertMessage"></alert-message>
  </div>
</template>
<script>
  import * as constantsUtil from '../utils/constantsUtil';
  import * as ToolClassUtil from '../utils/toolClassUtil';
  import * as newsManagerService from '../service/newsManagerService';
  import * as UtilsService from '../utils/utilsService';
//  import Quill from 'quill';
  export default {
    name: 'add-news',
    props: {},
    watch: {
      'newsInfo.newsType': {
        handler(newName, oldName) {
          if (this.newTypeList.length > 0) {
            for (let i = 0; i < this.newTypeList.length; i++) {
              if (this.newTypeList[i].id === newName) {
                this.newsInfo.newsTypeName = this.newTypeList[i].typeName;
              }
            }
          }
          else {
            let newsTypeName = UtilsService.getSessionStorage('newsType');
            this.newsInfo.newsTypeName = newsTypeName;
          }
        },
        deep: true
      }
    },
    data() {
      return {
        options4: {
          disabledDate(date) {
            return date && date.valueOf() > Date.now();
          }
        },
        newsId: '',
        alertMessage: '',
        alertStates: false,
        imgUrlPath: constantsUtil.ALI_CLOUD_VISIT_SERVER,
        isLoading: false,
        ueditorImgUrl: '',
        imgUrlPhoto: '',
        fileType: {
          type: [
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/javascript',
            'application/pdf',
            'application/vnd.ms-powerpoint',
            'aplication/zip',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'text/plain',
            'image/*'
          ]
        },
        newTypeList: [],
        newsType: '',
        newsInfoData: '',
        newsInfo: {
          id: '',
          newsTitle: '',
          newsType: '',
          newsTypeName: '',
          newsSource: '',
          newsSourceLink: '',
          titlePicture: '',
          content: '',
          introduce: '',
          isImportInfo: '1',
          isCarousel: '1',
          createDate: '' + new Date().toString('yyyy-MM-dd'),
          userId: UtilsService.getAccountId(),
          isRelease: '', // 是否发布
          fileName: ''
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
          this.saveNews(2);
        }
        this.alertStates = false;
      },
      // 发布消息
      releaseInfo() {
        this.alertStates = true;
        this.alertMessage = '是否发布新闻？';
      },
      incheck(params) {
        if (this.newsInfo.newsTitle === '') {
          this.alertMsg('新闻标题不能为空');
          return false;
        }
        if (this.newsInfo.newsType === '') {
          this.alertMsg('新闻类型不能为空');
          return false;
        }
        if (this.newsInfo.content === '') {
          this.alertMsg('新闻内容不能为空');
          return false;
        }
        if (this.newsInfo.createDate === '') {
          this.alertMsg('日期选择不能为空');
          return false;
        }
        if (this.newsInfo.isCarousel === '') {
          this.alertMsg('是否轮播不能为空');
          return false;
        }
        if (this.newsInfo.isImportInfo === '2' && this.newsInfo.introduce === '') {
          this.alertMsg('简介不能为空');
          return false;
        }
//        else if (this.newsInfo.isCarousel === '2') {
//          if (this.newsInfo.titlePicture === '') {
//            this.alertMsg('新闻图片不能为空');
//            return false;
//          }
//        }
        else if (params === 2) {
          this.releaseInfo(params);
        }
        else {
          this.saveNews(params);
        }
      },
      judgeInfo() {
        var value = this.newsInfo.isCarousel;
        let newsTypeName = this.newsInfo.newsTypeName;
        if (newsTypeName === '下载专栏') {
          if (value === '2') {
            document.getElementById('fileId').style.display = 'block';
          }
          else {
            document.getElementById('fileId').style.display = 'none';
          }
        }
        else {
          if (value === '2') {
            document.getElementById('imgageId').style.display = 'block';
          }
          else {
            document.getElementById('imgageId').style.display = 'none';
          }
        }
      },
      saveNews(params) {
        if (params === 2) { // 发布
          this.newsInfo.isRelease = '2';
          newsManagerService.insertNewsInfo(this.newsInfo).then(result => {
            if (result.code === '0') {
              this.alertMsg('发布成功');
              this.confirm(false);
            }
            else {
              this.alertMsg(result.msg);
            }
          });
        }
        else { // 保存
          this.newsInfo.isRelease = '1';
          newsManagerService.insertNewsInfo(this.newsInfo).then(result => {
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
          UtilsService.cleanSessionStorage('newsId');
        }
      },
//      selectImgs() {
//        this.$refs.selectImgOrFileInputs.click();
//      },
      selectImg() {
        this.$refs.selectImgOrFileInput.click();
      },
      selectImgFile() {
        this.$refs.fileInput.click();
      },
      selectCallBack() {
        if (this.$refs.selectImgOrFileInput.files.length !== 0) {
          if (this.$refs.selectImgOrFileInput.files.length > 1) {
            this.alertMsg('请选择一张图片');
            return false;
          }
          let key = '/ysxhweb/news';
          this.isLoading = true;
          ToolClassUtil.uploadImage(this.$refs.selectImgOrFileInput.files, key, this.sendCallBack);
        }
      },
      selectCallBackFile() {
        if (this.$refs.fileInput.files.length !== 0) {
          if (this.$refs.fileInput.files.length > 1) {
            this.alertMsg('请选择一个文件');
            return false;
          }
          let key = '/ysxhweb/news';
          this.isLoading = true;
          ToolClassUtil.uploadImage(this.$refs.fileInput.files, key, this.sendCallBackFile);
        }
        let file = this.$refs.fileInput.files[0];
        this.newsInfo.fileName = file.name;
      },
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
      sendCallBack(val, files, imageUrl, result) {
        this.isLoading = false;
        this.$refs.selectImgOrFileInput.value = '';
        if (result) {
          if (result === 'error') {
            this.alertMsg('图片大小请不超过' + constantsUtil.IMAGE_SIZE / 1024 / 1024 + 'MB');
            return false;
          }
          if (val === 1) {
            let imgUrls = this.imgUrlPath + imageUrl;
            this.newsInfo.titlePicture = imgUrls;
          }
          else {
            this.alertMsg(constantsUtil.MESSAGE_CAN_NOT_CONNECT);
          }
        }
        else {
          this.alertMsg(constantsUtil.MESSAGE_CAN_NOT_CONNECT);
        }
      },
      sendCallBackFile(val, files, imageUrl, result) {
        this.isLoading = false;
        this.$refs.fileInput.value = '';
        if (result) {
          if (result === 'error') {
            this.alertMsg('图片大小请不超过' + constantsUtil.IMAGE_SIZE / 1024 / 1024 + 'MB');
            return false;
          }
          if (val === 1) {
            let imgUrls = this.imgUrlPath + imageUrl;
            this.newsInfo.titlePicture = imgUrls;
          }
          else {
            this.alertMsg(constantsUtil.MESSAGE_CAN_NOT_CONNECT);
          }
        }
        else {
          this.alertMsg(constantsUtil.MESSAGE_CAN_NOT_CONNECT);
        }
      },
//      // 上传OSS回调
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
      queryNewsType() {
        this.isLoading = true;
        newsManagerService.queryNewsType('newsType').then(result => {
          this.isLoading = false;
          if (result.code === '0') {
            this.newTypeList = result.list;
            for (let i = 0; i < this.newTypeList.length; i++) {
              if (this.newTypeList[i].typeName === '重要消息' || this.newTypeList[i].typeName === '视频中心' || this.newTypeList[i].typeName === '十佳医师' || this.newTypeList[i].typeName === '寻医问药') {
                this.newTypeList.splice(i, 1);
              }
            }
          }
          else {
            this.alertMsg(result.msg);
          }
        });
      },
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
      findNewsInfoDetailByNewsId(id) {
        newsManagerService.findNewsInfoDetailByNewsId(id).then(result => {
          if (result.code === '0') {
            this.newsInfo.id = result.list[0].id;
            this.newsInfo.newsTitle = result.list[0].newsTitle;
            this.newsInfo.newsType = result.list[0].newsTypeId;
            this.newsInfo.isCarousel = result.list[0].isCarousel;
            this.newsInfo.isImportInfo = result.list[0].isImportInfo;
            this.newsInfo.introduce = result.list[0].introduce;
            this.newsInfo.titlePicture = result.list[0].titlePicture;
            this.newsInfo.fileName = result.list[0].fileName;
            this.newsInfo.content = result.list[0].newsContent;
            this.newsInfo.newsSource = result.list[0].newsSource;
            this.newsInfo.newsSourceLink = result.list[0].newsSourceLink;
            this.newsInfo.createDate = this.fmtDate(result.list[0].createDate * 1000);
          }
          else {
            this.alertMsg(result.msg);
          }
        });
      }
    },
    created: function() {
      this.queryNewsType();
      let newsId = UtilsService.getSessionStorage('newsId');
      if (newsId !== null) {
        this.findNewsInfoDetailByNewsId(newsId);
      }
    }
  };
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../assets/css/base/fn.scss";
  .select-Img-File-input {
    display: none;
  }
  #imgageId {
    display: none;
  }
  #fileId {
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
        height: 80%;
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
    }
    .bottom-content {
      position: fixed;
      bottom: 0;
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
        color: $main;
        border: 1px solid $main;
      }
    }
  }
</style>
