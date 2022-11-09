import babel from 'gulp-babel'
import webpack from 'webpack-stream'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'

export const scripts = () => {
    return app.gulp.src([
        // 'node_modules/',
        'app/scripts/app.js',
        app.path.src.scripts
    ], { sourcemaps: true })
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(app.gulp.dest(app.path.dest.scripts, { sourcemaps: '.' }))
        .pipe(app.plugins.browserSync.stream())
}

export const scriptsWebpack = () => {
    return app.gulp.src(['app/scripts/app.js', app.path.src.scripts])
        .pipe(webpack({
            mode: 'production', // or development
            devtool: 'source-map',
            output: {
                filename: 'main.js',
            }
        }))
        .pipe(app.gulp.dest(app.path.dest.scripts))
        .pipe(app.plugins.browserSync.stream())
}
