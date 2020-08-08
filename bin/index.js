#!/usr/bin/env node

const { program } = require("commander");
const color = require("colors-cli");
const {
  createFunctionComFile,
  createFunctionPageFile,
} = require("./react-cli");
// inquirer   交互式访问

/**
 * 命令有误 退出命令行
 */
const exitCommander = () => {
  console.error(color.red("命令号输入有误, 命令号暂时仅仅支持： "));
  console.log(color.red("creact -v"));
  console.log(
    color.red(
      "creact add <c | com | comp | component | components> <name> [path]]"
    )
  );
  process.exit();
};

/**
 * 是否是创建函数式组件
 * @param {*} command
 * @param {*} type
 */
const isAddReactComponents = (command, type) => {
  if (command === "add") {
    if (["component", "components", "c", "com", "comp"].indexOf(type) !== -1) {
      return true;
    }
  }
  return false;
};

const isAddReactPage = (command, type) => {
  if (command === "add") {
    if (["page", "pages", "p"].indexOf(type) !== -1) {
      return true;
    }
  }
  return false;
};

/**
 * 执行命令行逻辑 并转发调用对应方法
 * @param {*} command
 * @param {*} type
 * @param {*} componentName
 * @param {*} path
 */
const commanderAction = (command, type, componentName, path = "./") => {
  if (isAddReactComponents(command, type)) {
    createFunctionComFile(componentName, path);
  } else if (isAddReactPage(command, type)) {
    // 添加react函数式组件
    createFunctionPageFile(componentName, path);
  } else {
    exitCommander();
  }
};

/* 必选参数  alita框架名称 type组件/还是页面 */
program
  .version("1.1.0", "-v --version -V")
  .arguments("<command> <type> <componentName> [path]")
  .action(commanderAction)
  .parse(process.argv);
