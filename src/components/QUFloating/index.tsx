import { Button, View, MovableView, MovableArea } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import { observer } from '@store/utils';
import { useState } from 'react'
import QUIcon from '@components/QUIcon';
import './index.scss';

interface IProps {
  showTitle: string;
}
/**
 * 可全屏任意拖动自动吸边组件
 * @param props
 * @returns
 */
const Floating = (props: IProps) => {
  const { windowHeight, windowWidth } = Taro.getSystemInfoSync();
  const MOVE_HEIGHT = 72;
  const MOVE_WIDTH = 100;
  const [pageX, setPageX] = useState(windowWidth - 100);
  const [pageY, setPageY] = useState(windowHeight - 230);
  const [move, setMove] = useState({
    x: windowWidth - 100,
    y: windowHeight - 230 + MOVE_HEIGHT / 2
  });
  const [isSideLeft, setIsSideLeft] = useState(false);

  const onChange = e => {
    if (e.detail.source === 'touch') {
      setMove({ x: e.detail.x, y: e.detail.y });
    }
  };

  const onTouchend = () => {
    let currentX = move.x - MOVE_WIDTH / 2;
    let currentY = move.y - MOVE_HEIGHT / 2;
    currentX =
      currentX < 0
        ? 0
        : currentX > windowWidth - MOVE_WIDTH
          ? windowWidth - MOVE_WIDTH
          : currentX;
    currentY =
      currentY < 0
        ? 0
        : currentY > windowHeight - MOVE_HEIGHT
          ? windowHeight - MOVE_HEIGHT
          : currentY;
    if (move.x > windowWidth / 2) {
      currentX = windowWidth - MOVE_WIDTH;
      setIsSideLeft(false);
    } else {
      currentX = 0;
      setIsSideLeft(true);
    }
    setPageX(currentX);
    setPageY(currentY);
  };

  useDidShow(() => {
    setPageX(windowWidth - 100);
    setPageY(windowHeight - 230);
    setIsSideLeft(false);
    if (move.x && move.y) {
      onTouchend();
    }
  });

  return (
    <MovableArea className="movableArea">
      <MovableView
        className="movableView"
        direction="all"
        damping={40}
        x={pageX}
        y={pageY}
        onChange={onChange}
        onTouchEnd={onTouchend}
      >
        <Button
          className="home_area"
          style={{
            borderRadius: isSideLeft
              ? '0px 100px 100px 0px'
              : '100px 0px 0px 100px'
          }}
          open-type="contact"
        >
          <View className="circle">
            <QUIcon icon="icon-xiaoxi3" fontSize="36rpx" color="#77D4DB" />
          </View>
          <View className="home_title">{props.showTitle}</View>
        </Button>
      </MovableView>
    </MovableArea>
  );
};

Floating.defaultProps = {
  showTitle: '在线客服'
};

export default observer(Floating);
