<template>
  <div class="banne-homepage">
    <div class="swipe-height"></div>
    <div v-if="scrollPicLists.length > 0">
      <swipe ref="swipe" id="swipe"
              direction="horizontal"
              :mousewheel-control="true"
              :performance-mode="false"
              :pagination-visible="true"
              :pagination-clickable="true"
              :loop="true">
        <div v-for="(scrollPic,index) in scrollPicLists" @click="goUrl('/newsInfo', scrollPic.id, 'dsjhy')">
          <a>
            <img :src="scrollPic.titlePicture" class="banneImage"/>
          </a>
        </div>
      </swipe>
    </div>
    <!--当未查询到图片时，默认显示一图片-->
    <div v-if="scrollPicLists.length == 0">
      <div @click="goUrl('/newsInfo', scrollPic.id, 'gzdt')">
        <a>
          <img src="../assets/images/metting.png" class="banneImage"/>
        </a>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import Swipe from '../components/vue-swipe.vue';
  import * as homeService from '../service/homeService';

  export default {
    name: 'banner-new',
    components: {
      'swipe': Swipe
    },
    props: {
    },
    data() {
      return {
        currentPic: 0,
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
        self.$refs.swipe.next();
      }, 3000);
    },
    methods: {
      changeBanner(id) {
        this.currentPic = id;
      },
      goUrl(url, param, type) {
        if (param && type) {
          this.$router.push(
            {
              path: url,
              query: {
                id: param,
                type: type
              }
            }
          );
        }
        if (!param && type) {
          this.$router.push(
            {
              path: url,
              query: {
                type: type
              }
            }
          );
        }
        if (!param && !type) {
          this.$router.push(url);
        }
      },
      // 获取图片
      queryScrollPic() {
        homeService.queryScrollPicDSJ().then(response => {
          if (response.code === '0') {
            this.scrollPicLists = response.list;
          }
          else {
            this.open(response.msg);
            return;
          }
        });
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

  .banne-homepage {
    position: relative;
    text-align: center;
    .banneImage {
      width: 99.9%;
      height: 226px;
    }
  }
</style>
