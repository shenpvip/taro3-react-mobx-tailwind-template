import { View, Text } from "@tarojs/components";
import { useStore, observer } from "@shared/store/utils";
import { useEffect } from "react";
import PageContainer from "@shared/components/PageContainer";
import "./index.scss";

const Index = () => {
  const { GlobalStore } = useStore();
  useEffect(() => {
    console.log(GlobalStore.customerName);
  }, []);
  return (
    <PageContainer className="index">
      <Text className="text-[#acc855] text-[32px] flex-wrap">Hello world!</Text>
    </PageContainer>
  );
};

export default observer(Index);
