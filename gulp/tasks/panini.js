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
            root:     'src/pages/',
            layouts:  'src/pages/layouts/',
            partials: 'src/pages/partials/',
            helpers:  'src/pages/helpers/',
            data:     'src/pages/data/'
        }))
        .pipe(app.plugins.plumber.stop())
        .pipe(app.gulp.dest(app.path.dest.htmlPanini, {}))
        .pipe(app.plugins.browserSync.stream())
}
