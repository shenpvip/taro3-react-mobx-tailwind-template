import React from "react";
import { View } from "@tarojs/components";

interface IProps {
  className?: string;
  children: React.ReactNode;
}

const PageContainer = (props: IProps): JSX.Element => {
  const { className, children } = props;
  return <View className={className}>{children}</View>;
};

export default PageContainer;
