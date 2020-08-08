#!/usr/bin/env node

const { program } = require("commander");
const color = require("colors-cli");
const path = require("path");
const fs = require("fs");
const { getCmdPath, isExistFileOrDir } = require("./tools");
const { componentsWithName } = require("./tempate");
// inquirer   交互式访问

const obj = {
  path: "./",
  name: "",
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

const createComFile = async (componentName, pathname) => {
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
};

/* 必选参数  alita框架名称 type组件/还是页面 */
program
  .version("1.0.5", "-v --version -V")
  .arguments("<command> <type> <componentName> [path]")
  .action(function (command, type, componentName, path) {
    obj.name = componentName;
    obj.path = path || "./";
    if (command === "install") {
      if (
        ["component", "components", "c", "com", "comp"].indexOf(type) !== -1
      ) {
        // 在alita框架中创建path;
        createComFile(componentName, path);
        return;
      }
    }

    console.error(color.red("命令号输入有误, 命令号暂时仅仅支持： "));
    console.log(color.red("lim -v"));
    console.log(
      color.red(
        "lim <install> <c | com | comp | component | components> <name> [path]]"
      )
    );
    process.exit();
  })
  .parse(process.argv);
