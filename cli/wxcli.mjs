#!/usr/bin/env zx
const path = require('path')
const figlet = require('figlet')
const inquirer = require('inquirer')

// $.shell = path.resolve('C:/Windows/system32/cmd')

const commandMap = {
  build: '打包',
  preview: '预览',
  upload: '上传',
}
const envMap = {
  production: '生产',
  test: '测试',
}

const resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}

const askQuestions = () => {
  const questions = [
    {
      type: 'rawlist',
      name: 'Command',
      message: '请选择执行',
      choices: [commandMap.build, commandMap.preview, commandMap.upload],
      default: commandMap.preview,
    },
    {
      type: 'rawlist',
      name: 'Env',
      message: '请选择环境',
      choices: [envMap.production, envMap.test],
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
      message: '请输入版本号（eg: 2.0.1）',
      default: '2.0.1',
    },
    {
      type: 'input',
      name: 'Desc',
      message: '请输入项目备注',
      default: 'time:' + Date.now(),
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

const build = async () => {
  await $`yarn build`
}
const preview = async output => {
  let cmd = `cli preview --project ${output}`
  await $`echo ${cmd}`
}
const upload = async (output, version, desc) => {
  let cmd = `cli upload -v ${version} -d ${desc} --project ${output}`.replace(/\$/g, '')
  await $`echo ${cmd}`
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
  }
  switch (Command) {
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
