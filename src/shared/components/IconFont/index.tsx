import { useCallback } from "react";
import { View } from "@tarojs/components";
import "./index.scss";
interface IPros {
  icon: string;
  onClick?: () => void;
  fontSize?: string;
  color?: string;
  className?: string;
}
const IconFont = (props: IPros) => {
  const { onClick, icon, fontSize, color, className } = props;
  const _fn = useCallback(() => {}, []);
  const _onClick = onClick || _fn;
  return (
    <View
      onClick={_onClick}
      className={`iconfont ${icon} ${className}`}
      style={{
        fontSize: fontSize || "16px",
        color: color || "#000",
      }}
    ></View>
  );
};
export default IconFont;
