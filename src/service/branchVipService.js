/**
 * Created by dell on 2019/3/9.
 */
import request from '../utils/request';
import * as UtilsService from '../utils/utilsService';
/**
 * 根据type和title查询信息
 * @param typeCode
 * @param title
 * @returns {Promise.<TResult>}
 */
export function queryBranchVipInfoByTypeAndTitle(typeCode, title) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'branchVipController.do?queryBranchVipInfoByTypeAndTitle&type=' + typeCode + '&title=' + title + '&date=' + new Date().getTime(),
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
export function deleteInfo(id) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'branchVipController.do?deleteInfo&id=' + id,
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
 * 发布
 * @param id
 * @returns {Promise.<TResult>}
 */
export function releaseInfo(id) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'branchVipController.do?releaseInfo&id=' + id,
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
 * 添加信息
 * @param conditions
 * @returns {Promise.<TResult>}
 */
export function insertBranchVip(fhType, conditions) {
  let params = {
    id: conditions.id,
    titlePreserve: conditions.title,
    typePreserve: conditions.category,
    contentPreserve: conditions.content,
    createUserId: conditions.userId,
    updateUserId: conditions.userId,
    imgSrcPreserve: conditions.titlePicture,
    linkUrlPreserve: conditions.linkUrl,
    isRelease: conditions.isRelease
  };
  return request.post(
    UtilsService.LOCALHOSTHim + 'branchVipController.do?insertBranchVipInfo&fhType=' + fhType,  // ?insertAssessmentCycle
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
 * 根据type查询信息
 * @param id
 * @returns {Promise.<TResult>}
 */
export function queryBranchVipInfoTypeId(id) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'branchVipController.do?queryBranchVipInfoTypeId&typeId=' + id,
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
