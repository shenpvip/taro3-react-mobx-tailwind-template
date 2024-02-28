import Taro, { hideLoading, showModal } from "@tarojs/taro";

/**
 * 登录鉴权
 */
let isShowAuthorized;
export function getAuthorized() {
  if (isShowAuthorized) return;
  hideLoading();
  isShowAuthorized = true;
  showModal({
    title: "请登录!",
    content: "您需要登录才可以使用该功能!",
    success: async (res) => {
      isShowAuthorized = false;
      if (res.confirm) {
        // 跳转登录页
      }
    },
  });
}

interface IPaymentData {
  timeStamp: string;
  nonceStr: string;
  prepayId: string;
  paySign: string;
}
export function requestPayment(data: IPaymentData, success, fail, complete?) {
  Taro.requestPayment({
    timeStamp: data.timeStamp,
    nonceStr: data.nonceStr,
    package: `prepay_id=${data.prepayId}`,
    paySign: data.paySign,
    signType: "MD5",
    success: success,
    fail: fail,
    complete: complete,
  });
}
