import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import axios from 'axios'

import { VitePluginSitemap } from '@tormak/vite-plugin-sitemap';

const routes = [
  {
    path: '/',
    name: 'App'

  },
  {
    path: '/home',
    name: 'Home',
  },
  {
    path: '/blog',
    name: 'Blogs',
  },
  {
    path: '/help',
    name: 'FAQ',
  },
  {
    path: '/terms-of-service',
    name: 'Terms-Of-Service',
  },
  // listings
  {
    path: '/listings/search',
    name: 'Listings-search',
  },
  {
    path: '/account/IBO/category',
    name: 'IBO_ChooseCategory',
  },
];

const DEFAULT_OPTIONS_IMAGE_COMPRESSOR = {
  test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
  exclude: undefined,
  include: undefined,
  includePublic: true,
  logStats: true,
  ansiColors: true,
  svg: {
    multipass: true,
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            cleanupNumericValues: false,
            removeViewBox: false, // https://github.com/svg/svgo/issues/1128
          },
          cleanupIDs: {
            minify: false,
            remove: false,
          },
          convertPathData: false,
        },
      },
      'sortAttrs',
      {
        name: 'addAttributesToSVGElement',
        params: {
          attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
        },
      },
    ],
  },
  png: {
    // https://sharp.pixelplumbing.com/api-output#png
    quality: 100,
  },
  jpeg: {
    // https://sharp.pixelplumbing.com/api-output#jpeg
    quality: 100,
  },
  jpg: {
    // https://sharp.pixelplumbing.com/api-output#jpeg
    quality: 100,
  },
  tiff: {
    // https://sharp.pixelplumbing.com/api-output#tiff
    quality: 100,
  },
  // gif does not support lossless compression
  // https://sharp.pixelplumbing.com/api-output#gif
  gif: {},
  webp: {
    // https://sharp.pixelplumbing.com/api-output#webp
    lossless: true,
  },
  avif: {
    // https://sharp.pixelplumbing.com/api-output#avif
    lossless: true,
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePluginSitemap({
      baseUrl: 'https://habeep.org',
      contentBase: './',
      routes: routes,
      urlGenHook: async (config) => {
        let updatedRoutes = config.routes;

        try {
          // get products seo routes
          let productsLinks = []
          const fetch = await axios.get('https://backend-api.habeep.org/backend/api/v1/seo/products')
          productsLinks = fetch.data.data
          productsLinks.forEach(product => {
            updatedRoutes.push({
              path: '/listings/products/' + product,
              name: 'product - ' + product
            })
          });

          // get users seo routes
          let usersLinks = []
          const fetchUsers = await axios.get('https://backend-api.habeep.org/backend/api/v1/seo/users')
          usersLinks = fetchUsers.data.data
          usersLinks.forEach(username => {
            updatedRoutes.push({
              path: '/' + username,
              name: username + ' Profile'
            })
          });

          // get blogs seo routes
          let blogsLinks = []
          const fetchBlogs = await axios.get('https://backend-api.habeep.org/backend/api/v1/seo/blogs')
          blogsLinks = fetchBlogs.data.data
          blogsLinks.forEach(blog => {
            updatedRoutes.push({
              path: '/blog/' + blog,
              name: blog + ' Page'
            })
          });
        } catch (error) {
          console.log(error)
        }


        return updatedRoutes;
      }
    }),
    loadEnv('staging', './',),
    ViteImageOptimizer(DEFAULT_OPTIONS_IMAGE_COMPRESSOR),
  ]
})