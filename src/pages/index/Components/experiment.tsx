import * as PropTypes from "prop-types";
import { View } from "@tarojs/components";
import { AtButton } from "taro-ui";

const Experiment = props => {
  const { handleClick } = props;

  return (
    <View className="index">
      <AtButton className="notification" type="secondary" onClick={handleClick}>
        点击显示通知
      </AtButton>
    </View>
  );
};

Experiment.propTypes = {
  handleClick: PropTypes.func
};

export default Experiment;
