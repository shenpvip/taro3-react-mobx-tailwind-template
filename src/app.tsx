import { useEffect } from "react";
import { Provider } from "mobx-react";
import Taro from "@tarojs/taro";
import store from "@shared/store";
import "./app.scss";

const App = (props) => {
  useEffect(() => {
    if (process.env.TARO_ENV === "weapp") {
      // 检测新版本
      if (Taro.getUpdateManager) {
        const updateManager = Taro.getUpdateManager();
        updateManager.onCheckForUpdate((res) => {
          // 请求完新版本信息的回调.
          res.hasUpdate && console.warn("新版本提示");
        });
        updateManager.onUpdateReady(() => {
          Taro.showModal({
            title: "更新提示",
            content: "新版本已经准备好，是否重启应用？",
            success(res) {
              if (res.confirm) {
                updateManager.applyUpdate(); // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              }
            },
          });
        });
        updateManager.onUpdateFailed(() => {
          // 新的版本下载失败
          Taro.showModal({
            title: "已经有新版本了哟~",
            content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~",
          });
        });
      } else {
        Taro.showModal({
          // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
          title: "提示",
          content:
            "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。",
        });
      }
    }
  }, []);

  return <Provider store={store}>{props.children}</Provider>;
};

export default App;
