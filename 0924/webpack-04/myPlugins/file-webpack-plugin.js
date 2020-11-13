// 开发一个文件清单插件，webpack每次打包结束后，自动产生一个打包文件清单，文件上记录文件名，文件数量等信息。

class fileWebpackPlugin {
  apply(compiler) {
    console.log("暗号：做人嘛，最重要的是开心");

    compiler.hooks.emit.tapAsync("fileWebpackPlugin", (compilation, cb) => {
      // 拿到文件列表
      const len = Object.keys(compilation.assets).length;
      let content = `文件的数量：${len}`;
      for (let filename in compilation.assets) {
        // 拿到对象名称
        content += console.log(filename);
      }
      console.log(compilation.assets);
      compilation.assets["file.txt"] = {
        source: function () {
          return "hello webpack第四节课";
        },
        size: function () {
          return 1024;
        },
      };
      cb();
    });
  }
}

module.exports = fileWebpackPlugin;
