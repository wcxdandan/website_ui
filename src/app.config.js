import * as UtilsService from './utils/utilsService';
/**
 * 2017/4/7 张智
 * 医院配置信息
 */

export function getConfig() {
  return getHospitalConfig(UtilsService.getLocalStorageString('hosAbbreviationSession'));
}

export function getHospitalConfig(hosId) {
  let config = new Config();

  if (hosId === 'c8ad630ed995424e8c3f21f843636d76') {
    config.hosId = 'c8ad630ed995424e8c3f21f843636d76';
    config.hospitalName = '莱芜市人民医院';
    config.hosLogo = 'http://static.shunnengnet.com/lwrm/img/lwrmLogo.jpg';
    config.hosLogoName = 'http://static.shunnengnet.com/lwrm/img/hosLogo.png';
    config.officiaWebsitel = 'http://www.lwsyy.com';
    config.hosCardHas = true;
    config.hosareastate = false; // 是否区分院区
    config.isRegister = true; // 开通当日挂号
    config.isOnlineRecharge = true; // 开通充值卡
    config.isRegisterIsDopay = true; // 当日挂号立即支付挂号费
    config.isAppointment = true; // 开通预约挂号
    config.isAppointmentIsDopay = true; // 预约挂号立即支付挂号费
    config.isReportQuery = true; // 开通报告查询
    config.isPaymentRecord = true; // 开通费用查询
    // config.isWaitingQueue = true; // 开通候诊队列
    config.isCardManage = true; // 开通就诊卡管理
    config.isCardAppintment = true; // 必须有卡预约
    config.searchstate = true; // 查询显示判断
    config.isDeptSchedule = true; // 有科室排班
    config.isScheduleTimeSumNo = true; // 有号源总数
    config.isAutomaticDeduction = true; // 预约自动扣费
    config.hosinCardNoState = true; // 住院卡
    config.isLWYY = true; // 无卡时特殊处理
  }
  else if (hosId === 'fe58965b1fef4c748dc4b9842f4a0a77') {
    config.hosId = 'fe58965b1fef4c748dc4b9842f4a0a77';
    config.hospitalName = '曲阜市人民医院';
    config.officiaWebsitel = 'http://www.qfsrmyy.com/';
    config.hosLogo = 'http://static.shunnengnet.com/qfrm/image/qfsrmyy.jpg';
    config.hosLogoName = 'http://static.shunnengnet.com/qfrm/doc/image/qfsrmBanner.png';
    config.isAppointment = true; // 开通预约挂号
    config.isReportQuery = true; // 开通报告查询
    config.isPaymentRecord = true; // 开通费用查询
    config.isCardManage = true; // 开通就诊卡管理
    config.searchstate = true; // 查询显示判断
    config.isCardAppintment = true; // 必须有卡预约
    config.isRegister = true; // 开通当日挂号
    config.isOnlineRecharge = true; // 开通充值卡
    config.hosareastate = false; // 是否区分院区
    config.platformTypeMethods = new PlatformTypeMethods().WeChatOrAlipay; // 支持微信与支付宝支付
    config.isImeRecharge = true;
    config.shebaoNoState = true; // 社保卡
    config.isTimeLimitDoPayForRegisterRecord = true; // 挂号记录中支持限时支付功能
    config.isDoPayForPatientCard = true; // 立即支付功能使用就诊卡支付
    config.QFCardKindOnly = false; // 卡类型控件曲阜只显示一种卡类型
    config.QFYYcardinfo = true; // 曲阜医院绑卡特别提醒
    config.hosSBCardNoState = true; // 曲阜开通社保卡
    config.isCancelAppointment = false; // 不支持取消预约功能
    config.registerStateZH1 = '未支付'; // 状态为已预约的中文显示未支付
    config.registerStateZH2 = '已预约'; // 状态为已挂号的中文显示已预约
    config.isRechargeQuery = true;  // 开通充值查询
    config.isQF = true; // 曲阜医院特殊处理标识
    config.TwoCardKinds = true; // 绑卡页面正常卡类型，有两种卡的情况
    config.moneyUnit = '元'; // 金钱单位
    config.cancelBtnTitle = '返回'; // 取消按钮显示文字
  }
  else if (hosId === 'b909a19d04ee48f2b4be323d00dc8888') {
    config.hosId = 'b909a19d04ee48f2b4be323d00dc8888';
    config.hospitalName = '滨州医学院附属医院';
    config.hosLogo = 'http://static.shunnengnet.com/byfy/img/byfyLogo.jpg';
    config.hosLogoName = 'http://static.shunnengnet.com/byfy/img/byfyPCLoge.png';
    config.officiaWebsitel = 'http://www.byfy.cn';
    config.hosareastate = false; // 是否区分院区
    config.isRegister = true; // 开通当日挂号
    config.isOnlineRecharge = true; // 开通充值卡
    config.isRegisterIsDopay = true; // 当日挂号立即支付挂号费
    config.isAppointment = true; // 开通预约挂号
    config.isReportQuery = true; // 开通报告查询
    config.isPaymentRecord = true; // 开通费用查询
    // config.isWaitingQueue = true; // 开通候诊队列
    config.isCardManage = true; // 开通就诊卡管理
    config.isCardAppintment = true; // 必须有卡预约
    config.searchstate = true; // 查询显示判断
    config.isDeptSchedule = true; // 有科室排班
    config.isScheduleTimeSumNo = true; // 有号源总数
    config.isAutomaticDeduction = true; // 预约自动扣费
    config.hosinCardNoState = true; // 住院卡
    config.TwoCardKinds = true; // 绑卡页面正常卡类型，有两种卡的情况
    config.isBYF = true; // 滨医附医院特殊处理标识
    config.isShowCost = false; // 不显示诊疗费
    config.isCodeLogin = true; // 动态码登录
  }
  else if (hosId === 'fc8e5782114740c68b1fd6f8cfe986cf') {
    config.hosId = 'fc8e5782114740c68b1fd6f8cfe986cf';
    config.hospitalName = '泰安市妇幼保健院';
    config.hosLogo = 'http://static.shunnengnet.com/tafy/image/logo.png';
    config.hosLogoName = 'http://static.shunnengnet.com/tafy/image/title.jpg';
    config.officiaWebsitel = 'http://www.tafybjy.com';
    config.isReportQuery = true; // 开通报告查询
    config.isAppointment = true; // 开通预约挂号
    config.isPaymentRecord = true; // 开通费用查询
    config.isCardManage = true; // 开通就诊卡管理
    config.searchstate = true; // 查询显示判断
    config.hosareastate = false; // 是否区分院区
    config.hosinCardNoState = true; // 医院启用住院卡
    config.isPhysicalUse = true; // 体检查询
    config.isRegister = true; // 开通当日挂号
    config.TwoCardKinds = true; // 绑卡页面正常卡类型，有两种卡的情况
    config.isOnlineRecharge = true; // 开通充值卡
    config.scanQrCodeParam = true;
    config.hasChild = true; // 儿童就诊人
    config.isShowCost = false; // 不显示诊疗费
    config.IDCardCanrepeat = true; // 泰安妇幼允许一张身份证绑定多个就诊人
    config.phyInReport = true; // 泰安妇幼体检查询再报告查询里面
  }
  else if (hosId === 'TAZX-8ab-89b8-4590-bf83-37737b3041a5') {
    config.hosId = 'TAZX-8ab-89b8-4590-bf83-37737b3041a5';
    config.hospitalName = '泰安中心医院';
    config.hosLogo = 'http://static.shunnengnet.com/byfy/img/byfyLogo.jpg';
    config.hosLogoName = 'http://static.shunnengnet.com/tazxyy/image/taianzhongxin-logo.png';
    config.officiaWebsitel = '/static/html/TAZXmiddlerouter.html';
    config.isAppointment = true; // 开通预约挂号
    config.hosCardHas = true; // 医院就诊卡个性需求
    config.hosinCardNoState = true; // 有住院卡
    config.hosvalidatecode = false; // 不启用验证码
    config.isCardManage = true; // 开通就诊卡管理
    config.isTimeLimitDoPayForRegisterRecord = true; // 支持限时支付功能
    config.isDoPayForPatientCard = true; // 立即支付功能使用就诊卡支付
    config.outcardmsname = '就诊卡';
    config.cancelAppointmentLastTerm = Date.today().addDays(1).toString('yyyy-MM-dd'); // 取消预约最后期限（预约日期的前一天，预约日期当日不能取消）
    config.rechargeTimeStart = '01:30'; // 允许充值起始时间
    config.rechargeTimeEnd = '22:30'; // 允许充值结束时间
    config.isCostHaveTwoPart = true; // 挂号费分为两部分
    config.isLWYY = true; // 无卡时特殊处理
    config.queryDateRange = 'previousYear';   // 只允许查询过去一年的数据
    config.paymentinList = true; // 住院费用查询的功能开启
    config.paymentinDate = true; // 住院费用查询详情明细显示日期
    config.scanQrCodeParam = true;
  }

  return config;
}

export class Config {
  constructor() {
    // 开放权限
    this.isRegister = false; // 是否开通当日挂号
    this.isAppointment = false; // 是否开通预约挂号
    this.isReportQuery = false; // 是否开通报告查询
    this.isPaymentRecord = false; // 是否开通费用查询
    this.isWaitingQueue = false; // 是否开通候诊队列
    this.isOnlineRecharge = false; // 是否开通在线充值
    this.isCardManage = false; // 是否开通就诊卡管理
    this.isHasExpert = false; // 是否有知名专家
    this.isScheduleTimeSumNo = false; // 是否有号源
    this.searchstate = false; // 查询显示判断
    this.isCardAppintment = false; // 是否必须有卡预约
    this.isDeptSchedule = false; // 是否有科室排班
    this.isDetpScheduleTime = false; // 科室排班是否有号源
    this.isRegisterIsDopay = false; // 当日挂号是否立即支付挂号费
    this.isAppointmentIsDopay = false; // 预约挂号是否立即支付挂号费
    this.isAutomaticDeduction = false; // 预约是否自动扣费
    this.isLevel = true; // 是否显示医院等级
    this.isCopyright = true; // 是否显示版权
    this.isHosArea = false; // 是否有院区
    this.projectType = '';
    this.isImeRecharge = false;
    this.isPhysicalUse = false; // 是否启用体检报告
    this.isCodeLogin = false; // 是否用动态码登录
    this.isDoPayForPatientCard = false; // 立即支付功能是否使用就诊卡支付
    this.cancelAppointmentLastTerm = Date.today().toString('yyyy-MM-dd'); // 取消预约最后期限
    this.isCostHaveTwoPart = false; // 挂号费是否分为两部分

    // 是否开通满意度调查
    // 个人中心
    this.IDCardCanrepeat = false; // 是否允许一张身份证绑定多个就诊人
    this.singleCard = false; // 一卡通，兖州医院
    // 医院简介
    // 微官网

    // 处理方式
    this.famousExpert = new FamousExpertMethods().DEFAULT; // 医院知名专家的处理方式
    this.cardBinding = new CardBindingMethods().DEFAULT; // 就诊卡绑定方式
    this.platformTypeMethods = new PlatformTypeMethods().WeChat; // 支付平台

    // 颜色皮肤

    this.hosId = ''; // 医院id
    this.hospitalName = ''; // 医院名称
    this.hosLogo = ''; // 医院LOGO
    this.hosLogoName = ''; // 医院带名称LOGO
    this.officiaWebsitel = ''; // 医院官网
    this.hosareastate = false; // 是否有分院，默认为没有
    this.hosCardHas = false; // 医院就诊卡个性需求，例如莱芜医院
    this.hosinCardNoState = false; // 医院住院卡是否启用
    this.hosvalidatecode = true; // 是否启用验证码，默认启用
    this.hosrelation = true; // 是否启用就诊人关系
    this.outcardmsname = '门诊卡';
    this.hositemclass = true; // 医院检查项目列表显示要求，默认为itemclass
    this.isCancelAppointment = true; // 是否支持取消预约功能
    this.registerStateZH1 = '已预约'; // 状态为已预约的中文显示
    this.registerStateZH2 = '已挂号'; // 状态为已挂号的中文显示
    this.isLWYY = false; // 莱芜医院特殊处理标识
    this.isQF = false; // 曲阜医院特殊处理标识
    this.isBYF = false; // 滨医附医院特殊处理标识
    this.isRechargeQuery = false; // 是否开通充值查询
    this.TwoCardKinds = false; // 绑卡页面正常卡类型，有两种卡的情况
    this.hospatientCcarstate = true; // 医院是否有就诊卡，默认为true，有就诊卡
    this.hasChild = false; // 就诊人是否支持儿童
    this.isShowCost = true; // 是否显示诊疗费
    this.moneyUnit = ''; // 金钱单位
    this.cancelBtnTitle = '取消'; // 取消按钮显示文字
    this.rechargeTimeStart = '00:30'; // 起始时间
    this.rechargeTimeEnd = '23:30'; // 结束时间
    this.scanQrCodeParam = false; // 泰安妇幼调用扫码支付接口参数修改
    this.hosSBCardNoState = false; // 充值部分是否支持社保卡充值
  }
}

export class FamousExpertMethods {
  constructor() {
    this.DEFAULT = 'DEFAULT'; // 有知名专家的科室查询
    this.SCHEDULEQUERY = 'SCHEDULEQUERY'; // 有知名专家的排班查询
  }
}

export class CardBindingMethods {
  constructor() {
    this.DEFAULT = 'DEFAULT';
  }
}

export class PlatformTypeMethods {
  constructor() {
    this.APP = 'APP';
    this.WeChat = 'WeChat';
    this.Alipay = 'Alipay';
    this.WeChatOrAlipay = 'WeChatOrAlipay';
  }
}
