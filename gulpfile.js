'use strict';
var gulp       = require('gulp'),
    requireDir = require('require-dir')('./gulp');

gulp.task('build',  ['build-js', 'build-css']);
gulp.task('watch',  ['watch-js', 'watch-css']);
gulp.task('default',['serve', 'watch']);
