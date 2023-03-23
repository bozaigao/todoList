const Config = {
  /**
   *  监听端口
   */
  PORT: 5000,
  /**
   * MongoDB 数据库地址
   */
  //Mac本地连接用下面地址
  // MONGODB_URI: "mongodb://127.0.0.1:27017/todo",
  //Docker 容器内部连接用下面地址
  MONGODB_URI: "mongodb://mongodb:27017/todo",
};

export default Config;
