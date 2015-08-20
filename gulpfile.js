var AUTORELOAD = false;
var DIST_PATH = './dist';

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    processhtml = require('gulp-processhtml'),
    html2js = require('gulp-html2js');

function onError(err) {
  gutil.beep();
}

gulp.task('connect', function() {
  connect.server({
    root: ['./app', './bower_components'],
    port: 3000,
    livereload: AUTORELOAD
  });
});

gulp.task('server', function() {
  connect.server({
    root: [DIST_PATH],
    port: 3000
  });
});

gulp.task('html', function() {
  gulp.src('./app/*.html')
    .pipe(processhtml({}))
    .pipe(gulp.dest(DIST_PATH))
    .pipe(connect.reload());
});

gulp.task('css', function() {
  gulp.src('./app/sass/main.scss')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(compass({
      css: './app/css',
      sass: './app/sass'
    }))
    .pipe(gulp.dest(DIST_PATH + '/css'))
    .pipe(connect.reload());
});

gulp.task('app', function() {
  gulp.src([
    './app/scripts/utils/*.js',
    './app/scripts/app.js',
    './app/scripts/*Service.js',
    './app/scripts/*Controller.js',
    './app/scripts/*Directive.js'
  ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(DIST_PATH + '/scripts'))
    .pipe(connect.reload());
});

gulp.task('images', function() {
  gulp.src('./app/images/**/*.{png,jpg}', {base: './app/images'})
    .pipe(gulp.dest(DIST_PATH + '/images'))
    .pipe(connect.reload());
});

gulp.task('data', function() {
  gulp.src('./app/data/*.json', {base: './app/data'})
    .pipe(gulp.dest(DIST_PATH + '/data'))
    .pipe(connect.reload());
});

gulp.task('dist:dependencies', function() {
  gulp.src(['./bower_components/modernizr/modernizr.js'], {
    base: './bower_components/modernizr'
  })
    .pipe(gulp.dest(DIST_PATH + '/scripts'));

  gulp.src([
    // list all dependencies here...
    './bower_components/jquery/dist/jquery.js',
    './bower_components/angular/angular.js',
    './bower_components/moment/moment.js',
    './bower_components/angular-moment/angular-moment.js',
    './bower_components/angular-route/angular-route.js',
    './bower_components/angular-truncate/src/truncate.js',
    './bower_components/d3/d3.js'
  ])
    .pipe(concat('dependencies.js'))
    .pipe(gulp.dest(DIST_PATH + '/scripts'));
});

gulp.task('templates', function() {
  gulp.src('./app/scripts/templates/*.html')
    .pipe(html2js({
      outputModuleName: 'app-templates',
      base: './app/scripts/templates',
      useStrict: true
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./app/scripts/templates'))
    .pipe(gulp.dest(DIST_PATH + '/scripts'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('./app/*.html', ['html']);
  gulp.watch('./app/sass/**/*.scss', ['css']);
  gulp.watch('./app/scripts/*.js', ['app']);
  gulp.watch('./app/scripts/templates/*.html', ['templates']);
  gulp.watch('./app/images/**/*.{png,jpg}', ['images']);
  gulp.watch('./app/data/*.json', ['data']);
});

gulp.task('default', ['dist:dependencies', 'connect', 'data', 'images', 'html',
  'css', 'app', 'templates', 'watch']);

gulp.task('s', ['dist:dependencies', 'server', 'data', 'images', 'html',
  'css', 'app', 'templates', 'watch']);