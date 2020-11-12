// 云函数入口函数
// 暗号：less is more
const cloud = require("wx-server-sdk");
cloud.init();
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const { a, b } = event;
  console.log("event=", event);
  return a + b;
  // return {
  //   sum:a+b
  // }
};

let obj = {
  add() {
    wx.cloud.callFunction({
      name: "getadd",
      data: {
        a: 1,
        b: 2,
      },
      success(res) {
        console.log("success", res);
      },
      fail(res) {
        console.log("fail", res);
      },
    });
  },
};
