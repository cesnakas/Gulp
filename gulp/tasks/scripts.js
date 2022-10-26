import webpack from 'webpack-stream'

export const scripts = () => {
    return app.gulp.src(app.path.src.scripts, { sourcemaps: true })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'JS',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(webpack({
            mode: 'development',
            output: {
                filename: 'main.js',
            }
        }))
        .pipe(app.gulp.dest(app.path.build.scripts, { sourceMaps: '.' }))
        .pipe(app.plugins.browserSync.stream())
}
