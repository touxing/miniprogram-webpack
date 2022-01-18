#!/usr/bin/env node
const path = require('path')
const chalk = require('chalk')
const figlet = require('figlet')
const inquirer = require('inquirer')
const shelljs = require('shelljs')

const commandMap = {
  open: '打开小程序',
  build: '打包',
  preview: '预览',
  upload: '上传',
}
const envMap = {
  production: '生产',
  test: '测试',
  dev: '开发',
}

const resolve = dir => {
  return path.join(__dirname, '..', dir)
}

const askQuestions = () => {
  const questions = [
    {
      type: 'rawlist',
      name: 'Command',
      message: '请选择执行',
      choices: [commandMap.open, commandMap.build, commandMap.preview, commandMap.upload],
      default: commandMap.open,
    },
    {
      type: 'rawlist',
      name: 'Env',
      message: '请选择环境',
      choices: [envMap.production, envMap.test, envMap.dev],
      default: envMap.production,
    },
  ]
  return inquirer.prompt(questions)
}

const askQuestions2 = () => {
  const questions = [
    {
      type: 'input',
      name: 'Version',
      message: '请输入版本号(eg: 2.0.1)',
      default: '2.0.1',
    },
    {
      type: 'input',
      name: 'Desc',
      message: '请输入项目备注',
      default: 'timestamp:' + Date.now(),
    },
  ]
  return inquirer.prompt(questions)
}

const init = () => {
  console.log(
    chalk.bold.green(
      figlet.textSync('MINIAPP CLI', {
        horizontalLayout: 'default',
        verticalLayout: 'default',
      }),
    ),
  )
}

const open = output => {
  shelljs.exec(`cli open --project ${output}`)
}
const build = () => {
  shelljs.exec(`yarn build`)
}
const preview = output => {
  let cmd = `cli preview --qr-size small --project ${output}`
  console.log(chalk.bold.green(cmd))
  shelljs.exec(cmd)
}
const upload = (output, version, desc) => {
  let cmd = `cli upload -v ${version} -d "${desc}" --project ${output}`.replace(/\$/g, '')
  console.log(chalk.bold.green(cmd))
  shelljs.exec(cmd)
}

const run = async () => {
  init()
  const answers = await askQuestions()
  const { Command, Env } = answers

  let output = ''
  switch (Env) {
    case envMap.production:
      output = resolve('./dist/prod')
      break
    case envMap.test:
      output = resolve('./dist/test')
      break
    case envMap.dev:
      output = resolve('./dist/dev')
      break
  }
  switch (Command) {
    case commandMap.open:
      open(output)
      break
    case commandMap.build:
      build()
      break
    case commandMap.preview:
      preview(output)
      break
    case commandMap.upload:
      const { Version, Desc } = await askQuestions2()
      upload(output, Version, Desc)
      break
    default:
      break
  }
}

run()
