const pkg = require('./package');
import {build_sitemaps} from './utility/SitemapGenerator';

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'الشيخ عبدالله بن زيد آل محمود الشريف',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=no, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || 'الشيخ عبدالله بن زيد آل محمود الشريف' },
      {hid: 'distribution', name: 'distribution', content: 'global'},
      {content: 'Media Website', property: 'og:type'},
      {content: 'https://ibn-mahmoud.com/favicon/apple-icon-114x114.png', property: 'og:image'},
      {name: "twitter:image", content: 'https://ibn-mahmoud.com/favicon/apple-icon-114x114.png'},
      {name: "twitter:card", content: 'الشيخ عبدالله بن زيد آل محمود الشريف'},
      {name: "twitter:site", content: '@Ibn_Mahmoud'},
      {name: "twitter:creator", content: '@' + pkg.author}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/uploads/favicon/favicon.png' },
      {
        size: '144x144',
        type: 'apple-touch-icon-precomposed',
        href: '/uploads/favicon/apple-touch-icon-144x144-precomposed.png'
      },
      {
        size: '72x72',
        type: 'apple-touch-icon-precomposed',
        href: '/uploads/favicon/apple-touch-icon-72x72-precomposed.png'
      },
      {
        type: 'apple-touch-icon-precomposed',
        href: '/uploads/favicon/apple-touch-icon-120x120-precomposed.png'
      },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700'},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Cairo:400,700&amp;subset=arabic'},
      { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'},
      { rel: 'stylesheet', href: '/assets/fonts/icons/icons.css'},
      { rel: 'stylesheet', href: '/assets/css/style.css'},
      { rel: 'stylesheet', href: '/assets/css/custom.css'},
    ],
    script: [
      { src: 'https://code.jquery.com/jquery-2.2.4.min.js', type: 'text/javascript'},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js', type: 'text/javascript'},
      { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js', type: 'text/javascript'},
      { src: 'https://cdn.jsdelivr.net/npm/hc-offcanvas-nav@3.4.0/dist/hc-offcanvas-nav.min.js', type: 'text/javascript'},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.4.6/js/swiper.min.js', type: 'text/javascript'},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.6/jquery.fancybox.min.js', type: 'text/javascript'},
      { src: '/assets/js/custom.js', type: 'text/javascript'},
      { src: '/assets/js/jwplayer/jwplayer.js', type: 'text/javascript'},
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {
      src: '@/plugins/pagination.js',
      ssr: false
    },
    {
      src: '@/plugins/toast.js',
      ssr: false
    },
    {
      src: '@/plugins/htmlToPaper.js',
      ssr: false
    },
    {
      src: '~/plugins/utility.js'
    },
    {
      src: '~/plugins/jsonld'
    },
    {
      src: '@/plugins/infiniteloading.js',
      ssr: false
    }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/pwa',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    'nuxt-winston-log',
    'vue-social-sharing/nuxt',
    'nuxt-i18n',
    '@nuxtjs/sitemap'
  ],

  i18n: {
    baseUrl: 'http://ibn-mahmoud.com/',
    // seo: true,
    locales: [
      {
        name: 'Arabic',
        code: 'ar',
        iso: 'ar'
      }
    ],
  //  strategy: 'prefix',
    defaultLocale: 'ar',
    detectBrowserLanguage: false,
    vueI18n: {
      fallbackLocale: 'ar',
      messages: {
        ar: require('./locales/ar.json')
      }
    }
  },

  sitemap: async function() {
    let sitemaps = await build_sitemaps();
    return {
      path: '/sitemapindex.xml',
      hostname: 'https://ibn-mahmoud.com',
      sitemaps: sitemaps
    }
  },

  pwa: {
    meta: {
      mobileAppIOS: true,
      appleStatusBarStyle: 'black',
      nativeUI: true
    },
    manifest: {
      name: 'ابن محمود',
      short_name: 'ابن محمود',
      lang: 'ar',
      theme_color: "#0ca2ba",
      background_color: "#0ca2ba",
      display: 'minimal-ui',
      start_url: '/'
    },
    icon: {
      fileName: 'icon.png'
    },
    workbox: {
      cleanupOutdatedCaches: true,
      cacheAssets: true,
      runtimeCaching: [
       /* {
          urlPattern: '_nuxt/icons/.*',
          handler: 'cacheFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },*/
        {
          urlPattern: 'uploads/.*',
          handler: 'cacheFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: 'assets/.*',
          handler: 'cacheFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: 'http://jwpltx.com/v1/jwplayer6/.*',
          handler: 'cacheFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: process.env.API_URL+'/dashboard-contents',
          handler: 'NetworkFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: process.env.API_URL+'/list-books',
          handler: 'NetworkFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: process.env.API_URL+'/settings',
          handler: 'NetworkFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: process.env.API_URL+'/gallery',
          handler: 'NetworkFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: process.env.API_URL+'/gallery-id?.*',
          handler: 'NetworkFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: process.env.API_URL+'/books',
          handler: 'NetworkFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: process.env.API_URL+'/book-index-list?.*',
          handler: 'NetworkFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: process.env.API_URL+'/book-content-by-id?.*',
          handler: 'NetworkFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: process.env.API_URL+'/all-fatawas',
          handler: 'NetworkFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: process.env.API_URL+'/fatawas?.*',
          handler: 'NetworkFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: process.env.API_URL+'/fatawa/.*',
          handler: 'NetworkFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: process.env.API_URL+'/articles/categories',
          handler: 'NetworkFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: process.env.API_URL+'/articles?.*',
          handler: 'NetworkFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: process.env.API_URL+'/single-post/.*',
          handler: 'NetworkFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: process.env.API_URL+'/sounds-category',
          handler: 'NetworkFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: process.env.API_URL+'/sounds?.*',
          handler: 'NetworkFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: process.env.API_URL+'/audio-id?.*',
          handler: 'NetworkFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: process.env.API_URL+'/videos?.*',
          handler: 'NetworkFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: process.env.API_URL+'/video-id?.*',
          handler: 'NetworkFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: process.env.API_URL+'/mini-clip?.*',
          handler: 'NetworkFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: process.env.API_URL+'/abstracts?.*',
          handler: 'NetworkFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: process.env.API_URL+'/single-abstract/.*',
          handler: 'NetworkFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        }
      ]
    }
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    prefix: process.env.API_URL
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
  },

  server: {
    port: process.env.APP_PORT || 3000,
    host: '0.0.0.0'
  }
}
