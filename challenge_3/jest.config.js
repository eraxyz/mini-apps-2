module.exports = {
  name: "client",
  displayName: "client",
  rootDir: "./",
  testMatch: ["<rootDir>/client/tests/scorecard.test.js"],
  setupFilesAfterEnv: ["<rootDir>enzymeConfig.js"]
};
