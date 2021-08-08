import colors from 'vuetify/es5/util/colors'
import path from 'path'
import fs from 'fs'
const env = process.env.NODE_ENV;
const envFile = '.env'
require('dotenv').config({
  path: path.resolve(process.cwd(), envFile)
}).parsed;

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - helpdesk-user',
    title: 'helpdesk-user',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/date-fns',
    ['@nuxtjs/dotenv', { filename: '.env' }],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/auth',
    '@nuxtjs/proxy',
    '@nuxtjs/axios',
    'nuxt-i18n'
  ],

  i18n: {
    locales: [
      {
        code: 'th',
        name: 'ไทย'
      },
      {
        code: 'en',
        name: 'English'
      },
    ],

    strategy: 'prefix_and_default',
    defaultLocale: 'th',
    vueI18n: {
      fallbackLocale: 'th',
      messages: {
        th: require('./assets/lang/th.json'),
        en: require('./assets/lang/en.json')
      }
    }
  },
  auth: {
    redirect: {
      login: false,
      logout: false,
      callback: false,
      home: false
    },
    localStorage: {
      prefix: 'auth.'
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: process.env.API_URL + '/AuthManagement/Login',
            method: 'post',
            propertyName: 'token'
          },
          logout: false,
          user: { url: process.env.API_URL + '/Profile/Userinfo', method: 'get', propertyName: 'data' }
        },
        tokenRequired: true,
        tokenType: 'bearer',
        globalToken: true,
        autoFetchUser: true
      }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxyHeaders: false,
    credentials: false,
    proxy: true
  },

  proxy: {
    '/api/': { target: process.env.PROXY_API_URL }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {icons: 'fa'},
    theme: {
      // dark: true,
      light: true,
      themes: {
        dark: {
          primary: colors.blue.darken1,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: '#18315A',
          accent: '#E91E63',
          secondary: '#9C27b0',
          info: '#00CAE3',
          warning: '#FB8C00',
          error: '#FF5252',
          success: '#4CAF50',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
}
