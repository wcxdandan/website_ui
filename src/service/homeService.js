import request from '../utils/request';
import * as UtilsService from '../utils/utilsService';

export function getParty(newsType, topType, newsTitle) { // 党建查询
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'partyBuildingController.do?queryPartyBuildingByTypeAndTitle&type=' + newsType + '&topType=' + topType + '&title=' + newsTitle,
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
export function getPartyPage(id) { // 根据id查党建
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'partyBuildingController.do?queryPartyBuildingById&id=' + id,
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
export function queryWebsiteHome() {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'homePageController.do?queryHomePageList',
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
export function querAllTitle(title) {
  let params = {};
  title = encodeURI(encodeURI(title));
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'homePageController.do?querAllTitle&title=' + title,
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
export function detailedInformation(itemId) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'homePageController.do?queryHomePageInfo&itemId=' + itemId,
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
export function openMore(newsType) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'newsManageController.do?queryNewsListByNewsType&newsType=' + newsType,
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
export function queryVideoType(videoType) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'videoCenterController.do?queryVideoList&videoType=' + videoType,
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
// 视频中心
export function queryVideoTypEAndTitle(videoType, videoTitle) {
  videoTitle = encodeURI(encodeURI(videoTitle));
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'videoCenterController.do?queryVideo&videoType=' + videoType + '&videoTitle=' + videoTitle + '&date=' + new Date().getTime(),
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
export function queryVideoById(videoId) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'videoCenterController.do?queryVideoById&videoId=' + videoId,
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
export function saveVideoInfo(conditions) {
  let params = {
    id: conditions.id,
    title: conditions.videoTitle,
    type: conditions.type,
    videoLink: conditions.videoLink,
    titlePic: conditions.titlePic, // 视频图片
    content: conditions.content,
    introduce: conditions.introduce,
    createDate: new Date(conditions.createDate).getTime() / 1000
  };
  return request.post(
    UtilsService.LOCALHOSTHim + 'videoCenterController.do?addVideoInfo',  // ?insertAssessmentCycle
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
export function publishVideoInfo(conditions) {
  let params = {
    id: conditions.id,
    title: conditions.videoTitle,
    type: conditions.type,
    videoLink: conditions.videoLink,
    titlePic: conditions.titlePic, // 视频图片
    content: conditions.content,
    introduce: conditions.introduce,
    createDate: new Date(conditions.createDate).getTime() / 1000
  };
  return request.post(
    UtilsService.LOCALHOSTHim + 'videoCenterController.do?publishVideoInfo',  // ?insertAssessmentCycle
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
export function queryScrollPic() { // 首页轮播图
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'homePageController.do?queryScrollPic',
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
export function queryScrollPicPartyBuiding() { // 党建轮播图
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'partyBuildingController.do?queryScrollPicPartyBuiding',
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
export function queryScrollPicYsdk() { // 医师定考轮播图
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'partyBuildingController.do?queryScrollPicYsdk',
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
export function queryScrollPicDSJ() { // 第三届会议
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'homePageController.do?queryScrollDSJ',
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
export function queryBranchAndVip(type) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'homePageController.do?queryBranchAndVip&type=' + type,
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
export function queryBranchAndVipList(typeId) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'homePageController.do?queryBranchAndVipList&typeId=' + typeId,
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
export function queryCommittee(typeId) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'homePageController.do?queryCommittee&typeId=' + typeId,
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
export function queryBranchAndVipDetailById(id) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'homePageController.do?queryBranchAndVipDetailById&id=' + id,
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
export function getDKZY(type) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'homePageController.do?queryDKZYList&type=' + type,
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
 * 查询所有的视频类别
 * @returns {Promise.<TResult>}
 */
export function queryVideoTypeList(type) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'videoCenterController.do?queryVideoTypeList&videoType=' + type,
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
export function deleteNews(videoId) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'videoCenterController.do?deleteVideo&videoId=' + videoId,
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
export function browseVideo(videoId) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'videoCenterController.do?browseVideo&videoId=' + videoId,
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
export function release(index) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'videoCenterController.do?releaseInfo&id=' + index,
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
export function addBrowseNumer(id) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'branchVipController.do?addBrowseNumer&id=' + id,
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
