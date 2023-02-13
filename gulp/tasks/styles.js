import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import sourceMaps from 'gulp-sourcemaps'
import autoprefixer from 'gulp-autoprefixer'
import cleanCss from 'gulp-clean-css'
import rename from 'gulp-rename'
import groupCssMediaQueries from 'gulp-group-css-media-queries'

const sass = gulpSass(dartSass)

export const styles = () => {
  return app.gulp.src(app.path.src.styles, { sourcemaps: true })
  .pipe(app.plugins.plumber(app.plugins.notify.onError({
      title: 'SCSS',
      message: 'Error: <%= error.message %>'
    })
  ))
  .pipe(sass.sync({
    includePaths: ['./node_modules'],
    outputStyle: 'compressed'
  }))
  // .pipe(groupCssMediaQueries())
  .pipe(autoprefixer({
    grid: true,
    cascade: true,
    overrideBrowserslist: ['last 3 versions'],
  }))
  // .pipe(app.gulp.dest(app.path.build.styles)) // main.css
  .pipe(cleanCss())
  // .pipe(rename({ extname: '.min.css' }))
  .pipe(app.gulp.dest(app.path.dest.styles, { sourcemaps: '.' }))
  .pipe(app.plugins.browserSync.stream())
}
