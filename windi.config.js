export default {
  prefixer: false,
  extract: {
    // 忽略部分文件夹
    exclude: ['node_modules', '.git', 'dist']
  },
  corePlugins: {
    // 禁用掉在小程序环境中不可能用到的 plugins
    container: false
  },
  theme: {
    textColor: {
      primary: '#34A853',
      white: '#FFFFFF'
    },
    backgroundColor: theme => ({
        ...theme('colors'),
        primary: '#34A853',
        secondary: '#A5D1D4'
    }),
  },
}
