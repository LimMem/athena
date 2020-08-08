const fs = require("fs");
const path = require("path");

module.exports = {
  path: "",
  name: "",
  // 首字符大写
  capitalizedString: (str = "") => {
    if (!str) {
      return "";
    }
    return str.replace(str[0], str[0].toUpperCase());
  },
  // 首字符小写
  lowCapitalizedString: (str = "") => {
    if (!str) {
      return "";
    }
    return str.replace(str[0], str[0].toLowerCase());
  },

  // 获取终端绝对路径
  getCmdPath: (pathname) => {
    let dirName = process.cwd();
    if (pathname) {
      dirName = path.join(dirName, pathname);
    }
    return dirName;
  },

  // 判断路径是否存在
  isExistFileOrDir(dirName, componentName) {
    const files = fs.readdirSync(dirName);
    const isExist = files.indexOf(componentName) !== -1;
    return isExist;
  },
};
