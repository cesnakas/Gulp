export const server = (done) => {
  app.plugins.browserSync.init({
    server: {
      baseDir: [`${app.path.destFolder}`]
    },
    online: true,
    notify: false,
  }, done)
}
