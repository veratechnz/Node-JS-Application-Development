// Gulp Variables
var gulp = require('gulp');
	sass = require('gulp-sass');
 	livereload = require('gulp-livereload');
 	connect = require('gulp-connect');
 	jshint = require('gulp-jshint');
    rename = require('gulp-rename');
    minifyCss = require('gulp-minify-css');
    gulp = require('gulp');
    webpack = require('webpack-stream');

// Server Task
gulp.task('serve', function(event) {
    connect.server({
        root: '',
        port: 1988,
        livereload: true
    });
});

// Styles Task
gulp.task('styles', function() {
    gulp.src('sass/custom.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCss())
        .pipe(gulp.dest('css/'))
        .pipe(connect.reload());
});

// HTML Task
gulp.task('html', function() {
    gulp.src('./*.html')
    	.pipe(connect.reload());
});

// JS Lint Task for correcting and monitoring your custom.js
gulp.task('lint', function(){
    gulp.src('js/*.js')
    .pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(connect.reload());
});

gulp.task('webpack', function() {
  return gulp.src('js/custom.js')
    .pipe(webpack())
    .pipe(gulp.dest('dist/'));
});

// Watch task to watch for file changes
gulp.task('watch', function(){
	gulp.watch('sass/**/*.scss', ['styles']);
	gulp.watch('./*.html', ['html']); 
	gulp.watch('js/*.js', ['lint']);
    gulp.watch('js/*.js', ['webpack']);
});

// Tasks that Gulp will run
gulp.task('default', ['serve', 'styles', 'html', 'watch', 'webpack']);
