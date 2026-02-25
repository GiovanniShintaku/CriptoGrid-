module.exports = {
  preset: "jest-expo",
  testEnvironment: "jsdom",

  transformIgnorePatterns: [
    "node_modules/(?!react-native|expo|@expo|@react-native|@react-navigation)"
  ],

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/Testes/mocks/styleMock.js",
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/Testes/mocks/fileMock.js",

    "@react-navigation/native$":
      "<rootDir>/Testes/mocks/@react-navigation/native.js",

    "@react-navigation/native-stack$":
      "<rootDir>/Testes/mocks/@react-navigation/native-stack.js"
  },

  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"]
};