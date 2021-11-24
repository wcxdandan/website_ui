import Vue from 'vue';
// import * as UtilsService from '../utils/utilsService';
// import * as ConstantsUtil from '../utils/constantsUtil';

/**
 * 2018-05-15 董浩
 * 获取阿里云信息
 * */
export function getAliyunStsMessage() {
  return Vue.http({
    method: 'GET',
    // url: ConstantsUtil.LOCALHOST + '/feature/api/getAliyunStsMessage',
    url: 'https://pre.jiankangsn.com/feature/api/getAliyunStsMessage',
    // headers: UtilsService.getTokenHeader(),
    emulateJSON: true
  }).then(response => {
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    return null;
  });
}
