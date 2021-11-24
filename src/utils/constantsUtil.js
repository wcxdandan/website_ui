// 拦截器类型
export const LOGIN_TYPE_NO = 'no'; // 拦截器登录类型-不用登录
export const LOGIN_TYPE_LOGIN = 'login'; // 拦截器登录类型-本地local检核
export const LOGIN_TYPE_SERVICE_NO = 'service-no'; // 拦截器登录类型-调用服务器检核但不需要登录
export const LOGIN_TYPE_SERVICE_LOGIN = 'service-login'; // 拦截器登录类型-调用服务器检核需要登录

// 各种过时及显示时间设定
export const GET_TOKEN_TIME = 10 * 60 * 60 * 1000; // 经过多少时间之后刷新token 单位毫秒 默认10小时
export const GET_LOGIN_TIME = 60 * 24 * 60 * 60 * 1000; // 经过多少时间之后刷新登录状态 单位毫秒 60天
// export const GET_OPEN_ID_TIME = 60 * 24 * 60 * 60 * 1000; // 经过多少时间之后刷新openid 单位毫秒 60天 移到index.html里面了
export const IMAGE_INTER_BAL = 3 * 60 * 1000; // 获取二维码图片时间间隔 默认3分钟
export const ALERT_TIME = 2 * 1000; // 提示信息展示时间

// 各种提示信息
export const MESSAGE_CAN_NOT_CONNECT = '网络暂时无法使用，请稍候重试。';

// 平台类型
export const PLATFORM_TYPE_ANDROID_APP = 'jCM5kELAkB'; // 平台类型: android APP
export const PLATFORM_TYPE_IOS_APP = 'Lw9Qv8wCxP'; // 平台类型: ios APP
export const PLATFORM_TYPE_ALI_PAY = '3'; // 平台类型: 支付宝
export const PLATFORM_TYPE_WE_CHAT = '4'; // 平台类型: 微信
export const PLATFORM_TYPE_NET = '5'; // 平台类型: 微官网
export const PLATFORM_TYPE_ALI_PAY_CITY = '3gdrKEwcj9'; // 平台类型: 支付宝城市服务
export const PLATFORM_TYPE_WE_CHAT_CITY = 'xnlruyK01m'; // 平台类型: 微信城市服务
export const PLATFORM_TYPE_YLSD = 'gkhKeKOA2A'; // 平台类型:医联山东微信
export const PLATFORM_TYPE_OUTSIDE = 'FAY2QOOBAT'; // 平台类型:医联山东万科微官网版
export const PLATFORM_TYPE_YLSD_ANDROID_APP = '94200e40ZE'; // 平台类型:医联山东 android APP
export const PLATFORM_TYPE_YLSD_IOS_APP = '94200e40ZE'; // 平台类型:医联山东 ios APP

// 阿里云服务设置
export const ALI_CLOUD_VISIT_SERVER = 'https://static.shunnengnet.com'; // 阿里云bucket
export const ALI_CLOUD_VISIT_SERVER_AUDIO = 'https://mts.shunnengnet.com'; // 阿里云bucket
export const ALI_CLOUD_BUCKET = 'sn-static'; // 阿里云bucket
export const ALI_CLOUD_ENDPOINT = 'https://oss-cn-qingdao.aliyuncs.com'; // 阿里云ENDPOINT

// 各种服务器域名
export const ROUTER_PAGEVIEW = 'https://a.jiankangsn.com'; // 路由埋点服务请求url
// 测试环境
// export const LOCALHOST = 'http://cha.cha.jiankangsn.com';
// export const GATE_WAY_LOCALHOST = 'http://lk-auth.jiankangsn.com';
// pre环境
// export const DOMAIN_NAME = '//hos3.jiankangsn.com';
export const DOMAIN_NAME = '//hos-pre.jiankangsn.com';
export const LOCALHOST = '//cha.cha.jiankangsn.com/hosspecial-interface';
export const LOCALHOST_MYT = '//pre.jiankangsn.com'; // 微服务域名
export const GATE_WAY_LOCALHOST = '//auth-pre.jiankangsn.com';
export const PAY_LOCALHOST = '//pay.jiankangsn.com'; // 订单支付结果查询域名
export const DOMAIN_NAME_COOKIE = 'jiankangsn.com'; // 跨平台支付的cookie写入的域名
export const WS_LOCALHOST = 'wss://im.jiankangsn.com'; // webSocket微服务域名
export const STATIC_LOCALHOST = '//static.shunnengnet.com'; // 静态资源域名
// 生产环境
// export const DOMAIN_NAME = '//hos.shunnengnet.com'; // 服务域名
// export const LOCALHOST = '//api.shunnengnet.com'; // 微服务域名
// export const LOCALHOST_MYT = 'https://pre.jiankangsn.com'; // 微服务域名
// export const GATE_WAY_LOCALHOST = '//auth-sc.shunnengnet.com'; // 授权服务域名
// export const PAY_LOCALHOST = '//pay.shunnengnet.com'; // 订单支付结果查询域名
// export const DOMAIN_NAME_COOKIE = 'shunnengnet.com'; // 跨平台支付的cookie写入的域名
// export const WS_LOCALHOST = 'wss://im.jiankangsn.com'; // webSocket微服务域名
// export const STATIC_LOCALHOST = '//static.shunnengnet.com'; // 静态资源域名

// 平台ID
export const PLATFORM_WECHAT = '4445a2d5a10543cca8cdbe5c2a0adf52'; // 平台ID-微信
export const PLATFORM_ALIPAY = '3335a2d5a10543cca8cdbe5c2a0adf52'; // 平台ID-支付宝
export const PLATFORM_NET = '37108cc3d7dc485383c685c7a071a089'; // 平台ID-微官网
export const PLATFORM_ANDROID_APP = 'ae893cbe86f5460a9d674b144e446d16'; // 平台ID-ANDROID
export const PLATFORM_IOS_APP = '9440c7fdc5c24cd3bd2f3e1c3f3fe9cb'; // 平台ID-IOS
export const PLATFORM_WECHAT_CITY = '72da2770fdf54e878e0a90bd03b4c9bb'; // 平台ID-微信城市服务
export const PLATFORM_ALIPAY_CITY = 'bddd2fbf6a754993b7830a730e701993'; // 平台ID-支付宝城市服务

// 图片大小
export const IMAGE_SIZE = 10 * 1024 * 1024;

// 考试类型
export const EXAM_TYPE_SIMULATION = '0';  // 模拟考试
export const EXAM_TYPE_FORMAL = '1';  // 正式考试

// 短信类型
export const CODE_TYPE_REGISTER = '0';  // 用户注册
export const CODE_TYPE_LOGIN = '1';  // 登录
export const CODE_TYPE_PASSWORD = '1'; // 设置密码
