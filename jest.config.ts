module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  setupFilesAfterEnv: ["ts-node/register"],
  setupFiles: ["./src/setupTests.js"],
  presets: ["@babel/preset-env", "@babel/preset-react"],
};
