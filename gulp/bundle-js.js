'use strict';
var gulp        = require('gulp'),
    path        = require('path'),
    _           = require('lodash'),
    gutil       = require('gulp-util'),
    size        = require('gulp-size'),
    stream      = require('vinyl-source-stream'),
    buffer      = require('vinyl-buffer'),
    browserify  = require('browserify'),
    watchify    = require('watchify'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    hbsfy       = require("hbsfy");


// BUNDLE JS (Browserify + Babel)
// ==============================

gulp.task('build-js', function() {
  browserify('./src/main.js', { extensions: ['.js'], debug: true })
      .transform( hbsfy )
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe( stream('main.js') )
      .pipe( buffer() )
      //.pipe( uglify({ mangle: true }) ) // uncomment this line for production
      .pipe( size({ showFiles: true, pretty: true }) )
      .pipe( gulp.dest('./dist/js') );
});

gulp.task('watch-js', function() {
  var opts = _.assign({}, watchify.args, { extensions: ['.js'], debug: true });
  var bundler = watchify( browserify('./src/main.js', opts) ).transform( hbsfy );

  function rebundle() {
    return bundler.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe( stream('main.js') )
        .pipe( buffer() )
        //.pipe( uglify({ mangle: false }) ) // un-comment this line for production
        .pipe( size({ showFiles: true, pretty: true }) )
        .pipe( gulp.dest('./dist/js') );
  }

  bundler.on('update', function() {
    rebundle();
    gutil.log('Updating browserify bundle...');
  });

  return rebundle();
});