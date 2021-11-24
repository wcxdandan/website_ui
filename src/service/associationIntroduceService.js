/**
 * Created by LMY on 2019/2/20.
 */
import request from '../utils/request';
import * as UtilsService from '../utils/utilsService';
/*
* 获取协会介绍数据
*
* */
export function associationIntroduce(typeCode) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'associationIntroduceController.do?queryAssociationInfoByCategory&typeCode=' + typeCode,
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
*获取十佳医师数据
**/
export function tenDoctor(type, numberType) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'homePageController.do?querySJYSInfoByType&type=' + type + '&numberType=' + numberType,
    data: params,
    headers: UtilsService.getTokenHeader(),
    emulateJSON: true
  }).then(result => {
    return result.data;
  }).catch(error => {
    console.error('连接失败', error);
    return null;
  });
}
/*
 *获取十佳医师数据
 *
 **/
export function tenDoctorSelect(type, numberType, title) {
  title = encodeURI(encodeURI(title));
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'homePageController.do?querySJYSInfoByTypeAndTitle&type=' + type + '&numberType=' + numberType + '&title=' + title + '&date=' + new Date().getTime(),
    data: params,
    headers: UtilsService.getTokenHeader(),
    emulateJSON: true
  }).then(result => {
    return result.data;
  }).catch(error => {
    console.error('连接失败', error);
    return null;
  });
}

export function homePage(id) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'homePageController.do?querySJYSDetailById&id=' + id,
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
// 协会管理
export function queryAssociationByAssociationTypeAndTitle(associationType, title) {
  title = encodeURI(encodeURI(title));
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'associationIntroduceController.do?queryAssociationByAssociationTypeAndTitle&associationType=' + associationType + '&title=' + title + '&date=' + new Date().getTime(),
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
 * 获得十佳医师分类数据
 **/
export function queryDoctorTypeList(type, category) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'homePageController.do?queryDoctorTypeList&doctorType=' + type + '&categoryType=' + category,
    headers: UtilsService.getTokenHeader(),
    data: params,
    emulateJSON: true
  }).then(response => {
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    let result = {};
    result.code = 400;
    result.msg = UtilsService.MESSAGE_CAN_NOT_CONNECT;
    return result;
  });
}
export function deleteDoctors(id) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'homePageController.do?delectSJYSDetailById&id=' + id,
    headers: UtilsService.getTokenHeader(),
    data: params,
    emulateJSON: true
  }).then(response => {
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    let result = {};
    result.code = 400;
    result.msg = UtilsService.MESSAGE_CAN_NOT_CONNECT;
    return result;
  });
}
export function saveDoctorInfo(conditions) {
  let params = {
    id: conditions.id,
    newsTitle: conditions.newTitle,
    type: conditions.type,
    titlePicture: conditions.titlePic, // 视频图片
    category: conditions.categoryType,
    newsContent: conditions.content,
    introduce: conditions.introuce,
    createDate: new Date(conditions.createDate).getTime() / 1000
  };
  return request.post(
    UtilsService.LOCALHOSTHim + 'homePageController.do?addDoctorInfo',  // ?insertAssessmentCycle
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

export function publicDoctorInfo(conditions) {
  let params = {
    id: conditions.id,
    newsTitle: conditions.newTitle,
    type: conditions.type,
    titlePicture: conditions.titlePic, // 视频图片
    category: conditions.categoryType,
    newsContent: conditions.content,
    introduce: conditions.introuce,
    createDate: new Date(conditions.createDate).getTime() / 1000
  };
  return request.post(
    UtilsService.LOCALHOSTHim + 'homePageController.do?publishVideoInfo',  // ?insertAssessmentCycle
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
export function release(index) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'homePageController.do?releaseInfo&doctorId=' + index,
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
export function queryAssociationCategory(associationType) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'associationIntroduceController.do?queryAssociationCategory&associationType=' + associationType,
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
 * 查询主任委员全部信息
 * @param associationType
 */
export function queryAssociationCommittee() {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'associationIntroduceController.do?queryAssociationCommittee',
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
 * 添加协会信息
 * @param conditions
 * @returns {Promise.<TResult>}
 */
export function insertAssociation(conditions) {
  let params = {
    id: conditions.id,
    titlePreserve: conditions.title,
    typePreserve: conditions.type,
    categoryPreserve: conditions.category,
    contentPreserve: conditions.content,
    createUserId: conditions.userId,
    updateUserId: conditions.userId,
    titlePicturePreserve: conditions.titlePicture,
    isRelease: conditions.isRelease
  };
  return request.post(
    UtilsService.LOCALHOSTHim + 'associationIntroduceController.do?insertAssociation',  // ?insertAssessmentCycle
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
 * 发布协会信息
 * @param id
 * @returns {Promise.<TResult>}
 */
export function releaseInfo(id) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'associationIntroduceController.do?releaseInfo&id=' + id,
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
export function deleteAssociation(id) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'associationIntroduceController.do?deleteAssociation&id=' + id,
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
export function selectCategory() {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'associationIntroduceController.do?selectCategory',
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
export function addaddBrowseNumer(name) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'associationIntroduceController.do?addaddBrowseNumer&name=' + name,
    data: params,
    headers: UtilsService.getTokenHeader(),
    emulateJSON: true
  });
}

