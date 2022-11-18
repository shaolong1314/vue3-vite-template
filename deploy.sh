###
 # @Author: shaolong
 # @Date: 2022-11-17 15:12:20
 # @LastEditors: shaolong
 # @LastEditTime: 2022-11-17 15:16:34
 # @Description: 部署github pages脚本
### 

#!/usr/bin/env sh
 
# 当发生错误时中止脚本
set -e
 
# 构建
yarn build
 
# cd 到构建输出的目录下 
cd dist
 
git init
git add -A
git commit -m 'deploy'
 
# 部署到 https://<USERNAME>.github.io/<REPO>

git push -f git@github.com:shaolong1314/vue3-vite-template.git master:gh-pages
 
cd -