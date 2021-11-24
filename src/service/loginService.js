import request from '../utils/request';
import * as UtilsService from '../utils/utilsService';

/*
* 登录接口
* 2018年8月8日09:05:36 gk
* */
export function login(account, password) {
  let params = {
    userName: account,
    passWord: password
  };
  return request.post(
    UtilsService.LOCALHOSTHim + 'loginNewController.do?checkuser',
    JSON.stringify(params),
    {headers: UtilsService.getHeader(), emulateJSON: true}
  ).then(response => {
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    return false;
  });
}
/*
* 密码修改
* 2018年8月8日09:05:45 gk
* */
export function updateUserPassword(account, newpwd, oldpwd) {
  let params = {
    userName: account,
    newpwd: newpwd,
    oldpwd: oldpwd
  };
  return request.post(
    UtilsService.LOCALHOSTHim + 'loginController.do?updateUserPassword',
    JSON.stringify(params),
    {headers: UtilsService.getHeader(), emulateJSON: true}
  ).then(response => {
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    return false;
  });
}

// 退出登录
export function logout() {
  let params = {};
  return request(
    {
      method: 'GET',
      url: UtilsService.LOCALHOSTHim + 'loginNewController.do?logout&t=' + Date.now(),
      data: params,
      headers: UtilsService.getTokenHeader(),
      emulateJSON: true
    }).then(response => {
      return response.data;
    }).catch(error => {
      console.error('连接失败', error);
    });
}
// export function login(mobile, password) {
//   let params = {
//     hosId: 'c8ad630ed995424e8c3f21f843636d76',
//     mobile: mobile,
//     password: password,
//     platformType: UtilsService.getPlatformType(),
//     userId: mobile
//   };
//   return request.post(
//     UtilsService.LOCALHOST + '/udb/api/user/login',
//     JSON.stringify(params),
//     {headers: UtilsService.getHeader(), emulateJSON: true}
//   ).then(response => {
//     if (response.data.data !== null) {
//       response.data.data.mobile = mobile;
//     }
//     return response.data;
//   }).catch(error => {
//     console.error('连接失败', error);
//     let result = {};
//     result.code = 400;
//     result.msg = UtilsService.MESSAGE_CAN_NOT_CONNECT;
//     return result;
//   });
// }

export function loginByMessage(mobile, message) {
  let params = {
    hosId: UtilsService.getHosId(),
    mobile: mobile,
    verifyCode: message,
    platformType: UtilsService.getPlatformType(),
    userId: UtilsService.getOpenId()
  };
  return request.post(
    UtilsService.LOCALHOST + '/udb/api/user/codeLogin',
    JSON.stringify(params),
    {headers: UtilsService.getHeader(), emulateJSON: true}
  ).then(response => {
    if (response.data.data !== null) {
      response.data.data.mobile = mobile;
    }
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    let result = {};
    result.code = 400;
    result.msg = UtilsService.MESSAGE_CAN_NOT_CONNECT;
    return result;
  });
}

export function loginRegByMessage(mobile, message) {
  let params = {
    hosId: 'c8ad630ed995424e8c3f21f843636d76',
    mobile: mobile,
    verifyCode: message,
    platformType: UtilsService.getPlatformType(),
    userId: mobile
  };
  return request.post(
    UtilsService.LOCALHOST + '/udb/api/user/codeRegLogin',
    JSON.stringify(params),
    {headers: UtilsService.getHeader(), emulateJSON: true}
  ).then(response => {
    if (response.data.data !== null) {
      response.data.data.mobile = mobile;
    }
    return response.data;
  }).catch(error => {
    console.error('连接失败', error);
    let result = {};
    result.code = 400;
    result.msg = UtilsService.MESSAGE_CAN_NOT_CONNECT;
    return result;
  });
}

export function checkRegister(mobile) {
  let params = {};
  return request({
    method: 'GET',
    url: UtilsService.LOCALHOST + '/udb/api/user/checkPhone?mobile=' + mobile,
    data: params,
    headers: UtilsService.getHeader(),
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

export function checkCode(codeType, mobile, code) {
  let params = {
    codeType: codeType,
    mobile: mobile,
    verifyCode: code
  };
  return request.post(
    UtilsService.LOCALHOST + '/udb/api/user/verifyMsgCode',
    JSON.stringify(params),
    {headers: UtilsService.getHeader(), emulateJSON: true}
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

export function register(mobile, password, code) {
  let params = {
    hosId: UtilsService.getHosId(),
    mobile: mobile,
    password: password,
    verifyCode: code,
    platformType: UtilsService.getPlatformType()
  };
  return request.post(
    UtilsService.LOCALHOST + '/udb/api/user/registUser',
    JSON.stringify(params),
    {headers: UtilsService.getHeader(), emulateJSON: true}
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

export function modifyPasswd(mobile, password, code) {
  let params = {
    hosId: UtilsService.getHosId(),
    mobile: mobile,
    password: password,
    verifyCode: code,
    platformType: UtilsService.getPlatformType()
  };
  return request.post(
    UtilsService.LOCALHOST + '/udb/api/user/modifyPasswd',
    JSON.stringify(params),
    {headers: UtilsService.getHeader(), emulateJSON: true}
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

export function sendVerifyCode(mobile, codeType) {
  let params = {
    hosId: UtilsService.getHosId(),
    mobile: mobile,
    platformType: UtilsService.getPlatformType(),
    codeType: codeType
  };
  return request.post(
    UtilsService.LOCALHOST + '/udb/api/user/sendVerifyCode',
    JSON.stringify(params),
    {headers: UtilsService.getHeader(), emulateJSON: true}
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
