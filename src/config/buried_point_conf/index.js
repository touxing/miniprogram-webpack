const webpackContext = require.context('./point', true, /\.js$/)
const files = webpackContext.keys().map((item) => webpackContext(item).default)

export const tracks = files
