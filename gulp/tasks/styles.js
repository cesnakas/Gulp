import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'

const sass = gulpSass(dartSass)

export const styles = () => {
    return app.gulp.src(app.path.src.styles, { sourcemaps: true })
        .pipe(sass.sync({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            grid: true,
            cascade: true,
            overrideBrowserslist: ['last 3 versions'],
        }))
        .pipe(app.gulp.dest(app.path.dest.styles, { sourcemaps: '.' }))
        .pipe(app.plugins.browserSync.stream())
}
