import webpack from 'webpack-stream'

export const scripts = () => {
    return app.gulp.src(app.path.src.scripts, { /*sourcemaps: true*/ })
        .pipe(app.plugins.plumber({errorHandler: app.plugins.notify.onError({
                message: 'Error: <%= error.message %>',
                title: 'JavaScript',
            })
        }))
        .pipe(webpack({
            devtool: 'source-map',
            mode: 'production', // or development
            output: {
                filename: 'main.js',
            }
        }))
        .pipe(app.plugins.plumber.stop())
        .pipe(app.gulp.dest(app.path.dest.scripts, { /*sourceMaps: '.'*/ }))
        .pipe(app.plugins.browserSync.stream())
}
