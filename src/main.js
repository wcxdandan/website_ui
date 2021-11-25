import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'babel-polyfill';
import VueResource from 'vue-resource';
import * as filters from './utils/filters';
import iView from 'iview'; // 导入组件库
import 'iview/dist/styles/iview.css'; // 导入样式
Vue.use(iView);

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
Vue.use(VueResource);

import '../static/iconfont.css';
import './assets/css/snui.scss';
import '../static/iconfont.js';
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor);

import VueUeditorWrap from 'vue-ueditor-wrap'
Vue.component('vue-ueditor-wrap', VueUeditorWrap);

// 注册全局方法
import { sendClickEvent } from './utils/utilsService';

Vue.mixin({
  methods: {
    mixinSendClickEvent: function(event, router, id, title) {
      sendClickEvent(event, router, id, title);
    }
  }
});

// 全局组件注册
import inputMessage from './components/form/inputMessage.vue';
import inputPassword from './components/form/inputPassword.vue';
import inputPhone from './components/form/inputPhone.vue';
import alertMessage from './components/alert.vue';
import himMessage from './components/himalert.vue';
import loading from './components/loading.vue';
import headPhoto from './components/head-photo.vue';
import noData from './components/noData.vue';
import appHeader from './components/app-header.vue';
import messageTip from './components/message-tip.vue';
import DragableTable from './components/dragableTable.vue';
import datasourceadd from './components/datasourceEdit.vue'
import dictgroupadd from './components/typegroupEdit.vue'
import dictdetailadd from './components/typedetailEdit.vue'
import functionadd from './components/functionEdit.vue'
import userMessageEdit from './components/userMessageEdit.vue'
import userMessageEditMsg from './components/userToEdit.vue'
import userToEditPs from './components/userToEditPs.vue'
import roleToInsert from './components/roleToInsert.vue'
import passwordresetedit from './components/password-reset.vue'
import header from './components/header.vue'
import footer from './components/footer.vue'
import rightSuspension from './components/right-suspension.vue'
import banner from './components/banner.vue'
import bannerNew from './components/banner-new.vue'
import addNews from './components/addNews.vue'
import addCommittee from './components/addCommittee.vue'
import addVideo from './components/addVideo.vue'
import addAssociationIntroduce from './components/addAssociationIntroduce.vue'
import addDoctor from './components/addDoctor.vue'
import addDoctorWork from './components/addDoctorWork.vue'
import addBranchVip from './components/addBranchVip.vue'
import addCounterpartSupport from './components/addCounterpartSupport.vue'
import addCommunistWork from './components/addCommunistWork.vue'
import main from './components/main.vue'
import {swiper, swiperSlide} from 'vue-awesome-swiper';
Vue.component('sn-footer', footer);
Vue.component('sn-header', header);
Vue.component('passwordreset-editPs', passwordresetedit);
Vue.component('userMessage-edit', userMessageEdit);
Vue.component('roleMgs-Insert', roleToInsert);
Vue.component('userMessage-editPs', userToEditPs);
Vue.component('userMessage-editMessage', userMessageEditMsg);
Vue.component('input-message', inputMessage);
Vue.component('input-password', inputPassword);
Vue.component('input-phone', inputPhone);
Vue.component('alert-message', alertMessage);
Vue.component('him-message',himMessage);
Vue.component('loading', loading);
Vue.component('head-photo', headPhoto);
Vue.component('no-data', noData);
Vue.component('app-header', appHeader);
Vue.component('message-tip', messageTip);
Vue.component('DragableTable', DragableTable);
Vue.component('datasource-edit', datasourceadd);
Vue.component('dictgroup-edit', dictgroupadd);
Vue.component('dictdetail-edit', dictdetailadd);
Vue.component('function-edit', functionadd);
Vue.component('right-suspension', rightSuspension);
Vue.component('banner', banner);
Vue.component('banner-new', bannerNew);
Vue.component('swiper', swiper);
Vue.component('swiper-slide', swiperSlide);
Vue.component('add-news', addNews);
Vue.component('add-committee', addCommittee);
Vue.component('add-video', addVideo);
Vue.component('add-doctor', addDoctor);
Vue.component('add-doctorWork', addDoctorWork); // 医师定考
Vue.component('add-AssociationIntroduce', addAssociationIntroduce);
Vue.component('add-branchVip', addBranchVip);
Vue.component('add-communist', addCommunistWork);
Vue.component('add-counterpartSupport', addCounterpartSupport);
Vue.component('header-main', main);
new Vue({
  el: '#app',
  render: h => h(App),
  router
});
