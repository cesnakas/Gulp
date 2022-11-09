import panini from 'panini'
import htmlmin from 'gulp-htmlmin'

export const htmlPanini = () => {
    panini.refresh()
    return app.gulp.src(app.path.src.panini, { sourcemaps: false })
        .pipe(panini({
            root:     'app/pages/',
            layouts:  'app/pages/layouts/',
            partials: 'app/pages/partials/',
            helpers:  'app/pages/helpers/',
            data:     'app/pages/data/'
        }))
        .pipe(htmlmin({
            useShortDoctype: true,
            sortClassName: true,
            collapseWhitespace: true,
            removeComments: true,
        }))
        .pipe(app.gulp.dest(app.path.dest.panini, { sourcemaps: '.' }))
        .pipe(app.plugins.browserSync.stream())
}
