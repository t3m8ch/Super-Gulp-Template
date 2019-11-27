const gulp         = require('gulp');
const sass         = require('gulp-sass');
const cleanCSS     = require('gulp-clean-css');
const autoPrefixer = require('gulp-autoprefixer');
const babel        = require('gulp-babel');
const uglify       = require('gulp-uglify');
const concat       = require('gulp-concat');
const del          = require('del');
const imagemin     = require('gulp-imagemin');
const browserSync  = require('browser-sync').create();

sass.compiler = require('node-sass');

let jsFiles = [
  // './node_modules/jquery/dist/jquery.min.js',
  './src/js/main.js'
]

gulp.task('clean', () => del(['./build']));

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

gulp.task('img', () =>
  gulp.src('./src/img/*')
    .pipe(imagemin({
      progressive: true,
      optimizationLevel: 5
    }))
    .pipe(gulp.dest('./build/img'))
);

gulp.task('watch', () => {
    browserSync.init({
      server: {
        baseDir: './'
      }
    });
    gulp.watch('./src/scss/**/*.scss', gulp.task('css'));
    gulp.watch('./src/js/**/*.js', gulp.task('js'));
    gulp.watch('./src/img/*', gulp.task('img'));
    gulp.watch('./*.html').on('change', browserSync.reload);
  }
);

gulp.task('build', gulp.series('clean', gulp.parallel(gulp.task('css'), 
                                        gulp.task('js'), 
                                        gulp.task('img'))));
                                        
gulp.task('dev', gulp.series('build', 'watch'));