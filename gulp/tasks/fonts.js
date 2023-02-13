import fs from 'fs'
import fonter from 'gulp-fonter'
import ttf2woff2 from 'gulp-ttf2woff2'

// OTF to TTF
export const otfToTtf = () => {
  // search for .otf fonts
  return app.gulp.src(`${app.path.srcFolder}/fonts/**/*.otf`, {})
  .pipe(app.plugins.plumber(app.plugins.notify.onError({
      title: 'FONTS',
      message: 'Error: <%= error.message %>'
    })
  ))
  // convert to .ttf
  .pipe(fonter({ formats: ['ttf'] }))
  // upload to source folder
  .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

// TTF to WOFF
export const ttfToWoff = () => {
  // search for .ttf fonts
  return app.gulp.src(`${app.path.srcFolder}/fonts/**/*.ttf`, {})
  .pipe(app.plugins.plumber(app.plugins.notify.onError({
      title: 'FONTS',
      message: 'Error: <%= error.message %>'
    })
  ))
  // convert to .woff
  .pipe(fonter({ formats: ['woff'] }))
  // upload to build folder
  .pipe(app.gulp.dest(`${app.path.dest.fonts}`))
  // search for .ttf fonts
  .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/**/*.ttf`))
  // convert to .woff2
  .pipe(ttf2woff2())
  // upload to build folder
  .pipe(app.gulp.dest(`${app.path.dest.fonts}`))
  // search for .woff & woff2 fonts
  .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/**/*.{woff,woff2}`))
  // upload to build folder
  .pipe(app.gulp.dest(`${app.path.dest.fonts}`))
}

export const fontStyle = () => {
  // Style file for connecting fonts
  let fontsFile = `${app.path.srcFolder}/styles/_fonts.scss`
  // Checking if font file exist
  fs.readdir(app.path.dest.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      // Checking if there is a style file for connecting fonts
      if (!fs.existsSync(fontsFile)) {
        // If there is no file, then create it
        fs.writeFile(fontsFile, '', cb)
        let newFileOnly
        for (var i = 0; i < fontsFiles.length; i++) {
          // Write the connection of fonts in the file style
          let fontFileName = fontsFiles[i].split('.')[0]
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName
            let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName

            if (fontWeight.toLowerCase() === 'thin') {
              fontWeight = 100
            } else if (fontWeight.toLowerCase() === 'extralight') {
              fontWeight = 200
            } else if (fontWeight.toLowerCase() === 'light') {
              fontWeight = 300
            } else if (fontWeight.toLowerCase() === 'regular') {
              fontWeight = 400
            } else if (fontWeight.toLowerCase() === 'medium') {
              fontWeight = 500
            } else if (fontWeight.toLowerCase() === 'semibold') {
              fontWeight = 600
            } else if (fontWeight.toLowerCase() === 'bold') {
              fontWeight = 700
            } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
              fontWeight = 800
            } else if (fontWeight.toLowerCase() === 'black') {
              fontWeight = 900
            } else {
              fontWeight = 'normal'
            }

            fs.appendFile(fontsFile,
              `@font-face {\t
    font-family: ${fontName};\t
    font-display: swap;\t
    font-style: normal;\t
    font-weight: ${fontWeight};\t
    src: url("../fonts/${fontFileName}.woff2") format("woff2"),\t
    url("../fonts/${fontFileName}.woff") format("woff");
}\r\n`, cb)
            newFileOnly = fontFileName
          }
        }
      } else {
        // If there is a file, need to delete it
        console.log('File styles/_fonts.scss already exists. To update a file, you need to delete it!');
      }
    }
  })

  return app.gulp.src(`${app.path.srcFolder}`)
  function cb() { }
}
