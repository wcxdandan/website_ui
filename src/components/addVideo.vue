<template xmlns:v-vlaue="http://www.w3.org/1999/xhtml">
  <div class="add-video">
    <div class="add-video-detail">
      <div class="add-ordinary-log-top" id="head">
        <div class="title">{{videoInfoData !== null ? '编辑视频' : '新增视频'}}</div>
        <div class="close" @click="confirm(false)"><i class="iconfont icon-style">&#xea60;</i></div>
      </div>
      <div style="clear: both;"></div>
      <div class="content">
        <div class="detail">
          <div class="detail-left"><i class="styleLi">*&nbsp;</i>视频类型:</div>
          <div class="detail-right" style="width: 40%;text-align: left;position: relative;">
            <Select id="videoState"  clearable style="width: 100%;" placeholder="全部类型" v-model="videoInfo.type">
              <Option v-for="item in videoTypeList" :value="item.id" :key="item.id">{{ item.typeName }}</Option>
            </Select>
          </div>
        </div>
        <div class="detail">
          <div class="detail-left"><i class="styleLi">*&nbsp;</i>视频标题:</div>
          <div class="detail-right">
            <Input  placeholder="请输入视频标题" style="width: 100%" v-model="videoInfo.videoTitle"/>
          </div>
        </div>
        <div class="detail">
          <div class="detail-left"><i class="styleLi">*&nbsp;</i>发布日期:</div>
          <div class="detail-right" style="width: 40%;">
            <!--<DatePicker  type="datetime" format="yyyy-MM-dd" style="width: 100%" placeholder="请选择日志日期" v-model="videoInfo.createDate" >-->
            <!--</DatePicker>-->
            <Date-picker type="date" :options="options4" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" v-model="videoInfo.createDate">
            </Date-picker>
          </div>
        </div>
        <div class="detail imageDiv">
          <div class="detail-left"><i class="styleLi">*&nbsp;</i>标题图片:</div>
          <div class="detail-right image" @click="selectImg">
            <span v-if="!videoInfo.titlePic">点击上传图片</span>
            <input class="select-Img-File-input" ref="selectImgOrFileInput" type="file" accept="image/*" @change="selectCallBack">
            <div class="imgDiv"><img v-if="videoInfo.titlePic" :src="videoInfo.titlePic"  v-model="videoInfo.titlePic" class="imageUrl"></div>
          </div>
        </div>
        <div class="detail videoUrlDiv">
          <div class="detail-left"><i class="styleLi">*&nbsp;</i>视频地址:</div>
          <div class="videoUrl">
            <input class="videoUrlSpan" v-model="videoInfo.videoLink" placeholder="请输入视频地址"/>
          </div>
        </div>
        <div class="detail">
          <div class="detail-left"><i class="styleLi">*&nbsp;</i>视频简介:</div>
          <div class="detail-right">
            <textarea  placeholder="请输入视频简介" style="width: 100%" v-model="videoInfo.introduce"/>
          </div>
        </div>
        <alert-message v-if="alertStates" v-on:confirmstate="getconfirm" message="是否发布该视频"></alert-message>
        <div class="detail" style="height: 454px;">
          <div class="detail-left" id="centent"><i class="styleLi">*&nbsp;</i>视频内容:</div>
          <div class="detail-right text" id="textdiv">
            <vue-ueditor-wrap v-model="videoInfo.content" :config="config"></vue-ueditor-wrap>
            <!--<quill-editor :options="editorOption" ref="myQuillEditor" v-model="videoInfo.content"></quill-editor>-->
            <!--<div @click="selectFile">-->
              <!--<input class="select-Img-File-input" ref="selectImgOrFileInputs" type="file" accept="image/*" @change="selectCallBacks">-->
            <!--</div>-->
          </div>
        </div>
        <div class="bottom-content">
          <div class="btn-common cancel" @click="confirm(false)">取消</div>
          <div class="btn-common" @click="incheck()">保存</div>
          <div class="btn-common" @click="publishInfo()">发布</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as constantsUtil from '../utils/constantsUtil';
  import * as ToolClassUtil from '../utils/toolClassUtil';
  import * as homeService from '../service/homeService';
  import * as UtilsService from '../utils/utilsService';
//  import Quill from 'quill';

  export default {
    name: 'add-video',
    props: {},
    data() {
      return {
        options4: {
          disabledDate(date) {
            return date && date.valueOf() > Date.now();
          }
        },
        imgUrlPath: constantsUtil.ALI_CLOUD_VISIT_SERVER,
        FilerUrlPath: constantsUtil.ALI_CLOUD_VISIT_SERVER_AUDIO,
        isLoading: false,
        alertStates: false,
        content: '',
        ueditorImgUrl: '',
        imgUrlPhoto: '',
        videoTypeList: [],
        videoType: '',
        videoInfoData: '',
        videoInfo: {
          id: '',
          videoTitle: '',
          type: '',
          titlePic: '',
          content: '',
          videoLink: '',
          createDate: '' + new Date().toString('yyyy-MM-dd')
        },
        config: {
          // 允许的最大字符数
          maximumWords: 2500,
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
    created: function() {
      this.queryvideoType();
      this.videoInfoData = UtilsService.getSessionStorage('v');
      if (this.videoInfoData !== null) {
        this.videoInfo.id = this.videoInfoData.id;
        this.videoInfo.videoTitle = this.videoInfoData.title;
        this.videoInfo.type = this.videoInfoData.typeId;
        this.videoInfo.titlePic = this.videoInfoData.titlePic;
        this.videoInfo.content = this.videoInfoData.content;
        this.videoInfo.introduce = this.videoInfoData.introduce;
        this.videoInfo.number = this.videoInfoData.browseNumber;
        this.videoInfo.videoLink = this.videoInfoData.videoLink;
        this.videoInfo.createDate = this.videoInfoData.createDate;
      }
    },
    mounted() {
//      let Align = Quill.import('attributors/style/align');
//      Quill.register(Align, true);
//      this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler);
      if (navigator.userAgent.indexOf('Windows NT') > -1 && navigator.userAgent.indexOf('Edge') > -1) {
        document.getElementById('textdiv').style.left = '0%';
        document.getElementById('centent').style.left = '0%';
      }
      else {
        document.getElementById('textdiv').style.paddingLeft = '110px';
      }
      if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        document.getElementById('textdiv').style.paddingLeft = '0px';
        document.getElementById('centent').style.left = '0%';
        document.getElementById('head').style.zIndex = '1000';
        document.getElementById('head').style.position = 'absolute';
      }
    },
    methods: {
      confirm(value) {
        if (value === false) {
          this.videoType = '全部类型';
          this.$emit('confirmstate', value);
          UtilsService.cleanSessionStorage('v');
        }
      },
      publishInfo() {
        this.alertStates = true;
      },
      incheck() {
        var title = this.videoInfo.videoTitle;
        var content = this.videoInfo.content;
        if (this.videoInfo.videoTitle === '' || this.videoInfo.videoTitle === null) {
          this.alertMsg('视频标题不能为空');
          return false;
        }
        else if (this.videoInfo.type === '' || this.videoInfo.type === null) {
          this.alertMsg('视频类型不能为空');
          return false;
        }
        else if (this.videoInfo.createDate === '' || this.videoInfo.createDate === null) {
          this.alertMsg('日期选择不能为空');
          return false;
        }
        else if (this.videoInfo.titlePic === '' || this.videoInfo.titlePic === null) {
          this.alertMsg('视频图片不能为空');
          return false;
        }
        else if (this.videoInfo.content === '' || this.videoInfo.content === null) {
          this.alertMsg('视频内容不能为空');
          return false;
        }
        else if (this.videoInfo.videoLink === '' || this.videoInfo.videoLink === null) {
          this.alertMsg('视频连接不能为空');
          return false;
        }
        else if (title.length > 100) {
          this.alertMsg('视频标题长度不可超过100个字符');
          return false;
        }
        else if (content.length > 2500) {
          this.alertMsg('视频内容长度不可超过2500个字符');
          return false;
        }
        else {
          this.saveVideo();
        }
      },
      publish() {
        var title = this.videoInfo.videoTitle;
        var content = this.videoInfo.content;
        this.alertStates = true;
        if (this.videoInfo.videoTitle === '' || this.videoInfo.videoTitle === null) {
          this.alertMsg('视频标题不能为空');
          return false;
        }
        else if (this.videoInfo.type === '' || this.videoInfo.type === null) {
          this.alertMsg('视频类型不能为空');
          return false;
        }
        else if (this.videoInfo.titlePic === '' || this.videoInfo.titlePic === null) {
          this.alertMsg('视频图片不能为空');
          return false;
        }
        else if (this.videoInfo.content === '' || this.videoInfo.content === null) {
          this.alertMsg('视频内容不能为空');
          return false;
        }
        else if (this.videoInfo.videoLink === '' || this.videoInfo.videoLink === null) {
          this.alertMsg('视频连接不能为空');
          return false;
        }
        else if (title.length > 100) {
          this.alertMsg('视频标题长度不可超过100个字符');
          return false;
        }
        else if (content.length > 2500) {
          this.alertMsg('视频内容长度不可超过2500个字符');
          return false;
        }
        else {
          this.publishVideo();
        }
      },
      getconfirm(value) {
        if (value === true) {
          this.publish();
        }
        this.alertStates = false;
      },
      saveVideo() {
        homeService.saveVideoInfo(this.videoInfo).then(result => {
          if (result.code === '0') {
            this.alertMsg(result.msg);
            this.confirm(false);
          }
          else {
            this.alertMsg(result.msg);
          }
        });
      },
      publishVideo() {
        homeService.publishVideoInfo(this.videoInfo).then(result => {
          if (result.code === '0') {
            this.alertMsg(result.msg);
            this.confirm(false);
          }
          else {
            this.alertMsg(result.msg);
          }
        });
      },
//      imgHandler() {
//        this.selectImgs();
//        this.selectFiles();
//      },
//      selectImgs() {
//        this.$refs.selectImgOrFileInputs.click();
//      },
      selectImg() {
        this.$refs.selectImgOrFileInput.click();
      },
//      selectFiles() {
//        this.$refs.selectFileOrFileInputs.click();
//      },
//      selectFile() {
//        this.$refs.selectFileOrFileInput.click();
//      },
      selectCallBack() {
        if (this.$refs.selectImgOrFileInput.files.length !== 0) {
          if (this.$refs.selectImgOrFileInput.files.length > 1) {
            this.alertMsg('请选择一张图片');
            return false;
          }
          let key = '/ysxhweb/video';
          this.isLoading = true;
          ToolClassUtil.uploadImage(this.$refs.selectImgOrFileInput.files, key, this.sendCallBack);
        }
      },
      selectCallBackFile() {
        if (this.$refs.selectFileOrFileInput.files.length !== 0) {
          if (this.$refs.selectFileOrFileInput.files.length > 1) {
            this.alertMsg('请选择一份视频');
            return false;
          }
          let key = '/ysxhweb/video';
          this.isLoading = true;
          ToolClassUtil.uploadImage(this.$refs.selectFileOrFileInput.files, key, this.sendCallBackFile);
        }
      },
//      selectCallBacks() {
//        if (this.$refs.selectImgOrFileInputs.files.length !== 0) {
//          if (this.$refs.selectImgOrFileInputs.files.length > 1) {
//            this.alertMsg('请选择一张图片');
//            return false;
//          }
//          let key = '/ysxhweb/video';
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
            this.videoInfo.titlePic = imgUrls;
          }
          else {
            this.alertMsg(constantsUtil.MESSAGE_CAN_NOT_CONNECT);
          }
        }
        else {
          this.alertMsg(constantsUtil.MESSAGE_CAN_NOT_CONNECT);
        }
      },
      sendCallBackFile(val, files, FileUrl, result) {
        this.isLoading = false;
        this.$refs.selectImgOrFileInput.value = '';
        if (result) {
          if (result === 'error') {
            this.alertMsg('视频大小请不超过' + constantsUtil.IMAGE_SIZE / 1024 / 1024 + 'MB');
            return false;
          }
          if (val === 1) {
            let FileUrl = this.FilerUrlPath + FileUrl;
          }
          else {
            this.alertMsg(constantsUtil.MESSAGE_CAN_NOT_CONNECT);
          }
        }
        else {
          this.alertMsg(constantsUtil.MESSAGE_CAN_NOT_CONNECT);
        }
      },
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
      queryvideoType() {
        this.isLoading = true;
        homeService.queryVideoTypeList('videoType').then(result => {
          this.isLoading = false;
          if (result.code === '0') {
            this.videoTypeList = result.videoTypeList;
          }
          else {
            this.alertMsg(result.msg);
          }
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
      }
    }
  };
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../assets/css/base/fn.scss";
  .select-Img-File-input {
    display: none;
  }
  #centent {
    position: relative;
    left: -50%;
    top: 23px;
  }
  .text {
    width: 90% !important;
    text-align: left !important;
    position: relative !important;
    // left: 10%;
  }
  .image {
    height: 100%;
    border-top: 1px solid $grey63;
    border-left: 1px solid $grey63;
    border-bottom: 1px solid $grey63;
    border-right: 1px solid $grey63;
    width: 40% !important;
  }
  .imageUrl {
    width: 200px;
    height: 150px;
  }
  .imgDiv {
    width: 20%;
  }
  .imageDiv {
    height: 25% !important;
  }
  .styleLi {
    color: red;
  }
  .quill-editor {
    height: 300px;
    padding-top: 0;
  }
  .videoUrl {
    height: 100%;
    position: relative;
    width: 40%;
    left: 10%;
  }
  .videoUrlSpan {
    width: 100%;
    height: 100%;
    position: relative;
    top: -90%;
  }
  .videoUrlDiv {
    height: 6% !important;
  }
  .add-video {
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
    .add-video-detail {
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
        height: 93%;
        // background-color: pink;
        .detail {
          width: 100%;
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
            width: 40%;
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
            color: white;
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
    }
  }
</style>
