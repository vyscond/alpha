var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var rename = require('gulp-rename');
var casper = require('gulp-casperjs');
var uglify = require('gulp-uglifyjs');
var eslint = require('gulp-eslint');

gulp.task('default', ['dist'], function() {
});

gulp.task('dist', ['uglify', 'casper'], function() {
});

gulp.task('lint', function(){
  return gulp.src(['src/*.js','!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('uglify', ['lint'], function() {
  var cfg = {
    mangle: true
  };
  var babel_cfg = {
    presets: ['es2015']
  };
  gulp.src('src/alpha.js')
    .pipe(uglify(cfg))
    .pipe(rename('alpha.min.js'))
    .pipe(gulp.dest('dist/'));
  gulp.src('src/alpha.js')
    .pipe(gulp.dest('dist/'));
});

gulp.task('casper', function () {
  var server_cfg = {
    root: './tests/examples/.',
    livereload: true
  };
  connect.server(server_cfg);
  var cfg = {
    binPath: './node_modules/casperjs/bin/casperjs'
  };
  var base_path = 'tests/casper';
  var files = [
    'tests/casper/test_demo.js',
    'tests/casper/test_main.js'
  ];
  //for(var i in files){
  //  files[i] = path.join(base_path, files[i]);
  //}
  var ret = gulp.src(['tests/casper/test_main.js'])
    .pipe(casper(cfg))
    .on('end', function(){
      connect.serverClose();
      setTimeout(function () {
        //throw new Error('gulp-connect not closing the server correctly.')
        process.exit();
      }, 1000);
    });
  return ret;
});

