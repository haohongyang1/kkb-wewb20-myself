// 演示一下故障恢复过程
const http = require("http");
const server = http.createServer((request, response) => {
  // 预埋一个 20% 几率的错误
  Math.random() > 0.8 ? await() : "2";
  response.end("Hello");
});
// 如果当前模块有人引入，就使用，如果当前模块没有人引入，就导出server
if (!module.parent) {
}
