<template>
  <div class="add-news">
    <div class="add-news-detail">
      <div class="add-ordinary-log-top">
        <div class="title">编辑新闻</div>
        <div class="close" @click="confirm(false)"><i class="iconfont icon-style">&#xea60;</i></div>
      </div>
      <div style="clear: both;"></div>
      <div class="content">
        <div class="detail">
          <div class="detail-left">新闻标题:</div>
          <div class="detail-right">
            <Input style="width: 100%"/>
          </div>
        </div>
        <div class="detail">
          <div class="detail-left">新闻类别:</div>
          <div class="detail-right" style="width: 40%;text-align: left;">
            <!--<Select id="zhifufangshi"  clearable style="width: 100%;" placeholder="新闻类型" v-model="newsType">
              <Option value="全部">全部</Option>
              <Option v-for="item in newTypeList" :value="item.id" :key="item.id">{{ item.typeName }}</Option>
            </Select>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'edit-news',
    props: {},
    data() {
      return {

      };
    },
    methods: {
      confirm(value) {
        if (value === false) {
          this.$emit('confirmstate', value);
        }
      },
      // 提示信息
      alertMsg(msg) {
        this.$Notice.info({
          title: '信息提示：',
          desc: msg
        });
      }
    },
    created: function() {
    }
  };
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../assets/css/base/fn.scss";
  .select-Img-File-input {
    display: none;
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
        margin-top: 50px;
        width: 100%;
        height: 100%;
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
      }
    }
  }
</style>
