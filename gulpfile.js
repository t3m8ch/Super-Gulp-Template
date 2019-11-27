const gulp         = require('gulp');
const sass         = require('gulp-sass');
const cleanCSS     = require('gulp-clean-css');
const autoPrefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');

gulp.task('css', () =>
  gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(autoPrefixer())
    .pipe(gulp.dest('./build/css'))
);