'use strict';
/*
 * 1. Less编译 压缩 @import导入
 * 2. JS合并 压缩 混淆
 * 3. img 复制
 * 4. HTML 压缩
 */

//在gulpfile中现在入gulp包，因为这个包提供了一些API
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');

//1. Less编译 压缩
gulp.task('style', function () {
  //这里是在执行style任务是自动执行的
  gulp.src(['src/styles/*.less', '!src/styles/_*.less'])
    .pipe(less())
    .pipe(cssnano())
    .pipe(gulp.dest('dist/styles'));
});
//2. JS合并 压缩 混淆
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
gulp.task('script', function () {
  gulp.src('src/scripts/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'));
});
//3. img 复制
gulp.task('image', function () {
  gulp.src('src/images/*.*')
    .pipe(gulp.dest('dist/images'));
});
//4. HTML 压缩
var htmlmin = require('gulp-htmlmin');
gulp.task('html', function () {
  gulp.src('src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('dist'));
});

var browserSync = require('browser-sync');
gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: ['dist']
    }
  }, function (err, bs) {
    console.log(bs.options.getIn(['urls', 'local']));
  });

  gulp.watch('src/styles/*.less', ['style']);
  gulp.watch('src/scripts/*.js', ['script']);
  gulp.watch('src/iamges/*.*', ['image']);
});