# 前端项目说明
    项目简介：
        这是一个管理系统框架模板
    使用技术栈:react + antd + typeScript + Recoil + vite + less
    项目地址
      - 正式环境：env.development 文件
      - 开发环境：env.production 文件
    代码Git地址:git clone  https://github.com/Gq-gg/gq-web-react.git
# 执行命令
    开发：
     - pnpm run dev:运行
     - pnpm run test:打包
    生产：
     - pnpm run release:打包
     - pnpm run dev:release:运行

# 代码优化命令
     pnpm lin:fix: 这将运行 lint 命令，使用 eslint 对文件进行修复。
     pnpm prettier: 这将运行 prettier 命令，对文件进行格式化操作。

# husky
    - commit-msg # git提交信息提示
    - pre-commit # .prettierrc生成代码格式优化

# public
    静态文件存放

# src xx.tsx:页面编写;  xx.module.less:样式文件;  xx.type 数据类型文件
    assets 图片存放和公共css样式
    components 公共组件存放
    data 前端数据存储（公共下拉框数据，公共枚举等等）
    hooks 自定义hooks
    http
      - axios-instance 公共请求方法封装
    layouts 布局组件
    page 页面文件
      - Login 登录界面
      - CorporateAccountManagement 企业账户管理
      - Error 错误页面
      - NotificationManagement 通知管理
      - OrderManagement 订单管理
      - PermissionManagement 权限管理
      - PersonalAccountManagement 个人账户管理
    router 页面路由
    services api请求，不同的页面不同的api请求进行编写(基本与页面文件名称相同)
      - communal 公共api 
    stores 公共存储文件 Recoil
    utils 公共方法
    App.css
    App.tsx
    index.css
    index.tsx
    main.tsx 入口文件
    vite-env.d.ts 全局变量
    .env.development 开发、测试地址域名
    .env.production 生产地址域名
    .eslintrc.cjs ts规则
    .gitignore 提交忽略文件
    .prettierrc 格式化文件
     vite.config.ts 配置文件
              
