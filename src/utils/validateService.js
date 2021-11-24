// 验证输入金额 为小数点后两位 或者是整数
export function moneyInputValidate(money) {
  let moneyReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
  return moneyReg.test(money);
}

// 密码登录复杂性校验
export function passwordsValidate(password) {
  let phoneReg = new RegExp(/(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,30}/);
  return password !== '' && phoneReg.test(password);
}

// 手机号码格式验证
export function phoneValidate(phone) {
  let phoneReg = new RegExp(/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/);
  return phone !== '' && phoneReg.test(phone);
}

// 邮箱格式验证
export function emailValidate(email) {
  let phoneReg = new RegExp(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/);
  return email !== '' && phoneReg.test(email);
}

// 密码格式验证
export function passwordValidate(password) {
  // let passwordReg = /^\S{6,20}$/; // 密码验证正则表达式
  //  let passwordReg = /^[a-zA-Z0-9]{6,10}$/;
  let passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z!@#$%^&*]{8,16}$/;
  return password !== '' && passwordReg.test(password);
}
// 姓名是否为汉字的验证
export function nameValidate(name) {
  var nameReg = new RegExp('^([\u4E00-\uFA29])*$');
  return name !== '' && nameReg.test(name);
}
/* istanbul ignore next */
export function trim(string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};
// 验证大小写
export function upper(string) {
  let codeReg = new RegExp(/^[A-Z]+$/);
  return codeReg.test(string);
}
