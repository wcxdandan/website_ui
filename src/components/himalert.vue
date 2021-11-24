<template>
  <Modal
    v-model="state"
    title="Common Modal dialog box title">
    <p>Content of dialog</p>
    <p>Content of dialog</p>
    <p>Content of dialog</p>
  </Modal>
</template>
<script type="text/javascript">
  export default {
    name: 'him-message',
    data() {
      return {
        modal1: false
      };
    },
    watch: {
      modal1: function(value) {
        this.state = value;
        this.$emit('himstate', value);
      }
    },
    props: {
      message: {
        type: String,
        default: ''
      },
      state: {
        type: Boolean,
        default: false
      }
    },
    created: function() {
      this.modal1 = this.state;
    }
//    methods: {
//      instance(type) {
//        const title = '提示信息';
//        const content = '<p>' + this.message + '</p>';
//        switch (type) {
//          case 'info':
//            this.$Modal.info({
//              title: title,
//              content: content
//            });
//            break;
//          case 'success':
//            this.$Modal.success({
//              title: title,
//              content: content
//            });
//            break;
//          case 'warning':
//            this.$Modal.warning({
//              title: title,
//              content: content
//            });
//            break;
//          case 'error':
//            this.$Modal.error({
//              title: title,
//              content: content
//            });
//            break;
//        }
//      }
//    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../assets/css/base/fn.scss";

  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
      top: 0;
    }
  }
</style>
