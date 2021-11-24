module.exports = {
    "root": true,
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module"
    },
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "standard",
    "plugins": [
        "html",
       ],
    "rules": {
      // 箭头函数用小括号括起来
      "arrow-parens": 0,
      // 生成器函数*的前后空格
      "generator-star-spacing": 0,
      // 禁止使用debugger
      "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
      // 语句强制分号结尾 http://eslint.org/docs/rules/semi
      "semi": ["error", "always"],
      // 引号类型
      // "quotes": ["error", "single"],
      // 函数定义时括号前面要不要有空格
      "space-before-function-paren": ["error", "never"],
      // 大括号风格
      "brace-style": ["error", "stroustrup"],
      // 块语句内行首行尾是否要空行
      // "padded-blocks": ["error", "always"],
      // 关闭eval检核
      "no-eval": ["off"],

      "no-undef":["off"]
    }
};
