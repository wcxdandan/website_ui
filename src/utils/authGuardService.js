/**
 * 路由Guard
 */
import * as UtilsService from './utilsService';
/**
 * 路由Guard
 * @param to 即将要进入的目标路由的 路由信息对象
 * @param from 即将要离开的目标路由的 路由信息对象
 * @param next 控制路由的导航
 */
// export function canActivate(to, from, next) {
//   let loginUser = UtilsService.getSessionStorage('loginUser');
//
//   if (from.path !== '/') {
//     UtilsService.setLocalStorageString('lastPath', from.path);  // from.path: 路由的path，如 "/home"
//   }
//
//   if (loginUser !== null) {
//     next();
//   }
//   else {
//     // 需要重新的登录
//     next('/login');
//   }
// }

/**
 * 路由拦截
 * @param to 即将要进入的目标路由的 路由信息对象
 * @param from 即将要离开的目标路由的 路由信息对象
 * @param next 控制路由的导航
 */
export function routeFilter(to, from, next) {
  // next();
  // // console.log(to.path);
  // let menuenewarray = [];
  // if (UtilsService.getSessionStorage('ysxhMenuData') !== null) { // 获取登录后返回的菜单
  //   menuenewarray = UtilsService.getSessionStorage('ysxhMenuData').filter(data => data.main !== '');
  //   for (let i = 0; i < menuenewarray.length; i++) {
  //     // console.log(menuenewarray[i].detailes.filter(data => data.detailurl === '/baseinfomation/approvallist'));
  //     // console.log(menuenewarray[i].detailes.filter(data => data.detailurl === to.path));
  //     if (menuenewarray[i].detailes.filter(data => data.detailurl === to.path).length > 0) {
  //       next();
  //     }
  //   }
  // }
  let loginUser = UtilsService.getSessionStorage('ysxhLoginUser');
  if (from.path !== '/') {
    UtilsService.setLocalStorageString('lastPath', from.path);  // from.path: 路由的path，如 "/home"
  }

  if (loginUser !== null) {
    next();
  }
  else {
    // 需要重新的登录
    next('/login');
  }
}
