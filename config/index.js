const path = require("path");
const { UnifiedWebpackPluginV5 } = require("weapp-tailwindcss/webpack");
const config = {
  projectName: "taro-template",
  date: "2021-4-25",
  designWidth(input) {
    // 配置 NutUI 375 尺寸
    if (input?.file?.replace(/\\+/g, "/").indexOf("@nutui") > -1) {
      return 375;
    }
    // 全局使用 Taro 默认的 750 尺寸
    return 750;
  },
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1,
  },
  // 自定义编译工具，可选 'Webpack4' 或 'Webpack5'
  compiler: {
    type: "webpack5",
    // 依赖预编译配置
    prebundle: {
      enable: false,
    },
  },
  // 持久化缓存配置
  cache: {
    enable: false,
  },
  sourceRoot: "src",
  outputRoot: "dist",
  plugins: [
    ["@tarojs/plugin-framework-react", { reactMode: "concurrent" }],
    "@tarojs/plugin-html",
  ],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: "react",
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
      htmltransform: {
        enable: true,
        // 设置成 false 表示 不去除 * 相关的选择器区块
        // 假如开启这个配置，它会把 tailwindcss 整个 css var 的区域块直接去除掉
        config: {
          removeCursorStyle: false,
        },
      },
    },
    miniCssExtractPluginOption: {
      ignoreOrder: true,
    },
    optimizeMainPackage: {
      enable: true,
    },
    webpackChain(chain, webpack) {
      chain.merge({
        plugin: {
          install: {
            plugin: UnifiedWebpackPluginV5,
            args: [
              {
                appType: "taro",
              },
            ],
          },
        },
      });
    },
  },
  sass: {
    resource: [
      path.resolve(__dirname, "..", "src/shared/assets/style/base.scss"),
    ],
  },
  alias: {
    "@shared": path.resolve(__dirname, "..", "src/shared"),
  },
  h5: {
    esnextModules: ["taro-ui"],
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
