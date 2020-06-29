'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify-es').default;
const order = require("gulp-order");
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sourceMaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const del = require('del');
const svgmin = require('gulp-svgmin');
const svgSprite = require('gulp-svg-sprite');
const cheerio = require('gulp-cheerio');
const webp = require('gulp-webp');
const minifyCss = require('gulp-csso');
const postHtml = require("gulp-posthtml");
const rename = require("gulp-rename");
const config = {
    mode: {
        stack: {
            dest : '.'
        }
    }
};
gulp.task('svg-sprite', function (cb) {
    return gulp.src('img/icons/sprite/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('build/img/sprites'));
});



gulp.task('sass', function () {
    return gulp.src('scss/**/*.scss')
        .pipe(plumber())
        .pipe(sourceMaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 version']
        }))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('html', function () {
    return gulp.src('*.html')
        .pipe(posthtml())
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('js', function () {
    return gulp.src(['build/js/*.js', '!build/js/*.min.js'])
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('concatlibsjs', function() {
    return gulp.src(['build/js/libs/swiper.min.js', 'build/js/libs/inputmask.min.js',  'build/js/libs/just-validate.min.js', 'build/js/slider.min.js'])
      .pipe(concat('vendor.min.js'))
      .pipe(gulp.dest('build/js'));
  });

gulp.task('concatjs', function() {
return gulp.src(['build/js/navigation.min.js', 'build/js/modals.min.js','build/js/forms.min.js'])
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('css', function () {
    return gulp.src('css/**/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('rename', function () {
    return gulp.src('build/css/style.css')
        .pipe(minifyCss())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('allimg', function () {
    return gulp.src('img/**/*.{png,jpg,webp}')
        .pipe(webp())
        .pipe(gulp.dest('build/img'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('images', function () {
    return gulp.src("img/**/*.{png,jpg}")
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('build/img'));
});

gulp.task('svg', function () {
    return gulp.src("img/**/*.svg")
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {
                xmlMode: true
            }
        }))
        .pipe(gulp.dest('build/img'));
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: 'build',
            index: "index.html"
          }
    });
    gulp.watch("scss/**/*.scss", gulp.series('sass'));
    gulp.watch("*.html", gulp.series('html'));
    gulp.watch("js/**/*.js", gulp.series('js'));
    gulp.watch("img/**/*.{png,jpg,webp}", gulp.series('allimg'));
    gulp.watch("img/**/*.{svg}", gulp.series('svg'));
});

gulp.task('copy', function () {
    return gulp.src(['fonts/**','img/**', 'favicon/**', 'js/**', 'css/**', '*.html', '*.php', 'PHPMailer/**'], {
        base: '.'
    })
        .pipe(gulp.dest('build'))
});

gulp.task('build', gulp.series('copy', 'sass', 'svg', 'images', 'js', 'rename', 'concatlibsjs', 'concatjs'));




