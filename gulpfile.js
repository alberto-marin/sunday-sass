var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var postcss    = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var sass = require('gulp-sass');

var plugins = [
  autoprefixer({browsers: ['last 2 versions']}),
  // cssnano()
];

gulp.task('html', function () {
  return gulp.src('./app/index.html')
    .pipe(gulp.dest('./docs'))
    .pipe(reload({stream: true}));
});

gulp.task('normalize', function() {
  return gulp.src('./app/assets/styles/normalize.css')
    .pipe(gulp.dest('./docs/css'))
})

gulp.task('css', ['normalize','html'],function () {
  return gulp.src('./app/assets/styles/**/*.sass')
    .pipe(sass()).on('error', sass.logError)
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./docs/css'))
    .pipe(reload({stream: true}));
});

// watch files for changes and reload
gulp.task('serve', ['html', 'normalize','css'],function() {
  browserSync({
    server: {
      baseDir: './docs'
    }
  });

  gulp.watch('./app/assets/styles/**/*.sass', ['css']);
  gulp.watch('./app/*.html', ['html']);
  gulp.watch('./app/assets/js/*.js');
});
