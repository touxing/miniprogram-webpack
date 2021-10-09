// 使用方法为：
// 把该文件复制到要修改文件名的目录下；
// 然后打开node.js执行node changeName.js命令；
// 修改完成！
// 可以在下面注释的地方自定义修改的逻辑；

var fs = require('fs')
var path = require('path')
//解析需要遍历的文件夹
var filePath = path.resolve('./src')

//调用文件遍历方法
fileDisplay(filePath)

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath) {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err)
    } else {
      //遍历读取到的文件列表
      files.forEach(function (filename) {
        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename)
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, function (eror, stats) {
          if (eror) {
            console.warn('获取文件stats失败')
          } else {
            var isFile = stats.isFile() //是文件
            var isDir = stats.isDirectory() //是文件夹
            if (isFile) {
              // console.log(`🚀 ~ file: rename.js ~ line 37 ~ isFile`, path.extname(filedir))
              //这里请根据需要替换后缀名
              var suffix = path.extname(filedir)
              var fromSuffix = '.scss'
              var toSuffix = '.wxss'
              if (suffix.indexOf(fromSuffix) > -1 && !/node_modules|miniprogram_npm|styles/.test(filedir)) {
                filedir.replace(fromSuffix, toSuffix)
                rename(
                  filedir,
                  filedir.replace(fromSuffix, toSuffix, function () {}),
                )
              }
            }
            if (isDir) {
              fileDisplay(filedir) //递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        })
      })
    }
  })
}

// 修改文件名称
function rename(oldPath, newPath) {
  fs.rename(oldPath, newPath, function (err) {
    if (err) {
      throw err
    }
  })
}
