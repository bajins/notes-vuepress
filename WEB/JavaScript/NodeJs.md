# NodJs

## 依赖管理
### yarn、npm命令简单比较
| npm                                | yarn                      | 说明                         |
|------------------------------------|---------------------------|----------------------------|
| npm install(i)                     | yarn                      | 安装                         |
| npm uninstall(un)                  | yarn remove               | 卸载                         |
| npm install xxx –-global(-g)       | yarn global add xxx       | 全局安装                       |
| npm install xxx –save(-S)          | yarn add xxx              | 安装包                        |
| npm install xxx –save-dev(-D)      | yarn add xxx –dev(-D)     | 开发模式安装包                    |
| npm update –save                   | yarn upgrade              | 更新                         |
| npm update –global                 | yarn global upgrade       | 全局更新                       |
| npm uninstall [–save/–save-dev]    | yarn remove xx            | 卸载                         |
| npm cache clean                    | yarn cache clean          | 清除缓存                       |
| rm -rf node_modules && npm install | yarn upgrade              | 重装                         |
| npm init                           | yarn init                 | 初始化某个项目                    |
| npm install/link                   | yarn install/link         | 默认的安装依赖操作                  |
| npm install koa --save             | yarn add koa              | 安装某个依赖，并且默认保存到package      |
| npm uninstall koa --save           | yarn remove koa           | 移除某个依赖项目                   |
| npm install koa --save-dev         | yarn add koa --dev        | 安装某个开发时依赖项目                |
| npm update koa --save              | yarn upgrade koa          | 更新某个依赖项目                   |
| npm install koa --global           | yarn global add koa       | 安装某个全局依赖项目                 |
| npm publish/login/logout           | yarn publish/login/logout | 发布/登录/登出，一系列NPM Registry操作 |
| npm run/test                       | yarn run/test             | 运行某个命令                     |

