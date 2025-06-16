# 拷贝到服务器
scp ~/Downloads/tao_te_ching.zip m87:/var/www/

# 在服务器上执行命令
ssh m87 "
  cd /var/www/ && \
  if [ -d 'tao_te_ching' ]; then \
    rm -rf tao_te_ching; \
  fi && \
  unzip tao_te_ching.zip && \
  rm -rf tao_te_ching.zip
"

rm -rf ~/Downloads/tao_te_ching.zip