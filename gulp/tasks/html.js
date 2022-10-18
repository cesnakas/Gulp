import panini from 'panini'

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(panini({
            root:     'src/pages/',
            layouts:  'src/pages/layouts/',
            partials: 'src/pages/partials/',
            helpers:  'src/pages/helpers/',
            data:     'src/pages/data/'
        }))
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browserSync.stream())
}

// Refresh
export const resetPages = (done) => {
    panini.refresh()
}
