import React from 'react';
import { Text, View, Alert } from 'react-native';
import WebView from 'react-native-webview';

const uri = 'https://m.mtime.cn/#!/onlineticket/591722720/';
// 暗号：技术为生活服务
const INJECT_JS = (window, document) => {
  let submitBtn;
  function waitForBtnRender() {
    submitBtn = document.getElementById('submitBtn');
    if (!submitBtn) {
      setTimeout(waitForBtnRender, 2000);
    } else {
      // 按钮点击
      submitBtn.onclick = () => {
        const seats = [];
        document.querySelectorAll('.seat_selected').forEach((node) => {
          seats.push(node.getAttribute('name'));
        });
        window.ReactNativeWebView.postMessage(seats.join(', '));
      };
    }
  }
  waitForBtnRender();
};

export default function App() {
  return (
    <WebView
      source={{ uri }}
      injectedJavaScript={`(${INJECT_JS.toString()})(window, document)`}
      onMessage={(e) => {
        Alert.alert('您选中的座位是：' + e.nativeEvent.data);
      }}
    />
  );
}
