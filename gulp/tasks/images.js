import webp from 'gulp-webp'
import imagemin from 'gulp-imagemin'

export const images = () => {
  return app.gulp.src(app.path.src.images)
  .pipe(app.plugins.plumber(
    app.plugins.notify.onError({
      title: 'IMAGES',
      message: 'Error: <%= error.message %>'
    })
  ))
  // checking for images update
  .pipe(app.plugins.newer(app.path.dest.images))
  // convert to WebP
  .pipe(webp())
  // upload WebP images
  .pipe(app.gulp.dest(app.path.dest.images))
  // back to sources
  .pipe(app.gulp.src(app.path.src.images))
  // check for images update
  .pipe(app.plugins.newer(app.path.dest.images))
  // images optimization jpeg, jpg, png, gif, svg
  .pipe(imagemin({
    quality: 80, // JPEG
    progressive: true, // JPEG
    optimizationLevel: 5, // PNG
    interlaced: true, // GIF
    svgoPlugins: [ // SVG
      { removeViewBox: false },
      { cleanupIDs: true },
      { removeRasterImages: true },
      { removeDimensions: true }
    ],
  }))
  .pipe(app.gulp.dest(app.path.dest.images))
  .pipe(app.plugins.browserSync.stream())
}
