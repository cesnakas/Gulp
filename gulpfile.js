'use strict'
const { src, dest, series, parallel, watch } = require('gulp')
const browserSync      = require('browser-sync').create()
const plumber          = require('gulp-plumber')
const panini           = require('panini')
const sourcemaps       = require('gulp-sourcemaps')
const sass             = require('gulp-sass')(require('sass'))
const autoprefixer     = require('gulp-autoprefixer')
const concat           = require('gulp-concat')
const babel            = require('gulp-babel')
const uglify           = require('gulp-uglify')
const imagemin         = require('gulp-imagemin')
const imageminPngquant = require('imagemin-pngquant')
// const svgSprite     = require('gulp-svg-sprite')
const del              = require('del')

// Build HTML & Pages
const htmlBuild = () => {
    panini.refresh()
    return src('app/pages/*.html', { base: 'app/pages/' })
        .pipe(plumber())
        .pipe(panini({
            root:     'app/',
            layouts:  'app/pages/layouts/',
            partials: 'app/pages/partials/',
            helpers:  'app/pages/helpers/',
            data:     'app/pages/data/'
        }))
        .pipe(plumber.stop())
        .pipe(dest('./'))
        .pipe(browserSync.stream())
}

// Build a Styles
const stylesBuild = () => {
    return src('app/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass.sync({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(plumber.stop())
        .pipe(dest('dist/css/'))
        .pipe(browserSync.stream())
}

// Build a Scripts
const scriptsBuild = () => {
    return src([
        // 'node_modules/...',
        'app/js/main.js',
    ])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(plumber.stop())
        .pipe(dest('dist/js/'))
        .pipe(browserSync.stream())
}

// Build a Fonts
const fontsBuild = () => {
    return src('app/fonts/**/*.*')
        .pipe(dest('dist/fonts/'))
        .pipe(browserSync.stream())
}

// Build a Images
const imagesBuild = () => {
    return src('app/images/**/*.{png,jpg,jpeg,gif,webp}')
        .pipe(plumber())
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.gifsicle({interlaced: true}),
        ]))
        .pipe(plumber.stop())
        .pipe(dest('dist/images/'))
        .pipe(browserSync.stream())
}

// Build a SVG
// https://github.com/svg/svgo#built-in-plugins
const svgBuild = () => {
    return src('app/images/**/*.svg')
        .pipe(imagemin([
            imagemin.svgo({
                plugins: [
                    {removeViewBox: false},
                    {cleanupIDs: true},
                    {removeRasterImages: true},
                    {removeDimensions: true}
                ]
            })
        ]))
        .pipe(dest('dist/images/'))
}

// Clean a Build
const cleanBuild = () => {
    return del([
        './*.html',
        './dist/*',
        './dist'
    ])
}

// Watch
const watcher = (done) => {
    browserSync.init({
        server: { baseDir: ['./'] },
        notify: false,
        online: false,
    })
    watch('app/pages/**/*.html', htmlBuild)
    watch('app/scss/**/*.scss', stylesBuild)
    watch('app/js/*.js', scriptsBuild)
    watch('app/fonts/**/*', fontsBuild)
    watch('app/images/**/*', imagesBuild)
    watch('app/images/**/*.svg', svgBuild)
    watch([
        './*.html',
        'dist/*.*',
        'dist/css/*.css',
        'dist/fonts/**/*',
        'dist/images/**/*.*',
        'dist/js/*.js',
    ]).on('change', browserSync.reload)
    done()
}

exports.htmlBuild   = htmlBuild
exports.stylesBuild = stylesBuild
exports.sciptsBuild = scriptsBuild
exports.fontsBuild  = fontsBuild
exports.imagesBuild = imagesBuild
exports.svgBuild    = svgBuild
exports.cleanBuild  = cleanBuild
exports.default = series(cleanBuild, scriptsBuild, htmlBuild, stylesBuild, fontsBuild, imagesBuild, svgBuild, watcher)