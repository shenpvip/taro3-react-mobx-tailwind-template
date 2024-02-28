import {
  navigateTo as _navigateTo,
  redirectTo as _redirectTo,
  switchTab as _switchTab,
  reLaunch as _reLaunch,
  navigateBack as _navigateBack,
  getCurrentPages,
} from "@tarojs/taro";

class Router {
  createUrl(url: string, param?: {}): string {
    const newUrl = `${url}`;
    if (param) {
      return `${newUrl}?routerQuery=${encodeURIComponent(
        JSON.stringify(param)
      )}`;
    }
    return newUrl;
  }
  switchTab(url: string) {
    const newUrl = this.createUrl(url);
    return _switchTab({
      url: newUrl,
    });
  }
  reLaunch(url: string, param?: {}) {
    const newUrl = this.createUrl(url, param);
    return _reLaunch({
      url: newUrl,
    });
  }
  /**
   * @fn navigateTo 需要跳转的应用内非 tabBar 的页面的路径
   * @url 路由url
   * @param 路由参数
   */
  navigateTo(url: string, param?: {}) {
    const newUrl = this.createUrl(url, param);
    return _navigateTo({
      url: newUrl,
    });
  }
  redirectTo(url: string, param?: {}) {
    const newUrl = this.createUrl(url, param);
    return _redirectTo({
      url: newUrl,
    });
  }
  serialize(data: any) {
    if ("routerQuery" in data) {
      return JSON.parse(decodeURIComponent(data.routerQuery));
    }
    return data;
  }

  navigateBack() {
    const curPages = getCurrentPages();
    if (curPages.length <= 1) {
      console.error("已无上层页面，无法返回");
      return;
    }
    _navigateBack();
  }
}

export default new Router();
