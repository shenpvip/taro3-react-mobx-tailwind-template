import { Text } from "@tarojs/components";
import { useEffect } from "react";
import PageContainer from "@shared/components/PageContainer";
import observer, { GlobalStore } from "@shared/store";
import "./index.scss";

const Index = () => {
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
