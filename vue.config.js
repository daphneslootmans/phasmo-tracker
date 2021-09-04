module.exports = {
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       additionalData: `@import "@/assets/scss/globals.scss";`,
  //     }
  //   }
  // },
  outputDir: 'docs',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/phasmo-tracker/'
    : '/'
}
