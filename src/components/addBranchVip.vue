<template>
  <div class="add-news">
    <div class="add-news-detail">
      <div class="add-ordinary-log-top">
        <div class="title">{{branchVipList !== null ? '编辑分会信息' : '新增分会信息'}}</div>
        <div class="close" @click="confirm(false)"><i class="iconfont icon-style">&#xea60;</i></div>
      </div>
      <div style="clear: both;"></div>
      <div class="content">
        <div class="detail">
          <div class="detail-left"><span class="span-style">*</span>标题:</div>
          <div class="detail-right" style="width: 40%;">
            <Input  placeholder="请输入标题" style="width: 100%" v-model="branchVip.title" :maxlength=60 />
          </div>
        </div>
        <!--<div class="detail">-->
          <!--<div class="detail-left">网址:</div>-->
          <!--<div class="detail-right" style="width: 40%;">-->
            <!--<Input  placeholder="请输入网址" style="width: 100%" v-model="branchVip.linkUrl" :maxlength=30 />-->
          <!--</div>-->
        <!--</div>-->
        <div class="detail">
          <div class="detail-left"><span class="span-style">*</span>类别:</div>
          <div class="detail-right" style="width: 40%;text-align: left;">
            <Select id="zhifufangshi"  clearable style="width: 50%;float: left;" placeholder="分会类型" v-model="firstSelect">
              <Option value="zkysfh">专科医师分会</Option>
              <Option value="hydw">会员单位</Option>
              <Option value="dfysxh">地方医师协会</Option>
            </Select>
            <Select  clearable style="width: 50%;float: left;" placeholder="请选择分类" v-model="branchVip.category">
              <Option v-for="item in newTypeList" :value="item.id" :key="item.id">{{ item.typeName }}</Option>
            </Select>
          </div>
        </div>
        <div class="detail" style="height: 20%;">
          <div class="detail-left">图片:</div>
          <div class="detail-right" style="width: 10%;height: 100%;border: 1px solid #dddee1;" @click="selectImg">
            <span v-if="!branchVip.titlePicture">点击上传标题图片</span>
            <input class="select-Img-File-input" ref="selectImgOrFileInput" type="file" accept="image/*" @change="selectCallBack">
            <div><img v-if="branchVip.titlePicture" :src="branchVip.titlePicture.length > 20 ? branchVip.titlePicture : logImgPath+ branchVip.titlePicture + '.png'" style="width:97%;height: 120px;"></div>
          </div>
        </div>
        <div class="detail" style="height: 370px;">
          <div class="detail-left"><span class="span-style">*</span>内容:</div>
          <div class="detail-right" style="width: 90%;text-align: left;">
            <vue-ueditor-wrap v-model="branchVip.content" :config="config"></vue-ueditor-wrap>
            <!--<quill-editor :options="editorOption" ref="myQuillEditor" v-model="branchVip.content">-->
            <!--</quill-editor>-->
            <!--<div @click="selectImgs">-->
              <!--<input class="select-Img-File-input" ref="selectImgOrFileInputs" type="file" accept="image/*" @change="selectCallBacks">-->
            <!--</div>-->
          </div>
        </div>
        <div class="bottom-content">
          <div class="btn-common cancel" @click="confirm(false)">取消</div>
          <div class="btn-common" @click="incheck(1)">保存</div>
          <div class="btn-common" @click="incheck(0)">发布</div>
        </div>
      </div>
    </div>
    <alert-message v-if="alertStates" v-on:confirmstate="getconfirm" :message="alertMessage"></alert-message>
  </div>
</template>
<script>
  import * as constantsUtil from '../utils/constantsUtil';
  import * as ToolClassUtil from '../utils/toolClassUtil';
  import * as UtilsService from '../utils/utilsService';
  import * as branchVipService from '../service/branchVipService';
  import * as associationIntroduceService from '../service/associationIntroduceService';
//  import Quill from 'quill';

  export default {
    name: 'add-branchVip',
    props: {},
    data() {
      return {
        logImgPath: 'http://static.shunnengnet.com/ysxhweb/hospitallogo/',
        firstSelect: 'zkysfh',
        alertMessage: '',
        alertStates: false,
        imgUrlPath: constantsUtil.ALI_CLOUD_VISIT_SERVER,
        isLoading: false,
        content: '',
        ueditorImgUrl: '',
        imgUrlPhoto: '',
        newTypeList: [],
        newsType: '',
        branchVipList: '',
        branchVip: {
          id: '',
          title: '',
          linkUrl: '',
          titlePicture: '',
          category: '',
          content: '',
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
//              [{ 'font': [] }],
//              [{ 'align': [] }],
//              ['link', 'image', 'video']
//            ]
//          }
//        }
      };
    },
    watch: {
      firstSelect: function() {
        if (this.firstSelect !== '') {
          this.queryNewsType(this.firstSelect);
        }
      }
    },
    mounted() {
//      let Align = Quill.import('attributors/style/align');
//      Quill.register(Align, true);
//      this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler);
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
        if (this.branchVip.title === '') {
          this.alertMsg('标题不能为空');
          return false;
        }
        else if (this.branchVip.category === '') {
          this.alertMsg('类型不能为空');
          return false;
        }
        else if (this.branchVip.content === '') {
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
          this.branchVip.isRelease = '2';
          branchVipService.insertBranchVip('', this.branchVip).then(result => {
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
          this.branchVip.isRelease = '1';
          branchVipService.insertBranchVip('', this.branchVip).then(result => {
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
          UtilsService.cleanSessionStorage('branchVipList');
        }
      },
//      selectImgs() {
//        this.$refs.selectImgOrFileInputs.click();
//      },
      selectImg() {
        this.$refs.selectImgOrFileInput.click();
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
            this.branchVip.titlePicture = imgUrls;
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
      queryNewsType() {
        this.isLoading = true;
        associationIntroduceService.queryAssociationCategory(this.firstSelect).then(result => {
          this.isLoading = false;
          if (result.code === '0') {
            this.newTypeList = result.list;
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
          desc: this.branchVip.title + msg
        });
      },
      getDate() {
        let date = new Date();
        return date.getFullYear() + '' + (date.getMonth() + 1) + '' + date.getDate() + '' + date.getHours() + '' + date.getMinutes() + '' + date.getSeconds();
      }
    },
    created: function() {
      this.queryNewsType();
      this.branchVipList = UtilsService.getSessionStorage('branchVipList');
      if (this.branchVipList !== null) {
        this.firstSelect = this.branchVipList.categoryType;
        this.branchVip.category = this.branchVipList.typeId;
        this.branchVip.content = this.branchVipList.content;
        this.branchVip.id = this.branchVipList.id;
        this.branchVip.title = this.branchVipList.title;
        this.branchVip.titlePicture = this.branchVipList.imgSrc;
        this.branchVip.linkUrl = this.branchVipList.linkUrl;
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
        height: 93%;
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
            color: $main;
            border: 1px solid $main;
          }
        }
      }
    }
  }
</style>
