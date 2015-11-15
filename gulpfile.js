/* eslint no-console:0 */

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var eslint = require('gulp-eslint');

gulp.task('lint', function () {
  return gulp.src(['main.js', 'lib/*.js', 'test/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test-debug', function (cb) {
  gulp.src('test/main.js', {read: false})
    .pipe(mocha())
    .on('end', cb);
});

gulp.task('test', ['lint'], function (cb) {
  gulp.src(['main.js', 'lib/**/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      gulp.src('test/main.js', {read: false})
        .pipe(mocha())
        .pipe(istanbul.writeReports({
          dir: './report',
          reporters: ['lcovonly', 'text', 'text-summary', 'html'],
          reportOpts: {
            lcovonly: { dir: './report/node', file: 'lcov.info' },
            html: { dir: './report/node-html' }
          }
        }))
        .pipe(istanbul.enforceThresholds({
          thresholds: {
            global: 90
          }
        }))
        .on('end', cb);
    });
});

gulp.task('develop', function() {
  gulp.watch([
    'main.js',
    'lib/**/*.js',
    'test/**/*.js'
  ], ['test']);
});
