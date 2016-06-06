var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var nodemon = require('gulp-nodemon');

gulp.task('browserify', scripts)
    .task('serve', serve);

function scripts() {
  var bundler = browserify({
    entries: ['./client/js/main.js'],
    transform: [reactify], // We want to convert JSX to normal javascript
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  });
  var watcher = watchify(bundler);

  return watcher
    .on('update', function() {
      var updateStart = Date.now();
      console.log('Updating!');
      watcher.bundle()
      .on('error', function(err) {
        console.log('Error with compiling components', err.message);
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./client/build/'));
      console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    // Create the initial bundle when starting the task
    .bundle()
    .on('error', function(err) {
      console.log('Error with compiling components', err.message);
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./client/build/'));
}

function serve() {
  nodemon({
    script: 'server/server.js',
    ignore: ['client/', 'build/']
  });
}


gulp.task('default', ['browserify', 'serve']);
