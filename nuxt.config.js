module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Quận đoàn 9',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '{{escape description }}' }
    ],
    link: [
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons', crossorigin: "anonymous"}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    babel: {
      presets: [
        [
          'env', {
            modules: false,
            targets: {
              browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
            }
          }
        ],
        'stage-2'
      ],
      plugins: ['transform-runtime'],
      env: {
        test: {
          presets: ['env', 'stage-2'],
          plugins: ['istanbul']
        }
      }
    },
    vendor: ['vuetify'],
    extractCSS: true,
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    router: {
      middleware: ['auth']
    }
  },
  plugins: [
    '~/plugins/filters',
    '~/plugins/vuetify',
    '~/plugins/vee-validate',
    // '~/plugins/vueditor',
    '~/plugins/directives',
    // '~/plugins/vue-js-modal',
    { src: '~/plugins/vue-google-maps', ssr: false},
    { src: '~plugins/vue-star-rating', ssr: false },
    { src: '~plugins/vue-circle-progress', ssr: false }
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/proxy',
    '@nuxtjs/dotenv',
    '@nuxtjs/toast'
  ],
  axios: {
    // baseURL: 'http://18.224.193.143:8080/',
    baseURL: 'http://localhost:8080',
    prefix: `/`,
    credentials: false,
    proxyHeaders: false,
    debug: true,
    retry: {
      retries: 3
    }
  },  
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'token' },
          logout: { url: '/logout', method: 'post' },
          user: false
        },
        // tokenRequired: true,
        // tokenType: 'bearer',
      }
    },
    redirect: {
      login: '/account/login',
      logout: '/account/login',
      home: '/',
      callback: false
    }
  }  
}

