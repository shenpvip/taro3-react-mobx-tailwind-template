import Experiment from "../../../src/pages/index/Components/experiment";
import { shallow } from "enzyme";

describe("Experiment Component", () => {
  const handleClick = jest.fn();
  const wrapper = shallow(<Experiment handleClick={handleClick} />);

  // case1
  // 通过查找存在 AtButton,测试组件正常渲染
  it("Experiment Component should be render", () => {
    expect(wrapper.find("Button").exists());
  });

  // case2
  // 按下按钮，执行props的handleClick方法
  it("press button should call handleClick", () => {
    wrapper.find(".notification").simulate("click");
    expect(handleClick).toBeCalled();
  });
});
