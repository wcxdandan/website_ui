import axios from 'axios';
import * as UtilsService from './utilsService';

// 创建axios实例
const service = axios.create({
  baseURL: UtilsService.LOCALHOSTHim,
  headers: {
    /* 一些公用的 header */
  },
  // transformRequest: [function(data, header) {
  //   /* 自定义请求参数解析方式（如果必要的话） */
  // }],
  paramsSerializer: function(params) {
    /* 自定义链接参数解析方式（如果必要的话） */
  }
});

// request拦截器
service.interceptors.request.use((config) => {
  return config;
});

service.defaults.retry = 5;
service.defaults.retryDelay = 1000;
service.interceptors.response.use((result) => {
  if ((result.data && result.data.code === '304') || result.code === '304') {
    window.location.href = UtilsService.STATICHim + 'login'; // 登录token失效后跳转到登录页面
  }
  return result;
}
// }, function axiosRetryInterceptor(err) {
//   let config = err.config;
//   if (err.response) {
//     console.error('response:' + err.response.status);
//     if (err.response.status === 403) {
//       window.location.href = 'http://static.shunnengnet.com/error/frequency.html';
//     }
//   }
//   if (err.request) {
//     console.error('request:' + err.request.status);
//     if (err.request.status === 0 || err.request.status === 401) {
//       // 如果token过期则重新获取token
//       loginService.refreshToken().then(result => {
//         if (result.status === 200) {
//           // 更新token
//           UtilsService.setLocalStoragePlatformParam('loginUser', JSON.parse(result.bodyText));
//           UtilsService.setLocalStoragePlatformParam('loginTime', new Date().getTime());
//           config.headers = UtilsService.getTokenHeader();
//         }
//       });
//     }
//   }
//
//   // If config does not exist or the retry option is not set, reject
//   if (!config || !config.retry) {
//     return Promise.reject(err);
//   }
//
//   // Set the variable for keeping track of the retry count
//   config.__retryCount = config.__retryCount || 0;
//
//   // Check if we've maxed out the total number of retries
//   if (config.__retryCount >= config.retry) {
//     // Reject with the error
//     return Promise.reject(err);
//   }
//
//   // Increase the retry count
//   config.__retryCount += 1;
//
//   // Create new promise to handle exponential backoff
//   let backoff = new Promise(function(resolve) {
//     setTimeout(function() {
//       resolve();
//     }, config.retryDelay || 1000);
//   });
//
//   // Return the promise in which recalls axios to retry the request
//   return backoff.then(function() {
//     return axios(config);
//   });
// }
);
export default service;
