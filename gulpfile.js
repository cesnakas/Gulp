import gulp from 'gulp'
import { path } from './gulp/path.js'
import { plugins } from './gulp/plugins.js'

global.app = {
    gulp: gulp,
    path: path,
    plugins: plugins,
}

import { server } from './gulp/tasks/server.js'
import { reset } from './gulp/tasks/reset.js'
import { htmlPanini } from './gulp/tasks/panini.js'
import { styles } from './gulp/tasks/styles.js'
import { scripts, scriptsWebpack } from './gulp/tasks/scripts.js'

const watcher = () => {
    gulp.watch(path.watch.panini, htmlPanini).on('change', gulp.series(htmlPanini, app.plugins.browserSync.reload))
    gulp.watch(path.watch.styles, styles).on('change', gulp.series(styles, app.plugins.browserSync.reload))
    gulp.watch(path.watch.scripts, scripts).on('change', gulp.parallel(scripts, app.plugins.browserSync.reload))
    gulp.watch(path.watch.scripts, scriptsWebpack).on('change', gulp.parallel(scriptsWebpack, app.plugins.browserSync.reload))
}

const mainTasks = gulp.parallel(htmlPanini, styles, scriptsWebpack)
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))

gulp.task('default', dev)
