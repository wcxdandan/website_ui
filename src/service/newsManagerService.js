/**
 * Created by dell on 2019/2/14.
 */
import request from '../utils/request';
import * as UtilsService from '../utils/utilsService';
/**
 * 查询所有的新闻类别
 * @returns {Promise.<TResult>}
 */
export function queryNewsType(type) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'newsManageController.do?queryNewsType&type=' + type,
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
// 新闻查询
export function queryNewsByNewsTypeIdAndNewsTitle(newsTypeId, newsTitle) {
  newsTitle = encodeURI(encodeURI(newsTitle));
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'newsManageController.do?queryNewsByNewsTypeIdAndNewsTitle&newsTypeId=' + newsTypeId + '&newsTitle=' + newsTitle + '&date=' + new Date().getTime(),
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
/**
 * 添加新闻
 * @param conditions
 * @returns {Promise.<TResult>}
 */
export function insertNewsInfo(conditions) {
  let params = {
    id: conditions.id,
    newsTitlePreserve: conditions.newsTitle,
    titlePicturePreserve: conditions.titlePicture,
    fileName: conditions.fileName,
    newsTypePreserve: conditions.newsType,
    newsContentPreserve: conditions.content,
    createUserId: conditions.userId,
    updateUserId: conditions.userId,
    newsSourcePreserve: conditions.newsSource,
    newsSourceLinkPreserve: conditions.newsSourceLink,
    isImportantInfoStatusPreserve: conditions.isImportInfo,
    introducePreserve: conditions.introduce,
    isRelease: conditions.isRelease,
    isCarousel: conditions.isCarousel,
    createDate: conditions.createDate
  };
  return request.post(
    UtilsService.LOCALHOSTHim + 'newsManageController.do?insertNews',  // ?insertAssessmentCycle
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
 * 删除新闻
 * @param newsId
 * @returns {Promise.<TResult>}
 */
export function deleteNews(newsId) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'newsManageController.do?deleteNews&newsId=' + newsId,
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
export function releaseNews(newsId) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'newsManageController.do?releaseNewsInfo&newsId=' + newsId,
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
export function findNewsInfoDetailByNewsId(newsId) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'newsManageController.do?findNewsInfoDetailByNewsId&newsId=' + newsId,
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
