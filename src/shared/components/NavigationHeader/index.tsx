import Taro from "@tarojs/taro";
import { Text, View } from "@tarojs/components";
import { navigateBack, reLaunch } from "@shared/router/index";
import IconFont from "../IconFont";
import "./index.scss";
interface IPros {
  title?: string;
  customBacKfn?: () => void;
  className?: string;
}

// 通过获取系统信息计算导航栏高度
const getNavigationBarInfo = () => {
  // 系统信息
  const systemInfo = Taro.getSystemInfoSync();
  // 胶囊按钮位置信息
  const menuButtonInfo = Taro.getMenuButtonBoundingClientRect();
  let navigationContentHeight = 40;
  // 胶囊导航栏高度
  navigationContentHeight =
    (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 +
    menuButtonInfo.height;
  // 顶部手机状态栏高度
  const { statusBarHeight } = systemInfo;

  return {
    navigationBarHeight: statusBarHeight + navigationContentHeight,
    navigationContentHeight,
    menuButtonHeight: menuButtonInfo.height,
    navigationPaddding: systemInfo.windowWidth - menuButtonInfo.right,
    statusBarHeight: systemInfo.statusBarHeight,
    menuButtonWidth: menuButtonInfo.width,
  };
};
const NavigationHeader = (props: IPros) => {
  const { title, customBacKfn, className } = props;

  const {
    statusBarHeight,
    navigationBarHeight,
    navigationContentHeight,
    menuButtonHeight,
    navigationPaddding,
    menuButtonWidth,
  } = getNavigationBarInfo();

  const onBackClick = () => {
    customBacKfn
      ? customBacKfn()
      : Taro.getCurrentPages().length > 1
      ? navigateBack()
      : reLaunch("pages/newHome");
  };
  const onBackHome = () => {
    reLaunch("pages/newHome");
  };

  return (
    <View
      className={`nav_home_bar ${className}`}
      style={`height: ${navigationBarHeight}px;padding: 0 ${navigationPaddding}px`}
    >
      <View
        className="navbar"
        style={`height: ${navigationContentHeight}px;top:${statusBarHeight}px`}
      >
        <View
          className="back_icon"
          style={`width:${menuButtonWidth}px;height:${menuButtonHeight}px;border-radius:${
            menuButtonHeight / 2
          }px`}
        >
          <View className="icon_item" onClick={onBackClick}>
            <IconFont icon="icon-fanhui" />
          </View>
          <View className="icon_item" onClick={onBackHome}>
            <IconFont icon="icon-shouye_xuanzhong" />
          </View>
        </View>
        {title && <Text className="nav_title">{title}</Text>}
        <View
          className="right_icon"
          style={`width:${menuButtonWidth}px;height:${menuButtonHeight}px`}
        ></View>
      </View>
    </View>
  );
};
export default NavigationHeader;
