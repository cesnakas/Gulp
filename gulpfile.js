import gulp        from 'gulp'
import { path }    from './gulp/config/path.js'
import { plugins } from './gulp/config/plugins.js'

// Global
global.app = {
  path: path,
  gulp: gulp,
  plugins: plugins,
}

// Import
import { htmlPanini } from './gulp/tasks/panini.js'
import { styles }     from './gulp/tasks/styles.js'
import { scripts }    from './gulp/tasks/scripts.js'
import { images }     from './gulp/tasks/images.js'
import { favicon }    from "./gulp/tasks/favicon.js"
import { copy }       from './gulp/tasks/copy.js'
import { server }     from './gulp/tasks/server.js'
import { reset }      from './gulp/tasks/reset.js'
import { otfToTtf, ttfToWoff, fontStyle } from './gulp/tasks/fonts.js'

// Watch
const watcher = () => {
  gulp.watch(path.watch.htmlPanini, htmlPanini).on('change', gulp.series(htmlPanini, app.plugins.browserSync.reload))
  gulp.watch(path.watch.styles, styles).on('change', gulp.series(styles, app.plugins.browserSync.reload))
  gulp.watch(path.watch.scripts, scripts).on('change', gulp.parallel(scripts, app.plugins.browserSync.reload))
  gulp.watch(path.watch.images, images).on('change', gulp.series(images, app.plugins.browserSync.reload))
  gulp.watch(path.watch.favicon, favicon).on('change', gulp.series(favicon, app.plugins.browserSync.reload))
  gulp.watch(path.watch.files, copy).on('change', gulp.series(copy, app.plugins.browserSync.reload))
}

// Fonts processing
const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle)

// Main task
const mainTasks = gulp.series(fonts, gulp.parallel(htmlPanini, styles, scripts, images, favicon, copy))
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))

gulp.task('default', dev)
