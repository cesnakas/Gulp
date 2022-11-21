export const server = (done) => {
    app.plugins.browserSync.init({
        server: {
            baseDir: [ `${app.path.dest.htmlPanini}` ]
        },
        online: true,
        notify: false,
    })
}
