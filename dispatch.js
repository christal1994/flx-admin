'use strict';
require('egg').startCluster({
  baseDir: __dirname,
  port: process.env.PORT || 6001,
  workers: process.env.WORKERS,
});
