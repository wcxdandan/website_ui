<template>
  <div class="banner-homepage">
    <div class="swiper-height"></div>
    <div v-if="scrollPicLists.length > 0">
      <swiper ref="swiper" id="swiper"
              direction="horizontal"
              :mousewheel-control="true"
              :performance-mode="false"
              :pagination-visible="true"
              :pagination-clickable="true"
              :loop="true">
        <div v-for="scrollPic in scrollPicLists" @click="goUrl(scrollPic.id, scrollPic.typecode)">
          <a>
            <img :src="scrollPic.titlePicture" class="bannerImage"/>
          </a>
        </div>
      </swiper>
    </div>
    <!--当未查询到图片时，默认显示一图片-->
    <div v-if="scrollPicLists.length == 0">
      <div @click="goUrl(scrollPic.id, scrollPic.typecode)">
        <a>
          <img src="../assets/images/metting.png" class="bannerImage"/>
        </a>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import Swiper from '../components/vue-swiper.vue';
  import * as homeService from '../service/homeService';
  import * as UtilsService from '../utils/utilsService';

  export default {
    name: 'banner',
    components: {
      'swiper': Swiper
    },
    props: {
    },
    data() {
      return {
        currentPic: 0,
        newsType: {
          'partyRegulations': '/newsInfo',
          'seriesSpeech': '/newsInfo',
          'partyBuildingNews': '/newsInfo',
          'policyInterpretation': '/newsInfo',
          'noticeAnnouncement': '/newsInfo',
          'downloadColumn': '/newsInfo',
          'gzdt': '/newsInfo',
          'xxgg': '/newsInfo',
          'xzzl': '/newsInfo',
          'hyxw': '/newsInfo',
          'dkzy': '/newsInfo',
          'yspy': '/newsInfo',
          'zlwq': '/newsInfo',
          'xyg': '/newsInfo',
          'sbfp': '/newsInfo',
          'zyxx': '/newsInfo',
          'dfysxh': '/newsInfo',
          'zkysfh': '/newsInfo'
        },
        urls: [],
        id: 0, // 定时器Id
        box: '',
        scrollPicLists: [], // 轮播图信息
        sessionList: [] // 缓存数据
      };
    },
    watch: {
    },
    created: function() {
      this.queryScrollPic();
    },
    mounted: function() {
        // 代码保证 this.$el 在 document 中
      let self = this;
      this.id = setInterval(function() {
        self.$refs.swiper.next();
      }, 3000);
    },
    methods: {
      changeBanner(id) {
        this.currentPic = id;
      },
      goUrl(param, type) {
        console.log('拼接之后url地址' + this.newsType[type] + '?id=' + param + '&type=' + type);
        this.$router.push(
          {
            path: this.newsType[type],
            query: {
              id: param,
              type: type
            }
          }
        );
      },
      // 获取图片
      queryScrollPic() {
        let url = UtilsService.getSessionStorage('lastPath');
        if (url === '/websiteHome') {
          homeService.queryScrollPic().then(response => {
            if (response.code === '0') {
              this.scrollPicLists = response.list;
            }
            else {
              this.open(response.msg);
              return;
            }
          });
        }
        else if (url === '/djgz') {
          homeService.queryScrollPicPartyBuiding().then(response => {
            if (response.code === '0') {
              this.scrollPicLists = response.list;
            }
            else {
              this.open(response.msg);
              return;
            }
          });
        }
        else if (url === '/ysdk') {
          homeService.queryScrollPicYsdk().then(response => {
            if (response.code === '0') {
              this.scrollPicLists = response.list;
            }
            else {
              this.open(response.msg);
              return;
            }
          });
        }
      }
    },
    destroyed() {
      // 组件被销毁，也同时销毁定时器，节约资源
      window.clearInterval(this.id);
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../assets/css/base/fn.scss";

  .banner-homepage {
    position: relative;
    text-align: center;
    .bannerImage {
      width: 99.9%;
      height: 360px;
    }
  }
</style>
