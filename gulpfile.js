import gulp from 'gulp'
import { path } from './gulp/config/path.js'
// import { path } from './gulp/config/_path.js'
import { plugins } from './gulp/config/plugins.js'

// Global
global.app = {
    path: path,
    gulp: gulp,
    plugins: plugins,
}

// Import
import { htmlPanini } from './gulp/tasks/panini.js'
import {copy} from './gulp/tasks/copy.js'
import {reset} from './gulp/tasks/reset.js'
import {html} from './gulp/tasks/html.js'
import {server} from './gulp/tasks/server.js'
import {styles} from './gulp/tasks/styles.js'
import {scripts} from './gulp/tasks/scripts.js'
import {images} from './gulp/tasks/images.js'

// Watch
const watcher = () => {
    // gulp.watch(path.watch.htmlPanini, htmlPanini).on('change', gulp.series(htmlPanini, app.plugins.browserSync.reload))
    gulp.watch(path.watch.html, html).on('change', gulp.series(html, app.plugins.browserSync.reload))
    gulp.watch(path.watch.styles, styles).on('change', gulp.series(styles, app.plugins.browserSync.reload))
    gulp.watch(path.watch.scripts, scripts).on('change', gulp.parallel(scripts, app.plugins.browserSync.reload))
    gulp.watch(path.watch.images, images).on('change', gulp.series(images, app.plugins.browserSync.reload))
    gulp.watch(path.watch.files, copy).on('change', gulp.series(copy, app.plugins.browserSync.reload))
}

const mainTasks = gulp.parallel(html, styles, scripts, images, copy)
// const paniniBuild = gulp.parallel(htmlPanini, styles, scripts, images, copy)
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))

gulp.task('default', dev)
