import webp from 'gulp-webp'

export const imagesWebp = () => {
    return app.gulp.src(app.path.src.images)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'WEBP',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(app.plugins.newer(app.path.build.webp))
        .pipe(webp())
        .pipe(app.gulp.dest(app.path.build.webp))
        .pipe(app.plugins.browserSync.stream())
}
