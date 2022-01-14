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
          <label>联系我们</label>
        </div>
        <div class="left-menu">
          <div :class="fristType === 'jtgs' ? 'title-text-sel' : 'title-text'" @click="fristClick('jtgs')">集团公司</div>
          <div :class="fristType === 'xsgs' ? 'title-text-sel' : 'title-text'" @click="fristClick('xsgs')">鑫盛公司</div>
          <div :class="fristType === 'xygs' ? 'title-text-sel' : 'title-text'" @click="fristClick('xygs')">鑫运煤业</div>
          <div :class="fristType === 'xymy' ? 'title-text-sel' : 'title-text'" @click="fristClick('xymy')">鑫益煤业</div>
          <div :class="fristType === 'xnmy' ? 'title-text-sel' : 'title-text'" @click="fristClick('xnmy')">鑫能煤业</div>
          <div class="menu-second" v-if="fristType === 'xnmy'">
            <div :class="secondType === 'xnmk' ? 'title-ld-sel' : 'title-ld'" @click="secondClick('xnmy','xnmk')">鑫能煤矿</div>
            <div :class="secondType === 'xnxmc' ? 'title-ld-sel' : 'title-ld'" @click="secondClick('xnmy','xnxmc')">鑫能洗煤厂</div>
          </div>
        </div>
        <div class="right-context">
          <div class="xhjj">
            <div class="xhjj-title">{{selectContactUs.title}}</div>
            <div class="xhjj-text">
              <p>地址：{{selectContactUs.address}}</p>
              <p>电话：{{selectContactUs.phone}}</p>
              <p>邮箱：{{selectContactUs.email}}</p>
              <p>经营范围：{{selectContactUs.businessScope}}</p>
              <div class="amap-wrapper">
                <el-amap
                  ref="map"
                  :vid="'amapDemo'"
                  :center="selectContactUs.position"
                  :zoom="zoom"
                  :plugin="plugin"
                  :events="events"
                  class="amap-demo"
                  style="height: 500px;"
                >
                  <el-amap-marker :position="selectContactUs.position" :icon="icon">
                  </el-amap-marker>
                </el-amap>
              </div>
            </div>
          </div>
          <!-- 协会简介 协会章程 服务公约 组织机构 管理办法 职能部门 理事会-->
<!--          <div class="xhjj" v-if="fristType !== 'xhld'|| secondType === 'lsh'" v-for="item in associationList">-->
<!--            <div class="xhjj-title">{{item.title}}</div>-->
<!--            <div class="xhjj-text" v-html="item.content"></div>-->
<!--          </div>-->
          <!-- 协会领导 名誉会长 会长 副会长 秘书长 -->
<!--          <div class="xhjj" v-if="secondType === 'myhz'|| secondType === 'hz'|| secondType === 'fhz'|| secondType === 'msz'">-->
<!--            <div class="myhz-div" v-for="item in associationList">-->
<!--              <div class="ld-img">-->
<!--                <div v-if="item.titlePicture === ''">-->
<!--                  <img src="../../assets/images/timg.jpg" class="imgUrl">-->
<!--                </div>-->
<!--                <div v-else="item.titlePicture !== ''">-->
<!--                  <img :src="item.titlePicture" class="imgUrl">-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="ldjs-title">{{item.title}}</div>-->
<!--              <div class="xhjj-text" v-html="item.content"></div>-->
<!--            </div>-->
<!--          </div>-->
          <!--监事会-->
<!--          <div class="xhjj" v-if="secondType === 'jsh'">-->
<!--            <div class="myhz-divs" style="height: 380px" v-for="item in associationList">-->
<!--              <div v-if="item.id === '17'">-->
<!--                <div style="font-size: 24px; margin-bottom: 20px">监事长:</div>-->
<!--                <div class="ld-img"><img :src="item.titlePicture"></div>-->
<!--                <div class="ldjs-title">{{item.title}}</div>-->
<!--                <div class="xhjj-text" v-html="item.content"></div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div style="font-size: 24px;margin-bottom: 10px">监事:</div>-->
<!--            <div class="myhz-div" v-for="item in associationList">-->
<!--              <div class="ldjs-title" v-if="item.id !== '17'" style="margin-right: 15px;font-size: 30px">{{item.title}}-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
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
        menuSecond: ['myhz', 'hz', 'fhz', 'msz', 'lsh', 'jsh', 'bgs', 'hyb', 'pxb', 'xxb', 'bks', 'das', 'dqkhbgs'],
        center: [112.205528, 36.823282],
        zoom: 12,
        // position: [121.5273285, 31.21515044],
        selectContactUs: {},
        contactUslist: [
          {
            type: 'jtgs',
            title: '山西黄土坡煤业集团有限公司',
            address: '沁源县聪子峪乡小岭底村',
            phone: '0355-7969780',
            email: 'xgqjhygr@163.com',
            position: [112.205528, 36.823282],
            businessScope: '经营范围：矿山机械设备、五金交电、劳保用品、办公用品、日杂、建材（林区木材除外）、润滑油销售；冷轧加工、锚杆；金属网的加工制造、销售；矿产资源开采：煤炭开釆；（仅限分支机构）；煤炭洗选（仅限分支机构）；煤炭批发经营。（依法须经批准的项目，经相关部门批准后方可开展经营活动）'
          },
          {
            type: 'xsgs',
            title: '鑫盛公司',
            address: '沁源县聪子峪乡小岭底村',
            phone: '0355-7969780',
            position: [121.5273285, 31.21515044],
            email: 'xgqjhygr@163.com',
            businessScope: '经营范围：矿山机械设备、五金交电、劳保用品、办公用品、日杂、建材（林区木材除外）、润滑油销售；冷轧加工、锚杆；金属网的加工制造、销售；矿产资源开采：煤炭开釆；（仅限分支机构）；煤炭洗选（仅限分支机构）；煤炭批发经营。（依法须经批准的项目，经相关部门批准后方可开展经营活动）'
          },
          {
            type: 'xygs',
            title: '鑫运公司',
            address: '沁源县聪子峪乡小岭底村',
            phone: '0355-7969780',
            position: [121.5273285, 31.21515044],
            email: 'xgqjhygr@163.com',
            businessScope: '经营范围：矿山机械设备、五金交电、劳保用品、办公用品、日杂、建材（林区木材除外）、润滑油销售；冷轧加工、锚杆；金属网的加工制造、销售；矿产资源开采：煤炭开釆；（仅限分支机构）；煤炭洗选（仅限分支机构）；煤炭批发经营。（依法须经批准的项目，经相关部门批准后方可开展经营活动）'
          },
          {
            type: 'xymy',
            title: '鑫益煤业',
            address: '沁源县聪子峪乡小岭底村',
            phone: '0355-7969780',
            position: [121.5273285, 31.21515044],
            email: 'xgqjhygr@163.com',
            businessScope: '经营范围：矿山机械设备、五金交电、劳保用品、办公用品、日杂、建材（林区木材除外）、润滑油销售；冷轧加工、锚杆；金属网的加工制造、销售；矿产资源开采：煤炭开釆；（仅限分支机构）；煤炭洗选（仅限分支机构）；煤炭批发经营。（依法须经批准的项目，经相关部门批准后方可开展经营活动）'
          },
          {
            type: 'xnmk',
            title: '鑫能煤矿',
            address: '沁源县聪子峪乡小岭底村',
            phone: '0355-7969780',
            position: [121.5273285, 31.21515044],
            email: 'xgqjhygr@163.com',
            businessScope: '经营范围：矿山机械设备、五金交电、劳保用品、办公用品、日杂、建材（林区木材除外）、润滑油销售；冷轧加工、锚杆；金属网的加工制造、销售；矿产资源开采：煤炭开釆；（仅限分支机构）；煤炭洗选（仅限分支机构）；煤炭批发经营。（依法须经批准的项目，经相关部门批准后方可开展经营活动）'
          },
          {
            type: 'xnxmc',
            title: '鑫能洗煤厂',
            address: '沁源县聪子峪乡小岭底村',
            phone: '0355-7969780',
            position: [121.5273285, 31.21515044],
            email: 'xgqjhygr@163.com',
            businessScope: '经营范围：矿山机械设备、五金交电、劳保用品、办公用品、日杂、建材（林区木材除外）、润滑油销售；冷轧加工、锚杆；金属网的加工制造、销售；矿产资源开采：煤炭开釆；（仅限分支机构）；煤炭洗选（仅限分支机构）；煤炭批发经营。（依法须经批准的项目，经相关部门批准后方可开展经营活动）'
          }
        ],
        // icon: require('../../assets/icon/pika.jpg'),//自定义地图标记点图片
        events: {
          init(o) {
            console.log(o.getCenter());
          },
          zoomchange: (e) => {
            console.log(e);
          },
          zoomend: (e) => {
            // 获取当前缩放zoom值
            console.log(this.$refs.map.$$getInstance().getZoom());
            console.log(e);
          },
          click: e => {
            alert('map clicked');
          }
        },
        // 使用其他组件
        plugin: [
          {
            pName: 'Scale',
            events: {
              init(instance) {
                console.log(instance);
              }
            }
          },
          {
            pName: 'ToolBar',
            events: {
              init(instance) {
                console.log(instance);
              }
            }
          }
        ]
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
        if (this.fristType === 'xnmy') {
          this.secondType = 'xnmk';
          name = 'xnmk';
        }
        this.selectContactUs = this.contactUslist[this.contactUslist.findIndex(el => el.type === name)];
        // this.associationIntroduce(name);
      },
      secondClick(fristType, secondType) {
        this.fristType = fristType;
        this.secondType = secondType;
        this.selectContactUs = this.contactUslist[this.contactUslist.findIndex(el => el.type === secondType)];
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
      this.fristType = 'jtgs';
      this.selectContactUs = this.contactUslist[0];
      // let xhStatus = UtilsService.getSessionStorage('XHstatus');
      // // 协会详情状态  判断
      // if (xhStatus === 'xhjj' || xhStatus === 'zzjg' || xhStatus === 'glbf') {
      //   this.fristClick(xhStatus);
      // }
      // else if (xhStatus === 'myhz' || xhStatus === 'hz' || xhStatus === 'fhz' || xhStatus === 'msz' || xhStatus === 'lsh' || xhStatus === 'jsh') {
      //   this.secondClick('xhld', xhStatus);
      // }
      // else {
      //   this.fristClick('xhjj');
      // }
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
            .amap-wrapper {
              margin-top: 20px;
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

