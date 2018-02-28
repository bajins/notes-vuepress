# 以www用户启动Aria2并设置下载地址到/root/downloads目录
```
sudo -u www aria2c --enable-rpc --rpc-listen-all --rpc-allow-origin-all -c --dir /root/downloads -D

```
