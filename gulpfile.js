const gulp         = require('gulp');
const sass         = require('gulp-sass');
const cleanCSS     = require('gulp-clean-css');
const autoPrefixer = require('gulp-autoprefixer');
const babel        = require('gulp-babel');
const uglify       = require('gulp-uglify');
const concat       = require('gulp-concat');
const del          = require('del');

sass.compiler = require('node-sass');

let jsFiles = [
  './node_modules/jquery/dist/jquery.min.js',
  './src/js/main.js'
]

gulp.task('clean', () => del['./build']);

gulp.task('css', () =>
  gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(autoPrefixer())
    .pipe(gulp.dest('./build/css'))
);

gulp.task('js', () => 
  gulp.src(jsFiles)
    .pipe(concat('scripts.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify({
      toplevel: true
    }))
    .pipe(gulp.dest('./build/js'))
);