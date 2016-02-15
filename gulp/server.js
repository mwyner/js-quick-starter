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
var USERS_FILE = './src/data/users.json';
server.use( bodyParser.json() );
server.use( bodyParser.urlencoded({ extended: true }) );

server.get('/api/get-users', function(req, res) {
 fs.readFile(USERS_FILE, function(err, data) {
   res.setHeader('Cache-Control', 'no-cache');
   res.json(JSON.parse(data));
 });
});

server.post('/api/create-user', function(req, res) {
 fs.readFile(USERS_FILE, function(err, data) {
   var comments = JSON.parse(data);
   comments.push(req.body);
   fs.writeFile(USERS_FILE, JSON.stringify(comments, null, 4), function(err) {
     res.setHeader('Cache-Control', 'no-cache');
     res.json(comments);
   });
 });
});

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

