/**
 * Created by gk on 2018/4/18.
 */
import request from '../utils/request';
import * as UtilsService from '../utils/utilsService';
/**
 * 点击用户获取角色权限
 * @param condition
 */
export function getRoleOfUser(condition) {
  let params = {};
  let roleId = condition;
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'userController.do?queryUserList&roleId=' + roleId + '&t=' + Date.now(),
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
 * 点击用户获取角色下的用户
 * @param condition
 */
export function getRoleFunction(condition) {
  let params = {};
  let roleId = condition;
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'userController.do?queryRoleFunction&roleId=' + roleId + '&t=' + Date.now(),
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
 * 角色编辑
 * @param condition
 */
export function EditRole(condition) {
  let params = {
    id: condition.id,
    roleName: condition.roleName,
    roleCode: condition.roleCode
  };
  return request.post(
    UtilsService.LOCALHOSTHim + 'roleController.do?updateRole',
    JSON.stringify(params),
    {headers: UtilsService.getTokenHeader(), emulateJSON: true}
  ).then(response => {
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    return null;
  });
}
/*
 * 角色删除
 * 2018年4月19日09:52:18 gk
 * */
export function deleteRole(conditions) {
  let params = {
    id: conditions.id
  };
  return request.put(
    UtilsService.LOCALHOSTHim + 'roleController.do?deleteRole',
    JSON.stringify(params),
    {headers: UtilsService.getTokenHeader(), emulateJSON: true}
  ).then(response => {
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    return null;
  });
}
/*
 * 角色新增
 * 2018年4月18日16:59:24 gk
 * */
export function insertRole(condition) {
  let params = {
    id: condition.id,
    roleName: condition.roleName,
    roleCode: condition.roleCode
  };
  return request.post(
    UtilsService.LOCALHOSTHim + 'roleController.do?insertRole',
    JSON.stringify(params),
    {headers: UtilsService.getTokenHeader(), emulateJSON: true}
  ).then(response => {
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    return null;
  });
}
/**
 * 获取角色管理列表
 * @param condition
 */
export function getRoleList(condition) {
  let params = {};
  let roleName = encodeURI(encodeURI(condition.roleName));
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'roleController.do?queryRoleList&roleName=' + roleName + '&t=' + Date.now(),
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
 * 角色编辑
 * @param condition
 */
export function saveRoleFunction(condition) {
  let params = {
    roleId: condition.roleId,
    selected: condition.selected
  };
  return request.post(
    UtilsService.LOCALHOSTHim + 'userController.do?updateRoleFunction',
    JSON.stringify(params),
    {headers: UtilsService.getTokenHeader(), emulateJSON: true}
  ).then(response => {
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    return null;
  });
}
/*
 * 多数据源删除
 * 2018年4月19日09:52:18 gk
 * */
export function deleteUser(conditions) {
  let params = {
    id: conditions.id,
    userName: conditions.userName
  };
  return request.put(
    UtilsService.LOCALHOSTHim + 'userController.do?deleteUser',
    JSON.stringify(params),
    {headers: UtilsService.getTokenHeader(), emulateJSON: true}
  ).then(response => {
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    return null;
  });
}
/*
 * 用户密码重置
 * 2018年4月18日16:59:24 gk
 * */
export function editUserPs(condition) {
  let params = {
    id: condition.id,
    password: condition.password,
    userName: condition.userName
  };
  return request.post(
    UtilsService.LOCALHOSTHim + 'userController.do?updatePassword',
    JSON.stringify(params),
    {headers: UtilsService.getTokenHeader(), emulateJSON: true}
  ).then(response => {
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    return null;
  });
}
/*
 * 用户新增或修改
 * 2018年4月18日16:59:24 gk
 * */
export function insertUser(condition) {
  let params = {
    id: condition.id,
    userName: condition.userName,
    realName: condition.realName,
    password: condition.possword,
    passwordAgain: condition.passwordAgain,
    userKey: condition.userkey,
    mobilePhone: condition.mobilePhone,
    email: condition.email,
    jobNumber: condition.job_number,
    hosId: condition.hosId,
    roleid: condition.roleCode
  };
  return request.post(
    UtilsService.LOCALHOSTHim + 'userController.do?insertUser',
    JSON.stringify(params),
    {headers: UtilsService.getTokenHeader(), emulateJSON: true}
  ).then(response => {
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    return null;
  });
}
/**
 * 获取角色列表
 */
export function queryUserMessage() {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'userController.do?queryUserRoles&t=' + Date.now(),
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
 * 获取用户角色列表
 */
export function queryUserRole(userId) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'userController.do?queryUserRoles&userId=' + userId + '&t=' + Date.now(),
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
 * 获取用户管理列表
 * @param condition
 */
export function getUserlist(condition) {
  let params = {};
  let userName = encodeURI(encodeURI(condition.userName));
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'userController.do?queryUserList&userName=' + userName + '&t=' + Date.now(),
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
 *获取多数据源list
 *2018年4月8日13:57:34 gk
 * */
export function getDatasourcelist() {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'dynamicDataSourceController.do?queryDataSource&t=' + Date.now(),
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
 * 多数据源根据数据库类型获取driver和url
 * 2018年4月18日16:59:24 gk
 * */
export function getDbParam(value) {
  let params = {
    dbType: value
  };
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'dynamicDataSourceController.do?queryDataSourceParam&dbType=' + value + '&t=' + Date.now(),
    data: params,
    headers: UtilsService.getTokenHeader()
  }).then(response => {
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    return null;
  });
}

/*
* 多数据源测试连接
* 2018年4月18日16:59:24 gk
* */
export function testConnect(condition) {
  let params = {
    dbKey: condition.dbKey,
    dbUser: condition.dbUser,
    dbPassword: condition.dbPassword,
    driverClass: condition.driverClass,
    url: condition.url
  };
  return request.post(
    UtilsService.LOCALHOSTHim + 'dynamicDataSourceController.do?queryConnectState',
    JSON.stringify(params),
    {headers: UtilsService.getTokenHeader(), emulateJSON: true}
  ).then(response => {
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    return null;
  });
}
/*
* 多数据源新增或修改
* 2018年4月18日16:59:24 gk
* */
export function addOrUpdateDatasource(condition) {
  let params = {
    id: condition.id,
    description: condition.description,
    dbName: condition.dbName,
    dbType: condition.dbType,
    dbKey: condition.dbKey,
    dbUser: condition.dbUser,
    dbPassword: condition.dbPassword,
    driverClass: condition.driverClass,
    url: condition.url
  };
  return request.post(
    UtilsService.LOCALHOSTHim + 'dynamicDataSourceController.do?insertOrUpdate',
    JSON.stringify(params),
    {headers: UtilsService.getTokenHeader(), emulateJSON: true}
  ).then(response => {
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    return null;
  });
}

/*
* 多数据源删除
* 2018年4月19日09:52:18 gk
* */
export function deleteDatasorce(conditions) {
  let params = {
    jobGroup: conditions.jobGroup,
    jobName: conditions.jobName
  };
  return request.post(
    UtilsService.LOCALHOSTHim + 'dynamicDataSourceController.do?delete',
    JSON.stringify(params),
    {headers: UtilsService.getTokenHeader(), emulateJSON: true}
  ).then(response => {
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    return null;
  });
}

/*
 *获取字典分类list
 *2018年4月8日13:57:34 gk
 * */
export function getDicttypelist(conditions) {
  let params = {};
  let typegroupname = encodeURI(encodeURI(conditions.typegroupname));
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'systemController.do?queryTypeGroupList&typegroupcode=' + conditions.typegroupcode + '&typegroupname=' + typegroupname + '&t=' + Date.now(),
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
 *获取多数据源list
 *2018年4月8日13:57:34 gk
 * */
export function getDictdetaillist(id) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'systemController.do?queryTypeGrid&typegroupid=' + id + '&t=' + Date.now(),
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
 * 字典分类新增或修改
 * 2018年4月18日16:59:24 gk
 * */
export function addOrUpdateDictgroup(condition) {
  let params = {
    typegroupcode: condition.typegroupcode,
    id: condition.id,
    createDate: condition.createDate,
    createName: condition.createName,
    typegroupname: condition.typegroupname
  };
  return request.post(
    UtilsService.LOCALHOSTHim + 'systemController.do?insertTypeGroup',
    JSON.stringify(params),
    {headers: UtilsService.getTokenHeader(), emulateJSON: true}
  ).then(response => {
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    return null;
  });
}

/*
 * 字典分类删除
 * 2018年4月19日09:52:18 gk
 * */
export function deleteDictgroup(id) {
  return request.post(
    UtilsService.LOCALHOSTHim + 'systemController.do?deleteTypeGroup&id=' + id,
    JSON.stringify(null),
    {headers: UtilsService.getTokenHeader(), emulateJSON: true}
  ).then(response => {
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    return null;
  });
}

/*
 * 字典分类删除
 * 2018年4月19日09:52:18 gk
 * */
export function deleteDictdetail(id) {
  return request.post(
    UtilsService.LOCALHOSTHim + 'systemController.do?deleteType&id=' + id,
    JSON.stringify(null),
    {headers: UtilsService.getTokenHeader(), emulateJSON: true}
  ).then(response => {
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    return null;
  });
}

/*
 * 字典分类新增或修改
 * 2018年4月18日16:59:24 gk
 * */
export function addOrUpdateDictdetail(condition) {
  let params = {
    typecode: condition.typecode,
    id: condition.id,
    createDate: condition.createDate,
    createName: condition.createName,
    typegroupid: condition.typegroupid,
    typename: condition.typename
  };
  return request.post(
    UtilsService.LOCALHOSTHim + 'systemController.do?insertType',
    JSON.stringify(params),
    {headers: UtilsService.getTokenHeader(), emulateJSON: true}
  ).then(response => {
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    return null;
  });
}
/*
 *获取字典分类list
 *2018年4月8日13:57:34 gk
 * */
export function getFunctionlist(pid) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'functionController.do?queryFunction&id=' + pid + '&t=' + Date.now(),
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
 *获取字典分类list
 *2018年4月8日13:57:34 gk
 * */
export function getFunctionData() {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOSTHim + 'functionController.do?queryFunctionData&t=' + Date.now(),
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
 * 字典分类新增或修改
 * 2018年4月18日16:59:24 gk
 * */
export function insertOrUpdateFunction(condition) {
  let params = {
    functionOrder: condition.functionOrder,
    id: condition.id,
    parentfunctionid: condition.parentfunctionid,
    functionUrl: condition.functionUrl,
    functionIconStyle: condition.functionIconStyle,
    functionName: condition.functionName
  };
  return request.post(
    UtilsService.LOCALHOSTHim + 'functionController.do?insertOrUpdate',
    JSON.stringify(params),
    {headers: UtilsService.getTokenHeader(), emulateJSON: true}
  ).then(response => {
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    return null;
  });
}
/*
 * 字典分类删除
 * 2018年4月19日09:52:18 gk
 * */
export function deletefunction(id) {
  return request.post(
    UtilsService.LOCALHOSTHim + 'functionController.do?delete&id=' + id,
    JSON.stringify(null),
    {headers: UtilsService.getTokenHeader(), emulateJSON: true}
  ).then(response => {
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    return null;
  });
}
