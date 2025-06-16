# 构建项目
pnpm build

# 压缩项目文件
zip -r tao_te_ching.zip ./tao_te_ching

# 移动压缩文件到下载目录
mv tao_te_ching.zip /Users/wujingtao/Downloads

# 清理构建目录
rm -rf ./tao_te_ching 