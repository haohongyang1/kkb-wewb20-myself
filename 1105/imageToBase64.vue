<template>
  <view>
    <button @click="btnPhoto">拍照或从相册选择一张照片</button>
  </view>
  <view style="text-align: center; font-size: 14px; color: #999">
    base64Url:{{ base64Url }}
  </view>
</template>

<script>
export default {
  data() {
    return {
      imgfile: "",
    };
  },
  methods: {
    //暗号：think different
    btnPhoto() {
      //选择图片
      uni.chooseImage({
        count: 1,
        success: (res) => {
          this.imgfile = res.tempFilePaths[0];
          // 图片转base64
          this.readImage2Base64(this.imgfile);
        },
      });
    },
    readImage2Base64(path) {
      // 如果是APP（iOS，Android）时，使用HTML5+来调用原生文件读取方法
      // #ifdef APP-PLUS
      plus.io.resolveLocalFileSystemURL(path, (entry) => {
        entry.file((file) => {
          let reader = new plus.io.FileReader();
          reader.onloadend = async (e) => {
            const base64 = e.target.result.substr(22);
          };
          reader.readAsDataURL(file);
        });
      });
      // #endif
      // #ifdef MP-WEIXIN
      wx.getFileSystemManager().readFile({
        filePath: path,
        encoding: "base64",
        success: async (res) => {
          console.log(res);
        },
      });
      // #endif
      // 如果非APP时（Web，小程序），则使用web端的方法来实现此功能
      // #ifdef H5
      uni.request({
        url: path,
        method: "GET",
        responseType: "arraybuffer",
        success: async (res) => {
          let base64 = uni.arrayBufferToBase64(res.data);
        },
      });
      // #endif
    },
  },
};
</script>

<style></style>
