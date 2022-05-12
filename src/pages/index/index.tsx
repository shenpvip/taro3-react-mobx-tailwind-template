import { View, Text, Button } from "@tarojs/components";
import { useStore, observer } from "@store/utils";
import QUIcon from "@components/QUIcon";
import { Cell } from "@taroify/core";
import "./index.scss";

const Index = () => {
  const { GlobalStore } = useStore();
  const onBtnClick = () => {
    GlobalStore.setCustomerName("Taro");
    GlobalStore.getData();
  };
  return (
    <View className="index">
      <Text>Hello world!{GlobalStore.customerName}</Text>
      <View className="price">200</View>
      <View className="text">定位</View>
      <QUIcon icon="icon-bangzhu" />
      <Cell title="单元格" brief="描述信息" size="large">
        内容
      </Cell>
      <Button type="primary" onClick={onBtnClick}>
        主要按钮
      </Button>
    </View>
  );
};

export default observer(Index);
