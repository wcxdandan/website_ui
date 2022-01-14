import Vue from 'vue';
import Router from 'vue-router';
import AppHome from '@/views/home/AppHome.vue';
import login from '@/views/login/login.vue';
import register from '@/views/login/register.vue';
import {routeFilter} from '../utils/authGuardService';
import datasource from '@/views/system/datasource.vue';
import dicttype from '@/views/system/dicttype.vue';
import functions from '@/views/system/function.vue';
import userMessage from '@/views/system/userMessage.vue';
import roleMessage from '@/views/system/roleMessage.vue';
import websiteHome from '@/views/website/website-home.vue';
import newsList from '@/views/website/news-list.vue';
import newsInfo from '@/views/website/news-info.vue';
import xhjs from '@/views/website/xhjs.vue';
import djgz from '@/views/website/djgz.vue';
import ysdk from '@/views/website/ysdk.vue';
import videoInfo from '@/views/website/video-info.vue';
import videoNewsInfo from '@/views/website/video-new-info.vue';
import categoryList from '@/views/website/categoryList.vue';
import sjys from '@/views/website/sjys.vue';
import contactUs from '@/views/website/contactUs.vue';
import announcement from '@/views/website/news-announcement.vue';
// import main from '@/views/website/main.vue';
import newsManager from '@/views/system/news_manager.vue';
import videoManager from '@/views/system/video_manager.vue';
import doctorManager from '@/views/system/doctor_manager.vue';
import dkzy from '@/views/website/dkzy.vue';
import associationManager from '@/views/system/association_manager.vue';
import branchVipManager from '@/views/system/branchVip_manager.vue';
import counterpartSupport from '@/views/system/counterpartSupport.vue';
import communist from '@/views/system/communist_work.vue';
import doctorExamination from '@/views/system/doctor_examination';
import zkysfh from '@/views/website/zkysfh.vue';
import branchVipCommittee from '@/views/system/branchVip_committee.vue';
import search from '@/views/website/search.vue';
import metting from '@/views/website/metting.vue';
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/system',
      component: AppHome, // app首页
      children: [
        {
          path: '/system/function',
          component: functions,
          beforeEnter: (to, from, next) => {
            routeFilter(to, from, next);
          }
        }, // 菜单管理
        {
          path: '/system/roleMessage',
          component: roleMessage,
          beforeEnter: (to, from, next) => {
            routeFilter(to, from, next);
          }
        }, // 角色页面
        {
          path: '/system/userMessage',
          component: userMessage,
          beforeEnter: (to, from, next) => {
            routeFilter(to, from, next);
          }
        }, // 用户页面
        {
          path: '/system/datasource',
          component: datasource,
          beforeEnter: (to, from, next) => {
            routeFilter(to, from, next);
          }
        }, // 字典管理
        {
          path: '/system/dicttype',
          component: dicttype,
          beforeEnter: (to, from, next) => {
            routeFilter(to, from, next);
          }
        },
        {
          path: '/system/newsManager',
          component: newsManager,
          beforeEnter: (to, from, next) => {
            routeFilter(to, from, next);
          }
        },  // 新闻管理
        {
          path: '/system/videoManager',
          component: videoManager,
          beforeEnter: (to, from, next) => {
            routeFilter(to, from, next);
          }
        },  // 视频中心
        {
          path: '/system/doctorManager',
          component: doctorManager,
          beforeEnter: (to, from, next) => {
            routeFilter(to, from, next);
          }
        },  // 十佳医师
        {
          path: '/system/association_manager',
          component: associationManager,
          beforeEnter: (to, from, next) => {
            routeFilter(to, from, next);
          }
        },
        {
          path: '/system/branchVip_manager',
          component: branchVipManager,
          beforeEnter: (to, from, next) => {
            routeFilter(to, from, next);
          }
        }, // 分会管理
        {
          path: '/system/branchVip_committee',
          component: branchVipCommittee,
          beforeEnter: (to, from, next) => {
            routeFilter(to, from, next);
          }
        }, // 主任委员
        {
          path: '/system/counterpartSupport',
          component: counterpartSupport,
          beforeEnter: (to, from, next) => {
            routeFilter(to, from, next);
          }
        },
        {
          path: '/system/communist_work',
          component: communist,
          beforeEnter: (to, from, next) => {
            routeFilter(to, from, next);
          }
        }, // 党建工作
        {
          path: '/system/doctor_examination',
          component: doctorExamination,
          beforeEnter: (to, from, next) => {
            routeFilter(to, from, next);
          }
        }// 医师定考
      ]
    },
    {path: '/login', component: login}, // 登录
    {path: '/login/register', component: register}, // 注册
    {path: '/metting', component: metting},
    // 修改
    {path: '/', component: websiteHome},
    {path: '/websiteHome', component: websiteHome}, // 官网首页
    {path: '/newsList/:type', component: newsList}, // 官网列表页
    {path: '/newsInfo', component: newsInfo}, // 官网信息详情页
    {path: '/xhjs', component: xhjs},  // 官网协会介绍页
    {path: '/djgz', component: djgz},  // 官网党建工作页
    {path: '/ysdk', component: ysdk},  // 医师定考工作页
    {path: '/videoInfo', component: videoInfo}, // 视频列表更多
    {path: '/videoNewsInfo', component: videoNewsInfo},
    {path: '/categoryList', component: categoryList}, // 分类列表
    {path: '/sjys', component: sjys},  // 十佳医师介绍页
    {path: '/dkzy', component: dkzy},  // 对口支援介绍页
    {path: '/zkysfh', component: zkysfh}, // 专科医师分会
    {path: '/search', component: search},  // 搜索
    {path: '/contactUs', component: contactUs},  // 搜索
    {path: '/announcement', component: announcement}
   /* {
      path: '/main',
      component: main,
      children: [
        {path: '/websiteHome', component: websiteHome}, // 官网首页
        {path: '/newsList/:type', component: newsList}, // 官网列表页
        {path: '/newsInfo', component: newsInfo}, // 官网信息详情页
        {path: '/xhjs', component: xhjs},  // 官网协会介绍页
        {path: '/djgz', component: djgz},  // 官网党建工作页
        {path: '/ysdk', component: ysdk},  // 医师定考工作页
        {path: '/videoInfo', component: videoInfo}, // 视频列表更多
        {path: '/videoNewsInfo', component: videoNewsInfo},
        {path: '/categoryList', component: categoryList}, // 分类列表
        {path: '/sjys', component: sjys},  // 十佳医师介绍页
        {path: '/dkzy', component: dkzy},  // 对口支援介绍页
        {path: '/zkysfh', component: zkysfh}, // 专科医师分会
        {path: '/search', component: search}  // 搜索
      ]
    }  // 官网 */
  ]
});
