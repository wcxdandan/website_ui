/**
 * Created by dell on 2019/3/11.
 */
import request from '../utils/request';
import * as UtilsService from '../utils/utilsService';

/**
 * 根据type和title查询信息 对口支援查询
 * @param type
 * @param title
 * @returns {Promise.<TResult>}
 */
export function queryCounterpartSupportByTypeAndTitle(type, title) {
  title = encodeURI(encodeURI(title));
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'counterpartSupportController.do?queryCounterpartSupportByTypeAndTitle&type=' + type + '&title=' + title + '&date=' + new Date().getTime(),
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
/**
 * 删除信息
 * @param id
 * @returns {Promise.<TResult>}
 */
export function deleteCounterpartSupportInfo(id) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'counterpartSupportController.do?deleteCounterpartSupport&id=' + id,
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
/**
 * 发布信息
 * @param id
 * @returns {Promise.<TResult>}
 */
export function releaseInfo(id) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'counterpartSupportController.do?releaseInfo&id=' + id,
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
/**
 * 添加对口支援信息
 * @param conditions
 * @returns {Promise.<TResult>}
 */
export function insertCounterpartSupport(conditions) {
  let params = {
    id: conditions.id,
    newTitlePreserve: conditions.title,
    typePreserve: conditions.type,
    newsContentPreserve: conditions.content,
    createUserId: conditions.userId,
    updateUserId: conditions.userId,
    isRelease: conditions.isRelease,
    createDate: new Date(conditions.createDate).getTime() / 1000
  };
  return request.post(
    UtilsService.LOCALHOSTHim + 'counterpartSupportController.do?insertCounterpartSupport',  // ?insertAssessmentCycle
    JSON.stringify(params),
    {headers: UtilsService.getTokenHeader(), emulateJSON: true},
  ).then(response => {
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    let result = {};
    result.code = 400;
    result.msg = UtilsService.MESSAGE_CAN_NOT_CONNECT;
    return result;
  });
}
/**
 * 根据id查询详情
 * @param id
 * @returns {Promise.<TResult>}
 */
export function queryCounterpartSupportById(id) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'counterpartSupportController.do?queryCounterpartSupportById&id=' + id,
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
