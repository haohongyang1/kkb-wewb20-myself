// 启动多个进程来调用 app.js，包含一个主进程，去管理子进程，如果出现异常，会重新启动进程，保持多进程

const cluster = require("cluster"); // 系统内置包
const os = require("os"); //
const numCPUs = os.cpus().length; // 看下系统是几he的
const process = require("process"); // 主进程
var workers = {};
if (cluster.isMaster) {
  // 主进程，最开始的时候调用的
  // 1 复制自身
  for (var i = 0; i < numCPUs; i++) {
    var worker = cluster.fork();
    console.log("worker==", worker);
    // 监工：你干活去吧，给他写本上了
    workers[worker.process.pid] = worker;
  }
  cluster.on("exit", (worker, code, signal) => {
    //   监听谁出错了
    console.log("工作进程 %d 关闭 重启中", worker.process.pid);
    // 谁出错就给谁踢出去
    delete workers[worker.process.pid];
    // 然后用一个新的顶上
    worker = cluster.fork();
    // 再继续监工
    workers[worker.process.pid] = worker;
  });
} else {
  // 复制自身的时候走，即：工作进程
  var app = require("./app");
  app.listen(3000);
}

// 当主进程关闭时，
process.on("SIGTERM", function () {
  for (var pid in workers) {
    process.kill(pid);
  }
  process.exit(0);
});

require("./test");
