<template>
  <div id="app-xhjs">
    <div class="main-header">
      <header-main v-on:watchXh="getXh"></header-main>
    </div>
    <div class="xhjs-content">
      <div class="xhjs-content-info-div">
        <div class="menu-crumbs-info">
          <label class="empty-block">&nbsp;</label>
          <label @click="goUrl('/websiteHome')">首页<i  class="iconfont icon-jiantouyou"></i></label>
          <label>黄煤介绍</label>
        </div>
        <div class="left-menu">
          <div :class="fristType === 'xhjj' ? 'title-text-sel' : 'title-text'" @click="fristClick('xhjj')">山西黄煤</div>
          <!--<div :class="fristType === 'xhzc' ? 'title-text-sel' : 'title-text'" @click="fristClick('xhzc')">协会章程</div>-->
          <!--<div :class="fristType === 'fwgy' ? 'title-text-sel' : 'title-text'" @click="fristClick('fwgy')">服务公约</div>-->
          <div :class="fristType === 'xhld' ? 'title-text-sel' : 'title-text'" @click="fristClick('xhld')">公司领导</div>
          <div class="menu-second" v-if="fristType === 'xhld'">
            <!--<div :class="secondType === 'myhz' ? 'title-ld-sel' : 'title-ld'" @click="secondClick('xhld','myhz')">名誉会长</div>-->
            <div :class="secondType === 'hz' ? 'title-ld-sel' : 'title-ld'" @click="secondClick('xhld','hz')">矿长</div>
            <div :class="secondType === 'fhz' ? 'title-ld-sel' : 'title-ld'" @click="secondClick('xhld','fhz')">副矿长</div>
            <div :class="secondType === 'msz' ? 'title-ld-sel' : 'title-ld'" @click="secondClick('xhld','msz')">书记</div>
            <!--<div :class="secondType === 'lsh' ? 'title-ld-sel' : 'title-ld'" @click="secondClick('xhld','lsh')">理事会</div>-->
            <!--<div :class="secondType === 'jsh' ? 'title-ld-sel' : 'title-ld'" @click="secondClick('xhld','jsh')">监事会</div>-->
          </div>
          <!--<div :class="fristType === 'zzjg' ? 'title-text-sel' : 'title-text'" @click="fristClick('zzjg')">组织机构</div>-->
          <!--<div :class="fristType === 'glbf' ? 'title-text-sel' : 'title-text'" @click="fristClick('glbf')">管理办法</div>-->
          <div :class="fristType === 'znbm' ? 'title-text-sel' : 'title-text'" @click="fristClick('znbm')">子公司</div>
          <div class="menu-second" v-if="fristType === 'znbm'">
            <div :class="secondType === 'bgs' ? 'title-ld-sel' : 'title-ld'" @click="secondClick('znbm','bgs')">办公室</div>
            <!--<div :class="secondType === 'hyb' ? 'title-ld-sel' : 'title-ld'" @click="secondClick('znbm','hyb')">会员部</div>-->
            <!--<div :class="secondType === 'pxb' ? 'title-ld-sel' : 'title-ld'" @click="secondClick('znbm','pxb')">培训部</div>-->
            <!--<div :class="secondType === 'xxb' ? 'title-ld-sel' : 'title-ld'" @click="secondClick('znbm','xxb')">信息部</div>-->
            <!--<div :class="secondType === 'qks' ? 'title-ld-sel' : 'title-ld'" @click="secondClick('znbm','qks')">期刊社</div>-->
            <!--<div :class="secondType === 'das' ? 'title-ld-sel' : 'title-ld'" @click="secondClick('znbm','das')">档案室</div>-->
            <div :class="secondType === 'hyb' ? 'title-ld-sel' : 'title-ld'" @click="secondClick('znbm','hyb')">鑫盛公司</div>
            <div :class="secondType === 'pxb' ? 'title-ld-sel' : 'title-ld'" @click="secondClick('znbm','pxb')">鑫能煤业</div>
            <div :class="secondType === 'qks' ? 'title-ld-sel' : 'title-ld'" @click="secondClick('znbm','qks')">鑫运煤业</div>
            <div :class="secondType === 'xxb' ? 'title-ld-sel' : 'title-ld'" @click="secondClick('znbm','xxb')">鑫益煤业</div>
            <!--<div :class="secondType === 'dqkhbgs' ? 'title-ld-sel' : 'title-ld'" @click="secondClick('znbm','dqkhbgs')">定期考核办公室</div>-->
          </div>
        </div>
        <div class="right-context">
          <!-- 协会简介 协会章程 服务公约 组织机构 管理办法 职能部门 理事会-->
          <div class="xhjj" v-if="fristType !== 'xhld'|| secondType === 'lsh'" v-for="item in associationList">
            <div class="xhjj-title">{{item.title}}</div>
            <div class="xhjj-text" v-html="item.content"></div>
          </div>
          <!-- 协会领导 名誉会长 会长 副会长 秘书长 -->
          <div class="xhjj" v-if="secondType === 'myhz'|| secondType === 'hz'|| secondType === 'fhz'|| secondType === 'msz'">
            <div class="myhz-div" v-for="item in associationList">
              <div class="ld-img">
                <div v-if="item.titlePicture === ''">
                  <img src="../../assets/images/timg.jpg" class="imgUrl">
                </div>
                <div v-else="item.titlePicture !== ''">
                  <img :src="item.titlePicture" class="imgUrl">
                </div>
              </div>
              <div class="ldjs-title">{{item.title}}</div>
              <div class="xhjj-text" v-html="item.content"></div>
            </div>
          </div>
          <!--监事会-->
          <div class="xhjj" v-if="secondType === 'jsh'">
            <div class="myhz-divs" style="height: 380px" v-for="item in associationList">
              <div v-if="item.id === '17'">
                <div style="font-size: 24px; margin-bottom: 20px">监事长:</div>
                <div class="ld-img"><img :src="item.titlePicture"></div>
                <div class="ldjs-title">{{item.title}}</div>
                <div class="xhjj-text" v-html="item.content"></div>
              </div>
            </div>
            <div style="font-size: 24px;margin-bottom: 10px">监事:</div>
            <div class="myhz-div" v-for="item in associationList">
              <div class="ldjs-title" v-if="item.id !== '17'" style="margin-right: 15px;font-size: 30px">{{item.title}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <sn-footer></sn-footer>
    </div>
  </div>
</template>
<script type="text/javascript">
  import * as UtilsService from '../../utils/utilsService';
  import * as associationIntroduceService from '../../service/associationIntroduceService';
  export default{
    data() {
      return {
        associationList: [],
        openLayer: true,
        fristType: 'xhjj', // 一层菜单选中
        secondType: '', // 二层菜单选中
        leftMenu: ['xhjj', 'xhzc', 'fwgy', 'xhld', 'zzjg', 'glbf', 'znbm'],
        menuSecond: ['myhz', 'hz', 'fhz', 'msz', 'lsh', 'jsh', 'bgs', 'hyb', 'pxb', 'xxb', 'bks', 'das', 'dqkhbgs']
      };
    },
    methods: {
      associationIntroduce(typeCode) {
        associationIntroduceService.associationIntroduce(typeCode).then(result => {
          if (result !== null) {
            if (result.code === '0') {
              this.associationList = result.list;
            }
            else {
              this.alertMsg(result.msg);
            }
          }
          else {
            this.alertMsg(UtilsService.MESSAGE_CAN_NOT_CONNECT);
          }
        });
      },
      addaddBrowseNumer(name) {
        associationIntroduceService.addaddBrowseNumer(name);
      },
      alertMsg(msg) {
        this.$Notice.info({
          title: '信息提示：',
          desc: msg
        });
      },
      fristClick(name) {
        this.fristType = name;
        if (this.fristType === 'xhld') {
          this.secondType = 'myhz';
          name = 'myhz';
        }
        else if (this.fristType === 'znbm') {
          this.secondType = 'bgs';
          name = 'bgs';
        }
        else {
          this.secondType = '';
        }
        this.associationIntroduce(name);
      },
      secondClick(fristType, secondType) {
        this.fristType = fristType;
        this.secondType = secondType;
        this.addaddBrowseNumer(secondType);
        this.associationIntroduce(secondType);
      },
      goUrl(url) {
        this.$router.push(url);
      },
      backTop() {
        this.setScrollTop(0);
      },
      closeLayer() {
        this.openLayer = false;
      },
      // 页面置顶
      setScrollTop(scrolltop) {
        document.documentElement.scrollTop = scrolltop;
        window.pageYOffset = scrolltop;
        document.body.scrollTop = scrolltop;
      },
      mousedown(event) {
        event = event || window.event;
        let disx = event.clientX - this.$refs.cancelWindow.offsetLeft;
        let disy = event.clientY - this.$refs.cancelWindow.offsetTop;
        document.onmousemove = (event) => {
          event = event || window.event;
          this.move(event, disx, disy);
        };
      },
      move(event, disx, disy) {
        let x = event.clientX - disx;
        let y = event.clientY - disy;
        if (x < 0) {
          x = 0;
        }
        else if (x > this.maxW) {
          x = this.maxW;
        }
        if (y < 0) {
          y = 0;
        }
        else if (y > this.maxH) {
          y = this.maxH;
        }
        this.$refs.cancelWindow.style.left = x + 'px';
        this.$refs.cancelWindow.style.top = y + 'px';
      },
      mouseup() {
        document.onmousemove = null;
        document.onmouseup = null;
      },
      getXh(xhStatus) {
        // 协会详情状态  判断
        if (xhStatus === 'xhjj' || xhStatus === 'zzjg' || xhStatus === 'glbf') {
          this.fristClick(xhStatus);
        }
        else if (xhStatus === 'myhz' || xhStatus === 'hz' || xhStatus === 'fhz' || xhStatus === 'msz' || xhStatus === 'lsh' || xhStatus === 'jsh') {
          this.secondClick('xhld', xhStatus);
        }
        else {
          this.fristClick('xhjj');
        }
      }
    },
    created: function() {
      let xhStatus = UtilsService.getSessionStorage('XHstatus');
      // 协会详情状态  判断
      if (xhStatus === 'xhjj' || xhStatus === 'zzjg' || xhStatus === 'glbf') {
        this.fristClick(xhStatus);
      }
      else if (xhStatus === 'myhz' || xhStatus === 'hz' || xhStatus === 'fhz' || xhStatus === 'msz' || xhStatus === 'lsh' || xhStatus === 'jsh') {
        this.secondClick('xhld', xhStatus);
      }
      else {
        this.fristClick('xhjj');
      }
    }
  };
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/base/fn.scss";
  .imgUrl {
    height: 260px;
  }
  #app-xhjs {
    height: 100vh;
    .main-header {
      width: 100%;
      height: 180px;
    }
    .xhjs-content {
      overflow: hidden;
      margin-top: 40px;
      .xhjs-content-info-div {
        margin: 0 auto;
        overflow: hidden;
        width: 1180px;
        .menu-crumbs-info {
          width: 210px;
          font-size: 16px;
          color: $blue11;
          .empty-block {
            background-color: $blue11;
            width: 5px;
            height: 15px;
            margin-right: 10px;
          }
          .iconfont {
            color: $blue11;
          }
        }
        .left-menu {
          float: left;
          margin-top: 20px;
          width: 210px;
          height: 100vh;
          border-right: 1px solid $grey32;
          padding-right: 20px;
          .title-text {
            font-size: 20px;
            font-weight: bold;
            color: $blue11;
            margin-bottom: 20px;
            text-align: center;
            height: 50px;
            line-height: 50px;
            background-color: $grey38;
            border-radius: 5px;
          }
          .title-text-sel {
            font-size: 20px;
            font-weight: bold;
            color: $grey38;
            margin-bottom: 20px;
            text-align: center;
            height: 50px;
            line-height: 50px;
            background-color: $blue11;
            border-radius: 5px;
          }
          .menu-second {
            margin-top: -10px;
            margin-bottom: 10px;
            .title-ld {
              height: 30px;
              line-height: 30px;
              font-size: 16px;
              color: $blue11;
              padding-left: 20px;
              background-color: $grey38;
              margin-bottom: 5px;
              border-radius: 4px;
              text-align: center;
            }
            .title-ld-sel {
              height: 30px;
              line-height: 30px;
              font-size: 16px;
              color: $grey38;
              padding-left: 20px;
              background-color: $blue11;
              margin-bottom: 5px;
              border-radius: 4px;
              text-align: center;
            }
          }
        }
        .right-context {
          width: 950px;
          float: left;
          .xhjj {
            display: flow-root;
            padding: 0 40px;
            .xhjj-title {
              font-size: 30px;
              text-align: center;
              font-weight: bold;
              border-bottom: solid 2px $blue11;
              padding-bottom: 20px;
              color: $blue11;
            }
            .xhjj-text {
              margin-top: 18px;
              font-size: 18px;
              text-align: justify;
            }
            .xhjj-text-center {
              text-align: center;
            }
            .zzjg-img {
              padding-left: 40px;
              text-align: center;
            }
            .myhz-div {
              float: left;
              width: 100%;
              margin-bottom: 30px;
            }
            .myhz-divs {
              float: left;
            }
            .ld-img {
              float: left;
              margin-right: 40px;
              height: 400px;
              img {
                width: 180px;
              }
            }
            .ldjs-title {
              font-size: 30px;
              font-weight: bold;
            }
            .ldjs-content {
              font-size: 24px;
              margin-top: 20px;
              margin-bottom: 10px;
            }
            .ldjs-text {
              margin-top: 15px;
              font-size: 18px;
              text-align: justify;
            }
          }
        }
      }
    }
  }
</style>

