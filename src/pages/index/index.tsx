import { View, Text } from "@tarojs/components";
import { AtButton } from "taro-ui";
import { useStore, observer } from "@store/utils";
import "./index.scss";

const Index = () => {
  const { GlobalStore } = useStore();
  return (
    <View className="index">
      <Text>Hello world!{GlobalStore.customerName}</Text>
      <AtButton type="primary">按钮</AtButton>
    </View>
  );
};

export default observer(Index);
