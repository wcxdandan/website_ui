/**
 * Created by dell on 2019/1/25.
 */
import request from '../utils/request';
import * as UtilsService from '../utils/utilsService';
/**
 * 查询列表详情
 * @param itemId
 * @returns {Promise.<TResult>}
 */
export function queryHomePageInfo(itemId) {
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
