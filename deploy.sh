#!/usr/bin/env sh

# 终止一个错误
set -e

# 构建
npm run build

# 进入生成的构建文件夹
# cd docs/.vuepress

scp -r docs/.vuepress/dist/* root@47.100.115.166:/usr/share/nginx/blog
# 如果你是要部署到自定义域名
# echo 'www.example.com' > CNAME

# git init
# git add -A
# git commit -m 'deploy'
# git remote add origin https://github.com/Cwhilter/whilter.github.io.git
# git push -u origin master
# 如果你想要部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果你想要部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

# 拉取远程代码，强制合并，忽略历史
# git pull https://github.com/Cwhilter/whilter.github.io.git  master --allow-unrelated-histories
rm -rf docs/.vuepress/dist
cd -