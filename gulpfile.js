'use strict';
const { src, dest, series, parallel, watch } = require('gulp');
const browserSync  = require('browser-sync').create();
const plumber      = require('gulp-plumber');
const panini       = require('panini');
const sourcemaps   = require('gulp-sourcemaps');
const sass         = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const concat       = require('gulp-concat');
const del          = require('del');

// Build HTML & Pages
function buildHtml() {
    panini.refresh();
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
function buildStyles() {
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
function buildScripts() {
    return src([
        // 'node_modules/...',
        'src/js/main.js',
    ])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write())
        .pipe(plumber.stop())
        .pipe(dest('dist/js/'))
        .pipe(browserSync.stream())
}

// Build a Fonts
function buildFonts() {
    return src('src/fonts/**/*.*')
        .pipe(dest('dist/fonts/'))
        .pipe(browserSync.stream())
}

// Build a Images
function buildImages() {
    return src('src/images/**/*')
        .pipe(plumber())
        .pipe(plumber.stop())
        .pipe(dest('dist/images/'))
        .pipe(browserSync.stream())
}

// Clean a Build
function cleanBuild() {
    return del([
        './*.html',
        './dist/*',
        './dist'
    ])
}

// Watch
function watcher(done) {
    browserSync.init({
        server: { baseDir: ['./'] },
        notify: false,
        online: false,
    });
    watch('src/pages/**/*.html', buildHtml);
    watch('src/scss/**/*.scss', buildStyles);
    watch('src/js/*.js', buildScripts);
    watch('src/fonts/**/*', buildFonts);
    watch('src/images/**/*', buildImages);
    watch([
        './*.html',
        'dist/*.*',
        'dist/css/*.css',
        'dist/fonts/**/*',
        'dist/images/**/*.*',
        'dist/js/*.js',
    ]).on('change', browserSync.reload);
    done();
}

exports.buildHtml   = buildHtml;
exports.buildStyles = buildStyles;
exports.buildScipts = buildScripts;
exports.buildFonts  = buildFonts;
exports.buildImages = buildImages;
exports.cleanBuild  = cleanBuild;
exports.default = series(cleanBuild, parallel(buildHtml, buildStyles, buildScripts, buildFonts, buildImages), watcher);