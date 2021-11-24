<template>
  <div class="add-doctor">
    <div class="add-doctor-detail">
      <div class="add-ordinary-log-top" id="head">
        <div class="title">{{dictorInfoData !== null ? '编辑信息' : '新增信息'}}</div>
        <div class="close" @click="confirm(false)"><i class="iconfont icon-style">&#xea60;</i></div>
      </div>
      <div style="clear: both;"></div>
         <div class="content">
           <div class="detail">
             <div class="detail-left"><i class="styleLi">*&nbsp;</i>类别:</div>
             <div class="detail-right" style="width: 40%;text-align: left;">
               <Select id="doctorType"  clearable style="width: 100%;" placeholder="医师类型" v-model="doctorInfo.type" @change="concealInfo">
                 <Option v-for="item in doctorTypeList" :value="item.ID" :key="item.ID">{{ item.TYPENAME }}</Option>
               </Select>
             </div>
           </div>
           <div class="detail" id="periodNum">
             <div class="detail-left"><i class="styleLi">*&nbsp;</i>届数:</div>
             <div class="detail-right" style="width: 40%;text-align: left;">
               <Select id="fallDueNumType"  style="width: 100%;" placeholder="届数类型" v-model="doctorInfo.categoryType">
                 <Option v-for="item in categoryTypeList" :value="item.ID" :key="item.id">{{ item.TYPENAME }}</Option>
               </Select>
             </div>
           </div>
           <div class="detail">
             <div class="detail-left"><i class="styleLi">*&nbsp;</i>标题:</div>
             <div class="detail-right">
               <Input  placeholder="请输入医师标题" class="doctorTitle" v-model="doctorInfo.newTitle"/>
             </div>
           </div>
           <div class="detail imageDiv" style="height: 24%">
             <div class="detail-left"><i class="styleLi">*&nbsp;</i>图片:</div>
             <div class="detail-right imageUrl" @click="selectImg">
               <span v-if="!doctorInfo.titlePic">点击上传图片</span>
               <input class="select-Img-File-input" ref="selectImgOrFileInput" type="file" accept="image/*" @change="selectCallBack">
               <div class="imgDiv"><img v-if="doctorInfo.titlePic" :src="doctorInfo.titlePic" class="img"></div>
             </div>
           </div>
           <div class="detail">
           <div class="detail-left"><i class="styleLi">*&nbsp;</i>发布日期:</div>
           <div class="detail-right" style="width: 40%;">
           <!--<DatePicker  type="datetime" format="yyyy-MM-dd" style="width: 100%" placeholder="请选择日志日期" v-model="doctorInfo.createDate" >-->
           <!--</DatePicker>-->
             <Date-picker type="date" :options="options4" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" v-model="doctorInfo.createDate">
             </Date-picker>
           </div>
           </div>
           <div class="detail">
             <div class="detail-left"><i class="styleLi">*&nbsp;</i>简介:</div>
             <div class="detail-right">
               <textarea   placeholder="请输入医师简介" style="width: 100%" v-model="doctorInfo.introuce"/>
             </div>
           </div>
           <div class="detail" style="height: 400px;">
             <div class="detail-left conent" id="centent"><i class="styleLi">*&nbsp;</i>内容:</div>
             <div class="detail-right text" id="textdiv">
               <vue-ueditor-wrap v-model="doctorInfo.content" :config="config"></vue-ueditor-wrap>
               <!--<quill-editor :options="editorOption" ref="myQuillEditor" v-model="doctorInfo.content">-->
               <!--</quill-editor>-->
               <!--<div @click="selectFile">-->
                 <!--<input class="select-Img-File-input" ref="selectImgOrFileInputs" type="file" accept="image/*" @change="selectCallBacks">-->
               <!--</div>-->
             </div>
           </div>
           <div class="bottom-content">
             <div class="btn-common cancel" @click="confirm(false)">取消</div>
             <div class="btn-common" @click="incheck()">保存</div>
             <div class="btn-common" @click="publish()">发布</div>
           </div>
           <alert-message v-if="alertStates" v-on:confirmstate="getconfirm" message="是否发布该医师信息?"></alert-message>
         </div>
    </div>
  </div>
</template>
<script>
  import * as constantsUtil from '../utils/constantsUtil';
  import * as associationIntroduceService from '../service/associationIntroduceService';
  import * as ToolClassUtil from '../utils/toolClassUtil';
  import * as UtilsService from '../utils/utilsService';
//  import Quill from 'quill';

  export default {
    name: 'add-doctor',
    props: {},
    data() {
      return {
        options4: {
          disabledDate(date) {
            return date && date.valueOf() > Date.now();
          }
        },
        imgUrl: '',
        imgUrlPhoto: '',
        imgUrlPath: constantsUtil.ALI_CLOUD_VISIT_SERVER,
        doctorTypeList: [],
        categoryTypeList: [],
        doctorType: '',
        categoryType: '',
        doctorTitle: '', // 标题
        dictorInfoData: '',
        alertStates: false,
        doctorInfo: {
          id: '',
          newTitle: '', // 标题
          type: '',  // 类型
          titlePicture: '',
          newContent: '',
          createDate: '' + new Date().toString('yyyy-MM-dd'),
          categoryType: '',
          introuce: ''
        },
        defaultMsg: '富文本编辑器测试',
//        config: {
//          initialFrameWidth: null,
//          initialFrameHeight: 350
//        },
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
    mounted() {
//      let Align = Quill.import('attributors/style/align');
//      Quill.register(Align, true);
//      this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler);
      var b = true;
      if (navigator.userAgent.indexOf('Windows NT') > -1 && navigator.userAgent.indexOf('Edge') > -1) {
        if (b) {
          b = false;
          document.getElementById('textdiv').style.left = '0%';
          document.getElementById('centent').style.left = '0%';
        }
      }
      if (/chrome/i.test(navigator.userAgent.toLowerCase()) && /webkit/i.test(navigator.userAgent.toLowerCase()) && /mozilla/i.test(navigator.userAgent.toLowerCase())) {
        if (b) {
          b = false;
          document.getElementById('textdiv').style.paddingLeft = '108px';
          document.getElementById('centent').style.left = '-50%';
        }
      }
      if (!window.ActiveXObject || 'ActiveXObject' in window) {
        if (b) {
          document.getElementById('textdiv').style.paddingLeft = '0px';
          document.getElementById('centent').style.left = '0%';
          document.getElementById('head').style.zIndex = '1000';
          document.getElementById('head').style.position = 'absolute';
        }
      }
    },
    created: function() {
      this.queryDoctorType();
      if (this.dictorInfoData === null) {
        this.doctorInfo.createDate = this.dictorInfoData.createDate.toString('yyyy-MM-dd');
      }
      this.dictorInfoData = UtilsService.getSessionStorage('d');
      if (this.dictorInfoData !== null) {
        this.doctorInfo.id = this.dictorInfoData.id;
        this.doctorInfo.newTitle = this.dictorInfoData.title;
        this.doctorInfo.categoryType = this.dictorInfoData.category;
        this.doctorInfo.type = this.dictorInfoData.typeId;
        this.doctorInfo.titlePic = this.dictorInfoData.titlePicture;
        this.doctorInfo.content = this.dictorInfoData.newsContent;
        this.doctorInfo.introuce = this.dictorInfoData.introuce;
        this.doctorInfo.createDate = this.dictorInfoData.createDate;
      }
    },
    methods: {
      concealInfo() {
        var value = this.doctorInfo.type;
        if (value === 'f852d85d47ed64a40147ed75afe50001' || value === 'jglongjbtstype201506041030000133') {
          document.getElementById('periodNum').style.display = 'none';
        }
        else {
          document.getElementById('periodNum').style.display = 'block';
        }
      },
      confirm(value) {
        if (value === false) {
          this.$emit('confirmstate', value);
        }
      },
      incheck() {
        var title = this.doctorInfo.newTitle;
        var content = this.doctorInfo.content;
        var introuce = this.doctorInfo.introuce;
        if (title.length > 100) {
          this.alertMsg('医师标题长度不可超过100个字符');
          return false;
        }
        else if (this.doctorInfo.newTitle === '' || this.doctorInfo.newTitle === null) {
          this.alertMsg('医师标题不能为空');
          return false;
        }
        else if (this.doctorInfo.type === '' || this.doctorInfo.type === null) {
          this.alertMsg('医师类型不能为空');
          return false;
        }
        else if (this.doctorInfo.titlePic === '' || this.doctorInfo.titlePic === null) {
          this.alertMsg('医师图片不能为空');
          return false;
        }
        else if (this.doctorInfo.createDate === '' || this.doctorInfo.createDate === null) {
          this.alertMsg('日期选择不能为空');
          return false;
        }
        else if (this.doctorInfo.content === '' || this.doctorInfo.content === null) {
          this.alertMsg('医师内容不能为空');
          return false;
        }
        else if (content.length > 2500) {
          this.alertMsg('医师内容长度不可超过2500个字符');
          return false;
        }
        else if (this.doctorInfo.categoryType === '' || this.doctorInfo.categoryType === null) {
          this.alertMsg('医师届数类型不能为空');
          return false;
        }
        else if (this.doctorInfo.introuce === '' || this.doctorInfo.introuce === null) {
          this.alertMsg('医师简介类型不能为空');
          return false;
        }
        else if (introuce.length > 225) {
          this.alertMsg('医师内容长度不可超过225个字符');
          return false;
        }
        else {
          this.saveVideo();
        }
      },
      publish() {
        var title = this.doctorInfo.newTitle;
        var content = this.doctorInfo.content;
        var introuce = this.doctorInfo.introuce;
        if (title.length > 100) {
          this.alertMsg('医师标题长度不可超过100个字符');
          return false;
        }
        else if (this.doctorInfo.newTitle === '' || this.doctorInfo.newTitle === null) {
          this.alertMsg('医师标题不能为空');
          return false;
        }
        else if (this.doctorInfo.type === '' || this.doctorInfo.type === null) {
          this.alertMsg('医师类型不能为空');
          return false;
        }
        else if (this.doctorInfo.titlePic === '' || this.doctorInfo.titlePic === null) {
          this.alertMsg('医师图片不能为空');
          return false;
        }
        else if (this.doctorInfo.content === '' || this.doctorInfo.content === null) {
          this.alertMsg('医师内容不能为空');
          return false;
        }
        else if (content.length > 2500) {
          this.alertMsg('医师内容长度不可超过2500个字符');
          return false;
        }
        else if (this.doctorInfo.categoryType === '' || this.doctorInfo.categoryType === null) {
          this.alertMsg('医师届数类型不能为空');
          return false;
        }
        else if (this.doctorInfo.introuce === '' || this.doctorInfo.introuce === null) {
          this.alertMsg('医师简介类型不能为空');
          return false;
        }
        else if (introuce.length > 225) {
          this.alertMsg('医师简介长度不可超过225个字符');
          return false;
        }
        else {
          this.publishDoctorInfo();
        }
      },
      saveVideo() {
        associationIntroduceService.saveDoctorInfo(this.doctorInfo).then(result => {
          if (result.code === '0') {
            this.alertMsg(result.msg);
            this.confirm(false);
          }
          else {
            this.alertMsg(result.msg);
          }
        });
      },
      getconfirm(value) {
        if (value) {
          this.publishDoctor();
        }
        this.alertStates = false;
      },
      publishDoctorInfo() {
        this.alertStates = true;
      },
      publishDoctor() {
        associationIntroduceService.publicDoctorInfo(this.doctorInfo).then(result => {
          if (result.code === '0') {
            this.alertMsg(result.msg);
            this.confirm(false);
            this.queryDoctorType();
          }
          else {
            this.alertMsg(result.msg);
          }
        });
      },
      getUEContent() {
        let content = this.$refs.ue.getUEContent();
        this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        });
      },
      selectImg() {
        this.$refs.selectImgOrFileInput.click();
      },
//      selectCallBacks() {
//        if (this.$refs.selectImgOrFileInput.files.length !== 0) {
//          if (this.$refs.selectImgOrFileInput.files.length > 1) {
//            this.alertMsg('请选择一张图片');
//            return false;
//          }
//          let key = '/ysxhweb/sjys';
//          this.isLoading = true;
//          ToolClassUtil.uploadImage(this.$refs.selectImgOrFileInput.files, key, this.sendCallBack);
//        }
//      },
      selectCallBack() {
        if (this.$refs.selectImgOrFileInput.files.length !== 0) {
          if (this.$refs.selectImgOrFileInput.files.length > 1) {
            this.alertMsg('请选择一张图片');
            return false;
          }
          let key = '/ysxhweb';
          this.isLoading = true;
          ToolClassUtil.uploadImage(this.$refs.selectImgOrFileInput.files, key, this.sendCallBack);
        }
      },
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
//            this.doctorInfo.titlePic = imgUrls;
//            console.log(this.doctorInfo);
            this.$set(this.doctorInfo, 'titlePic', imgUrls);
//            alert(this.doctorInfo.titlePic);
          }
          else {
            this.alertMsg(constantsUtil.MESSAGE_CAN_NOT_CONNECT);
          }
        }
        else {
          this.alertMsg(constantsUtil.MESSAGE_CAN_NOT_CONNECT);
        }
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
      queryDoctorType() {
        this.isLoading = true;
        associationIntroduceService.queryDoctorTypeList('jieshu', 'sjysType').then(result => {
          this.isLoading = false;
          if (result.code === '0') {
            this.categoryTypeList = result.doctorTypeList;
            this.doctorTypeList = result.categoryTypeList;
          }
          else {
            this.alertMsg(result.msg);
          }
        });
      }
//      selectFile() {
//        this.$refs.selectFileOrFileInput.click();
//      }
    }
  };
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../assets/css/base/fn.scss";
  .select-Img-File-input {
    display: none;
  }
  .styleLi {
    color: red;
  }
  .conent {
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
  .imageUrl {
    border-top: 1px solid $grey63;
    border-left: 1px solid $grey63;
    border-bottom: 1px solid $grey63;
    border-right: 1px solid $grey63;
    width: 40% !important;
    height: 100%;
  }
  .img {
    width: 200px;
    height: 150px;
  }
  .imgDiv {
    width: 20%;
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
  .doctorTitle {
    width: 100%;
    position: relative;
    left: 0%;
  }
  .contentTitle {
    position: relative;
    left: -50%;
    top: 23px;
  }
  .quill-editor {
    height: 300px;
    padding-top: 0;
  }
  .doctorContent {
    width: 40%;
  }
  .add-doctor {
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
    .add-doctor-detail {
      top: 17%;
      left: 55%;
      position: fixed;
      border: 0;
      border-radius: 6px;
      background-clip: padding-box;
      z-index: 3000;
      width: 70%;
      height: 76%;
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
        padding: 1% 5%;
        overflow: auto;
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
  }

</style>
