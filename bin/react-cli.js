const fs = require("fs");
const path = require("path");
const color = require("colors-cli");
const { componentsWithName } = require("./tempate");
const { getCmdPath, isExistFileOrDir } = require("./tools");

let obj = {
  name: "",
  path: "./",
};

// 递归生成文件
const createFileWithList = (list = [], index, dirName) => {
  // 这里递归创建文件
  if (list.length <= index) {
    console.log(
      "\n\n🍻🍻🍻🍻",
      color.blue(obj.name),
      color.green(`已经成功添加到路径下`),
      color.blue(obj.path),
      "🍻🍻🍻🍻\n\n"
    );
    return;
  }

  fs.writeFile(
    path.join(dirName, list[index].name),
    list[index].temp,
    (err) => {
      if (err) {
        console.log(color.red(err));
        return;
      }
      createFileWithList(list, index + 1, dirName);
    }
  );
};

// 创建函数式组件
module.exports = {
  createFunctionComFile: (componentName, pathname) => {
    obj = {
      name: componentName || "",
      path: pathname || "./",
    };
    let dirName = getCmdPath(pathname);
    if (isExistFileOrDir(dirName, componentName)) {
      console.log(
        color.red(
          `所在路径下已经包含${componentName}文件夹，请重新定义组件名称!!!!!! 请仔细检查`
        )
      );
      return;
    }
    // 如果不存在就创建文件夹
    dirName = path.join(dirName, componentName);
    fs.mkdirSync(dirName);

    const componentsList = componentsWithName(componentName);
    createFileWithList(componentsList, 0, dirName);
  },
};
