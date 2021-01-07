module.exports = {
  siteMetadata: {
    title: 'Gatsby matchMedia build bug',
  },
  flags: {
    FAST_REFRESH: true,
    DEV_SSR: true,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        implementation: require('sass'),
      },
    },
  ],
}
