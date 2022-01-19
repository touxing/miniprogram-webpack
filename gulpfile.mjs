import gulp from 'gulp'
const { series, parallel, src, dest } = gulp
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
// 帮助信息
export function help(cb) {
  console.log('[imgCompress]  #压缩图片')
}

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
  src('src/**/*.{png,jpg,jpeg,gif,svg,webp}')
    .pipe(gulpif(!isProduction, cache(imageOption), imageOption))
    .pipe(dest(`dist/${BUILD_TYPE}`))

  cb()
}

export function clear(cb) {
  cache.clearAll()
  cb()
}

export default function defaultTask(cb) {
  help()
  cb()
}
