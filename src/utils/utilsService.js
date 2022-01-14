import * as AppConfig from '../app.config';
export const ALERT_TIME = 2000;
export const MESSAGE_CAN_NOT_CONNECT = '无法连接';
export const LOCALHOST = 'https://api.shunnengnet.com';
export const STATICHim = 'https://ysxhwebsite-ui.shunnengnet.com/#/'; // 前台跳转地址
export const STATIC_LOCALHOST = 'https://static.shunnengnet.com'; // 静态资源域名
export const HOSPITAL_LOGO_PATH = '/ysxhweb/hospitallogo/'; // 分会logo路径
// export const LOCALHOSTHim = 'http://ysxhwebsite.jiankangsn.com/YSXHWebsite/'; // Pre路径
export const LOCALHOSTHim = 'http://127.0.0.1:18080/'; // Pre路径
// export const LOCALHOSTHim = 'http://ysxhwebsite.shunnengnet.com/YSXHWebsite/'; // API路径

export function cleanLocalAll() {
  window.localStorage.clear();
}
// 判断字符串是否为空
export function isStringBlank(str) {
  return (str === null || str === undefined || str === 'null' || str === 'undefined' || str === '');
}
export function setCookie(name, value, domain) {
  document.cookie = name + '=' + escape(value) + ';domain=' + domain;
}
export function getLocalStorageString(name) {
  return window.localStorage.getItem(name);
}
export function setLocalStorageString(name, value) {
  window.localStorage.setItem(name, value);
}
export function getLocalStorageParam(name) {
  if (window.localStorage.getItem(name) === null ||
    window.localStorage.getItem(name) === 'undefined') {
    return null;
  }
  return JSON.parse(window.localStorage.getItem(name));
}
export function setLocalStorageParam(name, value) {
  window.localStorage.setItem(name, JSON.stringify(value));
}
export function getSessionStorage(name) {
  if (window.sessionStorage.getItem(name) === null ||
    window.sessionStorage.getItem(name) === 'undefined') {
    return null;
  }

  return JSON.parse(window.sessionStorage.getItem(name));
}
export function setSessionStorage(name, value) {
  window.sessionStorage.setItem(name, JSON.stringify(value));
}
export function cleanLocalStorage(name) {
  window.localStorage.removeItem(name);
  window.localStorage.removeItem(name + '_time');
}
export function cleanSessionAll() {
  window.sessionStorage.clear();
}
export function cleanSessionStorage(name) {
  window.sessionStorage.removeItem(name);
}
// 获得input date能够解析的标准格式日期字符串
export function formetDateString(date) {
  let days = date.getDate();
  let months = date.getMonth() + 1;
  let years = date.getFullYear();
  return years + '-' + getDoubleDigitString(months) + '-' + getDoubleDigitString(days);
  // var d = new Date(date);
  // youWant = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
}
export function getDoubleDigitString(num) {
  return num >= 10 ? '' + num : '0' + num;
}
/**
 * 2017/3/11 董浩
 * 获取头信息
 */
export function getHeader() {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
}
export function getTokenHeader() {
  return {
    'Content-Type': 'application/json;charset=UTF-8',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
    // 'Authorization': getToken()
    'access_token': getToken()
  };
}
/**
 * 2017/3/13 董浩
 * 获取登录者账号
 */
export function getUserName() {
  if (getSessionStorage('ysxhLoginUser') === null) {
    return '';
  }
  else {
    return getSessionStorage('ysxhLoginUser').userName;
  }
}

/**
 *获取登录着真实名字
 */
export function getRealName() {
  if (getSessionStorage('ysxhLoginUser') === null) {
    return '';
  }
  else {
    return getSessionStorage('ysxhLoginUser').realName;
  }
}
/**
 * 登录者Id
 */
export function getAccountId() {
  if (getSessionStorage('ysxhLoginUser') === null) {
    return '';
  }
  else {
    return getSessionStorage('ysxhLoginUser').id;
  }
}
/**
 * 登录成功token
 */
export function getToken() {
  let ysxhAccessToken = getSessionStorage('ysxhAccessToken');
  if (ysxhAccessToken === null) {
    return '';
  }
  return getSessionStorage('ysxhAccessToken');
}

/**
 * 2017/4/9 耿康
 * 获取医院院区ID
 */
export function getAreaId() {
  return getLocalStorageParam('AllHosAreaSession') ? getLocalStorageParam('AllHosAreaSession')[0].areaId : null;
  // return '1';
}
/**
 * 2017/3/13 董浩
 * 获取医院ID
 */
export function getHosId() {
  return 'SDSL2015';
}
/**
 * 获取医院名称
 */
export function getHosName() {
  if (getLocalStorageParam('selectedhospitalInfoSession') === null) {
    return AppConfig.getConfig().hospitalName;
  }
  return getLocalStorageParam('selectedhospitalInfoSession').hosName;
}
/**
 * 2017/3/22 张智
 * 获取平台类型
 */
export function getPlatformType() {
  // return window.localStorage.getItem('router_TypeSession');
  return '5';
}
/**
 * 2017/3/13 董浩
 * 获取平台或单院
 * 医联山东为1
 * 单院为0
 */
export function getIsPlatform() {
  return '0';
}
/**
 * 2017/3/13 董浩
 * 平台唯一标示
 */
export function getOpenId() {
  return getSessionStorage('ysxhLoginUser').userName;
}
/**
 * 2017/5-17 董浩
 * 格式化星期
 * */
export function formatWeek(week) {
  let array = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return week < 7 ? array[week] : '';
}

/**
 * 2017/5-17 董浩
 * 格式化星期
 * */
export function formatDate(date) {
  let dates = date.split('-');

  return dates[1] + '/' + dates[2];
}

export function formatDay(schDate) {
  return schDate.substr(5, 5);
}
/*
 * 住院、门诊区分
 * 门诊(0)或住院(1)
 * */
export function getsheettype() {
  return '0';
}
/*
 * 住院、门诊区分
 * 门诊(0)或住院(1)
 * */
export function getinsheettype() {
  return '1';
}

export function getDefaultPatient() {
  if (getLocalStorageParam('managepatient_list') !== null && getLocalStorageParam('managepatient_list').length > 0) {
    let defaultpat = getLocalStorageParam('managepatient_list').filter(result => result.defaultState === '1');
    if (defaultpat.length > 0) {
      return defaultpat[0];
    }
    if (defaultpat.length === 0) {
      return getLocalStorageParam('managepatient_list')[0];
    }
  }
  else {
    return null;
  }
}

/**
 * 埋点发送事件
 * */
export function sendClickEvent(event, router, id, title) {
  // 记录埋点
  let param = {
    'id': id,
    'title': title
  };
  btnClickPageView(event, router, param);
}

// 按钮点击埋点共用方法
export function btnClickPageView(event, router, param) {
  let elementId = param.areaId && param.areaId !== '' ? param.id + '-' + param.areaId : param.id;
  if (window.alog) {
    // 触发点击事件埋点，将数据发送存库
    window.alog('click.send', 'click', {
      a: 'ysxhwebsite',
      b: '1',
      c: encodeURI(document.title + ' 点击事件'),
      d: 'pageview',
      e: 'ysxhwebsite',
      f: '_',
      g: encodeURI(document.title),
      h: 'ysxhwebsite',
      i: encodeURI(elementId),
      j: encodeURI(param.title ? param.title : '_'),
      k: router,
      l: '_'
    });
  }
}
