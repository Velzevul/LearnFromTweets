var gulp = require('gulp'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect');

gulp.task('connect', function() {
    connect.server({
        root: ['app', 'bower_components'],
        port: 3000,
        livereload: true
    });
});

gulp.task('html', function() {
    gulp.src('./app/*.html')
        .pipe(connect.reload());
});

gulp.task('compass', function() {
    gulp.src('./app/sass/main.scss')
        .pipe(compass({
            css: './app/css',
            sass: './app/sass'
        }))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('./app/*.html', ['html']);
    gulp.watch('./app/sass/**/*.scss', ['compass']);
});

gulp.task('default', ['connect', 'html', 'compass', 'watch']);