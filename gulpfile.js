'use strict';
const { src, dest, series, parallel, watch } = require('gulp')
const browserSync  = require('browser-sync').create()
const plumber      = require('gulp-plumber')
const panini       = require('panini')
const sourcemaps   = require('gulp-sourcemaps')
const sass         = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const concat       = require('gulp-concat')
const babel        = require('gulp-babel')
const uglify       = require('gulp-uglify')
const imagemin    = require('gulp-imagemin')
const svgSprite    = require('gulp-svg-sprite')
const del          = require('del')

// Build HTML & Pages
const htmlBuild = () => {
    panini.refresh()
    return src('src/pages/*.html', { base: 'src/pages/' })
        .pipe(plumber())
        .pipe(panini({
            root:     'src/',
            layouts:  'src/pages/layouts/',
            partials: 'src/pages/partials/',
            helpers:  'src/pages/helpers/',
            data:     'src/pages/data/'
        }))
        .pipe(plumber.stop())
        .pipe(dest('./'))
        .pipe(browserSync.stream())
}

// Build a Styles
const buildStyles = () => {
    return src('src/scss/**/*.scss')
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
const buildScripts = () => {
    return src([
        // 'node_modules/...',
        'src/js/main.js',
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
const buildFonts = () => {
    return src('src/fonts/**/*.*')
        .pipe(dest('dist/fonts/'))
        .pipe(browserSync.stream())
}

// Build a Images
const buildImages = () => {
    return src('src/images/**/*.{png,jpg,jpeg,gif,webp}')
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(plumber.stop())
        .pipe(dest('dist/images/'))
        .pipe(browserSync.stream())
}

const svgBuild = () => {
    return src('src/images/svg/**/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg'
                }
            }
        }))
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
    watch('src/pages/**/*.html', htmlBuild)
    watch('src/scss/**/*.scss', buildStyles)
    watch('src/js/*.js', buildScripts)
    watch('src/fonts/**/*', buildFonts)
    watch('src/images/**/*', buildImages)
    watch('src/images/svg/**/*.svg', svgBuild)
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
exports.buildStyles = buildStyles
exports.buildScipts = buildScripts
exports.buildFonts  = buildFonts
exports.buildImages = buildImages
exports.svgBuild    = svgBuild
exports.cleanBuild  = cleanBuild
exports.default = series(cleanBuild, buildScripts, parallel(htmlBuild, buildStyles, buildFonts, buildImages, svgBuild), watcher)