module.exports = {
  verbose: true,
  moduleNameMapper: {
    '@tarojs/components': '@tarojs/components/dist-h5/react'
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.esm.js?$': 'ts-jest',
  },
  rootDir: __dirname,
  setupFiles: ['<rootDir>/test/config/Enzyme.ts'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!@taro)', '^.+\\.(css|sass|scss|less)$'],
};
