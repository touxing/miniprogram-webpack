const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const figlet = require('figlet');
const templatePath = './cli/template';
const filePath = './src';
const fileType = ['.wxml', '.js', '.json', '.scss'];
const encoding = 'utf-8';
const init = () => {
	console.log(
		chalk.bold.green(
			figlet.textSync('MINIAPP CLI', {
				horizontalLayout: 'default',
				verticalLayout: 'default'
			})
		)
	);
};

const askQuestions = () => {
	const questions = [
		{
			type: 'list',
			name: 'Create',
			message: '请选择要创建的类型',
			choices: ['页面', '组件',  '自定义模板']
		},
		{
			type: 'input',
			name: 'Input',
			message: '请输入文件路径和名称（相对src路径：例如 pages/demo）'
		}
	];
	return inquirer.prompt(questions);
};

// 递归创建目录
const mkdir = (dirname, callback) => {
  if(fs.existsSync(dirname)) {
    callback()
  } else {
    mkdir(path.dirname(dirname), function() {
      fs.mkdir(dirname, callback)
    })
  }
}
const rsyncData = async (Type, Input, template) => {
	mkdir(`${filePath}/${Input}`, (err) => {
		if (err) {
			console.log(chalk.red(`创建组件失败 --- ${filePath}/${Input}`));
			return;
		}
		console.log(chalk.green(`${filePath}/${Input}文件夹创建成功`));
		fileType.map((item) => {
			fs.readFile(`${templatePath}/${template}/${template}${item}`, { encoding }, function (
				err,
				msg
			) {
        let fileName = path.basename(Input)
				fs.writeFile(
					`${filePath}/${Input}/${fileName}${item}`,
					msg,
					encoding,
					function (error) {
						if (error) {
							console.log(error);
							return false;
						}
						console.log(
							chalk.green(`${filePath}/${Input}/${Input}${item}创建成功`)
						);
					}
				);
			});
		});
	});
};

const run = async () => {
	init();
	const answers = await askQuestions();
	const { Create, Input } = answers;
	let Type;
  let template = '';
	switch (Create) {
		case '页面':
			Type = 'pages';
      template = 'pages';
			break;
		case '组件':
			Type = 'components';
      template = 'components';
			break;
		case '自定义模板':
			Type = 'pages';
      template = 'bodyCardPage';
			break;
	}
	await rsyncData(Type, Input, template);
};

run();
