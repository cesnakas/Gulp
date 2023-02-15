import imagemin from "gulp-imagemin"

export const favicon = () => {
  return app.gulp.src(app.path.src.favicon)
  .pipe(app.plugins.newer(app.path.destFolder))
  .pipe(imagemin())
  .pipe(app.gulp.dest(app.path.destFolder))
  .pipe(app.plugins.browserSync.stream())
}
