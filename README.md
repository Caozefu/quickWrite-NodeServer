# quickWrite-NodeServer
quickWrite-NodeServer

## MySQL导出数据
#### 导出数据不导出结构
``mysqldump -t quickWrite -uroot -p > db1.sql``
#### 导入数据：
``source db1.sql;``

#### 导出结构不导出数据
``mysqldump --opt -d db1 -u root -p > db1.sql``
