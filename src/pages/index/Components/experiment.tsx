import { Button } from "@tarojs/components";
interface IProps {
  handleClick: () => void;
}
const Experiment = (props: IProps) => {
  const { handleClick } = props;

  return (
    <Button className="notification" type="warn" onClick={handleClick}>
      点击显示通知
    </Button>
  );
};

export default Experiment;
