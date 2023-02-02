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
    extend: {
        fontSize:{
            'title': '3.25rem',
            'logo': '2.5rem',
        },
        backgroundImage: {
            'loading': 'linear-gradient(0deg, rgba(92,122,201,0.14) 59%, rgba(95,133,204,0.13) 60%, rgba(105,185,220,0.06) 67%, rgba(84,151,188,0.14) 76%, rgba(52,135,167,0.13) 100%);'
        }
    }
  },
}
