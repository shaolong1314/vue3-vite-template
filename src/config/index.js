// 全局配置

export const config = {
  GLOBAL: {
    title: "vue3 admin",
    /**
     * @description token key
     */
    TokenKey: "ACCESS_TOKEN",
    /**
     * @description 记住密码状态下的token在Cookie中存储的天数，默认1天
     */
    tokenCookieExpires: 60 * 60 * 24,
    /**
     * @description 记住密码状态下的密码在Cookie中存储的天数，默认1天s
     */
    passCookieExpires: 1,
    /**
     * @description 请求超时时间，毫秒（默认2分钟）
     */
    timeout: 2 * 60 * 1000,
    // 是否显示底部
    isShowFooter: false,
    /**
     * 底部文字，支持html语法
     */
    footerTxt: "",
    /**
     * 备案号
     */
    caseNumber: ""
  },
  ELEMENT_PLUS: {
    SIZE: "small",
    PAGINATION_SIZE: false
  }
};
