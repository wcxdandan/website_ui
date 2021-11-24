/**
 * Created by gk on 2018/4/16.
 */
import request from '../utils/request';
import * as UtilsService from '../utils/utilsService';

/*
* 根据参数获取对应字典值
* 2018年4月16日15:02:32 gk
* */
export function getDictionary(condition) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'currencyController.do?dictionary&types=' + condition.types + '&system=' + condition.system + '&params=' + condition.params,
    data: params,
    headers: UtilsService.getTokenHeader(),
    emulateJSON: true
  }).then(response => {
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    return null;
  });
}

/*
 * 查询用户信息
 * 2018年4月16日15:02:32 gk
 * */
export function getuserinfo() {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'currencyController.do?dictionary&types=user&system=&params=',
    data: params,
    headers: UtilsService.getTokenHeader(),
    emulateJSON: true
  }).then(response => {
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    return null;
  });
}

/*
 * 查询医生图片
 * 2018年4月16日15:02:32 gk
 * */
export function gethospic(ChannelHim) {
  let params = {};
  return request({
    method: 'GET',
    // url: UtilsService.LOCALHOSTHim + 'currencyController.do?dictionary&types=user&system=&params=',
    url: ChannelHim + '/HospitalTransfer/imageController.do?queryImageUrl',
    data: params,
    headers: UtilsService.getTokenHeader(),
    emulateJSON: true
  }).then(response => {
    return response;
  }).catch(error => {
    console.error('连接失败', error);
    return null;
  });
}

/*
 * 获取挂号类型
 * 2018年6月20日09:43:06 gk
 * */
export function selectCostType(condition) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'schScheduleTemplateController.do?selectCostType&type=' + condition,
    data: params,
    headers: UtilsService.getTokenHeader(),
    emulateJSON: true
  }).then(response => {
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    return null;
  });
}

/*
 * 获取管道地址
 * 2018年7月17日11:05:45 gk
 * */
export function queryTranUrl() {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'currencyController.do?queryTranUrl&t=' + Date.now(),
    data: params,
    headers: UtilsService.getTokenHeader(),
    emulateJSON: true
  }).then(response => {
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    return null;
  });
}
