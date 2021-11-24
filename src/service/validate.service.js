/**
 * 2017/2/24 董浩
 * 共用数据验证类
 */

/**
 * 2017/4/8 苗洪超
 * 验证输入金额 为小数点后两位 或者是整数
 * 注意; 静态方法需要写到实例方法前面
 */
export function moneyInputValidate(money) {
  let moneyReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
  return moneyReg.test(money);
}

/**
 * 2017/2/24 董浩
 * 手机号码格式验证
 */
export function phoneValidate(phone) {
  let phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/; // 手机号验证正则表达式

  return phone !== '' && phoneReg.test(phone);
}

/**
 * 2017/2/24 董浩
 * 密码格式验证
 */
export function passwordValidate(password) {
  let passwordReg = /^[\d0-9a-zA-Z~!@#$%^&*()_+]{6,20}$/; // 密码验证正则表达式

  return password !== '' && passwordReg.test(password);
}

