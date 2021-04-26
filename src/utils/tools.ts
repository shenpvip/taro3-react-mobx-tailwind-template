import Taro, { hideLoading, showModal } from "@tarojs/taro";
/**
 * 包裹propmis
 * @param cb 回掉方法
 * @param opts 回掉方法参数
 */
export function withPromise(cb: Function, opts: any = {}): Promise<any> {
  return new Promise((resolve, reject) => {
    const obj = {
      success(res: any) {
        return resolve(res);
      },
      fail(err: any) {
        return reject(err);
      }
    };
    opts = Object.assign(obj, opts);
    typeof cb === "function" && cb(opts);
  });
}

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
    success: async res => {
      isShowAuthorized = false;
      if (res.confirm) {
        // 跳转登录页
      }
    }
  });
}

/**
 * 格式化数字
 * 千分位分割，保留两位小数
 * @param s number
 */
export function formatNumber(s: number | string) {
  if (!s) {
    return "0.00";
  }
  Number.prototype.toFixed = function(n: number) {
    if (n > 20 || n < 0) {
      throw new RangeError(
        "toFixed() digits argument must be between 0 and 20"
      );
    }
    const number = this as number;
    if (isNaN(number) || number >= Math.pow(10, 21)) {
      return number.toString();
    }
    if (typeof n == "undefined" || n == 0) {
      return Math.round(number).toString();
    }
    let result: string | number = number.toString();
    const arr = result.split(".");
    // 整数的情况
    if (arr.length < 2) {
      result += ".";
      for (let i = 0; i < n; i += 1) {
        result += "0";
      }
      return result;
    }
    const integer = arr[0];
    const decimal = arr[1];
    if (decimal.length == n) {
      return result;
    }
    if (decimal.length < n) {
      for (let i = 0; i < n - decimal.length; i += 1) {
        result += "0";
      }
      return result;
    }
    result = integer + "." + decimal.substr(0, n);
    const last = decimal.substr(n, 1);
    // 四舍五入，转换为整数再处理，避免浮点数精度的损失
    if (parseInt(last, 10) >= 5) {
      const adjust = number >= 0 ? 1 : -1;
      const x = Math.pow(10, n);
      result = (Math.round(parseFloat(result) * x) + adjust) / x;
      result = result.toFixed(n);
    }
    return result;
  };
  const str = `${parseFloat(`${s}`.replace(/[^\d\.-]/g, "")).toFixed(2)}`;
  const len = str
    .split(".")[0]
    .split("")
    .reverse();
  const point = str.split(".")[1];
  const point2 = point == null ? "" : `.${point}`;
  let t = "";
  for (let i = 0; i < len.length; i += 1) {
    t +=
      len[i] +
      ((i + 1) % 3 === 0 && i + 1 !== len.length && len[i + 1] !== "-"
        ? ","
        : "");
  }
  return `${t
    .split("")
    .reverse()
    .join("")}${point2}`;
}

export function to<T, U = Error>(
  promise: Promise<T>,
  errorExt?: object
): Promise<[U | null, T | undefined]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        Object.assign(err, errorExt);
      }

      return [err, undefined];
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
    complete: complete
  });
}

export function changeTimeBySecond(second: number) {
  let hourTime = 0;
  let minuteTime = 0;
  let secondTime = 0;
  if (second > 60) {
    //如果秒数大于60
    minuteTime = Math.floor(second / 60);
    secondTime = Math.floor(second % 60);
    if (minuteTime >= 60) {
      //如果分钟大于60
      hourTime = Math.floor(minuteTime / 60);
      minuteTime = Math.floor(minuteTime % 60);
    } else {
      hourTime = 0;
    }
  } else {
    hourTime = 0;
    minuteTime = 0;
    if (second == 60) {
      //如果秒数等于60
      minuteTime = 1;
      secondTime = 0;
    } else {
      secondTime = second;
    }
  }
  const timeResult =
    (hourTime > 0 ? addZero(hourTime) + "" + ":" : "") +
    addZero(minuteTime) +
    ":" +
    addZero(secondTime);
  return timeResult;
}
function addZero(time: number) {
  let str = time + "";
  if (time < 10) {
    str = "0" + time;
  }
  return str;
}

export function timeAgo(time: number) {
  if (!time) return "";
  const newDate = new Date();
  const thisDate = new Date(time);
  const newTime = Math.floor(newDate.getTime() / 1000);
  const thisTime = Math.floor(thisDate.getTime() / 1000);
  const diff = newTime - thisTime;
  const year = thisDate.getFullYear();
  let month: any = thisDate.getMonth() + 1;
  month = month > 9 ? month : `0${month}`;
  let day: any = thisDate.getDate();
  day = day > 9 ? day : `0${day}`;
  if (diff > 24 * 60 * 60) {
    if (newDate.getFullYear() === year) {
      return `${month}-${day}`;
    }
    return `${year}-${month}-${day}`;
  } else {
    const hour = Math.floor(diff / 60 / 60);
    if (hour > 0) {
      return `${hour} 小时前`;
    }
    const minute = Math.floor(diff / 60);
    if (minute > 0) {
      return `${minute} 分钟前`;
    }
    if (diff > 0) {
      return `${diff} 秒前`;
    }
  }
}

const aCity: any = {
  11: "北京",
  12: "天津",
  13: "河北",
  14: "山西",
  15: "内蒙古",
  21: "辽宁",
  22: "吉林",
  23: "黑龙江",
  31: "上海",
  32: "江苏",
  33: "浙江",
  34: "安徽",
  35: "福建",
  36: "江西",
  37: "山东",
  41: "河南",
  42: "湖北",
  43: "湖南",
  44: "广东",
  45: "广西",
  46: "海南",
  50: "重庆",
  51: "四川",
  52: "贵州",
  53: "云南",
  54: "西藏",
  61: "陕西",
  62: "甘肃",
  63: "青海",
  64: "宁夏",
  65: "新疆",
  71: "台湾",
  81: "香港",
  82: "澳门",
  91: "国外"
};
export function isCardID(sId: string) {
  console.log(sId);
  let iSum = 0;
  let info = "";
  let sBirthday = "";
  if (!sId) return "请输入身份证";
  if (!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误";
  sId = sId.replace(/x$/i, "a");
  if (aCity[parseInt(sId.substr(0, 2))] == null) return "你的身份证地区非法";
  sBirthday =
    sId.substr(6, 4) +
    "-" +
    Number(sId.substr(10, 2)) +
    "-" +
    Number(sId.substr(12, 2));
  let d = new Date(sBirthday.replace(/-/g, "/"));
  if (
    sBirthday !=
    d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
  )
    return "身份证上的出生日期非法";
  for (let i = 17; i >= 0; i--)
    iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
  if (iSum % 11 != 1) return "你输入的身份证号非法";
  //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
  return true;
}
//正则表达式获取正确得url
export function getUrl(url: string) {
  let reg = /(https|http).*?(?=\?)/gi;
  let test = url.match(reg);
  if (!test) return url;
  else return test[0];
}
//获取本年的最后一天
export function lastDay() {
  let date = new Date();
  date.setFullYear(date.getFullYear() + 1); // 设置到明年
  date.setMonth(0); // 明年的0月，也就是对应到1月，是存在的哦，不是不存在的0
  date.setDate(0);
  return date;
}
