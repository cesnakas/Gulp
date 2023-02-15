import dartSass     from 'sass'
import gulpSass     from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCss     from 'gulp-clean-css'

const sass = gulpSass(dartSass)

export const styles = () => {
  return app.gulp.src(app.path.src.styles, { sourcemaps: true })
  .pipe(app.plugins.plumber(app.plugins.notify.onError({
      message: 'Error: <%= error.message %>', title: 'SCSS',
    })
  ))
  .pipe(sass.sync({
    includePaths: ['./node_modules'],
    outputStyle: 'compressed' // expanded or compressed
  }))
  .pipe(autoprefixer({
    grid: true,
    cascade: true,
    overrideBrowserslist: ['last 3 versions'],
  }))
  .pipe(cleanCss())
  .pipe(app.gulp.dest(app.path.dest.styles, { sourcemaps: '.' }))
  .pipe(app.plugins.browserSync.stream())
}
