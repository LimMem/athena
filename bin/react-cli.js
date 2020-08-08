const fs = require("fs");
const path = require("path");
const color = require("colors-cli");
const {
  componentsWithName,
  pageWithName,
  modelFileWithName,
} = require("./tempate");
const { getCmdPath, isExistFileOrDir } = require("./tools");

let obj = {
  name: "",
  path: "./",
};

// 递归生成文件
const createFileWithList = (list = [], index, dirName) => {
  // 这里递归创建文件
  if (list.length <= index) {
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

module.exports = {
  // 创建函数式组件
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

    console.log(
      "\n\n🍻🍻🍻🍻",
      color.blue(obj.name),
      color.green(`已经成功添加到路径下`),
      color.blue(obj.path),
      "🍻🍻🍻🍻\n\n"
    );
  },

  createFunctionPageFile: (componentName, pathname) => {
    obj = {
      name: componentName || "",
      path: pathname || "./",
    };

    let modelsDir = getCmdPath("./models");
    let targetDir = getCmdPath("./pages");
    targetDir = path.join(targetDir, pathname);

    if (
      !isExistFileOrDir(getCmdPath("./"), "models") ||
      !isExistFileOrDir(getCmdPath("./"), "pages")
    ) {
      console.log(color.red(`你所在路径不对或者该工程并非alita工程`));
      return;
    }

    // 判断models中是否含有和组件名一样的文件  防止重复导致的覆盖问题
    if (isExistFileOrDir(modelsDir, componentName + ".ts")) {
      console.log(
        color.red(
          `所在路径下已经包含models/${componentName}.ts，请重新定义页面名称!!!!!! 请仔细检查`
        )
      );
      return;
    }

    // 判断models中是否含有和组件名一样的文件  防止重复导致的覆盖问题
    if (isExistFileOrDir(targetDir, componentName)) {
      console.log(
        color.red(
          `所在路径下已经包含${componentName}文件夹，请重新定义页面名称!!!!!! 请仔细检查`
        )
      );
      return;
    }

    // 如果不存在就创建pages下面的文件夹
    targetDir = path.join(targetDir, componentName);
    fs.mkdirSync(targetDir);

    // 创建pages文件
    const pagesList = pageWithName(componentName);
    createFileWithList(pagesList, 0, targetDir);

    // 创建models文件
    const modesList = modelFileWithName(componentName);
    createFileWithList(modesList, 0, modelsDir);

    console.log(
      "\n\n🍻🍻🍻🍻",
      color.blue(obj.name),
      color.green(`已经成功添加到路径下`),
      color.blue(obj.path),
      "🍻🍻🍻🍻\n\n"
    );
  },
};
