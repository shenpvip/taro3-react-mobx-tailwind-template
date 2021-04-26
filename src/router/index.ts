import {
  navigateTo as _navigateTo,
  redirectTo as _redirectTo,
  switchTab as _switchTab,
  navigateBack,
  reLaunch as _reLaunch,
  getCurrentPages,
  useRouter
} from "@tarojs/taro";

function switchTab(url: string) {
  const newUrl = createUrl(url);
  return _switchTab({
    url: newUrl
  });
}
function reLaunch(url: string, param?: {}) {
  const newUrl = createUrl(url, param);
  return _reLaunch({
    url: newUrl
  });
}
function createUrl(url: string, param?: {}): string {
  const newUrl = `/${url}/index`;
  if (param) {
    return `${newUrl}?routerQuery=${encodeURIComponent(JSON.stringify(param))}`;
  }
  return newUrl;
}
/**
 * @fn navigateTo 需要跳转的应用内非 tabBar 的页面的路径
 * @url 路由url
 * @param 路由参数
 */
function navigateTo(url: string, param?: {}) {
  const newUrl = createUrl(url, param);
  return _navigateTo({
    url: newUrl
  });
}
function redirectTo(url: string, param?: {}) {
  const newUrl = createUrl(url, param);
  return _redirectTo({
    url: newUrl
  });
}
function serialize(data: any) {
  if ("routerQuery" in data) {
    return JSON.parse(decodeURIComponent(data.routerQuery));
  }
  return data;
}

export {
  navigateTo,
  redirectTo,
  serialize,
  switchTab,
  navigateBack,
  reLaunch,
  getCurrentPages,
  useRouter
};
