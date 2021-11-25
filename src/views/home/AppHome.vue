<template>
    <div class="main-container">
      <div v-if="true" class="side-nav">
        <Menu :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto', height: '100%'}"
             v-show = "!shrink" :open-names="['1']" :theme="'light'"  @on-select="turnurl" active-name="1-1">
          <Submenu name="1" v-if="currentItem === '1'">
            <!--点击以后currentItem发生改变-->
            <template slot="title">
              <Icon type="ios-cog"></Icon>
              系统管理
            </template>
            <MenuItem v-for="(item, index) in selecteditems" :key="index" :name="item.detailname">
              <!--selecteditems就是过滤完的数组，数组存对象，对象的detailname存的就是字符串“1-1类似”-->
              <span v-if="item.detailname === '1-1'">用户管理</span>
              <span v-if="item.detailname === '1-2'">角色管理</span>
              <span v-if="item.detailname === '1-7'">菜单管理</span>
              <span v-if="item.detailname === '1-4'">字典管理</span>
              <!--<span v-if="item.detailname === '1-5'">多数据源</span>-->
            </MenuItem>
          </Submenu>
          <Submenu name="6" v-if="currentItem === '6'">
            <template slot="title">
              <Icon type="ios-cog"></Icon>
              新闻管理
            </template>
            <MenuItem v-for="(item, index) in selecteditems" :key="index" :name="item.detailname">
              <span v-if="item.detailname === '6-1'">新闻管理</span>
              <span v-if="item.detailname === '6-2'">党建工作</span>
              <span v-if="item.detailname === '6-3'">对口支援</span>
              <span v-if="item.detailname === '6-4'">十佳医师</span>
              <span v-if="item.detailname === '6-5'">视频中心</span>
              <span v-if="item.detailname === '6-6'">医师定考</span>
            </MenuItem>
          </Submenu>
          <!--<Submenu name="8" v-if="currentItem === '8'">-->
            <!--<template slot="title">-->
              <!--<Icon type="ios-cog"></Icon>-->
              <!--视频中心-->
            <!--</template>-->
            <!--<MenuItem v-for="(item, index) in selecteditems" :key="index" :name="item.detailname">-->
              <!--<span v-if="item.detailname === '8-1'">视频中心</span>-->
            <!--</MenuItem>-->
          <!--</Submenu>-->
          <!--<Submenu name="9" v-if="currentItem === '9'">-->
            <!--<template slot="title">-->
              <!--<Icon type="ios-cog"></Icon>-->
              <!--十佳医师-->
            <!--</template>-->
            <!--<MenuItem v-for="(item, index) in selecteditems" :key="index" :name="item.detailname">-->
              <!--<span v-if="item.detailname === '9-1'">十佳医师</span>-->
            <!--</MenuItem>-->
          <!--</Submenu>-->
          <Submenu name="10" v-if="currentItem === '10'">
            <template slot="title">
              <Icon type="ios-cog"></Icon>
              协会管理
            </template>
            <MenuItem v-for="(item, index) in selecteditems" :key="index" :name="item.detailname">
              <span v-if="item.detailname === '10-1'">协会管理</span>
            </MenuItem>
          </Submenu>
          <Submenu name="11" v-if="currentItem === '11'">
            <template slot="title">
              <Icon type="ios-cog"></Icon>
              分会管理
            </template>
            <MenuItem v-for="(item, index) in selecteditems" :key="index" :name="item.detailname">
              <span v-if="item.detailname === '11-1'">分会管理</span>
              <span v-if="item.detailname === '11-2'">主任委员</span>
            </MenuItem>
          </Submenu>
          <!--<Submenu name="12" v-if="currentItem === '12'">-->
          <!--<template slot="title">-->
            <!--<Icon type="ios-cog"></Icon>-->
            <!--对口支援-->
          <!--</template>-->
          <!--<MenuItem v-for="(item, index) in selecteditems" :key="index" :name="item.detailname">-->
            <!--<span v-if="item.detailname === '12-1'">对口支援</span>-->
          <!--</MenuItem>-->
          <!--</Submenu>-->
        </Menu>
        <Menu id="copymenue" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto', height: '100%'}"
              v-show = "shrink" active-name="1-1" :open-names="['1']" :theme="'dark'">
        </Menu>
      </div>
      <div v-if="true" class="main-header-con" >
        <Menu mode="horizontal" :theme="'dark'" active-name="1" @on-select="itemSelect">
          <MenuItem name="0" style="color: #2d8cf0;cursor:default">
            <!--<Icon type="logo-html5" style="font-size: 20px"></Icon>-->
           山东省医师协会官网
          </MenuItem>
          <MenuItem v-for="(item,index) in menuedata" :key="index" :name="item.main">
            <!--获取长为15的数组，存放到menuedata-->
            <!--系统管理-->
            <Icon v-if="item.main === '1'" type="ios-cog"></Icon>
            <span v-if="item.main === '1'">系统管理</span>
            <!--新闻管理-->
            <Icon v-if="item.main === '6'" type="ios-cog"></Icon>
            <span v-if="item.main === '6'">新闻管理</span>
            <!--视频中心-->
            <!--<Icon v-if="item.main === '8'" type="ios-cog"></Icon>-->
            <!--<span v-if="item.main === '8'">视频中心</span>-->
            <!--十佳医师-->
            <!--<Icon v-if="item.main === '9'" type="ios-cog"></Icon>-->
            <!--<span v-if="item.main === '9'">十佳医师</span>-->
            <!--协会管理-->
            <Icon v-if="item.main === '10'" type="ios-cog"></Icon>
            <span v-if="item.main === '10'">协会管理</span>
            <!--协会管理-->
            <Icon v-if="item.main === '11'" type="ios-cog"></Icon>
            <span v-if="item.main === '11'">分会管理</span>
            <!--支援-->
            <!--<Icon v-if="item.main === '12'" type="ios-cog"></Icon>-->
            <!--<span v-if="item.main === '12'">对口支援</span>-->
          </MenuItem>
          <div class="user-dropdown-menu-con" style="position: fixed;right: 0;">
            <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
              <!--消息通知↓-->
              <!--<message-tip v-model="mesCount" @click="messageClick"></message-tip>-->
              <!--消息通知↑-->
              <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                <a href="javascript:void(0)">
                  <span class="main-user-name">{{ loginUserName }}</span>
                  <Icon type="md-arrow-dropdown" style="font-size: 20px;"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="loginout">退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Avatar style="background: #619fe7;margin-right: 10px;color: $white;"><Icon type="ios-person" style="font-size: 25px;vertical-align: middle;" ></Icon></Avatar>
            </Row>
          </div>
        </Menu>
      <div class="main-header" :style="{paddingLeft: shrink?'60px':'200px'}">
        <div class="navicon-con">
          <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
            <Icon type="md-menu" size="15"></Icon>
          </Button>
        </div>
        <div class="header-middle-con">
          <div class="main-breadcrumb">
            <span class="current-path">{{currentpathm}}&nbsp;/&nbsp;{{currentpathc}}</span>
          </div>
        </div>
      </div>
      </div>
      <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
        <div class="single-page">
            <router-view></router-view>
        </div>
      </div>
    </div>
</template>

<script>
  import * as UtilsService from '../../utils/utilsService';
  import * as loginService from '../../service/loginService';
  export default {
    data() {
      return {
        truemenuedata: [],
        menuedata: [],
        selectroute: '/system/userMessage', // 选中route
        selecteditems: [], // 选中menue下级菜单list
        mesCount: 10,
        currentItem: '1', // 菜单栏可选择默认,很重要有1 6 8 9 10 11 12
        currentpathm: '系统管理',
        currentpathc: '用户管理',
        shrink: false,
//        avatorPath: 'static/images/Personal-center1.png',
        loginUserName: UtilsService.getRealName(),
        index: ''
      };
    },
    methods: {
        /*
        * 消息点击
        * 2018年3月28日11:00:53 gk
        * */
      messageClick() {
        this.currentpathm = '首页';
        this.currentpathc = '消息中心';
      },
        /*
        * 顶部menue选择事件
        * 2018年3月27日15:47:09 gk
        * */
      itemSelect(item) {
        // 从长度为15的数组中过滤出指定main的对象，取数组的0位，在取对象的detailes拿到数组，该数组由对象组成
        this.selecteditems = this.menuedata.filter(data => data.main === item)[0].detailes;// 决定生成多少MenuItem
        this.currentItem = item;// currentItem =1 决定左边栏显示什么
        this.turnurl(this.currentItem + '-1'); // 路由跳转item-1  路由跳转到对应的位置
        UtilsService.setSessionStorage('semenueitem', this.selecteditems);// 数值存入数组  缓存semenueitem发生改变，里面是新的数组
        UtilsService.setSessionStorage('semenueselectitem', this.currentItem);// 数值存入1  缓存semenuselectitem存数值
      },
        /*
        * 左边menue展示控制
        * */
      toggleClick() {
        this.shrink = !this.shrink;
      },
      /*
      * 个人操作事件
      * 2018年3月26日17:50:12 gk
      * */
      handleClickUserDropdown(name) {
        if (name === 'ownSpace') {
          util.openNewPage(this, 'ownspace_index');
          this.$router.push({
            name: 'ownspace_index'
          });
        }
        else if (name === 'loginout') {
          // 退出登录
          loginService.logout().then(response => {
            if (response.code === '0') {
              UtilsService.cleanSessionAll();
              this.$router.push({
                path: '/websiteHome'
              });
            }
          });
        }
      },
        /*
        *2018年3月23日15:11:12 路由跳转
        * */
      turnurl(url) {
        switch (url) {
          case '1-1':
            this.$router.push({path: '/system/userMessage'});
            this.selectroute = '/system/userMessage';
            this.currentpathm = '系统管理';
            this.currentpathc = '用户管理';
            break;
          case '1-2':
            this.$router.push({path: '/system/roleMessage'});
            this.selectroute = '/system/roleMessage';
            this.currentpathm = '系统管理';
            this.currentpathc = '角色管理';
            break;
          case '1-7':
            this.$router.push({path: '/system/function'});
            this.selectroute = '/system/function';
            this.currentpathm = '系统管理';
            this.currentpathc = '菜单管理';
            break;
          case '1-4':
            this.$router.push({path: '/system/dicttype'});
            this.selectroute = '/system/dicttype';
            this.currentpathm = '系统管理';
            this.currentpathc = '字典管理';
            break;
//          case '1-5':
//            this.$router.push({path: '/system/datasource'});
//            this.selectroute = '/system/datasource';
//            this.currentpathm = '系统管理';
//            this.currentpathc = '多数据源管理';
//            break;
          case '6-1':
            this.$router.push({path: '/system/newsManager'});
            this.currentpathm = '新闻管理';
            this.currentpathc = '新闻管理';
            break;
          case '6-5':
            this.$router.push({path: '/system/videoManager'});
            this.selectroute = '/ststem/videoManager';
            this.currentpathm = '视频中心';
            this.currentpathc = '视频中心';
            break;
          case '6-4':
            this.$router.push({path: '/system/doctorManager'});
            this.selectroute = '/ststem/doctorManager';
            this.currentpathm = '十佳医师';
            this.currentpathc = '十佳医师';
            break;
          case '10-1':
            this.$router.push({path: '/system/association_manager'});
            this.selectroute = '/system/association_manager';
            this.currentpathm = '协会管理';
            this.currentpathc = '协会管理';
            break;
          case '11-1':
            this.$router.push({path: '/system/branchVip_manager'});
            this.selectroute = '/system/branchVip_manager';
            this.currentpathm = '分会管理';
            this.currentpathc = '分会管理';
            break;
          case '11-2':
            this.$router.push({path: '/system/branchVip_committee'});
            this.selectroute = '/system/branchVip_committee';
            this.currentpathm = '主任委员';
            this.currentpathc = '主任委员';
            break;
          case '6-3':
            this.$router.push({path: '/system/counterpartSupport'});
            this.selectroute = '/system/counterpartSupport';
            this.currentpathm = '对口支援';
            this.currentpathc = '对口支援';
            break;
          case '6-2':
            this.$router.push({path: '/system/communist_work'});
            this.selectroute = '/system/communist_work';
            this.currentpathm = '党建工作';
            this.currentpathc = '党建工作';
            break;
          case '6-6':
            this.$router.push({path: '/system/doctor_examination'});
            this.selectroute = '/system/doctor_examination';
            this.currentpathm = '医师定考';
            this.currentpathc = '医师定考';
            break;
        }
        UtilsService.setSessionStorage('go_route', this.selectroute);
        UtilsService.setSessionStorage('semenueselectcurrentpathm', this.currentpathm);
        UtilsService.setSessionStorage('semenueselectcurrentpathm', this.currentpathc);
      }
    },
    created: function() {
      if (UtilsService.getSessionStorage('ysxhLoginUser') === null) { // 页面拦截，跳转到登录页面
        this.$router.push({path: '/login'});
      }
      if (UtilsService.getSessionStorage('semenueitem') !== null) {
        this.selecteditems = UtilsService.getSessionStorage('semenueitem');
      }
      if (UtilsService.getSessionStorage('semenueselectitem') !== null) {
        this.currentItem = UtilsService.getSessionStorage('semenueselectitem');
      }
      if (UtilsService.getSessionStorage('semenueselectcurrentpathm') !== null) {
        this.currentpathm = UtilsService.getSessionStorage('semenueselectcurrentpathm');
      }
      if (UtilsService.getSessionStorage('semenueselectcurrentpathm') !== null) {
        this.currentpathc = UtilsService.getSessionStorage('semenueselectcurrentpathm');
      }
      if (UtilsService.getSessionStorage('HimrealName') !== null) {
        this.userName = UtilsService.getSessionStorage('HimrealName');
      }
      if (UtilsService.getSessionStorage('ysxhMenuData') !== null) { // 获取登录后返回的菜单
        this.menuedata = UtilsService.getSessionStorage('ysxhMenuData');
        // 决定上边栏显示多少.
       //  console.log(this.menuedata);
        // 获取长为15的数组，存放到menuedata
        this.truemenuedata = this.menuedata.filter(data => data.main !== '');
        // 遍历出对象的main属性不等于空的数组放到truemenuedata
      }
      if (this.truemenuedata.length > 0) {
        // 遍历过的数组长度如果大于0，就调用itemSelect方法
        this.itemSelect('1');
      }
      this.currentpathm = '系统管理';
      this.currentpathc = '用户管理';
      this.selectroute = '/system/userMessage';
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/base/fn.scss";

  .main {
    position: absolute;
    width: 50%;
    height: 100%;
    .unlock-con {
      width: 0;
      height: 0;
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 11000;
    }
    .sidebar-menu-con {
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 21;
      transition: width 0.3s;
    }
    .layout-text {
      display: inline-block;
      white-space: nowrap;
      position: absolute;
    }
    .main-hide-text .layout-text {
      display: none;
    }
    &-content-container {
      position: relative;
    }
    &-header-con {
      box-sizing: border-box;
      position: fixed;
      display: block;
      width: 100%;
      height: 100px;
      z-index: 20;
      box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);
      transition: padding 0.3s;
    }
    &-breadcrumb {
      padding: 5px 15px 0;
    }
    &-menu-left {
      background: $grey68;
      height: 100%;
    }
    .tags-con {
      height: 40px;
      z-index: -1;
      overflow: hidden;
      background: $grey31;
      .tags-outer-scroll-con {
        position: relative;
        box-sizing: border-box;
        padding-right: 120px;
        width: 100%;
        height: 100%;
        .tags-inner-scroll-body {
          position: absolute;
          padding: 2px 10px;
          overflow: visible;
          white-space: nowrap;
          transition: left 0.3s ease;
        }
        .close-all-tag-con {
          position: absolute;
          right: 0;
          top: 0;
          box-sizing: border-box;
          padding-top: 8px;
          text-align: center;
          width: 110px;
          height: 100%;
          background: $white;
          box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
          z-index: 10;
        }
      }
    }
    &-header {
      height: 40px;
      background: $white;
      box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);
      position: relative;
      z-index: 11;
      .navicon-con {
        margin-top: 4px;
        margin-left: 10px;
        vertical-align: top;
        display: inline-block;
      }
      .header-middle-con {
        left: 160px;
        top: 0;
        bottom: 0;
        padding: 1px;
        display: inline-block;
        overflow: hidden;
        cursor: default;
      }
      .header-avator-con {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 200px;
        .switch-theme-con {
          display: inline-block;
          width: 40px;
          height: 100%;
        }
        .change-skin {
          font-size: 14px;
          font-weight: 500;
          padding-right: 5px;
        }
        .switch-theme {
          height: 100%;
        }
        .user-dropdown {
          display: inline-block;
          position: absolute;
          &-menu-con {
            right: 0;
            top: 100px;
            width: 150px;
            height: 100%;
            .main-user-name {
              display: inline-block;
              width: 80px;
              word-break: keep-all;
              white-space: nowrap;
              vertical-align: middle;
              overflow: hidden;
              text-overflow: ellipsis;
              text-align: right;
            }
          }
          &-innercon {
            height: 100%;
            padding-right: 14px;
          }
        }
        .full-screen-btn-con {
          display: inline-block;
          width: 30px;
          padding: 18px 0;
          text-align: center;
          cursor: pointer;
          i {
            vertical-align: middle;
          }
        }
        .lock-screen-btn-con {
          display: inline-block;
          width: 30px;
          padding: 18px 0;
          text-align: center;
          cursor: pointer;
          i {
            vertical-align: middle;
          }
        }
      }
    }
    &-copy {
      text-align: center;
      padding: 10px 0 20px;
      color: $grey62;
    }
  }

  .single-page-con {
    position: absolute;
    top: 100px;
    right: 0;
    bottom: 1%;
    overflow: auto;
    background-color: $grey8;
    z-index: 1;
    transition: left 0.3s;
    .single-page {
      margin: 10px;
      height: 97%;
    }
  }
  #copymenue.ivu-menu-vertical .ivu-menu-submenu-title-icon {
    visibility: hidden;
  }
  .current-path {
    font-size: 18px;
  }
  .ivu-dropdown-rel {
    margin-right: 20px;
  }
  .main-container {
    .side-nav {
      position: absolute;
      height: 100%;
      margin-top: 60px;
    }
    .main-content {
      margin-left: 240px;
    }
  }
</style>
