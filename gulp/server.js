'use strict';
var gulp        = require('gulp'),
    path        = require('path'),
    fs          = require('fs'),
    _           = require('lodash'),
    gutil       = require('gulp-util'),
    express     = require('express'),
    reloadMW    = require('connect-livereload'),
    liveReload  = require('tiny-lr')(),
    bodyParser  = require('body-parser');


// Simple Local Server (Express + LiveReload)
// ==========================================
var server = express();
var LISTEN_PORT = 8001;
var ROOTDIR = './dist';

server.use( reloadMW() );
server.use( '/', express.static(ROOTDIR) );

// supporting JSON flat file "DataBase"
server.use( bodyParser.json() );
server.use( bodyParser.urlencoded({ extended: true }) );

// live reload
function notify(event) {
  var file = path.relative('./dist', event.path);
  liveReload.changed({ body: { files: [file] } });
  gutil.log('LiveReload event triggered');
}

gulp.task('serve', function() {
  server.listen( LISTEN_PORT, function() {
    gutil.log('Server started: http://localhost:' + LISTEN_PORT + '/');
  });
  liveReload.listen(35729);
  gulp.watch('./dist/**/*', notify);
});
