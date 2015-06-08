var gulp    = require('gulp'),
    plumber = require('gulp-plumber'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    concat  = require('gulp-concat'),
    gutil   = require('gulp-util');
    html2js = require('gulp-html2js');

 function onError(err) {
     gutil.beep();
 }

gulp.task('connect', function() {
    connect.server({
        root: ['./app', './bower_components'],
        port: 3000,
        livereload: true
    });
});

gulp.task('html', function() {
    gulp.src('./app/*.html')
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
        .pipe(connect.reload());
});

gulp.task('scripts', function() {
    gulp.src(['./app/scripts/*.js', './app/scripts/utils/*.js'])
        .pipe(connect.reload());
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
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('./app/*.html', ['html']);
    gulp.watch('./app/sass/**/*.scss', ['css']);
    gulp.watch('./app/scripts/*.js', ['scripts']);
    gulp.watch('./app/scripts/templates/*.html', ['templates']);
});

gulp.task('default', ['connect', 'html', 'css', 'scripts', 'templates', 
                        'watch']);