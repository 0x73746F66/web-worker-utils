var gulp = require('gulp');
var sass = require('gulp-sass');
var less = require('gulp-less');

// Sass configuration
gulp.task('sass', function() {
    gulp.src('sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(function(f) {
            return f.base.replace('sess','styles');
        }))
});
gulp.task('less', function() {
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(gulp.dest(function(f) {
            return f.base.replace('less','styles');
        }))
});
gulp.task('compilecss', function() {
    gulp.watch('sass/*.scss', ['sass']);
    gulp.watch('less/*.less', ['less']);
});
