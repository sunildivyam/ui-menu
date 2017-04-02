var gulp = require('gulp');
var del = require('del');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var less = require('gulp-less');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');
var browserify = require('gulp-browserify');

gulp.task('browserify', function() {
	return gulp.src('ui-menu.js')
	.pipe(browserify())
	.pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
	return del('dist/*');
});

gulp.task('cleanCss', function() {
	return gulp.src('styles/ui-menu.css')
	.pipe(rename('ui-menu.min.css'))
	.pipe(cleanCss())
	.pipe(gulp.dest('dist'));
});

gulp.task('less', function() {
	return gulp.src('styles/*')
	.pipe(less())
	.pipe(gulp.dest('dist'));
});


gulp.task('lint', function() {
	gulp.src(['ui-menu.js'])
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(eslint.failAfterError());
});

gulp.task('uglify', function() {
	return gulp.src('dist/ui-menu.js')
	.pipe(rename('ui-menu.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist'));
});

gulp.task('build', function() {
	return runSequence('clean', 'lint', 'browserify', ['less'], ['uglify', 'cleanCss']);
});