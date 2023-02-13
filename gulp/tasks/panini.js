import panini from 'panini'

export const htmlPanini = () => {
  panini.refresh()
  return app.gulp.src(app.path.src.htmlPanini, {})
  .pipe(app.plugins.plumber({errorHandler: app.plugins.notify.onError({
      message: "Error: <%= error.message %>",
      title: "HTML",
    })
  }))
  .pipe(panini({
    root:     `${app.path.srcFolder}/pages/`,
    layouts:  `${app.path.srcFolder}/pages/layouts/`,
    partials: `${app.path.srcFolder}/pages/partials/`,
    helpers:  `${app.path.srcFolder}/pages/helpers/`,
    data:     `${app.path.srcFolder}/pages/data/`
  }))
  .pipe(app.plugins.plumber.stop())
  .pipe(app.gulp.dest(app.path.dest.htmlPanini, {}))
  .pipe(app.plugins.browserSync.stream())
}
