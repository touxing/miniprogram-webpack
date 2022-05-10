import gulp from 'gulp'
const { series, parallel, src, dest, lastRun, watch } = gulp
import imagemin from 'gulp-imagemin' // 图片压缩
import pngquant from 'imagemin-pngquant' // 深度压缩
import gifsicle from 'imagemin-gifsicle'
import mozjpeg from 'imagemin-mozjpeg'
import svgo from 'imagemin-svgo'
import cache from 'gulp-cache'
import gulpif from 'gulp-if'
import minimist from 'minimist'
const argv = minimist(process.argv.slice(2)) // 获取命令行输入参数 eg: --env=dev

const isProduction = argv.env === 'production' || process.env.NODE_ENV === 'production'
const BUILD_TYPE = argv.BUILD_TYPE || process.env.BUILD_TYPE

// 帮助信息
export function help(cb) {
  console.log('[imgCompress]  #压缩图片')
  console.log('[copyCloud]  #copy 云开发函数')
  console.log('[copy]  #copy image and cloud')
}

const srcPath = './src/**'
const distPath = `dist/${BUILD_TYPE}`
const wxmlFiles = [`${srcPath}/*.wxml`]
const wxssFiles = [`${srcPath}/*.wxss`]
const wxsFiles = [`${srcPath}/*.wxs`]
const jsFiles = [`${srcPath}/*.js`, `!${srcPath}/env/*.js`]
const jsonFiles = [`${srcPath}/*.json`]

// 压缩图片
export function imgCompress(cb) {
  let imageOption = imagemin(
    [
      gifsicle({ interlaced: true }),
      mozjpeg({ quality: 60 }),
      pngquant({ quality: [0.3, 0.5] }),
      svgo({
        plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
      }),
    ],
    {
      verbose: true,
    },
  )
  // 需要单独引入优化器
  src('src/**/*.{png,jpg,jpeg,gif,svg,webp}', { since: lastRun(imgCompress) })
    .pipe(gulpif(!isProduction, cache(imageOption), imageOption))
    .pipe(dest(distPath))

  cb()
}

export function copyFiles(cb) {
  src(['src/**/*.{wxml,wxss,json,wxs}', '!src/(env,lib,config)'], { since: lastRun(copyFiles) }).pipe(dest(distPath))

  cb()
}

export function copyCloud(cb) {
  let inputDir = 'cloudfunctions'
  src(`src/${inputDir}/**/*`).pipe(dest(`${distPath}/${inputDir}`))
  cb()
}

export function copyDev(cb) {
  let inputDir = 'cloudfunctions'
  watch([`src/${inputDir}/**/*`], function (cb1) {
    src(`src/${inputDir}/**/*`).pipe(dest(`${distPath}/${inputDir}`))
    cb1()
  })

  watch(['src/**/*.{wxml,wxss,json,wxs}', '!src/(env,lib,config)'], function (cb2) {
    src(['src/**/*.{wxml,wxss,json,wxs}', '!src/(env,lib,config)'], { since: lastRun(copyFiles) }).pipe(dest(distPath))
    cb2()
  })
  cb()
}

export const copy = parallel([imgCompress, copyCloud, copyFiles])

export const dev = parallel([imgCompress, copyDev])

export function clear(cb) {
  cache.clearAll()
  cb()
}

export default function defaultTask(cb) {
  help()
  cb()
}
