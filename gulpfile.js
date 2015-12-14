'use strict';
var gulp       = require('gulp'),
    requireDir = require('require-dir')('./gulp');

gulp.task('build',  ['build-js', 'lint-js', 'build-css']);
gulp.task('watch',  ['watch-js', 'watch-lint', 'watch-css']);
gulp.task('default',['serve', 'watch']);
