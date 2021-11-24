import request from '../utils/request';
import * as UtilsService from '../utils/utilsService';

/**
 * 党建信息查询
 * @param conditions
 * @returns {Promise.<TResult>}
 */
export function queryCommunistByTypeAndTitle(type, topType, title) {
  title = encodeURI(encodeURI(title));
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'partyBuildingController.do?queryPartyBuildingByTypeAndTitle&type=' + type + '&topType=' + topType + '&title=' + title,
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
 * 添加党建信息
 * @param conditions
 * @returns {Promise.<TResult>}
 */
export function insertCommunist(conditions) {
  let params = {
    id: conditions.id,
    newTitlePreserve: conditions.newsTitle,
    typePreserve: conditions.newsType,
    newsContentPreserve: conditions.content,
    createUserId: conditions.userId,
    updateUserId: conditions.userId,
    isRelease: conditions.isRelease,
    isCarousel: conditions.isCarousel,
    titlePicture: conditions.titlePicture,
    createDate: new Date(conditions.createDate).getTime() / 1000
  };
  return request.post(
    UtilsService.LOCALHOSTHim + 'partyBuildingController.do?insertPartyBuilding',  // ?insertAssessmentCycle
    JSON.stringify(params),
    {headers: UtilsService.getTokenHeader(), emulateJSON: true},
  ).then(response => {
    console.log(response.data);
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
 * 删除党建信息
 * @param conditions
 * @returns {Promise.<TResult>}
 */
export function deleteCommunistInfo(id) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'partyBuildingController.do?deletePartyBuilding&id=' + id,
    data: params,
    headers: UtilsService.getTokenHeader(),
    emulateJSON: true
  }).then(response => {
    return response.data;
    // console.log(response.data);
    // console.log(response.data);
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
    url: UtilsService.LOCALHOSTHim + 'partyBuildingController.do?releaseInfo&id=' + id,
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
 * 编辑党建信息
 * @param id
 * @returns {Promise.<TResult>}
 */
export function findCommunistInfoDetailByNewsId(newsId) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'partyBuildingController.do?queryPartyBuildingById&id=' + newsId,
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
