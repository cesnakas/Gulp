export const server = () => {
    app.plugins.browserSync.init({
        server: {
            baseDir: [ `${app.path.dest.panini}` ]
        },
        online: true,
        notify: false,
    })
}
